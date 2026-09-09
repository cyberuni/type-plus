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

export type * from './is_integer.js'
export type * from './is_negative.js'
export type * from './is_not_integer.js'
export type * from './is_not_negative.js'
export type * from './is_not_numeric.js'
export type * from './is_not_positive.js'
export type * from './is_numeric.js'
export type * from './is_positive.js'
export type * from './numeric_type.js'
