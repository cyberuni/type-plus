/**
 * 🧰 *namespace*
 *
 * The math types that need a namespace to avoid clashing with a type of the
 * same name elsewhere on the surface, plus the everyday arithmetic re-exported
 * for convenience.
 *
 * `MathPlus.ToNegative<N>` is the one that only lives here.
 *
 * @example
 * ```ts
 * type R = MathPlus.ToNegative<5> // -5
 * type R = MathPlus.ToNegative<-5> // -5
 * type R = MathPlus.Add<1, 2> // 3
 * ```
 */

export type { Add, Increment } from './add.js'
export type { ToNegative } from './math_plus.to_negative.js'
export type { Multiply } from './multiply.js'
export type { Decrement, Subtract } from './subtract.js'
