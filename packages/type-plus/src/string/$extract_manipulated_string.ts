/**
 * 🧰 *type util*
 *
 * Extract the manipulated string from any of the intrinsic string manipulation types:
 *
 * - `Uppercase`
 * - `Lowercase`
 * - `Capitalize`
 * - `Uncapitalize`
 */
export type $ExtractManipulatedString<T extends string> = [T, unknown] extends [unknown, T]
	? T
	: _UpperOrElse<T, _LowerOrElse<T, _CapOrElse<T, _UncapOrElse<T, T>>>>

export namespace $ExtractManipulatedString {}

type _UpperOrElse<N, Else> =
	N extends Uppercase<infer Y>
		? string extends Y
			? Uppercase<any> extends N
				? Y
				: N
			: $ExtractManipulatedString<Y>
		: Else

type _LowerOrElse<N, Else> =
	N extends Lowercase<infer Y>
		? string extends Y
			? Lowercase<any> extends N
				? Y
				: N
			: $ExtractManipulatedString<Y>
		: Else

type _CapOrElse<N, Else> =
	N extends Capitalize<infer Y>
		? string extends Y
			? Capitalize<any> extends N
				? Y
				: N
			: $ExtractManipulatedString<Y>
		: Else

type _UncapOrElse<N, Else> =
	N extends Uncapitalize<infer Y>
		? string extends Y
			? Uncapitalize<any> extends N
				? Y
				: N
			: $ExtractManipulatedString<Y>
		: Else
