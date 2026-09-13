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
 * type R = $Then extends string ? true : false // false
 * ```
 */
export interface $Branch<P extends `$${string}`> {
	readonly '~type-plus/branch': P
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
	[k in $B['~type-plus/branch']]: $B extends $Branch<k> ? $B : never
}
