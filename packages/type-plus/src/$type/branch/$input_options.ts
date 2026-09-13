import type { $Branch } from './$branch.js'

/**
 * 🧰 *type util*
 *
 * Define branch input options.
 *
 * Each branch becomes an optional key named after the branch.
 *
 * @example
 * ```ts
 * type R = $InputOptions<$Any | $Unknown> // { $any?: unknown, $unknown?: unknown }
 * ```
 */
export type $InputOptions<$B extends $Branch<any>> = { [k in $B['~type-plus/branch']]?: unknown }
