import type { $Branch } from './$branch.js'

/**
 * 🧰 *type util*
 *
 * The marker a branching type returns for its "then" branch.
 *
 * Passing a type's `$Branch` options makes it return `$Then` or `$Else`
 * instead of collapsing to `true`/`false` or to a filtered type. The caller
 * then matches on the marker with a single conditional, which is what lets a
 * chain of predicates run without re-evaluating the condition -- the reason
 * `$Branch` is the recommended default for a custom type's `$Options`.
 *
 * `$Then` is an opaque marker, not `true`. Compare it with `extends`, never
 * use it as a value.
 *
 * @example
 * ```ts
 * type R = IsObject<{}, IsObject.$Branch> // $Then
 * type R = IsObject<string, IsObject.$Branch> // $Else
 *
 * type Handle<T> = IsObject<T, IsObject.$Branch> extends infer R
 *   ? R extends $Then ? 'an object'
 *   : R extends $Else ? 'not an object'
 *   : never
 *   : never
 * ```
 */
export type $Then = $Branch<'$then'>

/**
 * 🧰 *type util*
 *
 * The marker a branching type returns for its "else" branch.
 *
 * The counterpart of `$Then`; see it for how the two are used and why.
 *
 * @example
 * ```ts
 * type R = IsObject<string, IsObject.$Branch> // $Else
 * type R = IsNotObject<{}, IsNotObject.$Branch> // $Else
 * ```
 */
export type $Else = $Branch<'$else'>

declare const $then: '$then'
declare const $else: '$else'

export namespace $Then {
	export type $Key = '$then'
	export type $Branch = {
		[$then]: $Then
	}
}

export namespace $Else {
	export type $Key = '$else'
	export type $Branch = {
		[$else]: $Else
	}
}

/**
 * 🧰 *type util*
 *
 * The selection (if-then-else) half of the `$Options` convention: the option
 * shapes a branching type accepts, and the ready-made option objects a caller
 * passes to choose a branch style.
 *
 * "Selection" is the structured-programming term -- sequence, selection,
 * iteration -- so the name refers to the choice itself, not to filtering.
 *
 * The members a caller reaches for are `$Selection.Options` (the constraint on
 * a type's `$O` parameter), `$Selection.Branch` (return `$Then`/`$Else`),
 * `$Selection.Predicate` (return `true`/`false`) and `$Selection.Filter<T>`
 * (return `T` or `never`). `Invert` and `Flip` are for building the inverse of
 * an existing type.
 *
 * @example
 * ```ts
 * type YourType<T, $O extends $Selection.Options = $Selection.Branch> = ...
 *
 * type R = IsObject<{}> // true -- the predicate default
 * type R = IsObject<{}, { selection: 'filter' }> // {}
 * type R = IsObject<{}, IsObject.$Branch> // $Then
 * ```
 */
export namespace $Selection {
	/**
	 * Options for selection (if-then-else) logic.
	 *
	 * The word "selection" refers to the basic elements in structural programming:
	 * sequence, selection, and iteration.
	 *
	 * @example
	 * ```ts
	 * type YourType<
	 *   T,
	 *   $Options extends YourType.$Options = YourType.$Branch
	 * > = ...
	 *
	 * namespace YourType {
	 *   export type $Options = $SelectionOptions
	 *   export type $Branch = $SelectionBranch
	 * }
	 * ```
	 */
	export type Options = {
		/**
		 * Specifies which default selection logic to use.
		 *
		 * `filter` returns `T` when the condition is met,
		 * and returns `never` otherwise.
		 *
		 * `predicate` returns boolean depends on the condition.
		 *
		 * Note that setting `$then` and `$else` overrides the default selection logic.
		 */
		selection?: 'predicate' | 'filter' | undefined
		$then?: unknown
		$else?: unknown
	}

	export type $BaseOptions = {
		$then?: unknown
		$else?: unknown
	}

	/**
	 * Invert the selection branch.
	 *
	 * i.e.
	 * - `$Then` -> `$Else`
	 * - `$Else` -> `$Then`
	 */
	export type Invert<Branch extends $Then | $Else> = Branch extends $Then ? $Else : $Then

	/**
	 * Branch option for selection logic.
	 * It allows finely customizing the behavior of your type.
	 *
	 * Using this as the default value of your `$Options` is the recommended best practice.
	 *
	 * This encourage consumer of your type to use conditional type to avoid performance issues.
	 *
	 * @example
	 * ```ts
	 * type YourType<
	 *   T,
	 *   $Options extends YourType.$Options = YourType.$Branch
	 * > = ...
	 *
	 * namespace YourType {
	 *   export type $Options = $SelectionOptions
	 *   export type $Branch = $SelectionBranch
	 * }
	 *
	 * type R = YourType<T> extends infer R
	 *   ? R extends $Then ? HandleThen
	 *   : R extends $Else ? HandleElse
	 *   : never
	 * ```
	 */
	export type Branch<$O extends $Selection.Options = {}> = {
		[$then]: $Then
		[$else]: $Else
	} & $O

	/**
	 * Default Options for filter selection logic.
	 *
	 * `filter` means the logic returns `T` when the condition is met,
	 * and returns `never` otherwise.
	 *
	 * @example
	 * ```ts
	 * type YourType<
	 *   T,
	 *   Options extends YourType.$Options = YourType.$Default> = ...
	 *
	 * namespace YourType {
	 *   export type $Options = $SelectionOptions
	 *   export type $Default = $SelectionFilter
	 * }
	 *
	 * type R = YourType<ThenType> // ThenType
	 * type X = YourType<ElseType> // never
	 * ```
	 */
	export type Filter<T> = {
		selection: 'filter'
		[$then]: T
		[$else]: never
	}

	/**
	 * Default Options for predicate selection logic.
	 *
	 * `predicate` means the logic returns `true` or `false` depending on the condition.
	 *
	 * @example
	 * ```ts
	 * type YourType<
	 *   T,
	 *   Options extends YourType.$Options = YourType.$Default> = ...
	 *
	 * namespace YourType {
	 *   export type $Options = $SelectionOptions
	 *   export type $Default = $SelectionPredicate
	 * }
	 *
	 * type R = YourType<ThenType> // true
	 * type X = YourType<ElseType> // false
	 * ```
	 */
	export type Predicate = {
		[$then]: true
		[$else]: false
	}

	/**
	 * Flip the selection options.
	 *
	 * @example
	 * ```ts
	 * type IsBoolean<T, $Options = $SelectionOptions> = ...
	 *
	 * type IsNotBoolean<T, $Options = $SelectionOptions> = IsBoolean<T, $FlipSelection<$Options>>
	 * ```
	 */
	export type Flip<$Options extends $Selection.Options> = {
		[$then]: $Options['$else']
		[$else]: $Options['$then']
	} & Omit<$Options, '$then' | '$else'>
}
