import type { $Fn } from '../$type/fn/$fn.js'
import type { IsEqual } from '../equal/is_equal.js'
import type { CanAssign } from '../index.js'
import type { Tail } from '../tuple/tail.js'
import type { UnionOfValues } from './union_of_values.js'

/**
 * Determines whether the array type `A` contains any elements that satisfies the specified `Criteria` type.
 *
 * It operates in `loose` mode by default,
 * which means literal types satisfies their widened counterparts.
 *
 * You can also change it to `strict` mode.
 *
 * `Criteria` can also be a type function (`$Fn`):
 * an element satisfies it when the function returns `true`, and `Mode` does not apply.
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
 * Some<['a', true], boolean, 'strict'> // false
 *
 * Some<[1, { a: 1 }], IsObject.$Fn> // true
 * Some<[1, { a: 1 }], IsObject.$Fn<{ exact: true }>> // false
 * ```
 */
export type Some<
	A extends readonly unknown[],
	Criteria,
	Mode extends 'strict' | 'loose' = 'loose',
	Then = true,
	Else = false,
> = [Criteria] extends [never]
	? Some._Mode<A, Criteria, Mode, Then, Else>
	: [Criteria] extends [infer F extends $Fn]
		? Some._Fn<A, F, Then, Else>
		: Some._Mode<A, Criteria, Mode, Then, Else>

export namespace Some {
	export type _Mode<A extends readonly unknown[], Criteria, Mode, Then, Else> = Mode extends 'strict'
		? Strict<A, Criteria, Then, Else>
		: Loose<A, Criteria, Then, Else>

	export type _Fn<A extends readonly unknown[], F extends $Fn, Then, Else> = number extends A['length']
		? _FnArray<A[number], F, Then, Else>
		: _FnTuple<A, F, Then, Else>

	export type _FnArray<E, F extends $Fn, Then, Else> = [E] extends [never]
		? $Fn._Test<E, F> extends true
			? Then
			: Else
		: E extends unknown
			? $Fn._Test<E, F> extends true
				? Then
				: Else
			: never

	export type _FnTuple<A extends readonly unknown[], F extends $Fn, Then, Else> = A['length'] extends 0
		? Else
		: $Fn._Test<A[0], F> extends true
			? Then
			: _FnTuple<Tail<A>, F, Then, Else>

	export type Strict<A extends readonly unknown[], Criteria, Then, Else> = number extends A['length']
		? StrictArray<A, Criteria, Then, Else>
		: StrictTuple<A, Criteria, Then, Else>

	export type StrictArray<A extends readonly unknown[], Criteria, Then, Else> = IsEqual<
		UnionOfValues<A>,
		Criteria,
		Then,
		Else
	>

	export type StrictTuple<A extends readonly unknown[], Criteria, Then, Else> = A['length'] extends 0
		? Else
		: IsEqual<A[0], Criteria> extends true
			? Then
			: StrictTuple<Tail<A>, Criteria, Then, Else>

	export type Loose<A extends readonly unknown[], Criteria, Then, Else> = number extends A['length']
		? LooseArray<A, Criteria, Then, Else>
		: LooseTuple<A, Criteria, Then, Else>

	export type LooseArray<A extends readonly unknown[], Criteria, Then, Else> = CanAssign<
		UnionOfValues<A>,
		Criteria,
		Then,
		Else
	>

	export type LooseTuple<A extends readonly unknown[], Criteria, Then, Else> = A['length'] extends 0
		? Else
		: A[0] extends Criteria
			? Then
			: LooseTuple<Tail<A>, Criteria, Then, Else>
}
