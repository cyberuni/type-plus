/**
 * Pins the `@example` blocks in the `src/math/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/math/*.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { it } from 'vitest'

import {
	type Abs,
	type Add,
	type Decrement,
	type GreaterThan,
	type Increment,
	type MathPlus,
	type Max,
	type Multiply,
	type Subtract,
	testType,
} from '../index.js'

/**
 * The error string every operation in this family yields when fractional
 * inputs produce a whole-number result. Spelled once so the tests below read
 * as the limit they are pinning rather than as a string comparison.
 */
type WholeFromFractional<N extends string> = `The value '${N}' cannot be represented as bigint or number`

it('Abs examples in TSDoc are accurate', () => {
	testType.equal<Abs<-5>, 5>(true)
	testType.equal<Abs<5>, 5>(true)
	testType.equal<Abs<0>, 0>(true)
	testType.equal<Abs<-1.5>, 1.5>(true)
	testType.equal<Abs<-1n>, 1n>(true)

	testType.equal<Abs<number>, never>(true)
	testType.equal<Abs<number, 'nope'>, 'nope'>(true)
})

it('Add examples in TSDoc are accurate', () => {
	testType.equal<Add<1, 2>, 3>(true)
	testType.equal<Add<-1, 2>, 1>(true)
	testType.equal<Add<-1, -2>, -3>(true)
	testType.equal<Add<0, 0>, 0>(true)
	testType.equal<Add<1n, 2n>, 3n>(true)
	testType.equal<Add<1n, 2>, 3n>(true)

	// exact decimal, unlike `0.1 + 0.2 === 0.30000000000000004` at runtime
	testType.equal<Add<0.1, 0.2>, 0.3>(true)
	testType.equal<Add<1, 0.5>, 1.5>(true)

	// no overflow guard
	testType.equal<Add<9007199254740991, 1>, 9007199254740992>(true)

	testType.equal<Add<number, 1>, never>(true)
	testType.equal<Add<number, 1, 'nope'>, 'nope'>(true)

	// a whole-number result from fractional inputs; see the TSDoc note
	testType.equal<Add<1.5, 2.5>, WholeFromFractional<'4.0'>>(true)
})

it('Increment examples in TSDoc are accurate', () => {
	testType.equal<Increment<1>, 2>(true)
	testType.equal<Increment<-1>, 0>(true)
	testType.equal<Increment<1.5>, 2.5>(true)
	testType.equal<Increment<1n>, 2n>(true)

	testType.equal<Increment<number>, never>(true)
})

it('Subtract examples in TSDoc are accurate', () => {
	testType.equal<Subtract<3, 1>, 2>(true)
	testType.equal<Subtract<1, 3>, -2>(true)
	testType.equal<Subtract<3n, 1n>, 2n>(true)
	testType.equal<Subtract<5, 1.5>, 3.5>(true)
	testType.equal<Subtract<1.5, 1.4>, 0.1>(true)

	testType.equal<Subtract<number, 1>, never>(true)

	testType.equal<Subtract<1.5, 0.5>, WholeFromFractional<'1.0'>>(true)
})

it('Decrement examples in TSDoc are accurate', () => {
	testType.equal<Decrement<1>, 0>(true)
	testType.equal<Decrement<0>, -1>(true)
	testType.equal<Decrement<1.5>, 0.5>(true)
	testType.equal<Decrement<1n>, 0n>(true)

	testType.equal<Decrement<number>, never>(true)
})

it('Multiply examples in TSDoc are accurate', () => {
	testType.equal<Multiply<3, 4>, 12>(true)
	testType.equal<Multiply<-3, 4>, -12>(true)
	testType.equal<Multiply<3, 0>, 0>(true)
	testType.equal<Multiply<3n, 4n>, 12n>(true)

	testType.equal<Multiply<number, 2>, never>(true)

	// no overflow guard
	testType.equal<Multiply<9007199254740991, 2>, 18014398509481982>(true)

	testType.equal<Multiply<0.5, 4>, WholeFromFractional<'2.0'>>(true)
})

it('GreaterThan examples in TSDoc are accurate', () => {
	testType.equal<GreaterThan<2, 1>, true>(true)
	testType.equal<GreaterThan<1, 1>, false>(true)
	testType.equal<GreaterThan<1, 2>, false>(true)
	testType.equal<GreaterThan<-1, -2>, true>(true)
	testType.equal<GreaterThan<1.5, 1.4>, true>(true)

	testType.equal<GreaterThan<number, 1>, never>(true)
	// bigint is accepted by the constraint but not supported by the body
	testType.equal<GreaterThan<2n, 1n>, never>(true)
	// the difference is a whole number, so `Subtract` yields an error string
	testType.equal<GreaterThan<1.5, 2.5>, never>(true)
})

it('Max examples in TSDoc are accurate', () => {
	testType.equal<Max<1, 2>, 2>(true)
	testType.equal<Max<1, 1>, 1>(true)
	testType.equal<Max<-1, -2>, -1>(true)

	testType.equal<Max<number, 1>, never>(true)
	testType.equal<Max<2n, 1n>, never>(true)
	testType.equal<Max<1.5, 2.5>, never>(true)
})

it('MathPlus examples in TSDoc are accurate', () => {
	testType.equal<MathPlus.ToNegative<5>, -5>(true)
	testType.equal<MathPlus.ToNegative<-5>, -5>(true)
	testType.equal<MathPlus.Add<1, 2>, 3>(true)
})
