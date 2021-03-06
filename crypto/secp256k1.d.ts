import { Address, PrivKey, PubKey } from "./types";
export declare class PrivKeySecp256k1 implements PrivKey {
  private privKey;
  constructor(privKey: Uint8Array);
  /**
   * @returns Return amino encoded bytes (including prefix bytes for concrete type).
   */
  toBytes(): Uint8Array;
  /**
   * @returns Return bytes without type info.
   */
  serialize(): Uint8Array;
  toPubKey(): PubKey;
  equals(privKey: PrivKey): boolean;
  sign(msg: Uint8Array): Uint8Array;
  toString(): string;
}
export declare class PubKeySecp256k1 implements PubKey {
  private pubKey;
  constructor(pubKey: Uint8Array);
  /**
   * @returns Return amino encoded bytes (including prefix bytes for concrete type).
   */
  toBytes(): Uint8Array;
  /**
   * @returns Return bytes without type info.
   */
  serialize(): Uint8Array;
  toAddress(): Address;
  equals(pubKey: PubKey): boolean;
  verify(msg: Uint8Array, sig: Uint8Array): boolean;
  toString(): string;
}
