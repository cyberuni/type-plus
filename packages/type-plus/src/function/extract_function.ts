import type { AnyFunction } from './any_function.js'

/**
 * Extract the function signature from a composite type T.
 *
 * It works with interact of functions, but not on function overloads and union.
 * @note does not work with function overloads.
 *
 * ```ts
 * import type { ExtractFunction } from 'type-plus'
 *
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
