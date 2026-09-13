import type { $InferError } from '../errors/$infer_error.js'
import type { $Branch } from './$branch.js'
import type { $Else, $Then } from './$selection.js'

/**
 * Resolve option value based on list of branches.
 * It returns the first branch value that is specified in the option,
 * otherwise will return the default value.
 *
 * Since this is an type utility,
 * it does not perform extensive validations.
 * Please check the description of each input below for information.
 *
 * @typeparam $O The input option. It should be a Record, not any, unknown, or never
 * @typeparam $B Tuple of branches with at least one entry.
 * @typeparam D Default value to return if no branch is found.
 */
export type $ResolveBranch<
	$O extends Record<string, any>,
	$Branches extends Array<$Branch<any> | unknown>,
	D = unknown,
> = $Branches extends [infer B]
	? _Last<$O, B, D>
	: $Branches extends [infer B, ...infer Rest extends Array<$Branch<any> | unknown>]
		? _<$O, B, $ResolveBranch<$O, Rest, D>>
		: $InferError<'$Branches must have at least one entry'>

type _<$O extends Record<string, any>, $B, D> = $B extends $Branch<any>
	? $B['~type-plus/branch'] extends keyof $O
		? $O[$B['~type-plus/branch']]
		: D
	: D
type _Last<$O extends Record<string, any>, $B, D> = $B extends $Then
	? '$then' extends keyof $O
		? $O['$then']
		: $O['selection'] extends 'filter'
			? D
			: true
	: $B extends $Else
		? '$else' extends keyof $O
			? $O['$else']
			: $O['selection'] extends 'filter'
				? never
				: false
		: _<$O, $B, D>
