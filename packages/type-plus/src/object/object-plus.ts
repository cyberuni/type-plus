import * as _merge from './object-plus.merge.js'
import * as _omit from './omit.js'
import * as _partial from './partial.js'
import * as _pick from './pick.js'
import * as _required from './required.js'

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
export declare namespace ObjectPlus {
	export import Merge = _merge.Merge
	export import Omit = _omit.Omit
	export import Partial = _partial.Partial
	export import Pick = _pick.Pick
	export import Required = _required.Required
}
