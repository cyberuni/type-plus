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
 *
 * Note: the generator behind `llms.txt` reports this namespace as
 * undocumented no matter what is written here. `export * as MathPlus` aliases
 * a *module* symbol, and TypeScript does not expose a module's doc comment
 * through `getDocumentationComment`. The same applies to every other `*Plus`
 * namespace.
 */

export type { Add, Increment } from './add.js'
export type { ToNegative } from './math_plus.to_negative.js'
export type { Multiply } from './multiply.js'
export type { Decrement, Subtract } from './subtract.js'
