import { it } from 'vitest'

import { testType, type Widen } from '../index.js'

it('widens a literal to its parent type', () => {
	testType.equal<Widen<1>, number>(true)
	testType.equal<Widen<true>, boolean>(true)
	testType.equal<Widen<'a'>, string>(true)
})

it('leaves an already widened type alone', () => {
	testType.equal<Widen<number>, number>(true)
	testType.equal<Widen<boolean>, boolean>(true)
	testType.equal<Widen<string>, string>(true)
})

it('leaves everything else alone', () => {
	testType.equal<Widen<{ a: 1 }>, { a: 1 }>(true)
	testType.equal<Widen<1n>, 1n>(true)
	testType.equal<Widen<null>, null>(true)
	testType.equal<Widen<undefined>, undefined>(true)
})
