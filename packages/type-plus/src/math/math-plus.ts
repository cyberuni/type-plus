/**
 * 🧰 *namespace*
 *
 * Every type-level arithmetic type under one name: `MathPlus.Abs`,
 * `MathPlus.Add`, `MathPlus.Decrement`, `MathPlus.GreaterThan`,
 * `MathPlus.Increment`, `MathPlus.Max`, `MathPlus.Multiply`,
 * `MathPlus.Subtract` and `MathPlus.ToNegative`.
 *
 * `MathPlus.ToNegative<N>` is the one that only lives here. Every other member
 * is the same type as the top-level export of that name; the namespace only
 * groups them. Each member carries its own TSDoc.
 *
 * @example
 * ```ts
 * type R = MathPlus.ToNegative<5> // -5
 * type R = MathPlus.ToNegative<-5> // -5
 * type R = MathPlus.Add<1, 2> // 3
 * type R = MathPlus.Max<1, 2> // 2
 * ```
 */

export type { Abs } from './abs.js'
export type { Add, Increment } from './add.js'
export type { GreaterThan } from './greater-than.js'
export type { ToNegative } from './math-plus.to-negative.js'
export type { Max } from './max.js'
export type { Multiply } from './multiply.js'
export type { Decrement, Subtract } from './subtract.js'
