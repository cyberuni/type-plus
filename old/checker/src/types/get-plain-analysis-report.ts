import { tersify } from 'tersify'
import { reduceByKey } from '../object/index.js'
import type { AllType } from './all-type.js'
import { analyze } from './analyze.js'

export function getPlainAnalysisReport(analysisResult: analyze.Result) {
	if (!analysisResult.analysis.fail) {
		return `The subject${analysisResult.options.strict ? ' strictly' : ''} satisfies type ${formatAnalysis(
			analysisResult.analysis
		)}`
	}

	return toViolations(analysisResult.options, [], analysisResult.actual, analysisResult.analysis).join('\n')
}

function formatAnalysis(a: AllType.Analysis) {
	return a.type
}

function toViolations(
	options: analyze.Options,
	path: Array<string | number>,
	actual: any,
	analysis: AllType.Analysis
): string[] {
	const clause = options.strict ? `expects to be strictly` : `expects to be`
	const violations = [
		`${formatPath(path)} ${clause} ${formatType(analysis)} but is actually ${tersify(actual)}`
	]

	switch (analysis.type) {
		case 'tuple': {
			if (options.strict && analysis.value!.length < actual.length) {
				violations.push(`${range(analysis.value!.length, actual.length)} should not contain any value`)
			}
			const v2 = analysis.value!.reduce((p: string[], a, i) => {
				if (a.fail) p.push(...toViolations(options, [...path, i], actual[i], a))
				return p
			}, [])
			if (v2.length > 0) violations.push(...v2)
			break
		}
		case 'object':
			if (analysis.value) {
				const typeKeys = Object.keys(analysis.value)
				const actualKeys = Object.keys(actual)
				if (options.strict) {
					const extraKeys = actualKeys.filter(k => typeKeys.indexOf(k) === -1)
					const index = extraKeys.length === 1 ? 'property' : 'properties'
					violations.push(`${index} ${extraKeys.join(',')} should not contain any value`)
				}
				const propViolations = typeKeys.reduce((p, k) => {
					const a = analysis.value![k]
					if (a.fail) p.push(...toViolations(options, [...path, k], actual[k], a))
					return p
				}, [] as string[])
				if (propViolations.length > 0) violations.push(...propViolations)
			}
			break
	}
	return violations
}

function formatPath(path: Array<string | number>) {
	return path.length === 0 ? 'subject' : `subject${path.map(p => toAccessor(p)).join('')}`
}

function toAccessor(p: string | number) {
	if (typeof p === 'number') return `[${p}]`
	if (p.indexOf('-') >= 0) return `['${p}']`
	return `.${p}`
}

function toProp(p: string) {
	return p.indexOf('-') >= 0 ? `'${p}'` : p
}

function formatType(e: AllType.Analysis): string {
	switch (e.type) {
		case 'undefined':
		case 'null':
		case 'symbol':
			// case 'never':
			return e.type
		case 'boolean':
		case 'number':
			// case 'bigint':
			return e.value === undefined ? e.type : String(e.value)
		case 'string':
			return e.value === undefined ? e.type : `'${e.value}'`
		case 'array':
			return e.value === undefined ? 'Array<any>' : `Array<${formatType(e.value)}>`
		case 'tuple':
			return `[${formatExpectations(e.value as AllType.Analysis[])}]`
		case 'object':
			return e.value === undefined
				? e.type
				: `{ ${reduceByKey(
						e.value,
						(p, k) => {
							p.push(`${toProp(k)}: ${formatType((e.value as any)[k])}`)
							return p
						},
						[] as string[]
				  ).join(', ')} }`
		case 'record':
			return `Record<string, ${formatType(e.value)}>`
		case 'union':
			return `(${formatExpectations(e.value as AllType.Analysis[], ' | ')})`
		// istanbul ignore next
		default:
			return `report not expected: ${e.type}`
	}
}

function formatExpectations(es: AllType.Analysis[], sep = ',') {
	return es.map(formatType).join(sep)
}

function range(start: number, end: number) {
	const diff = end - start
	if (diff === 1) return `index ${start}`
	if (diff === 2) return `indices ${start},${end - 1}`
	return `indices ${start}..${end - 1}`
}
