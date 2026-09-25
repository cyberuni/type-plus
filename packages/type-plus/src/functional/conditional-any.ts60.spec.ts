import { test } from 'vitest'
import { testType } from '../index.js'

type Target = { a: string }
declare const flag: boolean
declare function untyped(): { b: number }

function viaReturn(): Target {
	// @ts-expect-error each arm is now checked against the declared return type,
	// so the `as any` arm no longer covers for this one.
	return flag ? untyped() : (untyped() as any)
}

function viaCastedExpression(): Target {
	// Casting the whole expression is what `context()` does instead.
	return (flag ? untyped() : untyped()) as any
}

function viaVariableAnnotation(): Target {
	// Unaffected: only the return position gained the per-arm check.
	const r: Target = flag ? untyped() : (untyped() as any)
	return r
}

test('each arm is checked against the declared return type', () => {
	testType.equal<ReturnType<typeof viaReturn>, Target>(true)
	testType.equal<ReturnType<typeof viaCastedExpression>, Target>(true)
})

test('a variable annotation is unaffected', () => {
	testType.equal<ReturnType<typeof viaVariableAnnotation>, Target>(true)
})
