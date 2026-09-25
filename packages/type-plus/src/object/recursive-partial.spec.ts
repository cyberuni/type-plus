import { it } from 'vitest'

import { type RecursivePartial, testType } from '../index.js'

it('marks props partial', () => {
	testType.equal<RecursivePartial<{ a: number }>, { a?: number | undefined }>(true)
})

it('recursively marks props partial', () => {
	testType.equal<
		RecursivePartial<{
			a: { b: number }
		}>,
		{ a?: { b?: number | undefined } | undefined }
	>(true)
})

it('marks array props partial', () => {
	testType.equal<RecursivePartial<{ a: number[] }>, { a?: number[] | undefined }>(true)
})

it('marks function props partial', () => {
	const r = testType.equal<RecursivePartial<{ a(): void }>, { a?: (() => void) | undefined }>(true)
	r.a
})

it('marks function complex type partial', () => {
	type F = { (): void; b: { c: number } }

	type R = RecursivePartial<{ f: F }>
	const r: R = { f() {} } as any

	// @ts-expect-error
	r.f()

	const b = r.f?.b

	testType.equal<typeof b, { c?: number | undefined } | undefined>(true)

	testType.equal<
		R['f'],
		| ((() => void) & {
				b?: { c?: number | undefined } | undefined
		  })
		| undefined
	>(true)
})
