/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { AnyRecord } from './any_record.js'
import type { Omit } from './omit.js'
import type { Partial } from './Partial.js'
import { reduceByKey } from './reduceKey.js'

type Splitter<T extends AnyRecord> = Partial<{ [k in keyof T]: T[k] | undefined }>
/**
 * ⚗️ *transform*
 *
 * The type of one slice produced by `split()`: the keys of the splitter `S`,
 * all required.
 *
 * Where the splitter names a key with `undefined` the property is taken from
 * `T` as declared. Where it supplies a fallback value the property becomes
 * `NonNullable<T[k]> | Exclude<S[k], undefined>`, since the fallback stands in
 * whenever `T` has nothing for that key.
 *
 * @example
 * ```ts
 * type R = Split<{ a: number; b: string }, { a: undefined }> // { a: number }
 * type R = Split<{ a?: number; b: string }, { a: 1 }> // { a: number }
 * ```
 */
export type Split<T extends AnyRecord, S extends AnyRecord> = {
	[k in keyof S]-?: S[k] extends undefined ? T[k] : NonNullable<T[k]> | Exclude<S[k], undefined>
}

/**
 * Split an object into multiple objects.
 * @returns [...entries, remaining]
 */
export function split<T extends AnyRecord, S1 extends Splitter<T>>(
	target: T,
	split1: S1,
): [Split<T, S1>, Omit<T, keyof S1>]
export function split<T extends AnyRecord, S1 extends Splitter<T>, S2 extends Splitter<T>>(
	target: T,
	split1: S1,
	split2: S2,
): [Split<T, S1>, Split<T, S2>, Omit<T, keyof S1 | keyof S2>]
export function split<T extends AnyRecord, S1 extends Splitter<T>, S2 extends Splitter<T>, S3 extends Splitter<T>>(
	target: T,
	splitter1: S1,
	splitter2: S2,
	splitter3: S3,
): [Split<T, S1>, Split<T, S2>, Split<T, S3>, Omit<T, keyof S1 | keyof S2 | keyof S3>]
export function split<
	T extends AnyRecord,
	S1 extends Splitter<T>,
	S2 extends Splitter<T>,
	S3 extends Splitter<T>,
	S4 extends Splitter<T>,
>(
	target: T,
	splitter1: S1,
	splitter2: S2,
	splitter3: S3,
	splitter4: S4,
): [Split<T, S1>, Split<T, S2>, Split<T, S3>, Split<T, S4>, Omit<T, keyof S1 | keyof S2 | keyof S3 | keyof S4>]
export function split<
	T extends AnyRecord,
	S1 extends Splitter<T>,
	S2 extends Splitter<T>,
	S3 extends Splitter<T>,
	S4 extends Splitter<T>,
	S5 extends Splitter<T>,
>(
	target: T,
	splitter1: S1,
	splitter2: S2,
	splitter3: S3,
	splitter4: S4,
	splitter5: S5,
): [
	Split<T, S1>,
	Split<T, S2>,
	Split<T, S3>,
	Split<T, S4>,
	Split<T, S5>,
	Omit<T, keyof S1 | keyof S2 | keyof S3 | keyof S4 | keyof S5>,
]
export function split<
	T extends AnyRecord,
	S1 extends Splitter<T>,
	S2 extends Splitter<T>,
	S3 extends Splitter<T>,
	S4 extends Splitter<T>,
	S5 extends Splitter<T>,
	S6 extends Splitter<T>,
>(
	target: T,
	splitter1: S1,
	splitter2: S2,
	splitter3: S3,
	splitter4: S4,
	splitter5: S5,
	splitter6: S6,
): [
	Split<T, S1>,
	Split<T, S2>,
	Split<T, S3>,
	Split<T, S4>,
	Split<T, S5>,
	Split<T, S6>,
	Omit<T, keyof S1 | keyof S2 | keyof S3 | keyof S4 | keyof S5 | keyof S6>,
]
export function split<
	T extends AnyRecord,
	S1 extends Splitter<T>,
	S2 extends Splitter<T>,
	S3 extends Splitter<T>,
	S4 extends Splitter<T>,
	S5 extends Splitter<T>,
	S6 extends Splitter<T>,
	S7 extends Splitter<T>,
>(
	target: T,
	splitter1: S1,
	splitter2: S2,
	splitter3: S3,
	splitter4: S4,
	splitter5: S5,
	splitter6: S6,
	splitter7: S7,
): [
	Split<T, S1>,
	Split<T, S2>,
	Split<T, S3>,
	Split<T, S4>,
	Split<T, S5>,
	Split<T, S6>,
	Split<T, S7>,
	Omit<T, keyof S1 | keyof S2 | keyof S3 | keyof S4 | keyof S5 | keyof S6 | keyof S7>,
]
export function split<
	T extends AnyRecord,
	S1 extends Splitter<T>,
	S2 extends Splitter<T>,
	S3 extends Splitter<T>,
	S4 extends Splitter<T>,
	S5 extends Splitter<T>,
	S6 extends Splitter<T>,
	S7 extends Splitter<T>,
	S8 extends Splitter<T>,
>(
	target: T,
	splitter1: S1,
	splitter2: S2,
	splitter3: S3,
	splitter4: S4,
	splitter5: S5,
	splitter6: S6,
	splitter7: S7,
	splitter8: S8,
): [
	Split<T, S1>,
	Split<T, S2>,
	Split<T, S3>,
	Split<T, S4>,
	Split<T, S5>,
	Split<T, S6>,
	Split<T, S7>,
	Split<T, S8>,
	Omit<T, keyof S1 | keyof S2 | keyof S3 | keyof S4 | keyof S5 | keyof S6 | keyof S7 | keyof S8>,
]
export function split<
	T extends AnyRecord,
	S1 extends Splitter<T>,
	S2 extends Splitter<T>,
	S3 extends Splitter<T>,
	S4 extends Splitter<T>,
	S5 extends Splitter<T>,
	S6 extends Splitter<T>,
	S7 extends Splitter<T>,
	S8 extends Splitter<T>,
	S9 extends Splitter<T>,
>(
	target: T,
	splitter1: S1,
	splitter2: S2,
	splitter3: S3,
	splitter4: S4,
	splitter5: S5,
	splitter6: S6,
	splitter7: S7,
	splitter8: S8,
	splitter9: S9,
): [
	Split<T, S1>,
	Split<T, S2>,
	Split<T, S3>,
	Split<T, S4>,
	Split<T, S5>,
	Split<T, S6>,
	Split<T, S7>,
	Split<T, S8>,
	Split<T, S9>,
	Omit<T, keyof S1 | keyof S2 | keyof S3 | keyof S4 | keyof S5 | keyof S6 | keyof S7 | keyof S8 | keyof S9>,
]
export function split(target: AnyRecord, ...splitters: AnyRecord[]): AnyRecord[] {
	const keyMap: AnyRecord = {}
	const s = splitters.map((s) =>
		reduceByKey(s, (p, k) => ((keyMap[k] = true), (p[k] = target[k] ?? s[k]), p), {} as AnyRecord),
	)
	const r = reduceByKey(target, (p, k) => (keyMap[k] ? p : ((p[k] = target[k]), p)), {} as AnyRecord)
	return [...s, r]
}
