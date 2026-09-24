import * as _numberPlus from './number_plus.js'

/**
 * 🧰 *namespace*
 *
 * `NumericPlus` plus `IsNumber` and `IsNotNumber`, under a second name.
 *
 * @deprecated Use `NumericPlus`, which holds the same numeric members, and the
 * top-level `IsNumber` and `IsNotNumber` for the other two:
 * `NumberPlus.IsInteger` → `NumericPlus.IsInteger`,
 * `NumberPlus.IsNumber` → `IsNumber`. `NumberPlus` will be removed in a future
 * major.
 *
 * @example
 * ```ts
 * type R = NumberPlus.IsInteger<1.1> // false, same as NumericPlus.IsInteger<1.1>
 * ```
 */
export import NumberPlus = _numberPlus
