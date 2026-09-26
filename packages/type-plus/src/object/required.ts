import type { UnionKeys } from '../union-keys.js'
import type { Omit } from './omit.js'
import type { Pick } from './pick.js'

// Thanks [jack-williams](https://github.com/jack-williams) for the [solution](https://github.com/Microsoft/TypeScript/issues/29269#issuecomment-451602962)

/**
 * ⚗️ *transform*
 *
 * Makes every property of `T` required. Reached as `ObjectPlus.Required`; the
 * top-level `Required` export is a deprecated alias of it.
 *
 * It differs from the built-in `Required` whatever the compiler flags: it also
 * strips `undefined` out of each property type, so a property that was already
 * required but accepted `undefined` no longer does. The built-in only removes
 * the `?`.
 *
 * @example
 * ```ts
 * type R = ObjectPlus.Required<{ a?: number; b: string | undefined }> // { a: number; b: string }
 * // the built-in `Required` gives { a: number; b: string | undefined }
 * ```
 */
export type Required<T> = { [P in keyof T]-?: Exclude<T[P], undefined> }

/**
 * ⚗️ *transform*
 *
 * Applies `Required<>` to the selected properties `U` and keeps the rest as declared.
 *
 * It distributes over a union `T`, and `U` may name a key of any member.
 *
 * @example
 * ```ts
 * type R = RequiredPick<{ a?: 1; b?: 2 }, 'a'> // { b?: 2 } & { a: 1 }
 * ```
 */
export type RequiredPick<T, U extends UnionKeys<T>> = T extends T ? Omit<T, U> & Required<Pick<T, U>> : never

/**
 * ⚗️ *transform*
 *
 * Keeps the selected properties `U` as declared and applies `Required<>` to the
 * rest. The complement of `RequiredPick`.
 *
 * It distributes over a union `T`, and `U` may name a key of any member.
 *
 * @example
 * ```ts
 * type R = RequiredOmit<{ a?: 1; b?: 2 }, 'a'> // { a?: 1 } & { b: 2 }
 * ```
 */
export type RequiredOmit<T, U extends UnionKeys<T>> = T extends T ? Pick<T, U> & Required<Omit<T, U>> : never

/**
 * ⚗️ *transform*
 *
 * @deprecated 💀 **deprecated since 8.0.0**: use `RequiredOmit` instead. `Omit`
 * names the complement, as in `PartialOmit`.
 */
export type RequiredExcept<T, U extends UnionKeys<T>> = RequiredOmit<T, U>
