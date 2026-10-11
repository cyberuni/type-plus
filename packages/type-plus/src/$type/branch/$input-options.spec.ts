import { it } from 'vitest'

import type { $Any, $InputOptions, $Unknown } from '../../index.js'
import { testType } from '../../testing/index.js'

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
