import type { $Never } from '../$type/special/$never.js'
import type { IsAny } from '../any/is_any.js'
import type { NonComposableTypes } from '../composable_types.js'
import type { Or } from '../logical/logical.js'
import type { IsNever } from '../never/is_never.js'
import type { IsNotNever } from '../never/is_not_never.js'
import type { IsLiteral } from '../predicates/literal.js'
import type { AnyRecord } from './any_record.js'
import type { IsDisjoint } from './IsDisjoint.js'
import type { KeyTypes } from './KeyTypes.js'
import type { OptionalKeys } from './optional_key.js'

/**
 * ⚗️ *transform*
 * 🔢 *customizable*
 *
 * Merges type `A` and type `B`.
 *
 * This type performs the same operations as `{ ...a, ...b }` but at the type level.
 *
 * It handles cases like A or B are `Record`,
 * joining between required and optional props, etc.
 */
export type Merge<
	A extends AnyRecord,
	B extends AnyRecord,
	// FIXME: reserved but not yet honoured by the body. Underscore-prefixed so
	// both biome and `noUnusedLocals` accept it - TypeScript 7 started flagging
	// the unprefixed name. Kept in place because dropping it would change the
	// arity of a public type.
	_Options = Merge.DefaultOptions,
> = Or<
	IsAny<A>,
	IsAny<B>,
	{
		$then: any
		$else: Or<
			IsNever<A>,
			IsNever<B>,
			{
				$then: never
				$else: IsDisjoint<A, B> extends true
					? A & B
					: [keyof A, keyof B] extends [infer KA extends KeyTypes, infer KB extends KeyTypes]
						? IsLiteral<KA> extends true
							? IsLiteral<KB> extends true
								? [OptionalKeys<A>, OptionalKeys<B>] extends [infer PKA extends KeyTypes, infer PKB extends KeyTypes]
									? // property is optional when both A[k] and B[k] are optional
										(IsNotNever<PKA & PKB, { selection: 'filter' }> extends infer R extends KeyTypes
											? { [k in R]?: A[k] | B[k] }
											: unknown) &
											// properties only in A excluding partials is A[k]
											(IsNotNever<Exclude<KA, PKA | KB>, { selection: 'filter' }> extends infer R extends KeyTypes
												? { [k in R]: A[k] }
												: unknown) &
											// properties only in B excluding partials is B[k]
											(IsNotNever<Exclude<KB, PKB>, { selection: 'filter' }> extends infer R extends KeyTypes
												? { [k in R]: B[k] }
												: unknown) &
											// properties is required in A but optional in B is unionized without undefined
											(IsNotNever<Exclude<KA & PKB, PKA>, { selection: 'filter' }> extends infer R extends KeyTypes
												? { [k in R]: A[k] | Exclude<B[k], undefined> }
												: unknown)
									: never
								: (IsNotNever<Exclude<KA, KA & KB>, { selection: 'filter' }> extends infer R extends KeyTypes
										? { [k in R]: A[k] }
										: unknown) &
										(IsNotNever<Exclude<KB, KA & KB>, { selection: 'filter' }> extends infer R extends KeyTypes
											? { [k in R]: B[k] }
											: unknown) &
										(IsNotNever<KA & KB, { selection: 'filter' }> extends infer R extends KeyTypes
											? { [k in R]: A[k] | B[k] }
											: unknown)
							: IsLiteral<KB> extends true
								? { [k in Exclude<KA, KB>]: A[k] } & { [k in keyof B]: B[k] }
								: (IsNotNever<Exclude<KA, KA & KB>, { selection: 'filter' }> extends infer R extends KeyTypes
										? { [k in R]: A[k] }
										: unknown) &
										(IsNotNever<Exclude<KB, KA & KB>, { selection: 'filter' }> extends infer R extends KeyTypes
											? { [k in R]: B[k] }
											: unknown) &
										(IsNotNever<KA & KB, { selection: 'filter' }> extends infer R extends KeyTypes
											? { [k in R]: A[k] | B[k] }
											: unknown)
						: never
			}
		>
	}
>

export namespace Merge {
	export type JoinProps<A, B> = A extends NonComposableTypes ? B : B extends NonComposableTypes ? A : A & B

	export type Options = {
		$never?: undefined
	}

	export interface DefaultOptions {
		$never: never
	}

	export type Cases = {
		$never: $Never
	}
}
