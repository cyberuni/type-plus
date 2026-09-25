import { it } from 'vitest'
import { type $Branch, type $Unknown, type IsAny, testType } from '../../index.js'

it('is a unique branch', () => {
	testType.canAssign<$Branch<'$something_else'>, $Unknown>(false)
})

it('is the marker a predicate returns for unknown under $Unknown.$Branch', () => {
	testType.equal<IsAny<unknown, $Unknown.$Branch>, $Unknown>(true)
	testType.equal<IsAny<1, $Unknown.$Branch>, false>(true)
})

it('lets the $unknown option pick the result for unknown', () => {
	testType.equal<IsAny<unknown, { $unknown: 'unknown' }>, 'unknown'>(true)
})
