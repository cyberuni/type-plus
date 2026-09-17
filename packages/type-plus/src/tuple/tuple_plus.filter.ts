import type { $Fn } from '../$type/fn/$fn.js'

/**
 * ⚗️ *transform*
 *
 * Filter entries matching `Criteria` in tuple `T`.
 *
 * `Criteria` is either a type, which an entry matches when it `extends` it,
 * or a type function (`$Fn`), which an entry matches when the function returns `true`.
 *
 * @example
 * ```ts
 * type R = TuplePlus.Filter<[1, 2, '3'], number> // [1, 2]
 * type R = TuplePlus.Filter<[1, 2, '3'], true> // []
 *
 * type R = TuplePlus.Filter<[1, { a: 1 }, 'x', object], IsObject.$Fn<{ exact: true }>> // [object]
 * type R = TuplePlus.Filter<[1, { a: 1 }, 'x', object], $Fn.Not<IsObject.$Fn>> // [1, 'x']
 * ```
 */
export type Filter<T extends readonly unknown[], Criteria = true> = [Criteria] extends [never]
	? Filter._<T, Criteria>
	: [Criteria] extends [infer F extends $Fn]
		? Filter._Fn<T, F>
		: Filter._<T, Criteria>

export namespace Filter {
	export type _<T extends readonly unknown[], Criteria> = T['length'] extends 0
		? []
		: T extends readonly [infer Head, ...infer Tail]
			? Tail['length'] extends 0
				? Head extends Criteria
					? [Head]
					: []
				: Head extends Criteria
					? [Head, ..._<Tail, Criteria>]
					: _<Tail, Criteria>
			: never

	export type _Fn<T extends readonly unknown[], F extends $Fn> = T['length'] extends 0
		? []
		: T extends readonly [infer Head, ...infer Tail]
			? $Fn._Test<Head, F> extends true
				? [Head, ..._Fn<Tail, F>]
				: _Fn<Tail, F>
			: never
}
