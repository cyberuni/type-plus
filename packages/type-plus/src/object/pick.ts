import type { UnionKeys } from '../union_keys.js'
import type { AnyRecord } from './any_record.js'
import { record } from './record.js'
import { reduceByKey } from './reduceKey.js'

/**
 * Returns a copy of `subject` containing only the named properties, typed
 * `Pick<T, Props>`. The complement of `omit()`.
 *
 * `subject` is not mutated. Up to twelve keys have a dedicated overload; past
 * that a rest overload takes the union. A key naming a property that is
 * absent at runtime simply contributes nothing to the result.
 *
 * The prototype is preserved in the one case that matters: a null-prototype
 * subject (from `record()`) yields a null-prototype result, anything else
 * yields a plain object.
 *
 * @example
 * ```ts
 * const r = pick({ a: 1, b: 'x', c: true }, 'a', 'c')
 * // r === { a: 1, c: true }
 * // typeof r === { a: number; c: boolean }
 * ```
 */
export function pick<T extends AnyRecord, P1 extends UnionKeys<T>>(subject: T, prop1: P1): Pick<T, P1>
export function pick<T extends AnyRecord, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>>(
	subject: T,
	prop1: P1,
	prop2: P2,
): Pick<T, P1 | P2>
export function pick<T extends AnyRecord, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>, P3 extends UnionKeys<T>>(
	subject: T,
	prop1: P1,
	prop2: P2,
	prop3: P3,
): Pick<T, P1 | P2 | P3>
export function pick<
	T extends AnyRecord,
	P1 extends UnionKeys<T>,
	P2 extends UnionKeys<T>,
	P3 extends UnionKeys<T>,
	P4 extends UnionKeys<T>,
>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4): Pick<T, P1 | P2 | P3 | P4>
export function pick<
	T extends AnyRecord,
	P1 extends UnionKeys<T>,
	P2 extends UnionKeys<T>,
	P3 extends UnionKeys<T>,
	P4 extends UnionKeys<T>,
	P5 extends UnionKeys<T>,
>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5): Pick<T, P1 | P2 | P3 | P4 | P5>
export function pick<
	T extends AnyRecord,
	P1 extends UnionKeys<T>,
	P2 extends UnionKeys<T>,
	P3 extends UnionKeys<T>,
	P4 extends UnionKeys<T>,
	P5 extends UnionKeys<T>,
	P6 extends UnionKeys<T>,
>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6): Pick<T, P1 | P2 | P3 | P4 | P5 | P6>
export function pick<
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
): Pick<T, P1 | P2 | P3 | P4 | P5 | P6 | P7>
export function pick<
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
): Pick<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8>
export function pick<
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
): Pick<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9>
export function pick<
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
): Pick<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10>
export function pick<
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
): Pick<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11>
export function pick<
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
): Pick<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12>
export function pick<T extends AnyRecord, Props extends UnionKeys<T>>(subject: T, ...props: Props[]): Pick<T, Props>
export function pick<T extends AnyRecord>(subject: T, ...props: Array<UnionKeys<T>>) {
	return reduceByKey(
		subject,
		(p, k) => {
			if (props.indexOf(k) >= 0) p[k] = subject[k]
			return p
		},
		Object.getPrototypeOf(subject) === null ? record() : {},
	)
}

/**
 * Pick properties `K` from `T`.
 * Works with union.
 *
 * Original type by Titian Cernicova-Dragomir
 * @see <https://github.com/microsoft/TypeScript/issues/28339#issuecomment-463577347>
 */
export type Pick<T, K extends UnionKeys<T>> = T extends unknown ? Pick._<T, keyof T & K> : never

export namespace Pick {
	export type _<T, K extends keyof T> = { [P in K]: T[P] }
}
