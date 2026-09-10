import type { _BareIntersection } from '../$type/utils/_bare_intersection.js'

/**
 * Whether the numeric type `T` carries a minus sign.
 *
 * The sign is read off `` `${T}` ``, which TypeScript leaves unreduced when `T`
 * is an intersection such as `-1 & { a: 1 }`
 * (https://github.com/microsoft/TypeScript/issues/57918), so `T` is peeled down
 * to its bare numeric constituent first.
 * See {@link _BareIntersection} for the shapes that peel and the ones that do not.
 */
export type _IsNegativeSign<T> =
	_BareIntersection<T, Number & BigInt> extends infer B extends number | bigint
		? `${B}` extends `-${string}`
			? true
			: false
		: false
