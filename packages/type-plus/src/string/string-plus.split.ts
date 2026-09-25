import type { StringSplit } from './string.js'

/**
 * Split a string into substrings using the specified separator,
 * and return them as an array.
 *
 * ```ts
 * type R = StringPlus.Split<'abc', ''> // ['a', 'b', 'c']
 * type R = StringPlus.Split<'abc', 'a'> // ['', 'bc']
 * type R = StringPlus.Split<'abc', 'b'> // ['a', 'c']
 * type R = StringPlus.Split<'abc', 'c'> // ['ab', '']
 * ```
 */
export type Split<Subject extends string, Separator extends string> = StringSplit<Subject, Separator>
