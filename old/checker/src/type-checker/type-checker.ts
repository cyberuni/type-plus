import type { AllType } from '../types/index.js'
import { analyze } from '../types/analyze.js'
import { satisfy } from '../types/satisfy.js'
import type { BooleanSpec } from './boolean.js'
import type { Tuple } from './tuple.js'
import type { Type, TypeSpec } from './types.js'

// export type TypeChecker<Types extends Type<string, any>[]> = {

// }

export namespace TypeChecker {
	export type CheckOptions = {
		/**
		 * Check in strict mode.
		 * true = `conform()`.
		 * false = `satisfy()`.
		 */
		strict: boolean
		/**
		 * Turn on debug logging.
		 */
		debug: boolean
	}

	export type Generate<Specs extends Array<any>, T> = Specs extends Array<TypeSpec<AllType>>
		? Generate._<Specs, T>['result']
		: never

	export namespace Generate {
		export type _<Specs extends Array<TypeSpec<AllType>>, T> = T extends AllType
			? {
					result: Generate<Specs, _ToNative<Tuple.FindByProp<Specs, 'type', T>, T>>
			  }
			: { result: T }

		export type _ToNative<R, T> = R extends TypeSpec<any> ? ReturnType<R['toNative']> : T
	}
}

export function createTypeChecker<Specs extends Type<string, any>[]>(..._typeSpec: Specs) {
	return {
		check<T extends AllType>(
			_options: TypeChecker.CheckOptions,
			type: T,
			subject: unknown
		): subject is TypeChecker.Generate<[typeof BooleanSpec], T> {
			const result = (satisfy.result = analyze({ strict: false }, type, subject))
			return !result.analysis.fail
		}
	}
}
