/**
 * 🧰 *type util*
 *
 * The Node.js system error codes this package knows about, mapped to the shape
 * of the `Error` each one arrives as.
 *
 * A few entries carry the extra properties Node attaches: `ENOENT` also has
 * `path`, and `EACCES` and `EADDRINUSE` carry their literal `code`. The rest
 * are plain `Error`, so narrowing to them tells you which failure it was
 * without promising fields that are not there.
 *
 * The list is not complete. It grows as codes are needed; contributions
 * welcome.
 *
 * @example
 * ```ts
 * type R = SystemErrors['ENOENT'] // Error & { code: 'ENOENT'; path: string }
 * ```
 */
export type SystemErrors = {
	EACCES: Error & { code: 'EACCES' }
	EADDRINUSE: Error & { code: 'EADDRINUSE' }
	ECONNREFUSED: Error
	ECONNRESET: Error
	EEXIST: Error
	EISDIR: Error
	EMFILE: Error
	ENOENT: Error & { code: 'ENOENT'; path: string }
	ENOTDIR: Error
	ENOTEMPTY: Error
	ENOTFOUND: Error
	EPERM: Error
	EPIPE: Error
	ETIMEDOUT: Error
}

/**
 * 🧰 *type util*
 *
 * The union of the codes `SystemErrors` covers, which is the set `isSystemError`
 * accepts.
 *
 * @example
 * ```ts
 * type R = SystemErrorCodes // 'EACCES' | 'EADDRINUSE' | ... | 'ETIMEDOUT'
 *
 * type R = 'ENOENT' extends SystemErrorCodes ? true : false // true
 * type R = 'EDQUOT' extends SystemErrorCodes ? true : false // false
 * ```
 */
export type SystemErrorCodes = keyof SystemErrors

/**
 * Type guard NodeJS SystemErrors.
 * The list is not complete. Will add as needed.
 * Feel free to contribute.
 */
export function isSystemError<C extends SystemErrorCodes>(code: C, err: unknown): err is SystemErrors[C] {
	return !!err && (err as any).code === code
}
