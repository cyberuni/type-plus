import type { $ForwardOptions, $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsTuple } from '../tuple/is_tuple.js'
import type { Find as TupleFind } from '../tuple/tuple_plus.find.js'
import type { Find as ArrayFind } from './array_plus.find.js'

/**
 * 🦴 *utilities*
 * 🔢 *customizable*
 *
 * Find the first type in the array or tuple `A` that matches `Criteria`.
 *
 * If the `Criteria` is not met, it will return `never'.
 *
 * `Criteria` is either a type, matched with `extends`,
 * or a type function (`$Fn`), which matches when it returns `true`.
 *
 * Pass `IsEqual.$Fn<X>` as `Criteria` to match an entry exactly (strict mode).
 * It does not widen, so `number` does not match `1`, and `1` does not match `number`.
 *
 * @example
 * ```ts
 * type R = FindFirst<[true, 1, 'x', 3], string> // 'x'
 * type R = FindFirst<[true, 1, 'x', 3], number> // 1
 * type R = FindFirst<[string, number, 1], 1> // widen: 1 | undefined
 * type R = FindFirst<[true, number | string], string> // string
 * type R = FindFirst<Array<string>, string> // string
 * type R = FindFirst<Array<1 | 2 | 'x'>, number> // 1 | 2
 * type R = FindFirst<Array<string | number>, number | string> // string | number
 * type R = FindFirst<Array<number>, 1> // widen: 1 | undefined
 * type R = FindFirst<Array<string | number>, number> // number
 *
 * type R = FindFirst<[true, 1, 'x'], 2> // never
 * type R = FindFirst<string[], number> // never
 *
 * // strict mode
 * type R = FindFirst<[number, 1], IsEqual.$Fn<1>> // 1
 * type R = FindFirst<Array<number>, IsEqual.$Fn<1>> // never
 * ```
 *
 * @typeParam $O['widen'] performs widen match.
 * Default to `true`.
 * With widen match, a narrowed type will match its widen type.
 * e.g. matching `1` against `number` yields `1 | undefined`
 *
 * The widen behavior can be customized by `$O['$widen']`
 *
 * @typeParam $O['$emptyTuple'] return type when `A` is an empty tuple.
 * Default to `never`.
 *
 * @typeParam $O['$never'] return type when `A` is `never`. Default to `never`.
 *
 * @typeParam $O['$notMatch'] Return value when `T` does not match `Criteria`.
 * Default to `never`.
 *
 * @typeParam $O['$widen'] return type when `T` in `A` is a widen type of `Criteria`.
 * Default to `Criteria | undefined`.
 * Set it to `never` for a more type-centric behavior
 *
 * @typeParam $O['$unionNotMatch'] Return value when a branch of the union `T` does not match `Criteria`.
 * Default to `never`.
 * Since it is a union, the result will be join to the matched branch as union.
 */
export type FindFirst<
	A extends readonly unknown[],
	Criteria,
	$O extends $StrictOptions<$O, FindFirst.$Options> = {},
> = IsTuple<
	A,
	{
		$then: TupleFind<A, Criteria, $ForwardOptions<$O, TupleFind.$Options>>
		$else: ArrayFind<A, Criteria, $ForwardOptions<$O, ArrayFind.$Options>>
	}
>

export namespace FindFirst {
	export interface $Options extends ArrayFind.$Options, TupleFind.$Options {}
	export interface $Default<Criteria> extends ArrayFind.$Default<Criteria>, TupleFind.$Default<Criteria> {}
}
