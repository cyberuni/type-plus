import { it } from 'vitest'
import type { $Distributive, IsObject } from '../../index.js'
import { testType } from '../../index.js'

it('returns true by default when $Options does not have the `distributive` property or it is undefined', () => {
	testType.equal<$Distributive.Parse<{}>, true>(true)
	testType.equal<$Distributive.Parse<{ distributive: undefined }>, true>(true)
})

it(`returns value from $Options['distributive']`, () => {
	testType.equal<$Distributive.Parse<{ distributive: true }>, true>(true)
	testType.equal<$Distributive.Parse<{ distributive: false }>, false>(true)
})

it('supports overrides', () => {
	testType.equal<$Distributive.Parse<{ distributive: true }, { $then: 1 }>, 1>(true)
	testType.equal<$Distributive.Parse<{ distributive: false }, { $else: 1 }>, 1>(true)
})

it('supports override with any[] and unknown[]', () => {
	testType.equal<$Distributive.Parse<{ distributive: true }, { $then: any[] }>, any[]>(true)
	testType.equal<$Distributive.Parse<{ distributive: false }, { $else: unknown[] }>, unknown[]>(true)
})

it('supports override with any and unknown', () => {
	testType.equal<$Distributive.Parse<{ distributive: true }, { $then: any }>, any>(true)
	testType.equal<$Distributive.Parse<{ distributive: false }, { $else: unknown }>, unknown>(true)
})

it('turning it off stops a consuming type from distributing over a union', () => {
	testType.equal<IsObject<{} | 1>, boolean>(true)
	testType.equal<IsObject<{} | 1, { distributive: false }>, false>(true)
})
