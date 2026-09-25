import { reduceByKey } from '../object/index.js'
import type { AllType } from './all-type.js'
import type { Array as ArrayType } from './array.js'
import type { Boolean } from './boolean.js'
import { number, Number } from './number.js'
import { object, ObjectType } from './object.js'
import type { Record as RecordType } from './record.js'
import { string, String } from './string.js'
import type { Tuple } from './tuple.js'
import type { Type } from './types.js'
import type { Union } from './union.js'

export namespace analyze {
	export type Options = { strict: boolean }
	export type Result = {
		options: Options
		analysis: AllType.Analysis
		actual: any
	}
}
export function analyze(options: analyze.Options, type: AllType, actual: unknown): analyze.Result {
	return {
		options,
		analysis: analyzeInternal(options, type, actual),
		actual
	}
}
export function analyzeInternal(options: analyze.Options, type: AllType, actual: unknown): AllType.Analysis {
	const t = type['type']
	switch (t) {
		case 'unknown':
		case 'any':
			return ok(type)
		case 'undefined':
		case 'symbol':
			return typeof actual === t ? ok(type) : fail(t)
		case 'null':
			return actual === null ? ok(type) : fail(t)
		case 'boolean':
			return analyzeBoolean(type, actual)
		case 'number':
			return analyzeType(number, type, actual)
		case 'string':
			return analyzeType(string, type, actual)
		// case 'bigint': return analyzeType(bigint, type as BigInt, actual)
		case 'object':
			return analyzeObject(options, type, actual)
		case 'record':
			return analyzeRecord(options, type, actual)
		case 'array':
			return analyzeArray(options, type, actual)
		case 'tuple':
			return analyzeTuple(options, type, actual)
		case 'union':
			return analyzeUnion(options, type, actual)
	}
}

function analyzeBoolean(type: Boolean, actual: unknown) {
	const value = type['value']
	if (value === undefined) {
		return typeof actual === 'boolean' ? ok(type) : fail('boolean', value)
	} else {
		return value === actual ? ok(type) : fail('boolean', value)
	}
}

function analyzeType(
	baseType: Number | String, // | BigInt,
	type: Type<any, any>,
	actual: unknown
) {
	const value = type.value
	return typeof actual === baseType['type'] && (type === baseType || actual === value)
		? ok(type)
		: fail(type['type'], type['value'])
}

function analyzeUnion(options: analyze.Options, type: Union, actual: unknown) {
	const subTypes = type['value']
	const r = subTypes.map(t => analyzeInternal(options, t, actual))
	return r.some(r => !r.fail) ? ok(type) : fail('union', r)
}

function analyzeArray(options: analyze.Options, type: ArrayType<AllType>, actual: unknown) {
	const subType = type['value']
	if (!Array.isArray(actual)) return fail('array', subType ? ok(subType) : undefined)
	if (subType === undefined) return ok(type)

	const r = actual.reduce(
		(p: { keys: number[]; actual: any[]; value: any }, a, i) => {
			const r = analyzeInternal(options, subType, a)
			if (r.fail) {
				p.value = r.value
				p.keys.push(i)
				p.actual.push(a)
			}
			return p
		},
		{ keys: [], actual: [] }
	)
	return r.keys.length === 0 ? ok(type) : fail('array', { ...fail(subType['type'], r.value) })
}

function analyzeTuple(options: analyze.Options, type: Tuple, actual: unknown) {
	const value = type['value']
	if (!Array.isArray(actual)) return fail('tuple', value.map(ok))
	const results = value.map((v, i) => analyzeInternal(options, v, actual[i]))
	if (options.strict && results.length < actual.length) {
		return fail('tuple', results)
	}
	return results.every(r => !r.fail) ? ok(type) : fail('tuple', results)
}

function analyzeObject(options: analyze.Options, type: ObjectType, actual: any) {
	const typeMap = type['value']
	if (!isOnlyObject(actual)) return fail('object', typeMap ? object.map(v => ok(v), typeMap) : undefined)
	if (type === (object as ObjectType)) return ok(type)

	const typeKeys = Object.keys(typeMap)
	const s = { ...actual }
	const results = typeKeys.reduce(
		(p, k) => {
			const r = (p.value[k] = analyzeInternal(options, typeMap[k], actual[k]))
			p.fail ||= !!r.fail
			s[k] = undefined
			return p
		},
		{ fail: false, value: {} } as { fail: boolean; value: Record<string, AllType.Analysis> }
	)
	const skeys = Object.keys(s)
	if (options.strict && skeys.length > typeKeys.length) {
		return fail('object', results.value)
	}

	return !results.fail ? ok(type) : fail('object', results.value)
}

function analyzeRecord(options: analyze.Options, type: RecordType, actual: unknown) {
	const subType = type['value']
	if (!isOnlyObject(actual)) return fail('record', ok(subType))

	const r = reduceByKey(
		actual,
		(p, k) => {
			const r = analyzeInternal(options, subType, actual[k])
			if (r.fail) {
				p.value = r.value
				p.keys.push(k)
				p.actual.push(actual[k])
			}
			return p
		},
		{ keys: [] as string[], actual: [] as any[], value: undefined as any }
	)
	return r.keys.length === 0 ? ok(type) : fail('record', { ...fail(subType['type'], r.value) })
}

function ok(t: { type: AllType.Analysis['type']; ['value']?: AllType.Analysis['value'] }): AllType.Analysis {
	const type = t['type']
	const value = t['value']
	if (value === undefined) return { type, value }
	if (typeof value !== 'object' || value === null) return { type, value }
	if (Array.isArray(value)) return { type, value: value.map(ok) } as any
	if (value['type']) return { type, value: ok(value) } as any
	return {
		type,
		value: reduceByKey(
			value as Record<string, any>,
			(p, k) => ((p[k] = ok(value[k])), p),
			{} as Record<string, any>
		)
	} as any
}

function fail(type: AllType.Analysis['type'], value?: AllType.Analysis['value']): AllType.Analysis {
	return value === undefined ? { type, fail: true } : { type, value, fail: true }
}

function isOnlyObject(actual: unknown): actual is Object {
	return typeof actual === 'object' && actual !== null && !Array.isArray(actual)
}
