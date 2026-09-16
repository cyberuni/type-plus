import type { _BareIntersection } from '../$type/utils/_bare_intersection.js'

/**
 * Whether the numeric literal `T` has a fractional part.
 *
 * The test is textual — `${T}` spells `1.1` but not `1.0`, which TypeScript
 * normalises to `1` — so the intersected object members are peeled off first,
 * the same way {@link _IsNegativeSign} does.
 *
 * Every `bigint` is whole, so a `bigint` literal is never a fraction.
 */
export type _IsFraction<T> =
	_BareIntersection<T, Number & BigInt> extends infer B extends number | bigint
		? `${B}` extends `${number}.${number}`
			? true
			: false
		: false
