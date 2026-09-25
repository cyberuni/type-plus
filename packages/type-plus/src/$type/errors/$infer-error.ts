import type { $Error } from './$error.js'

/**
 * An error to indicate unexpected failure when inferring type.
 *
 * In your type,
 * you can use `T extends infer U extends V` to specify the type of the inferred type `U`.
 *
 * But doing so means you have to do an extra conditional type.
 *
 * This type can be use in the else case to indicate unexpected failure when inferring type.
 *
 * @example
 * ```ts
 * type F<T> = T extends infer U extends V
 *   ? ...your type logic...
 *   : InferError<'some message', T>
 * ```
 *
 * @since 8.0.0
 */
export type $InferError<M extends string, T = unknown> = M extends any ? $Error<`Unable to infer: ${M}`, T> : never
