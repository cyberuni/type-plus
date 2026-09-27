/**
 * 🚦 *assertion*
 *
 * Asserts that `subject` is a `T`: throws a `TypeError` unless `validator`
 * returns a truthy value, and narrows `subject` to `T` after the call.
 *
 * It is the throwing counterpart of `isType()`, for the pre- and
 * post-conditions of defensive code. The validator is required: the check
 * happens at runtime, so an assertion without one could never fail.
 *
 * For a compile-time check, use `subject satisfies T` instead.
 * In a test, use `testType`.
 *
 * @param message The message of the thrown `TypeError`.
 *
 * @example
 * ```ts
 * function area(shape: unknown) {
 *   assertType<{ width: number; height: number }>(
 *     shape,
 *     (s) => typeof s?.width === 'number' && typeof s?.height === 'number',
 *     'shape needs a numeric width and height',
 *   )
 *   return shape.width * shape.height // narrowed
 * }
 * ```
 */
export function assertType<T>(
	subject: unknown,
	validator: (s: T) => unknown,
	message = 'subject fails the validator',
): asserts subject is T {
	if (!validator(subject as T)) throw new TypeError(message)
}
