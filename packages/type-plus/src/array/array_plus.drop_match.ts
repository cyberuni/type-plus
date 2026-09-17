import type { $Fn } from '../$type/fn/$fn.js'
import type { DropMatch as TupleDropMatch } from '../tuple/tuple_plus.drop_match.js'

/**
 * ⚗️ *transform*
 *
 * Drops the element types matching `Criteria` from array `A`.
 *
 * `Criteria` is either a type, which an element type matches when it `extends` it,
 * or a type function (`$Fn`), which a member of the element type matches when the function returns `true`.
 *
 * @example
 * ```ts
 * type R = ArrayPlus.DropMatch<Array<string | undefined>, undefined> // string[]
 * type R = ArrayPlus.DropMatch<Array<string | { a: 1 }>, IsObject.$Fn> // string[]
 * type R = ArrayPlus.DropMatch<Array<{ a: 1 }>, IsObject.$Fn> // never[]
 * ```
 */
export type DropMatch<A extends Readonly<Array<unknown>>, Criteria> = [Criteria] extends [never]
	? DropMatch._<A, Criteria>
	: [Criteria] extends [infer F extends $Fn]
		? DropMatch._Fn<A, F>
		: DropMatch._<A, Criteria>

export namespace DropMatch {
	export type _<A extends Readonly<Array<unknown>>, Criteria> = A[0] extends Criteria
		? never[]
		: undefined extends Criteria
			? null extends Criteria
				? Array<NonNullable<A[0]>>
				: Array<Exclude<A[0], undefined>>
			: null extends Criteria
				? Array<Exclude<A[0], null>>
				: Criteria extends A[0]
					? Array<Exclude<A[0], Criteria>>
					: A[0] extends Criteria
						? A
						: Array<Exclude<A[0], Criteria>>

	export type _Fn<A extends Readonly<Array<unknown>>, F extends $Fn> = TupleDropMatch._Exclude<
		A[number],
		F
	> extends infer R
		? [R] extends [never]
			? never[]
			: Array<R>
		: never
}
