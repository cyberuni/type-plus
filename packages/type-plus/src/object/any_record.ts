import type { KeyTypes } from './KeyTypes.js'

/**
 * 🧰 *type util*
 *
 * A constraint matching any record: every key type JavaScript allows
 * (`string`, `number`, `symbol`) mapped to `any`.
 *
 * Use it where a type parameter must be "some object with properties" rather
 * than `object`, which also admits functions and arrays.
 *
 * @example
 * ```ts
 * type R = AnyRecord // { [x: string]: any; [x: number]: any; [x: symbol]: any }
 *
 * function f<T extends AnyRecord>(subject: T) { return subject }
 * ```
 */
export type AnyRecord = Record<KeyTypes, any>
