import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { DropMatch as ArrayDropMatch } from '../array/array_plus.drop_match.js'
import type { TypePlusOptions } from '../utils/options.js'
import type { DropMatch as TupleDropMatch } from './tuple_plus.drop_match.js'

/**
 * ⚗️ *transform*
 * 🔢 *customizable*
 *
 * Drops the first entry in the tuple `T`.
 *
 * If the type is an array, the same array will be returned.
 * A readonly tuple stays readonly.
 *
 * @example
 * ```ts
 * type R = DropFirst<[1, 2, 3]> // [2, 3]
 * type R = DropFirst<[string]> // []
 * type R = DropFirst<[]> // []
 * type R = DropFirst<string[]> // string[]
 * type R = DropFirst<readonly [1, 2, 3]> // readonly [2, 3]
 * ```
 *
 * @typeParam $O['$array'] Return type when `T` is `Array`.
 * Default to `T`.
 *
 * @typeParam $O['$emptyTuple'] Return type when `T` is an empty tuple.
 * Default to `[]`, or `readonly []` when `T` is readonly.
 */
export type DropFirst<
	T extends readonly unknown[],
	$O extends $StrictOptions<$O, DropFirst.$Options> = {},
> = number extends T['length']
	? TypePlusOptions.Merge<$O, DropFirst.$Default<T>>['$array']
	: T['length'] extends 0
		? TypePlusOptions.Merge<$O, DropFirst.$Default<T>>['$emptyTuple']
		: T['length'] extends 1
			? EmptyTupleOf<T>
			: T extends readonly [any, ...infer Tail]
				? T extends unknown[]
					? Tail
					: Readonly<Tail>
				: never

export namespace DropFirst {
	export interface $Options {
		$array?: unknown
		$emptyTuple?: unknown
	}
	export interface $Default<T> {
		$array: T
		$emptyTuple: EmptyTupleOf<T>
	}
}

/**
 * ⚗️ *transform*
 * 🔢 *customizable*
 *
 * Drops the last entry in the tuple `T`.
 *
 * If the type is an array, the same array will be returned.
 * A readonly tuple stays readonly.
 *
 * @example
 * ```ts
 * type R = DropLast<[1, 2, 3]> // [1, 2]
 * type R = DropLast<[string]> // []
 * type R = DropLast<[]> // []
 * type R = DropLast<string[]> // string[]
 * type R = DropLast<readonly [1, 2, 3]> // readonly [1, 2]
 * ```
 *
 * @typeParam $O['$array'] Return type when `T` is `Array`.
 * Default to `T`.
 *
 * @typeParam $O['$emptyTuple'] Return type when `T` is an empty tuple.
 * Default to `[]`, or `readonly []` when `T` is readonly.
 */
export type DropLast<
	T extends readonly unknown[],
	$O extends $StrictOptions<$O, DropLast.$Options> = {},
> = number extends T['length']
	? TypePlusOptions.Merge<$O, DropLast.$Default<T>>['$array']
	: T['length'] extends 0
		? TypePlusOptions.Merge<$O, DropLast.$Default<T>>['$emptyTuple']
		: T['length'] extends 1
			? EmptyTupleOf<T>
			: T extends readonly [...infer Heads, any]
				? T extends unknown[]
					? Heads
					: Readonly<Heads>
				: never

export namespace DropLast {
	export interface $Options {
		$array?: unknown
		$emptyTuple?: unknown
	}
	export interface $Default<T> {
		$array: T
		$emptyTuple: EmptyTupleOf<T>
	}
}

/**
 * `[]`, or `readonly []` when `T` is readonly.
 */
type EmptyTupleOf<T> = T extends unknown[] ? [] : readonly []

/**
 * ⚗️ *transform*
 *
 * Drops entries matching `Criteria` in array or tuple `A`.
 *
 * @example
 * ```ts
 * type R = DropMatch<Array<string | undefined>, undefined> // string[]
 * type R = DropMatch<Array<string>, string> // never[]
 * type R = DropMatch<Array<1 | 2>, number> // never[]
 * ```
 */
export type DropMatch<A extends Readonly<Array<unknown>>, Criteria> = number extends A['length']
	? ArrayDropMatch<A, Criteria>
	: TupleDropMatch<A, Criteria>

/**
 * ⚗️ *transform*
 * 🩳 *shortcut*
 *
 * `DropMatch<A, null>`: drops the `null` entries from array or tuple `A`.
 *
 * @example
 * ```ts
 * type R = DropNull<[1, null, 2]> // [1, 2]
 * type R = DropNull<Array<string | null>> // string[]
 * ```
 */
export type DropNull<A extends Array<any>> = DropMatch<A, null>

/**
 * ⚗️ *transform*
 * 🩳 *shortcut*
 *
 * `DropMatch<A, null | undefined>`: drops both the `null` and the `undefined`
 * entries from array or tuple `A`.
 *
 * @example
 * ```ts
 * type R = DropNullable<[1, null, undefined, 2]> // [1, 2]
 * type R = DropNullable<Array<string | null | undefined>> // string[]
 * ```
 */
export type DropNullable<A extends Array<any>> = DropMatch<A, null | undefined>

/**
 * ⚗️ *transform*
 * 🩳 *shortcut*
 *
 * `DropMatch<A, undefined>`: drops the `undefined` entries from array or tuple
 * `A`.
 *
 * @example
 * ```ts
 * type R = DropUndefined<[1, undefined, 2]> // [1, 2]
 * type R = DropUndefined<Array<string | undefined>> // string[]
 * ```
 */
export type DropUndefined<A extends Array<any>> = DropMatch<A, undefined>

/**
 * drop a particular value from an array.
 *
 * 💀 *deprecated* the type does not sufficiently cover the use cases.
 *
 * @deprecated no replacement. The type does not sufficiently cover the use cases.
 */
export function drop<A extends Readonly<unknown[]>, const C>(array: A, value: C): DropMatch<A, C> {
	return array.filter((v) => v !== value) as DropMatch<A, C>
}
