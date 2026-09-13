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
 * type R = IsAnyOrNever<any> // $Then
 * type R = IsAnyOrNever<never> // $Then
 *
 * type R = IsAnyOrNever<1> // $Else
 * type R = IsAnyOrNever<unknown> // $Else
 *
 * type R = IsAnyOrNever<never, $SelectionPredicate> // true
 * type R = IsAnyOrNever<'a', $SelectionPredicate> // false
 * ```
 */
export type IsAnyOrNever<T, $O extends $StrictOptions<$O, $Selection.Options> = $Selection.Predicate> = IsNever<
	T,
	{
		$then: $O['$then']
		$else: IsAny<T, $ForwardOptions<$O, IsAny.$Options>>
	}
>
