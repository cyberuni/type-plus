import { test } from 'vitest'
import { testType } from '../index.js'

type Target = { a: string }
declare const flag: boolean
declare function untyped(): { b: number }

function viaReturn(): Target {
	// The `as any` arm widens the whole conditional to `any`, so the other arm
	// is never checked against `Target`. `context()` relied on this.
	return flag ? untyped() : (untyped() as any)
}

test('an `any` arm covers for the other one in return position', () => {
	testType.equal<ReturnType<typeof viaReturn>, Target>(true)
})
