import { it } from 'vitest'

import {
	type Abs,
	type Decrement,
	type GreaterThan,
	type Increment,
	type MathPlus,
	type Max,
	type Multiply,
	type Subtract,
	testType,
} from '../index.js'

it('Add behaves like the top level Add', () => {
	testType.equal<MathPlus.Add<1, 2>, 3>(true)
})

it('holds every math type, each the same as the top level one', () => {
	testType.equal<MathPlus.Abs<-1>, Abs<-1>>(true)
	testType.equal<MathPlus.Decrement<2>, Decrement<2>>(true)
	testType.equal<MathPlus.GreaterThan<2, 1>, GreaterThan<2, 1>>(true)
	testType.equal<MathPlus.Increment<1>, Increment<1>>(true)
	testType.equal<MathPlus.Max<1, 2>, Max<1, 2>>(true)
	testType.equal<MathPlus.Multiply<2, 3>, Multiply<2, 3>>(true)
	testType.equal<MathPlus.Subtract<3, 1>, Subtract<3, 1>>(true)
})

it('ToNegative example', () => {
	testType.equal<MathPlus.ToNegative<5>, -5>(true)
	testType.equal<MathPlus.ToNegative<-5>, -5>(true)
})

it('Max example', () => {
	testType.equal<MathPlus.Max<1, 2>, 2>(true)
})
