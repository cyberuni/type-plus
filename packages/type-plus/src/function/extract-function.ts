import type { AnyFunction } from './any-function.js'

/**
 * ⚗️ *transform*
 *
 * Extracts the function signature from a composite type `T`,
 * dropping the properties intersected with it.
 *
 * It works on an intersection that includes a function, or a union of functions.
 * @note does not work with function overloads: only the last overload is kept.
 *
 * @example
 * ```ts
 * type R = ExtractFunction<(() => void) & { a: 1 }> // () => void
 * ```
 */
export type ExtractFunction<T extends AnyFunction> = T extends AnyFunction<infer P, infer R> ? (...args: P) => R : never

/**
 * Extract the function signature from a composite function.
 *
 * @note does not work with function overloads.
 */
export function extractFunction<T extends AnyFunction>(fn: T) {
	return fn as unknown as ExtractFunction<T>
}
