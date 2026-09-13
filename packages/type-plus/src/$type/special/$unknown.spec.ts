import { it } from 'vitest'
import { type $Branch, type $Unknown, testType } from '../../index.js'

it('is a unique branch', () => {
	testType.canAssign<$Branch<'$something_else'>, $Unknown>(false)
})
