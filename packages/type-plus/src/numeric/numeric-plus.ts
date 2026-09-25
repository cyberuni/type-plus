/**
 * 🧰 *namespace*
 *
 * The numeric checks under one name: `NumericPlus.IsNumeric`,
 * `NumericPlus.IsInteger`, `NumericPlus.IsNegative`, `NumericPlus.IsPositive`,
 * their `IsNot*` counterparts, and the `Numeric` / `Zero` building types.
 *
 * "Numeric" spans `number` and `bigint`, so these apply to both. Every member
 * is the same type as the top-level export of that name; the namespace only
 * groups them, and each member carries its own TSDoc.
 *
 * @example
 * ```ts
 * type R = NumericPlus.IsNumeric<1n> // true
 * type R = NumericPlus.IsPositive<-1> // false
 * ```
 */

export type * from './is-integer.js'
export type * from './is-integer-literal.js'
export type * from './is-negative.js'
export type * from './is-negative-literal.js'
export type * from './is-not-integer.js'
export type * from './is-not-integer-literal.js'
export type * from './is-not-negative.js'
export type * from './is-not-negative-literal.js'
export type * from './is-not-numeric.js'
export type * from './is-not-positive.js'
export type * from './is-not-positive-literal.js'
export type * from './is-numeric.js'
export type * from './is-positive.js'
export type * from './is-positive-literal.js'
export type * from './numeric-type.js'
