/**
 * 🦴 *utilities
 * 💀 *deprecated* Will be available only as `ArrayPlus.Concat` in the next version
 *
 * Concats two arrays or tuples.
 *
 * alias of: `[...A, ...B]`
 *
 * @alias ArrayPlus.Concat
 *
 * ```ts
 * type R = Concat<[1], [2, 3]> // [1, 2, 3]
 * ```
 *
 * @deprecated use `ArrayPlus.Concat` instead
 */
export type Concat<A extends Readonly<unknown[]>, B extends Readonly<unknown[]>> = [...A, ...B]
