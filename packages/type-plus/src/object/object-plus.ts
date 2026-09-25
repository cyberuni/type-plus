/**
 * 🧰 *namespace*
 *
 * The object types that need a namespace to avoid clashing with the built-in
 * or `type-plus` types of the same name.
 *
 * - `ObjectPlus.Merge<A, B>`, the type-level `{ ...a, ...b }`. Unlike
 *   `SpreadRecord`, it reconciles optional properties and `Record` shapes
 *   instead of intersecting blindly.
 * - `ObjectPlus.Partial`, `ObjectPlus.Required`, `ObjectPlus.Pick` and
 *   `ObjectPlus.Omit`, which differ from the built-ins of the same name. The
 *   namespace keeps an auto-import from shadowing the built-in for a whole
 *   file.
 *
 * @example
 * ```ts
 * type R = ObjectPlus.Merge<{ a: number; b: string }, { b: boolean }>
 * // { a: number; b: boolean }
 * ```
 */

export * from './merge.js'
export type { Omit } from './omit.js'
export type { Partial } from './partial.js'
export type { Pick } from './pick.js'
export type { Required } from './required.js'
