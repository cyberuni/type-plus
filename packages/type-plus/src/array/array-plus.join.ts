/**
 * ⚗️ *transform*
 *
 * The type-level `Array.prototype.join`:
 * join the elements of the tuple `A` into a string, separated by `Separator`.
 *
 * `Separator` defaults to `','`, as it does at runtime.
 * Like the runtime, `null` and `undefined` become the empty string.
 * An element that is not a `string`, `number`, `bigint` or `boolean` has no
 * known string form, so it becomes `string`.
 *
 * An array (not a tuple), a tuple with optional elements, or a wide `Separator`
 * gives `string`, because the number of elements or what separates them is unknown.
 *
 * It is the inverse of `StringPlus.Split`.
 *
 * @example
 * ```ts
 * type R = ArrayPlus.Join<['a', 'b', 'c']> // 'a,b,c'
 * type R = ArrayPlus.Join<['a', 'b', 'c'], '/'> // 'a/b/c'
 * type R = ArrayPlus.Join<[1, true, null, 2n], '-'> // '1-true--2'
 * type R = ArrayPlus.Join<[]> // ''
 * type R = ArrayPlus.Join<string[]> // string
 * ```
 */
export type Join<A extends readonly unknown[], Separator extends string = ','> = number extends A['length']
	? string
	: string extends Separator
		? string
		: _Join<A, Separator>

export namespace Join {}

type _Join<A extends readonly unknown[], Separator extends string> = A extends readonly []
	? ''
	: A extends readonly [infer Head, ...infer Tail]
		? _JoinRest<Tail, Separator, _ToString<Head>>
		: string

type _JoinRest<A extends readonly unknown[], Separator extends string, Result extends string> = A extends readonly []
	? Result
	: A extends readonly [infer Head, ...infer Tail]
		? _JoinRest<Tail, Separator, `${Result}${Separator}${_ToString<Head>}`>
		: string

type _ToString<T> = T extends null | undefined ? '' : T extends string | number | bigint | boolean ? `${T}` : string
