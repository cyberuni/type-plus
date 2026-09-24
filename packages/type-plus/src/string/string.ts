/**
 * Check if `Subject` includes `Search`.
 * If either of them is not a string, returns `Else`.
 *
 * ```ts
 * type R = StringIncludes<'abc', 'a'> // true
 *
 * type R = StringIncludes<'abc', 'd'> // false
 * ```
 *
 * Note that this deliberately keeps positional `Then`/`Else` rather than an
 * `$Options` object. It is the low-level template-literal check that
 * `StringPlus.Includes` is built on, and `StringPlus.Includes` is the one to
 * use for `{ selection: 'filter' }` or the `$Branch` selectors.
 */
export type StringIncludes<
	Subject extends string,
	Search extends string,
	Then = true,
	Else = false,
> = Subject extends `${infer _X}${Search}${infer _Y}` ? Then : Else

/**
 * Split a string into substrings using the specified separator,
 * and return them as an array.
 *
 * ```ts
 * type R = StringSplit<'abc', ''> // ['a', 'b', 'c']
 * type R = StringSplit<'abc', 'a'> // ['', 'bc']
 * type R = StringSplit<'abc', 'b'> // ['a', 'c']
 * type R = StringSplit<'abc', 'c'> // ['ab', '']
 * ```
 */
export type StringSplit<
	Subject extends string,
	Separator extends string,
> = Subject extends `${infer A}${Separator}${infer B}`
	? [A, ...StringSplit<B, Separator>]
	: Separator extends ''
		? []
		: [Subject]
