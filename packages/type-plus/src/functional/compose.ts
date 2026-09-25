import type { Head } from '../array/head.js'
import type { Last } from '../array/last.js'
import type { AnyFunction } from '../function/any-function.js'

/**
 * Compose functions to produce a new function.
 * @params args functions to be composed.
 * Each function will receive the return value of the previous function as its parameters.
 * @return The composed function will expect the parameters of the first function,
 * and return the result of the last function.
 */
export function compose<FS extends AnyFunction[]>(...fns: FS): (...args: Parameters<Head<FS>>) => ReturnType<Last<FS>> {
	return (...args: any[]) => fns.reduce((args, fn) => [fn.apply(null, args)], args)[0]
}
