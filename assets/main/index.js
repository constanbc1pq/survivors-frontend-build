window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  1: [ function(require, module, exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = "undefined" !== typeof Uint8Array ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len = b64.length;
      if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var validLen = b64.indexOf("=");
      -1 === validLen && (validLen = len);
      var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
      return [ validLen, placeHoldersLen ];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return 3 * (validLen + placeHoldersLen) / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return 3 * (validLen + placeHoldersLen) / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i;
      for (i = 0; i < len; i += 4) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = 255 & tmp;
      }
      if (2 === placeHoldersLen) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = 255 & tmp;
      }
      if (1 === placeHoldersLen) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = 255 & tmp;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[63 & num];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (255 & uint8[i + 2]);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      if (1 === extraBytes) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (2 === extraBytes) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }, {} ],
  2: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      var base64 = require("base64-js");
      var ieee754 = require("ieee754");
      var isArray = require("isarray");
      exports.Buffer = Buffer;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.TYPED_ARRAY_SUPPORT = void 0 !== global.TYPED_ARRAY_SUPPORT ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
      exports.kMaxLength = kMaxLength();
      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          arr.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function() {
              return 42;
            }
          };
          return 42 === arr.foo() && "function" === typeof arr.subarray && 0 === arr.subarray(1, 1).byteLength;
        } catch (e) {
          return false;
        }
      }
      function kMaxLength() {
        return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function createBuffer(that, length) {
        if (kMaxLength() < length) throw new RangeError("Invalid typed array length");
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = new Uint8Array(length);
          that.__proto__ = Buffer.prototype;
        } else {
          null === that && (that = new Buffer(length));
          that.length = length;
        }
        return that;
      }
      function Buffer(arg, encodingOrOffset, length) {
        if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) return new Buffer(arg, encodingOrOffset, length);
        if ("number" === typeof arg) {
          if ("string" === typeof encodingOrOffset) throw new Error("If encoding is specified then the first argument must be a string");
          return allocUnsafe(this, arg);
        }
        return from(this, arg, encodingOrOffset, length);
      }
      Buffer.poolSize = 8192;
      Buffer._augment = function(arr) {
        arr.__proto__ = Buffer.prototype;
        return arr;
      };
      function from(that, value, encodingOrOffset, length) {
        if ("number" === typeof value) throw new TypeError('"value" argument must not be a number');
        if ("undefined" !== typeof ArrayBuffer && value instanceof ArrayBuffer) return fromArrayBuffer(that, value, encodingOrOffset, length);
        if ("string" === typeof value) return fromString(that, value, encodingOrOffset);
        return fromObject(that, value);
      }
      Buffer.from = function(value, encodingOrOffset, length) {
        return from(null, value, encodingOrOffset, length);
      };
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        Buffer.prototype.__proto__ = Uint8Array.prototype;
        Buffer.__proto__ = Uint8Array;
        "undefined" !== typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(Buffer, Symbol.species, {
          value: null,
          configurable: true
        });
      }
      function assertSize(size) {
        if ("number" !== typeof size) throw new TypeError('"size" argument must be a number');
        if (size < 0) throw new RangeError('"size" argument must not be negative');
      }
      function alloc(that, size, fill, encoding) {
        assertSize(size);
        if (size <= 0) return createBuffer(that, size);
        if (void 0 !== fill) return "string" === typeof encoding ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
        return createBuffer(that, size);
      }
      Buffer.alloc = function(size, fill, encoding) {
        return alloc(null, size, fill, encoding);
      };
      function allocUnsafe(that, size) {
        assertSize(size);
        that = createBuffer(that, size < 0 ? 0 : 0 | checked(size));
        if (!Buffer.TYPED_ARRAY_SUPPORT) for (var i = 0; i < size; ++i) that[i] = 0;
        return that;
      }
      Buffer.allocUnsafe = function(size) {
        return allocUnsafe(null, size);
      };
      Buffer.allocUnsafeSlow = function(size) {
        return allocUnsafe(null, size);
      };
      function fromString(that, string, encoding) {
        "string" === typeof encoding && "" !== encoding || (encoding = "utf8");
        if (!Buffer.isEncoding(encoding)) throw new TypeError('"encoding" must be a valid string encoding');
        var length = 0 | byteLength(string, encoding);
        that = createBuffer(that, length);
        var actual = that.write(string, encoding);
        actual !== length && (that = that.slice(0, actual));
        return that;
      }
      function fromArrayLike(that, array) {
        var length = array.length < 0 ? 0 : 0 | checked(array.length);
        that = createBuffer(that, length);
        for (var i = 0; i < length; i += 1) that[i] = 255 & array[i];
        return that;
      }
      function fromArrayBuffer(that, array, byteOffset, length) {
        array.byteLength;
        if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError("'offset' is out of bounds");
        if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("'length' is out of bounds");
        array = void 0 === byteOffset && void 0 === length ? new Uint8Array(array) : void 0 === length ? new Uint8Array(array, byteOffset) : new Uint8Array(array, byteOffset, length);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = array;
          that.__proto__ = Buffer.prototype;
        } else that = fromArrayLike(that, array);
        return that;
      }
      function fromObject(that, obj) {
        if (Buffer.isBuffer(obj)) {
          var len = 0 | checked(obj.length);
          that = createBuffer(that, len);
          if (0 === that.length) return that;
          obj.copy(that, 0, 0, len);
          return that;
        }
        if (obj) {
          if ("undefined" !== typeof ArrayBuffer && obj.buffer instanceof ArrayBuffer || "length" in obj) {
            if ("number" !== typeof obj.length || isnan(obj.length)) return createBuffer(that, 0);
            return fromArrayLike(that, obj);
          }
          if ("Buffer" === obj.type && isArray(obj.data)) return fromArrayLike(that, obj.data);
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      function checked(length) {
        if (length >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
        return 0 | length;
      }
      function SlowBuffer(length) {
        +length != length && (length = 0);
        return Buffer.alloc(+length);
      }
      Buffer.isBuffer = function isBuffer(b) {
        return !!(null != b && b._isBuffer);
      };
      Buffer.compare = function compare(a, b) {
        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError("Arguments must be Buffers");
        if (a === b) return 0;
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer.isEncoding = function isEncoding(encoding) {
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
      Buffer.concat = function concat(list, length) {
        if (!isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === list.length) return Buffer.alloc(0);
        var i;
        if (void 0 === length) {
          length = 0;
          for (i = 0; i < list.length; ++i) length += list[i].length;
        }
        var buffer = Buffer.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer.isBuffer(string)) return string.length;
        if ("undefined" !== typeof ArrayBuffer && "function" === typeof ArrayBuffer.isView && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) return string.byteLength;
        "string" !== typeof string && (string = "" + string);
        var len = string.length;
        if (0 === len) return 0;
        var loweredCase = false;
        for (;;) switch (encoding) {
         case "ascii":
         case "latin1":
         case "binary":
          return len;

         case "utf8":
         case "utf-8":
         case void 0:
          return utf8ToBytes(string).length;

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return 2 * len;

         case "hex":
          return len >>> 1;

         case "base64":
          return base64ToBytes(string).length;

         default:
          if (loweredCase) return utf8ToBytes(string).length;
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
        }
      }
      Buffer.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        var loweredCase = false;
        (void 0 === start || start < 0) && (start = 0);
        if (start > this.length) return "";
        (void 0 === end || end > this.length) && (end = this.length);
        if (end <= 0) return "";
        end >>>= 0;
        start >>>= 0;
        if (end <= start) return "";
        encoding || (encoding = "utf8");
        while (true) switch (encoding) {
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
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
        }
      }
      Buffer.prototype._isBuffer = true;
      function swap(b, n, m) {
        var i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var i = 0; i < len; i += 2) swap(this, i, i + 1);
        return this;
      };
      Buffer.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer.prototype.toString = function toString() {
        var length = 0 | this.length;
        if (0 === length) return "";
        if (0 === arguments.length) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer.prototype.equals = function equals(b) {
        if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return 0 === Buffer.compare(this, b);
      };
      Buffer.prototype.inspect = function inspect() {
        var str = "";
        var max = exports.INSPECT_MAX_BYTES;
        if (this.length > 0) {
          str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
          this.length > max && (str += " ... ");
        }
        return "<Buffer " + str + ">";
      };
      Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (!Buffer.isBuffer(target)) throw new TypeError("Argument must be a Buffer");
        void 0 === start && (start = 0);
        void 0 === end && (end = target ? target.length : 0);
        void 0 === thisStart && (thisStart = 0);
        void 0 === thisEnd && (thisEnd = this.length);
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
        if (thisStart >= thisEnd && start >= end) return 0;
        if (thisStart >= thisEnd) return -1;
        if (start >= end) return 1;
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (0 === buffer.length) return -1;
        if ("string" === typeof byteOffset) {
          encoding = byteOffset;
          byteOffset = 0;
        } else byteOffset > 2147483647 ? byteOffset = 2147483647 : byteOffset < -2147483648 && (byteOffset = -2147483648);
        byteOffset = +byteOffset;
        isNaN(byteOffset) && (byteOffset = dir ? 0 : buffer.length - 1);
        byteOffset < 0 && (byteOffset = buffer.length + byteOffset);
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (!dir) return -1;
          byteOffset = 0;
        }
        "string" === typeof val && (val = Buffer.from(val, encoding));
        if (Buffer.isBuffer(val)) {
          if (0 === val.length) return -1;
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        }
        if ("number" === typeof val) {
          val &= 255;
          if (Buffer.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf) return dir ? Uint8Array.prototype.indexOf.call(buffer, val, byteOffset) : Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (void 0 !== encoding) {
          encoding = String(encoding).toLowerCase();
          if ("ucs2" === encoding || "ucs-2" === encoding || "utf16le" === encoding || "utf-16le" === encoding) {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i) {
          return 1 === indexSize ? buf[i] : buf.readUInt16BE(i * indexSize);
        }
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) if (read(arr, i) === read(val, -1 === foundIndex ? 0 : i - foundIndex)) {
            -1 === foundIndex && (foundIndex = i);
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            -1 !== foundIndex && (i -= i - foundIndex);
            foundIndex = -1;
          }
        } else {
          byteOffset + valLength > arrLength && (byteOffset = arrLength - valLength);
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
        return -1 !== this.indexOf(val, byteOffset, encoding);
      };
      Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (length) {
          length = Number(length);
          length > remaining && (length = remaining);
        } else length = remaining;
        var strLen = string.length;
        if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
        length > strLen / 2 && (length = strLen / 2);
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(2 * i, 2), 16);
          if (isNaN(parsed)) return i;
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
      function latin1Write(buf, string, offset, length) {
        return asciiWrite(buf, string, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer.prototype.write = function write(string, offset, length, encoding) {
        if (void 0 === offset) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (void 0 === length && "string" === typeof offset) {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else {
          if (!isFinite(offset)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          offset |= 0;
          if (isFinite(length)) {
            length |= 0;
            void 0 === encoding && (encoding = "utf8");
          } else {
            encoding = length;
            length = void 0;
          }
        }
        var remaining = this.length - offset;
        (void 0 === length || length > remaining) && (length = remaining);
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        encoding || (encoding = "utf8");
        var loweredCase = false;
        for (;;) switch (encoding) {
         case "hex":
          return hexWrite(this, string, offset, length);

         case "utf8":
         case "utf-8":
          return utf8Write(this, string, offset, length);

         case "ascii":
          return asciiWrite(this, string, offset, length);

         case "latin1":
         case "binary":
          return latin1Write(this, string, offset, length);

         case "base64":
          return base64Write(this, string, offset, length);

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return ucs2Write(this, string, offset, length);

         default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
        }
      };
      Buffer.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        return 0 === start && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end));
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
             case 1:
              firstByte < 128 && (codePoint = firstByte);
              break;

             case 2:
              secondByte = buf[i + 1];
              if (128 === (192 & secondByte)) {
                tempCodePoint = (31 & firstByte) << 6 | 63 & secondByte;
                tempCodePoint > 127 && (codePoint = tempCodePoint);
              }
              break;

             case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if (128 === (192 & secondByte) && 128 === (192 & thirdByte)) {
                tempCodePoint = (15 & firstByte) << 12 | (63 & secondByte) << 6 | 63 & thirdByte;
                tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343) && (codePoint = tempCodePoint);
              }
              break;

             case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if (128 === (192 & secondByte) && 128 === (192 & thirdByte) && 128 === (192 & fourthByte)) {
                tempCodePoint = (15 & firstByte) << 18 | (63 & secondByte) << 12 | (63 & thirdByte) << 6 | 63 & fourthByte;
                tempCodePoint > 65535 && tempCodePoint < 1114112 && (codePoint = tempCodePoint);
              }
            }
          }
          if (null === codePoint) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | 1023 & codePoint;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
        var res = "";
        var i = 0;
        while (i < len) res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
        return res;
      }
      function asciiSlice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) ret += String.fromCharCode(127 & buf[i]);
        return ret;
      }
      function latin1Slice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) ret += String.fromCharCode(buf[i]);
        return ret;
      }
      function hexSlice(buf, start, end) {
        var len = buf.length;
        (!start || start < 0) && (start = 0);
        (!end || end < 0 || end > len) && (end = len);
        var out = "";
        for (var i = start; i < end; ++i) out += toHex(buf[i]);
        return out;
      }
      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length; i += 2) res += String.fromCharCode(bytes[i] + 256 * bytes[i + 1]);
        return res;
      }
      Buffer.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = void 0 === end ? len : ~~end;
        if (start < 0) {
          start += len;
          start < 0 && (start = 0);
        } else start > len && (start = len);
        if (end < 0) {
          end += len;
          end < 0 && (end = 0);
        } else end > len && (end = len);
        end < start && (end = start);
        var newBuf;
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) newBuf[i] = this[i + start];
        }
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 256)) val += this[offset + i] * mul;
        return val;
      };
      Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset + --byteLength];
        var mul = 1;
        while (byteLength > 0 && (mul *= 256)) val += this[offset + --byteLength] * mul;
        return val;
      };
      Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        noAssert || checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 16777216 * this[offset + 3];
      };
      Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return 16777216 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 256)) val += this[offset + i] * mul;
        mul *= 128;
        val >= mul && (val -= Math.pow(2, 8 * byteLength));
        return val;
      };
      Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var i = byteLength;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) val += this[offset + --i] * mul;
        mul *= 128;
        val >= mul && (val -= Math.pow(2, 8 * byteLength));
        return val;
      };
      Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
        noAssert || checkOffset(offset, 1, this.length);
        if (!(128 & this[offset])) return this[offset];
        return -1 * (255 - this[offset] + 1);
      };
      Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return 32768 & val ? 4294901760 | val : val;
      };
      Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return 32768 & val ? 4294901760 | val : val;
      };
      Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        noAssert || checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        noAssert || checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        byteLength |= 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = 255 & value;
        while (++i < byteLength && (mul *= 256)) this[offset + i] = value / mul & 255;
        return offset + byteLength;
      };
      Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        byteLength |= 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var i = byteLength - 1;
        var mul = 1;
        this[offset + i] = 255 & value;
        while (--i >= 0 && (mul *= 256)) this[offset + i] = value / mul & 255;
        return offset + byteLength;
      };
      Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 1, 255, 0);
        Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value));
        this[offset] = 255 & value;
        return offset + 1;
      };
      function objectWriteUInt16(buf, value, offset, littleEndian) {
        value < 0 && (value = 65535 + value + 1);
        for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i);
      }
      Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
        } else objectWriteUInt16(this, value, offset, true);
        return offset + 2;
      };
      Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = 255 & value;
        } else objectWriteUInt16(this, value, offset, false);
        return offset + 2;
      };
      function objectWriteUInt32(buf, value, offset, littleEndian) {
        value < 0 && (value = 4294967295 + value + 1);
        for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) buf[offset + i] = value >>> 8 * (littleEndian ? i : 3 - i) & 255;
      }
      Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = 255 & value;
        } else objectWriteUInt32(this, value, offset, true);
        return offset + 4;
      };
      Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = 255 & value;
        } else objectWriteUInt32(this, value, offset, false);
        return offset + 4;
      };
      Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = 255 & value;
        while (++i < byteLength && (mul *= 256)) {
          value < 0 && 0 === sub && 0 !== this[offset + i - 1] && (sub = 1);
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = byteLength - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = 255 & value;
        while (--i >= 0 && (mul *= 256)) {
          value < 0 && 0 === sub && 0 !== this[offset + i + 1] && (sub = 1);
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 1, 127, -128);
        Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value));
        value < 0 && (value = 255 + value + 1);
        this[offset] = 255 & value;
        return offset + 1;
      };
      Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
        } else objectWriteUInt16(this, value, offset, true);
        return offset + 2;
      };
      Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = 255 & value;
        } else objectWriteUInt16(this, value, offset, false);
        return offset + 2;
      };
      Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else objectWriteUInt32(this, value, offset, true);
        return offset + 4;
      };
      Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648);
        value < 0 && (value = 4294967295 + value + 1);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = 255 & value;
        } else objectWriteUInt32(this, value, offset, false);
        return offset + 4;
      };
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        noAssert || checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        noAssert || checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer.prototype.copy = function copy(target, targetStart, start, end) {
        start || (start = 0);
        end || 0 === end || (end = this.length);
        targetStart >= target.length && (targetStart = target.length);
        targetStart || (targetStart = 0);
        end > 0 && end < start && (end = start);
        if (end === start) return 0;
        if (0 === target.length || 0 === this.length) return 0;
        if (targetStart < 0) throw new RangeError("targetStart out of bounds");
        if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        end > this.length && (end = this.length);
        target.length - targetStart < end - start && (end = target.length - targetStart + start);
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) for (i = len - 1; i >= 0; --i) target[i + targetStart] = this[i + start]; else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) for (i = 0; i < len; ++i) target[i + targetStart] = this[i + start]; else Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
        return len;
      };
      Buffer.prototype.fill = function fill(val, start, end, encoding) {
        if ("string" === typeof val) {
          if ("string" === typeof start) {
            encoding = start;
            start = 0;
            end = this.length;
          } else if ("string" === typeof end) {
            encoding = end;
            end = this.length;
          }
          if (1 === val.length) {
            var code = val.charCodeAt(0);
            code < 256 && (val = code);
          }
          if (void 0 !== encoding && "string" !== typeof encoding) throw new TypeError("encoding must be a string");
          if ("string" === typeof encoding && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        } else "number" === typeof val && (val &= 255);
        if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
        if (end <= start) return this;
        start >>>= 0;
        end = void 0 === end ? this.length : end >>> 0;
        val || (val = 0);
        var i;
        if ("number" === typeof val) for (i = start; i < end; ++i) this[i] = val; else {
          var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len];
        }
        return this;
      };
      var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = stringtrim(str).replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) str += "=";
        return str;
      }
      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, "");
      }
      function toHex(n) {
        if (n < 16) return "0" + n.toString(16);
        return n.toString(16);
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              if (i + 1 === length) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              (units -= 3) > -1 && bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = 65536 + (leadSurrogate - 55296 << 10 | codePoint - 56320);
          } else leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 6 | 192, 63 & codePoint | 128);
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
          } else {
            if (!(codePoint < 1114112)) throw new Error("Invalid code point");
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) byteArray.push(255 & str.charCodeAt(i));
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isnan(val) {
        return val !== val;
      }
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    "base64-js": 1,
    ieee754: 4,
    isarray: 3
  } ],
  3: [ function(require, module, exports) {
    var toString = {}.toString;
    module.exports = Array.isArray || function(arr) {
      return "[object Array]" == toString.call(arr);
    };
  }, {} ],
  4: [ function(require, module, exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = 8 * nBytes - mLen - 1;
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
      for (;nBits > 0; e = 256 * e + buffer[offset + i], i += d, nBits -= 8) ;
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (;nBits > 0; m = 256 * m + buffer[offset + i], i += d, nBits -= 8) ;
      if (0 === e) e = 1 - eBias; else {
        if (e === eMax) return m ? NaN : Infinity * (s ? -1 : 1);
        m += Math.pow(2, mLen);
        e -= eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = 8 * nBytes - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || Infinity === value) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e += eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (;mLen >= 8; buffer[offset + i] = 255 & m, i += d, m /= 256, mLen -= 8) ;
      e = e << mLen | m;
      eLen += mLen;
      for (;eLen > 0; buffer[offset + i] = 255 & e, i += d, e /= 256, eLen -= 8) ;
      buffer[offset + i - d] |= 128 * s;
    };
  }, {} ],
  5: [ function(require, module, exports) {
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        cachedSetTimeout = "function" === typeof setTimeout ? setTimeout : defaultSetTimout;
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        cachedClearTimeout = "function" === typeof clearTimeout ? clearTimeout : defaultClearTimeout;
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) return;
      draining = false;
      currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1;
      queue.length && drainQueue();
    }
    function drainQueue() {
      if (draining) return;
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) currentQueue && currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
      queue.push(new Item(fun, args));
      1 !== queue.length || draining || runTimeout(drainQueue);
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
    process.versions = {};
    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    process.listeners = function(name) {
      return [];
    };
    process.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process.cwd = function() {
      return "/";
    };
    process.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process.umask = function() {
      return 0;
    };
  }, {} ],
  axios: [ function(require, module, exports) {
    (function(process, global, Buffer) {
      "use strict";
      cc._RF.push(module, "3b0b8UFtolFgaFxaKBRExu9", "axios");
      "use strict";
      !function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).axios = t();
      }(void 0, function() {
        function e(e) {
          var r, n;
          function o(r, n) {
            try {
              var a = e[r](n), u = a.value, s = u instanceof t;
              Promise.resolve(s ? u.v : u).then(function(t) {
                if (s) {
                  var n = "return" === r ? "return" : "next";
                  if (!u.k || t.done) return o(n, t);
                  t = e[n](t).value;
                }
                i(a.done ? "return" : "normal", t);
              }, function(e) {
                o("throw", e);
              });
            } catch (e) {
              i("throw", e);
            }
          }
          function i(e, t) {
            switch (e) {
             case "return":
              r.resolve({
                value: t,
                done: !0
              });
              break;

             case "throw":
              r.reject(t);
              break;

             default:
              r.resolve({
                value: t,
                done: !1
              });
            }
            (r = r.next) ? o(r.key, r.arg) : n = null;
          }
          this._invoke = function(e, t) {
            return new Promise(function(i, a) {
              var u = {
                key: e,
                arg: t,
                resolve: i,
                reject: a,
                next: null
              };
              n ? n = n.next = u : (r = n = u, o(e, t));
            });
          }, "function" != typeof e["return"] && (this["return"] = void 0);
        }
        function t(e, t) {
          this.v = e, this.k = t;
        }
        function r(e) {
          var r = {}, n = !1;
          function o(r, o) {
            return n = !0, o = new Promise(function(t) {
              t(e[r](o));
            }), {
              done: !1,
              value: new t(o, 1)
            };
          }
          return r["undefined" != typeof Symbol && Symbol.iterator || "@@iterator"] = function() {
            return this;
          }, r.next = function(e) {
            return n ? (n = !1, e) : o("next", e);
          }, "function" == typeof e["throw"] && (r["throw"] = function(e) {
            if (n) throw n = !1, e;
            return o("throw", e);
          }), "function" == typeof e["return"] && (r["return"] = function(e) {
            return n ? (n = !1, e) : o("return", e);
          }), r;
        }
        function n(e) {
          var t, r, n, i = 2;
          for ("undefined" != typeof Symbol && (r = Symbol.asyncIterator, n = Symbol.iterator); i--; ) {
            if (r && null != (t = e[r])) return t.call(e);
            if (n && null != (t = e[n])) return new o(t.call(e));
            r = "@@asyncIterator", n = "@@iterator";
          }
          throw new TypeError("Object is not async iterable");
        }
        function o(e) {
          function t(e) {
            if (Object(e) !== e) return Promise.reject(new TypeError(e + " is not an object."));
            var t = e.done;
            return Promise.resolve(e.value).then(function(e) {
              return {
                value: e,
                done: t
              };
            });
          }
          return o = function o(e) {
            this.s = e, this.n = e.next;
          }, o.prototype = {
            s: null,
            n: null,
            next: function next() {
              return t(this.n.apply(this.s, arguments));
            },
            return: function _return(e) {
              var r = this.s["return"];
              return void 0 === r ? Promise.resolve({
                value: e,
                done: !0
              }) : t(r.apply(this.s, arguments));
            },
            throw: function _throw(e) {
              var r = this.s["return"];
              return void 0 === r ? Promise.reject(e) : t(r.apply(this.s, arguments));
            }
          }, new o(e);
        }
        function i(e) {
          return new t(e, 0);
        }
        function a(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })), r.push.apply(r, n);
          }
          return r;
        }
        function u(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? a(Object(r), !0).forEach(function(t) {
              m(e, t, r[t]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : a(Object(r)).forEach(function(t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
            });
          }
          return e;
        }
        function s() {
          s = function s() {
            return t;
          };
          var e, t = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function(e, t, r) {
            e[t] = r.value;
          }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", u = i.asyncIterator || "@@asyncIterator", c = i.toStringTag || "@@toStringTag";
          function f(e, t, r) {
            return Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0
            }), e[t];
          }
          try {
            f({}, "");
          } catch (e) {
            f = function f(e, t, r) {
              return e[t] = r;
            };
          }
          function l(e, t, r, n) {
            var i = t && t.prototype instanceof m ? t : m, a = Object.create(i.prototype), u = new P(n || []);
            return o(a, "_invoke", {
              value: T(e, r, u)
            }), a;
          }
          function p(e, t, r) {
            try {
              return {
                type: "normal",
                arg: e.call(t, r)
              };
            } catch (e) {
              return {
                type: "throw",
                arg: e
              };
            }
          }
          t.wrap = l;
          var h = "suspendedStart", d = "executing", v = "completed", y = {};
          function m() {}
          function b() {}
          function g() {}
          var w = {};
          f(w, a, function() {
            return this;
          });
          var E = Object.getPrototypeOf, O = E && E(E(L([])));
          O && O !== r && n.call(O, a) && (w = O);
          var S = g.prototype = m.prototype = Object.create(w);
          function x(e) {
            [ "next", "throw", "return" ].forEach(function(t) {
              f(e, t, function(e) {
                return this._invoke(t, e);
              });
            });
          }
          function R(e, t) {
            function r(o, i, a, u) {
              var s = p(e[o], e, i);
              if ("throw" !== s.type) {
                var c = s.arg, f = c.value;
                return f && "object" == typeof f && n.call(f, "__await") ? t.resolve(f.__await).then(function(e) {
                  r("next", e, a, u);
                }, function(e) {
                  r("throw", e, a, u);
                }) : t.resolve(f).then(function(e) {
                  c.value = e, a(c);
                }, function(e) {
                  return r("throw", e, a, u);
                });
              }
              u(s.arg);
            }
            var i;
            o(this, "_invoke", {
              value: function value(e, n) {
                function o() {
                  return new t(function(t, o) {
                    r(e, n, t, o);
                  });
                }
                return i = i ? i.then(o, o) : o();
              }
            });
          }
          function T(t, r, n) {
            var o = h;
            return function(i, a) {
              if (o === d) throw new Error("Generator is already running");
              if (o === v) {
                if ("throw" === i) throw a;
                return {
                  value: e,
                  done: !0
                };
              }
              for (n.method = i, n.arg = a; ;) {
                var u = n.delegate;
                if (u) {
                  var s = k(u, n);
                  if (s) {
                    if (s === y) continue;
                    return s;
                  }
                }
                if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                  if (o === h) throw o = v, n.arg;
                  n.dispatchException(n.arg);
                } else "return" === n.method && n.abrupt("return", n.arg);
                o = d;
                var c = p(t, r, n);
                if ("normal" === c.type) {
                  if (o = n.done ? v : "suspendedYield", c.arg === y) continue;
                  return {
                    value: c.arg,
                    done: n.done
                  };
                }
                "throw" === c.type && (o = v, n.method = "throw", n.arg = c.arg);
              }
            };
          }
          function k(t, r) {
            var n = r.method, o = t.iterator[n];
            if (o === e) return r.delegate = null, "throw" === n && t.iterator["return"] && (r.method = "return", 
            r.arg = e, k(t, r), "throw" === r.method) || "return" !== n && (r.method = "throw", 
            r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
            var i = p(o, t.iterator, r.arg);
            if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, 
            y;
            var a = i.arg;
            return a ? a.done ? (r[t.resultName] = a.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", 
            r.arg = e), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), 
            r.delegate = null, y);
          }
          function j(e) {
            var t = {
              tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), 
            this.tryEntries.push(t);
          }
          function A(e) {
            var t = e.completion || {};
            t.type = "normal", delete t.arg, e.completion = t;
          }
          function P(e) {
            this.tryEntries = [ {
              tryLoc: "root"
            } ], e.forEach(j, this), this.reset(!0);
          }
          function L(t) {
            if (t || "" === t) {
              var r = t[a];
              if (r) return r.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var o = -1, i = function r() {
                  for (;++o < t.length; ) if (n.call(t, o)) return r.value = t[o], r.done = !1, r;
                  return r.value = e, r.done = !0, r;
                };
                return i.next = i;
              }
            }
            throw new TypeError(typeof t + " is not iterable");
          }
          return b.prototype = g, o(S, "constructor", {
            value: g,
            configurable: !0
          }), o(g, "constructor", {
            value: b,
            configurable: !0
          }), b.displayName = f(g, c, "GeneratorFunction"), t.isGeneratorFunction = function(e) {
            var t = "function" == typeof e && e.constructor;
            return !!t && (t === b || "GeneratorFunction" === (t.displayName || t.name));
          }, t.mark = function(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, g) : (e.__proto__ = g, f(e, c, "GeneratorFunction")), 
            e.prototype = Object.create(S), e;
          }, t.awrap = function(e) {
            return {
              __await: e
            };
          }, x(R.prototype), f(R.prototype, u, function() {
            return this;
          }), t.AsyncIterator = R, t.async = function(e, r, n, o, i) {
            void 0 === i && (i = Promise);
            var a = new R(l(e, r, n, o), i);
            return t.isGeneratorFunction(r) ? a : a.next().then(function(e) {
              return e.done ? e.value : a.next();
            });
          }, x(S), f(S, c, "Generator"), f(S, a, function() {
            return this;
          }), f(S, "toString", function() {
            return "[object Generator]";
          }), t.keys = function(e) {
            var t = Object(e), r = [];
            for (var n in t) r.push(n);
            return r.reverse(), function e() {
              for (;r.length; ) {
                var n = r.pop();
                if (n in t) return e.value = n, e.done = !1, e;
              }
              return e.done = !0, e;
            };
          }, t.values = L, P.prototype = {
            constructor: P,
            reset: function reset(t) {
              if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, 
              this.method = "next", this.arg = e, this.tryEntries.forEach(A), !t) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e);
            },
            stop: function stop() {
              this.done = !0;
              var e = this.tryEntries[0].completion;
              if ("throw" === e.type) throw e.arg;
              return this.rval;
            },
            dispatchException: function dispatchException(t) {
              if (this.done) throw t;
              var r = this;
              function o(n, o) {
                return u.type = "throw", u.arg = t, r.next = n, o && (r.method = "next", r.arg = e), 
                !!o;
              }
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var a = this.tryEntries[i], u = a.completion;
                if ("root" === a.tryLoc) return o("end");
                if (a.tryLoc <= this.prev) {
                  var s = n.call(a, "catchLoc"), c = n.call(a, "finallyLoc");
                  if (s && c) {
                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                    if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                  } else if (s) {
                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  } else {
                    if (!c) throw new Error("try statement without catch or finally");
                    if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                  }
                }
              }
            },
            abrupt: function abrupt(e, t) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var o = this.tryEntries[r];
                if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                  var i = o;
                  break;
                }
              }
              i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
              var a = i ? i.completion : {};
              return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, 
              y) : this.complete(a);
            },
            complete: function complete(e, t) {
              if ("throw" === e.type) throw e.arg;
              return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, 
              this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), 
              y;
            },
            finish: function finish(e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var r = this.tryEntries[t];
                if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), A(r), y;
              }
            },
            catch: function _catch(e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var r = this.tryEntries[t];
                if (r.tryLoc === e) {
                  var n = r.completion;
                  if ("throw" === n.type) {
                    var o = n.arg;
                    A(r);
                  }
                  return o;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function delegateYield(t, r, n) {
              return this.delegate = {
                iterator: L(t),
                resultName: r,
                nextLoc: n
              }, "next" === this.method && (this.arg = e), y;
            }
          }, t;
        }
        function c(e) {
          var t = function(e, t) {
            if ("object" != typeof e || !e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, t || "default");
              if ("object" != typeof n) return n;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === t ? String : Number)(e);
          }(e, "string");
          return "symbol" == typeof t ? t : String(t);
        }
        function f(e) {
          return f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
          } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
          }, f(e);
        }
        function l(t) {
          return function() {
            return new e(t.apply(this, arguments));
          };
        }
        function p(e, t, r, n, o, i, a) {
          try {
            var u = e[i](a), s = u.value;
          } catch (e) {
            return void r(e);
          }
          u.done ? t(s) : Promise.resolve(s).then(n, o);
        }
        function h(e) {
          return function() {
            var t = this, r = arguments;
            return new Promise(function(n, o) {
              var i = e.apply(t, r);
              function a(e) {
                p(i, n, o, a, u, "next", e);
              }
              function u(e) {
                p(i, n, o, a, u, "throw", e);
              }
              a(void 0);
            });
          };
        }
        function d(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        function v(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, c(n.key), n);
          }
        }
        function y(e, t, r) {
          return t && v(e.prototype, t), r && v(e, r), Object.defineProperty(e, "prototype", {
            writable: !1
          }), e;
        }
        function m(e, t, r) {
          return (t = c(t)) in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[t] = r, e;
        }
        function b(e, t) {
          return w(e) || function(e, t) {
            var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null != r) {
              var n, o, i, a, u = [], s = !0, c = !1;
              try {
                if (i = (r = r.call(e)).next, 0 === t) {
                  if (Object(r) !== r) return;
                  s = !1;
                } else for (;!(s = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
              } catch (e) {
                c = !0, o = e;
              } finally {
                try {
                  if (!s && null != r["return"] && (a = r["return"](), Object(a) !== a)) return;
                } finally {
                  if (c) throw o;
                }
              }
              return u;
            }
          }(e, t) || O(e, t) || x();
        }
        function g(e) {
          return function(e) {
            if (Array.isArray(e)) return S(e);
          }(e) || E(e) || O(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }();
        }
        function w(e) {
          if (Array.isArray(e)) return e;
        }
        function E(e) {
          if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
        }
        function O(e, t) {
          if (e) {
            if ("string" == typeof e) return S(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? S(e, t) : void 0;
          }
        }
        function S(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
          return n;
        }
        function x() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function R(e, t) {
          return function() {
            return e.apply(t, arguments);
          };
        }
        e.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
          return this;
        }, e.prototype.next = function(e) {
          return this._invoke("next", e);
        }, e.prototype["throw"] = function(e) {
          return this._invoke("throw", e);
        }, e.prototype["return"] = function(e) {
          return this._invoke("return", e);
        };
        var T, k = Object.prototype.toString, j = Object.getPrototypeOf, A = (T = Object.create(null), 
        function(e) {
          var t = k.call(e);
          return T[t] || (T[t] = t.slice(8, -1).toLowerCase());
        }), P = function P(e) {
          return e = e.toLowerCase(), function(t) {
            return A(t) === e;
          };
        }, L = function L(e) {
          return function(t) {
            return f(t) === e;
          };
        }, N = Array.isArray, _ = L("undefined");
        var C = P("ArrayBuffer");
        var F = L("string"), U = L("function"), B = L("number"), D = function D(e) {
          return null !== e && "object" === f(e);
        }, I = function I(e) {
          if ("object" !== A(e)) return !1;
          var t = j(e);
          return !(null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t) || Symbol.toStringTag in e || Symbol.iterator in e);
        }, q = P("Date"), M = P("File"), z = P("Blob"), H = P("FileList"), J = P("URLSearchParams"), W = b([ "ReadableStream", "Request", "Response", "Headers" ].map(P), 4), G = W[0], K = W[1], V = W[2], X = W[3];
        function $(e, t) {
          var r, n, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i = o.allOwnKeys, a = void 0 !== i && i;
          if (null != e) if ("object" !== f(e) && (e = [ e ]), N(e)) for (r = 0, n = e.length; r < n; r++) t.call(null, e[r], r, e); else {
            var u, s = a ? Object.getOwnPropertyNames(e) : Object.keys(e), c = s.length;
            for (r = 0; r < c; r++) u = s[r], t.call(null, e[u], u, e);
          }
        }
        function Y(e, t) {
          t = t.toLowerCase();
          for (var r, n = Object.keys(e), o = n.length; o-- > 0; ) if (t === (r = n[o]).toLowerCase()) return r;
          return null;
        }
        var Q = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : global, Z = function Z(e) {
          return !_(e) && e !== Q;
        };
        var ee, te = (ee = "undefined" != typeof Uint8Array && j(Uint8Array), function(e) {
          return ee && e instanceof ee;
        }), re = P("HTMLFormElement"), ne = function(e) {
          var t = Object.prototype.hasOwnProperty;
          return function(e, r) {
            return t.call(e, r);
          };
        }(), oe = P("RegExp"), ie = function ie(e, t) {
          var r = Object.getOwnPropertyDescriptors(e), n = {};
          $(r, function(r, o) {
            var i;
            !1 !== (i = t(r, o, e)) && (n[o] = i || r);
          }), Object.defineProperties(e, n);
        }, ae = "abcdefghijklmnopqrstuvwxyz", ue = "0123456789", se = {
          DIGIT: ue,
          ALPHA: ae,
          ALPHA_DIGIT: ae + ae.toUpperCase() + ue
        };
        var ce, fe, le, pe, he = P("AsyncFunction"), de = (ce = "function" == typeof setImmediate, 
        fe = U(Q.postMessage), ce ? setImmediate : fe ? (le = "axios@".concat(Math.random()), 
        pe = [], Q.addEventListener("message", function(e) {
          var t = e.source, r = e.data;
          t === Q && r === le && pe.length && pe.shift()();
        }, !1), function(e) {
          pe.push(e), Q.postMessage(le, "*");
        }) : function(e) {
          return setTimeout(e);
        }), ve = "undefined" != typeof queueMicrotask ? queueMicrotask.bind(Q) : "undefined" != typeof process && process.nextTick || de, ye = {
          isArray: N,
          isArrayBuffer: C,
          isBuffer: function isBuffer(e) {
            return null !== e && !_(e) && null !== e.constructor && !_(e.constructor) && U(e.constructor.isBuffer) && e.constructor.isBuffer(e);
          },
          isFormData: function isFormData(e) {
            var t;
            return e && ("function" == typeof FormData && e instanceof FormData || U(e.append) && ("formdata" === (t = A(e)) || "object" === t && U(e.toString) && "[object FormData]" === e.toString()));
          },
          isArrayBufferView: function isArrayBufferView(e) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && C(e.buffer);
          },
          isString: F,
          isNumber: B,
          isBoolean: function isBoolean(e) {
            return !0 === e || !1 === e;
          },
          isObject: D,
          isPlainObject: I,
          isReadableStream: G,
          isRequest: K,
          isResponse: V,
          isHeaders: X,
          isUndefined: _,
          isDate: q,
          isFile: M,
          isBlob: z,
          isRegExp: oe,
          isFunction: U,
          isStream: function isStream(e) {
            return D(e) && U(e.pipe);
          },
          isURLSearchParams: J,
          isTypedArray: te,
          isFileList: H,
          forEach: $,
          merge: function e() {
            for (var t = Z(this) && this || {}, r = t.caseless, n = {}, o = function o(t, _o) {
              var i = r && Y(n, _o) || _o;
              I(n[i]) && I(t) ? n[i] = e(n[i], t) : I(t) ? n[i] = e({}, t) : N(t) ? n[i] = t.slice() : n[i] = t;
            }, i = 0, a = arguments.length; i < a; i++) arguments[i] && $(arguments[i], o);
            return n;
          },
          extend: function extend(e, t, r) {
            var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, o = n.allOwnKeys;
            return $(t, function(t, n) {
              r && U(t) ? e[n] = R(t, r) : e[n] = t;
            }, {
              allOwnKeys: o
            }), e;
          },
          trim: function trim(e) {
            return e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
          },
          stripBOM: function stripBOM(e) {
            return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e;
          },
          inherits: function inherits(e, t, r, n) {
            e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
              value: t.prototype
            }), r && Object.assign(e.prototype, r);
          },
          toFlatObject: function toFlatObject(e, t, r, n) {
            var o, i, a, u = {};
            if (t = t || {}, null == e) return t;
            do {
              for (i = (o = Object.getOwnPropertyNames(e)).length; i-- > 0; ) a = o[i], n && !n(a, e, t) || u[a] || (t[a] = e[a], 
              u[a] = !0);
              e = !1 !== r && j(e);
            } while (e && (!r || r(e, t)) && e !== Object.prototype);
            return t;
          },
          kindOf: A,
          kindOfTest: P,
          endsWith: function endsWith(e, t, r) {
            e = String(e), (void 0 === r || r > e.length) && (r = e.length), r -= t.length;
            var n = e.indexOf(t, r);
            return -1 !== n && n === r;
          },
          toArray: function toArray(e) {
            if (!e) return null;
            if (N(e)) return e;
            var t = e.length;
            if (!B(t)) return null;
            for (var r = new Array(t); t-- > 0; ) r[t] = e[t];
            return r;
          },
          forEachEntry: function forEachEntry(e, t) {
            for (var r, n = (e && e[Symbol.iterator]).call(e); (r = n.next()) && !r.done; ) {
              var o = r.value;
              t.call(e, o[0], o[1]);
            }
          },
          matchAll: function matchAll(e, t) {
            for (var r, n = []; null !== (r = e.exec(t)); ) n.push(r);
            return n;
          },
          isHTMLForm: re,
          hasOwnProperty: ne,
          hasOwnProp: ne,
          reduceDescriptors: ie,
          freezeMethods: function freezeMethods(e) {
            ie(e, function(t, r) {
              if (U(e) && -1 !== [ "arguments", "caller", "callee" ].indexOf(r)) return !1;
              var n = e[r];
              U(n) && (t.enumerable = !1, "writable" in t ? t.writable = !1 : t.set || (t.set = function() {
                throw Error("Can not rewrite read-only method '" + r + "'");
              }));
            });
          },
          toObjectSet: function toObjectSet(e, t) {
            var r = {}, n = function n(e) {
              e.forEach(function(e) {
                r[e] = !0;
              });
            };
            return N(e) ? n(e) : n(String(e).split(t)), r;
          },
          toCamelCase: function toCamelCase(e) {
            return e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e, t, r) {
              return t.toUpperCase() + r;
            });
          },
          noop: function noop() {},
          toFiniteNumber: function toFiniteNumber(e, t) {
            return null != e && Number.isFinite(e = +e) ? e : t;
          },
          findKey: Y,
          global: Q,
          isContextDefined: Z,
          ALPHABET: se,
          generateString: function generateString() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 16, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : se.ALPHA_DIGIT, r = "", n = t.length; e--; ) r += t[Math.random() * n | 0];
            return r;
          },
          isSpecCompliantForm: function isSpecCompliantForm(e) {
            return !!(e && U(e.append) && "FormData" === e[Symbol.toStringTag] && e[Symbol.iterator]);
          },
          toJSONObject: function toJSONObject(e) {
            var t = new Array(10);
            return function e(r, n) {
              if (D(r)) {
                if (t.indexOf(r) >= 0) return;
                if (!("toJSON" in r)) {
                  t[n] = r;
                  var o = N(r) ? [] : {};
                  return $(r, function(t, r) {
                    var i = e(t, n + 1);
                    !_(i) && (o[r] = i);
                  }), t[n] = void 0, o;
                }
              }
              return r;
            }(e, 0);
          },
          isAsyncFn: he,
          isThenable: function isThenable(e) {
            return e && (D(e) || U(e)) && U(e.then) && U(e["catch"]);
          },
          setImmediate: de,
          asap: ve
        };
        function me(e, t, r, n, o) {
          Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, 
          this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), 
          n && (this.request = n), o && (this.response = o, this.status = o.status ? o.status : null);
        }
        ye.inherits(me, Error, {
          toJSON: function toJSON() {
            return {
              message: this.message,
              name: this.name,
              description: this.description,
              number: this.number,
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              config: ye.toJSONObject(this.config),
              code: this.code,
              status: this.status
            };
          }
        });
        var be = me.prototype, ge = {};
        [ "ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL" ].forEach(function(e) {
          ge[e] = {
            value: e
          };
        }), Object.defineProperties(me, ge), Object.defineProperty(be, "isAxiosError", {
          value: !0
        }), me.from = function(e, t, r, n, o, i) {
          var a = Object.create(be);
          return ye.toFlatObject(e, a, function(e) {
            return e !== Error.prototype;
          }, function(e) {
            return "isAxiosError" !== e;
          }), me.call(a, e.message, t, r, n, o), a.cause = e, a.name = e.name, i && Object.assign(a, i), 
          a;
        };
        function we(e) {
          return ye.isPlainObject(e) || ye.isArray(e);
        }
        function Ee(e) {
          return ye.endsWith(e, "[]") ? e.slice(0, -2) : e;
        }
        function Oe(e, t, r) {
          return e ? e.concat(t).map(function(e, t) {
            return e = Ee(e), !r && t ? "[" + e + "]" : e;
          }).join(r ? "." : "") : t;
        }
        var Se = ye.toFlatObject(ye, {}, null, function(e) {
          return /^is[A-Z]/.test(e);
        });
        function xe(e, t, r) {
          if (!ye.isObject(e)) throw new TypeError("target must be an object");
          t = t || new FormData();
          var n = (r = ye.toFlatObject(r, {
            metaTokens: !0,
            dots: !1,
            indexes: !1
          }, !1, function(e, t) {
            return !ye.isUndefined(t[e]);
          })).metaTokens, o = r.visitor || c, i = r.dots, a = r.indexes, u = (r.Blob || "undefined" != typeof Blob && Blob) && ye.isSpecCompliantForm(t);
          if (!ye.isFunction(o)) throw new TypeError("visitor must be a function");
          function s(e) {
            if (null === e) return "";
            if (ye.isDate(e)) return e.toISOString();
            if (!u && ye.isBlob(e)) throw new me("Blob is not supported. Use a Buffer instead.");
            return ye.isArrayBuffer(e) || ye.isTypedArray(e) ? u && "function" == typeof Blob ? new Blob([ e ]) : Buffer.from(e) : e;
          }
          function c(e, r, o) {
            var u = e;
            if (e && !o && "object" === f(e)) if (ye.endsWith(r, "{}")) r = n ? r : r.slice(0, -2), 
            e = JSON.stringify(e); else if (ye.isArray(e) && function(e) {
              return ye.isArray(e) && !e.some(we);
            }(e) || (ye.isFileList(e) || ye.endsWith(r, "[]")) && (u = ye.toArray(e))) return r = Ee(r), 
            u.forEach(function(e, n) {
              !ye.isUndefined(e) && null !== e && t.append(!0 === a ? Oe([ r ], n, i) : null === a ? r : r + "[]", s(e));
            }), !1;
            return !!we(e) || (t.append(Oe(o, r, i), s(e)), !1);
          }
          var l = [], p = Object.assign(Se, {
            defaultVisitor: c,
            convertValue: s,
            isVisitable: we
          });
          if (!ye.isObject(e)) throw new TypeError("data must be an object");
          return function e(r, n) {
            if (!ye.isUndefined(r)) {
              if (-1 !== l.indexOf(r)) throw Error("Circular reference detected in " + n.join("."));
              l.push(r), ye.forEach(r, function(r, i) {
                !0 === (!(ye.isUndefined(r) || null === r) && o.call(t, r, ye.isString(i) ? i.trim() : i, n, p)) && e(r, n ? n.concat(i) : [ i ]);
              }), l.pop();
            }
          }(e), t;
        }
        function Re(e) {
          var t = {
            "!": "%21",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "~": "%7E",
            "%20": "+",
            "%00": "\0"
          };
          return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(e) {
            return t[e];
          });
        }
        function Te(e, t) {
          this._pairs = [], e && xe(e, this, t);
        }
        var ke = Te.prototype;
        function je(e) {
          return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        }
        function Ae(e, t, r) {
          if (!t) return e;
          var n = r && r.encode || je;
          ye.isFunction(r) && (r = {
            serialize: r
          });
          var o, i = r && r.serialize;
          if (o = i ? i(t, r) : ye.isURLSearchParams(t) ? t.toString() : new Te(t, r).toString(n)) {
            var a = e.indexOf("#");
            -1 !== a && (e = e.slice(0, a)), e += (-1 === e.indexOf("?") ? "?" : "&") + o;
          }
          return e;
        }
        ke.append = function(e, t) {
          this._pairs.push([ e, t ]);
        }, ke.toString = function(e) {
          var t = e ? function(t) {
            return e.call(this, t, Re);
          } : Re;
          return this._pairs.map(function(e) {
            return t(e[0]) + "=" + t(e[1]);
          }, "").join("&");
        };
        var Pe = function() {
          function e() {
            d(this, e), this.handlers = [];
          }
          return y(e, [ {
            key: "use",
            value: function value(e, t, r) {
              return this.handlers.push({
                fulfilled: e,
                rejected: t,
                synchronous: !!r && r.synchronous,
                runWhen: r ? r.runWhen : null
              }), this.handlers.length - 1;
            }
          }, {
            key: "eject",
            value: function value(e) {
              this.handlers[e] && (this.handlers[e] = null);
            }
          }, {
            key: "clear",
            value: function value() {
              this.handlers && (this.handlers = []);
            }
          }, {
            key: "forEach",
            value: function value(e) {
              ye.forEach(this.handlers, function(t) {
                null !== t && e(t);
              });
            }
          } ]), e;
        }(), Le = {
          silentJSONParsing: !0,
          forcedJSONParsing: !0,
          clarifyTimeoutError: !1
        }, Ne = {
          isBrowser: !0,
          classes: {
            URLSearchParams: "undefined" != typeof URLSearchParams ? URLSearchParams : Te,
            FormData: "undefined" != typeof FormData ? FormData : null,
            Blob: "undefined" != typeof Blob ? Blob : null
          },
          protocols: [ "http", "https", "file", "blob", "url", "data" ]
        }, _e = "undefined" != typeof window && "undefined" != typeof document, Ce = "object" === ("undefined" == typeof navigator ? "undefined" : f(navigator)) && navigator || void 0, Fe = _e && (!Ce || [ "ReactNative", "NativeScript", "NS" ].indexOf(Ce.product) < 0), Ue = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts, Be = _e && window.location.href || "http://localhost", De = u(u({}, Object.freeze({
          __proto__: null,
          hasBrowserEnv: _e,
          hasStandardBrowserWebWorkerEnv: Ue,
          hasStandardBrowserEnv: Fe,
          navigator: Ce,
          origin: Be
        })), Ne);
        function Ie(e) {
          function t(e, r, n, o) {
            var i = e[o++];
            if ("__proto__" === i) return !0;
            var a = Number.isFinite(+i), u = o >= e.length;
            return i = !i && ye.isArray(n) ? n.length : i, u ? (ye.hasOwnProp(n, i) ? n[i] = [ n[i], r ] : n[i] = r, 
            !a) : (n[i] && ye.isObject(n[i]) || (n[i] = []), t(e, r, n[i], o) && ye.isArray(n[i]) && (n[i] = function(e) {
              var t, r, n = {}, o = Object.keys(e), i = o.length;
              for (t = 0; t < i; t++) n[r = o[t]] = e[r];
              return n;
            }(n[i])), !a);
          }
          if (ye.isFormData(e) && ye.isFunction(e.entries)) {
            var r = {};
            return ye.forEachEntry(e, function(e, n) {
              t(function(e) {
                return ye.matchAll(/\w+|\[(\w*)]/g, e).map(function(e) {
                  return "[]" === e[0] ? "" : e[1] || e[0];
                });
              }(e), n, r, 0);
            }), r;
          }
          return null;
        }
        var qe = {
          transitional: Le,
          adapter: [ "xhr", "http", "fetch" ],
          transformRequest: [ function(e, t) {
            var r, n = t.getContentType() || "", o = n.indexOf("application/json") > -1, i = ye.isObject(e);
            if (i && ye.isHTMLForm(e) && (e = new FormData(e)), ye.isFormData(e)) return o ? JSON.stringify(Ie(e)) : e;
            if (ye.isArrayBuffer(e) || ye.isBuffer(e) || ye.isStream(e) || ye.isFile(e) || ye.isBlob(e) || ye.isReadableStream(e)) return e;
            if (ye.isArrayBufferView(e)) return e.buffer;
            if (ye.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), 
            e.toString();
            if (i) {
              if (n.indexOf("application/x-www-form-urlencoded") > -1) return function(e, t) {
                return xe(e, new De.classes.URLSearchParams(), Object.assign({
                  visitor: function visitor(e, t, r, n) {
                    return De.isNode && ye.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : n.defaultVisitor.apply(this, arguments);
                  }
                }, t));
              }(e, this.formSerializer).toString();
              if ((r = ye.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
                var a = this.env && this.env.FormData;
                return xe(r ? {
                  "files[]": e
                } : e, a && new a(), this.formSerializer);
              }
            }
            return i || o ? (t.setContentType("application/json", !1), function(e, t, r) {
              if (ye.isString(e)) try {
                return (t || JSON.parse)(e), ye.trim(e);
              } catch (e) {
                if ("SyntaxError" !== e.name) throw e;
              }
              return (r || JSON.stringify)(e);
            }(e)) : e;
          } ],
          transformResponse: [ function(e) {
            var t = this.transitional || qe.transitional, r = t && t.forcedJSONParsing, n = "json" === this.responseType;
            if (ye.isResponse(e) || ye.isReadableStream(e)) return e;
            if (e && ye.isString(e) && (r && !this.responseType || n)) {
              var o = !(t && t.silentJSONParsing) && n;
              try {
                return JSON.parse(e);
              } catch (e) {
                if (o) {
                  if ("SyntaxError" === e.name) throw me.from(e, me.ERR_BAD_RESPONSE, this, null, this.response);
                  throw e;
                }
              }
            }
            return e;
          } ],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          maxBodyLength: -1,
          env: {
            FormData: De.classes.FormData,
            Blob: De.classes.Blob
          },
          validateStatus: function validateStatus(e) {
            return e >= 200 && e < 300;
          },
          headers: {
            common: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": void 0
            }
          }
        };
        ye.forEach([ "delete", "get", "head", "post", "put", "patch" ], function(e) {
          qe.headers[e] = {};
        });
        var Me = qe, ze = ye.toObjectSet([ "age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent" ]), He = Symbol("internals");
        function Je(e) {
          return e && String(e).trim().toLowerCase();
        }
        function We(e) {
          return !1 === e || null == e ? e : ye.isArray(e) ? e.map(We) : String(e);
        }
        function Ge(e, t, r, n, o) {
          return ye.isFunction(n) ? n.call(this, t, r) : (o && (t = r), ye.isString(t) ? ye.isString(n) ? -1 !== t.indexOf(n) : ye.isRegExp(n) ? n.test(t) : void 0 : void 0);
        }
        var Ke = function(e, t) {
          function r(e) {
            d(this, r), e && this.set(e);
          }
          return y(r, [ {
            key: "set",
            value: function value(e, t, r) {
              var n = this;
              function o(e, t, r) {
                var o = Je(t);
                if (!o) throw new Error("header name must be a non-empty string");
                var i = ye.findKey(n, o);
                (!i || void 0 === n[i] || !0 === r || void 0 === r && !1 !== n[i]) && (n[i || t] = We(e));
              }
              var i = function i(e, t) {
                return ye.forEach(e, function(e, r) {
                  return o(e, r, t);
                });
              };
              if (ye.isPlainObject(e) || e instanceof this.constructor) i(e, t); else if (ye.isString(e) && (e = e.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())) i(function(e) {
                var t, r, n, o = {};
                return e && e.split("\n").forEach(function(e) {
                  n = e.indexOf(":"), t = e.substring(0, n).trim().toLowerCase(), r = e.substring(n + 1).trim(), 
                  !t || o[t] && ze[t] || ("set-cookie" === t ? o[t] ? o[t].push(r) : o[t] = [ r ] : o[t] = o[t] ? o[t] + ", " + r : r);
                }), o;
              }(e), t); else if (ye.isHeaders(e)) {
                var a, u = function(e, t) {
                  var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                  if (!r) {
                    if (Array.isArray(e) || (r = O(e)) || t && e && "number" == typeof e.length) {
                      r && (e = r);
                      var _n = 0, o = function o() {};
                      return {
                        s: o,
                        n: function n() {
                          return _n >= e.length ? {
                            done: !0
                          } : {
                            done: !1,
                            value: e[_n++]
                          };
                        },
                        e: function e(_e2) {
                          throw _e2;
                        },
                        f: o
                      };
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                  }
                  var i, a = !0, u = !1;
                  return {
                    s: function s() {
                      r = r.call(e);
                    },
                    n: function n() {
                      var e = r.next();
                      return a = e.done, e;
                    },
                    e: function e(_e3) {
                      u = !0, i = _e3;
                    },
                    f: function f() {
                      try {
                        a || null == r["return"] || r["return"]();
                      } finally {
                        if (u) throw i;
                      }
                    }
                  };
                }(e.entries());
                try {
                  for (u.s(); !(a = u.n()).done; ) {
                    var s = b(a.value, 2), c = s[0];
                    o(s[1], c, r);
                  }
                } catch (e) {
                  u.e(e);
                } finally {
                  u.f();
                }
              } else null != e && o(t, e, r);
              return this;
            }
          }, {
            key: "get",
            value: function value(e, t) {
              if (e = Je(e)) {
                var r = ye.findKey(this, e);
                if (r) {
                  var n = this[r];
                  if (!t) return n;
                  if (!0 === t) return function(e) {
                    for (var t, r = Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g; t = n.exec(e); ) r[t[1]] = t[2];
                    return r;
                  }(n);
                  if (ye.isFunction(t)) return t.call(this, n, r);
                  if (ye.isRegExp(t)) return t.exec(n);
                  throw new TypeError("parser must be boolean|regexp|function");
                }
              }
            }
          }, {
            key: "has",
            value: function value(e, t) {
              if (e = Je(e)) {
                var r = ye.findKey(this, e);
                return !(!r || void 0 === this[r] || t && !Ge(0, this[r], r, t));
              }
              return !1;
            }
          }, {
            key: "delete",
            value: function value(e, t) {
              var r = this, n = !1;
              function o(e) {
                if (e = Je(e)) {
                  var o = ye.findKey(r, e);
                  !o || t && !Ge(0, r[o], o, t) || (delete r[o], n = !0);
                }
              }
              return ye.isArray(e) ? e.forEach(o) : o(e), n;
            }
          }, {
            key: "clear",
            value: function value(e) {
              for (var t = Object.keys(this), r = t.length, n = !1; r--; ) {
                var o = t[r];
                e && !Ge(0, this[o], o, e, !0) || (delete this[o], n = !0);
              }
              return n;
            }
          }, {
            key: "normalize",
            value: function value(e) {
              var t = this, r = {};
              return ye.forEach(this, function(n, o) {
                var i = ye.findKey(r, o);
                if (i) return t[i] = We(n), void delete t[o];
                var a = e ? function(e) {
                  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, function(e, t, r) {
                    return t.toUpperCase() + r;
                  });
                }(o) : String(o).trim();
                a !== o && delete t[o], t[a] = We(n), r[a] = !0;
              }), this;
            }
          }, {
            key: "concat",
            value: function value() {
              for (var e, t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
              return (e = this.constructor).concat.apply(e, [ this ].concat(r));
            }
          }, {
            key: "toJSON",
            value: function value(e) {
              var t = Object.create(null);
              return ye.forEach(this, function(r, n) {
                null != r && !1 !== r && (t[n] = e && ye.isArray(r) ? r.join(", ") : r);
              }), t;
            }
          }, {
            key: Symbol.iterator,
            value: function value() {
              return Object.entries(this.toJSON())[Symbol.iterator]();
            }
          }, {
            key: "toString",
            value: function value() {
              return Object.entries(this.toJSON()).map(function(e) {
                var t = b(e, 2);
                return t[0] + ": " + t[1];
              }).join("\n");
            }
          }, {
            key: Symbol.toStringTag,
            get: function get() {
              return "AxiosHeaders";
            }
          } ], [ {
            key: "from",
            value: function value(e) {
              return e instanceof this ? e : new this(e);
            }
          }, {
            key: "concat",
            value: function value(e) {
              for (var t = new this(e), r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) n[o - 1] = arguments[o];
              return n.forEach(function(e) {
                return t.set(e);
              }), t;
            }
          }, {
            key: "accessor",
            value: function value(e) {
              var t = (this[He] = this[He] = {
                accessors: {}
              }).accessors, r = this.prototype;
              function n(e) {
                var n = Je(e);
                t[n] || (!function(e, t) {
                  var r = ye.toCamelCase(" " + t);
                  [ "get", "set", "has" ].forEach(function(n) {
                    Object.defineProperty(e, n + r, {
                      value: function value(e, r, o) {
                        return this[n].call(this, t, e, r, o);
                      },
                      configurable: !0
                    });
                  });
                }(r, e), t[n] = !0);
              }
              return ye.isArray(e) ? e.forEach(n) : n(e), this;
            }
          } ]), r;
        }();
        Ke.accessor([ "Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization" ]), 
        ye.reduceDescriptors(Ke.prototype, function(e, t) {
          var r = e.value, n = t[0].toUpperCase() + t.slice(1);
          return {
            get: function get() {
              return r;
            },
            set: function set(e) {
              this[n] = e;
            }
          };
        }), ye.freezeMethods(Ke);
        var Ve = Ke;
        function Xe(e, t) {
          var r = this || Me, n = t || r, o = Ve.from(n.headers), i = n.data;
          return ye.forEach(e, function(e) {
            i = e.call(r, i, o.normalize(), t ? t.status : void 0);
          }), o.normalize(), i;
        }
        function $e(e) {
          return !(!e || !e.__CANCEL__);
        }
        function Ye(e, t, r) {
          me.call(this, null == e ? "canceled" : e, me.ERR_CANCELED, t, r), this.name = "CanceledError";
        }
        function Qe(e, t, r) {
          var n = r.config.validateStatus;
          r.status && n && !n(r.status) ? t(new me("Request failed with status code " + r.status, [ me.ERR_BAD_REQUEST, me.ERR_BAD_RESPONSE ][Math.floor(r.status / 100) - 4], r.config, r.request, r)) : e(r);
        }
        function Ze(e, t) {
          e = e || 10;
          var r, n = new Array(e), o = new Array(e), i = 0, a = 0;
          return t = void 0 !== t ? t : 1e3, function(u) {
            var s = Date.now(), c = o[a];
            r || (r = s), n[i] = u, o[i] = s;
            for (var f = a, l = 0; f !== i; ) l += n[f++], f %= e;
            if ((i = (i + 1) % e) === a && (a = (a + 1) % e), !(s - r < t)) {
              var p = c && s - c;
              return p ? Math.round(1e3 * l / p) : void 0;
            }
          };
        }
        function et(e, t) {
          var r, n, o = 0, i = 1e3 / t, a = function a(t) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Date.now();
            o = i, r = null, n && (clearTimeout(n), n = null), e.apply(null, t);
          };
          return [ function() {
            for (var e = Date.now(), t = e - o, u = arguments.length, s = new Array(u), c = 0; c < u; c++) s[c] = arguments[c];
            t >= i ? a(s, e) : (r = s, n || (n = setTimeout(function() {
              n = null, a(r);
            }, i - t)));
          }, function() {
            return r && a(r);
          } ];
        }
        ye.inherits(Ye, me, {
          __CANCEL__: !0
        });
        var tt = function tt(e, t) {
          var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3, n = 0, o = Ze(50, 250);
          return et(function(r) {
            var i = r.loaded, a = r.lengthComputable ? r.total : void 0, u = i - n, s = o(u);
            n = i;
            var c = m({
              loaded: i,
              total: a,
              progress: a ? i / a : void 0,
              bytes: u,
              rate: s || void 0,
              estimated: s && a && i <= a ? (a - i) / s : void 0,
              event: r,
              lengthComputable: null != a
            }, t ? "download" : "upload", !0);
            e(c);
          }, r);
        }, rt = function rt(e, t) {
          var r = null != e;
          return [ function(n) {
            return t[0]({
              lengthComputable: r,
              total: e,
              loaded: n
            });
          }, t[1] ];
        }, nt = function nt(e) {
          return function() {
            for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
            return ye.asap(function() {
              return e.apply(void 0, r);
            });
          };
        }, ot = De.hasStandardBrowserEnv ? function(e, t) {
          return function(r) {
            return r = new URL(r, De.origin), e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port);
          };
        }(new URL(De.origin), De.navigator && /(msie|trident)/i.test(De.navigator.userAgent)) : function() {
          return !0;
        }, it = De.hasStandardBrowserEnv ? {
          write: function write(e, t, r, n, o, i) {
            var a = [ e + "=" + encodeURIComponent(t) ];
            ye.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), ye.isString(n) && a.push("path=" + n), 
            ye.isString(o) && a.push("domain=" + o), !0 === i && a.push("secure"), document.cookie = a.join("; ");
          },
          read: function read(e) {
            var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
            return t ? decodeURIComponent(t[3]) : null;
          },
          remove: function remove(e) {
            this.write(e, "", Date.now() - 864e5);
          }
        } : {
          write: function write() {},
          read: function read() {
            return null;
          },
          remove: function remove() {}
        };
        function at(e, t) {
          return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t) ? function(e, t) {
            return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
          }(e, t) : t;
        }
        var ut = function ut(e) {
          return e instanceof Ve ? u({}, e) : e;
        };
        function st(e, t) {
          t = t || {};
          var r = {};
          function n(e, t, r, n) {
            return ye.isPlainObject(e) && ye.isPlainObject(t) ? ye.merge.call({
              caseless: n
            }, e, t) : ye.isPlainObject(t) ? ye.merge({}, t) : ye.isArray(t) ? t.slice() : t;
          }
          function o(e, t, r, o) {
            return ye.isUndefined(t) ? ye.isUndefined(e) ? void 0 : n(void 0, e, 0, o) : n(e, t, 0, o);
          }
          function i(e, t) {
            if (!ye.isUndefined(t)) return n(void 0, t);
          }
          function a(e, t) {
            return ye.isUndefined(t) ? ye.isUndefined(e) ? void 0 : n(void 0, e) : n(void 0, t);
          }
          function u(r, o, i) {
            return i in t ? n(r, o) : i in e ? n(void 0, r) : void 0;
          }
          var s = {
            url: i,
            method: i,
            data: i,
            baseURL: a,
            transformRequest: a,
            transformResponse: a,
            paramsSerializer: a,
            timeout: a,
            timeoutMessage: a,
            withCredentials: a,
            withXSRFToken: a,
            adapter: a,
            responseType: a,
            xsrfCookieName: a,
            xsrfHeaderName: a,
            onUploadProgress: a,
            onDownloadProgress: a,
            decompress: a,
            maxContentLength: a,
            maxBodyLength: a,
            beforeRedirect: a,
            transport: a,
            httpAgent: a,
            httpsAgent: a,
            cancelToken: a,
            socketPath: a,
            responseEncoding: a,
            validateStatus: u,
            headers: function headers(e, t, r) {
              return o(ut(e), ut(t), 0, !0);
            }
          };
          return ye.forEach(Object.keys(Object.assign({}, e, t)), function(n) {
            var i = s[n] || o, a = i(e[n], t[n], n);
            ye.isUndefined(a) && i !== u || (r[n] = a);
          }), r;
        }
        var ct, ft, lt = function lt(e) {
          var t, r, n = st({}, e), o = n.data, i = n.withXSRFToken, a = n.xsrfHeaderName, u = n.xsrfCookieName, s = n.headers, c = n.auth;
          if (n.headers = s = Ve.from(s), n.url = Ae(at(n.baseURL, n.url), e.params, e.paramsSerializer), 
          c && s.set("Authorization", "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))), 
          ye.isFormData(o)) if (De.hasStandardBrowserEnv || De.hasStandardBrowserWebWorkerEnv) s.setContentType(void 0); else if (!1 !== (t = s.getContentType())) {
            var f = t ? t.split(";").map(function(e) {
              return e.trim();
            }).filter(Boolean) : [], l = w(r = f) || E(r) || O(r) || x(), p = l[0], h = l.slice(1);
            s.setContentType([ p || "multipart/form-data" ].concat(g(h)).join("; "));
          }
          if (De.hasStandardBrowserEnv && (i && ye.isFunction(i) && (i = i(n)), i || !1 !== i && ot(n.url))) {
            var d = a && u && it.read(u);
            d && s.set(a, d);
          }
          return n;
        }, pt = "undefined" != typeof XMLHttpRequest && function(e) {
          return new Promise(function(t, r) {
            var n, o, i, a, u, s = lt(e), c = s.data, f = Ve.from(s.headers).normalize(), l = s.responseType, p = s.onUploadProgress, h = s.onDownloadProgress;
            function d() {
              a && a(), u && u(), s.cancelToken && s.cancelToken.unsubscribe(n), s.signal && s.signal.removeEventListener("abort", n);
            }
            var v = new XMLHttpRequest();
            function y() {
              if (v) {
                var n = Ve.from("getAllResponseHeaders" in v && v.getAllResponseHeaders());
                Qe(function(e) {
                  t(e), d();
                }, function(e) {
                  r(e), d();
                }, {
                  data: l && "text" !== l && "json" !== l ? v.response : v.responseText,
                  status: v.status,
                  statusText: v.statusText,
                  headers: n,
                  config: e,
                  request: v
                }), v = null;
              }
            }
            if (v.open(s.method.toUpperCase(), s.url, !0), v.timeout = s.timeout, "onloadend" in v ? v.onloadend = y : v.onreadystatechange = function() {
              v && 4 === v.readyState && (0 !== v.status || v.responseURL && 0 === v.responseURL.indexOf("file:")) && setTimeout(y);
            }, v.onabort = function() {
              v && (r(new me("Request aborted", me.ECONNABORTED, e, v)), v = null);
            }, v.onerror = function() {
              r(new me("Network Error", me.ERR_NETWORK, e, v)), v = null;
            }, v.ontimeout = function() {
              var t = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded", n = s.transitional || Le;
              s.timeoutErrorMessage && (t = s.timeoutErrorMessage), r(new me(t, n.clarifyTimeoutError ? me.ETIMEDOUT : me.ECONNABORTED, e, v)), 
              v = null;
            }, void 0 === c && f.setContentType(null), "setRequestHeader" in v && ye.forEach(f.toJSON(), function(e, t) {
              v.setRequestHeader(t, e);
            }), ye.isUndefined(s.withCredentials) || (v.withCredentials = !!s.withCredentials), 
            l && "json" !== l && (v.responseType = s.responseType), h) {
              var m = b(tt(h, !0), 2);
              i = m[0], u = m[1], v.addEventListener("progress", i);
            }
            if (p && v.upload) {
              var g = b(tt(p), 2);
              o = g[0], a = g[1], v.upload.addEventListener("progress", o), v.upload.addEventListener("loadend", a);
            }
            (s.cancelToken || s.signal) && (n = function n(t) {
              v && (r(!t || t.type ? new Ye(null, e, v) : t), v.abort(), v = null);
            }, s.cancelToken && s.cancelToken.subscribe(n), s.signal && (s.signal.aborted ? n() : s.signal.addEventListener("abort", n)));
            var w, E, O = (w = s.url, (E = /^([-+\w]{1,25})(:?\/\/|:)/.exec(w)) && E[1] || "");
            O && -1 === De.protocols.indexOf(O) ? r(new me("Unsupported protocol " + O + ":", me.ERR_BAD_REQUEST, e)) : v.send(c || null);
          });
        }, ht = function ht(e, t) {
          var r = (e = e ? e.filter(Boolean) : []).length;
          if (t || r) {
            var n, o = new AbortController(), i = function i(e) {
              if (!n) {
                n = !0, u();
                var t = e instanceof Error ? e : this.reason;
                o.abort(t instanceof me ? t : new Ye(t instanceof Error ? t.message : t));
              }
            }, a = t && setTimeout(function() {
              a = null, i(new me("timeout ".concat(t, " of ms exceeded"), me.ETIMEDOUT));
            }, t), u = function u() {
              e && (a && clearTimeout(a), a = null, e.forEach(function(e) {
                e.unsubscribe ? e.unsubscribe(i) : e.removeEventListener("abort", i);
              }), e = null);
            };
            e.forEach(function(e) {
              return e.addEventListener("abort", i);
            });
            var s = o.signal;
            return s.unsubscribe = function() {
              return ye.asap(u);
            }, s;
          }
        }, dt = s().mark(function e(t, r) {
          var n, o, i;
          return s().wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
             case 0:
              if (n = t.byteLength, r && !(n < r)) {
                e.next = 5;
                break;
              }
              return e.next = 4, t;

             case 4:
              return e.abrupt("return");

             case 5:
              o = 0;

             case 6:
              if (!(o < n)) {
                e.next = 13;
                break;
              }
              return i = o + r, e.next = 10, t.slice(o, i);

             case 10:
              o = i, e.next = 6;
              break;

             case 13:
             case "end":
              return e.stop();
            }
          }, e);
        }), vt = function() {
          var e = l(s().mark(function e(t, o) {
            var a, u, c, f, l, p;
            return s().wrap(function(e) {
              for (;;) switch (e.prev = e.next) {
               case 0:
                a = !1, u = !1, e.prev = 2, f = n(yt(t));

               case 4:
                return e.next = 6, i(f.next());

               case 6:
                if (!(a = !(l = e.sent).done)) {
                  e.next = 12;
                  break;
                }
                return p = l.value, e.delegateYield(r(n(dt(p, o))), "t0", 9);

               case 9:
                a = !1, e.next = 4;
                break;

               case 12:
                e.next = 18;
                break;

               case 14:
                e.prev = 14, e.t1 = e["catch"](2), u = !0, c = e.t1;

               case 18:
                if (e.prev = 18, e.prev = 19, !a || null == f["return"]) {
                  e.next = 23;
                  break;
                }
                return e.next = 23, i(f["return"]());

               case 23:
                if (e.prev = 23, !u) {
                  e.next = 26;
                  break;
                }
                throw c;

               case 26:
                return e.finish(23);

               case 27:
                return e.finish(18);

               case 28:
               case "end":
                return e.stop();
              }
            }, e, null, [ [ 2, 14, 18, 28 ], [ 19, , 23, 27 ] ]);
          }));
          return function(t, r) {
            return e.apply(this, arguments);
          };
        }(), yt = function() {
          var e = l(s().mark(function e(t) {
            var o, a, u, c;
            return s().wrap(function(e) {
              for (;;) switch (e.prev = e.next) {
               case 0:
                if (!t[Symbol.asyncIterator]) {
                  e.next = 3;
                  break;
                }
                return e.delegateYield(r(n(t)), "t0", 2);

               case 2:
                return e.abrupt("return");

               case 3:
                o = t.getReader(), e.prev = 4;

               case 5:
                return e.next = 7, i(o.read());

               case 7:
                if (a = e.sent, u = a.done, c = a.value, !u) {
                  e.next = 12;
                  break;
                }
                return e.abrupt("break", 16);

               case 12:
                return e.next = 14, c;

               case 14:
                e.next = 5;
                break;

               case 16:
                return e.prev = 16, e.next = 19, i(o.cancel());

               case 19:
                return e.finish(16);

               case 20:
               case "end":
                return e.stop();
              }
            }, e, null, [ [ 4, , 16, 20 ] ]);
          }));
          return function(t) {
            return e.apply(this, arguments);
          };
        }(), mt = function mt(e, t, r, n) {
          var o, i = vt(e, t), a = 0, u = function u(e) {
            o || (o = !0, n && n(e));
          };
          return new ReadableStream({
            pull: function pull(e) {
              return h(s().mark(function t() {
                var n, o, c, f, l;
                return s().wrap(function(t) {
                  for (;;) switch (t.prev = t.next) {
                   case 0:
                    return t.prev = 0, t.next = 3, i.next();

                   case 3:
                    if (n = t.sent, o = n.done, c = n.value, !o) {
                      t.next = 10;
                      break;
                    }
                    return u(), e.close(), t.abrupt("return");

                   case 10:
                    f = c.byteLength, r && (l = a += f, r(l)), e.enqueue(new Uint8Array(c)), t.next = 19;
                    break;

                   case 15:
                    throw t.prev = 15, t.t0 = t["catch"](0), u(t.t0), t.t0;

                   case 19:
                   case "end":
                    return t.stop();
                  }
                }, t, null, [ [ 0, 15 ] ]);
              }))();
            },
            cancel: function cancel(e) {
              return u(e), i["return"]();
            }
          }, {
            highWaterMark: 2
          });
        }, bt = "function" == typeof fetch && "function" == typeof Request && "function" == typeof Response, gt = bt && "function" == typeof ReadableStream, wt = bt && ("function" == typeof TextEncoder ? (ct = new TextEncoder(), 
        function(e) {
          return ct.encode(e);
        }) : function() {
          var e = h(s().mark(function e(t) {
            return s().wrap(function(e) {
              for (;;) switch (e.prev = e.next) {
               case 0:
                return e.t0 = Uint8Array, e.next = 3, new Response(t).arrayBuffer();

               case 3:
                return e.t1 = e.sent, e.abrupt("return", new e.t0(e.t1));

               case 5:
               case "end":
                return e.stop();
              }
            }, e);
          }));
          return function(t) {
            return e.apply(this, arguments);
          };
        }()), Et = function Et(e) {
          try {
            for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
            return !!e.apply(void 0, r);
          } catch (e) {
            return !1;
          }
        }, Ot = gt && Et(function() {
          var e = !1, t = new Request(De.origin, {
            body: new ReadableStream(),
            method: "POST",
            get duplex() {
              return e = !0, "half";
            }
          }).headers.has("Content-Type");
          return e && !t;
        }), St = gt && Et(function() {
          return ye.isReadableStream(new Response("").body);
        }), xt = {
          stream: St && function(e) {
            return e.body;
          }
        };
        bt && (ft = new Response(), [ "text", "arrayBuffer", "blob", "formData", "stream" ].forEach(function(e) {
          !xt[e] && (xt[e] = ye.isFunction(ft[e]) ? function(t) {
            return t[e]();
          } : function(t, r) {
            throw new me("Response type '".concat(e, "' is not supported"), me.ERR_NOT_SUPPORT, r);
          });
        }));
        var Rt = function() {
          var e = h(s().mark(function e(t) {
            var r;
            return s().wrap(function(e) {
              for (;;) switch (e.prev = e.next) {
               case 0:
                if (null != t) {
                  e.next = 2;
                  break;
                }
                return e.abrupt("return", 0);

               case 2:
                if (!ye.isBlob(t)) {
                  e.next = 4;
                  break;
                }
                return e.abrupt("return", t.size);

               case 4:
                if (!ye.isSpecCompliantForm(t)) {
                  e.next = 9;
                  break;
                }
                return r = new Request(De.origin, {
                  method: "POST",
                  body: t
                }), e.next = 8, r.arrayBuffer();

               case 8:
               case 15:
                return e.abrupt("return", e.sent.byteLength);

               case 9:
                if (!ye.isArrayBufferView(t) && !ye.isArrayBuffer(t)) {
                  e.next = 11;
                  break;
                }
                return e.abrupt("return", t.byteLength);

               case 11:
                if (ye.isURLSearchParams(t) && (t += ""), !ye.isString(t)) {
                  e.next = 16;
                  break;
                }
                return e.next = 15, wt(t);

               case 16:
               case "end":
                return e.stop();
              }
            }, e);
          }));
          return function(t) {
            return e.apply(this, arguments);
          };
        }(), Tt = function() {
          var e = h(s().mark(function e(t, r) {
            var n;
            return s().wrap(function(e) {
              for (;;) switch (e.prev = e.next) {
               case 0:
                return n = ye.toFiniteNumber(t.getContentLength()), e.abrupt("return", null == n ? Rt(r) : n);

               case 2:
               case "end":
                return e.stop();
              }
            }, e);
          }));
          return function(t, r) {
            return e.apply(this, arguments);
          };
        }(), kt = bt && function() {
          var e = h(s().mark(function e(t) {
            var r, n, o, i, a, c, f, l, p, h, d, v, y, m, g, w, E, O, S, x, R, T, k, j, A, P, L, N, _, C, F, U, B, D;
            return s().wrap(function(e) {
              for (;;) switch (e.prev = e.next) {
               case 0:
                if (r = lt(t), n = r.url, o = r.method, i = r.data, a = r.signal, c = r.cancelToken, 
                f = r.timeout, l = r.onDownloadProgress, p = r.onUploadProgress, h = r.responseType, 
                d = r.headers, v = r.withCredentials, y = void 0 === v ? "same-origin" : v, m = r.fetchOptions, 
                h = h ? (h + "").toLowerCase() : "text", g = ht([ a, c && c.toAbortSignal() ], f), 
                E = g && g.unsubscribe && function() {
                  g.unsubscribe();
                }, e.prev = 4, e.t0 = p && Ot && "get" !== o && "head" !== o, !e.t0) {
                  e.next = 11;
                  break;
                }
                return e.next = 9, Tt(d, i);

               case 9:
                e.t1 = O = e.sent, e.t0 = 0 !== e.t1;

               case 11:
                if (!e.t0) {
                  e.next = 15;
                  break;
                }
                S = new Request(n, {
                  method: "POST",
                  body: i,
                  duplex: "half"
                }), ye.isFormData(i) && (x = S.headers.get("content-type")) && d.setContentType(x), 
                S.body && (R = rt(O, tt(nt(p))), T = b(R, 2), k = T[0], j = T[1], i = mt(S.body, 65536, k, j));

               case 15:
                return ye.isString(y) || (y = y ? "include" : "omit"), A = "credentials" in Request.prototype, 
                w = new Request(n, u(u({}, m), {}, {
                  signal: g,
                  method: o.toUpperCase(),
                  headers: d.normalize().toJSON(),
                  body: i,
                  duplex: "half",
                  credentials: A ? y : void 0
                })), e.next = 20, fetch(w);

               case 20:
                return P = e.sent, L = St && ("stream" === h || "response" === h), St && (l || L && E) && (N = {}, 
                [ "status", "statusText", "headers" ].forEach(function(e) {
                  N[e] = P[e];
                }), _ = ye.toFiniteNumber(P.headers.get("content-length")), C = l && rt(_, tt(nt(l), !0)) || [], 
                F = b(C, 2), U = F[0], B = F[1], P = new Response(mt(P.body, 65536, U, function() {
                  B && B(), E && E();
                }), N)), h = h || "text", e.next = 26, xt[ye.findKey(xt, h) || "text"](P, t);

               case 26:
                return D = e.sent, !L && E && E(), e.next = 30, new Promise(function(e, r) {
                  Qe(e, r, {
                    data: D,
                    headers: Ve.from(P.headers),
                    status: P.status,
                    statusText: P.statusText,
                    config: t,
                    request: w
                  });
                });

               case 30:
                return e.abrupt("return", e.sent);

               case 33:
                if (e.prev = 33, e.t2 = e["catch"](4), E && E(), !e.t2 || "TypeError" !== e.t2.name || !/fetch/i.test(e.t2.message)) {
                  e.next = 38;
                  break;
                }
                throw Object.assign(new me("Network Error", me.ERR_NETWORK, t, w), {
                  cause: e.t2.cause || e.t2
                });

               case 38:
                throw me.from(e.t2, e.t2 && e.t2.code, t, w);

               case 39:
               case "end":
                return e.stop();
              }
            }, e, null, [ [ 4, 33 ] ]);
          }));
          return function(t) {
            return e.apply(this, arguments);
          };
        }(), jt = {
          http: null,
          xhr: pt,
          fetch: kt
        };
        ye.forEach(jt, function(e, t) {
          if (e) {
            try {
              Object.defineProperty(e, "name", {
                value: t
              });
            } catch (e) {}
            Object.defineProperty(e, "adapterName", {
              value: t
            });
          }
        });
        var At = function At(e) {
          return "- ".concat(e);
        }, Pt = function Pt(e) {
          return ye.isFunction(e) || null === e || !1 === e;
        }, Lt = function Lt(e) {
          for (var t, r, n = (e = ye.isArray(e) ? e : [ e ]).length, o = {}, i = 0; i < n; i++) {
            var a = void 0;
            if (r = t = e[i], !Pt(t) && void 0 === (r = jt[(a = String(t)).toLowerCase()])) throw new me("Unknown adapter '".concat(a, "'"));
            if (r) break;
            o[a || "#" + i] = r;
          }
          if (!r) {
            var u = Object.entries(o).map(function(e) {
              var t = b(e, 2), r = t[0], n = t[1];
              return "adapter ".concat(r, " ") + (!1 === n ? "is not supported by the environment" : "is not available in the build");
            });
            throw new me("There is no suitable adapter to dispatch the request " + (n ? u.length > 1 ? "since :\n" + u.map(At).join("\n") : " " + At(u[0]) : "as no adapter specified"), "ERR_NOT_SUPPORT");
          }
          return r;
        };
        function Nt(e) {
          if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new Ye(null, e);
        }
        function _t(e) {
          return Nt(e), e.headers = Ve.from(e.headers), e.data = Xe.call(e, e.transformRequest), 
          -1 !== [ "post", "put", "patch" ].indexOf(e.method) && e.headers.setContentType("application/x-www-form-urlencoded", !1), 
          Lt(e.adapter || Me.adapter)(e).then(function(t) {
            return Nt(e), t.data = Xe.call(e, e.transformResponse, t), t.headers = Ve.from(t.headers), 
            t;
          }, function(t) {
            return $e(t) || (Nt(e), t && t.response && (t.response.data = Xe.call(e, e.transformResponse, t.response), 
            t.response.headers = Ve.from(t.response.headers))), Promise.reject(t);
          });
        }
        var Ct = "1.7.9", Ft = {};
        [ "object", "boolean", "number", "function", "string", "symbol" ].forEach(function(e, t) {
          Ft[e] = function(r) {
            return f(r) === e || "a" + (t < 1 ? "n " : " ") + e;
          };
        });
        var Ut = {};
        Ft.transitional = function(e, t, r) {
          function n(e, t) {
            return "[Axios v1.7.9] Transitional option '" + e + "'" + t + (r ? ". " + r : "");
          }
          return function(r, o, i) {
            if (!1 === e) throw new me(n(o, " has been removed" + (t ? " in " + t : "")), me.ERR_DEPRECATED);
            return t && !Ut[o] && (Ut[o] = !0, console.warn(n(o, " has been deprecated since v" + t + " and will be removed in the near future"))), 
            !e || e(r, o, i);
          };
        }, Ft.spelling = function(e) {
          return function(t, r) {
            return console.warn("".concat(r, " is likely a misspelling of ").concat(e)), !0;
          };
        };
        var Bt = {
          assertOptions: function assertOptions(e, t, r) {
            if ("object" !== f(e)) throw new me("options must be an object", me.ERR_BAD_OPTION_VALUE);
            for (var n = Object.keys(e), o = n.length; o-- > 0; ) {
              var i = n[o], a = t[i];
              if (a) {
                var u = e[i], s = void 0 === u || a(u, i, e);
                if (!0 !== s) throw new me("option " + i + " must be " + s, me.ERR_BAD_OPTION_VALUE);
              } else if (!0 !== r) throw new me("Unknown option " + i, me.ERR_BAD_OPTION);
            }
          },
          validators: Ft
        }, Dt = Bt.validators, It = function() {
          function e(t) {
            d(this, e), this.defaults = t, this.interceptors = {
              request: new Pe(),
              response: new Pe()
            };
          }
          var t;
          return y(e, [ {
            key: "request",
            value: (t = h(s().mark(function e(t, r) {
              var n, o;
              return s().wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                 case 0:
                  return e.prev = 0, e.next = 3, this._request(t, r);

                 case 3:
                  return e.abrupt("return", e.sent);

                 case 6:
                  if (e.prev = 6, e.t0 = e["catch"](0), e.t0 instanceof Error) {
                    n = {}, Error.captureStackTrace ? Error.captureStackTrace(n) : n = new Error(), 
                    o = n.stack ? n.stack.replace(/^.+\n/, "") : "";
                    try {
                      e.t0.stack ? o && !String(e.t0.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (e.t0.stack += "\n" + o) : e.t0.stack = o;
                    } catch (e) {}
                  }
                  throw e.t0;

                 case 10:
                 case "end":
                  return e.stop();
                }
              }, e, this, [ [ 0, 6 ] ]);
            })), function(e, r) {
              return t.apply(this, arguments);
            })
          }, {
            key: "_request",
            value: function value(e, t) {
              "string" == typeof e ? (t = t || {}).url = e : t = e || {};
              var r = t = st(this.defaults, t), n = r.transitional, o = r.paramsSerializer, i = r.headers;
              void 0 !== n && Bt.assertOptions(n, {
                silentJSONParsing: Dt.transitional(Dt["boolean"]),
                forcedJSONParsing: Dt.transitional(Dt["boolean"]),
                clarifyTimeoutError: Dt.transitional(Dt["boolean"])
              }, !1), null != o && (ye.isFunction(o) ? t.paramsSerializer = {
                serialize: o
              } : Bt.assertOptions(o, {
                encode: Dt["function"],
                serialize: Dt["function"]
              }, !0)), Bt.assertOptions(t, {
                baseUrl: Dt.spelling("baseURL"),
                withXsrfToken: Dt.spelling("withXSRFToken")
              }, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
              var a = i && ye.merge(i.common, i[t.method]);
              i && ye.forEach([ "delete", "get", "head", "post", "put", "patch", "common" ], function(e) {
                delete i[e];
              }), t.headers = Ve.concat(a, i);
              var u = [], s = !0;
              this.interceptors.request.forEach(function(e) {
                "function" == typeof e.runWhen && !1 === e.runWhen(t) || (s = s && e.synchronous, 
                u.unshift(e.fulfilled, e.rejected));
              });
              var c, f = [];
              this.interceptors.response.forEach(function(e) {
                f.push(e.fulfilled, e.rejected);
              });
              var l, p = 0;
              if (!s) {
                var h = [ _t.bind(this), void 0 ];
                for (h.unshift.apply(h, u), h.push.apply(h, f), l = h.length, c = Promise.resolve(t); p < l; ) c = c.then(h[p++], h[p++]);
                return c;
              }
              l = u.length;
              var d = t;
              for (p = 0; p < l; ) {
                var v = u[p++], y = u[p++];
                try {
                  d = v(d);
                } catch (e) {
                  y.call(this, e);
                  break;
                }
              }
              try {
                c = _t.call(this, d);
              } catch (e) {
                return Promise.reject(e);
              }
              for (p = 0, l = f.length; p < l; ) c = c.then(f[p++], f[p++]);
              return c;
            }
          }, {
            key: "getUri",
            value: function value(e) {
              return Ae(at((e = st(this.defaults, e)).baseURL, e.url), e.params, e.paramsSerializer);
            }
          } ]), e;
        }();
        ye.forEach([ "delete", "get", "head", "options" ], function(e) {
          It.prototype[e] = function(t, r) {
            return this.request(st(r || {}, {
              method: e,
              url: t,
              data: (r || {}).data
            }));
          };
        }), ye.forEach([ "post", "put", "patch" ], function(e) {
          function t(t) {
            return function(r, n, o) {
              return this.request(st(o || {}, {
                method: e,
                headers: t ? {
                  "Content-Type": "multipart/form-data"
                } : {},
                url: r,
                data: n
              }));
            };
          }
          It.prototype[e] = t(), It.prototype[e + "Form"] = t(!0);
        });
        var qt = It, Mt = function() {
          function e(t) {
            if (d(this, e), "function" != typeof t) throw new TypeError("executor must be a function.");
            var r;
            this.promise = new Promise(function(e) {
              r = e;
            });
            var n = this;
            this.promise.then(function(e) {
              if (n._listeners) {
                for (var t = n._listeners.length; t-- > 0; ) n._listeners[t](e);
                n._listeners = null;
              }
            }), this.promise.then = function(e) {
              var t, r = new Promise(function(e) {
                n.subscribe(e), t = e;
              }).then(e);
              return r.cancel = function() {
                n.unsubscribe(t);
              }, r;
            }, t(function(e, t, o) {
              n.reason || (n.reason = new Ye(e, t, o), r(n.reason));
            });
          }
          return y(e, [ {
            key: "throwIfRequested",
            value: function value() {
              if (this.reason) throw this.reason;
            }
          }, {
            key: "subscribe",
            value: function value(e) {
              this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [ e ];
            }
          }, {
            key: "unsubscribe",
            value: function value(e) {
              if (this._listeners) {
                var t = this._listeners.indexOf(e);
                -1 !== t && this._listeners.splice(t, 1);
              }
            }
          }, {
            key: "toAbortSignal",
            value: function value() {
              var e = this, t = new AbortController(), r = function r(e) {
                t.abort(e);
              };
              return this.subscribe(r), t.signal.unsubscribe = function() {
                return e.unsubscribe(r);
              }, t.signal;
            }
          } ], [ {
            key: "source",
            value: function value() {
              var t;
              return {
                token: new e(function(e) {
                  t = e;
                }),
                cancel: t
              };
            }
          } ]), e;
        }(), zt = Mt;
        var Ht = {
          Continue: 100,
          SwitchingProtocols: 101,
          Processing: 102,
          EarlyHints: 103,
          Ok: 200,
          Created: 201,
          Accepted: 202,
          NonAuthoritativeInformation: 203,
          NoContent: 204,
          ResetContent: 205,
          PartialContent: 206,
          MultiStatus: 207,
          AlreadyReported: 208,
          ImUsed: 226,
          MultipleChoices: 300,
          MovedPermanently: 301,
          Found: 302,
          SeeOther: 303,
          NotModified: 304,
          UseProxy: 305,
          Unused: 306,
          TemporaryRedirect: 307,
          PermanentRedirect: 308,
          BadRequest: 400,
          Unauthorized: 401,
          PaymentRequired: 402,
          Forbidden: 403,
          NotFound: 404,
          MethodNotAllowed: 405,
          NotAcceptable: 406,
          ProxyAuthenticationRequired: 407,
          RequestTimeout: 408,
          Conflict: 409,
          Gone: 410,
          LengthRequired: 411,
          PreconditionFailed: 412,
          PayloadTooLarge: 413,
          UriTooLong: 414,
          UnsupportedMediaType: 415,
          RangeNotSatisfiable: 416,
          ExpectationFailed: 417,
          ImATeapot: 418,
          MisdirectedRequest: 421,
          UnprocessableEntity: 422,
          Locked: 423,
          FailedDependency: 424,
          TooEarly: 425,
          UpgradeRequired: 426,
          PreconditionRequired: 428,
          TooManyRequests: 429,
          RequestHeaderFieldsTooLarge: 431,
          UnavailableForLegalReasons: 451,
          InternalServerError: 500,
          NotImplemented: 501,
          BadGateway: 502,
          ServiceUnavailable: 503,
          GatewayTimeout: 504,
          HttpVersionNotSupported: 505,
          VariantAlsoNegotiates: 506,
          InsufficientStorage: 507,
          LoopDetected: 508,
          NotExtended: 510,
          NetworkAuthenticationRequired: 511
        };
        Object.entries(Ht).forEach(function(e) {
          var t = b(e, 2), r = t[0], n = t[1];
          Ht[n] = r;
        });
        var Jt = Ht;
        var Wt = function e(t) {
          var r = new qt(t), n = R(qt.prototype.request, r);
          return ye.extend(n, qt.prototype, r, {
            allOwnKeys: !0
          }), ye.extend(n, r, null, {
            allOwnKeys: !0
          }), n.create = function(r) {
            return e(st(t, r));
          }, n;
        }(Me);
        return Wt.Axios = qt, Wt.CanceledError = Ye, Wt.CancelToken = zt, Wt.isCancel = $e, 
        Wt.VERSION = Ct, Wt.toFormData = xe, Wt.AxiosError = me, Wt.Cancel = Wt.CanceledError, 
        Wt.all = function(e) {
          return Promise.all(e);
        }, Wt.spread = function(e) {
          return function(t) {
            return e.apply(null, t);
          };
        }, Wt.isAxiosError = function(e) {
          return ye.isObject(e) && !0 === e.isAxiosError;
        }, Wt.mergeConfig = st, Wt.AxiosHeaders = Ve, Wt.formToJSON = function(e) {
          return Ie(ye.isHTMLForm(e) ? new FormData(e) : e);
        }, Wt.getAdapter = Lt, Wt.HttpStatusCode = Jt, Wt["default"] = Wt, Wt;
      });
      cc._RF.pop();
    }).call(this, require("_process"), "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {}, require("buffer").Buffer);
  }, {
    _process: 5,
    buffer: 2
  } ],
  loader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "79aa7SD0ABIybKGpWJCgccF", "loader");
    "use strict";
    function _extends() {
      _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    var lang = {};
    lang.zh = {};
    lang.zh.load_failed = "\u52a0\u8f7d\u5931\u8d25\n(\u68c0\u67e5\u540e\u7f51\u7edc\u91cd\u8bd5)";
    lang.zh.load_wait = "\u8bf7\u7a0d\u540e";
    lang.zh.tip_inst = "\u5f53\u524d\u7248\u672c\u592a\u65e7\n\u9700\u91cd\u65b0\u4e0b\u8f7d\u6700\u65b0\u7248\u672c";
    lang.en = {};
    lang.en.load_failed = "Loading Failed";
    lang.en.load_wait = "Please wait";
    lang.en.tip_inst = "The current version is too old\nYou need to download the latest version again";
    var L = function L(key) {
      console.log("cc.sys.language--------xxx", cc.sys.language);
      return lang["en"][key];
    };
    globalThis.app = {};
    app.loader = {};
    app.loader.version = 5;
    app.loader.url = "";
    app.config = {};
    app.config.version = 105;
    cc.Class({
      extends: cc.Component,
      properties: {
        label: cc.Label,
        animNode: cc.Node
      },
      onLoad: function onLoad() {
        var _this = this;
        this.animNode.active = true;
        this.label.string = L("load_wait");
        this.loadConfig(app.loader.url).then(function(config) {
          if (config.loader && config.loader.version != app.loader.version) {
            _this.tip(L("tip_inst"));
            _this.node.on("touchend", function(e) {
              config.loader.downloadUrl ? cc.sys.openURL(config.loader.downloadUrl) : cc.game.end();
            });
            return;
          }
          app.config = _extends({}, app.config, config);
          return _this.loadBundle(app.config.bundle);
        }).then(function(bundle) {
          if (!bundle) return;
          bundle.loadScene(bundle.name, function(err, scene) {
            if (err) {
              _this.error(L("load_failed"));
              return;
            }
            cc.director.runScene(scene);
          });
        })["catch"](function(err) {
          cc.log(err);
          _this.error(L("load_failed"));
        });
      },
      loadConfig: function loadConfig(jsonUrl) {
        return new Promise(function(resolve, reject) {
          if (!jsonUrl) {
            resolve({
              bundle: {
                version: "",
                url: ""
              }
            });
            return;
          }
          cc.assetManager.loadRemote(jsonUrl + "?" + new Date().getTime(), {
            ext: ".json"
          }, function(err, res) {
            if (err) {
              console.log("loader.loadConfig", err);
              reject();
              return;
            }
            cc.log("loader.loadConfig", res.json);
            resolve(res.json);
          });
        });
      },
      loadBundle: function loadBundle(param) {
        var _this2 = this;
        param = _extends({}, {
          url: "",
          version: ""
        }, param);
        if (!cc.sys.isNative) {
          param.url = "";
          param.version = "";
        }
        return new Promise(function(resolve, reject) {
          var bundleUrl = param.url ? param.url + "/app" : "app";
          cc.assetManager.loadBundle(bundleUrl, {
            version: param.version,
            onFileProgress: function onFileProgress(completed, total) {
              var percent = Math.round(completed / total * 100);
              percent < 0 && (percent = 0);
              _this2.label.string = percent >= 100 ? L("load_wait") : percent + "%";
            }
          }, function(err, bundle) {
            if (err) {
              console.log("loader.loadBundle", err);
              reject(err);
              bundle && bundle.releaseAll();
              return;
            }
            resolve(bundle);
          });
        });
      },
      tip: function tip(string, color) {
        void 0 === color && (color = "#FFFFFF");
        this.animNode.active = false;
        this.label.node.color = new cc.color(color);
        this.label.string = string;
      },
      error: function error(string) {
        this.tip(string, "#FF0000");
        this.node.once("touchend", function(e) {
          cc.game.restart();
        });
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "loader", "axios" ]);