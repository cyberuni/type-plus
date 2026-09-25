import type { AnyRecord } from './any-record.js'

/**
 * creates a facade of the subject.
 */
export function facade<T extends AnyRecord, P1 extends keyof T>(subject: T, prop1: P1): Pick<T, P1>
export function facade<T extends AnyRecord, P1 extends keyof T, P2 extends keyof T>(
	subject: T,
	prop1: P1,
	prop2: P2,
): Pick<T, P1 | P2>
export function facade<T extends AnyRecord, P1 extends keyof T, P2 extends keyof T, P3 extends keyof T>(
	subject: T,
	prop1: P1,
	prop2: P2,
	prop3: P3,
): Pick<T, P1 | P2 | P3>
export function facade<
	T extends AnyRecord,
	P1 extends keyof T,
	P2 extends keyof T,
	P3 extends keyof T,
	P4 extends keyof T,
>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4): Pick<T, P1 | P2 | P3 | P4>
export function facade<
	T extends AnyRecord,
	P1 extends keyof T,
	P2 extends keyof T,
	P3 extends keyof T,
	P4 extends keyof T,
	P5 extends keyof T,
>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5): Pick<T, P1 | P2 | P3 | P4 | P5>
export function facade<
	T extends AnyRecord,
	P1 extends keyof T,
	P2 extends keyof T,
	P3 extends keyof T,
	P4 extends keyof T,
	P5 extends keyof T,
	P6 extends keyof T,
>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6): Pick<T, P1 | P2 | P3 | P4 | P5 | P6>
export function facade<
	T extends AnyRecord,
	P1 extends keyof T,
	P2 extends keyof T,
	P3 extends keyof T,
	P4 extends keyof T,
	P5 extends keyof T,
	P6 extends keyof T,
	P7 extends keyof T,
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
export function facade<
	T extends AnyRecord,
	P1 extends keyof T,
	P2 extends keyof T,
	P3 extends keyof T,
	P4 extends keyof T,
	P5 extends keyof T,
	P6 extends keyof T,
	P7 extends keyof T,
	P8 extends keyof T,
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
export function facade<
	T extends AnyRecord,
	P1 extends keyof T,
	P2 extends keyof T,
	P3 extends keyof T,
	P4 extends keyof T,
	P5 extends keyof T,
	P6 extends keyof T,
	P7 extends keyof T,
	P8 extends keyof T,
	P9 extends keyof T,
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
export function facade<
	T extends AnyRecord,
	P1 extends keyof T,
	P2 extends keyof T,
	P3 extends keyof T,
	P4 extends keyof T,
	P5 extends keyof T,
	P6 extends keyof T,
	P7 extends keyof T,
	P8 extends keyof T,
	P9 extends keyof T,
	P10 extends keyof T,
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
export function facade<
	T extends AnyRecord,
	P1 extends keyof T,
	P2 extends keyof T,
	P3 extends keyof T,
	P4 extends keyof T,
	P5 extends keyof T,
	P6 extends keyof T,
	P7 extends keyof T,
	P8 extends keyof T,
	P9 extends keyof T,
	P10 extends keyof T,
	P11 extends keyof T,
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
export function facade<
	T extends AnyRecord,
	P1 extends keyof T,
	P2 extends keyof T,
	P3 extends keyof T,
	P4 extends keyof T,
	P5 extends keyof T,
	P6 extends keyof T,
	P7 extends keyof T,
	P8 extends keyof T,
	P9 extends keyof T,
	P10 extends keyof T,
	P11 extends keyof T,
	P12 extends keyof T,
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
export function facade<T extends AnyRecord>(subject: T, ...props: (keyof T)[]) {
	return props.reduce((p, k) => {
		const prop = subject[k]
		if (typeof prop === 'function') {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
			p[k] = prop.bind(subject)
		} else {
			Object.defineProperty(p, k, {
				get() {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					return subject[k]
				},
				set(value: any) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
					return (subject[k] = value)
				},
			})
		}
		return p
	}, {} as T)
}
