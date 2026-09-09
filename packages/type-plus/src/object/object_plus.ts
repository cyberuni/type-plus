/**
 * 🧰 *namespace*
 *
 * The object types that need a namespace to avoid clashing with the built-in
 * or `type-plus` types of the same name.
 *
 * Currently that is `ObjectPlus.Merge<A, B>`, the type-level `{ ...a, ...b }`.
 * Unlike `SpreadRecord`, it reconciles optional properties and `Record` shapes
 * instead of intersecting blindly.
 *
 * @example
 * ```ts
 * type R = ObjectPlus.Merge<{ a: number; b: string }, { b: boolean }>
 * // { a: number; b: boolean }
 * ```
 */

export * from './merge.js'
