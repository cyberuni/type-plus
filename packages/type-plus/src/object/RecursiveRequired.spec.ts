import { expect, test } from 'vitest'

import { type RecursiveRequired, testType } from '../index.js'

test('simple optional property becomes required', () => {
	type SimpleOptional = {
		x?: string
	}

	const actual: RecursiveRequired<SimpleOptional> = { x: '' }
	expect(actual.x.length).toStrictEqual(0)
})

test('deep optional object property becomes required', () => {
	type DeepOptonal = {
		x: {
			y?: string
		}
	}

	const actual: RecursiveRequired<DeepOptonal> = { x: { y: '' } }
	expect(actual.x.y.length).toStrictEqual(0)
})

test('deep optional array property becomes required', () => {
	type DeepArrayOptional = {
		x: {
			y?: string
		}[]
	}

	const actual: RecursiveRequired<DeepArrayOptional> = { x: [{ y: '' }] }
	// The array element is optional because there is no way to determine if the element at the index exists or not
	expect(actual.x[0]?.y.length).toStrictEqual(0)
})

test('the descent stops at an optional property', () => {
	// the descent stops at an optional property; see the TSDoc note
	testType.equal<RecursiveRequired<{ a?: { b?: number } }>, { a: { b?: number } }>(true)
})

// Not supported

// test('simple optional array property becomes required', () => {
//   type DeepArrayOptional = Array<{ y?: string }>

//   let actual: RecursiveRequired<DeepArrayOptional> = [{ y: '' }]
//   t.strictEqual(actual[0].y.length, 0)
// })

// test('deep optional tuple property becomes required', () => {
//   type DeepArrayOptional = {
//     x: [{
//       y?: string
//     }, {
//       z?: string
//     }]
//   }

//   let actual: RecursiveRequired<DeepArrayOptional> = { x: [{ y: '' }, { z: '' }] }
//   t.strictEqual(actual.x[0].y.length, 0)
//   t.strictEqual(actual.x[1].z.length, 0)
// })
