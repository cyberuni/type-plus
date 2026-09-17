// Usage: node scripts/bench-instantiations.mjs [--uses N] [--ts 6.0,7] [name...]
//
// Measures how many type instantiations one use of a predicate costs.
//
// For each benchmarked type the script writes two files into a temporary
// directory: a bench file that declares `N` constants typed as the predicate
// applied to `N` distinct inputs, and a control file that declares the same
// inputs without the predicate. Both are compiled with
// `tsc --extendedDiagnostics`; the per-use cost is
// `(bench Instantiations - control Instantiations) / N`.
//
// The inputs must be distinct: TypeScript caches an instantiation by its type
// arguments, so reusing one input would measure the cache, not the type.
//
// The compilers are invoked through their `bin/tsc`, so `typescript` (v7, which
// exposes no compiler API to JS) is measured the same way as the pinned
// `ts-6.0` alias.
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(packageRoot, 'src')

const compilers = {
	5.4: 'ts-5.4',
	5.5: 'ts-5.5',
	5.6: 'ts-5.6',
	'6.0': 'ts-6.0',
	7: 'typescript',
}

/** Distinct inputs covering objects, primitives, tuples, functions and unions. */
function input(i) {
	switch (i % 6) {
		case 0:
			return `{ k${i}: ${i} }`
		case 1:
			return `'s${i}'`
		case 2:
			return `${i}`
		case 3:
			return `[${i}, 's${i}']`
		case 4:
			return `{ k${i}: ${i} } | ${i}`
		default:
			return `() => ${i}`
	}
}

/** A second distinct input, for types taking two parameters. */
function target(i) {
	switch (i % 3) {
		case 0:
			return `{ k${i}: number }`
		case 1:
			return `'s${i}' | ${i}`
		default:
			return `[number, string] | 't${i}'`
	}
}

/** A distinct 10-entry tuple, for the collection types. */
function tuple(i) {
	return `[${Array.from({ length: 10 }, (_, k) => input(i * 10 + k)).join(', ')}]`
}

/** A collection-type bench: `use` is the type applied to the tuple, with `TuplePlus`, `IsObject` and `$Fn` in scope. */
function collection(use) {
	return {
		imports: [
			['* as TuplePlus', 'tuple/tuple_plus.js'],
			['{ IsObject }', 'object/is_object.js'],
			['{ $Fn }', '$type/fn/$fn.js'],
		],
		use: (i) => use(tuple(i)),
		inputs: (i) => [tuple(i)],
	}
}

const benches = {
	// `Filter._` is the plain-type filter as it was before `Filter` accepted a `$Fn`.
	'Filter._+object': collection((t) => `TuplePlus.Filter._<${t}, object>`),
	'Filter+object': collection((t) => `TuplePlus.Filter<${t}, object>`),
	'Filter+IsObject.$Fn': collection((t) => `TuplePlus.Filter<${t}, IsObject.$Fn>`),
	'Filter+IsObject.$Fn+exact': collection((t) => `TuplePlus.Filter<${t}, IsObject.$Fn<{ exact: true }>>`),
	'Filter+Not<IsObject.$Fn>': collection((t) => `TuplePlus.Filter<${t}, $Fn.Not<IsObject.$Fn>>`),
	'Find+object': collection((t) => `TuplePlus.Find<${t}, object>`),
	'Find+IsObject.$Fn': collection((t) => `TuplePlus.Find<${t}, IsObject.$Fn>`),
	'DropMatch+object': collection((t) => `TuplePlus.DropMatch<${t}, object>`),
	'DropMatch+IsObject.$Fn': collection((t) => `TuplePlus.DropMatch<${t}, IsObject.$Fn>`),
	IsAny: { from: 'any/is_any.js', use: (i) => `IsAny<${input(i)}>`, inputs: (i) => [input(i)] },
	IsNever: { from: 'never/is_never.js', use: (i) => `IsNever<${input(i)}>`, inputs: (i) => [input(i)] },
	IsUnknown: { from: 'unknown/is_unknown.js', use: (i) => `IsUnknown<${input(i)}>`, inputs: (i) => [input(i)] },
	IsVoid: { from: 'void/is_void.js', use: (i) => `IsVoid<${input(i)}>`, inputs: (i) => [input(i)] },
	IsObject: { from: 'object/is_object.js', use: (i) => `IsObject<${input(i)}>`, inputs: (i) => [input(i)] },
	IsString: { from: 'string/is_string.js', use: (i) => `IsString<${input(i)}>`, inputs: (i) => [input(i)] },
	Assignable: {
		from: 'predicates/assignable.js',
		use: (i) => `Assignable<${input(i)}, ${target(i)}>`,
		inputs: (i) => [input(i), target(i)],
	},
	'IsObject+exact': {
		from: 'object/is_object.js',
		type: 'IsObject',
		use: (i) => `IsObject<${input(i)}, { exact: true }>`,
		inputs: (i) => [input(i)],
	},
	'Assignable+object': {
		from: 'predicates/assignable.js',
		type: 'Assignable',
		use: (i) => `Assignable<${input(i)}, object>`,
		inputs: (i) => [input(i)],
	},
	'Assignable+object+nondistributive': {
		from: 'predicates/assignable.js',
		type: 'Assignable',
		use: (i) => `Assignable<${input(i)}, object, { distributive: false }>`,
		inputs: (i) => [input(i)],
	},
	IsPositive: { from: 'numeric/is_positive.js', use: (i) => `IsPositive<${input(i)}>`, inputs: (i) => [input(i)] },
	'IsPositive+filter': {
		from: 'numeric/is_positive.js',
		type: 'IsPositive',
		use: (i) => `IsPositive<${input(i)}, { selection: 'filter' }>`,
		inputs: (i) => [input(i)],
	},
	IsNotPositive: {
		from: 'numeric/is_not_positive.js',
		use: (i) => `IsNotPositive<${input(i)}>`,
		inputs: (i) => [input(i)],
	},
	'IsNotPositive+filter': {
		from: 'numeric/is_not_positive.js',
		type: 'IsNotPositive',
		use: (i) => `IsNotPositive<${input(i)}, { selection: 'filter' }>`,
		inputs: (i) => [input(i)],
	},
	IsNegative: { from: 'numeric/is_negative.js', use: (i) => `IsNegative<${input(i)}>`, inputs: (i) => [input(i)] },
	'IsNegative+filter': {
		from: 'numeric/is_negative.js',
		type: 'IsNegative',
		use: (i) => `IsNegative<${input(i)}, { selection: 'filter' }>`,
		inputs: (i) => [input(i)],
	},
	IsNotNegative: {
		from: 'numeric/is_not_negative.js',
		use: (i) => `IsNotNegative<${input(i)}>`,
		inputs: (i) => [input(i)],
	},
	'IsNotNegative+filter': {
		from: 'numeric/is_not_negative.js',
		type: 'IsNotNegative',
		use: (i) => `IsNotNegative<${input(i)}, { selection: 'filter' }>`,
		inputs: (i) => [input(i)],
	},
	IsInteger: { from: 'numeric/is_integer.js', use: (i) => `IsInteger<${input(i)}>`, inputs: (i) => [input(i)] },
	'IsInteger+filter': {
		from: 'numeric/is_integer.js',
		type: 'IsInteger',
		use: (i) => `IsInteger<${input(i)}, { selection: 'filter' }>`,
		inputs: (i) => [input(i)],
	},
	IsNotInteger: {
		from: 'numeric/is_not_integer.js',
		use: (i) => `IsNotInteger<${input(i)}>`,
		inputs: (i) => [input(i)],
	},
	'IsNotInteger+filter': {
		from: 'numeric/is_not_integer.js',
		type: 'IsNotInteger',
		use: (i) => `IsNotInteger<${input(i)}, { selection: 'filter' }>`,
		inputs: (i) => [input(i)],
	},
	'IsPositive+exact': {
		from: 'numeric/is_positive.js',
		type: 'IsPositive',
		use: (i) => `IsPositive<${input(i)}, { exact: true }>`,
		inputs: (i) => [input(i)],
	},
	'IsNegative+exact': {
		from: 'numeric/is_negative.js',
		type: 'IsNegative',
		use: (i) => `IsNegative<${input(i)}, { exact: true }>`,
		inputs: (i) => [input(i)],
	},
	'IsInteger+exact': {
		from: 'numeric/is_integer.js',
		type: 'IsInteger',
		use: (i) => `IsInteger<${input(i)}, { exact: true }>`,
		inputs: (i) => [input(i)],
	},
	'IsNotPositive+exact': {
		from: 'numeric/is_not_positive.js',
		type: 'IsNotPositive',
		use: (i) => `IsNotPositive<${input(i)}, { exact: true }>`,
		inputs: (i) => [input(i)],
	},
	'IsNotNegative+exact': {
		from: 'numeric/is_not_negative.js',
		type: 'IsNotNegative',
		use: (i) => `IsNotNegative<${input(i)}, { exact: true }>`,
		inputs: (i) => [input(i)],
	},
	'IsNotInteger+exact': {
		from: 'numeric/is_not_integer.js',
		type: 'IsNotInteger',
		use: (i) => `IsNotInteger<${input(i)}, { exact: true }>`,
		inputs: (i) => [input(i)],
	},
	IsPositiveLiteral: {
		from: 'numeric/is_positive_literal.js',
		use: (i) => `IsPositiveLiteral<${input(i)}>`,
		inputs: (i) => [input(i)],
	},
	'IsPositiveLiteral+filter': {
		from: 'numeric/is_positive_literal.js',
		type: 'IsPositiveLiteral',
		use: (i) => `IsPositiveLiteral<${input(i)}, { selection: 'filter' }>`,
		inputs: (i) => [input(i)],
	},
	IsNegativeLiteral: {
		from: 'numeric/is_negative_literal.js',
		use: (i) => `IsNegativeLiteral<${input(i)}>`,
		inputs: (i) => [input(i)],
	},
	'IsNegativeLiteral+filter': {
		from: 'numeric/is_negative_literal.js',
		type: 'IsNegativeLiteral',
		use: (i) => `IsNegativeLiteral<${input(i)}, { selection: 'filter' }>`,
		inputs: (i) => [input(i)],
	},
	IsIntegerLiteral: {
		from: 'numeric/is_integer_literal.js',
		use: (i) => `IsIntegerLiteral<${input(i)}>`,
		inputs: (i) => [input(i)],
	},
	'IsIntegerLiteral+filter': {
		from: 'numeric/is_integer_literal.js',
		type: 'IsIntegerLiteral',
		use: (i) => `IsIntegerLiteral<${input(i)}, { selection: 'filter' }>`,
		inputs: (i) => [input(i)],
	},
	IsNotPositiveLiteral: {
		from: 'numeric/is_not_positive_literal.js',
		use: (i) => `IsNotPositiveLiteral<${input(i)}>`,
		inputs: (i) => [input(i)],
	},
	'IsNotPositiveLiteral+filter': {
		from: 'numeric/is_not_positive_literal.js',
		type: 'IsNotPositiveLiteral',
		use: (i) => `IsNotPositiveLiteral<${input(i)}, { selection: 'filter' }>`,
		inputs: (i) => [input(i)],
	},
	IsNotNegativeLiteral: {
		from: 'numeric/is_not_negative_literal.js',
		use: (i) => `IsNotNegativeLiteral<${input(i)}>`,
		inputs: (i) => [input(i)],
	},
	'IsNotNegativeLiteral+filter': {
		from: 'numeric/is_not_negative_literal.js',
		type: 'IsNotNegativeLiteral',
		use: (i) => `IsNotNegativeLiteral<${input(i)}, { selection: 'filter' }>`,
		inputs: (i) => [input(i)],
	},
	IsNotIntegerLiteral: {
		from: 'numeric/is_not_integer_literal.js',
		use: (i) => `IsNotIntegerLiteral<${input(i)}>`,
		inputs: (i) => [input(i)],
	},
	'IsNotIntegerLiteral+filter': {
		from: 'numeric/is_not_integer_literal.js',
		type: 'IsNotIntegerLiteral',
		use: (i) => `IsNotIntegerLiteral<${input(i)}, { selection: 'filter' }>`,
		inputs: (i) => [input(i)],
	},
	'IsPositive+$any': {
		from: 'numeric/is_positive.js',
		type: 'IsPositive',
		use: (i) => `IsPositive<${input(i)}, { $any: 1 }>`,
		inputs: (i) => [input(i)],
	},
	'IsNotInteger+$any': {
		from: 'numeric/is_not_integer.js',
		type: 'IsNotInteger',
		use: (i) => `IsNotInteger<${input(i)}, { $any: 1 }>`,
		inputs: (i) => [input(i)],
	},
	IsNotAny: { from: 'any/is_not_any.js', use: (i) => `IsNotAny<${input(i)}>`, inputs: (i) => [input(i)] },
	IsNotNever: { from: 'never/is_not_never.js', use: (i) => `IsNotNever<${input(i)}>`, inputs: (i) => [input(i)] },
	IsNotUnknown: {
		from: 'unknown/is_not_unknown.js',
		use: (i) => `IsNotUnknown<${input(i)}>`,
		inputs: (i) => [input(i)],
	},
	IsNotVoid: { from: 'void/is_not_void.js', use: (i) => `IsNotVoid<${input(i)}>`, inputs: (i) => [input(i)] },
	IsNotObject: { from: 'object/is_not_object.js', use: (i) => `IsNotObject<${input(i)}>`, inputs: (i) => [input(i)] },
	IsNotString: { from: 'string/is_not_string.js', use: (i) => `IsNotString<${input(i)}>`, inputs: (i) => [input(i)] },
	NotAssignable: {
		from: 'predicates/not_assignable.js',
		use: (i) => `NotAssignable<${input(i)}, ${target(i)}>`,
		inputs: (i) => [input(i), target(i)],
	},
}

function parseArgs(argv) {
	const args = { uses: 300, ts: ['6.0', '7'], names: [] }
	for (let i = 0; i < argv.length; i++) {
		if (argv[i] === '--uses') args.uses = Number(argv[++i])
		else if (argv[i] === '--ts') args.ts = argv[++i].split(',')
		else args.names.push(argv[i])
	}
	if (args.names.length === 0) args.names = Object.keys(benches)
	return args
}

function writeProject(dir, name, bench, uses, withPredicate) {
	const imports = bench.imports ?? [[`{ ${bench.type ?? name} }`, bench.from]]
	const lines = imports.map(([names, from]) => `import type ${names} from '${join(src, from)}'`)
	for (let i = 0; i < uses; i++) {
		if (withPredicate) lines.push(`export declare const r${i}: ${bench.use(i)}`)
		else for (const [j, t] of bench.inputs(i).entries()) lines.push(`export declare const r${i}_${j}: ${t}`)
	}
	writeFileSync(join(dir, 'index.ts'), `${lines.join('\n')}\n`)
}

function instantiations(dir, version) {
	const tsc = join(packageRoot, 'node_modules', compilers[version], 'bin', 'tsc')
	let out
	try {
		out = execFileSync(tsc, ['-p', dir, '--extendedDiagnostics'], { encoding: 'utf8' })
	} catch (e) {
		throw new Error(`tsc ${version} failed in ${dir}:\n${e.stdout}`)
	}
	return Number(/Instantiations:\s+(\d+)/.exec(out)[1])
}

/** `console` is banned by the lint rules; this is a CLI script, so it writes directly. */
function print(line) {
	process.stdout.write(`${line}\n`)
}

const args = parseArgs(process.argv.slice(2))
const dir = mkdtempSync(join(tmpdir(), 'type-plus-bench-'))
try {
	writeFileSync(join(dir, 'package.json'), '{ "type": "module" }\n')
	writeFileSync(
		join(dir, 'tsconfig.json'),
		JSON.stringify({
			compilerOptions: {
				module: 'nodenext',
				moduleResolution: 'nodenext',
				strict: true,
				noEmit: true,
				skipLibCheck: true,
				lib: ['ES2022'],
				types: [],
			},
			files: ['index.ts'],
		}),
	)
	print(`| Type | ${args.ts.map((v) => `TS ${v}`).join(' | ')} |`)
	print(`|---|${args.ts.map(() => '---:').join('|')}|`)
	for (const name of args.names) {
		const bench = benches[name]
		if (!bench) throw new Error(`unknown bench ${name}; known: ${Object.keys(benches).join(', ')}`)
		const costs = args.ts.map((version) => {
			writeProject(dir, name, bench, args.uses, false)
			const control = instantiations(dir, version)
			writeProject(dir, name, bench, args.uses, true)
			const measured = instantiations(dir, version)
			return ((measured - control) / args.uses).toFixed(1)
		})
		print(`| \`${name}\` | ${costs.join(' | ')} |`)
	}
} finally {
	rmSync(dir, { recursive: true, force: true })
}
