import { required as _required, requiredDeep as _requiredDeep } from 'unpartial'

/**
 * 🦴 *utilities*
 *
 * Merges up to three partial objects, left to right, into one value typed as
 * the intersection of their full types. Re-exported from the
 * [`unpartial`](https://github.com/unional/unpartial) package.
 *
 * The merge is shallow: each source is spread over the previous result, so a
 * later source replaces a nested object instead of merging into it. A key the
 * later source sets to `undefined` overwrites the earlier value. `null` and
 * `undefined` sources are skipped. If `source1` is `null` or `undefined`, it
 * is returned as is.
 *
 * Use `requiredDeep()` to merge nested objects.
 *
 * @example
 * ```ts
 * type Options = { a: number; b: { x: number; y?: number } }
 * const defaults: Options = { a: 1, b: { x: 1, y: 1 } }
 *
 * const r = required<Options>(defaults, { b: { x: 2 } })
 * // r === { a: 1, b: { x: 2 } }
 * // typeof r === Options
 * ```
 */
export const required: typeof _required = _required

/**
 * 🦴 *utilities*
 *
 * Merges up to three partial objects, left to right and recursively, into one
 * value typed as the intersection of their full types. Re-exported from the
 * [`unpartial`](https://github.com/unional/unpartial) package.
 *
 * Nested objects are merged key by key. An array in a later source replaces
 * the earlier array. A key the later source sets to `undefined` keeps the
 * earlier value. `null` and `undefined` sources are skipped. If `source1` is
 * `null` or `undefined`, it is returned as is.
 *
 * Use `required()` for a shallow merge.
 *
 * @example
 * ```ts
 * type Options = { a: number; b: { x: number; y?: number } }
 * const defaults: Options = { a: 1, b: { x: 1, y: 1 } }
 *
 * const r = requiredDeep<Options>(defaults, { b: { x: 2 } })
 * // r === { a: 1, b: { x: 2, y: 1 } }
 * // typeof r === Options
 * ```
 */
export const requiredDeep: typeof _requiredDeep = _requiredDeep
