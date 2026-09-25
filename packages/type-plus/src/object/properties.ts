import type { IsAny } from '../any/is-any.js'
import type { IsUnknown } from '../unknown/is-unknown.js'

/**
 * Extracts the property map of a type: an object type with the same keys and
 * value types as `T`, preserving optional and readonly modifiers.
 *
 * - For object types: returns `{ [k in keyof T]: T[k] }`.
 * - For `any` and `unknown`: returns the input type unchanged.
 * - For function types (e.g. `() => void`): returns `{}` because call signatures
 *   are not indexable; for `Function`, returns the interface of methods.
 * - For intersections: merges properties from all branches.
 *
 * @typeParam T - The type whose properties to extract.
 *
 * @example
 * ```ts
 * type T = { a: number; b?: string }
 * type R = Properties<T> // { a: number; b?: string }
 *
 * type Merged = Properties<{ a: 1 } & { b: 2 }> // { a: 1; b: 2 }
 * ```
 */
export type Properties<T> = IsAny<
	T,
	{
		$then: T
		$else: IsUnknown<
			T,
			{
				$then: T
				$else: { [k in keyof T]: T[k] } // & {}
			}
		>
	}
>
//  [unknown] extends [T] ? unknown : { [k in keyof T]: T[k] } // & {}
