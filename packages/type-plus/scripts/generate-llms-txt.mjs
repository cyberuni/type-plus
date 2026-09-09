// Usage: node scripts/generate-llms-txt.mjs [--check] [--undocumented]
//
// Generates `llms.txt` -- the orientation layer an agent needs before it can use
// the 371 KB of `.d.ts` this package ships. The per-symbol detail already lives
// in the declarations; what an agent meeting the library cold does not have is a
// map: what the library is, the conventions that govern every type in it, and
// which families exist.
//
// The family list, the symbol names and the counts are derived from the actual
// exported type surface of `src/index.ts`, never hand-maintained. The repo has a
// cautionary tale: the `src/**/readme.md` tree was hand-written, rotted into
// documenting an API that no longer existed, and was deleted wholesale. A
// hand-written `llms.txt` would rot exactly the same way.
//
// Flags:
//   --check          exit non-zero if the files on disk differ from what this
//                    script would write. Used by `pnpm docs:llms:check` in CI.
//   --undocumented   print the exported-but-undocumented symbols as markdown
//                    instead of writing anything. That list is the input for the
//                    documentation-gap issue.
//
// The compiler API is taken from `ts-6.0` rather than `typescript`: the package
// builds with TypeScript 7, whose npm package exposes only `version` to JS
// consumers. `ts-6.0` is already a devDependency for the type tests.
import { globSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'ts-6.0'

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(packageRoot, '..', '..')
const srcRoot = join(packageRoot, 'src')

const SITE = 'https://cyberuni.github.io/type-plus'

/** `console` is banned by the lint rules; this is a CLI script, so it writes directly. */
function write(stream, message) {
	stream.write(`${message}\n`)
}

/**
 * Where each family of the type surface is documented on the site.
 *
 * `null` means "exported, but no page covers it" -- a real gap, reported rather
 * than hidden. A family missing from this map is a hard error: a new directory
 * under `src/` has to be pointed at a page or explicitly declared undocumented,
 * so the map cannot silently fall behind the source.
 */
const FAMILY_DOCS = {
	$type: { title: 'Type branching', page: 'api/type-branching' },
	any: { title: 'Primitives', page: 'api/primitives' },
	array: { title: 'Array', page: 'api/array' },
	assertion: { title: 'Type Guards and Assertions', page: 'api/type-guards-and-assertions' },
	bigint: { title: 'Math and Bigint', page: 'api/math' },
	binary: null,
	boolean: { title: 'Boolean and Logical', page: 'api/boolean' },
	class: null,
	equal: { title: 'Equality', page: 'api/equality' },
	function: { title: 'Function and Functional', page: 'api/function' },
	functional: { title: 'Function and Functional', page: 'api/function' },
	logical: { title: 'Boolean and Logical', page: 'api/boolean' },
	math: { title: 'Math and Bigint', page: 'api/math' },
	mix_types: { title: 'Union and Mixed Types', page: 'api/union' },
	never: { title: 'Primitives', page: 'api/primitives' },
	nodejs: null,
	nominal: { title: 'Nominal Types', page: 'api/nominal' },
	null: { title: 'Primitives', page: 'api/primitives' },
	number: { title: 'Number and Numeric', page: 'api/number' },
	numeric: { title: 'Number and Numeric', page: 'api/number' },
	object: { title: 'Object', page: 'api/object' },
	predicates: { title: 'Type Guards and Assertions', page: 'api/type-guards-and-assertions' },
	promise: { title: 'Promise', page: 'api/promise' },
	root: null,
	string: { title: 'String', page: 'api/string' },
	symbol: { title: 'Primitives', page: 'api/primitives' },
	testing: { title: 'Testing', page: 'api/testing' },
	tuple: { title: 'Tuple', page: 'api/tuple' },
	'type-guard': { title: 'Type Guards and Assertions', page: 'api/type-guards-and-assertions' },
	undefined: { title: 'Primitives', page: 'api/primitives' },
	union: { title: 'Union and Mixed Types', page: 'api/union' },
	unknown: { title: 'Primitives', page: 'api/primitives' },
	utils: null,
	void: { title: 'Primitives', page: 'api/primitives' },
}

/**
 * Families whose `@example` blocks are pinned to the implementation by a
 * compiled `*_docs.spec.ts`. Read off disk rather than listed, so the claim can
 * only be made about families that actually have one.
 */
function pinnedFamilies() {
	return globSync('*/*_docs.spec.ts', { cwd: srcRoot })
		.map((path) => path.slice(0, path.indexOf('/')))
		.sort()
}

function pinnedNote(families) {
	if (families.length === 0) return ''
	const list = families.map((f) => `\`${f}\``).join(', ')
	return ` In ${list}, every documented example is pinned by a compiled test, so an example that drifts from the implementation fails to build.`
}

/** Symbols re-exported from a dependency. Their docs are that package's job. */
const EXTERNAL = 'external'

function readExportSurface() {
	const entry = join(srcRoot, 'index.ts')
	const configFile = ts.readConfigFile(join(packageRoot, 'tsconfig.json'), ts.sys.readFile)
	const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, packageRoot)
	const program = ts.createProgram([entry], { ...parsed.options, noEmit: true })
	const checker = program.getTypeChecker()
	const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile(entry))

	return checker.getExportsOfModule(moduleSymbol).map((symbol) => {
		const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol
		const fileName = target.declarations?.[0]?.getSourceFile().fileName ?? ''
		const inPackage = fileName.startsWith(`${srcRoot}/`)
		const path = inPackage ? relative(srcRoot, fileName) : fileName
		return {
			name: symbol.name,
			family: inPackage ? (path.includes('/') ? path.slice(0, path.indexOf('/')) : 'root') : EXTERNAL,
			documented: ts.displayPartsToString(target.getDocumentationComment(checker)).trim().length > 0,
		}
	})
}

function groupByFamily(exports) {
	const families = new Map()
	for (const item of exports) {
		if (item.family === EXTERNAL) continue
		if (!(item.family in FAMILY_DOCS)) {
			throw new Error(
				`src/${item.family}/ is not in FAMILY_DOCS. Point it at a docs page, or set it to \`null\` to declare it undocumented.`,
			)
		}
		const bucket = families.get(item.family) ?? []
		bucket.push(item)
		families.set(item.family, bucket)
	}
	return families
}

/** One bullet per documented page, merging the families that share it. */
function documentedSections(families) {
	const pages = new Map()
	for (const [family, items] of families) {
		const doc = FAMILY_DOCS[family]
		if (!doc) continue
		const entry = pages.get(doc.page) ?? { title: doc.title, dirs: [], names: [] }
		entry.dirs.push(family)
		entry.names.push(...items.map((i) => i.name))
		pages.set(doc.page, entry)
	}
	return [...pages]
		.map(([page, entry]) => ({
			page,
			title: entry.title,
			dirs: entry.dirs.sort(),
			names: [...new Set(entry.names)].sort(),
		}))
		.sort((a, b) => a.title.localeCompare(b.title))
}

function undocumentedFamilies(families) {
	return [...families]
		.filter(([family]) => FAMILY_DOCS[family] === null)
		.map(([family, items]) => ({ family, names: items.map((i) => i.name).sort() }))
		.sort((a, b) => a.family.localeCompare(b.family))
}

function undocumentedSymbols(exports) {
	return exports
		.filter((item) => !item.documented && item.family !== EXTERNAL)
		.sort((a, b) => {
			return a.family.localeCompare(b.family) || a.name.localeCompare(b.name)
		})
}

function bullet(title, page, note) {
	return `- [${title}](${SITE}/${page}/): ${note}`
}

function renderLlmsTxt(exports) {
	const families = groupByFamily(exports)
	const sections = documentedSections(families)
	const gaps = undocumentedFamilies(families)
	const missingDocs = undocumentedSymbols(exports)
	const external = exports.filter((item) => item.family === EXTERNAL)
	const total = exports.length
	const documented = total - missingDocs.length - external.length

	const lines = []
	lines.push('# type-plus')
	lines.push('')
	lines.push(
		`> ${total} utility types and functions for TypeScript, most of which resolve at the type level and emit no runtime code. This file is generated from the exported surface of \`src/index.ts\`; edit \`packages/type-plus/scripts/generate-llms-txt.mjs\`, not this file.`,
	)
	lines.push('')
	lines.push(
		'Most of `type-plus` is types, not values. Importing a type costs nothing at runtime -- it is erased at compile time, and the shipped declarations are several times the size of the shipped JavaScript. Import types with `import type` and the rest with a plain `import`.',
	)
	lines.push('')
	lines.push('## Conventions')
	lines.push('')
	lines.push(
		'Four conventions govern almost every type in the library. Knowing them is worth more than knowing any individual symbol.',
	)
	lines.push('')
	lines.push(
		'- `Is*<T>` resolves to `true` or `false`. It resolves to `boolean` when `T` cannot be decided one way or the other -- `IsPositive<number>` is `boolean`, because `number` holds both positive and negative values. Every `Is*` type has a matching `IsNot*`.',
	)
	lines.push(
		"- `Is*<T, $O>` takes a second type parameter, an options object. `{ selection: 'filter' }` switches the result from a boolean to `T` itself (or `never` when the check fails), which makes the type usable as a filter over a union.",
	)
	lines.push(
		'- `{ distributive: false }` turns off distribution over unions. By default a check applied to `A | B` is applied to each member and the results are unioned; with distribution off the union is judged as a whole.',
	)
	lines.push(
		"- Every branch of a check is overridable through the same options object: `IsNever<any, { $any: 'any' }>`, and likewise `$unknown`, `$then` and `$else`. Passing the `Is*.$Branch` selector instead -- `IsNever<T, IsNever.$Branch>` -- yields the `$Then` / `$Else` markers, which is what makes a check composable inside another type.",
	)
	lines.push('')
	lines.push(
		`The authoritative, per-symbol detail is the TSDoc in the shipped \`.d.ts\` files, under \`node_modules/type-plus/esm/\`. ${documented} of the ${total} exports carry TSDoc; the rest have a name and a signature only. A documented type states what it resolves to in \`@example\` blocks. Read the declaration before guessing at a signature.${pinnedNote(pinnedFamilies())}`,
	)
	lines.push('')
	lines.push('## Guides')
	lines.push('')
	lines.push(bullet('Getting Started', 'guides/getting-started', 'Install, import, and the first utility type.'))
	lines.push(
		bullet(
			'TypeScript Version Compatibility',
			'guides/typescript-version-compatibility',
			'Which TypeScript versions are supported and why the range matters for a type library.',
		),
	)
	lines.push('')
	lines.push('## Reference')
	lines.push('')
	lines.push(bullet('Type branching', 'api/type-branching', 'The `$Branch`, `$Then` and `$Else` mechanism in full.'))
	lines.push(bullet('Options', 'reference/options', 'The `$Options` shapes shared across the library.'))
	lines.push(bullet('Categories', 'reference/categories', 'What the category icons in the TSDoc mean.'))
	lines.push(bullet('Status', 'reference/status', 'Stability and `@since` markers.'))
	lines.push('')
	lines.push('## API')
	lines.push('')
	for (const section of sections) {
		lines.push(
			bullet(
				section.title,
				section.page,
				`${section.names.length} exports from ${section.dirs.map((d) => `\`src/${d}/\``).join(', ')} -- ${section.names.join(', ')}.`,
			),
		)
	}
	lines.push('')
	lines.push('## Optional')
	lines.push('')
	lines.push(
		'- [Source](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src): the implementation, one symbol per file, named after the symbol.',
	)
	if (gaps.length > 0) {
		const count = gaps.reduce((sum, gap) => sum + gap.names.length, 0)
		lines.push(
			`- [Undocumented families](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src): ${count} exports from ${gaps.map((g) => `\`src/${g.family === 'root' ? '' : `${g.family}/`}\``).join(', ')} have no page on the site. Read their \`.d.ts\` directly: ${gaps
				.flatMap((g) => g.names)
				.sort()
				.join(', ')}.`,
		)
	}
	if (external.length > 0) {
		lines.push(
			`- [unpartial](https://www.npmjs.com/package/unpartial): re-exported wholesale, so ${external
				.map((e) => `\`${e.name}\``)
				.sort()
				.join(', ')} are documented there rather than here.`,
		)
	}
	lines.push('')
	return lines.join('\n')
}

function renderUndocumentedReport(exports) {
	const missing = undocumentedSymbols(exports)
	const byFamily = new Map()
	for (const item of missing) {
		byFamily.set(item.family, [...(byFamily.get(item.family) ?? []), item.name])
	}
	const lines = [
		`${missing.length} of ${exports.length} exported symbols have no TSDoc comment.`,
		'',
		'| Family | Undocumented exports |',
		'| --- | --- |',
	]
	for (const [family, names] of [...byFamily].sort((a, b) => a[0].localeCompare(b[0]))) {
		lines.push(`| \`src/${family === 'root' ? '' : `${family}/`}\` | ${names.map((n) => `\`${n}\``).join(', ')} |`)
	}
	return lines.join('\n')
}

const targets = [join(packageRoot, 'llms.txt'), join(repoRoot, 'apps', 'website', 'public', 'llms.txt')]

const args = process.argv.slice(2)
const exportSurface = readExportSurface()

if (args.includes('--undocumented')) {
	write(process.stdout, renderUndocumentedReport(exportSurface))
} else {
	const content = renderLlmsTxt(exportSurface)
	if (args.includes('--check')) {
		const stale = targets.filter((target) => {
			try {
				return readFileSync(target, 'utf8') !== content
			} catch {
				return true
			}
		})
		if (stale.length > 0) {
			write(
				process.stderr,
				`llms.txt is out of date:\n${stale.map((t) => `  ${relative(repoRoot, t)}`).join('\n')}\nRun \`pnpm docs:llms\` and commit the result.`,
			)
			process.exit(1)
		}
		write(process.stdout, 'llms.txt is up to date.')
	} else {
		for (const target of targets) writeFileSync(target, content)
		write(
			process.stdout,
			`Wrote llms.txt (${exportSurface.length} exports):\n${targets.map((t) => `  ${relative(repoRoot, t)}`).join('\n')}`,
		)
	}
}
