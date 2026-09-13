/**
 * 🧰 *type util*
 *
 * The base of every branch marker.
 *
 * A branch marker is a named interface that extends `$Branch`.
 * It carries its branch name in the namespaced `~type-plus/branch` key,
 * so it prints by name (`$Then`, not its structure),
 * is not assignable to `string`,
 * and two markers with different names are distinct.
 *
 * The key is a string rather than a `unique symbol`,
 * so markers from two installed copies of type-plus stay compatible.
 *
 * @typeparam P the name of the branch. It must start with `$`.
 *
 * @example
 * ```ts
 * export interface $Then extends $Branch<'$then'> {}
 *
 * type R = $Then['~type-plus/branch'] // '$then'
 * type R = $Then[$Branch.$Key] // '$then'
 * type R = $Then extends string ? true : false // false
 * ```
 */
export interface $Branch<P extends `$${string}`> {
	readonly '~type-plus/branch': P
}

export namespace $Branch {
	/**
	 * 🧰 *type util*
	 *
	 * The key a branch marker stores its branch name under.
	 *
	 * Read a marker's name through this instead of spelling out the key,
	 * so type-level code follows the key if it is ever renamed.
	 *
	 * It is derived from `$Branch` with `keyof`, so the interface stays the only place the key is written.
	 * The key is declared as a string literal, not through a `declare const`,
	 * so a missing-property error names `'~type-plus/branch'` rather than the constant.
	 *
	 * @example
	 * ```ts
	 * type R = $Branch.$Key // '~type-plus/branch'
	 * type R = $Then[$Branch.$Key] // '$then'
	 * ```
	 */
	export type $Key = keyof $Branch<any>
}

/**
 * 🧰 *type util*
 *
 * Define the branch options of the specified branches.
 *
 * @example
 * ```ts
 * type R = $BranchOptions<$Then | $Else> // { $then: $Then, $else: $Else }
 * ```
 */
export type $BranchOptions<$B extends $Branch<any>> = {
	[k in $B[$Branch.$Key]]: $B extends $Branch<k> ? $B : never
}
