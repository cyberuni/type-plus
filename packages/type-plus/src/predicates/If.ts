/**
 * 🎭 *predicate*
 *
 * Selects `Then` when `Condition` is `true` and `Else` when it is `false`.
 * The type-level `if`.
 *
 * It distributes, so a `Condition` of `boolean` -- the result of an
 * undecided predicate -- yields `Then | Else` rather than either branch.
 *
 * #665 lists this type as still on the positional `Then`/`Else` form, awaiting
 * migration to the `$Options` object the rest of the predicate family uses.
 *
 * @example
 * ```ts
 * type R = If<true> // true
 * type R = If<false> // false
 *
 * type R = If<true, 'yes', 'no'> // 'yes'
 * type R = If<boolean, 'yes', 'no'> // 'yes' | 'no'
 * ```
 */
export type If<Condition extends boolean, Then = true, Else = false> = Condition extends true ? Then : Else
