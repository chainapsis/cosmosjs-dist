"use strict";
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: true });
var ts_amino_1 = require("@chainapsis/ts-amino");
var Field = ts_amino_1.Amino.Field,
  DefineStruct = ts_amino_1.Amino.DefineStruct,
  DefineType = ts_amino_1.Amino.DefineType;
var tx_1 = require("../../core/tx");
var int_1 = require("../../common/int");
var buffer_1 = require("buffer/");
var RawMessage = /** @class */ (function() {
  function RawMessage(raw) {
    this.raw = raw;
  }
  RawMessage.prototype.marshalJSON = function() {
    return buffer_1.Buffer.from(this.raw).toString("utf8");
  };
  __decorate(
    [Field.Slice(0, { type: ts_amino_1.Type.Uint8 })],
    RawMessage.prototype,
    "raw",
    void 0
  );
  RawMessage = __decorate([DefineType()], RawMessage);
  return RawMessage;
})();
var MsgExecuteContract = /** @class */ (function(_super) {
  __extends(MsgExecuteContract, _super);
  function MsgExecuteContract(sender, contract, msg, sentFunds) {
    var _this = _super.call(this) || this;
    _this.sender = sender;
    _this.contract = contract;
    _this.msg = new RawMessage(
      buffer_1.Buffer.from(JSON.stringify(msg), "utf8")
    );
    _this.sentFunds = sentFunds;
    return _this;
  }
  MsgExecuteContract.prototype.getSigners = function() {
    return [this.sender];
  };
  MsgExecuteContract.prototype.validateBasic = function() {
    for (var _i = 0, _a = this.sentFunds; _i < _a.length; _i++) {
      var coin = _a[_i];
      if (coin.amount.lte(new int_1.Int(0))) {
        throw new Error("Send amount is invalid");
      }
    }
  };
  __decorate(
    [
      Field.Defined(0, {
        jsonName: "sender"
      })
    ],
    MsgExecuteContract.prototype,
    "sender",
    void 0
  );
  __decorate(
    [
      Field.Defined(1, {
        jsonName: "contract"
      })
    ],
    MsgExecuteContract.prototype,
    "contract",
    void 0
  );
  __decorate(
    [Field.Slice(2, { type: ts_amino_1.Type.Defined }, { jsonName: "msg" })],
    MsgExecuteContract.prototype,
    "msg",
    void 0
  );
  __decorate(
    [
      Field.Slice(
        3,
        { type: ts_amino_1.Type.Defined },
        {
          jsonName: "sent_funds"
        }
      )
    ],
    MsgExecuteContract.prototype,
    "sentFunds",
    void 0
  );
  MsgExecuteContract = __decorate([DefineStruct()], MsgExecuteContract);
  return MsgExecuteContract;
})(tx_1.Msg);
exports.MsgExecuteContract = MsgExecuteContract;
var MsgInstantiateContract = /** @class */ (function(_super) {
  __extends(MsgInstantiateContract, _super);
  function MsgInstantiateContract(
    sender,
    admin,
    codeId,
    label,
    initMsg,
    initFunds
  ) {
    var _this = _super.call(this) || this;
    _this.sender = sender;
    _this.admin = admin;
    _this.codeId = codeId;
    _this.label = label;
    _this.initMsg = new RawMessage(
      buffer_1.Buffer.from(JSON.stringify(initMsg), "utf8")
    );
    _this.initFunds = initFunds;
    return _this;
  }
  MsgInstantiateContract.prototype.getSigners = function() {
    return [this.sender];
  };
  MsgInstantiateContract.prototype.validateBasic = function() {
    for (var _i = 0, _a = this.initFunds; _i < _a.length; _i++) {
      var coin = _a[_i];
      if (coin.amount.lte(new int_1.Int(0))) {
        throw new Error("Send amount is invalid");
      }
    }
  };
  __decorate(
    [
      Field.Defined(0, {
        jsonName: "sender"
      })
    ],
    MsgInstantiateContract.prototype,
    "sender",
    void 0
  );
  __decorate(
    [
      Field.Defined(1, {
        jsonName: "admin",
        jsonOmitEmpty: true
      })
    ],
    MsgInstantiateContract.prototype,
    "admin",
    void 0
  );
  __decorate(
    [
      Field.Uint64(2, {
        jsonName: "code_id"
      })
    ],
    MsgInstantiateContract.prototype,
    "codeId",
    void 0
  );
  __decorate(
    [
      Field.String(3, {
        jsonName: "label"
      })
    ],
    MsgInstantiateContract.prototype,
    "label",
    void 0
  );
  __decorate(
    [
      Field.Slice(
        4,
        { type: ts_amino_1.Type.Defined },
        { jsonName: "init_msg" }
      )
    ],
    MsgInstantiateContract.prototype,
    "initMsg",
    void 0
  );
  __decorate(
    [
      Field.Slice(
        5,
        { type: ts_amino_1.Type.Defined },
        {
          jsonName: "init_funds"
        }
      )
    ],
    MsgInstantiateContract.prototype,
    "initFunds",
    void 0
  );
  MsgInstantiateContract = __decorate([DefineStruct()], MsgInstantiateContract);
  return MsgInstantiateContract;
})(tx_1.Msg);
exports.MsgInstantiateContract = MsgInstantiateContract;
//# sourceMappingURL=msgs.js.map
