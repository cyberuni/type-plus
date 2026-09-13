import { it } from 'vitest'
import { type $MergeOptions, testType } from '../../index.js'

it('overrides', () => {
	testType.equal<$MergeOptions<{ $any: 1 }, {}>, { $any: 1 }>(true)
	testType.equal<$MergeOptions<{ $any: 1 }, { $any: 2 }>, { $any: 2 }>(true)
	testType.equal<$MergeOptions<{ $any: 1; $else: 2 }, { $any: 2 }>, { $any: 2; $else: 2 }>(true)
})

it('returns the defaults when there are no options', () => {
	testType.equal<$MergeOptions<{}, { $any: 2 }>, { $any: 2 }>(true)
	testType.equal<$MergeOptions<{}, {}>, {}>(true)
})
