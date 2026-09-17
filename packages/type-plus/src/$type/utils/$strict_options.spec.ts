import { describe, it } from 'vitest'

import {
	type $ErrorMessage,
	type $ForwardOptions,
	type $Selection,
	type $StrictOptions,
	type $Then,
	type IsObject,
	testType,
} from '../../index.js'

describe('$ErrorMessage', () => {
	it('is the message followed by a zero-width space', () => {
		testType.equal<$ErrorMessage<'not a valid option'>, 'not a valid option​'>(true)
	})

	it('is not satisfied by the message text itself', () => {
		const ok: $ErrorMessage<'not a valid option'> = 'not a valid option​'
		// @ts-expect-error
		const text: $ErrorMessage<'not a valid option'> = 'not a valid option'
		testType.equal<typeof ok | typeof text, $ErrorMessage<'not a valid option'>>(true)
	})
})

describe('$StrictOptions', () => {
	type Strict<$O extends $StrictOptions<$O, IsObject.$Options> = {}> = $O

	it('accepts no options', () => {
		testType.equal<Strict, {}>(true)
	})

	it('accepts known options', () => {
		testType.equal<Strict<{ exact: true }>, { exact: true }>(true)
		testType.equal<Strict<{ distributive: false; selection: 'filter' }>, { distributive: false; selection: 'filter' }>(
			true,
		)
		testType.equal<Strict<IsObject.$Branch>, IsObject.$Branch>(true)
	})

	it('rejects an unknown key next to a known one', () => {
		// @ts-expect-error
		testType.never<Strict<{ distributive: false; exactt: true }>>(false)
		// @ts-expect-error
		testType.never<Strict<{ selection: 'filter'; $thn: 1 }>>(false)
	})

	it('rejects a non-object type without listing its members as unknown keys', () => {
		// @ts-expect-error
		testType.never<Strict<string>>(false)
		// @ts-expect-error
		testType.never<Strict<true>>(false)
		testType.equal<$StrictOptions<string, IsObject.$Options>, IsObject.$Options>(true)
	})

	it('rejects a key-only typo', () => {
		// @ts-expect-error
		testType.never<Strict<{ exactt: true }>>(false)
	})

	it('reports the key and a suggestion when a known key is a prefix match', () => {
		testType.equal<
			$StrictOptions._Message<'exactt', IsObject.$Options>,
			"'exactt' is not a valid option. Did you mean 'exact'?​"
		>(true)
		testType.equal<
			$StrictOptions._Message<'distrib', IsObject.$Options>,
			"'distrib' is not a valid option. Did you mean 'distributive'?​"
		>(true)
	})

	it('reports only the key when no known key is a prefix match', () => {
		testType.equal<$StrictOptions._Message<'$thn', IsObject.$Options>, "'$thn' is not a valid option​">(true)
	})

	it('does not name the checked type, so identical constraints compose', () => {
		type Wrapper<T, $O extends $StrictOptions<$O, IsObject.$Options> = {}> = IsObject<T, $O>
		testType.equal<Wrapper<{}, { exact: true }>, false>(true)
		// @ts-expect-error
		testType.never<Wrapper<{}, { exactt: true }>>(false)
	})
})

describe('generic wrappers', () => {
	it('cannot forward a `$O` constrained only by the options type', () => {
		// An object type is open: TypeScript cannot rule out extra keys in `$O`.
		// @ts-expect-error
		type Lax<T, $O extends IsObject.$Options = {}> = IsObject<T, $O>
		testType.never<Lax<{}>>(false)
	})

	it('can repeat the same strict constraint', () => {
		type Same<T, $O extends $StrictOptions<$O, IsObject.$Options> = {}> = IsObject<T, $O>

		testType.equal<Same<{}>, true>(true)
		testType.equal<Same<{} | 1, { distributive: false }>, false>(true)
		testType.equal<Same<object, IsObject.$Branch>, $Then>(true)
		// @ts-expect-error
		testType.never<Same<{}, { exactt: true }>>(false)
	})

	it('can narrow with a conditional when it has no options of its own', () => {
		type Narrow<T, $O extends $Selection.Options = {}> = $O extends $StrictOptions<$O, IsObject.$Options>
			? IsObject<T, $O>
			: never

		testType.equal<Narrow<{}>, true>(true)
		testType.equal<Narrow<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
	})
})

describe('$ForwardOptions', () => {
	interface IsNonEmptyObject$Options extends IsObject.$Options {
		nonEmpty?: boolean
	}

	type IsNonEmptyObject<T, $O extends $StrictOptions<$O, IsNonEmptyObject$Options> = {}> = $O['nonEmpty'] extends true
		? keyof T extends never
			? false
			: IsObject<T, $ForwardOptions<$O, IsObject.$Options>>
		: IsObject<T, $ForwardOptions<$O, IsObject.$Options>>

	it('keeps the options of the target type and drops the rest', () => {
		testType.equal<$ForwardOptions<{ nonEmpty: true; exact: true }, IsObject.$Options>, { exact: true }>(true)
		testType.equal<$ForwardOptions<{}, IsObject.$Options>, {}>(true)
	})

	it('drops the named keys even when the target type has them', () => {
		testType.equal<
			$ForwardOptions<{ selection: 'filter'; exact: true }, IsObject.$Options, 'selection'>,
			{ exact: true }
		>(true)
	})

	it('applies the wrapper option', () => {
		testType.equal<IsNonEmptyObject<{}>, true>(true)
		testType.equal<IsNonEmptyObject<{}, { nonEmpty: true }>, false>(true)
		testType.equal<IsNonEmptyObject<{ a: 1 }, { nonEmpty: true }>, true>(true)
	})

	it('forwards the options of the target type', () => {
		testType.equal<IsNonEmptyObject<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
		testType.equal<IsNonEmptyObject<{ a: 1 }, { nonEmpty: true; selection: 'filter' }>, { a: 1 }>(true)
		testType.equal<IsNonEmptyObject<{}, { exact: true }>, false>(true)
		testType.equal<IsNonEmptyObject<{} | 1, { distributive: false }>, false>(true)
		testType.equal<IsNonEmptyObject<object, IsObject.$Branch>, $Then>(true)
	})

	it('rejects a typo in the wrapper option', () => {
		// @ts-expect-error
		testType.never<IsNonEmptyObject<{}, { nonEmptyy: true }>>(false)
	})

	it('rejects a typo in a forwarded option', () => {
		// @ts-expect-error
		testType.never<IsNonEmptyObject<{}, { nonEmpty: true; exactt: true }>>(false)
	})

	it('is needed: narrowing without removing the wrapper option answers never', () => {
		type NoStrip<T, $O extends $StrictOptions<$O, IsNonEmptyObject$Options> = {}> = $O extends $StrictOptions<
			$O,
			IsObject.$Options
		>
			? IsObject<T, $O>
			: never

		testType.equal<NoStrip<{ a: 1 }>, true>(true)
		testType.equal<NoStrip<{ a: 1 }, { nonEmpty: true }>, never>(true)
		testType.equal<NoStrip<{ a: 1 }, { nonEmpty: true; selection: 'filter' }>, never>(true)
	})
})
