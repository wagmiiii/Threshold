import {
  EncryptionSecretKey
} from "./chunk-HYB3KTMB.js";
import {
  __commonJS,
  __toESM
} from "./chunk-UIK2IKUR.js";

// node_modules/@subsquid/scale-codec/lib/types.js
var require_types = __commonJS({
  "node_modules/@subsquid/scale-codec/lib/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeKind = void 0;
    var TypeKind;
    (function(TypeKind2) {
      TypeKind2[TypeKind2["Primitive"] = 0] = "Primitive";
      TypeKind2[TypeKind2["Compact"] = 1] = "Compact";
      TypeKind2[TypeKind2["Sequence"] = 2] = "Sequence";
      TypeKind2[TypeKind2["BitSequence"] = 3] = "BitSequence";
      TypeKind2[TypeKind2["Array"] = 4] = "Array";
      TypeKind2[TypeKind2["Tuple"] = 5] = "Tuple";
      TypeKind2[TypeKind2["Composite"] = 6] = "Composite";
      TypeKind2[TypeKind2["Variant"] = 7] = "Variant";
      TypeKind2[TypeKind2["Option"] = 8] = "Option";
      TypeKind2[TypeKind2["DoNotConstruct"] = 9] = "DoNotConstruct";
      TypeKind2[TypeKind2["BooleanOption"] = 10] = "BooleanOption";
      TypeKind2[TypeKind2["Bytes"] = 11] = "Bytes";
      TypeKind2[TypeKind2["BytesArray"] = 12] = "BytesArray";
      TypeKind2[TypeKind2["HexBytes"] = 13] = "HexBytes";
      TypeKind2[TypeKind2["HexBytesArray"] = 14] = "HexBytesArray";
      TypeKind2[TypeKind2["Struct"] = 15] = "Struct";
    })(TypeKind || (exports.TypeKind = TypeKind = {}));
  }
});

// browser-external:assert
var require_assert = __commonJS({
  "browser-external:assert"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "assert" has been externalized for browser compatibility. Cannot access "assert.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/@subsquid/util-internal-hex/lib/hex.js
var require_hex = __commonJS({
  "node_modules/@subsquid/util-internal-hex/lib/hex.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toHex = toHex2;
    exports.isHex = isHex2;
    exports.decodeHex = decodeHex;
    var assert_1 = __importDefault(require_assert());
    function toHex2(data, offset = 0, size = data.length - offset) {
      return `0x${Buffer.from(data.buffer, data.byteOffset + offset, size).toString("hex")}`;
    }
    function isHex2(value) {
      return typeof value == "string" && value.length % 2 == 0 && /^0x[a-f\d]*$/i.test(value);
    }
    function decodeHex(value) {
      (0, assert_1.default)(isHex2(value));
      return Buffer.from(value.slice(2), "hex");
    }
  }
});

// node_modules/@subsquid/scale-codec/lib/util.js
var require_util = __commonJS({
  "node_modules/@subsquid/scale-codec/lib/util.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isObject = exports.unsignedIntByteLength = exports.UTF8_ENCODER = exports.UTF8_DECODER = exports.toUnsignedBigInt = exports.toSignedBigInt = exports.checkUnsignedBigInt = exports.checkUnsignedInt = exports.checkSignedBigInt = exports.checkSignedInt = exports.throwUnexpectedCase = exports.assertNotNull = void 0;
    var assert_1 = __importDefault(require_assert());
    function assertNotNull(val, msg) {
      (0, assert_1.default)(val != null, msg);
      return val;
    }
    exports.assertNotNull = assertNotNull;
    function throwUnexpectedCase(val) {
      throw new Error(val ? `Unexpected case: ${val}` : `Unexpected case`);
    }
    exports.throwUnexpectedCase = throwUnexpectedCase;
    function checkInt(val, sign, bitSize, min, max) {
      let ok = Number.isInteger(val) && min <= val && max >= val;
      if (!ok)
        throw new Error(`Invalid ${sign}${bitSize}: ${val}`);
    }
    function checkBigInt(val, sign, bitSize, min, max) {
      let ok = typeof val == "bigint" && min <= val && max >= val;
      if (!ok)
        throw new Error(`Invalid ${sign}${bitSize}: ${val}`);
    }
    function checkSignedInt(val, bitSize) {
      let min;
      let max;
      switch (bitSize) {
        case 8:
          min = -128;
          max = 127;
          break;
        case 16:
          min = -32768;
          max = 32767;
          break;
        case 32:
          min = -2147483648;
          max = 2147483647;
          break;
        default:
          throwUnexpectedCase(bitSize);
      }
      checkInt(val, "I", bitSize, min, max);
    }
    exports.checkSignedInt = checkSignedInt;
    function checkSignedBigInt(val, bitSize) {
      let min;
      let max;
      switch (bitSize) {
        case 64:
          min = -(2n ** 63n);
          max = 2n ** 63n - 1n;
          break;
        case 128:
          min = -(2n ** 127n);
          max = 2n ** 127n - 1n;
          break;
        case 256:
          min = -(2n ** 255n);
          max = 2n ** 255n - 1n;
          break;
        default:
          throwUnexpectedCase(bitSize);
      }
      checkBigInt(val, "I", bitSize, min, max);
    }
    exports.checkSignedBigInt = checkSignedBigInt;
    function checkUnsignedInt(val, bitSize) {
      let max;
      switch (bitSize) {
        case 8:
          max = 255;
          break;
        case 16:
          max = 65535;
          break;
        case 32:
          max = 4294967295;
          break;
        default:
          throwUnexpectedCase(bitSize);
      }
      checkInt(val, "U", bitSize, 0, max);
    }
    exports.checkUnsignedInt = checkUnsignedInt;
    function checkUnsignedBigInt(val, bitSize) {
      let max;
      switch (bitSize) {
        case 64:
          max = 0xffffffffffffffffn;
          break;
        case 128:
          max = 2n ** 128n - 1n;
          break;
        case 256:
          max = 2n ** 256n - 1n;
          break;
        default:
          throwUnexpectedCase(bitSize);
      }
      checkBigInt(val, "U", bitSize, 0n, max);
    }
    exports.checkUnsignedBigInt = checkUnsignedBigInt;
    function toSignedBigInt(val, bitSize) {
      (0, assert_1.default)(typeof val == "string" || typeof val == "number");
      val = BigInt(val);
      checkSignedBigInt(val, bitSize);
      return val;
    }
    exports.toSignedBigInt = toSignedBigInt;
    function toUnsignedBigInt(val, bitSize) {
      (0, assert_1.default)(typeof val == "string" || typeof val == "number");
      val = BigInt(val);
      checkUnsignedBigInt(val, bitSize);
      return val;
    }
    exports.toUnsignedBigInt = toUnsignedBigInt;
    exports.UTF8_DECODER = new TextDecoder("utf-8", {
      fatal: true,
      ignoreBOM: false
    });
    exports.UTF8_ENCODER = new TextEncoder();
    function unsignedIntByteLength(val) {
      let len = 0;
      while (val > 0n) {
        val = val >> 8n;
        len += 1;
      }
      return len;
    }
    exports.unsignedIntByteLength = unsignedIntByteLength;
    function isObject(value) {
      return value != null && typeof value == "object";
    }
    exports.isObject = isObject;
  }
});

// node_modules/@subsquid/scale-codec/lib/src.js
var require_src = __commonJS({
  "node_modules/@subsquid/scale-codec/lib/src.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Src = void 0;
    var util_internal_hex_1 = require_hex();
    var assert_1 = __importDefault(require_assert());
    var util_1 = require_util();
    var Src2 = class {
      constructor(buf) {
        this.idx = 0;
        if (typeof buf == "string") {
          this.buf = (0, util_internal_hex_1.decodeHex)(buf);
        } else {
          this.buf = buf;
        }
      }
      byte() {
        let b = this.buf[this.idx];
        if (b === void 0) {
          throw eof();
        }
        this.idx += 1;
        return b;
      }
      i8() {
        let b = this.byte();
        return b | (b & 2 ** 7) * 33554430;
      }
      u8() {
        return this.byte();
      }
      i16() {
        let val = this.u16();
        return val | (val & 2 ** 15) * 131070;
      }
      u16() {
        let first = this.byte();
        let last = this.byte();
        return first + last * 2 ** 8;
      }
      i32() {
        return this.byte() + this.byte() * 2 ** 8 + this.byte() * 2 ** 16 + (this.byte() << 24);
      }
      u32() {
        return this.byte() + this.byte() * 2 ** 8 + this.byte() * 2 ** 16 + this.byte() * 2 ** 24;
      }
      i64() {
        let lo = this.u32();
        let hi = this.i32();
        return BigInt(lo) + (BigInt(hi) << 32n);
      }
      u64() {
        let lo = this.u32();
        let hi = this.u32();
        return BigInt(lo) + (BigInt(hi) << 32n);
      }
      i128() {
        let lo = this.u64();
        let hi = this.i64();
        return lo + (hi << 64n);
      }
      u128() {
        let lo = this.u64();
        let hi = this.u64();
        return lo + (hi << 64n);
      }
      i256() {
        let lo = this.u128();
        let hi = this.i128();
        return lo + (hi << 128n);
      }
      u256() {
        let lo = this.u128();
        let hi = this.u128();
        return lo + (hi << 128n);
      }
      compact() {
        let b = this.byte();
        let mode = b & 3;
        switch (mode) {
          case 0:
            return b >> 2;
          case 1:
            return (b >> 2) + this.byte() * 2 ** 6;
          case 2:
            return (b >> 2) + this.byte() * 2 ** 6 + this.byte() * 2 ** 14 + this.byte() * 2 ** 22;
          case 3:
            return this.bigCompact(b >> 2);
          default:
            throw new Error("Reached unreachable statement");
        }
      }
      bigCompact(len) {
        let i = this.u32();
        switch (len) {
          case 0:
            return i;
          case 1:
            return i + this.byte() * 2 ** 32;
          case 2:
            return i + this.byte() * 2 ** 32 + this.byte() * 2 ** 40;
        }
        let n = BigInt(i);
        let base = 32n;
        while (len--) {
          n += BigInt(this.byte()) << base;
          base += 8n;
        }
        return n;
      }
      compactLength() {
        let len = this.compact();
        (0, assert_1.default)(typeof len == "number");
        return len;
      }
      str() {
        let len = this.compactLength();
        let buf = this.bytes(len);
        return util_1.UTF8_DECODER.decode(buf);
      }
      bytes(len) {
        let beg = this.idx;
        let end = this.idx += len;
        if (this.buf.length < end) {
          throw eof();
        }
        return this.buf.subarray(beg, end);
      }
      skip(len) {
        this.idx += len;
      }
      bool() {
        return !!this.byte();
      }
      hasBytes() {
        return this.buf.length > this.idx;
      }
      assertEOF() {
        if (this.hasBytes()) {
          throw new Error("Unprocessed data left");
        }
      }
    };
    exports.Src = Src2;
    function eof() {
      return new Error("Unexpected EOF");
    }
  }
});

// node_modules/@subsquid/scale-codec/lib/sink.js
var require_sink = __commonJS({
  "node_modules/@subsquid/scale-codec/lib/sink.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ByteSink = exports.HexSink = exports.Sink = void 0;
    var assert_1 = __importDefault(require_assert());
    var util_1 = require_util();
    var Sink = class {
      uncheckedU16(val) {
        this.write(val & 255);
        this.write(val >>> 8);
      }
      uncheckedU32(val) {
        this.write(val & 255);
        this.write(val >>> 8 & 255);
        this.write(val >>> 16 & 255);
        this.write(val >>> 24);
      }
      uncheckedU64(val) {
        this.uncheckedU32(Number(val & 0xffffffffn));
        this.uncheckedU32(Number(val >> 32n));
      }
      uncheckedU128(val) {
        this.uncheckedU64(val & 0xffffffffffffffffn);
        this.uncheckedU64(val >> 64n);
      }
      uncheckedU256(val) {
        this.uncheckedU128(val & 2n ** 128n - 1n);
        this.uncheckedU128(val >> 128n);
      }
      u8(val) {
        (0, util_1.checkUnsignedInt)(val, 8);
        this.write(val);
      }
      u16(val) {
        (0, util_1.checkUnsignedInt)(val, 16);
        this.uncheckedU16(val);
      }
      u32(val) {
        (0, util_1.checkUnsignedInt)(val, 32);
        this.uncheckedU32(val);
      }
      u64(val) {
        (0, util_1.checkUnsignedBigInt)(val, 64);
        this.uncheckedU64(val);
      }
      u128(val) {
        (0, util_1.checkUnsignedBigInt)(val, 128);
        this.uncheckedU128(val);
      }
      u256(val) {
        (0, util_1.checkUnsignedBigInt)(val, 256);
        this.uncheckedU256(val);
      }
      i8(val) {
        (0, util_1.checkSignedInt)(val, 8);
        this.write((val + 256) % 256);
      }
      i16(val) {
        (0, util_1.checkSignedInt)(val, 16);
        let base = 2 ** 16;
        val = (val + base) % base;
        this.uncheckedU16(val);
      }
      i32(val) {
        (0, util_1.checkSignedInt)(val, 32);
        let base = 2 ** 32;
        val = (val + base) % base;
        this.uncheckedU32(val);
      }
      i64(val) {
        (0, util_1.checkSignedBigInt)(val, 64);
        let base = 2n ** 64n;
        val = (val + base) % base;
        this.uncheckedU64(val);
      }
      i128(val) {
        (0, util_1.checkSignedBigInt)(val, 128);
        let base = 2n ** 128n;
        val = (val + base) % base;
        this.uncheckedU128(val);
      }
      i256(val) {
        (0, util_1.checkSignedBigInt)(val, 256);
        let base = 2n ** 256n;
        val = (val + base) % base;
        this.uncheckedU256(val);
      }
      str(val) {
        (0, assert_1.default)(typeof val == "string");
        let bytes = util_1.UTF8_ENCODER.encode(val);
        this.compact(bytes.length);
        this.bytes(bytes);
      }
      bool(val) {
        (0, assert_1.default)(typeof val == "boolean");
        this.write(Number(val));
      }
      compact(val) {
        (0, assert_1.default)((typeof val == "number" || typeof val == "bigint") && val >= 0, "invalid compact");
        if (val < 64) {
          this.write(Number(val) * 4);
        } else if (val < 2 ** 14) {
          val = Number(val);
          this.write((val & 63) * 4 + 1);
          this.write(val >>> 6);
        } else if (val < 2 ** 30) {
          val = Number(val);
          this.write((val & 63) * 4 + 2);
          this.write(val >>> 6 & 255);
          this.uncheckedU16(val >>> 14);
        } else if (val < 2n ** 536n) {
          val = BigInt(val);
          this.write((0, util_1.unsignedIntByteLength)(val) * 4 - 13);
          while (val > 0) {
            this.write(Number(val & 0xffn));
            val = val >> 8n;
          }
        } else {
          throw new Error(`${val.toString(16)} is too large for a compact`);
        }
      }
    };
    exports.Sink = Sink;
    var HexSink = class extends Sink {
      constructor() {
        super(...arguments);
        this.out = "0x";
      }
      write(byte) {
        this.out += (byte >>> 4).toString(16);
        this.out += (byte & 15).toString(16);
      }
      bytes(b) {
        if (Buffer.isBuffer(b)) {
          this.out += b.toString("hex");
        } else {
          this.out += Buffer.from(b.buffer, b.byteOffset, b.byteLength).toString("hex");
        }
      }
      toHex() {
        return this.out;
      }
    };
    exports.HexSink = HexSink;
    var ByteSink2 = class extends Sink {
      constructor() {
        super(...arguments);
        this.buf = Buffer.allocUnsafe(128);
        this.pos = 0;
      }
      alloc(size) {
        if (this.buf.length - this.pos < size) {
          let buf = Buffer.allocUnsafe(Math.max(size, this.buf.length) * 2);
          buf.set(this.buf);
          this.buf = buf;
        }
      }
      write(byte) {
        this.alloc(1);
        this.buf[this.pos] = byte;
        this.pos += 1;
      }
      bytes(b) {
        this.alloc(b.length);
        this.buf.set(b, this.pos);
        this.pos += b.length;
      }
      toBytes() {
        return this.buf.subarray(0, this.pos);
      }
    };
    exports.ByteSink = ByteSink2;
  }
});

// node_modules/@subsquid/scale-codec/lib/types-codec.js
var require_types_codec = __commonJS({
  "node_modules/@subsquid/scale-codec/lib/types-codec.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toCodecTypes = exports.getCodecType = void 0;
    var assert_1 = __importDefault(require_assert());
    var types_1 = require_types();
    var util_1 = require_util();
    function getCodecType(types, ti) {
      let def = types[ti];
      switch (def.kind) {
        case types_1.TypeKind.Compact: {
          let compact = types[def.type];
          (0, assert_1.default)(compact.kind == types_1.TypeKind.Primitive);
          (0, assert_1.default)(compact.primitive[0] == "U");
          return { kind: types_1.TypeKind.Compact, integer: compact.primitive };
        }
        case types_1.TypeKind.Composite:
          if (def.fields.length == 0 || def.fields[0].name == null) {
            return {
              kind: types_1.TypeKind.Tuple,
              tuple: def.fields.map((f) => {
                (0, assert_1.default)(f.name == null);
                return f.type;
              })
            };
          } else {
            return {
              kind: types_1.TypeKind.Struct,
              fields: def.fields.map((f) => {
                let name = (0, util_1.assertNotNull)(f.name);
                return { name, type: f.type };
              })
            };
          }
        case types_1.TypeKind.Variant: {
          let variants = def.variants.filter((v) => v != null);
          let variantsByName = {};
          let uniqueIndexes = new Set(variants.map((v) => v.index));
          if (uniqueIndexes.size != variants.length) {
            throw new Error(`Variant type ${ti} has duplicate case indexes`);
          }
          let len = variants.reduce((len2, v) => Math.max(len2, v.index), 0) + 1;
          let placedVariants = new Array(len);
          variants.forEach((v) => {
            let cv;
            if (v.fields[0]?.name == null) {
              switch (v.fields.length) {
                case 0:
                  cv = { kind: "empty", name: v.name, index: v.index };
                  break;
                case 1:
                  cv = { kind: "value", name: v.name, index: v.index, type: v.fields[0].type };
                  break;
                default:
                  cv = {
                    kind: "tuple",
                    name: v.name,
                    index: v.index,
                    def: {
                      kind: types_1.TypeKind.Tuple,
                      tuple: v.fields.map((f) => {
                        (0, assert_1.default)(f.name == null);
                        return f.type;
                      })
                    }
                  };
              }
            } else {
              cv = {
                kind: "struct",
                name: v.name,
                index: v.index,
                def: {
                  kind: types_1.TypeKind.Struct,
                  fields: v.fields.map((f) => {
                    let name = (0, util_1.assertNotNull)(f.name);
                    return { name, type: f.type };
                  })
                }
              };
            }
            placedVariants[v.index] = cv;
            variantsByName[cv.name] = cv;
          });
          return {
            kind: types_1.TypeKind.Variant,
            variants: placedVariants,
            variantsByName
          };
        }
        default:
          return def;
      }
    }
    exports.getCodecType = getCodecType;
    function toCodecTypes(types) {
      let codecTypes = new Array(types.length);
      for (let i = 0; i < types.length; i++) {
        codecTypes[i] = getCodecType(types, i);
      }
      return codecTypes;
    }
    exports.toCodecTypes = toCodecTypes;
  }
});

// node_modules/@subsquid/scale-codec/lib/codec.js
var require_codec = __commonJS({
  "node_modules/@subsquid/scale-codec/lib/codec.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Codec = void 0;
    var util_internal_hex_1 = require_hex();
    var assert_1 = __importDefault(require_assert());
    var sink_1 = require_sink();
    var src_1 = require_src();
    var types_1 = require_types();
    var types_codec_1 = require_types_codec();
    var util_1 = require_util();
    var Codec = class {
      constructor(types) {
        this.types = (0, types_codec_1.toCodecTypes)(types);
      }
      decodeBinary(type, data) {
        let src = new src_1.Src(data);
        let val = this.decode(type, src);
        src.assertEOF();
        return val;
      }
      encodeToHex(type, val) {
        let sink = new sink_1.HexSink();
        this.encode(type, val, sink);
        return sink.toHex();
      }
      encodeToBinary(type, val) {
        let sink = new sink_1.ByteSink();
        this.encode(type, val, sink);
        return sink.toBytes();
      }
      decode(type, src) {
        let def = this.types[type];
        switch (def.kind) {
          case types_1.TypeKind.Primitive:
            return decodePrimitive(def.primitive, src);
          case types_1.TypeKind.Compact:
            return decodeCompact(def, src);
          case types_1.TypeKind.BitSequence:
            return decodeBitSequence(src);
          case types_1.TypeKind.Array:
            return this.decodeArray(def, src);
          case types_1.TypeKind.Sequence:
            return this.decodeSequence(def, src);
          case types_1.TypeKind.Tuple:
            return this.decodeTuple(def, src);
          case types_1.TypeKind.Struct:
            return this.decodeStruct(def, src);
          case types_1.TypeKind.Variant:
            return this.decodeVariant(def, src);
          case types_1.TypeKind.Option:
            return this.decodeOption(def, src);
          case types_1.TypeKind.BooleanOption:
            return decodeBooleanOption(src);
          case types_1.TypeKind.Bytes:
            return decodeBytes(src);
          case types_1.TypeKind.BytesArray:
            return src.bytes(def.len);
          case types_1.TypeKind.HexBytes:
            return (0, util_internal_hex_1.toHex)(decodeBytes(src));
          case types_1.TypeKind.HexBytesArray:
            return (0, util_internal_hex_1.toHex)(src.bytes(def.len));
          case types_1.TypeKind.DoNotConstruct:
            (0, util_1.throwUnexpectedCase)("DoNotConstruct type reached");
          default:
            (0, util_1.throwUnexpectedCase)(def.kind);
        }
      }
      decodeArray(def, src) {
        let { len, type } = def;
        let result = new Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = this.decode(type, src);
        }
        return result;
      }
      decodeSequence(def, src) {
        let len = src.compactLength();
        let result = new Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = this.decode(def.type, src);
        }
        return result;
      }
      decodeTuple(def, src) {
        if (def.tuple.length == 0)
          return null;
        let result = new Array(def.tuple.length);
        for (let i = 0; i < def.tuple.length; i++) {
          result[i] = this.decode(def.tuple[i], src);
        }
        return result;
      }
      decodeStruct(def, src) {
        let result = {};
        for (let i = 0; i < def.fields.length; i++) {
          let f = def.fields[i];
          result[f.name] = this.decode(f.type, src);
        }
        return result;
      }
      decodeVariant(def, src) {
        let idx = src.u8();
        let variant = def.variants[idx];
        if (variant == null)
          (0, util_1.throwUnexpectedCase)(`unknown variant index: ${idx}`);
        switch (variant.kind) {
          case "empty":
            return {
              __kind: variant.name
            };
          case "tuple":
            return {
              __kind: variant.name,
              value: this.decodeTuple(variant.def, src)
            };
          case "value":
            return {
              __kind: variant.name,
              value: this.decode(variant.type, src)
            };
          case "struct": {
            let value = this.decodeStruct(variant.def, src);
            value.__kind = variant.name;
            return value;
          }
          default:
            (0, util_1.throwUnexpectedCase)();
        }
      }
      decodeOption(def, src) {
        let byte = src.u8();
        switch (byte) {
          case 0:
            return void 0;
          case 1:
            return this.decode(def.type, src);
          default:
            (0, util_1.throwUnexpectedCase)(byte.toString());
        }
      }
      encode(type, val, sink) {
        let def = this.types[type];
        switch (def.kind) {
          case types_1.TypeKind.Primitive:
            encodePrimitive(def.primitive, val, sink);
            break;
          case types_1.TypeKind.Compact:
            sink.compact(val);
            break;
          case types_1.TypeKind.BitSequence:
            encodeBitSequence(val, sink);
            break;
          case types_1.TypeKind.Array:
            this.encodeArray(def, val, sink);
            break;
          case types_1.TypeKind.Sequence:
            this.encodeSequence(def, val, sink);
            break;
          case types_1.TypeKind.Tuple:
            this.encodeTuple(def, val, sink);
            break;
          case types_1.TypeKind.Struct:
            this.encodeStruct(def, val, sink);
            break;
          case types_1.TypeKind.Variant:
            this.encodeVariant(def, val, sink);
            break;
          case types_1.TypeKind.BytesArray:
            encodeBytesArray(def, val, sink);
            break;
          case types_1.TypeKind.HexBytesArray:
            encodeBytesArray(def, (0, util_internal_hex_1.decodeHex)(val), sink);
            break;
          case types_1.TypeKind.Bytes:
            encodeBytes(val, sink);
            break;
          case types_1.TypeKind.HexBytes:
            encodeBytes((0, util_internal_hex_1.decodeHex)(val), sink);
            break;
          case types_1.TypeKind.BooleanOption:
            encodeBooleanOption(val, sink);
            break;
          case types_1.TypeKind.Option:
            this.encodeOption(def, val, sink);
            break;
          default:
            (0, util_1.throwUnexpectedCase)(def.kind);
        }
      }
      encodeArray(def, val, sink) {
        (0, assert_1.default)(Array.isArray(val) && val.length == def.len);
        for (let i = 0; i < val.length; i++) {
          this.encode(def.type, val[i], sink);
        }
      }
      encodeSequence(def, val, sink) {
        (0, assert_1.default)(Array.isArray(val));
        sink.compact(val.length);
        for (let i = 0; i < val.length; i++) {
          this.encode(def.type, val[i], sink);
        }
      }
      encodeTuple(def, val, sink) {
        if (def.tuple.length == 0) {
          (0, assert_1.default)(val == null);
          return;
        }
        (0, assert_1.default)(Array.isArray(val) && def.tuple.length == val.length);
        for (let i = 0; i < val.length; i++) {
          this.encode(def.tuple[i], val[i], sink);
        }
      }
      encodeStruct(def, val, sink) {
        for (let i = 0; i < def.fields.length; i++) {
          let f = def.fields[i];
          this.encode(f.type, val[f.name], sink);
        }
      }
      encodeVariant(def, val, sink) {
        (0, assert_1.default)(typeof val?.__kind == "string", "not a variant type value");
        let variant = def.variantsByName[val.__kind];
        if (variant == null)
          throw new Error(`Unknown variant: ${val.__kind}`);
        sink.u8(variant.index);
        switch (variant.kind) {
          case "empty":
            break;
          case "value":
            this.encode(variant.type, val.value, sink);
            break;
          case "tuple":
            this.encodeTuple(variant.def, val.value, sink);
            break;
          case "struct":
            this.encodeStruct(variant.def, val, sink);
            break;
          default:
            (0, util_1.throwUnexpectedCase)();
        }
      }
      encodeOption(def, val, sink) {
        if (val === void 0) {
          sink.u8(0);
        } else {
          sink.u8(1);
          this.encode(def.type, val, sink);
        }
      }
    };
    exports.Codec = Codec;
    function decodeBytes(src) {
      let len = src.compactLength();
      return src.bytes(len);
    }
    function encodeBytes(val, sink) {
      (0, assert_1.default)(val instanceof Uint8Array);
      sink.compact(val.length);
      sink.bytes(val);
    }
    function encodeBytesArray(def, val, sink) {
      (0, assert_1.default)(val instanceof Uint8Array && val.length == def.len);
      sink.bytes(val);
    }
    function decodeBitSequence(src) {
      let bitLength = src.compactLength();
      let byteLength = Math.ceil(bitLength / 8);
      let bytes = src.bytes(byteLength);
      return {
        bytes,
        bitLength
      };
    }
    function encodeBitSequence(val, sink) {
      (0, assert_1.default)(val && typeof val == "object" && Number.isInteger(val.bitLength) && val.bytes instanceof Uint8Array);
      let bits = val;
      (0, assert_1.default)(Math.ceil(bits.bitLength / 8) == bits.bytes.length);
      sink.compact(bits.bitLength);
      sink.bytes(bits.bytes);
    }
    function decodeBooleanOption(src) {
      let byte = src.u8();
      switch (byte) {
        case 0:
          return null;
        case 1:
          return true;
        case 2:
          return false;
        default:
          (0, util_1.throwUnexpectedCase)(byte.toString());
      }
    }
    function encodeBooleanOption(val, sink) {
      if (val == null) {
        sink.u8(0);
      } else {
        (0, assert_1.default)(typeof val == "boolean");
        sink.u8(val ? 1 : 2);
      }
    }
    function decodeCompact(type, src) {
      let n = src.compact();
      switch (type.integer) {
        case "U8":
        case "U16":
        case "U32":
          return n;
        default:
          return BigInt(n);
      }
    }
    function decodePrimitive(type, src) {
      switch (type) {
        case "I8":
          return src.i8();
        case "U8":
          return src.u8();
        case "I16":
          return src.i16();
        case "U16":
          return src.u16();
        case "I32":
          return src.i32();
        case "U32":
          return src.u32();
        case "I64":
          return src.i64();
        case "U64":
          return src.u64();
        case "I128":
          return src.i128();
        case "U128":
          return src.u128();
        case "I256":
          return src.i256();
        case "U256":
          return src.u256();
        case "Bool":
          return src.bool();
        case "Str":
          return src.str();
        default:
          (0, util_1.throwUnexpectedCase)(type);
      }
    }
    function encodePrimitive(type, val, sink) {
      switch (type) {
        case "I8":
          sink.i8(val);
          break;
        case "U8":
          sink.u8(val);
          break;
        case "I16":
          sink.i16(val);
          break;
        case "U16":
          sink.u16(val);
          break;
        case "I32":
          sink.i32(val);
          break;
        case "U32":
          sink.u32(val);
          break;
        case "I64":
          sink.i64(val);
          break;
        case "U64":
          sink.u64(val);
          break;
        case "I128":
          sink.i128(val);
          break;
        case "U128":
          sink.u128(val);
          break;
        case "I256":
          sink.i256(val);
          break;
        case "U256":
          sink.u256(val);
          break;
        case "Bool":
          sink.bool(val);
          break;
        case "Str":
          sink.str(val);
          break;
        default:
          (0, util_1.throwUnexpectedCase)(type);
      }
    }
  }
});

// node_modules/@subsquid/util-internal-json/lib/json.js
var require_json = __commonJS({
  "node_modules/@subsquid/util-internal-json/lib/json.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toJSON = toJSON;
    var util_internal_hex_1 = require_hex();
    function toJSON(val) {
      let json;
      switch (typeof val) {
        case "bigint":
          return val.toString();
        case "object":
          if (val == null)
            return null;
          if (val instanceof Uint8Array) {
            return (0, util_internal_hex_1.toHex)(val);
          } else if (val instanceof Date) {
            return val.toISOString();
          } else if (typeof val.toJSON == "function" && (json = val.toJSON()) !== val) {
            return toJSON(json);
          } else if (val instanceof Error) {
            json = {};
            if (val.stack) {
              json.stack = val.stack;
            } else {
              json.stack = val.toString();
            }
            if (val.cause != null) {
              json.cause = toJSON(val.cause);
            }
            json = toJsonObject(val, json);
            return json;
          } else if (val instanceof Map) {
            let entries = [];
            for (let [k, v] of val.entries()) {
              entries.push({ k, v });
            }
            return toJSON({ map: entries });
          } else if (val instanceof Set) {
            return toJSON({ set: [...val] });
          } else if (Array.isArray(val)) {
            return toJsonArray(val);
          } else {
            return toJsonObject(val);
          }
        default:
          return val;
      }
    }
    function toJsonArray(val) {
      let arr = new Array(val.length);
      for (let i = 0; i < val.length; i++) {
        arr[i] = toJSON(val[i]);
      }
      return arr;
    }
    function toJsonObject(val, result) {
      result = result || {};
      for (let key in val) {
        result[key] = toJSON(val[key]);
      }
      return result;
    }
  }
});

// node_modules/@subsquid/scale-codec/lib/codec-json.js
var require_codec_json = __commonJS({
  "node_modules/@subsquid/scale-codec/lib/codec-json.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeBinaryArray = exports.JsonCodec = void 0;
    var util_internal_hex_1 = require_hex();
    var util_internal_json_1 = require_json();
    var assert_1 = __importDefault(require_assert());
    var types_1 = require_types();
    var types_codec_1 = require_types_codec();
    var util_1 = require_util();
    var JsonCodec = class {
      static encode(val) {
        return (0, util_internal_json_1.toJSON)(val);
      }
      constructor(types) {
        this.types = (0, types_codec_1.toCodecTypes)(types);
      }
      decode(type, val) {
        let def = this.types[type];
        switch (def.kind) {
          case types_1.TypeKind.Primitive:
            return decodePrimitive(def.primitive, val);
          case types_1.TypeKind.Compact:
            return decodePrimitive(def.integer, val);
          case types_1.TypeKind.BitSequence:
            return (0, util_internal_hex_1.decodeHex)(val);
          case types_1.TypeKind.Array:
            return this.decodeArray(def, val);
          case types_1.TypeKind.Sequence:
            return this.decodeSequence(def, val);
          case types_1.TypeKind.Tuple:
            return this.decodeTuple(def, val);
          case types_1.TypeKind.Struct:
            return this.decodeStruct(def, val);
          case types_1.TypeKind.Variant:
            return this.decodeVariant(def, val);
          case types_1.TypeKind.Option:
            return this.decodeOption(def, val);
          case types_1.TypeKind.BooleanOption:
            return decodeBooleanOption(val);
          case types_1.TypeKind.Bytes:
            return (0, util_internal_hex_1.decodeHex)(val);
          case types_1.TypeKind.BytesArray:
            return decodeBinaryArray(def.len, val);
          case types_1.TypeKind.HexBytes:
          case types_1.TypeKind.HexBytesArray:
            (0, assert_1.default)((0, util_internal_hex_1.isHex)(val));
            return val;
          case types_1.TypeKind.DoNotConstruct:
            (0, util_1.throwUnexpectedCase)("DoNotConstruct type reached");
          default:
            (0, util_1.throwUnexpectedCase)();
        }
      }
      decodeArray(def, val) {
        let { len, type } = def;
        (0, assert_1.default)(Array.isArray(val));
        (0, assert_1.default)(val.length == len);
        let result = new Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = this.decode(type, val[i]);
        }
        return result;
      }
      decodeSequence(def, val) {
        (0, assert_1.default)(Array.isArray(val));
        let result = new Array(val.length);
        for (let i = 0; i < val.length; i++) {
          result[i] = this.decode(def.type, val[i]);
        }
        return result;
      }
      decodeTuple(def, value) {
        let items = def.tuple;
        if (items.length == 0) {
          (0, assert_1.default)(value == null || Array.isArray(value) && value.length == 0);
          return null;
        } else {
          (0, assert_1.default)(Array.isArray(value));
          (0, assert_1.default)(value.length == items.length);
          let result = new Array(items.length);
          for (let i = 0; i < items.length; i++) {
            result[i] = this.decode(items[i], value[i]);
          }
          return result;
        }
      }
      decodeStruct(def, value) {
        (0, assert_1.default)((0, util_1.isObject)(value));
        let result = {};
        for (let i = 0; i < def.fields.length; i++) {
          let f = def.fields[i];
          result[f.name] = this.decode(f.type, value[f.name]);
        }
        return result;
      }
      decodeVariant(def, val) {
        (0, assert_1.default)((0, util_1.isObject)(val));
        (0, assert_1.default)(typeof val.__kind == "string");
        let variant = def.variantsByName[val.__kind];
        if (variant == null)
          throw new Error(`Unknown variant ${val.__kind}`);
        switch (variant.kind) {
          case "empty":
            return {
              __kind: val.__kind
            };
          case "value":
            return {
              __kind: val.__kind,
              value: this.decode(variant.type, val.value)
            };
          case "tuple":
            return {
              __kind: val.__kind,
              value: this.decodeTuple(variant.def, val.value)
            };
          case "struct": {
            let s = this.decodeStruct(variant.def, val);
            s.__kind = val.__kind;
            return s;
          }
          default:
            (0, util_1.throwUnexpectedCase)(variant.kind);
        }
      }
      decodeOption(def, value) {
        return value == null ? void 0 : this.decode(def.type, value);
      }
    };
    exports.JsonCodec = JsonCodec;
    function decodePrimitive(type, value) {
      switch (type) {
        case "I8":
          (0, util_1.checkSignedInt)(value, 8);
          return value;
        case "I16":
          (0, util_1.checkSignedInt)(value, 16);
          return value;
        case "I32":
          (0, util_1.checkSignedInt)(value, 32);
          return value;
        case "I64":
          return (0, util_1.toSignedBigInt)(value, 64);
        case "I128":
          return (0, util_1.toSignedBigInt)(value, 128);
        case "I256":
          return (0, util_1.toSignedBigInt)(value, 256);
        case "U8":
          (0, util_1.checkUnsignedInt)(value, 8);
          return value;
        case "U16":
          (0, util_1.checkUnsignedInt)(value, 16);
          return value;
        case "U32":
          (0, util_1.checkUnsignedInt)(value, 32);
          return value;
        case "U64":
          return (0, util_1.toUnsignedBigInt)(value, 64);
        case "U128":
          return (0, util_1.toUnsignedBigInt)(value, 128);
        case "U256":
          return (0, util_1.toUnsignedBigInt)(value, 256);
        case "Bool":
          (0, assert_1.default)(typeof value == "boolean");
          return value;
        case "Str":
          (0, assert_1.default)(typeof value == "string");
          return value;
        default:
          (0, util_1.throwUnexpectedCase)(type);
      }
    }
    function decodeBooleanOption(value) {
      if (value == null)
        return void 0;
      (0, assert_1.default)(typeof value == "boolean");
      return value;
    }
    function decodeBinaryArray(len, value) {
      let buf = (0, util_internal_hex_1.decodeHex)(value);
      (0, assert_1.default)(buf.length == len);
      return buf;
    }
    exports.decodeBinaryArray = decodeBinaryArray;
  }
});

// node_modules/@subsquid/scale-codec/lib/index.js
var require_lib = __commonJS({
  "node_modules/@subsquid/scale-codec/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_types(), exports);
    __exportStar(require_src(), exports);
    __exportStar(require_sink(), exports);
    __exportStar(require_codec(), exports);
    __exportStar(require_codec_json(), exports);
  }
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base642 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer3;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer3.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer3.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function Buffer3(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer3.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer3.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer3.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer3, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer3.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer3.alloc(+length);
    }
    Buffer3.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer3.prototype;
    };
    Buffer3.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer3.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer3.from(b, b.offset, b.byteLength);
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer3.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer3.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer3.isBuffer(buf))
              buf = Buffer3.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer3.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer3.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer3.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
    Buffer3.prototype.equals = function equals(b) {
      if (!Buffer3.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer3.compare(this, b) === 0;
    };
    Buffer3.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
    }
    Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer3.from(target, target.offset, target.byteLength);
      }
      if (!Buffer3.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer3.from(val, encoding);
      }
      if (Buffer3.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer3.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base642.fromByteArray(buf);
      } else {
        return base642.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer3.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer3.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer3.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer3.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base642.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet2 = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet2[i] + alphabet2[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/@scure/base/index.js
var freeze = (fn) => Object.freeze(fn());
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in a && a.BYTES_PER_ELEMENT === 1;
}
function abytes(b) {
  if (!isBytes(b))
    throw new TypeError("Uint8Array expected");
}
function isArrayOf(isString, arr) {
  if (!Array.isArray(arr))
    return false;
  if (arr.length === 0)
    return true;
  if (isString) {
    return arr.every((item) => typeof item === "string");
  } else {
    return arr.every((item) => Number.isSafeInteger(item));
  }
}
function afn(input) {
  if (typeof input !== "function")
    throw new TypeError("function expected");
  return true;
}
function astr(label, input) {
  if (typeof input !== "string")
    throw new TypeError(`${label}: string expected`);
  return true;
}
function anumber(n, title = "number") {
  if (typeof n !== "number")
    throw new TypeError(`${title}: expected number, got ${typeof n}`);
  if (!Number.isSafeInteger(n))
    throw new RangeError(`${title}: expected safe integer, got ${n}`);
}
function anumArr(label, input) {
  if (!isArrayOf(false, input))
    throw new TypeError(`${label}: array of numbers expected`);
}
function chain(...args) {
  const id = (a) => a;
  const wrap = (a, b) => (c) => a(b(c));
  const encode = args.map((x) => x.encode).reduceRight(wrap, id);
  const decode = args.map((x) => x.decode).reduce(wrap, id);
  return { encode, decode };
}
function normalize(fn) {
  afn(fn);
  return { encode: (from) => from, decode: (to) => fn(to) };
}
var powers = (() => {
  let res = [];
  for (let i = 0; i < 40; i++)
    res.push(2 ** i);
  return res;
})();
function u8ToNumArr(u8, len = u8.length) {
  const res = new Array(len);
  for (let i = 0; i < len; i++)
    res[i] = u8[i];
  return res;
}
var asciiDecoder = (() => {
  try {
    const decoder = new TextDecoder();
    return decoder.decode(Uint8Array.of(65, 48, 43, 127)) === "A0+" ? decoder : void 0;
  } catch (e) {
    return void 0;
  }
})();
var B2S_CHUNK = 8192;
function charcodesToString(codes) {
  const len = codes.length;
  if (asciiDecoder !== void 0 && len >= 12)
    return asciiDecoder.decode(codes);
  if (len <= B2S_CHUNK)
    return String.fromCharCode.apply(null, codes);
  let res = "";
  for (let i = 0; i < len; i += B2S_CHUNK)
    res += String.fromCharCode.apply(null, codes.subarray(i, i + B2S_CHUNK));
  return res;
}
function radix2(bits) {
  anumber(bits);
  if (bits <= 0 || bits > 8)
    throw new RangeError("radix2: bits should be in (0..8]");
  const mask = powers[bits] - 1;
  return {
    encode: (bytes) => {
      abytes(bytes);
      const len = bytes.length;
      const res = new Uint8Array(Math.ceil(len * 8 / bits));
      let carry = 0;
      let pos = 0;
      let j = 0;
      for (let i = 0; i < len; ) {
        if (i + 2 < len) {
          carry = carry << 24 | bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
          pos += 24;
          i += 3;
        } else {
          carry = (carry << 8 | bytes[i]) & 65535;
          pos += 8;
          i++;
        }
        for (; ; ) {
          pos -= bits;
          res[j++] = carry >> pos & mask;
          if (pos < bits)
            break;
        }
      }
      if (pos > 0)
        res[j] = carry << bits - pos & mask;
      return res;
    },
    decode: (digits) => {
      const len = digits.length;
      const res = new Uint8Array(Math.floor(len * bits / 8));
      let carry = 0;
      let pos = 0;
      let j = 0;
      for (let i = 0; i < len; i++) {
        carry = (carry << bits | digits[i]) & 65535;
        pos += bits;
        for (; pos >= 8; pos -= 8)
          res[j++] = carry >> pos - 8 & 255;
      }
      carry = carry << 8 - pos & 255;
      if (pos >= bits)
        throw new Error("Excess padding");
      if (carry > 0)
        throw new Error(`Non-zero padding: ${carry}`);
      return res;
    }
  };
}
function alphabet(letters, aliases) {
  const len = letters.length;
  if (len > 128)
    throw new Error("alphabet: max 128 letters");
  const encTable = new Uint8Array(len);
  const decTable = new Int8Array(128).fill(-1);
  for (let i = 0; i < len; i++) {
    const code = letters.charCodeAt(i);
    if (letters.codePointAt(i) !== code || code > 127)
      throw new Error("alphabet: single-char ASCII letters only");
    encTable[i] = code;
    decTable[code] = i;
  }
  if (aliases !== void 0) {
    for (const alias of Object.keys(aliases)) {
      const code = alias.charCodeAt(0);
      const target = decTable[aliases[alias].charCodeAt(0)];
      if (alias.length !== 1 || code > 127 || target === void 0 || target === -1)
        throw new Error(`alphabet: invalid alias ${alias}`);
      decTable[code] = target;
    }
  }
  return {
    encode: (digits) => {
      const codes = new Uint8Array(digits.length);
      for (let i = 0; i < digits.length; i++) {
        const d = digits[i];
        const code = encTable[d];
        if (code === void 0)
          throw new Error(`alphabet.encode: invalid digit ${d}`);
        codes[i] = code;
      }
      return charcodesToString(codes);
    },
    decode: (input) => {
      astr("decode", input);
      const slen = input.length;
      const digits = new Uint8Array(slen);
      for (let i = 0; i < slen; i++) {
        const code = input.charCodeAt(i);
        const digit = code < 128 ? decTable[code] : -1;
        if (digit === -1)
          throw new Error(`Unknown letter "${input[i]}". Allowed: ${letters}`);
        digits[i] = digit;
      }
      return digits;
    }
  };
}
function padding(bits, chr = "=") {
  anumber(bits);
  astr("padding", chr);
  return {
    encode(data) {
      while (data.length * bits % 8)
        data += chr;
      return data;
    },
    decode(input) {
      astr("decode", input);
      let end = input.length;
      if (end * bits % 8)
        throw new Error("padding: invalid length");
      for (; end > 0 && input[end - 1] === chr; end--) {
        const byte = (end - 1) * bits;
        if (byte % 8 === 0)
          throw new Error("padding: excess padding");
      }
      return input.slice(0, end);
    }
  };
}
function unsafeWrapper(fn) {
  afn(fn);
  return function(...args) {
    try {
      return fn.apply(null, args);
    } catch (e) {
    }
  };
}
function checksum(len, fn) {
  anumber(len);
  if (len <= 0)
    throw new RangeError(`checksum length must be positive: ${len}`);
  afn(fn);
  const _fn = fn;
  return {
    encode(data) {
      abytes(data);
      const sum = _fn(data).slice(0, len);
      const res = new Uint8Array(data.length + len);
      res.set(data);
      res.set(sum, data.length);
      return res;
    },
    decode(data) {
      abytes(data);
      const payload = data.slice(0, -len);
      const oldChecksum = data.slice(-len);
      const newChecksum = _fn(payload).slice(0, len);
      for (let i = 0; i < len; i++)
        if (newChecksum[i] !== oldChecksum[i])
          throw new Error("Invalid checksum");
      return payload;
    }
  };
}
var base16 = freeze(() => chain(radix2(4), alphabet("0123456789ABCDEF")));
var base32 = freeze(() => chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), padding(5)));
var base32nopad = freeze(() => chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567")));
var base32hex = freeze(() => chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), padding(5)));
var base32hexnopad = freeze(() => chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV")));
var BASE32_CROCKFORD_ASCII = /^[\x00-\x7f]*$/;
var base32crockford = freeze(() => chain(radix2(5), alphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), normalize((s) => {
  astr("base32crockford.decode", s);
  const upper = s.toUpperCase();
  if (s !== upper && !BASE32_CROCKFORD_ASCII.test(s))
    throw new Error("base32crockford.decode: ASCII expected");
  return upper.replace(/O/g, "0").replace(/[IL]/g, "1");
})));
var hasBase64Builtin = (() => typeof Uint8Array.from([]).toBase64 === "function" && typeof Uint8Array.fromBase64 === "function")();
var ASCII_WHITESPACE = /[\t\n\f\r ]/;
var decodeBase64Builtin = (s, isUrl) => {
  astr("base64", s);
  const alphabet2 = isUrl ? "base64url" : "base64";
  if (s.length > 0 && ASCII_WHITESPACE.test(s))
    throw new Error("invalid base64");
  return Uint8Array.fromBase64(s, { alphabet: alphabet2, lastChunkHandling: "strict" });
};
var base64Fallback = freeze(() => chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), padding(6)));
var base64urlFallback = freeze(() => chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), padding(6)));
var base64 = freeze(() => hasBase64Builtin ? {
  encode(b) {
    abytes(b);
    return b.toBase64();
  },
  decode(s) {
    return decodeBase64Builtin(s, false);
  }
} : base64Fallback);
var base64nopad = freeze(() => chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")));
var base64url = freeze(() => hasBase64Builtin ? {
  encode(b) {
    abytes(b);
    return b.toBase64({ alphabet: "base64url" });
  },
  decode(s) {
    return decodeBase64Builtin(s, true);
  }
} : base64urlFallback);
var base64urlnopad = freeze(() => chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_")));
var B58_GROUP = 656356768;
var B36_GROUP = 60466176;
var RADIX_BASE_N_MAX_LENGTH = 65536;
var BASE_N_MAX_BYTES = 2048;
var BASE_N_MAX_CHARS = 4096;
var radixBaseN = (BASE, GROUP) => ({
  encode: (bytes) => {
    abytes(bytes);
    const blen = bytes.length;
    if (blen === 0)
      return new Uint8Array(0);
    if (blen >= RADIX_BASE_N_MAX_LENGTH)
      throw new Error("invalid length");
    let zeros = 0;
    while (zeros < blen - 1 && bytes[zeros] === 0)
      zeros++;
    const nlimbs = Math.ceil(blen / 2);
    const limbs = new Uint16Array(nlimbs);
    const odd = blen & 1;
    if (odd)
      limbs[0] = bytes[0];
    for (let i = odd, j2 = odd; i < blen; i += 2, j2++)
      limbs[j2] = bytes[i] << 8 | bytes[i + 1];
    const groups = [];
    let pos = 0;
    while (pos < nlimbs) {
      let carry = 0;
      for (let i = pos; i < nlimbs; i++) {
        const cur = carry * 65536 + limbs[i];
        const q = Math.floor(cur / GROUP);
        carry = cur - q * GROUP;
        limbs[i] = q;
        if (q === 0 && i === pos)
          pos++;
      }
      groups.push(carry);
    }
    const top = groups.length - 1;
    let sig = top * 5;
    for (let v = groups[top]; ; v = Math.floor(v / BASE)) {
      sig++;
      if (v < BASE)
        break;
    }
    const res = new Uint8Array(zeros + sig);
    let j = res.length - 1;
    for (let g = 0; g < top; g++) {
      let v = groups[g];
      for (let k = 0; k < 5; k++) {
        res[j--] = v % BASE;
        v = Math.floor(v / BASE);
      }
    }
    for (let v = groups[top]; j >= zeros; v = Math.floor(v / BASE))
      res[j--] = v % BASE;
    return res;
  },
  decode: (digits) => {
    abytes(digits);
    const dlen = digits.length;
    if (dlen === 0)
      return new Uint8Array(0);
    if (dlen >= RADIX_BASE_N_MAX_LENGTH)
      throw new Error("invalid length");
    let zeros = 0;
    while (zeros < dlen - 1 && digits[zeros] === 0)
      zeros++;
    const limbs = new Uint16Array(Math.ceil(dlen * 6 / 16) + 1);
    let used = 0;
    let i = 0;
    let group = dlen % 5 || 5;
    while (i < dlen) {
      let gval = 0;
      let factor = 1;
      for (const end = i + group; i < end; i++) {
        const d = digits[i];
        if (d >= BASE)
          throw new Error(`invalid integer: ${d}`);
        gval = gval * BASE + d;
        factor *= BASE;
      }
      group = 5;
      let carry = gval;
      for (let k = 0; k < used; k++) {
        const cur = limbs[k] * factor + carry;
        carry = Math.floor(cur / 65536);
        limbs[k] = cur - carry * 65536;
      }
      for (; carry > 0; carry = Math.floor(carry / 65536))
        limbs[used++] = carry % 65536;
    }
    const valueBytes = used === 0 ? 1 : used * 2 - (limbs[used - 1] < 256 ? 1 : 0);
    const res = new Uint8Array(zeros + valueBytes);
    let j = res.length - 1;
    for (let k = 0; k < used; k++) {
      const limb = limbs[k];
      res[j--] = limb & 255;
      if (j >= zeros)
        res[j--] = limb >> 8;
    }
    return res;
  }
});
var genBaseN = (radix, abc) => {
  const letters = alphabet(abc);
  return {
    encode(bytes) {
      abytes(bytes);
      if (bytes.length > BASE_N_MAX_BYTES)
        throw new Error("invalid length");
      return letters.encode(radix.encode(bytes));
    },
    decode(str) {
      astr("baseN.decode", str);
      if (str.length > BASE_N_MAX_CHARS)
        throw new Error("invalid length");
      return radix.decode(letters.decode(str));
    }
  };
};
var radix58 = radixBaseN(58, B58_GROUP);
var base36 = freeze(() => genBaseN(radixBaseN(36, B36_GROUP), "0123456789abcdefghijklmnopqrstuvwxyz"));
var genBase58 = (abc) => genBaseN(radix58, abc);
var base58 = freeze(() => genBase58("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"));
var base58flickr = freeze(() => genBase58("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"));
var base58xrp = freeze(() => genBase58("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz"));
var XMR_BLOCK_LEN = [0, 2, 3, 5, 6, 7, 9, 10, 11];
var base58xmr = freeze(() => ({
  encode(data) {
    abytes(data);
    let res = "";
    for (let i = 0; i < data.length; i += 8) {
      const block = data.subarray(i, i + 8);
      res += base58.encode(block).padStart(XMR_BLOCK_LEN[block.length], "1");
    }
    return res;
  },
  decode(str) {
    astr("base58xmr.decode", str);
    const strLen = str.length;
    const tailChars = strLen % 11;
    const tailBytes = tailChars === 0 ? 0 : XMR_BLOCK_LEN.indexOf(tailChars);
    if (tailBytes === -1)
      throw new Error(`base58xmr: invalid block length ${tailChars}`);
    const res = new Uint8Array(Math.floor(strLen / 11) * 8 + tailBytes);
    let w = 0;
    for (let i = 0; i < strLen; i += 11) {
      const slice = str.slice(i, i + 11);
      const blockLen = slice.length === 11 ? 8 : tailBytes;
      const block = base58.decode(slice);
      for (let j = 0; j < block.length - blockLen; j++) {
        if (block[j] !== 0)
          throw new Error("base58xmr: wrong padding");
      }
      for (let j = block.length - blockLen; j < block.length; j++)
        res[w++] = block[j];
    }
    return res;
  }
}));
var BECH_ALPHABET = alphabet("qpzry9x8gf2tvdw0s3jn54khce6mua7l");
var BECH_UPPERCASE_PRINTABLE = /^[\x21-\x60\x7b-\x7e]+$/;
function assertBech32Printable(label, value) {
  for (let i = 0; i < value.length; i++) {
    const c = value.charCodeAt(i);
    if (c < 33 || c > 126)
      throw new Error(`${label}: printable ASCII expected`);
  }
}
function wordsToU8(words) {
  const len = words.length;
  const res = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    const w = words[i];
    if (w < 0 || w >= 32)
      throw new Error(`alphabet.encode: invalid digit ${w}`);
    res[i] = w;
  }
  return res;
}
var POLYMOD_GENERATORS = [996825010, 642813549, 513874426, 1027748829, 705979059];
function bech32Polymod(pre) {
  const b = pre >> 25;
  let chk = (pre & 33554431) << 5;
  for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
    if ((b >> i & 1) === 1)
      chk ^= POLYMOD_GENERATORS[i];
  }
  return chk;
}
function bechChecksum(prefix, words, encodingConst = 1) {
  const len = prefix.length;
  let chk = 1;
  for (let i = 0; i < len; i++) {
    const c = prefix.charCodeAt(i);
    if (c < 33 || c > 126)
      throw new Error(`Invalid prefix (${prefix})`);
    chk = bech32Polymod(chk) ^ c >> 5;
  }
  chk = bech32Polymod(chk);
  for (let i = 0; i < len; i++)
    chk = bech32Polymod(chk) ^ prefix.charCodeAt(i) & 31;
  for (let v of words)
    chk = bech32Polymod(chk) ^ v;
  for (let i = 0; i < 6; i++)
    chk = bech32Polymod(chk);
  chk ^= encodingConst;
  const sum = new Uint8Array(6);
  for (let i = 0; i < 6; i++)
    sum[i] = chk >>> 5 * (5 - i) & 31;
  return BECH_ALPHABET.encode(sum);
}
function genBech32(encoding) {
  const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
  const _words = radix2(5);
  const toWords = (from) => {
    abytes(from);
    const len = from.length;
    const res = new Array(Math.ceil(len * 8 / 5));
    let carry = 0;
    let pos = 0;
    let j = 0;
    for (let i = 0; i < len; i++) {
      carry = carry << 8 | from[i];
      pos += 8;
      for (; pos >= 5; pos -= 5)
        res[j++] = carry >> pos - 5 & 31;
    }
    if (pos > 0)
      res[j] = carry << 5 - pos & 31;
    return res;
  };
  const fromWords = (to) => {
    anumArr("radix2.decode", to);
    const len = to.length;
    const digits = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      const w = to[i];
      if (w < 0 || w >= 32)
        throw new Error(`convertRadix2: invalid word=${w}`);
      digits[i] = w;
    }
    return _words.decode(digits);
  };
  const fromWordsUnsafe = unsafeWrapper(fromWords);
  function encode(prefix, words, limit = 90) {
    astr("bech32.encode prefix", prefix);
    if (limit !== false)
      anumber(limit, "limit");
    if (isBytes(words))
      words = u8ToNumArr(words);
    anumArr("bech32.encode", words);
    const plen = prefix.length;
    if (plen === 0)
      throw new TypeError(`Invalid prefix length ${plen}`);
    const actualLength = plen + 7 + words.length;
    if (limit !== false && actualLength > limit)
      throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
    assertBech32Printable("bech32.encode prefix", prefix);
    const lowered = prefix.toLowerCase();
    const sum = bechChecksum(lowered, words, ENCODING_CONST);
    return `${lowered}1${BECH_ALPHABET.encode(wordsToU8(words))}${sum}`;
  }
  function decode(str, limit = 90) {
    astr("bech32.decode input", str);
    if (limit !== false)
      anumber(limit, "limit");
    const slen = str.length;
    if (slen < 8 || limit !== false && slen > limit)
      throw new TypeError(`invalid string length ${slen}, expected (8..${limit})`);
    const lowered = str.toLowerCase();
    if (str !== lowered) {
      if (!BECH_UPPERCASE_PRINTABLE.test(str)) {
        assertBech32Printable("bech32.decode input", str);
        throw new Error(`mixed-case string not allowed`);
      }
    }
    const sepIndex = lowered.lastIndexOf("1");
    if (sepIndex === 0 || sepIndex === -1)
      throw new Error(`invalid separator "1"`);
    const prefix = lowered.slice(0, sepIndex);
    const data = lowered.slice(sepIndex + 1);
    if (data.length < 6)
      throw new Error("invalid data length");
    const digits = BECH_ALPHABET.decode(data);
    const words = u8ToNumArr(digits, digits.length - 6);
    const sum = bechChecksum(prefix, words, ENCODING_CONST);
    if (!data.endsWith(sum))
      throw new Error(`Invalid checksum in ${str}`);
    return { prefix, words };
  }
  const decodeUnsafe = unsafeWrapper(decode);
  function decodeToBytes(str, limit = 90) {
    const { prefix, words } = decode(str, limit);
    return {
      prefix,
      words,
      bytes: fromWords(words)
    };
  }
  function encodeFromBytes(prefix, bytes) {
    return encode(prefix, toWords(bytes));
  }
  return {
    encode,
    decode,
    encodeFromBytes,
    decodeToBytes,
    decodeUnsafe,
    fromWords,
    fromWordsUnsafe,
    toWords
  };
}
var bech32 = freeze(() => genBech32("bech32"));
var bech32m = freeze(() => genBech32("bech32m"));
var ascii = freeze(() => ({
  encode(data) {
    abytes(data);
    for (let i = 0; i < data.length; i++) {
      const byte = data[i];
      if (byte > 127)
        throw new RangeError(`non-ASCII byte ${byte} at ${i}`);
    }
    return charcodesToString(data);
  },
  decode(str) {
    if (typeof str !== "string")
      throw new TypeError("ascii string expected, got " + typeof str);
    const res = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      if (charCode > 127)
        throw new RangeError(`non-ASCII char "${str[i]}" (${charCode}) at ${i}`);
      res[i] = charCode;
    }
    return res;
  }
}));
var _isWellFormedShim = (str) => {
  try {
    return encodeURI(str) !== null;
  } catch {
    return false;
  }
};
var _isWellFormed = (() => (
  // Pick the native check once so utf8.decode doesn't re-probe String.prototype on every call.
  typeof "".isWellFormed === "function" ? (str) => str.isWellFormed() : _isWellFormedShim
))();
var utf8err = (i) => new TypeError(`invalid utf8 at byte ${i}`);
var utf8Fallback = freeze(() => ({
  encode(data) {
    abytes(data);
    let res = "";
    for (let i = 0; i < data.length; ) {
      const a = data[i++];
      if (a < 128) {
        res += String.fromCharCode(a);
        continue;
      }
      if (a < 194 || i >= data.length)
        throw utf8err(i - 1);
      const b = data[i++];
      if ((b & 192) !== 128)
        throw utf8err(i - 1);
      let cp = (a & 31) << 6 | b & 63;
      if (a >= 224) {
        if (i >= data.length)
          throw utf8err(i - 1);
        const c = data[i++];
        if ((c & 192) !== 128 || a === 224 && b < 160 || a === 237 && b >= 160)
          throw utf8err(i - 1);
        cp = (a & 15) << 12 | (b & 63) << 6 | c & 63;
        if (a >= 240) {
          if (i >= data.length)
            throw utf8err(i - 1);
          const d = data[i++];
          if (a > 244 || (d & 192) !== 128 || a === 240 && b < 144 || a === 244 && b >= 144)
            throw utf8err(i - 1);
          cp = (a & 7) << 18 | (b & 63) << 12 | (c & 63) << 6 | d & 63;
        }
      }
      if (cp < 65536)
        res += String.fromCharCode(cp);
      else {
        cp -= 65536;
        res += String.fromCharCode((cp >> 10) + 55296, (cp & 1023) + 56320);
      }
    }
    return res;
  },
  decode(str) {
    astr("utf8", str);
    if (!_isWellFormed(str))
      throw new TypeError("utf8 expected well-formed string");
    const res = new Uint8Array(str.length * 3);
    let pos = 0;
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i);
      if (c < 128) {
        res[pos++] = c;
        continue;
      }
      if (c >= 55296 && c <= 57343) {
        const d = str.charCodeAt(++i);
        c = 65536 + (c - 55296 << 10) + d - 56320;
      }
      if (c >= 65536) {
        res[pos++] = c >> 18 | 240;
        res[pos++] = c >> 12 & 63 | 128;
      } else if (c >= 2048)
        res[pos++] = c >> 12 | 224;
      else
        res[pos++] = c >> 6 | 192;
      if (c >= 2048)
        res[pos++] = c >> 6 & 63 | 128;
      res[pos++] = c & 63 | 128;
    }
    return res.subarray(0, pos);
  }
}));
var utf8 = freeze(() => {
  let _utf8Encoder;
  let _utf8Decoder;
  const utf8Builtin = {
    // ignoreBOM preserves an explicit leading U+FEFF;
    // fatal rejects invalid UTF-8 bytes instead of replacing them.
    encode(data) {
      abytes(data);
      return (_utf8Decoder || (_utf8Decoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }))).decode(data);
    },
    decode(str) {
      astr("utf8", str);
      if (!_isWellFormed(str))
        throw new TypeError("utf8 expected well-formed string");
      return (_utf8Encoder || (_utf8Encoder = new TextEncoder())).encode(str);
    }
  };
  return {
    // Select each direction once at module init, since
    // TextEncoder and TextDecoder can exist independently.
    encode: typeof TextDecoder === "function" ? utf8Builtin.encode : utf8Fallback.encode,
    decode: typeof TextEncoder === "function" ? utf8Builtin.decode : utf8Fallback.decode
  };
});
var hexFallback = freeze(() => chain(
  radix2(4),
  // Case-insensitive decode via table aliases instead of a toLowerCase pass.
  alphabet("0123456789abcdef", { A: "a", B: "b", C: "c", D: "d", E: "e", F: "f" }),
  normalize((s) => {
    astr("hex", s);
    if (s.length % 2 !== 0)
      throw new TypeError(`hex.decode: odd-length string (${s.length})`);
    return s;
  })
));
var __TESTS = freeze(() => ({
  alphabet,
  base64Fallback,
  base64urlFallback,
  hexFallback,
  radix2,
  radix58,
  checksum,
  utf8Fallback,
  _isWellFormedShim
}));
var hasHexBuiltin = (() => (
  // Require both directions before enabling the native hex path so encode/decode stay symmetric.
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
var hexBuiltin = {
  // Keep local type guards so the native path preserves library-level input errors.
  // Native toHex emits lowercase hex, matching the fallback alphabet and Node's hex strings.
  encode(data) {
    abytes(data);
    return data.toHex();
  },
  // Native fromHex accepts either hex case and rejects odd-length / non-hex syntax.
  decode(s) {
    astr("hex", s);
    return Uint8Array.fromHex(s);
  }
};
var hex = freeze(() => hasHexBuiltin ? hexBuiltin : hexFallback);

// node_modules/@midnight-ntwrk/wallet-sdk-address-format/dist/index.js
var subsquidScale = __toESM(require_lib());
var mainnet = Symbol("Mainnet");
var NetworkId = {
  toString: (networkId) => {
    return networkId === mainnet ? "mainnet" : networkId;
  }
};
var BLSScalar = {
  bytes: 32,
  modulus: BigInt("0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001")
};
var ScaleBigInt = {
  encode: (data) => {
    const sink = new subsquidScale.ByteSink();
    sink.compact(data);
    return Buffer.from(sink.toBytes());
  },
  decode: (repr) => {
    const src = new subsquidScale.Src(repr);
    const res = src.compact();
    src.assertEOF();
    return BigInt(res);
  }
};
var Bech32mSymbol = Symbol("MidnightBech32m");
var MidnightBech32m = class _MidnightBech32m {
  static prefix = "mn";
  static encode(networkId, item) {
    return item[Bech32mSymbol].encode(networkId, item);
  }
  static validateSegment(segmentName, segment) {
    const result = /^[A-Za-z1-9-]+$/.test(segment);
    if (!result) {
      throw new Error(`Segment ${segmentName}: ${segment} contains disallowed characters. Allowed characters are only numbers, latin letters and a hyphen`);
    }
  }
  static parse(bech32string) {
    const bech32parsed = bech32m.decodeToBytes(bech32string);
    const [prefix, type, network = mainnet] = bech32parsed.prefix.split("_");
    if (prefix != _MidnightBech32m.prefix) {
      throw new Error(`Expected prefix ${_MidnightBech32m.prefix}`);
    }
    _MidnightBech32m.validateSegment("type", type);
    if (network != mainnet) {
      _MidnightBech32m.validateSegment("network", network);
    }
    return new _MidnightBech32m(type, network, Buffer.from(bech32parsed.bytes));
  }
  type;
  network;
  data;
  constructor(type, network, data) {
    this.data = data;
    this.network = network;
    this.type = type;
    _MidnightBech32m.validateSegment("type", type);
    if (network != mainnet) {
      _MidnightBech32m.validateSegment("network", network);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decode(tclass, networkId) {
    return tclass[Bech32mSymbol].decode(networkId, this);
  }
  asString() {
    const networkSegment = this.network == mainnet ? "" : `_${this.network}`;
    return bech32m.encode(`${_MidnightBech32m.prefix}_${this.type}${networkSegment}`, bech32m.toWords(this.data), false);
  }
  toString() {
    return this.asString();
  }
};
var Bech32mCodec = class _Bech32mCodec {
  type;
  dataToBytes;
  dataFromBytes;
  constructor(type, dataToBytes, dataFromBytes) {
    this.dataFromBytes = dataFromBytes;
    this.dataToBytes = dataToBytes;
    this.type = type;
  }
  encode(networkId, data) {
    const context = _Bech32mCodec.createContext(networkId);
    return new MidnightBech32m(this.type, context.networkId, this.dataToBytes(data));
  }
  decode(networkId, repr) {
    const context = _Bech32mCodec.createContext(networkId);
    if (repr.type != this.type) {
      throw new Error(`Expected type ${this.type}, got ${repr.type}`);
    }
    if (context.networkId != repr.network) {
      throw new Error(`Expected ${NetworkId.toString(context.networkId)} address, got ${NetworkId.toString(repr.network)} one`);
    }
    return this.dataFromBytes(repr.data);
  }
  static createContext(networkId) {
    if (networkId === "mainnet") {
      return { networkId: mainnet };
    } else {
      return { networkId };
    }
  }
};
var ShieldedAddress = class _ShieldedAddress {
  static codec = new Bech32mCodec("shield-addr", (addr) => Buffer.concat([addr.coinPublicKey.data, addr.encryptionPublicKey.data]), (bytes) => {
    const coinPublicKey = new ShieldedCoinPublicKey(bytes.subarray(0, ShieldedCoinPublicKey.keyLength));
    const encryptionPublicKey = new ShieldedEncryptionPublicKey(bytes.subarray(ShieldedCoinPublicKey.keyLength));
    return new _ShieldedAddress(coinPublicKey, encryptionPublicKey);
  });
  static [Bech32mSymbol] = _ShieldedAddress.codec;
  [Bech32mSymbol] = _ShieldedAddress.codec;
  coinPublicKey;
  encryptionPublicKey;
  constructor(coinPublicKey, encryptionPublicKey) {
    this.encryptionPublicKey = encryptionPublicKey;
    this.coinPublicKey = coinPublicKey;
  }
  coinPublicKeyString() {
    return this.coinPublicKey.data.toString("hex");
  }
  encryptionPublicKeyString() {
    return this.encryptionPublicKey.data.toString("hex");
  }
  equals(other) {
    return this.coinPublicKey.equals(other.coinPublicKey) && this.encryptionPublicKey.equals(other.encryptionPublicKey);
  }
};
var ShieldedEncryptionSecretKey = class _ShieldedEncryptionSecretKey {
  static codec = new Bech32mCodec("shield-esk", (esk) => Buffer.from(esk.zswap.yesIKnowTheSecurityImplicationsOfThis_serialize()), (repr) => new _ShieldedEncryptionSecretKey(EncryptionSecretKey.deserialize(repr)));
  // There are some bits in serialization of field elements and elliptic curve points, that are hard to replicate
  // Thus using zswap implementation directly for serialization purposes
  zswap;
  constructor(zswap) {
    this.zswap = zswap;
  }
};
var ShieldedCoinPublicKey = class _ShieldedCoinPublicKey {
  static keyLength = 32;
  static codec = new Bech32mCodec("shield-cpk", (cpk) => cpk.data, (repr) => new _ShieldedCoinPublicKey(repr));
  static fromHexString(hexString) {
    return new _ShieldedCoinPublicKey(Buffer.from(hexString, "hex"));
  }
  data;
  constructor(data) {
    this.data = data;
    if (data.length != _ShieldedCoinPublicKey.keyLength) {
      throw new Error("Coin public key needs to be 32 bytes long");
    }
  }
  toHexString() {
    return this.data.toString("hex");
  }
  equals(other) {
    const otherKey = typeof other === "string" ? _ShieldedCoinPublicKey.fromHexString(other) : other;
    return otherKey.data.equals(this.data);
  }
};
var ShieldedEncryptionPublicKey = class _ShieldedEncryptionPublicKey {
  static keyLength = 32;
  static codec = new Bech32mCodec("shield-epk", (cpk) => cpk.data, (repr) => new _ShieldedEncryptionPublicKey(repr));
  static fromHexString(hexString) {
    return new _ShieldedEncryptionPublicKey(Buffer.from(hexString, "hex"));
  }
  data;
  constructor(data) {
    this.data = data;
  }
  toHexString() {
    return this.data.toString("hex");
  }
  equals(other) {
    const otherKey = typeof other === "string" ? _ShieldedEncryptionPublicKey.fromHexString(other) : other;
    return otherKey.data.equals(this.data);
  }
};
var UnshieldedAddress = class _UnshieldedAddress {
  data;
  static keyLength = 32;
  static codec = new Bech32mCodec("addr", (addr) => addr.data, (repr) => new _UnshieldedAddress(repr));
  static [Bech32mSymbol] = _UnshieldedAddress.codec;
  [Bech32mSymbol] = _UnshieldedAddress.codec;
  constructor(data) {
    if (data.length != _UnshieldedAddress.keyLength) {
      throw new Error("Unshielded address needs to be 32 bytes long");
    }
    this.data = data;
  }
  get hexString() {
    return this.data.toString("hex");
  }
  equals(other) {
    const otherAddress = typeof other === "string" ? new _UnshieldedAddress(Buffer.from(other, "hex")) : other;
    return otherAddress.data.equals(this.data);
  }
};
var DustAddress = class _DustAddress {
  data;
  static codec = new Bech32mCodec("dust", (daddr) => daddr.serialize(), (repr) => new _DustAddress(ScaleBigInt.decode(repr)));
  static [Bech32mSymbol] = _DustAddress.codec;
  [Bech32mSymbol] = _DustAddress.codec;
  static encodePublicKey = (networkId, publicKey) => {
    return _DustAddress.codec.encode(networkId, new _DustAddress(publicKey)).asString();
  };
  constructor(data) {
    if (data >= BLSScalar.modulus) {
      throw new Error("Dust address is too large");
    }
    this.data = data;
  }
  serialize() {
    return ScaleBigInt.encode(this.data);
  }
  equals(other) {
    const otherAddress = typeof other === "bigint" ? other : other.data;
    return otherAddress === this.data;
  }
};

// node_modules/@midnight-ntwrk/midnight-js-utils/dist/index.mjs
var import_buffer = __toESM(require_buffer(), 1);
function assertDefined(value, message) {
  if (value === null || value === void 0) {
    throw new Error(message ?? "Expected value to be defined");
  }
}
function assertUndefined(value, message) {
  if (value !== null && value !== void 0) {
    throw new Error(message ?? "Expected value to be null or undefined");
  }
}
var ttlOneHour = () => new Date(Date.now() + 60 * 60 * 1e3);
var HEX_STRING_REGEXP = /^(?<prefix>(0x)?)(?<byteChars>([0-9A-Fa-f]{2})*)(?<incompleteChars>.*)$/;
var parseHex = (source) => {
  const groups = HEX_STRING_REGEXP.exec(source)?.groups;
  return {
    hasPrefix: groups.prefix === "0x",
    byteChars: groups.byteChars,
    incompleteChars: groups.incompleteChars
  };
};
var toHex = (bytes) => import_buffer.Buffer.from(bytes).toString("hex");
var fromHex = (str) => import_buffer.Buffer.from(str, "hex");
var isHex = (source, byteLen) => {
  if (!source || byteLen !== void 0 && byteLen <= 0) {
    return false;
  }
  const parsedHex = parseHex(source);
  const validByteLen = byteLen ? parsedHex.byteChars.length / 2 === byteLen : parsedHex.byteChars.length > 0;
  return validByteLen && !parsedHex.incompleteChars;
};
function assertIsHex(source, byteLen) {
  if (!source) {
    throw new TypeError("Input string must have non-zero length.");
  }
  if (byteLen !== void 0 && byteLen <= 0) {
    throw new Error("Expected byte length must be greater than zero.");
  }
  const parsedHex = parseHex(source);
  if (parsedHex.incompleteChars) {
    if (parsedHex.incompleteChars.length % 2 > 0) {
      throw new TypeError(`The last byte of input string '${source}' is incomplete.`);
    }
    const invalidCharPos = parsedHex.byteChars.length + (parsedHex.hasPrefix ? 2 : 0);
    throw new TypeError(`Invalid hex-digit '${source[invalidCharPos]}' found in input string at index ${invalidCharPos}.`);
  }
  if (!parsedHex.byteChars) {
    throw new TypeError(`Input string '${source}' is not a valid hex-string.`);
  }
  if (byteLen) {
    const actualByteLen = parsedHex.byteChars.length / 2;
    if (byteLen !== actualByteLen) {
      throw new TypeError(`Expected an input string with byte length of ${byteLen}, got ${actualByteLen}.`);
    }
  }
}
var parseCoinPublicKeyToHex = (possibleBech32, zswapNetworkId) => {
  if (isHex(possibleBech32))
    return possibleBech32;
  const parsedBech32 = MidnightBech32m.parse(possibleBech32);
  const decoded = ShieldedCoinPublicKey.codec.decode(zswapNetworkId, parsedBech32);
  return import_buffer.Buffer.from(decoded.data).toString("hex");
};
var parseEncPublicKeyToHex = (possibleBech32, zswapNetworkId) => {
  if (isHex(possibleBech32))
    return possibleBech32;
  const parsedBech32 = MidnightBech32m.parse(possibleBech32);
  const decoded = ShieldedEncryptionPublicKey.codec.decode(zswapNetworkId, parsedBech32);
  return import_buffer.Buffer.from(decoded.data).toString("hex");
};
var MIN_PASSWORD_LENGTH = 16;
var MIN_CHARACTER_CLASSES = 3;
var MAX_CONSECUTIVE_REPEATED = 3;
var MIN_SEQUENTIAL_LENGTH = 4;
var PasswordValidationError = class extends Error {
  reason;
  constructor(message, reason) {
    super(message);
    this.reason = reason;
    this.name = "PasswordValidationError";
  }
};
var countCharacterClasses = (password) => {
  let count = 0;
  if (/[a-z]/.test(password))
    count++;
  if (/[A-Z]/.test(password))
    count++;
  if (/[0-9]/.test(password))
    count++;
  if (/[^a-zA-Z0-9]/.test(password))
    count++;
  return count;
};
var hasRepeatedCharacters = (password) => {
  let consecutiveCount = 1;
  for (let i = 1; i < password.length; i++) {
    if (password[i] === password[i - 1]) {
      consecutiveCount++;
      if (consecutiveCount > MAX_CONSECUTIVE_REPEATED) {
        return true;
      }
    } else {
      consecutiveCount = 1;
    }
  }
  return false;
};
var hasSequentialPattern = (password) => {
  const lowerPassword = password.toLowerCase();
  for (let i = 0; i <= lowerPassword.length - MIN_SEQUENTIAL_LENGTH; i++) {
    let ascendingCount = 1;
    let descendingCount = 1;
    for (let j = 1; j < MIN_SEQUENTIAL_LENGTH; j++) {
      const currentCode = lowerPassword.charCodeAt(i + j);
      const prevCode = lowerPassword.charCodeAt(i + j - 1);
      if (currentCode === prevCode + 1) {
        ascendingCount++;
      } else {
        ascendingCount = 1;
      }
      if (currentCode === prevCode - 1) {
        descendingCount++;
      } else {
        descendingCount = 1;
      }
      if (ascendingCount >= MIN_SEQUENTIAL_LENGTH || descendingCount >= MIN_SEQUENTIAL_LENGTH) {
        return true;
      }
    }
  }
  return false;
};
var validatePassword = (password) => {
  if (!password) {
    throw new PasswordValidationError("Password is required for private state encryption.\nPlease provide a password via privateStoragePasswordProvider in the configuration.", "missing");
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new PasswordValidationError(`Password is shorter than ${MIN_PASSWORD_LENGTH} characters`, "too_short");
  }
  if (hasRepeatedCharacters(password)) {
    throw new PasswordValidationError(`Password contains too many repeated characters (more than ${MAX_CONSECUTIVE_REPEATED} identical in a row)`, "repeated_characters");
  }
  const characterClasses = countCharacterClasses(password);
  if (characterClasses < MIN_CHARACTER_CLASSES) {
    throw new PasswordValidationError(`Password must contain at least ${MIN_CHARACTER_CLASSES} of: uppercase letters, lowercase letters, digits, special characters. Found: ${characterClasses}`, "insufficient_classes");
  }
  if (hasSequentialPattern(password)) {
    throw new PasswordValidationError("Password contains sequential patterns (e.g., '1234', 'abcd'). Use a more random password", "sequential_pattern");
  }
};
var MAX_SAFE_NAME_LENGTH = 255;
var SAFE_NAME_PATTERN = /^[a-zA-Z0-9._-]+$/;
var SEMVER_PATTERN = /^\d+\.\d+\.\d+(?:-[A-Za-z0-9._-]+)?$/;
var LOOPBACK_HOSTNAMES = /* @__PURE__ */ new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);
var INSECURE_SCHEMES = /* @__PURE__ */ new Set(["http:", "ws:"]);
function assertSafeName(name, label) {
  if (typeof name !== "string" || name.length === 0 || name.length > MAX_SAFE_NAME_LENGTH) {
    throw new Error(`Invalid ${label}: ${JSON.stringify(name)}`);
  }
  if (name === "." || name === "..") {
    throw new Error(`Invalid ${label}: ${JSON.stringify(name)}`);
  }
  if (!SAFE_NAME_PATTERN.test(name)) {
    throw new Error(`Invalid ${label}: ${JSON.stringify(name)}`);
  }
}
function assertSemVer(version, label) {
  if (typeof version !== "string" || version.length === 0 || version.length > MAX_SAFE_NAME_LENGTH) {
    throw new Error(`Invalid ${label}: ${JSON.stringify(version)}`);
  }
  if (!SEMVER_PATTERN.test(version)) {
    throw new Error(`Invalid ${label}: ${JSON.stringify(version)}`);
  }
}
function warnIfInsecureRemoteUrl(url, label) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return;
  }
  if (!INSECURE_SCHEMES.has(parsed.protocol)) {
    return;
  }
  if (LOOPBACK_HOSTNAMES.has(parsed.hostname)) {
    return;
  }
  const scheme = parsed.protocol.replace(/:$/, "");
  const secureReplacement = scheme === "http" ? "https://" : "wss://";
  console.warn(`midnight-js: ${label} uses unencrypted ${scheme}:// for non-loopback host '${parsed.hostname}'; sensitive data may be transmitted in clear text. Use ${secureReplacement} in production.`);
}
function assertIsContractAddress(contractAddress) {
  const CONTRACT_ADDRESS_BYTE_LENGTH = 32;
  assertIsHex(contractAddress, CONTRACT_ADDRESS_BYTE_LENGTH);
  const parsedHex = parseHex(contractAddress);
  if (parsedHex.hasPrefix) {
    throw new TypeError(`Unexpected '0x' prefix in contract address '${contractAddress}'`);
  }
}

export {
  require_buffer,
  assertDefined,
  assertUndefined,
  ttlOneHour,
  parseHex,
  toHex,
  fromHex,
  isHex,
  assertIsHex,
  parseCoinPublicKeyToHex,
  parseEncPublicKeyToHex,
  MIN_PASSWORD_LENGTH,
  MIN_CHARACTER_CLASSES,
  MAX_CONSECUTIVE_REPEATED,
  MIN_SEQUENTIAL_LENGTH,
  PasswordValidationError,
  validatePassword,
  MAX_SAFE_NAME_LENGTH,
  assertSafeName,
  assertSemVer,
  warnIfInsecureRemoteUrl,
  assertIsContractAddress
};
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@scure/base/index.js:
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=chunk-ND4UDMAS.js.map
