import { requiredDeep } from 'unpartial'

import type { AnyFunction } from '../function/any_function.js'
import type { RecursivePartial } from '../object/recursive_partial.js'

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

function builderInternal<T>(
	initializers: Array<RecursivePartial<T> | ((stub?: RecursivePartial<T>) => RecursivePartial<T>)>,
) {
	const builder = {
		/**
		 * Adds an init object or handler to the builder.
		 *
		 * If `init` is an object, it will be merged with the stub object.
		 * If `init` is a function, it will be called with the stub object.
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
					return requiredDeep<RecursivePartial<T>>(init, acc)
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
	 * partial stub passed to the call and returns the stub to use.
	 *
	 * It is `stub.builder(init).create()`.
	 *
	 * @example
	 * ```ts
	 * const s = stub.build<{ a: number; b: string }>({ b: 'b' })
	 * s({ a: 1 }) // { a: 1, b: 'b' }
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
	 * Each `.with()` returns a new builder, so one builder can branch into several.
	 *
	 * @example
	 * ```ts
	 * const s = stub.builder<{ a: number; b: string }>({ a: 1 }).with({ b: 'b' }).create()
	 * s() // { a: 1, b: 'b' }
	 * s({ a: 2 }) // { a: 2, b: 'b' }
	 * ```
	 */
	let builder: typeof stubBuilder
}

stub.build = buildStub
stub.builder = stubBuilder
