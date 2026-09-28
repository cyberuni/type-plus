import { expect, it } from 'vitest'

import { testType } from '../index.js'

it('binds the type a promise resolves to as the subject', () => {
	testType.of(Promise.resolve(1)).resolves.equal<number>(true)

	// @ts-expect-error
	testType.of(Promise.resolve(1)).resolves.equal<string>(true)
})

it('checks what an async function resolves to after returns', () => {
	testType.of(async () => 'a' as const).returns.resolves.equal<'a'>(true)
	testType.of(async () => {}).returns.resolves.void(true)
})

it('accepts any PromiseLike', () => {
	testType.of({} as PromiseLike<number>).resolves.number(true)
})

it('unwraps one level', () => {
	testType.of({} as PromiseLike<Promise<number>>).resolves.equal<Promise<number>>(true)
})

it('is the union of what they resolve to for a union of promises', () => {
	testType.of(Promise.resolve(1) as Promise<number> | Promise<string>).resolves.equal<number | string>(true)
})

it('rejects a check on a type that is not a PromiseLike', () => {
	testType.equal<testType.Subject<number>['resolves'], testType.Failed<'resolves', number, PromiseLike<unknown>>>(true)

	// @ts-expect-error
	testType.of(1).resolves.equal<number>(true)
	// @ts-expect-error
	testType.of(async () => 1).resolves.equal<number>(true)
	// @ts-expect-error
	testType.of(1 as number | Promise<number>).resolves.number(true)
})

it('returns expected at runtime', () => {
	expect(testType.of(Promise.resolve(1)).resolves.number(true)).toBe(true)
})
