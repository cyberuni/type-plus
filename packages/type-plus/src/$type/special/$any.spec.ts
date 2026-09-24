import { it } from 'vitest'
import { type $Any, type $Branch, type IsNever, testType } from '../../index.js'

it('is a unique branch', () => {
	testType.canAssign<$Branch<'$something_else'>, $Any>(false)
})

it('is the marker a predicate returns for any under $Any.$Branch', () => {
	testType.equal<IsNever<any, $Any.$Branch>, $Any>(true)
	testType.equal<IsNever<1, $Any.$Branch>, false>(true)
})

it('lets the $any option pick the result for any', () => {
	testType.equal<IsNever<any, { $any: 'any' }>, 'any'>(true)
})
