// Source: https://stackoverflow.com/questions/41980195/recursive-partialt-in-typescript-2-1

import type { AnyFunction } from '../function/any-function.js'
import type { ExtractFunction } from '../index.js'
import type { AnyRecord } from './any-record.js'
import type { Properties } from './properties.js'

/**
 * Creates a recursive partial type of type T.
 *
 * @example
 * ```ts
 * interface Foo {
 *   bar: number;
 *   baz: {
 *     qux: string
 *   }
 * }
 *
 * type PartialFoo = RecursivePartial<Foo>
 * // {
 * //   bar?: number | undefined;
 * //   baz?: {
 * //     qux?: string | undefined
 * //   } | undefined
 * // }
 * ```
 */
export type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends (infer U)[]
		? RecursivePartial<U>[] | undefined
		: T[P] extends infer F extends AnyFunction
			? [keyof T[P]] extends [undefined]
				? T[P] | undefined
				: ExtractFunction<F> & RecursivePartial<Properties<T[P]>>
			: T[P] extends AnyRecord
				? RecursivePartial<T[P]> | undefined
				: T[P] | undefined
}
