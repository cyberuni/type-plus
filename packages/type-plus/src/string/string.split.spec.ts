import { it } from 'vitest'

import type { StringSplit } from '../index.js'
import { testType } from '../testing/index.js'

it('should split a string into an array of substrings', () => {
	testType.equal<StringSplit<'ab', 'b'>, ['a', '']>(true)
	testType.equal<StringSplit<'ab', 'a'>, ['', 'b']>(true)

	testType.equal<StringSplit<'abc', ''>, ['a', 'b', 'c']>(true)
	testType.equal<StringSplit<'abc', 'b'>, ['a', 'c']>(true)
	testType.equal<StringSplit<'abc', 'd'>, ['abc']>(true)
	testType.equal<StringSplit<'abc', 'a'>, ['', 'bc']>(true)
	testType.equal<StringSplit<'abc', 'c'>, ['ab', '']>(true)

	testType.equal<StringSplit<'a,b,c', ','>, ['a', 'b', 'c']>(true)
	testType.equal<StringSplit<'a,b,c,', ','>, ['a', 'b', 'c', '']>(true)
	testType.equal<StringSplit<',a,b,c', ','>, ['', 'a', 'b', 'c']>(true)
})
