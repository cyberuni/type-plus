import { it } from 'vitest'

import { type $Else, type $Selection, type $Then, type HasNull, testType } from '../index.js'

it('returns false when there is no null', () => {
	testType.equal<HasNull<1 | 2>, false>(true)
})

it('returns true when there is null', () => {
	testType.equal<HasNull<null>, true>(true)
	testType.equal<HasNull<null | 1>, true>(true)
})

it('works as filter', () => {
	testType.equal<HasNull<null, { selection: 'filter' }>, null>(true)
	testType.equal<HasNull<null | 1, { selection: 'filter' }>, null | 1>(true)

	testType.equal<HasNull<number, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<HasNull<null, $Selection.Branch>, $Then>(true)
	testType.equal<HasNull<number, $Selection.Branch>, $Else>(true)
})

it('works with partial customization', () => {
	testType.equal<HasNull<null | 1, { $then: 1 }>, 1>(true)
	testType.equal<HasNull<0, { $then: 1 }>, false>(true)

	testType.equal<HasNull<null | 1, { $else: 2 }>, true>(true)
	testType.equal<HasNull<0, { $else: 2 }>, 2>(true)
})
