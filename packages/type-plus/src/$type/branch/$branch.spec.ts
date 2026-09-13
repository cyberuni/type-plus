import { describe, it } from 'vitest'
import type { $Any, $Branch, $BranchOptions, $Else, $Then, $Unknown, IsString } from '../../index.js'
import { testType } from '../../index.js'

it('create a branch type with property name', () => {
	type $Then = $Branch<'$then'>
	testType.equal<$Then['~type-plus/branch'], '$then'>(true)
})

it('the property name must start with $', () => {
	// @ts-expect-error
	type _$DoesNotWork = $Branch<'nope'>
})

describe('markers', () => {
	it('carries the branch name in the `~type-plus/branch` key', () => {
		testType.equal<$Then['~type-plus/branch'], '$then'>(true)
		testType.equal<$Else['~type-plus/branch'], '$else'>(true)
	})

	it('is not a string', () => {
		testType.equal<$Then extends string ? true : false, false>(true)
		testType.canAssign<$Then, string>(false)
		testType.canAssign<$Then, '$then'>(false)
		testType.equal<IsString<$Then>, false>(true)
	})

	it('is distinct from other markers', () => {
		testType.canAssign<$Then, $Else>(false)
		testType.canAssign<$Else, $Then>(false)
		testType.equal<$Then, $Else>(false)
	})

	it('is structurally equal to a marker with the same name', () => {
		interface $MyThen extends $Branch<'$then'> {}
		testType.equal<$MyThen, $Then>(true)
	})
})

describe('$BranchOptions', () => {
	it('creates branch options with single branch', () => {
		testType.equal<$BranchOptions<$Any>, { $any: $Any }>(true)
	})

	it('creates branch options with multiple branches', () => {
		testType.equal<
			$BranchOptions<$Any | $Unknown>,
			{
				$any: $Any
				$unknown: $Unknown
			}
		>(true)
	})

	it('example: creates `$then` and `$else` options', () => {
		testType.equal<$BranchOptions<$Then | $Else>, { $then: $Then; $else: $Else }>(true)
	})
})
