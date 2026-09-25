import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsBigint } from '../bigint/is-bigint.js'
import type { IsBoolean } from '../boolean/is-boolean.js'
import type { IsFunction } from '../function/is-function.js'
import type { IsNumber } from '../number/is-number.js'
import type { IsObject } from '../object/is-object.js'
import type { IsString } from '../string/is-string.js'
import type { IsSymbol } from '../symbol/is-symbol.js'
import type { TypePlusOptions } from '../utils/options.js'

/**
 * ⚗️ *transform*
 * 🔢 *customizable*
 *
 * Converts primitive types to their boxed types.
 *
 * @typeParam $O['$notBoxable'] return type when `T` is not boxable. Defaults to `never`.
 *
 * @example
 * ```ts
 * Box<number> // Number
 * Box<object> // Object
 * Box<string>  // String
 * Box<'abc'>  // String
 *
 * Box<undefined> // never
 * ```
 */
export type Box<T, $O extends $StrictOptions<$O, Box.$Options> = {}> = IsFunction<T, IsFunction.$Branch> extends infer R
	? R extends $Then
		? Function
		: IsObject<T, IsObject.$Branch<{ exact: true }>> extends infer R
			? R extends $Then
				? Object
				: T extends Record<any, any>
					? T
					: IsBoolean<T, $Selection.Branch> extends infer R
						? R extends $Then
							? Boolean
							: R extends $Else
								? IsNumber<T, IsNumber.$Branch> extends infer R
									? R extends $Then
										? Number
										: R extends $Else
											? IsString<
													T,
													{
														$then: String
														$else: IsSymbol<
															T,
															{
																$then: Symbol
																$else: IsBigint<
																	T,
																	{ $then: BigInt; $else: TypePlusOptions.Merge<$O, Box.$Default>['$notBoxable'] }
																>
															}
														>
													}
												>
											: never
									: never
								: never
						: never
			: never
	: never

export namespace Box {
	export interface $Options {
		$notBoxable?: unknown
	}
	export interface $Default {
		$notBoxable: never
	}
}
