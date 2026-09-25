import { it } from 'vitest'

import { type $Else, type $Never, type $ResolveBranch, type $Selection, type $Then, testType } from '../../index.js'

it('returns boolean if selection is predicate', () => {
	testType.equal<$ResolveBranch<{ selection: 'predicate' }, [$Then], 123>, true>(true)
	testType.equal<$ResolveBranch<{ selection: 'predicate' }, [$Else], 123>, false>(true)
})

it('returns T or never if selection is filter', () => {
	testType.equal<$ResolveBranch<{ selection: 'filter' }, [$Then], 123>, 123>(true)
	testType.equal<$ResolveBranch<{ selection: 'filter' }, [$Else], 123>, never>(true)
})

it('returns the value in $then or $else over `selection`', () => {
	testType.equal<$ResolveBranch<{ selection: 'filter'; $then: 133 }, [$Then], 123>, 133>(true)
	testType.equal<$ResolveBranch<{ selection: 'filter'; $else: 133 }, [$Else], 123>, 133>(true)
	testType.equal<$ResolveBranch<{ selection: 'predicate'; $then: 133 }, [$Then], 123>, 133>(true)
	testType.equal<$ResolveBranch<{ selection: 'predicate'; $else: 133 }, [$Else], 123>, 133>(true)
})

it('returns the default value if `$O` does not define any specific branch', () => {
	testType.equal<$ResolveBranch<{}, [$Then], true>, true>(true)
	testType.equal<$ResolveBranch<{}, [$Never, $Else], true>, false>(true)
})

it('returns the value of the single specified branch if `$O` defines it', () => {
	testType.equal<$ResolveBranch<$Selection.Branch, [$Then], true>, $Then>(true)
	testType.equal<$ResolveBranch<{ $else: 123 }, [$Else], false>, 123>(true)
})

it('returns the first matching branch value in `$O`', () => {
	testType.equal<$ResolveBranch<$Selection.Branch & $Never.$Branch, [$Never, $Else], 123>, $Never>(true)
	testType.equal<$ResolveBranch<$Selection.Branch & { $never: unknown }, [$Never, $Else], 123>, unknown>(true)
	testType.equal<$ResolveBranch<$Selection.Branch, [$Never, $Else], 123>, $Else>(true)
})

it('skip over branches that is `unknown`', () => {
	testType.equal<$ResolveBranch<$Selection.Branch, [unknown, $Else], 123>, $Else>(true)
})

it('returns default value if all branches are `unknown`', () => {
	testType.equal<$ResolveBranch<{}, [unknown], 123>, 123>(true)
	testType.equal<$ResolveBranch<{}, [unknown, unknown], 123>, 123>(true)
})

it('returns default value if no match branch and the last branch is unknown', () => {
	testType.equal<$ResolveBranch<{ $then: 123 }, [$Else, unknown], 123>, 123>(true)
})

it('can override with unknown or any', () => {
	testType.equal<$ResolveBranch<{ $then: unknown }, [$Then], true>, unknown>(true)
	testType.equal<$ResolveBranch<{ $then: any }, [$Then], true>, any>(true)
})
