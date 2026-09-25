import type { AnyRecord } from '../index.js'

/**
 * Await on specific props V on type T
 */
export type AwaitedProp<T extends AnyRecord, K extends keyof T> = {
	[k in keyof T]: k extends K ? Awaited<T[k]> : T[k]
}
