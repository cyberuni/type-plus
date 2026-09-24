import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { _FnTest } from '../$type/fn/_fn_test.js'
import type { $Fn } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsEqual } from '../equal/is_equal.js'
import type { Assignable } from '../predicates/assignable.js'
import type { Tail } from '../tuple/tail.js'
import type { UnionOfValues } from './union_of_values.js'

/**
 * Determines whether the array type `A` contains any elements that satisfies the specified `Criteria` type.
 *
 * It operates in `loose` mode by default,
 * which means literal types satisfies their widened counterparts.
 *
 * You can also change it to `strict` mode with `{ mode: 'strict' }`,
 * where an element must equal `Criteria` exactly.
 *
 * `Criteria` can also be a type function (`$Fn`):
 * an element satisfies it when the function returns `true`, and `mode` does not apply.
 * For an array, each member of the element union is checked,
 * so a mixed union gives `boolean` as the loose mode does.
 *
 * 🦴 *utilities*
 *
 * @example
 * ```ts
 * Some<string[], string> // true
 * Some<['a', boolean], boolean> // true
 * Some<['a', true], boolean> //true
 *
 * Some<['a', true], boolean, { mode: 'strict' }> // false
 *
 * Some<[1, { a: 1 }], IsObject.$Fn> // true
 * Some<[1, { a: 1 }], IsObject.$Fn<{ exact: true }>> // false
 * ```
 *
 * `mode` is an option rather than a positional parameter,
 * so it sits beside `selection` and the branch overrides in the one `$O` object.
 * Before 8.0.0 it was the third positional parameter: `Some<A, Criteria, 'strict'>`.
 *
 * 🔢 *customize*
 *
 * Filter to ensure some element of `A` satisfies `Criteria`, returning `A` or `never`.
 *
 * @example
 * ```ts
 * type R = Some<[1, 'a'], string, { selection: 'filter' }> // [1, 'a']
 * type R = Some<[1, 2], string, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Override the branches directly.
 *
 * @example
 * ```ts
 * type R = Some<[1, 'a'], string, { $then: 'yes'; $else: 'no' }> // 'yes'
 * type R = Some<[1, 2], string, { $then: 'yes'; $else: 'no' }> // 'no'
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = Some<[1, 'a'], string, Some.$Branch> // $Then
 * type R = Some<[1, 2], string, Some.$Branch> // $Else
 * ```
 */
export type Some<A extends readonly unknown[], Criteria, $O extends $StrictOptions<$O, Some.$Options> = {}> = _Some<
	A,
	Criteria,
	$O['mode'],
	{ $then: $ResolveBranch<$O, [$Then], A>; $else: $ResolveBranch<$O, [$Else]> }
>

export namespace Some {
	export interface $Options extends $Selection.Options {
		/**
		 * How an element is matched against `Criteria`.
		 *
		 * `loose` (the default) checks assignability, so a literal satisfies its widened type.
		 * `strict` checks equality, so an element must be exactly `Criteria`.
		 *
		 * It does not apply when `Criteria` is a type function.
		 *
		 * Written `loose` first so every supported compiler prints the union in the same order,
		 * which the error snapshot pins.
		 */
		mode?: 'loose' | 'strict' | undefined
	}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}

/**
 * The two outcomes, already resolved from the caller's `$O`.
 *
 * The helpers below recurse on the tail of `A`,
 * so the filter subject has to be fixed to the whole `A` before they run.
 */
type _Branches = { $then: unknown; $else: unknown }

type _Some<A extends readonly unknown[], Criteria, Mode, $B extends _Branches> = [Criteria] extends [never]
	? _Mode<A, Criteria, Mode, $B>
	: [Criteria] extends [infer F extends $Fn]
		? _Fn<A, F, $B>
		: _Mode<A, Criteria, Mode, $B>

type _Mode<A extends readonly unknown[], Criteria, Mode, $B extends _Branches> = Mode extends 'strict'
	? _Strict<A, Criteria, $B>
	: _Loose<A, Criteria, $B>

type _Fn<A extends readonly unknown[], F extends $Fn, $B extends _Branches> = number extends A['length']
	? _FnArray<A[number], F, $B>
	: _FnTuple<A, F, $B>

type _FnArray<E, F extends $Fn, $B extends _Branches> = [E] extends [never]
	? _FnTest<E, F> extends true
		? $B['$then']
		: $B['$else']
	: E extends unknown
		? _FnTest<E, F> extends true
			? $B['$then']
			: $B['$else']
		: never

type _FnTuple<A extends readonly unknown[], F extends $Fn, $B extends _Branches> = A['length'] extends 0
	? $B['$else']
	: _FnTest<A[0], F> extends true
		? $B['$then']
		: _FnTuple<Tail<A>, F, $B>

type _Strict<A extends readonly unknown[], Criteria, $B extends _Branches> = number extends A['length']
	? _StrictArray<A, Criteria, $B>
	: _StrictTuple<A, Criteria, $B>

type _StrictArray<A extends readonly unknown[], Criteria, $B extends _Branches> = IsEqual<
	UnionOfValues<A>,
	Criteria,
	{ $then: $B['$then']; $else: $B['$else'] }
>

type _StrictTuple<A extends readonly unknown[], Criteria, $B extends _Branches> = A['length'] extends 0
	? $B['$else']
	: IsEqual<A[0], Criteria> extends true
		? $B['$then']
		: _StrictTuple<Tail<A>, Criteria, $B>

type _Loose<A extends readonly unknown[], Criteria, $B extends _Branches> = number extends A['length']
	? _LooseArray<A, Criteria, $B>
	: _LooseTuple<A, Criteria, $B>

type _LooseArray<A extends readonly unknown[], Criteria, $B extends _Branches> = Assignable<
	UnionOfValues<A>,
	Criteria,
	{ $then: $B['$then']; $else: $B['$else'] }
>

type _LooseTuple<A extends readonly unknown[], Criteria, $B extends _Branches> = A['length'] extends 0
	? $B['$else']
	: A[0] extends Criteria
		? $B['$then']
		: _LooseTuple<Tail<A>, Criteria, $B>
