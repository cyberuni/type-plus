import type { IsTuple } from '../tuple/is_tuple.js'

/**
 * 🦴 *utilities*
 *
 * Gets the last type in the array or tuple that matches the `Criteria`.
 *
 * If the `Criteria` is not met, it will return `never'.
 *
 * For `Array<T>`, it will return `T | undefined` if `T` satisfies `Criteria`.
 *
 * @example
 * ```ts
 * FindLast<Array<1 | 2 | 'x'>, number> // 1 | 2 | undefined
 *
 * FindLast<[true, 123, 'x', 321], number> // 321
 * ```
 */
export type FindLast<A extends readonly unknown[], Criteria> = IsTuple<
	A,
	{
		$then: A['length'] extends 0
			? never
			: A extends readonly [...infer Heads, infer Last]
				? Last extends Criteria
					? Last
					: FindLast<Heads, Criteria>
				: never
		$else: A extends Readonly<Array<infer T>> ? (T extends Criteria ? T | undefined : never) : never
	}
>
