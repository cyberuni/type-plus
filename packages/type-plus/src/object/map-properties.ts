import type { AnyRecord } from './any-record.js'
import { reduceByKey } from './reduce-key.js'
import type { ValueOf } from './value-of.js'

/**
 * An Object-specific version of `map`.
 * Original source:
 * <https://stackoverflow.com/questions/53964071/how-to-dynamically-create-mapped-type-in-typescript>
 *
 * `ramda` has a similar function (`mapObjIndexed()`) with different parameter order.
 * I keep this parameter order because this parameter order provides better type inference.
 */
export function mapProperties<Subject extends AnyRecord, ResultProp>(
	subject: Subject,
	callbackfn: (value: ValueOf<Subject>, key: keyof Subject, obj: Subject) => ResultProp,
): { [K in keyof Subject]: ResultProp } {
	return reduceByKey(
		subject,
		(p, key) => ((p[key] = callbackfn(subject[key], key, subject)), p),
		{} as { [K in keyof Subject]: ResultProp },
	)
}
