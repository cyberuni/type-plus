import { it } from 'vitest'
import { type $Branch, type $Unknown, type $Void, type IsAny, type IsNotAny, testType } from '../../index.js'

it('is a unique branch', () => {
	testType.canAssign<$Branch<'$something_else'>, $Void>(false)
	testType.canAssign<$Unknown, $Void>(false)
})

it('is the marker a predicate returns for void under $Branch', () => {
	testType.equal<IsNotAny<void, IsNotAny.$Branch>, $Void>(true)
})

it('is the marker a predicate returns for void under $Void.$Branch', () => {
	testType.equal<IsAny<void, $Void.$Branch>, $Void>(true)
	testType.equal<IsAny<1, $Void.$Branch>, false>(true)
})

it('lets the $void option pick the result for void', () => {
	testType.equal<IsAny<void, { $void: 'void' }>, 'void'>(true)
})
