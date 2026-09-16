// Probe cases for `scripts/error-snapshots.mjs`.
//
// Each case is one declaration, labeled by its name, so a line in the snapshot
// maps back to exactly one case. A case that compiles today is still listed:
// its absence from the snapshot is the recorded result, and a change that makes
// it error (or stop erroring) shows up as a snapshot diff.
//
// This file is deliberately outside `src`: it is expected to fail compilation,
// so it must stay out of the published package and the `test:type` run.
import type {
	$ForwardOptions,
	$StrictOptions,
	$Then,
	Assignable,
	IsNever,
	IsNumberLiteral,
	IsObject,
	IsPositiveLiteral,
} from '../src/index.js'

// marker display: how a branch marker prints in an assignment error.
export const marker_display: $Then = 1

// misspelled key alongside a valid key: rejected, with a suggestion.
export type misspelled_key_with_valid_key = IsObject<{}, { distributive: false; exactt: true }>

// key-only typo: the only key is misspelled.
export type key_only_typo = IsObject<{}, { exactt: true }>

// wrong value for a valid key.
export type wrong_value = IsObject<{}, { selection: 'filtr' }>

// key invalid for the type: `distributive` is an IsObject option, not an IsNever one. Rejected without a suggestion.
export type key_invalid_for_type = IsNever<1, { distributive: false; $else: 'E' }>

// `$void` is an IsNever option: compiles (no error).
export type void_branch_on_is_never = IsNever<void, { $void: 'V'; $else: 'E' }>

// wrong value on Assignable.
export type assignable_wrong_value = Assignable<1, number, { distributive: 'no' }>

// typo plus wrong value together: TypeScript reports the value first.
export type typo_and_wrong_value = IsObject<{}, { exactt: true; selection: 'filtr' }>

// generic wrapper forwarding a `$O` constrained only by the options type: rejected.
// An object type is open, so TypeScript cannot rule out unknown keys in `$O`.
export type generic_wrapper<T, $O extends IsObject.$Options = {}> = IsObject<T, $O>

// migration shape: repeat the same strict constraint. Must compile (no error).
export type generic_wrapper_same_constraint<T, $O extends $StrictOptions<$O, IsObject.$Options> = {}> = IsObject<T, $O>

// migration shape: a wrapper with its own option forwards through `$ForwardOptions`. Must compile (no error).
interface WrapperOptions extends IsObject.$Options {
	nonEmpty?: boolean
}
export type generic_wrapper_forward<T, $O extends $StrictOptions<$O, WrapperOptions> = {}> = IsObject<
	T,
	$ForwardOptions<$O, IsObject.$Options>
>

// typo in a forwarded option, through the `$ForwardOptions` wrapper: rejected.
export type generic_wrapper_forward_typo = generic_wrapper_forward<{}, { nonEmpty: true; exactt: true }>

// `exact` on a numeric literal predicate: the option was removed because it never did anything.
export type exact_on_is_number_literal = IsNumberLiteral<1, { exact: true }>

// `exact` on one of the new numeric literal predicates: never declared, so rejected the same way.
export type exact_on_is_positive_literal = IsPositiveLiteral<1, { exact: true }>
