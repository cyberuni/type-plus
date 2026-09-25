/**
 * 🦴 *utilities*
 *
 * `reduce()` with predicate for early termination.
 * A simple version of the same function in the `ramda` package.
 */
export function reduceWhile<T, R>(
	predicate: (acc: R, currentValue: T) => boolean,
	callbackfn: (previousValue: R, currentValue: T, currentIndex: number, array: T[]) => R,
	initialValue: R,
	array: T[],
) {
	let acc = initialValue
	for (let i = 0; i < array.length; i++) {
		const value = array[i]!
		if (!predicate(acc, value)) return acc
		acc = callbackfn(acc, value, i, array)
	}
	return acc
}
