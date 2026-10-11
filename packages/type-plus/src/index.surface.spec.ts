import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import ts from 'ts-6.0'
import { expect, it } from 'vitest'

/**
 * The names reachable from a package entry, namespace members included, that follow the
 * helper naming convention: a leading `_`, or `$UtilOptions`.
 *
 * Helpers are implementation details. They live as unexported module-level types
 * (or in `_*.ts` files the entry does not re-export), so renaming one is not a breaking change.
 */
function listExposedHelpers(path: string) {
	// vitest runs from the package root.
	const entry = resolve(path)
	const program = ts.createProgram([entry], {
		module: ts.ModuleKind.NodeNext,
		moduleResolution: ts.ModuleResolutionKind.NodeNext,
		noEmit: true,
		strict: true,
		types: [],
	})
	const checker = program.getTypeChecker()
	const found: string[] = []
	const seen = new Set<ts.Symbol>()
	function walk(container: ts.Symbol, path: string) {
		for (const exported of checker.getExportsOfModule(container)) {
			const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported
			const name = path ? `${path}.${exported.name}` : exported.name
			if (exported.name.startsWith('_') || exported.name === '$UtilOptions') found.push(name)
			if (symbol.flags & ts.SymbolFlags.Namespace && !seen.has(symbol)) {
				seen.add(symbol)
				walk(symbol, name)
			}
		}
	}
	walk(checker.getSymbolAtLocation(program.getSourceFile(entry)!)!, '')
	return found
}

/** The source file of each entry in the `exports` map of `package.json`, so a new entry is checked too. */
function listEntries() {
	const { exports } = JSON.parse(readFileSync(resolve('package.json'), 'utf8'))
	return Object.values<{ types?: string }>(exports).flatMap((target) =>
		target.types ? [target.types.replace(/^\.\/esm\/(.*)\.d\.ts$/, 'src/$1.ts')] : [],
	)
}

it('finds every entry', () => {
	expect(listEntries()).toEqual(['src/index.ts', 'src/testing/index.ts'])
})

it.each(listEntries())(
	'%s exposes no implementation helpers',
	(entry) => {
		expect(listExposedHelpers(entry)).toEqual([])
	},
	60_000,
)
