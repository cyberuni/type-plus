/**
 * 🧰 *type util*
 *
 * A constraint matching any class: a `new`-able signature taking `Params`.
 *
 * The return type is `void` rather than the instance type, which is what makes
 * it match every class regardless of what it constructs. Use it where a type
 * parameter must be "some class", not `Function` — which also admits ordinary
 * functions.
 *
 * @example
 * ```ts
 * class Foo { constructor(readonly a: number) {} }
 *
 * type R = Foo extends AnyConstructor ? true : false // false, `Foo` is the instance
 * type R = typeof Foo extends AnyConstructor ? true : false // true
 * type R = typeof Foo extends AnyConstructor<[string]> ? true : false // false
 *
 * function make<C extends AnyConstructor>(ctor: C) { return ctor }
 * ```
 */
export type AnyConstructor<Params extends any[] = any[]> = new (..._args: Params) => void
