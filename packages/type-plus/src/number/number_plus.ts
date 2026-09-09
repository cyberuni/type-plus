/**
 * 🧰 *namespace*
 *
 * The number checks under one name, so they can be reached without importing
 * each one: `NumberPlus.IsNumber`, `NumberPlus.IsNotNumber`, and the whole
 * numeric family (`IsInteger`, `IsNegative`, `IsPositive`, `Numeric`, `Zero`
 * and their `IsNot*` counterparts) that also applies to `number`.
 *
 * Every member is the same type as the top-level export of that name; the
 * namespace only groups them. Each member carries its own TSDoc.
 *
 * @example
 * ```ts
 * type R = NumberPlus.IsNumber<1> // true
 * type R = NumberPlus.IsInteger<1.1> // false
 * ```
 */

export type * from '../numeric/is_integer.js'
export type * from '../numeric/is_negative.js'
export type * from '../numeric/is_not_integer.js'
export type * from '../numeric/is_not_negative.js'
export type * from '../numeric/is_not_numeric.js'
export type * from '../numeric/is_not_positive.js'
export type * from '../numeric/is_numeric.js'
export type * from '../numeric/is_positive.js'
export type * from '../numeric/numeric_type.js'
export type * from './is_not_number.js'
export type * from './is_number.js'

// export type { Sum } from './number_array.js'
