import { requiredDeep } from 'unpartial'

import type { AnyFunction } from '../function/any-function.js'
import type { RecursivePartial } from '../object/recursive-partial.js'

/**
 * stub a value.
 *
 * If the value is a function, it will be passed through as-is.
 *
 * 🦴 `utilities`
 */
export function stub<T extends AnyFunction>(stub: T): T
export function stub<T>(stub: RecursivePartial<NoInfer<T>>): T
export function stub<T>(stub: unknown): T {
	return stub as T
}

function buildStub<T>(
	init: RecursivePartial<T> | ((stub?: RecursivePartial<T>) => RecursivePartial<T>),
): (stub?: RecursivePartial<T>) => T
function buildStub<T>(init: RecursivePartial<T> | ((stub?: RecursivePartial<T>) => RecursivePartial<T>)) {
	return stubBuilder(init).create()
}

function stubBuilder<T>(init: RecursivePartial<T> | ((stub?: RecursivePartial<T>) => RecursivePartial<T>)) {
	return builderInternal([init])
}

/**
 * Drops from `init` every path that `stub` sets, so an init object never overrides the stub passed at call time.
 */
function withoutPathsOf(init: any, stub: any): any {
	if (!isMergeable(stub)) return init
	return Object.keys(init).reduce<Record<string, unknown>>((p, k) => {
		const s = stub[k]
		if (s === undefined) p[k] = init[k]
		else if (isMergeable(s) && isMergeable(init[k])) p[k] = withoutPathsOf(init[k], s)
		return p
	}, {})
}

function isMergeable(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function builderInternal<T>(
	initializers: Array<RecursivePartial<T> | ((stub?: RecursivePartial<T>) => RecursivePartial<T>)>,
) {
	const builder = {
		/**
		 * Adds an init object or handler to the builder.
		 *
		 * If `init` is an object, it is deep-merged over the earlier initializers,
		 * except where the partial stub passed at call time sets a value.
		 * If `init` is a function, it is called with the stub so far and returns the next one.
		 *
		 * @return {Builder<T>} The builder instance.
		 */
		with(init: RecursivePartial<T> | ((stub?: RecursivePartial<T>) => RecursivePartial<T>)) {
			return builderInternal([...initializers, init])
		},
		/**
		 * Creates the resulting stub function.
		 */
		create() {
			return (stub?: RecursivePartial<T>) => {
				return initializers.reduce((acc, init) => {
					if (typeof init === 'function') {
						return init(acc)
					}
					return requiredDeep<RecursivePartial<T>>(acc ?? {}, withoutPathsOf(init, stub))
				}, stub) as T
			}
		},
	}
	return builder
}
// The TSDoc lives on this merged namespace because the `.d.ts` emit drops
// JSDoc from the expando assignments below.
export declare namespace stub {
	/**
	 * 🦴 *utilities*
	 *
	 * Builds a stub function for `T` from `init`.
	 *
	 * Each call merges its own partial stub over `init`, so a value you pass in
	 * wins over the default. `init` can also be a function: it receives the
	 * partial stub passed to the call, or `undefined`, and returns the stub to use.
	 * What a function returns is used as is, so it decides which values win.
	 *
	 * It is `stub.builder(init).create()`.
	 *
	 * @example
	 * ```ts
	 * const s = stub.build<{ a: number; b: string }>({ b: 'b' })
	 * s({ a: 1 }) // { a: 1, b: 'b' }
	 * ```
	 *
	 * @example
	 * ```ts
	 * type User = { id: string; name: string; profile: { email: string } }
	 * const createUser = stub.build<User>((s) => ({
	 * 	id: '1',
	 * 	name: 'Alice',
	 * 	...s,
	 * 	profile: { email: `${s?.name ?? 'alice'}@example.com`, ...s?.profile },
	 * }))
	 * createUser({ name: 'bob' }) // { id: '1', name: 'bob', profile: { email: 'bob@example.com' } }
	 * ```
	 */
	let build: typeof buildStub
	/**
	 * 🦴 *utilities*
	 *
	 * Creates a builder for a stub function of `T`, starting from `init`.
	 *
	 * The builder has two methods:
	 *
	 * - `.with(init)`: adds another partial stub or handler, applied after the previous ones.
	 * - `.create()`: creates the stub function.
	 *
	 * The initializers run in order, starting from the partial stub passed to the call:
	 *
	 * - An object initializer is deep-merged over the earlier ones, so a later `.with()` value wins.
	 *   Nested keys it does not set are kept.
	 * - The partial stub passed to the call wins over every object initializer.
	 * - A function initializer receives the stub so far: the partial stub passed to the call,
	 *   merged with the initializers before it. What it returns is the next stub, used as is.
	 *
	 * Each `.with()` returns a new builder, so one builder can branch into several.
	 *
	 * @example
	 * ```ts
	 * const s = stub.builder<{ a: number; b: string }>({ a: 1 }).with({ b: 'b' }).create()
	 * s() // { a: 1, b: 'b' }
	 * s({ a: 2 }) // { a: 2, b: 'b' }
	 * ```
	 *
	 * @example
	 * ```ts
	 * const s = stub.builder<{ a: number; b: string }>({ a: 1, b: 'b' }).with({ a: 2 }).create()
	 * s() // { a: 2, b: 'b' }
	 * s({ a: 3 }) // { a: 3, b: 'b' }
	 * ```
	 *
	 * @example
	 * ```ts
	 * const s = stub.builder<{ a: number; b: number }>({ a: 1 }).with((acc) => ({ ...acc, b: acc!.a! * 10 })).create()
	 * s() // { a: 1, b: 10 }
	 * s({ a: 3 }) // { a: 3, b: 30 }
	 * ```
	 */
	let builder: typeof stubBuilder
}

stub.build = buildStub
stub.builder = stubBuilder
