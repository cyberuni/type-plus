/**
 * 🛡️ *type guard*
 *
 * A generic type guard: narrows `subject` to `T` when `validator` returns a
 * truthy value, so you do not have to write a one-off `x is T` function.
 *
 * The one-argument form `isType<T>(subject)` was removed in 8.0.0.
 * It narrowed nothing: write `subject satisfies T` instead.
 *
 * @example
 * ```ts
 * const s: unknown = 1
 * if (isType<1>(s, (v) => v === 1)) {
 *   s // 1
 * }
 * ```
 */
export function isType<T>(subject: unknown, validator: (s: T) => unknown): subject is T {
	return !!validator(subject as T)
}
