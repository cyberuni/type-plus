import { expect, test } from 'vitest'

import { hasProperty, testType } from '../index.js'

test('hasProperty', () => {
	type X = { name: string } & ({ a: 1 } | { b: 2 })

	const x: X = { name: 'n', a: 1 }

	if (hasProperty(x, 'a')) expect(x.a).toBe(1)

	const y: X = { name: 'n', b: 2 }

	if (hasProperty(y, 'b')) expect(y.b).toBe(2)
})

test('the guard does not recover the property type of a union member', () => {
	const v = { a: 1 } as { a: number } | { b: string }
	if (hasProperty(v, 'a')) {
		// `T[P]` on a union is `unknown`, so the guard does not recover the
		// member's own property type; see the TSDoc note on `hasProperty`.
		testType.equal<typeof v.a, unknown>(true)
	} else {
		expect.unreachable()
	}
})

test('the check is truthiness, so a falsy property is not detected', () => {
	expect(hasProperty({ a: 0 }, 'a')).toBe(false)
})
