/**
 * Pins the `@example` blocks in the `src/<family>/readme.md` pages to the actual
 * behavior.
 *
 * Those pages are linked from `packages/type-plus/readme.md`, the npm landing
 * page, so they are published documentation. #667 deleted 13 of the 33 for
 * documenting types that no longer existed; nothing stopped the surviving 20
 * from drifting the same way, and they had. This is that stop.
 *
 * Same pattern as `src/<family>/<family>_docs.spec.ts`, but the readme tree cuts
 * across families, so it gets one file.
 */
import { it } from 'vitest'
import {
	type $Else,
	type $Selection,
	type $Then,
	type HasNull,
	type HasUndefined,
	type HasVoid,
	type IsBoolean,
	type IsFunction,
	type IsNotFunction,
	type IsNotObject,
	type IsNotString,
	type IsNotSymbol,
	type IsNotTuple,
	type IsNumber,
	type IsObject,
	type IsStrictFunction,
	type IsString,
	type IsSymbol,
	type IsTuple,
	testType,
} from './index.js'

it('symbol readme', () => {
	testType.equal<IsSymbol<symbol>, true>(true)
	testType.equal<IsSymbol<1>, false>(true)
	testType.equal<IsSymbol<symbol, { selection: 'filter' }>, symbol>(true)
	testType.equal<IsSymbol<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotSymbol<symbol>, false>(true)
})
it('string readme', () => {
	testType.equal<IsString<string>, true>(true)
	testType.equal<IsString<'a'>, true>(true)
	testType.equal<IsString<1>, false>(true)
	testType.equal<IsString<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsString<'a', { selection: 'filter' }>, 'a'>(true)
	testType.equal<IsString<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsString<string, { exact: true }>, true>(true)
	testType.equal<IsString<'a', { exact: true }>, false>(true)
	testType.equal<IsString<string, { exact: true; selection: 'filter' }>, string>(true)
	testType.equal<IsString<'a', { exact: true; selection: 'filter' }>, never>(true)
	testType.equal<IsNotString<string>, false>(true)
})
it('function readme', () => {
	testType.equal<IsFunction<Function>, true>(true)
	testType.equal<IsFunction<() => void>, true>(true)
	testType.equal<IsFunction<{ a: 1 }>, false>(true)
	testType.equal<IsFunction<never>, false>(true)
	testType.equal<IsFunction<unknown>, false>(true)
	testType.equal<IsFunction<() => void, { selection: 'filter' }>, () => void>(true)
	testType.equal<IsFunction<{ a: 1 }, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictFunction<Function>, true>(true)
	testType.equal<IsStrictFunction<() => void>, false>(true)
	testType.equal<IsStrictFunction<(() => void) & { a: 1 }>, false>(true)
	testType.equal<IsNotFunction<Function>, false>(true)
})
it('object readme', () => {
	testType.equal<IsObject<object>, true>(true)
	testType.equal<IsObject<{}>, true>(true)
	testType.equal<IsObject<{ a: number }>, true>(true)
	testType.equal<IsObject<1>, false>(true)
	testType.equal<IsObject<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
	testType.equal<IsObject<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsObject<object, { exact: true }>, true>(true)
	testType.equal<IsObject<{}, { exact: true }>, false>(true)
	testType.equal<IsNotObject<1>, true>(true)
})
it('number and boolean exact', () => {
	testType.equal<IsNumber<number, { exact: true }>, true>(true)
	testType.equal<IsNumber<1, { exact: true }>, false>(true)
	testType.equal<IsNumber<number, { exact: true; selection: 'filter' }>, number>(true)
	testType.equal<IsNumber<1, { exact: true; selection: 'filter' }>, never>(true)
	testType.equal<IsBoolean<boolean, { exact: true }>, true>(true)
	testType.equal<IsBoolean<true, { exact: true }>, false>(true)
	testType.equal<IsBoolean<boolean, { exact: true; selection: 'filter' }>, boolean>(true)
	testType.equal<IsBoolean<true, { exact: true; selection: 'filter' }>, never>(true)
})
it('tuple readme', () => {
	testType.equal<IsTuple<[]>, true>(true)
	testType.equal<IsTuple<number[]>, false>(true)
	testType.equal<IsTuple<string>, false>(true)
	testType.equal<IsTuple<never>, false>(true)
	testType.equal<IsTuple<unknown>, false>(true)
	testType.equal<IsTuple<[], { selection: 'filter' }>, []>(true)
	testType.equal<IsTuple<[1], { selection: 'filter' }>, [1]>(true)
	testType.equal<IsTuple<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsTuple<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotTuple<[]>, false>(true)
	testType.equal<IsNotTuple<[1]>, false>(true)
	testType.equal<IsNotTuple<number[]>, true>(true)
	testType.equal<IsNotTuple<string>, true>(true)
	testType.equal<IsNotTuple<never>, true>(true)
	testType.equal<IsNotTuple<unknown>, true>(true)
})
it('Has* branch selector', () => {
	testType.equal<HasUndefined<undefined, $Selection.Branch>, $Then>(true)
	testType.equal<HasUndefined<string, $Selection.Branch>, $Else>(true)
	testType.equal<HasVoid<void, $Selection.Branch>, $Then>(true)
	testType.equal<HasVoid<string, $Selection.Branch>, $Else>(true)
	testType.equal<HasNull<null, $Selection.Branch>, $Then>(true)
	testType.equal<HasNull<string, $Selection.Branch>, $Else>(true)
})
