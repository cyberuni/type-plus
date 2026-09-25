/**
 * 🧰 *type util*
 *
 * The type of every property key: `string | number | symbol`.
 *
 * It is `keyof any`, named because that spelling is not obvious.
 * To get the keys of a particular object or array, use `keyof`.
 *
 * @example
 * ```ts
 * type R = KeyTypes // string | number | symbol
 * ```
 */
export type KeyTypes = keyof any
