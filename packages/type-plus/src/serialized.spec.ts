import * as flatted from 'flatted'
import { describe, expect, it } from 'vitest'

import type { Deserialized, IsString, IsStringLiteral, JsonCompatible, Serialized } from './index.js'
import { testType } from './testing/index.js'

// The two-line wrappers the TSDoc and the docs show, run against the real serializers.
const stringify = <T extends JsonCompatible<T>>(value: T) => JSON.stringify(value) as Serialized<T>
const parse = <S extends Serialized<any>>(text: S) => JSON.parse(text) as Deserialized<S>

const flatStringify = <T extends JsonCompatible<T>>(value: T) =>
	flatted.stringify(value) as Serialized<T, { circular: true }>
const flatParse = <S extends Serialized<any, { circular: true }>>(text: S) => flatted.parse(text) as Deserialized<S>

interface User {
	id: number
	tags: string[]
	nick?: string
}

type Node = { value: number; children: Node[] }

interface Person {
	name: string
	friend?: Person
}

describe('without the wrappers', () => {
	it('JSON.parse and flatted.parse return any', () => {
		const a = JSON.parse(JSON.stringify({ id: 1 }))
		const b = flatted.parse(flatted.stringify({ id: 1 }))
		testType.any<typeof a>(true)
		testType.any<typeof b>(true)
	})
})

describe('JSON round trip', () => {
	it('keeps the type of the value', () => {
		const user: User = { id: 1, tags: ['a'] }
		const text = stringify(user)
		testType.equal<typeof text, Serialized<User>>(true)

		const back = parse(text)
		testType.equal<typeof back, User>(true)
		expect(back).toEqual(user)
	})

	it('infers the value type from a literal', () => {
		const text = stringify({ id: 1, tags: ['a'] })
		testType.equal<typeof text, Serialized<{ id: number; tags: string[] }>>(true)
		const back = parse(text)
		testType.equal<typeof back, { id: number; tags: string[] }>(true)
		expect(back).toEqual({ id: 1, tags: ['a'] })
	})

	it('accepts a recursive type', () => {
		const tree: Node = { value: 1, children: [{ value: 2, children: [] }] }
		const back = parse(stringify(tree))
		testType.equal<typeof back, Node>(true)
		expect(back).toEqual(tree)
	})

	it('accepts a self-referencing interface', () => {
		const ada: Person = { name: 'Ada', friend: { name: 'Bob' } }
		const back = parse(stringify(ada))
		testType.equal<typeof back, Person>(true)
		expect(back).toEqual(ada)
	})

	it('rejects a value that is not JSON, naming its path', () => {
		// @ts-expect-error Type 'Date' is not assignable to type '"not JSON at $.createdAt"'
		stringify({ createdAt: new Date() })
		// @ts-expect-error Type '() => number' is not assignable to type '"not JSON at $.load"'
		stringify({ load: () => 1 })
	})

	it('rejects a plain string', () => {
		// @ts-expect-error a plain string carries no type
		parse('{"id":1}')
	})

	it('rejects a flatted string, which JSON.parse reads as the wrong shape', () => {
		const text = flatStringify({ id: 1 })
		// @ts-expect-error Type '"Serialized<circular>"' is not assignable to type '"Serialized<json>"'
		const back = parse(text)
		expect(back).toEqual([{ id: 1 }])
	})
})

describe('flatted round trip', () => {
	it('keeps the type of the value', () => {
		const user: User = { id: 1, tags: ['a'] }
		const text = flatStringify(user)
		testType.equal<typeof text, Serialized<User, { circular: true }>>(true)

		const back = flatParse(text)
		testType.equal<typeof back, User>(true)
		expect(back).toEqual(user)
	})

	it('keeps a cycle, at runtime and in the type', () => {
		const ada: Person = { name: 'Ada' }
		ada.friend = ada

		const back = flatParse(flatStringify(ada))
		testType.equal<typeof back, Person>(true)
		expect(back.name).toBe('Ada')
		expect(back.friend).toBe(back)
		expect(() => JSON.stringify(ada)).toThrow(TypeError)
	})

	it('accepts a recursive type', () => {
		const tree: Node = { value: 1, children: [] }
		tree.children.push(tree)
		const back = flatParse(flatStringify(tree))
		testType.equal<typeof back, Node>(true)
		expect(back.children[0]).toBe(back)
	})

	it('rejects a value that is not JSON, naming its path', () => {
		// @ts-expect-error Type 'Date' is not assignable to type '"not JSON at $.createdAt"'
		flatStringify({ createdAt: new Date() })
	})

	it('rejects a plain string', () => {
		// @ts-expect-error a plain string carries no type
		flatParse('[{"id":1}]')
	})

	it('rejects a plain JSON string, which flatted.parse cannot read', () => {
		const text = stringify({ id: 1 })
		// @ts-expect-error Type '"Serialized<json>"' is not assignable to type '"Serialized<circular>"'
		expect(() => flatParse(text)).toThrow(TypeError)
	})
})

describe('Serialized', () => {
	it('is a string, but a string is not one', () => {
		testType.canAssign<Serialized<{ a: number }>, string>(true)
		testType.canAssign<string, Serialized<{ a: number }>>(false)
		testType.equal<Serialized<{ a: number }> extends string ? true : false, true>(true)
		testType.equal<string extends Serialized<{ a: number }> ? true : false, false>(true)
	})

	it('assigns to the serialized form of a wider type, not of an unrelated one', () => {
		testType.equal<Serialized<{ a: 1 }> extends Serialized<{ a: number }> ? true : false, true>(true)
		testType.equal<Serialized<{ a: number }> extends Serialized<{ b: number }> ? true : false, false>(true)
		testType.canAssign<Serialized<{ a: number }>, Serialized<{ a: 1 }>>(false)
	})

	it('keeps the two formats apart, both ways', () => {
		type J = Serialized<{ a: number }>
		type C = Serialized<{ a: number }, { circular: true }>
		testType.equal<C extends J ? true : false, false>(true)
		testType.equal<J extends C ? true : false, false>(true)
		testType.equal<Serialized<{ a: number }, { circular: false }>, J>(true)
	})

	it('is either format with circular: boolean', () => {
		type E = Serialized<{ a: number }, { circular: boolean }>
		testType.canAssign<Serialized<{ a: number }>, E>(true)
		testType.canAssign<Serialized<{ a: number }, { circular: true }>, E>(true)
	})

	it('rejects a type that is not JSON', () => {
		// @ts-expect-error Date is not JSON
		testType.never<Serialized<{ a: Date }>>(false)
	})

	it('is a string to IsString, and not a string literal, like Brand', () => {
		testType.equal<IsString<Serialized<{ a: number }>>, true>(true)
		testType.equal<IsString<Serialized<{ a: number }>, { exact: true }>, true>(true)
		testType.equal<IsStringLiteral<Serialized<{ a: number }>>, false>(true)
	})
})
