import type { _FnTest } from '../$type/fn/_fn-test.js'
import type { $Fn } from '../$type/fn/$fn.js'
import type { IsTuple } from '../tuple/is-tuple.js'

/**
 * 🦴 *utilities*
 *
 * Gets the last type in the array or tuple that matches the `Criteria`.
 *
 * If the `Criteria` is not met, it will return `never'.
 *
 * For `Array<T>`, it will return `T | undefined` if `T` satisfies `Criteria`.
 *
 * `Criteria` is either a type, which an entry matches when it `extends` it,
 * or a type function (`$Fn`), which an entry matches when the function returns `true`.
 * With a type function, a union entry is matched one member at a time, as in `Find`:
 * the matching members are the result, and an entry with none is skipped.
 *
 * Pass `IsEqual.$Fn<X>` to match an entry exactly (strict mode):
 * `number` then does not match `1`, and `1` does not match `number`.
 *
 * @example
 * ```ts
 * FindLast<Array<1 | 2 | 'x'>, number> // 1 | 2 | undefined
 *
 * FindLast<[true, 123, 'x', 321], number> // 321
 *
 * FindLast<[1, 'x', { a: 1 }, 2], IsObject.$Fn> // { a: 1 }
 *
 * FindLast<[1, number, 2], IsEqual.$Fn<1>> // 1
 * ```
 */
export type FindLast<A extends readonly unknown[], Criteria> = [Criteria] extends [never]
	? _FindLast<A, Criteria>
	: [Criteria] extends [infer F extends $Fn]
		? _Fn<A, F>
		: _FindLast<A, Criteria>

export namespace FindLast {}

type _FindLast<A extends readonly unknown[], Criteria> = IsTuple<
	A,
	{
		$then: A['length'] extends 0
			? never
			: A extends readonly [...infer Heads, infer Last]
				? Last extends Criteria
					? Last
					: _FindLast<Heads, Criteria>
				: never
		$else: A extends Readonly<Array<infer T>> ? (T extends Criteria ? T | undefined : never) : never
	}
>

type _Fn<A extends readonly unknown[], F extends $Fn> = IsTuple<
	A,
	{
		$then: A['length'] extends 0
			? never
			: A extends readonly [...infer Heads, infer Last]
				? _Keep<Last, F> extends infer R
					? [R] extends [never]
						? _Fn<Heads, F>
						: R
					: never
				: never
		$else: A extends Readonly<Array<infer T>>
			? _Keep<T, F> extends infer R
				? [R] extends [never]
					? never
					: R | undefined
				: never
			: never
	}
>

/**
 * The members of `T` that the type function `F` matches.
 */
type _Keep<T, F extends $Fn> = T extends unknown ? (_FnTest<T, F> extends true ? T : never) : never
