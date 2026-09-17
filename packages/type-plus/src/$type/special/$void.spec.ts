import { it } from 'vitest'
import { type $Branch, type $Unknown, type $Void, type IsNotAny, testType } from '../../index.js'

it('is a unique branch', () => {
	testType.canAssign<$Branch<'$something_else'>, $Void>(false)
	testType.canAssign<$Unknown, $Void>(false)
})

it('is the marker a predicate returns for void under $Branch', () => {
	testType.equal<IsNotAny<void, IsNotAny.$Branch>, $Void>(true)
})
