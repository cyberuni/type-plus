import type { $Never } from '../$type/special/$never.js'
import type { $ForwardOptions, $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsTuple } from '../tuple/is_tuple.js'
import type { TypePlusOptions } from '../utils/options.js'
import type { ElementMatch } from './array_plus.element_match.js'

/**
 * 🦴 *utilities*
 * 🔢 *customizable*
 *
 * Finds the type in array `A` that matches `Criteria`.
 *
 * `Criteria` is either a type, matched with `extends`,
 * or a type function (`$Fn`), which matches when it returns `true`.
 *
 * Pass `IsEqual.$Fn<X>` as `Criteria` to match an entry exactly (strict mode).
 * It does not widen, so `number` does not match `1`, and `1` does not match `number`.
 *
 * @example
 * ```ts
 * type R = ArrayPlus.Find<Array<string>, string> // string
 * type R = ArrayPlus.Find<Array<1 | 2 | 'x'>, number> // 1 | 2
 * type R = ArrayPlus.Find<Array<string | number>, number | string> // string | number
 * type R = ArrayPlus.Find<Array<number>, 1> // widen: 1 | undefined
 * type R = ArrayPlus.Find<Array<string | number>, number> // number
 *
 * type R = ArrayPlus.Find<string[], number> // never
 *
 * // strict mode
 * type R = ArrayPlus.Find<Array<number>, IsEqual.$Fn<1>> // never
 * type R = ArrayPlus.Find<Array<1 | 2 | 'x'>, IsEqual.$Fn<1>> // 1
 * ```
 *
 * @typeParam $O['widen'] performs widen match.
 * Default to `true`.
 * With widen match, a narrowed type will match its widen type.
 * e.g. matching `1` against `number` yields `1 | undefined`
 *
 * The widen behavior can be customized by `$O['$widen']`
 *
 * @typeParam $O['$never'] return type when `A` is `never`. Default to `never`.
 *
 * @typeParam $O['$notMatch'] Return value when `T` does not match `Criteria`.
 * Default to `never`.
 *
 * @typeParam $O['$tuple'] return type when `A` is a tuple. Default to `not supported` message.
 *
 * @typeParam $O['$widen'] return type when `T` in `A` is a widen type of `Criteria`.
 * Default to `Criteria | undefined`.
 * Set it to `never` for a more type-centric behavior
 *
 * @typeParam $O['$unionNotMatch'] Return value when a branch of the union `T` does not match `Criteria`.
 * Default to `never`.
 *
 * If you want the type to behave more like JavaScript,
 * you can override it to return `undefined`.
 *
 * Since it is a union, the result will be joined to the matched branch as union.
 */
export type Find<A extends readonly unknown[], Criteria, $O extends $StrictOptions<$O, Find.$Options> = {}> = IsTuple<
	A,
	{
		$then: TypePlusOptions.Merge<$O, Find.$Default<Criteria>>['$tuple']
		$else: A extends Readonly<Array<infer T>>
			? ElementMatch<T, Criteria, $ForwardOptions<$O, ElementMatch.$Options>>
			: never
	}
>

export namespace Find {
	export interface $Options extends ElementMatch.$Options, $Never.$Options {
		$tuple?: unknown
	}

	export interface $Default<Criteria> extends ElementMatch.$Default<Criteria>, $Never.$Default {
		$tuple: 'does not support tuple. Please use `FindFirst` or `TuplePlus.Find` instead.'
	}
}
