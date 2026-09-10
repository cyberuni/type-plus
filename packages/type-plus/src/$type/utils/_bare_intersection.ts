import type { UnionToIntersection } from '../../union/union_to_intersection.js'

/**
 * Reduce an intersection between a primitive type and one or more object types
 * down to its bare primitive constituent.
 *
 * `Base` is the wrapper interface the primitive already carries — `String` for a
 * string type, `Number` for a number type — and its keys are what the peel
 * treats as belonging to the primitive rather than to the intersected objects.
 *
 * ```ts
 * type R = _BareIntersection<'abc' & { a: 1 }, String> // 'abc'
 * type R = _BareIntersection<`${number}` & { a: 1 }, String> // `${number}`
 * type R = _BareIntersection<string & { a: 1 }, String> // string
 * type R = _BareIntersection<'abc', String> // 'abc'
 * ```
 *
 * TypeScript does not reduce `` `${'abc' & { a: 1 }}` `` to `'abc'`
 * (https://github.com/microsoft/TypeScript/issues/57918), so every template
 * literal operation — matching, inference, and the mapped key trick
 * `_StringType` uses — is blind to the primitive inside such an intersection.
 * Peeling the object members off first restores those operations.
 *
 * The peel relies on TypeScript's inference to an intersection target:
 * `T extends infer U & O` binds `U` to the constituents of `T` that `O` did not
 * account for. `O` has to line up with how `T` spells its object members, so the
 * peel is attempted twice — once with the members collapsed into a single object
 * (matching `'abc' & { a: 1, b: 2 }`), once with one object per member (matching
 * `'abc' & { a: 1 } & { b: 2 }`).
 *
 * Two shapes stay unreduced, and `T` is then returned as-is:
 *
 * - an intersected index signature (`'abc' & Record<number, unknown>`), whose key
 *   is one `Base` already declares, leaving nothing for the peel to match on.
 * - an intersection nested inside a string manipulation type
 *   (`Uppercase<'' & { a: 1 }>`), which never surfaces as a constituent of `T`.
 */
export type _BareIntersection<T, Base> =
	_BareIntersection._Peel<T, _BareIntersection._Collapsed<T, Base>> extends infer U
		? _BareIntersection._IsBare<U, Base> extends true
			? U
			: _BareIntersection._Peel<T, _BareIntersection._PerMember<T, Base>>
		: never

export namespace _BareIntersection {
	/**
	 * The keys `T` carries beyond the ones `Base` already declares.
	 */
	export type _Keys<T, Base> = Exclude<keyof T, keyof Base>

	/**
	 * The extra members of `T` as one object type.
	 */
	export type _Collapsed<T, Base> = { [K in _Keys<T, Base>]: T[K] }

	/**
	 * The extra members of `T` as an intersection of single-member object types.
	 */
	export type _PerMember<T, Base> = UnionToIntersection<
		_Keys<T, Base> extends infer K ? (K extends PropertyKey ? { [P in K]: T[K & keyof T] } : never) : never
	>

	/**
	 * Infer away the constituents of `T` covered by `O`, or keep `T` when `O` does not match.
	 */
	export type _Peel<T, O> = T extends infer U & O ? U : T

	/**
	 * Whether `T` is a primitive type with no object members intersected into it.
	 */
	export type _IsBare<T, Base> = [_Keys<T, Base>] extends [never] ? true : false
}
