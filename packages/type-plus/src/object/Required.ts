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
 * Applies `Required<>` to the selected properties `U`, leaving the rest of `T`
 * as declared.
 *
 * @example
 * ```ts
 * type R = RequiredPick<{ a?: 1; b?: 2 }, 'a'> // { a: 1; b?: 2 }
 * ```
 */
export type RequiredPick<T, U extends keyof T> = Required<Pick<T, U>> & Pick<T, Exclude<keyof T, U>>

/**
 * ⚗️ *transform*
 *
 * Applies `Required<>` to every property except the selected `U`, which is
 * left as declared. The complement of `RequiredPick`.
 *
 * @example
 * ```ts
 * type R = RequiredExcept<{ a?: 1; b?: 2 }, 'a'> // { b: 2; a?: 1 }
 * ```
 */
export type RequiredExcept<T, U extends keyof T> = Required<Pick<T, Exclude<keyof T, U>>> & Pick<T, U>
