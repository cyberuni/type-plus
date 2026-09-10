/**
 * 🦴 *utilities*
 *
 * Casts `subject` to `T`.
 *
 * This is `subject as T` behind a call, and it is just as unchecked: nothing
 * verifies the claim at runtime and the value is returned untouched. Its reason
 * to exist is position. `as` composes in an expression where a type assertion
 * would need parentheses, which makes it useful for the stub values in a test.
 *
 * @example
 * ```ts
 * const r = as<{ a: number }>({}) // typed { a: number }, still `{}` at runtime
 *
 * const r = as<string>(1) // typed string, `1` at runtime
 * ```
 */
export function as<T>(subject: unknown): T {
	return subject as T
}

/**
 * 🦴 *utilities*
 *
 * `as<any>`: casts `subject` to `any`.
 *
 * The escape hatch for handing a deliberately wrong value to a checked
 * parameter, which is what a test asserting the runtime guard needs.
 *
 * @example
 * ```ts
 * const r = asAny('x') // typed any, 'x' at runtime
 *
 * function f(_a: number) {}
 * f(asAny('x')) // compiles; the guard inside `f` is what is under test
 * ```
 */
export function asAny(subject: unknown): any {
	return subject
}

/**
 * amend `subject` with type `T`
 */
export function amend<S>(subject: S) {
	return {
		union<T>(): T & S {
			return subject as T & S
		},
		intersect<T>(): T | S {
			return subject as T | S
		},
	}
}
