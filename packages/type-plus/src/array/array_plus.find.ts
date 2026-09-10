import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $Never } from '../$type/special/$never.js'
import type { IsTuple } from '../tuple/is_tuple.js'
import type { ElementMatch } from './array_plus.element_match.js'

/**
 * 🦴 *utilities*
 * 🔢 *customizable*
 *
 * Finds the type in array `A` that matches `Criteria`.
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
 * ```
 *
 * @typeParam Options['widen'] performs widen match.
 * Default to `true`.
 * With widen match, a narrowed type will match its widen type.
 * e.g. matching `1` against `number` yields `1 | undefined`
 *
 * The widen behavior can be customized by `Options['$widen']`
 *
 * @typeParam Options['$never'] return type when `A` is `never`. Default to `never`.
 *
 * @typeParam Options['$notMatch'] Return value when `T` does not match `Criteria`.
 * Default to `never`.
 *
 * @typeParam Options['$tuple'] return type when `A` is a tuple. Default to `not supported` message.
 *
 * @typeParam Options['$widen'] return type when `T` in `A` is a widen type of `Criteria`.
 * Default to `Criteria | undefined`.
 * Set it to `never` for a more type-centric behavior
 *
 * @typeParam Options['$unionNotMatch'] Return value when a branch of the union `T` does not match `Criteria`.
 * Default to `never`.
 *
 * If you want the type to behave more like JavaScript,
 * you can override it to return `undefined`.
 *
 * Since it is a union, the result will be joined to the matched branch as union.
 */
export type Find<
	A extends readonly unknown[],
	Criteria,
	Options extends Find.Options = Find.DefaultOptions<Criteria>,
> = IsTuple<
	A,
	{
		$then: $ResolveOptions<[Options['$tuple'], Find.DefaultOptions<Criteria>['$tuple']]>
		$else: A extends Readonly<Array<infer T>> ? ElementMatch<T, Criteria, Options> : never
	}
>

export namespace Find {
	export interface Options extends ElementMatch.Options, $Never.$Options {
		$tuple?: unknown
	}

	export interface DefaultOptions<Criteria> extends ElementMatch.DefaultOptions<Criteria>, $Never.$Default {
		$tuple: 'does not support tuple. Please use `FindFirst` or `TuplePlus.Find` instead.'
	}
}
