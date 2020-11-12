"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = require("./address");
var crypto_1 = require("../crypto");
var big_integer_1 = __importDefault(require("big-integer"));
var coin_1 = require("./coin");
var int_1 = require("./int");
var buffer_1 = require("buffer/");
var vestingAccountTypes = [
  "auth/ContinuousVestingAccount",
  "auth/DelayedVestingAccount",
  "auth/PeriodicVestingAccount",
  "cosmos-sdk/ContinuousVestingAccount",
  "cosmos-sdk/DelayedVestingAccount",
  "cosmos-sdk/PeriodicVestingAccount"
];
function isVestingAccountType(type) {
  return vestingAccountTypes.indexOf(type) > -1;
}
var BaseAccount = /** @class */ (function() {
  function BaseAccount(address, pubKey, accountNumber, sequence, coins) {
    this.address = address;
    this.pubKey = pubKey;
    if (typeof accountNumber === "string") {
      this.accountNumber = big_integer_1.default(accountNumber);
    } else if (typeof accountNumber === "number") {
      this.accountNumber = big_integer_1.default(accountNumber);
    } else {
      this.accountNumber = big_integer_1.default(accountNumber);
    }
    if (typeof sequence === "string") {
      this.sequence = big_integer_1.default(sequence);
    } else if (typeof sequence === "number") {
      this.sequence = big_integer_1.default(sequence);
    } else {
      this.sequence = big_integer_1.default(sequence);
    }
    this.coins = coins;
  }
  BaseAccount.fromJSON = function(obj) {
    if (obj.height) {
      obj = obj.result;
    }
    var supportedAccountType = [
      "auth/Account",
      "cosmos-sdk/Account",
      "cosmos-sdk/BaseAccount"
    ].concat(vestingAccountTypes);
    if (supportedAccountType.indexOf(obj.type) < 0) {
      throw new Error("Unsupported account type: " + obj.type);
    }
    if (obj.value) {
      var toBaseAccount = function(value) {
        var address = address_1.AccAddress.fromBech32(value.address);
        var coins = [];
        if (value.coins) {
          for (var _i = 0, _a = value.coins; _i < _a.length; _i++) {
            var coin = _a[_i];
            coins.push(new coin_1.Coin(coin.denom, new int_1.Int(coin.amount)));
          }
        }
        var pubKey;
        if (value.public_key) {
          if (value.public_key.type === undefined) {
            pubKey = new crypto_1.PubKeySecp256k1(
              buffer_1.Buffer.from(value.public_key, "base64")
            );
          } else if (value.public_key.type !== "tendermint/PubKeySecp256k1") {
            throw new Error(
              "Unsupported public key type: " + value.public_key.type
            );
          } else {
            pubKey = new crypto_1.PubKeySecp256k1(
              buffer_1.Buffer.from(value.public_key.value, "base64")
            );
          }
        }
        var accountNumber = value.account_number;
        var sequence = value.sequence;
        return new BaseAccount(address, pubKey, accountNumber, sequence, coins);
      };
      if (isVestingAccountType(obj.type)) {
        // If account is vesting account, take out the base account from it with ignoring the vesting.
        var baseVestingAccountObj =
          obj.value.BaseVestingAccount || obj.value.baseVestingAccount;
        var baseAccountObj =
          baseVestingAccountObj.BaseAccount ||
          baseVestingAccountObj.baseAccount;
        return toBaseAccount(baseAccountObj);
      }
      return toBaseAccount(obj.value);
    } else {
      throw new Error("Invalid base account");
    }
  };
  BaseAccount.prototype.getAddress = function() {
    return this.address;
  };
  BaseAccount.prototype.getPubKey = function() {
    return this.pubKey;
  };
  BaseAccount.prototype.getAccountNumber = function() {
    return this.accountNumber;
  };
  BaseAccount.prototype.getSequence = function() {
    return this.sequence;
  };
  BaseAccount.prototype.getCoins = function() {
    return this.coins;
  };
  return BaseAccount;
})();
exports.BaseAccount = BaseAccount;
//# sourceMappingURL=baseAccount.js.map
