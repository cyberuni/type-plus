/**
 * 🧰 *type util*
 *
 * A function from `T` back to `T`, the shape `compose()` chains.
 *
 * Because input and output are the same type, any number of them compose in
 * any order. `EndoFn<T>` is the same type under its category-theory name.
 *
 * @example
 * ```ts
 * const double: ChainFn<number> = (n) => n * 2
 * const inc: ChainFn<number> = (n) => n + 1
 *
 * const r = compose(double, inc)(3) // 7
 * ```
 */
export type ChainFn<T> = (param: T) => T

/**
 * An endofunctor is a functor from one category back to the same category.
 */
export type EndoFn<T> = (param: T) => T
