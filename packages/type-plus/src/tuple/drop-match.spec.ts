import { describe, test } from 'vitest'

import { type DropMatch, type DropNull, type DropNullable, type DropUndefined, testType } from '../index.js'

describe('DropMatch<A, C>', () => {
	describe('A is array', () => {
		test('drop all types gets never[]', () => {
			type A = DropMatch<Array<string>, string>
			testType.equal<A, never[]>(true)

			type B = DropMatch<Array<string | boolean>, string | boolean>
			testType.equal<B, never[]>(true)
		})

		test('drop undefined and null from array', () => {
			type A = DropMatch<Array<string | undefined>, undefined>
			testType.equal<A, string[]>(true)

			type B = DropMatch<Array<string | number | undefined>, undefined>
			testType.equal<B, Array<string | number>>(true)

			type C = DropMatch<Array<string | number | undefined | null>, undefined | null>
			testType.equal<C, Array<string | number>>(true)
		})

		test('can get undefined and null array when other types dropped', () => {
			type A = DropMatch<Array<string | undefined>, string>
			testType.equal<A, Array<undefined>>(true)

			type B = DropMatch<Array<string | number | null>, string>
			testType.equal<B, Array<number | null>>(true)
		})

		test('unmatched criteria returns original', () => {
			type Actual = DropMatch<Array<string | undefined>, number>
			testType.equal<Actual, Array<string | undefined>>(true)
		})

		test('drop all narrow types', () => {
			type A = DropMatch<Array<1 | 2 | 3>, number>
			testType.equal<A, never[]>(true)

			type B = DropMatch<Array<1 | 2 | 3 | string>, number>
			testType.equal<B, Array<string>>(true)
		})

		test('will not drop widen type', () => {
			type A = DropMatch<Array<number>, 1>
			testType.equal<A, Array<number>>(true)

			type B = DropMatch<Array<string | 'foo'>, 'foo'>
			testType.equal<B, Array<string>>(true)

			// C is currently `string[] | string[]` (TypeScript 4.6.2)
			// It does not collapse to `string[]`
			// type C = DropMatch<Array<string | 'foo'>, 'foo' | 'boo'>
			// Here `string[] | string[]` literal collapses to `string[]`
			// commenting this out as it will likely be improved in future versions of TypeScript
			// testType.equal<C, string[] | string[]>(true)
		})
	})

	describe('A is Tuple', () => {
		test('empty tuple', () => {
			type A = DropMatch<[], undefined>
			testType.equal<A, []>(true)
		})

		test('drop undefined from tuple', () => {
			type A = DropMatch<[undefined], undefined>
			testType.equal<A, []>(true)

			type B = DropMatch<[1, undefined], undefined>
			testType.equal<B, [1]>(true)

			type C = DropMatch<[1, undefined, 3], undefined>
			testType.equal<C, [1, 3]>(true)

			type D = DropMatch<[1, string | undefined, 3], undefined>
			testType.equal<D, [1, string, 3]>(true)
		})

		test('drop undefined from readonly tuple', () => {
			type A = DropMatch<readonly [undefined], undefined>
			testType.equal<[], A>(true)

			type B = DropMatch<[1, undefined], undefined>
			testType.equal<[1], B>(true)

			type C = DropMatch<[1, undefined, 3], undefined>
			testType.equal<[1, 3], C>(true)

			type D = DropMatch<[1, string | undefined, 3], undefined>
			testType.equal<[1, string, 3], D>(true)
		})

		test('drop undefined keep null', () => {
			type A = DropMatch<[undefined | null], undefined>
			testType.equal<[null], A>(true)
		})

		test('drop null keep undefined', () => {
			type A = DropMatch<[undefined | null], null>
			testType.equal<[undefined], A>(true)
		})

		test('drop both null and undefined', () => {
			type A = DropMatch<[undefined | null], null | undefined>
			testType.equal<[], A>(true)

			type B = DropMatch<[undefined | null | string], null | undefined>
			testType.equal<[string], B>(true)
		})

		test('get original if not matched', () => {
			type A = DropMatch<[1], undefined>
			testType.equal<[1], A>(true)

			type B = DropMatch<[1], undefined | string>
			testType.equal<[1], B>(true)

			type C = DropMatch<[1, 2, 3, 4], 5>
			testType.equal<[1, 2, 3, 4], C>(true)
		})

		test('drop narrow type', () => {
			type C = DropMatch<[1], number>
			testType.equal<[], C>(true)
		})

		test('keep widen type', () => {
			type D = DropMatch<[number], 1>
			testType.equal<[number], D>(true)
		})

		test('drop type from tuple', () => {
			type A = DropMatch<[1], 1>
			testType.equal<[], A>(true)

			type B = DropMatch<[number | string], number>
			testType.equal<[string], B>(true)

			type C = DropMatch<[1, undefined, 3], 1>
			testType.equal<[undefined, 3], C>(true)

			type D = DropMatch<[1, string | undefined, 3], 3>
			testType.equal<[1, string | undefined], D>(true)
		})

		test('drop multiple types', () => {
			type Actual = DropMatch<[1, 2, 3, 4], 2 | 4>
			testType.equal<[1, 3], Actual>(true)
		})

		test('drop undefined and null', () => {
			type Actual = DropMatch<[1, undefined, 3, null], undefined | null>
			testType.equal<[1, 3], Actual>(true)
		})
	})
})

describe('DropUndefined<A>', () => {
	test('drop from array type', () => {
		type A = DropUndefined<Array<string | undefined>>
		testType.equal<string[], A>(true)

		type B = DropUndefined<Array<string | number>>
		testType.equal<Array<string | number>, B>(true)

		type C = DropUndefined<Array<string | number | undefined | null>>
		testType.equal<Array<string | number | null>, C>(true)
	})

	test('drop from tuple type', () => {
		type A = DropUndefined<[string, undefined, number, null]>
		testType.equal<[string, number, null], A>(true)
	})
})

describe('DropNull<A>', () => {
	test('drop from array type', () => {
		type A = DropNull<Array<string | null>>
		testType.equal<string[], A>(true)

		type B = DropNull<Array<string | number>>
		testType.equal<Array<string | number>, B>(true)

		type C = DropNull<Array<string | number | undefined | null>>
		testType.equal<Array<string | number | undefined>, C>(true)
	})

	test('drop from tuple type', () => {
		type A = DropNull<[string, undefined, number, null]>
		testType.equal<[string, undefined, number], A>(true)
	})
})

describe('DropNullable<A>', () => {
	test('drop from array type', () => {
		type A = DropNullable<Array<string | null>>
		testType.equal<string[], A>(true)

		type B = DropNullable<Array<string | number>>
		testType.equal<Array<string | number>, B>(true)

		type C = DropNullable<Array<string | number | undefined | null>>
		testType.equal<Array<string | number>, C>(true)
	})

	test('drop from tuple type', () => {
		type A = DropNullable<[string, undefined, number, null]>
		testType.equal<[string, number], A>(true)
	})
})
