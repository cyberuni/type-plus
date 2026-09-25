/**
 * Whether `subject` is a promise, narrowing it to `Promise<R>`.
 *
 * The check is structural: anything with a callable `then` passes, so a
 * thenable from another promise implementation is accepted. `R` cannot be
 * inferred from a runtime check and defaults to `any`; supply it when the
 * resolved type is known.
 *
 * @example
 * ```ts
 * const r = isPromise(Promise.resolve(1)) // true
 * const r = isPromise({ then() {} }) // true
 * const r = isPromise(1) // false
 * const r = isPromise(undefined) // false
 *
 * const value: unknown = Promise.resolve('x')
 * if (isPromise<string>(value)) {
 *   // typeof value === Promise<string>
 * }
 * ```
 */
export function isPromise<R = any>(subject: unknown): subject is Promise<R> {
	// @ts-expect-error
	return !!subject && typeof subject['then'] === 'function'
}
