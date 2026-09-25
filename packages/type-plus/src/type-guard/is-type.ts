/**
 * Is the subject of type T
 */
export function isType<T>(subject: T): subject is T
/**
 * Is the subject of type T, satisfying the supplied validator
 */
export function isType<T>(subject: unknown, validator: (s: T) => unknown): subject is T
export function isType(subject: unknown, validator?: (s: unknown) => unknown) {
	return validator ? !!validator(subject) : true
}
