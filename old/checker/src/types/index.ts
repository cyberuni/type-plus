/**
 * A turing complete solution inspired by many.
 * The types is in Pascal Cases
 * because lower case type names (e.g. true) is a reserved keyword.
 * https://github.com/microsoft/TypeScript/issues/14833
 * https://github.com/tycho01/typical
 */

// export * from './big-int.js'
export type { AllType } from './all-type.js'
export * from './any.js'
export * from './array.js'
export * from './boolean.js'
export * from './check.js'
export * from './conform.js'
export type { Generate } from './generate.js'
export { nil as null, Null } from './null.js'
export * from './number.js'
export { keys, object, ObjectType as Object } from './object.js'
export * from './record.js'
export * from './satisfy.js'
export * from './string.js'
export * from './symbol.js'
export * from './tuple.js'
export * from './types.js'
export { undef as undefined, Undefined } from './undefined.js'
export * from './union.js'
export * from './unknown.js'
