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
 * @example
 * ```ts
 * type R = FindFirst<[true, 1, 'x', 3], string> // 'x'
 * type R = FindFirst<[true, 1, 'x', 3], number> // 1
 * type R = FindFirst<[string, number, 1], 1> // widen: 1 | undefined
 * type R = FindFirst<[true, number | string], string> // unionMiss: string | undefined
 * type R = FindFirst<Array<string>, string> // string
 * type R = FindFirst<Array<1 | 2 | 'x'>, number> // 1 | 2 | undefined
 * type R = FindFirst<Array<string | number>, number | string> // string | number
 * type R = FindFirst<Array<number>, 1> // widen: 1 | undefined
 * type R = FindFirst<Array<string | number>, number> // unionMiss: number | undefined
 *
 * type R = FindFirst<[true, 1, 'x'], 2> // never
 * type R = FindFirst<string[], number> // never
 * ```
 *
 * @typeParam Options['widen'] performs widen match.
 * Default to `true`.
 * With widen match, a narrowed type will match its widen type.
 * e.g. matching `1` against `number` yields `1 | undefined`
 *
 * The widen behavior can be customized by `Options['$widen']`
 *
 * @typeParam Options['caseEmptyTuple'] return type when `A` is an empty tuple.
 * Default to `never`.
 *
 * @typeParam Options['$never'] return type when `A` is `never`. Default to `never`.
 *
 * @typeParam Options['$noMatch'] Return value when `T` does not match `Criteria`.
 * Default to `never`.
 *
 * @typeParam Options['$widen'] return type when `T` in `A` is a widen type of `Criteria`.
 * Default to `Criteria | undefined`.
 * Set it to `never` for a more type-centric behavior
 *
 * @typeParam Options['$unionMiss'] Return value when a branch of the union `T` does not match `Criteria`.
 * Default to `undefined`.
 * Since it is a union, the result will be join to the matched branch as union.
 */
export type FindFirst<
	A extends readonly unknown[],
	Criteria,
	Options extends FindFirst.Options = FindFirst.DefaultOptions<Criteria>,
> = IsTuple<
	A,
	{
		$then: TupleFind<A, Criteria, Options>
		$else: ArrayFind<A, Criteria, Options>
	}
>

export namespace FindFirst {
	export interface Options extends ArrayFind.Options, TupleFind.Options {}
	export interface DefaultOptions<Criteria>
		extends ArrayFind.DefaultOptions<Criteria>,
			TupleFind.DefaultOptions<Criteria> {}
}
