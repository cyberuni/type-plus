import type { AnyRecord } from './any-record.js'

/**
 * ⚗️ *transform*
 *
 * Intersects `U` into `T` and into each of its properties, recursively.
 * The recursion terminates at level 7 due to design limit of TypeScript.
 *
 * The normal use case is intersecting two object types.
 * It also works on a value type and a top level array,
 * but does not recurse into the elements of a top level array.
 *
 * `undefined` and `null` intersected with an object type are `never`,
 * so `RecursiveIntersect<undefined, U>` is `never`.
 *
 * @example
 * ```ts
 * type R = RecursiveIntersect<{ a: { b: 1 } }, { u: 1 }>
 * type R1 = R['u'] // 1
 * type R2 = R['a']['u'] // 1
 * type R3 = R['a']['b']['u'] // 1
 * ```
 */
export type RecursiveIntersect<T, U> = T &
	(T extends Array<infer Y>
		? Array<Y & U> & U
		: T extends AnyRecord
			? {
					[P in keyof T]: T[P] extends Array<infer R>
						? Array<RecursiveIntersect<R, U>> & U
						: T[P] extends AnyRecord
							? RecursiveIntersect<T[P], U>
							: T[P] & U
				} & U
			: U)
