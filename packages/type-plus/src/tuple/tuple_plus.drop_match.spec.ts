import { it } from 'vitest'

import { type TuplePlus, testType } from '../index.js'

it('returns [] for []', () => {
	testType.equal<TuplePlus.DropMatch<[], undefined>, []>(true)
})

it('drop undefined from tuple', () => {
	type A = TuplePlus.DropMatch<[undefined], undefined>
	testType.equal<A, []>(true)

	type B = TuplePlus.DropMatch<[1, undefined], undefined>
	testType.equal<B, [1]>(true)

	type C = TuplePlus.DropMatch<[1, undefined, 3], undefined>
	testType.equal<C, [1, 3]>(true)

	type D = TuplePlus.DropMatch<[1, string | undefined, 3], undefined>
	testType.equal<D, [1, string, 3]>(true)
})

it('drop undefined from readonly tuple', () => {
	type A = TuplePlus.DropMatch<readonly [undefined], undefined>
	testType.equal<[], A>(true)

	type B = TuplePlus.DropMatch<[1, undefined], undefined>
	testType.equal<[1], B>(true)

	type C = TuplePlus.DropMatch<[1, undefined, 3], undefined>
	testType.equal<[1, 3], C>(true)

	type D = TuplePlus.DropMatch<[1, string | undefined, 3], undefined>
	testType.equal<[1, string, 3], D>(true)
})

it('drop undefined keep null', () => {
	type A = TuplePlus.DropMatch<[undefined | null], undefined>
	testType.equal<[null], A>(true)
})

it('drop null keep undefined', () => {
	type A = TuplePlus.DropMatch<[undefined | null], null>
	testType.equal<[undefined], A>(true)
})

it('drop both null and undefined', () => {
	type A = TuplePlus.DropMatch<[undefined | null], null | undefined>
	testType.equal<[], A>(true)

	type B = TuplePlus.DropMatch<[undefined | null | string], null | undefined>
	testType.equal<[string], B>(true)
})

it('get original if not matched', () => {
	type A = TuplePlus.DropMatch<[1], undefined>
	testType.equal<[1], A>(true)

	type B = TuplePlus.DropMatch<[1], undefined | string>
	testType.equal<[1], B>(true)

	type C = TuplePlus.DropMatch<[1, 2, 3, 4], 5>
	testType.equal<[1, 2, 3, 4], C>(true)
})

it('drop narrow type', () => {
	type C = TuplePlus.DropMatch<[1], number>
	testType.equal<[], C>(true)

	type D = TuplePlus.DropMatch<[1, 2, '3'], number>
	testType.equal<['3'], D>(true)
})

it('keep widen type', () => {
	type D = TuplePlus.DropMatch<[number], 1>
	testType.equal<[number], D>(true)
})

it('drop type from tuple', () => {
	type A = TuplePlus.DropMatch<[1], 1>
	testType.equal<[], A>(true)

	type B = TuplePlus.DropMatch<[number | string], number>
	testType.equal<[string], B>(true)

	type C = TuplePlus.DropMatch<[1, undefined, 3], 1>
	testType.equal<[undefined, 3], C>(true)

	type D = TuplePlus.DropMatch<[1, string | undefined, 3], 3>
	testType.equal<[1, string | undefined], D>(true)
})

it('drop multiple types', () => {
	type Actual = TuplePlus.DropMatch<[1, 2, 3, 4], 2 | 4>
	testType.equal<[1, 3], Actual>(true)
})

it('drop undefined and null', () => {
	type Actual = TuplePlus.DropMatch<[1, undefined, 3, null], undefined | null>
	testType.equal<[1, 3], Actual>(true)
})
