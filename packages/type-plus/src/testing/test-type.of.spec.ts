import { expect, it } from 'vitest'

import { testType } from '../index.js'

it('checks the type of an inline expression', () => {
	testType.of([1, 2].map(String)).equal<string[]>(true)

	// @ts-expect-error
	testType.of([1, 2].map(String)).equal<number[]>(true)
})

it('checks the inferred result of a generic call', () => {
	function pair<A, B>(a: A, b: B) {
		return [a, b] as const
	}

	testType.of(pair(1, 'a')).equal<readonly [number, string]>(true)
	testType.of(pair(1, 'a')).tuple(true)
})

it('widens an inline literal as TypeScript infers it, unless written as const', () => {
	testType.of('a').string(true)
	testType.of('a').equal<'a'>(false)
	testType.of('a').equal<string>(true)
	testType.of('a' as const).equal<'a'>(true)
})

it('binds the subject to the declared type of a variable', () => {
	const subject = testType.of({ a: 1 })
	testType.equal<typeof subject, testType.Subject<{ a: number }>>(true)

	subject.equal<{ a: number }>(true)
	subject.canAssign<{ a: 1 }>(false)
	subject.object(true)
})

it('compares against two types with equal', () => {
	testType.of(1 as const).equal<1, 1>(true)

	// @ts-expect-error
	testType.of(1 as const).equal<1, 2>(true)
})

it('forwards the options of each check', () => {
	testType.of(1 as number | string).canAssign<number>(true)
	testType.of(1 as number | string).canAssign<number>(false)
	testType.of(1 as number | string).canAssign<number, { distributive: false }>(false)
	testType.of(1 as number | string).strictCanAssign<number>(false)

	testType.of('a' as const).string(true)
	testType.of('a' as const).string<{ exact: true }>(false)
	testType.of('a' as const).strictString(false)
	testType.of('a' as string).strictString(true)
})

it('exposes the special type checks', () => {
	testType.of(1 as any).any(true)
	testType.of(1 as unknown).unknown(true)
	testType.of(1 as never).never(true)
	testType.of(undefined as void).void(true)
	testType.of(1 as number | null).hasNull(true)
	testType.of(1 as number | undefined).hasUndefined(true)
	testType.of(1 as number | void).hasVoid(true)
})

it('rejects the wrong expectation', () => {
	// @ts-expect-error
	testType.of(1).string(true)

	// @ts-expect-error
	testType.of(1).number(false)
})

it('returns expected as the subject type for inspection', () => {
	const r = testType.of(1).number(true)
	testType.equal<typeof r, number>(true)
	expect(r).toBe(true)
})
