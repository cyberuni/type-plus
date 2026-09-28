import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts the passing literal or a Failed naming the check', () => {
	testType.equal<
		testType.Expectation<false, 'equal', string, number>,
		false | testType.Failed<'equal', string, number>
	>(true)
	testType.equal<
		testType.Expectation<true, 'equal', string, string>,
		true | testType.Failed<'not equal', string, string>
	>(true)
})

it('accepts both literals when the result is boolean', () => {
	testType.equal<testType.Expectation<boolean, 'canAssign', number | string, number>, boolean>(true)
	testType.canAssign<number | string, number>(true)
	testType.canAssign<number | string, number>(false)
})

it('accepts only Failed when the result is never', () => {
	testType.equal<testType.Expectation<never, 'equal', 1, 1 | 2>, testType.Failed<'equal', 1, 1 | 2>>(true)
	// @ts-expect-error
	testType.equal<1, 1, 2>(true)
	// @ts-expect-error
	testType.equal<1, 1, 2>(false)
})

it('rejects the wrong literal in an immediate check', () => {
	// @ts-expect-error Argument of type 'true' is not assignable to parameter of type 'false | Failed<"equal", string, number>'.
	testType.equal<string, number>(true)
	// @ts-expect-error Argument of type 'false' is not assignable to parameter of type 'true | Failed<"not equal", string, string>'.
	testType.equal<string, string>(false)
})
