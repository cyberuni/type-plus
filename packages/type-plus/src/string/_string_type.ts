import type { _BareIntersection } from '../$type/utils/_bare_intersection.js'
import type { $ExtractManipulatedString } from './$extract_manipulated_string.js'

/**
 * Classify `T` as `'string'`, `'stringLiteral'`, or `'templateLiteral'`.
 *
 * `T` is peeled down to its bare string constituent first, so an intersection
 * such as `'abc' & { a: 1 }` classifies the same as `'abc'`.
 * See {@link _BareIntersection} for the shapes that peel and the ones that do not.
 */
export type _StringType<T extends string> =
	_BareIntersection<T, String> extends infer B extends string
		? $ExtractManipulatedString<B> extends infer K
			? K extends string & infer U
				? [K, U] extends [U, K]
					? {} extends { [P in `${K}`]: unknown }
						? 'templateLiteral'
						: 'stringLiteral'
					: 'string'
				: never
			: never
		: never
