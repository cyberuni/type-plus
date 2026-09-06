/**
 * ⚗️ *transform*
 *
 * Filter entries matching `Criteria` in tuple `T`.
 *
 * @example
 * ```ts
 * type R = TuplePlus.Filter<[1, 2, '3'], number> // [1, 2]
 * type R = TuplePlus.Filter<[1, 2, '3'], true> // []
 * ```
 */
export type Filter<T extends readonly unknown[], Criteria = true> = T['length'] extends 0
	? []
	: T extends readonly [infer Head, ...infer Tail]
		? Tail['length'] extends 0
			? Head extends Criteria
				? [Head]
				: []
			: Head extends Criteria
				? [Head, ...Filter<Tail, Criteria>]
				: Filter<Tail, Criteria>
		: never
