import { it } from 'vitest'

import { type $Fn, type ArrayPlus, type IsObject, testType } from '../index.js'

it('returns never if input is never', () => {
	testType.equal<ArrayPlus.Find<never, number>, never>(true)
})

// TODO
// it('can override the never case', () => {
// 	testType.equal<ArrayPlus.Find<never, 1, { $never: 2 }>, 2>(true)
// })

it('returns never if the type in the array does not satisfy the criteria', () => {
	testType.equal<ArrayPlus.Find<string[], number>, never>(true)
})

it('can override no_match case', () => {
	testType.equal<ArrayPlus.Find<number[], string, { $notMatch: 'a' }>, 'a'>(true)
})

it('returns T if T satisfies the Criteria', () => {
	testType.equal<ArrayPlus.Find<number[], number>, number>(true)
	testType.equal<ArrayPlus.Find<Array<string | number>, number | string>, number | string>(true)
})

it('returns Criteria | undefined if T is a widen type of Criteria', () => {
	testType.equal<ArrayPlus.Find<number[], 1>, 1 | undefined>(true)
	testType.equal<ArrayPlus.Find<Array<string | number>, 1>, 1 | undefined>(true)
	testType.equal<ArrayPlus.Find<Array<{ a: number } | { b: number }>, { a: 1 }>, { a: 1 } | undefined>(true)
})

it('can override widen case', () => {
	testType.equal<ArrayPlus.Find<number[], 1, { $widen: never }>, never>(true)
})

it('does not support tuple', () => {
	testType.equal<
		ArrayPlus.Find<[true, 1, 'x', 3], number>,
		'does not support tuple. Please use `FindFirst` or `TuplePlus.Find` instead.'
	>(true)
})

it('returns never if the union type does not satisfy the Criteria', () => {
	testType.equal<ArrayPlus.Find<Array<string | number>, boolean>, never>(true)
})

it('returns Criteria if T is a union partially satisfies the Criteria', () => {
	testType.equal<ArrayPlus.Find<Array<string | number>, number>, number>(true)
	testType.equal<ArrayPlus.Find<Array<1 | 2 | 'x'>, number>, 1 | 2>(true)
})

it('can override unionNotMach to `undefined`', () => {
	// adding `undefined` to the result better match the behavior in JavaScript,
	// as an array of `Array<string | number>` can contains only `string` or `number`.
	// so `Find<Array<string | number>, string>` returns `string | undefined`.
	testType.equal<ArrayPlus.Find<Array<string | number>, number, { $unionNotMatch: undefined }>, number | undefined>(
		true,
	)
	testType.equal<ArrayPlus.Find<Array<1 | 2 | 'x'>, number, { $unionNotMatch: undefined }>, 1 | 2 | undefined>(true)
})

it('handles union not match and widen cases separately', () => {
	testType.equal<
		ArrayPlus.Find<
			Array<string | number>,
			1,
			{
				$widen: 234
				$unionNotMatch: 123
			}
		>,
		123 | 234
	>(true)
})

it('can override the union_miss case', () => {
	testType.equal<ArrayPlus.Find<Array<string | number>, number, { $unionNotMatch: never }>, number>(true)
})

it('will not affect other cases', () => {
	testType.equal<
		ArrayPlus.Find<Array<string | number>, number, { $never: 123 }>,
		number | ArrayPlus.Find.DefaultOptions<unknown>['$unionNotMatch']
	>(true)
	testType.equal<ArrayPlus.Find<never, 1, { $notMatch: 123 }>, ArrayPlus.Find.DefaultOptions<unknown>['$never']>(true)
	testType.equal<
		ArrayPlus.Find<number[], string, { $tuple: 123 }>,
		ArrayPlus.Find.DefaultOptions<unknown>['$notMatch']
	>(true)
	testType.equal<ArrayPlus.Find<[], 1, { $widen: 123 }>, ArrayPlus.Find.DefaultOptions<unknown>['$tuple']>(true)
	testType.equal<ArrayPlus.Find<number[], 1, { $unionNotMatch: 123 }>, ArrayPlus.Find.DefaultOptions<1>['$widen']>(true)
})

it('support readonly array', () => {
	testType.equal<ArrayPlus.Find<readonly number[], 1>, 1 | undefined>(true)
})

it('finds the element types a type function returns true for', () => {
	testType.equal<ArrayPlus.Find<Array<{ a: 1 }>, IsObject.$Fn>, { a: 1 }>(true)
	testType.equal<ArrayPlus.Find<Array<1 | { a: 1 }>, IsObject.$Fn>, { a: 1 }>(true)
	testType.equal<ArrayPlus.Find<Array<1 | { a: 1 }>, $Fn.Not<IsObject.$Fn>>, 1>(true)
	testType.equal<ArrayPlus.Find<Array<{ a: 1 }>, IsObject.$Fn<{ exact: true }>>, never>(true)
	testType.equal<ArrayPlus.Find<string[], IsObject.$Fn>, never>(true)
})
