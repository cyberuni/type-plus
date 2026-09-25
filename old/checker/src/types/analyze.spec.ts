import { describe, expect, test } from '@jest/globals'
import { satisfies } from 'satisfier'
import type { AllType } from './all-type.js'
import { analyze } from './analyze.js'
import * as T from './index.js'

describe('non-strict', () => {
	const options = { strict: false, debug: false }
	describe('undefined', () => {
		test('only undefined passes', () => {
			const t = T.undefined
			assert(analyze(options, t, undefined), { type: 'undefined' })
			analyzeFailsOtherThan(options, t, undefined)
			assert(analyze(options, t, true), { type: 'undefined', fail: true })
		})
	})
	describe('null', () => {
		test('only null passes', () => {
			const t = T.null
			assert(analyze(options, t, null), { type: 'null' })
			analyzeFailsOtherThan(options, t, null)
			assert(analyze(options, t, true), { type: 'null', fail: true })
		})
		test('optional', () => {
			const t = T.null.optional
			const pass = {
				type: 'union' as const,
				value: [{ type: 'null' }, { type: 'undefined' }]
			}
			assert(analyze(options, t, null), pass)
			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, true), {
				type: 'union' as const,
				value: [
					{ type: 'null', fail: true },
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
	})
	describe('boolean', () => {
		test('only true | false passes', () => {
			const t = T.boolean
			const pass = { type: 'boolean' as const }
			assert(analyze(options, t, true), pass)
			assert(analyze(options, t, false), pass)
			analyzeFailsOtherThan(options, t, true, false)
			assert(analyze(options, t, null), { type: 'boolean', fail: true })
		})
		test('true', () => {
			const t = T.boolean.true
			assert(analyze(options, t, true), { type: 'boolean', value: true })
			assert(analyze(options, t, null), { type: 'boolean', value: true, fail: true })
		})
		test('false', () => {
			const t = T.boolean.false
			assert(analyze(options, t, false), { type: 'boolean', value: false })
			assert(analyze(options, t, null), { type: 'boolean', value: false, fail: true })
		})
		test('optional', () => {
			const t = T.boolean.optional
			const pass = {
				type: 'union' as const,
				value: [{ type: 'boolean' }, { type: 'undefined' }]
			}
			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, true), pass)
			assert(analyze(options, t, false), pass)
			analyzeFailsOtherThan(options, t, true, false, undefined)
			assert(analyze(options, t, null), {
				type: 'union' as const,
				value: [
					{ type: 'boolean', fail: true },
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
		test('optional create', () => {
			const t = T.boolean.optional.create(true)
			const pass = {
				type: 'union' as const,
				value: [{ type: 'boolean', value: true }, { type: 'undefined' }]
			}
			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, true), pass)
			assert(analyze(options, t, false), {
				type: 'union' as const,
				value: [
					{ type: 'boolean', value: true, fail: true },
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
		test('optional true', () => {
			const t = T.boolean.optional.true
			const pass = {
				type: 'union' as const,
				value: [{ type: 'boolean', value: true }, { type: 'undefined' }]
			}
			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, true), pass)
			assert(analyze(options, t, false), {
				type: 'union' as const,
				value: [
					{ type: 'boolean', value: true, fail: true },
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
		test('optional false', () => {
			const t = T.boolean.optional.false
			const pass = {
				type: 'union' as const,
				value: [{ type: 'boolean', value: false }, { type: 'undefined' }]
			}
			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, false), pass)
			assert(analyze(options, t, true), {
				type: 'union' as const,
				value: [
					{ type: 'boolean', value: false, fail: true },
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
	})
	describe('number', () => {
		test('only number passes', () => {
			const t = T.number
			const pass = { type: 'number' as const }
			assert(analyze(options, t, 0), pass)
			assert(analyze(options, t, 1), pass)
			assert(analyze(options, t, -1), pass)
			analyzeFailsOtherThan(options, t, -1, 0, 1)
			assert(analyze(options, t, null), { type: 'number', fail: true })
		})
		test('0', () => {
			const t = T.number.create(0)
			const pass = { type: 'number' as const, value: 0 }
			assert(analyze(options, t, 0), pass)
			analyzeFailsOtherThan(options, t, 0)
			assert(analyze(options, t, 1), { type: 'number', value: 0, fail: true })
		})
		test('1', () => {
			const t = T.number.create(1)
			const pass = { type: 'number' as const, value: 1 }
			assert(analyze(options, t, 1), pass)
			analyzeFailsOtherThan(options, t, 1)
			assert(analyze(options, t, 0), { type: 'number', value: 1, fail: true })
		})
		test('optional', () => {
			const t = T.number.optional
			const pass = {
				type: 'union' as const,
				value: [{ type: 'number' }, { type: 'undefined' }]
			}
			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, 0), pass)
			assert(analyze(options, t, 1), pass)
			assert(analyze(options, t, -1), pass)
			analyzeFailsOtherThan(options, t, -1, 0, 1, undefined)
			assert(analyze(options, t, null), {
				type: 'union' as const,
				value: [
					{ type: 'number', fail: true },
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
		test('optional create', () => {
			const t = T.number.optional.create(1)
			const pass = {
				type: 'union' as const,
				value: [{ type: 'number', value: 1 }, { type: 'undefined' }]
			}
			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, 1), pass)
			assert(analyze(options, t, 0), {
				type: 'union' as const,
				value: [
					{ type: 'number', value: 1, fail: true },
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
		test('list: single', () => {
			const t = T.number.list(1)
			const pass = { type: 'number' as const, value: 1 }
			assert(analyze(options, t, 1), pass)
			assert(analyze(options, t, 0), {
				type: 'number',
				value: 1,
				fail: true
			})
		})
		test('list: multiple', () => {
			const t = T.number.list(1, 2, 3)
			const pass = {
				type: 'union' as const,
				value: [
					{ type: 'number', value: 1 },
					{ type: 'number', value: 2 },
					{ type: 'number', value: 3 }
				]
			}
			assert(analyze(options, t, 1), pass)
			assert(analyze(options, t, 2), pass)
			assert(analyze(options, t, 3), pass)
			assert(analyze(options, t, 0), {
				type: 'union' as const,
				value: [
					{ type: 'number', value: 1, fail: true },
					{ type: 'number', value: 2, fail: true },
					{ type: 'number', value: 3, fail: true }
				],
				fail: true
			})
		})
		test('optional.list: multiple', () => {
			const t = T.number.optional.list(1, 2, 3)
			const pass = {
				type: 'union' as const,
				value: [
					{ type: 'number', value: 1 },
					{ type: 'number', value: 2 },
					{ type: 'number', value: 3 },
					{ type: 'undefined' }
				]
			}
			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, 1), pass)
			assert(analyze(options, t, 2), pass)
			assert(analyze(options, t, 3), pass)
			assert(analyze(options, t, 0), {
				type: 'union' as const,
				value: [
					{ type: 'number', value: 1, fail: true },
					{ type: 'number', value: 2, fail: true },
					{ type: 'number', value: 3, fail: true },
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
	})
	describe('string', () => {
		test('only string passes', () => {
			const t = T.string
			const pass = { type: 'string' as const }
			assert(analyze(options, t, ''), pass)
			assert(analyze(options, t, 'a'), pass)
			analyzeFailsOtherThan(options, t, '', 'a')
			assert(analyze(options, t, null), { type: 'string', fail: true })
		})
		test("''", () => {
			const t = T.string.create('')
			const pass = { type: 'string' as const, value: '' }
			assert(analyze(options, t, ''), pass)
			analyzeFailsOtherThan(options, t, '')
			assert(analyze(options, t, 'a'), { type: 'string', value: '', fail: true })
		})
		test(`'a'`, () => {
			const t = T.string.create('a')
			const pass = { type: 'string' as const, value: 'a' }
			assert(analyze(options, t, 'a'), pass)
			analyzeFailsOtherThan(options, t, 'a')
			assert(analyze(options, t, ''), { type: 'string', value: 'a', fail: true })
		})
		test('optional', () => {
			const t = T.string.optional
			const pass = {
				type: 'union' as const,
				value: [{ type: 'string' }, { type: 'undefined' }]
			}
			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, ''), pass)
			assert(analyze(options, t, 'a'), pass)
			analyzeFailsOtherThan(options, t, '', 'a', undefined)
			assert(analyze(options, t, null), {
				type: 'union' as const,
				value: [
					{ type: 'string', fail: true },
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
		test('optional create', () => {
			const t = T.string.optional.create('a')
			const pass = {
				type: 'union' as const,
				value: [{ type: 'string', value: 'a' }, { type: 'undefined' }]
			}
			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, 'a'), pass)
			assert(analyze(options, t, ''), {
				type: 'union' as const,
				value: [
					{ type: 'string', value: 'a', fail: true },
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
		test('list: single', () => {
			const t = T.string.list('a')
			assert(analyze(options, t, 'a'), { type: 'string', value: 'a' })
			assert(analyze(options, t, ''), {
				type: 'string',
				value: 'a',
				fail: true
			})
		})
		test('list: multiple', () => {
			const t = T.string.list('1', '2', '3')
			const pass = {
				type: 'union' as const,
				value: [
					{ type: 'string', value: '1' },
					{ type: 'string', value: '2' },
					{ type: 'string', value: '3' }
				]
			}
			assert(analyze(options, t, '1'), pass)
			assert(analyze(options, t, '2'), pass)
			assert(analyze(options, t, '3'), pass)
			assert(analyze(options, t, 1), {
				type: 'union' as const,
				value: [
					{ type: 'string', value: '1', fail: true },
					{ type: 'string', value: '2', fail: true },
					{ type: 'string', value: '3', fail: true }
				],
				fail: true
			})
		})
		test('optional.list: multiple', () => {
			const t = T.string.optional.list('1', '2', '3')
			const pass = {
				type: 'union' as const,
				value: [
					{ type: 'string', value: '1' },
					{ type: 'string', value: '2' },
					{ type: 'string', value: '3' },
					{ type: 'undefined' }
				]
			}
			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, '1'), pass)
			assert(analyze(options, t, '2'), pass)
			assert(analyze(options, t, '3'), pass)
			assert(analyze(options, t, 1), {
				type: 'union' as const,
				value: [
					{ type: 'string', value: '1', fail: true },
					{ type: 'string', value: '2', fail: true },
					{ type: 'string', value: '3', fail: true },
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
	})
	describe('bigint', () => {
		// test('only number passes', () => {
		//   const t = T.number
		//   const pass = { type: 'number' }
		//   assert(analyze(options, t, 0), pass)
		//   assert(analyze(options, t, 1), pass)
		//   assert(analyze(options, t, -1), pass)
		//   analyzeFailsOtherThan(options, t, -1, 0, 1)
		//   assert(analyze(options, t, null), { pass: false, type: 'number' })
		// })
		// test('0', () => {
		//   const t = T.number.create(0)
		//   const pass = { type: 'number', value: 0 }
		//   assert(analyze(options, t, 0), pass)
		//   analyzeFailsOtherThan(options, t, 0)
		//   assert(analyze(options, t, 1), { pass: false, type: 'number', value: 0, actual: 1 })
		// })
		// test('1', () => {
		//   const t = T.number.create(1)
		//   const pass = { type: 'number', value: 1 }
		//   assert(analyze(options, t, 1), pass)
		//   analyzeFailsOtherThan(options, t, 1)
		//   assert(analyze(options, t, 0), { pass: false, type: 'number', value: 1, actual: 0 })
		// })
		// test('optional', () => {
		//   const t = T.number.optional
		//   const pass = {
		//     pass: true,
		//     type: 'union',
		//     value: [
		//       { type: 'number' },
		//       { type: 'undefined' }
		//     ]
		//   }
		//   assert(analyze(options, t, undefined), pass)
		//   assert(analyze(options, t, 0), pass)
		//   assert(analyze(options, t, 1), pass)
		//   assert(analyze(options, t, -1), pass)
		//   analyzeFailsOtherThan(options, t, -1, 0, 1, undefined)
		//   assert(analyze(options, t, null), {
		//     pass: false,
		//     type: 'union',
		//     value: [
		//       { pass: false, type: 'number' },
		//       { pass: false, type: 'undefined' }
		//     ],
		//     actual: null
		//   })
		// })
		// test('optional create', () => {
		//   const t = T.number.optional.create(1)
		//   const pass = {
		//     pass: true,
		//     type: 'union',
		//     value: [
		//       { type: 'number', value: 1 },
		//       { type: 'undefined' }
		//     ]
		//   }
		//   assert(analyze(options, t, undefined), pass)
		//   assert(analyze(options, t, 1), pass)
		//   assert(analyze(options, t, 0), {
		//     pass: false,
		//     type: 'union',
		//     value: [
		//       { pass: false, type: 'number', value: 1, actual: 0 },
		//       { pass: false, type: 'undefined', actual: 0 }
		//     ],
		//     actual: 0
		//   })
		// })
		// test('list: single', () => {
		//   const t = T.number.list(1)
		//   const pass = { type: 'number', value: 1 }
		//   assert(analyze(options, t, 1), pass)
		//   assert(analyze(options, t, 0), {
		//     pass: false,
		//     type: 'number',
		//     value: 1,
		//     actual: 0
		//   })
		// })
		// test('list: multiple', () => {
		//   const t = T.number.list(1, 2, 3)
		//   const pass = {
		//     pass: true,
		//     type: 'union',
		//     value: [
		//       { type: 'number', value: 1 },
		//       { type: 'number', value: 2 },
		//       { type: 'number', value: 3 },
		//     ]
		//   }
		//   assert(analyze(options, t, 1), pass)
		//   assert(analyze(options, t, 2), pass)
		//   assert(analyze(options, t, 3), pass)
		//   assert(analyze(options, t, 0), {
		//     pass: false,
		//     type: 'union',
		//     value: [
		//       { pass: false, type: 'number', value: 1, actual: 0 },
		//       { pass: false, type: 'number', value: 2, actual: 0 },
		//       { pass: false, type: 'number', value: 3, actual: 0 }
		//     ],
		//     actual: 0
		//   })
		// })
		// test('optional.list: multiple', () => {
		//   const t = T.number.optional.list(1, 2, 3)
		//   const pass = {
		//     pass: true,
		//     type: 'union',
		//     value: [
		//       { type: 'number', value: 1 },
		//       { type: 'number', value: 2 },
		//       { type: 'number', value: 3 },
		//       { type: 'undefined' }
		//     ]
		//   }
		//   assert(analyze(options, t, undefined), pass)
		//   assert(analyze(options, t, 1), pass)
		//   assert(analyze(options, t, 2), pass)
		//   assert(analyze(options, t, 3), pass)
		//   assert(analyze(options, t, 0), {
		//     pass: false,
		//     type: 'union',
		//     value: [
		//       { pass: false, type: 'number', value: 1, actual: 0 },
		//       { pass: false, type: 'number', value: 2, actual: 0 },
		//       { pass: false, type: 'number', value: 3, actual: 0 },
		//       { pass: false, type: 'undefined', actual: 0 }
		//     ],
		//     actual: 0
		//   })
		// })
	})
	describe('symbol', () => {
		test('only symbol passes', () => {
			const t = T.symbol
			const pass = { type: 'symbol' } as const
			assert(analyze(options, t, Symbol()), pass)
			assert(analyze(options, t, Symbol('abc')), pass)
			assert(analyze(options, t, Symbol.for('def')), pass)
			analyzeFailsOtherThan(options, t, Symbol.for('a'))
			assert(analyze(options, t, true), { type: 'symbol', fail: true })
		})
		test('optional', () => {
			const t = T.symbol.optional
			const pass = {
				type: 'union' as const,
				value: [{ type: 'symbol' }, { type: 'undefined' }]
			}
			assert(analyze(options, t, Symbol()), pass)
			assert(analyze(options, t, Symbol('abc')), pass)
			assert(analyze(options, t, Symbol.for('def')), pass)
			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, true), {
				type: 'union' as const,
				value: [
					{ type: 'symbol', fail: true },
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
	})
	describe('union', () => {
		test('on two types', () => {
			const t = T.union.create(T.boolean, T.number)
			const pass = { type: 'union' as const, value: [{ type: 'boolean' }, { type: 'number' }] }
			assert(analyze(options, t, 0), pass)
			assert(analyze(options, t, false), pass)
		})
		test('on multiple primitive types', () => {
			const t = T.union.create(T.boolean, T.null, T.number)
			const pass = {
				type: 'union' as const,
				value: [{ type: 'boolean' }, { type: 'null' }, { type: 'number' }]
			}
			assert(analyze(options, t, false), pass)
			assert(analyze(options, t, null), pass)
			assert(analyze(options, t, 0), pass)
		})
	})
	describe('array', () => {
		test('only array of any kind passes', () => {
			const t = T.array
			const pass = { type: 'array' as const }
			assert(analyze(options, t, []), pass)
			assert(analyze(options, t, ['a']), pass)
			analyzeFailsOtherThan(options, t, [], ['a'])
			assert(analyze(options, t, null), { type: 'array', fail: true })
		})
		test('array.unknown accepts only array of any kind', () => {
			const t = T.array.unknown
			const pass = { type: 'array', value: { type: 'unknown' } } as const
			assert(analyze(options, t, []), pass)
			assert(analyze(options, t, ['a']), pass)
			analyzeFailsOtherThan(options, t, [], ['a'])
			assert(analyze(options, t, null), {
				type: 'array',
				value: { type: 'unknown' },
				fail: true
			})
		})
		test('specific type', () => {
			const t = T.array.create(T.number)
			const pass = { type: 'array', value: { type: 'number' } } as const
			assert(analyze(options, t, []), pass)
			assert(analyze(options, t, [0]), pass)
			assert(analyze(options, t, [1, 2]), pass)
			assert(analyze(options, t, ['a']), {
				type: 'array',
				value: { type: 'number', fail: true },
				fail: true
			})
			assert(analyze(options, t, [1, 'a']), {
				type: 'array',
				// value: { type: 'number' },
				value: { type: 'number', fail: true },
				fail: true
			})
			assert(analyze(options, t, ['a', 1]), {
				type: 'array',
				value: { type: 'number', fail: true },
				fail: true
			})
		})
		test('specific const type', () => {
			const t = T.array.create(T.number.create(2))
			const pass = { type: 'array', value: { type: 'number', value: 2 } } as const
			assert(analyze(options, t, []), pass)
			assert(analyze(options, t, [2]), pass)
			assert(analyze(options, t, [0]), {
				type: 'array',
				value: { type: 'number', value: 2, fail: true },
				fail: true
			})
		})
		test(`array's value type can be union type`, () => {
			const t = T.array.create(T.union.create(T.number, T.boolean))
			const pass = {
				type: 'array',
				value: {
					type: 'union',
					value: [{ type: 'number' }, { type: 'boolean' }]
				}
			} as const
			assert(analyze(options, t, []), pass)
			assert(analyze(options, t, [0]), pass)
			assert(analyze(options, t, [false]), pass)
			assert(analyze(options, t, [false, 0]), pass)
			assert(analyze(options, t, [0, false, '']), {
				type: 'array',
				value: {
					type: 'union',
					value: [
						{ type: 'number', fail: true },
						{ type: 'boolean', fail: true }
					],
					fail: true
				},
				fail: true
			})
		})
		test('optional', () => {
			const t = T.array.optional
			const pass = { type: 'union' as const, value: [{ type: 'array' }, { type: 'undefined' }] }
			assert(analyze(options, t, []), pass)
			assert(analyze(options, t, [1]), pass)
			assert(analyze(options, t, ['a']), pass)
			assert(analyze(options, t, undefined), pass)
		})
		test('optional create', () => {
			const t = T.array.optional.create(T.string)
			const pass = {
				type: 'union' as const,
				value: [{ type: 'array', value: { type: 'string' } }, { type: 'undefined' }]
			}
			assert(analyze(options, t, ['']), pass)
			assert(analyze(options, t, ['a']), pass)
			assert(analyze(options, t, undefined), pass)
		})
	})
	describe('tuple', () => {
		test('single value', () => {
			const t = T.tuple.create(T.number)
			const pass = { type: 'tuple' as const, value: [{ type: 'number' as const }] }
			assert(analyze(options, t, [0]), pass)
			assert(analyze(options, t, [1]), pass)
			assert(analyze(options, t, true), {
				type: 'tuple',
				value: [{ type: 'number' }],
				fail: true
			})
			assert(analyze(options, t, []), {
				type: 'tuple',
				value: [{ type: 'number', fail: true }],
				fail: true
			})
			assert(analyze(options, t, ['a']), {
				type: 'tuple',
				value: [{ type: 'number', fail: true }],
				fail: true
			})
		})
		test('two values', () => {
			const t = T.tuple.create(T.number, T.string)
			const pass = { type: 'tuple' as const, value: [{ type: 'number' }, { type: 'string' }] }

			expect(T.satisfy(t, [0, ''])).toBe(true)
			expect(T.satisfy(t, [0])).toBe(false)

			assert(analyze(options, t, [0, '']), pass)
			assert(analyze(options, t, [1]), {
				type: 'tuple',
				value: [{ type: 'number' }, { type: 'string', fail: true }],
				fail: true
			})
			assert(analyze(options, t, [1, 2]), {
				type: 'tuple',
				value: [{ type: 'number' }, { type: 'string', fail: true }],
				fail: true
			})
			assert(analyze(options, t, ['a']), {
				type: 'tuple',
				value: [
					{ type: 'number', fail: true },
					{ type: 'string', fail: true }
				],
				fail: true
			})
		})
	})
	describe('object', () => {
		test('only object of any kind passes', () => {
			const t = T.object
			const pass = { type: 'object' as const }
			assert(analyze(options, t, {}), pass)
			assert(analyze(options, t, { a: 1 }), pass)
			assert(analyze(options, t, { 0: 0 }), pass)
			assert(analyze(options, t, []), {
				type: 'object',
				fail: true
			})
			assert(analyze(options, t, null), {
				type: 'object',
				fail: true
			})
			analyzeFailsOtherThan(options, t, {}, { a: 1 })
		})
		test('single prop', () => {
			const t = T.object.create({ a: T.number })
			const pass = { type: 'object' as const, value: { a: { type: 'number' } } }
			assert(analyze(options, t, { a: 0 }), pass)
			assert(analyze(options, t, { a: 1 }), pass)
			assert(analyze(options, t, { a: 'a' }), {
				type: 'object',
				value: { a: { type: 'number', fail: true } },
				fail: true
			})
			assert(analyze(options, t, { a: { b: 'b' } }), {
				type: 'object',
				value: { a: { type: 'number', fail: true } },
				fail: true
			})
		})
		test('two props', () => {
			const t = T.object.create({ a: T.number.create(1), b: T.string })
			const pass = {
				type: 'object' as const,
				value: {
					a: { type: 'number', value: 1 },
					b: { type: 'string' }
				}
			}
			assert(analyze(options, t, { a: 1, b: '' }), pass)
			assert(analyze(options, t, { a: 1, b: 'b' }), pass)
			assert(analyze(options, t, { a: 1, b: '' }), pass)
			assert(analyze(options, t, { a: 1, b: '', c: 3 }), pass)
			assert(analyze(options, t, { a: 2, b: '' }), {
				type: 'object',
				value: {
					a: { type: 'number', value: 1, fail: true },
					b: { type: 'string' }
				},
				fail: true
			})
		})
		test('props with union', () => {
			const t = T.object.create({
				a: T.union.create(T.number.create(1), T.boolean.true),
				b: T.string
			})
			const pass = {
				type: 'object' as const,
				value: {
					a: {
						type: 'union' as const,
						value: [
							{ type: 'number', value: 1 },
							{ type: 'boolean', value: true }
						]
					},
					b: { type: 'string' }
				}
			}

			assert(analyze(options, t, { a: 1, b: '' }), pass)
			assert(analyze(options, t, { a: true, b: '' }), pass)
			assert(analyze(options, t, { a: false, b: '' }), {
				type: 'object',
				value: {
					a: {
						type: 'union',
						value: [
							{ type: 'number', value: 1, fail: true },
							{ type: 'boolean', value: true, fail: true }
						],
						fail: true
					},
					b: { type: 'string' }
				},
				fail: true
			})
		})
		test('nested object', () => {
			const t = T.object.create({ a: T.object.create({ b: T.number }) })
			const pass = {
				type: 'object' as const,
				value: {
					a: { type: 'object', value: { b: { type: 'number' } } }
				}
			}
			assert(analyze(options, t, { a: { b: 0 } }), pass)
			assert(analyze(options, t, { a: { b: 'b' } }), {
				type: 'object',
				value: {
					a: {
						type: 'object',
						value: { b: { type: 'number', fail: true } },
						fail: true
					}
				},
				fail: true
			})
		})
		test('optional', () => {
			const t = T.object.optional
			const pass = { type: 'union' as const, value: [{ type: 'object' }, { type: 'undefined' }] }

			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, {}), pass)
			assert(analyze(options, t, { a: 0 }), pass)
		})
		test('optional create', () => {
			const t = T.object.optional.create({ a: T.string })
			const pass = {
				type: 'union' as const,
				value: [{ type: 'object', value: { a: { type: 'string' } } }, { type: 'undefined' }]
			}

			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, { a: '' }), pass)
			assert(analyze(options, t, {}), {
				type: 'union' as const,
				value: [
					{
						type: 'object',
						value: {
							a: {
								type: 'string',
								fail: true
							}
						},
						fail: true
					},
					{ type: 'undefined', fail: true }
				],
				fail: true
			})
		})
	})
	describe('record', () => {
		test('base type', () => {
			const t = T.record.create(T.number)
			const pass = { type: 'record' as const, value: { type: 'number' } }

			analyzeFailsOtherThan(options, T.record.create(T.null), {}, { a: 1 })
			assert(analyze(options, t, { a: 1 }), pass)
			assert(analyze(options, t, { a: 'b' }), {
				type: 'record',
				value: { type: 'number', fail: true },
				fail: true
			})
		})
		test('nested', () => {
			const t = T.record.optional.create(T.record.create(T.string))
			const pass = {
				type: 'union' as const,
				value: [
					{
						type: 'record',
						value: {
							type: 'record',
							value: { type: 'string' }
						}
					},
					{ type: 'undefined' }
				]
			}

			assert(analyze(options, t, undefined), pass)
			assert(analyze(options, t, { a: { b: 'b' } }), pass)
			assert(analyze(options, t, { a: { b: true } }), {
				type: 'union' as const,
				value: [
					{
						type: 'record',
						value: {
							type: 'record',
							value: { type: 'string', fail: true },
							fail: true
						},
						fail: true
					},
					{
						type: 'undefined',
						fail: true
					}
				],
				fail: true
			})
		})
	})
})

describe('strict', () => {
	const options = { strict: true, debug: false }
	describe('tuple', () => {
		test('have more elements then specified will fail', () => {
			const t = T.tuple.create(T.string)
			assert(analyze(options, t, ['a', 'b', 'c', 'd']), {
				type: 'tuple',
				value: [{ type: 'string' }],
				fail: true
			})
		})
	})
	describe('object', () => {
		test('have extra properties then specified will fail', () => {
			const t = T.object.create({ a: T.number })
			assert(analyze(options, t, { a: 1, b: 2, c: 'c' }), {
				type: 'object',
				value: { a: { type: 'number' } },
				fail: true
			})
		})
	})
})

function assert(result: analyze.Result, analysis: AllType.Analysis) {
	expect(result.analysis).toEqual(analysis)
}

function analyzeFailsOtherThan(options: analyze.Options, type: T.AllType, ...excepts: any[]) {
	const values = [
		undefined,
		null,
		true,
		false,
		-1,
		0,
		1,
		-1n,
		0n,
		1n,
		'',
		'a',
		[],
		['a'],
		{},
		{ a: 1 },
		Symbol.for('a')
	]
	values.forEach(v => {
		if (!excepts.some(e => satisfies(v, e))) {
			expect(analyze(options, type, v).analysis.fail).toBe(true)
		}
	})
}
