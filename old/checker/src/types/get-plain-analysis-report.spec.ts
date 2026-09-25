import { describe, expect, test } from '@jest/globals'
import type { AllType } from './all-type.js'
import { analyze } from './analyze.js'
import { getPlainAnalysisReport } from './get-plain-analysis-report.js'
import * as T from './index.js'

const nonStrict = { strict: false, debug: false }
const strict = { strict: true, debug: false }

describe('any', () => {
	test('pass', () => {
		assertReportEquals(nonStrict, T.any, false, `The subject satisfies type any`)
	})
	test('strict pass', () => {
		assertReportEquals(strict, T.any, false, `The subject strictly satisfies type any`)
	})
})

describe('unknown', () => {
	test('pass', () => {
		assertReportEquals(nonStrict, T.unknown, false, `The subject satisfies type unknown`)
	})
	test('strict pass', () => {
		assertReportEquals(strict, T.unknown, false, `The subject strictly satisfies type unknown`)
	})
})

describe('undefined', () => {
	test('pass', () => {
		assertReportEquals(nonStrict, T.undefined, undefined, `The subject satisfies type undefined`)
	})
	test('strict pass', () => {
		assertReportEquals(strict, T.undefined, undefined, `The subject strictly satisfies type undefined`)
	})
	test('fail with explicit undefined', () => {
		assertReportEquals(nonStrict, T.undefined, false, `subject expects to be undefined but is actually false`)
	})
})

describe('null', () => {
	test('pass', () => {
		assertReportEquals(nonStrict, T.null, null, `The subject satisfies type null`)
	})
	test('strict pass', () => {
		assertReportEquals(strict, T.null, null, `The subject strictly satisfies type null`)
	})
	test('fail with explicit null', () => {
		assertReportEquals(nonStrict, T.null, false, `subject expects to be null but is actually false`)
	})
})
describe('boolean', () => {
	test('pass', () => {
		assertReportEquals(nonStrict, T.boolean, false, `The subject satisfies type boolean`)
	})
	test('strict pass', () => {
		assertReportEquals(strict, T.boolean, true, `The subject strictly satisfies type boolean`)
	})

	test('not boolean', () => {
		assertReportEquals(
			nonStrict,
			T.boolean,
			undefined,
			`subject expects to be boolean but is actually undefined`
		)
	})

	test('specific boolean violation', () => {
		assertReportEquals(nonStrict, T.boolean.true, false, `subject expects to be true but is actually false`)
	})

	test('optional boolean violation', () => {
		assertReportEquals(
			nonStrict,
			T.boolean.optional,
			null,
			`subject expects to be (boolean | undefined) but is actually null`
		)
	})

	test('optional specific boolean violation', () => {
		assertReportEquals(
			nonStrict,
			T.boolean.optional.false,
			true,
			`subject expects to be (false | undefined) but is actually true`
		)
	})
})
describe('number', () => {
	test('not number', () => {
		assertReportEquals(
			nonStrict,
			T.number,
			undefined,
			`subject expects to be number but is actually undefined`
		)
	})

	test('specific number violation', () => {
		assertReportEquals(nonStrict, T.number.create(1), false, `subject expects to be 1 but is actually false`)
	})

	test('optional number violation', () => {
		assertReportEquals(
			nonStrict,
			T.number.optional,
			false,
			`subject expects to be (number | undefined) but is actually false`
		)
	})

	test('optional specific number violation', () => {
		assertReportEquals(
			nonStrict,
			T.number.optional.create(2),
			false,
			`subject expects to be (2 | undefined) but is actually false`
		)
	})

	test('number list violation', () => {
		assertReportEquals(
			nonStrict,
			T.number.list(1, 2, 3),
			false,
			`subject expects to be (1 | 2 | 3) but is actually false`
		)
	})

	test('optional number list violation', () => {
		assertReportEquals(
			nonStrict,
			T.number.optional.list(1, 2, 3),
			false,
			`subject expects to be (1 | 2 | 3 | undefined) but is actually false`
		)
	})
})
describe('string', () => {
	test('not string', () => {
		assertReportEquals(
			nonStrict,
			T.string,
			undefined,
			`subject expects to be string but is actually undefined`
		)
	})

	test('specific string violation', () => {
		assertReportEquals(
			nonStrict,
			T.string.create('a'),
			false,
			`subject expects to be 'a' but is actually false`
		)
	})

	test('optional string violation', () => {
		assertReportEquals(
			nonStrict,
			T.string.optional,
			false,
			`subject expects to be (string | undefined) but is actually false`
		)
	})

	test('optional specific string violation', () => {
		assertReportEquals(
			nonStrict,
			T.string.optional.create('b'),
			false,
			`subject expects to be ('b' | undefined) but is actually false`
		)
	})

	test('string list violation', () => {
		assertReportEquals(
			nonStrict,
			T.string.list('a', 'b', 'c'),
			false,
			`subject expects to be ('a' | 'b' | 'c') but is actually false`
		)
	})

	test('optional string list violation', () => {
		assertReportEquals(
			nonStrict,
			T.string.optional.list('a', 'b', 'c'),
			false,
			`subject expects to be ('a' | 'b' | 'c' | undefined) but is actually false`
		)
	})
})
describe('symbol', () => {
	test('not symbol', () => {
		assertReportEquals(
			nonStrict,
			T.symbol,
			undefined,
			`subject expects to be symbol but is actually undefined`
		)
	})
})
describe('bigint', () => {
	// test('not bigint', () => {
	//   assertReportEquals(nonStrict, T.bigint, undefined,
	//     `subject expects to be bigint but is actually undefined`)
	// })
})
describe('array', () => {
	test('base violation', () => {
		assertReportEquals(
			nonStrict,
			T.array,
			undefined,
			`subject expects to be Array<any> but is actually undefined`
		)
	})
	test('specific array violation', () => {
		assertReportEquals(
			nonStrict,
			T.array.create(T.number),
			false,
			`subject expects to be Array<number> but is actually false`
		)
	})
	test('optional array violation', () => {
		assertReportEquals(
			nonStrict,
			T.array.optional,
			false,
			`subject expects to be (Array<any> | undefined) but is actually false`
		)
	})
	test('optional specific array violation', () => {
		assertReportEquals(
			nonStrict,
			T.array.optional.create(T.number),
			false,
			`subject expects to be (Array<number> | undefined) but is actually false`
		)
	})
})
describe('tuple', () => {
	test('specific tuple violation', () => {
		assertReportEquals(
			nonStrict,
			T.tuple.create(T.number.create(1), T.string.create('a')),
			false,
			`subject expects to be [1,'a'] but is actually false`
		)
	})
	test('optional specific tuple violation', () => {
		assertReportEquals(
			nonStrict,
			T.tuple.optional.create(T.number),
			false,
			`subject expects to be ([number] | undefined) but is actually false`
		)
	})
	test('missing entry', () => {
		assertReportEquals(
			nonStrict,
			T.tuple.create(T.null),
			[],
			[
				`subject expects to be [null] but is actually []`,
				`subject[0] expects to be null but is actually undefined`
			].join('\n')
		)
	})
	test('actual is object', () => {
		assertReportEquals(
			nonStrict,
			T.tuple.create(T.null, T.number),
			{ a: 1 },
			[`subject expects to be [null,number] but is actually { a: 1 }`].join('\n')
		)
	})
	test('strict with extra entry', () => {
		assertReportEquals(
			strict,
			T.tuple.create(T.null),
			[null, 1],
			[
				`subject expects to be strictly [null] but is actually [null, 1]`,
				`index 1 should not contain any value`
			].join('\n')
		)
	})
	test('strict with extra entries', () => {
		assertReportEquals(
			strict,
			T.tuple.create(T.null, T.number),
			[null, 1, 'a', false],
			[
				`subject expects to be strictly [null,number] but is actually [null, 1, 'a', false]`,
				`indices 2,3 should not contain any value`
			].join('\n')
		)
	})
	test('strict with more than 2 extra', () => {
		assertReportEquals(
			strict,
			T.tuple.create(T.null, T.number),
			[null, 1, 'a', false, true],
			[
				`subject expects to be strictly [null,number] but is actually [null, 1, 'a', false, true]`,
				`indices 2..4 should not contain any value`
			].join('\n')
		)
	})
})
describe('object', () => {
	test('not object', () => {
		assertReportEquals(
			nonStrict,
			T.object,
			undefined,
			`subject expects to be object but is actually undefined`
		)
	})
	test('specific object violation', () => {
		assertReportEquals(
			nonStrict,
			T.object.create({ a: T.null }),
			false,
			`subject expects to be { a: null } but is actually false`
		)
	})
	test('optional specific object violation', () => {
		assertReportEquals(
			nonStrict,
			T.object.optional.create({ a: T.object.create({ b: T.string }) }),
			false,
			`subject expects to be ({ a: { b: string } } | undefined) but is actually false`
		)
	})
	test('in object violation', () => {
		assertReportEquals(
			nonStrict,
			T.object.create({ a: T.string }),
			{ a: 1 },
			[
				`subject expects to be { a: string } but is actually { a: 1 }`,
				`subject.a expects to be string but is actually 1`
			].join('\n')
		)
	})
	test('nested object violation', () => {
		assertReportEquals(
			nonStrict,
			T.object.create({ a: T.object.create({ b: T.string }) }),
			{ a: { b: 1 } },
			[
				`subject expects to be { a: { b: string } } but is actually { a: { b: 1 } }`,
				`subject.a expects to be { b: string } but is actually { b: 1 }`,
				`subject.a.b expects to be string but is actually 1`
			].join('\n')
		)
	})
	test('- prop violation', () => {
		assertReportEquals(
			nonStrict,
			T.object.create({ 'a-b': T.string }),
			{ 'a-b': 1 },
			[
				`subject expects to be { 'a-b': string } but is actually { 'a-b': 1 }`,
				`subject['a-b'] expects to be string but is actually 1`
			].join('\n')
		)
	})
	test('strict with extra property', () => {
		assertReportEquals(
			strict,
			T.object.create({ a: T.number }),
			{ a: 1, b: 2 },
			[
				`subject expects to be strictly { a: number } but is actually { a: 1, b: 2 }`,
				`property b should not contain any value`
			].join('\n')
		)
	})
	test('strict with extra properties', () => {
		assertReportEquals(
			strict,
			T.object.create({ a: T.number }),
			{ a: 1, b: 2, c: 'c' },
			[
				`subject expects to be strictly { a: number } but is actually { a: 1, b: 2, c: 'c' }`,
				`properties b,c should not contain any value`
			].join('\n')
		)
	})
	test('object with array', () => {
		assertReportEquals(
			nonStrict,
			T.object.create({ a: T.array, b: T.string }),
			{ a: [], b: 1 },
			[
				`subject expects to be { a: Array<any>, b: string } but is actually { a: [], b: 1 }`,
				`subject.b expects to be string but is actually 1`
			].join('\n')
		)
	})
})
describe('record', () => {
	test('specific record violation', () => {
		assertReportEquals(
			nonStrict,
			T.record.create(T.null),
			false,
			`subject expects to be Record<string, null> but is actually false`
		)
	})
	test('optional specific record violation', () => {
		assertReportEquals(
			nonStrict,
			T.record.optional.create(T.record.create(T.string)),
			false,
			`subject expects to be (Record<string, Record<string, string>> | undefined) but is actually false`
		)
	})
	test(`nested violation`, () => {
		assertReportEquals(
			nonStrict,
			T.record.optional.create(T.record.create(T.string)),
			{ a: { b: 1 } },
			`subject expects to be (Record<string, Record<string, string>> | undefined) but is actually { a: { b: 1 } }`
		)
	})
})

function assertReportEquals(options: analyze.Options, type: AllType, subject: unknown, report: string) {
	expect(getPlainAnalysisReport(analyze(options, type, subject))).toEqual(report)
}
