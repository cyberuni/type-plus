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
	$Any,
	$Else,
	$Fn,
	$ForwardOptions,
	$StrictOptions,
	$Then,
	And,
	ArrayPlus,
	Assignable,
	Equal,
	HasKey,
	HasNull,
	HasUndefined,
	HasVoid,
	If,
	IsAny,
	IsAnyOrNever,
	IsArray,
	IsBigint,
	IsBigintLiteral,
	IsBoolean,
	IsFalse,
	IsFunction,
	IsInteger,
	IsIntegerLiteral,
	IsNegative,
	IsNegativeLiteral,
	IsNever,
	IsNotAny,
	IsNotArray,
	IsNotBigint,
	IsNotBigintLiteral,
	IsNotBoolean,
	IsNotFalse,
	IsNotFunction,
	IsNotInteger,
	IsNotIntegerLiteral,
	IsNotNegative,
	IsNotNegativeLiteral,
	IsNotNever,
	IsNotNull,
	IsNotNumber,
	IsNotNumberLiteral,
	IsNotNumeric,
	IsNotObject,
	IsNotPositive,
	IsNotPositiveLiteral,
	IsNotStrictFunction,
	IsNotString,
	IsNotStringLiteral,
	IsNotSymbol,
	IsNotTemplateLiteral,
	IsNotTrue,
	IsNotTuple,
	IsNotUndefined,
	IsNotUnknown,
	IsNotVoid,
	IsNull,
	IsNumber,
	IsNumberLiteral,
	IsNumeric,
	IsObject,
	IsOptionalKey,
	IsPositive,
	IsPositiveLiteral,
	IsStrictFunction,
	IsString,
	IsStringLiteral,
	IsSymbol,
	IsTemplateLiteral,
	IsTrue,
	IsTuple,
	IsUndefined,
	IsUnion,
	IsUnknown,
	IsVoid,
	Not,
	NotAssignable,
	Or,
	StringPlus,
	TuplePlus,
	Xor,
} from '../src/index.js'

// marker display: how a branch marker prints in an assignment error.
export const marker_display: $Then = 1

// marker mix-up: one branch marker assigned to another prints both by name.
declare const else_marker: $Else
export const marker_mix_up: $Then = else_marker

// special-type marker display: `$Any` prints by name too.
export const special_marker_display: $Any = 1

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

// predicate passed to a collection type without `.$Fn`.
export type fn_predicate_without_fn = TuplePlus.Filter<[1], IsObject>

// non-function passed to `$Fn.Apply`.
export type fn_apply_non_function = $Fn.Apply<1, 1>

// not an options type: a primitive where the options object belongs.
export type non_object_options = IsObject<{}, string>

// not an options type: a boolean, as if the option were positional.
export type positional_boolean_options = IsObject<{}, true>

// branch-style options on a type whose `$Options` carries special-type branches (`$InputOptions`): names `$Options`.
export type special_branch_wrong_key = IsTuple<[], { $anyy: 1 }>

// branch-style options with a valid special-type branch key: compiles (no error).
export type special_branch_valid_key = IsTuple<any, { $any: 1; $then: 2; $else: 3 }>

// Every exported type that takes options, one misspelled key each,
// plus a wrong `selection` value where the type has that option.
// Other arguments are `any` so only the options can fail.

export type options_And_typo = And<any, any, { $thenx: true }>

export type options_ArrayPlus_IsIndexOutOfBound_typo = ArrayPlus.IsIndexOutOfBound<any, any, { selectionx: true }>
export type options_ArrayPlus_IsIndexOutOfBound_wrong_value = ArrayPlus.IsIndexOutOfBound<
	any,
	any,
	{ selection: 'filtr' }
>

export type options_Assignable_typo = Assignable<any, any, { selectionx: true }>
export type options_Assignable_wrong_value = Assignable<any, any, { selection: 'filtr' }>

export type options_Equal_typo = Equal<any, any, { $thenx: true }>

export type options_HasKey_typo = HasKey<any, any, { selectionx: true }>
export type options_HasKey_wrong_value = HasKey<any, any, { selection: 'filtr' }>

export type options_HasNull_typo = HasNull<any, { selectionx: true }>
export type options_HasNull_wrong_value = HasNull<any, { selection: 'filtr' }>

export type options_HasUndefined_typo = HasUndefined<any, { selectionx: true }>
export type options_HasUndefined_wrong_value = HasUndefined<any, { selection: 'filtr' }>

export type options_HasVoid_typo = HasVoid<any, { selectionx: true }>
export type options_HasVoid_wrong_value = HasVoid<any, { selection: 'filtr' }>

export type options_If_typo = If<any, { selectionx: true }>
export type options_If_wrong_value = If<any, { selection: 'filtr' }>

export type options_IsAny_typo = IsAny<any, { selectionx: true }>
export type options_IsAny_wrong_value = IsAny<any, { selection: 'filtr' }>

export type options_IsAnyOrNever_typo = IsAnyOrNever<any, { selectionx: true }>
export type options_IsAnyOrNever_wrong_value = IsAnyOrNever<any, { selection: 'filtr' }>

export type options_IsArray_typo = IsArray<any, { selectionx: true }>
export type options_IsArray_wrong_value = IsArray<any, { selection: 'filtr' }>

export type options_IsBigint_typo = IsBigint<any, { selectionx: true }>
export type options_IsBigint_wrong_value = IsBigint<any, { selection: 'filtr' }>

export type options_IsBigintLiteral_typo = IsBigintLiteral<any, { selectionx: true }>
export type options_IsBigintLiteral_wrong_value = IsBigintLiteral<any, { selection: 'filtr' }>

export type options_IsBoolean_typo = IsBoolean<any, { selectionx: true }>
export type options_IsBoolean_wrong_value = IsBoolean<any, { selection: 'filtr' }>

export type options_IsFalse_typo = IsFalse<any, { selectionx: true }>
export type options_IsFalse_wrong_value = IsFalse<any, { selection: 'filtr' }>

export type options_IsFunction_typo = IsFunction<any, { selectionx: true }>
export type options_IsFunction_wrong_value = IsFunction<any, { selection: 'filtr' }>

export type options_IsInteger_typo = IsInteger<any, { selectionx: true }>
export type options_IsInteger_wrong_value = IsInteger<any, { selection: 'filtr' }>

export type options_IsIntegerLiteral_typo = IsIntegerLiteral<any, { selectionx: true }>
export type options_IsIntegerLiteral_wrong_value = IsIntegerLiteral<any, { selection: 'filtr' }>

export type options_IsNegative_typo = IsNegative<any, { selectionx: true }>
export type options_IsNegative_wrong_value = IsNegative<any, { selection: 'filtr' }>

export type options_IsNegativeLiteral_typo = IsNegativeLiteral<any, { selectionx: true }>
export type options_IsNegativeLiteral_wrong_value = IsNegativeLiteral<any, { selection: 'filtr' }>

export type options_IsNever_typo = IsNever<any, { selectionx: true }>
export type options_IsNever_wrong_value = IsNever<any, { selection: 'filtr' }>

export type options_IsNotAny_typo = IsNotAny<any, { selectionx: true }>
export type options_IsNotAny_wrong_value = IsNotAny<any, { selection: 'filtr' }>

export type options_IsNotArray_typo = IsNotArray<any, { selectionx: true }>
export type options_IsNotArray_wrong_value = IsNotArray<any, { selection: 'filtr' }>

export type options_IsNotBigint_typo = IsNotBigint<any, { selectionx: true }>
export type options_IsNotBigint_wrong_value = IsNotBigint<any, { selection: 'filtr' }>

export type options_IsNotBigintLiteral_typo = IsNotBigintLiteral<any, { selectionx: true }>
export type options_IsNotBigintLiteral_wrong_value = IsNotBigintLiteral<any, { selection: 'filtr' }>

export type options_IsNotBoolean_typo = IsNotBoolean<any, { selectionx: true }>
export type options_IsNotBoolean_wrong_value = IsNotBoolean<any, { selection: 'filtr' }>

export type options_IsNotFalse_typo = IsNotFalse<any, { selectionx: true }>
export type options_IsNotFalse_wrong_value = IsNotFalse<any, { selection: 'filtr' }>

export type options_IsNotFunction_typo = IsNotFunction<any, { selectionx: true }>
export type options_IsNotFunction_wrong_value = IsNotFunction<any, { selection: 'filtr' }>

export type options_IsNotInteger_typo = IsNotInteger<any, { selectionx: true }>
export type options_IsNotInteger_wrong_value = IsNotInteger<any, { selection: 'filtr' }>

export type options_IsNotIntegerLiteral_typo = IsNotIntegerLiteral<any, { selectionx: true }>
export type options_IsNotIntegerLiteral_wrong_value = IsNotIntegerLiteral<any, { selection: 'filtr' }>

export type options_IsNotNegative_typo = IsNotNegative<any, { selectionx: true }>
export type options_IsNotNegative_wrong_value = IsNotNegative<any, { selection: 'filtr' }>

export type options_IsNotNegativeLiteral_typo = IsNotNegativeLiteral<any, { selectionx: true }>
export type options_IsNotNegativeLiteral_wrong_value = IsNotNegativeLiteral<any, { selection: 'filtr' }>

export type options_IsNotNever_typo = IsNotNever<any, { selectionx: true }>
export type options_IsNotNever_wrong_value = IsNotNever<any, { selection: 'filtr' }>

export type options_IsNotNull_typo = IsNotNull<any, { selectionx: true }>
export type options_IsNotNull_wrong_value = IsNotNull<any, { selection: 'filtr' }>

export type options_IsNotNumber_typo = IsNotNumber<any, { selectionx: true }>
export type options_IsNotNumber_wrong_value = IsNotNumber<any, { selection: 'filtr' }>

export type options_IsNotNumberLiteral_typo = IsNotNumberLiteral<any, { selectionx: true }>
export type options_IsNotNumberLiteral_wrong_value = IsNotNumberLiteral<any, { selection: 'filtr' }>

export type options_IsNotNumeric_typo = IsNotNumeric<any, { selectionx: true }>
export type options_IsNotNumeric_wrong_value = IsNotNumeric<any, { selection: 'filtr' }>

export type options_IsNotObject_typo = IsNotObject<any, { selectionx: true }>
export type options_IsNotObject_wrong_value = IsNotObject<any, { selection: 'filtr' }>

export type options_IsNotPositive_typo = IsNotPositive<any, { selectionx: true }>
export type options_IsNotPositive_wrong_value = IsNotPositive<any, { selection: 'filtr' }>

export type options_IsNotPositiveLiteral_typo = IsNotPositiveLiteral<any, { selectionx: true }>
export type options_IsNotPositiveLiteral_wrong_value = IsNotPositiveLiteral<any, { selection: 'filtr' }>

export type options_IsNotStrictFunction_typo = IsNotStrictFunction<any, { selectionx: true }>
export type options_IsNotStrictFunction_wrong_value = IsNotStrictFunction<any, { selection: 'filtr' }>

export type options_IsNotString_typo = IsNotString<any, { selectionx: true }>
export type options_IsNotString_wrong_value = IsNotString<any, { selection: 'filtr' }>

export type options_IsNotStringLiteral_typo = IsNotStringLiteral<any, { selectionx: true }>
export type options_IsNotStringLiteral_wrong_value = IsNotStringLiteral<any, { selection: 'filtr' }>

export type options_IsNotSymbol_typo = IsNotSymbol<any, { selectionx: true }>
export type options_IsNotSymbol_wrong_value = IsNotSymbol<any, { selection: 'filtr' }>

export type options_IsNotTemplateLiteral_typo = IsNotTemplateLiteral<any, { selectionx: true }>
export type options_IsNotTemplateLiteral_wrong_value = IsNotTemplateLiteral<any, { selection: 'filtr' }>

export type options_IsNotTrue_typo = IsNotTrue<any, { selectionx: true }>
export type options_IsNotTrue_wrong_value = IsNotTrue<any, { selection: 'filtr' }>

export type options_IsNotTuple_typo = IsNotTuple<any, { selectionx: true }>
export type options_IsNotTuple_wrong_value = IsNotTuple<any, { selection: 'filtr' }>

export type options_IsNotUndefined_typo = IsNotUndefined<any, { selectionx: true }>
export type options_IsNotUndefined_wrong_value = IsNotUndefined<any, { selection: 'filtr' }>

export type options_IsNotUnknown_typo = IsNotUnknown<any, { selectionx: true }>
export type options_IsNotUnknown_wrong_value = IsNotUnknown<any, { selection: 'filtr' }>

export type options_IsNotVoid_typo = IsNotVoid<any, { selectionx: true }>
export type options_IsNotVoid_wrong_value = IsNotVoid<any, { selection: 'filtr' }>

export type options_IsNull_typo = IsNull<any, { selectionx: true }>
export type options_IsNull_wrong_value = IsNull<any, { selection: 'filtr' }>

export type options_IsNumber_typo = IsNumber<any, { selectionx: true }>
export type options_IsNumber_wrong_value = IsNumber<any, { selection: 'filtr' }>

export type options_IsNumberLiteral_typo = IsNumberLiteral<any, { selectionx: true }>
export type options_IsNumberLiteral_wrong_value = IsNumberLiteral<any, { selection: 'filtr' }>

export type options_IsNumeric_typo = IsNumeric<any, { selectionx: true }>
export type options_IsNumeric_wrong_value = IsNumeric<any, { selection: 'filtr' }>

export type options_IsObject_typo = IsObject<any, { selectionx: true }>
export type options_IsObject_wrong_value = IsObject<any, { selection: 'filtr' }>

export type options_IsObject_$Fn_typo = IsObject.$Fn<{ selectionx: true }>
export type options_IsObject_$Fn_wrong_value = IsObject.$Fn<{ selection: 'filtr' }>

export type options_IsOptionalKey_typo = IsOptionalKey<any, any, { selectionx: true }>
export type options_IsOptionalKey_wrong_value = IsOptionalKey<any, any, { selection: 'filtr' }>

export type options_IsPositive_typo = IsPositive<any, { selectionx: true }>
export type options_IsPositive_wrong_value = IsPositive<any, { selection: 'filtr' }>

export type options_IsPositiveLiteral_typo = IsPositiveLiteral<any, { selectionx: true }>
export type options_IsPositiveLiteral_wrong_value = IsPositiveLiteral<any, { selection: 'filtr' }>

export type options_IsStrictFunction_typo = IsStrictFunction<any, { selectionx: true }>
export type options_IsStrictFunction_wrong_value = IsStrictFunction<any, { selection: 'filtr' }>

export type options_IsString_typo = IsString<any, { selectionx: true }>
export type options_IsString_wrong_value = IsString<any, { selection: 'filtr' }>

export type options_IsStringLiteral_typo = IsStringLiteral<any, { selectionx: true }>
export type options_IsStringLiteral_wrong_value = IsStringLiteral<any, { selection: 'filtr' }>

export type options_IsSymbol_typo = IsSymbol<any, { selectionx: true }>
export type options_IsSymbol_wrong_value = IsSymbol<any, { selection: 'filtr' }>

export type options_IsTemplateLiteral_typo = IsTemplateLiteral<any, { selectionx: true }>
export type options_IsTemplateLiteral_wrong_value = IsTemplateLiteral<any, { selection: 'filtr' }>

export type options_IsTrue_typo = IsTrue<any, { selectionx: true }>
export type options_IsTrue_wrong_value = IsTrue<any, { selection: 'filtr' }>

export type options_IsTuple_typo = IsTuple<any, { selectionx: true }>
export type options_IsTuple_wrong_value = IsTuple<any, { selection: 'filtr' }>

export type options_IsUndefined_typo = IsUndefined<any, { selectionx: true }>
export type options_IsUndefined_wrong_value = IsUndefined<any, { selection: 'filtr' }>

export type options_IsUnion_typo = IsUnion<any, { selectionx: true }>
export type options_IsUnion_wrong_value = IsUnion<any, { selection: 'filtr' }>

export type options_IsUnknown_typo = IsUnknown<any, { selectionx: true }>
export type options_IsUnknown_wrong_value = IsUnknown<any, { selection: 'filtr' }>

export type options_IsVoid_typo = IsVoid<any, { selectionx: true }>
export type options_IsVoid_wrong_value = IsVoid<any, { selection: 'filtr' }>

export type options_Not_typo = Not<any, { $thenx: true }>

export type options_NotAssignable_typo = NotAssignable<any, any, { selectionx: true }>
export type options_NotAssignable_wrong_value = NotAssignable<any, any, { selection: 'filtr' }>

export type options_Or_typo = Or<any, any, { $thenx: true }>

export type options_StringPlus_Includes_typo = StringPlus.Includes<any, any, { selectionx: true }>
export type options_StringPlus_Includes_wrong_value = StringPlus.Includes<any, any, { selection: 'filtr' }>

export type options_Xor_typo = Xor<any, any, { $thenx: true }>
