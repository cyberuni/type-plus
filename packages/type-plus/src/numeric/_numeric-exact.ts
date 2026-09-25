import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'

/**
 * The answer one numeric kind gets from a predicate under `exact: true`.
 *
 * `'then'` and `'else'` are the two certain answers. `'both'` is the undetermined
 * one: the wide `number` stands for every number literal at once, so a predicate
 * that separates those literals can only answer `boolean` — or, under
 * `selection: 'filter'`, keep the input.
 */
export type _ExactAnswer = 'then' | 'else' | 'both'

/**
 * The `exact: true` path shared by the numeric sign and integer predicates.
 *
 * `exact: true` narrows these predicates to the wide `number` and `bigint` types,
 * the same way `IsNumber<T, { exact: true }>` rejects every number literal.
 * `$Number`, `$Bigint` and `$Other` name the answer for the wide `number`, the
 * wide `bigint`, and everything else — literals, non-numeric types and the
 * special types alike.
 *
 * An intersection is classified by its numeric constituent, so
 * `number & { a: 1 }` is wide and `1 & { a: 1 }` is a literal.
 */
export type _ExactNumeric<
	T,
	$O extends $Selection.Options & $Distributive.Options,
	$Number extends _ExactAnswer,
	$Bigint extends _ExactAnswer,
	$Other extends _ExactAnswer,
> = [T] extends [never]
	? _ExactNumeric._Answer<T, $O, $Other>
	: $Distributive.Parse<
			$O,
			{
				$then: _ExactNumeric._D<T, $O, $Number, $Bigint, $Other>
				$else: _ExactNumeric._N<T, $O, $Number, $Bigint, $Other>
			}
		>

export namespace _ExactNumeric {
	export type _D<
		T,
		$O extends $Selection.Options,
		$Number extends _ExactAnswer,
		$Bigint extends _ExactAnswer,
		$Other extends _ExactAnswer,
	> = T extends bigint & infer U
		? [U] extends [bigint]
			? _Answer<T, $O, $Other>
			: _Answer<T, $O, $Bigint>
		: T extends number & infer U
			? [U] extends [number]
				? _Answer<T, $O, $Other>
				: _Answer<T, $O, $Number>
			: _Answer<T, $O, $Other>

	export type _N<
		T,
		$O extends $Selection.Options,
		$Number extends _ExactAnswer,
		$Bigint extends _ExactAnswer,
		$Other extends _ExactAnswer,
	> = [T] extends [bigint & infer U]
		? [U] extends [bigint]
			? _Answer<T, $O, $Other>
			: _Answer<T, $O, $Bigint>
		: [T] extends [number & infer U]
			? [U] extends [number]
				? _Answer<T, $O, $Other>
				: _Answer<T, $O, $Number>
			: _Answer<T, $O, $Other>

	export type _Answer<T, $O extends $Selection.Options, A extends _ExactAnswer> = A extends 'both'
		? $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
		: A extends 'then'
			? $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Else]>
}
