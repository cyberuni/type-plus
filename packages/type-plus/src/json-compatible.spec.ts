import { describe, it } from 'vitest'

import type { JsonCompatible, JsonTypes } from './index.js'
import { testType } from './testing/index.js'

function save<T extends JsonCompatible<T>>(value: T) {
	return value
}

describe('as a self-referencing constraint', () => {
	it('accepts an interface', () => {
		interface User {
			id: number
			tags: string[]
			nick?: string
		}
		const user: User = { id: 1, tags: [] }
		save(user)
	})

	it('accepts a recursive interface', () => {
		interface Tree {
			value: number
			children: Tree[]
		}
		const tree: Tree = { value: 1, children: [] }
		save(tree)
	})

	it('accepts readonly and `as const` data', () => {
		save({ a: [1, 2] } as const)
		save([1, 'x'] as const)
		const a: readonly string[] = []
		save(a)
	})

	it('accepts an optional property', () => {
		const o: { a?: number } = {}
		save(o)
	})

	it('accepts JSON primitives', () => {
		save(1)
		save('x')
		save(true)
		save(null)
	})

	it('accepts any JsonTypes', () => {
		const v: JsonTypes = JSON.parse('1')
		save(v)
	})

	it('accepts an object with a key named like a function member', () => {
		save({ call: 'x', apply: 1, bind: null })
	})

	it('rejects a property holding undefined, naming its path', () => {
		// @ts-expect-error Type 'undefined' is not assignable to type '"not JSON at $.a"'
		save({ a: undefined })
		interface User {
			nick: string | undefined
		}
		const user: User = { nick: undefined }
		// @ts-expect-error `nick` may hold undefined
		save(user)
	})

	it('rejects a nested Date, naming its path', () => {
		interface Post {
			profile: { createdAt: Date }
		}
		const post: Post = { profile: { createdAt: new Date() } }
		// @ts-expect-error Type 'Date' is not assignable to type '"not JSON at $.profile.createdAt"'
		save(post)
	})

	it('rejects a function inside an array', () => {
		// @ts-expect-error Type '() => number' is not assignable to type '"not JSON at $[1]"'
		save([1, () => 1] as const)
	})

	it('rejects non-JSON values at the top level', () => {
		// @ts-expect-error
		save(undefined)
		// @ts-expect-error
		save(1n)
		// @ts-expect-error
		save(Symbol())
		// @ts-expect-error
		save(() => 1)
		// @ts-expect-error
		save(new Date())
		// @ts-expect-error
		save(new Map())
	})
})

describe('as a type', () => {
	it('admits T when T is JSON', () => {
		testType.equal<{ a: 1 } extends JsonCompatible<{ a: 1 }> ? true : false, true>(true)
	})

	it('replaces each part that is not JSON with a message naming its path', () => {
		type R = JsonCompatible<{ a: { b: Date } }>
		testType.equal<R['a'], { b: 'not JSON at $.a.b' }>(true)
		testType.equal<JsonCompatible<{ a: Array<() => void> }>['a'], Array<'not JSON at $.a[*]'>>(true)
		testType.equal<JsonCompatible<{ a: [1, () => void] }>['a'], [1, 'not JSON at $.a[1]']>(true)
	})
})
