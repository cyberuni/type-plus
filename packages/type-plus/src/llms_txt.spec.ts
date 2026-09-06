/**
 * Pins the conventions stated in `llms.txt` to the implementation.
 *
 * `llms.txt` is the orientation layer an agent reads before touching the
 * `.d.ts`. Its per-family content is derived from the export surface, but the
 * conventions it explains are prose in `scripts/generate-llms-txt.mjs`; these
 * assertions are what stop that prose from drifting.
 */
import { it } from 'vitest'
import { type $Else, type $Then, type IsNever, type IsPositive, type IsString, testType } from './index.js'

it('llms.txt conventions', () => {
	testType.equal<IsPositive<number>, boolean>(true)
	testType.equal<IsString<string | 1, { selection: 'filter' }>, string>(true)
	testType.equal<IsString<string | 1, { distributive: false }>, false>(true)
	testType.equal<IsNever<any, { $any: 'any' }>, 'any'>(true)
	testType.equal<IsNever<never, IsNever.$Branch>, $Then>(true)
	testType.equal<IsNever<1, IsNever.$Branch>, $Else>(true)
})
