/**
 * 🌪️ *filter*
 *
 * `A extends B ? Then : Else`, with `Then` defaulting to `A` and `Else` to
 * `never` -- so by default it filters rather than predicates.
 *
 * ⚠️ It distributes over a union, but `Then` defaults to the *whole* `A`, not
 * the member being tested, so every surviving branch contributes all of `A`.
 * `Extendable<1 | 'a', number>` is `1 | 'a'`, not `1`. Pass an explicit `Then`
 * if that matters.
 *
 * #665 lists this type for removal. The modern equivalent is
 * `Assignable.$<A, B, { selection: 'filter' }>`, which agrees with this type
 * everywhere except the union case above -- and there it returns the matching
 * member (`1`) rather than all of `A`, which is what a filter should do.
 *
 * @deprecated use `Assignable.$<A, B, { selection: 'filter' }>`
 *
 * @example
 * ```ts
 * type R = Extendable<1, number> // 1
 * type R = Extendable<string, number> // never
 * type R = Extendable<string, number, 'yes', 'no'> // 'no'
 *
 * type R = Extendable<1 | 'a', number> // 1 | 'a'
 * ```
 */
export type Extendable<A, B, Then = A, Else = never> = A extends B ? Then : Else

/**
 * 🌪️ *filter*
 *
 * The inverse of `Extendable`: `A extends B ? Else : Then`, with `Then`
 * defaulting to `A` and `Else` to `never`.
 *
 * #665 lists this type for removal. The modern equivalent is
 * `NotAssignable.$<A, B, { selection: 'filter' }>`, which agrees with this
 * type except on a union, where it returns the non-matching member rather
 * than all of `A`.
 *
 * @example
 * ```ts
 * type R = NotExtendable<1, number> // never
 * type R = NotExtendable<string, number> // string
 * type R = NotExtendable<string, number, 'yes', 'no'> // 'yes'
 * ```
 */
export type NotExtendable<A, B, Then = A, Else = never> = A extends B ? Else : Then

/**
 * 🎭 *predicate*
 *
 * Validate if `A` extends `B`.
 *
 * Distributes over a union, so a partially-assignable union gives `boolean`
 * rather than `true` or `false`. It does not special-case the special types:
 * `any` gives `boolean` and `never` gives `never`.
 *
 * #665 lists this type for removal. `Assignable.$<A, B, { $then: Then; $else:
 * Else }>` is an exact replacement -- same answers for literals, unions,
 * `any`, `never`, `unknown` and custom branches -- and additionally supports
 * `{ distributive: false }`, which this type has no way to express. Note
 * plain `Assignable` is *not* the replacement: it special-cases the special
 * types, so `Assignable<any, number>` is `true` where this is `boolean`.
 *
 * @example
 * ```ts
 * type R = IsExtend<1, number> // true
 * type R = IsExtend<string, number> // false
 *
 * type R = IsExtend<1 | 'a', number> // boolean
 * type R = IsExtend<any, number> // boolean
 * type R = IsExtend<never, number> // never
 * ```
 */
export type IsExtend<A, B, Then = true, Else = false> = A extends B ? Then : Else

/**
 * 🎭 *predicate*
 *
 * The inverse of `IsExtend`: validate if `A` does *not* extend `B`.
 *
 * #665 lists this type for removal. `NotAssignable.$<A, B, { $then: Then;
 * $else: Else }>` is an exact replacement, on the same terms as `IsExtend`.
 *
 * @example
 * ```ts
 * type R = IsNotExtend<1, number> // false
 * type R = IsNotExtend<string, number> // true
 * ```
 */
export type IsNotExtend<A, B, Then = true, Else = false> = A extends B ? Else : Then
