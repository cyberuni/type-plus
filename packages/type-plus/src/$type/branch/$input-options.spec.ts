import { it } from 'vitest'

import { type $Any, type $InputOptions, type $Unknown, testType } from '../../index.js'

it('creates branch options with single branch', () => {
	testType.equal<$InputOptions<$Any>, { $any?: unknown }>(true)
})

it('creates branch options with multiple branches', () => {
	testType.equal<
		$InputOptions<$Any | $Unknown>,
		{
			$any?: unknown
			$unknown?: unknown
		}
	>(true)
})
