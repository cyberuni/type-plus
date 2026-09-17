import type { $Fn } from '../$type/fn/$fn.js'
import type { IsNever } from '../never/is_never.js'
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
 * @typeParam Options['widen'] Allow using narrow type to match widen type.
 * e.g. `number, 1` -> `1 | undefined`.
 * Default to `true`.
 *
 * @typeParam Options['$notMatch'] Return value when `T` does not match `Criteria`.
 * Default to `never`.
 *
 * @typeParam Options['$widen'] Return value when `widen` is true.
 * Default to `Criteria | undefined`.
 *
 * @typeParam Options['$unionNotMatch'] Return value when a branch of the union `T` does not match `Criteria`.
 * Default to `never`.
 *
 * If you want the type to behave more like JavaScript,
 * you can override it to return `undefined`.
 *
 * Since it is a union, the result will be joined to the matched branch as union.
 * e.g. `ElementMatch<1 | 2, 1>` -> `1 | undefined`
 */
export type ElementMatch<T, Criteria, Options extends ElementMatch.Options = ElementMatch.DefaultOptions<Criteria>> = [
	Criteria,
] extends [never]
	? ElementMatch._<T, Criteria, Options>
	: [Criteria] extends [infer F extends $Fn]
		? ElementMatch._Fn<T, F, Options>
		: ElementMatch._<T, Criteria, Options>

export namespace ElementMatch {
	export type _<T, Criteria, Options extends ElementMatch.Options> = [T] extends [Criteria]
		? T
		: TypePlusOptions.Merge<Options, ElementMatch.DefaultOptions<Criteria>> extends infer C extends Record<
					keyof ElementMatch.Options,
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

	export type _Fn<T, F extends $Fn, Options extends ElementMatch.Options> = TypePlusOptions.Merge<
		Options,
		ElementMatch.DefaultOptions<F>
	> extends infer C extends Record<keyof ElementMatch.Options, unknown>
		? (T extends unknown ? ($Fn._Test<T, F> extends true ? T : C['$notMatch']) : never) extends infer R
			? IsUnion<T, { $then: IsNever<R, { $then: R; $else: R | C['$unionNotMatch'] }>; $else: R }>
			: C['$notMatch']
		: never

	export interface Options {
		widen?: boolean | undefined
		$notMatch?: unknown
		$widen?: unknown
		$unionNotMatch?: unknown
	}
	export interface DefaultOptions<Criteria> {
		widen: true
		$notMatch: never
		$widen: Criteria | undefined
		$unionNotMatch: never
	}
}
