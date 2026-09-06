// Thanks [jack-williams](https://github.com/jack-williams) for the [solution](https://github.com/Microsoft/TypeScript/issues/29269#issuecomment-451602962)

/**
 * ⚗️ *transform*
 *
 * Makes every property of `T` required.
 *
 * Unlike the built-in `Required<T>`, this also strips `undefined` out of the
 * property type, so a required-but-nullable property becomes non-nullable too.
 *
 * @example
 * ```ts
 * type R = Required<{ a?: number; b: string | undefined }> // { a: number; b: string }
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
