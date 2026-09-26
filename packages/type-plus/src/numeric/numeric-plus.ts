import * as _isInteger from './is-integer.js'
import * as _isIntegerLiteral from './is-integer-literal.js'
import * as _isNegative from './is-negative.js'
import * as _isNegativeLiteral from './is-negative-literal.js'
import * as _isNotInteger from './is-not-integer.js'
import * as _isNotIntegerLiteral from './is-not-integer-literal.js'
import * as _isNotNegative from './is-not-negative.js'
import * as _isNotNegativeLiteral from './is-not-negative-literal.js'
import * as _isNotNumeric from './is-not-numeric.js'
import * as _isNotPositive from './is-not-positive.js'
import * as _isNotPositiveLiteral from './is-not-positive-literal.js'
import * as _isNumeric from './is-numeric.js'
import * as _isPositive from './is-positive.js'
import * as _isPositiveLiteral from './is-positive-literal.js'
import * as _numericType from './numeric-type.js'

/**
 * 🧰 *namespace*
 *
 * The numeric checks under one name: `NumericPlus.IsNumeric`,
 * `NumericPlus.IsInteger`, `NumericPlus.IsNegative`, `NumericPlus.IsPositive`,
 * their `IsNot*` counterparts, and the `Numeric` / `Zero` building types.
 *
 * "Numeric" spans `number` and `bigint`, so these apply to both. Every member
 * is the same type as the top-level export of that name; the namespace only
 * groups them, and each member carries its own TSDoc.
 *
 * @example
 * ```ts
 * type R = NumericPlus.IsNumeric<1n> // true
 * type R = NumericPlus.IsPositive<-1> // false
 * ```
 */
export declare namespace NumericPlus {
	export import IsInteger = _isInteger.IsInteger
	export import IsIntegerLiteral = _isIntegerLiteral.IsIntegerLiteral
	export import IsNegative = _isNegative.IsNegative
	export import IsNegativeLiteral = _isNegativeLiteral.IsNegativeLiteral
	export import IsNotInteger = _isNotInteger.IsNotInteger
	export import IsNotIntegerLiteral = _isNotIntegerLiteral.IsNotIntegerLiteral
	export import IsNotNegative = _isNotNegative.IsNotNegative
	export import IsNotNegativeLiteral = _isNotNegativeLiteral.IsNotNegativeLiteral
	export import IsNotNumeric = _isNotNumeric.IsNotNumeric
	export import IsNotPositive = _isNotPositive.IsNotPositive
	export import IsNotPositiveLiteral = _isNotPositiveLiteral.IsNotPositiveLiteral
	export import IsNumeric = _isNumeric.IsNumeric
	export import IsPositive = _isPositive.IsPositive
	export import IsPositiveLiteral = _isPositiveLiteral.IsPositiveLiteral
	export import Numeric = _numericType.Numeric
	export import Zero = _numericType.Zero
}
