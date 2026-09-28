import type { IsAny } from '../any/is-any.js'

/**
 * The parameter lists of every call signature of `F`, as a union of tuples.
 *
 * `Parameters<F>` keeps only the last overload.
 * Matching `F` against object types with ten signatures down to one
 * reads up to ten overloads, as `expect-type` does.
 *
 * A generic overload reads its type parameters as their constraints,
 * so `<T>(value: T) => T` has the parameters `[value: unknown]`.
 */
export type _OverloadParameters<F> = F extends {
	(...args: infer A1): unknown
	(...args: infer A2): unknown
	(...args: infer A3): unknown
	(...args: infer A4): unknown
	(...args: infer A5): unknown
	(...args: infer A6): unknown
	(...args: infer A7): unknown
	(...args: infer A8): unknown
	(...args: infer A9): unknown
	(...args: infer A10): unknown
}
	? A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10
	: F extends {
				(...args: infer A1): unknown
				(...args: infer A2): unknown
				(...args: infer A3): unknown
				(...args: infer A4): unknown
				(...args: infer A5): unknown
				(...args: infer A6): unknown
				(...args: infer A7): unknown
				(...args: infer A8): unknown
				(...args: infer A9): unknown
			}
		? A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9
		: F extends {
					(...args: infer A1): unknown
					(...args: infer A2): unknown
					(...args: infer A3): unknown
					(...args: infer A4): unknown
					(...args: infer A5): unknown
					(...args: infer A6): unknown
					(...args: infer A7): unknown
					(...args: infer A8): unknown
				}
			? A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8
			: F extends {
						(...args: infer A1): unknown
						(...args: infer A2): unknown
						(...args: infer A3): unknown
						(...args: infer A4): unknown
						(...args: infer A5): unknown
						(...args: infer A6): unknown
						(...args: infer A7): unknown
					}
				? A1 | A2 | A3 | A4 | A5 | A6 | A7
				: F extends {
							(...args: infer A1): unknown
							(...args: infer A2): unknown
							(...args: infer A3): unknown
							(...args: infer A4): unknown
							(...args: infer A5): unknown
							(...args: infer A6): unknown
						}
					? A1 | A2 | A3 | A4 | A5 | A6
					: F extends {
								(...args: infer A1): unknown
								(...args: infer A2): unknown
								(...args: infer A3): unknown
								(...args: infer A4): unknown
								(...args: infer A5): unknown
							}
						? A1 | A2 | A3 | A4 | A5
						: F extends {
									(...args: infer A1): unknown
									(...args: infer A2): unknown
									(...args: infer A3): unknown
									(...args: infer A4): unknown
								}
							? A1 | A2 | A3 | A4
							: F extends { (...args: infer A1): unknown; (...args: infer A2): unknown; (...args: infer A3): unknown }
								? A1 | A2 | A3
								: F extends { (...args: infer A1): unknown; (...args: infer A2): unknown }
									? A1 | A2
									: F extends { (...args: infer A1): unknown }
										? A1
										: never

/**
 * The parameter lists of every construct signature of `F`, as a union of tuples.
 *
 * The construct-signature counterpart of {@link _OverloadParameters}.
 * An abstract class has no construct signature it can be called with, so it gives `never`.
 */
export type _ConstructorOverloadParameters<F> = F extends {
	new (...args: infer A1): unknown
	new (...args: infer A2): unknown
	new (...args: infer A3): unknown
	new (...args: infer A4): unknown
	new (...args: infer A5): unknown
	new (...args: infer A6): unknown
	new (...args: infer A7): unknown
	new (...args: infer A8): unknown
	new (...args: infer A9): unknown
	new (...args: infer A10): unknown
}
	? A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9 | A10
	: F extends {
				new (...args: infer A1): unknown
				new (...args: infer A2): unknown
				new (...args: infer A3): unknown
				new (...args: infer A4): unknown
				new (...args: infer A5): unknown
				new (...args: infer A6): unknown
				new (...args: infer A7): unknown
				new (...args: infer A8): unknown
				new (...args: infer A9): unknown
			}
		? A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | A9
		: F extends {
					new (...args: infer A1): unknown
					new (...args: infer A2): unknown
					new (...args: infer A3): unknown
					new (...args: infer A4): unknown
					new (...args: infer A5): unknown
					new (...args: infer A6): unknown
					new (...args: infer A7): unknown
					new (...args: infer A8): unknown
				}
			? A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8
			: F extends {
						new (...args: infer A1): unknown
						new (...args: infer A2): unknown
						new (...args: infer A3): unknown
						new (...args: infer A4): unknown
						new (...args: infer A5): unknown
						new (...args: infer A6): unknown
						new (...args: infer A7): unknown
					}
				? A1 | A2 | A3 | A4 | A5 | A6 | A7
				: F extends {
							new (...args: infer A1): unknown
							new (...args: infer A2): unknown
							new (...args: infer A3): unknown
							new (...args: infer A4): unknown
							new (...args: infer A5): unknown
							new (...args: infer A6): unknown
						}
					? A1 | A2 | A3 | A4 | A5 | A6
					: F extends {
								new (...args: infer A1): unknown
								new (...args: infer A2): unknown
								new (...args: infer A3): unknown
								new (...args: infer A4): unknown
								new (...args: infer A5): unknown
							}
						? A1 | A2 | A3 | A4 | A5
						: F extends {
									new (...args: infer A1): unknown
									new (...args: infer A2): unknown
									new (...args: infer A3): unknown
									new (...args: infer A4): unknown
								}
							? A1 | A2 | A3 | A4
							: F extends {
										new (...args: infer A1): unknown
										new (...args: infer A2): unknown
										new (...args: infer A3): unknown
									}
								? A1 | A2 | A3
								: F extends { new (...args: infer A1): unknown; new (...args: infer A2): unknown }
									? A1 | A2
									: F extends { new (...args: infer A1): unknown }
										? A1
										: never

/**
 * `true` when every member of the union `R` is `true`, otherwise `false`.
 */
type _Every<R> = false extends R ? false : true

/**
 * Can `F` be called with the arguments `Args`?
 *
 * `true` when `Args` is assignable to the parameters of one of the overloads of `F`.
 * A union `F` must accept `Args` in every member.
 * `any` can be called with anything, and `never` or a type with no call signature cannot be called.
 */
export type _CallableWith<F, Args extends readonly unknown[]> = IsAny<F> extends true
	? true
	: [F] extends [never]
		? false
		: _Every<F extends unknown ? ([Args] extends [Readonly<_OverloadParameters<F>>] ? true : false) : never>

/**
 * Can `F` be constructed with `new` and the arguments `Args`?
 *
 * The construct-signature counterpart of {@link _CallableWith}.
 */
export type _ConstructibleWith<F, Args extends readonly unknown[]> = IsAny<F> extends true
	? true
	: [F] extends [never]
		? false
		: _Every<F extends unknown ? ([Args] extends [Readonly<_ConstructorOverloadParameters<F>>] ? true : false) : never>
