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

const benches = {
	IsAny: { from: 'any/is_any.js', use: (i) => `IsAny<${input(i)}>`, inputs: (i) => [input(i)] },
	IsNever: { from: 'never/is_never.js', use: (i) => `IsNever<${input(i)}>`, inputs: (i) => [input(i)] },
	IsUnknown: { from: 'unknown/is_unknown.js', use: (i) => `IsUnknown<${input(i)}>`, inputs: (i) => [input(i)] },
	IsObject: { from: 'object/is_object.js', use: (i) => `IsObject<${input(i)}>`, inputs: (i) => [input(i)] },
	IsString: { from: 'string/is_string.js', use: (i) => `IsString<${input(i)}>`, inputs: (i) => [input(i)] },
	Assignable: {
		from: 'predicates/assignable.js',
		use: (i) => `Assignable<${input(i)}, ${target(i)}>`,
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
	const lines = [`import type { ${name} } from '${join(src, bench.from)}'`]
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
