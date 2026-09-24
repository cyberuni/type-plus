import { it } from 'vitest'

import { type Exclude, testType } from '../index.js'

it('returns T for special types', () => {
	testType.equal<Exclude<any, undefined>, any>(true)
	testType.equal<Exclude<unknown, undefined>, unknown>(true)
	testType.equal<Exclude<never, undefined>, never>(true)
	testType.equal<Exclude<void, undefined>, void>(true)
})

it('exclude U from union', () => {
	testType.equal<Exclude<undefined | 1, undefined>, 1>(true)
})

it('defaults to replace U with never', () => {
	testType.equal<Exclude<undefined, undefined>, never>(true)
})

it('replaces the excluded members with $excluded', () => {
	testType.equal<Exclude<1, undefined, { $excluded: 2 }>, 1>(true)
	testType.equal<Exclude<undefined, undefined, { $excluded: 2 }>, 2>(true)
	testType.equal<Exclude<undefined | 1, undefined, { $excluded: 2 }>, 1 | 2>(true)

	testType.equal<Exclude<'a' | 'b' | 'c', 'a', { $excluded: 'd' }>, 'b' | 'c' | 'd'>(true)
})
