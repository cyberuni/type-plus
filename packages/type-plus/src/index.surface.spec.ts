import { resolve } from 'node:path'
import ts from 'ts-6.0'
import { expect, it } from 'vitest'

/**
 * The names reachable from the package entry, namespace members included, that follow the
 * helper naming convention: a leading `_`, or `$UtilOptions`.
 *
 * Helpers are implementation details. They live as unexported module-level types
 * (or in `_*.ts` files the entry does not re-export), so renaming one is not a breaking change.
 */
function listExposedHelpers() {
	// vitest runs from the package root.
	const entry = resolve('src/index.ts')
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

it('exposes no implementation helpers', () => {
	expect(listExposedHelpers()).toEqual([])
}, 60_000)
