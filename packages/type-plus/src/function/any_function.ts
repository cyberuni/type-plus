/**
 * 🧰 *type util*
 *
 * A constraint matching any function: a call signature taking `Params` and
 * returning `Result`.
 *
 * Prefer it over `Function`, which is not callable with a checked signature and
 * also matches classes. Both type parameters default to `any`, so the bare
 * `AnyFunction` matches every function; narrowing either one turns it into a
 * shape constraint.
 *
 * @example
 * ```ts
 * type R = (() => void) extends AnyFunction ? true : false // true
 * type R = ((a: string) => number) extends AnyFunction<[string], number> ? true : false // true
 * type R = ((a: string) => number) extends AnyFunction<[number]> ? true : false // false
 *
 * function call<F extends AnyFunction>(fn: F, ...args: Parameters<F>) { return fn(...args) }
 * ```
 */
export type AnyFunction<Params extends any[] = any[], Result = any> = (...args: Params) => Result
