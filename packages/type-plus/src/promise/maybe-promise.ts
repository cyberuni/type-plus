import { isPromise } from './is-promise.js'

/**
 * `T | Promise<T>`
 */
export type MaybePromise<T> = T | Promise<T>

/**
 * Transforms the value within the promise.
 *
 * @return a new promise with the transformed result.
 */
export function transformMaybePromise<T, R>(value: Promise<T>, transformer: (value: T) => R): Promise<R>
/**
 * Transforms the value, or if the value is a promise,
 * transform the resolved value of the promise.
 *
 * @return the transformed result,
 * or if the value is a promise, a new promse with the transformed result.
 */
export function transformMaybePromise<T, R>(
	value: T,
	transformer: (value: T) => R,
): T extends Promise<any> ? Promise<R> : R
export function transformMaybePromise<T, R>(value: MaybePromise<T>, transformer: (value: T) => R) {
	return isPromise(value) ? value.then(transformer) : transformer(value)
}

export const MaybePromise = {
	transform: transformMaybePromise,
}
