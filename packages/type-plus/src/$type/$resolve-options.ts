import type { $InferError } from './errors/$infer-error.js'

/**
 * 🧰 *type util*
 *
 * Resolve options to the first non `unknown` value.
 *
 * The `Values` are assumed to be a tuple with at least one value.
 * These checks are not performed for performance considerations.
 */
export type $ResolveOptions<V extends unknown[]> = V extends [infer T]
	? T
	: V extends [infer T, ...infer U]
		? [T, unknown] extends [unknown, T]
			? $ResolveOptions<U>
			: [T] extends [undefined]
				? $ResolveOptions<U>
				: T
		: $InferError<'cannot [infer T, ...infer U] from', V>
