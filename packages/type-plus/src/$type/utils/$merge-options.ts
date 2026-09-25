/**
 * Merge type options.
 *
 * This is used in the type to merge the user provided options with the default options.
 *
 * @typeparam $O - The type of the options, typically provided by the user.
 * @typeparam $P - The type of the default options.
 *
 * @example
 * ```ts
 * type R = $MergeOptions<{ $any: 1; $else: 2 }, { $any: 2 }> // { $any: 2; $else: 2 }
 * type R = $MergeOptions<{}, { $any: 2 }> // { $any: 2 }
 * ```
 */
export type $MergeOptions<$O extends Record<string, any>, $P extends { [k in keyof $O]?: unknown }> = [
	keyof $O,
] extends [never]
	? // Nothing to merge. Skipping the mapped type saves about 14 instantiations per use.
		$P
	: {
			[k in Exclude<keyof $O, keyof $P>]: $O[k]
		} & $P
