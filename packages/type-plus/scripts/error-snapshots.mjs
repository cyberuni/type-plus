// Usage: node scripts/error-snapshots.mjs [--update] [--ts 5.4,7]
//
// Pins the text of the errors type-plus produces. `@ts-expect-error` only
// proves an error exists, so a change that makes an error unreadable (or makes
// it disappear) passes the type tests unnoticed. This script catches that.
//
// It compiles `error-snapshots/probes.ts` with every compiler `test:type` uses,
// groups the diagnostics under the probe case (the exported declaration) they
// fall in, and compares the result with `error-snapshots/snapshot.txt`. A case
// with no diagnostics is recorded as `(no error)`. Line and column numbers are
// dropped so editing a probe's comment does not churn the snapshot.
//
// The text has been identical on every supported compiler, so one snapshot is
// shared. If a version legitimately differs, commit `snapshot.ts<version>.txt`
// (e.g. `snapshot.ts5.4.txt`) and that version is compared against it instead.
//
// `--update` rewrites the snapshots. It refuses when versions sharing a
// snapshot disagree, since picking one would hide the difference.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const probeDir = join(packageRoot, 'error-snapshots')
const probeFile = 'probes.ts'

/** A `Map`, not an object: integer-like keys such as `7` would sort first. */
const compilers = new Map([
	['5.4', 'ts-5.4'],
	['5.5', 'ts-5.5'],
	['5.6', 'ts-5.6'],
	['6.0', 'ts-6.0'],
	['7', 'typescript'],
])

function parseArgs(argv) {
	const args = { update: false, ts: [...compilers.keys()] }
	for (let i = 0; i < argv.length; i++) {
		if (argv[i] === '--update') args.update = true
		else if (argv[i] === '--ts') args.ts = argv[++i].split(',')
		else throw new Error(`unknown argument ${argv[i]}`)
	}
	for (const v of args.ts) {
		if (!compilers.has(v)) throw new Error(`unknown TS version ${v}; known: ${[...compilers.keys()].join(', ')}`)
	}
	return args
}

/** `console` is banned by the lint rules; this is a CLI script, so it writes directly. */
function print(line) {
	process.stdout.write(`${line}\n`)
}

/** The probe cases: each exported declaration's name and first line (1-based). */
function readCases() {
	const lines = readFileSync(join(probeDir, probeFile), 'utf8').split(/\r?\n/)
	const cases = []
	for (const [i, line] of lines.entries()) {
		const m = /^export\s+(?:declare\s+)?(?:const|let|type|interface|function)\s+([\w$]+)/.exec(line)
		if (m) cases.push({ name: m[1], line: i + 1, diagnostics: [] })
	}
	return cases
}

function compile(version) {
	const tsc = join(packageRoot, 'node_modules', compilers.get(version), 'bin', 'tsc')
	try {
		return execFileSync(tsc, ['-p', '.', '--pretty', 'false', '--noEmit'], { cwd: probeDir, encoding: 'utf8' })
	} catch (e) {
		if (e.stdout === undefined) throw e
		return e.stdout
	}
}

/**
 * Turns raw `tsc --pretty false` output into the snapshot text.
 * A diagnostic starts with `file(line,col): error TSxxxx: ...`; its message
 * chain continues on the following indented lines.
 */
function render(output) {
	const cases = readCases()
	const outside = []
	let current
	for (const raw of output.replace(/\r\n?/g, '\n').replaceAll(probeDir, '<probes>').split('\n')) {
		if (raw.trim() === '') continue
		const m = /^(.*)\((\d+),\d+\): (error TS\d+: .*)$/.exec(raw)
		if (m) {
			const file = m[1].replaceAll('\\', '/')
			const owner = file === probeFile ? cases.findLast((c) => c.line <= Number(m[2])) : undefined
			current = owner ? owner.diagnostics : outside
			current.push(owner ? m[3] : `${file}: ${m[3]}`)
		} else if (current && /^\s/.test(raw)) {
			current.push(raw.trimEnd())
		} else {
			outside.push(raw.trimEnd())
		}
	}
	const sections = cases.map((c) => [`## ${c.name}`, ...(c.diagnostics.length ? c.diagnostics : ['(no error)'])])
	if (outside.length) sections.push(['## (outside any probe case)', ...outside])
	return `${sections.map((s) => s.join('\n')).join('\n\n')}\n`
}

/** A minimal line diff: good enough for short snapshots, and it needs no dependency. */
function diff(expected, actual) {
	const a = expected.split('\n')
	const b = actual.split('\n')
	const lcs = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))
	for (let i = a.length - 1; i >= 0; i--)
		for (let j = b.length - 1; j >= 0; j--)
			lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1])
	const out = []
	let i = 0
	let j = 0
	while (i < a.length || j < b.length) {
		if (i < a.length && j < b.length && a[i] === b[j]) out.push(`  ${a[i++]}`), j++
		else if (i < a.length && (j === b.length || lcs[i + 1][j] >= lcs[i][j + 1])) out.push(`- ${a[i++]}`)
		else out.push(`+ ${b[j++]}`)
	}
	return out.join('\n')
}

const args = parseArgs(process.argv.slice(2))
const results = args.ts.map((version) => {
	const own = `snapshot.ts${version}.txt`
	const name = existsSync(join(probeDir, own)) ? own : 'snapshot.txt'
	const path = join(probeDir, name)
	const expected = existsSync(path) ? readFileSync(path, 'utf8').replace(/\r\n?/g, '\n') : undefined
	return { version, name, path, expected, actual: render(compile(version)) }
})

if (args.update) {
	// Every version sharing a file must agree, or rewriting it would hide a difference.
	const byFile = new Map()
	for (const r of results) byFile.set(r.name, [...(byFile.get(r.name) ?? []), r])
	for (const [name, group] of byFile) {
		const [first, ...rest] = group
		const other = rest.find((r) => r.actual !== first.actual)
		if (other) {
			print(
				`TS ${other.version} and TS ${first.version} disagree, so ${name} was not updated (- TS ${first.version}, + TS ${other.version}):`,
			)
			print(diff(first.actual, other.actual))
			print('')
			print(`If the difference is legitimate, write TS ${other.version}'s output to snapshot.ts${other.version}.txt.`)
			process.exit(1)
		}
		if (first.actual === first.expected) print(`${name}: unchanged`)
		else {
			writeFileSync(first.path, first.actual)
			print(`${name}: updated from TS ${group.map((r) => r.version).join(', ')}`)
		}
	}
} else {
	let failed = false
	for (const { version, name, expected, actual } of results) {
		if (actual === expected) {
			print(`TS ${version}: matches ${name}`)
			continue
		}
		failed = true
		print(`TS ${version}: error text differs from ${name} (- snapshot, + TS ${version}):`)
		print(expected === undefined ? `${name} does not exist` : diff(expected, actual))
	}
	if (failed) {
		print('')
		print('If the new text is intended, run `pnpm --filter type-plus test:errors --update`.')
		process.exit(1)
	}
}
