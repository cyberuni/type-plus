import type { Filter as FilterTuple } from '../tuple/tuple_plus.filter.js'
import type { Filter as FilterArray } from './array_plus.filter.js'

/**
 * ⚗️ *transform*
 *
 * Filter the array or tuple `A`, keeping entries satisfying `Criteria`.
 *
 * `Criteria` is either a type, matched with `extends`,
 * or a type function (`$Fn`), which matches when it returns `true`.
 *
 * @example
 * ```ts
 * type R = Filter<[1, 2, '3'], number> // [1, 2]
 * type R = Filter<Array<string | undefined>, string> // string[]
 * type R = Filter<Array<1 | { a: 1 }>, IsObject.$Fn> // Array<{ a: 1 }>
 * ```
 */
export type Filter<A extends readonly unknown[], Criteria> = number extends A['length']
	? FilterArray<A, Criteria>
	: FilterTuple<A, Criteria>

/**
 * ⚗️ *transform*
 * 👽 *alias*
 *
 * Keeps entries satisfying `Criteria` in array or tuple `A`.
 *
 * @alias of [Filter](./filter.ts)
 * @deprecated Use `Filter`, the same type under its primary name.
 * `KeepMatch` will be removed in a future major.
 * @example
 * ```ts
 * type R = KeepMatch<[1, 2, 3], number> // [1, 2, 3]
 * type R = KeepMatch<Array<string|undefined>, string> // string[]
 * ```
 */
export type KeepMatch<A extends readonly unknown[], Criteria> = Filter<A, Criteria>
