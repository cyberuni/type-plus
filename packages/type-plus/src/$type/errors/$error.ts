import type { $Type } from '../$type.js'

/**
 * 🧰 *type util*
 *
 * A type-level error.
 *
 * This is analogous to the `Error` class in JavaScript.
 *
 * It can be used in type-level programming to represent an error with a message.
 *
 * @example
 * ```ts
 * type T = $Error<'error message'>
 * type T = $Error<'error message', number>
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type $Error<M extends string, T = unknown> = M extends any ? $Type<'error', { message: M; type: T }> : never
