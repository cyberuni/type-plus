import type { UnionKeys } from '../union_keys.js'
import type { AnyRecord } from './any_record.js'
import type { Pick } from './pick.js'
import { record } from './record.js'
import { reduceByKey } from './reduceKey.js'

/**
 * Omit properties from a type.
 *
 * @origin [typescript#28339](https://github.com/microsoft/TypeScript/issues/28339#issuecomment-463577347)
 * @originAuthor Titian Cernicova-Dragomir
 * @alternative [type-zoo](https://github.com/pelotom/type-zoo)
 */
export type Omit<T, K extends UnionKeys<T>> = T extends unknown ? Pick<T, Exclude<keyof T, K>> : never

/**
 * ⚗️ *transform*
 *
 * @deprecated replaced by `Omit`, which is the same transform with a wider key
 * constraint (`UnionKeys<T>` rather than `keyof T`, so it also works on
 * unions). This alias is kept for the v7 migration and will be dropped; new
 * code should use `Omit`.
 *
 * @example
 * ```ts
 * type R = Except<{ a: 1; b: 2; c: 3 }, 'b'> // { a: 1; c: 3 }
 * ```
 */
export type Except<T, K extends keyof T> = Omit<T, K>

/**
 * Returns a copy of `subject` without the named properties, typed
 * `Omit<T, Props>`.
 *
 * `subject` is not mutated. Up to twelve keys have a dedicated overload; past
 * that a rest overload takes the union. Only own enumerable string keys are
 * copied, so symbol keys and inherited properties are dropped along with the
 * omitted ones.
 *
 * The prototype is preserved in the one case that matters: a null-prototype
 * subject (from `record()`) yields a null-prototype result, anything else
 * yields a plain object.
 *
 * @example
 * ```ts
 * const r = omit({ a: 1, b: 'x', c: true }, 'b')
 * // r === { a: 1, c: true }
 * // typeof r === { a: number; c: boolean }
 *
 * const r = omit({ a: 1, b: 2, c: 3 }, 'a', 'b')
 * // r === { c: 3 }
 * ```
 */
export function omit<T extends AnyRecord, P1 extends UnionKeys<T>>(subject: T, prop1: P1): Omit<T, P1>
export function omit<T extends AnyRecord, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>>(
	subject: T,
	prop1: P1,
	prop2: P2,
): Omit<T, P1 | P2>
export function omit<T extends AnyRecord, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>, P3 extends UnionKeys<T>>(
	subject: T,
	prop1: P1,
	prop2: P2,
	prop3: P3,
): Omit<T, P1 | P2 | P3>
export function omit<
	T extends AnyRecord,
	P1 extends UnionKeys<T>,
	P2 extends UnionKeys<T>,
	P3 extends UnionKeys<T>,
	P4 extends UnionKeys<T>,
>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4): Omit<T, P1 | P2 | P3 | P4>
export function omit<
	T extends AnyRecord,
	P1 extends UnionKeys<T>,
	P2 extends UnionKeys<T>,
	P3 extends UnionKeys<T>,
	P4 extends UnionKeys<T>,
	P5 extends UnionKeys<T>,
>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5): Omit<T, P1 | P2 | P3 | P4 | P5>
export function omit<
	T extends AnyRecord,
	P1 extends UnionKeys<T>,
	P2 extends UnionKeys<T>,
	P3 extends UnionKeys<T>,
	P4 extends UnionKeys<T>,
	P5 extends UnionKeys<T>,
	P6 extends UnionKeys<T>,
>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6): Omit<T, P1 | P2 | P3 | P4 | P5 | P6>
export function omit<
	T extends AnyRecord,
	P1 extends UnionKeys<T>,
	P2 extends UnionKeys<T>,
	P3 extends UnionKeys<T>,
	P4 extends UnionKeys<T>,
	P5 extends UnionKeys<T>,
	P6 extends UnionKeys<T>,
	P7 extends UnionKeys<T>,
>(
	subject: T,
	prop1: P1,
	prop2: P2,
	prop3: P3,
	prop4: P4,
	prop5: P5,
	prop6: P6,
	prop7: P7,
): Omit<T, P1 | P2 | P3 | P4 | P5 | P6 | P7>
export function omit<
	T extends AnyRecord,
	P1 extends UnionKeys<T>,
	P2 extends UnionKeys<T>,
	P3 extends UnionKeys<T>,
	P4 extends UnionKeys<T>,
	P5 extends UnionKeys<T>,
	P6 extends UnionKeys<T>,
	P7 extends UnionKeys<T>,
	P8 extends UnionKeys<T>,
>(
	subject: T,
	prop1: P1,
	prop2: P2,
	prop3: P3,
	prop4: P4,
	prop5: P5,
	prop6: P6,
	prop7: P7,
	prop8: P8,
): Omit<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8>
export function omit<
	T extends AnyRecord,
	P1 extends UnionKeys<T>,
	P2 extends UnionKeys<T>,
	P3 extends UnionKeys<T>,
	P4 extends UnionKeys<T>,
	P5 extends UnionKeys<T>,
	P6 extends UnionKeys<T>,
	P7 extends UnionKeys<T>,
	P8 extends UnionKeys<T>,
	P9 extends UnionKeys<T>,
>(
	subject: T,
	prop1: P1,
	prop2: P2,
	prop3: P3,
	prop4: P4,
	prop5: P5,
	prop6: P6,
	prop7: P7,
	prop8: P8,
	prop9: P9,
): Omit<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9>
export function omit<
	T extends AnyRecord,
	P1 extends UnionKeys<T>,
	P2 extends UnionKeys<T>,
	P3 extends UnionKeys<T>,
	P4 extends UnionKeys<T>,
	P5 extends UnionKeys<T>,
	P6 extends UnionKeys<T>,
	P7 extends UnionKeys<T>,
	P8 extends UnionKeys<T>,
	P9 extends UnionKeys<T>,
	P10 extends UnionKeys<T>,
>(
	subject: T,
	prop1: P1,
	prop2: P2,
	prop3: P3,
	prop4: P4,
	prop5: P5,
	prop6: P6,
	prop7: P7,
	prop8: P8,
	prop9: P9,
	prop10: P10,
): Omit<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10>
export function omit<
	T extends AnyRecord,
	P1 extends UnionKeys<T>,
	P2 extends UnionKeys<T>,
	P3 extends UnionKeys<T>,
	P4 extends UnionKeys<T>,
	P5 extends UnionKeys<T>,
	P6 extends UnionKeys<T>,
	P7 extends UnionKeys<T>,
	P8 extends UnionKeys<T>,
	P9 extends UnionKeys<T>,
	P10 extends UnionKeys<T>,
	P11 extends UnionKeys<T>,
>(
	subject: T,
	prop1: P1,
	prop2: P2,
	prop3: P3,
	prop4: P4,
	prop5: P5,
	prop6: P6,
	prop7: P7,
	prop8: P8,
	prop9: P9,
	prop10: P10,
	prop11: P11,
): Omit<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11>
export function omit<
	T extends AnyRecord,
	P1 extends UnionKeys<T>,
	P2 extends UnionKeys<T>,
	P3 extends UnionKeys<T>,
	P4 extends UnionKeys<T>,
	P5 extends UnionKeys<T>,
	P6 extends UnionKeys<T>,
	P7 extends UnionKeys<T>,
	P8 extends UnionKeys<T>,
	P9 extends UnionKeys<T>,
	P10 extends UnionKeys<T>,
	P11 extends UnionKeys<T>,
	P12 extends UnionKeys<T>,
>(
	subject: T,
	prop1: P1,
	prop2: P2,
	prop3: P3,
	prop4: P4,
	prop5: P5,
	prop6: P6,
	prop7: P7,
	prop8: P8,
	prop9: P9,
	prop10: P10,
	prop11: P11,
	prop12: P12,
): Omit<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12>
export function omit<T extends AnyRecord, Props extends UnionKeys<T>>(subject: T, ...props: Props[]): Omit<T, Props>
export function omit<T extends AnyRecord>(subject: T, ...props: Array<UnionKeys<T>>) {
	return reduceByKey(
		subject,
		(p, k) => {
			if (props.indexOf(k) === -1) p[k] = subject[k]
			return p
		},
		Object.getPrototypeOf(subject) === null ? record() : {},
	)
}
