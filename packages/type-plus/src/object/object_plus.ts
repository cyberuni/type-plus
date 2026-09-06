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
 *
 * Note: the generator behind `llms.txt` reports this namespace as
 * undocumented no matter what is written here. `export * as ObjectPlus`
 * aliases a *module* symbol, and TypeScript does not expose a module's doc
 * comment through `getDocumentationComment`. The same applies to every other
 * `*Plus` namespace.
 */

export * from './merge.js'
