import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { AnyRecord } from './any_record.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `K` is a key of `T`.
 *
 * A plain `extends` check: it does not special-case `any`, `never` or
 * `unknown`.
 *
 * @example
 * ```ts
 * type R = HasKey<{ a: 1 }, 'a'> // true
 * type R = HasKey<{ a: 1 }, 'b'> // false
 *
 * type R = HasKey<{ a: 1 }, 'b', { $then: 'yes'; $else: 'no' }> // 'no'
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep the keys of `T`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = HasKey<{ a: 1; b: 2 }, 'a' | 'c', { selection: 'filter' }> // 'a'
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = HasKey<{ a: 1 }, 'a', HasKey.$Branch> // $Then
 * type R = HasKey<{ a: 1 }, 'b', HasKey.$Branch> // $Else
 * ```
 */
export type HasKey<T, K, $O extends HasKey.$Options = {}> = K extends keyof T
	? $ResolveBranch<$O, [$Then], K>
	: $ResolveBranch<$O, [$Else]>

export namespace HasKey {
	export type $Options = $Selection.Options
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}

/**
 * Checks the given keys on `subject`, typed as `HasKey<T, K>`.
 *
 * ⚠️ The runtime and the type disagree. The type is decided by whether `K` is
 * a key of `T`, so it is `true` for any declared key; the implementation tests
 * `subject[key]` for *truthiness*, so a declared key holding `0`, `''`,
 * `null` or `false` returns `false` at runtime while the type still says
 * `true`. It is a truthiness check, not `in`.
 *
 * @example
 * ```ts
 * const r = hasKey({ a: 1 }, 'a') // true, typed true
 * const r = hasKey({ a: 0 }, 'a') // false at runtime, still typed true
 * ```
 */
export function hasKey<T extends AnyRecord, K extends string>(subject: T, ...keys: K[]): HasKey<T, K> {
	return !keys.some((key) => !subject[key]) as unknown as HasKey<T, K>
}
