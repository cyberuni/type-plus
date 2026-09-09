import { describe, test } from 'vitest'

import { assertType, isSystemError, type SystemErrorCodes, type SystemErrors, testType } from '../index.js'

test('SystemErrors carries the extra properties Node attaches to a code', () => {
	testType.equal<SystemErrors['ENOENT'], Error & { code: 'ENOENT'; path: string }>(true)
})

test('SystemErrorCodes is the set isSystemError accepts', () => {
	testType.equal<'ENOENT' extends SystemErrorCodes ? true : false, true>(true)
	testType.equal<'EDQUOT' extends SystemErrorCodes ? true : false, false>(true)
})

describe('isSystemError()', () => {
	test('ENOENT', () => {
		const s: unknown = {}
		if (isSystemError('ENOENT', s)) {
			assertType<'ENOENT'>(s.code)
			assertType<string>(s.path)
		}
	})
})
