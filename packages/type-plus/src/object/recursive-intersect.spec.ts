import { test } from 'vitest'

import { type RecursiveIntersect, testType } from '../index.js'

test('add object type to types', () => {
	type U = { u: number }

	acceptU(addU('a'))
	acceptU(addU(1))
	acceptU(addU(true))
	// acceptU(addU(1n))
	acceptU(addU(undefined))
	acceptU(addU(null))

	const obj = addU({ x: 1 })
	acceptU(obj)
	acceptU(obj.x)

	const comObj = addU({ array: ['a'] })
	acceptU(comObj)
	acceptU(comObj.array)
	acceptU(comObj.array[0]!)

	const arr = addU(['1'])
	acceptU(arr)
	acceptU(arr[0]!)

	// Not supported
	// const comArr = addU([{ x: 1 }])
	// acceptU(comArr)
	// acceptU(comArr[0])
	// acceptU(comArr[0].x)

	function addU<T>(x: T): RecursiveIntersect<T, U> {
		return x as any as RecursiveIntersect<T, U>
	}

	function acceptU(x: U) {
		return x
	}
})

test('intersects U into every level of an object type', () => {
	type R = RecursiveIntersect<{ a: { b: 1 } }, { u: 1 }>
	testType.equal<R['u'], 1>(true)
	testType.equal<R['a']['u'], 1>(true)
	testType.equal<R['a']['b']['u'], 1>(true)
})

test('gets never for undefined', () => {
	testType.never<RecursiveIntersect<undefined, { u: 1 }>>(true)
})
