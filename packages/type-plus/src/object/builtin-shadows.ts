import type { UnionKeys } from '../union-keys.js'
import type { Omit as ObjectPlusOmit } from './omit.js'
import type { Partial as ObjectPlusPartial } from './partial.js'
import type { Pick as ObjectPlusPick } from './pick.js'
import type { Required as ObjectPlusRequired } from './required.js'

// The top-level names that shadow a TypeScript built-in of the same name while meaning something
// else. An auto-import of one shadows the built-in for the whole file, so each is kept only as a
// deprecated alias of its `ObjectPlus` form (#719). Removing this file removes them.

/**
 * ⚗️ *transform*
 *
 * @deprecated 💀 **deprecated since 8.0.0**: use `ObjectPlus.Partial` instead. This name
 * shadows the built-in `Partial`, and under `exactOptionalPropertyTypes` it
 * differs from it: each property also accepts an explicit `undefined`.
 */
export type Partial<T> = ObjectPlusPartial<T>

/**
 * ⚗️ *transform*
 *
 * @deprecated 💀 **deprecated since 8.0.0**: use `ObjectPlus.Required` instead. This name
 * shadows the built-in `Required`, and differs from it: it also strips
 * `undefined` from properties that were already required.
 */
export type Required<T> = ObjectPlusRequired<T>

/**
 * ⚗️ *transform*
 *
 * @deprecated 💀 **deprecated since 8.0.0**: use `ObjectPlus.Pick` instead. This name
 * shadows the built-in `Pick`, and differs from it: it distributes over a union
 * `T` and accepts the keys of any member.
 */
export type Pick<T, K extends UnionKeys<T>> = ObjectPlusPick<T, K>

/**
 * ⚗️ *transform*
 *
 * @deprecated 💀 **deprecated since 8.0.0**: use `ObjectPlus.Omit` instead. This name
 * shadows the built-in `Omit`, and differs from it: it distributes over a union
 * `T`, and rejects a key no member of `T` has.
 */
export type Omit<T, K extends UnionKeys<T>> = ObjectPlusOmit<T, K>
