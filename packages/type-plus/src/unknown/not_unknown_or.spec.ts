import { it } from 'vitest'

import { type $Unknown, type NotUnknownOr, testType } from '../index.js'

it('pass through if not unknown', () => {
	testType.equal<NotUnknownOr<number>, number>(true)
	testType.equal<NotUnknownOr<boolean | string>, boolean | string>(true)
})

it('returns $Unknown if unknown', () => {
	testType.equal<NotUnknownOr<unknown>, $Unknown>(true)

	type R<T> = NotUnknownOr<T> extends $Unknown ? 1 : 2
	testType.equal<R<unknown>, 1>(true)
	testType.equal<R<number>, 2>(true)
})

it('can override Else branch if the branch is simple', () => {
	// Do this only when the branch is simple to avoid performance issue.
	testType.equal<NotUnknownOr<unknown, { $unknown: 1 }>, 1>(true)
})
