import type { $Fn } from '../$type/fn/$fn.js'
import type { _Exclude } from '../tuple/tuple-plus.drop-match.js'

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
	? _DropMatch<A, Criteria>
	: [Criteria] extends [infer F extends $Fn]
		? _Fn<A, F>
		: _DropMatch<A, Criteria>

export namespace DropMatch {}

type _DropMatch<A extends Readonly<Array<unknown>>, Criteria> = A[0] extends Criteria
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

type _Fn<A extends Readonly<Array<unknown>>, F extends $Fn> = _Exclude<A[number], F> extends infer R
	? [R] extends [never]
		? never[]
		: Array<R>
	: never
