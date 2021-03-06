import { Rest } from "../core/rest";
import { Account } from "../core/account";
export declare class GaiaRest extends Rest {
  getAccount(
    account: string | Uint8Array,
    bech32PrefixAccAddr?: string
  ): Promise<Account>;
}
