/**
 * 🧰 *type util*
 *
 * Types that can carry custom properties: `object` and `Function`.
 *
 * A function is composable because properties can be attached to it,
 * as in `Object.assign(fn, { ... })`.
 *
 * @example
 * ```ts
 * type R = { a: 1 } extends ComposableTypes ? true : false // true
 * type R = (() => void) extends ComposableTypes ? true : false // true
 * type R = string extends ComposableTypes ? true : false // false
 * ```
 */
export type ComposableTypes = object | Function

/**
 * 🧰 *type util*
 *
 * Types that cannot carry custom properties:
 * `boolean`, `number`, `string`, `symbol`, `bigint`, `undefined` and `null`.
 *
 * @example
 * ```ts
 * type R = string extends NonComposableTypes ? true : false // true
 * type R = null extends NonComposableTypes ? true : false // true
 * type R = { a: 1 } extends NonComposableTypes ? true : false // false
 * ```
 */
export type NonComposableTypes = boolean | number | string | symbol | bigint | undefined | null
