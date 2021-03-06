"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
require("mocha");
var walletProvider_1 = require("./walletProvider");
var crypto_1 = __importDefault(require("crypto"));
var crypto_2 = require("../crypto");
var context_1 = require("./context");
var bip44_1 = require("./bip44");
var ts_amino_1 = require("@chainapsis/ts-amino");
var bech32Config_1 = require("./bech32Config");
describe("Test local wallet provider", function() {
  it("local wallet provider should generate correct priv key", function() {
    return __awaiter(_this, void 0, void 0, function() {
      var localWalletProvider, context, keys, key;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            localWalletProvider = new walletProvider_1.LocalWalletProvider(
              "cosmos",
              "anger river nuclear pig enlist fish demand dress library obtain concert nasty wolf episode ring bargain rely off vibrant iron cram witness extra enforce",
              0,
              0,
              function(array) {
                return crypto_1.default.randomBytes(array.length);
              }
            );
            context = new context_1.Context({
              chainId: "",
              txEncoder: undefined,
              txBuilder: undefined,
              bech32Config: bech32Config_1.defaultBech32Config("cosmos"),
              walletProvider: undefined,
              rpcInstance: undefined,
              restInstance: undefined,
              queryAccount: undefined,
              bip44: new bip44_1.BIP44(44, 118, 0),
              codec: new ts_amino_1.Codec()
            });
            return [4 /*yield*/, localWalletProvider.enable(context)];
          case 1:
            _a.sent();
            return [4 /*yield*/, localWalletProvider.getKeys(context)];
          case 2:
            keys = _a.sent();
            assert_1.default.strictEqual(keys.length, 1);
            key = keys[0];
            assert_1.default.strictEqual(key.algo, "secp256k1");
            assert_1.default.strictEqual(
              new crypto_2.PubKeySecp256k1(key.pubKey)
                .toAddress()
                .toBech32("cosmos"),
              "cosmos1t68n2ezn5zt8frh4jehmufkk2puakv9glapyz4"
            );
            assert_1.default.strictEqual(
              key.bech32Address,
              "cosmos1t68n2ezn5zt8frh4jehmufkk2puakv9glapyz4"
            );
            return [2 /*return*/];
        }
      });
    });
  });
});
//# sourceMappingURL=walletProvider.spec.js.map
