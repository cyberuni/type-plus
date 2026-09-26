import * as _abs from './abs.js'
import * as _add from './add.js'
import * as _greaterThan from './greater-than.js'
import * as _greaterThanOrEqual from './greater-than-or-equal.js'
import * as _lessThan from './less-than.js'
import * as _lessThanOrEqual from './less-than-or-equal.js'
import * as _toNegative from './math-plus.to-negative.js'
import * as _max from './max.js'
import * as _min from './min.js'
import * as _multiply from './multiply.js'
import * as _subtract from './subtract.js'

/**
 * 🧰 *namespace*
 *
 * Every type-level arithmetic type under one name: `MathPlus.Abs`,
 * `MathPlus.Add`, `MathPlus.Decrement`, `MathPlus.GreaterThan`,
 * `MathPlus.GreaterThanOrEqual`, `MathPlus.Increment`, `MathPlus.LessThan`,
 * `MathPlus.LessThanOrEqual`, `MathPlus.Max`, `MathPlus.Min`,
 * `MathPlus.Multiply`, `MathPlus.Subtract` and `MathPlus.ToNegative`.
 *
 * `MathPlus.ToNegative<N>` is the one that only lives here. Every other member
 * is the same type as the top-level export of that name; the namespace only
 * groups them. Each member carries its own TSDoc.
 *
 * There is no `MathPlus.ToPositive`: turning a numeric literal positive is
 * `Abs`, which also fails on the widened `number` and `bigint`.
 *
 * @example
 * ```ts
 * type R = MathPlus.ToNegative<5> // -5
 * type R = MathPlus.ToNegative<-5> // -5
 * type R = MathPlus.Add<1, 2> // 3
 * type R = MathPlus.Max<1, 2> // 2
 * type R = MathPlus.Min<1, 2> // 1
 * type R = MathPlus.Abs<-5> // 5, the ToPositive counterpart of ToNegative
 * ```
 */
export declare namespace MathPlus {
	export import Abs = _abs.Abs
	export import Add = _add.Add
	export import Decrement = _subtract.Decrement
	export import GreaterThan = _greaterThan.GreaterThan
	export import GreaterThanOrEqual = _greaterThanOrEqual.GreaterThanOrEqual
	export import Increment = _add.Increment
	export import LessThan = _lessThan.LessThan
	export import LessThanOrEqual = _lessThanOrEqual.LessThanOrEqual
	export import Max = _max.Max
	export import Min = _min.Min
	export import Multiply = _multiply.Multiply
	export import Subtract = _subtract.Subtract
	export import ToNegative = _toNegative.ToNegative
}
