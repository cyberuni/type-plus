import { it } from 'vitest'
import { type $Never, type $NotNever, type IsAny, testType } from '../../index.js'

it('$Never and $NotNever is not the same', () => {
	testType.equal<$Never, $NotNever>(false)
})

it('is the marker a predicate returns for never under $Never.$Branch', () => {
	testType.equal<IsAny<never, $Never.$Branch>, $Never>(true)
	testType.equal<IsAny<1, $Never.$Branch>, false>(true)
})

it('lets the $never option pick the result for never', () => {
	testType.equal<IsAny<never, { $never: 'never' }>, 'never'>(true)
})
