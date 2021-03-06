import bigInteger from "big-integer";
import { Int } from "./int";
export declare class Dec {
  static readonly precision: bigInteger.BigInteger;
  private static readonly precisionMultipliers;
  private static calcPrecisionMultiplier;
  private int;
  /**
   * Create a new Dec from integer with decimal place at prec
   * @param int - Parse a number | bigInteger | string into a Dec.
   * If int is string and contains dot(.), prec is ignored and automatically calculated.
   * @param prec - Precision
   */
  constructor(int: bigInteger.BigNumber | Int, prec?: number);
  isZero(): boolean;
  isNegative(): boolean;
  isPositive(): boolean;
  equals(d2: Dec): boolean;
  /**
   * Alias for the greater method.
   */
  gt(d2: Dec): boolean;
  /**
   * Alias for the greaterOrEquals method.
   */
  gte(d2: Dec): boolean;
  /**
   * Alias for the lesser method.
   */
  lt(d2: Dec): boolean;
  /**
   * Alias for the lesserOrEquals method.
   */
  lte(d2: Dec): boolean;
  /**
   * reverse the decimal sign.
   */
  neg(): Dec;
  /**
   * Returns the absolute value of a decimals.
   */
  abs(): Dec;
  add(d2: Dec): Dec;
  sub(d2: Dec): Dec;
  mul(d2: Dec): Dec;
  mulTruncate(d2: Dec): Dec;
  private mulRaw;
  quo(d2: Dec): Dec;
  quoTruncate(d2: Dec): Dec;
  quoRoundUp(d2: Dec): Dec;
  private quoRaw;
  isInteger(): boolean;
  /**
   * Remove a Precision amount of rightmost digits and perform bankers rounding
   * on the remainder (gaussian rounding) on the digits which have been removed.
   */
  private chopPrecisionAndRound;
  private chopPrecisionAndRoundUp;
  /**
   * Similar to chopPrecisionAndRound, but always rounds down
   */
  private chopPrecisionAndTruncate;
  toString(prec?: number): string;
  round(): Int;
  roundUp(): Int;
  truncate(): Int;
  marshalAmino(): string;
  marshalJSON(): string;
}
