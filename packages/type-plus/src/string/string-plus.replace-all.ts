/**
 * ⚗️ *transform*
 *
 * The type-level `String.prototype.replaceAll` with a string pattern:
 * replace every occurrence of `Search` in `Subject` with `Replacement`.
 *
 * Occurrences are matched left to right and do not overlap.
 * An empty `Search` matches between every character and at both ends.
 *
 * A wide `Subject` or `Search` gives `string`,
 * because where the matches fall is unknown.
 * `Subject` distributes over a union.
 *
 * Use `StringPlus.Replace` to replace only the first occurrence.
 *
 * @example
 * ```ts
 * type R = StringPlus.ReplaceAll<'a.b.c', '.', '/'> // 'a/b/c'
 * type R = StringPlus.ReplaceAll<'aaa', 'aa', 'b'> // 'ba'
 * type R = StringPlus.ReplaceAll<'abc', '', '-'> // '-a-b-c-'
 * ```
 */
export type ReplaceAll<Subject extends string, Search extends string, Replacement extends string> = string extends
	| Subject
	| Search
	? string
	: Subject extends unknown
		? Search extends ''
			? _ReplaceEmpty<Subject, Replacement, ''>
			: _ReplaceAll<Subject, Search, Replacement, ''>
		: never

export namespace ReplaceAll {}

type _ReplaceAll<
	Subject extends string,
	Search extends string,
	Replacement extends string,
	Result extends string,
> = Subject extends `${infer Head}${Search}${infer Tail}`
	? _ReplaceAll<Tail, Search, Replacement, `${Result}${Head}${Replacement}`>
	: `${Result}${Subject}`

type _ReplaceEmpty<
	Subject extends string,
	Replacement extends string,
	Result extends string,
> = Subject extends `${infer Char}${infer Tail}`
	? _ReplaceEmpty<Tail, Replacement, `${Result}${Replacement}${Char}`>
	: `${Result}${Replacement}`
