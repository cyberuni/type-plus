import { describe, expect, test } from 'vitest'

import { brand, flavor, nominalMatch } from '../index.js'

describe('Brand', () => {
	test('value of same brand matches', () => {
		const a = brand('x', 1)
		const b = brand('x', 2)
		expect(nominalMatch(a, b)).toBe(true)

		const c = brand('x', { c: 3 })
		const d = brand('x', { d: 4 })
		expect(nominalMatch(c, d)).toBe(true)
	})
	test('work with null and undefined', () => {
		const a = brand('x', undefined)
		const b = brand('x', null)
		expect(nominalMatch(a, b)).toBe(true)
	})
	test('different brand will not compile with nominalMatches()', () => {
		// const a = brand('x', 1)
		// const b = brand('y', 1)
		// nominalMatches(a, b)  // <-- does not compile
		// const c = brand('x', { a: 1 })
		// const d = brand('y', { a: 1 })
		// nominalMatches(c, d)  // <-- does not compile
	})
})

describe('Flavor', () => {
	test('value of same flavor matches', () => {
		const a = flavor('x', 1)
		const b = flavor('x', 2)
		expect(nominalMatch(a, b)).toBe(true)

		const c = flavor('x', { c: 3 })
		const d = flavor('x', { d: 4 })
		expect(nominalMatch(c, d)).toBe(true)
	})
	test('work with null and undefined', () => {
		const a = flavor('x', undefined)
		const b = flavor('x', null)
		expect(nominalMatch(a, b)).toBe(true)
	})
	test('different flavor will not compile with nominalMatches()', () => {
		// const a = flavor('x', 1)
		// const b = flavor('y', 1)
		// nominalMatches(a, b)  // <-- does not compile
		// const c = flavor('x', { a: 1 })
		// const d = flavor('y', { a: 1 })
		// nominalMatches(c, d)  // <-- does not compile
	})
})
