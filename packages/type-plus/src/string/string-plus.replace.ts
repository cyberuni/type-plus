/**
 * ⚗️ *transform*
 *
 * The type-level `String.prototype.replace` with a string pattern:
 * replace the first occurrence of `Search` in `Subject` with `Replacement`.
 *
 * `Subject` is returned unchanged when it does not contain `Search`.
 * An empty `Search` matches at the start, so `Replacement` is prepended.
 *
 * A wide `Subject` or `Search` gives `string`,
 * because where the match falls is unknown.
 * `Subject` distributes over a union.
 *
 * Use `StringPlus.ReplaceAll` to replace every occurrence.
 *
 * @example
 * ```ts
 * type R = StringPlus.Replace<'a.b.c', '.', '/'> // 'a/b.c'
 * type R = StringPlus.Replace<'abc', 'd', 'x'> // 'abc'
 * type R = StringPlus.Replace<'abc', '', 'x'> // 'xabc'
 * ```
 */
export type Replace<Subject extends string, Search extends string, Replacement extends string> = string extends
	| Subject
	| Search
	? string
	: Search extends ''
		? `${Replacement}${Subject}`
		: Subject extends `${infer Head}${Search}${infer Tail}`
			? `${Head}${Replacement}${Tail}`
			: Subject

export namespace Replace {}
