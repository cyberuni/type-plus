import type { $Selection } from '../$type/branch/$selection.js'
import type { $ForwardOptions, $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsAny } from '../any/is_any.js'
import type { IsNever } from '../never/is_never.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 * 🩳 *shortcut*
 *
 * Validate if `T` is either exactly `any` or exactly `never`.
 *
 * @example
 * ```ts
 * type R = IsAnyOrNever<any> // true
 * type R = IsAnyOrNever<never> // true
 *
 * type R = IsAnyOrNever<1> // false
 * type R = IsAnyOrNever<unknown> // false
 *
 * type R = IsAnyOrNever<never, $Selection.Branch> // $Then
 * type R = IsAnyOrNever<'a', $Selection.Branch> // $Else
 * ```
 */
export type IsAnyOrNever<T, $O extends $StrictOptions<$O, $Selection.Options> = $Selection.Predicate> = IsNever<
	T,
	{
		$then: $O['$then']
		$else: IsAny<T, $ForwardOptions<$O, IsAny.$Options>>
	}
>
