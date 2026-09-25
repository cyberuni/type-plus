import { it } from 'vitest'
import type { ObjectPlus } from '../index.js'

it('intersection types with generic', () => {
	// note this is not a typical use case.
	// it is used to show that the assignability is still working.
	type Foo = { a: string; b: string }
	function foo<T>(input: ObjectPlus.Omit<Foo & T, 'b'>): void {
		input.a = '1'
		// @ts-expect-error Property 'b' does not exist
		input.b = '1'

		// @ts-expect-error	Property 'c' does not exist.
		input.c = '1'
	}
	foo({ a: '1' })
})
