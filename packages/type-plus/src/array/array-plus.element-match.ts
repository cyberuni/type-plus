import type { _FnTest } from '../$type/fn/_fn-test.js'
import type { $Fn } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsNever } from '../never/is-never.js'
import type { IsUnion } from '../union/union.js'
import type { TypePlusOptions } from '../utils/options.js'

/**
 * 🦴 *utilities*
 * 🔢 *customizable*
 *
 * Filter the element `T` in an array or tuple to match `Criteria`.
 *
 * `Criteria` is either a type, which `T` matches when it `extends` it,
 * or a type function (`$Fn`), which `T` matches when the function returns `true`.
 * A union `T` is matched one member at a time.
 * `widen` and `$widen` do not apply to a type function.
 *
 * @typeParam $O['widen'] Allow using narrow type to match widen type.
 * e.g. `number, 1` -> `1 | undefined`.
 * Default to `true`.
 *
 * @typeParam $O['$notMatch'] Return value when `T` does not match `Criteria`.
 * Default to `never`.
 *
 * @typeParam $O['$widen'] Return value when `widen` is true.
 * Default to `Criteria | undefined`.
 *
 * @typeParam $O['$unionNotMatch'] Return value when a branch of the union `T` does not match `Criteria`.
 * Default to `never`.
 *
 * If you want the type to behave more like JavaScript,
 * you can override it to return `undefined`.
 *
 * Since it is a union, the result will be joined to the matched branch as union.
 * e.g. `ElementMatch<1 | 2, 1>` -> `1 | undefined`
 */
export type ElementMatch<T, Criteria, $O extends $StrictOptions<$O, ElementMatch.$Options> = {}> = [Criteria] extends [
	never,
]
	? _ElementMatch<T, Criteria, $O>
	: [Criteria] extends [infer F extends $Fn]
		? _Fn<T, F, $O>
		: _ElementMatch<T, Criteria, $O>

export namespace ElementMatch {
	export interface $Options {
		widen?: boolean | undefined
		$notMatch?: unknown
		$widen?: unknown
		$unionNotMatch?: unknown
	}
	export interface $Default<Criteria> {
		widen: true
		$notMatch: never
		$widen: Criteria | undefined
		$unionNotMatch: never
	}
}

type _ElementMatch<T, Criteria, $O extends ElementMatch.$Options> = [T] extends [Criteria]
	? T
	: TypePlusOptions.Merge<$O, ElementMatch.$Default<Criteria>> extends infer C extends Record<
				keyof ElementMatch.$Options,
				unknown
			>
		? (
				T extends Criteria
					? T
					: C['widen'] extends true
						? Criteria extends T
							? C['$widen']
							: C['$notMatch']
						: C['$notMatch']
			) extends infer R
			? IsUnion<T, { $then: IsNever<R, { $then: R; $else: R | C['$unionNotMatch'] }>; $else: R }>
			: C['$notMatch']
		: never

type _Fn<T, F extends $Fn, $O extends ElementMatch.$Options> = TypePlusOptions.Merge<
	$O,
	ElementMatch.$Default<F>
> extends infer C extends Record<keyof ElementMatch.$Options, unknown>
	? (T extends unknown ? (_FnTest<T, F> extends true ? T : C['$notMatch']) : never) extends infer R
		? IsUnion<T, { $then: IsNever<R, { $then: R; $else: R | C['$unionNotMatch'] }>; $else: R }>
		: C['$notMatch']
	: never
