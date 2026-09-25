import type { IsEqual } from '../equal/is-equal.js'
import type { Brand } from '../nominal/index.js'
import type { Widen } from '../utils/index.js'

export type Maybe<T> = Just<T> | None<T>
export type Just<T> = Brand<'maybe', T> & { unwrap(): T }
export type None<T> = Brand<'maybe', void> & { unwrap(): T }

export function just<T>(value: T): IsEqual<T, undefined | null> extends true ? None<T> : Just<Widen<NonNullable<T>>> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return {
		unwrap() {
			return value
		},
	} as any
}

export function none<T>(): None<T> {
	return { unwrap() {} } as None<T>
}
