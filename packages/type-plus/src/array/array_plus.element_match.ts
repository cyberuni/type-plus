import type { IsNever } from '../never/is_never.js'
import type { IsUnion } from '../union/union.js'
import type { TypePlusOptions } from '../utils/options.js'

/**
 * 🦴 *utilities*
 * 🔢 *customizable*
 *
 * Filter the element `T` in an array or tuple to match `Criteria`.
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
	T,
] extends [Criteria]
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

export namespace ElementMatch {
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
