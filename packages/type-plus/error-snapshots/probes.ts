// Probe cases for `scripts/error-snapshots.mjs`.
//
// Each case is one declaration, labeled by its name, so a line in the snapshot
// maps back to exactly one case. A case that compiles today is still listed:
// its absence from the snapshot is the recorded result, and a change that makes
// it error (or stop erroring) shows up as a snapshot diff.
//
// This file is deliberately outside `src`: it is expected to fail compilation,
// so it must stay out of the published package and the `test:type` run.
import type { $Then, Assignable, IsNever, IsObject } from '../src/index.js'

// marker display: how a branch marker prints in an assignment error.
export const marker_display: $Then = 1

// misspelled key alongside a valid key: compiles today (no error).
export type misspelled_key_with_valid_key = IsObject<{}, { distributive: false; exactt: true }>

// key-only typo: the only key is misspelled.
export type key_only_typo = IsObject<{}, { exactt: true }>

// wrong value for a valid key.
export type wrong_value = IsObject<{}, { selection: 'filtr' }>

// keys invalid for the type: `$void` is not an IsNever option.
export type key_invalid_for_type = IsNever<1, { $void: 'V'; $else: 'E' }>

// wrong value on Assignable.
export type assignable_wrong_value = Assignable<1, number, { distributive: 'no' }>

// typo plus wrong value together.
export type typo_and_wrong_value = IsObject<{}, { exactt: true; selection: 'filtr' }>

// generic wrapper forwarding its options: must compile (no error).
export type generic_wrapper<T, $O extends IsObject.$Options = {}> = IsObject<T, $O>
