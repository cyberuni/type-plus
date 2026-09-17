import type { $Fn } from '../$type/fn/$fn.js'
import type { IsEqual } from '../equal/is_equal.js'

/**
 * ⚗️ *transform*
 *
 * Drops entries matching `Criteria` from tuple `A`.
 * A union entry drops only its matching members,
 * except the last entry, which is dropped only when it matches as a whole.
 *
 * `Criteria` is either a type, which a member matches when it `extends` it,
 * or a type function (`$Fn`), which a member matches when the function returns `true`.
 *
 * @example
 * ```ts
 * type R = TuplePlus.DropMatch<[1, 2, '3'], number> // ['3']
 * type R = TuplePlus.DropMatch<[1, object | 2, { a: 1 }], IsObject.$Fn> // [1, 2]
 * ```
 */
export type DropMatch<A extends Readonly<Array<unknown>>, Criteria> = [Criteria] extends [never]
	? DropMatch._<A, Criteria>
	: [Criteria] extends [infer F extends $Fn]
		? DropMatch._Fn<A, F>
		: DropMatch._<A, Criteria>

export namespace DropMatch {
	export type _<A extends Readonly<Array<unknown>>, Criteria> = A['length'] extends 0
		? // empty tuple
			A
		: A extends readonly [infer Head, ...infer Tail]
			? Tail['length'] extends 0
				? // single element tuple
					ExcludeUnionOfEmptyTuple<Head extends Criteria ? [] : [Head]>
				: // multiple elements
					Exclude<Head, Criteria> extends never
					? _<Tail, Criteria>
					: [Exclude<Head, Criteria>, ..._<Tail, Criteria>]
			: never[]

	export type _Fn<A extends Readonly<Array<unknown>>, F extends $Fn> = A['length'] extends 0
		? // empty tuple
			A
		: A extends readonly [infer Head, ...infer Tail]
			? Tail['length'] extends 0
				? // single element tuple
					ExcludeUnionOfEmptyTuple<$Fn._Test<Head, F> extends true ? [] : [Head]>
				: // multiple elements
					_Exclude<Head, F> extends infer R
					? [R] extends [never]
						? _Fn<Tail, F>
						: [R, ..._Fn<Tail, F>]
					: never
			: never[]

	/**
	 * The members of `T` that the type function `F` does not match.
	 */
	export type _Exclude<T, F extends $Fn> = T extends unknown ? ($Fn._Test<T, F> extends true ? never : T) : never

	export type ExcludeUnionOfEmptyTuple<A> = IsEqual<A, []> extends true ? A : Exclude<A, []>
}
