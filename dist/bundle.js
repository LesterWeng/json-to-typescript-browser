var jstt = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
	        return Reflect.construct(f, arguments, this.constructor);
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var src$1 = {};

	var src = {exports: {}};

	var getTypeStructure$1 = {};

	var hash$1 = {};

	var utils$9 = {};

	var minimalisticAssert = assert$5;

	function assert$5(val, msg) {
	  if (!val)
	    throw new Error(msg || 'Assertion failed');
	}

	assert$5.equal = function assertEqual(l, r, msg) {
	  if (l != r)
	    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
	};

	var inherits$3;
	if (typeof Object.create === 'function'){
	  inherits$3 = function inherits(ctor, superCtor) {
	    // implementation from standard node.js 'util' module
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  inherits$3 = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}
	var inherits$4 = inherits$3;

	var _polyfillNode_inherits = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: inherits$4
	});

	var require$$1 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_inherits);

	var assert$4 = minimalisticAssert;
	var inherits$2 = require$$1;

	utils$9.inherits = inherits$2;

	function isSurrogatePair(msg, i) {
	  if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
	    return false;
	  }
	  if (i < 0 || i + 1 >= msg.length) {
	    return false;
	  }
	  return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
	}

	function toArray(msg, enc) {
	  if (Array.isArray(msg))
	    return msg.slice();
	  if (!msg)
	    return [];
	  var res = [];
	  if (typeof msg === 'string') {
	    if (!enc) {
	      // Inspired by stringToUtf8ByteArray() in closure-library by Google
	      // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
	      // Apache License 2.0
	      // https://github.com/google/closure-library/blob/master/LICENSE
	      var p = 0;
	      for (var i = 0; i < msg.length; i++) {
	        var c = msg.charCodeAt(i);
	        if (c < 128) {
	          res[p++] = c;
	        } else if (c < 2048) {
	          res[p++] = (c >> 6) | 192;
	          res[p++] = (c & 63) | 128;
	        } else if (isSurrogatePair(msg, i)) {
	          c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
	          res[p++] = (c >> 18) | 240;
	          res[p++] = ((c >> 12) & 63) | 128;
	          res[p++] = ((c >> 6) & 63) | 128;
	          res[p++] = (c & 63) | 128;
	        } else {
	          res[p++] = (c >> 12) | 224;
	          res[p++] = ((c >> 6) & 63) | 128;
	          res[p++] = (c & 63) | 128;
	        }
	      }
	    } else if (enc === 'hex') {
	      msg = msg.replace(/[^a-z0-9]+/ig, '');
	      if (msg.length % 2 !== 0)
	        msg = '0' + msg;
	      for (i = 0; i < msg.length; i += 2)
	        res.push(parseInt(msg[i] + msg[i + 1], 16));
	    }
	  } else {
	    for (i = 0; i < msg.length; i++)
	      res[i] = msg[i] | 0;
	  }
	  return res;
	}
	utils$9.toArray = toArray;

	function toHex$1(msg) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++)
	    res += zero2(msg[i].toString(16));
	  return res;
	}
	utils$9.toHex = toHex$1;

	function htonl(w) {
	  var res = (w >>> 24) |
	            ((w >>> 8) & 0xff00) |
	            ((w << 8) & 0xff0000) |
	            ((w & 0xff) << 24);
	  return res >>> 0;
	}
	utils$9.htonl = htonl;

	function toHex32(msg, endian) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++) {
	    var w = msg[i];
	    if (endian === 'little')
	      w = htonl(w);
	    res += zero8(w.toString(16));
	  }
	  return res;
	}
	utils$9.toHex32 = toHex32;

	function zero2(word) {
	  if (word.length === 1)
	    return '0' + word;
	  else
	    return word;
	}
	utils$9.zero2 = zero2;

	function zero8(word) {
	  if (word.length === 7)
	    return '0' + word;
	  else if (word.length === 6)
	    return '00' + word;
	  else if (word.length === 5)
	    return '000' + word;
	  else if (word.length === 4)
	    return '0000' + word;
	  else if (word.length === 3)
	    return '00000' + word;
	  else if (word.length === 2)
	    return '000000' + word;
	  else if (word.length === 1)
	    return '0000000' + word;
	  else
	    return word;
	}
	utils$9.zero8 = zero8;

	function join32(msg, start, end, endian) {
	  var len = end - start;
	  assert$4(len % 4 === 0);
	  var res = new Array(len / 4);
	  for (var i = 0, k = start; i < res.length; i++, k += 4) {
	    var w;
	    if (endian === 'big')
	      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
	    else
	      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
	    res[i] = w >>> 0;
	  }
	  return res;
	}
	utils$9.join32 = join32;

	function split32(msg, endian) {
	  var res = new Array(msg.length * 4);
	  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
	    var m = msg[i];
	    if (endian === 'big') {
	      res[k] = m >>> 24;
	      res[k + 1] = (m >>> 16) & 0xff;
	      res[k + 2] = (m >>> 8) & 0xff;
	      res[k + 3] = m & 0xff;
	    } else {
	      res[k + 3] = m >>> 24;
	      res[k + 2] = (m >>> 16) & 0xff;
	      res[k + 1] = (m >>> 8) & 0xff;
	      res[k] = m & 0xff;
	    }
	  }
	  return res;
	}
	utils$9.split32 = split32;

	function rotr32$1(w, b) {
	  return (w >>> b) | (w << (32 - b));
	}
	utils$9.rotr32 = rotr32$1;

	function rotl32$2(w, b) {
	  return (w << b) | (w >>> (32 - b));
	}
	utils$9.rotl32 = rotl32$2;

	function sum32$3(a, b) {
	  return (a + b) >>> 0;
	}
	utils$9.sum32 = sum32$3;

	function sum32_3$1(a, b, c) {
	  return (a + b + c) >>> 0;
	}
	utils$9.sum32_3 = sum32_3$1;

	function sum32_4$2(a, b, c, d) {
	  return (a + b + c + d) >>> 0;
	}
	utils$9.sum32_4 = sum32_4$2;

	function sum32_5$2(a, b, c, d, e) {
	  return (a + b + c + d + e) >>> 0;
	}
	utils$9.sum32_5 = sum32_5$2;

	function sum64$1(buf, pos, ah, al) {
	  var bh = buf[pos];
	  var bl = buf[pos + 1];

	  var lo = (al + bl) >>> 0;
	  var hi = (lo < al ? 1 : 0) + ah + bh;
	  buf[pos] = hi >>> 0;
	  buf[pos + 1] = lo;
	}
	utils$9.sum64 = sum64$1;

	function sum64_hi$1(ah, al, bh, bl) {
	  var lo = (al + bl) >>> 0;
	  var hi = (lo < al ? 1 : 0) + ah + bh;
	  return hi >>> 0;
	}
	utils$9.sum64_hi = sum64_hi$1;

	function sum64_lo$1(ah, al, bh, bl) {
	  var lo = al + bl;
	  return lo >>> 0;
	}
	utils$9.sum64_lo = sum64_lo$1;

	function sum64_4_hi$1(ah, al, bh, bl, ch, cl, dh, dl) {
	  var carry = 0;
	  var lo = al;
	  lo = (lo + bl) >>> 0;
	  carry += lo < al ? 1 : 0;
	  lo = (lo + cl) >>> 0;
	  carry += lo < cl ? 1 : 0;
	  lo = (lo + dl) >>> 0;
	  carry += lo < dl ? 1 : 0;

	  var hi = ah + bh + ch + dh + carry;
	  return hi >>> 0;
	}
	utils$9.sum64_4_hi = sum64_4_hi$1;

	function sum64_4_lo$1(ah, al, bh, bl, ch, cl, dh, dl) {
	  var lo = al + bl + cl + dl;
	  return lo >>> 0;
	}
	utils$9.sum64_4_lo = sum64_4_lo$1;

	function sum64_5_hi$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
	  var carry = 0;
	  var lo = al;
	  lo = (lo + bl) >>> 0;
	  carry += lo < al ? 1 : 0;
	  lo = (lo + cl) >>> 0;
	  carry += lo < cl ? 1 : 0;
	  lo = (lo + dl) >>> 0;
	  carry += lo < dl ? 1 : 0;
	  lo = (lo + el) >>> 0;
	  carry += lo < el ? 1 : 0;

	  var hi = ah + bh + ch + dh + eh + carry;
	  return hi >>> 0;
	}
	utils$9.sum64_5_hi = sum64_5_hi$1;

	function sum64_5_lo$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
	  var lo = al + bl + cl + dl + el;

	  return lo >>> 0;
	}
	utils$9.sum64_5_lo = sum64_5_lo$1;

	function rotr64_hi$1(ah, al, num) {
	  var r = (al << (32 - num)) | (ah >>> num);
	  return r >>> 0;
	}
	utils$9.rotr64_hi = rotr64_hi$1;

	function rotr64_lo$1(ah, al, num) {
	  var r = (ah << (32 - num)) | (al >>> num);
	  return r >>> 0;
	}
	utils$9.rotr64_lo = rotr64_lo$1;

	function shr64_hi$1(ah, al, num) {
	  return ah >>> num;
	}
	utils$9.shr64_hi = shr64_hi$1;

	function shr64_lo$1(ah, al, num) {
	  var r = (ah << (32 - num)) | (al >>> num);
	  return r >>> 0;
	}
	utils$9.shr64_lo = shr64_lo$1;

	var common$5 = {};

	var utils$8 = utils$9;
	var assert$3 = minimalisticAssert;

	function BlockHash$4() {
	  this.pending = null;
	  this.pendingTotal = 0;
	  this.blockSize = this.constructor.blockSize;
	  this.outSize = this.constructor.outSize;
	  this.hmacStrength = this.constructor.hmacStrength;
	  this.padLength = this.constructor.padLength / 8;
	  this.endian = 'big';

	  this._delta8 = this.blockSize / 8;
	  this._delta32 = this.blockSize / 32;
	}
	common$5.BlockHash = BlockHash$4;

	BlockHash$4.prototype.update = function update(msg, enc) {
	  // Convert message to array, pad it, and join into 32bit blocks
	  msg = utils$8.toArray(msg, enc);
	  if (!this.pending)
	    this.pending = msg;
	  else
	    this.pending = this.pending.concat(msg);
	  this.pendingTotal += msg.length;

	  // Enough data, try updating
	  if (this.pending.length >= this._delta8) {
	    msg = this.pending;

	    // Process pending data in blocks
	    var r = msg.length % this._delta8;
	    this.pending = msg.slice(msg.length - r, msg.length);
	    if (this.pending.length === 0)
	      this.pending = null;

	    msg = utils$8.join32(msg, 0, msg.length - r, this.endian);
	    for (var i = 0; i < msg.length; i += this._delta32)
	      this._update(msg, i, i + this._delta32);
	  }

	  return this;
	};

	BlockHash$4.prototype.digest = function digest(enc) {
	  this.update(this._pad());
	  assert$3(this.pending === null);

	  return this._digest(enc);
	};

	BlockHash$4.prototype._pad = function pad() {
	  var len = this.pendingTotal;
	  var bytes = this._delta8;
	  var k = bytes - ((len + this.padLength) % bytes);
	  var res = new Array(k + this.padLength);
	  res[0] = 0x80;
	  for (var i = 1; i < k; i++)
	    res[i] = 0;

	  // Append length
	  len <<= 3;
	  if (this.endian === 'big') {
	    for (var t = 8; t < this.padLength; t++)
	      res[i++] = 0;

	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = (len >>> 24) & 0xff;
	    res[i++] = (len >>> 16) & 0xff;
	    res[i++] = (len >>> 8) & 0xff;
	    res[i++] = len & 0xff;
	  } else {
	    res[i++] = len & 0xff;
	    res[i++] = (len >>> 8) & 0xff;
	    res[i++] = (len >>> 16) & 0xff;
	    res[i++] = (len >>> 24) & 0xff;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;

	    for (t = 8; t < this.padLength; t++)
	      res[i++] = 0;
	  }

	  return res;
	};

	var sha = {};

	var common$4 = {};

	var utils$7 = utils$9;
	var rotr32 = utils$7.rotr32;

	function ft_1$1(s, x, y, z) {
	  if (s === 0)
	    return ch32$1(x, y, z);
	  if (s === 1 || s === 3)
	    return p32(x, y, z);
	  if (s === 2)
	    return maj32$1(x, y, z);
	}
	common$4.ft_1 = ft_1$1;

	function ch32$1(x, y, z) {
	  return (x & y) ^ ((~x) & z);
	}
	common$4.ch32 = ch32$1;

	function maj32$1(x, y, z) {
	  return (x & y) ^ (x & z) ^ (y & z);
	}
	common$4.maj32 = maj32$1;

	function p32(x, y, z) {
	  return x ^ y ^ z;
	}
	common$4.p32 = p32;

	function s0_256$1(x) {
	  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
	}
	common$4.s0_256 = s0_256$1;

	function s1_256$1(x) {
	  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
	}
	common$4.s1_256 = s1_256$1;

	function g0_256$1(x) {
	  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
	}
	common$4.g0_256 = g0_256$1;

	function g1_256$1(x) {
	  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
	}
	common$4.g1_256 = g1_256$1;

	var utils$6 = utils$9;
	var common$3 = common$5;
	var shaCommon$1 = common$4;

	var rotl32$1 = utils$6.rotl32;
	var sum32$2 = utils$6.sum32;
	var sum32_5$1 = utils$6.sum32_5;
	var ft_1 = shaCommon$1.ft_1;
	var BlockHash$3 = common$3.BlockHash;

	var sha1_K = [
	  0x5A827999, 0x6ED9EBA1,
	  0x8F1BBCDC, 0xCA62C1D6
	];

	function SHA1() {
	  if (!(this instanceof SHA1))
	    return new SHA1();

	  BlockHash$3.call(this);
	  this.h = [
	    0x67452301, 0xefcdab89, 0x98badcfe,
	    0x10325476, 0xc3d2e1f0 ];
	  this.W = new Array(80);
	}

	utils$6.inherits(SHA1, BlockHash$3);
	var _1 = SHA1;

	SHA1.blockSize = 512;
	SHA1.outSize = 160;
	SHA1.hmacStrength = 80;
	SHA1.padLength = 64;

	SHA1.prototype._update = function _update(msg, start) {
	  var W = this.W;

	  for (var i = 0; i < 16; i++)
	    W[i] = msg[start + i];

	  for(; i < W.length; i++)
	    W[i] = rotl32$1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

	  var a = this.h[0];
	  var b = this.h[1];
	  var c = this.h[2];
	  var d = this.h[3];
	  var e = this.h[4];

	  for (i = 0; i < W.length; i++) {
	    var s = ~~(i / 20);
	    var t = sum32_5$1(rotl32$1(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
	    e = d;
	    d = c;
	    c = rotl32$1(b, 30);
	    b = a;
	    a = t;
	  }

	  this.h[0] = sum32$2(this.h[0], a);
	  this.h[1] = sum32$2(this.h[1], b);
	  this.h[2] = sum32$2(this.h[2], c);
	  this.h[3] = sum32$2(this.h[3], d);
	  this.h[4] = sum32$2(this.h[4], e);
	};

	SHA1.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$6.toHex32(this.h, 'big');
	  else
	    return utils$6.split32(this.h, 'big');
	};

	var utils$5 = utils$9;
	var common$2 = common$5;
	var shaCommon = common$4;
	var assert$2 = minimalisticAssert;

	var sum32$1 = utils$5.sum32;
	var sum32_4$1 = utils$5.sum32_4;
	var sum32_5 = utils$5.sum32_5;
	var ch32 = shaCommon.ch32;
	var maj32 = shaCommon.maj32;
	var s0_256 = shaCommon.s0_256;
	var s1_256 = shaCommon.s1_256;
	var g0_256 = shaCommon.g0_256;
	var g1_256 = shaCommon.g1_256;

	var BlockHash$2 = common$2.BlockHash;

	var sha256_K = [
	  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
	];

	function SHA256$1() {
	  if (!(this instanceof SHA256$1))
	    return new SHA256$1();

	  BlockHash$2.call(this);
	  this.h = [
	    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
	    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
	  ];
	  this.k = sha256_K;
	  this.W = new Array(64);
	}
	utils$5.inherits(SHA256$1, BlockHash$2);
	var _256 = SHA256$1;

	SHA256$1.blockSize = 512;
	SHA256$1.outSize = 256;
	SHA256$1.hmacStrength = 192;
	SHA256$1.padLength = 64;

	SHA256$1.prototype._update = function _update(msg, start) {
	  var W = this.W;

	  for (var i = 0; i < 16; i++)
	    W[i] = msg[start + i];
	  for (; i < W.length; i++)
	    W[i] = sum32_4$1(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

	  var a = this.h[0];
	  var b = this.h[1];
	  var c = this.h[2];
	  var d = this.h[3];
	  var e = this.h[4];
	  var f = this.h[5];
	  var g = this.h[6];
	  var h = this.h[7];

	  assert$2(this.k.length === W.length);
	  for (i = 0; i < W.length; i++) {
	    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
	    var T2 = sum32$1(s0_256(a), maj32(a, b, c));
	    h = g;
	    g = f;
	    f = e;
	    e = sum32$1(d, T1);
	    d = c;
	    c = b;
	    b = a;
	    a = sum32$1(T1, T2);
	  }

	  this.h[0] = sum32$1(this.h[0], a);
	  this.h[1] = sum32$1(this.h[1], b);
	  this.h[2] = sum32$1(this.h[2], c);
	  this.h[3] = sum32$1(this.h[3], d);
	  this.h[4] = sum32$1(this.h[4], e);
	  this.h[5] = sum32$1(this.h[5], f);
	  this.h[6] = sum32$1(this.h[6], g);
	  this.h[7] = sum32$1(this.h[7], h);
	};

	SHA256$1.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$5.toHex32(this.h, 'big');
	  else
	    return utils$5.split32(this.h, 'big');
	};

	var utils$4 = utils$9;
	var SHA256 = _256;

	function SHA224() {
	  if (!(this instanceof SHA224))
	    return new SHA224();

	  SHA256.call(this);
	  this.h = [
	    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
	}
	utils$4.inherits(SHA224, SHA256);
	var _224 = SHA224;

	SHA224.blockSize = 512;
	SHA224.outSize = 224;
	SHA224.hmacStrength = 192;
	SHA224.padLength = 64;

	SHA224.prototype._digest = function digest(enc) {
	  // Just truncate output
	  if (enc === 'hex')
	    return utils$4.toHex32(this.h.slice(0, 7), 'big');
	  else
	    return utils$4.split32(this.h.slice(0, 7), 'big');
	};

	var utils$3 = utils$9;
	var common$1 = common$5;
	var assert$1 = minimalisticAssert;

	var rotr64_hi = utils$3.rotr64_hi;
	var rotr64_lo = utils$3.rotr64_lo;
	var shr64_hi = utils$3.shr64_hi;
	var shr64_lo = utils$3.shr64_lo;
	var sum64 = utils$3.sum64;
	var sum64_hi = utils$3.sum64_hi;
	var sum64_lo = utils$3.sum64_lo;
	var sum64_4_hi = utils$3.sum64_4_hi;
	var sum64_4_lo = utils$3.sum64_4_lo;
	var sum64_5_hi = utils$3.sum64_5_hi;
	var sum64_5_lo = utils$3.sum64_5_lo;

	var BlockHash$1 = common$1.BlockHash;

	var sha512_K = [
	  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	];

	function SHA512$1() {
	  if (!(this instanceof SHA512$1))
	    return new SHA512$1();

	  BlockHash$1.call(this);
	  this.h = [
	    0x6a09e667, 0xf3bcc908,
	    0xbb67ae85, 0x84caa73b,
	    0x3c6ef372, 0xfe94f82b,
	    0xa54ff53a, 0x5f1d36f1,
	    0x510e527f, 0xade682d1,
	    0x9b05688c, 0x2b3e6c1f,
	    0x1f83d9ab, 0xfb41bd6b,
	    0x5be0cd19, 0x137e2179 ];
	  this.k = sha512_K;
	  this.W = new Array(160);
	}
	utils$3.inherits(SHA512$1, BlockHash$1);
	var _512 = SHA512$1;

	SHA512$1.blockSize = 1024;
	SHA512$1.outSize = 512;
	SHA512$1.hmacStrength = 192;
	SHA512$1.padLength = 128;

	SHA512$1.prototype._prepareBlock = function _prepareBlock(msg, start) {
	  var W = this.W;

	  // 32 x 32bit words
	  for (var i = 0; i < 32; i++)
	    W[i] = msg[start + i];
	  for (; i < W.length; i += 2) {
	    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
	    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
	    var c1_hi = W[i - 14];  // i - 7
	    var c1_lo = W[i - 13];
	    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
	    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
	    var c3_hi = W[i - 32];  // i - 16
	    var c3_lo = W[i - 31];

	    W[i] = sum64_4_hi(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo);
	    W[i + 1] = sum64_4_lo(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo);
	  }
	};

	SHA512$1.prototype._update = function _update(msg, start) {
	  this._prepareBlock(msg, start);

	  var W = this.W;

	  var ah = this.h[0];
	  var al = this.h[1];
	  var bh = this.h[2];
	  var bl = this.h[3];
	  var ch = this.h[4];
	  var cl = this.h[5];
	  var dh = this.h[6];
	  var dl = this.h[7];
	  var eh = this.h[8];
	  var el = this.h[9];
	  var fh = this.h[10];
	  var fl = this.h[11];
	  var gh = this.h[12];
	  var gl = this.h[13];
	  var hh = this.h[14];
	  var hl = this.h[15];

	  assert$1(this.k.length === W.length);
	  for (var i = 0; i < W.length; i += 2) {
	    var c0_hi = hh;
	    var c0_lo = hl;
	    var c1_hi = s1_512_hi(eh, el);
	    var c1_lo = s1_512_lo(eh, el);
	    var c2_hi = ch64_hi(eh, el, fh, fl, gh);
	    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
	    var c3_hi = this.k[i];
	    var c3_lo = this.k[i + 1];
	    var c4_hi = W[i];
	    var c4_lo = W[i + 1];

	    var T1_hi = sum64_5_hi(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo,
	      c4_hi, c4_lo);
	    var T1_lo = sum64_5_lo(
	      c0_hi, c0_lo,
	      c1_hi, c1_lo,
	      c2_hi, c2_lo,
	      c3_hi, c3_lo,
	      c4_hi, c4_lo);

	    c0_hi = s0_512_hi(ah, al);
	    c0_lo = s0_512_lo(ah, al);
	    c1_hi = maj64_hi(ah, al, bh, bl, ch);
	    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

	    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
	    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

	    hh = gh;
	    hl = gl;

	    gh = fh;
	    gl = fl;

	    fh = eh;
	    fl = el;

	    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
	    el = sum64_lo(dl, dl, T1_hi, T1_lo);

	    dh = ch;
	    dl = cl;

	    ch = bh;
	    cl = bl;

	    bh = ah;
	    bl = al;

	    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
	    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
	  }

	  sum64(this.h, 0, ah, al);
	  sum64(this.h, 2, bh, bl);
	  sum64(this.h, 4, ch, cl);
	  sum64(this.h, 6, dh, dl);
	  sum64(this.h, 8, eh, el);
	  sum64(this.h, 10, fh, fl);
	  sum64(this.h, 12, gh, gl);
	  sum64(this.h, 14, hh, hl);
	};

	SHA512$1.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$3.toHex32(this.h, 'big');
	  else
	    return utils$3.split32(this.h, 'big');
	};

	function ch64_hi(xh, xl, yh, yl, zh) {
	  var r = (xh & yh) ^ ((~xh) & zh);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function ch64_lo(xh, xl, yh, yl, zh, zl) {
	  var r = (xl & yl) ^ ((~xl) & zl);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function maj64_hi(xh, xl, yh, yl, zh) {
	  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function maj64_lo(xh, xl, yh, yl, zh, zl) {
	  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s0_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 28);
	  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
	  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s0_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 28);
	  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
	  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s1_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 14);
	  var c1_hi = rotr64_hi(xh, xl, 18);
	  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s1_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 14);
	  var c1_lo = rotr64_lo(xh, xl, 18);
	  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g0_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 1);
	  var c1_hi = rotr64_hi(xh, xl, 8);
	  var c2_hi = shr64_hi(xh, xl, 7);

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g0_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 1);
	  var c1_lo = rotr64_lo(xh, xl, 8);
	  var c2_lo = shr64_lo(xh, xl, 7);

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g1_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 19);
	  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
	  var c2_hi = shr64_hi(xh, xl, 6);

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g1_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 19);
	  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
	  var c2_lo = shr64_lo(xh, xl, 6);

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	var utils$2 = utils$9;

	var SHA512 = _512;

	function SHA384() {
	  if (!(this instanceof SHA384))
	    return new SHA384();

	  SHA512.call(this);
	  this.h = [
	    0xcbbb9d5d, 0xc1059ed8,
	    0x629a292a, 0x367cd507,
	    0x9159015a, 0x3070dd17,
	    0x152fecd8, 0xf70e5939,
	    0x67332667, 0xffc00b31,
	    0x8eb44a87, 0x68581511,
	    0xdb0c2e0d, 0x64f98fa7,
	    0x47b5481d, 0xbefa4fa4 ];
	}
	utils$2.inherits(SHA384, SHA512);
	var _384 = SHA384;

	SHA384.blockSize = 1024;
	SHA384.outSize = 384;
	SHA384.hmacStrength = 192;
	SHA384.padLength = 128;

	SHA384.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$2.toHex32(this.h.slice(0, 12), 'big');
	  else
	    return utils$2.split32(this.h.slice(0, 12), 'big');
	};

	sha.sha1 = _1;
	sha.sha224 = _224;
	sha.sha256 = _256;
	sha.sha384 = _384;
	sha.sha512 = _512;

	var ripemd = {};

	var utils$1 = utils$9;
	var common = common$5;

	var rotl32 = utils$1.rotl32;
	var sum32 = utils$1.sum32;
	var sum32_3 = utils$1.sum32_3;
	var sum32_4 = utils$1.sum32_4;
	var BlockHash = common.BlockHash;

	function RIPEMD160() {
	  if (!(this instanceof RIPEMD160))
	    return new RIPEMD160();

	  BlockHash.call(this);

	  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
	  this.endian = 'little';
	}
	utils$1.inherits(RIPEMD160, BlockHash);
	ripemd.ripemd160 = RIPEMD160;

	RIPEMD160.blockSize = 512;
	RIPEMD160.outSize = 160;
	RIPEMD160.hmacStrength = 192;
	RIPEMD160.padLength = 64;

	RIPEMD160.prototype._update = function update(msg, start) {
	  var A = this.h[0];
	  var B = this.h[1];
	  var C = this.h[2];
	  var D = this.h[3];
	  var E = this.h[4];
	  var Ah = A;
	  var Bh = B;
	  var Ch = C;
	  var Dh = D;
	  var Eh = E;
	  for (var j = 0; j < 80; j++) {
	    var T = sum32(
	      rotl32(
	        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
	        s[j]),
	      E);
	    A = E;
	    E = D;
	    D = rotl32(C, 10);
	    C = B;
	    B = T;
	    T = sum32(
	      rotl32(
	        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
	        sh[j]),
	      Eh);
	    Ah = Eh;
	    Eh = Dh;
	    Dh = rotl32(Ch, 10);
	    Ch = Bh;
	    Bh = T;
	  }
	  T = sum32_3(this.h[1], C, Dh);
	  this.h[1] = sum32_3(this.h[2], D, Eh);
	  this.h[2] = sum32_3(this.h[3], E, Ah);
	  this.h[3] = sum32_3(this.h[4], A, Bh);
	  this.h[4] = sum32_3(this.h[0], B, Ch);
	  this.h[0] = T;
	};

	RIPEMD160.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils$1.toHex32(this.h, 'little');
	  else
	    return utils$1.split32(this.h, 'little');
	};

	function f(j, x, y, z) {
	  if (j <= 15)
	    return x ^ y ^ z;
	  else if (j <= 31)
	    return (x & y) | ((~x) & z);
	  else if (j <= 47)
	    return (x | (~y)) ^ z;
	  else if (j <= 63)
	    return (x & z) | (y & (~z));
	  else
	    return x ^ (y | (~z));
	}

	function K(j) {
	  if (j <= 15)
	    return 0x00000000;
	  else if (j <= 31)
	    return 0x5a827999;
	  else if (j <= 47)
	    return 0x6ed9eba1;
	  else if (j <= 63)
	    return 0x8f1bbcdc;
	  else
	    return 0xa953fd4e;
	}

	function Kh(j) {
	  if (j <= 15)
	    return 0x50a28be6;
	  else if (j <= 31)
	    return 0x5c4dd124;
	  else if (j <= 47)
	    return 0x6d703ef3;
	  else if (j <= 63)
	    return 0x7a6d76e9;
	  else
	    return 0x00000000;
	}

	var r = [
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
	  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
	  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
	  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
	];

	var rh = [
	  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
	  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
	  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
	  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
	  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
	];

	var s = [
	  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
	  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
	  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
	  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
	  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
	];

	var sh = [
	  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
	  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
	  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
	  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
	  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
	];

	var utils = utils$9;
	var assert = minimalisticAssert;

	function Hmac(hash, key, enc) {
	  if (!(this instanceof Hmac))
	    return new Hmac(hash, key, enc);
	  this.Hash = hash;
	  this.blockSize = hash.blockSize / 8;
	  this.outSize = hash.outSize / 8;
	  this.inner = null;
	  this.outer = null;

	  this._init(utils.toArray(key, enc));
	}
	var hmac = Hmac;

	Hmac.prototype._init = function init(key) {
	  // Shorten key, if needed
	  if (key.length > this.blockSize)
	    key = new this.Hash().update(key).digest();
	  assert(key.length <= this.blockSize);

	  // Add padding to key
	  for (var i = key.length; i < this.blockSize; i++)
	    key.push(0);

	  for (i = 0; i < key.length; i++)
	    key[i] ^= 0x36;
	  this.inner = new this.Hash().update(key);

	  // 0x36 ^ 0x5c = 0x6a
	  for (i = 0; i < key.length; i++)
	    key[i] ^= 0x6a;
	  this.outer = new this.Hash().update(key);
	};

	Hmac.prototype.update = function update(msg, enc) {
	  this.inner.update(msg, enc);
	  return this;
	};

	Hmac.prototype.digest = function digest(enc) {
	  this.outer.update(this.inner.digest());
	  return this.outer.digest(enc);
	};

	(function (exports) {
		var hash = exports;

		hash.utils = utils$9;
		hash.common = common$5;
		hash.sha = sha;
		hash.ripemd = ripemd;
		hash.hmac = hmac;

		// Proxy hash functions to the main object
		hash.sha1 = hash.sha.sha1;
		hash.sha256 = hash.sha.sha256;
		hash.sha224 = hash.sha.sha224;
		hash.sha384 = hash.sha.sha384;
		hash.sha512 = hash.sha.sha512;
		hash.ripemd160 = hash.ripemd.ripemd160; 
	} (hash$1));

	var util = {};

	var model = {};

	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		(function (TypeGroup) {
		    TypeGroup[TypeGroup["Primitive"] = 0] = "Primitive";
		    TypeGroup[TypeGroup["Array"] = 1] = "Array";
		    TypeGroup[TypeGroup["Object"] = 2] = "Object";
		    TypeGroup[TypeGroup["Date"] = 3] = "Date";
		})(exports.TypeGroup || (exports.TypeGroup = {}));
		
	} (model));

	Object.defineProperty(util, "__esModule", { value: true });
	var model_1$2 = model;
	function isHash(str) {
	    return str.length === 40;
	}
	util.isHash = isHash;
	function onlyUnique(value, index, self) {
	    return self.indexOf(value) === index;
	}
	util.onlyUnique = onlyUnique;
	function isArray$5(x) {
	    return Object.prototype.toString.call(x) === "[object Array]";
	}
	util.isArray = isArray$5;
	function isNonArrayUnion(typeName) {
	    var arrayUnionRegex = /^\(.*\)\[\]$/;
	    return typeName.includes(" | ") && !arrayUnionRegex.test(typeName);
	}
	util.isNonArrayUnion = isNonArrayUnion;
	function isObject$1(x) {
	    return Object.prototype.toString.call(x) === "[object Object]" && x !== null;
	}
	util.isObject = isObject$1;
	function isDate$2(x) {
	    return x instanceof Date;
	}
	util.isDate = isDate$2;
	function parseKeyMetaData$1(key) {
	    var isOptional = key.endsWith("--?");
	    if (isOptional) {
	        return {
	            isOptional: isOptional,
	            keyValue: key.slice(0, -3)
	        };
	    }
	    else {
	        return {
	            isOptional: isOptional,
	            keyValue: key
	        };
	    }
	}
	util.parseKeyMetaData = parseKeyMetaData$1;
	function getTypeDescriptionGroup(desc) {
	    if (desc === undefined) {
	        return model_1$2.TypeGroup.Primitive;
	    }
	    else if (desc.arrayOfTypes !== undefined) {
	        return model_1$2.TypeGroup.Array;
	    }
	    else {
	        return model_1$2.TypeGroup.Object;
	    }
	}
	util.getTypeDescriptionGroup = getTypeDescriptionGroup;
	function findTypeById(id, types) {
	    return types.find(function (_) { return _.id === id; });
	}
	util.findTypeById = findTypeById;

	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	var __spreadArrays = (commonjsGlobal && commonjsGlobal.__spreadArrays) || function () {
	    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
	    for (var r = Array(s), k = 0, i = 0; i < il; i++)
	        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
	            r[k] = a[j];
	    return r;
	};
	Object.defineProperty(getTypeStructure$1, "__esModule", { value: true });
	var hash = hash$1;
	var util_1$2 = util;
	var model_1$1 = model;
	function createTypeDescription(typeObj, isUnion) {
	    if (util_1$2.isArray(typeObj)) {
	        return {
	            id: Hash(JSON.stringify(__spreadArrays(typeObj, [isUnion]))),
	            arrayOfTypes: typeObj,
	            isUnion: isUnion,
	        };
	    }
	    else {
	        return {
	            id: Hash(JSON.stringify(typeObj)),
	            typeObj: typeObj,
	        };
	    }
	}
	function getIdByType(typeObj, types, isUnion) {
	    if (isUnion === void 0) { isUnion = false; }
	    var typeDesc = types.find(function (el) {
	        return typeObjectMatchesTypeDesc(typeObj, el, isUnion);
	    });
	    if (!typeDesc) {
	        typeDesc = createTypeDescription(typeObj, isUnion);
	        types.push(typeDesc);
	    }
	    return typeDesc.id;
	}
	function Hash(content) {
	    return hash.sha1().update(content).digest("hex");
	}
	function typeObjectMatchesTypeDesc(typeObj, typeDesc, isUnion) {
	    if (util_1$2.isArray(typeObj)) {
	        return arraysContainSameElements(typeObj, typeDesc.arrayOfTypes) && typeDesc.isUnion === isUnion;
	    }
	    else {
	        return objectsHaveSameEntries(typeObj, typeDesc.typeObj);
	    }
	}
	function arraysContainSameElements(arr1, arr2) {
	    if (arr1 === undefined || arr2 === undefined)
	        return false;
	    return arr1.sort().join("") === arr2.sort().join("");
	}
	function objectsHaveSameEntries(obj1, obj2) {
	    if (obj1 === undefined || obj2 === undefined)
	        return false;
	    var entries1 = Object.entries(obj1);
	    var entries2 = Object.entries(obj2);
	    var sameLength = entries1.length === entries2.length;
	    var sameTypes = entries1.every(function (_a) {
	        var key = _a[0], value = _a[1];
	        return obj2[key] === value;
	    });
	    return sameLength && sameTypes;
	}
	function getSimpleTypeName(value) {
	    if (value === null) {
	        return "null";
	    }
	    else if (value instanceof Date) {
	        return "Date";
	    }
	    else {
	        return typeof value;
	    }
	}
	function getTypeGroup(value) {
	    if (util_1$2.isDate(value)) {
	        return model_1$1.TypeGroup.Date;
	    }
	    else if (util_1$2.isArray(value)) {
	        return model_1$1.TypeGroup.Array;
	    }
	    else if (util_1$2.isObject(value)) {
	        return model_1$1.TypeGroup.Object;
	    }
	    else {
	        return model_1$1.TypeGroup.Primitive;
	    }
	}
	function createTypeObject(obj, types) {
	    return Object.entries(obj).reduce(function (typeObj, _a) {
	        var _b;
	        var key = _a[0], value = _a[1];
	        var rootTypeId = getTypeStructure(value, types).rootTypeId;
	        return __assign(__assign({}, typeObj), (_b = {}, _b[key] = rootTypeId, _b));
	    }, {});
	}
	function getMergedObjects(typesOfArray, types) {
	    var typeObjects = typesOfArray.map(function (typeDesc) { return typeDesc.typeObj; });
	    var allKeys = typeObjects
	        .map(function (typeObj) { return Object.keys(typeObj); })
	        .reduce(function (a, b) { return __spreadArrays(a, b); }, [])
	        .filter(util_1$2.onlyUnique);
	    var commonKeys = typeObjects.reduce(function (commonKeys, typeObj) {
	        var keys = Object.keys(typeObj);
	        return commonKeys.filter(function (key) { return keys.includes(key); });
	    }, allKeys);
	    var getKeyType = function (key) {
	        var typesOfKey = typeObjects
	            .filter(function (typeObj) {
	            return Object.keys(typeObj).includes(key);
	        })
	            .map(function (typeObj) { return typeObj[key]; })
	            .filter(util_1$2.onlyUnique);
	        if (typesOfKey.length === 1) {
	            return typesOfKey.pop();
	        }
	        else {
	            return getInnerArrayType(typesOfKey, types);
	        }
	    };
	    var typeObj = allKeys.reduce(function (obj, key) {
	        var _a;
	        var isMandatory = commonKeys.includes(key);
	        var type = getKeyType(key);
	        var keyValue = isMandatory ? key : toOptionalKey(key);
	        return __assign(__assign({}, obj), (_a = {}, _a[keyValue] = type, _a));
	    }, {});
	    return getIdByType(typeObj, types, true);
	}
	function toOptionalKey(key) {
	    return key.endsWith("--?") ? key : key + "--?";
	}
	function getMergedArrays(typesOfArray, types) {
	    var idsOfArrayTypes = typesOfArray
	        .map(function (typeDesc) { return typeDesc.arrayOfTypes; })
	        .reduce(function (a, b) { return __spreadArrays(a, b); }, [])
	        .filter(util_1$2.onlyUnique);
	    if (idsOfArrayTypes.length === 1) {
	        return getIdByType([idsOfArrayTypes.pop()], types);
	    }
	    else {
	        return getIdByType([getInnerArrayType(idsOfArrayTypes, types)], types);
	    }
	}
	// we merge union types example: (number | string), null -> (number | string | null)
	function getMergedUnion(typesOfArray, types) {
	    var innerUnionsTypes = typesOfArray
	        .map(function (id) {
	        return util_1$2.findTypeById(id, types);
	    })
	        .filter(function (_) { return !!_ && _.isUnion; })
	        .map(function (_) { return _.arrayOfTypes; })
	        .reduce(function (a, b) { return __spreadArrays(a, b); }, []);
	    var primitiveTypes = typesOfArray.filter(function (id) { return !util_1$2.findTypeById(id, types) || !util_1$2.findTypeById(id, types).isUnion; }); // primitives or not union
	    return getIdByType(__spreadArrays(innerUnionsTypes, primitiveTypes), types, true);
	}
	function getInnerArrayType(typesOfArray, types) {
	    // return inner array type
	    var containsUndefined = typesOfArray.includes("undefined");
	    var arrayTypesDescriptions = typesOfArray.map(function (id) { return util_1$2.findTypeById(id, types); }).filter(function (_) { return !!_; });
	    var allArrayType = arrayTypesDescriptions.filter(function (typeDesc) { return util_1$2.getTypeDescriptionGroup(typeDesc) === model_1$1.TypeGroup.Array; }).length ===
	        typesOfArray.length;
	    var allArrayTypeWithUndefined = arrayTypesDescriptions.filter(function (typeDesc) { return util_1$2.getTypeDescriptionGroup(typeDesc) === model_1$1.TypeGroup.Array; }).length + 1 ===
	        typesOfArray.length && containsUndefined;
	    var allObjectTypeWithUndefined = arrayTypesDescriptions.filter(function (typeDesc) { return util_1$2.getTypeDescriptionGroup(typeDesc) === model_1$1.TypeGroup.Object; }).length + 1 ===
	        typesOfArray.length && containsUndefined;
	    var allObjectType = arrayTypesDescriptions.filter(function (typeDesc) { return util_1$2.getTypeDescriptionGroup(typeDesc) === model_1$1.TypeGroup.Object; }).length ===
	        typesOfArray.length;
	    if (typesOfArray.length === 0) {
	        // no types in array -> empty union type
	        return getIdByType([], types, true);
	    }
	    if (typesOfArray.length === 1) {
	        // one type in array -> that will be our inner type
	        return typesOfArray.pop();
	    }
	    if (typesOfArray.length > 1) {
	        // multiple types in merge array
	        // if all are object we can merge them and return merged object as inner type
	        if (allObjectType)
	            return getMergedObjects(arrayTypesDescriptions, types);
	        // if all are array we can merge them and return merged array as inner type
	        if (allArrayType)
	            return getMergedArrays(arrayTypesDescriptions, types);
	        // all array types with posibble undefined, result type = undefined | (*mergedArray*)[]
	        if (allArrayTypeWithUndefined) {
	            return getMergedUnion([getMergedArrays(arrayTypesDescriptions, types), "undefined"], types);
	        }
	        // all object types with posibble undefined, result type = undefined | *mergedObject*
	        if (allObjectTypeWithUndefined) {
	            return getMergedUnion([getMergedObjects(arrayTypesDescriptions, types), "undefined"], types);
	        }
	        // if they are mixed or all primitive we cant merge them so we return as mixed union type
	        return getMergedUnion(typesOfArray, types);
	    }
	}
	function getTypeStructure(targetObj, // object that we want to create types for
	types) {
	    if (types === void 0) { types = []; }
	    switch (getTypeGroup(targetObj)) {
	        case model_1$1.TypeGroup.Array:
	            var typesOfArray = targetObj.map(function (_) { return getTypeStructure(_, types).rootTypeId; }).filter(util_1$2.onlyUnique);
	            var arrayInnerTypeId = getInnerArrayType(typesOfArray, types); // create "union type of array types"
	            var typeId = getIdByType([arrayInnerTypeId], types); // create type "array of union type"
	            return {
	                rootTypeId: typeId,
	                types: types,
	            };
	        case model_1$1.TypeGroup.Object:
	            var typeObj = createTypeObject(targetObj, types);
	            var objType = getIdByType(typeObj, types);
	            return {
	                rootTypeId: objType,
	                types: types,
	            };
	        case model_1$1.TypeGroup.Primitive:
	            return {
	                rootTypeId: getSimpleTypeName(targetObj),
	                types: types,
	            };
	        case model_1$1.TypeGroup.Date:
	            var dateType = getSimpleTypeName(targetObj);
	            return {
	                rootTypeId: dateType,
	                types: types,
	            };
	    }
	}
	getTypeStructure$1.getTypeStructure = getTypeStructure;
	function getAllUsedTypeIds(_a) {
	    var rootTypeId = _a.rootTypeId, types = _a.types;
	    var typeDesc = types.find(function (_) { return _.id === rootTypeId; });
	    var subTypes = function (typeDesc) {
	        switch (util_1$2.getTypeDescriptionGroup(typeDesc)) {
	            case model_1$1.TypeGroup.Array:
	                var arrSubTypes = typeDesc.arrayOfTypes
	                    .filter(util_1$2.isHash)
	                    .map(function (typeId) {
	                    var typeDesc = types.find(function (_) { return _.id === typeId; });
	                    return subTypes(typeDesc);
	                })
	                    .reduce(function (a, b) { return __spreadArrays(a, b); }, []);
	                return __spreadArrays([typeDesc.id], arrSubTypes);
	            case model_1$1.TypeGroup.Object:
	                var objSubTypes = Object.values(typeDesc.typeObj)
	                    .filter(util_1$2.isHash)
	                    .map(function (typeId) {
	                    var typeDesc = types.find(function (_) { return _.id === typeId; });
	                    return subTypes(typeDesc);
	                })
	                    .reduce(function (a, b) { return __spreadArrays(a, b); }, []);
	                return __spreadArrays([typeDesc.id], objSubTypes);
	        }
	    };
	    return subTypes(typeDesc);
	}
	function optimizeTypeStructure(typeStructure) {
	    var usedTypeIds = getAllUsedTypeIds(typeStructure);
	    var optimizedTypes = typeStructure.types.filter(function (typeDesc) { return usedTypeIds.includes(typeDesc.id); });
	    typeStructure.types = optimizedTypes;
	}
	getTypeStructure$1.optimizeTypeStructure = optimizeTypeStructure;

	var toStr$7 = Object.prototype.toString;

	var isArguments = function isArguments(value) {
		var str = toStr$7.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr$7.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};

	var implementation$w;
	var hasRequiredImplementation$1;

	function requireImplementation$1 () {
		if (hasRequiredImplementation$1) return implementation$w;
		hasRequiredImplementation$1 = 1;

		var keysShim;
		if (!Object.keys) {
			// modified from https://github.com/es-shims/es5-shim
			var has = Object.prototype.hasOwnProperty;
			var toStr = Object.prototype.toString;
			var isArgs = isArguments; // eslint-disable-line global-require
			var isEnumerable = Object.prototype.propertyIsEnumerable;
			var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
			var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
			var dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			];
			var equalsConstructorPrototype = function (o) {
				var ctor = o.constructor;
				return ctor && ctor.prototype === o;
			};
			var excludedKeys = {
				$applicationCache: true,
				$console: true,
				$external: true,
				$frame: true,
				$frameElement: true,
				$frames: true,
				$innerHeight: true,
				$innerWidth: true,
				$onmozfullscreenchange: true,
				$onmozfullscreenerror: true,
				$outerHeight: true,
				$outerWidth: true,
				$pageXOffset: true,
				$pageYOffset: true,
				$parent: true,
				$scrollLeft: true,
				$scrollTop: true,
				$scrollX: true,
				$scrollY: true,
				$self: true,
				$webkitIndexedDB: true,
				$webkitStorageInfo: true,
				$window: true
			};
			var hasAutomationEqualityBug = (function () {
				/* global window */
				if (typeof window === 'undefined') { return false; }
				for (var k in window) {
					try {
						if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
							try {
								equalsConstructorPrototype(window[k]);
							} catch (e) {
								return true;
							}
						}
					} catch (e) {
						return true;
					}
				}
				return false;
			}());
			var equalsConstructorPrototypeIfNotBuggy = function (o) {
				/* global window */
				if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
					return equalsConstructorPrototype(o);
				}
				try {
					return equalsConstructorPrototype(o);
				} catch (e) {
					return false;
				}
			};

			keysShim = function keys(object) {
				var isObject = object !== null && typeof object === 'object';
				var isFunction = toStr.call(object) === '[object Function]';
				var isArguments = isArgs(object);
				var isString = isObject && toStr.call(object) === '[object String]';
				var theKeys = [];

				if (!isObject && !isFunction && !isArguments) {
					throw new TypeError('Object.keys called on a non-object');
				}

				var skipProto = hasProtoEnumBug && isFunction;
				if (isString && object.length > 0 && !has.call(object, 0)) {
					for (var i = 0; i < object.length; ++i) {
						theKeys.push(String(i));
					}
				}

				if (isArguments && object.length > 0) {
					for (var j = 0; j < object.length; ++j) {
						theKeys.push(String(j));
					}
				} else {
					for (var name in object) {
						if (!(skipProto && name === 'prototype') && has.call(object, name)) {
							theKeys.push(String(name));
						}
					}
				}

				if (hasDontEnumBug) {
					var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

					for (var k = 0; k < dontEnums.length; ++k) {
						if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
							theKeys.push(dontEnums[k]);
						}
					}
				}
				return theKeys;
			};
		}
		implementation$w = keysShim;
		return implementation$w;
	}

	var slice = Array.prototype.slice;
	var isArgs = isArguments;

	var origKeys = Object.keys;
	var keysShim = origKeys ? function keys(o) { return origKeys(o); } : requireImplementation$1();

	var originalKeys = Object.keys;

	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				var args = Object.keys(arguments);
				return args && args.length === arguments.length;
			}(1, 2));
			if (!keysWorksWithArguments) {
				Object.keys = function keys(object) { // eslint-disable-line func-name-matching
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					}
					return originalKeys(object);
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};

	var objectKeys = keysShim;

	/** @type {import('.')} */
	var esErrors = Error;

	/** @type {import('./eval')} */
	var _eval = EvalError;

	/** @type {import('./range')} */
	var range = RangeError;

	/** @type {import('./ref')} */
	var ref = ReferenceError;

	/** @type {import('./syntax')} */
	var syntax = SyntaxError;

	/** @type {import('./type')} */
	var type = TypeError;

	/** @type {import('./uri')} */
	var uri = URIError;

	var shams$1;
	var hasRequiredShams;

	function requireShams () {
		if (hasRequiredShams) return shams$1;
		hasRequiredShams = 1;

		/* eslint complexity: [2, 18], max-statements: [2, 33] */
		shams$1 = function hasSymbols() {
			if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
			if (typeof Symbol.iterator === 'symbol') { return true; }

			var obj = {};
			var sym = Symbol('test');
			var symObj = Object(sym);
			if (typeof sym === 'string') { return false; }

			if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
			if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

			// temp disabled per https://github.com/ljharb/object.assign/issues/17
			// if (sym instanceof Symbol) { return false; }
			// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
			// if (!(symObj instanceof Symbol)) { return false; }

			// if (typeof Symbol.prototype.toString !== 'function') { return false; }
			// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

			var symVal = 42;
			obj[sym] = symVal;
			for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
			if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

			if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

			var syms = Object.getOwnPropertySymbols(obj);
			if (syms.length !== 1 || syms[0] !== sym) { return false; }

			if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

			if (typeof Object.getOwnPropertyDescriptor === 'function') {
				var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
				if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
			}

			return true;
		};
		return shams$1;
	}

	var origSymbol = typeof Symbol !== 'undefined' && Symbol;
	var hasSymbolSham = requireShams();

	var hasSymbols$4 = function hasNativeSymbols() {
		if (typeof origSymbol !== 'function') { return false; }
		if (typeof Symbol !== 'function') { return false; }
		if (typeof origSymbol('foo') !== 'symbol') { return false; }
		if (typeof Symbol('bar') !== 'symbol') { return false; }

		return hasSymbolSham();
	};

	var test = {
		__proto__: null,
		foo: {}
	};

	var $Object$4 = Object;

	/** @type {import('.')} */
	var hasProto$1 = function hasProto() {
		// @ts-expect-error: TS errors on an inherited property for some reason
		return { __proto__: test }.foo === test.foo
			&& !(test instanceof $Object$4);
	};

	/* eslint no-invalid-this: 1 */

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var toStr$6 = Object.prototype.toString;
	var max = Math.max;
	var funcType = '[object Function]';

	var concatty = function concatty(a, b) {
	    var arr = [];

	    for (var i = 0; i < a.length; i += 1) {
	        arr[i] = a[i];
	    }
	    for (var j = 0; j < b.length; j += 1) {
	        arr[j + a.length] = b[j];
	    }

	    return arr;
	};

	var slicy = function slicy(arrLike, offset) {
	    var arr = [];
	    for (var i = offset , j = 0; i < arrLike.length; i += 1, j += 1) {
	        arr[j] = arrLike[i];
	    }
	    return arr;
	};

	var joiny = function (arr, joiner) {
	    var str = '';
	    for (var i = 0; i < arr.length; i += 1) {
	        str += arr[i];
	        if (i + 1 < arr.length) {
	            str += joiner;
	        }
	    }
	    return str;
	};

	var implementation$v = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr$6.apply(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slicy(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                concatty(args, arguments)
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        }
	        return target.apply(
	            that,
	            concatty(args, arguments)
	        );

	    };

	    var boundLength = max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs[i] = '$' + i;
	    }

	    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};

	var implementation$u = implementation$v;

	var functionBind = Function.prototype.bind || implementation$u;

	var call = Function.prototype.call;
	var $hasOwn = Object.prototype.hasOwnProperty;
	var bind$1 = functionBind;

	/** @type {import('.')} */
	var hasown = bind$1.call(call, $hasOwn);

	var undefined$1;

	var $Error = esErrors;
	var $EvalError = _eval;
	var $RangeError = range;
	var $ReferenceError = ref;
	var $SyntaxError$2 = syntax;
	var $TypeError$m = type;
	var $URIError = uri;

	var $Function = Function;

	// eslint-disable-next-line consistent-return
	var getEvalledConstructor = function (expressionSyntax) {
		try {
			return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
		} catch (e) {}
	};

	var $gOPD$2 = Object.getOwnPropertyDescriptor;
	if ($gOPD$2) {
		try {
			$gOPD$2({}, '');
		} catch (e) {
			$gOPD$2 = null; // this is IE 8, which has a broken gOPD
		}
	}

	var throwTypeError = function () {
		throw new $TypeError$m();
	};
	var ThrowTypeError = $gOPD$2
		? (function () {
			try {
				// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
				arguments.callee; // IE 8 does not throw here
				return throwTypeError;
			} catch (calleeThrows) {
				try {
					// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
					return $gOPD$2(arguments, 'callee').get;
				} catch (gOPDthrows) {
					return throwTypeError;
				}
			}
		}())
		: throwTypeError;

	var hasSymbols$3 = hasSymbols$4();
	var hasProto = hasProto$1();

	var getProto = Object.getPrototypeOf || (
		hasProto
			? function (x) { return x.__proto__; } // eslint-disable-line no-proto
			: null
	);

	var needsEval = {};

	var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined$1 : getProto(Uint8Array);

	var INTRINSICS = {
		__proto__: null,
		'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
		'%Array%': Array,
		'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
		'%ArrayIteratorPrototype%': hasSymbols$3 && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
		'%AsyncFromSyncIteratorPrototype%': undefined$1,
		'%AsyncFunction%': needsEval,
		'%AsyncGenerator%': needsEval,
		'%AsyncGeneratorFunction%': needsEval,
		'%AsyncIteratorPrototype%': needsEval,
		'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
		'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
		'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined$1 : BigInt64Array,
		'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined$1 : BigUint64Array,
		'%Boolean%': Boolean,
		'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
		'%Date%': Date,
		'%decodeURI%': decodeURI,
		'%decodeURIComponent%': decodeURIComponent,
		'%encodeURI%': encodeURI,
		'%encodeURIComponent%': encodeURIComponent,
		'%Error%': $Error,
		'%eval%': eval, // eslint-disable-line no-eval
		'%EvalError%': $EvalError,
		'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
		'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
		'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
		'%Function%': $Function,
		'%GeneratorFunction%': needsEval,
		'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
		'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
		'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
		'%isFinite%': isFinite,
		'%isNaN%': isNaN,
		'%IteratorPrototype%': hasSymbols$3 && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
		'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
		'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
		'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$3 || !getProto ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
		'%Math%': Math,
		'%Number%': Number,
		'%Object%': Object,
		'%parseFloat%': parseFloat,
		'%parseInt%': parseInt,
		'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
		'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
		'%RangeError%': $RangeError,
		'%ReferenceError%': $ReferenceError,
		'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
		'%RegExp%': RegExp,
		'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
		'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$3 || !getProto ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
		'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
		'%String%': String,
		'%StringIteratorPrototype%': hasSymbols$3 && getProto ? getProto(''[Symbol.iterator]()) : undefined$1,
		'%Symbol%': hasSymbols$3 ? Symbol : undefined$1,
		'%SyntaxError%': $SyntaxError$2,
		'%ThrowTypeError%': ThrowTypeError,
		'%TypedArray%': TypedArray,
		'%TypeError%': $TypeError$m,
		'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
		'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
		'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
		'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
		'%URIError%': $URIError,
		'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
		'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
		'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
	};

	if (getProto) {
		try {
			null.error; // eslint-disable-line no-unused-expressions
		} catch (e) {
			// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
			var errorProto = getProto(getProto(e));
			INTRINSICS['%Error.prototype%'] = errorProto;
		}
	}

	var doEval = function doEval(name) {
		var value;
		if (name === '%AsyncFunction%') {
			value = getEvalledConstructor('async function () {}');
		} else if (name === '%GeneratorFunction%') {
			value = getEvalledConstructor('function* () {}');
		} else if (name === '%AsyncGeneratorFunction%') {
			value = getEvalledConstructor('async function* () {}');
		} else if (name === '%AsyncGenerator%') {
			var fn = doEval('%AsyncGeneratorFunction%');
			if (fn) {
				value = fn.prototype;
			}
		} else if (name === '%AsyncIteratorPrototype%') {
			var gen = doEval('%AsyncGenerator%');
			if (gen && getProto) {
				value = getProto(gen.prototype);
			}
		}

		INTRINSICS[name] = value;

		return value;
	};

	var LEGACY_ALIASES = {
		__proto__: null,
		'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
		'%ArrayPrototype%': ['Array', 'prototype'],
		'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
		'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
		'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
		'%ArrayProto_values%': ['Array', 'prototype', 'values'],
		'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
		'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
		'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
		'%BooleanPrototype%': ['Boolean', 'prototype'],
		'%DataViewPrototype%': ['DataView', 'prototype'],
		'%DatePrototype%': ['Date', 'prototype'],
		'%ErrorPrototype%': ['Error', 'prototype'],
		'%EvalErrorPrototype%': ['EvalError', 'prototype'],
		'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
		'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
		'%FunctionPrototype%': ['Function', 'prototype'],
		'%Generator%': ['GeneratorFunction', 'prototype'],
		'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
		'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
		'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
		'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
		'%JSONParse%': ['JSON', 'parse'],
		'%JSONStringify%': ['JSON', 'stringify'],
		'%MapPrototype%': ['Map', 'prototype'],
		'%NumberPrototype%': ['Number', 'prototype'],
		'%ObjectPrototype%': ['Object', 'prototype'],
		'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
		'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
		'%PromisePrototype%': ['Promise', 'prototype'],
		'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
		'%Promise_all%': ['Promise', 'all'],
		'%Promise_reject%': ['Promise', 'reject'],
		'%Promise_resolve%': ['Promise', 'resolve'],
		'%RangeErrorPrototype%': ['RangeError', 'prototype'],
		'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
		'%RegExpPrototype%': ['RegExp', 'prototype'],
		'%SetPrototype%': ['Set', 'prototype'],
		'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
		'%StringPrototype%': ['String', 'prototype'],
		'%SymbolPrototype%': ['Symbol', 'prototype'],
		'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
		'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
		'%TypeErrorPrototype%': ['TypeError', 'prototype'],
		'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
		'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
		'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
		'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
		'%URIErrorPrototype%': ['URIError', 'prototype'],
		'%WeakMapPrototype%': ['WeakMap', 'prototype'],
		'%WeakSetPrototype%': ['WeakSet', 'prototype']
	};

	var bind = functionBind;
	var hasOwn$5 = hasown;
	var $concat$2 = bind.call(Function.call, Array.prototype.concat);
	var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
	var $replace$4 = bind.call(Function.call, String.prototype.replace);
	var $strSlice$1 = bind.call(Function.call, String.prototype.slice);
	var $exec = bind.call(Function.call, RegExp.prototype.exec);

	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
	var stringToPath = function stringToPath(string) {
		var first = $strSlice$1(string, 0, 1);
		var last = $strSlice$1(string, -1);
		if (first === '%' && last !== '%') {
			throw new $SyntaxError$2('invalid intrinsic syntax, expected closing `%`');
		} else if (last === '%' && first !== '%') {
			throw new $SyntaxError$2('invalid intrinsic syntax, expected opening `%`');
		}
		var result = [];
		$replace$4(string, rePropName, function (match, number, quote, subString) {
			result[result.length] = quote ? $replace$4(subString, reEscapeChar, '$1') : number || match;
		});
		return result;
	};
	/* end adaptation */

	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
		var intrinsicName = name;
		var alias;
		if (hasOwn$5(LEGACY_ALIASES, intrinsicName)) {
			alias = LEGACY_ALIASES[intrinsicName];
			intrinsicName = '%' + alias[0] + '%';
		}

		if (hasOwn$5(INTRINSICS, intrinsicName)) {
			var value = INTRINSICS[intrinsicName];
			if (value === needsEval) {
				value = doEval(intrinsicName);
			}
			if (typeof value === 'undefined' && !allowMissing) {
				throw new $TypeError$m('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
			}

			return {
				alias: alias,
				name: intrinsicName,
				value: value
			};
		}

		throw new $SyntaxError$2('intrinsic ' + name + ' does not exist!');
	};

	var getIntrinsic = function GetIntrinsic(name, allowMissing) {
		if (typeof name !== 'string' || name.length === 0) {
			throw new $TypeError$m('intrinsic name must be a non-empty string');
		}
		if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
			throw new $TypeError$m('"allowMissing" argument must be a boolean');
		}

		if ($exec(/^%?[^%]*%?$/, name) === null) {
			throw new $SyntaxError$2('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
		}
		var parts = stringToPath(name);
		var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

		var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
		var intrinsicRealName = intrinsic.name;
		var value = intrinsic.value;
		var skipFurtherCaching = false;

		var alias = intrinsic.alias;
		if (alias) {
			intrinsicBaseName = alias[0];
			$spliceApply(parts, $concat$2([0, 1], alias));
		}

		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
			var part = parts[i];
			var first = $strSlice$1(part, 0, 1);
			var last = $strSlice$1(part, -1);
			if (
				(
					(first === '"' || first === "'" || first === '`')
					|| (last === '"' || last === "'" || last === '`')
				)
				&& first !== last
			) {
				throw new $SyntaxError$2('property names with quotes must have matching quotes');
			}
			if (part === 'constructor' || !isOwn) {
				skipFurtherCaching = true;
			}

			intrinsicBaseName += '.' + part;
			intrinsicRealName = '%' + intrinsicBaseName + '%';

			if (hasOwn$5(INTRINSICS, intrinsicRealName)) {
				value = INTRINSICS[intrinsicRealName];
			} else if (value != null) {
				if (!(part in value)) {
					if (!allowMissing) {
						throw new $TypeError$m('base intrinsic for ' + name + ' exists, but the property is not available.');
					}
					return void undefined$1;
				}
				if ($gOPD$2 && (i + 1) >= parts.length) {
					var desc = $gOPD$2(value, part);
					isOwn = !!desc;

					// By convention, when a data property is converted to an accessor
					// property to emulate a data property that does not suffer from
					// the override mistake, that accessor's getter is marked with
					// an `originalValue` property. Here, when we detect this, we
					// uphold the illusion by pretending to see that original data
					// property, i.e., returning the value rather than the getter
					// itself.
					if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
						value = desc.get;
					} else {
						value = value[part];
					}
				} else {
					isOwn = hasOwn$5(value, part);
					value = value[part];
				}

				if (isOwn && !skipFurtherCaching) {
					INTRINSICS[intrinsicRealName] = value;
				}
			}
		}
		return value;
	};

	var esDefineProperty;
	var hasRequiredEsDefineProperty;

	function requireEsDefineProperty () {
		if (hasRequiredEsDefineProperty) return esDefineProperty;
		hasRequiredEsDefineProperty = 1;

		var GetIntrinsic = getIntrinsic;

		/** @type {import('.')} */
		var $defineProperty = GetIntrinsic('%Object.defineProperty%', true) || false;
		if ($defineProperty) {
			try {
				$defineProperty({}, 'a', { value: 1 });
			} catch (e) {
				// IE 8 has a broken defineProperty
				$defineProperty = false;
			}
		}

		esDefineProperty = $defineProperty;
		return esDefineProperty;
	}

	var GetIntrinsic$c = getIntrinsic;

	var $gOPD$1 = GetIntrinsic$c('%Object.getOwnPropertyDescriptor%', true);

	if ($gOPD$1) {
		try {
			$gOPD$1([], 'length');
		} catch (e) {
			// IE 8 has a broken gOPD
			$gOPD$1 = null;
		}
	}

	var gopd$1 = $gOPD$1;

	var $defineProperty$2 = requireEsDefineProperty();

	var $SyntaxError$1 = syntax;
	var $TypeError$l = type;

	var gopd = gopd$1;

	/** @type {import('.')} */
	var defineDataProperty$1 = function defineDataProperty(
		obj,
		property,
		value
	) {
		if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
			throw new $TypeError$l('`obj` must be an object or a function`');
		}
		if (typeof property !== 'string' && typeof property !== 'symbol') {
			throw new $TypeError$l('`property` must be a string or a symbol`');
		}
		if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
			throw new $TypeError$l('`nonEnumerable`, if provided, must be a boolean or null');
		}
		if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
			throw new $TypeError$l('`nonWritable`, if provided, must be a boolean or null');
		}
		if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
			throw new $TypeError$l('`nonConfigurable`, if provided, must be a boolean or null');
		}
		if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
			throw new $TypeError$l('`loose`, if provided, must be a boolean');
		}

		var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
		var nonWritable = arguments.length > 4 ? arguments[4] : null;
		var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
		var loose = arguments.length > 6 ? arguments[6] : false;

		/* @type {false | TypedPropertyDescriptor<unknown>} */
		var desc = !!gopd && gopd(obj, property);

		if ($defineProperty$2) {
			$defineProperty$2(obj, property, {
				configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
				enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
				value: value,
				writable: nonWritable === null && desc ? desc.writable : !nonWritable
			});
		} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
			// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
			obj[property] = value; // eslint-disable-line no-param-reassign
		} else {
			throw new $SyntaxError$1('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
		}
	};

	var $defineProperty$1 = requireEsDefineProperty();

	var hasPropertyDescriptors$1 = function hasPropertyDescriptors() {
		return !!$defineProperty$1;
	};

	hasPropertyDescriptors$1.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
		// node v0.6 has a bug where array lengths can be Set but not Defined
		if (!$defineProperty$1) {
			return null;
		}
		try {
			return $defineProperty$1([], 'length', { value: 1 }).length !== 1;
		} catch (e) {
			// In Firefox 4-22, defining length on an array throws an exception.
			return true;
		}
	};

	var hasPropertyDescriptors_1 = hasPropertyDescriptors$1;

	var keys = objectKeys;
	var hasSymbols$2 = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

	var toStr$5 = Object.prototype.toString;
	var concat = Array.prototype.concat;
	var defineDataProperty = defineDataProperty$1;

	var isFunction$1 = function (fn) {
		return typeof fn === 'function' && toStr$5.call(fn) === '[object Function]';
	};

	var supportsDescriptors = hasPropertyDescriptors_1();

	var defineProperty = function (object, name, value, predicate) {
		if (name in object) {
			if (predicate === true) {
				if (object[name] === value) {
					return;
				}
			} else if (!isFunction$1(predicate) || !predicate()) {
				return;
			}
		}

		if (supportsDescriptors) {
			defineDataProperty(object, name, value, true);
		} else {
			defineDataProperty(object, name, value);
		}
	};

	var defineProperties = function (object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = keys(map);
		if (hasSymbols$2) {
			props = concat.call(props, Object.getOwnPropertySymbols(map));
		}
		for (var i = 0; i < props.length; i += 1) {
			defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
		}
	};

	defineProperties.supportsDescriptors = !!supportsDescriptors;

	var defineProperties_1 = defineProperties;

	var $TypeError$k = type;

	/** @type {import('./RequireObjectCoercible')} */
	var RequireObjectCoercible$b = function RequireObjectCoercible(value) {
		if (value == null) {
			throw new $TypeError$k((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
		}
		return value;
	};

	var callBind$d = {exports: {}};

	var GetIntrinsic$b = getIntrinsic;
	var define$h = defineDataProperty$1;
	var hasDescriptors = hasPropertyDescriptors_1();
	var gOPD$1 = gopd$1;

	var $TypeError$j = type;
	var $floor$3 = GetIntrinsic$b('%Math.floor%');

	/** @type {import('.')} */
	var setFunctionLength = function setFunctionLength(fn, length) {
		if (typeof fn !== 'function') {
			throw new $TypeError$j('`fn` is not a function');
		}
		if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor$3(length) !== length) {
			throw new $TypeError$j('`length` must be a positive 32-bit integer');
		}

		var loose = arguments.length > 2 && !!arguments[2];

		var functionLengthIsConfigurable = true;
		var functionLengthIsWritable = true;
		if ('length' in fn && gOPD$1) {
			var desc = gOPD$1(fn, 'length');
			if (desc && !desc.configurable) {
				functionLengthIsConfigurable = false;
			}
			if (desc && !desc.writable) {
				functionLengthIsWritable = false;
			}
		}

		if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
			if (hasDescriptors) {
				define$h(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
			} else {
				define$h(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
			}
		}
		return fn;
	};

	(function (module) {

		var bind = functionBind;
		var GetIntrinsic = getIntrinsic;
		var setFunctionLength$1 = setFunctionLength;

		var $TypeError = type;
		var $apply = GetIntrinsic('%Function.prototype.apply%');
		var $call = GetIntrinsic('%Function.prototype.call%');
		var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

		var $defineProperty = requireEsDefineProperty();
		var $max = GetIntrinsic('%Math.max%');

		module.exports = function callBind(originalFunction) {
			if (typeof originalFunction !== 'function') {
				throw new $TypeError('a function is required');
			}
			var func = $reflectApply(bind, $call, arguments);
			return setFunctionLength$1(
				func,
				1 + $max(0, originalFunction.length - (arguments.length - 1)),
				true
			);
		};

		var applyBind = function applyBind() {
			return $reflectApply(bind, $apply, arguments);
		};

		if ($defineProperty) {
			$defineProperty(module.exports, 'apply', { value: applyBind });
		} else {
			module.exports.apply = applyBind;
		} 
	} (callBind$d));

	var callBindExports = callBind$d.exports;

	var GetIntrinsic$a = getIntrinsic;

	var callBind$c = callBindExports;

	var $indexOf$1 = callBind$c(GetIntrinsic$a('String.prototype.indexOf'));

	var callBound$f = function callBoundIntrinsic(name, allowMissing) {
		var intrinsic = GetIntrinsic$a(name, !!allowMissing);
		if (typeof intrinsic === 'function' && $indexOf$1(name, '.prototype.') > -1) {
			return callBind$c(intrinsic);
		}
		return intrinsic;
	};

	var isPrimitive$6;
	var hasRequiredIsPrimitive$1;

	function requireIsPrimitive$1 () {
		if (hasRequiredIsPrimitive$1) return isPrimitive$6;
		hasRequiredIsPrimitive$1 = 1;

		isPrimitive$6 = function isPrimitive(value) {
			return value === null || (typeof value !== 'function' && typeof value !== 'object');
		};
		return isPrimitive$6;
	}

	var isPrimitive$5;
	var hasRequiredIsPrimitive;

	function requireIsPrimitive () {
		if (hasRequiredIsPrimitive) return isPrimitive$5;
		hasRequiredIsPrimitive = 1;

		isPrimitive$5 = function isPrimitive(value) {
			return value === null || (typeof value !== 'function' && typeof value !== 'object');
		};
		return isPrimitive$5;
	}

	var fnToStr = Function.prototype.toString;
	var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
	var badArrayLike;
	var isCallableMarker;
	if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
		try {
			badArrayLike = Object.defineProperty({}, 'length', {
				get: function () {
					throw isCallableMarker;
				}
			});
			isCallableMarker = {};
			// eslint-disable-next-line no-throw-literal
			reflectApply(function () { throw 42; }, null, badArrayLike);
		} catch (_) {
			if (_ !== isCallableMarker) {
				reflectApply = null;
			}
		}
	} else {
		reflectApply = null;
	}

	var constructorRegex = /^\s*class\b/;
	var isES6ClassFn = function isES6ClassFunction(value) {
		try {
			var fnStr = fnToStr.call(value);
			return constructorRegex.test(fnStr);
		} catch (e) {
			return false; // not a function
		}
	};

	var tryFunctionObject = function tryFunctionToStr(value) {
		try {
			if (isES6ClassFn(value)) { return false; }
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr$4 = Object.prototype.toString;
	var objectClass = '[object Object]';
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var ddaClass = '[object HTMLAllCollection]'; // IE 11
	var ddaClass2 = '[object HTML document.all class]';
	var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
	var hasToStringTag$1 = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

	var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

	var isDDA = function isDocumentDotAll() { return false; };
	if (typeof document === 'object') {
		// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
		var all = document.all;
		if (toStr$4.call(all) === toStr$4.call(document.all)) {
			isDDA = function isDocumentDotAll(value) {
				/* globals document: false */
				// in IE 6-8, typeof document.all is "object" and it's truthy
				if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
					try {
						var str = toStr$4.call(value);
						return (
							str === ddaClass
							|| str === ddaClass2
							|| str === ddaClass3 // opera 12.16
							|| str === objectClass // IE 6-8
						) && value('') == null; // eslint-disable-line eqeqeq
					} catch (e) { /**/ }
				}
				return false;
			};
		}
	}

	var isCallable$1 = reflectApply
		? function isCallable(value) {
			if (isDDA(value)) { return true; }
			if (!value) { return false; }
			if (typeof value !== 'function' && typeof value !== 'object') { return false; }
			try {
				reflectApply(value, null, badArrayLike);
			} catch (e) {
				if (e !== isCallableMarker) { return false; }
			}
			return !isES6ClassFn(value) && tryFunctionObject(value);
		}
		: function isCallable(value) {
			if (isDDA(value)) { return true; }
			if (!value) { return false; }
			if (typeof value !== 'function' && typeof value !== 'object') { return false; }
			if (hasToStringTag$1) { return tryFunctionObject(value); }
			if (isES6ClassFn(value)) { return false; }
			var strClass = toStr$4.call(value);
			if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
			return tryFunctionObject(value);
		};

	var hasSymbols$1 = requireShams();

	/** @type {import('.')} */
	var shams = function hasToStringTagShams() {
		return hasSymbols$1() && !!Symbol.toStringTag;
	};

	var isDateObject;
	var hasRequiredIsDateObject;

	function requireIsDateObject () {
		if (hasRequiredIsDateObject) return isDateObject;
		hasRequiredIsDateObject = 1;

		var getDay = Date.prototype.getDay;
		var tryDateObject = function tryDateGetDayCall(value) {
			try {
				getDay.call(value);
				return true;
			} catch (e) {
				return false;
			}
		};

		var toStr = Object.prototype.toString;
		var dateClass = '[object Date]';
		var hasToStringTag = shams();

		isDateObject = function isDateObject(value) {
			if (typeof value !== 'object' || value === null) {
				return false;
			}
			return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
		};
		return isDateObject;
	}

	var isSymbol$2 = {exports: {}};

	var hasRequiredIsSymbol;

	function requireIsSymbol () {
		if (hasRequiredIsSymbol) return isSymbol$2.exports;
		hasRequiredIsSymbol = 1;

		var toStr = Object.prototype.toString;
		var hasSymbols = hasSymbols$4();

		if (hasSymbols) {
			var symToStr = Symbol.prototype.toString;
			var symStringRegex = /^Symbol\(.*\)$/;
			var isSymbolObject = function isRealSymbolObject(value) {
				if (typeof value.valueOf() !== 'symbol') {
					return false;
				}
				return symStringRegex.test(symToStr.call(value));
			};

			isSymbol$2.exports = function isSymbol(value) {
				if (typeof value === 'symbol') {
					return true;
				}
				if (toStr.call(value) !== '[object Symbol]') {
					return false;
				}
				try {
					return isSymbolObject(value);
				} catch (e) {
					return false;
				}
			};
		} else {

			isSymbol$2.exports = function isSymbol(value) {
				// this environment does not support Symbols.
				return false ;
			};
		}
		return isSymbol$2.exports;
	}

	var es2015;
	var hasRequiredEs2015;

	function requireEs2015 () {
		if (hasRequiredEs2015) return es2015;
		hasRequiredEs2015 = 1;

		var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

		var isPrimitive = requireIsPrimitive();
		var isCallable = isCallable$1;
		var isDate = requireIsDateObject();
		var isSymbol = requireIsSymbol();

		var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
			if (typeof O === 'undefined' || O === null) {
				throw new TypeError('Cannot call method on ' + O);
			}
			if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
				throw new TypeError('hint must be "string" or "number"');
			}
			var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var method, result, i;
			for (i = 0; i < methodNames.length; ++i) {
				method = O[methodNames[i]];
				if (isCallable(method)) {
					result = method.call(O);
					if (isPrimitive(result)) {
						return result;
					}
				}
			}
			throw new TypeError('No default value');
		};

		var GetMethod = function GetMethod(O, P) {
			var func = O[P];
			if (func !== null && typeof func !== 'undefined') {
				if (!isCallable(func)) {
					throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
				}
				return func;
			}
			return void 0;
		};

		// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
		es2015 = function ToPrimitive(input) {
			if (isPrimitive(input)) {
				return input;
			}
			var hint = 'default';
			if (arguments.length > 1) {
				if (arguments[1] === String) {
					hint = 'string';
				} else if (arguments[1] === Number) {
					hint = 'number';
				}
			}

			var exoticToPrim;
			if (hasSymbols) {
				if (Symbol.toPrimitive) {
					exoticToPrim = GetMethod(input, Symbol.toPrimitive);
				} else if (isSymbol(input)) {
					exoticToPrim = Symbol.prototype.valueOf;
				}
			}
			if (typeof exoticToPrim !== 'undefined') {
				var result = exoticToPrim.call(input, hint);
				if (isPrimitive(result)) {
					return result;
				}
				throw new TypeError('unable to convert exotic object to primitive');
			}
			if (hint === 'default' && (isDate(input) || isSymbol(input))) {
				hint = 'string';
			}
			return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
		};
		return es2015;
	}

	var ToPrimitive$5;
	var hasRequiredToPrimitive$1;

	function requireToPrimitive$1 () {
		if (hasRequiredToPrimitive$1) return ToPrimitive$5;
		hasRequiredToPrimitive$1 = 1;

		var toPrimitive = requireEs2015();

		// https://262.ecma-international.org/6.0/#sec-toprimitive

		ToPrimitive$5 = function ToPrimitive(input) {
			if (arguments.length > 1) {
				return toPrimitive(input, arguments[1]);
			}
			return toPrimitive(input);
		};
		return ToPrimitive$5;
	}

	var isRegex;
	var hasRequiredIsRegex;

	function requireIsRegex () {
		if (hasRequiredIsRegex) return isRegex;
		hasRequiredIsRegex = 1;

		var callBound = callBound$f;
		var hasToStringTag = shams();
		var has;
		var $exec;
		var isRegexMarker;
		var badStringifier;

		if (hasToStringTag) {
			has = callBound('Object.prototype.hasOwnProperty');
			$exec = callBound('RegExp.prototype.exec');
			isRegexMarker = {};

			var throwRegexMarker = function () {
				throw isRegexMarker;
			};
			badStringifier = {
				toString: throwRegexMarker,
				valueOf: throwRegexMarker
			};

			if (typeof Symbol.toPrimitive === 'symbol') {
				badStringifier[Symbol.toPrimitive] = throwRegexMarker;
			}
		}

		var $toString = callBound('Object.prototype.toString');
		var gOPD = Object.getOwnPropertyDescriptor;
		var regexClass = '[object RegExp]';

		isRegex = hasToStringTag
			// eslint-disable-next-line consistent-return
			? function isRegex(value) {
				if (!value || typeof value !== 'object') {
					return false;
				}

				var descriptor = gOPD(value, 'lastIndex');
				var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
				if (!hasLastIndexDataProperty) {
					return false;
				}

				try {
					$exec(value, badStringifier);
				} catch (e) {
					return e === isRegexMarker;
				}
			}
			: function isRegex(value) {
				// In older browsers, typeof regex incorrectly returns 'function'
				if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
					return false;
				}

				return $toString(value) === regexClass;
			};
		return isRegex;
	}

	var safeRegexTest;
	var hasRequiredSafeRegexTest;

	function requireSafeRegexTest () {
		if (hasRequiredSafeRegexTest) return safeRegexTest;
		hasRequiredSafeRegexTest = 1;

		var callBound = callBound$f;
		var isRegex = requireIsRegex();

		var $exec = callBound('RegExp.prototype.exec');
		var $TypeError = type;

		safeRegexTest = function regexTester(regex) {
			if (!isRegex(regex)) {
				throw new $TypeError('`regex` must be a RegExp');
			}
			return function test(s) {
				return $exec(regex, s) !== null;
			};
		};
		return safeRegexTest;
	}

	var GetIntrinsic$9 = getIntrinsic;

	var $String$2 = GetIntrinsic$9('%String%');
	var $TypeError$i = type;

	// https://262.ecma-international.org/6.0/#sec-tostring

	var ToString$5 = function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new $TypeError$i('Cannot convert a Symbol value to a string');
		}
		return $String$2(argument);
	};

	var implementation$t;
	var hasRequiredImplementation;

	function requireImplementation () {
		if (hasRequiredImplementation) return implementation$t;
		hasRequiredImplementation = 1;

		var RequireObjectCoercible = RequireObjectCoercible$b;
		var ToString = ToString$5;
		var callBound = callBound$f;
		var $replace = callBound('String.prototype.replace');

		var mvsIsWS = (/^\s$/).test('\u180E');
		/* eslint-disable no-control-regex */
		var leftWhitespace = mvsIsWS
			? /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/
			: /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
		var rightWhitespace = mvsIsWS
			? /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/
			: /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;
		/* eslint-enable no-control-regex */

		implementation$t = function trim() {
			var S = ToString(RequireObjectCoercible(this));
			return $replace($replace(S, leftWhitespace, ''), rightWhitespace, '');
		};
		return implementation$t;
	}

	var polyfill$d;
	var hasRequiredPolyfill;

	function requirePolyfill () {
		if (hasRequiredPolyfill) return polyfill$d;
		hasRequiredPolyfill = 1;

		var implementation = requireImplementation();

		var zeroWidthSpace = '\u200b';
		var mongolianVowelSeparator = '\u180E';

		polyfill$d = function getPolyfill() {
			if (
				String.prototype.trim
				&& zeroWidthSpace.trim() === zeroWidthSpace
				&& mongolianVowelSeparator.trim() === mongolianVowelSeparator
				&& ('_' + mongolianVowelSeparator).trim() === ('_' + mongolianVowelSeparator)
				&& (mongolianVowelSeparator + '_').trim() === (mongolianVowelSeparator + '_')
			) {
				return String.prototype.trim;
			}
			return implementation;
		};
		return polyfill$d;
	}

	var shim$i;
	var hasRequiredShim$2;

	function requireShim$2 () {
		if (hasRequiredShim$2) return shim$i;
		hasRequiredShim$2 = 1;

		var define = defineProperties_1;
		var getPolyfill = requirePolyfill();

		shim$i = function shimStringTrim() {
			var polyfill = getPolyfill();
			define(String.prototype, { trim: polyfill }, {
				trim: function testTrim() {
					return String.prototype.trim !== polyfill;
				}
			});
			return polyfill;
		};
		return shim$i;
	}

	var string_prototype_trim;
	var hasRequiredString_prototype_trim;

	function requireString_prototype_trim () {
		if (hasRequiredString_prototype_trim) return string_prototype_trim;
		hasRequiredString_prototype_trim = 1;

		var callBind = callBindExports;
		var define = defineProperties_1;
		var RequireObjectCoercible = RequireObjectCoercible$b;

		var implementation = requireImplementation();
		var getPolyfill = requirePolyfill();
		var shim = requireShim$2();

		var bound = callBind(getPolyfill());
		var boundMethod = function trim(receiver) {
			RequireObjectCoercible(receiver);
			return bound(receiver);
		};

		define(boundMethod, {
			getPolyfill: getPolyfill,
			implementation: implementation,
			shim: shim
		});

		string_prototype_trim = boundMethod;
		return string_prototype_trim;
	}

	var StringToNumber$1;
	var hasRequiredStringToNumber;

	function requireStringToNumber () {
		if (hasRequiredStringToNumber) return StringToNumber$1;
		hasRequiredStringToNumber = 1;

		var GetIntrinsic = getIntrinsic;

		var $Number = GetIntrinsic('%Number%');
		var $RegExp = GetIntrinsic('%RegExp%');
		var $TypeError = type;
		var $parseInteger = GetIntrinsic('%parseInt%');

		var callBound = callBound$f;
		var regexTester = requireSafeRegexTest();

		var $strSlice = callBound('String.prototype.slice');
		var isBinary = regexTester(/^0b[01]+$/i);
		var isOctal = regexTester(/^0o[0-7]+$/i);
		var isInvalidHexLiteral = regexTester(/^[-+]0x[0-9a-f]+$/i);
		var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
		var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
		var hasNonWS = regexTester(nonWSregex);

		var $trim = requireString_prototype_trim();

		// https://262.ecma-international.org/13.0/#sec-stringtonumber

		StringToNumber$1 = function StringToNumber(argument) {
			if (typeof argument !== 'string') {
				throw new $TypeError('Assertion failed: `argument` is not a String');
			}
			if (isBinary(argument)) {
				return $Number($parseInteger($strSlice(argument, 2), 2));
			}
			if (isOctal(argument)) {
				return $Number($parseInteger($strSlice(argument, 2), 8));
			}
			if (hasNonWS(argument) || isInvalidHexLiteral(argument)) {
				return NaN;
			}
			var trimmed = $trim(argument);
			if (trimmed !== argument) {
				return StringToNumber(trimmed);
			}
			return $Number(argument);
		};
		return StringToNumber$1;
	}

	var GetIntrinsic$8 = getIntrinsic;

	var $TypeError$h = type;
	var $Number$1 = GetIntrinsic$8('%Number%');
	var isPrimitive$4 = requireIsPrimitive$1();

	var ToPrimitive$4 = requireToPrimitive$1();
	var StringToNumber = requireStringToNumber();

	// https://262.ecma-international.org/13.0/#sec-tonumber

	var ToNumber$5 = function ToNumber(argument) {
		var value = isPrimitive$4(argument) ? argument : ToPrimitive$4(argument, $Number$1);
		if (typeof value === 'symbol') {
			throw new $TypeError$h('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'bigint') {
			throw new $TypeError$h('Conversion from \'BigInt\' to \'number\' is not allowed.');
		}
		if (typeof value === 'string') {
			return StringToNumber(value);
		}
		return $Number$1(value);
	};

	// var modulo = require('./modulo');
	var $floor$2 = Math.floor;

	// http://262.ecma-international.org/11.0/#eqn-floor

	var floor$3 = function floor(x) {
		// return x - modulo(x, 1);
		if (typeof x === 'bigint') {
			return x;
		}
		return $floor$2(x);
	};

	var floor$2 = floor$3;

	var $TypeError$g = type;

	// https://262.ecma-international.org/14.0/#eqn-truncate

	var truncate$1 = function truncate(x) {
		if (typeof x !== 'number' && typeof x !== 'bigint') {
			throw new $TypeError$g('argument must be a Number or a BigInt');
		}
		var result = x < 0 ? -floor$2(-x) : floor$2(x);
		return result === 0 ? 0 : result; // in the spec, these are math values, so we filter out -0 here
	};

	var _isNaN = Number.isNaN || function isNaN(a) {
		return a !== a;
	};

	var $isNaN$5 = _isNaN;

	var _isFinite = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN$5(x) && x !== Infinity && x !== -Infinity; };

	var ToNumber$4 = ToNumber$5;
	var truncate = truncate$1;

	var $isNaN$4 = _isNaN;
	var $isFinite$2 = _isFinite;

	// https://262.ecma-international.org/14.0/#sec-tointegerorinfinity

	var ToIntegerOrInfinity$2 = function ToIntegerOrInfinity(value) {
		var number = ToNumber$4(value);
		if ($isNaN$4(number) || number === 0) { return 0; }
		if (!$isFinite$2(number)) { return number; }
		return truncate(number);
	};

	var maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991; // Math.pow(2, 53) - 1;

	var MAX_SAFE_INTEGER = maxSafeInteger;

	var ToIntegerOrInfinity$1 = ToIntegerOrInfinity$2;

	var ToLength$4 = function ToLength(argument) {
		var len = ToIntegerOrInfinity$1(argument);
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
		return len;
	};

	/** @type {import('.')} */
	var esObjectAtoms = Object;

	var $Object$3 = esObjectAtoms;
	var RequireObjectCoercible$a = RequireObjectCoercible$b;

	/** @type {import('./ToObject')} */
	var ToObject$5 = function ToObject(value) {
		RequireObjectCoercible$a(value);
		return $Object$3(value);
	};

	var $isNaN$3 = _isNaN;

	// https://262.ecma-international.org/6.0/#sec-samevaluezero

	var SameValueZero$1 = function SameValueZero(x, y) {
		return (x === y) || ($isNaN$3(x) && $isNaN$3(y));
	};

	var strValue = String.prototype.valueOf;
	var tryStringObject = function tryStringObject(value) {
		try {
			strValue.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr$3 = Object.prototype.toString;
	var strClass = '[object String]';
	var hasToStringTag = shams();

	var isString$4 = function isString(value) {
		if (typeof value === 'string') {
			return true;
		}
		if (typeof value !== 'object') {
			return false;
		}
		return hasToStringTag ? tryStringObject(value) : toStr$3.call(value) === strClass;
	};

	var ToIntegerOrInfinity = ToIntegerOrInfinity$2;
	var ToLength$3 = ToLength$4;
	var ToObject$4 = ToObject$5;
	var SameValueZero = SameValueZero$1;
	var $isNaN$2 = _isNaN;
	var $isFinite$1 = _isFinite;
	var GetIntrinsic$7 = getIntrinsic;
	var callBound$e = callBound$f;
	var isString$3 = isString$4;

	var $charAt = callBound$e('String.prototype.charAt');
	var $indexOf = GetIntrinsic$7('%Array.prototype.indexOf%'); // TODO: use callBind.apply without breaking IE 8
	var $max = GetIntrinsic$7('%Math.max%');

	var implementation$s = function includes(searchElement) {
		var fromIndex = arguments.length > 1 ? ToIntegerOrInfinity(arguments[1]) : 0;
		if ($indexOf && !$isNaN$2(searchElement) && $isFinite$1(fromIndex) && typeof searchElement !== 'undefined') {
			return $indexOf.apply(this, arguments) > -1;
		}

		var O = ToObject$4(this);
		var length = ToLength$3(O.length);
		if (length === 0) {
			return false;
		}
		var k = fromIndex >= 0 ? fromIndex : $max(0, length + fromIndex);
		while (k < length) {
			if (SameValueZero(searchElement, isString$3(O) ? $charAt(O, k) : O[k])) {
				return true;
			}
			k += 1;
		}
		return false;
	};

	var implementation$r = implementation$s;

	var polyfill$c = function getPolyfill() {
		if (
			Array.prototype.includes
			&& Array(1).includes(undefined) // https://bugzilla.mozilla.org/show_bug.cgi?id=1767541
		) {
			return Array.prototype.includes;
		}
		return implementation$r;
	};

	var shim$h;
	var hasRequiredShim$1;

	function requireShim$1 () {
		if (hasRequiredShim$1) return shim$h;
		hasRequiredShim$1 = 1;

		var define = defineProperties_1;
		var getPolyfill = polyfill$c;

		shim$h = function shimArrayPrototypeIncludes() {
			var polyfill = getPolyfill();
			define(
				Array.prototype,
				{ includes: polyfill },
				{ includes: function () { return Array.prototype.includes !== polyfill; } }
			);
			return polyfill;
		};
		return shim$h;
	}

	var define$g = defineProperties_1;
	var RequireObjectCoercible$9 = RequireObjectCoercible$b;
	var callBind$b = callBindExports;
	var callBound$d = callBound$f;

	var implementation$q = implementation$s;
	var getPolyfill$f = polyfill$c;
	var polyfill$b = callBind$b.apply(getPolyfill$f());
	var shim$g = requireShim$1();

	var $slice$5 = callBound$d('Array.prototype.slice');

	/* eslint-disable no-unused-vars */
	var boundShim$1 = function includes(array, searchElement) {
	/* eslint-enable no-unused-vars */
		RequireObjectCoercible$9(array);
		return polyfill$b(array, $slice$5(arguments, 1));
	};
	define$g(boundShim$1, {
		getPolyfill: getPolyfill$f,
		implementation: implementation$q,
		shim: shim$g
	});

	var arrayIncludes = boundShim$1;

	var Array_prototype_includes = arrayIncludes;

	var includes = Array_prototype_includes;

	var Array_prototype = {
		includes: includes,
		shim: function shimArrayPrototype() {
			includes.shim();
		}
	};

	var proto = Array_prototype;

	var _Array = {
		prototype: proto,
		shim: function shimArray() {
			proto.shim();
		}
	};

	// https://262.ecma-international.org/6.0/#sec-ispropertykey

	var IsPropertyKey$5 = function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	};

	var $TypeError$f = type;

	var hasOwn$4 = hasown;

	var allowed = {
		__proto__: null,
		'[[Configurable]]': true,
		'[[Enumerable]]': true,
		'[[Get]]': true,
		'[[Set]]': true,
		'[[Value]]': true,
		'[[Writable]]': true
	};

	// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

	var propertyDescriptor = function isPropertyDescriptor(Desc) {
		if (!Desc || typeof Desc !== 'object') {
			return false;
		}

		for (var key in Desc) { // eslint-disable-line
			if (hasOwn$4(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = hasOwn$4(Desc, '[[Value]]') || hasOwn$4(Desc, '[[Writable]]');
		var IsAccessor = hasOwn$4(Desc, '[[Get]]') || hasOwn$4(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError$f('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	};

	var $TypeError$e = type;

	var hasOwn$3 = hasown;

	var isPropertyDescriptor$6 = propertyDescriptor;

	// https://262.ecma-international.org/5.1/#sec-8.10.1

	var IsAccessorDescriptor$3 = function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!isPropertyDescriptor$6(Desc)) {
			throw new $TypeError$e('Assertion failed: `Desc` must be a Property Descriptor');
		}

		if (!hasOwn$3(Desc, '[[Get]]') && !hasOwn$3(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	};

	var GetIntrinsic$6 = getIntrinsic;

	var $preventExtensions = GetIntrinsic$6('%Object.preventExtensions%', true);
	var $isExtensible = GetIntrinsic$6('%Object.isExtensible%', true);

	var isPrimitive$3 = requireIsPrimitive$1();

	// https://262.ecma-international.org/6.0/#sec-isextensible-o

	var IsExtensible$1 = $preventExtensions
		? function IsExtensible(obj) {
			return !isPrimitive$3(obj) && $isExtensible(obj);
		}
		: function IsExtensible(obj) {
			return !isPrimitive$3(obj);
		};

	// https://262.ecma-international.org/5.1/#sec-8

	var Type$8 = function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	};

	var ES5Type = Type$8;

	// https://262.ecma-international.org/11.0/#sec-ecmascript-data-types-and-values

	var Type$7 = function Type(x) {
		if (typeof x === 'symbol') {
			return 'Symbol';
		}
		if (typeof x === 'bigint') {
			return 'BigInt';
		}
		return ES5Type(x);
	};

	// http://262.ecma-international.org/5.1/#sec-9.2

	var ToBoolean$1 = function ToBoolean(value) { return !!value; };

	// http://262.ecma-international.org/5.1/#sec-9.11

	var IsCallable$2 = isCallable$1;

	var hasOwn$2 = hasown;

	var $TypeError$d = type;

	var Type$6 = Type$7;
	var ToBoolean = ToBoolean$1;
	var IsCallable$1 = IsCallable$2;

	// https://262.ecma-international.org/5.1/#sec-8.10.5

	var ToPropertyDescriptor$1 = function ToPropertyDescriptor(Obj) {
		if (Type$6(Obj) !== 'Object') {
			throw new $TypeError$d('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (hasOwn$2(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
		}
		if (hasOwn$2(Obj, 'configurable')) {
			desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
		}
		if (hasOwn$2(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (hasOwn$2(Obj, 'writable')) {
			desc['[[Writable]]'] = ToBoolean(Obj.writable);
		}
		if (hasOwn$2(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !IsCallable$1(getter)) {
				throw new $TypeError$d('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (hasOwn$2(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !IsCallable$1(setter)) {
				throw new $TypeError$d('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((hasOwn$2(desc, '[[Get]]') || hasOwn$2(desc, '[[Set]]')) && (hasOwn$2(desc, '[[Value]]') || hasOwn$2(desc, '[[Writable]]'))) {
			throw new $TypeError$d('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	};

	var $isNaN$1 = _isNaN;

	// http://262.ecma-international.org/5.1/#sec-9.12

	var SameValue$2 = function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN$1(x) && $isNaN$1(y);
	};

	var GetIntrinsic$5 = getIntrinsic;

	var $Array$1 = GetIntrinsic$5('%Array%');

	// eslint-disable-next-line global-require
	var toStr$2 = !$Array$1.isArray && callBound$f('Object.prototype.toString');

	var IsArray$2 = $Array$1.isArray || function IsArray(argument) {
		return toStr$2(argument) === '[object Array]';
	};

	var hasPropertyDescriptors = hasPropertyDescriptors_1;

	var $defineProperty = requireEsDefineProperty();

	var hasArrayLengthDefineBug = hasPropertyDescriptors.hasArrayLengthDefineBug();

	// eslint-disable-next-line global-require
	var isArray$4 = hasArrayLengthDefineBug && IsArray$2;

	var callBound$c = callBound$f;

	var $isEnumerable$2 = callBound$c('Object.prototype.propertyIsEnumerable');

	// eslint-disable-next-line max-params
	var DefineOwnProperty$1 = function DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, desc) {
		if (!$defineProperty) {
			if (!IsDataDescriptor(desc)) {
				// ES3 does not support getters/setters
				return false;
			}
			if (!desc['[[Configurable]]'] || !desc['[[Writable]]']) {
				return false;
			}

			// fallback for ES3
			if (P in O && $isEnumerable$2(O, P) !== !!desc['[[Enumerable]]']) {
				// a non-enumerable existing property
				return false;
			}

			// property does not exist at all, or exists but is enumerable
			var V = desc['[[Value]]'];
			// eslint-disable-next-line no-param-reassign
			O[P] = V; // will use [[Define]]
			return SameValue(O[P], V);
		}
		if (
			hasArrayLengthDefineBug
			&& P === 'length'
			&& '[[Value]]' in desc
			&& isArray$4(O)
			&& O.length !== desc['[[Value]]']
		) {
			// eslint-disable-next-line no-param-reassign
			O.length = desc['[[Value]]'];
			return O.length === desc['[[Value]]'];
		}

		$defineProperty(O, P, FromPropertyDescriptor(desc));
		return true;
	};

	var isPropertyDescriptor$5 = propertyDescriptor;

	var isFullyPopulatedPropertyDescriptor$1 = function isFullyPopulatedPropertyDescriptor(ES, Desc) {
		return isPropertyDescriptor$5(Desc)
			&& typeof Desc === 'object'
			&& '[[Enumerable]]' in Desc
			&& '[[Configurable]]' in Desc
			&& (ES.IsAccessorDescriptor(Desc) || ES.IsDataDescriptor(Desc));
	};

	var fromPropertyDescriptor$1 = function fromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}
		var obj = {};
		if ('[[Value]]' in Desc) {
			obj.value = Desc['[[Value]]'];
		}
		if ('[[Writable]]' in Desc) {
			obj.writable = !!Desc['[[Writable]]'];
		}
		if ('[[Get]]' in Desc) {
			obj.get = Desc['[[Get]]'];
		}
		if ('[[Set]]' in Desc) {
			obj.set = Desc['[[Set]]'];
		}
		if ('[[Enumerable]]' in Desc) {
			obj.enumerable = !!Desc['[[Enumerable]]'];
		}
		if ('[[Configurable]]' in Desc) {
			obj.configurable = !!Desc['[[Configurable]]'];
		}
		return obj;
	};

	var $TypeError$c = type;

	var isPropertyDescriptor$4 = propertyDescriptor;
	var fromPropertyDescriptor = fromPropertyDescriptor$1;

	// https://262.ecma-international.org/6.0/#sec-frompropertydescriptor

	var FromPropertyDescriptor$1 = function FromPropertyDescriptor(Desc) {
		if (typeof Desc !== 'undefined' && !isPropertyDescriptor$4(Desc)) {
			throw new $TypeError$c('Assertion failed: `Desc` must be a Property Descriptor');
		}

		return fromPropertyDescriptor(Desc);
	};

	var $TypeError$b = type;

	var hasOwn$1 = hasown;

	var isPropertyDescriptor$3 = propertyDescriptor;

	// https://262.ecma-international.org/5.1/#sec-8.10.2

	var IsDataDescriptor$2 = function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!isPropertyDescriptor$3(Desc)) {
			throw new $TypeError$b('Assertion failed: `Desc` must be a Property Descriptor');
		}

		if (!hasOwn$1(Desc, '[[Value]]') && !hasOwn$1(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	};

	var $TypeError$a = type;

	var IsAccessorDescriptor$2 = IsAccessorDescriptor$3;
	var IsDataDescriptor$1 = IsDataDescriptor$2;

	var isPropertyDescriptor$2 = propertyDescriptor;

	// https://262.ecma-international.org/6.0/#sec-isgenericdescriptor

	var IsGenericDescriptor$1 = function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!isPropertyDescriptor$2(Desc)) {
			throw new $TypeError$a('Assertion failed: `Desc` must be a Property Descriptor');
		}

		if (!IsAccessorDescriptor$2(Desc) && !IsDataDescriptor$1(Desc)) {
			return true;
		}

		return false;
	};

	var $TypeError$9 = type;

	var DefineOwnProperty = DefineOwnProperty$1;
	var isFullyPopulatedPropertyDescriptor = isFullyPopulatedPropertyDescriptor$1;
	var isPropertyDescriptor$1 = propertyDescriptor;

	var FromPropertyDescriptor = FromPropertyDescriptor$1;
	var IsAccessorDescriptor$1 = IsAccessorDescriptor$3;
	var IsDataDescriptor = IsDataDescriptor$2;
	var IsGenericDescriptor = IsGenericDescriptor$1;
	var IsPropertyKey$4 = IsPropertyKey$5;
	var SameValue$1 = SameValue$2;
	var Type$5 = Type$7;

	// https://262.ecma-international.org/13.0/#sec-validateandapplypropertydescriptor

	// see https://github.com/tc39/ecma262/pull/2468 for ES2022 changes

	// eslint-disable-next-line max-lines-per-function, max-statements
	var ValidateAndApplyPropertyDescriptor$1 = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
		var oType = Type$5(O);
		if (oType !== 'Undefined' && oType !== 'Object') {
			throw new $TypeError$9('Assertion failed: O must be undefined or an Object');
		}
		if (!IsPropertyKey$4(P)) {
			throw new $TypeError$9('Assertion failed: P must be a Property Key');
		}
		if (typeof extensible !== 'boolean') {
			throw new $TypeError$9('Assertion failed: extensible must be a Boolean');
		}
		if (!isPropertyDescriptor$1(Desc)) {
			throw new $TypeError$9('Assertion failed: Desc must be a Property Descriptor');
		}
		if (typeof current !== 'undefined' && !isPropertyDescriptor$1(current)) {
			throw new $TypeError$9('Assertion failed: current must be a Property Descriptor, or undefined');
		}

		if (typeof current === 'undefined') { // step 2
			if (!extensible) {
				return false; // step 2.a
			}
			if (oType === 'Undefined') {
				return true; // step 2.b
			}
			if (IsAccessorDescriptor$1(Desc)) { // step 2.c
				return DefineOwnProperty(
					IsDataDescriptor,
					SameValue$1,
					FromPropertyDescriptor,
					O,
					P,
					Desc
				);
			}
			// step 2.d
			return DefineOwnProperty(
				IsDataDescriptor,
				SameValue$1,
				FromPropertyDescriptor,
				O,
				P,
				{
					'[[Configurable]]': !!Desc['[[Configurable]]'],
					'[[Enumerable]]': !!Desc['[[Enumerable]]'],
					'[[Value]]': Desc['[[Value]]'],
					'[[Writable]]': !!Desc['[[Writable]]']
				}
			);
		}

		// 3. Assert: current is a fully populated Property Descriptor.
		if (
			!isFullyPopulatedPropertyDescriptor(
				{
					IsAccessorDescriptor: IsAccessorDescriptor$1,
					IsDataDescriptor: IsDataDescriptor
				},
				current
			)
		) {
			throw new $TypeError$9('`current`, when present, must be a fully populated and valid Property Descriptor');
		}

		// 4. If every field in Desc is absent, return true.
		// this can't really match the assertion that it's a Property Descriptor in our JS implementation

		// 5. If current.[[Configurable]] is false, then
		if (!current['[[Configurable]]']) {
			if ('[[Configurable]]' in Desc && Desc['[[Configurable]]']) {
				// step 5.a
				return false;
			}
			if ('[[Enumerable]]' in Desc && !SameValue$1(Desc['[[Enumerable]]'], current['[[Enumerable]]'])) {
				// step 5.b
				return false;
			}
			if (!IsGenericDescriptor(Desc) && !SameValue$1(IsAccessorDescriptor$1(Desc), IsAccessorDescriptor$1(current))) {
				// step 5.c
				return false;
			}
			if (IsAccessorDescriptor$1(current)) { // step 5.d
				if ('[[Get]]' in Desc && !SameValue$1(Desc['[[Get]]'], current['[[Get]]'])) {
					return false;
				}
				if ('[[Set]]' in Desc && !SameValue$1(Desc['[[Set]]'], current['[[Set]]'])) {
					return false;
				}
			} else if (!current['[[Writable]]']) { // step 5.e
				if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
					return false;
				}
				if ('[[Value]]' in Desc && !SameValue$1(Desc['[[Value]]'], current['[[Value]]'])) {
					return false;
				}
			}
		}

		// 6. If O is not undefined, then
		if (oType !== 'Undefined') {
			var configurable;
			var enumerable;
			if (IsDataDescriptor(current) && IsAccessorDescriptor$1(Desc)) { // step 6.a
				configurable = ('[[Configurable]]' in Desc ? Desc : current)['[[Configurable]]'];
				enumerable = ('[[Enumerable]]' in Desc ? Desc : current)['[[Enumerable]]'];
				// Replace the property named P of object O with an accessor property having [[Configurable]] and [[Enumerable]] attributes as described by current and each other attribute set to its default value.
				return DefineOwnProperty(
					IsDataDescriptor,
					SameValue$1,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': !!configurable,
						'[[Enumerable]]': !!enumerable,
						'[[Get]]': ('[[Get]]' in Desc ? Desc : current)['[[Get]]'],
						'[[Set]]': ('[[Set]]' in Desc ? Desc : current)['[[Set]]']
					}
				);
			} else if (IsAccessorDescriptor$1(current) && IsDataDescriptor(Desc)) {
				configurable = ('[[Configurable]]' in Desc ? Desc : current)['[[Configurable]]'];
				enumerable = ('[[Enumerable]]' in Desc ? Desc : current)['[[Enumerable]]'];
				// i. Replace the property named P of object O with a data property having [[Configurable]] and [[Enumerable]] attributes as described by current and each other attribute set to its default value.
				return DefineOwnProperty(
					IsDataDescriptor,
					SameValue$1,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': !!configurable,
						'[[Enumerable]]': !!enumerable,
						'[[Value]]': ('[[Value]]' in Desc ? Desc : current)['[[Value]]'],
						'[[Writable]]': !!('[[Writable]]' in Desc ? Desc : current)['[[Writable]]']
					}
				);
			}

			// For each field of Desc that is present, set the corresponding attribute of the property named P of object O to the value of the field.
			return DefineOwnProperty(
				IsDataDescriptor,
				SameValue$1,
				FromPropertyDescriptor,
				O,
				P,
				Desc
			);
		}

		return true; // step 7
	};

	var $gOPD = gopd$1;
	var $SyntaxError = syntax;
	var $TypeError$8 = type;

	var isPropertyDescriptor = propertyDescriptor;

	var IsAccessorDescriptor = IsAccessorDescriptor$3;
	var IsExtensible = IsExtensible$1;
	var IsPropertyKey$3 = IsPropertyKey$5;
	var ToPropertyDescriptor = ToPropertyDescriptor$1;
	var SameValue = SameValue$2;
	var Type$4 = Type$7;
	var ValidateAndApplyPropertyDescriptor = ValidateAndApplyPropertyDescriptor$1;

	// https://262.ecma-international.org/6.0/#sec-ordinarydefineownproperty

	var OrdinaryDefineOwnProperty$1 = function OrdinaryDefineOwnProperty(O, P, Desc) {
		if (Type$4(O) !== 'Object') {
			throw new $TypeError$8('Assertion failed: O must be an Object');
		}
		if (!IsPropertyKey$3(P)) {
			throw new $TypeError$8('Assertion failed: P must be a Property Key');
		}
		if (!isPropertyDescriptor(Desc)) {
			throw new $TypeError$8('Assertion failed: Desc must be a Property Descriptor');
		}
		if (!$gOPD) {
			// ES3/IE 8 fallback
			if (IsAccessorDescriptor(Desc)) {
				throw new $SyntaxError('This environment does not support accessor property descriptors.');
			}
			var creatingNormalDataProperty = !(P in O)
				&& Desc['[[Writable]]']
				&& Desc['[[Enumerable]]']
				&& Desc['[[Configurable]]']
				&& '[[Value]]' in Desc;
			var settingExistingDataProperty = (P in O)
				&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
				&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
				&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
				&& '[[Value]]' in Desc;
			if (creatingNormalDataProperty || settingExistingDataProperty) {
				O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
				return SameValue(O[P], Desc['[[Value]]']);
			}
			throw new $SyntaxError('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
		}
		var desc = $gOPD(O, P);
		var current = desc && ToPropertyDescriptor(desc);
		var extensible = IsExtensible(O);
		return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
	};

	var $TypeError$7 = type;

	var IsPropertyKey$2 = IsPropertyKey$5;
	var OrdinaryDefineOwnProperty = OrdinaryDefineOwnProperty$1;
	var Type$3 = Type$7;

	// https://262.ecma-international.org/6.0/#sec-createdataproperty

	var CreateDataProperty$1 = function CreateDataProperty(O, P, V) {
		if (Type$3(O) !== 'Object') {
			throw new $TypeError$7('Assertion failed: Type(O) is not Object');
		}
		if (!IsPropertyKey$2(P)) {
			throw new $TypeError$7('Assertion failed: IsPropertyKey(P) is not true');
		}
		var newDesc = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		};
		return OrdinaryDefineOwnProperty(O, P, newDesc);
	};

	var isarray;
	var hasRequiredIsarray;

	function requireIsarray () {
		if (hasRequiredIsarray) return isarray;
		hasRequiredIsarray = 1;
		var toString = {}.toString;

		isarray = Array.isArray || function (arr) {
		  return toString.call(arr) == '[object Array]';
		};
		return isarray;
	}

	var GetIntrinsic$4 = getIntrinsic;
	var $concat$1 = GetIntrinsic$4('%Array.prototype.concat%');

	var callBind$a = callBindExports;

	var callBound$b = callBound$f;
	var $slice$4 = callBound$b('Array.prototype.slice');

	var hasSymbols = requireShams()();
	var isConcatSpreadable = hasSymbols && Symbol.isConcatSpreadable;

	/** @type {never[]} */ var empty = [];
	var $concatApply = isConcatSpreadable ? callBind$a.apply($concat$1, empty) : null;

	// eslint-disable-next-line no-extra-parens
	var isArray$3 = isConcatSpreadable ? /** @type {(value: unknown) => value is unknown[]} */ (requireIsarray()) : null;

	/** @type {import('.')} */
	var safeArrayConcat = isConcatSpreadable
		// eslint-disable-next-line no-unused-vars
		? function safeArrayConcat(item) {
			for (var i = 0; i < arguments.length; i += 1) {
				/** @type {typeof item} */ var arg = arguments[i];
				// @ts-expect-error ts(2538) see https://github.com/microsoft/TypeScript/issues/9998#issuecomment-1890787975; works if `const`
				if (arg && typeof arg === 'object' && typeof arg[isConcatSpreadable] === 'boolean') {
					// @ts-expect-error ts(7015) TS doesn't yet support Symbol indexing
					if (!empty[isConcatSpreadable]) {
						// @ts-expect-error ts(7015) TS doesn't yet support Symbol indexing
						empty[isConcatSpreadable] = true;
					}
					// @ts-expect-error ts(2721) ts(18047) not sure why TS can't figure out this can't be null
					var arr = isArray$3(arg) ? $slice$4(arg) : [arg];
					// @ts-expect-error ts(7015) TS can't handle expandos on an array
					arr[isConcatSpreadable] = true; // shadow the property. TODO: use [[Define]]
					arguments[i] = arr;
				}
			}
			// @ts-expect-error ts(2345) https://github.com/microsoft/TypeScript/issues/57164 TS doesn't understand that apply can take an arguments object
			return $concatApply(arguments);
		}
		: callBind$a($concat$1, empty);

	var RequireObjectCoercible$8 = RequireObjectCoercible$b;

	// https://262.ecma-international.org/6.0/#sec-isarray
	var IsArray$1 = IsArray$2;

	var GetIntrinsic$3 = getIntrinsic;
	var callBound$a = callBound$f;

	var $TypeError$6 = type;

	var IsArray = IsArray$1;

	var $apply = GetIntrinsic$3('%Reflect.apply%', true) || callBound$a('Function.prototype.apply');

	// https://262.ecma-international.org/6.0/#sec-call

	var Call$1 = function Call(F, V) {
		var argumentsList = arguments.length > 2 ? arguments[2] : [];
		if (!IsArray(argumentsList)) {
			throw new $TypeError$6('Assertion failed: optional `argumentsList`, if provided, must be a List');
		}
		return $apply(F, V, argumentsList);
	};

	var global$1 = (typeof global !== "undefined" ? global :
	  typeof self !== "undefined" ? self :
	  typeof window !== "undefined" ? window : {});

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
	var inited = false;
	function init () {
	  inited = true;
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }

	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}

	function toByteArray (b64) {
	  if (!inited) {
	    init();
	  }
	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders);

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len;

	  var L = 0;

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = (tmp >> 16) & 0xFF;
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  if (!inited) {
	    init();
	  }
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var output = '';
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[(tmp << 4) & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
	    output += lookup[tmp >> 10];
	    output += lookup[(tmp >> 4) & 0x3F];
	    output += lookup[(tmp << 2) & 0x3F];
	    output += '=';
	  }

	  parts.push(output);

	  return parts.join('')
	}

	function read (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? (nBytes - 1) : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	function write (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	  var i = isLE ? 0 : (nBytes - 1);
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

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

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	}

	var toString = {}.toString;

	var isArray$2 = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */


	var INSPECT_MAX_BYTES = 50;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
	  ? global$1.TYPED_ARRAY_SUPPORT
	  : true;

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	kMaxLength();

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length);
	    }
	    that.length = length;
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192; // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype;
	  return arr
	};

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	};

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) ;
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	};

	function allocUnsafe (that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	};

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0;
	  that = createBuffer(that, length);

	  var actual = that.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual);
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array);
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset);
	  } else {
	    array = new Uint8Array(array, byteOffset, length);
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array;
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array);
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (internalIsBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len);
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray$2(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	Buffer.isBuffer = isBuffer$1;
	function internalIsBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	};

	Buffer.concat = function concat (list, length) {
	  if (!isArray$2(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (!internalIsBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer
	};

	function byteLength (string, encoding) {
	  if (internalIsBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString (encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true;

	function swap (b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this
	};

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this
	};

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this
	};

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0;
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	};

	Buffer.prototype.equals = function equals (b) {
	  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	};

	Buffer.prototype.inspect = function inspect () {
	  var str = '';
	  var max = INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>'
	};

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!internalIsBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset;  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1);
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (internalIsBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	};

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	};

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	};

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed;
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;
	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	};

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return fromByteArray(buf)
	  } else {
	    return fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    );
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end);
	    newBuf.__proto__ = Buffer.prototype;
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  return newBuf
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset]
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8)
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1]
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	};

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	};

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	};

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	};

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, true, 23, 4)
	};

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, false, 23, 4)
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, true, 52, 8)
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, false, 52, 8)
	};

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 1] = (value >>> 8);
	    this[offset] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 3] = (value >>> 24);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4);
	  }
	  write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	};

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8);
	  }
	  write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    );
	  }

	  return len
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if (code < 256) {
	        val = code;
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = internalIsBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString());
	    var len = bytes.length;
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray
	}


	function base64ToBytes (str) {
	  return toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i];
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}


	// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	function isBuffer$1(obj) {
	  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
	}

	function isFastBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
	}

	// shim for using process in browser
	// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	var cachedSetTimeout = defaultSetTimout;
	var cachedClearTimeout = defaultClearTimeout;
	if (typeof global$1.setTimeout === 'function') {
	    cachedSetTimeout = setTimeout;
	}
	if (typeof global$1.clearTimeout === 'function') {
	    cachedClearTimeout = clearTimeout;
	}

	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	function nextTick(fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	}
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	var title = 'browser';
	var platform = 'browser';
	var browser = true;
	var env = {};
	var argv = [];
	var version = ''; // empty string to avoid regexp issues
	var versions = {};
	var release = {};
	var config = {};

	function noop() {}

	var on = noop;
	var addListener = noop;
	var once = noop;
	var off = noop;
	var removeListener = noop;
	var removeAllListeners = noop;
	var emit = noop;

	function binding(name) {
	    throw new Error('process.binding is not supported');
	}

	function cwd () { return '/' }
	function chdir (dir) {
	    throw new Error('process.chdir is not supported');
	}function umask() { return 0; }

	// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
	var performance = global$1.performance || {};
	var performanceNow =
	  performance.now        ||
	  performance.mozNow     ||
	  performance.msNow      ||
	  performance.oNow       ||
	  performance.webkitNow  ||
	  function(){ return (new Date()).getTime() };

	// generate timestamp or delta
	// see http://nodejs.org/api/process.html#process_process_hrtime
	function hrtime(previousTimestamp){
	  var clocktime = performanceNow.call(performance)*1e-3;
	  var seconds = Math.floor(clocktime);
	  var nanoseconds = Math.floor((clocktime%1)*1e9);
	  if (previousTimestamp) {
	    seconds = seconds - previousTimestamp[0];
	    nanoseconds = nanoseconds - previousTimestamp[1];
	    if (nanoseconds<0) {
	      seconds--;
	      nanoseconds += 1e9;
	    }
	  }
	  return [seconds,nanoseconds]
	}

	var startTime = new Date();
	function uptime() {
	  var currentTime = new Date();
	  var dif = currentTime - startTime;
	  return dif / 1000;
	}

	var browser$1 = {
	  nextTick: nextTick,
	  title: title,
	  browser: browser,
	  env: env,
	  argv: argv,
	  version: version,
	  versions: versions,
	  on: on,
	  addListener: addListener,
	  once: once,
	  off: off,
	  removeListener: removeListener,
	  removeAllListeners: removeAllListeners,
	  emit: emit,
	  binding: binding,
	  cwd: cwd,
	  chdir: chdir,
	  umask: umask,
	  hrtime: hrtime,
	  platform: platform,
	  release: release,
	  config: config,
	  uptime: uptime
	};

	var inherits;
	if (typeof Object.create === 'function'){
	  inherits = function inherits(ctor, superCtor) {
	    // implementation from standard node.js 'util' module
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  inherits = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}
	var inherits$1 = inherits;

	var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
	  function getOwnPropertyDescriptors(obj) {
	    var keys = Object.keys(obj);
	    var descriptors = {};
	    for (var i = 0; i < keys.length; i++) {
	      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
	    }
	    return descriptors;
	  };

	var formatRegExp = /%[sdj%]/g;
	function format$1(f) {
	  if (!isString$2(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect$1(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect$1(x);
	    }
	  }
	  return str;
	}

	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	function deprecate(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global$1.process)) {
	    return function() {
	      return deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (browser$1.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (browser$1.throwDeprecation) {
	        throw new Error(msg);
	      } else if (browser$1.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	}

	var debugs = {};
	var debugEnviron;
	function debuglog(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = browser$1.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = 0;
	      debugs[set] = function() {
	        var msg = format$1.apply(null, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	}

	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect$1(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean$1(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    _extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}

	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect$1.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect$1.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect$1.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect$1.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect$1.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== inspect$1 &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString$2(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError$1(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp$1(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate$1(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError$1(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray$1(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp$1(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate$1(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError$1(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp$1(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString$2(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber$1(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean$1(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var length = output.reduce(function(prev, cur) {
	    if (cur.indexOf('\n') >= 0) ;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray$1(ar) {
	  return Array.isArray(ar);
	}

	function isBoolean$1(arg) {
	  return typeof arg === 'boolean';
	}

	function isNull(arg) {
	  return arg === null;
	}

	function isNullOrUndefined(arg) {
	  return arg == null;
	}

	function isNumber$1(arg) {
	  return typeof arg === 'number';
	}

	function isString$2(arg) {
	  return typeof arg === 'string';
	}

	function isSymbol$1(arg) {
	  return typeof arg === 'symbol';
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

	function isRegExp$1(re) {
	  return isObject(re) && objectToString$1(re) === '[object RegExp]';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isDate$1(d) {
	  return isObject(d) && objectToString$1(d) === '[object Date]';
	}

	function isError$1(e) {
	  return isObject(e) &&
	      (objectToString$1(e) === '[object Error]' || e instanceof Error);
	}

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isPrimitive$2(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}

	function isBuffer(maybeBuf) {
	  return Buffer.isBuffer(maybeBuf);
	}

	function objectToString$1(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	function log() {
	  console.log('%s - %s', timestamp(), format$1.apply(null, arguments));
	}

	function _extend(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	}
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

	function promisify(original) {
	  if (typeof original !== 'function')
	    throw new TypeError('The "original" argument must be of type Function');

	  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
	    var fn = original[kCustomPromisifiedSymbol];
	    if (typeof fn !== 'function') {
	      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
	    }
	    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
	      value: fn, enumerable: false, writable: false, configurable: true
	    });
	    return fn;
	  }

	  function fn() {
	    var promiseResolve, promiseReject;
	    var promise = new Promise(function (resolve, reject) {
	      promiseResolve = resolve;
	      promiseReject = reject;
	    });

	    var args = [];
	    for (var i = 0; i < arguments.length; i++) {
	      args.push(arguments[i]);
	    }
	    args.push(function (err, value) {
	      if (err) {
	        promiseReject(err);
	      } else {
	        promiseResolve(value);
	      }
	    });

	    try {
	      original.apply(this, args);
	    } catch (err) {
	      promiseReject(err);
	    }

	    return promise;
	  }

	  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

	  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
	    value: fn, enumerable: false, writable: false, configurable: true
	  });
	  return Object.defineProperties(
	    fn,
	    getOwnPropertyDescriptors(original)
	  );
	}

	promisify.custom = kCustomPromisifiedSymbol;

	function callbackifyOnRejected(reason, cb) {
	  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
	  // Because `null` is a special error value in callbacks which means "no error
	  // occurred", we error-wrap so the callback consumer can distinguish between
	  // "the promise rejected with null" or "the promise fulfilled with undefined".
	  if (!reason) {
	    var newReason = new Error('Promise was rejected with a falsy value');
	    newReason.reason = reason;
	    reason = newReason;
	  }
	  return cb(reason);
	}

	function callbackify(original) {
	  if (typeof original !== 'function') {
	    throw new TypeError('The "original" argument must be of type Function');
	  }

	  // We DO NOT return the promise as it gives the user a false sense that
	  // the promise is actually somehow related to the callback's execution
	  // and that the callback throwing will reject the promise.
	  function callbackified() {
	    var args = [];
	    for (var i = 0; i < arguments.length; i++) {
	      args.push(arguments[i]);
	    }

	    var maybeCb = args.pop();
	    if (typeof maybeCb !== 'function') {
	      throw new TypeError('The last argument must be of type Function');
	    }
	    var self = this;
	    var cb = function() {
	      return maybeCb.apply(self, arguments);
	    };
	    // In true node style we process the callback on `nextTick` with all the
	    // implications (stack, `uncaughtException`, `async_hooks`)
	    original.apply(this, args)
	      .then(function(ret) { browser$1.nextTick(cb.bind(null, null, ret)); },
	        function(rej) { browser$1.nextTick(callbackifyOnRejected.bind(null, rej, cb)); });
	  }

	  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
	  Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
	  return callbackified;
	}

	var _polyfillNode_util = {
	  inherits: inherits$1,
	  _extend: _extend,
	  log: log,
	  isBuffer: isBuffer,
	  isPrimitive: isPrimitive$2,
	  isFunction: isFunction,
	  isError: isError$1,
	  isDate: isDate$1,
	  isObject: isObject,
	  isRegExp: isRegExp$1,
	  isUndefined: isUndefined,
	  isSymbol: isSymbol$1,
	  isString: isString$2,
	  isNumber: isNumber$1,
	  isNullOrUndefined: isNullOrUndefined,
	  isNull: isNull,
	  isBoolean: isBoolean$1,
	  isArray: isArray$1,
	  inspect: inspect$1,
	  deprecate: deprecate,
	  format: format$1,
	  debuglog: debuglog,
	  promisify: promisify,
	  callbackify: callbackify,
	};

	var _polyfillNode_util$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		_extend: _extend,
		callbackify: callbackify,
		debuglog: debuglog,
		default: _polyfillNode_util,
		deprecate: deprecate,
		format: format$1,
		inherits: inherits$1,
		inspect: inspect$1,
		isArray: isArray$1,
		isBoolean: isBoolean$1,
		isBuffer: isBuffer,
		isDate: isDate$1,
		isError: isError$1,
		isFunction: isFunction,
		isNull: isNull,
		isNullOrUndefined: isNullOrUndefined,
		isNumber: isNumber$1,
		isObject: isObject,
		isPrimitive: isPrimitive$2,
		isRegExp: isRegExp$1,
		isString: isString$2,
		isSymbol: isSymbol$1,
		isUndefined: isUndefined,
		log: log,
		promisify: promisify
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_util$1);

	var util_inspect = require$$0.inspect;

	var hasMap = typeof Map === 'function' && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === 'function' && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;
	var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
	var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
	var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
	var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
	var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
	var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
	var booleanValueOf = Boolean.prototype.valueOf;
	var objectToString = Object.prototype.toString;
	var functionToString = Function.prototype.toString;
	var $match = String.prototype.match;
	var $slice$3 = String.prototype.slice;
	var $replace$3 = String.prototype.replace;
	var $toUpperCase = String.prototype.toUpperCase;
	var $toLowerCase = String.prototype.toLowerCase;
	var $test = RegExp.prototype.test;
	var $concat = Array.prototype.concat;
	var $join = Array.prototype.join;
	var $arrSlice = Array.prototype.slice;
	var $floor$1 = Math.floor;
	var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
	var gOPS = Object.getOwnPropertySymbols;
	var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
	var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
	// ie, `has-tostringtag/shams
	var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? 'object' : 'symbol')
	    ? Symbol.toStringTag
	    : null;
	var isEnumerable = Object.prototype.propertyIsEnumerable;

	var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
	    [].__proto__ === Array.prototype // eslint-disable-line no-proto
	        ? function (O) {
	            return O.__proto__; // eslint-disable-line no-proto
	        }
	        : null
	);

	function addNumericSeparator(num, str) {
	    if (
	        num === Infinity
	        || num === -Infinity
	        || num !== num
	        || (num && num > -1000 && num < 1000)
	        || $test.call(/e/, str)
	    ) {
	        return str;
	    }
	    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
	    if (typeof num === 'number') {
	        var int = num < 0 ? -$floor$1(-num) : $floor$1(num); // trunc(num)
	        if (int !== num) {
	            var intStr = String(int);
	            var dec = $slice$3.call(str, intStr.length + 1);
	            return $replace$3.call(intStr, sepRegex, '$&_') + '.' + $replace$3.call($replace$3.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
	        }
	    }
	    return $replace$3.call(str, sepRegex, '$&_');
	}

	var utilInspect = util_inspect;
	var inspectCustom = utilInspect.custom;
	var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;

	var objectInspect = function inspect_(obj, options, depth, seen) {
	    var opts = options || {};

	    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
	        throw new TypeError('option "quoteStyle" must be "single" or "double"');
	    }
	    if (
	        has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
	            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
	            : opts.maxStringLength !== null
	        )
	    ) {
	        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
	    }
	    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
	    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
	        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
	    }

	    if (
	        has(opts, 'indent')
	        && opts.indent !== null
	        && opts.indent !== '\t'
	        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
	    ) {
	        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
	    }
	    if (has(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
	        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
	    }
	    var numericSeparator = opts.numericSeparator;

	    if (typeof obj === 'undefined') {
	        return 'undefined';
	    }
	    if (obj === null) {
	        return 'null';
	    }
	    if (typeof obj === 'boolean') {
	        return obj ? 'true' : 'false';
	    }

	    if (typeof obj === 'string') {
	        return inspectString(obj, opts);
	    }
	    if (typeof obj === 'number') {
	        if (obj === 0) {
	            return Infinity / obj > 0 ? '0' : '-0';
	        }
	        var str = String(obj);
	        return numericSeparator ? addNumericSeparator(obj, str) : str;
	    }
	    if (typeof obj === 'bigint') {
	        var bigIntStr = String(obj) + 'n';
	        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
	    }

	    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
	    if (typeof depth === 'undefined') { depth = 0; }
	    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
	        return isArray(obj) ? '[Array]' : '[Object]';
	    }

	    var indent = getIndent(opts, depth);

	    if (typeof seen === 'undefined') {
	        seen = [];
	    } else if (indexOf(seen, obj) >= 0) {
	        return '[Circular]';
	    }

	    function inspect(value, from, noIndent) {
	        if (from) {
	            seen = $arrSlice.call(seen);
	            seen.push(from);
	        }
	        if (noIndent) {
	            var newOpts = {
	                depth: opts.depth
	            };
	            if (has(opts, 'quoteStyle')) {
	                newOpts.quoteStyle = opts.quoteStyle;
	            }
	            return inspect_(value, newOpts, depth + 1, seen);
	        }
	        return inspect_(value, opts, depth + 1, seen);
	    }

	    if (typeof obj === 'function' && !isRegExp(obj)) { // in older engines, regexes are callable
	        var name = nameOf(obj);
	        var keys = arrObjKeys(obj, inspect);
	        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
	    }
	    if (isSymbol(obj)) {
	        var symString = hasShammedSymbols ? $replace$3.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
	        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
	    }
	    if (isElement(obj)) {
	        var s = '<' + $toLowerCase.call(String(obj.nodeName));
	        var attrs = obj.attributes || [];
	        for (var i = 0; i < attrs.length; i++) {
	            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
	        }
	        s += '>';
	        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
	        s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
	        return s;
	    }
	    if (isArray(obj)) {
	        if (obj.length === 0) { return '[]'; }
	        var xs = arrObjKeys(obj, inspect);
	        if (indent && !singleLineValues(xs)) {
	            return '[' + indentedJoin(xs, indent) + ']';
	        }
	        return '[ ' + $join.call(xs, ', ') + ' ]';
	    }
	    if (isError(obj)) {
	        var parts = arrObjKeys(obj, inspect);
	        if (!('cause' in Error.prototype) && 'cause' in obj && !isEnumerable.call(obj, 'cause')) {
	            return '{ [' + String(obj) + '] ' + $join.call($concat.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
	        }
	        if (parts.length === 0) { return '[' + String(obj) + ']'; }
	        return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
	    }
	    if (typeof obj === 'object' && customInspect) {
	        if (inspectSymbol && typeof obj[inspectSymbol] === 'function' && utilInspect) {
	            return utilInspect(obj, { depth: maxDepth - depth });
	        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
	            return obj.inspect();
	        }
	    }
	    if (isMap(obj)) {
	        var mapParts = [];
	        if (mapForEach) {
	            mapForEach.call(obj, function (value, key) {
	                mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
	            });
	        }
	        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
	    }
	    if (isSet(obj)) {
	        var setParts = [];
	        if (setForEach) {
	            setForEach.call(obj, function (value) {
	                setParts.push(inspect(value, obj));
	            });
	        }
	        return collectionOf('Set', setSize.call(obj), setParts, indent);
	    }
	    if (isWeakMap(obj)) {
	        return weakCollectionOf('WeakMap');
	    }
	    if (isWeakSet(obj)) {
	        return weakCollectionOf('WeakSet');
	    }
	    if (isWeakRef(obj)) {
	        return weakCollectionOf('WeakRef');
	    }
	    if (isNumber(obj)) {
	        return markBoxed(inspect(Number(obj)));
	    }
	    if (isBigInt(obj)) {
	        return markBoxed(inspect(bigIntValueOf.call(obj)));
	    }
	    if (isBoolean(obj)) {
	        return markBoxed(booleanValueOf.call(obj));
	    }
	    if (isString$1(obj)) {
	        return markBoxed(inspect(String(obj)));
	    }
	    // note: in IE 8, sometimes `global !== window` but both are the prototypes of each other
	    /* eslint-env browser */
	    if (typeof window !== 'undefined' && obj === window) {
	        return '{ [object Window] }';
	    }
	    if (
	        (typeof globalThis !== 'undefined' && obj === globalThis)
	        || (typeof commonjsGlobal !== 'undefined' && obj === commonjsGlobal)
	    ) {
	        return '{ [object globalThis] }';
	    }
	    if (!isDate(obj) && !isRegExp(obj)) {
	        var ys = arrObjKeys(obj, inspect);
	        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
	        var protoTag = obj instanceof Object ? '' : 'null prototype';
	        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice$3.call(toStr$1(obj), 8, -1) : protoTag ? 'Object' : '';
	        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
	        var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
	        if (ys.length === 0) { return tag + '{}'; }
	        if (indent) {
	            return tag + '{' + indentedJoin(ys, indent) + '}';
	        }
	        return tag + '{ ' + $join.call(ys, ', ') + ' }';
	    }
	    return String(obj);
	};

	function wrapQuotes(s, defaultStyle, opts) {
	    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
	    return quoteChar + s + quoteChar;
	}

	function quote(s) {
	    return $replace$3.call(String(s), /"/g, '&quot;');
	}

	function isArray(obj) { return toStr$1(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isDate(obj) { return toStr$1(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isRegExp(obj) { return toStr$1(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isError(obj) { return toStr$1(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isString$1(obj) { return toStr$1(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isNumber(obj) { return toStr$1(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isBoolean(obj) { return toStr$1(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

	// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
	function isSymbol(obj) {
	    if (hasShammedSymbols) {
	        return obj && typeof obj === 'object' && obj instanceof Symbol;
	    }
	    if (typeof obj === 'symbol') {
	        return true;
	    }
	    if (!obj || typeof obj !== 'object' || !symToString) {
	        return false;
	    }
	    try {
	        symToString.call(obj);
	        return true;
	    } catch (e) {}
	    return false;
	}

	function isBigInt(obj) {
	    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
	        return false;
	    }
	    try {
	        bigIntValueOf.call(obj);
	        return true;
	    } catch (e) {}
	    return false;
	}

	var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
	function has(obj, key) {
	    return hasOwn.call(obj, key);
	}

	function toStr$1(obj) {
	    return objectToString.call(obj);
	}

	function nameOf(f) {
	    if (f.name) { return f.name; }
	    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
	    if (m) { return m[1]; }
	    return null;
	}

	function indexOf(xs, x) {
	    if (xs.indexOf) { return xs.indexOf(x); }
	    for (var i = 0, l = xs.length; i < l; i++) {
	        if (xs[i] === x) { return i; }
	    }
	    return -1;
	}

	function isMap(x) {
	    if (!mapSize || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        mapSize.call(x);
	        try {
	            setSize.call(x);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof Map; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakMap(x) {
	    if (!weakMapHas || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakMapHas.call(x, weakMapHas);
	        try {
	            weakSetHas.call(x, weakSetHas);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakRef(x) {
	    if (!weakRefDeref || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakRefDeref.call(x);
	        return true;
	    } catch (e) {}
	    return false;
	}

	function isSet(x) {
	    if (!setSize || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        setSize.call(x);
	        try {
	            mapSize.call(x);
	        } catch (m) {
	            return true;
	        }
	        return x instanceof Set; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakSet(x) {
	    if (!weakSetHas || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakSetHas.call(x, weakSetHas);
	        try {
	            weakMapHas.call(x, weakMapHas);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isElement(x) {
	    if (!x || typeof x !== 'object') { return false; }
	    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
	        return true;
	    }
	    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
	}

	function inspectString(str, opts) {
	    if (str.length > opts.maxStringLength) {
	        var remaining = str.length - opts.maxStringLength;
	        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
	        return inspectString($slice$3.call(str, 0, opts.maxStringLength), opts) + trailer;
	    }
	    // eslint-disable-next-line no-control-regex
	    var s = $replace$3.call($replace$3.call(str, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, lowbyte);
	    return wrapQuotes(s, 'single', opts);
	}

	function lowbyte(c) {
	    var n = c.charCodeAt(0);
	    var x = {
	        8: 'b',
	        9: 't',
	        10: 'n',
	        12: 'f',
	        13: 'r'
	    }[n];
	    if (x) { return '\\' + x; }
	    return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
	}

	function markBoxed(str) {
	    return 'Object(' + str + ')';
	}

	function weakCollectionOf(type) {
	    return type + ' { ? }';
	}

	function collectionOf(type, size, entries, indent) {
	    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
	    return type + ' (' + size + ') {' + joinedEntries + '}';
	}

	function singleLineValues(xs) {
	    for (var i = 0; i < xs.length; i++) {
	        if (indexOf(xs[i], '\n') >= 0) {
	            return false;
	        }
	    }
	    return true;
	}

	function getIndent(opts, depth) {
	    var baseIndent;
	    if (opts.indent === '\t') {
	        baseIndent = '\t';
	    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
	        baseIndent = $join.call(Array(opts.indent + 1), ' ');
	    } else {
	        return null;
	    }
	    return {
	        base: baseIndent,
	        prev: $join.call(Array(depth + 1), baseIndent)
	    };
	}

	function indentedJoin(xs, indent) {
	    if (xs.length === 0) { return ''; }
	    var lineJoiner = '\n' + indent.prev + indent.base;
	    return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
	}

	function arrObjKeys(obj, inspect) {
	    var isArr = isArray(obj);
	    var xs = [];
	    if (isArr) {
	        xs.length = obj.length;
	        for (var i = 0; i < obj.length; i++) {
	            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
	        }
	    }
	    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
	    var symMap;
	    if (hasShammedSymbols) {
	        symMap = {};
	        for (var k = 0; k < syms.length; k++) {
	            symMap['$' + syms[k]] = syms[k];
	        }
	    }

	    for (var key in obj) { // eslint-disable-line no-restricted-syntax
	        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
	        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
	        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
	            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
	            continue; // eslint-disable-line no-restricted-syntax, no-continue
	        } else if ($test.call(/[^\w$]/, key)) {
	            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
	        } else {
	            xs.push(key + ': ' + inspect(obj[key], obj));
	        }
	    }
	    if (typeof gOPS === 'function') {
	        for (var j = 0; j < syms.length; j++) {
	            if (isEnumerable.call(obj, syms[j])) {
	                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
	            }
	        }
	    }
	    return xs;
	}

	var $TypeError$5 = type;

	var inspect = objectInspect;

	var IsPropertyKey$1 = IsPropertyKey$5;
	var Type$2 = Type$7;

	// https://262.ecma-international.org/6.0/#sec-get-o-p

	var Get$2 = function Get(O, P) {
		// 7.3.1.1
		if (Type$2(O) !== 'Object') {
			throw new $TypeError$5('Assertion failed: Type(O) is not Object');
		}
		// 7.3.1.2
		if (!IsPropertyKey$1(P)) {
			throw new $TypeError$5('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect(P));
		}
		// 7.3.1.3
		return O[P];
	};

	var $TypeError$4 = type;

	var IsPropertyKey = IsPropertyKey$5;
	var Type$1 = Type$7;

	// https://262.ecma-international.org/6.0/#sec-hasproperty

	var HasProperty$1 = function HasProperty(O, P) {
		if (Type$1(O) !== 'Object') {
			throw new $TypeError$4('Assertion failed: `O` must be an Object');
		}
		if (!IsPropertyKey(P)) {
			throw new $TypeError$4('Assertion failed: `P` must be a Property Key');
		}
		return P in O;
	};

	var $TypeError$3 = type;

	var Get$1 = Get$2;
	var ToLength$2 = ToLength$4;
	var Type = Type$7;

	// https://262.ecma-international.org/11.0/#sec-lengthofarraylike

	var LengthOfArrayLike$1 = function LengthOfArrayLike(obj) {
		if (Type(obj) !== 'Object') {
			throw new $TypeError$3('Assertion failed: `obj` must be an Object');
		}
		return ToLength$2(Get$1(obj, 'length'));
	};

	var Call = Call$1;
	var Get = Get$2;
	var HasProperty = HasProperty$1;
	var IsCallable = IsCallable$2;
	var LengthOfArrayLike = LengthOfArrayLike$1;
	var ToObject$3 = ToObject$5;
	var ToString$4 = ToString$5;

	var callBound$9 = callBound$f;
	var isString = isString$4;
	var $Object$2 = esObjectAtoms;
	var $TypeError$2 = type;

	// Check failure of by-index access of string characters (IE < 9) and failure of `0 in boxedString` (Rhino)
	var boxedString = $Object$2('a');
	var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

	var strSplit = callBound$9('%String.prototype.split%');

	var implementation$p = function reduce(callbackfn) {
		var O = ToObject$3(this);
		var self = splitString && isString(O) ? strSplit(O, '') : O;
		var len = LengthOfArrayLike(self);

		// If no callback function or if callback is not a callable function
		if (!IsCallable(callbackfn)) {
			throw new $TypeError$2('Array.prototype.reduce callback must be a function');
		}

		if (len === 0 && arguments.length < 2) {
			throw new $TypeError$2('reduce of empty array with no initial value');
		}

		var k = 0;

		var accumulator;
		var Pk, kPresent;
		if (arguments.length > 1) {
			accumulator = arguments[1];
		} else {
			kPresent = false;
			while (!kPresent && k < len) {
				Pk = ToString$4(k);
				kPresent = HasProperty(O, Pk);
				if (kPresent) {
					accumulator = Get(O, Pk);
				}
				k += 1;
			}
			if (!kPresent) {
				throw new $TypeError$2('reduce of empty array with no initial value');
			}
		}

		while (k < len) {
			Pk = ToString$4(k);
			kPresent = HasProperty(O, Pk);
			if (kPresent) {
				var kValue = Get(O, Pk);
				accumulator = Call(callbackfn, void undefined, [accumulator, kValue, k, O]);
			}
			k += 1;
		}

		return accumulator;
	};

	var esArrayMethodBoxesProperly = function properlyBoxed(method) {
		// Check node 0.6.21 bug where third parameter is not boxed
		var properlyBoxesNonStrict = true;
		var properlyBoxesStrict = true;
		var threwException = false;
		if (typeof method === 'function') {
			try {
				// eslint-disable-next-line max-params
				method.call('f', function (_, __, O) {
					if (typeof O !== 'object') {
						properlyBoxesNonStrict = false;
					}
				});

				method.call(
					[null],
					function () {
						'use strict';

						properlyBoxesStrict = typeof this === 'string'; // eslint-disable-line no-invalid-this
					},
					'x'
				);
			} catch (e) {
				threwException = true;
			}
			return !threwException && properlyBoxesNonStrict && properlyBoxesStrict;
		}
		return false;
	};

	var arrayMethodBoxesProperly = esArrayMethodBoxesProperly;

	var implementation$o = implementation$p;

	var polyfill$a = function getPolyfill() {
		var method = Array.prototype.reduce;
		return arrayMethodBoxesProperly(method) ? method : implementation$o;
	};

	var shim$f;
	var hasRequiredShim;

	function requireShim () {
		if (hasRequiredShim) return shim$f;
		hasRequiredShim = 1;

		var define = defineProperties_1;
		var getPolyfill = polyfill$a;

		shim$f = function shimArrayPrototypeReduce() {
			var polyfill = getPolyfill();
			define(
				Array.prototype,
				{ reduce: polyfill },
				{ reduce: function () { return Array.prototype.reduce !== polyfill; } }
			);
			return polyfill;
		};
		return shim$f;
	}

	var define$f = defineProperties_1;
	var RequireObjectCoercible$7 = RequireObjectCoercible$8;
	var callBind$9 = callBindExports;
	var callBound$8 = callBound$f;

	var implementation$n = implementation$p;

	var getPolyfill$e = polyfill$a;
	var polyfill$9 = callBind$9.apply(getPolyfill$e());

	var shim$e = requireShim();

	var $slice$2 = callBound$8('%Array.prototype.slice%');

	// eslint-disable-next-line no-unused-vars
	var boundShim = function reduce(array, callbackfn) {
		RequireObjectCoercible$7(array);
		return polyfill$9(array, $slice$2(arguments, 1));
	};
	define$f(boundShim, {
		getPolyfill: getPolyfill$e,
		implementation: implementation$n,
		shim: shim$e
	});

	var array_prototype_reduce = boundShim;

	var CreateDataProperty = CreateDataProperty$1;
	var RequireObjectCoercible$6 = RequireObjectCoercible$b;
	var ToObject$2 = ToObject$5;
	var safeConcat = safeArrayConcat;
	var reduce = array_prototype_reduce;
	var gOPD = gopd$1;
	var $Object$1 = esObjectAtoms;

	var $getOwnNames = $Object$1.getOwnPropertyNames;
	var $getSymbols = $Object$1.getOwnPropertySymbols;

	var getAll = $getSymbols ? function (obj) {
		return safeConcat($getOwnNames(obj), $getSymbols(obj));
	} : $getOwnNames;

	var isES5 = gOPD && typeof $getOwnNames === 'function';

	var implementation$m = function getOwnPropertyDescriptors(value) {
		RequireObjectCoercible$6(value);
		if (!isES5) {
			throw new TypeError('getOwnPropertyDescriptors requires Object.getOwnPropertyDescriptor');
		}

		var O = ToObject$2(value);
		return reduce(
			getAll(O),
			function (acc, key) {
				var descriptor = gOPD(O, key);
				if (typeof descriptor !== 'undefined') {
					CreateDataProperty(acc, key, descriptor);
				}
				return acc;
			},
			{}
		);
	};

	var implementation$l = implementation$m;

	var polyfill$8 = function getPolyfill() {
		return typeof Object.getOwnPropertyDescriptors === 'function' ? Object.getOwnPropertyDescriptors : implementation$l;
	};

	var getPolyfill$d = polyfill$8;
	var define$e = defineProperties_1;

	var shim$d = function shimGetOwnPropertyDescriptors() {
		var polyfill = getPolyfill$d();
		define$e(
			Object,
			{ getOwnPropertyDescriptors: polyfill },
			{ getOwnPropertyDescriptors: function () { return Object.getOwnPropertyDescriptors !== polyfill; } }
		);
		return polyfill;
	};

	var define$d = defineProperties_1;
	var callBind$8 = callBindExports;

	var implementation$k = implementation$m;
	var getPolyfill$c = polyfill$8;
	var shim$c = shim$d;

	var bound$4 = callBind$8(getPolyfill$c(), Object);

	define$d(bound$4, {
		getPolyfill: getPolyfill$c,
		implementation: implementation$k,
		shim: shim$c
	});

	var object_getownpropertydescriptors = bound$4;

	var RequireObjectCoercible$5 = RequireObjectCoercible$b;
	var callBound$7 = callBound$f;
	var $isEnumerable$1 = callBound$7('Object.prototype.propertyIsEnumerable');
	var $push$1 = callBound$7('Array.prototype.push');

	var implementation$j = function entries(O) {
		var obj = RequireObjectCoercible$5(O);
		var entrys = [];
		for (var key in obj) {
			if ($isEnumerable$1(obj, key)) { // checks own-ness as well
				$push$1(entrys, [key, obj[key]]);
			}
		}
		return entrys;
	};

	var implementation$i = implementation$j;

	var polyfill$7 = function getPolyfill() {
		return typeof Object.entries === 'function' ? Object.entries : implementation$i;
	};

	var getPolyfill$b = polyfill$7;
	var define$c = defineProperties_1;

	var shim$b = function shimEntries() {
		var polyfill = getPolyfill$b();
		define$c(Object, { entries: polyfill }, {
			entries: function testEntries() {
				return Object.entries !== polyfill;
			}
		});
		return polyfill;
	};

	var define$b = defineProperties_1;
	var callBind$7 = callBindExports;

	var implementation$h = implementation$j;
	var getPolyfill$a = polyfill$7;
	var shim$a = shim$b;

	var polyfill$6 = callBind$7(getPolyfill$a(), Object);

	define$b(polyfill$6, {
		getPolyfill: getPolyfill$a,
		implementation: implementation$h,
		shim: shim$a
	});

	var object_entries = polyfill$6;

	var RequireObjectCoercible$4 = RequireObjectCoercible$b;
	var callBound$6 = callBound$f;

	var $isEnumerable = callBound$6('Object.prototype.propertyIsEnumerable');
	var $push = callBound$6('Array.prototype.push');

	var implementation$g = function values(O) {
		var obj = RequireObjectCoercible$4(O);
		var vals = [];
		for (var key in obj) {
			if ($isEnumerable(obj, key)) { // checks own-ness as well
				$push(vals, obj[key]);
			}
		}
		return vals;
	};

	var implementation$f = implementation$g;

	var polyfill$5 = function getPolyfill() {
		return typeof Object.values === 'function' ? Object.values : implementation$f;
	};

	var getPolyfill$9 = polyfill$5;
	var define$a = defineProperties_1;

	var shim$9 = function shimValues() {
		var polyfill = getPolyfill$9();
		define$a(Object, { values: polyfill }, {
			values: function testValues() {
				return Object.values !== polyfill;
			}
		});
		return polyfill;
	};

	var define$9 = defineProperties_1;
	var callBind$6 = callBindExports;

	var implementation$e = implementation$g;
	var getPolyfill$8 = polyfill$5;
	var shim$8 = shim$9;

	var polyfill$4 = callBind$6(getPolyfill$8(), Object);

	define$9(polyfill$4, {
		getPolyfill: getPolyfill$8,
		implementation: implementation$e,
		shim: shim$8
	});

	var object_values = polyfill$4;

	var getDescriptors = object_getownpropertydescriptors;
	var entries = object_entries;
	var values = object_values;

	var _Object = {
		entries: entries,
		getOwnPropertyDescriptors: getDescriptors,
		shim: function shimObject() {
			getDescriptors.shim();
			entries.shim();
			values.shim();
		},
		values: values
	};

	var GetIntrinsic$2 = getIntrinsic;

	var $abs = GetIntrinsic$2('%Math.abs%');

	// http://262.ecma-international.org/5.1/#sec-5.2

	var abs$1 = function abs(x) {
		return $abs(x);
	};

	// var modulo = require('./modulo');
	var $floor = Math.floor;

	// http://262.ecma-international.org/5.1/#sec-5.2

	var floor$1 = function floor(x) {
		// return x - modulo(x, 1);
		return $floor(x);
	};

	var toStr = Object.prototype.toString;

	var isPrimitive$1 = requireIsPrimitive();

	var isCallable = isCallable$1;

	// http://ecma-international.org/ecma-262/5.1/#sec-8.12.8
	var ES5internalSlots = {
		'[[DefaultValue]]': function (O) {
			var actualHint;
			if (arguments.length > 1) {
				actualHint = arguments[1];
			} else {
				actualHint = toStr.call(O) === '[object Date]' ? String : Number;
			}

			if (actualHint === String || actualHint === Number) {
				var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
				var value, i;
				for (i = 0; i < methods.length; ++i) {
					if (isCallable(O[methods[i]])) {
						value = O[methods[i]]();
						if (isPrimitive$1(value)) {
							return value;
						}
					}
				}
				throw new TypeError('No default value');
			}
			throw new TypeError('invalid [[DefaultValue]] hint supplied');
		}
	};

	// http://ecma-international.org/ecma-262/5.1/#sec-9.1
	var es5 = function ToPrimitive(input) {
		if (isPrimitive$1(input)) {
			return input;
		}
		if (arguments.length > 1) {
			return ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);
		}
		return ES5internalSlots['[[DefaultValue]]'](input);
	};

	// http://262.ecma-international.org/5.1/#sec-9.1

	var ToPrimitive$3 = es5;

	var ToPrimitive$2 = ToPrimitive$3;

	var callBound$5 = callBound$f;

	var $replace$2 = callBound$5('String.prototype.replace');

	var safeRegexTester = requireSafeRegexTest();

	var isNonDecimal = safeRegexTester(/^0[ob]|^[+-]0x/);

	// http://262.ecma-international.org/5.1/#sec-9.3

	var ToNumber$3 = function ToNumber(value) {
		var prim = ToPrimitive$2(value, Number);
		if (typeof prim !== 'string') {
			return +prim; // eslint-disable-line no-implicit-coercion
		}

		var trimmed = $replace$2(
			prim,
			// eslint-disable-next-line no-control-regex
			/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g,
			''
		);
		if (isNonDecimal(trimmed)) {
			return NaN;
		}

		return +trimmed; // eslint-disable-line no-implicit-coercion
	};

	var sign = function sign(number) {
		return number >= 0 ? 1 : -1;
	};

	var abs = abs$1;
	var floor = floor$1;
	var ToNumber$2 = ToNumber$3;

	var $isNaN = _isNaN;
	var $isFinite = _isFinite;
	var $sign = sign;

	// http://262.ecma-international.org/5.1/#sec-9.4

	var ToInteger$2 = function ToInteger(value) {
		var number = ToNumber$2(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return $sign(number) * floor(abs(number));
	};

	var ToPrimitive$1;
	var hasRequiredToPrimitive;

	function requireToPrimitive () {
		if (hasRequiredToPrimitive) return ToPrimitive$1;
		hasRequiredToPrimitive = 1;

		var toPrimitive = requireEs2015();

		// https://262.ecma-international.org/6.0/#sec-toprimitive

		ToPrimitive$1 = function ToPrimitive(input) {
			if (arguments.length > 1) {
				return toPrimitive(input, arguments[1]);
			}
			return toPrimitive(input);
		};
		return ToPrimitive$1;
	}

	var GetIntrinsic$1 = getIntrinsic;

	var $TypeError$1 = type;
	var $Number = GetIntrinsic$1('%Number%');
	var $RegExp = GetIntrinsic$1('%RegExp%');
	var $parseInteger = GetIntrinsic$1('%parseInt%');

	var callBound$4 = callBound$f;
	var regexTester = requireSafeRegexTest();
	var isPrimitive = requireIsPrimitive$1();

	var $strSlice = callBound$4('String.prototype.slice');
	var isBinary = regexTester(/^0b[01]+$/i);
	var isOctal = regexTester(/^0o[0-7]+$/i);
	var isInvalidHexLiteral = regexTester(/^[-+]0x[0-9a-f]+$/i);
	var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
	var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
	var hasNonWS = regexTester(nonWSregex);

	var $trim = requireString_prototype_trim();

	var ToPrimitive = requireToPrimitive();

	// https://262.ecma-international.org/6.0/#sec-tonumber

	var ToNumber$1 = function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : ToPrimitive(argument, $Number);
		if (typeof value === 'symbol') {
			throw new $TypeError$1('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return ToNumber($parseInteger($strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return ToNumber($parseInteger($strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			}
			var trimmed = $trim(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}

		}
		return $Number(value);
	};

	var ES5ToInteger = ToInteger$2;

	var ToNumber = ToNumber$1;

	// https://262.ecma-international.org/6.0/#sec-tointeger

	var ToInteger$1 = function ToInteger(value) {
		var number = ToNumber(value);
		return ES5ToInteger(number);
	};

	// https://262.ecma-international.org/6.0/#sec-toobject

	var ToObject$1 = ToObject$5;

	var GetIntrinsic = getIntrinsic;

	var $String$1 = GetIntrinsic('%String%');
	var $TypeError = type;

	// https://262.ecma-international.org/6.0/#sec-tostring

	var ToString$3 = function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new $TypeError('Cannot convert a Symbol value to a string');
		}
		return $String$1(argument);
	};

	// TODO; semver-major: remove

	var callBind$5 = callBindExports;

	var define$8 = defineProperties_1;
	var ToInteger = ToInteger$1;
	var ToObject = ToObject$1;
	var ToString$2 = ToString$3;
	var callBind$4 = callBind$5;

	var atShim = function at(pos) {
		var O = ToObject(this);
		var S = ToString$2(O);
		var position = ToInteger(pos);
		var size = S.length;
		if (position < 0 || position >= size) {
			return '';
		}
		// Get the first code unit and code unit value
		var cuFirst = S.charCodeAt(position);
		var cuSecond;
		var nextIndex = position + 1;
		var len = 1;
		// Check if it’s the start of a surrogate pair.
		var isHighSurrogate = cuFirst >= 0xD800 && cuFirst <= 0xDBFF;
		if (isHighSurrogate && size > nextIndex /* there is a next code unit */) {
			cuSecond = S.charCodeAt(nextIndex);
			if (cuSecond >= 0xDC00 && cuSecond <= 0xDFFF) { // low surrogate
				len = 2;
			}
		}
		return S.slice(position, position + len);
	};

	var boundAt = callBind$4(atShim);
	define$8(boundAt, {
		method: atShim,
		shim: function shimStringPrototypeAt() {
			define$8(String.prototype, { at: atShim });
			return String.prototype.at;
		}
	});

	var stringAt = boundAt;

	var String_prototype_at = stringAt;

	var ToLength$1 = ToLength$4;
	var ToString$1 = ToString$5;
	var RequireObjectCoercible$3 = RequireObjectCoercible$b;

	var callBound$3 = callBound$f;
	var $slice$1 = callBound$3('String.prototype.slice');

	var implementation$d = function padStart(maxLength) {
		var O = RequireObjectCoercible$3(this);
		var S = ToString$1(O);
		var stringLength = ToLength$1(S.length);
		var fillString;
		if (arguments.length > 1) {
			fillString = arguments[1];
		}
		var filler = typeof fillString === 'undefined' ? '' : ToString$1(fillString);
		if (filler === '') {
			filler = ' ';
		}
		var intMaxLength = ToLength$1(maxLength);
		if (intMaxLength <= stringLength) {
			return S;
		}
		var fillLen = intMaxLength - stringLength;
		while (filler.length < fillLen) {
			var fLen = filler.length;
			var remainingCodeUnits = fillLen - fLen;
			filler += fLen > remainingCodeUnits ? $slice$1(filler, 0, remainingCodeUnits) : filler;
		}

		var truncatedStringFiller = filler.length > fillLen ? $slice$1(filler, 0, fillLen) : filler;
		return truncatedStringFiller + S;
	};

	var implementation$c = implementation$d;

	var polyfill$3 = function getPolyfill() {
		return typeof String.prototype.padStart === 'function' ? String.prototype.padStart : implementation$c;
	};

	var getPolyfill$7 = polyfill$3;
	var define$7 = defineProperties_1;

	var shim$7 = function shimPadStart() {
		var polyfill = getPolyfill$7();
		define$7(String.prototype, { padStart: polyfill }, {
			padStart: function testPadStart() {
				return String.prototype.padStart !== polyfill;
			}
		});
		return polyfill;
	};

	var define$6 = defineProperties_1;
	var RequireObjectCoercible$2 = RequireObjectCoercible$b;
	var callBind$3 = callBindExports;

	var implementation$b = implementation$d;
	var getPolyfill$6 = polyfill$3;
	var shim$6 = shim$7;

	var bound$3 = callBind$3.apply(getPolyfill$6());

	var boundPadStart = function padStart(str, maxLength) {
		RequireObjectCoercible$2(str);
		var args = arguments.length > 2 ? [maxLength, arguments[2]] : [maxLength];
		return bound$3(str, args);
	};

	define$6(boundPadStart, {
		getPolyfill: getPolyfill$6,
		implementation: implementation$b,
		shim: shim$6
	});

	var string_prototype_padstart = boundPadStart;

	var String_prototype_padStart = string_prototype_padstart;

	var ToLength = ToLength$4;
	var ToString = ToString$5;
	var RequireObjectCoercible$1 = RequireObjectCoercible$b;
	var callBound$2 = callBound$f;

	var $slice = callBound$2('String.prototype.slice');

	var implementation$a = function padEnd(maxLength) {
		var O = RequireObjectCoercible$1(this);
		var S = ToString(O);
		var stringLength = ToLength(S.length);
		var fillString;
		if (arguments.length > 1) {
			fillString = arguments[1];
		}
		var filler = typeof fillString === 'undefined' ? '' : ToString(fillString);
		if (filler === '') {
			filler = ' ';
		}
		var intMaxLength = ToLength(maxLength);
		if (intMaxLength <= stringLength) {
			return S;
		}
		var fillLen = intMaxLength - stringLength;
		while (filler.length < fillLen) {
			var fLen = filler.length;
			var remainingCodeUnits = fillLen - fLen;
			filler += fLen > remainingCodeUnits ? $slice(filler, 0, remainingCodeUnits) : filler;
		}

		var truncatedStringFiller = filler.length > fillLen ? $slice(filler, 0, fillLen) : filler;
		return S + truncatedStringFiller;
	};

	var implementation$9 = implementation$a;

	var polyfill$2 = function getPolyfill() {
		return typeof String.prototype.padEnd === 'function' ? String.prototype.padEnd : implementation$9;
	};

	var getPolyfill$5 = polyfill$2;
	var define$5 = defineProperties_1;

	var shim$5 = function shimPadEnd() {
		var polyfill = getPolyfill$5();
		define$5(String.prototype, { padEnd: polyfill }, {
			padEnd: function testPadEnd() {
				return String.prototype.padEnd !== polyfill;
			}
		});
		return polyfill;
	};

	var define$4 = defineProperties_1;
	var RequireObjectCoercible = RequireObjectCoercible$b;
	var callBind$2 = callBindExports;

	var implementation$8 = implementation$a;
	var getPolyfill$4 = polyfill$2;
	var shim$4 = shim$5;

	var bound$2 = callBind$2.apply(getPolyfill$4());

	var boundPadEnd = function padEnd(str, maxLength) {
		RequireObjectCoercible(str);
		var args = arguments.length > 2 ? [maxLength, arguments[2]] : [maxLength];
		return bound$2(str, args);
	};

	define$4(boundPadEnd, {
		getPolyfill: getPolyfill$4,
		implementation: implementation$8,
		shim: shim$4
	});

	var string_prototype_padend = boundPadEnd;

	var String_prototype_padEnd = string_prototype_padend;

	var callBound$1 = callBound$f;
	var $replace$1 = callBound$1('String.prototype.replace');

	var mvsIsWS$1 = (/^\s$/).test('\u180E');
	/* eslint-disable no-control-regex */
	var startWhitespace = mvsIsWS$1
		? /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/
		: /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
	/* eslint-enable no-control-regex */

	var implementation$7 = function trimStart() {
		return $replace$1(this, startWhitespace, '');
	};

	var implementation$6 = implementation$7;

	var implementation$5 = implementation$6;

	var polyfill$1 = function getPolyfill() {
		if (!String.prototype.trimLeft) {
			return implementation$5;
		}
		var zeroWidthSpace = '\u200b';
		if (zeroWidthSpace.trimLeft() !== zeroWidthSpace) {
			return implementation$5;
		}
		return String.prototype.trimLeft;
	};

	var define$3 = defineProperties_1;
	var getPolyfill$3 = polyfill$1;

	var shim$3 = function shimTrimLeft() {
		var polyfill = getPolyfill$3();
		define$3(
			String.prototype,
			{ trimLeft: polyfill },
			{ trimLeft: function () { return String.prototype.trimLeft !== polyfill; } }
		);
		return polyfill;
	};

	var callBind$1 = callBindExports;
	var define$2 = defineProperties_1;

	var implementation$4 = implementation$6;
	var getPolyfill$2 = polyfill$1;
	var shim$2 = shim$3;

	var bound$1 = callBind$1(getPolyfill$2());

	define$2(bound$1, {
		getPolyfill: getPolyfill$2,
		implementation: implementation$4,
		shim: shim$2
	});

	var string_prototype_trimleft = bound$1;

	var String_prototype_trimLeft = string_prototype_trimleft;

	var callBound = callBound$f;
	var $replace = callBound('String.prototype.replace');

	var mvsIsWS = (/^\s$/).test('\u180E');
	/* eslint-disable no-control-regex */
	var endWhitespace = mvsIsWS
		? /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/
		: /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;
	/* eslint-enable no-control-regex */

	var implementation$3 = function trimEnd() {
		return $replace(this, endWhitespace, '');
	};

	var implementation$2 = implementation$3;

	var implementation$1 = implementation$2;

	var polyfill = function getPolyfill() {
		if (!String.prototype.trimRight) {
			return implementation$1;
		}
		var zeroWidthSpace = '\u200b';
		if (zeroWidthSpace.trimRight() !== zeroWidthSpace) {
			return implementation$1;
		}
		return String.prototype.trimRight;
	};

	var define$1 = defineProperties_1;
	var getPolyfill$1 = polyfill;

	var shim$1 = function shimTrimRight() {
		var polyfill = getPolyfill$1();
		define$1(
			String.prototype,
			{ trimRight: polyfill },
			{ trimRight: function () { return String.prototype.trimRight !== polyfill; } }
		);
		return polyfill;
	};

	var callBind = callBindExports;
	var define = defineProperties_1;

	var implementation = implementation$2;
	var getPolyfill = polyfill;
	var shim = shim$1;

	var bound = callBind(getPolyfill());

	define(bound, {
		getPolyfill: getPolyfill,
		implementation: implementation,
		shim: shim
	});

	var string_prototype_trimright = bound;

	var String_prototype_trimRight = string_prototype_trimright;

	var at = String_prototype_at;
	var padStart = String_prototype_padStart;
	var padEnd = String_prototype_padEnd;
	var trimLeft = String_prototype_trimLeft;
	var trimRight = String_prototype_trimRight;

	var String_prototype = {
		at: at,
		padStart: padStart,
		padEnd: padEnd,
		trimLeft: trimLeft,
		trimRight: trimRight,
		shim: function shimStringPrototype() {
			at.shim();
			padStart.shim();
			padEnd.shim();
			trimLeft.shim();
			trimRight.shim();
		}
	};

	var stringPrototype = String_prototype;

	var _String = {
		prototype: stringPrototype,
		shim: function shimString() {
			stringPrototype.shim();
		}
	};

	/*!
	 * https://github.com/es-shims/es7-shim
	 * @license es7-shim Copyright 2014 by contributors, MIT License
	 * see https://github.com/es-shims/es7-shim/blob/master/LICENSE
	 */

	var $Array = _Array;
	var $Object = _Object;
	var $String = _String;

	var es7Shim = {
		Array: $Array,
		Object: $Object,
		String: $String,
		shim: function shimES7() {
			$Array.shim();
			$Object.shim();
			$String.shim();
		}
	};

	var getInterfaces = {};

	Object.defineProperty(getInterfaces, "__esModule", { value: true });
	var util_1$1 = util;
	function isKeyNameValid(keyName) {
	    var regex = /^[a-zA-Z_][a-zA-Z\d_]*$/;
	    return regex.test(keyName);
	}
	function parseKeyMetaData(key) {
	    var isOptional = key.endsWith("--?");
	    if (isOptional) {
	        return {
	            isOptional: isOptional,
	            keyValue: key.slice(0, -3),
	        };
	    }
	    else {
	        return {
	            isOptional: isOptional,
	            keyValue: key,
	        };
	    }
	}
	function findNameById(id, names) {
	    return names.find(function (_) { return _.id === id; }).name;
	}
	function removeUndefinedFromUnion(unionTypeName) {
	    var typeNames = unionTypeName.split(" | ");
	    var undefinedIndex = typeNames.indexOf("undefined");
	    typeNames.splice(undefinedIndex, 1);
	    return typeNames.join(" | ");
	}
	function replaceTypeObjIdsWithNames(typeObj, names) {
	    return (Object.entries(typeObj)
	        // quote key if is invalid and question mark if optional from array merging
	        .map(function (_a) {
	        var key = _a[0], type = _a[1];
	        var _b = parseKeyMetaData(key), isOptional = _b.isOptional, keyValue = _b.keyValue;
	        var isValid = isKeyNameValid(keyValue);
	        var validName = isValid ? keyValue : "'" + keyValue + "'";
	        return isOptional ? [validName + "?", type, isOptional] : [validName, type, isOptional];
	    })
	        // replace hashes with names referencing the hashes
	        .map(function (_a) {
	        var key = _a[0], type = _a[1], isOptional = _a[2];
	        if (!util_1$1.isHash(type)) {
	            return [key, type, isOptional];
	        }
	        var newType = findNameById(type, names);
	        return [key, newType, isOptional];
	    })
	        // if union has undefined, remove undefined and make type optional
	        .map(function (_a) {
	        var key = _a[0], type = _a[1], isOptional = _a[2];
	        if (!(util_1$1.isNonArrayUnion(type) && type.includes("undefined"))) {
	            return [key, type, isOptional];
	        }
	        var newType = removeUndefinedFromUnion(type);
	        var newKey = isOptional ? key : key + "?"; // if already optional dont add question mark
	        return [newKey, newType, isOptional];
	    })
	        // make undefined optional and set type as any
	        .map(function (_a) {
	        var key = _a[0], type = _a[1], isOptional = _a[2];
	        if (type !== "undefined") {
	            return [key, type, isOptional];
	        }
	        var newType = "any";
	        var newKey = isOptional ? key : key + "?"; // if already optional dont add question mark
	        return [newKey, newType, isOptional];
	    })
	        .reduce(function (agg, _a) {
	        var key = _a[0], value = _a[1];
	        agg[key] = value;
	        return agg;
	    }, {}));
	}
	function getInterfaceStringFromDescription(_a) {
	    var name = _a.name, typeMap = _a.typeMap, useTypeAlias = _a.useTypeAlias;
	    var stringTypeMap = Object.entries(typeMap)
	        .map(function (_a) {
	        var key = _a[0], name = _a[1];
	        return "  " + key + ": " + name + ";\n";
	    })
	        .reduce(function (a, b) { return (a += b); }, "");
	    var declarationKeyWord = useTypeAlias ? "type" : "interface";
	    var interfaceString = declarationKeyWord + " " + name + (useTypeAlias ? " =" : "") + " {\n";
	    interfaceString += stringTypeMap;
	    interfaceString += "}";
	    return interfaceString;
	}
	getInterfaces.getInterfaceStringFromDescription = getInterfaceStringFromDescription;
	function getInterfaceDescriptions(typeStructure, names) {
	    return names
	        .map(function (_a) {
	        var id = _a.id, name = _a.name;
	        var typeDescription = util_1$1.findTypeById(id, typeStructure.types);
	        if (typeDescription.typeObj) {
	            var typeMap = replaceTypeObjIdsWithNames(typeDescription.typeObj, names);
	            return { name: name, typeMap: typeMap };
	        }
	        else {
	            return null;
	        }
	    })
	        .filter(function (_) { return _ !== null; });
	}
	getInterfaces.getInterfaceDescriptions = getInterfaceDescriptions;

	var getNames$1 = {};

	function commonjsRequire(path) {
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}

	var pluralize$1 = {exports: {}};

	/* global define */

	(function (module, exports) {
		(function (root, pluralize) {
		  /* istanbul ignore else */
		  if (typeof commonjsRequire === 'function' && 'object' === 'object' && 'object' === 'object') {
		    // Node.
		    module.exports = pluralize();
		  } else {
		    // Browser global.
		    root.pluralize = pluralize();
		  }
		})(commonjsGlobal, function () {
		  // Rule storage - pluralize and singularize need to be run sequentially,
		  // while other rules can be optimized using an object for instant lookups.
		  var pluralRules = [];
		  var singularRules = [];
		  var uncountables = {};
		  var irregularPlurals = {};
		  var irregularSingles = {};

		  /**
		   * Title case a string.
		   *
		   * @param  {string} str
		   * @return {string}
		   */
		  function toTitleCase (str) {
		    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
		  }

		  /**
		   * Sanitize a pluralization rule to a usable regular expression.
		   *
		   * @param  {(RegExp|string)} rule
		   * @return {RegExp}
		   */
		  function sanitizeRule (rule) {
		    if (typeof rule === 'string') {
		      return new RegExp('^' + rule + '$', 'i');
		    }

		    return rule;
		  }

		  /**
		   * Pass in a word token to produce a function that can replicate the case on
		   * another word.
		   *
		   * @param  {string}   word
		   * @param  {string}   token
		   * @return {Function}
		   */
		  function restoreCase (word, token) {
		    // Tokens are an exact match.
		    if (word === token) {
		      return token;
		    }

		    // Upper cased words. E.g. "HELLO".
		    if (word === word.toUpperCase()) {
		      return token.toUpperCase();
		    }

		    // Title cased words. E.g. "Title".
		    if (word[0] === word[0].toUpperCase()) {
		      return toTitleCase(token);
		    }

		    // Lower cased words. E.g. "test".
		    return token.toLowerCase();
		  }

		  /**
		   * Interpolate a regexp string.
		   *
		   * @param  {string} str
		   * @param  {Array}  args
		   * @return {string}
		   */
		  function interpolate (str, args) {
		    return str.replace(/\$(\d{1,2})/g, function (match, index) {
		      return args[index] || '';
		    });
		  }

		  /**
		   * Sanitize a word by passing in the word and sanitization rules.
		   *
		   * @param  {string}   token
		   * @param  {string}   word
		   * @param  {Array}    collection
		   * @return {string}
		   */
		  function sanitizeWord (token, word, collection) {
		    // Empty string or doesn't need fixing.
		    if (!token.length || uncountables.hasOwnProperty(token)) {
		      return word;
		    }

		    var len = collection.length;

		    // Iterate over the sanitization rules and use the first one to match.
		    while (len--) {
		      var rule = collection[len];

		      // If the rule passes, return the replacement.
		      if (rule[0].test(word)) {
		        return word.replace(rule[0], function (match, index, word) {
		          var result = interpolate(rule[1], arguments);

		          if (match === '') {
		            return restoreCase(word[index - 1], result);
		          }

		          return restoreCase(match, result);
		        });
		      }
		    }

		    return word;
		  }

		  /**
		   * Replace a word with the updated word.
		   *
		   * @param  {Object}   replaceMap
		   * @param  {Object}   keepMap
		   * @param  {Array}    rules
		   * @return {Function}
		   */
		  function replaceWord (replaceMap, keepMap, rules) {
		    return function (word) {
		      // Get the correct token and case restoration functions.
		      var token = word.toLowerCase();

		      // Check against the keep object map.
		      if (keepMap.hasOwnProperty(token)) {
		        return restoreCase(word, token);
		      }

		      // Check against the replacement map for a direct word replacement.
		      if (replaceMap.hasOwnProperty(token)) {
		        return restoreCase(word, replaceMap[token]);
		      }

		      // Run all the rules against the word.
		      return sanitizeWord(token, word, rules);
		    };
		  }

		  /**
		   * Pluralize or singularize a word based on the passed in count.
		   *
		   * @param  {string}  word
		   * @param  {number}  count
		   * @param  {boolean} inclusive
		   * @return {string}
		   */
		  function pluralize (word, count, inclusive) {
		    var pluralized = count === 1
		      ? pluralize.singular(word) : pluralize.plural(word);

		    return (inclusive ? count + ' ' : '') + pluralized;
		  }

		  /**
		   * Pluralize a word.
		   *
		   * @type {Function}
		   */
		  pluralize.plural = replaceWord(
		    irregularSingles, irregularPlurals, pluralRules
		  );

		  /**
		   * Singularize a word.
		   *
		   * @type {Function}
		   */
		  pluralize.singular = replaceWord(
		    irregularPlurals, irregularSingles, singularRules
		  );

		  /**
		   * Add a pluralization rule to the collection.
		   *
		   * @param {(string|RegExp)} rule
		   * @param {string}          replacement
		   */
		  pluralize.addPluralRule = function (rule, replacement) {
		    pluralRules.push([sanitizeRule(rule), replacement]);
		  };

		  /**
		   * Add a singularization rule to the collection.
		   *
		   * @param {(string|RegExp)} rule
		   * @param {string}          replacement
		   */
		  pluralize.addSingularRule = function (rule, replacement) {
		    singularRules.push([sanitizeRule(rule), replacement]);
		  };

		  /**
		   * Add an uncountable word rule.
		   *
		   * @param {(string|RegExp)} word
		   */
		  pluralize.addUncountableRule = function (word) {
		    if (typeof word === 'string') {
		      uncountables[word.toLowerCase()] = true;
		      return;
		    }

		    // Set singular and plural references for the word.
		    pluralize.addPluralRule(word, '$0');
		    pluralize.addSingularRule(word, '$0');
		  };

		  /**
		   * Add an irregular word definition.
		   *
		   * @param {string} single
		   * @param {string} plural
		   */
		  pluralize.addIrregularRule = function (single, plural) {
		    plural = plural.toLowerCase();
		    single = single.toLowerCase();

		    irregularSingles[single] = plural;
		    irregularPlurals[plural] = single;
		  };

		  /**
		   * Irregular rules.
		   */
		  [
		    // Pronouns.
		    ['I', 'we'],
		    ['me', 'us'],
		    ['he', 'they'],
		    ['she', 'they'],
		    ['them', 'them'],
		    ['myself', 'ourselves'],
		    ['yourself', 'yourselves'],
		    ['itself', 'themselves'],
		    ['herself', 'themselves'],
		    ['himself', 'themselves'],
		    ['themself', 'themselves'],
		    ['is', 'are'],
		    ['was', 'were'],
		    ['has', 'have'],
		    ['this', 'these'],
		    ['that', 'those'],
		    // Words ending in with a consonant and `o`.
		    ['echo', 'echoes'],
		    ['dingo', 'dingoes'],
		    ['volcano', 'volcanoes'],
		    ['tornado', 'tornadoes'],
		    ['torpedo', 'torpedoes'],
		    // Ends with `us`.
		    ['genus', 'genera'],
		    ['viscus', 'viscera'],
		    // Ends with `ma`.
		    ['stigma', 'stigmata'],
		    ['stoma', 'stomata'],
		    ['dogma', 'dogmata'],
		    ['lemma', 'lemmata'],
		    ['schema', 'schemata'],
		    ['anathema', 'anathemata'],
		    // Other irregular rules.
		    ['ox', 'oxen'],
		    ['axe', 'axes'],
		    ['die', 'dice'],
		    ['yes', 'yeses'],
		    ['foot', 'feet'],
		    ['eave', 'eaves'],
		    ['goose', 'geese'],
		    ['tooth', 'teeth'],
		    ['quiz', 'quizzes'],
		    ['human', 'humans'],
		    ['proof', 'proofs'],
		    ['carve', 'carves'],
		    ['valve', 'valves'],
		    ['looey', 'looies'],
		    ['thief', 'thieves'],
		    ['groove', 'grooves'],
		    ['pickaxe', 'pickaxes'],
		    ['whiskey', 'whiskies']
		  ].forEach(function (rule) {
		    return pluralize.addIrregularRule(rule[0], rule[1]);
		  });

		  /**
		   * Pluralization rules.
		   */
		  [
		    [/s?$/i, 's'],
		    [/([^aeiou]ese)$/i, '$1'],
		    [/(ax|test)is$/i, '$1es'],
		    [/(alias|[^aou]us|tlas|gas|ris)$/i, '$1es'],
		    [/(e[mn]u)s?$/i, '$1s'],
		    [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i, '$1'],
		    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
		    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
		    [/(seraph|cherub)(?:im)?$/i, '$1im'],
		    [/(her|at|gr)o$/i, '$1oes'],
		    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
		    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
		    [/sis$/i, 'ses'],
		    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
		    [/([^aeiouy]|qu)y$/i, '$1ies'],
		    [/([^ch][ieo][ln])ey$/i, '$1ies'],
		    [/(x|ch|ss|sh|zz)$/i, '$1es'],
		    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
		    [/(m|l)(?:ice|ouse)$/i, '$1ice'],
		    [/(pe)(?:rson|ople)$/i, '$1ople'],
		    [/(child)(?:ren)?$/i, '$1ren'],
		    [/eaux$/i, '$0'],
		    [/m[ae]n$/i, 'men'],
		    ['thou', 'you']
		  ].forEach(function (rule) {
		    return pluralize.addPluralRule(rule[0], rule[1]);
		  });

		  /**
		   * Singularization rules.
		   */
		  [
		    [/s$/i, ''],
		    [/(ss)$/i, '$1'],
		    [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(?:sis|ses)$/i, '$1sis'],
		    [/(^analy)(?:sis|ses)$/i, '$1sis'],
		    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
		    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
		    [/ies$/i, 'y'],
		    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
		    [/\b(mon|smil)ies$/i, '$1ey'],
		    [/(m|l)ice$/i, '$1ouse'],
		    [/(seraph|cherub)im$/i, '$1'],
		    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i, '$1'],
		    [/(e[mn]u)s?$/i, '$1'],
		    [/(movie|twelve)s$/i, '$1'],
		    [/(cris|test|diagnos)(?:is|es)$/i, '$1is'],
		    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
		    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
		    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
		    [/(alumn|alg|vertebr)ae$/i, '$1a'],
		    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
		    [/(matr|append)ices$/i, '$1ix'],
		    [/(pe)(rson|ople)$/i, '$1rson'],
		    [/(child)ren$/i, '$1'],
		    [/(eau)x?$/i, '$1'],
		    [/men$/i, 'man']
		  ].forEach(function (rule) {
		    return pluralize.addSingularRule(rule[0], rule[1]);
		  });

		  /**
		   * Uncountable rules.
		   */
		  [
		    // Singular words with no plurals.
		    'advice',
		    'adulthood',
		    'agenda',
		    'aid',
		    'alcohol',
		    'ammo',
		    'athletics',
		    'bison',
		    'blood',
		    'bream',
		    'buffalo',
		    'butter',
		    'carp',
		    'cash',
		    'chassis',
		    'chess',
		    'clothing',
		    'commerce',
		    'cod',
		    'cooperation',
		    'corps',
		    'digestion',
		    'debris',
		    'diabetes',
		    'energy',
		    'equipment',
		    'elk',
		    'excretion',
		    'expertise',
		    'flounder',
		    'fun',
		    'gallows',
		    'garbage',
		    'graffiti',
		    'headquarters',
		    'health',
		    'herpes',
		    'highjinks',
		    'homework',
		    'housework',
		    'information',
		    'jeans',
		    'justice',
		    'kudos',
		    'labour',
		    'literature',
		    'machinery',
		    'mackerel',
		    'mail',
		    'media',
		    'mews',
		    'moose',
		    'music',
		    'news',
		    'pike',
		    'plankton',
		    'pliers',
		    'pollution',
		    'premises',
		    'rain',
		    'research',
		    'rice',
		    'salmon',
		    'scissors',
		    'series',
		    'sewage',
		    'shambles',
		    'shrimp',
		    'species',
		    'staff',
		    'swine',
		    'trout',
		    'traffic',
		    'transporation',
		    'tuna',
		    'wealth',
		    'welfare',
		    'whiting',
		    'wildebeest',
		    'wildlife',
		    'you',
		    // Regexes.
		    /pox$/i, // "chickpox", "smallpox"
		    /ois$/i,
		    /deer$/i, // "deer", "reindeer"
		    /fish$/i, // "fish", "blowfish", "angelfish"
		    /sheep$/i,
		    /measles$/i,
		    /[^aeiou]ese$/i // "chinese", "japanese"
		  ].forEach(pluralize.addUncountableRule);

		  return pluralize;
		}); 
	} (pluralize$1));

	var pluralizeExports = pluralize$1.exports;

	Object.defineProperty(getNames$1, "__esModule", { value: true });
	var pluralize = pluralizeExports;
	var model_1 = model;
	var util_1 = util;
	function getName(_a, keyName, names, isInsideArray) {
	    var rootTypeId = _a.rootTypeId, types = _a.types;
	    var typeDesc = types.find(function (_) { return _.id === rootTypeId; });
	    switch (util_1.getTypeDescriptionGroup(typeDesc)) {
	        case model_1.TypeGroup.Array:
	            typeDesc.arrayOfTypes.forEach(function (typeIdOrPrimitive, i) {
	                getName({ rootTypeId: typeIdOrPrimitive, types: types }, 
	                // to differenttiate array types
	                i === 0 ? keyName : "" + keyName + (i + 1), names, true);
	            });
	            return {
	                rootName: getNameById(typeDesc.id, keyName, isInsideArray, types, names),
	                names: names,
	            };
	        case model_1.TypeGroup.Object:
	            Object.entries(typeDesc.typeObj).forEach(function (_a) {
	                var key = _a[0], value = _a[1];
	                getName({ rootTypeId: value, types: types }, key, names, false);
	            });
	            return {
	                rootName: getNameById(typeDesc.id, keyName, isInsideArray, types, names),
	                names: names,
	            };
	        case model_1.TypeGroup.Primitive:
	            // in this case rootTypeId is primitive type string (string, null, number, boolean)
	            return {
	                rootName: rootTypeId,
	                names: names,
	            };
	    }
	}
	function getNames(typeStructure, rootName) {
	    if (rootName === void 0) { rootName = "RootObject"; }
	    return getName(typeStructure, rootName, [], false).names.reverse();
	}
	getNames$1.getNames = getNames;
	function getNameById(id, keyName, isInsideArray, types, nameMap) {
	    var nameEntry = nameMap.find(function (_) { return _.id === id; });
	    if (nameEntry) {
	        return nameEntry.name;
	    }
	    var typeDesc = util_1.findTypeById(id, types);
	    var group = util_1.getTypeDescriptionGroup(typeDesc);
	    var name;
	    switch (group) {
	        case model_1.TypeGroup.Array:
	            name = typeDesc.isUnion ? getArrayName(typeDesc, types, nameMap) : formatArrayName(typeDesc, types, nameMap);
	            break;
	        case model_1.TypeGroup.Object:
	            /**
	             * picking name for type in array requires to singularize that type name,
	             * and if not then no need to singularize
	             */
	            name = [keyName]
	                .map(function (key) { return util_1.parseKeyMetaData(key).keyValue; })
	                .map(function (name) { return (isInsideArray ? pluralize.singular(name) : name); })
	                .map(pascalCase)
	                .map(normalizeInvalidTypeName)
	                .map(pascalCase) // needed because removed symbols might leave first character uncapitalized
	                .map(function (name) {
	                return uniqueByIncrement(name, nameMap.map(function (_a) {
	                    var name = _a.name;
	                    return name;
	                }));
	            })
	                .pop();
	            break;
	    }
	    nameMap.push({ id: id, name: name });
	    return name;
	}
	function pascalCase(name) {
	    return name
	        .split(/\s+/g)
	        .filter(function (_) { return _ !== ""; })
	        .map(capitalize)
	        .reduce(function (a, b) { return a + b; }, "");
	}
	function capitalize(name) {
	    return name.charAt(0).toUpperCase() + name.slice(1);
	}
	function normalizeInvalidTypeName(name) {
	    if (/^[a-zA-Z][a-zA-Z0-9]*$/.test(name)) {
	        return name;
	    }
	    else {
	        var noSymbolsName = name.replace(/[^a-zA-Z0-9]/g, "");
	        var startsWithWordCharacter = /^[a-zA-Z]/.test(noSymbolsName);
	        return startsWithWordCharacter ? noSymbolsName : "_" + noSymbolsName;
	    }
	}
	function uniqueByIncrement(name, names) {
	    for (var i = 0; i < 1000; i++) {
	        var nameProposal = i === 0 ? name : "" + name + (i + 1);
	        if (!names.includes(nameProposal)) {
	            return nameProposal;
	        }
	    }
	}
	function getArrayName(typeDesc, types, nameMap) {
	    if (typeDesc.arrayOfTypes.length === 0) {
	        return "any";
	    }
	    else if (typeDesc.arrayOfTypes.length === 1) {
	        var idOrPrimitive = typeDesc.arrayOfTypes[0];
	        return convertToReadableType(idOrPrimitive, types, nameMap);
	    }
	    else {
	        return unionToString(typeDesc, types, nameMap);
	    }
	}
	function convertToReadableType(idOrPrimitive, types, nameMap) {
	    return util_1.isHash(idOrPrimitive)
	        ? // array keyName makes no difference in picking name for type
	            getNameById(idOrPrimitive, null, true, types, nameMap)
	        : idOrPrimitive;
	}
	function unionToString(typeDesc, types, nameMap) {
	    return typeDesc.arrayOfTypes.reduce(function (acc, type, i) {
	        var readableTypeName = convertToReadableType(type, types, nameMap);
	        return i === 0 ? readableTypeName : acc + " | " + readableTypeName;
	    }, "");
	}
	function formatArrayName(typeDesc, types, nameMap) {
	    var innerTypeId = typeDesc.arrayOfTypes[0];
	    // const isMultipleTypeArray = findTypeById(innerTypeId, types).arrayOfTypes.length > 1
	    var isMultipleTypeArray = util_1.isHash(innerTypeId) &&
	        util_1.findTypeById(innerTypeId, types).isUnion &&
	        util_1.findTypeById(innerTypeId, types).arrayOfTypes.length > 1;
	    var readableInnerType = getArrayName(typeDesc, types, nameMap);
	    return isMultipleTypeArray
	        ? "(" + readableInnerType + ")[]" // add semicolons for union type
	        : readableInnerType + "[]";
	}

	(function (module, exports) {
		var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
		    __assign = Object.assign || function(t) {
		        for (var s, i = 1, n = arguments.length; i < n; i++) {
		            s = arguments[i];
		            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
		                t[p] = s[p];
		        }
		        return t;
		    };
		    return __assign.apply(this, arguments);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		var get_type_structure_1 = getTypeStructure$1;
		var es7_shim_1 = es7Shim;
		var get_interfaces_1 = getInterfaces;
		var get_names_1 = getNames$1;
		var util_1 = util;
		es7_shim_1.shim();
		function JsonToTS(json, userOptions) {
		    var defaultOptions = {
		        rootName: "RootObject",
		    };
		    var options = __assign(__assign({}, defaultOptions), userOptions);
		    /**
		     * Parsing currently works with (Objects) and (Array of Objects) not and primitive types and mixed arrays etc..
		     * so we shall validate, so we dont start parsing non Object type
		     */
		    var isArrayOfObjects = util_1.isArray(json) && json.length > 0 && json.reduce(function (a, b) { return a && util_1.isObject(b); }, true);
		    if (!(util_1.isObject(json) || isArrayOfObjects)) {
		        throw new Error("Only (Object) and (Array of Object) are supported");
		    }
		    var typeStructure = get_type_structure_1.getTypeStructure(json);
		    /**
		     * due to merging array types some types are switched out for merged ones
		     * so we delete the unused ones here
		     */
		    get_type_structure_1.optimizeTypeStructure(typeStructure);
		    var names = get_names_1.getNames(typeStructure, options.rootName);
		    return get_interfaces_1.getInterfaceDescriptions(typeStructure, names).map(function (description) {
		        return get_interfaces_1.getInterfaceStringFromDescription(__assign(__assign({}, description), { useTypeAlias: options.useTypeAlias }));
		    });
		}
		exports.default = JsonToTS;
		JsonToTS.default = JsonToTS;
		module.exports = JsonToTS;
		
	} (src, src.exports));

	var srcExports = src.exports;

	const JsonToTS = srcExports;

	const options = {
	  declareExternallyReferenced: true,
	  enableConstEnums: true,
	  unreachableDefinitions: false,
	  strictIndexSignatures: false
	};

	// expose options for advance users
	window.options = options;

	window.addEventListener('DOMContentLoaded', async () => {
	  console.info("Welcome! If you'd like to play around with more advance options,", "you can mutate the 'options' object assigned to window :)");

	  // Attach DOM event listeners
	  getLeftInput().addEventListener('input', update);
	  document.getElementById('formatButton').addEventListener('click', format);

	  // Init app
	  loadFromURI();
	  await update();
	  initOptions();
	});

	function loadFromURI() {
	  const hash = window.location.hash.slice(1);
	  if (!hash.startsWith('json=')) {
	    return;
	  }
	  getLeftInput().value = window.decodeURI(hash.slice(5));
	}

	function initOptions() {
	  Object.keys(options).forEach(option => {
	    const optionCheckbox = document.getElementById(option);
	    options[option] = optionCheckbox.checked;
	    optionCheckbox.addEventListener('change', async () => {
	      options[option] = optionCheckbox.checked;
	      await update();
	    });
	  });
	}

	async function update() {
	  const input = getLeftInput().value;
	  if (input === undefined) {
	    return;
	  }

	  // save input to local storage
	  save();

	  // re-compile TS
	  try {
	    const ts = await JsonToTS(JSON.parse(input), 'Demo', options);
	    getRightOutput().value = ts;
	    clearError();
	  } catch (e) {
	    setError(e);
	  }
	}

	function clearError() {
	  getErrorIcon().style.display = 'none';
	}

	function setError(e) {
	  console.error(e);
	  getErrorIcon().title = e;
	  getErrorIcon().style.display = null;
	}

	function format() {
	  const input = getLeftInput().value;
	  if (input === undefined) {
	    return;
	  }

	  getLeftInput().value = JSON.stringify(input, null, 2);
	  save();
	}

	function save() {
	  window.location.hash = 'json=' + window.encodeURI(getLeftInput().value);
	}

	function getLeftInput() {
	  return document.querySelector('#leftInput textarea');
	}
	function getRightOutput() {
	  return document.querySelector('#rightOutput textarea');
	}
	function getErrorIcon() {
	  return document.getElementById('errorIcon');
	}

	return src$1;

})();
