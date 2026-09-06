import { it } from 'vitest'
import { type ArrayPlus, testType } from '../index.js'

testType.equal<readonly string[], Readonly<string[]>>(true)

it('detects readonly array as readonly', () => {
	testType.equal<ArrayPlus.IsReadonly<readonly string[]>, true>(true)
})

it('detects readonly tuple as readonly', () => {
	testType.equal<ArrayPlus.IsReadonly<readonly []>, true>(true)
	testType.equal<ArrayPlus.IsReadonly<readonly [1, 2, 3]>, true>(true)
})

it('detects regular array as not readonly', () => {
	testType.equal<ArrayPlus.IsReadonly<string[]>, false>(true)
})

it('detects regular tuple as not readonly', () => {
	testType.equal<ArrayPlus.IsReadonly<[]>, false>(true)
	testType.equal<ArrayPlus.IsReadonly<[1, 2, 3]>, false>(true)
})

it('', () => {
	testType.equal<ArrayPlus.IsReadonly<any>, false>(true)
	testType.equal<ArrayPlus.IsReadonly<unknown>, false>(true)
	testType.equal<ArrayPlus.IsReadonly<never, { $never: 'n' }>, 'n'>(true)
	testType.equal<ArrayPlus.IsReadonly<void>, false>(true)
})

it('detects non array case', () => {
	testType.equal<ArrayPlus.IsReadonly<string, { $notArray: 'n' }>, 'n'>(true)
})

it('distributes over union', () => {
	testType.equal<ArrayPlus.IsReadonly<readonly number[] | number[]>, boolean>(true)
})

it('works with intersection type', () => {
	testType.equal<ArrayPlus.IsReadonly<readonly number[] & { a: 1 }>, true>(true)

	// 🐞 known issue: `Readonly<A>` over an intersection is assignable back to `A`,
	// so a mutable array intersected with an object still reports `true`.
	testType.equal<ArrayPlus.IsReadonly<number[] & { a: 1 }>, true>(true)
})
