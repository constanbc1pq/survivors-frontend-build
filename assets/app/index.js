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
  BigNumber: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "396aevgSSxJsaUbU4ZdxeVn", "BigNumber");
    "use strict";
    !function(e) {
      var r, x = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, L = Math.ceil, U = Math.floor, I = "[BigNumber Error] ", T = I + "Number primitive has more than 15 significant digits: ", C = 1e14, M = 14, G = 9007199254740991, k = [ 1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13 ], F = 1e7, q = 1e9;
      function j(e) {
        var r = 0 | e;
        return 0 < e || e === r ? r : r - 1;
      }
      function $(e) {
        for (var r, n, t = 1, i = e.length, o = e[0] + ""; t < i; ) {
          for (r = e[t++] + "", n = M - r.length; n--; r = "0" + r) ;
          o += r;
        }
        for (i = o.length; 48 === o.charCodeAt(--i); ) ;
        return o.slice(0, i + 1 || 1);
      }
      function z(e, r) {
        var n, t, i = e.c, o = r.c, s = e.s, f = r.s, u = e.e, l = r.e;
        if (!s || !f) return null;
        if (n = i && !i[0], t = o && !o[0], n || t) return n ? t ? 0 : -f : s;
        if (s != f) return s;
        if (n = s < 0, t = u == l, !i || !o) return t ? 0 : !i ^ n ? 1 : -1;
        if (!t) return l < u ^ n ? 1 : -1;
        for (f = (u = i.length) < (l = o.length) ? u : l, s = 0; s < f; s++) if (i[s] != o[s]) return i[s] > o[s] ^ n ? 1 : -1;
        return u == l ? 0 : l < u ^ n ? 1 : -1;
      }
      function H(e, r, n, t) {
        if (e < r || n < e || e !== U(e)) throw Error(I + (t || "Argument") + ("number" == typeof e ? e < r || n < e ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(e));
      }
      function V(e) {
        var r = e.c.length - 1;
        return j(e.e / M) == r && e.c[r] % 2 != 0;
      }
      function W(e, r) {
        return (1 < e.length ? e.charAt(0) + "." + e.slice(1) : e) + (r < 0 ? "e" : "e+") + r;
      }
      function X(e, r, n) {
        var t, i;
        if (r < 0) {
          for (i = n + "."; ++r; i += n) ;
          e = i + e;
        } else if (++r > (t = e.length)) {
          for (i = n, r -= t; --r; i += n) ;
          e += i;
        } else r < t && (e = e.slice(0, r) + "." + e.slice(r));
        return e;
      }
      (r = function e(r) {
        var v, a, h, n, l, s, f, u, c, g, t = B.prototype = {
          constructor: B,
          toString: null,
          valueOf: null
        }, w = new B(1), N = 20, O = 4, p = -7, d = 21, m = -1e7, y = 1e7, b = !1, o = 1, E = 0, A = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: " ",
          suffix: ""
        }, S = "0123456789abcdefghijklmnopqrstuvwxyz";
        function B(e, r) {
          var n, t, i, o, s, f, u, l, c = this;
          if (!(c instanceof B)) return new B(e, r);
          if (null == r) {
            if (e && !0 === e._isBigNumber) return c.s = e.s, void (!e.c || e.e > y ? c.c = c.e = null : e.e < m ? c.c = [ c.e = 0 ] : (c.e = e.e, 
            c.c = e.c.slice()));
            if ((f = "number" == typeof e) && 0 * e == 0) {
              if (c.s = 1 / e < 0 ? (e = -e, -1) : 1, e === ~~e) {
                for (o = 0, s = e; 10 <= s; s /= 10, o++) ;
                return void (c.c = y < o ? c.e = null : (c.e = o, [ e ]));
              }
              l = String(e);
            } else {
              if (!x.test(l = String(e))) return h(c, l, f);
              c.s = 45 == l.charCodeAt(0) ? (l = l.slice(1), -1) : 1;
            }
            -1 < (o = l.indexOf(".")) && (l = l.replace(".", "")), 0 < (s = l.search(/e/i)) ? (o < 0 && (o = s), 
            o += +l.slice(s + 1), l = l.substring(0, s)) : o < 0 && (o = l.length);
          } else {
            if (H(r, 2, S.length, "Base"), 10 == r) return D(c = new B(e), N + c.e + 1, O);
            if (l = String(e), f = "number" == typeof e) {
              if (0 * e != 0) return h(c, l, f, r);
              if (c.s = 1 / e < 0 ? (l = l.slice(1), -1) : 1, B.DEBUG && 15 < l.replace(/^0\.0*|\./, "").length) throw Error(T + e);
            } else c.s = 45 === l.charCodeAt(0) ? (l = l.slice(1), -1) : 1;
            for (n = S.slice(0, r), o = s = 0, u = l.length; s < u; s++) if (n.indexOf(t = l.charAt(s)) < 0) {
              if ("." == t) {
                if (o < s) {
                  o = u;
                  continue;
                }
              } else if (!i && (l == l.toUpperCase() && (l = l.toLowerCase()) || l == l.toLowerCase() && (l = l.toUpperCase()))) {
                i = !0, s = -1, o = 0;
                continue;
              }
              return h(c, String(e), f, r);
            }
            f = !1, -1 < (o = (l = a(l, r, 10, c.s)).indexOf(".")) ? l = l.replace(".", "") : o = l.length;
          }
          for (s = 0; 48 === l.charCodeAt(s); s++) ;
          for (u = l.length; 48 === l.charCodeAt(--u); ) ;
          if (l = l.slice(s, ++u)) {
            if (u -= s, f && B.DEBUG && 15 < u && (G < e || e !== U(e))) throw Error(T + c.s * e);
            if ((o = o - s - 1) > y) c.c = c.e = null; else if (o < m) c.c = [ c.e = 0 ]; else {
              if (c.e = o, c.c = [], s = (o + 1) % M, o < 0 && (s += M), s < u) {
                for (s && c.c.push(+l.slice(0, s)), u -= M; s < u; ) c.c.push(+l.slice(s, s += M));
                s = M - (l = l.slice(s)).length;
              } else s -= u;
              for (;s--; l += "0") ;
              c.c.push(+l);
            }
          } else c.c = [ c.e = 0 ];
        }
        function i(e, r, n, t) {
          var i, o, s, f, u;
          if (null == n ? n = O : H(n, 0, 8), !e.c) return e.toString();
          if (i = e.c[0], s = e.e, null == r) u = $(e.c), u = 1 == t || 2 == t && (s <= p || d <= s) ? W(u, s) : X(u, s, "0"); else if (o = (e = D(new B(e), r, n)).e, 
          f = (u = $(e.c)).length, 1 == t || 2 == t && (r <= o || o <= p)) {
            for (;f < r; u += "0", f++) ;
            u = W(u, o);
          } else if (r -= s, u = X(u, o, "0"), f < o + 1) {
            if (0 < --r) for (u += "."; r--; u += "0") ;
          } else if (0 < (r += o - f)) for (o + 1 == f && (u += "."); r--; u += "0") ;
          return e.s < 0 && i ? "-" + u : u;
        }
        function R(e, r) {
          for (var n, t = 1, i = new B(e[0]); t < e.length; t++) {
            if (!(n = new B(e[t])).s) {
              i = n;
              break;
            }
            r.call(i, n) && (i = n);
          }
          return i;
        }
        function _(e, r, n) {
          for (var t = 1, i = r.length; !r[--i]; r.pop()) ;
          for (i = r[0]; 10 <= i; i /= 10, t++) ;
          return (n = t + n * M - 1) > y ? e.c = e.e = null : e.c = n < m ? [ e.e = 0 ] : (e.e = n, 
          r), e;
        }
        function D(e, r, n, t) {
          var i, o, s, f, u, l, c, a = e.c, h = k;
          if (a) {
            e: {
              for (i = 1, f = a[0]; 10 <= f; f /= 10, i++) ;
              if ((o = r - i) < 0) o += M, s = r, c = (u = a[l = 0]) / h[i - s - 1] % 10 | 0; else if ((l = L((o + 1) / M)) >= a.length) {
                if (!t) break e;
                for (;a.length <= l; a.push(0)) ;
                u = c = 0, s = (o %= M) - M + (i = 1);
              } else {
                for (u = f = a[l], i = 1; 10 <= f; f /= 10, i++) ;
                c = (s = (o %= M) - M + i) < 0 ? 0 : u / h[i - s - 1] % 10 | 0;
              }
              if (t = t || r < 0 || null != a[l + 1] || (s < 0 ? u : u % h[i - s - 1]), t = n < 4 ? (c || t) && (0 == n || n == (e.s < 0 ? 3 : 2)) : 5 < c || 5 == c && (4 == n || t || 6 == n && (0 < o ? 0 < s ? u / h[i - s] : 0 : a[l - 1]) % 10 & 1 || n == (e.s < 0 ? 8 : 7)), 
              r < 1 || !a[0]) return a.length = 0, t ? (r -= e.e + 1, a[0] = h[(M - r % M) % M], 
              e.e = -r || 0) : a[0] = e.e = 0, e;
              if (0 == o ? (a.length = l, f = 1, l--) : (a.length = l + 1, f = h[M - o], a[l] = 0 < s ? U(u / h[i - s] % h[s]) * f : 0), 
              t) for (;;) {
                if (0 == l) {
                  for (o = 1, s = a[0]; 10 <= s; s /= 10, o++) ;
                  for (s = a[0] += f, f = 1; 10 <= s; s /= 10, f++) ;
                  o != f && (e.e++, a[0] == C && (a[0] = 1));
                  break;
                }
                if (a[l] += f, a[l] != C) break;
                a[l--] = 0, f = 1;
              }
              for (o = a.length; 0 === a[--o]; a.pop()) ;
            }
            e.e > y ? e.c = e.e = null : e.e < m && (e.c = [ e.e = 0 ]);
          }
          return e;
        }
        function P(e) {
          var r, n = e.e;
          return null === n ? e.toString() : (r = $(e.c), r = n <= p || d <= n ? W(r, n) : X(r, n, "0"), 
          e.s < 0 ? "-" + r : r);
        }
        return B.clone = e, B.ROUND_UP = 0, B.ROUND_DOWN = 1, B.ROUND_CEIL = 2, B.ROUND_FLOOR = 3, 
        B.ROUND_HALF_UP = 4, B.ROUND_HALF_DOWN = 5, B.ROUND_HALF_EVEN = 6, B.ROUND_HALF_CEIL = 7, 
        B.ROUND_HALF_FLOOR = 8, B.EUCLID = 9, B.config = B.set = function(e) {
          var r, n;
          if (null != e) {
            if ("object" != typeof e) throw Error(I + "Object expected: " + e);
            if (e.hasOwnProperty(r = "DECIMAL_PLACES") && (H(n = e[r], 0, q, r), N = n), e.hasOwnProperty(r = "ROUNDING_MODE") && (H(n = e[r], 0, 8, r), 
            O = n), e.hasOwnProperty(r = "EXPONENTIAL_AT") && ((n = e[r]) && n.pop ? (H(n[0], -q, 0, r), 
            H(n[1], 0, q, r), p = n[0], d = n[1]) : (H(n, -q, q, r), p = -(d = n < 0 ? -n : n))), 
            e.hasOwnProperty(r = "RANGE")) if ((n = e[r]) && n.pop) H(n[0], -q, -1, r), H(n[1], 1, q, r), 
            m = n[0], y = n[1]; else {
              if (H(n, -q, q, r), !n) throw Error(I + r + " cannot be zero: " + n);
              m = -(y = n < 0 ? -n : n);
            }
            if (e.hasOwnProperty(r = "CRYPTO")) {
              if ((n = e[r]) !== !!n) throw Error(I + r + " not true or false: " + n);
              if (n) {
                if ("undefined" == typeof crypto || !crypto || !crypto.getRandomValues && !crypto.randomBytes) throw b = !n, 
                Error(I + "crypto unavailable");
                b = n;
              } else b = n;
            }
            if (e.hasOwnProperty(r = "MODULO_MODE") && (H(n = e[r], 0, 9, r), o = n), e.hasOwnProperty(r = "POW_PRECISION") && (H(n = e[r], 0, q, r), 
            E = n), e.hasOwnProperty(r = "FORMAT")) {
              if ("object" != typeof (n = e[r])) throw Error(I + r + " not an object: " + n);
              A = n;
            }
            if (e.hasOwnProperty(r = "ALPHABET")) {
              if ("string" != typeof (n = e[r]) || /^.$|[+-.\s]|(.).*\1/.test(n)) throw Error(I + r + " invalid: " + n);
              S = n;
            }
          }
          return {
            DECIMAL_PLACES: N,
            ROUNDING_MODE: O,
            EXPONENTIAL_AT: [ p, d ],
            RANGE: [ m, y ],
            CRYPTO: b,
            MODULO_MODE: o,
            POW_PRECISION: E,
            FORMAT: A,
            ALPHABET: S
          };
        }, B.isBigNumber = function(e) {
          if (!e || !0 !== e._isBigNumber) return !1;
          if (!B.DEBUG) return !0;
          var r, n, t = e.c, i = e.e, o = e.s;
          e: if ("[object Array]" == {}.toString.call(t)) {
            if ((1 === o || -1 === o) && -q <= i && i <= q && i === U(i)) {
              if (0 === t[0]) {
                if (0 === i && 1 === t.length) return !0;
                break e;
              }
              if ((r = (i + 1) % M) < 1 && (r += M), String(t[0]).length == r) {
                for (r = 0; r < t.length; r++) if ((n = t[r]) < 0 || C <= n || n !== U(n)) break e;
                if (0 !== n) return !0;
              }
            }
          } else if (null === t && null === i && (null === o || 1 === o || -1 === o)) return !0;
          throw Error(I + "Invalid BigNumber: " + e);
        }, B.maximum = B.max = function() {
          return R(arguments, t.lt);
        }, B.minimum = B.min = function() {
          return R(arguments, t.gt);
        }, B.random = (n = 9007199254740992, l = Math.random() * n & 2097151 ? function() {
          return U(Math.random() * n);
        } : function() {
          return 8388608 * (1073741824 * Math.random() | 0) + (8388608 * Math.random() | 0);
        }, function(e) {
          var r, n, t, i, o, s = 0, f = [], u = new B(w);
          if (null == e ? e = N : H(e, 0, q), i = L(e / M), b) if (crypto.getRandomValues) {
            for (r = crypto.getRandomValues(new Uint32Array(i *= 2)); s < i; ) 9e15 <= (o = 131072 * r[s] + (r[s + 1] >>> 11)) ? (n = crypto.getRandomValues(new Uint32Array(2)), 
            r[s] = n[0], r[s + 1] = n[1]) : (f.push(o % 1e14), s += 2);
            s = i / 2;
          } else {
            if (!crypto.randomBytes) throw b = !1, Error(I + "crypto unavailable");
            for (r = crypto.randomBytes(i *= 7); s < i; ) 9e15 <= (o = 281474976710656 * (31 & r[s]) + 1099511627776 * r[s + 1] + 4294967296 * r[s + 2] + 16777216 * r[s + 3] + (r[s + 4] << 16) + (r[s + 5] << 8) + r[s + 6]) ? crypto.randomBytes(7).copy(r, s) : (f.push(o % 1e14), 
            s += 7);
            s = i / 7;
          }
          if (!b) for (;s < i; ) (o = l()) < 9e15 && (f[s++] = o % 1e14);
          for (i = f[--s], e %= M, i && e && (o = k[M - e], f[s] = U(i / o) * o); 0 === f[s]; f.pop(), 
          s--) ;
          if (s < 0) f = [ t = 0 ]; else {
            for (t = -1; 0 === f[0]; f.splice(0, 1), t -= M) ;
            for (s = 1, o = f[0]; 10 <= o; o /= 10, s++) ;
            s < M && (t -= M - s);
          }
          return u.e = t, u.c = f, u;
        }), B.sum = function() {
          for (var e = 1, r = arguments, n = new B(r[0]); e < r.length; ) n = n.plus(r[e++]);
          return n;
        }, a = function() {
          var d = "0123456789";
          function m(e, r, n, t) {
            for (var i, o, s = [ 0 ], f = 0, u = e.length; f < u; ) {
              for (o = s.length; o--; s[o] *= r) ;
              for (s[0] += t.indexOf(e.charAt(f++)), i = 0; i < s.length; i++) s[i] > n - 1 && (null == s[i + 1] && (s[i + 1] = 0), 
              s[i + 1] += s[i] / n | 0, s[i] %= n);
            }
            return s.reverse();
          }
          return function(e, r, n, t, i) {
            var o, s, f, u, l, c, a, h, g = e.indexOf("."), p = N, w = O;
            for (0 <= g && (u = E, E = 0, e = e.replace(".", ""), c = (h = new B(r)).pow(e.length - g), 
            E = u, h.c = m(X($(c.c), c.e, "0"), 10, n, d), h.e = h.c.length), f = u = (a = m(e, r, n, i ? (o = S, 
            d) : (o = d, S))).length; 0 == a[--u]; a.pop()) ;
            if (!a[0]) return o.charAt(0);
            if (g < 0 ? --f : (c.c = a, c.e = f, c.s = t, a = (c = v(c, h, p, w, n)).c, l = c.r, 
            f = c.e), g = a[s = f + p + 1], u = n / 2, l = l || s < 0 || null != a[s + 1], l = w < 4 ? (null != g || l) && (0 == w || w == (c.s < 0 ? 3 : 2)) : u < g || g == u && (4 == w || l || 6 == w && 1 & a[s - 1] || w == (c.s < 0 ? 8 : 7)), 
            s < 1 || !a[0]) e = l ? X(o.charAt(1), -p, o.charAt(0)) : o.charAt(0); else {
              if (a.length = s, l) for (--n; ++a[--s] > n; ) a[s] = 0, s || (++f, a = [ 1 ].concat(a));
              for (u = a.length; !a[--u]; ) ;
              for (g = 0, e = ""; g <= u; e += o.charAt(a[g++])) ;
              e = X(e, f, o.charAt(0));
            }
            return e;
          };
        }(), v = function() {
          function S(e, r, n) {
            var t, i, o, s, f = 0, u = e.length, l = r % F, c = r / F | 0;
            for (e = e.slice(); u--; ) f = ((i = l * (o = e[u] % F) + (t = c * o + (s = e[u] / F | 0) * l) % F * F + f) / n | 0) + (t / F | 0) + c * s, 
            e[u] = i % n;
            return f && (e = [ f ].concat(e)), e;
          }
          function R(e, r, n, t) {
            var i, o;
            if (n != t) o = t < n ? 1 : -1; else for (i = o = 0; i < n; i++) if (e[i] != r[i]) {
              o = e[i] > r[i] ? 1 : -1;
              break;
            }
            return o;
          }
          function _(e, r, n, t) {
            for (var i = 0; n--; ) e[n] -= i, i = e[n] < r[n] ? 1 : 0, e[n] = i * t + e[n] - r[n];
            for (;!e[0] && 1 < e.length; e.splice(0, 1)) ;
          }
          return function(e, r, n, t, i) {
            var o, s, f, u, l, c, a, h, g, p, w, d, m, v, N, O, y, b = e.s == r.s ? 1 : -1, E = e.c, A = r.c;
            if (!(E && E[0] && A && A[0])) return new B(e.s && r.s && (E ? !A || E[0] != A[0] : A) ? E && 0 == E[0] || !A ? 0 * b : b / 0 : NaN);
            for (g = (h = new B(b)).c = [], b = n + (s = e.e - r.e) + 1, i || (i = C, s = j(e.e / M) - j(r.e / M), 
            b = b / M | 0), f = 0; A[f] == (E[f] || 0); f++) ;
            if (A[f] > (E[f] || 0) && s--, b < 0) g.push(1), u = !0; else {
              for (v = E.length, O = A.length, b += 2, 1 < (l = U(i / (A[f = 0] + 1))) && (A = S(A, l, i), 
              E = S(E, l, i), O = A.length, v = E.length), m = O, w = (p = E.slice(0, O)).length; w < O; p[w++] = 0) ;
              y = A.slice(), y = [ 0 ].concat(y), N = A[0], A[1] >= i / 2 && N++;
              do {
                if (l = 0, (o = R(A, p, O, w)) < 0) {
                  if (d = p[0], O != w && (d = d * i + (p[1] || 0)), 1 < (l = U(d / N))) for (i <= l && (l = i - 1), 
                  a = (c = S(A, l, i)).length, w = p.length; 1 == R(c, p, a, w); ) l--, _(c, O < a ? y : A, a, i), 
                  a = c.length, o = 1; else 0 == l && (o = l = 1), a = (c = A.slice()).length;
                  if (a < w && (c = [ 0 ].concat(c)), _(p, c, w, i), w = p.length, -1 == o) for (;R(A, p, O, w) < 1; ) l++, 
                  _(p, O < w ? y : A, w, i), w = p.length;
                } else 0 === o && (l++, p = [ 0 ]);
                g[f++] = l, p[0] ? p[w++] = E[m] || 0 : (p = [ E[m] ], w = 1);
              } while ((m++ < v || null != p[0]) && b--);
              u = null != p[0], g[0] || g.splice(0, 1);
            }
            if (i == C) {
              for (f = 1, b = g[0]; 10 <= b; b /= 10, f++) ;
              D(h, n + (h.e = f + s * M - 1) + 1, t, u);
            } else h.e = s, h.r = +u;
            return h;
          };
        }(), s = /^(-?)0([xbo])(?=\w[\w.]*$)/i, f = /^([^.]+)\.$/, u = /^\.([^.]+)$/, c = /^-?(Infinity|NaN)$/, 
        g = /^\s*\+(?=[\w.])|^\s+|\s+$/g, h = function h(e, r, n, t) {
          var i, o = n ? r : r.replace(g, "");
          if (c.test(o)) e.s = isNaN(o) ? null : o < 0 ? -1 : 1; else {
            if (!n && (o = o.replace(s, function(e, r, n) {
              return i = "x" == (n = n.toLowerCase()) ? 16 : "b" == n ? 2 : 8, t && t != i ? e : r;
            }), t && (i = t, o = o.replace(f, "$1").replace(u, "0.$1")), r != o)) return new B(o, i);
            if (B.DEBUG) throw Error(I + "Not a" + (t ? " base " + t : "") + " number: " + r);
            e.s = null;
          }
          e.c = e.e = null;
        }, t.absoluteValue = t.abs = function() {
          var e = new B(this);
          return e.s < 0 && (e.s = 1), e;
        }, t.comparedTo = function(e, r) {
          return z(this, new B(e, r));
        }, t.decimalPlaces = t.dp = function(e, r) {
          var n, t, i;
          if (null != e) return H(e, 0, q), null == r ? r = O : H(r, 0, 8), D(new B(this), e + this.e + 1, r);
          if (!(n = this.c)) return null;
          if (t = ((i = n.length - 1) - j(this.e / M)) * M, i = n[i]) for (;i % 10 == 0; i /= 10, 
          t--) ;
          return t < 0 && (t = 0), t;
        }, t.dividedBy = t.div = function(e, r) {
          return v(this, new B(e, r), N, O);
        }, t.dividedToIntegerBy = t.idiv = function(e, r) {
          return v(this, new B(e, r), 0, 1);
        }, t.exponentiatedBy = t.pow = function(e, r) {
          var n, t, i, o, s, f, u, l, c = this;
          if ((e = new B(e)).c && !e.isInteger()) throw Error(I + "Exponent not an integer: " + P(e));
          if (null != r && (r = new B(r)), s = 14 < e.e, !c.c || !c.c[0] || 1 == c.c[0] && !c.e && 1 == c.c.length || !e.c || !e.c[0]) return l = new B(Math.pow(+P(c), s ? 2 - V(e) : +P(e))), 
          r ? l.mod(r) : l;
          if (f = e.s < 0, r) {
            if (r.c ? !r.c[0] : !r.s) return new B(NaN);
            (t = !f && c.isInteger() && r.isInteger()) && (c = c.mod(r));
          } else {
            if (9 < e.e && (0 < c.e || c.e < -1 || (0 == c.e ? 1 < c.c[0] || s && 24e7 <= c.c[1] : c.c[0] < 8e13 || s && c.c[0] <= 9999975e7))) return o = c.s < 0 && V(e) ? -0 : 0, 
            -1 < c.e && (o = 1 / o), new B(f ? 1 / o : o);
            E && (o = L(E / M + 2));
          }
          for (u = s ? (n = new B(.5), f && (e.s = 1), V(e)) : (i = Math.abs(+P(e))) % 2, 
          l = new B(w); ;) {
            if (u) {
              if (!(l = l.times(c)).c) break;
              o ? l.c.length > o && (l.c.length = o) : t && (l = l.mod(r));
            }
            if (i) {
              if (0 === (i = U(i / 2))) break;
              u = i % 2;
            } else if (D(e = e.times(n), e.e + 1, 1), 14 < e.e) u = V(e); else {
              if (0 == (i = +P(e))) break;
              u = i % 2;
            }
            c = c.times(c), o ? c.c && c.c.length > o && (c.c.length = o) : t && (c = c.mod(r));
          }
          return t ? l : (f && (l = w.div(l)), r ? l.mod(r) : o ? D(l, E, O, void 0) : l);
        }, t.integerValue = function(e) {
          var r = new B(this);
          return null == e ? e = O : H(e, 0, 8), D(r, r.e + 1, e);
        }, t.isEqualTo = t.eq = function(e, r) {
          return 0 === z(this, new B(e, r));
        }, t.isFinite = function() {
          return !!this.c;
        }, t.isGreaterThan = t.gt = function(e, r) {
          return 0 < z(this, new B(e, r));
        }, t.isGreaterThanOrEqualTo = t.gte = function(e, r) {
          return 1 === (r = z(this, new B(e, r))) || 0 === r;
        }, t.isInteger = function() {
          return !!this.c && j(this.e / M) > this.c.length - 2;
        }, t.isLessThan = t.lt = function(e, r) {
          return z(this, new B(e, r)) < 0;
        }, t.isLessThanOrEqualTo = t.lte = function(e, r) {
          return -1 === (r = z(this, new B(e, r))) || 0 === r;
        }, t.isNaN = function() {
          return !this.s;
        }, t.isNegative = function() {
          return this.s < 0;
        }, t.isPositive = function() {
          return 0 < this.s;
        }, t.isZero = function() {
          return !!this.c && 0 == this.c[0];
        }, t.minus = function(e, r) {
          var n, t, i, o, s = this, f = s.s;
          if (r = (e = new B(e, r)).s, !f || !r) return new B(NaN);
          if (f != r) return e.s = -r, s.plus(e);
          var u = s.e / M, l = e.e / M, c = s.c, a = e.c;
          if (!u || !l) {
            if (!c || !a) return c ? (e.s = -r, e) : new B(a ? s : NaN);
            if (!c[0] || !a[0]) return a[0] ? (e.s = -r, e) : new B(c[0] ? s : 3 == O ? -0 : 0);
          }
          if (u = j(u), l = j(l), c = c.slice(), f = u - l) {
            for ((i = (o = f < 0) ? (f = -f, c) : (l = u, a)).reverse(), r = f; r--; i.push(0)) ;
            i.reverse();
          } else for (t = (o = (f = c.length) < (r = a.length)) ? f : r, f = r = 0; r < t; r++) if (c[r] != a[r]) {
            o = c[r] < a[r];
            break;
          }
          if (o && (i = c, c = a, a = i, e.s = -e.s), 0 < (r = (t = a.length) - (n = c.length))) for (;r--; c[n++] = 0) ;
          for (r = C - 1; f < t; ) {
            if (c[--t] < a[t]) {
              for (n = t; n && !c[--n]; c[n] = r) ;
              --c[n], c[t] += C;
            }
            c[t] -= a[t];
          }
          for (;0 == c[0]; c.splice(0, 1), --l) ;
          return c[0] ? _(e, c, l) : (e.s = 3 == O ? -1 : 1, e.c = [ e.e = 0 ], e);
        }, t.modulo = t.mod = function(e, r) {
          var n, t, i = this;
          return e = new B(e, r), !i.c || !e.s || e.c && !e.c[0] ? new B(NaN) : !e.c || i.c && !i.c[0] ? new B(i) : (9 == o ? (t = e.s, 
          e.s = 1, n = v(i, e, 0, 3), e.s = t, n.s *= t) : n = v(i, e, 0, o), (e = i.minus(n.times(e))).c[0] || 1 != o || (e.s = i.s), 
          e);
        }, t.multipliedBy = t.times = function(e, r) {
          var n, t, i, o, s, f, u, l, c, a, h, g, p, w, d, m = this, v = m.c, N = (e = new B(e, r)).c;
          if (!(v && N && v[0] && N[0])) return !m.s || !e.s || v && !v[0] && !N || N && !N[0] && !v ? e.c = e.e = e.s = null : (e.s *= m.s, 
          v && N ? (e.c = [ 0 ], e.e = 0) : e.c = e.e = null), e;
          for (t = j(m.e / M) + j(e.e / M), e.s *= m.s, (u = v.length) < (a = N.length) && (p = v, 
          v = N, N = p, i = u, u = a, a = i), i = u + a, p = []; i--; p.push(0)) ;
          for (w = C, d = F, i = a; 0 <= --i; ) {
            for (n = 0, h = N[i] % d, g = N[i] / d | 0, o = i + (s = u); i < o; ) n = ((l = h * (l = v[--s] % d) + (f = g * l + (c = v[s] / d | 0) * h) % d * d + p[o] + n) / w | 0) + (f / d | 0) + g * c, 
            p[o--] = l % w;
            p[o] = n;
          }
          return n ? ++t : p.splice(0, 1), _(e, p, t);
        }, t.negated = function() {
          var e = new B(this);
          return e.s = -e.s || null, e;
        }, t.plus = function(e, r) {
          var n, t = this, i = t.s;
          if (r = (e = new B(e, r)).s, !i || !r) return new B(NaN);
          if (i != r) return e.s = -r, t.minus(e);
          var o = t.e / M, s = e.e / M, f = t.c, u = e.c;
          if (!o || !s) {
            if (!f || !u) return new B(i / 0);
            if (!f[0] || !u[0]) return u[0] ? e : new B(f[0] ? t : 0 * i);
          }
          if (o = j(o), s = j(s), f = f.slice(), i = o - s) {
            for ((n = 0 < i ? (s = o, u) : (i = -i, f)).reverse(); i--; n.push(0)) ;
            n.reverse();
          }
          for ((i = f.length) - (r = u.length) < 0 && (n = u, u = f, f = n, r = i), i = 0; r; ) i = (f[--r] = f[r] + u[r] + i) / C | 0, 
          f[r] = C === f[r] ? 0 : f[r] % C;
          return i && (f = [ i ].concat(f), ++s), _(e, f, s);
        }, t.precision = t.sd = function(e, r) {
          var n, t, i;
          if (null != e && e !== !!e) return H(e, 1, q), null == r ? r = O : H(r, 0, 8), D(new B(this), e, r);
          if (!(n = this.c)) return null;
          if (t = (i = n.length - 1) * M + 1, i = n[i]) {
            for (;i % 10 == 0; i /= 10, t--) ;
            for (i = n[0]; 10 <= i; i /= 10, t++) ;
          }
          return e && this.e + 1 > t && (t = this.e + 1), t;
        }, t.shiftedBy = function(e) {
          return H(e, -G, G), this.times("1e" + e);
        }, t.squareRoot = t.sqrt = function() {
          var e, r, n, t, i, o = this, s = o.c, f = o.s, u = o.e, l = N + 4, c = new B("0.5");
          if (1 !== f || !s || !s[0]) return new B(!f || f < 0 && (!s || s[0]) ? NaN : s ? o : 1 / 0);
          if ((n = 0 == (f = Math.sqrt(+P(o))) || f == 1 / 0 ? (((r = $(s)).length + u) % 2 == 0 && (r += "0"), 
          f = Math.sqrt(+r), u = j((u + 1) / 2) - (u < 0 || u % 2), new B(r = f == 1 / 0 ? "1e" + u : (r = f.toExponential()).slice(0, r.indexOf("e") + 1) + u)) : new B(f + "")).c[0]) for ((f = (u = n.e) + l) < 3 && (f = 0); ;) if (i = n, 
          n = c.times(i.plus(v(o, i, l, 1))), $(i.c).slice(0, f) === (r = $(n.c)).slice(0, f)) {
            if (n.e < u && --f, "9999" != (r = r.slice(f - 3, f + 1)) && (t || "4999" != r)) {
              +r && (+r.slice(1) || "5" != r.charAt(0)) || (D(n, n.e + N + 2, 1), e = !n.times(n).eq(o));
              break;
            }
            if (!t && (D(i, i.e + N + 2, 0), i.times(i).eq(o))) {
              n = i;
              break;
            }
            l += 4, f += 4, t = 1;
          }
          return D(n, n.e + N + 1, O, e);
        }, t.toExponential = function(e, r) {
          return null != e && (H(e, 0, q), e++), i(this, e, r, 1);
        }, t.toFixed = function(e, r) {
          return null != e && (H(e, 0, q), e = e + this.e + 1), i(this, e, r);
        }, t.toFormat = function(e, r, n) {
          var t;
          if (null == n) null != e && r && "object" == typeof r ? (n = r, r = null) : e && "object" == typeof e ? (n = e, 
          e = r = null) : n = A; else if ("object" != typeof n) throw Error(I + "Argument not an object: " + n);
          if (t = this.toFixed(e, r), this.c) {
            var i, o = t.split("."), s = +n.groupSize, f = +n.secondaryGroupSize, u = n.groupSeparator || "", l = o[0], c = o[1], a = this.s < 0, h = a ? l.slice(1) : l, g = h.length;
            if (f && (i = s, s = f, g -= f = i), 0 < s && 0 < g) {
              for (i = g % s || s, l = h.substr(0, i); i < g; i += s) l += u + h.substr(i, s);
              0 < f && (l += u + h.slice(i)), a && (l = "-" + l);
            }
            t = c ? l + (n.decimalSeparator || "") + ((f = +n.fractionGroupSize) ? c.replace(new RegExp("\\d{" + f + "}\\B", "g"), "$&" + (n.fractionGroupSeparator || "")) : c) : l;
          }
          return (n.prefix || "") + t + (n.suffix || "");
        }, t.toFraction = function(e) {
          var r, n, t, i, o, s, f, u, l, c, a, h, g = this, p = g.c;
          if (null != e && (!(f = new B(e)).isInteger() && (f.c || 1 !== f.s) || f.lt(w))) throw Error(I + "Argument " + (f.isInteger() ? "out of range: " : "not an integer: ") + P(f));
          if (!p) return new B(g);
          for (r = new B(w), l = n = new B(w), t = u = new B(w), h = $(p), o = r.e = h.length - g.e - 1, 
          r.c[0] = k[(s = o % M) < 0 ? M + s : s], e = !e || 0 < f.comparedTo(r) ? 0 < o ? r : l : f, 
          s = y, y = 1 / 0, f = new B(h), u.c[0] = 0; c = v(f, r, 0, 1), 1 != (i = n.plus(c.times(t))).comparedTo(e); ) n = t, 
          t = i, l = u.plus(c.times(i = l)), u = i, r = f.minus(c.times(i = r)), f = i;
          return i = v(e.minus(n), t, 0, 1), u = u.plus(i.times(l)), n = n.plus(i.times(t)), 
          u.s = l.s = g.s, a = v(l, t, o *= 2, O).minus(g).abs().comparedTo(v(u, n, o, O).minus(g).abs()) < 1 ? [ l, t ] : [ u, n ], 
          y = s, a;
        }, t.toNumber = function() {
          return +P(this);
        }, t.toPrecision = function(e, r) {
          return null != e && H(e, 1, q), i(this, e, r, 2);
        }, t.toString = function(e) {
          var r, n = this, t = n.s, i = n.e;
          return null === i ? t ? (r = "Infinity", t < 0 && (r = "-" + r)) : r = "NaN" : (r = null == e ? i <= p || d <= i ? W($(n.c), i) : X($(n.c), i, "0") : 10 === e ? X($((n = D(new B(n), N + i + 1, O)).c), n.e, "0") : (H(e, 2, S.length, "Base"), 
          a(X($(n.c), i, "0"), 10, e, t, !0)), t < 0 && n.c[0] && (r = "-" + r)), r;
        }, t.valueOf = t.toJSON = function() {
          return P(this);
        }, t._isBigNumber = !0, null != r && B.set(r), B;
      }())["default"] = r.BigNumber = r, "function" == typeof define && define.amd ? define(function() {
        return r;
      }) : "undefined" != typeof module && module.exports ? module.exports = r : (e || (e = "undefined" != typeof self && self ? self : window), 
      e.BigNumber = r);
    }(void 0);
    cc._RF.pop();
  }, {} ],
  LocalizedLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "678b5pE315FEqlrOwSB/2jc", "LocalizedLabel");
    "use strict";
    var i18n = require("i18n");
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function later() {
          timeout = null;
          immediate || func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        callNow && func.apply(context, args);
      };
    }
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        menu: "i18n/LocalizedLabel"
      },
      properties: {
        dataID: {
          get: function get() {
            return this._dataID;
          },
          set: function set(val) {
            if (this._dataID !== val) {
              this._dataID = val;
              false;
              this.updateLabel();
            }
          }
        },
        _dataID: ""
      },
      onLoad: function onLoad() {
        false;
        i18n.isInit || i18n.init();
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var label = this.getComponent(cc.Label);
        if (label) {
          this.label = label;
          this.updateLabel();
          return;
        }
      },
      updateLabel: function updateLabel() {
        if (!this.label) return;
        var localizedString = i18n.t(this.dataID);
        localizedString && (this.label.string = i18n.t(this.dataID));
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  LocalizedSprite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80fe08bAa9CBqJCHB/Yo3qI", "LocalizedSprite");
    "use strict";
    var i18n = require("i18n");
    var SpriteFrameSet = cc.Class({
      name: "SpriteFrameSet",
      properties: {
        language: "",
        spriteFrame: cc.SpriteFrame
      }
    });
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        menu: "i18n/LocalizedSprite"
      },
      properties: {
        spriteList: [ SpriteFrameSet ]
      },
      onLoad: function onLoad() {
        i18n.isInit || i18n.init();
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var sprite = this.getComponent(cc.Sprite);
        if (sprite) {
          this.sprite = sprite;
          this.updateSprite(i18n.language);
          return;
        }
      },
      getSpriteFrameByLang: function getSpriteFrameByLang(lang) {
        for (var i = 0; i < this.spriteList.length; ++i) if (this.spriteList[i].language === lang) return this.spriteList[i].spriteFrame;
      },
      updateSprite: function updateSprite(language) {
        if (!this.sprite) {
          cc.error("Failed to update localized sprite, sprite component is invalid!");
          return;
        }
        var spriteFrame = this.getSpriteFrameByLang(language);
        !spriteFrame && this.spriteList[0] && (spriteFrame = this.spriteList[0].spriteFrame);
        this.sprite.spriteFrame = spriteFrame;
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  achiveModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "60adeYhe1JJNYOSY6+Hj9is", "achiveModel");
    "use strict";
    module.exports = {
      eventType: {
        INC_COUNT: "achiveModel.incCount#type#AssetOrKey",
        INC_LEVEL: "achiveModel.incLevel#type#AssetOrKey"
      },
      defData: {
        gainProp: {
          gold: 5e3,
          equipNum: 10
        },
        useRole: 2,
        useSkill: 5,
        usePassiveSkill: 5
      },
      init: function init() {
        var _this = this;
        console.log("Enter achive model ... ");
        for (var key in M("data").achive) key in this.defData || delete M("data").achive[key];
        var _loop = function _loop(_key) {
          _key in M("data").achive || (M("data").achive[_key] = {});
          if ("useRole" == _key || "useSkill" == _key || "usePassiveSkill" == _key) {
            var datas;
            var dataKey;
            if ("useRole" == _key) {
              dataKey = "asset";
              datas = M("role").getPlayerBaseDatas();
            }
            if ("useSkill" == _key) {
              dataKey = "name";
              datas = M("skill").getBaseDatas();
            }
            if ("usePassiveSkill" == _key) {
              dataKey = "name";
              datas = M("skill").getPassiveBaseDatas();
            }
            console.log("Enter achive model ... 2", _key);
            datas.forEach(function(a) {
              M("data").achive[_key] || (M("data").achive[_key] = {});
              a[dataKey] in M("data").achive[_key] || (M("data").achive[_key][a[dataKey]] = {
                total: 0,
                count: 0,
                level: 0
              });
            });
            console.log("Enter achive model ... 3", dataKey, _key, M("data").achive);
          } else for (var k in _this.defData[_key]) k in M("data").achive[_key] || (M("data").achive[_key][k] = {
            total: 0,
            count: 0,
            level: 0
          });
        };
        for (var _key in this.defData) _loop(_key);
      },
      incCount: function incCount(type, assetOrKey, val) {
        void 0 === val && (val = 1);
        M("data").achive[type][assetOrKey].count += val;
        M("data").achive[type][assetOrKey].total += val;
        E.emit(this.eventType.INC_COUNT, type, assetOrKey);
      },
      incLevel: function incLevel(type, assetOrKey) {
        var nextCount = this.getNextCount(type, assetOrKey);
        var count = M("data").achive[type][assetOrKey].count;
        M("data").achive[type][assetOrKey].count = count > nextCount ? count - nextCount : 0;
        M("data").achive[type][assetOrKey].level += 1;
        E.emit(this.eventType.INC_LEVEL, type, assetOrKey);
      },
      getDefDataVal: function getDefDataVal(type, assetOrKey) {
        var defData;
        defData = "useRole" == type || "useSkill" == type || "usePassiveSkill" == type ? this.defData[type] : this.defData[type][assetOrKey];
        return defData;
      },
      getNextCount: function getNextCount(type, assetOrKey) {
        var defDataVal = this.getDefDataVal(type, assetOrKey);
        var level = this.getLevel(type, assetOrKey);
        return H.num((level + 1) * defDataVal);
      },
      getCount: function getCount(type, assetOrKey) {
        return H.num(M("data").achive[type][assetOrKey].count);
      },
      getLevel: function getLevel(type, assetOrKey) {
        return H.num(M("data").achive[type][assetOrKey].level);
      },
      getReward: function getReward(type, assetOrKey) {
        console.log("Enter achive model ... getReward ... 0", M("data").achive[type][assetOrKey].level);
        var level = this.getLevel(type, assetOrKey);
        console.log("Enter achive model ... getReward ... 1", type, assetOrKey, level);
        level < 1 && (level = 1);
        var res = {};
        res.prop = {};
        res.prop.gold = 2e3 * level;
        console.log("Enter achive model ... getReward ... 2", res);
        return res;
      },
      getTotal: function getTotal(type, assetOrKey) {
        return H.num(M("data").achive[type][assetOrKey].total);
      },
      getTopTip: function getTopTip(type, assetOrKey) {
        var tip;
        tip = "useRole" == type || "useSkill" == type ? "achiveInfo." + type : "achiveInfo." + type + "." + assetOrKey;
        var level = H.numAbbr(this.getLevel(type, assetOrKey) + 1);
        var res = "[Lv" + level + L(tip) + "] " + L("done");
        return res;
      },
      isDone: function isDone(type, assetOrKey) {
        var count = this.getCount(type, assetOrKey);
        var nextCount = this.getNextCount(type, assetOrKey);
        return count >= nextCount;
      },
      isTip: function isTip() {
        var res = false;
        for (var type in M("data").achive) for (var assetOrKey in M("data").achive[type]) this.isDone(type, assetOrKey) && (res = true);
        return res;
      }
    };
    cc._RF.pop();
  }, {} ],
  adBoxInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a42dcrxF3hIIbuRCDckWeKM", "adBoxInfo");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {},
      show: function show() {
        var _this = this;
        this.adBtn = this.find("adBtn", cc.Button);
        this.stop = false;
        this.initItems();
        this.upd();
        this.adBtn.node.on("touchend", function(e) {
          if (!_this.adBtn.interactable) {
            V("tip").error(L("error_cd"));
            return;
          }
          _this.adBtn.interactable = false;
          _this.stop = true;
          V("tip").showLoading();
          var end = function end() {
            _this.stop = false;
            V("tip").close();
          };
          var setReward = function setReward() {
            end();
            var reward = M("game").getBoxReward(true);
            M("game").setReward(reward);
            M("data").timeCount.adBox = 0;
            V("gainTip").show(reward);
            _this.remove();
          };
          G("ad").showRewardedVideo(function() {
            setReward();
          }, function(err) {
            err && V("tip").error(err);
            end();
          });
        });
        return H.show(this);
      },
      initItems: function initItems() {
        var _this2 = this;
        this.items && this.items.forEach(function(a) {
          G("pool").put(a.node, true);
        });
        this.items = [];
        var createItem = function createItem() {
          var node = G("pool").get(app.getPrefab("rewardItem"), "adBoxInforewardItem");
          node.parent = _this2.find("rewardParent");
          return $(node, "rewardItem");
        };
        var reward = M("game").getBoxReward();
        for (var key in reward.prop) {
          var item = createItem();
          item.updProp(key, reward.prop[key]);
          this.items.push(item);
        }
        reward.chips.forEach(function(chip) {
          var item = createItem();
          item.updChip(chip);
          _this2.items.push(item);
        });
      },
      upd: function upd() {
        if (this.stop) return;
        var reward = M("game").getBoxReward();
        var time = M("data").timeCount.adBox;
        var cd = reward.cd;
        this.adBtn.interactable = time > cd;
      },
      onEnable: function onEnable() {
        this._super();
        E.on(app.root.eventType.LOOP, this.upd, this);
      },
      onDisable: function onDisable() {
        this._super();
        E.off(app.root.eventType.LOOP, this.upd, this);
      }
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  adBox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bbd02B8FpZKY4Am59+XELMn", "adBox");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {
        cdLabel: cc.Label
      },
      onLoad: function onLoad() {
        this.animExt = this.find("anim", "animExt");
        this.progressBar = this.find("anim/progressBar", cc.ProgressBar);
        this.upd();
        this.btn = $(this.node, cc.Button);
        this.btn && this.btn.node.on("touchend", function(e) {});
      },
      upd: function upd() {
        var reward = M("game").getBoxReward();
        var time = M("data").timeCount.adBox;
        var cd = reward.cd;
        if (time > cd) {
          this.cdLabel && (this.cdLabel.string = L("canGain"));
          this.progressBar.node.active = false;
          this.animExt.isPlaying("open") || this.animExt.play("open");
        } else {
          var second = cd - time;
          this.cdLabel && (this.cdLabel.string = H.secondFormat(second, "{mm}:{ss}"));
          this.progressBar.node.active = true;
          this.progressBar.progress = 1 - time / cd;
          this.animExt.isPlaying("close") || this.animExt.play("close");
        }
      },
      onEnable: function onEnable() {
        E.on(app.root.eventType.LOOP, this.upd, this);
        E.on(M("game").eventType.SET_REWARD, this.upd, this);
      },
      onDisable: function onDisable() {
        E.off(app.root.eventType.LOOP, this.upd, this);
        E.off(M("game").eventType.SET_REWARD, this.upd, this);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  adMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dba96mZcKhGX5s7wWRYSHWn", "adMgr");
    "use strict";
    module.exports = {
      init: function init() {
        var _this = this;
        this.RewardedVideo = null;
        this.Interstitial = null;
        try {
          R("tradplus").onInit = function() {
            if (H.isIos()) {
              R("tradplus").RewardedVideo.init("");
              R("tradplus").Interstitial.init("");
            } else {
              R("tradplus").RewardedVideo.init("");
              R("tradplus").Interstitial.init("");
            }
            _this.RewardedVideo = R("tradplus").RewardedVideo;
            _this.Interstitial = R("tradplus").Interstitial;
            _this.Interstitial.loadAd();
          };
          H.isIos(), R("tradplus").init("");
        } catch (e) {
          H.log("TradPlus Error", e);
        }
      },
      showRewardedVideo: function showRewardedVideo(callFunc, errFunc) {
        var _this2 = this;
        if (this._showRewardedVideo) return;
        this._showRewardedVideo = true;
        G("audio").setVolume(0);
        var end = function end() {
          _this2._showRewardedVideo = false;
          G("audio").setVolume(1);
        };
        if (!H.isNative()) {
          M("achive").incCount("lookAd", "video");
          end();
          callFunc();
          return;
        }
        if (!this.RewardedVideo) {
          end();
          errFunc(L("error_ad_ready"));
          return;
        }
        var isReward = false;
        this.RewardedVideo.onAdReward = function() {
          H.log("RewardedVideo.onAdReward");
          isReward = true;
          M("achive").incCount("lookAd", "video");
        };
        this.RewardedVideo.onAdClosed = function() {
          H.log("RewardedVideo.onAdClosed");
          end();
          isReward ? callFunc() : errFunc();
        };
        this.RewardedVideo.onTimeout = function() {
          H.log("RewardedVideo.onTimeout");
          end();
          errFunc(L("error_timeout"));
        };
        this.RewardedVideo.onAdFailed = function() {
          H.log("RewardedVideo.onAdFailed");
          end();
          errFunc(L("error_ad"));
        };
        this.RewardedVideo.onAdVideoError = function() {
          H.log("RewardedVideo.onAdVideoError");
          end();
          errFunc(L("error_ad"));
        };
        this.RewardedVideo.showAd();
      }
    };
    cc._RF.pop();
  }, {} ],
  addEquip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f3c9b3Lk2VKbpyHLA3kBFxT", "addEquip");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {},
      onLoad: function onLoad() {
        this.touchClose = false;
        this.addBtnEvents();
      },
      show: function show(newEquipData) {
        this.data = newEquipData;
        this.upd(newEquipData);
        console.log("Enter AddEquip .. newEquipData", newEquipData);
        return H.show(this);
      },
      upd: function upd(newEquipData) {
        this.currentData = M("data").equips.filter(function(a) {
          return a.type == newEquipData.type && a.pos == newEquipData.pos;
        })[0];
        this.newEquip = this.find("newEquip", "equipDataInfo");
        this.newEquip.upd(newEquipData, this.currentData);
        this.currentEquip = this.find("currentEquip", "equipDataInfo");
        if (this.currentData) {
          this.currentEquip.node.active = true;
          this.currentEquip.upd(this.currentData, newEquipData);
          this.find("noEquipLabel").active = false;
        } else {
          this.currentEquip.node.active = false;
          this.find("noEquipLabel").active = true;
        }
      },
      equipBtnEvent: function equipBtnEvent() {
        var _this = this;
        G("audio").playEffect("equip");
        console.log("Before putOnEquip ... ", this.data);
        R("server").api("putOnEquip", this.data).then(function(res) {
          if (0 == res.errcode) {
            M("equip").add(_this.data);
            _this.data = _this.currentData;
            _this.data ? _this.upd(_this.data) : _this.remove();
          }
        });
      },
      sellBtnEvent: function sellBtnEvent() {
        var _this2 = this;
        G("audio").playEffect("coin");
        R("server").api("sellEquip", this.data).then(function(res) {
          if (0 == res.errcode) {
            var sellRes = M("equip").calSell(_this2.data);
            for (var key in sellRes) if ("gold" == key) {
              M("prop").setNum("gold", "+", sellRes[key]);
              V("tip").success("+" + H.numAbbr(sellRes[key]), app.find.goldSpriteFrame);
            }
            _this2.remove();
          }
        });
      }
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  agreement: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e9e1s5Es9DlIpnmOHrQBhW", "agreement");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {},
      onLoad: function onLoad() {
        this.addBtnEvents();
      },
      show: function show(type, callFunc) {
        void 0 === type && (type = "user");
        this.touchClose = !callFunc;
        this.callFunc = callFunc;
        this.userBtn = $(this.find("userBtn"), cc.Button);
        this.privacyBtn = $(this.find("privacyBtn"), cc.Button);
        this.select(type);
        this.find("btnParent").active = callFunc;
        return H.show(this);
      },
      callFunc: function callFunc(bool) {},
      select: function select(type) {
        if ("user" === type) {
          this.userBtn.interactable = false;
          this.privacyBtn.interactable = true;
          this.find("user").active = true;
          this.find("privacy").active = false;
        } else {
          this.userBtn.interactable = true;
          this.privacyBtn.interactable = false;
          this.find("user").active = false;
          this.find("privacy").active = true;
        }
      },
      userBtnEvent: function userBtnEvent() {
        this.select("user");
      },
      privacyBtnEvent: function privacyBtnEvent() {
        this.select("privacy");
      },
      yesBtnEvent: function yesBtnEvent() {
        this.callFunc(true);
      },
      noBtnEvent: function noBtnEvent() {
        this.callFunc(false);
      }
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  animExt: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e13e1H3JvdPR6OPIxUR4YZ1", "animExt");
    "use strict";
    cc.Class({
      editor: {
        menu: "base/animExt"
      },
      extends: cc.Component,
      properties: {
        anim: cc.Animation
      },
      ctor: function ctor() {
        this.speedMul = 1;
      },
      play: function play(name) {
        var _this = this;
        var callFunc = "function" == typeof (arguments.length <= 1 ? void 0 : arguments[1]) ? arguments.length <= 1 ? void 0 : arguments[1] : null;
        var repeatCount = callFunc ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 1 ? void 0 : arguments[1];
        this.animState = this.anim.play(name);
        repeatCount && (this.animState.repeatCount = repeatCount);
        this.animState.speed = this.speedMul;
        this.animState.once(cc.Animation.EventType.FINISHED, function() {
          _this.onEnd(name);
          callFunc && callFunc("callFunc");
        });
        var step = 1;
        this.anim[name] = function(e) {
          _this.onEvent(name, e, step);
          step++;
        };
      },
      onEnd: function onEnd(name) {},
      onEvent: function onEvent(name, e, step) {},
      isPlaying: function isPlaying(animName) {
        var animState = this.getState(animName);
        if (!animState) return false;
        return animState.isPlaying;
      },
      getCurrentName: function getCurrentName() {
        return this.anim.currentClip && this.anim.currentClip.name;
      },
      getState: function getState(animName) {
        return this.anim.getAnimationState(animName);
      },
      reset: function reset() {
        if (!this.animState) return;
        var curves = this.animState.curves;
        var info = this.animState.getWrappedInfo(0);
        for (var i = 0; i < curves.length; i++) {
          var curve = curves[i];
          curve.sample(info.time, info.ratio);
        }
      },
      getAnimNames: function getAnimNames() {
        var res = [];
        this.anim.getClips().forEach(function(clip) {
          res.push(clip.name);
        });
        return res;
      },
      setSpeedMul: function setSpeedMul(speedMul) {
        var _this2 = this;
        this.speedMul = speedMul;
        this.anim.getClips().forEach(function(clip) {
          var animState = _this2.getState(clip.name);
          animState.speed = speedMul;
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  animMask: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d85a6MzAllO4JpfcPMGYMjZ", "animMask");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {},
      onLoad: function onLoad() {
        this.touchClose = false;
      },
      show: function show(type, callFunc) {
        var _this = this;
        this.bgNode = this.find("anim/bg");
        this.bgNode.width = app.screen.width;
        this.bgNode.height = app.screen.height;
        this.animNode = this.find("anim");
        var width = app.screen.width + .5 * app.screen.width;
        var height = app.screen.height + .5 * app.screen.height;
        var toWidth;
        var toHeight;
        if ("open" == type) {
          this.animNode.width = 0;
          this.animNode.height = 0;
          toWidth = width;
          toHeight = height;
        } else {
          this.animNode.width = width;
          this.animNode.height = height;
          toWidth = 0;
          toHeight = 0;
        }
        cc.tween(this.animNode).to(.5, {
          width: toWidth,
          height: toHeight
        }).call(function() {
          callFunc && callFunc(_this);
        }).start();
        return H.show(this);
      }
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  apple: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c478bMbPcJDtoXN1H9UDkLb", "apple");
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
    var _native = require("native");
    var apple = {};
    apple.requestReview = function() {
      if (!_native.isIos) return;
      _native.call("SKStoreReviewController", "requestReview");
    };
    apple.requestTrackingAuthorization = function() {
      if (!_native.isIos) return;
      _native.call("AppController", "requestTrackingAuthorization");
    };
    sdkEvent.apple = {};
    sdkEvent.apple.login = {};
    apple.login = {};
    apple.login.sign = function() {
      if (!_native.isIos) return;
      _native.call("SignInWithApple", "sign");
    };
    apple.login.onSign = function() {};
    sdkEvent.apple.login.onSign = function() {
      var _apple$login;
      (_apple$login = apple.login).onSign.apply(_apple$login, arguments);
    };
    apple.login.onError = function() {};
    sdkEvent.apple.login.onError = function() {
      var _apple$login2;
      (_apple$login2 = apple.login).onError.apply(_apple$login2, arguments);
    };
    apple.login.onClose = function() {};
    sdkEvent.apple.login.onClose = function() {
      var _apple$login3;
      (_apple$login3 = apple.login).onClose.apply(_apple$login3, arguments);
    };
    sdkEvent.apple.IAP = {};
    apple.IAP = {};
    apple.IAP.init = function() {
      if (!_native.isIos) return;
      console.log("apple.IAP.init");
      _native.call("IAP", "init");
    };
    apple.IAP.requestProducts = function() {
      if (!_native.isIos) return;
      _native.call("IAP", "requestProducts");
    };
    apple.IAP.pay = function(productId) {
      if (!_native.isIos) return;
      _native.call("IAP", "pay", productId);
    };
    apple.IAP.rePay = function() {
      if (!_native.isIos) return;
      _native.call("IAP", "rePay");
    };
    var events = [ "onRequestProducts", "onVerify", "onSuccess", "onRePay", "onFailed" ];
    events.forEach(function(event) {
      apple.IAP[event] = function() {};
      sdkEvent.apple.IAP[event] = function() {
        var _apple$IAP;
        (_apple$IAP = apple.IAP)[event].apply(_apple$IAP, arguments);
      };
    });
    sdkEvent.apple.gameCenter = {};
    apple.gameCenter = {};
    apple.gameCenter.eventType = {
      SIGN: "apple.gameCenter.onSign",
      ERROR: "apple.gameCenter.onError"
    };
    apple.gameCenter.init = function() {
      if (!_native.isIos) return;
      _native.call("GameCenter", "init");
    };
    sdkEvent.apple.gameCenter.onSign = function() {
      var _E;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
      (_E = E).emit.apply(_E, [ apple.gameCenter.eventType.SIGN ].concat(args));
    };
    sdkEvent.apple.gameCenter.onError = function() {
      var _E2;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
      (_E2 = E).emit.apply(_E2, [ apple.gameCenter.eventType.ERROR ].concat(args));
    };
    apple.gameCenter.isAuthenticated = function() {
      if (!_native.isIos) return;
      return _native.call("GameCenter", "isAuthenticated");
    };
    apple.gameCenter.showList = function(param) {
      param = _extends({}, {
        listId: "level",
        type: "all"
      }, param);
      if (!_native.isIos) return;
      _native.call("GameCenter", "showList", JSON.stringify(param));
    };
    apple.gameCenter.send = function(param) {
      param = _extends({}, {
        listId: "level",
        value: 0
      }, param);
      if (!_native.isIos) return;
      _native.call("GameCenter", "send", JSON.stringify(param));
    };
    module.exports = apple;
    cc._RF.pop();
  }, {
    native: "native"
  } ],
  app: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "db343R/g6lFcqLQ4uDLMJQX", "app");
    "use strict";
    cc.Class({
      extends: require("initApp"),
      properties: {
        loadingPrefab: cc.Prefab
      },
      onLoad: function onLoad() {
        var _this = this;
        i18n.init("en");
        this.loading = $(H.inst(this.loadingPrefab, this.popupParentNode), "loading");
        this.loading.show();
        this.loading.tip(L("loading"));
        this.init({
          appName: "SURVIVORS",
          bundleName: "app",
          onSuccess: function onSuccess() {
            _this.loading.close();
            _this.onInit();
          },
          onError: function onError(err) {
            log(err);
            _this.loading.error(L("load_failed"));
            _this.loading.node.once("touchend", function(e) {
              _this.loading.close();
              cc.director.loadScene("loader");
            });
          },
          onProgress: function onProgress(completed, total) {
            _this.loading.updProgress(completed, total);
          }
        });
      },
      onInit: function onInit() {
        app.loading = this.loading;
        app.error = this.error.bind(this);
        app.find = this.find("find", "find", this.node);
        app.root = this.find("root", "root");
        app.root.run();
      },
      error: function error(string) {
        if (this._error) return;
        this._error = true;
        var tip = V("tip").config({
          showFull: true,
          color: "#FF0000"
        }).text(string);
        tip.node.once("touchend", function(e) {
          E.stop(e);
          H.exitGame();
        });
        setTimeout(function() {
          cc.game.pause();
        }, 1e3);
      }
    });
    cc._RF.pop();
  }, {
    initApp: "initApp"
  } ],
  audioMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c98dbWVOBRH+4hE1YFFbU2+", "audioMgr");
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
    module.exports = {
      init: function init(param) {
        this.setting = _extends({}, {
          music: true,
          effect: true
        }, param);
      },
      setMusicVolume: function setMusicVolume(val) {
        cc.audioEngine.setMusicVolume(val);
      },
      setEffectsVolume: function setEffectsVolume(val) {
        cc.audioEngine.setEffectsVolume(val);
      },
      setVolume: function setVolume(val) {
        this.setMusicVolume(val);
        this.setEffectsVolume(val);
      },
      playMusic: function playMusic(asset, loop) {
        void 0 === loop && (loop = true);
        if (!asset) return;
        this.musicAsset = asset;
        if (!this.setting) return;
        if (!this.setting.music) return;
        cc.audioEngine.playMusic(this.getClip(asset), loop);
      },
      playPreMusic: function playPreMusic(loop) {
        void 0 === loop && (loop = true);
        if (!this.musicAsset) return;
        if (!this.setting) return;
        if (!this.setting.music) return;
        cc.audioEngine.playMusic(this.getClip(this.musicAsset), loop);
      },
      stopMusic: function stopMusic() {
        cc.audioEngine.stopMusic();
      },
      playEffect: function playEffect(asset, loop, timeout) {
        var _this = this;
        void 0 === loop && (loop = false);
        void 0 === timeout && (timeout = 0);
        if (!asset) return;
        if (!this.setting) return;
        if (!this.setting.effect) return;
        var audioId = cc.audioEngine.playEffect(this.getClip(asset), loop);
        timeout > 0 && setTimeout(function() {
          _this.stopEffect(audioId);
        }, 1e3 * timeout);
        return audioId;
      },
      playTipEffect: function playTipEffect(asset, loop) {
        var _this2 = this;
        void 0 === loop && (loop = false);
        if (!asset) return;
        if (!this.setting) return;
        if (!this.setting.effect) return;
        var musicVolume = cc.audioEngine.getMusicVolume();
        var effectVolume = cc.audioEngine.getEffectsVolume();
        this.setMusicVolume(0);
        this.setEffectsVolume(0);
        var audioId = cc.audioEngine.playEffect(this.getClip(asset), loop);
        cc.audioEngine.setVolume(audioId, 1);
        cc.audioEngine.setFinishCallback(audioId, function() {
          _this2.setMusicVolume(musicVolume);
          _this2.setEffectsVolume(effectVolume);
        });
      },
      stopEffect: function stopEffect(audioId) {
        cc.audioEngine.stopEffect(audioId);
      },
      stopAllEffects: function stopAllEffects() {
        cc.audioEngine.stopAllEffects();
      },
      getClip: function getClip(asset) {
        var clip = "string" == typeof asset ? app.getAudioClip(asset) : asset;
        return clip;
      }
    };
    cc._RF.pop();
  }, {} ],
  audio: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "81772qAY0ZNjq5vluiDfezU", "audio");
    "use strict";
    cc.Class({
      extends: cc.AudioSource,
      properties: {},
      onEnable: function onEnable() {
        this.updMute();
        this.play();
      },
      updMute: function updMute() {
        M("fight").stop || !M("data").setting.audio.effect ? this.mute = true : this.mute = false;
      },
      update: function update(dt) {
        this.updMute();
      }
    });
    cc._RF.pop();
  }, {} ],
  autoHideChild: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "635ee7DRVtAwqi/hvf1Q1j/", "autoHideChild");
    "use strict";
    var StartAxis = cc.Enum({
      HORIZONTAL: 1,
      VERTICAL: 2
    });
    cc.Class({
      editor: {
        menu: "base/autoHideChild"
      },
      extends: require("ccBase"),
      properties: {
        startAxis: {
          type: StartAxis,
          default: 2
        },
        parentNode: cc.Node
      },
      onLoad: function onLoad() {
        this.node.children.forEach(function(node) {
          node.opacity = 0;
        });
        this._frame = 0;
      },
      update: function update() {
        var _this = this;
        if (!this.parentNode) return;
        if (this.node.children.length < 1) return;
        this._frame++;
        if (this._frame <= 6) return;
        this._frame = 0;
        this.node.children.forEach(function(node, index) {
          var pos = H.toAR(node, _this.parentNode);
          var posKey = "y";
          var sizeKey = "height";
          if (_this.startAxis == StartAxis.HORIZONTAL) {
            posKey = "x";
            sizeKey = "width";
          }
          var diffVal = Math.abs(pos[posKey]);
          var hideVal = _this.parentNode[sizeKey] / 2 + node[sizeKey] / 2;
          if (diffVal > hideVal) node.opacity = 0; else {
            var halfHideVal = _this.parentNode[sizeKey] / 2;
            node.opacity = diffVal > halfHideVal ? 100 : 255;
          }
        });
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  autoLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a17dA9XD5OSZMaCtjCQ+Tq", "autoLayout");
    "use strict";
    cc.Class({
      editor: {
        executeInEditMode: true,
        menu: "base/autoLayout"
      },
      extends: require("ccBase"),
      properties: {
        _col: 0,
        col: {
          get: function get() {
            return this._col;
          },
          set: function set(val) {
            this._col = val;
            this.upd();
          }
        },
        _itemSize: cc.Size,
        itemSize: {
          get: function get() {
            return this._itemSize;
          },
          set: function set(size) {
            this._itemSize = size;
            this.upd();
          }
        },
        _spacingX: 0,
        spacingX: {
          get: function get() {
            return this._spacingX;
          },
          set: function set(val) {
            this._spacingX = val;
            this.upd();
          }
        },
        _spacingY: 0,
        spacingY: {
          get: function get() {
            return this._spacingY;
          },
          set: function set(val) {
            this._spacingY = val;
            this.upd();
          }
        }
      },
      onEnable: function onEnable() {
        this.upd();
      },
      upd: function upd() {
        var layout = H.add$(this.node, cc.Layout, true);
        layout.resizeMode = 1;
        layout.startAxis = 0;
        layout.spacingX = this.spacingX;
        layout.spacingY = this.spacingY;
        this.node.width = this.col * this.itemSize.width + (this.col - 1) * this.spacingX;
        var childs = this.node.children.filter(function(a) {
          return a.active;
        });
        if (childs.length > this.col) layout.type = 3; else {
          layout.node.height = this.itemSize.height;
          layout.type = 1;
        }
        layout.updateLayout();
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  bombItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "afebfhjRwRB36sxlnvPori5", "bombItem");
    "use strict";
    cc.Class({
      extends: require("skill"),
      properties: {},
      init: function init(target, speed, boomScale) {
        void 0 === speed && (speed = 500);
        void 0 === boomScale && (boomScale = 1);
        this.target = target;
        if (!this.target) {
          this.remove();
          return;
        }
        this.toWorldPos = this.target.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.boomScale = boomScale;
        this.speed = speed;
        this.byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.node.setWorldPosition(this.byWorldPos);
        this.dir = cc.v2(0, 0);
        this.isCollide = false;
        this.isTemp = false;
        this.isInit = true;
      },
      remove: function remove() {
        G("pool").put(this.node);
      },
      createBoom: function createBoom(role) {
        var node = G("pool").get(app.getPrefab("boom1"));
        node.parent = G("skill").parent2Node;
        node.scaleX = this.boomScale;
        node.scaleY = this.boomScale;
        role ? node.setWorldPosition(role.bodyNode.getWorldPosition(cc.Vec2.ZERO)) : node.setWorldPosition(this.node.getWorldPosition(cc.Vec2.ZERO));
        var skill = H.add$(node, "skill", true);
        skill.isTemp = this.isTemp;
        skill.initBase({
          role: this.role,
          hurtPercent: this.hurtPercent,
          skillName: this.skillName
        });
        var anim = this.find("anim", cc.Animation, node);
        var animState = anim.play();
        animState.once(cc.Animation.EventType.FINISHED, function() {
          G("pool").put(node);
        });
      },
      onEnter: function onEnter(other, self) {
        var role = G("role").getRole(other.node, true);
        if (!role) return;
        if (!this.role) return;
        if (role.group == this.role.group) return;
        this.createBoom(role);
        this.remove();
      },
      update: function update(dt) {
        if (!this.isInit) return;
        if (M("fight").stop) return;
        var dist = H.dist(this.byWorldPos, this.node.getWorldPosition(cc.Vec2.ZERO));
        if (dist > app.screen.width / 2) {
          this.createBoom();
          this.remove();
          return;
        }
        var speed = this.speed * dt;
        this.dir = this.toWorldPos.sub(this.byWorldPos).normalize();
        this.node.angle = 180 * Math.atan2(this.dir.y, this.dir.x) / Math.PI;
        this.node.x += this.dir.x * speed;
        this.node.y += this.dir.y * speed;
      }
    });
    cc._RF.pop();
  }, {
    skill: "skill"
  } ],
  bomb: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c5953xJFp1ChJeLtbBxDMYL", "bomb");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
      },
      initData: function initData(param) {
        param = _extends({}, {
          asset: "",
          scale: 1,
          boomScale: 1,
          num: 1,
          cd: 3,
          speed: 500,
          hurtPercent: 100
        }, param);
        this.hurtPercent = param.hurtPercent;
        this.prefab = app.getPrefab(param.asset);
        this.boomScale = param.boomScale;
        this.scale = param.scale;
        this.num = param.num;
        this.speed = param.speed;
        this.defCd = param.cd;
        this.cd = this.defCd;
      },
      createItems: function createItems() {
        var _this = this;
        if (!G("skill").checkRole(this.role)) return;
        var targets = G("role").getRandTargets(this.role, this.num);
        if (targets.length < 1) return;
        targets.forEach(function(target) {
          var node = G("pool").get(_this.prefab);
          node.scaleX = _this.scale;
          node.scaleY = _this.scale;
          node.parent = G("skill").parent2Node;
          var skill = $(node, "skill");
          skill.initBase({
            role: _this.role,
            hurtPercent: _this.hurtPercent,
            skillName: _this.skillName
          });
          skill.init(target, _this.speed, _this.boomScale);
        });
      },
      update: function update(dt) {
        if (!this.role) return;
        if (!this.prefab) return;
        if (M("fight").stop) return;
        this.cd -= dt;
        if (this.cd > 0) return;
        if ("enemy" == this.role.group && this.role.animExt.isPlaying("move")) return;
        this.createItems();
        this.cd = this.defCd;
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  boomerangItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8312fEHTCxNOpTIIafktefl", "boomerangItem");
    "use strict";
    cc.Class({
      extends: require("skill"),
      properties: {},
      init: function init(target, speed) {
        void 0 === speed && (speed = 600);
        this.isBullet = true;
        this.target = target;
        if (!this.target) {
          this.remove();
          return;
        }
        this.toWorldPos = this.target.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.speed = speed;
        var byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.node.setWorldPosition(byWorldPos);
        this.dir = cc.v2(0, 0);
        this.hereCd = .5;
        this.isBack = false;
        this.isHere = false;
        this.isInit = true;
      },
      remove: function remove() {
        G("pool").put(this.node);
      },
      onEnter: function onEnter(other, self) {
        var role = G("role").getRole(other, true);
        if (!role) return;
        if (!this.role) return;
        if (role.group == this.role.group) return;
        this.isHere = true;
      },
      update: function update(dt) {
        if (!this.isInit) return;
        if (M("fight").stop) return;
        var byWorldPos = this.node.getWorldPosition(cc.Vec2.ZERO);
        if (this.isHere) {
          this.hereCd -= dt;
          if (this.hereCd > 0) {
            var _speed = this.speed / 4 * dt;
            this.dir = this.toWorldPos.sub(byWorldPos).normalize();
            this.node.x += this.dir.x * _speed;
            this.node.y += this.dir.y * _speed;
          } else this.isBack = true;
          if (this.isBack) {
            var toWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
            var _dist = H.dist(byWorldPos, toWorldPos);
            if (_dist <= 10) {
              this.remove();
              return;
            }
            this.dir = toWorldPos.sub(byWorldPos).normalize();
            var _speed2 = 2 * this.role.move.speed * dt;
            this.node.x += this.dir.x * _speed2;
            this.node.y += this.dir.y * _speed2;
          }
          return;
        }
        var dist = H.dist(byWorldPos, this.toWorldPos);
        if (dist <= this.target.node.width) {
          this.isHere = true;
          this.dir = cc.v2(0, 0);
          return;
        }
        var speed = this.speed * dt;
        this.dir = this.toWorldPos.sub(byWorldPos).normalize();
        this.node.x += this.dir.x * speed;
        this.node.y += this.dir.y * speed;
      }
    });
    cc._RF.pop();
  }, {
    skill: "skill"
  } ],
  boomerang: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c04c3Rls2FMdadSItpcsXKV", "boomerang");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
      },
      initData: function initData(param) {
        param = _extends({}, {
          asset: "",
          scale: 1,
          num: 1,
          cd: 3,
          speed: 600,
          hurtPercent: 100
        }, param);
        this.hurtPercent = param.hurtPercent;
        this.prefab = app.getPrefab(param.asset);
        this.scale = param.scale;
        this.num = param.num;
        this.speed = param.speed;
        this.defCd = param.cd;
        this.cd = this.defCd;
      },
      createItems: function createItems() {
        var _this = this;
        if (!G("skill").checkRole(this.role)) return;
        var targets = G("role").getRandTargets(this.role, this.num);
        if (targets.length < 1) return;
        targets.forEach(function(target) {
          var node = G("pool").get(_this.prefab);
          node.scaleX = _this.scale;
          node.scaleY = _this.scale;
          node.parent = G("skill").parent2Node;
          var skill = $(node, "skill");
          skill.initBase({
            role: _this.role,
            hurtPercent: _this.hurtPercent,
            skillName: _this.skillName
          });
          skill.init(target, _this.speed);
        });
      },
      update: function update(dt) {
        if (!this.role) return;
        if (!this.prefab) return;
        if (M("fight").stop) return;
        this.cd -= dt;
        if (this.cd > 0) return;
        if ("enemy" == this.role.group && this.role.animExt.isPlaying("move")) return;
        this.createItems();
        this.cd = this.defCd;
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  bulletItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80b39SaUT5Emry6okihUJPh", "bulletItem");
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
    cc.Class({
      extends: require("skill"),
      properties: {},
      onEnter: function onEnter(other, self) {
        if (!this.role) return;
        var role = G("role").getRole(other.node, true);
        if (!role) return;
        if (role.group == this.role.group) return;
        if (false != this.pierce) {
          this.pierce -= 1;
          this.pierce <= 0 && this.remove();
        }
      },
      remove: function remove() {
        this.dir = null;
        G("pool").put(this.node);
        this.onRemove(this);
      },
      onRemove: function onRemove(skill) {},
      init: function init(param) {
        param = _extends({}, {
          index: 1,
          speed: 100,
          angle: 15,
          pierce: 1,
          isRandTarget: false
        }, param);
        if (!this.role) return;
        this.isBullet = true;
        this.isRandTarget = param.isRandTarget;
        this.byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.node.setWorldPosition(this.byWorldPos);
        this.speed = param.speed;
        this.pierce = param.pierce;
        var target = this.role.target;
        this.isRandTarget && this.role.getRandTarget && (target = this.role.getRandTarget());
        if (target) {
          var toWorldPos = target.bodyNode.getWorldPosition(cc.Vec2.ZERO);
          this.dir = toWorldPos.sub(this.byWorldPos).normalize();
        } else this.role.dir.equals(cc.Vec2.ZERO) ? this.dir = cc.v2(1, 0) : this.dir = this.role.dir.clone();
        if (param.index > 1) {
          var angle = 180 * Math.atan2(this.dir.y, this.dir.x) / Math.PI;
          param.index % 2 == 0 ? angle += param.angle * param.index : angle -= param.angle * (param.index - 1);
          var r = angle * Math.PI / 180;
          this.dir.x = Math.cos(r);
          this.dir.y = Math.sin(r);
        }
        G("effect").updDirAngle(this.node, this.dir);
      },
      update: function update(dt) {
        if (!this.role) return;
        if (!this.byWorldPos) return;
        if (M("fight").stop) return;
        var dist = H.dist(this.byWorldPos, this.node.getWorldPosition(cc.Vec2.ZERO));
        if (dist > app.screen.width) {
          this.remove();
          return;
        }
        if (!this.dir) return;
        var speed = this.speed * dt;
        this.node.x += this.dir.x * speed;
        this.node.y += this.dir.y * speed;
      }
    });
    cc._RF.pop();
  }, {
    skill: "skill"
  } ],
  bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42264CMT71O+I83qXrVPRZX", "bullet");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      initData: function initData(param) {
        param = _extends({}, {
          asset: "",
          color: "#FFFFFF",
          scale: 1,
          angle: 15,
          num: 1,
          speed: 200,
          cd: 3,
          pierce: 1,
          isRound: false,
          isRandTarget: false,
          hurtPercent: 100
        }, param);
        this.param = param;
        this.hurtPercent = param.hurtPercent;
        this.prefab = app.getPrefab(param.asset);
        this.color = param.color;
        this.scale = param.scale;
        this.angle = param.angle;
        this.num = param.num;
        this.speed = param.speed;
        this.defCd = param.cd;
        this.cd = this.defCd;
        this.pierce = param.pierce;
        this.isRandTarget = param.isRandTarget;
        param.isRound && (this.num = 360 / this.angle / 2);
      },
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
        this.items = [];
      },
      createItems: function createItems() {
        if (!G("skill").checkRole(this.role)) return;
        if (!this.role.dir && !this.role.target) return;
        for (var i = 1; i <= this.num; i++) {
          var node = G("pool").get(this.prefab);
          var skill = $(node, "skill");
          skill.initBase({
            role: this.role,
            hurtPercent: this.hurtPercent,
            skillName: this.skillName
          });
          node.scaleX = this.scale;
          node.scaleY = this.scale;
          var animNode = cc.find("anim", node);
          animNode ? animNode.color = cc.color(this.color) : node.color = cc.color(this.color);
          node.parent = G("skill").parent2Node;
          skill.init({
            index: i,
            speed: this.speed,
            angle: this.angle,
            pierce: this.pierce,
            isRandTarget: this.isRandTarget
          });
          skill.initData && skill.initData(this.param);
        }
      },
      update: function update(dt) {
        if (!this.role) return;
        if (!this.prefab) return;
        if (M("fight").stop) return;
        this.cd -= dt;
        if (this.cd > 0) return;
        if ("enemy" == this.role.group && this.role.animExt.isPlaying("move")) return;
        this.createItems();
        this.cd = this.defCd;
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  camera: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "104caJSIOJKda8DCkwWLxx9", "camera");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      onLoad: function onLoad() {
        this.camera = $(this.node, cc.Camera);
        this.reset();
      },
      getWorldPos: function getWorldPos(worldPos) {
        return this.camera.getScreenToWorldPoint(worldPos);
      },
      reset: function reset() {
        this.followNode = null;
        this.node.x = 0;
        this.node.y = 0;
        this.stop = false;
      },
      follow: function follow(node) {
        this.followNode = node;
        this.updPos();
        this.stop = false;
      },
      updPos: function updPos(dt) {
        if (!this.followNode) return;
        if (this.stop) return;
        var toPos = H.toAR(this.followNode, cc.find("Canvas"));
        this.node.position = toPos;
      },
      update: function update(dt) {
        this.updPos(dt);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  ccBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "39de9Fw/IZC0Lc5KlDpooWv", "ccBase");
    "use strict";
    cc.Class({
      editor: {
        menu: "base/ccBase"
      },
      extends: cc.Component,
      properties: {},
      addEvent: function addEvent(nodeName, eventName) {
        void 0 === eventName && (eventName = "touchend");
        var node = "string" === typeof nodeName ? this.find(nodeName) : nodeName;
        if (!node) {
          cc.log("cocosBase.addEvent node error:" + nodeName);
          return;
        }
        node.on(eventName, this.preEvent, this);
      },
      removeEvent: function removeEvent(nodeName, eventName) {
        void 0 === eventName && (eventName = "touchend");
        var node = "string" === typeof nodeName ? this.find(nodeName) : nodeName;
        node.off(eventName, this.preEvent, this);
      },
      preEvent: function preEvent(e) {
        e.stopPropagation && E.stop(e);
        var node = e.currentTarget;
        var key = node.name + "Event";
        cc.log(this.node.name + " " + key);
        this[key] && this[key](node, e);
      },
      addBtnEvents: function addBtnEvents(eventName) {
        var _this = this;
        void 0 === eventName && (eventName = "touchend");
        var nodes = this.findAll();
        nodes.forEach(function(node) {
          node.getComponent(cc.Button) && _this.addEvent(node, eventName);
        });
      },
      removeBtnEvents: function removeBtnEvents(eventName) {
        var _this2 = this;
        void 0 === eventName && (eventName = "touchend");
        var nodes = this.findAll();
        nodes.forEach(function(node) {
          node.getComponent(cc.Button) && _this2.removeEvent(node, eventName);
        });
      },
      find: function find(path) {
        var _this3 = this;
        var component = (arguments.length <= 1 ? void 0 : arguments[1]) instanceof cc.Node ? null : arguments.length <= 1 ? void 0 : arguments[1];
        var parentNode = component ? arguments.length <= 2 ? void 0 : arguments[2] : arguments.length <= 1 ? void 0 : arguments[1];
        var find = function find(path, parentNode) {
          parentNode || (parentNode = _this3.node);
          var node = cc.find(path, parentNode);
          if (node) return node;
          var children = parentNode.children;
          for (var i = 0; i < children.length; i++) {
            node = find(path, children[i]);
            if (node) return node;
          }
          return null;
        };
        var node = find(path, parentNode);
        !node;
        return component ? node.getComponent(component) : node;
      },
      findAll: function findAll(parentNode) {
        void 0 === parentNode && (parentNode = null);
        null === parentNode && (parentNode = this.node);
        var res = [ parentNode ];
        var find = function find(node, flag) {
          void 0 === flag && (flag = true);
          if (node.children.length > 0) for (var i = 0; i < node.children.length; i++) {
            res.push(node.children[i]);
            find(node.children[i], false);
          } else flag && res.push(node);
        };
        find(parentNode);
        return res;
      }
    });
    cc._RF.pop();
  }, {} ],
  ccHelper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c3a57kGc7JO4pcKxIFXHXXL", "ccHelper");
    "use strict";
    module.exports = {
      $: function $(node, component, isAll) {
        void 0 === component && (component = null);
        void 0 === isAll && (isAll = false);
        if (!node) return null;
        null === component && (component = node.name);
        if (isAll) return node.getComponents(component);
        return node.getComponent(component);
      },
      add$: function add$(node, component, checkHas) {
        void 0 === checkHas && (checkHas = false);
        if (checkHas) {
          var comp = node.getComponent(component);
          if (comp) return comp;
        }
        return node.addComponent(component);
      },
      is$: function is$(component, component2) {
        return component instanceof component2;
      },
      inst: function inst(target, parentNode) {
        var node = cc.instantiate(target);
        this.is$(parentNode, cc.Node) && (node.parent = parentNode);
        return this.resetNode(node);
      },
      resetNode: function resetNode(node) {
        node.x = 0;
        node.y = 0;
        node.opacity = 255;
        node.angle = 0;
        node.scaleX = 1;
        node.scaleY = 1;
        node.active = true;
        return node;
      },
      dist: function dist(by, to) {
        var byPos = by.getWorldPosition ? by.getWorldPosition(cc.Vec2.ZERO) : by;
        var toPos = to.getWorldPosition ? to.getWorldPosition(cc.Vec2.ZERO) : to;
        return cc.Vec2.distance(byPos, toPos);
      },
      toAR: function toAR(byNode, toNode) {
        if (!byNode || !toNode) return cc.v2(0, 0);
        if (byNode.parent && byNode.parent.convertToWorldSpaceAR && toNode.convertToNodeSpaceAR) {
          var pos = byNode.parent.convertToWorldSpaceAR(byNode.getPosition());
          return toNode.convertToNodeSpaceAR(pos);
        }
        return cc.v2(0, 0);
      },
      findAllchildren: function findAllchildren(parentNode) {
        var res = [ parentNode ];
        var find = function find(node, flag) {
          void 0 === flag && (flag = true);
          if (node.children.length > 0) for (var i = 0; i < node.children.length; i++) {
            res.push(node.children[i]);
            find(node.children[i], false);
          } else flag && res.push(node);
        };
        find(parentNode);
        return res;
      },
      setIndex: function setIndex(node, index) {
        if ("last" == index) {
          var lastNode = node.parent.children[node.parent.children.length - 1];
          node.setSiblingIndex(lastNode.getSiblingIndex() + 1);
          return;
        }
        return node.setSiblingIndex(index);
      },
      getDir: function getDir(normalized) {
        var dirX = normalized.x;
        var dirY = normalized.y;
        if (0 === dirX && 0 === dirY) return 0;
        var angle = Math.atan2(dirY, dirX);
        var dir = Math.round((-angle + Math.PI) / (Math.PI / 4));
        dir = dir > 5 ? dir - 6 : dir + 2;
        return dir;
      },
      getDirAngle: function getDirAngle(normalized) {
        return 180 * Math.atan2(normalized.y, normalized.x) / Math.PI;
      },
      getWorldPos: function getWorldPos(node) {
        return node.getWorldPosition(cc.Vec2.ZERO);
      },
      show: function show(comp) {
        if (!comp) return;
        if (!comp.node) return;
        if (comp.node.active) return comp;
        comp.node.active = true;
        return comp;
      }
    };
    cc._RF.pop();
  }, {} ],
  ccPopup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "00ca3Mnu9BF6JrMwTACT2Ef", "ccPopup");
    "use strict";
    cc.Class({
      editor: {
        menu: "base/ccPopup"
      },
      extends: require("ccBase"),
      properties: {},
      onEnable: function onEnable() {
        var _this = this;
        this.node.on("touchend", function(e) {
          E.stop(e);
          if (false === _this.touchClose) return;
          _this.remove();
        });
      },
      onDisable: function onDisable() {
        this.node.off("touchend");
      },
      remove: function remove() {
        this._remove();
        this.onRemove();
      },
      onRemove: function onRemove() {}
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  "circular-json": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3efbedyDl5GCasScbCw5Exh", "circular-json");
    "use strict";
    var specialChar = "~", safeSpecialChar = "\\x" + ("0" + specialChar.charCodeAt(0).toString(16)).slice(-2), escapedSafeSpecialChar = "\\" + safeSpecialChar, specialCharRG = new RegExp(safeSpecialChar, "g"), safeSpecialCharRG = new RegExp(escapedSafeSpecialChar, "g"), safeStartWithSpecialCharRG = new RegExp("(?:^|([^\\\\]))" + escapedSafeSpecialChar), indexOf = [].indexOf || function(v) {
      for (var i = this.length; i-- && this[i] !== v; ) ;
      return i;
    }, $String = String;
    function generateReplacer(value, replacer, resolve) {
      var doNotIgnore = false, inspect = !!replacer, path = [], all = [ value ], seen = [ value ], mapp = [ resolve ? specialChar : "[Circular]" ], last = value, lvl = 1, i, fn;
      inspect && (fn = "object" === typeof replacer ? function(key, value) {
        return "" !== key && indexOf.call(replacer, key) < 0 ? void 0 : value;
      } : replacer);
      return function(key, value) {
        inspect && (value = fn.call(this, key, value));
        if (doNotIgnore) {
          if (last !== this) {
            i = lvl - indexOf.call(all, this) - 1;
            lvl -= i;
            all.splice(lvl, all.length);
            path.splice(lvl - 1, path.length);
            last = this;
          }
          if ("[object Promise]" === Object.prototype.toString.call(value)) return "[object Promise]";
          if ("object" === typeof value && value) {
            indexOf.call(all, value) < 0 && all.push(last = value);
            lvl = all.length;
            i = indexOf.call(seen, value);
            if (i < 0) {
              i = seen.push(value) - 1;
              if (resolve) {
                path.push(("" + key).replace(specialCharRG, safeSpecialChar));
                mapp[i] = specialChar + path.join(specialChar);
              } else mapp[i] = mapp[0];
            } else value = mapp[i];
          } else "string" === typeof value && resolve && (value = value.replace(safeSpecialChar, escapedSafeSpecialChar).replace(specialChar, safeSpecialChar));
        } else doNotIgnore = true;
        return value;
      };
    }
    function retrieveFromPath(current, keys) {
      for (var i = 0, length = keys.length; i < length; current = current[keys[i++].replace(safeSpecialCharRG, specialChar)]) ;
      return current;
    }
    function generateReviver(reviver) {
      return function(key, value) {
        var isString = "string" === typeof value;
        if (isString && value.charAt(0) === specialChar) return new $String(value.slice(1));
        "" === key && (value = regenerate(value, value, {}));
        isString && (value = value.replace(safeStartWithSpecialCharRG, "$1" + specialChar).replace(escapedSafeSpecialChar, safeSpecialChar));
        return reviver ? reviver.call(this, key, value) : value;
      };
    }
    function regenerateArray(root, current, retrieve) {
      for (var i = 0, length = current.length; i < length; i++) current[i] = regenerate(root, current[i], retrieve);
      return current;
    }
    function regenerateObject(root, current, retrieve) {
      for (var key in current) current.hasOwnProperty(key) && (current[key] = regenerate(root, current[key], retrieve));
      return current;
    }
    function regenerate(root, current, retrieve) {
      return current instanceof Array ? regenerateArray(root, current, retrieve) : current instanceof $String ? current.length ? retrieve.hasOwnProperty(current) ? retrieve[current] : retrieve[current] = retrieveFromPath(root, current.split(specialChar)) : root : current instanceof Object ? regenerateObject(root, current, retrieve) : current;
    }
    var CircularJSON = {
      stringify: function stringify(value, replacer, space, doNotResolve) {
        return CircularJSON.parser.stringify(value, generateReplacer(value, replacer, !doNotResolve), space);
      },
      parse: function parse(text, reviver) {
        return CircularJSON.parser.parse(text, generateReviver(reviver));
      },
      parser: JSON
    };
    module.exports = CircularJSON;
    cc._RF.pop();
  }, {} ],
  confirm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2b3c9m/RU9Ca6smPFcg68SI", "confirm");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {},
      onLoad: function onLoad() {
        this.touchClose = false;
        this.addBtnEvents();
      },
      btn1Event: function btn1Event() {
        this.callFunc && this.callFunc(true);
        this.remove();
      },
      btn2Event: function btn2Event() {
        this.callFunc && this.callFunc(false);
        this.remove();
      },
      callFunc: function callFunc(bool) {},
      show: function show(string, callFunc) {
        this.callFunc = callFunc;
        this.find("btn1/label", cc.Label).string = L("yes");
        this.find("btn2/label", cc.Label).string = L("close");
        this.label = this.find("label", cc.Label);
        if (string) {
          this.label.node.active = true;
          this.label.string = string;
        } else this.label.node.active = false;
        return H.show(this);
      },
      showAgree: function showAgree(string, callFunc) {
        this.callFunc = callFunc;
        this.find("btn1/label", cc.Label).string = L("agree");
        this.find("btn2/label", cc.Label).string = L("refuse");
        this.label = this.find("label", cc.Label);
        if (string) {
          this.label.node.active = true;
          this.label.string = string;
        } else this.label.node.active = false;
        return H.show(this);
      }
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  "crypto-js": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2b645C/SLFMRKicQLlTl4Y3", "crypto-js");
    "use strict";
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory() : "function" === typeof define && define.amd ? define([], factory) : root.CryptoJS = factory();
    })(void 0, function() {
      var CryptoJS = CryptoJS || function(Math, undefined) {
        var create = Object.create || function() {
          function F() {}
          return function(obj) {
            var subtype;
            F.prototype = obj;
            subtype = new F();
            F.prototype = null;
            return subtype;
          };
        }();
        var C = {};
        var C_lib = C.lib = {};
        var Base = C_lib.Base = function() {
          return {
            extend: function extend(overrides) {
              var subtype = create(this);
              overrides && subtype.mixIn(overrides);
              subtype.hasOwnProperty("init") && this.init !== subtype.init || (subtype.init = function() {
                subtype.$super.init.apply(this, arguments);
              });
              subtype.init.prototype = subtype;
              subtype.$super = this;
              return subtype;
            },
            create: function create() {
              var instance = this.extend();
              instance.init.apply(instance, arguments);
              return instance;
            },
            init: function init() {},
            mixIn: function mixIn(properties) {
              for (var propertyName in properties) properties.hasOwnProperty(propertyName) && (this[propertyName] = properties[propertyName]);
              properties.hasOwnProperty("toString") && (this.toString = properties.toString);
            },
            clone: function clone() {
              return this.init.prototype.extend(this);
            }
          };
        }();
        var WordArray = C_lib.WordArray = Base.extend({
          init: function init(words, sigBytes) {
            words = this.words = words || [];
            this.sigBytes = sigBytes != undefined ? sigBytes : 4 * words.length;
          },
          toString: function toString(encoder) {
            return (encoder || Hex).stringify(this);
          },
          concat: function concat(wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) for (var i = 0; i < thatSigBytes; i++) {
              var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
            } else for (var i = 0; i < thatSigBytes; i += 4) thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
            this.sigBytes += thatSigBytes;
            return this;
          },
          clamp: function clamp() {
            var words = this.words;
            var sigBytes = this.sigBytes;
            words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
            words.length = Math.ceil(sigBytes / 4);
          },
          clone: function clone() {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);
            return clone;
          },
          random: function random(nBytes) {
            var words = [];
            var r = function r(m_w) {
              var m_w = m_w;
              var m_z = 987654321;
              var mask = 4294967295;
              return function() {
                m_z = 36969 * (65535 & m_z) + (m_z >> 16) & mask;
                m_w = 18e3 * (65535 & m_w) + (m_w >> 16) & mask;
                var result = (m_z << 16) + m_w & mask;
                result /= 4294967296;
                result += .5;
                return result * (Math.random() > .5 ? 1 : -1);
              };
            };
            for (var i = 0, rcache; i < nBytes; i += 4) {
              var _r = r(4294967296 * (rcache || Math.random()));
              rcache = 987654071 * _r();
              words.push(4294967296 * _r() | 0);
            }
            return new WordArray.init(words, nBytes);
          }
        });
        var C_enc = C.enc = {};
        var Hex = C_enc.Hex = {
          stringify: function stringify(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              hexChars.push((bite >>> 4).toString(16));
              hexChars.push((15 & bite).toString(16));
            }
            return hexChars.join("");
          },
          parse: function parse(hexStr) {
            var hexStrLength = hexStr.length;
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
            return new WordArray.init(words, hexStrLength / 2);
          }
        };
        var Latin1 = C_enc.Latin1 = {
          stringify: function stringify(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join("");
          },
          parse: function parse(latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) words[i >>> 2] |= (255 & latin1Str.charCodeAt(i)) << 24 - i % 4 * 8;
            return new WordArray.init(words, latin1StrLength);
          }
        };
        var Utf8 = C_enc.Utf8 = {
          stringify: function stringify(wordArray) {
            try {
              return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: function parse(utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
          }
        };
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
          reset: function reset() {
            this._data = new WordArray.init();
            this._nDataBytes = 0;
          },
          _append: function _append(data) {
            "string" == typeof data && (data = Utf8.parse(data));
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
          },
          _process: function _process(doFlush) {
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = 4 * blockSize;
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            nBlocksReady = doFlush ? Math.ceil(nBlocksReady) : Math.max((0 | nBlocksReady) - this._minBufferSize, 0);
            var nWordsReady = nBlocksReady * blockSize;
            var nBytesReady = Math.min(4 * nWordsReady, dataSigBytes);
            if (nWordsReady) {
              for (var offset = 0; offset < nWordsReady; offset += blockSize) this._doProcessBlock(dataWords, offset);
              var processedWords = dataWords.splice(0, nWordsReady);
              data.sigBytes -= nBytesReady;
            }
            return new WordArray.init(processedWords, nBytesReady);
          },
          clone: function clone() {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();
            return clone;
          },
          _minBufferSize: 0
        });
        var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
          cfg: Base.extend(),
          init: function init(cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
          },
          reset: function reset() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          update: function update(messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
          },
          finalize: function finalize(messageUpdate) {
            messageUpdate && this._append(messageUpdate);
            var hash = this._doFinalize();
            return hash;
          },
          blockSize: 16,
          _createHelper: function _createHelper(hasher) {
            return function(message, cfg) {
              return new hasher.init(cfg).finalize(message);
            };
          },
          _createHmacHelper: function _createHmacHelper(hasher) {
            return function(message, key) {
              return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
          }
        });
        var C_algo = C.algo = {};
        return C;
      }(Math);
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Base64 = C_enc.Base64 = {
          stringify: function stringify(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
              var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
              var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i + .75 * j < sigBytes; j++) base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) while (base64Chars.length % 4) base64Chars.push(paddingChar);
            return base64Chars.join("");
          },
          parse: function parse(base64Str) {
            var base64StrLength = base64Str.length;
            var map = this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map.length; j++) reverseMap[map.charCodeAt(j)] = j;
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              var paddingIndex = base64Str.indexOf(paddingChar);
              -1 !== paddingIndex && (base64StrLength = paddingIndex);
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function parseLoop(base64Str, base64StrLength, reverseMap) {
          var words = [];
          var nBytes = 0;
          for (var i = 0; i < base64StrLength; i++) if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
            words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;
            nBytes++;
          }
          return WordArray.create(words, nBytes);
        }
      })();
      (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var T = [];
        (function() {
          for (var i = 0; i < 64; i++) T[i] = 4294967296 * Math.abs(Math.sin(i + 1)) | 0;
        })();
        var MD5 = C_algo.MD5 = Hasher.extend({
          _doReset: function _doReset() {
            this._hash = new WordArray.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
          },
          _doProcessBlock: function _doProcessBlock(M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = 16711935 & (M_offset_i << 8 | M_offset_i >>> 24) | 4278255360 & (M_offset_i << 24 | M_offset_i >>> 8);
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset + 0];
            var M_offset_1 = M[offset + 1];
            var M_offset_2 = M[offset + 2];
            var M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4];
            var M_offset_5 = M[offset + 5];
            var M_offset_6 = M[offset + 6];
            var M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8];
            var M_offset_9 = M[offset + 9];
            var M_offset_10 = M[offset + 10];
            var M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12];
            var M_offset_13 = M[offset + 13];
            var M_offset_14 = M[offset + 14];
            var M_offset_15 = M[offset + 15];
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            a = FF(a, b, c, d, M_offset_0, 7, T[0]);
            d = FF(d, a, b, c, M_offset_1, 12, T[1]);
            c = FF(c, d, a, b, M_offset_2, 17, T[2]);
            b = FF(b, c, d, a, M_offset_3, 22, T[3]);
            a = FF(a, b, c, d, M_offset_4, 7, T[4]);
            d = FF(d, a, b, c, M_offset_5, 12, T[5]);
            c = FF(c, d, a, b, M_offset_6, 17, T[6]);
            b = FF(b, c, d, a, M_offset_7, 22, T[7]);
            a = FF(a, b, c, d, M_offset_8, 7, T[8]);
            d = FF(d, a, b, c, M_offset_9, 12, T[9]);
            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
            a = FF(a, b, c, d, M_offset_12, 7, T[12]);
            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
            a = GG(a, b, c, d, M_offset_1, 5, T[16]);
            d = GG(d, a, b, c, M_offset_6, 9, T[17]);
            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
            b = GG(b, c, d, a, M_offset_0, 20, T[19]);
            a = GG(a, b, c, d, M_offset_5, 5, T[20]);
            d = GG(d, a, b, c, M_offset_10, 9, T[21]);
            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
            b = GG(b, c, d, a, M_offset_4, 20, T[23]);
            a = GG(a, b, c, d, M_offset_9, 5, T[24]);
            d = GG(d, a, b, c, M_offset_14, 9, T[25]);
            c = GG(c, d, a, b, M_offset_3, 14, T[26]);
            b = GG(b, c, d, a, M_offset_8, 20, T[27]);
            a = GG(a, b, c, d, M_offset_13, 5, T[28]);
            d = GG(d, a, b, c, M_offset_2, 9, T[29]);
            c = GG(c, d, a, b, M_offset_7, 14, T[30]);
            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
            a = HH(a, b, c, d, M_offset_5, 4, T[32]);
            d = HH(d, a, b, c, M_offset_8, 11, T[33]);
            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
            a = HH(a, b, c, d, M_offset_1, 4, T[36]);
            d = HH(d, a, b, c, M_offset_4, 11, T[37]);
            c = HH(c, d, a, b, M_offset_7, 16, T[38]);
            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
            a = HH(a, b, c, d, M_offset_13, 4, T[40]);
            d = HH(d, a, b, c, M_offset_0, 11, T[41]);
            c = HH(c, d, a, b, M_offset_3, 16, T[42]);
            b = HH(b, c, d, a, M_offset_6, 23, T[43]);
            a = HH(a, b, c, d, M_offset_9, 4, T[44]);
            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
            b = HH(b, c, d, a, M_offset_2, 23, T[47]);
            a = II(a, b, c, d, M_offset_0, 6, T[48]);
            d = II(d, a, b, c, M_offset_7, 10, T[49]);
            c = II(c, d, a, b, M_offset_14, 15, T[50]);
            b = II(b, c, d, a, M_offset_5, 21, T[51]);
            a = II(a, b, c, d, M_offset_12, 6, T[52]);
            d = II(d, a, b, c, M_offset_3, 10, T[53]);
            c = II(c, d, a, b, M_offset_10, 15, T[54]);
            b = II(b, c, d, a, M_offset_1, 21, T[55]);
            a = II(a, b, c, d, M_offset_8, 6, T[56]);
            d = II(d, a, b, c, M_offset_15, 10, T[57]);
            c = II(c, d, a, b, M_offset_6, 15, T[58]);
            b = II(b, c, d, a, M_offset_13, 21, T[59]);
            a = II(a, b, c, d, M_offset_4, 6, T[60]);
            d = II(d, a, b, c, M_offset_11, 10, T[61]);
            c = II(c, d, a, b, M_offset_2, 15, T[62]);
            b = II(b, c, d, a, M_offset_9, 21, T[63]);
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
          },
          _doFinalize: function _doFinalize() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            var nBitsTotalH = Math.floor(nBitsTotal / 4294967296);
            var nBitsTotalL = nBitsTotal;
            dataWords[15 + (nBitsLeft + 64 >>> 9 << 4)] = 16711935 & (nBitsTotalH << 8 | nBitsTotalH >>> 24) | 4278255360 & (nBitsTotalH << 24 | nBitsTotalH >>> 8);
            dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = 16711935 & (nBitsTotalL << 8 | nBitsTotalL >>> 24) | 4278255360 & (nBitsTotalL << 24 | nBitsTotalL >>> 8);
            data.sigBytes = 4 * (dataWords.length + 1);
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 4; i++) {
              var H_i = H[i];
              H[i] = 16711935 & (H_i << 8 | H_i >>> 24) | 4278255360 & (H_i << 24 | H_i >>> 8);
            }
            return hash;
          },
          clone: function clone() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function FF(a, b, c, d, x, s, t) {
          var n = a + (b & c | ~b & d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function GG(a, b, c, d, x, s, t) {
          var n = a + (b & d | c & ~d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function HH(a, b, c, d, x, s, t) {
          var n = a + (b ^ c ^ d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function II(a, b, c, d, x, s, t) {
          var n = a + (c ^ (b | ~d)) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        C.MD5 = Hasher._createHelper(MD5);
        C.HmacMD5 = Hasher._createHmacHelper(MD5);
      })(Math);
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var W = [];
        var SHA1 = C_algo.SHA1 = Hasher.extend({
          _doReset: function _doReset() {
            this._hash = new WordArray.init([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
          },
          _doProcessBlock: function _doProcessBlock(M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            for (var i = 0; i < 80; i++) {
              if (i < 16) W[i] = 0 | M[offset + i]; else {
                var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = n << 1 | n >>> 31;
              }
              var t = (a << 5 | a >>> 27) + e + W[i];
              t += i < 20 ? 1518500249 + (b & c | ~b & d) : i < 40 ? 1859775393 + (b ^ c ^ d) : i < 60 ? (b & c | b & d | c & d) - 1894007588 : (b ^ c ^ d) - 899497514;
              e = d;
              d = c;
              c = b << 30 | b >>> 2;
              b = a;
              a = t;
            }
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e | 0;
          },
          _doFinalize: function _doFinalize() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = Math.floor(nBitsTotal / 4294967296);
            dataWords[15 + (nBitsLeft + 64 >>> 9 << 4)] = nBitsTotal;
            data.sigBytes = 4 * dataWords.length;
            this._process();
            return this._hash;
          },
          clone: function clone() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA1 = Hasher._createHelper(SHA1);
        C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
      })();
      (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var H = [];
        var K = [];
        (function() {
          function isPrime(n) {
            var sqrtN = Math.sqrt(n);
            for (var factor = 2; factor <= sqrtN; factor++) if (!(n % factor)) return false;
            return true;
          }
          function getFractionalBits(n) {
            return 4294967296 * (n - (0 | n)) | 0;
          }
          var n = 2;
          var nPrime = 0;
          while (nPrime < 64) {
            if (isPrime(n)) {
              nPrime < 8 && (H[nPrime] = getFractionalBits(Math.pow(n, .5)));
              K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
              nPrime++;
            }
            n++;
          }
        })();
        var W = [];
        var SHA256 = C_algo.SHA256 = Hasher.extend({
          _doReset: function _doReset() {
            this._hash = new WordArray.init(H.slice(0));
          },
          _doProcessBlock: function _doProcessBlock(M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            var f = H[5];
            var g = H[6];
            var h = H[7];
            for (var i = 0; i < 64; i++) {
              if (i < 16) W[i] = 0 | M[offset + i]; else {
                var gamma0x = W[i - 15];
                var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                var gamma1x = W[i - 2];
                var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
              }
              var ch = e & f ^ ~e & g;
              var maj = a & b ^ a & c ^ b & c;
              var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
              var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
              var t1 = h + sigma1 + ch + K[i] + W[i];
              var t2 = sigma0 + maj;
              h = g;
              g = f;
              f = e;
              e = d + t1 | 0;
              d = c;
              c = b;
              b = a;
              a = t1 + t2 | 0;
            }
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e | 0;
            H[5] = H[5] + f | 0;
            H[6] = H[6] + g | 0;
            H[7] = H[7] + h | 0;
          },
          _doFinalize: function _doFinalize() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = Math.floor(nBitsTotal / 4294967296);
            dataWords[15 + (nBitsLeft + 64 >>> 9 << 4)] = nBitsTotal;
            data.sigBytes = 4 * dataWords.length;
            this._process();
            return this._hash;
          },
          clone: function clone() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA256 = Hasher._createHelper(SHA256);
        C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
      })(Math);
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
          stringify: function stringify(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var utf16Chars = [];
            for (var i = 0; i < sigBytes; i += 2) {
              var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
              utf16Chars.push(String.fromCharCode(codePoint));
            }
            return utf16Chars.join("");
          },
          parse: function parse(utf16Str) {
            var utf16StrLength = utf16Str.length;
            var words = [];
            for (var i = 0; i < utf16StrLength; i++) words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
            return WordArray.create(words, 2 * utf16StrLength);
          }
        };
        C_enc.Utf16LE = {
          stringify: function stringify(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var utf16Chars = [];
            for (var i = 0; i < sigBytes; i += 2) {
              var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
              utf16Chars.push(String.fromCharCode(codePoint));
            }
            return utf16Chars.join("");
          },
          parse: function parse(utf16Str) {
            var utf16StrLength = utf16Str.length;
            var words = [];
            for (var i = 0; i < utf16StrLength; i++) words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
            return WordArray.create(words, 2 * utf16StrLength);
          }
        };
        function swapEndian(word) {
          return word << 8 & 4278255360 | word >>> 8 & 16711935;
        }
      })();
      (function() {
        if ("function" != typeof ArrayBuffer) return;
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var superInit = WordArray.init;
        var subInit = WordArray.init = function(typedArray) {
          typedArray instanceof ArrayBuffer && (typedArray = new Uint8Array(typedArray));
          (typedArray instanceof Int8Array || "undefined" !== typeof Uint8ClampedArray && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) && (typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength));
          if (typedArray instanceof Uint8Array) {
            var typedArrayByteLength = typedArray.byteLength;
            var words = [];
            for (var i = 0; i < typedArrayByteLength; i++) words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
            superInit.call(this, words, typedArrayByteLength);
          } else superInit.apply(this, arguments);
        };
        subInit.prototype = WordArray;
      })();
      (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var _zl = WordArray.create([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ]);
        var _zr = WordArray.create([ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ]);
        var _sl = WordArray.create([ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ]);
        var _sr = WordArray.create([ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ]);
        var _hl = WordArray.create([ 0, 1518500249, 1859775393, 2400959708, 2840853838 ]);
        var _hr = WordArray.create([ 1352829926, 1548603684, 1836072691, 2053994217, 0 ]);
        var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
          _doReset: function _doReset() {
            this._hash = WordArray.create([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
          },
          _doProcessBlock: function _doProcessBlock(M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = 16711935 & (M_offset_i << 8 | M_offset_i >>> 24) | 4278255360 & (M_offset_i << 24 | M_offset_i >>> 8);
            }
            var H = this._hash.words;
            var hl = _hl.words;
            var hr = _hr.words;
            var zl = _zl.words;
            var zr = _zr.words;
            var sl = _sl.words;
            var sr = _sr.words;
            var al, bl, cl, dl, el;
            var ar, br, cr, dr, er;
            ar = al = H[0];
            br = bl = H[1];
            cr = cl = H[2];
            dr = dl = H[3];
            er = el = H[4];
            var t;
            for (var i = 0; i < 80; i += 1) {
              t = al + M[offset + zl[i]] | 0;
              t += i < 16 ? f1(bl, cl, dl) + hl[0] : i < 32 ? f2(bl, cl, dl) + hl[1] : i < 48 ? f3(bl, cl, dl) + hl[2] : i < 64 ? f4(bl, cl, dl) + hl[3] : f5(bl, cl, dl) + hl[4];
              t |= 0;
              t = rotl(t, sl[i]);
              t = t + el | 0;
              al = el;
              el = dl;
              dl = rotl(cl, 10);
              cl = bl;
              bl = t;
              t = ar + M[offset + zr[i]] | 0;
              t += i < 16 ? f5(br, cr, dr) + hr[0] : i < 32 ? f4(br, cr, dr) + hr[1] : i < 48 ? f3(br, cr, dr) + hr[2] : i < 64 ? f2(br, cr, dr) + hr[3] : f1(br, cr, dr) + hr[4];
              t |= 0;
              t = rotl(t, sr[i]);
              t = t + er | 0;
              ar = er;
              er = dr;
              dr = rotl(cr, 10);
              cr = br;
              br = t;
            }
            t = H[1] + cl + dr | 0;
            H[1] = H[2] + dl + er | 0;
            H[2] = H[3] + el + ar | 0;
            H[3] = H[4] + al + br | 0;
            H[4] = H[0] + bl + cr | 0;
            H[0] = t;
          },
          _doFinalize: function _doFinalize() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = 16711935 & (nBitsTotal << 8 | nBitsTotal >>> 24) | 4278255360 & (nBitsTotal << 24 | nBitsTotal >>> 8);
            data.sigBytes = 4 * (dataWords.length + 1);
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 5; i++) {
              var H_i = H[i];
              H[i] = 16711935 & (H_i << 8 | H_i >>> 24) | 4278255360 & (H_i << 24 | H_i >>> 8);
            }
            return hash;
          },
          clone: function clone() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function f1(x, y, z) {
          return x ^ y ^ z;
        }
        function f2(x, y, z) {
          return x & y | ~x & z;
        }
        function f3(x, y, z) {
          return (x | ~y) ^ z;
        }
        function f4(x, y, z) {
          return x & z | y & ~z;
        }
        function f5(x, y, z) {
          return x ^ (y | ~z);
        }
        function rotl(x, n) {
          return x << n | x >>> 32 - n;
        }
        C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
        C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
      })(Math);
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var C_algo = C.algo;
        var HMAC = C_algo.HMAC = Base.extend({
          init: function init(hasher, key) {
            hasher = this._hasher = new hasher.init();
            "string" == typeof key && (key = Utf8.parse(key));
            var hasherBlockSize = hasher.blockSize;
            var hasherBlockSizeBytes = 4 * hasherBlockSize;
            key.sigBytes > hasherBlockSizeBytes && (key = hasher.finalize(key));
            key.clamp();
            var oKey = this._oKey = key.clone();
            var iKey = this._iKey = key.clone();
            var oKeyWords = oKey.words;
            var iKeyWords = iKey.words;
            for (var i = 0; i < hasherBlockSize; i++) {
              oKeyWords[i] ^= 1549556828;
              iKeyWords[i] ^= 909522486;
            }
            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
            this.reset();
          },
          reset: function reset() {
            var hasher = this._hasher;
            hasher.reset();
            hasher.update(this._iKey);
          },
          update: function update(messageUpdate) {
            this._hasher.update(messageUpdate);
            return this;
          },
          finalize: function finalize(messageUpdate) {
            var hasher = this._hasher;
            var innerHash = hasher.finalize(messageUpdate);
            hasher.reset();
            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
            return hmac;
          }
        });
      })();
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA1 = C_algo.SHA1;
        var HMAC = C_algo.HMAC;
        var PBKDF2 = C_algo.PBKDF2 = Base.extend({
          cfg: Base.extend({
            keySize: 4,
            hasher: SHA1,
            iterations: 1
          }),
          init: function init(cfg) {
            this.cfg = this.cfg.extend(cfg);
          },
          compute: function compute(password, salt) {
            var cfg = this.cfg;
            var hmac = HMAC.create(cfg.hasher, password);
            var derivedKey = WordArray.create();
            var blockIndex = WordArray.create([ 1 ]);
            var derivedKeyWords = derivedKey.words;
            var blockIndexWords = blockIndex.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
              var block = hmac.update(salt).finalize(blockIndex);
              hmac.reset();
              var blockWords = block.words;
              var blockWordsLength = blockWords.length;
              var intermediate = block;
              for (var i = 1; i < iterations; i++) {
                intermediate = hmac.finalize(intermediate);
                hmac.reset();
                var intermediateWords = intermediate.words;
                for (var j = 0; j < blockWordsLength; j++) blockWords[j] ^= intermediateWords[j];
              }
              derivedKey.concat(block);
              blockIndexWords[0]++;
            }
            derivedKey.sigBytes = 4 * keySize;
            return derivedKey;
          }
        });
        C.PBKDF2 = function(password, salt, cfg) {
          return PBKDF2.create(cfg).compute(password, salt);
        };
      })();
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var MD5 = C_algo.MD5;
        var EvpKDF = C_algo.EvpKDF = Base.extend({
          cfg: Base.extend({
            keySize: 4,
            hasher: MD5,
            iterations: 1
          }),
          init: function init(cfg) {
            this.cfg = this.cfg.extend(cfg);
          },
          compute: function compute(password, salt) {
            var cfg = this.cfg;
            var hasher = cfg.hasher.create();
            var derivedKey = WordArray.create();
            var derivedKeyWords = derivedKey.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
              block && hasher.update(block);
              var block = hasher.update(password).finalize(salt);
              hasher.reset();
              for (var i = 1; i < iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
              }
              derivedKey.concat(block);
            }
            derivedKey.sigBytes = 4 * keySize;
            return derivedKey;
          }
        });
        C.EvpKDF = function(password, salt, cfg) {
          return EvpKDF.create(cfg).compute(password, salt);
        };
      })();
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA256 = C_algo.SHA256;
        var SHA224 = C_algo.SHA224 = SHA256.extend({
          _doReset: function _doReset() {
            this._hash = new WordArray.init([ 3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428 ]);
          },
          _doFinalize: function _doFinalize() {
            var hash = SHA256._doFinalize.call(this);
            hash.sigBytes -= 4;
            return hash;
          }
        });
        C.SHA224 = SHA256._createHelper(SHA224);
        C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
      })();
      (function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var X32WordArray = C_lib.WordArray;
        var C_x64 = C.x64 = {};
        var X64Word = C_x64.Word = Base.extend({
          init: function init(high, low) {
            this.high = high;
            this.low = low;
          }
        });
        var X64WordArray = C_x64.WordArray = Base.extend({
          init: function init(words, sigBytes) {
            words = this.words = words || [];
            this.sigBytes = sigBytes != undefined ? sigBytes : 8 * words.length;
          },
          toX32: function toX32() {
            var x64Words = this.words;
            var x64WordsLength = x64Words.length;
            var x32Words = [];
            for (var i = 0; i < x64WordsLength; i++) {
              var x64Word = x64Words[i];
              x32Words.push(x64Word.high);
              x32Words.push(x64Word.low);
            }
            return X32WordArray.create(x32Words, this.sigBytes);
          },
          clone: function clone() {
            var clone = Base.clone.call(this);
            var words = clone.words = this.words.slice(0);
            var wordsLength = words.length;
            for (var i = 0; i < wordsLength; i++) words[i] = words[i].clone();
            return clone;
          }
        });
      })();
      (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var C_algo = C.algo;
        var RHO_OFFSETS = [];
        var PI_INDEXES = [];
        var ROUND_CONSTANTS = [];
        (function() {
          var x = 1, y = 0;
          for (var t = 0; t < 24; t++) {
            RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
            var newX = y % 5;
            var newY = (2 * x + 3 * y) % 5;
            x = newX;
            y = newY;
          }
          for (var x = 0; x < 5; x++) for (var y = 0; y < 5; y++) PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
          var LFSR = 1;
          for (var i = 0; i < 24; i++) {
            var roundConstantMsw = 0;
            var roundConstantLsw = 0;
            for (var j = 0; j < 7; j++) {
              if (1 & LFSR) {
                var bitPosition = (1 << j) - 1;
                bitPosition < 32 ? roundConstantLsw ^= 1 << bitPosition : roundConstantMsw ^= 1 << bitPosition - 32;
              }
              128 & LFSR ? LFSR = LFSR << 1 ^ 113 : LFSR <<= 1;
            }
            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
          }
        })();
        var T = [];
        (function() {
          for (var i = 0; i < 25; i++) T[i] = X64Word.create();
        })();
        var SHA3 = C_algo.SHA3 = Hasher.extend({
          cfg: Hasher.cfg.extend({
            outputLength: 512
          }),
          _doReset: function _doReset() {
            var state = this._state = [];
            for (var i = 0; i < 25; i++) state[i] = new X64Word.init();
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          },
          _doProcessBlock: function _doProcessBlock(M, offset) {
            var state = this._state;
            var nBlockSizeLanes = this.blockSize / 2;
            for (var i = 0; i < nBlockSizeLanes; i++) {
              var M2i = M[offset + 2 * i];
              var M2i1 = M[offset + 2 * i + 1];
              M2i = 16711935 & (M2i << 8 | M2i >>> 24) | 4278255360 & (M2i << 24 | M2i >>> 8);
              M2i1 = 16711935 & (M2i1 << 8 | M2i1 >>> 24) | 4278255360 & (M2i1 << 24 | M2i1 >>> 8);
              var lane = state[i];
              lane.high ^= M2i1;
              lane.low ^= M2i;
            }
            for (var round = 0; round < 24; round++) {
              for (var x = 0; x < 5; x++) {
                var tMsw = 0, tLsw = 0;
                for (var y = 0; y < 5; y++) {
                  var lane = state[x + 5 * y];
                  tMsw ^= lane.high;
                  tLsw ^= lane.low;
                }
                var Tx = T[x];
                Tx.high = tMsw;
                Tx.low = tLsw;
              }
              for (var x = 0; x < 5; x++) {
                var Tx4 = T[(x + 4) % 5];
                var Tx1 = T[(x + 1) % 5];
                var Tx1Msw = Tx1.high;
                var Tx1Lsw = Tx1.low;
                var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                for (var y = 0; y < 5; y++) {
                  var lane = state[x + 5 * y];
                  lane.high ^= tMsw;
                  lane.low ^= tLsw;
                }
              }
              for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                var lane = state[laneIndex];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                var rhoOffset = RHO_OFFSETS[laneIndex];
                if (rhoOffset < 32) {
                  var tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                  var tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                } else {
                  var tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                  var tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                }
                var TPiLane = T[PI_INDEXES[laneIndex]];
                TPiLane.high = tMsw;
                TPiLane.low = tLsw;
              }
              var T0 = T[0];
              var state0 = state[0];
              T0.high = state0.high;
              T0.low = state0.low;
              for (var x = 0; x < 5; x++) for (var y = 0; y < 5; y++) {
                var laneIndex = x + 5 * y;
                var lane = state[laneIndex];
                var TLane = T[laneIndex];
                var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
              }
              var lane = state[0];
              var roundConstant = ROUND_CONSTANTS[round];
              lane.high ^= roundConstant.high;
              lane.low ^= roundConstant.low;
            }
          },
          _doFinalize: function _doFinalize() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            var blockSizeBits = 32 * this.blockSize;
            dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
            dataWords[(Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
            data.sigBytes = 4 * dataWords.length;
            this._process();
            var state = this._state;
            var outputLengthBytes = this.cfg.outputLength / 8;
            var outputLengthLanes = outputLengthBytes / 8;
            var hashWords = [];
            for (var i = 0; i < outputLengthLanes; i++) {
              var lane = state[i];
              var laneMsw = lane.high;
              var laneLsw = lane.low;
              laneMsw = 16711935 & (laneMsw << 8 | laneMsw >>> 24) | 4278255360 & (laneMsw << 24 | laneMsw >>> 8);
              laneLsw = 16711935 & (laneLsw << 8 | laneLsw >>> 24) | 4278255360 & (laneLsw << 24 | laneLsw >>> 8);
              hashWords.push(laneLsw);
              hashWords.push(laneMsw);
            }
            return new WordArray.init(hashWords, outputLengthBytes);
          },
          clone: function clone() {
            var clone = Hasher.clone.call(this);
            var state = clone._state = this._state.slice(0);
            for (var i = 0; i < 25; i++) state[i] = state[i].clone();
            return clone;
          }
        });
        C.SHA3 = Hasher._createHelper(SHA3);
        C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
      })(Math);
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
        function X64Word_create() {
          return X64Word.create.apply(X64Word, arguments);
        }
        var K = [ X64Word_create(1116352408, 3609767458), X64Word_create(1899447441, 602891725), X64Word_create(3049323471, 3964484399), X64Word_create(3921009573, 2173295548), X64Word_create(961987163, 4081628472), X64Word_create(1508970993, 3053834265), X64Word_create(2453635748, 2937671579), X64Word_create(2870763221, 3664609560), X64Word_create(3624381080, 2734883394), X64Word_create(310598401, 1164996542), X64Word_create(607225278, 1323610764), X64Word_create(1426881987, 3590304994), X64Word_create(1925078388, 4068182383), X64Word_create(2162078206, 991336113), X64Word_create(2614888103, 633803317), X64Word_create(3248222580, 3479774868), X64Word_create(3835390401, 2666613458), X64Word_create(4022224774, 944711139), X64Word_create(264347078, 2341262773), X64Word_create(604807628, 2007800933), X64Word_create(770255983, 1495990901), X64Word_create(1249150122, 1856431235), X64Word_create(1555081692, 3175218132), X64Word_create(1996064986, 2198950837), X64Word_create(2554220882, 3999719339), X64Word_create(2821834349, 766784016), X64Word_create(2952996808, 2566594879), X64Word_create(3210313671, 3203337956), X64Word_create(3336571891, 1034457026), X64Word_create(3584528711, 2466948901), X64Word_create(113926993, 3758326383), X64Word_create(338241895, 168717936), X64Word_create(666307205, 1188179964), X64Word_create(773529912, 1546045734), X64Word_create(1294757372, 1522805485), X64Word_create(1396182291, 2643833823), X64Word_create(1695183700, 2343527390), X64Word_create(1986661051, 1014477480), X64Word_create(2177026350, 1206759142), X64Word_create(2456956037, 344077627), X64Word_create(2730485921, 1290863460), X64Word_create(2820302411, 3158454273), X64Word_create(3259730800, 3505952657), X64Word_create(3345764771, 106217008), X64Word_create(3516065817, 3606008344), X64Word_create(3600352804, 1432725776), X64Word_create(4094571909, 1467031594), X64Word_create(275423344, 851169720), X64Word_create(430227734, 3100823752), X64Word_create(506948616, 1363258195), X64Word_create(659060556, 3750685593), X64Word_create(883997877, 3785050280), X64Word_create(958139571, 3318307427), X64Word_create(1322822218, 3812723403), X64Word_create(1537002063, 2003034995), X64Word_create(1747873779, 3602036899), X64Word_create(1955562222, 1575990012), X64Word_create(2024104815, 1125592928), X64Word_create(2227730452, 2716904306), X64Word_create(2361852424, 442776044), X64Word_create(2428436474, 593698344), X64Word_create(2756734187, 3733110249), X64Word_create(3204031479, 2999351573), X64Word_create(3329325298, 3815920427), X64Word_create(3391569614, 3928383900), X64Word_create(3515267271, 566280711), X64Word_create(3940187606, 3454069534), X64Word_create(4118630271, 4000239992), X64Word_create(116418474, 1914138554), X64Word_create(174292421, 2731055270), X64Word_create(289380356, 3203993006), X64Word_create(460393269, 320620315), X64Word_create(685471733, 587496836), X64Word_create(852142971, 1086792851), X64Word_create(1017036298, 365543100), X64Word_create(1126000580, 2618297676), X64Word_create(1288033470, 3409855158), X64Word_create(1501505948, 4234509866), X64Word_create(1607167915, 987167468), X64Word_create(1816402316, 1246189591) ];
        var W = [];
        (function() {
          for (var i = 0; i < 80; i++) W[i] = X64Word_create();
        })();
        var SHA512 = C_algo.SHA512 = Hasher.extend({
          _doReset: function _doReset() {
            this._hash = new X64WordArray.init([ new X64Word.init(1779033703, 4089235720), new X64Word.init(3144134277, 2227873595), new X64Word.init(1013904242, 4271175723), new X64Word.init(2773480762, 1595750129), new X64Word.init(1359893119, 2917565137), new X64Word.init(2600822924, 725511199), new X64Word.init(528734635, 4215389547), new X64Word.init(1541459225, 327033209) ]);
          },
          _doProcessBlock: function _doProcessBlock(M, offset) {
            var H = this._hash.words;
            var H0 = H[0];
            var H1 = H[1];
            var H2 = H[2];
            var H3 = H[3];
            var H4 = H[4];
            var H5 = H[5];
            var H6 = H[6];
            var H7 = H[7];
            var H0h = H0.high;
            var H0l = H0.low;
            var H1h = H1.high;
            var H1l = H1.low;
            var H2h = H2.high;
            var H2l = H2.low;
            var H3h = H3.high;
            var H3l = H3.low;
            var H4h = H4.high;
            var H4l = H4.low;
            var H5h = H5.high;
            var H5l = H5.low;
            var H6h = H6.high;
            var H6l = H6.low;
            var H7h = H7.high;
            var H7l = H7.low;
            var ah = H0h;
            var al = H0l;
            var bh = H1h;
            var bl = H1l;
            var ch = H2h;
            var cl = H2l;
            var dh = H3h;
            var dl = H3l;
            var eh = H4h;
            var el = H4l;
            var fh = H5h;
            var fl = H5l;
            var gh = H6h;
            var gl = H6l;
            var hh = H7h;
            var hl = H7l;
            for (var i = 0; i < 80; i++) {
              var Wi = W[i];
              if (i < 16) {
                var Wih = Wi.high = 0 | M[offset + 2 * i];
                var Wil = Wi.low = 0 | M[offset + 2 * i + 1];
              } else {
                var gamma0x = W[i - 15];
                var gamma0xh = gamma0x.high;
                var gamma0xl = gamma0x.low;
                var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                var gamma1x = W[i - 2];
                var gamma1xh = gamma1x.high;
                var gamma1xl = gamma1x.low;
                var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                var Wi7 = W[i - 7];
                var Wi7h = Wi7.high;
                var Wi7l = Wi7.low;
                var Wi16 = W[i - 16];
                var Wi16h = Wi16.high;
                var Wi16l = Wi16.low;
                var Wil = gamma0l + Wi7l;
                var Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                var Wil = Wil + gamma1l;
                var Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                var Wil = Wil + Wi16l;
                var Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                Wi.high = Wih;
                Wi.low = Wil;
              }
              var chh = eh & fh ^ ~eh & gh;
              var chl = el & fl ^ ~el & gl;
              var majh = ah & bh ^ ah & ch ^ bh & ch;
              var majl = al & bl ^ al & cl ^ bl & cl;
              var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
              var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
              var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
              var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
              var Ki = K[i];
              var Kih = Ki.high;
              var Kil = Ki.low;
              var t1l = hl + sigma1l;
              var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
              var t1l = t1l + chl;
              var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
              var t1l = t1l + Kil;
              var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
              var t1l = t1l + Wil;
              var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
              var t2l = sigma0l + majl;
              var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
              hh = gh;
              hl = gl;
              gh = fh;
              gl = fl;
              fh = eh;
              fl = el;
              el = dl + t1l | 0;
              eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
              dh = ch;
              dl = cl;
              ch = bh;
              cl = bl;
              bh = ah;
              bl = al;
              al = t1l + t2l | 0;
              ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
            }
            H0l = H0.low = H0l + al;
            H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
            H1l = H1.low = H1l + bl;
            H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
            H2l = H2.low = H2l + cl;
            H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
            H3l = H3.low = H3l + dl;
            H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
            H4l = H4.low = H4l + el;
            H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
            H5l = H5.low = H5l + fl;
            H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
            H6l = H6.low = H6l + gl;
            H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
            H7l = H7.low = H7l + hl;
            H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
          },
          _doFinalize: function _doFinalize() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[30 + (nBitsLeft + 128 >>> 10 << 5)] = Math.floor(nBitsTotal / 4294967296);
            dataWords[31 + (nBitsLeft + 128 >>> 10 << 5)] = nBitsTotal;
            data.sigBytes = 4 * dataWords.length;
            this._process();
            var hash = this._hash.toX32();
            return hash;
          },
          clone: function clone() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          },
          blockSize: 32
        });
        C.SHA512 = Hasher._createHelper(SHA512);
        C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
      })();
      (function() {
        var C = CryptoJS;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
        var SHA512 = C_algo.SHA512;
        var SHA384 = C_algo.SHA384 = SHA512.extend({
          _doReset: function _doReset() {
            this._hash = new X64WordArray.init([ new X64Word.init(3418070365, 3238371032), new X64Word.init(1654270250, 914150663), new X64Word.init(2438529370, 812702999), new X64Word.init(355462360, 4144912697), new X64Word.init(1731405415, 4290775857), new X64Word.init(2394180231, 1750603025), new X64Word.init(3675008525, 1694076839), new X64Word.init(1203062813, 3204075428) ]);
          },
          _doFinalize: function _doFinalize() {
            var hash = SHA512._doFinalize.call(this);
            hash.sigBytes -= 16;
            return hash;
          }
        });
        C.SHA384 = SHA512._createHelper(SHA384);
        C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
      })();
      CryptoJS.lib.Cipher || function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;
        var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
          cfg: Base.extend(),
          createEncryptor: function createEncryptor(key, cfg) {
            return this.create(this._ENC_XFORM_MODE, key, cfg);
          },
          createDecryptor: function createDecryptor(key, cfg) {
            return this.create(this._DEC_XFORM_MODE, key, cfg);
          },
          init: function init(xformMode, key, cfg) {
            this.cfg = this.cfg.extend(cfg);
            this._xformMode = xformMode;
            this._key = key;
            this.reset();
          },
          reset: function reset() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          process: function process(dataUpdate) {
            this._append(dataUpdate);
            return this._process();
          },
          finalize: function finalize(dataUpdate) {
            dataUpdate && this._append(dataUpdate);
            var finalProcessedData = this._doFinalize();
            return finalProcessedData;
          },
          keySize: 4,
          ivSize: 4,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          _createHelper: function() {
            function selectCipherStrategy(key) {
              return "string" == typeof key ? PasswordBasedCipher : SerializableCipher;
            }
            return function(cipher) {
              return {
                encrypt: function encrypt(message, key, cfg) {
                  return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                },
                decrypt: function decrypt(ciphertext, key, cfg) {
                  return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                }
              };
            };
          }()
        });
        var StreamCipher = C_lib.StreamCipher = Cipher.extend({
          _doFinalize: function _doFinalize() {
            var finalProcessedBlocks = this._process(true);
            return finalProcessedBlocks;
          },
          blockSize: 1
        });
        var C_mode = C.mode = {};
        var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
          createEncryptor: function createEncryptor(cipher, iv) {
            return this.Encryptor.create(cipher, iv);
          },
          createDecryptor: function createDecryptor(cipher, iv) {
            return this.Decryptor.create(cipher, iv);
          },
          init: function init(cipher, iv) {
            this._cipher = cipher;
            this._iv = iv;
          }
        });
        var CBC = C_mode.CBC = function() {
          var CBC = BlockCipherMode.extend();
          CBC.Encryptor = CBC.extend({
            processBlock: function processBlock(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              xorBlock.call(this, words, offset, blockSize);
              cipher.encryptBlock(words, offset);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CBC.Decryptor = CBC.extend({
            processBlock: function processBlock(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              cipher.decryptBlock(words, offset);
              xorBlock.call(this, words, offset, blockSize);
              this._prevBlock = thisBlock;
            }
          });
          function xorBlock(words, offset, blockSize) {
            var iv = this._iv;
            if (iv) {
              var block = iv;
              this._iv = undefined;
            } else var block = this._prevBlock;
            for (var i = 0; i < blockSize; i++) words[offset + i] ^= block[i];
          }
          return CBC;
        }();
        var C_pad = C.pad = {};
        var Pkcs7 = C_pad.Pkcs7 = {
          pad: function pad(data, blockSize) {
            var blockSizeBytes = 4 * blockSize;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
            var paddingWords = [];
            for (var i = 0; i < nPaddingBytes; i += 4) paddingWords.push(paddingWord);
            var padding = WordArray.create(paddingWords, nPaddingBytes);
            data.concat(padding);
          },
          unpad: function unpad(data) {
            var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
            data.sigBytes -= nPaddingBytes;
          }
        };
        var BlockCipher = C_lib.BlockCipher = Cipher.extend({
          cfg: Cipher.cfg.extend({
            mode: CBC,
            padding: Pkcs7
          }),
          reset: function reset() {
            Cipher.reset.call(this);
            var cfg = this.cfg;
            var iv = cfg.iv;
            var mode = cfg.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) var modeCreator = mode.createEncryptor; else {
              var modeCreator = mode.createDecryptor;
              this._minBufferSize = 1;
            }
            if (this._mode && this._mode.__creator == modeCreator) this._mode.init(this, iv && iv.words); else {
              this._mode = modeCreator.call(mode, this, iv && iv.words);
              this._mode.__creator = modeCreator;
            }
          },
          _doProcessBlock: function _doProcessBlock(words, offset) {
            this._mode.processBlock(words, offset);
          },
          _doFinalize: function _doFinalize() {
            var padding = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              padding.pad(this._data, this.blockSize);
              var finalProcessedBlocks = this._process(true);
            } else {
              var finalProcessedBlocks = this._process(true);
              padding.unpad(finalProcessedBlocks);
            }
            return finalProcessedBlocks;
          },
          blockSize: 4
        });
        var CipherParams = C_lib.CipherParams = Base.extend({
          init: function init(cipherParams) {
            this.mixIn(cipherParams);
          },
          toString: function toString(formatter) {
            return (formatter || this.formatter).stringify(this);
          }
        });
        var C_format = C.format = {};
        var OpenSSLFormatter = C_format.OpenSSL = {
          stringify: function stringify(cipherParams) {
            var ciphertext = cipherParams.ciphertext;
            var salt = cipherParams.salt;
            if (salt) var wordArray = WordArray.create([ 1398893684, 1701076831 ]).concat(salt).concat(ciphertext); else var wordArray = ciphertext;
            return wordArray.toString(Base64);
          },
          parse: function parse(openSSLStr) {
            var ciphertext = Base64.parse(openSSLStr);
            var ciphertextWords = ciphertext.words;
            if (1398893684 == ciphertextWords[0] && 1701076831 == ciphertextWords[1]) {
              var salt = WordArray.create(ciphertextWords.slice(2, 4));
              ciphertextWords.splice(0, 4);
              ciphertext.sigBytes -= 16;
            }
            return CipherParams.create({
              ciphertext: ciphertext,
              salt: salt
            });
          }
        };
        var SerializableCipher = C_lib.SerializableCipher = Base.extend({
          cfg: Base.extend({
            format: OpenSSLFormatter
          }),
          encrypt: function encrypt(cipher, message, key, cfg) {
            cfg = this.cfg.extend(cfg);
            var encryptor = cipher.createEncryptor(key, cfg);
            var ciphertext = encryptor.finalize(message);
            var cipherCfg = encryptor.cfg;
            return CipherParams.create({
              ciphertext: ciphertext,
              key: key,
              iv: cipherCfg.iv,
              algorithm: cipher,
              mode: cipherCfg.mode,
              padding: cipherCfg.padding,
              blockSize: cipher.blockSize,
              formatter: cfg.format
            });
          },
          decrypt: function decrypt(cipher, ciphertext, key, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
            return plaintext;
          },
          _parse: function _parse(ciphertext, format) {
            return "string" == typeof ciphertext ? format.parse(ciphertext, this) : ciphertext;
          }
        });
        var C_kdf = C.kdf = {};
        var OpenSSLKdf = C_kdf.OpenSSL = {
          execute: function execute(password, keySize, ivSize, salt) {
            salt || (salt = WordArray.random(8));
            var key = EvpKDF.create({
              keySize: keySize + ivSize
            }).compute(password, salt);
            var iv = WordArray.create(key.words.slice(keySize), 4 * ivSize);
            key.sigBytes = 4 * keySize;
            return CipherParams.create({
              key: key,
              iv: iv,
              salt: salt
            });
          }
        };
        var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
          cfg: SerializableCipher.cfg.extend({
            kdf: OpenSSLKdf
          }),
          encrypt: function encrypt(cipher, message, password, cfg) {
            cfg = this.cfg.extend(cfg);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
            cfg.iv = derivedParams.iv;
            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
            ciphertext.mixIn(derivedParams);
            return ciphertext;
          },
          decrypt: function decrypt(cipher, ciphertext, password, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
            cfg.iv = derivedParams.iv;
            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
            return plaintext;
          }
        });
      }();
      CryptoJS.mode.CFB = function() {
        var CFB = CryptoJS.lib.BlockCipherMode.extend();
        CFB.Encryptor = CFB.extend({
          processBlock: function processBlock(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = words.slice(offset, offset + blockSize);
          }
        });
        CFB.Decryptor = CFB.extend({
          processBlock: function processBlock(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var thisBlock = words.slice(offset, offset + blockSize);
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = thisBlock;
          }
        });
        function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
          var iv = this._iv;
          if (iv) {
            var keystream = iv.slice(0);
            this._iv = void 0;
          } else var keystream = this._prevBlock;
          cipher.encryptBlock(keystream, 0);
          for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
        }
        return CFB;
      }();
      CryptoJS.mode.ECB = function() {
        var ECB = CryptoJS.lib.BlockCipherMode.extend();
        ECB.Encryptor = ECB.extend({
          processBlock: function processBlock(words, offset) {
            this._cipher.encryptBlock(words, offset);
          }
        });
        ECB.Decryptor = ECB.extend({
          processBlock: function processBlock(words, offset) {
            this._cipher.decryptBlock(words, offset);
          }
        });
        return ECB;
      }();
      CryptoJS.pad.AnsiX923 = {
        pad: function pad(data, blockSize) {
          var dataSigBytes = data.sigBytes;
          var blockSizeBytes = 4 * blockSize;
          var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
          var lastBytePos = dataSigBytes + nPaddingBytes - 1;
          data.clamp();
          data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
          data.sigBytes += nPaddingBytes;
        },
        unpad: function unpad(data) {
          var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
          data.sigBytes -= nPaddingBytes;
        }
      };
      CryptoJS.pad.Iso10126 = {
        pad: function pad(data, blockSize) {
          var blockSizeBytes = 4 * blockSize;
          var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
          data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([ nPaddingBytes << 24 ], 1));
        },
        unpad: function unpad(data) {
          var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
          data.sigBytes -= nPaddingBytes;
        }
      };
      CryptoJS.pad.Iso97971 = {
        pad: function pad(data, blockSize) {
          data.concat(CryptoJS.lib.WordArray.create([ 2147483648 ], 1));
          CryptoJS.pad.ZeroPadding.pad(data, blockSize);
        },
        unpad: function unpad(data) {
          CryptoJS.pad.ZeroPadding.unpad(data);
          data.sigBytes--;
        }
      };
      CryptoJS.mode.OFB = function() {
        var OFB = CryptoJS.lib.BlockCipherMode.extend();
        var Encryptor = OFB.Encryptor = OFB.extend({
          processBlock: function processBlock(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var keystream = this._keystream;
            if (iv) {
              keystream = this._keystream = iv.slice(0);
              this._iv = void 0;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
          }
        });
        OFB.Decryptor = Encryptor;
        return OFB;
      }();
      CryptoJS.pad.NoPadding = {
        pad: function pad() {},
        unpad: function unpad() {}
      };
      (function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var CipherParams = C_lib.CipherParams;
        var C_enc = C.enc;
        var Hex = C_enc.Hex;
        var C_format = C.format;
        var HexFormatter = C_format.Hex = {
          stringify: function stringify(cipherParams) {
            return cipherParams.ciphertext.toString(Hex);
          },
          parse: function parse(input) {
            var ciphertext = Hex.parse(input);
            return CipherParams.create({
              ciphertext: ciphertext
            });
          }
        };
      })();
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var SBOX = [];
        var INV_SBOX = [];
        var SUB_MIX_0 = [];
        var SUB_MIX_1 = [];
        var SUB_MIX_2 = [];
        var SUB_MIX_3 = [];
        var INV_SUB_MIX_0 = [];
        var INV_SUB_MIX_1 = [];
        var INV_SUB_MIX_2 = [];
        var INV_SUB_MIX_3 = [];
        (function() {
          var d = [];
          for (var i = 0; i < 256; i++) d[i] = i < 128 ? i << 1 : i << 1 ^ 283;
          var x = 0;
          var xi = 0;
          for (var i = 0; i < 256; i++) {
            var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
            sx = sx >>> 8 ^ 255 & sx ^ 99;
            SBOX[x] = sx;
            INV_SBOX[sx] = x;
            var x2 = d[x];
            var x4 = d[x2];
            var x8 = d[x4];
            var t = 257 * d[sx] ^ 16843008 * sx;
            SUB_MIX_0[x] = t << 24 | t >>> 8;
            SUB_MIX_1[x] = t << 16 | t >>> 16;
            SUB_MIX_2[x] = t << 8 | t >>> 24;
            SUB_MIX_3[x] = t;
            var t = 16843009 * x8 ^ 65537 * x4 ^ 257 * x2 ^ 16843008 * x;
            INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
            INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
            INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
            INV_SUB_MIX_3[sx] = t;
            if (x) {
              x = x2 ^ d[d[d[x8 ^ x2]]];
              xi ^= d[d[xi]];
            } else x = xi = 1;
          }
        })();
        var RCON = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ];
        var AES = C_algo.AES = BlockCipher.extend({
          _doReset: function _doReset() {
            if (this._nRounds && this._keyPriorReset === this._key) return;
            var key = this._keyPriorReset = this._key;
            var keyWords = key.words;
            var keySize = key.sigBytes / 4;
            var nRounds = this._nRounds = keySize + 6;
            var ksRows = 4 * (nRounds + 1);
            var keySchedule = this._keySchedule = [];
            for (var ksRow = 0; ksRow < ksRows; ksRow++) if (ksRow < keySize) keySchedule[ksRow] = keyWords[ksRow]; else {
              var t = keySchedule[ksRow - 1];
              if (ksRow % keySize) keySize > 6 && ksRow % keySize == 4 && (t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[255 & t]); else {
                t = t << 8 | t >>> 24;
                t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[255 & t];
                t ^= RCON[ksRow / keySize | 0] << 24;
              }
              keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
            }
            var invKeySchedule = this._invKeySchedule = [];
            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
              var ksRow = ksRows - invKsRow;
              if (invKsRow % 4) var t = keySchedule[ksRow]; else var t = keySchedule[ksRow - 4];
              invKeySchedule[invKsRow] = invKsRow < 4 || ksRow <= 4 ? t : INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[255 & t]];
            }
          },
          encryptBlock: function encryptBlock(M, offset) {
            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
          },
          decryptBlock: function decryptBlock(M, offset) {
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
          },
          _doCryptBlock: function _doCryptBlock(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
            var nRounds = this._nRounds;
            var s0 = M[offset] ^ keySchedule[0];
            var s1 = M[offset + 1] ^ keySchedule[1];
            var s2 = M[offset + 2] ^ keySchedule[2];
            var s3 = M[offset + 3] ^ keySchedule[3];
            var ksRow = 4;
            for (var round = 1; round < nRounds; round++) {
              var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 255] ^ SUB_MIX_2[s2 >>> 8 & 255] ^ SUB_MIX_3[255 & s3] ^ keySchedule[ksRow++];
              var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 255] ^ SUB_MIX_2[s3 >>> 8 & 255] ^ SUB_MIX_3[255 & s0] ^ keySchedule[ksRow++];
              var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 255] ^ SUB_MIX_2[s0 >>> 8 & 255] ^ SUB_MIX_3[255 & s1] ^ keySchedule[ksRow++];
              var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 255] ^ SUB_MIX_2[s1 >>> 8 & 255] ^ SUB_MIX_3[255 & s2] ^ keySchedule[ksRow++];
              s0 = t0;
              s1 = t1;
              s2 = t2;
              s3 = t3;
            }
            var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 255] << 16 | SBOX[s2 >>> 8 & 255] << 8 | SBOX[255 & s3]) ^ keySchedule[ksRow++];
            var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 255] << 16 | SBOX[s3 >>> 8 & 255] << 8 | SBOX[255 & s0]) ^ keySchedule[ksRow++];
            var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 255] << 16 | SBOX[s0 >>> 8 & 255] << 8 | SBOX[255 & s1]) ^ keySchedule[ksRow++];
            var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 255] << 16 | SBOX[s1 >>> 8 & 255] << 8 | SBOX[255 & s2]) ^ keySchedule[ksRow++];
            M[offset] = t0;
            M[offset + 1] = t1;
            M[offset + 2] = t2;
            M[offset + 3] = t3;
          },
          keySize: 8
        });
        C.AES = BlockCipher._createHelper(AES);
      })();
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var PC1 = [ 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4 ];
        var PC2 = [ 14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32 ];
        var BIT_SHIFTS = [ 1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28 ];
        var SBOX_P = [ {
          0: 8421888,
          268435456: 32768,
          536870912: 8421378,
          805306368: 2,
          1073741824: 512,
          1342177280: 8421890,
          1610612736: 8389122,
          1879048192: 8388608,
          2147483648: 514,
          2415919104: 8389120,
          2684354560: 33280,
          2952790016: 8421376,
          3221225472: 32770,
          3489660928: 8388610,
          3758096384: 0,
          4026531840: 33282,
          134217728: 0,
          402653184: 8421890,
          671088640: 33282,
          939524096: 32768,
          1207959552: 8421888,
          1476395008: 512,
          1744830464: 8421378,
          2013265920: 2,
          2281701376: 8389120,
          2550136832: 33280,
          2818572288: 8421376,
          3087007744: 8389122,
          3355443200: 8388610,
          3623878656: 32770,
          3892314112: 514,
          4160749568: 8388608,
          1: 32768,
          268435457: 2,
          536870913: 8421888,
          805306369: 8388608,
          1073741825: 8421378,
          1342177281: 33280,
          1610612737: 512,
          1879048193: 8389122,
          2147483649: 8421890,
          2415919105: 8421376,
          2684354561: 8388610,
          2952790017: 33282,
          3221225473: 514,
          3489660929: 8389120,
          3758096385: 32770,
          4026531841: 0,
          134217729: 8421890,
          402653185: 8421376,
          671088641: 8388608,
          939524097: 512,
          1207959553: 32768,
          1476395009: 8388610,
          1744830465: 2,
          2013265921: 33282,
          2281701377: 32770,
          2550136833: 8389122,
          2818572289: 514,
          3087007745: 8421888,
          3355443201: 8389120,
          3623878657: 0,
          3892314113: 33280,
          4160749569: 8421378
        }, {
          0: 1074282512,
          16777216: 16384,
          33554432: 524288,
          50331648: 1074266128,
          67108864: 1073741840,
          83886080: 1074282496,
          100663296: 1073758208,
          117440512: 16,
          134217728: 540672,
          150994944: 1073758224,
          167772160: 1073741824,
          184549376: 540688,
          201326592: 524304,
          218103808: 0,
          234881024: 16400,
          251658240: 1074266112,
          8388608: 1073758208,
          25165824: 540688,
          41943040: 16,
          58720256: 1073758224,
          75497472: 1074282512,
          92274688: 1073741824,
          109051904: 524288,
          125829120: 1074266128,
          142606336: 524304,
          159383552: 0,
          176160768: 16384,
          192937984: 1074266112,
          209715200: 1073741840,
          226492416: 540672,
          243269632: 1074282496,
          260046848: 16400,
          268435456: 0,
          285212672: 1074266128,
          301989888: 1073758224,
          318767104: 1074282496,
          335544320: 1074266112,
          352321536: 16,
          369098752: 540688,
          385875968: 16384,
          402653184: 16400,
          419430400: 524288,
          436207616: 524304,
          452984832: 1073741840,
          469762048: 540672,
          486539264: 1073758208,
          503316480: 1073741824,
          520093696: 1074282512,
          276824064: 540688,
          293601280: 524288,
          310378496: 1074266112,
          327155712: 16384,
          343932928: 1073758208,
          360710144: 1074282512,
          377487360: 16,
          394264576: 1073741824,
          411041792: 1074282496,
          427819008: 1073741840,
          444596224: 1073758224,
          461373440: 524304,
          478150656: 0,
          494927872: 16400,
          511705088: 1074266128,
          528482304: 540672
        }, {
          0: 260,
          1048576: 0,
          2097152: 67109120,
          3145728: 65796,
          4194304: 65540,
          5242880: 67108868,
          6291456: 67174660,
          7340032: 67174400,
          8388608: 67108864,
          9437184: 67174656,
          10485760: 65792,
          11534336: 67174404,
          12582912: 67109124,
          13631488: 65536,
          14680064: 4,
          15728640: 256,
          524288: 67174656,
          1572864: 67174404,
          2621440: 0,
          3670016: 67109120,
          4718592: 67108868,
          5767168: 65536,
          6815744: 65540,
          7864320: 260,
          8912896: 4,
          9961472: 256,
          11010048: 67174400,
          12058624: 65796,
          13107200: 65792,
          14155776: 67109124,
          15204352: 67174660,
          16252928: 67108864,
          16777216: 67174656,
          17825792: 65540,
          18874368: 65536,
          19922944: 67109120,
          20971520: 256,
          22020096: 67174660,
          23068672: 67108868,
          24117248: 0,
          25165824: 67109124,
          26214400: 67108864,
          27262976: 4,
          28311552: 65792,
          29360128: 67174400,
          30408704: 260,
          31457280: 65796,
          32505856: 67174404,
          17301504: 67108864,
          18350080: 260,
          19398656: 67174656,
          20447232: 0,
          21495808: 65540,
          22544384: 67109120,
          23592960: 256,
          24641536: 67174404,
          25690112: 65536,
          26738688: 67174660,
          27787264: 65796,
          28835840: 67108868,
          29884416: 67109124,
          30932992: 67174400,
          31981568: 4,
          33030144: 65792
        }, {
          0: 2151682048,
          65536: 2147487808,
          131072: 4198464,
          196608: 2151677952,
          262144: 0,
          327680: 4198400,
          393216: 2147483712,
          458752: 4194368,
          524288: 2147483648,
          589824: 4194304,
          655360: 64,
          720896: 2147487744,
          786432: 2151678016,
          851968: 4160,
          917504: 4096,
          983040: 2151682112,
          32768: 2147487808,
          98304: 64,
          163840: 2151678016,
          229376: 2147487744,
          294912: 4198400,
          360448: 2151682112,
          425984: 0,
          491520: 2151677952,
          557056: 4096,
          622592: 2151682048,
          688128: 4194304,
          753664: 4160,
          819200: 2147483648,
          884736: 4194368,
          950272: 4198464,
          1015808: 2147483712,
          1048576: 4194368,
          1114112: 4198400,
          1179648: 2147483712,
          1245184: 0,
          1310720: 4160,
          1376256: 2151678016,
          1441792: 2151682048,
          1507328: 2147487808,
          1572864: 2151682112,
          1638400: 2147483648,
          1703936: 2151677952,
          1769472: 4198464,
          1835008: 2147487744,
          1900544: 4194304,
          1966080: 64,
          2031616: 4096,
          1081344: 2151677952,
          1146880: 2151682112,
          1212416: 0,
          1277952: 4198400,
          1343488: 4194368,
          1409024: 2147483648,
          1474560: 2147487808,
          1540096: 64,
          1605632: 2147483712,
          1671168: 4096,
          1736704: 2147487744,
          1802240: 2151678016,
          1867776: 4160,
          1933312: 2151682048,
          1998848: 4194304,
          2064384: 4198464
        }, {
          0: 128,
          4096: 17039360,
          8192: 262144,
          12288: 536870912,
          16384: 537133184,
          20480: 16777344,
          24576: 553648256,
          28672: 262272,
          32768: 16777216,
          36864: 537133056,
          40960: 536871040,
          45056: 553910400,
          49152: 553910272,
          53248: 0,
          57344: 17039488,
          61440: 553648128,
          2048: 17039488,
          6144: 553648256,
          10240: 128,
          14336: 17039360,
          18432: 262144,
          22528: 537133184,
          26624: 553910272,
          30720: 536870912,
          34816: 537133056,
          38912: 0,
          43008: 553910400,
          47104: 16777344,
          51200: 536871040,
          55296: 553648128,
          59392: 16777216,
          63488: 262272,
          65536: 262144,
          69632: 128,
          73728: 536870912,
          77824: 553648256,
          81920: 16777344,
          86016: 553910272,
          90112: 537133184,
          94208: 16777216,
          98304: 553910400,
          102400: 553648128,
          106496: 17039360,
          110592: 537133056,
          114688: 262272,
          118784: 536871040,
          122880: 0,
          126976: 17039488,
          67584: 553648256,
          71680: 16777216,
          75776: 17039360,
          79872: 537133184,
          83968: 536870912,
          88064: 17039488,
          92160: 128,
          96256: 553910272,
          100352: 262272,
          104448: 553910400,
          108544: 0,
          112640: 553648128,
          116736: 16777344,
          120832: 262144,
          124928: 537133056,
          129024: 536871040
        }, {
          0: 268435464,
          256: 8192,
          512: 270532608,
          768: 270540808,
          1024: 268443648,
          1280: 2097152,
          1536: 2097160,
          1792: 268435456,
          2048: 0,
          2304: 268443656,
          2560: 2105344,
          2816: 8,
          3072: 270532616,
          3328: 2105352,
          3584: 8200,
          3840: 270540800,
          128: 270532608,
          384: 270540808,
          640: 8,
          896: 2097152,
          1152: 2105352,
          1408: 268435464,
          1664: 268443648,
          1920: 8200,
          2176: 2097160,
          2432: 8192,
          2688: 268443656,
          2944: 270532616,
          3200: 0,
          3456: 270540800,
          3712: 2105344,
          3968: 268435456,
          4096: 268443648,
          4352: 270532616,
          4608: 270540808,
          4864: 8200,
          5120: 2097152,
          5376: 268435456,
          5632: 268435464,
          5888: 2105344,
          6144: 2105352,
          6400: 0,
          6656: 8,
          6912: 270532608,
          7168: 8192,
          7424: 268443656,
          7680: 270540800,
          7936: 2097160,
          4224: 8,
          4480: 2105344,
          4736: 2097152,
          4992: 268435464,
          5248: 268443648,
          5504: 8200,
          5760: 270540808,
          6016: 270532608,
          6272: 270540800,
          6528: 270532616,
          6784: 8192,
          7040: 2105352,
          7296: 2097160,
          7552: 0,
          7808: 268435456,
          8064: 268443656
        }, {
          0: 1048576,
          16: 33555457,
          32: 1024,
          48: 1049601,
          64: 34604033,
          80: 0,
          96: 1,
          112: 34603009,
          128: 33555456,
          144: 1048577,
          160: 33554433,
          176: 34604032,
          192: 34603008,
          208: 1025,
          224: 1049600,
          240: 33554432,
          8: 34603009,
          24: 0,
          40: 33555457,
          56: 34604032,
          72: 1048576,
          88: 33554433,
          104: 33554432,
          120: 1025,
          136: 1049601,
          152: 33555456,
          168: 34603008,
          184: 1048577,
          200: 1024,
          216: 34604033,
          232: 1,
          248: 1049600,
          256: 33554432,
          272: 1048576,
          288: 33555457,
          304: 34603009,
          320: 1048577,
          336: 33555456,
          352: 34604032,
          368: 1049601,
          384: 1025,
          400: 34604033,
          416: 1049600,
          432: 1,
          448: 0,
          464: 34603008,
          480: 33554433,
          496: 1024,
          264: 1049600,
          280: 33555457,
          296: 34603009,
          312: 1,
          328: 33554432,
          344: 1048576,
          360: 1025,
          376: 34604032,
          392: 33554433,
          408: 34603008,
          424: 0,
          440: 34604033,
          456: 1049601,
          472: 1024,
          488: 33555456,
          504: 1048577
        }, {
          0: 134219808,
          1: 131072,
          2: 134217728,
          3: 32,
          4: 131104,
          5: 134350880,
          6: 134350848,
          7: 2048,
          8: 134348800,
          9: 134219776,
          10: 133120,
          11: 134348832,
          12: 2080,
          13: 0,
          14: 134217760,
          15: 133152,
          2147483648: 2048,
          2147483649: 134350880,
          2147483650: 134219808,
          2147483651: 134217728,
          2147483652: 134348800,
          2147483653: 133120,
          2147483654: 133152,
          2147483655: 32,
          2147483656: 134217760,
          2147483657: 2080,
          2147483658: 131104,
          2147483659: 134350848,
          2147483660: 0,
          2147483661: 134348832,
          2147483662: 134219776,
          2147483663: 131072,
          16: 133152,
          17: 134350848,
          18: 32,
          19: 2048,
          20: 134219776,
          21: 134217760,
          22: 134348832,
          23: 131072,
          24: 0,
          25: 131104,
          26: 134348800,
          27: 134219808,
          28: 134350880,
          29: 133120,
          30: 2080,
          31: 134217728,
          2147483664: 131072,
          2147483665: 2048,
          2147483666: 134348832,
          2147483667: 133152,
          2147483668: 32,
          2147483669: 134348800,
          2147483670: 134217728,
          2147483671: 134219808,
          2147483672: 134350880,
          2147483673: 134217760,
          2147483674: 134219776,
          2147483675: 0,
          2147483676: 133120,
          2147483677: 2080,
          2147483678: 131104,
          2147483679: 134350848
        } ];
        var SBOX_MASK = [ 4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679 ];
        var DES = C_algo.DES = BlockCipher.extend({
          _doReset: function _doReset() {
            var key = this._key;
            var keyWords = key.words;
            var keyBits = [];
            for (var i = 0; i < 56; i++) {
              var keyBitPos = PC1[i] - 1;
              keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
            }
            var subKeys = this._subKeys = [];
            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
              var subKey = subKeys[nSubKey] = [];
              var bitShift = BIT_SHIFTS[nSubKey];
              for (var i = 0; i < 24; i++) {
                subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;
                subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
              }
              subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
              for (var i = 1; i < 7; i++) subKey[i] = subKey[i] >>> 4 * (i - 1) + 3;
              subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
            }
            var invSubKeys = this._invSubKeys = [];
            for (var i = 0; i < 16; i++) invSubKeys[i] = subKeys[15 - i];
          },
          encryptBlock: function encryptBlock(M, offset) {
            this._doCryptBlock(M, offset, this._subKeys);
          },
          decryptBlock: function decryptBlock(M, offset) {
            this._doCryptBlock(M, offset, this._invSubKeys);
          },
          _doCryptBlock: function _doCryptBlock(M, offset, subKeys) {
            this._lBlock = M[offset];
            this._rBlock = M[offset + 1];
            exchangeLR.call(this, 4, 252645135);
            exchangeLR.call(this, 16, 65535);
            exchangeRL.call(this, 2, 858993459);
            exchangeRL.call(this, 8, 16711935);
            exchangeLR.call(this, 1, 1431655765);
            for (var round = 0; round < 16; round++) {
              var subKey = subKeys[round];
              var lBlock = this._lBlock;
              var rBlock = this._rBlock;
              var f = 0;
              for (var i = 0; i < 8; i++) f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
              this._lBlock = rBlock;
              this._rBlock = lBlock ^ f;
            }
            var t = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = t;
            exchangeLR.call(this, 1, 1431655765);
            exchangeRL.call(this, 8, 16711935);
            exchangeRL.call(this, 2, 858993459);
            exchangeLR.call(this, 16, 65535);
            exchangeLR.call(this, 4, 252645135);
            M[offset] = this._lBlock;
            M[offset + 1] = this._rBlock;
          },
          keySize: 2,
          ivSize: 2,
          blockSize: 2
        });
        function exchangeLR(offset, mask) {
          var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
          this._rBlock ^= t;
          this._lBlock ^= t << offset;
        }
        function exchangeRL(offset, mask) {
          var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
          this._lBlock ^= t;
          this._rBlock ^= t << offset;
        }
        C.DES = BlockCipher._createHelper(DES);
        var TripleDES = C_algo.TripleDES = BlockCipher.extend({
          _doReset: function _doReset() {
            var key = this._key;
            var keyWords = key.words;
            this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
            this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
            this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
          },
          encryptBlock: function encryptBlock(M, offset) {
            this._des1.encryptBlock(M, offset);
            this._des2.decryptBlock(M, offset);
            this._des3.encryptBlock(M, offset);
          },
          decryptBlock: function decryptBlock(M, offset) {
            this._des3.decryptBlock(M, offset);
            this._des2.encryptBlock(M, offset);
            this._des1.decryptBlock(M, offset);
          },
          keySize: 6,
          ivSize: 2,
          blockSize: 2
        });
        C.TripleDES = BlockCipher._createHelper(TripleDES);
      })();
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var RC4 = C_algo.RC4 = StreamCipher.extend({
          _doReset: function _doReset() {
            var key = this._key;
            var keyWords = key.words;
            var keySigBytes = key.sigBytes;
            var S = this._S = [];
            for (var i = 0; i < 256; i++) S[i] = i;
            for (var i = 0, j = 0; i < 256; i++) {
              var keyByteIndex = i % keySigBytes;
              var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
              j = (j + S[i] + keyByte) % 256;
              var t = S[i];
              S[i] = S[j];
              S[j] = t;
            }
            this._i = this._j = 0;
          },
          _doProcessBlock: function _doProcessBlock(M, offset) {
            M[offset] ^= generateKeystreamWord.call(this);
          },
          keySize: 8,
          ivSize: 0
        });
        function generateKeystreamWord() {
          var S = this._S;
          var i = this._i;
          var j = this._j;
          var keystreamWord = 0;
          for (var n = 0; n < 4; n++) {
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            var t = S[i];
            S[i] = S[j];
            S[j] = t;
            keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - 8 * n;
          }
          this._i = i;
          this._j = j;
          return keystreamWord;
        }
        C.RC4 = StreamCipher._createHelper(RC4);
        var RC4Drop = C_algo.RC4Drop = RC4.extend({
          cfg: RC4.cfg.extend({
            drop: 192
          }),
          _doReset: function _doReset() {
            RC4._doReset.call(this);
            for (var i = this.cfg.drop; i > 0; i--) generateKeystreamWord.call(this);
          }
        });
        C.RC4Drop = StreamCipher._createHelper(RC4Drop);
      })();
      CryptoJS.mode.CTRGladman = function() {
        var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
        function incWord(word) {
          if (255 === (word >> 24 & 255)) {
            var b1 = word >> 16 & 255;
            var b2 = word >> 8 & 255;
            var b3 = 255 & word;
            if (255 === b1) {
              b1 = 0;
              if (255 === b2) {
                b2 = 0;
                255 === b3 ? b3 = 0 : ++b3;
              } else ++b2;
            } else ++b1;
            word = 0;
            word += b1 << 16;
            word += b2 << 8;
            word += b3;
          } else word += 1 << 24;
          return word;
        }
        function incCounter(counter) {
          0 === (counter[0] = incWord(counter[0])) && (counter[1] = incWord(counter[1]));
          return counter;
        }
        var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
          processBlock: function processBlock(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
              counter = this._counter = iv.slice(0);
              this._iv = void 0;
            }
            incCounter(counter);
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
          }
        });
        CTRGladman.Decryptor = Encryptor;
        return CTRGladman;
      }();
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var Rabbit = C_algo.Rabbit = StreamCipher.extend({
          _doReset: function _doReset() {
            var K = this._key.words;
            var iv = this.cfg.iv;
            for (var i = 0; i < 4; i++) K[i] = 16711935 & (K[i] << 8 | K[i] >>> 24) | 4278255360 & (K[i] << 24 | K[i] >>> 8);
            var X = this._X = [ K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16 ];
            var C = this._C = [ K[2] << 16 | K[2] >>> 16, 4294901760 & K[0] | 65535 & K[1], K[3] << 16 | K[3] >>> 16, 4294901760 & K[1] | 65535 & K[2], K[0] << 16 | K[0] >>> 16, 4294901760 & K[2] | 65535 & K[3], K[1] << 16 | K[1] >>> 16, 4294901760 & K[3] | 65535 & K[0] ];
            this._b = 0;
            for (var i = 0; i < 4; i++) nextState.call(this);
            for (var i = 0; i < 8; i++) C[i] ^= X[i + 4 & 7];
            if (iv) {
              var IV = iv.words;
              var IV_0 = IV[0];
              var IV_1 = IV[1];
              var i0 = 16711935 & (IV_0 << 8 | IV_0 >>> 24) | 4278255360 & (IV_0 << 24 | IV_0 >>> 8);
              var i2 = 16711935 & (IV_1 << 8 | IV_1 >>> 24) | 4278255360 & (IV_1 << 24 | IV_1 >>> 8);
              var i1 = i0 >>> 16 | 4294901760 & i2;
              var i3 = i2 << 16 | 65535 & i0;
              C[0] ^= i0;
              C[1] ^= i1;
              C[2] ^= i2;
              C[3] ^= i3;
              C[4] ^= i0;
              C[5] ^= i1;
              C[6] ^= i2;
              C[7] ^= i3;
              for (var i = 0; i < 4; i++) nextState.call(this);
            }
          },
          _doProcessBlock: function _doProcessBlock(M, offset) {
            var X = this._X;
            nextState.call(this);
            S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
            S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
            S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
            S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
            for (var i = 0; i < 4; i++) {
              S[i] = 16711935 & (S[i] << 8 | S[i] >>> 24) | 4278255360 & (S[i] << 24 | S[i] >>> 8);
              M[offset + i] ^= S[i];
            }
          },
          blockSize: 4,
          ivSize: 2
        });
        function nextState() {
          var X = this._X;
          var C = this._C;
          for (var i = 0; i < 8; i++) C_[i] = C[i];
          C[0] = C[0] + 1295307597 + this._b | 0;
          C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
          C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
          C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
          C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
          C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
          C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
          C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
          this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
          for (var i = 0; i < 8; i++) {
            var gx = X[i] + C[i];
            var ga = 65535 & gx;
            var gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
            var gl = ((4294901760 & gx) * gx | 0) + ((65535 & gx) * gx | 0);
            G[i] = gh ^ gl;
          }
          X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
          X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
          X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
          X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
          X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
          X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
          X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
          X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        C.Rabbit = StreamCipher._createHelper(Rabbit);
      })();
      CryptoJS.mode.CTR = function() {
        var CTR = CryptoJS.lib.BlockCipherMode.extend();
        var Encryptor = CTR.Encryptor = CTR.extend({
          processBlock: function processBlock(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
              counter = this._counter = iv.slice(0);
              this._iv = void 0;
            }
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
            for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
          }
        });
        CTR.Decryptor = Encryptor;
        return CTR;
      }();
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
          _doReset: function _doReset() {
            var K = this._key.words;
            var iv = this.cfg.iv;
            var X = this._X = [ K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16 ];
            var C = this._C = [ K[2] << 16 | K[2] >>> 16, 4294901760 & K[0] | 65535 & K[1], K[3] << 16 | K[3] >>> 16, 4294901760 & K[1] | 65535 & K[2], K[0] << 16 | K[0] >>> 16, 4294901760 & K[2] | 65535 & K[3], K[1] << 16 | K[1] >>> 16, 4294901760 & K[3] | 65535 & K[0] ];
            this._b = 0;
            for (var i = 0; i < 4; i++) nextState.call(this);
            for (var i = 0; i < 8; i++) C[i] ^= X[i + 4 & 7];
            if (iv) {
              var IV = iv.words;
              var IV_0 = IV[0];
              var IV_1 = IV[1];
              var i0 = 16711935 & (IV_0 << 8 | IV_0 >>> 24) | 4278255360 & (IV_0 << 24 | IV_0 >>> 8);
              var i2 = 16711935 & (IV_1 << 8 | IV_1 >>> 24) | 4278255360 & (IV_1 << 24 | IV_1 >>> 8);
              var i1 = i0 >>> 16 | 4294901760 & i2;
              var i3 = i2 << 16 | 65535 & i0;
              C[0] ^= i0;
              C[1] ^= i1;
              C[2] ^= i2;
              C[3] ^= i3;
              C[4] ^= i0;
              C[5] ^= i1;
              C[6] ^= i2;
              C[7] ^= i3;
              for (var i = 0; i < 4; i++) nextState.call(this);
            }
          },
          _doProcessBlock: function _doProcessBlock(M, offset) {
            var X = this._X;
            nextState.call(this);
            S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
            S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
            S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
            S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
            for (var i = 0; i < 4; i++) {
              S[i] = 16711935 & (S[i] << 8 | S[i] >>> 24) | 4278255360 & (S[i] << 24 | S[i] >>> 8);
              M[offset + i] ^= S[i];
            }
          },
          blockSize: 4,
          ivSize: 2
        });
        function nextState() {
          var X = this._X;
          var C = this._C;
          for (var i = 0; i < 8; i++) C_[i] = C[i];
          C[0] = C[0] + 1295307597 + this._b | 0;
          C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
          C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
          C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
          C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
          C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
          C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
          C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
          this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
          for (var i = 0; i < 8; i++) {
            var gx = X[i] + C[i];
            var ga = 65535 & gx;
            var gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
            var gl = ((4294901760 & gx) * gx | 0) + ((65535 & gx) * gx | 0);
            G[i] = gh ^ gl;
          }
          X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
          X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
          X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
          X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
          X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
          X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
          X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
          X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
      })();
      CryptoJS.pad.ZeroPadding = {
        pad: function pad(data, blockSize) {
          var blockSizeBytes = 4 * blockSize;
          data.clamp();
          data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
        },
        unpad: function unpad(data) {
          var dataWords = data.words;
          var i = data.sigBytes - 1;
          while (!(dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255)) i--;
          data.sigBytes = i + 1;
        }
      };
      return CryptoJS;
    });
    cc._RF.pop();
  }, {} ],
  crypt: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "98dac3+SJhLVI0MvhRZ87Fb", "crypt");
    "use strict";
    var CryptoJS = require("crypto-js");
    var crypt = {};
    crypt.md5 = function(str) {
      return CryptoJS.MD5(str).toString();
    };
    crypt.encode = function(str, key) {
      try {
        str = JSON.stringify(str);
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.AES.encrypt(str, keyHex, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
        return encodeURIComponent(CryptoJS.enc.Base64.stringify(encrypted.ciphertext));
      } catch (err) {
        console.warn("crypt.encode", err);
        return;
      }
    };
    crypt.decode = function(str, key) {
      try {
        str = decodeURIComponent(str);
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var decrypted = CryptoJS.AES.decrypt({
          ciphertext: CryptoJS.enc.Base64.parse(str)
        }, keyHex, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      } catch (err) {
        console.warn("crypt.decode", err);
        return;
      }
    };
    module.exports = crypt;
    cc._RF.pop();
  }, {
    "crypto-js": "crypto-js"
  } ],
  dataModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5ad37Y1cUNGfp57tMULQVQW", "dataModel");
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
    module.exports = {
      init: function init(param) {
        param = _extends({}, {
          account: "",
          isGuest: false,
          api: ""
        }, param);
        var data;
        console.log("enter data model ... ", param);
        var defData = null;
        var tempDefData = this.getDefData();
        if (param.player) {
          param.player.setting || (param.player.setting = tempDefData.setting);
          param.player.timeCount = tempDefData.timeCount;
          defData = param.player;
        } else defData = tempDefData;
        H.isEmpty(data) && (data = _extends({}, {}, defData));
        data.player.account = param.account;
        data.player.uid = param.account;
        data.player.api = param.api;
        param.isGuest && (data.player.isGuest = param.isGuest);
        var sysInfo = H.sysInfo();
        this.sysInfo = {};
        this.sysInfo.os = sysInfo.os;
        this.sysInfo.language = sysInfo.language;
        this.player = _extends({}, defData.player, data.player);
        this.fight = _extends({}, defData.fight, data.fight);
        this.roles = data.roles;
        this.equips = data.equips;
        this.skill = data.skill;
        console.log("init equips ... ", data.equips);
        this.chip = data.chip;
        this.prop = _extends({}, defData.prop, data.prop);
        this.timeCount = _extends({}, defData.timeCount, data.timeCount);
        this.achive = _extends({}, defData.achive, data.achive);
        this.setting = _extends({}, defData.setting, data.setting);
        this.upType = "ATK";
        console.log("Data model ... 1", this.achive, defData.achive, data.achive);
        for (var key in this.timeCount) key in defData.timeCount || delete this.timeCount[key];
        console.log("Data model ... 2");
        for (var _key in defData.timeCount) _key in this.timeCount || (this.timeCount[_key] = defData.timeCount[_key]);
        M("achive").init();
        console.log("Data model ... 3");
        cc.log("data", this);
      },
      getDefData: function getDefData() {
        return {
          player: {
            uid: H.uid(),
            sid: H.uid(10),
            parentSid: "",
            childSids: [],
            hideTime: 0,
            dataTime: 0,
            uploadTime: 0,
            createTime: H.time()
          },
          fight: {
            level: 1,
            selectLevel: 1
          },
          roles: [ {
            asset: "allianceGuard",
            HPLevel: 0,
            ATKLevel: 0,
            selected: true
          } ],
          equips: [],
          skill: {},
          chip: {
            role: {},
            skill: {}
          },
          prop: {
            gold: 0,
            equipNum: 0
          },
          timeCount: {
            adBox: 900,
            uploadData: 21600
          },
          achive: {},
          setting: {
            frameRate: 60,
            gameCenter: true,
            openEquip: {
              rank: "*",
              star: "*"
            },
            audio: {
              music: true,
              effect: true
            }
          }
        };
      },
      getPlayDay: function getPlayDay() {
        var diff = H.time() - this.player.createTime;
        var day = 86400;
        day = Math.floor(diff / day);
        day < 1 && (day = 1);
        return day;
      },
      getSaveData: function getSaveData() {
        var data = {};
        for (var key in this) "function" != typeof this[key] && -1 == key.indexOf("_") && (data[key] = H.clone(this[key]));
        return data;
      },
      save: function save() {},
      delData: function delData() {
        this.player.isGuest ? S("guest", null) : S("data_" + this.player.account, null);
      },
      setChip: function setChip(type, asset, action, val) {
        void 0 === action && (action = "+");
        val = H.num(val);
        asset in this.chip[type] || (this.chip[type][asset] = 0);
        "+" == action && (this.chip[type][asset] += val);
        "-" == action && (this.chip[type][asset] -= val);
        "=" == action && (this.chip[type][asset] = val);
        "-" != action && "=" != action || this.chip[type][asset] < 0 && (this.chip[type][asset] = 0);
      },
      getCache: function getCache(account) {
        return S("data_" + account);
      },
      setCache: function setCache(data) {
        if (!data) return;
        if (!data.player) return;
        S("data_" + data.player.account, data);
      }
    };
    cc._RF.pop();
  }, {} ],
  dropPropMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1e1b2ga16BKRa5zd3LOTBZ/", "dropPropMgr");
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
    module.exports = {
      init: function init(param) {
        param = _extends({}, {
          parent1Node: null,
          parent2Node: null,
          player: null
        }, param);
        this.parent1Node = param.parent1Node;
        this.parent2Node = param.parent2Node;
        this.player = param.player;
        this.items = [];
      },
      create: function create(param) {
        param = _extends({}, {
          name: "",
          by: null,
          layer: 1
        }, param);
        var parentNode = this.parent1Node;
        2 == param.param && (parentNode = this.parent2Node);
        var prefab = app.getPrefab(param.name);
        var node = G("pool").get(prefab, "dropProp" + param.name);
        node.parent = parentNode;
        if (param.by) if (H.is$(param.by, cc.Node)) {
          var byPos = param.by.getWorldPosition(cc.Vec2.ZERO);
          node.setWorldPosition(byPos);
        } else node.position = param.by;
        var dropProp = $(node, "dropProp");
        dropProp.uid = H.uid();
        dropProp.init(this.player);
        var tipTypes = this.getTipTypes();
        var tipType = tipTypes.filter(function(a) {
          return a == dropProp.type;
        })[0];
        if (tipType) {
          var dropPropTipNode = G("pool").get(app.getPrefab("dropPropTip"));
          var dropPropTip = $(dropPropTipNode, "dropPropTip");
          dropPropTip.node.parent = this.parent2Node;
          var iconNode = cc.find("anim", dropProp.node);
          iconNode || (iconNode = cc.find("icon", dropProp.node));
          dropPropTip.init({
            dropPropNode: dropProp.node,
            player: this.player,
            iconNode: iconNode
          });
          dropPropTip.hide();
          dropProp.dropPropTip = dropPropTip;
        }
        this.items.push(dropProp);
        return dropProp;
      },
      remove: function remove(dropProp) {
        if (!dropProp.node) return;
        G("pool").put(dropProp.node);
        if (dropProp.dropPropTip) {
          if (!dropProp.dropPropTip.node) return;
          G("pool").put(dropProp.dropPropTip.node);
        }
        this.items = this.items.filter(function(a) {
          return a.uid != dropProp.uid;
        });
      },
      getTipTypes: function getTipTypes() {
        return [ "box", "equip", "healPotion", "fireJet", "pickup", "roleChip", "skillChip" ];
      },
      getDropProps: function getDropProps() {
        return this.items;
      },
      getPickupDropProps: function getPickupDropProps() {
        var arrowTipTypes = this.getTipTypes();
        var banTypes = this.getStaticDropTypes();
        for (var i = 0; i < arrowTipTypes.length; i++) banTypes.push(arrowTipTypes[i]);
        return this.items.filter(function(a) {
          return !banTypes.includes(a.type);
        });
      },
      getStaticDropTypes: function getStaticDropTypes() {
        return [ "box", "equip" ];
      }
    };
    cc._RF.pop();
  }, {} ],
  dropPropTip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6e2b7TMIQxMh6nKCbSmFR01", "dropPropTip");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(param) {
        param = _extends({}, {
          dropPropNode: null,
          player: null,
          iconNode: null
        }, param);
        this.dropPropNode = param.dropPropNode;
        this.player = param.player;
        this.find("icon").color = param.iconNode.color;
        var sprite = $(param.iconNode, cc.Sprite);
        this.find("icon", cc.Sprite).spriteFrame = sprite.spriteFrame;
      },
      hide: function hide() {
        this.node.opacity = 0;
      },
      show: function show() {
        this.node.opacity = 255;
      },
      update: function update(dt) {
        if (!this.dropPropNode) return;
        if (!this.player) return;
        if (app.screen.isOutView(this.player.node, this.dropPropNode)) {
          var propWorldPos = H.getWorldPos(this.dropPropNode);
          this.node.setWorldPosition(propWorldPos);
          var checkViewRes = app.screen.checkView(this.player.node, this.node);
          (checkViewRes.isMaxX || checkViewRes.isMaxY) && this.node.setWorldPosition(checkViewRes.worldPos);
          this.show();
        } else this.hide();
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  dropProp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "053a1DfgdZGY54DypGArhE2", "dropProp");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        type: cc.String
      },
      init: function init(player) {
        this.player = player;
        this.move = {};
        this.move.speed = 2 * player.move.speed;
        this.move.dir = cc.Vec2.ZERO;
        this.move.canMove = false;
        this.isPlaying = false;
        var staticDropTypes = G("dropProp").getStaticDropTypes();
        this.isMoveProp = !staticDropTypes.includes(this.type);
      },
      onRemove: function onRemove(type) {},
      remove: function remove() {
        G("dropProp").remove(this);
        this.onRemove(this.type);
      },
      playAnim: function playAnim(callFunc) {
        if (this.isPlaying) return;
        this.isPlaying = true;
        var toPos = this.player.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        var selfPos = this.node.getWorldPosition(cc.Vec2.ZERO);
        var dir = selfPos.sub(toPos).normalize();
        var pos = cc.v2(this.node.x + dir.x * this.node.width, this.node.y + dir.y * this.node.height);
        cc.tween(this.node).to(.1, {
          x: pos.x,
          y: pos.y
        }).call(function() {
          callFunc && callFunc();
        }).start();
      },
      moveToTarget: function moveToTarget() {
        var _this = this;
        this.playAnim(function() {
          _this.move.canMove = true;
        });
      },
      update: function update(dt) {
        var _this2 = this;
        if (M("fight").stop) return;
        if (!this.player) return;
        var toPos = this.player.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        var selfPos = this.node.getWorldPosition(cc.Vec2.ZERO);
        var dist = H.dist(selfPos, toPos);
        if (this.isMoveProp) dist <= this.player.propRadius && this.playAnim(function() {
          _this2.move.canMove = true;
        }); else if (dist <= .7 * this.player.node.width) {
          this.remove();
          return;
        }
        if (!this.move.canMove) return;
        this.move.dir = toPos.sub(selfPos).normalize();
        if (dist <= 10) {
          this.remove();
          return;
        }
        var speed = this.move.speed * dt;
        this.node.x += this.move.dir.x * speed;
        this.node.y += this.move.dir.y * speed;
      }
    });
    cc._RF.pop();
  }, {} ],
  drugItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "44e755m3V5FL52UA9qYXkU9", "drugItem");
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
    cc.Class({
      extends: require("skill"),
      properties: {
        spriteFrames: [ cc.SpriteFrame ]
      },
      init: function init(param) {
        param = _extends({}, {
          timeout: 3
        }, param);
        var sprite = $(this.find("anim", this.node), cc.Sprite);
        sprite && (sprite.spriteFrame = H.randArr(this.spriteFrames));
        this.timeout = param.timeout;
        this.defHurtCd = .2;
        this.hurtCd = this.defHurtCd;
        this.isCollide = false;
        this.isStay = true;
        this.isInit = true;
      },
      remove: function remove() {
        G("pool").put(this.node);
      },
      update: function update(dt) {
        if (!this.isInit) return;
        if (!this.role) return;
        if (M("fight").stop) return;
        if (this.hurtCd > 0) {
          this.hurtCd -= dt;
          this.isCollide = false;
        } else {
          this.hurtCd = this.defHurtCd;
          this.isCollide = true;
        }
        this.timeout -= dt;
        this.timeout <= 0 && this.remove();
      }
    });
    cc._RF.pop();
  }, {
    skill: "skill"
  } ],
  drug: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7dbd8FmajNNuJqCMwQc57c3", "drug");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      initData: function initData(param) {
        param = _extends({}, {
          asset: "",
          cd: 3,
          num: 1,
          scale: 1,
          timeout: 3,
          hurtPercent: 100
        }, param);
        this.hurtPercent = param.hurtPercent;
        this.prefab = app.getPrefab(param.asset);
        this.defCd = param.cd;
        this.cd = this.defCd;
        this.num = param.num;
        this.scale = param.scale;
        this.timeout = param.timeout;
        this.skillCd = 0;
      },
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
      },
      createItems: function createItems() {
        if (!G("skill").checkRole(this.role)) return;
        for (var i = 1; i <= this.num; i++) {
          var node = G("pool").get(this.prefab);
          node.scaleX = this.scale;
          node.scaleY = this.scale;
          node.parent = G("skill").parent1Node;
          var skill = $(node, "skill");
          skill.initBase({
            role: this.role,
            hurtPercent: this.hurtPercent,
            skillName: this.skillName
          });
          skill.init({
            timeout: this.timeout
          });
          var byWorldPos = this.role.node.getWorldPosition(cc.Vec2.ZERO);
          var w = app.screen.width / 2 * .7;
          var h = app.screen.height / 2 * .7;
          var x = H.randNum(-w, w);
          var y = H.randNum(-h, h);
          node.setWorldPosition(cc.v2(byWorldPos.x + x, byWorldPos.y + y));
        }
      },
      update: function update(dt) {
        if (!this.role) return;
        if (!this.prefab) return;
        if (M("fight").stop) return;
        if (this.skillCd > 0) {
          this.skillCd -= dt;
          return;
        }
        this.cd -= dt;
        if (this.cd > 0) return;
        if ("enemy" == this.role.group && this.role.animExt.isPlaying("move")) return;
        this.createItems();
        this.skillCd = this.timeout;
        this.cd = this.defCd;
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  effectMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "df830zA/q5Pz4gpM+l1esbj", "effectMgr");
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
    module.exports = {
      init: function init(param) {
        param = _extends({}, {
          parent1Node: null,
          parent2Node: null,
          tipParentNode: null
        }, param);
        this.parent1Node = param.parent1Node;
        this.parent2Node = param.parent2Node;
        this.tipParentNode = param.tipParentNode;
      },
      create: function create(param) {
        param = _extends({}, {
          by: null,
          asset: "",
          layer: 2,
          addY: 0,
          addX: 0,
          color: "#FFFFFF",
          parentNode: null,
          timeout: false,
          once: false
        }, param);
        var parentNode;
        parentNode = param.parentNode ? param.parentNode : 1 == param.layer ? this.parent1Node : this.parent2Node;
        if (param.once) {
          var _node = parentNode.children.filter(function(a) {
            return a.name == param.asset;
          })[0];
          if (_node) {
            _node.y += param.addY;
            _node.x += param.addX;
            var _effect = $(_node, "effect");
            if (_effect) {
              _effect.init(param);
              return _effect;
            }
          }
        }
        var prefab = app.getPrefab(param.asset);
        var node = G("pool").get(prefab, "effect" + param.asset);
        node.parent = parentNode;
        param.by && (H.is$(param.by, cc.Node) ? node.position = H.toAR(param.by, node.parent) : node.position = param.by);
        node.y += param.addY;
        node.x += param.addX;
        var effect = H.add$(node, "effect", true);
        if (effect.anim) {
          var prefabAnimNode = cc.find("anim", prefab.data);
          effect.anim.node.width = prefabAnimNode.width;
          effect.anim.node.height = prefabAnimNode.height;
        }
        effect.init(param);
        return effect;
      },
      updDirAngle: function updDirAngle(node, dir) {
        node.angle = 180 * Math.atan2(dir.y, dir.x) / Math.PI;
      },
      showTip: function showTip(param) {
        param = _extends({}, {
          by: null,
          string: "",
          fontSize: 20,
          color: "#FFFFFF",
          addX: 0,
          addY: 0
        }, param);
        var node = G("pool").get(app.getPrefab("showTip"));
        node.parent = this.tipParentNode;
        param.by && (H.is$(param.by, cc.Node) ? node.position = H.toAR(param.by, node.parent) : node.position = param.by);
        node.x += param.addX;
        node.y += param.addY;
        var label = $(cc.find("label", node), cc.Label);
        label.node.color = cc.color(param.color);
        label.string = param.string;
        label.fontSize = param.fontSize;
        label.lineHeight = param.fontSize;
        var anim = $(label.node, cc.Animation);
        var animState = anim.play("showTip");
        animState.once(cc.Animation.EventType.FINISHED, function() {
          G("pool").put(node);
        });
      }
    };
    cc._RF.pop();
  }, {} ],
  effect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e490fgkgFJBi4xpDdsNIlN9", "effect");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(param) {
        var _this = this;
        this.timeout = param.timeout;
        this.anim = this.find("anim", cc.Animation);
        if (this.anim) {
          this.anim.node.color = cc.color(param.color);
          var defaultClipName = this.anim.defaultClip.name;
          this.animState = this.anim.getAnimationState(defaultClipName);
          if (!this.animState.isPlaying) {
            this.animState = this.anim.play();
            this.animState.once(cc.Animation.EventType.FINISHED, function() {
              _this.remove();
            });
          }
        }
        this.isInit = true;
      },
      onRemove: function onRemove() {},
      remove: function remove() {
        G("pool").put(this.node);
        this.onRemove();
      },
      update: function update(dt) {
        if (!this.isInit) return;
        if (false !== this.timeout) {
          this.timeout -= dt;
          if (this.timeout <= 0) {
            this.remove();
            return;
          }
        }
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  enemyGroup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "67c36go+JJElqPiWgBrR+PS", "enemyGroup");
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
    cc.Class({
      extends: require("roleBase"),
      properties: {},
      initFirst: function initFirst(firstRole) {
        this.firstEnemy = firstRole;
        if (this.firstEnemy.uid == this.uid) {
          var toWorldPos = this.target.bodyNode.getWorldPosition(cc.Vec2.ZERO);
          var byWorldPos = this.node.getWorldPosition(cc.Vec2.ZERO);
          var dir = toWorldPos.sub(byWorldPos).normalize();
          this.move.dir = dir;
          this.target.node.x > this.node.x && (this.bodyNode.scaleX = 1);
          this.target.node.x < this.node.x && (this.bodyNode.scaleX = -1);
        } else {
          this.bodyNode.scaleX = this.firstEnemy.bodyNode.scaleX;
          this.move.dir = this.firstEnemy.move.dir;
        }
      },
      initData: function initData(data) {
        this.data = _extends({}, {
          HP: 10,
          ATK: 2
        }, data);
        this.defData = H.clone(this.data);
      },
      init: function init(param) {
        param = _extends({}, {
          target: null,
          data: {}
        }, param);
        this.initBase();
        this.type = "group";
        this.group = "enemy";
        this.initData(param.data);
        this.target = param.target;
        this.stop = false;
        this.move = {};
        this.move.dir = null;
        this.move.speed = 400;
        this.checkOut = false;
        this.isInit = true;
      },
      remove: function remove() {
        G("role").remove(this);
      },
      onEnter: function onEnter(other, self) {
        if (!this.checkCollide(other)) return;
        this.collide(other);
      },
      onStay: function onStay(other, self) {
        if (!this.checkCollide(other, true)) return;
        this.collide(other);
      },
      suck: function suck(targetNode) {
        if (!targetNode) return;
        if (!this.data) return;
        if (this.data.HP <= 0) return;
        if (this.state.sleep.cd > 0) return;
        this.state.stop.cd = .2;
        var toWorldPos = H.getWorldPos(targetNode);
        var selfWorldPos = H.getWorldPos(this.node);
        var dir = toWorldPos.sub(selfWorldPos).normalize();
        this.node.x += dir.x;
        this.node.y += dir.y;
      },
      update: function update(dt) {
        if (!this.isInit) return;
        if (M("fight").stop) return;
        if (!this.target) return;
        !this.checkOut && G("role").isOut(this.target.node, this.node) ? this.checkOut = false : this.checkOut = true;
        if (this.checkOut && G("role").isOut(this.target.node, this.node)) {
          this.remove();
          return;
        }
        if (this.data.HP <= 0) return;
        if (this.state.sleep.cd > 0) {
          this.state.sleep.cd -= dt;
          return;
        }
        if (this.state.stop.cd > 0) {
          this.state.stop.cd -= dt;
          return;
        }
        var speed = this.move.speed * dt;
        if (this.move.dir) {
          this.node.x += this.move.dir.x * speed;
          this.node.y += this.move.dir.y * speed;
        }
      }
    });
    cc._RF.pop();
  }, {
    roleBase: "roleBase"
  } ],
  enemyNear: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73729hRS15IzK2jKlNkzApd", "enemyNear");
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
    cc.Class({
      extends: require("roleBase"),
      properties: {},
      loadAsset: function loadAsset(asset, callFunc) {
        var _this = this;
        if (!this.animExt) return;
        var path = "fight/role/enemy/" + asset;
        app.loadDir(path, cc.SpriteFrame).then(function(spriteFrames) {
          spriteFrames = spriteFrames.sort(function(a, b) {
            return H.num(a.name) - H.num(b.name);
          });
          var moveClip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 10);
          moveClip.name = "move";
          moveClip.wrapMode = cc.WrapMode.Loop;
          _this.animExt.anim.addClip(moveClip);
          callFunc && callFunc();
        });
      },
      initData: function initData(data) {
        this.data = _extends({}, {
          HP: 10,
          ATK: 2
        }, data);
        this.defData = H.clone(this.data);
      },
      init: function init(param) {
        var _this2 = this;
        param = _extends({}, {
          target: null,
          data: {}
        }, param);
        this.initBase();
        this.type = "near";
        this.group = "enemy";
        this.initData(param.data);
        this.move = {};
        this.move.speed = 200;
        this.move.dir = cc.Vec2.ZERO;
        this.target = param.target;
        this.node.setWorldPosition(G("role").getEnemyWorldPos(this.target));
        this.bossLevel = param.data.bossLevel;
        if (this.bossLevel) {
          var scale = 1;
          for (var i = 1; i <= this.bossLevel; i++) scale += 1;
          this.node.scaleX = scale;
          this.node.scaleY = scale;
          var roleProgressBarNode = cc.find("roleProgressBar", this.node);
          if (!roleProgressBarNode) {
            roleProgressBarNode = G("pool").get(app.getPrefab("roleProgressBar"));
            roleProgressBarNode.parent = this.node;
            roleProgressBarNode.y = this.node.height;
            this.find("HP", roleProgressBarNode).color = cc.color("#FF0000");
          }
          roleProgressBarNode.active = true;
          this.progressBar = {};
          this.progressBar.node = roleProgressBarNode;
          this.progressBar.HP = $(this.find("HP", roleProgressBarNode), cc.ProgressBar);
        } else {
          var _roleProgressBarNode = cc.find("roleProgressBar", this.node);
          _roleProgressBarNode && (_roleProgressBarNode.active = false);
          this.node.scaleX = 1;
          this.node.scaleY = 1;
        }
        this.frame = 0;
        this.defHurtRepelCd = .2;
        this.hurtRepelCd = 0;
        this.checkOut = false;
        this.isInit = false;
        this.loadAsset(this.asset, function() {
          _this2.isInit = true;
          _this2.animExt.play("move");
        });
      },
      onEnter: function onEnter(other, self) {
        if (!this.checkCollide(other)) return;
        this.collide(other);
      },
      onStay: function onStay(other, self) {
        var enemy = $(other.node, "enemyNear");
        if (enemy) {
          if (this.state.sleep.cd > 0) return;
          var dir = this.node.position.sub(enemy.node.position).normalize();
          if (this.bossLevel && enemy.bossLevel || !this.bossLevel) {
            this.node.x += dir.x;
            this.node.y += dir.y;
            return;
          }
        }
        if (!this.checkCollide(other, true)) return;
        this.collide(other);
      },
      hurtRepel: function hurtRepel(targetNode) {
        if (!targetNode) return;
        if (!this.data) return;
        if (this.data.HP <= 0) return;
        if (this.state.sleep.cd > 0) return;
        if (this.hurtRepelCd > 0) return;
        this.hurtRepelCd = this.defHurtRepelCd;
        var selfWorldPos = H.getWorldPos(this.node);
        var targetWorldPos = H.getWorldPos(targetNode);
        var speed = this.move.speed / 4;
        this.bossLevel && (speed /= this.bossLevel);
        var dir = selfWorldPos.sub(targetWorldPos).normalize();
        this.node.x += dir.x * speed;
        this.node.y += dir.y * speed;
      },
      suck: function suck(targetNode) {
        if (!targetNode) return;
        if (!this.data) return;
        if (this.data.HP <= 0) return;
        if (this.state.sleep.cd > 0) return;
        this.state.stop.cd = .2;
        var toWorldPos = H.getWorldPos(targetNode);
        var selfWorldPos = H.getWorldPos(this.node);
        var dir = toWorldPos.sub(selfWorldPos).normalize();
        this.node.x += dir.x;
        this.node.y += dir.y;
      },
      remove: function remove() {
        G("role").remove(this);
      },
      onDisable: function onDisable() {},
      update: function update(dt) {
        if (!this.isInit) return;
        if (M("fight").stop) return;
        if (!this.target) return;
        if (this.stop) return;
        if (this.progressBar) this.data.HP > 0 ? this.progressBar.HP.progress = this.data.HP / this.defData.HP : this.progressBar.node.active = false; else {
          !this.checkOut && G("role").isOut(this.target.node, this.node) ? this.checkOut = false : this.checkOut = true;
          if (this.checkOut && G("role").isOut(this.target.node, this.node)) {
            this.node.setWorldPosition(G("role").getEnemyWorldPos(this.target));
            return;
          }
        }
        if (this.data.HP <= 0 || this.target.data.HP <= 0) return;
        this.hurtRepelCd > 0 && (this.hurtRepelCd -= dt);
        if (this.state.sleep.cd > 0) {
          this.state.sleep.cd -= dt;
          return;
        }
        this.target.node.x > this.node.x && (this.bodyNode.scaleX = 1);
        this.target.node.x < this.node.x && (this.bodyNode.scaleX = -1);
        if (this.state.stop.cd > 0) {
          this.state.stop.cd -= dt;
          return;
        }
        var dist = H.dist(this.node, this.target.node);
        this.move.dir = dist > 10 ? this.target.node.position.sub(this.node.position).normalize() : cc.Vec2.ZERO;
        if (!this.move.dir.equals(cc.Vec2.ZERO)) {
          var speed = this.move.speed * dt;
          this.node.x += this.move.dir.x * speed;
          this.node.y += this.move.dir.y * speed;
        }
      }
    });
    cc._RF.pop();
  }, {
    roleBase: "roleBase"
  } ],
  enemyRange: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80e87XmIydNwqpGpHMuGz41", "enemyRange");
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
    cc.Class({
      extends: require("roleBase"),
      properties: {},
      loadAsset: function loadAsset(asset, callFunc) {
        var _this = this;
        if (!this.animExt) return;
        var path = "fight/role/enemy/" + asset;
        app.loadDir(path, cc.SpriteFrame).then(function(spriteFrames) {
          spriteFrames = spriteFrames.sort(function(a, b) {
            return H.num(a.name) - H.num(b.name);
          });
          $(_this.animExt.anim.node, cc.Sprite).spriteFrame = spriteFrames[0];
          var idleClip = cc.AnimationClip.createWithSpriteFrames([ spriteFrames[0] ], 10);
          idleClip.name = "idle";
          idleClip._duration = .6;
          idleClip.wrapMode = cc.WrapMode.Loop;
          idleClip.curveData.props = {};
          idleClip.curveData.props.scaleY = [];
          idleClip.curveData.props.scaleY.push({
            frame: 0,
            value: 1
          });
          idleClip.curveData.props.scaleY.push({
            frame: .3,
            value: .9
          });
          idleClip.curveData.props.scaleY.push({
            frame: .6,
            value: 1
          });
          idleClip.curveData.props.anchorY = [];
          idleClip.curveData.props.anchorY.push({
            frame: 0,
            value: .5
          });
          idleClip.curveData.props.anchorY.push({
            frame: .3,
            value: .556
          });
          idleClip.curveData.props.anchorY.push({
            frame: .6,
            value: .5
          });
          _this.animExt.anim.addClip(idleClip);
          spriteFrames.splice(0, 1);
          var moveClip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 10);
          moveClip.name = "move";
          moveClip.wrapMode = cc.WrapMode.Loop;
          _this.animExt.anim.addClip(moveClip);
          callFunc && callFunc();
        });
      },
      initData: function initData(data) {
        this.data = _extends({}, {
          HP: 10,
          ATK: 2
        }, data);
        this.defData = H.clone(this.data);
      },
      init: function init(param) {
        var _this2 = this;
        param = _extends({}, {
          target: null,
          data: {}
        }, param);
        this.initBase();
        this.type = "range";
        this.group = "enemy";
        this.move = {};
        this.move.dir = cc.Vec2.ZERO;
        this.move.speed = 150;
        this.initData(param.data);
        this.target = param.target;
        this.node.setWorldPosition(G("role").getEnemyWorldPos(this.target));
        this.bossLevel = param.data.bossLevel;
        if (this.bossLevel) {
          var scale = 1;
          for (var i = 1; i <= this.bossLevel; i++) scale += 2;
          this.node.scaleX = scale;
          this.node.scaleY = scale;
          var roleProgressBarNode = cc.find("roleProgressBar", this.node);
          if (!roleProgressBarNode) {
            roleProgressBarNode = G("pool").get(app.getPrefab("roleProgressBar"));
            roleProgressBarNode.parent = this.node;
            roleProgressBarNode.y = this.node.height;
            this.find("HP", roleProgressBarNode).color = cc.color("#FF0000");
          }
          roleProgressBarNode.active = true;
          this.progressBar = {};
          this.progressBar.node = roleProgressBarNode;
          this.progressBar.HP = $(this.find("HP", roleProgressBarNode), cc.ProgressBar);
        } else {
          var _roleProgressBarNode = cc.find("roleProgressBar", this.node);
          _roleProgressBarNode && (_roleProgressBarNode.active = false);
          this.progressBar = null;
          this.node.scaleX = 1;
          this.node.scaleY = 1;
        }
        this.defHurtRepelCd = .2;
        this.hurtRepelCd = 0;
        this.checkOut = false;
        this.isInit = false;
        this.loadAsset(this.asset, function() {
          _this2.isInit = true;
          _this2.animExt.play("move");
        });
      },
      onEnter: function onEnter(other, self) {
        if (!this.checkCollide(other)) return;
        this.collide(other);
      },
      onStay: function onStay(other, self) {
        var enemy = $(other.node, "enemyRange");
        if (enemy) {
          if (this.state.sleep.cd > 0) return;
          var dir = this.node.position.sub(enemy.node.position).normalize();
          if (this.bossLevel && enemy.bossLevel || !this.bossLevel) {
            this.node.x += dir.x;
            this.node.y += dir.y;
            return;
          }
        }
        if (!this.checkCollide(other, true)) return;
        this.collide(other);
      },
      hurtRepel: function hurtRepel(targetNode) {
        if (!targetNode) return;
        if (!this.data) return;
        if (this.data.HP <= 0) return;
        if (this.state.sleep.cd > 0) return;
        if (this.hurtRepelCd > 0) return;
        this.hurtRepelCd = this.defHurtRepelCd;
        var selfWorldPos = H.getWorldPos(this.node);
        var targetWorldPos = H.getWorldPos(targetNode);
        var speed = this.move.speed / 4;
        this.bossLevel && (speed /= this.bossLevel);
        var dir = selfWorldPos.sub(targetWorldPos).normalize();
        this.node.x += dir.x * speed;
        this.node.y += dir.y * speed;
      },
      suck: function suck(targetNode) {
        if (!targetNode) return;
        if (!this.data) return;
        if (this.data.HP <= 0) return;
        if (this.state.sleep.cd > 0) return;
        this.state.stop.cd = .2;
        var toWorldPos = H.getWorldPos(targetNode);
        var selfWorldPos = H.getWorldPos(this.node);
        var dir = toWorldPos.sub(selfWorldPos).normalize();
        this.node.x += dir.x;
        this.node.y += dir.y;
      },
      remove: function remove() {
        G("role").remove(this);
      },
      onDisable: function onDisable() {},
      update: function update(dt) {
        if (!this.isInit) return;
        if (M("fight").stop) return;
        if (!this.target) return;
        if (this.progressBar) this.data.HP > 0 ? this.progressBar.HP.progress = this.data.HP / this.defData.HP : this.progressBar.node.active = false; else {
          !this.checkOut && G("role").isOut(this.target.node, this.node) ? this.checkOut = false : this.checkOut = true;
          if (this.checkOut && G("role").isOut(this.target.node, this.node)) {
            this.node.setWorldPosition(G("role").getEnemyWorldPos(this.target));
            return;
          }
        }
        if (this.data.HP <= 0 || this.target.data.HP <= 0) return;
        this.hurtRepelCd > 0 && (this.hurtRepelCd -= dt);
        if (this.state.sleep.cd > 0) {
          this.state.sleep.cd -= dt;
          return;
        }
        this.target.node.x > this.node.x && (this.bodyNode.scaleX = 1);
        this.target.node.x < this.node.x && (this.bodyNode.scaleX = -1);
        if (this.state.stop.cd > 0) {
          this.state.stop.cd -= dt;
          return;
        }
        var dist = H.dist(this.node, this.target.node);
        dist > app.screen.width / 2 ? this.move.dir = this.target.node.position.sub(this.node.position).normalize() : this.move.dir = cc.Vec2.ZERO;
        if (this.move.dir.equals(cc.Vec2.ZERO)) this.animExt.isPlaying("idle") || this.animExt.play("idle"); else {
          var speed = this.move.speed * dt;
          this.node.x += this.move.dir.x * speed;
          this.node.y += this.move.dir.y * speed;
          this.animExt.isPlaying("move") || this.animExt.play("move");
        }
      }
    });
    cc._RF.pop();
  }, {
    roleBase: "roleBase"
  } ],
  en: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c3e6ehfDgdGR5a7/cUwo6px", "en");
    "use strict";
    module.exports = {
      app_name: "Inscription Survivors",
      ios_app_name: "Inscription Survivors",
      android_app_name: "Inscription Survivors",
      error_action: "Operation failed",
      error_chip: "Insufficient fragments",
      error_gold: "Insufficient gold",
      error_role: "Hero unavailable",
      error_timeout: "Connection timeout",
      error_ad: "Ads unavailable. Please try again later",
      error_ad_ready: "Ad not ready",
      error_equipNum: "Insufficient Chests",
      error_cd: "Skill on cooldown",
      error_revive: "No revivals left",
      error_equip_level: "Cannot exceed current level",
      error_version: "New version available\nExit and restart game?",
      error_guest: "Guest accounts cannot perform this action",
      error_data: "Data error occurred",
      error_length: "Must be %{length} characters",
      error_sid_friendSid: "Cannot enter your own ID",
      error_sid_max: "Maximum bindings reached",
      error_sid_self: "ID already bound to your account",
      error_select_role: "Hero not unlocked",
      error_no_upLevel: "Insufficient resources to upgrade",
      success_action: "Operation successful",
      success_uploadData: "Data synchronized",
      success_upLevel: "Level up successful",
      success_buy: "Purchase successful",
      success_gain: "Item acquired",
      success_revive: "Revival successful",
      loading: "Loading",
      login_guest: "Login with OKX Wallet",
      login_guest_unisat: "Login with Unisat Wallet",
      login_guest_ton: "Login with TON Wallet",
      login_qq: "Sign in with QQ",
      login_taptap: "Sign in with TapTap",
      login_apple: "Sign in with Apple",
      login_out: "Logout",
      delete_data: "Delete data",
      exitGame: "Exit game",
      sid: "ID",
      copy: "copy",
      input: "input",
      doc_user: "User Agreement",
      doc_privacy: "Privacy Policy",
      reportToAdmin: "Problem feedback",
      uploadData: "upload data",
      never: "never",
      yes: "YES",
      close: "CLOSE",
      agree: "agree",
      refuse: "refuse",
      guestLoginTips: "Tourist mode cannot save in the cloud\nDo you want to enter the game?",
      sidTip: "Enter your friend ID to receive rewards",
      playDayTip: "Accompanying you %{day} day",
      roleHelpTip: "Unlock and upgrade other heroes to empower your active hero:\n\u2022 Each hero level provides [+2 HP] or [+1 ATK] bonus",
      skillHelpTip: "Upgrade skills to empower your active hero:\n\u2022 Each skill level provides [+1 HP] or [+0.5 ATK] bonus",
      deleteDataTip: "Delete local and server data\ndo you want to continue?",
      reportToAdminTip: "Please let us know the problem you have encountered",
      gameCenterSignTip: "Not logged in to GameCenter\nDo you want to open it in your phone settings?",
      gameCenterSend: "Send",
      frameRate: "Frame rate",
      startGame: "Start Game",
      notHave: "Not unlocked",
      get: "GET",
      canGain: "Can be claimed",
      buy: "Unlock",
      select: "Select",
      upLevel: "Upgrade",
      allUpLevel: "Upgrade All",
      gain: "Claim",
      allGain: "Claim All",
      continue: "Continue",
      exit: "Exit",
      revive: "Revive",
      noAttr: "No attributes",
      noEquip: "No equip",
      currentEquip: "Current",
      all: "All",
      condition: "Filter",
      sell: "Sell",
      equip: "Equip",
      hero: "Hero",
      skill: "Skill",
      achive: "Feats",
      hurt: "Damage",
      dps: "DPS",
      ATKPencent: "ATK",
      HPPencent: "HP",
      critOdds: "Crit",
      doubleOdds: "Double",
      audioMusic: "Music",
      audioEffect: "Effect",
      fightLevel: "Lv %{level}",
      total: "Total",
      done: "Done",
      achiveInfo: {
        lookAd: {
          video: "Look Ad"
        },
        gainProp: {
          gold: "Gold earned in combat",
          equipNum: "Equip box gained in combat"
        },
        useRole: "Hero Clears",
        useSkill: "Skill uses in combat",
        usePassiveSkill: "Reach Max Level in Combat"
      },
      skillFightUplevel: "In-battle Upgrade",
      skillInfo: {
        hole: {
          title: "Abyss",
          title2: "Endless",
          des: "Deals damage every 0.5s to enemies in range\nDamage, Range"
        },
        fireBall: {
          title: "Fireball",
          title2: "Apocalypse",
          des: "Attacks and knocks back nearest target\nCooldown, Damage, Range, Count, Pierce"
        },
        sword: {
          title: "Sword",
          title2: "HolySword",
          des: "Surround and deal damage to enemies while repelling (blocking bullets)\nCD,damage,range,quantity,duration"
        },
        dart: {
          title: "Darts",
          title2: "WindDemon",
          des: "Launch multiple attacks on the nearest target\nCD,damage,range,quantity,penetration"
        },
        drug: {
          title: "Venom",
          title2: "HighlyToxic",
          des: "Generate at random locations and deal (0.2 seconds/time) to enemies\ndamage,range,quantity,duration"
        },
        stony: {
          title: "Meteorite",
          title2: "Meteor",
          des: "Surround and deal damage to enemies while repelling (blocking bullets)\nCD,duration,damage,range,quantity,speed"
        },
        magicBall: {
          title: "EnergySphere",
          title2: "MagicBall",
          des: "Attack the nearest enemy\nCD,damage"
        },
        lightning: {
          title: "Lightning",
          title2: "ThunderStrike",
          des: "Attack random targets and explode (with 50% damage)\nCD,damage,range,quantity"
        },
        boomerang: {
          title: "Boomerang ",
          title2: "StrongBoomerang",
          des: "Attack random targets and return\nCD,damage,range"
        },
        bomb: {
          title: "Bomb",
          title2: "ExplosiveBomb",
          des: "Attack random target explosion causing range damage\nCD,damage,range"
        },
        ice: {
          title: "IceBolt",
          title2: "FrostNova",
          des: "Attack random targets and freeze\nCD,duration,damage,quantity,penetration"
        },
        knive: {
          title: "Slash",
          title2: "MoonSlash",
          des: "Attack the nearest target and penetrate (block bullets)\nCD,damage,range,quantity"
        },
        gem: {
          title: "Gemstone",
          title2: "MegaBeam",
          des: "Attack the nearest target and reflect at the edge of the field of view (lasting for 5 seconds)\nCD,damage,quantity"
        },
        laser: {
          title: "Laser",
          title2: "SuperEnergy",
          des: "Random direction causes (0.2 seconds/time) damage\nCD,duration,damage,range,quantity"
        },
        tornado: {
          title: "Tornado",
          title2: "UltimateStorm",
          des: "Causing (0.2 seconds/time) damage in random directions and getting involved in\nCD,damage,range,quantity,speed"
        }
      },
      passiveSkillInfo: {
        propRadius: {
          title: "PickupRange"
        },
        SPD: {
          title: "MoveSpeed"
        },
        ATK: {
          title: "ATK"
        },
        HP: {
          title: "Max HP"
        }
      }
    };
    cc._RF.pop();
  }, {} ],
  equipDataInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8454dvF/SJHqIj1v4J+R7gd", "equipDataInfo");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      upd: function upd(data, otherData) {
        var _this = this;
        if (!data) return data;
        this.data = data;
        this.otherData = otherData;
        this.HPLabel = this.find("HP/label", cc.Label);
        this.HPLabel.node.parent.active = false;
        this.ATKLabel = this.find("ATK/label", cc.Label);
        this.ATKLabel.node.parent.active = false;
        this.attrItemNode = this.find("attrParent/attrItem");
        this.attrItemNode.active = false;
        this.skillAttrItemNode = this.find("attrParent/skillAttrItem");
        this.skillAttrItemNode.active = false;
        this.equip = this.find("equip", "equip");
        this.equip.upd(this.data);
        if ("HP" in this.data) {
          this.HPLabel.node.parent.active = true;
          this.HPLabel.string = H.numAbbr(this.data.HP);
        }
        if ("ATK" in this.data) {
          this.ATKLabel.node.parent.active = true;
          this.ATKLabel.string = H.numAbbr(this.data.ATK);
        }
        this.attrItems && this.attrItems.forEach(function(a) {
          G("pool").put(a.node, true);
        });
        this.attrItems = [];
        console.log("Enter equipDataInfo ... this.data.attrs ... ", this.data, this.data.attrs);
        if (this.data.attrs) {
          this.find("attrParent/noAttrLabel").active = false;
          M("role").getAttrs("base").forEach(function(attr) {
            _this.data.attrs.forEach(function(equipAttr) {
              console.log("Enter equipDataInfo ... equipAttr ... ", equipAttr.key, attr.key);
              if (attr.key == equipAttr.key) {
                var attrItem = {};
                attrItem.node = G("pool").get(_this.attrItemNode, "equipDataInfoAttrItem");
                attrItem.node.parent = _this.attrItemNode.parent;
                attrItem.data = equipAttr;
                attrItem.titleLabel = _this.find("titleLabel", cc.Label, attrItem.node);
                attrItem.label = _this.find("label", cc.Label, attrItem.node);
                attrItem.titleLabel.string = attr.name;
                attrItem.label.string = "+" + equipAttr.value + "%";
                _this.attrItems.push(attrItem);
              }
            });
          });
          M("role").getAttrs("skill").forEach(function(attr) {
            _this.data.attrs.forEach(function(equipAttr) {
              if (attr.key == equipAttr.key) {
                var attrItem = {};
                attrItem.node = G("pool").get(_this.skillAttrItemNode, "equipDataInfoSkillAttrItem");
                attrItem.node.parent = _this.skillAttrItemNode.parent;
                attrItem.data = equipAttr;
                attrItem.label = _this.find("label", cc.Label, attrItem.node);
                attrItem.iconSprite = _this.find("icon", cc.Sprite, attrItem.node);
                var asset = equipAttr.key.substr(0, equipAttr.key.length - 7);
                attrItem.iconSprite.spriteFrame = G("skill").getSpriteFrame(asset);
                attrItem.label.string = "+" + equipAttr.value + "%";
                _this.attrItems.push(attrItem);
              }
            });
          });
        } else this.find("attrParent/noAttrLabel").active = true;
        var updArrow = function updArrow(node, val, otherVal) {
          if (!node) return;
          node.active = false;
          if ("+" == val) {
            node.active = true;
            node.scaleY = 1;
            node.color = cc.color("#00FF00");
            return;
          }
          if ("-" == val) {
            node.active = true;
            node.scaleY = -1;
            node.color = cc.color("#FF0000");
            return;
          }
          if (val > otherVal) {
            node.active = true;
            node.scaleY = 1;
            node.color = cc.color("#00FF00");
          } else if (val < otherVal) {
            node.active = true;
            node.scaleY = -1;
            node.color = cc.color("#FF0000");
          }
        };
        var arrowNode = this.find("HP/arrow");
        arrowNode && (arrowNode.active = false);
        this.otherData || updArrow(arrowNode, "+");
        arrowNode = this.find("ATK/arrow");
        arrowNode && (arrowNode.active = false);
        this.otherData || updArrow(arrowNode, "+");
        this.attrItems.forEach(function(a) {
          var arrowNode = _this.find("arrow", a.node);
          arrowNode && (arrowNode.active = false);
          _this.otherData || updArrow(arrowNode, "+");
        });
        if (this.otherData) {
          var _arrowNode = this.find("HP/arrow");
          _arrowNode.active = false;
          "HP" in this.data && "HP" in this.otherData && updArrow(_arrowNode, this.data.HP, this.otherData.HP);
          _arrowNode = this.find("ATK/arrow");
          _arrowNode.active = false;
          "ATK" in this.data && "ATK" in this.otherData && updArrow(_arrowNode, this.data.ATK, this.otherData.ATK);
          this.attrItems.forEach(function(a) {
            var arrowNode = _this.find("arrow", a.node);
            if (!arrowNode) return;
            arrowNode.active = false;
            if (_this.otherData.attrs) {
              var otherDataAttr = _this.otherData.attrs.filter(function(b) {
                return b.key == a.data.key;
              })[0];
              otherDataAttr && updArrow(arrowNode, a.data.value, otherDataAttr.value);
            } else updArrow(arrowNode, "+");
          });
        }
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  equipInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c46d6It1ANH47pVDXshy7B7", "equipInfo");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {},
      show: function show(equipData) {
        console.log("equipData ... ", equipData);
        this.data = equipData;
        this.equipDataInfo = this.find("equipInfo", "equipDataInfo");
        this.upLevelBtn = this.find("upLevelBtn", cc.Button);
        this.upLevelBtn.goldLabel = this.find("gold/label", cc.Label);
        this.upLevelBtn.node.on("touchend", this.upLevelBtnEvent, this);
        this.upd(this.data);
        return H.show(this);
      },
      upd: function upd(data) {
        this.data = M("equip").getData(data.uid);
        this.equipDataInfo.upd(this.data);
        var calRes = M("equip").calUpLevel(this.data, 1);
        this.upLevelBtn.interactable = false;
        this.upLevelBtn.goldLabel.node.color = cc.color("#FFFFFF");
        this.upLevelBtn.goldLabel.string = "MAX";
      },
      upLevelBtnEvent: function upLevelBtnEvent() {}
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  equipModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2ad4eY9+s5G7Ie4LTCF2Y1A", "equipModel");
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
    module.exports = {
      eventType: {
        ADD: "equipModel.add",
        UP_LEVEL: "equipModel.upLevel"
      },
      createData: function createData(param) {
        param = _extends({}, {
          uid: H.uid(),
          level: 0,
          type: "?",
          pos: "?",
          star: "?",
          rank: "?",
          attrs: null
        }, param);
        "?" == param.type && (param.type = H.randNum(1, 3));
        "?" == param.pos && (param.pos = H.randArr([ "arm", "head", "chest", "foot" ]));
        "?" == param.star && (param.star = H.randNum(0, 5));
        "?" == param.rank && (H.calOdds(30) ? param.rank = H.randNum(1, 5) : param.rank = 0);
        var res = {};
        res.uid = param.uid;
        res.type = param.type;
        res.pos = param.pos;
        res.level = param.level;
        res.star = param.star;
        res.rank = param.rank;
        if (param.attrs) res.attrs = param.attrs; else if (res.rank > 0) {
          var attrs = M("role").getAttrs();
          var randAttr = H.randArr(attrs);
          var attr = {};
          attr.key = randAttr.key;
          var min = res.rank - 1;
          min < 0 && (min = 0);
          attr.value = H.num(H.randNum(min, res.rank) + H.randNum(.01, 1, true), 2);
          res.attrs = [ attr ];
        }
        var calVal = function calVal(baseVal) {
          var val = baseVal;
          val += param.star;
          val += param.level;
          return H.num(val);
        };
        "arm" == res.pos ? res.ATK = calVal(1) : res.HP = calVal(2);
        return res;
      },
      add: function add(equipData) {
        var current = M("data").equips.filter(function(a) {
          return a.type === equipData.type && a.pos === equipData.pos;
        })[0];
        current ? M("data").equips.forEach(function(a, index) {
          a.type === equipData.type && a.pos === equipData.pos && M("data").equips.splice(index, 1, equipData);
        }) : M("data").equips.push(equipData);
        E.emit(this.eventType.ADD);
      },
      preAdd: function preAdd() {
        var res = {};
        res.equipNum = 1;
        res.error = {};
        if (M("data").prop.equipNum < res.equipNum) {
          res.error.equipNum = L("error_equipNum");
          return res;
        }
        M("prop").setNum("equipNum", "-", res.equipNum);
        return res;
      },
      calSell: function calSell(equipData) {
        var gold = 100;
        gold += 50 * equipData.level;
        var calVal = function calVal(val) {
          val += val * (20 * equipData.rank) / 100;
          val += val * (20 * equipData.star) / 100;
          return val;
        };
        var res = {};
        res.gold = calVal(gold);
        return res;
      },
      calUpLevel: function calUpLevel(equipData, upNum) {
        void 0 === upNum && (upNum = 1);
        var res = {};
        res.gold = 0;
        res.upNum = 0;
        res.error = {};
        if (upNum < 1) return res;
        equipData.level >= M("data").fight.level && (res.error.level = L("error_equip_level"));
        var cal = function cal(level) {
          var res = {};
          var baseVal = 5e3;
          var goldVal = baseVal * level;
          goldVal < baseVal && (goldVal = baseVal);
          res.gold = goldVal;
          return res;
        };
        var level = equipData.level;
        var num = upNum;
        while (true) {
          if (upNum) {
            num--;
            if (num < 0) break;
          }
          var calRes = cal(level);
          res.gold += calRes.gold;
          level++;
          res.upNum++;
        }
        M("data").prop.gold < res.gold && (res.error.gold = L("error_gold"));
        return res;
      },
      upLevel: function upLevel(equipData, upNum) {
        void 0 === upNum && (upNum = 1);
        var upRes = this.calUpLevel(equipData, upNum);
        if (H.isEmpty(upRes.error)) {
          M("prop").setNum("gold", "-", upRes.gold);
          var newData = _extends({}, equipData, {
            level: equipData.level + upNum
          });
          newData = this.createData(newData);
          M("data").equips.forEach(function(a, index) {
            a.uid == equipData.uid && M("data").equips.splice(index, 1, newData);
          });
          E.emit(this.eventType.UP_LEVEL);
        }
        return upRes;
      },
      getData: function getData(typeOrUid, pos) {
        if (!pos) return M("data").equips.filter(function(a) {
          return a.uid == typeOrUid;
        })[0];
        return M("data").equips.filter(function(a) {
          return a.type == typeOrUid && a.pos == pos;
        })[0];
      },
      getColor: function getColor(equipData) {
        var color = "#CCCCCC";
        var val = equipData.rank;
        1 == val && (color = "#519CEE");
        2 == val && (color = "#4AC74A");
        3 == val && (color = "#D43FD1");
        4 == val && (color = "#FFA300");
        5 == val && (color = "#ED1C24");
        return color;
      },
      checkSetting: function checkSetting(equipData) {
        var setting = M("data").setting.openEquip;
        if ("*" != setting.rank && equipData.rank < H.num(setting.rank)) return false;
        if ("*" != setting.star && equipData.star < H.num(setting.star)) return false;
        return true;
      },
      isTip: function isTip() {
        return M("data").prop.equipNum > 0;
      }
    };
    cc._RF.pop();
  }, {} ],
  equip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "79fbcXyYYVG4IrVeTllU7pD", "equip");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      upd: function upd(equipData) {
        var _this = this;
        this.data = equipData;
        this.bgNode = this.find("bg");
        this.iconSprite = this.find("icon", cc.Sprite);
        this.levelLabel = this.find("levelLabel", cc.Label);
        this.starParentNode = this.find("starParent");
        this.bgNode.color = cc.color(M("equip").getColor(equipData));
        this.levelLabel.string = "Lv" + H.numAbbr(equipData.level);
        this.starParentNode.children.forEach(function(starNode, index) {
          equipData.star >= index + 1 ? starNode.active = true : starNode.active = false;
        });
        app.load("common/ui/equip/" + equipData.type + "/" + equipData.pos, cc.SpriteFrame).then(function(spriteFrame) {
          _this.iconSprite.spriteFrame = spriteFrame;
        });
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  fightBg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b5889mybSRLU7a4UoSZ15UR", "fightBg");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(targetNode) {
        var _this = this;
        this.row = 5;
        this.col = 4;
        this.size = 1024;
        this.targetNode = targetNode;
        this.playerGridPosX = 0;
        this.playerGridPosY = 0;
        this.halfWidth = app.screen.width / 2;
        this.halfHeight = app.screen.height / 2;
        this.bgNodes = [];
        var spriteNames = [ "1", "2", "3", "4", "5" ];
        var spriteName = H.getNextData(spriteNames, M("data").fight.selectLevel);
        var bgNames = [ "bg1", "bg2", "bg3", "bg4", "bg5" ];
        var nodeNames = [];
        for (var i = 0; i < this.row; i++) {
          nodeNames[i] = [];
          var nodes = [];
          var _loop = function _loop() {
            nodeNames[i][u] = H.randArr(bgNames);
            var node = H.inst(app.getPrefab(nodeNames[i][u]));
            var sprite = $(node, cc.Sprite);
            app.load("fight/bg/bg/" + spriteName, cc.SpriteFrame).then(function(spriteFrame) {
              sprite.spriteFrame = spriteFrame;
            });
            node.parent = _this.node;
            var x = u * _this.size - _this.size + _this.halfWidth;
            var y = i * _this.size - _this.size + _this.halfHeight;
            node.setWorldPosition(cc.v2(x, y));
            nodes.push(node);
          };
          for (var u = 0; u < this.col; u++) _loop();
          this.bgNodes.push(nodes);
        }
        this._frame = 0;
      },
      tryTileX: function tryTileX() {
        var playerGridPosX = Math.round((this.targetNode.x - this.halfWidth) / this.size);
        if (playerGridPosX < this.playerGridPosX) {
          var columnIndex = this.col - 1;
          for (var i = 0; i < this.row; i++) {
            var node = this.bgNodes[i][columnIndex];
            var pos = node.getWorldPosition(cc.Vec2.ZERO);
            pos.x -= this.col * this.size;
            node.setWorldPosition(pos);
            this.bgNodes[i].splice(columnIndex, 1);
            this.bgNodes[i].unshift(node);
          }
        } else if (this.playerGridPosX < playerGridPosX) {
          var _columnIndex = 0;
          for (var _i = 0; _i < this.row; _i++) {
            var _node = this.bgNodes[_i][_columnIndex];
            var _pos = _node.getWorldPosition(cc.Vec2.ZERO);
            _pos.x += this.col * this.size;
            _node.setWorldPosition(_pos);
            this.bgNodes[_i].splice(_columnIndex, 1);
            this.bgNodes[_i].push(_node);
          }
        }
        this.playerGridPosX = playerGridPosX;
      },
      tryTileY: function tryTileY() {
        var playerGridPosY = Math.round((this.targetNode.y - this.halfHeight) / this.size);
        if (playerGridPosY < this.playerGridPosY) {
          var rowIndex = this.row - 1;
          var nodesInRow = [];
          for (var i = 0; i < this.col; i++) {
            var node = this.bgNodes[rowIndex][i];
            var pos = node.getWorldPosition(cc.Vec2.ZERO);
            pos.y -= this.row * this.size;
            node.setWorldPosition(pos);
            nodesInRow.push(node);
          }
          this.bgNodes.splice(rowIndex, 1);
          this.bgNodes.unshift(nodesInRow);
        } else if (this.playerGridPosY < playerGridPosY) {
          var _rowIndex = 0;
          var _nodesInRow = [];
          for (var _i2 = 0; _i2 < this.col; _i2++) {
            var _node2 = this.bgNodes[_rowIndex][_i2];
            var _pos2 = _node2.getWorldPosition(cc.Vec2.ZERO);
            _pos2.y += this.row * this.size;
            _node2.setWorldPosition(_pos2);
            _nodesInRow.push(_node2);
          }
          this.bgNodes.splice(_rowIndex, 1);
          this.bgNodes.push(_nodesInRow);
        }
        this.playerGridPosY = playerGridPosY;
      },
      update: function update(dt) {
        if (!this.targetNode) return;
        this._frame++;
        if (this._frame % 30 == 0) {
          this._frame = 0;
          this.tryTileX();
          this.tryTileY();
        }
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  fightModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f212ceA0N9N3Zit6azxrOgb", "fightModel");
    "use strict";
    module.exports = {
      eventType: {
        SET_SELECT_LEVEL: "fightModel.setSelectLevel"
      },
      init: function init() {
        this.level = 1;
        this.revive = 1;
        this.kill = 0;
        this.round = 1;
        this.reward = {};
        this.reward.isDouble = false;
        this.reward.prop = {};
        this.reward.prop.gold = 0;
        this.reward.prop.equipNum = 0;
        this.reward.chips = [];
        this.player = {};
        this.player.asset = "";
        this.player.level = 1;
        this.player.exp = 0;
        this.player.nextExp = this.calNextLevelExp(this.player.level);
        this.player.skill = {};
        this.player.passiveSkill = {};
        this.second = 0;
        this.maxSecond = 900;
        this.stop = false;
        this.isInit = true;
      },
      setSkillNum: function setSkillNum(name, key, val, action) {
        void 0 === action && (action = "=");
        if (!this.player.skill[name]) {
          this.player.skill[name] = {};
          this.player.skill[name].level = 0;
          this.player.skill[name].hurt = 0;
          this.player.skill[name].second = this.second;
        }
        "+" == action ? this.player.skill[name][key] += val : "-" == action ? this.player.skill[name][key] -= val : this.player.skill[name][key] = val;
      },
      setPassiveSkillNum: function setPassiveSkillNum(name, key, val, action) {
        void 0 === action && (action = "=");
        var baseData = M("skill").getPassiveBaseDatas().filter(function(a) {
          return a.name == name;
        })[0];
        if (!baseData) return;
        if (!this.player.passiveSkill[name]) {
          this.player.passiveSkill[name] = {};
          this.player.passiveSkill[name].level = 0;
          "pencent" in baseData && (this.player.passiveSkill[name].pencent = baseData.pencent);
        }
        "+" == action ? this.player.passiveSkill[name][key] += val : "-" == action ? this.player.passiveSkill[name][key] -= val : this.player.passiveSkill[name][key] = val;
      },
      upLevel: function upLevel() {
        this.player.level += 1;
        this.player.exp = 0;
        this.player.nextExp = this.calNextLevelExp(this.player.level);
      },
      calNextLevelExp: function calNextLevelExp(curLevel) {
        return 10 * curLevel;
      },
      setSelectLevel: function setSelectLevel(action, val) {
        void 0 === action && (action = "+");
        void 0 === val && (val = 1);
        val = H.num(val);
        console.log("Before setSelectLevel:", {
          action: action,
          val: val,
          currentSelect: M("data").fight.selectLevel,
          maxLevel: M("data").fight.level
        });
        "+" == action && (M("data").fight.selectLevel += val);
        "-" == action && (M("data").fight.selectLevel -= val);
        "=" == action && (M("data").fight.selectLevel = val);
        M("data").fight.selectLevel > M("data").fight.level && (M("data").fight.selectLevel = M("data").fight.level);
        M("data").fight.selectLevel < 1 && (M("data").fight.selectLevel = 1);
        console.log("After setSelectLevel:", {
          newSelect: M("data").fight.selectLevel,
          maxLevel: M("data").fight.level
        });
        E.emit(this.eventType.SET_SELECT_LEVEL);
      },
      getSkills: function getSkills(isHave) {
        var _this = this;
        void 0 === isHave && (isHave = false);
        var res = [];
        if (isHave) {
          Object.keys(this.player.skill).forEach(function(name) {
            var data = {};
            data.name = name;
            data.level = 0;
            name in _this.player.skill && (data.level = _this.player.skill[name].level);
            res.push(data);
          });
          Object.keys(this.player.passiveSkill).forEach(function(name) {
            var data = {};
            data.isPassive = true;
            data.name = name;
            data.level = 0;
            "HP" != name && "ATK" != name || (data.pencent = _this.player.passiveSkill[name].pencent);
            name in _this.player.passiveSkill && (data.level = _this.player.passiveSkill[name].level);
            res.push(data);
          });
          return res;
        }
        var skillDatas = M("skill").getBaseDatas();
        skillDatas.forEach(function(a) {
          var data = {};
          data.name = a.name;
          data.level = 0;
          a.name in _this.player.skill && (data.level = _this.player.skill[a.name].level);
          res.push(data);
        });
        var passiveSkillDatas = M("skill").getPassiveBaseDatas();
        passiveSkillDatas.forEach(function(a) {
          var data = {};
          data.isPassive = true;
          data.name = a.name;
          data.level = 0;
          "HP" != a.name && "ATK" != a.name || (data.pencent = a.pencent);
          a.name in _this.player.passiveSkill && (data.level = _this.player.passiveSkill[a.name].level);
          res.push(data);
        });
        return res;
      },
      getRewardChipAssets: function getRewardChipAssets(level) {
        var roleData = H.getNextData(M("role").getPlayerBaseDatas(), level);
        var res = [ {
          type: "role",
          asset: roleData.asset
        }, {
          type: "skill",
          asset: roleData.skillName
        } ];
        return res;
      },
      addRewardChip: function addRewardChip(type) {
        var _this2 = this;
        var chipAssets = this.getRewardChipAssets(this.level);
        var addNum = H.num(this.level / 2);
        addNum < 1 && (addNum = 1);
        var add = function add(asset) {
          var chip = _this2.reward.chips.filter(function(a) {
            return a.type == type && a.asset == asset;
          })[0];
          chip ? chip.chip += addNum : _this2.reward.chips.push({
            type: type,
            asset: asset,
            chip: addNum
          });
        };
        chipAssets.filter(function(a) {
          return a.type == type;
        }).forEach(function(a) {
          add(a.asset);
          M(type).setChip(a.asset, "+", addNum);
        });
      },
      addRewardPropNum: function addRewardPropNum(asset, addNum) {
        addNum || (addNum = this.level);
        this.reward.prop[asset] += addNum;
        M("prop").setNum(asset, "+", addNum);
        M("achive").incCount("gainProp", asset, addNum);
      }
    };
    cc._RF.pop();
  }, {} ],
  fightSkillThumb: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3aa22J6oR5Bq66/F/pPZC0K", "fightSkillThumb");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(fight) {
        var _this = this;
        this.fight = fight;
        this.player = this.fight.player;
        this.itemNode = this.find("item");
        this.itemNode.active = false;
        this.items = [];
        this.passiveItems = [];
        var createItem = function createItem() {
          var node = H.inst(_this.itemNode);
          node.parent = _this.itemNode.parent;
          var item = {};
          item.node = node;
          item.iconSprite = _this.find("icon", cc.Sprite, node);
          item.levelLabel = _this.find("levelLabel", cc.Label, node);
          item.levelLabel.node.active = false;
          return item;
        };
        for (var i = 0; i < M("skill").getMaxNum(); i++) {
          var item = createItem();
          this.items.push(item);
        }
        for (var _i = 0; _i < M("skill").getMaxNum("passive"); _i++) {
          var _item = createItem();
          this.passiveItems.push(_item);
        }
        this.upd();
        this.updPassive();
      },
      upd: function upd() {
        if (!this.items) return;
        var skillNames = Object.keys(M("fight").player.skill);
        this.items.forEach(function(item, index) {
          var skillName = skillNames[index];
          if (skillName) {
            item.levelLabel.node.active = true;
            if (M("fight").player.skill[skillName].level < 10) {
              item.levelLabel.string = M("fight").player.skill[skillName].level;
              item.levelLabel.node.color = cc.color("#FFFFFF");
              item.iconSprite.spriteFrame = G("skill").getSpriteFrame(skillName, 0);
            } else {
              item.levelLabel.string = "MAX";
              item.levelLabel.node.color = cc.color("#FF0000");
              item.iconSprite.spriteFrame = G("skill").getSpriteFrame(skillName, 1);
            }
          } else {
            item.levelLabel.node.active = false;
            item.iconSprite.spriteFrame = null;
          }
        });
      },
      updPassive: function updPassive() {
        if (!this.passiveItems) return;
        var skillNames = Object.keys(M("fight").player.passiveSkill);
        this.passiveItems.forEach(function(item, index) {
          var skillName = skillNames[index];
          if (skillName) {
            item.levelLabel.node.active = true;
            item.iconSprite.spriteFrame = app.find[skillName + "SpriteFrame"];
            if (M("fight").player.passiveSkill[skillName].level < 10) item.levelLabel.string = M("fight").player.passiveSkill[skillName].level; else {
              item.levelLabel.string = "MAX";
              item.levelLabel.node.color = cc.color("#FF0000");
            }
          } else {
            item.levelLabel.node.active = false;
            item.iconSprite.spriteFrame = null;
          }
        });
      },
      onEnable: function onEnable() {
        E.on(G("skill").eventType.SET_LEVEL, this.upd, this);
        E.on(G("skill").eventType.SET_PASSIVE_LEVEL, this.updPassive, this);
      },
      onDisable: function onDisable() {
        E.off(G("skill").eventType.SET_LEVEL, this.upd, this);
        E.off(G("skill").eventType.SET_PASSIVE_LEVEL, this.updPassive, this);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  fightStop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "707c0NeHCJGYbfdv8l6Brqz", "fightStop");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {},
      onLoad: function onLoad() {
        this.addBtnEvents();
      },
      show: function show(fight) {
        this.touchClose = false;
        this.fight = fight;
        this.player = this.fight.player;
        this.exitBtn = this.find("exitBtn", cc.Button);
        this.exitBtn.node.active = true;
        this.reviveBtn = this.find("reviveBtn", cc.Button);
        this.reviveBtn.node.active = this.isLose() && M("fight").revive > 0;
        this.closeBtn = this.find("closeBtn", cc.Button);
        this.closeBtn.node.active = !this.isEnd() && !this.reviveBtn.node.active;
        this.doubleBtn = this.find("doubleBtn", cc.Button);
        this.updDoubleBtn();
        this.itemNode = this.find("skillCount/item");
        this.itemNode.active = false;
        this.killLabel = this.find("kill/label", cc.Label);
        this.goldLabel = this.find("gold/label", cc.Label);
        this.killLabel.string = H.num(M("fight").kill);
        for (var key in M("fight").player.skill) {
          var node = H.inst(this.itemNode);
          node.parent = this.itemNode.parent;
          var item = {};
          item.iconSprite = this.find("bg/icon", cc.Sprite, node);
          item.levelLabel = this.find("bg/levelLabel", cc.Label, node);
          item.titleLabel = this.find("titleLabel", cc.Label, node);
          item.hurtLabel = this.find("hurtLabel", cc.Label, node);
          item.dpsLabel = this.find("dpsLabel", cc.Label, node);
          if (M("fight").player.skill[key].level < 10) {
            item.titleLabel.string = L("skillInfo." + key + ".title");
            item.iconSprite.spriteFrame = G("skill").getSpriteFrame(key, 0);
            item.levelLabel.node.color = cc.color("#FFFFFF");
            item.levelLabel.string = M("fight").player.skill[key].level;
          } else {
            item.titleLabel.string = L("skillInfo." + key + ".title2");
            item.iconSprite.spriteFrame = G("skill").getSpriteFrame(key, 1);
            item.levelLabel.node.color = cc.color("#FF0000");
            item.levelLabel.string = "MAX";
          }
          item.hurtLabel.string = H.num(M("fight").player.skill[key].hurt);
          var second = M("fight").second - M("fight").player.skill[key].second;
          item.dpsLabel.string = H.num(M("fight").player.skill[key].hurt / second, 2);
        }
        this.chipRewardItemNode = this.find("chipRewardItem");
        this.chipRewardItemNode.active = false;
        this.initChipItems();
        this.propItemNode = this.find("propItem");
        this.propItemNode.active = false;
        this.initPropItems();
        return H.show(this);
      },
      initChipItems: function initChipItems() {
        var _this = this;
        this.chipRewardItems && this.chipRewardItems.forEach(function(a) {
          G("pool").put(a.node);
        });
        this.chipRewardItems = [];
        M("fight").reward.chips.filter(function(a) {
          return a.chip > 0;
        }).forEach(function(chip) {
          var item = {};
          item.node = G("pool").get(_this.chipRewardItemNode, "fightStopChipRewardItemNode");
          item.node.parent = _this.chipRewardItemNode.parent;
          item.chipNode = _this.find("chip", item.node);
          item.roleIconSprite = _this.find("roleIcon", cc.Sprite, item.node);
          item.roleIconSprite.node.active = false;
          item.skillIconSprite = _this.find("skillIcon", cc.Sprite, item.node);
          item.skillIconSprite.node.active = false;
          item.asset = chip.asset;
          if ("role" == chip.type) {
            item.chipNode.color = cc.color(M("role").getChipColor());
            item.roleIconSprite.node.active = true;
            G("role").loadSpriteFrame(chip.asset, function(spriteFrame) {
              item.roleIconSprite.spriteFrame = spriteFrame;
            });
          }
          if ("skill" == chip.type) {
            item.chipNode.color = cc.color(M("skill").getChipColor());
            item.skillIconSprite.node.active = true;
            item.skillIconSprite.spriteFrame = G("skill").getSpriteFrame(chip.asset, 0);
          }
          item.label = _this.find("label", cc.Label, item.node);
          item.label.string = H.numAbbr(chip.chip);
          _this.chipRewardItems.push(item);
        });
      },
      updChipItems: function updChipItems() {
        if (!this.chipRewardItems) return;
        this.chipRewardItems.forEach(function(item) {
          var chip = M("fight").reward.chips.filter(function(a) {
            return a.asset == item.asset;
          })[0];
          chip && (M("fight").reward.isDouble ? item.label.string = H.numAbbr(2 * chip.chip) : item.label.string = H.numAbbr(chip.chip));
        });
      },
      initPropItems: function initPropItems() {
        this.propItems && this.propItems.forEach(function(a) {
          G("pool").put(a.node);
        });
        this.propItems = [];
        for (var key in M("fight").reward.prop) {
          if ("gold" == key) continue;
          if (M("fight").reward.prop[key] > 0) {
            var item = {};
            item.node = G("pool").get(this.propItemNode, "fightStopPropItemNode");
            item.node.parent = this.propItemNode.parent;
            item.iconSprite = this.find("icon", cc.Sprite, item.node);
            item.iconSprite.spriteFrame = app.find[key + "SpriteFrame"];
            item.asset = key;
            item.label = this.find("label", cc.Label, item.node);
            item.label.string = H.numAbbr(M("fight").reward.prop[key]);
            this.propItems.push(item);
          }
        }
        this.goldLabel.string = H.num(M("fight").reward.prop.gold);
      },
      updPropItems: function updPropItems() {
        if (!this.propItems) return this.propItems;
        this.propItems.forEach(function(item) {
          item.asset in M("fight").reward.prop && (M("fight").reward.isDouble ? item.label.string = H.numAbbr(2 * M("fight").reward.prop[item.asset]) : item.label.string = H.numAbbr(M("fight").reward.prop[item.asset]));
        });
        M("fight").reward.isDouble ? this.goldLabel.string = H.num(2 * M("fight").reward.prop.gold) : this.goldLabel.string = H.num(M("fight").reward.prop.gold);
      },
      doubleBtnEvent: function doubleBtnEvent(node) {
        var _this2 = this;
        var btn = $(node, cc.Button);
        btn.interactable = false;
        V("tip").showLoading();
        var end = function end() {
          btn.interactable = true;
          V("tip").close();
        };
        var setReward = function setReward() {
          end();
          M("fight").reward.isDouble = true;
          _this2.updDoubleBtn();
          _this2.updChipItems();
          _this2.updPropItems();
          M("game").setReward(M("fight").reward);
          V("tip").success(L("success_gain"));
        };
        R("server").api("gameDoubleReward", {}).then(function(res) {
          console.log("server gameDoubleReward return ... ", res);
          if (0 == res.errcode) setReward(); else {
            6 == res.errcode ? V("tip").error("Insufficient potato") : V("tip").error(res.errcode);
            end();
          }
        });
      },
      updDoubleBtn: function updDoubleBtn() {
        if (M("fight").reward.isDouble) {
          this.doubleBtn.node.active = false;
          return;
        }
        this.doubleBtn.interactable = !M("fight").reward.isDouble;
        if (this.doubleBtn.interactable) {
          var has = false;
          M("fight").reward.chips.forEach(function(chip) {
            chip.chip > 0 && (has = true);
          });
          for (var key in M("fight").reward.prop) "gold" != key && M("fight").reward.prop[key] > 0 && (has = true);
          this.doubleBtn.node.active = has;
        }
      },
      closeBtnEvent: function closeBtnEvent() {
        M("fight").stop = false;
        this.remove();
      },
      reviveBtnEvent: function reviveBtnEvent(node) {
        var _this3 = this;
        var btn = $(node, cc.Button);
        if (!btn.interactable) return;
        if (M("fight").revive < 1) {
          V("tip").error(L("error_revive"));
          return;
        }
        V("tip").showLoading();
        var end = function end() {
          console.log("enter revive end ... ");
          btn.interactable = true;
          V("tip").close();
        };
        var setReward = function setReward() {
          end();
          M("fight").revive -= 1;
          _this3.player.data.HP = .1;
          G("role").setHP({
            self: _this3.player,
            target: _this3.player,
            action: "+",
            value: .5 * _this3.player.defData.HP
          });
          _this3.exitBtn.node.active = false;
          _this3.reviveBtn.node.active = false;
          _this3.closeBtn.node.active = true;
          V("tip").success(L("success_revive"));
        };
        R("server").api("gameRevive", {}).then(function(res) {
          console.log("server gameRevive return ... ", res);
          if (0 == res.errcode) setReward(); else {
            6 == res.errcode ? V("tip").error("Insufficient potato") : V("tip").error(res.errcode);
            end();
          }
        });
      },
      exitBtnEvent: function exitBtnEvent() {
        var _this4 = this;
        V("animMask").show("close", function() {
          R("server").api("gameSyncFight", {
            type: 4,
            round: M("fight").round + 1,
            selectLevel: M("fight").level,
            kill: M("fight").kill,
            isDouble: M("fight").reward.isDouble,
            gold: M("fight").reward.prop.gold,
            equipNum: M("fight").reward.prop.equipNum,
            chips: M("fight").reward.chips,
            playerLevel: M("fight").player.level,
            playerExp: M("fight").player.exp,
            skill: M("fight").player.skill,
            passiveSkill: M("fight").player.passiveSkill,
            nextExp: M("fight").player.nextExp
          }).then(function(res) {
            console.log("server gameSyncFight 4 finish return ... ", res);
            if (0 == res.errcode) {
              _this4.fight.remove();
              _this4.remove();
              G("pool").clearAll();
              V("animMask").show("open", function(animMask) {
                animMask.remove();
              });
              V("index").show();
            }
          });
        });
      },
      isLose: function isLose() {
        if (M("fight").second >= M("fight").maxSecond) return false;
        return this.player.data.HP <= 0;
      },
      isEnd: function isEnd() {
        if (this.player.data.HP <= 0) return true;
        if (M("fight").second >= M("fight").maxSecond) {
          var targets = G("role").roles.filter(function(a) {
            return "player" != a.group;
          });
          if (targets.length <= 0) return true;
        }
        return false;
      },
      onKeyDown: function onKeyDown(e) {
        e.keyCode == cc.macro.KEY.escape && this.closeBtn.node.active && this.closeBtnEvent();
      },
      onEnable: function onEnable() {
        this._super();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      },
      onDisable: function onDisable() {
        this._super();
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      }
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  fightUpLevel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e884qbBJVI+ZuvCuu9o8av", "fightUpLevel");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {},
      show: function show(fight, type) {
        void 0 === type && (type = "exp");
        this.touchClose = false;
        this.fight = fight;
        this.type = type;
        this.player = this.fight.player;
        this.itemNode = this.find("item");
        this.itemNode.active = false;
        this.adBtn = this.find("adBtn", cc.Button);
        this.adBtn.node.active = false;
        this.itemNum = 3;
        this.initItems();
        this.addBtnEvents();
        return H.show(this);
      },
      initItems: function initItems() {
        var _this = this;
        if ("exp" == this.type) {
          var skills = M("fight").getSkills().filter(function(a) {
            return !a.isPassive;
          });
          var mySkills = M("fight").getSkills(true).filter(function(a) {
            return !a.isPassive;
          });
          mySkills.length >= M("skill").getMaxNum() && (skills = M("fight").getSkills().filter(function(a) {
            return !a.isPassive && a.level > 0;
          }));
          var passiveSkills = M("fight").getSkills().filter(function(a) {
            return a.isPassive;
          });
          var myPassiveSkills = M("fight").getSkills(true).filter(function(a) {
            return a.isPassive;
          });
          myPassiveSkills.length >= M("skill").getMaxNum("passive") && (passiveSkills = M("fight").getSkills().filter(function(a) {
            return a.isPassive && a.level > 0;
          }));
          skills.length > 0 || passiveSkills.length > 0 ? this.skills = skills.concat(passiveSkills).filter(function(a) {
            return a.level < 10;
          }) : this.skills = [];
        } else this.skills = M("fight").getSkills().filter(function(a) {
          return a.level > 0 && a.level < 10;
        });
        this.skills = H.randArr(this.skills, 3);
        if (1 == this.skills.length) {
          this.skills.push({
            name: "gold"
          });
          this.skills.push({
            name: "healPotion"
          });
        } else if (2 == this.skills.length) this.skills.push({
          name: "gold"
        }); else if (this.skills.length < 1) {
          this.skills = [];
          this.skills.push({
            name: "gold"
          });
          this.skills.push({
            name: "healPotion"
          });
          this.adBtn.node.active = false;
        }
        this.adBtn.node.active = this.skills.length >= 3;
        this.skills.forEach(function(a) {
          var item = {};
          item.node = G("pool").get(_this.itemNode, "fightUpLevelItem");
          item.node.parent = _this.itemNode.parent;
          item.iconSprite = _this.find("icon", cc.Sprite, item.node);
          item.iconSprite.node.active = false;
          item.passiveNode = _this.find("passive", item.node);
          item.passiveNode.active = false;
          item.passiveIconSprite = _this.find("icon", cc.Sprite, item.passiveNode);
          item.passiveTitleLabel = _this.find("titleLabel", cc.Label, item.passiveNode);
          item.label = _this.find("label", cc.Label, item.node);
          item.upBtn = _this.find("upBtn", cc.Button, item.node);
          if ("gold" == a.name || "healPotion" == a.name) {
            item.iconSprite.node.active = true;
            item.iconSprite.spriteFrame = app.find[a.name + "SpriteFrame"];
            if ("gold" == a.name) {
              var val = 50 * M("fight").level;
              item.label.string = H.numAbbr(val);
              item.upBtn.node.on("touchend", function(e) {
                M("fight").addRewardPropNum("gold", val);
                _this.remove();
              });
            }
            if ("healPotion" == a.name) {
              item.label.string = 1;
              item.upBtn.node.on("touchend", function(e) {
                G("role").setHP({
                  self: _this.player,
                  target: _this.player,
                  action: "+",
                  value: .2 * _this.player.defData.HP
                });
                _this.remove();
              });
            }
            return;
          }
          var nextLevel = a.level + 1;
          if (nextLevel > 9) {
            item.label.string = "MAX";
            item.label.node.color = cc.color("#FF0000");
          } else if (a.level < 1) {
            item.label.string = "New";
            item.label.node.color = cc.color("#00FF00");
          } else {
            item.label.string = "Lv" + nextLevel;
            item.label.node.color = cc.color("#FFFFFF");
          }
          if (a.isPassive) {
            item.passiveNode.active = true;
            item.passiveTitleLabel.string = L("passiveSkillInfo." + a.name + ".title");
            "pencent" in a && (item.passiveTitleLabel.string += "+" + a.pencent + "%");
            item.passiveIconSprite.spriteFrame = app.find[a.name + "SpriteFrame"];
            a.level < 1 ? item.upBtn.node.on("touchend", function(e) {
              _this.setPassiveSkillLevel(a.name, 1);
              _this.remove();
            }) : item.upBtn.node.on("touchend", function(e) {
              _this.setPassiveSkillLevel(a.name, a.level + 1);
              _this.remove();
            });
          } else {
            item.iconSprite.node.active = true;
            a.level > 8 ? item.iconSprite.spriteFrame = G("skill").getSpriteFrame(a.name, 1) : item.iconSprite.spriteFrame = G("skill").getSpriteFrame(a.name, 0);
            a.level < 1 ? item.upBtn.node.on("touchend", function(e) {
              E.stop(e);
              _this.setSkillLevel(a.name, 1);
              _this.remove();
            }) : item.upBtn.node.on("touchend", function(e) {
              E.stop(e);
              _this.setSkillLevel(a.name, a.level + 1);
              _this.remove();
            });
            item.iconSprite.node.on("touchend", function(e) {
              E.stop(e);
              V("skillInfo").show(a.name);
            });
          }
        });
      },
      adBtnEvent: function adBtnEvent(node) {
        var _this2 = this;
        var btn = $(node, cc.Button);
        btn.interactable = false;
        V("tip").showLoading();
        var end = function end() {
          btn.interactable = true;
          V("tip").close();
        };
        var setReward = function setReward() {
          end();
          _this2.skills.forEach(function(a) {
            if ("gold" == a.name || "healPotion" == a.name) {
              "gold" == a.name && M("fight").addRewardPropNum("gold", 50 * M("fight").level);
              "healPotion" == a.name && G("role").setHP({
                self: _this2.player,
                target: _this2.player,
                action: "+",
                value: .2 * _this2.player.defData.HP
              });
              return;
            }
            if (a.isPassive) if (a.level < 1) {
              var passiveSkills = M("fight").getSkills(true).filter(function(a) {
                return a.isPassive;
              });
              passiveSkills.length < M("skill").getMaxNum() && _this2.setPassiveSkillLevel(a.name, 1);
            } else _this2.setPassiveSkillLevel(a.name, a.level + 1); else if (a.level < 1) {
              var skills = M("fight").getSkills(true).filter(function(a) {
                return !a.isPassive;
              });
              skills.length < M("skill").getMaxNum() && _this2.setSkillLevel(a.name, 1);
            } else _this2.setSkillLevel(a.name, a.level + 1);
          });
          _this2.remove();
        };
        R("server").api("gameClaimAll", {}).then(function(res) {
          console.log("server gameClaimAll return ... ", res);
          if (0 == res.errcode) setReward(); else {
            6 == res.errcode ? V("tip").error("Insufficient potato") : V("tip").error(res.errcode);
            end();
          }
        });
      },
      setSkillLevel: function setSkillLevel(skillName, level) {
        G("skill").setLevel(this.player, skillName, level);
        level > 9 && M("achive").incCount("useSkill", skillName);
      },
      setPassiveSkillLevel: function setPassiveSkillLevel(skillName, level) {
        G("skill").setPassiveLevel(this.player, skillName, level);
        level > 9 && M("achive").incCount("usePassiveSkill", skillName);
      },
      update: function update(dt) {
        if (!this.player) return;
        if (this.player.data.HP < 1) {
          this.remove();
          return;
        }
      }
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  fight: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "43a44n/SlZJzYmiCaYoL2JD", "fight");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      show: function show() {
        var _this = this;
        cc.game.setFrameRate(M("data").setting.frameRate);
        M("fight").init();
        M("fight").level = M("data").fight.selectLevel;
        R("server").api("gameStart", {
          selectLevel: M("data").fight.selectLevel
        }).then(function(res) {
          console.log("server gameStart return ... ", res);
          if (0 == res.errcode) {
            if (res.data) {
              _this.enemyCalPercent = res.data.enemyCalPercent;
              _this.diffcultDelta = res.data.diffcultDelta;
              _this.maxEnemyRangeNum = res.data.maxEnemyRangeNum;
              _this.maxEnemyNearNum = res.data.maxEnemyNearNum;
              _this.maxPropNum = res.data.maxPropNum;
              console.log("From gameStart ... ", res.data);
            }
          } else _this.forceEnd();
        });
        var screenTopNode = this.find("screenTop");
        if (app.screen.top > 0) {
          screenTopNode.active = true;
          screenTopNode.height = app.screen.top;
          $(screenTopNode, cc.Widget).top = -app.screen.top;
        } else screenTopNode.active = false;
        return H.show(this);
      },
      onLoad: function onLoad() {
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        this.addBtnEvents();
        G("role").init({
          parent1Node: this.find("roleParent1"),
          parent2Node: this.find("roleParent2"),
          effectParent2Node: this.find("effectParent2")
        });
        G("skill").init({
          parent1Node: this.find("skillParent1"),
          parent2Node: this.find("skillParent2")
        });
        G("effect").init({
          parent1Node: this.find("effectParent1"),
          parent2Node: this.find("effectParent2"),
          tipParentNode: this.find("tipParent")
        });
        this.minute = 0;
        this.enemyCalPercent = 50;
        this.diffcultDelta = 5;
        this.maxEnemyRangeNum = 40;
        this.maxEnemyNearNum = 300;
        this.maxPropNum = 2e3;
        console.log("From onLoad ... ", this.maxPropNum);
        this.expProgressBar = $(this.find("expProgressBar"), cc.ProgressBar);
        this.expProgressBar.progress = 0;
        this.levelLabel = this.find("levelLabel", cc.Label, this.expProgressBar.node);
        this.levelLabel.string = "Lv" + H.num(M("fight").player.level);
        this.fightLevelLabel = this.find("fightLevelLabel", cc.Label);
        this.fightLevelLabel.string = L("fightLevel", {
          level: H.numAbbr(M("fight").level)
        });
        this.secondLabel = this.find("secondLabel", cc.Label);
        this.secondLabel.string = H.secondFormat(M("fight").second, "{mm}:{ss}");
        this.killCountLabel = this.find("killCount/label", cc.Label);
        this.killCountLabel.string = H.num(M("fight").kill);
        this.goldCountLabel = this.find("goldCount/label", cc.Label);
        this.goldCountLabel.string = H.num(M("fight").reward.prop.gold);
        H.isNative() || (this.keyboardInput = H.add$(this.node, "keyboardInput"));
        this.joystickInput = $(H.inst(app.getPrefab("joystick")), "joystickInput");
        this.joystickInput.node.parent = this.find("joystickParent");
        this.bg = this.find("bg", "fightBg");
        var selectRoleData = M("data").roles.filter(function(a) {
          return a.selected;
        })[0];
        M("fight").player.asset = selectRoleData.asset;
        this.player = G("role").create({
          asset: selectRoleData.asset,
          data: M("role").createPlayerData(selectRoleData.asset)
        });
        H.isNative() ? this.player.initInput(this.joystickInput) : this.player.initInput([ this.keyboardInput, this.joystickInput ]);
        this.bg.init(this.player.node);
        G("dropProp").init({
          parent1Node: this.find("dropParent1"),
          parent2Node: this.find("dropParent2"),
          player: this.player
        });
        G("skill").setLevel(this.player, M("role").getPlayerBaseData(this.player.asset).skillName, 1);
        this.schedule(this.secondUpd, 1);
        this.fightSkillThumb = this.find("fightSkillThumb", "fightSkillThumb");
        this.fightSkillThumb.init(this);
      },
      secondUpd: function secondUpd() {
        var _this2 = this;
        if (M("fight").stop) return;
        if (!this.player) return;
        if (this.player.data.HP <= 0) {
          this.end();
          return;
        }
        M("fight").second += 1;
        this.secondLabel.string = H.secondFormat(M("fight").second, "{mm}:{ss}");
        this.minute = parseInt(M("fight").second / 60);
        if (M("fight").second >= M("fight").maxSecond) {
          if (M("fight").second == M("fight").maxSecond) {
            this.createEnemyBoss(2);
            R("server").api("gameSyncFight", {
              type: 2,
              round: M("fight").round,
              selectLevel: M("fight").level,
              kill: M("fight").kill,
              isDouble: M("fight").reward.isDouble,
              gold: M("fight").reward.prop.gold,
              equipNum: M("fight").reward.prop.equipNum,
              chips: M("fight").reward.chips,
              playerLevel: M("fight").player.level,
              playerExp: M("fight").player.exp,
              skill: M("fight").player.skill,
              passiveSkill: M("fight").player.passiveSkill,
              nextExp: M("fight").player.nextExp
            }).then(function(res) {
              console.log("server gameSyncFight 2 return ... ", res);
              0 == res.errcode;
            });
          }
          var targets = G("role").roles.filter(function(a) {
            return "player" != a.group;
          });
          if (targets.length < 1) {
            R("server").api("gameSyncFight", {
              type: 3,
              round: M("fight").round,
              selectLevel: M("fight").level,
              kill: M("fight").kill,
              isDouble: M("fight").reward.isDouble,
              gold: M("fight").reward.prop.gold,
              equipNum: M("fight").reward.prop.equipNum,
              chips: M("fight").reward.chips,
              playerLevel: M("fight").player.level,
              playerExp: M("fight").player.exp,
              skill: M("fight").player.skill,
              passiveSkill: M("fight").player.passiveSkill,
              nextExp: M("fight").player.nextExp
            }).then(function(res) {
              console.log("server gameSyncFight 3 finish return ... ", res);
              if (0 == res.errcode && M("fight").level >= M("data").fight.level) {
                M("data").fight.level += 1;
                M("fight").setSelectLevel("=", M("data").fight.level);
                M("achive").incCount("useRole", _this2.player.asset);
              }
            });
            this.end();
          }
          return;
        }
        if (M("fight").second % 60 == 0) {
          M("fight").round = M("fight").second / 60 + 1;
          M("fight").level <= 1 ? this.enemyCalPercent += this.diffcultDelta / 2 : this.enemyCalPercent += this.diffcultDelta;
          this.createEnemyBoss();
          R("server").api("gameSyncFight", {
            type: 1,
            round: M("fight").round,
            selectLevel: M("fight").level,
            kill: M("fight").kill,
            isDouble: M("fight").reward.isDouble,
            gold: M("fight").reward.prop.gold,
            equipNum: M("fight").reward.prop.equipNum,
            chips: M("fight").reward.chips,
            playerLevel: M("fight").player.level,
            playerExp: M("fight").player.exp,
            skill: M("fight").player.skill,
            passiveSkill: M("fight").player.passiveSkill,
            nextExp: M("fight").player.nextExp
          }).then(function(res) {
            console.log("server gameSyncFight 1 return ... ", res);
            0 == res.errcode;
          });
          this.minute >= 5 && this.createEnemyRanges(20);
        }
        H.calOdds(10) && this.createEnemyGroups();
        var num = this.minute;
        this.minute >= 5 && (num = 2 * this.minute);
        num < 1 && (num = 1);
        this.createEnemyNears(num);
      },
      createEnemyBoss: function createEnemyBoss(bossLevel) {
        void 0 === bossLevel && (bossLevel = 1);
        G("role").create({
          asset: H.randArr(M("role").getNearAssets()),
          target: this.player,
          data: M("role").createEnemyData({
            level: M("fight").level,
            bossLevel: bossLevel,
            calPercent: this.enemyCalPercent
          })
        });
      },
      createEnemyGroups: function createEnemyGroups() {
        G("role").createGroup({
          asset: H.randArr(M("role").getGroupAssets()),
          target: this.player,
          data: M("role").createEnemyData({
            level: M("fight").level,
            calPercent: this.enemyCalPercent
          })
        });
      },
      createEnemyRanges: function createEnemyRanges(num) {
        void 0 === num && (num = 20);
        var enemys = G("role").roles.filter(function(a) {
          return "enemy" == a.group && "range" == a.type;
        });
        if (enemys.length >= this.maxEnemyRangeNum) return;
        var assets = M("role").getRangeAssets();
        var asset = H.randArr(assets);
        for (var i = 1; i <= num; i++) {
          var enemy = G("role").create({
            asset: asset,
            target: this.player,
            data: M("role").createEnemyData({
              level: M("fight").level,
              calPercent: this.enemyCalPercent
            })
          });
          enemy.bullet = H.add$(enemy.node, "bullet", true);
          enemy.bullet.init(enemy);
          var arr = [ "enemyBullet1", "enemyBullet2", "enemyBullet3", "enemyBullet4" ];
          enemy.bullet.initData({
            asset: H.randArr(arr)
          });
        }
      },
      createEnemyNears: function createEnemyNears(num) {
        void 0 === num && (num = 1);
        var enemys = G("role").roles.filter(function(a) {
          return "enemy" == a.group && "near" == a.type;
        });
        if (enemys.length >= this.maxEnemyNearNum) return;
        num > 50 && (num = 50);
        for (var i = 1; i <= num; i++) {
          var assets = M("role").getNearAssets();
          G("role").create({
            asset: H.randArr(assets),
            target: this.player,
            data: M("role").createEnemyData({
              level: M("fight").level,
              calPercent: this.enemyCalPercent
            })
          });
        }
      },
      stopBtnEvent: function stopBtnEvent() {
        if (M("fight").stop) return;
        this.end();
      },
      onHurt: function onHurt(param) {
        param = _extends({}, {
          self: null,
          target: null,
          skill: null
        }, param);
        if (M("fight").stop) return;
        G("role").setHP({
          self: param.self,
          target: param.target,
          skill: param.skill,
          action: "-"
        });
      },
      onLose: function onLose(role) {
        var _this3 = this;
        if ("player" == role.group) {
          this.end();
          return;
        }
        M("fight").kill += 1;
        if (role.data.bossLevel) {
          if (role.data.bossLevel > 1) M("fight").level >= M("data").fight.level ? M("fight").addRewardPropNum("equipNum", 5) : M("fight").addRewardPropNum("equipNum", 1); else {
            if (H.calOdds(20)) {
              var _prop = G("dropProp").create({
                name: "dropEquip",
                by: role.node
              });
              _prop.onRemove = function() {
                G("audio").playEffect("equip");
                M("fight").addRewardPropNum("equipNum", 1);
              };
              return;
            }
            var prop = G("dropProp").create({
              name: "dropBox",
              by: role.node
            });
            prop.onRemove = function() {
              G("audio").playEffect("upLevel");
              M("fight").stop = true;
              var fightUpLevel = V("fightUpLevel").show(_this3, "box");
              fightUpLevel.onRemove = function() {
                M("fight").stop = false;
              };
            };
          }
          return;
        }
        var pickupDropProps = G("dropProp").getPickupDropProps();
        if (pickupDropProps.length >= this.maxPropNum) return;
        if (H.calOdds(.05)) {
          var _prop2 = G("dropProp").create({
            name: "dropFireJet",
            by: role.node
          });
          _prop2.onRemove = function() {
            var fireJet = H.add$(_this3.player.node, "fireJet", true);
            fireJet.init(_this3.player, "fireJet");
            fireJet.initData({
              timeout: 10
            });
          };
          return;
        }
        if (H.calOdds(.05)) {
          var _prop3 = G("dropProp").create({
            name: "healPotion",
            by: role.node
          });
          _prop3.onRemove = function() {
            G("audio").playEffect("healPotion");
            G("role").setHP({
              self: _this3.player,
              target: _this3.player,
              action: "+",
              value: .2 * _this3.player.defData.HP
            });
          };
          return;
        }
        if (H.calOdds(.01)) {
          var _prop4 = G("dropProp").create({
            name: "pickup",
            by: role.node
          });
          _prop4.onRemove = function(type) {
            if ("pickup" != type) return;
            G("audio").playEffect("pickup");
            G("dropProp").getPickupDropProps().forEach(function(dropProp) {
              dropProp.moveToTarget();
            });
          };
          return;
        }
        var dropChip = function dropChip(type) {
          var name = "role" == type ? "dropRoleChip" : "dropSkillChip";
          var prop = G("dropProp").create({
            name: name,
            by: role.node
          });
          prop.onRemove = function() {
            G("audio").playEffect("ding");
            M("fight").addRewardChip(type);
          };
        };
        if (H.calOdds(.05)) {
          dropChip("role");
          return;
        }
        if (H.calOdds(.05)) {
          dropChip("skill");
          return;
        }
        if (H.calOdds(5)) {
          var _prop5 = G("dropProp").create({
            name: "dropGold",
            by: role.node
          });
          _prop5.onRemove = function() {
            G("audio").playEffect("coin");
            M("fight").addRewardPropNum("gold");
          };
          return;
        }
        var updExp = function updExp(val) {
          var prop = G("dropProp").create({
            name: "dropExp" + val,
            by: role.node
          });
          prop.onRemove = function() {
            G("audio").playEffect("ding");
            M("fight").player.exp += val;
            M("fight").player.exp >= M("fight").player.nextExp && _this3.upLevel();
          };
        };
        if (this.minute <= 5) {
          H.calOdds(5) ? updExp(2) : updExp(1);
          return;
        }
        this.minute > 5 && this.minute <= 10 ? H.calOdds(30) ? updExp(2) : updExp(1) : H.calOdds(30) ? updExp(3) : updExp(2);
      },
      end: function end() {
        M("fight").stop = true;
        V("fightStop").show(this);
      },
      forceEnd: function forceEnd() {
        M("fight").stop = true;
        this.remove();
        G("pool").clearAll();
        V("index").show();
      },
      upLevel: function upLevel() {
        var _this4 = this;
        G("audio").playEffect("upLevel");
        this.expProgressBar.progress = M("fight").player.exp / M("fight").player.nextExp;
        M("fight").stop = true;
        M("fight").upLevel();
        var fightUpLevel = V("fightUpLevel").show(this, "exp");
        fightUpLevel.onRemove = function() {
          _this4.levelLabel.string = "Lv" + H.num(M("fight").player.level);
          M("fight").stop = false;
        };
      },
      onKeyDown: function onKeyDown(e) {
        if (e.keyCode == cc.macro.KEY.escape) {
          if (M("fight").stop) return;
          this.end();
        }
      },
      setFrameRate: function setFrameRate(val) {
        cc.game.setFrameRate(val);
      },
      onEnable: function onEnable() {
        var audioArr = [ "fight_bgm1", "fight_bgm2" ];
        G("audio").playMusic(H.randArr(audioArr));
        E.on(G("role").eventType.HURT, this.onHurt, this);
        E.on(G("role").eventType.LOSE, this.onLose, this);
        E.on(M("setting").eventType.SET_FRAMERATE, this.setFrameRate, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      },
      onDisable: function onDisable() {
        E.off(G("role").eventType.HURT, this.onHurt, this);
        E.off(G("role").eventType.LOSE, this.onLose, this);
        E.off(M("setting").eventType.SET_FRAMERATE, this.setFrameRate, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.player.camera.reset();
      },
      update: function update(dt) {
        if (M("fight").stop) return;
        this.expProgressBar.progress = M("fight").player.exp / M("fight").player.nextExp;
        this.killCountLabel.string = H.num(M("fight").kill);
        this.goldCountLabel.string = H.num(M("fight").reward.prop.gold);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  find: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0bc17mmeUZAZ7ubph3ouNwy", "find");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        goldSpriteFrame: cc.SpriteFrame,
        chipSpriteFrame: cc.SpriteFrame,
        equipNumSpriteFrame: cc.SpriteFrame,
        healPotionSpriteFrame: cc.SpriteFrame,
        randSpriteFrame: cc.SpriteFrame,
        videoSpriteFrame: cc.SpriteFrame,
        ATKSpriteFrame: cc.SpriteFrame,
        HPSpriteFrame: cc.SpriteFrame,
        SPDSpriteFrame: cc.SpriteFrame,
        propRadiusSpriteFrame: cc.SpriteFrame,
        stonySpriteFrames: [ cc.SpriteFrame ],
        drugSpriteFrames: [ cc.SpriteFrame ],
        dartSpriteFrames: [ cc.SpriteFrame ],
        fireBallSpriteFrames: [ cc.SpriteFrame ],
        holeSpriteFrames: [ cc.SpriteFrame ],
        swordSpriteFrames: [ cc.SpriteFrame ],
        magicBallSpriteFrames: [ cc.SpriteFrame ],
        lightningSpriteFrames: [ cc.SpriteFrame ],
        boomerangSpriteFrames: [ cc.SpriteFrame ],
        bombSpriteFrames: [ cc.SpriteFrame ],
        iceSpriteFrames: [ cc.SpriteFrame ],
        kniveSpriteFrames: [ cc.SpriteFrame ],
        gemSpriteFrames: [ cc.SpriteFrame ],
        laserSpriteFrames: [ cc.SpriteFrame ],
        tornadoSpriteFrames: [ cc.SpriteFrame ]
      }
    });
    cc._RF.pop();
  }, {} ],
  fireBallItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e3c16vY8KVL7JTX9ocKiyEZ", "fireBallItem");
    "use strict";
    cc.Class({
      extends: require("bulletItem"),
      properties: {},
      init: function init(param) {
        this._super(param);
        this.isCollide = false;
        this.targetUids = [];
      },
      onEnter: function onEnter(other, self) {
        var role = G("role").getRole(other.node, true);
        if (!role) return;
        if (!this.role) return;
        if (role.group == this.role.group) return;
        var hasUid = this.targetUids.filter(function(uid) {
          return uid == role.uid;
        })[0];
        if (hasUid) return;
        this.targetUids.push(role.uid);
        role.hurtRepel && role.hurtRepel(this.role.node);
        role.collide(self);
        this._super(other, self);
      }
    });
    cc._RF.pop();
  }, {
    bulletItem: "bulletItem"
  } ],
  fireJet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9fa4feoLHpFxpVg0w9w3gzP", "fireJet");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      initData: function initData(param) {
        param = _extends({}, {
          asset: "fireJet",
          timeout: 10,
          hurtPercent: 200
        }, param);
        this.remove();
        var node = G("pool").get(app.getPrefab(param.asset));
        node.parent = G("skill").parent2Node;
        this.skill = H.add$(node, "skill");
        this.skill.initBase({
          role: this.role,
          hurtPercent: param.hurtPercent,
          skillName: this.skillName
        });
        this.skill.isTemp = true;
        this.skill.isCollide = false;
        this.skill.isStay = true;
        this.timeout = param.timeout;
        this.radius = this.role.node.width / 2;
        this.defHurtCd = .2;
        this.hurtCd = this.defHurtCd;
        this.dir = cc.v2(1, 0);
        this.isInit = true;
      },
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
      },
      remove: function remove() {
        if (this.skill) {
          this.skill.node.removeComponent("skill");
          G("pool").put(this.skill.node);
          this.skill = null;
        }
      },
      update: function update(dt) {
        if (!this.isInit) return;
        if (M("fight").stop) return;
        if (this.hurtCd > 0) {
          this.hurtCd -= dt;
          this.skill.isCollide = false;
        } else {
          this.hurtCd = this.defHurtCd;
          this.skill.isCollide = true;
        }
        this.role.dir && (this.role.dir.equals(cc.Vec2.ZERO) || (this.dir = this.role.dir));
        this.skill.node.angle = 180 * Math.atan2(this.dir.y, this.dir.x) / Math.PI;
        var byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        var radian = Math.PI / 180 * this.skill.node.angle;
        var worldPos = cc.v2(0, 0);
        worldPos.x = byWorldPos.x + this.radius * Math.cos(radian);
        worldPos.y = byWorldPos.y + this.radius * Math.sin(radian);
        this.skill.node.setWorldPosition(worldPos);
        if (false === this.timeout) return;
        this.timeout -= dt;
        if (this.timeout > 0) return;
        this.remove();
        this.node.removeComponent(this);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  gainTip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "85f36yKasVHrZRZ6jySEiav", "gainTip");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {},
      show: function show(reward) {
        this.reward = reward;
        this.rewardParentNode = this.find("rewardParent");
        this.initItems();
        return H.show(this);
      },
      initItems: function initItems() {
        var _this = this;
        this.items && this.items.forEach(function(a) {
          G("pool").put(a.node);
        });
        this.items = [];
        var createItem = function createItem() {
          var node = G("pool").get(app.getPrefab("rewardItem"), "adBoxInforewardItem");
          node.parent = _this.rewardParentNode;
          return $(node, "rewardItem");
        };
        var reward = this.reward;
        if (reward.prop) for (var key in reward.prop) if (reward.prop[key] > 0) {
          var item = createItem();
          item.updProp(key, reward.prop[key]);
          this.items.push(item);
        }
        H.isArr(reward.chips) && reward.chips.forEach(function(chip) {
          if (chip.chip > 0) {
            var _item = createItem();
            _item.updChip(chip);
            _this.items.push(_item);
          }
        });
      },
      onEnable: function onEnable() {
        this._super();
        G("audio").playEffect("reward");
      }
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  gameCenterModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a3723EgWxND55Jgbkj7XgxG", "gameCenterModel");
    "use strict";
    module.exports = {
      sendLevel: function sendLevel() {
        if (!M("data").setting.gameCenter) return;
        if (M("data").player.isGuest) return;
        if (app.loader.version < 3) return;
        var level = H.num(M("data").fight.level - 1);
        level < 1 && (level = 1);
        R("apple").gameCenter.send({
          listId: "MBRO_level",
          value: level.toString()
        });
      }
    };
    cc._RF.pop();
  }, {} ],
  gameCneter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c939ernveJIk5wrrs8RP3R8", "gameCneter");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      onLoad: function onLoad() {
        if (H.isNative() && !H.isIos()) {
          this.node.active = false;
          return;
        }
        this.node.active = true;
        if (app.loader.version < 3 || M("data").player.isGuest) {
          this.node.active = false;
          return;
        }
        this.addBtnEvents();
        this.btn = this.find("btn", cc.Button);
        this.setBtn = this.find("setBtn", cc.Button);
        this.checkmarkNode = this.find("checkmark", this.setBtn.node);
        this.checkmarkNode.active = false;
        this.updBtns();
      },
      updBtn: function updBtn() {
        this.btn.interactable = R("apple").gameCenter.isAuthenticated();
      },
      btnEvent: function btnEvent() {
        if (R("apple").gameCenter.isAuthenticated()) {
          R("apple").gameCenter.showList({
            listId: "MBRO_level",
            type: "all"
          });
          return;
        }
        V("confirm").show(L("gameCenterSignTip"), function(bool) {
          bool && R("native").openSetting("GAMECENTER");
        });
      },
      updSetBtn: function updSetBtn() {
        if (R("apple").gameCenter.isAuthenticated()) {
          this.setBtn.interactable = true;
          this.checkmarkNode.active = M("data").setting.gameCenter;
        } else {
          this.setBtn.interactable = false;
          this.checkmarkNode.active = false;
        }
      },
      setBtnEvent: function setBtnEvent() {
        if (!this.setBtn.interactable) return;
        M("data").setting.gameCenter = !M("data").setting.gameCenter;
        this.updSetBtn();
      },
      updBtns: function updBtns() {
        this.updBtn();
        this.updSetBtn();
      },
      onEnable: function onEnable() {
        E.on(R("apple").gameCenter.eventType.SIGN, this.updBtns, this);
        E.on(R("apple").gameCenter.eventType.ERROR, this.updBtns, this);
      },
      onDisable: function onDisable() {
        E.off(R("apple").gameCenter.eventType.SIGN, this.updBtns, this);
        E.off(R("apple").gameCenter.eventType.ERROR, this.updBtns, this);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  gameModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "39ddaFQRhBCG6USPKfvMytK", "gameModel");
    "use strict";
    module.exports = {
      eventType: {
        SET_REWARD: "gameModel.setReward"
      },
      getSidReward: function getSidReward(isReal) {
        void 0 === isReal && (isReal = false);
        var res = {};
        res.prop = {};
        res.prop.gold = 1e4 * M("data").fight.level;
        res.prop.equipNum = 20;
        res.chips = [ {
          type: "role",
          asset: "?",
          chip: 20 * M("data").fight.level
        }, {
          type: "skill",
          asset: "?",
          chip: 20 * M("data").fight.level
        } ];
        return isReal ? this.getRealReward(res) : res;
      },
      getBoxReward: function getBoxReward(isReal) {
        void 0 === isReal && (isReal = false);
        var defData = M("data").getDefData();
        var res = {};
        res.cd = defData.timeCount.adBox;
        res.prop = {};
        res.prop.gold = 2e3 * M("data").fight.level;
        res.prop.equipNum = 5;
        res.chips = [ {
          type: "role",
          asset: "?",
          chip: 5 * M("data").fight.level
        }, {
          type: "skill",
          asset: "?",
          chip: 5 * M("data").fight.level
        } ];
        return isReal ? this.getRealReward(res) : res;
      },
      getRealReward: function getRealReward(reward) {
        reward.chips.forEach(function(chip) {
          if ("?" == chip.asset) {
            if ("role" == chip.type) {
              var baseDatas = M("role").getPlayerBaseDatas();
              var baseData = H.randArr(baseDatas);
              chip.asset = baseData.asset;
            }
            if ("skill" == chip.type) {
              var _baseDatas = M("skill").getBaseDatas();
              var _baseData = H.randArr(_baseDatas);
              chip.asset = _baseData.name;
            }
          }
        });
        return reward;
      },
      setReward: function setReward(reward) {
        if (reward.prop) for (var key in reward.prop) M("prop").setNum(key, "+", reward.prop[key]);
        reward.chips && reward.chips.forEach(function(chip) {
          "role" == chip.type && M("role").setChip(chip.asset, "+", chip.chip);
          "skill" == chip.type && M("skill").setChip(chip.asset, "+", chip.chip);
        });
        E.emit(this.eventType.SET_REWARD);
      }
    };
    cc._RF.pop();
  }, {} ],
  gemItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4dd89fiDs5GHr57kZqfIfOF", "gemItem");
    "use strict";
    cc.Class({
      extends: require("skill"),
      properties: {},
      init: function init(index, speed, timeout) {
        if (!this.role) return;
        this.isBullet = true;
        this.speed = speed;
        this.timeout = timeout;
        this.byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.node.setWorldPosition(this.byWorldPos);
        var target = this.role.getTarget();
        if (target) {
          var toWorldPos = target.bodyNode.getWorldPosition(cc.Vec2.ZERO);
          this.dir = toWorldPos.sub(this.byWorldPos).normalize();
        } else this.role.dir.equals(cc.Vec2.ZERO) ? this.dir = cc.v2(1, 0) : this.dir = this.role.dir.clone();
        if (index > 1) {
          var angle = 180 * Math.atan2(this.dir.y, this.dir.x) / Math.PI;
          index % 2 == 0 ? angle += 10 * index : angle -= 10 * (index - 1);
          var r = angle * Math.PI / 180;
          this.dir.x = Math.cos(r);
          this.dir.y = Math.sin(r);
        }
        this.node.angle = H.getDirAngle(this.dir);
        this.node.opacity = 255;
        this.changeDirCd = 0;
        this.isInit = true;
      },
      remove: function remove() {
        var _this = this;
        this.collider.enabled = false;
        cc.tween(this.node).to(.5, {
          opacity: 0
        }).call(function() {
          G("pool").put(_this.node);
        }).start();
      },
      checkView: function checkView() {
        return app.screen.checkView(this.role.node, this.node);
      },
      changeDir: function changeDir(curDir) {
        if (this.changeDirCd > 0) return H.getWorldPos(this.role.bodyNode).sub(H.getWorldPos(this.node)).normalize();
        this.changeDirCd = .2;
        var normalize = cc.v2(0, 0);
        var checkViewRes = this.checkView();
        checkViewRes.isMaxX ? normalize.x = 1 : checkViewRes.isMaxY && (normalize.y = 1);
        var res = curDir.sub(normalize.mul(2 * cc.Vec2.dot(curDir, normalize)));
        return res;
      },
      update: function update(dt) {
        if (!this.role) return;
        if (M("fight").stop) return;
        if (!this.isInit) return;
        this.timeout -= dt;
        if (this.timeout <= 0) {
          this.collider.enabled && this.remove();
          return;
        }
        if (!this.dir) return;
        this.changeDirCd -= dt;
        var checkViewRes = this.checkView();
        (checkViewRes.isMaxX || checkViewRes.isMaxY) && (this.dir = this.changeDir(this.dir));
        var speed = this.speed * dt;
        this.node.x += this.dir.x * speed;
        this.node.y += this.dir.y * speed;
        this.node.angle = H.getDirAngle(this.dir);
      }
    });
    cc._RF.pop();
  }, {
    skill: "skill"
  } ],
  gem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9ab6ejvYetIcaEWUCejF4gL", "gem");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
      },
      initData: function initData(param) {
        param = _extends({}, {
          asset: "",
          scale: 1,
          num: 1,
          cd: 3,
          timeout: 5,
          speed: 1200,
          hurtPercent: 100
        }, param);
        this.hurtPercent = param.hurtPercent;
        this.prefab = app.getPrefab(param.asset);
        this.scale = param.scale;
        this.num = param.num;
        this.speed = param.speed;
        this.timeout = param.timeout;
        this.defCd = param.cd;
        this.cd = this.defCd;
      },
      createItems: function createItems() {
        if (!G("skill").checkRole(this.role)) return;
        for (var i = 1; i <= this.num; i++) {
          var node = G("pool").get(this.prefab);
          node.scaleX = this.scale;
          node.scaleY = this.scale;
          node.parent = G("skill").parent2Node;
          var skill = $(node, "skill");
          skill.initBase({
            role: this.role,
            hurtPercent: this.hurtPercent,
            skillName: this.skillName
          });
          skill.init(i, this.speed, this.timeout);
        }
      },
      update: function update(dt) {
        if (!this.role) return;
        if (!this.prefab) return;
        if (M("fight").stop) return;
        this.cd -= dt;
        if (this.cd > 0) return;
        if ("enemy" == this.role.group && this.role.animExt.isPlaying("move")) return;
        this.createItems();
        this.cd = this.defCd;
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  helper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d8e15Pn1tCeJ6MEtYyQSQF", "helper");
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
    function _regeneratorRuntime() {
      _regeneratorRuntime = function _regeneratorRuntime() {
        return exports;
      };
      var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
      }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
          value: value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }), obj[key];
      }
      try {
        define({}, "");
      } catch (err) {
        define = function define(obj, key, value) {
          return obj[key] = value;
        };
      }
      function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
          value: makeInvokeMethod(innerFn, self, context)
        }), generator;
      }
      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }
      exports.wrap = wrap;
      var ContinueSentinel = {};
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function() {
        return this;
      });
      var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      function defineIteratorMethods(prototype) {
        [ "next", "throw", "return" ].forEach(function(method) {
          define(prototype, method, function(arg) {
            return this._invoke(method, arg);
          });
        });
      }
      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if ("throw" !== record.type) {
            var result = record.arg, value = result.value;
            return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            }) : PromiseImpl.resolve(value).then(function(unwrapped) {
              result.value = unwrapped, resolve(result);
            }, function(error) {
              return invoke("throw", error, resolve, reject);
            });
          }
          reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
          value: function value(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new PromiseImpl(function(resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }
            return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }
        });
      }
      function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
          if ("executing" === state) throw new Error("Generator is already running");
          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }
          for (context.method = method, context.arg = arg; ;) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if ("next" === context.method) context.sent = context._sent = context.arg; else if ("throw" === context.method) {
              if ("suspendedStart" === state) throw state = "completed", context.arg;
              context.dispatchException(context.arg);
            } else "return" === context.method && context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);
            if ("normal" === record.type) {
              if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
              return {
                value: record.arg,
                done: context.done
              };
            }
            "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
          }
        };
      }
      function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (void 0 === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", 
        context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", 
        context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), 
        ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, 
        context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, 
        "return" !== context.method && (context.method = "next", context.arg = void 0), 
        context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), 
        context.delegate = null, ContinueSentinel);
      }
      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], 
        entry.afterLoc = locs[3]), this.tryEntries.push(entry);
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
      }
      function Context(tryLocsList) {
        this.tryEntries = [ {
          tryLoc: "root"
        } ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
      }
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) return iteratorMethod.call(iterable);
          if ("function" == typeof iterable.next) return iterable;
          if (!isNaN(iterable.length)) {
            var i = -1, next = function next() {
              for (;++i < iterable.length; ) if (hasOwn.call(iterable, i)) return next.value = iterable[i], 
              next.done = !1, next;
              return next.value = void 0, next.done = !0, next;
            };
            return next.next = next;
          }
        }
        return {
          next: doneResult
        };
      }
      function doneResult() {
        return {
          value: void 0,
          done: !0
        };
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
      }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
      }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), 
      exports.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
      }, exports.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, 
        define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), 
        genFun;
      }, exports.awrap = function(arg) {
        return {
          __await: arg
        };
      }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
      }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
      }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
      }), define(Gp, "toString", function() {
        return "[object Generator]";
      }), exports.keys = function(val) {
        var object = Object(val), keys = [];
        for (var key in object) keys.push(key);
        return keys.reverse(), function next() {
          for (;keys.length; ) {
            var key = keys.pop();
            if (key in object) return next.value = key, next.done = !1, next;
          }
          return next.done = !0, next;
        };
      }, exports.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, 
          this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), 
          !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
        },
        stop: function stop() {
          this.done = !0;
          var rootRecord = this.tryEntries[0].completion;
          if ("throw" === rootRecord.type) throw rootRecord.arg;
          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) throw exception;
          var context = this;
          function handle(loc, caught) {
            return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", 
            context.arg = void 0), !!caught;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i], record = entry.completion;
            if ("root" === entry.tryLoc) return handle("end");
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              } else {
                if (!hasFinally) throw new Error("try statement without catch or finally");
                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }
          finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
          var record = finallyEntry ? finallyEntry.completion : {};
          return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", 
          this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if ("throw" === record.type) throw record.arg;
          return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, 
          this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), 
          ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), 
            resetTryEntry(entry), ContinueSentinel;
          }
        },
        catch: function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if ("throw" === record.type) {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          return this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
        }
      }, exports;
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var BigNumber = require("BigNumber");
    var qs = require("qs");
    var CircularJSON = require("circular-json");
    var ccHelper = require("ccHelper");
    var helper = {
      request: function request(url, data, method, timeout) {
        var _this = this;
        void 0 === timeout && (timeout = 5);
        return new Promise(function(resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.onload = function() {
            var res = xhr.responseText;
            if ("400" == xhr.status) {
              if (_this.isJson(res)) {
                reject(JSON.parse(res));
                return;
              }
              reject(res);
              return;
            }
            if ("404" == xhr.status) {
              reject("404 (Not Found)");
              return;
            }
            if (_this.isJson(res)) {
              resolve(JSON.parse(res));
              return;
            }
            resolve(res);
          };
          xhr.ontimeout = function() {
            reject("request timeout");
            return;
          };
          xhr.onerror = function() {
            reject("request network error");
            return;
          };
          xhr.timeout = 1e3 * timeout;
          var str2ab = function str2ab(str) {
            var buf = new ArrayBuffer(str.length);
            var bufView = new Uint8Array(buf);
            for (var i = 0, strLen = str.length; i < strLen; i++) bufView[i] = str.charCodeAt(i);
            return buf;
          };
          if (data && "buffer" === method) {
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            var ab = str2ab(qs.stringify(data));
            xhr.send(ab);
          } else if (data && "GET" === method) {
            url = url + "?" + qs.stringify(data);
            xhr.open("GET", url);
            xhr.send();
          } else if (data) {
            xhr.open("POST", url);
            xhr.send(qs.stringify(data));
          } else {
            xhr.open("GET", url);
            xhr.send();
          }
        });
      },
      isJson: function isJson(str) {
        if ("string" == typeof str) {
          var val = Number(str);
          if ("number" === typeof val && !isNaN(val)) return false;
          try {
            JSON.parse(str);
            return true;
          } catch (e) {
            return false;
          }
        }
        return false;
      },
      uid: function uid(size) {
        void 0 === size && (size = 21);
        var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
        var id = "";
        var i = size;
        while (i--) id += urlAlphabet[64 * Math.random() | 0];
        return id;
      },
      sysInfo: function sysInfo() {
        var res = {};
        res.platform = {};
        for (var key in cc.sys) "platform" != key && cc.sys[key] == cc.sys.platform && (res.platform[key] = cc.sys[key]);
        res.os = cc.sys.os;
        res.language = cc.sys.language;
        res.languageCode = cc.sys.languageCode;
        return res;
      },
      isAndroid: function isAndroid() {
        return cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative;
      },
      isIos: function isIos() {
        return cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative;
      },
      isNative: function isNative() {
        return cc.sys.isNative;
      },
      isBrowser: function isBrowser() {
        return cc.sys.isBrowser;
      },
      isHans: function isHans() {
        if ("zh" === cc.sys.language && (-1 != cc.sys.languageCode.indexOf("hans") || "zh" == cc.sys.languageCode || "zh-cn" == cc.sys.languageCode || "zh_cn" == cc.sys.languageCode)) return true;
        return false;
      },
      isEmpty: function isEmpty(obj) {
        if (!obj) return true;
        if (0 === Object.keys(obj).length) return true;
        return false;
      },
      isArr: function isArr(val) {
        return "[object Array]" === Object.prototype.toString.call(val);
      },
      mini: function mini() {
        if ("undefined" != typeof wx) return wx;
        return null;
      },
      exitGame: function exitGame() {
        var mini = this.mini();
        if (mini) {
          mini.exitMiniProgram();
          return;
        }
        cc.game.end();
      },
      num: function num(_num, _float) {
        void 0 === _float && (_float = 0);
        _num = Number(_num);
        if (isNaN(_num)) return 0;
        if (0 == _float) return Math.round(_num);
        if (1 == _float) return Math.round(10 * _num) / 10;
        if (2 == _float) return Math.round(100 * _num) / 100;
        return _num;
      },
      numAbbr: function numAbbr(num, _float2) {
        void 0 === _float2 && (_float2 = 2);
        num = this.num(num);
        if (num < 1e5) return num;
        num = new BigNumber(num).toFixed();
        var length = num.length;
        var units = [ "K", "M", "G", "T" ];
        var unitIndex = Math.ceil(length / 3) - 2;
        if (unitIndex >= 4) {
          var ens = "abcdefghijklmnopqrstuvwxyz".split("");
          ens.forEach(function(pre) {
            ens.forEach(function(val) {
              units.push(pre + val);
            });
          });
        }
        var unit = units[unitIndex];
        var leftLength = length - 3 * (Math.ceil(length / 3) - 1);
        var decimal = num.substring(leftLength, leftLength + _float2);
        var res = num.substring(0, leftLength);
        "00" != decimal && (res += "." + decimal);
        res += unit;
        return res;
      },
      clone: function clone(obj) {
        return CircularJSON.parse(CircularJSON.stringify(obj));
      },
      randArr: function randArr(arr, length, returnArr) {
        void 0 === length && (length = 1);
        void 0 === returnArr && (returnArr = false);
        if (!arr) {
          if (length > 1 || returnArr) return [];
          return;
        }
        if (arr.length < 1) return returnArr ? [] : "";
        if (length <= 1) {
          var res = arr[Math.floor(Math.random() * arr.length)];
          return returnArr ? [ res ] : res;
        }
        var tempArr = [];
        for (var i in arr) tempArr.push(arr[i]);
        var resArr = [];
        for (var _i2 = 0; _i2 < length; _i2++) {
          if (!(tempArr.length > 0)) break;
          var arrIndex = Math.floor(Math.random() * tempArr.length);
          resArr[_i2] = tempArr[arrIndex];
          tempArr.splice(arrIndex, 1);
        }
        return resArr;
      },
      randNum: function randNum(min, max, _float3) {
        void 0 === _float3 && (_float3 = false);
        return false === _float3 ? Math.round(Math.random() * (max - min)) + min : Math.random() * (max - min) + min;
      },
      calOdds: function calOdds(calVal) {
        if (!calVal) return 0;
        calVal *= 10;
        if (calVal >= 1e3) return true;
        var odds = Math.floor(1e3 * Math.random());
        if (odds < calVal) return true;
        return false;
      },
      time: function time(milli) {
        void 0 === milli && (milli = false);
        if (milli) return new Date().getTime();
        return parseInt(new Date().getTime().toString().substr(0, 10));
      },
      trim: function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
      },
      date: function date(t, str) {
        void 0 === str && (str = "Y-m-d H:i:s");
        t = t.toString() + "000";
        var d = new Date();
        d.setTime(parseInt(t));
        var _m = d.getMonth() + 1, _d = d.getDate(), _H = d.getHours(), _i = d.getMinutes(), _s = d.getSeconds(), format = {
          Y: d.getFullYear(),
          m: 1 == _m.toString().length ? "0" + _m : _m,
          d: 1 == _d.toString().length ? "0" + _d : _d,
          H: 1 == _H.toString().length ? "0" + _H : _H,
          i: 1 == _i.toString().length ? "0" + _i : _i,
          s: 1 == _s.toString().length ? "0" + _s : _s
        };
        for (var i in format) str = str.replace(new RegExp(i), format[i]);
        return str;
      },
      secondFormat: function secondFormat(second, format) {
        void 0 === format && (format = "{h}:{m}:{s}");
        var h = parseInt(second / 60 / 60 % 24);
        var hh = h < 10 ? "0" + h : h;
        var m = parseInt(second / 60 % 60);
        var mm = m < 10 ? "0" + m : m;
        var s = parseInt(second % 60);
        var ss = s < 10 ? "0" + s : s;
        return format.replace(/{h}/g, h).replace(/{hh}/g, hh).replace(/{m}/g, m).replace(/{mm}/g, mm).replace(/{s}/g, s).replace(/{ss}/g, ss);
      },
      pageArr: function pageArr(arr, size) {
        var length = arr.length;
        var newArr = [];
        var i = Math.ceil(length / size * 1);
        var j = 0;
        while (j < i) {
          var spare = length - j * size >= size ? size : length - j * size;
          var temp = arr.slice(j * size, j * size + spare);
          newArr.push(temp);
          j++;
        }
        return newArr;
      },
      toString: function toString(string) {
        if (!string) return "";
        "object" === typeof string && (string = String(string));
        if (string.replace) {
          string = string.replace(/\\n/g, "\n");
          string = string.replace(/<br\/> /g, "<br/>");
        }
        return string;
      },
      dedupe: function dedupe(arr, t) {
        var newArr = [ arr[0] ];
        if (t) for (var i = 1; i < arr.length; i++) {
          var repeat = false;
          for (var j = 0; j < newArr.length; j++) if (t && arr[i][t] === newArr[j][t]) {
            repeat = true;
            break;
          }
          repeat || newArr.push(arr[i]);
        } else for (var _i3 = 1; _i3 < arr.length; _i3++) {
          var _repeat = false;
          for (var _j = 0; _j < newArr.length; _j++) if (arr[_i3] === newArr[_j]) {
            _repeat = true;
            break;
          }
          _repeat || newArr.push(arr[_i3]);
        }
        return newArr;
      },
      arrExec: function arrExec(arr, callFunc, delay) {
        void 0 === delay && (delay = .2);
        var timeout = delay;
        var _loop = function _loop(i) {
          if (i <= 0) "function" === typeof arr[i] && arr[i](); else if (i > 0) {
            i > 1 && (timeout += delay);
            setTimeout(function() {
              "function" === typeof arr[i] && arr[i]();
            }, 1e3 * timeout);
          }
        };
        for (var i = 0; i < arr.length; i++) _loop(i);
        setTimeout(function() {
          callFunc && callFunc();
        }, 1e3 * timeout);
      },
      getNextData: function getNextData(arr, index) {
        if (index <= 0) return arr[0];
        var data;
        if (index <= arr.length) data = arr[index - 1]; else {
          var idx = index % arr.length;
          0 == idx && (idx = arr.length);
          data = arr[idx - 1];
        }
        data || (data = arr[0]);
        return data;
      },
      getVersion: function getVersion(version) {
        return "v" + version.toString().split("").join(".");
      },
      delay: function delay(second) {
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
             case 0:
              return _context.abrupt("return", new Promise(function(resolve) {
                return setTimeout(resolve, 1e3 * second);
              }));

             case 1:
             case "end":
              return _context.stop();
            }
          }, _callee);
        }))();
      }
    };
    "undefined" == typeof jsb ? helper.log = console.log : helper.log = function() {
      var str = "";
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
      args.forEach(function(a) {
        str += JSON.stringify(a);
        str += " ";
      });
      str = str.substr(0, str.length - 1);
      console.log(str);
    };
    module.exports = _extends({}, helper, ccHelper);
    cc._RF.pop();
  }, {
    BigNumber: "BigNumber",
    ccHelper: "ccHelper",
    "circular-json": "circular-json",
    qs: "qs"
  } ],
  hole: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "236ca48MW5MorcpDbNPNINA", "hole");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
      },
      initData: function initData(param) {
        param = _extends({}, {
          asset: "",
          scale: 1,
          color: "#FFFFFF",
          hurtCd: .5,
          hurtPercent: 100
        }, param);
        this.remove();
        var node = G("pool").get(app.getPrefab(param.asset));
        node.parent = G("skill").parent1Node;
        node.zIndex = cc.macro.MAX_ZINDEX;
        this.skill = H.add$(node, "skill");
        this.skill.node.scaleX = param.scale;
        this.skill.node.scaleY = param.scale;
        this.find("anim", this.skill.node).color = cc.color(param.color);
        this.skill.initBase({
          role: this.role,
          hurtPercent: param.hurtPercent,
          skillName: this.skillName
        });
        this.skill.isCollide = false;
        this.skill.isStay = true;
        this.skill.defHurtCd = param.hurtCd;
        this.skill.hurtCd = this.skill.defHurtCd;
        this.skill.update = this.update.bind(this);
      },
      remove: function remove() {
        if (this.skill) {
          this.skill.node.removeComponent("skill");
          G("pool").put(this.skill.node);
          this.skill = null;
        }
      },
      update: function update(dt) {
        if (!this.role) return;
        if (!this.skill) return;
        if (M("fight").stop) return;
        if (this.role.data.HP <= 0) {
          G("pool").put(this.skill.node);
          this.skill = null;
          return;
        }
        var byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.skill.node.setWorldPosition(byWorldPos);
        if (this.skill.hurtCd > 0) {
          this.skill.hurtCd -= dt;
          this.skill.isCollide = false;
        } else {
          this.skill.hurtCd = this.skill.defHurtCd;
          this.skill.isCollide = true;
        }
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  i18n: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a09c+/44hAeabNN/8TTjbF", "i18n");
    "use strict";
    var polyglot = require("polyglot.min");
    var polyInst = null;
    var initPolyglot = function initPolyglot(data) {
      data && (polyInst ? polyInst.replace(data) : polyInst = new polyglot({
        phrases: data,
        allowMissing: true
      }));
    };
    module.exports = {
      language: cc.sys.language,
      isInit: false,
      init: function init(lang) {
        var _this = this;
        lang || (lang = cc.sys.language);
        "zh" === lang && (lang = this.isHans() ? "zh" : "zh-hant");
        var init = function init(lang) {
          var data = require(lang);
          if (!data) throw "i18n Error: " + lang;
          initPolyglot(data);
          _this.language = lang;
          _this.isInit = true;
        };
        try {
          init(lang);
        } catch (err) {
          console.log(err);
          try {
            init("en");
          } catch (err) {
            console.log(err);
          }
        }
      },
      t: function t(key, opt) {
        if (polyInst) return polyInst.t(key, opt);
      },
      upd: function upd() {
        var rootNodes = cc.director.getScene().children;
        var allLocalizedLabels = [];
        for (var i = 0; i < rootNodes.length; ++i) {
          var labels = rootNodes[i].getComponentsInChildren("LocalizedLabel");
          Array.prototype.push.apply(allLocalizedLabels, labels);
          for (var _i = 0; _i < allLocalizedLabels.length; ++_i) {
            var label = allLocalizedLabels[_i];
            label.updateLabel();
          }
        }
        var allLocalizedSprites = [];
        for (var _i2 = 0; _i2 < rootNodes.length; ++_i2) {
          var sprites = rootNodes[_i2].getComponentsInChildren("LocalizedSprite");
          Array.prototype.push.apply(allLocalizedSprites, sprites);
        }
        for (var _i3 = 0; _i3 < allLocalizedSprites.length; ++_i3) {
          var sprite = allLocalizedSprites[_i3];
          sprite.updateSprite(this.language);
        }
      },
      isHans: function isHans() {
        if ("zh" === cc.sys.language && (-1 != cc.sys.languageCode.indexOf("hans") || "zh" == cc.sys.languageCode || "zh-cn" == cc.sys.languageCode || "zh_cn" == cc.sys.languageCode)) return true;
        return false;
      }
    };
    cc._RF.pop();
  }, {
    "polyglot.min": "polyglot.min"
  } ],
  iceItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "74d493jw8xAJq1fRnQd55bu", "iceItem");
    "use strict";
    cc.Class({
      extends: require("skill"),
      properties: {},
      init: function init(target, speed) {
        void 0 === speed && (speed = 800);
        this.isBullet = true;
        this.target = target;
        if (!this.target) {
          this.remove();
          return;
        }
        this.speed = speed;
        var toWorldPos = this.target.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.node.setWorldPosition(this.byWorldPos);
        this.dir = toWorldPos.sub(this.byWorldPos).normalize();
        G("effect").updDirAngle(this.node, this.dir);
        this.isInit = true;
      },
      initData: function initData(param) {
        this.freezeCd = param.freezeCd;
        this.freezeScale = param.freezeScale;
        this.pierce = param.pierce;
      },
      remove: function remove() {
        G("pool").put(this.node);
      },
      onEnter: function onEnter(other, self) {
        var role = G("role").getRole(other.node, true);
        if (!role) return;
        if (!this.role) return;
        if (role.group == this.role.group) return;
        if (!role.bossLevel) {
          role.state.sleep.cd = this.freezeCd;
          var asset = H.randArr([ "freeze", "freeze2" ]);
          role.effect[asset] = G("effect").create({
            by: role.node,
            asset: asset,
            timeout: this.freezeCd,
            once: true,
            parentNode: role.node
          });
          role.effect[asset].node.scaleX = this.freezeScale;
          role.effect[asset].node.scaleY = this.freezeScale;
        }
        if (false != this.pierce) {
          this.pierce -= 1;
          this.pierce <= 0 && this.remove();
        }
      },
      update: function update(dt) {
        if (!this.isInit) return;
        if (app.screen.isOutView(this.role.node, this.node)) {
          this.remove();
          return;
        }
        if (!this.dir) return;
        var speed = this.speed * dt;
        this.node.x += this.dir.x * speed;
        this.node.y += this.dir.y * speed;
      }
    });
    cc._RF.pop();
  }, {
    skill: "skill"
  } ],
  ice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1e5e8lg1h5BEpoMcQejgjAH", "ice");
    "use strict";
    var _cc$Class;
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
    cc.Class((_cc$Class = {
      extends: require("ccBase")
    }, _cc$Class["extends"] = cc.Component, _cc$Class.properties = {}, _cc$Class.init = function init(role, skillName) {
      this.role = role;
      this.skillName = skillName;
    }, _cc$Class.initData = function initData(param) {
      param = _extends({}, {
        asset: "",
        scale: 1,
        num: 1,
        speed: 800,
        cd: 3,
        pierce: 1,
        freezeCd: 1,
        freezeScale: 1,
        hurtPercent: 100
      }, param);
      this.param = param;
      this.hurtPercent = param.hurtPercent;
      this.prefab = app.getPrefab(param.asset);
      this.scale = param.scale;
      this.num = param.num;
      this.speed = param.speed;
      this.defCd = param.cd;
      this.cd = this.defCd;
    }, _cc$Class.createItems = function createItems() {
      var _this = this;
      if (!G("skill").checkRole(this.role)) return;
      var targets = G("role").getRandTargets(this.role, this.num);
      if (targets.length < 1) return;
      targets.forEach(function(target) {
        var node = G("pool").get(_this.prefab);
        node.scaleX = _this.scale;
        node.scaleY = _this.scale;
        node.parent = G("skill").parent2Node;
        var skill = $(node, "skill");
        skill.initBase({
          role: _this.role,
          hurtPercent: _this.hurtPercent,
          skillName: _this.skillName
        });
        skill.init(target, _this.speed);
        skill.initData(_this.param);
      });
    }, _cc$Class.update = function update(dt) {
      if (!this.role) return;
      if (!this.prefab) return;
      if (M("fight").stop) return;
      this.cd -= dt;
      if (this.cd > 0) return;
      if ("enemy" == this.role.group && this.role.animExt.isPlaying("move")) return;
      this.createItems();
      this.cd = this.defCd;
    }, _cc$Class));
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  indexAchive: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cbec8d39cFMaLF7CRAgL7vB", "indexAchive");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      onLoad: function onLoad() {
        this.itemNode = this.find("item");
        this.itemNode.active = false;
        this.initItems();
      },
      createItem: function createItem() {
        var item = {};
        item.node = G("pool").get(this.itemNode, "indexAchiveItem");
        item.node.parent = this.itemNode.parent;
        item.roleSprite = this.find("layout/roleIcon", cc.Sprite, item.node);
        item.iconSprite = this.find("layout/icon", cc.Sprite, item.node);
        item.levelLabel = this.find("layout/levelLabel", cc.Label, item.node);
        item.desLabel = this.find("desLabel", cc.Label, item.node);
        item.totalLabel = this.find("totalLabel", cc.Label, item.node);
        item.progressBar = this.find("progressBar", cc.ProgressBar, item.node);
        item.progressBar.progress = 0;
        item.progressBar.label = this.find("label", cc.Label, item.progressBar.node);
        item.progressBar.label.string = "0 / 0";
        item.reward = {};
        item.reward.node = this.find("reward", item.node);
        item.reward.label = this.find("label", cc.Label, item.reward.node);
        item.roleSprite.node.active = false;
        item.iconSprite.node.active = false;
        item.reward.node.active = false;
        return item;
      },
      initItems: function initItems() {
        var _this = this;
        this.items && this.items.forEach(function(a) {
          G("pool").put(a.node, true);
        });
        this.items = [];
        var _loop = function _loop(type) {
          if ("useRole" != type && "useSkill" != type && "usePassiveSkill" != type) for (var assetOrKey in M("achive").defData[type]) {
            var item = _this.createItem();
            item.type = type;
            item.assetOrKey = assetOrKey;
            item.desLabel.string = L("achiveInfo." + type + "." + assetOrKey);
            item.iconSprite.node.active = true;
            item.iconSprite.spriteFrame = app.find[assetOrKey + "SpriteFrame"];
            _this.items.push(item);
          } else {
            var baseDatas;
            var dataKey;
            if ("useRole" == type) {
              baseDatas = M("role").getPlayerBaseDatas();
              dataKey = "asset";
            }
            if ("useSkill" == type) {
              baseDatas = M("skill").getBaseDatas();
              dataKey = "name";
            }
            if ("usePassiveSkill" == type) {
              baseDatas = M("skill").getPassiveBaseDatas();
              dataKey = "name";
            }
            baseDatas.forEach(function(a) {
              var item = _this.createItem();
              item.type = type;
              item.assetOrKey = a[dataKey];
              item.desLabel.string = L("achiveInfo." + type);
              if ("useRole" == type) {
                item.roleSprite.node.active = true;
                G("role").loadSpriteFrame(item.assetOrKey, function(spriteFrame) {
                  item.roleSprite.spriteFrame = spriteFrame;
                });
              }
              if ("useSkill" == type) {
                item.iconSprite.node.active = true;
                item.iconSprite.spriteFrame = G("skill").getSpriteFrame(item.assetOrKey, 1);
              }
              if ("usePassiveSkill" == type) {
                item.iconSprite.node.active = true;
                item.iconSprite.spriteFrame = app.find[item.assetOrKey + "SpriteFrame"];
              }
              _this.items.push(item);
            });
          }
        };
        for (var type in M("achive").defData) _loop(type);
        this.items.forEach(function(item) {
          item.reward.node.on("touchend", function(e) {
            E.stop(e);
            if (!M("achive").isDone(item.type, item.assetOrKey)) {
              V("tip").error(L("error_action"));
              return;
            }
            R("server").api("claimAchiveReward", {
              type: item.type,
              assetOrKey: item.assetOrKey
            }).then(function(res) {
              if (0 == res.errcode) {
                var reward = M("achive").getReward(item.type, item.assetOrKey);
                M("game").setReward(reward);
                M("achive").incLevel(item.type, item.assetOrKey);
                V("gainTip").show(reward);
              }
            });
          });
          _this.updItem(item.type, item.assetOrKey);
        });
      },
      updItem: function updItem(type, assetOrKey) {
        if (!this.items) return;
        var item = this.items.filter(function(a) {
          return a.type == type && a.assetOrKey == assetOrKey;
        })[0];
        if (!item) return;
        item.totalLabel.string = L("total") + ": " + H.numAbbr(M("achive").getTotal(item.type, item.assetOrKey));
        var count = M("achive").getCount(type, assetOrKey);
        var nextCount = M("achive").getNextCount(type, assetOrKey);
        item.progressBar.progress = count / nextCount;
        item.progressBar.label.string = H.numAbbr(count) + " / " + H.numAbbr(nextCount);
        var level = M("achive").getLevel(type, assetOrKey);
        item.levelLabel.string = "Lv" + H.numAbbr(level);
        item.levelLabel.node.color = level > 0 ? cc.color("#F6DB96") : cc.color("#888888");
        item.reward.node.active = M("achive").isDone(type, assetOrKey);
        if (item.reward.node.active) {
          var reward = M("achive").getReward(item.type, item.assetOrKey);
          item.reward.label.string = H.numAbbr(reward.prop.gold);
        }
      },
      onInc: function onInc(type, assetOrKey) {
        this.updItem(type, assetOrKey);
      },
      onEnable: function onEnable() {
        E.on(M("achive").eventType.INC_COUNT, this.onInc, this);
        E.on(M("achive").eventType.INC_LEVEL, this.onInc, this);
      },
      onDisable: function onDisable() {
        E.off(M("achive").eventType.INC_COUNT, this.onInc, this);
        E.off(M("achive").eventType.INC_LEVEL, this.onInc, this);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  indexEquipSetting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4efbces6xJFAa/N62wYjwJe", "indexEquipSetting");
    "use strict";
    var State = cc.Enum({
      OPEN: 1,
      CLOSE: 2
    });
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      onLoad: function onLoad() {
        this.selectNode = this.find("select");
        this.selectNode.active = false;
        this.arrowNode = this.find("arrow");
        this.arrowNode.scaleY = -1;
        this.parentNode = this.find("parent");
        this.rankItemNode = this.find("rankItem");
        this.rankItemNode.active = false;
        this.starItemNode = this.find("starItem");
        this.starItemNode.active = false;
        this.allRankItem = {};
        this.allRankItem.node = this.find("allIRankItem");
        this.allRankItem.node.on("touchend", function(e) {
          E.stop(e);
          M("setting").setOpenEquip("rank", "*");
        });
        this.allRankItem.checkmarkNode = this.find("checkmark", this.allRankItem.node);
        this.allRankItem.checkmarkNode.active = false;
        this.allStarItem = {};
        this.allStarItem.node = this.find("allStarItem");
        this.allStarItem.node.on("touchend", function(e) {
          E.stop(e);
          M("setting").setOpenEquip("star", "*");
        });
        this.allStarItem.checkmarkNode = this.find("checkmark", this.allStarItem.node);
        this.allRankItem.checkmarkNode.active = false;
        this.rankSelectedItemNode = this.find("rankSelectedItem");
        this.rankSelectedItemNode.active = false;
        this.starSelectedItemNode = this.find("starSelectedItem");
        this.starSelectedItemNode.active = false;
        this.updSelectedItem();
        this.selectedNode = this.find("selected");
        this.selectedNode.active = true;
        this.state = State.CLOSE;
        this.node.on("touchend", this.onTouchEnd, this);
        this.selectNode.on("touchend", function(e) {
          E.stop(e);
        });
        this.initItems();
      },
      onTouchEnd: function onTouchEnd() {
        var _this = this;
        this.selectNode.stopAllActions();
        if (this.state == State.CLOSE) {
          this.selectedNode.active = false;
          this.state = State.OPEN;
          this.selectNode.height = 0;
          this.selectNode.active = true;
          cc.tween(this.selectNode).to(.2, {
            height: this.parentNode.height
          }).start();
        } else {
          this.selectedNode.active = true;
          this.state = State.CLOSE;
          cc.tween(this.selectNode).to(.1, {
            height: 0
          }).call(function() {
            _this.selectNode.active = false;
          }).start();
        }
        this.arrowNode.scaleY = this.state == State.CLOSE ? -1 : 1;
      },
      initItems: function initItems() {
        var _this2 = this;
        this.rankItems && this.rankItems.forEach(function(a) {
          G("pool").put(a.node, true);
        });
        this.rankItems = [];
        this.starItems && this.starItems.forEach(function(a) {
          G("pool").put(a.node, true);
        });
        this.starItems = [];
        var _loop = function _loop(i) {
          var rankItem = {};
          rankItem.rank = i;
          rankItem.node = G("pool").get(_this2.rankItemNode, "indexEquipSetting_rankItemNode");
          rankItem.node.parent = _this2.rankItemNode.parent;
          rankItem.iconNode = _this2.find("icon", rankItem.node);
          rankItem.iconNode.color = cc.color(M("equip").getColor({
            rank: i
          }));
          rankItem.checkmarkNode = _this2.find("checkmark", rankItem.node);
          rankItem.checkmarkNode.active = false;
          rankItem.node.on("touchend", function(e) {
            E.stop(e);
            M("setting").setOpenEquip("rank", i);
          });
          _this2.rankItems.push(rankItem);
          var starItem = {};
          starItem.star = i;
          starItem.node = G("pool").get(_this2.starItemNode, "indexEquipSetting_starItemNode");
          starItem.node.parent = _this2.starItemNode.parent;
          starItem.starLabel = _this2.find("starLabel", cc.Label, starItem.node);
          starItem.starLabel.string = i;
          starItem.checkmarkNode = _this2.find("checkmark", starItem.node);
          starItem.checkmarkNode.active = false;
          starItem.node.on("touchend", function(e) {
            E.stop(e);
            M("setting").setOpenEquip("star", i);
          });
          _this2.starItems.push(starItem);
        };
        for (var i = 1; i <= 5; i++) _loop(i);
        this.updRankItems();
        this.updStarItems();
      },
      updRankItems: function updRankItems() {
        if (!this.rankItems) return;
        this.allRankItem.checkmarkNode.active = "*" == M("data").setting.openEquip.rank;
        this.rankItems.forEach(function(item) {
          item.checkmarkNode.active = M("data").setting.openEquip.rank == item.rank;
        });
        this.updSelectedItem();
      },
      updStarItems: function updStarItems() {
        if (!this.starItems) return;
        this.allStarItem.checkmarkNode.active = "*" == M("data").setting.openEquip.star;
        this.starItems.forEach(function(item) {
          item.checkmarkNode.active = M("data").setting.openEquip.star == item.star;
        });
        this.updSelectedItem();
      },
      updSelectedItem: function updSelectedItem() {
        this.rankSelectedItemNode.active = "*" != M("data").setting.openEquip.rank;
        this.rankSelectedItemNode.active && (this.find("icon", this.rankSelectedItemNode).color = cc.color(M("equip").getColor({
          rank: M("data").setting.openEquip.rank
        })));
        this.starSelectedItemNode.active = "*" != M("data").setting.openEquip.star;
        this.starSelectedItemNode.active && (this.find("starLabel", cc.Label, this.starSelectedItemNode).string = M("data").setting.openEquip.star);
      },
      onEnable: function onEnable() {
        E.on(M("setting").eventType.SET_OPEN_EQUIP.rank, this.updRankItems, this);
        E.on(M("setting").eventType.SET_OPEN_EQUIP.star, this.updStarItems, this);
      },
      onDisable: function onDisable() {
        E.off(M("setting").eventType.SET_OPEN_EQUIP.rank, this.updRankItems, this);
        E.off(M("setting").eventType.SET_OPEN_EQUIP.star, this.updStarItems, this);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  indexEquip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e936CO0f5IIKJJSqPUgsaN", "indexEquip");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      onLoad: function onLoad() {
        this.selectRoleData = M("data").roles.filter(function(a) {
          return a.selected;
        })[0];
        this.HPLabel = this.find("HP/label", cc.Label);
        this.ATKLabel = this.find("ATK/label", cc.Label);
        this.attrItemNode = this.find("attrParent/attrItem");
        this.attrItemNode.active = false;
        this.skillAttrItemNode = this.find("attrParent/skillAttrItem");
        this.skillAttrItemNode.active = false;
        this.equipBtn = this.find("equipBtn", cc.Button);
        this.equipNumLabel = this.find("label", cc.Label, this.equipBtn.node);
        this.updEquipBtn();
        this.initEquipItems();
        this.initRoleDataItems();
        this.addBtnEvents();
      },
      initEquipItems: function initEquipItems() {
        var _this = this;
        this.equipItems && this.equipItems.forEach(function(a) {
          G("pool").put(a.node, true);
        });
        this.equipItems = [];
        this.find("equipParent").children.forEach(function(a, index) {
          var equipType = index + 1;
          a.children.forEach(function(posNode) {
            var pos = posNode.name;
            var equipData = M("equip").getData(equipType, pos);
            if (equipData) {
              var node = G("pool").get(app.getPrefab("equip"));
              node.parent = posNode;
              var equip = $(node, "equip");
              equip.upd(equipData);
              equip.node.on("touchend", function(e) {
                V("equipInfo").show(equipData);
              });
              _this.equipItems.push(equip);
            }
          });
        });
      },
      initRoleDataItems: function initRoleDataItems() {
        var _this2 = this;
        var roleData = M("role").createPlayerData(this.selectRoleData.asset);
        this.HPLabel.string = H.numAbbr(roleData.HP);
        this.ATKLabel.string = H.numAbbr(roleData.ATK);
        this.attrItems && this.attrItems.forEach(function(a) {
          G("pool").put(a.node);
        });
        this.attrItems = [];
        M("role").getAttrs("base").forEach(function(attr) {
          if (roleData[attr.key] > 0) {
            var attrItem = {};
            attrItem.node = G("pool").get(_this2.attrItemNode, "indexEquipAttrItemNode");
            attrItem.node.parent = _this2.attrItemNode.parent;
            attrItem.titleLabel = _this2.find("titleLabel", cc.Label, attrItem.node);
            attrItem.label = _this2.find("label", cc.Label, attrItem.node);
            attrItem.titleLabel.string = attr.name;
            attrItem.label.string = "+" + roleData[attr.key] + "%";
            _this2.attrItems.push(attrItem);
          }
        });
        M("role").getAttrs("skill").forEach(function(attr) {
          if (roleData[attr.key] > 0) {
            var attrItem = {};
            attrItem.node = G("pool").get(_this2.skillAttrItemNode, "indexEquipSkillAttrItemNode");
            attrItem.node.parent = _this2.skillAttrItemNode.parent;
            attrItem.label = _this2.find("label", cc.Label, attrItem.node);
            attrItem.iconSprite = _this2.find("icon", cc.Sprite, attrItem.node);
            attrItem.iconSprite.spriteFrame = G("skill").getSpriteFrame(attr.asset);
            attrItem.label.string = "+" + roleData[attr.key] + "%";
            _this2.attrItems.push(attrItem);
          }
        });
        this.attrItems.length > 0 ? this.attrItemNode.parent.active = true : this.attrItemNode.parent.active = false;
      },
      updEquipBtn: function updEquipBtn() {
        this.equipBtn.interactable = M("data").prop.equipNum > 0;
        this.equipNumLabel.string = "x" + H.num(M("data").prop.equipNum);
      },
      equipBtnEvent: function equipBtnEvent() {
        var preAddRes = M("equip").preAdd();
        if (!H.isEmpty(preAddRes.error)) {
          V("tip").error(L(preAddRes.error.equipNum));
          return;
        }
        var equipData = {};
        R("server").api("openEquipBox", {}).then(function(res) {
          if (0 == res.errcode) {
            equipData = res.data;
            V("addEquip").show(equipData);
          }
        });
        console.log("api return equipData ... ", equipData);
      },
      onAdd: function onAdd() {
        this.initEquipItems();
        this.initRoleDataItems();
      },
      onSetEquipNum: function onSetEquipNum() {
        this.updEquipBtn();
      },
      onUpLevel: function onUpLevel() {
        this.initEquipItems();
        this.initRoleDataItems();
      },
      onEnable: function onEnable() {
        E.on(M("equip").eventType.ADD, this.onAdd, this);
        E.on(M("prop").eventType.SET_NUM.equipNum, this.onSetEquipNum, this);
        E.on(M("equip").eventType.UP_LEVEL, this.onUpLevel, this);
      },
      onDisable: function onDisable() {
        E.off(M("equip").eventType.ADD, this.onAdd, this);
        E.off(M("prop").eventType.SET_NUM.equipNum, this.onSetEquipNum, this);
        E.off(M("equip").eventType.UP_LEVEL, this.onUpLevel, this);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  indexHero: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e449cC/S7NG15FSEfDEeJxc", "indexHero");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      onLoad: function onLoad() {
        var _this = this;
        this.upItemNode = this.find("upRoleItem");
        this.buyItemNode = this.find("buyRoleItem");
        this.upItemNode.active = false;
        this.buyItemNode.active = false;
        this.chipItemNode = this.find("chipItem");
        this.chipItemNode.active = false;
        this.ATKLevelBtn = this.find("ATKLevelBtn", cc.Button);
        this.ATKLevelBtn.tipDotNode = this.find("tipDot", this.ATKLevelBtn.node);
        this.ATKLevelBtn.tipDotNode.active = false;
        this.HPLevelBtn = this.find("HPLevelBtn", cc.Button);
        this.HPLevelBtn.tipDotNode = this.find("tipDot", this.HPLevelBtn.node);
        this.HPLevelBtn.tipDotNode.active = false;
        this.allUpBtn = this.find("allUpBtn", cc.Button);
        this.updAllUpBtn();
        this.updTipDot();
        this.scrollView = this.find("mask", cc.ScrollView);
        this.roleHelpHPLabel = this.find("roleHelp/HP/label", cc.Label);
        this.roleHelpATKLabel = this.find("roleHelp/ATK/label", cc.Label);
        this.initChipItems();
        this.initUpItems();
        this.initBuyItems();
        this.updRoleHelp();
        this.updSelectScroll();
        this.setUpType(M("data").upType);
        this.ATKLevelBtn.node.on("touchend", function(e) {
          if (!_this.ATKLevelBtn.interactable) return;
          _this.setUpType("ATK");
          G("audio").playEffect("popup");
        });
        this.HPLevelBtn.node.on("touchend", function(e) {
          if (!_this.HPLevelBtn.interactable) return;
          _this.setUpType("HP");
          G("audio").playEffect("popup");
        });
        this.allUpBtn.node.on("touchend", function(e) {
          if (!_this.allUpBtn.interactable) {
            V("tip").error(L("error_no_upLevel"));
            return;
          }
          var allUpPlayers = M("role").getAllUpDatas(M("data").upType);
          allUpPlayers.forEach(function(a) {
            var calRes = M("role").calUpLevel(a.asset, M("data").upType, 1);
            H.isEmpty(calRes.error) && _this.upLevel(a.asset);
          });
        });
        this.find("roleHelp/faqBtn").on("touchend", function(e) {
          V("tip").config({
            touchClose: true
          }).text(L("roleHelpTip"));
        });
      },
      setUpType: function setUpType(upType) {
        var _this2 = this;
        M("data").upType = upType;
        if ("ATK" == upType) {
          this.ATKLevelBtn.interactable = false;
          this.HPLevelBtn.interactable = true;
        } else {
          this.ATKLevelBtn.interactable = true;
          this.HPLevelBtn.interactable = false;
        }
        this.upItems.forEach(function(item) {
          _this2.updUpItem(item.asset);
        });
        this.updAllUpBtn();
      },
      initUpItems: function initUpItems() {
        var _this3 = this;
        this.upItems && this.upItems.forEach(function(a) {
          G("pool").put(a.node, true);
        });
        this.upItems = [];
        M("data").roles.forEach(function(a) {
          var item = {};
          item.node = G("pool").get(_this3.upItemNode, "indexHeroUpItemNode");
          item.node.parent = _this3.upItemNode.parent;
          item.asset = a.asset;
          item.iconSprite = _this3.find("role/icon", cc.Sprite, item.node);
          G("role").loadSpriteFrame(a.asset, function(spriteFrame) {
            item.iconSprite.spriteFrame = spriteFrame;
          });
          item.skillIconSprite = _this3.find("role/skillIcon", cc.Sprite, item.node);
          var baseData = M("role").getPlayerBaseData(item.asset);
          item.skillIconSprite.spriteFrame = G("skill").getSpriteFrame(baseData.skillName, 0);
          item.ATKLabel = _this3.find("ATK/label", cc.Label, item.node);
          item.ATKLabel.string = 0;
          item.HPLabel = _this3.find("HP/label", cc.Label, item.node);
          item.HPLabel.string = 0;
          item.goldLabel = _this3.find("gold/label", cc.Label, item.node);
          item.goldLabel.string = 0;
          item.chipLabel = _this3.find("chip/label", cc.Label, item.node);
          item.chipLabel.string = 0;
          item.upBtn = _this3.find("upBtn", cc.Button, item.node);
          item.upBtn.levelIconSprite = _this3.find("levelTypeIcon", cc.Sprite, item.upBtn.node);
          item.upBtn.levelLabel = _this3.find("levelLabel", cc.Label, item.upBtn.node);
          item.selectedNode = _this3.find("selected", item.node);
          item.selectedNode.active = false;
          item.upBtn.node.on("touchend", function(e) {
            E.stop(e);
            _this3.upLevel(item.asset);
          });
          item.node.on("touchend", function(e) {
            var playerData = M("role").getPlayerData(item.asset);
            if (playerData.selected) return;
            G("audio").playEffect("ding");
            M("role").setSelect(item.asset);
          });
          _this3.upItems.push(item);
        });
        this.upItems.forEach(function(a) {
          _this3.updUpItem(a.asset);
        });
      },
      updUpItem: function updUpItem(asset) {
        var item = this.upItems.filter(function(a) {
          return a.asset == asset;
        })[0];
        if (!item) return;
        var roleData = M("role").getPlayerData(asset);
        item.selectedNode.active = roleData.selected;
        var spriteFrame;
        spriteFrame = "ATK" == M("data").upType ? this.find("icon", cc.Sprite, this.ATKLevelBtn.node).spriteFrame : this.find("icon", cc.Sprite, this.HPLevelBtn.node).spriteFrame;
        item.upBtn.levelIconSprite.spriteFrame = spriteFrame;
        var level = roleData[M("data").upType + "Level"];
        item.upBtn.levelLabel.string = "Lv" + H.numAbbr(level);
        var roleFightData = M("role").createPlayerData(asset);
        item.ATKLabel.string = H.numAbbr(roleFightData.ATK);
        item.HPLabel.string = H.numAbbr(roleFightData.HP);
        var upRes = M("role").calUpLevel(asset, M("data").upType, 1);
        item.goldLabel.string = H.numAbbr(upRes.gold);
        item.chipLabel.string = H.numAbbr(upRes.chip);
        item.upBtn.interactable = true;
        if (upRes.error.gold) {
          item.upBtn.interactable = false;
          item.goldLabel.node.color = cc.color("#FF0000");
        } else item.goldLabel.node.color = cc.color("#FFFFFF");
        if (upRes.error.chip) {
          item.upBtn.interactable = false;
          item.chipLabel.node.color = cc.color("#FF0000");
        } else item.chipLabel.node.color = cc.color("#FFFFFF");
      },
      updUpItems: function updUpItems() {
        var _this4 = this;
        this.upItems.forEach(function(a) {
          _this4.updUpItem(a.asset);
        });
      },
      updSelectScroll: function updSelectScroll() {
        var _this5 = this;
        if (!this.upItems) return;
        var mul = 0;
        var selectItem;
        this.upItems.forEach(function(a, index) {
          var playerData = M("role").getPlayerData(a.asset);
          if (playerData.selected) {
            mul = index;
            selectItem = a;
          }
        });
        var itemOffsetY = selectItem.node.height * mul + 20 * mul;
        this.scheduleOnce(function() {
          _this5.scrollView.scrollToOffset(cc.v2(0, itemOffsetY), 0);
        });
      },
      setUpItemSelect: function setUpItemSelect(asset) {
        this.upItems.forEach(function(a) {
          a.selectedNode.active = false;
        });
        var item = this.upItems.filter(function(a) {
          return a.asset == asset;
        })[0];
        if (!item) return;
        item.selectedNode.active = true;
      },
      initBuyItems: function initBuyItems() {
        var _this6 = this;
        this.buyItems && this.buyItems.forEach(function(a) {
          G("pool").put(a.node, true);
        });
        this.buyItems = [];
        M("role").getPlayerBaseDatas().filter(function(a) {
          var roleData = M("data").roles.filter(function(b) {
            return a.asset == b.asset;
          })[0];
          return !roleData;
        }).forEach(function(a) {
          var item = {};
          item.node = G("pool").get(_this6.buyItemNode, "indexHeroBuyItemNode");
          item.node.parent = _this6.buyItemNode.parent;
          item.asset = a.asset;
          item.iconSprite = _this6.find("role/icon", cc.Sprite, item.node);
          G("role").loadSpriteFrame(a.asset, function(spriteFrame) {
            item.iconSprite.spriteFrame = spriteFrame;
          });
          item.skillIconSprite = _this6.find("role/skillIcon", cc.Sprite, item.node);
          var baseData = M("role").getPlayerBaseData(item.asset);
          item.skillIconSprite.spriteFrame = G("skill").getSpriteFrame(baseData.skillName, 0);
          item.goldLabel = _this6.find("gold/label", cc.Label, item.node);
          item.goldLabel.string = 0;
          item.chipLabel = _this6.find("chip/label", cc.Label, item.node);
          item.chipLabel.string = 0;
          item.buyBtn = _this6.find("buyBtn", cc.Button, item.node);
          item.buyBtn.node.on("touchend", function(e) {
            E.stop(e);
            _this6.buyRole(item.asset);
          });
          item.node.on("touchend", function(e) {
            V("tip").error(L("error_select_role"));
          });
          _this6.buyItems.push(item);
        });
        this.buyItems.forEach(function(a) {
          _this6.updBuyItem(a.asset);
        });
      },
      updBuyItem: function updBuyItem(asset) {
        var item = this.buyItems.filter(function(a) {
          return a.asset == asset;
        })[0];
        if (!item) return;
        var addRes = M("role").calAdd(asset);
        item.goldLabel.string = H.numAbbr(addRes.gold);
        item.chipLabel.string = H.numAbbr(addRes.chip);
        item.buyBtn.interactable = true;
        if (addRes.error.gold) {
          item.buyBtn.interactable = false;
          item.goldLabel.node.color = cc.color("#FF0000");
        } else item.goldLabel.node.color = cc.color("#FFFFFF");
        if (addRes.error.chip) {
          item.buyBtn.interactable = false;
          item.chipLabel.node.color = cc.color("#FF0000");
        } else item.chipLabel.node.color = cc.color("#FFFFFF");
      },
      updBuyItems: function updBuyItems() {
        var _this7 = this;
        this.buyItems.forEach(function(a) {
          _this7.updBuyItem(a.asset);
        });
      },
      initChipItems: function initChipItems() {
        var _this8 = this;
        this.chipItems = [];
        M("role").getPlayerBaseDatas().forEach(function(a) {
          var item = {};
          item.node = H.inst(_this8.chipItemNode);
          item.node.parent = _this8.chipItemNode.parent;
          item.iconSprite = _this8.find("icon", cc.Sprite, item.node);
          G("role").loadSpriteFrame(a.asset, function(spriteFrame) {
            item.iconSprite.spriteFrame = spriteFrame;
          });
          item.label = _this8.find("label", cc.Label, item.node);
          item.label.string = H.numAbbr(M("role").getChip(a.asset));
          item.asset = a.asset;
          _this8.chipItems.push(item);
        });
      },
      updChipItem: function updChipItem(asset) {
        var item = this.chipItems.filter(function(a) {
          return a.asset == asset;
        })[0];
        if (!item) return;
        item.label.string = H.numAbbr(M("role").getChip(asset));
      },
      updRoleHelp: function updRoleHelp() {
        var roleHelpData = M("role").getHelpData("role");
        console.log("Inde Hero / updRoleHelp / roleHelpData ... ", roleHelpData);
        this.roleHelpHPLabel.string = H.numAbbr(roleHelpData.HP);
        this.roleHelpATKLabel.string = H.numAbbr(roleHelpData.ATK);
      },
      upLevel: function upLevel(asset) {
        var upRes = M("role").upLevel(asset, M("data").upType, 1);
        if (!H.isEmpty(upRes.error)) {
          for (var key in upRes.error) {
            var color = "#FFFFFF";
            "chip" == key && (color = M("role").getChipColor());
            V("tip").error(upRes.error[key], app.find[key + "SpriteFrame"], color);
          }
          return;
        }
        G("audio").playEffect("upLevel");
        V("tip").success(L("success_upLevel"));
        var item = this.upItems.filter(function(a) {
          return a.asset == asset;
        })[0];
        if (!item) return;
        G("effect").create({
          asset: "upLevel",
          parentNode: item.iconSprite.node
        });
      },
      buyRole: function buyRole(asset) {
        R("server").api("buyRole", {
          asset: asset
        }).then(function(res) {
          if (0 == res.errcode) {
            var _res = M("role").add(asset);
            if (!H.isEmpty(_res.error)) {
              for (var key in _res.error) {
                var color = "#FFFFFF";
                "chip" == key && (color = M("role").getChipColor());
                V("tip").error(_res.error[key], app.find[key + "SpriteFrame"], color);
              }
              return;
            }
            V("tip").success(L("success_buy"));
          } else 3 == res.errcode ? V("tip").error("Insufficient gold") : 4 == res.errcode ? V("tip").error("Insufficient fragment") : V("tip").error(res.errcode);
        });
      },
      updTipDot: function updTipDot() {
        var _this9 = this;
        this.scheduleOnce(function() {
          _this9.ATKLevelBtn.tipDotNode.active = M("role").isTip("upLevel", "ATK");
          _this9.HPLevelBtn.tipDotNode.active = M("role").isTip("upLevel", "HP");
        });
      },
      updAllUpBtn: function updAllUpBtn() {
        var allUpPlayers = M("role").getAllUpDatas(M("data").upType);
        "ATK" == M("data").upType && (this.allUpBtn.interactable = M("role").isTip("upLevel", "ATK") && allUpPlayers.length > 0);
        "HP" == M("data").upType && (this.allUpBtn.interactable = M("role").isTip("upLevel", "HP") && allUpPlayers.length > 0);
      },
      onSetSelect: function onSetSelect(asset) {
        this.setUpItemSelect(asset);
        this.updUpItems();
        this.updRoleHelp();
      },
      onAdd: function onAdd(asset) {
        this.initUpItems();
        this.initBuyItems();
        this.updRoleHelp();
        this.updAllUpBtn();
      },
      onUpLevel: function onUpLevel(asset) {
        this.updUpItems();
        this.updRoleHelp();
        this.updAllUpBtn();
      },
      onSetChip: function onSetChip(asset) {
        this.updChipItem(asset);
        this.updUpItems();
        this.updBuyItems();
        this.updTipDot();
        this.updAllUpBtn();
      },
      onSetGold: function onSetGold() {
        this.updUpItems();
        this.updBuyItems();
        this.updTipDot();
        this.updAllUpBtn();
      },
      onEnable: function onEnable() {
        E.on(M("role").eventType.SELECT, this.onSetSelect, this);
        E.on(M("role").eventType.ADD, this.onAdd, this);
        E.on(M("role").eventType.SET_CHIP, this.onSetChip, this);
        E.on(M("role").eventType.UP_LEVEL, this.onUpLevel, this);
        E.on(M("prop").eventType.SET_NUM.gold, this.onSetGold, this);
      },
      onDisable: function onDisable() {
        E.off(M("role").eventType.SELECT, this.onSetSelect, this);
        E.off(M("role").eventType.ADD, this.onAdd, this);
        E.off(M("role").eventType.SET_CHIP, this.onSetChip, this);
        E.off(M("role").eventType.UP_LEVEL, this.onUpLevel, this);
        E.off(M("prop").eventType.SET_NUM.gold, this.onSetGold, this);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  indexSkill: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e7993J/9gZP1r5SeWCbaF8o", "indexSkill");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      onLoad: function onLoad() {
        var _this = this;
        this.chipItemNode = this.find("chipItem");
        this.chipItemNode.active = false;
        this.initChipItems();
        this.itemNode = this.find("upSkillItem");
        this.itemNode.active = false;
        this.initItems();
        this.allUpBtn = this.find("allUpBtn", cc.Button);
        this.updAllUpBtn();
        this.skillHelpHPLabel = this.find("skillHelp/HP/label", cc.Label);
        this.skillHelpATKLabel = this.find("skillHelp/ATK/label", cc.Label);
        this.updSkillHelp();
        this.find("skillHelp/faqBtn").on("touchend", function(e) {
          V("tip").config({
            touchClose: true
          }).text(L("skillHelpTip"));
        });
        this.allUpBtn.node.on("touchend", function(e) {
          if (!_this.allUpBtn.interactable) {
            V("tip").error(L("error_no_upLevel"));
            return;
          }
          var arr = M("skill").getAllUpDatas();
          arr.forEach(function(a) {
            var calRes = M("skill").calUpLevel(a.asset, 1);
            H.isEmpty(calRes.error) && _this.upLevel(a.asset);
          });
        });
      },
      initChipItems: function initChipItems() {
        var _this2 = this;
        this.chipItems = [];
        M("skill").getBaseDatas().forEach(function(a) {
          var item = {};
          item.node = H.inst(_this2.chipItemNode);
          item.node.parent = _this2.chipItemNode.parent;
          item.asset = a.name;
          item.iconSprite = _this2.find("icon", cc.Sprite, item.node);
          item.iconSprite.spriteFrame = G("skill").getSpriteFrame(item.asset, 0);
          item.label = _this2.find("label", cc.Label, item.node);
          item.label.string = H.numAbbr(M("skill").getChip(item.asset));
          _this2.chipItems.push(item);
        });
      },
      updChipItem: function updChipItem(asset) {
        var item = this.chipItems.filter(function(a) {
          return a.asset == asset;
        })[0];
        if (!item) return;
        item.label.string = H.numAbbr(M("skill").getChip(asset));
      },
      initItems: function initItems() {
        var _this3 = this;
        this.items && this.items.forEach(function(a) {
          G("pool").put(a.node, true);
        });
        this.items = [];
        M("skill").getBaseDatas().forEach(function(a) {
          var item = {};
          item.node = G("pool").get(_this3.itemNode, "indexSkillItemNode");
          item.node.parent = _this3.itemNode.parent;
          item.asset = a.name;
          item.iconSprite = _this3.find("skill/icon", cc.Sprite, item.node);
          item.iconSprite.spriteFrame = G("skill").getSpriteFrame(item.asset, 0);
          item.goldLabel = _this3.find("gold/label", cc.Label, item.node);
          item.goldLabel.string = 0;
          item.chipLabel = _this3.find("chip/label", cc.Label, item.node);
          item.chipLabel.string = 0;
          item.upBtn = _this3.find("upBtn", cc.Button, item.node);
          item.levelLabel = _this3.find("levelLabel", cc.Label, item.upBtn.node);
          item.levelLabel.string = "Lv0";
          item.upBtn.node.on("touchend", function(e) {
            E.stop(e);
            _this3.upLevel(item.asset);
          });
          item.iconSprite.node.parent.on("touchend", function(e) {
            E.stop(e);
            V("skillInfo").show(item.asset);
          });
          _this3.items.push(item);
        });
        this.items.forEach(function(a) {
          _this3.updItem(a.asset);
        });
      },
      updItem: function updItem(asset) {
        var item = this.items.filter(function(a) {
          return a.asset == asset;
        })[0];
        if (!item) return;
        item.levelLabel.string = "Lv" + H.numAbbr(M("skill").getLevel(asset));
        var calRes = M("skill").calUpLevel(asset, 1);
        item.goldLabel.string = H.numAbbr(calRes.gold);
        item.chipLabel.string = H.numAbbr(calRes.chip);
        item.upBtn.interactable = true;
        if (calRes.error.gold) {
          item.upBtn.interactable = false;
          item.goldLabel.node.color = cc.color("#FF0000");
        } else item.goldLabel.node.color = cc.color("#FFFFFF");
        if (calRes.error.chip) {
          item.upBtn.interactable = false;
          item.chipLabel.node.color = cc.color("#FF0000");
        } else item.chipLabel.node.color = cc.color("#FFFFFF");
      },
      updItems: function updItems() {
        var _this4 = this;
        if (!this.items) return;
        this.items.forEach(function(a) {
          _this4.updItem(a.asset);
        });
      },
      upLevel: function upLevel(asset) {
        var upRes = M("skill").upLevel(asset, 1);
        console.log("index Skill upLevel /// ", upRes);
        if (!H.isEmpty(upRes.error)) {
          for (var key in upRes.error) {
            var color = "#FFFFFF";
            "chip" == key && (color = M("skill").getChipColor());
            V("tip").error(upRes.error[key], app.find[key + "SpriteFrame"], color);
          }
          return;
        }
        G("audio").playEffect("upLevel");
        V("tip").success(L("success_upLevel"));
        var item = this.items.filter(function(a) {
          return a.asset == asset;
        })[0];
        console.log("success level up ... ", item);
        if (!item) return;
        G("effect").create({
          asset: "upLevel",
          parentNode: item.iconSprite.node
        });
      },
      updSkillHelp: function updSkillHelp() {
        var helpData = M("role").getHelpData("skill");
        this.skillHelpHPLabel.string = H.numAbbr(helpData.HP);
        this.skillHelpATKLabel.string = H.numAbbr(helpData.ATK);
      },
      updAllUpBtn: function updAllUpBtn() {
        var arr = M("skill").getAllUpDatas();
        this.allUpBtn.interactable = M("skill").isTip() && arr.length > 0;
      },
      onUpLevel: function onUpLevel() {
        console.log("Enter onUpLevel ... ");
        this.updItems();
        this.updSkillHelp();
        this.updAllUpBtn();
      },
      onSetChip: function onSetChip(asset) {
        this.updChipItem(asset);
        this.updItems();
        this.updAllUpBtn();
      },
      onSetGold: function onSetGold() {
        this.updItems();
        this.updAllUpBtn();
      },
      onEnable: function onEnable() {
        console.log("Registering UP_LEVEL event listener");
        E.on(M("skill").eventType.SET_CHIP, this.onSetChip, this);
        E.on(M("skill").eventType.UP_LEVEL, this.onUpLevel, this);
        E.on(M("prop").eventType.SET_NUM.gold, this.onSetGold, this);
      },
      onDisable: function onDisable() {
        console.log("Turn off register UP_LEVEL event listener");
        E.off(M("skill").eventType.SET_CHIP, this.onSetChip, this);
        E.off(M("skill").eventType.UP_LEVEL, this.onUpLevel, this);
        E.off(M("prop").eventType.SET_NUM.gold, this.onSetGold, this);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  index: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a7632EdQQxAuqUht0abDaoz", "index");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      onLoad: function onLoad() {
        cc.game.setFrameRate(60);
        this.viewDatas = [ {
          name: "indexHero",
          title: L("hero")
        }, {
          name: "indexSkill",
          title: L("skill")
        }, {
          name: "indexEquip",
          title: L("equip")
        }, {
          name: "indexAchive",
          title: L("achive")
        } ];
        this.viewBtns = [];
        this.initViewBtns();
        this.updAllTipDots();
        this.addBtnEvents();
        console.log("enter index ... ", M("data").prop);
        this.goldLabel = this.find("gold/label", cc.Label);
        this.updGold();
        this.potatoLabel = this.find("token/label", cc.Label);
        this.updPotato();
        this.showView("indexHero", false);
      },
      initViewBtns: function initViewBtns() {
        var _this = this;
        var viewBtnNode = this.find("viewBtnParent/layout/btn");
        viewBtnNode.active = false;
        this.viewDatas.forEach(function(a, index) {
          var node = H.inst(viewBtnNode);
          node.parent = viewBtnNode.parent;
          var btn = $(node, cc.Button);
          btn.index = index;
          btn.name = a.name;
          btn.label = _this.find("label", cc.Label, btn.node);
          btn.label.string = a.title;
          btn.tipDotNode = _this.find("tipDot", btn.node);
          btn.tipDotNode.active = false;
          btn.node.on("touchend", function(e) {
            if (!btn.interactable) return;
            _this.showView(btn.name);
          });
          _this.viewBtns.push(btn);
        });
      },
      updIndexHeroTipDot: function updIndexHeroTipDot() {
        var btn = this.viewBtns.filter(function(a) {
          return "indexHero" == a.name;
        })[0];
        if (!btn) return;
        this.scheduleOnce(function() {
          btn.tipDotNode.active = M("role").isTip("add") || M("role").isTip("upLevel", "ATK") || M("role").isTip("upLevel", "HP");
        });
      },
      updIndexSkillTipDot: function updIndexSkillTipDot() {
        var btn = this.viewBtns.filter(function(a) {
          return "indexSkill" == a.name;
        })[0];
        if (!btn) return;
        this.scheduleOnce(function() {
          btn.tipDotNode.active = M("skill").isTip();
        });
      },
      updIndexEquipTipDot: function updIndexEquipTipDot() {
        var btn = this.viewBtns.filter(function(a) {
          return "indexEquip" == a.name;
        })[0];
        if (!btn) return;
        this.scheduleOnce(function() {
          btn.tipDotNode.active = M("equip").isTip();
        });
      },
      updIndexAchiveTipDot: function updIndexAchiveTipDot() {
        var btn = this.viewBtns.filter(function(a) {
          return "indexAchive" == a.name;
        })[0];
        if (!btn) return;
        this.scheduleOnce(function() {
          btn.tipDotNode.active = M("achive").isTip();
        });
      },
      updAllTipDots: function updAllTipDots() {
        this.updIndexHeroTipDot();
        this.updIndexSkillTipDot();
        this.updIndexEquipTipDot();
        this.updIndexAchiveTipDot();
      },
      showView: function showView(viewName, isPlayAnim) {
        void 0 === isPlayAnim && (isPlayAnim = true);
        var btn = this.viewBtns.filter(function(a) {
          return a.name === viewName;
        })[0];
        if (!btn) return;
        if (!btn.interactable) return;
        var dir = "left";
        var prevBtn = this.viewBtns.filter(function(a) {
          return false === a.interactable;
        })[0];
        prevBtn && (dir = prevBtn.index > btn.index ? "left" : "right");
        this.viewBtns.filter(function(a) {
          return a.name != btn.name;
        }).forEach(function(a) {
          a.interactable = true;
        });
        btn.interactable = false;
        var prevView;
        prevBtn && (prevView = V(prevBtn.name));
        if (isPlayAnim) {
          if (prevView) {
            var _x = "right" === dir ? -app.screen.width : app.screen.width;
            prevView.node.stopAllActions();
            cc.tween(prevView.node).to(.2, {
              x: _x,
              opacity: 255
            }).call(function() {
              prevView.remove();
            }).start();
          }
          var _view = V(viewName, this.find("parent")).show();
          _view.node.opacity = 255;
          var x = "right" === dir ? app.screen.width : -app.screen.width;
          _view.node.x = x;
          _view.node.stopAllActions();
          cc.tween(_view.node).to(.2, {
            x: 0,
            opacity: 255
          }).start();
          G("audio").playEffect("popup");
          return;
        }
        prevView && prevView.remove();
        var view = V(viewName, this.find("parent")).show();
        view.node.opacity = 255;
      },
      updGold: function updGold() {
        this.goldLabel.string = H.numAbbr(M("data").prop.gold);
      },
      updPotato: function updPotato() {
        this.potatoLabel.string = H.num(M("data").prop.potato, 4);
      },
      myBtnEvent: function myBtnEvent() {
        V("my").show();
      },
      shareBtnEvent: function shareBtnEvent() {
        var share = {};
        H.isIos() ? share.title = L("ios_app_name") : share.title = L("android_app_name");
        share.url = "https://api-9grm21o25576f966-1302715122.tcloudbaseapp.com/MBRO/";
        R("native").share(share);
      },
      onSetGold: function onSetGold() {
        this.updGold();
        this.updAllTipDots();
      },
      onSetEquipNum: function onSetEquipNum() {
        this.updIndexEquipTipDot();
      },
      onAchiveInc: function onAchiveInc() {
        this.updIndexAchiveTipDot();
      },
      onEnable: function onEnable() {
        G("audio").playMusic("bgm1");
        E.on(M("prop").eventType.SET_NUM.gold, this.onSetGold, this);
        E.on(M("role").eventType.SET_CHIP, this.updIndexHeroTipDot, this);
        E.on(M("skill").eventType.SET_CHIP, this.updIndexSkillTipDot, this);
        E.on(M("prop").eventType.SET_NUM.equipNum, this.onSetEquipNum, this);
        E.on(M("achive").eventType.INC_COUNT, this.onAchiveInc, this);
        E.on(M("achive").eventType.INC_LEVEL, this.onAchiveInc, this);
      },
      onDisable: function onDisable() {
        E.off(M("prop").eventType.SET_NUM.gold, this.onSetGold, this);
        E.off(M("role").eventType.SET_CHIP, this.updIndexHeroTipDot, this);
        E.off(M("skill").eventType.SET_CHIP, this.updIndexSkillTipDot, this);
        E.off(M("prop").eventType.SET_NUM.equipNum, this.onSetEquipNum, this);
        E.off(M("achive").eventType.INC_COUNT, this.onAchiveInc, this);
        E.off(M("achive").eventType.INC_LEVEL, this.onAchiveInc, this);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  initApp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "26dee2SeRtHTrnHNjm0R4qm", "initApp");
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
    globalThis.E = new cc.EventTarget();
    E.stop = function(e) {
      e.stopPropagation && e.stopPropagation(e);
    };
    globalThis.H = require("helper");
    globalThis.$ = H.$;
    globalThis.log = H.log;
    globalThis.i18n = require("i18n");
    globalThis.L = i18n.t;
    var _require = require("localStorage"), localStorageInit = _require.localStorageInit, localStorage = _require.localStorage;
    cc.Class({
      editor: {
        menu: "base/initApp"
      },
      extends: require("ccBase"),
      properties: {
        screenNode: cc.Node,
        parentNode: cc.Node,
        popupParentNode: cc.Node
      },
      ctor: function ctor() {
        this.prefabs = [];
        this.audioClips = [];
        this.view = {};
        this.require = {};
      },
      load: function load(path, assetType) {
        var _this = this;
        this.assets || (this.assets = []);
        var key = path + assetType.toString();
        return new Promise(function(resolve, reject) {
          var asset = _this.assets.filter(function(a) {
            return a.key == key;
          })[0];
          if (asset) {
            resolve(asset.data);
            return;
          }
          _this.bundle.load(path, assetType, function(err, res) {
            if (err) {
              H.log("app.load", err);
              reject();
              return;
            }
            _this.assets.filter(function(a) {
              return a.key == key;
            })[0] || _this.assets.push({
              key: key,
              data: res
            });
            resolve(res);
          });
        });
      },
      loadDir: function loadDir(path, assetType) {
        var _this2 = this;
        return new Promise(function(resolve, reject) {
          _this2.bundle.loadDir(path, assetType, function(err, arr) {
            if (err) {
              reject(err);
              return;
            }
            resolve(arr);
          });
        });
      },
      loadAssets: function loadAssets(param) {
        var _this3 = this;
        param = _extends({}, {
          onSuccess: function onSuccess() {},
          onError: function onError(err) {},
          onProgress: function onProgress(completed, total) {}
        }, param);
        this.prefabs = [];
        this.audioClips = [];
        var promises = [];
        promises.push(new Promise(function(resolve, reject) {
          _this3.bundle.loadDir("./", cc.Prefab, function(completed, total) {
            param.onProgress(completed, total);
          }, function(err, arr) {
            if (err) {
              reject(err);
              return;
            }
            _this3.prefabs = arr;
            resolve();
          });
        }));
        promises.push(new Promise(function(resolve, reject) {
          _this3.bundle.loadDir("./", cc.AudioClip, function(completed, total) {
            param.onProgress(completed, total);
          }, function(err, arr) {
            if (err) {
              reject(err);
              return;
            }
            _this3.audioClips = arr;
            resolve();
          });
        }));
        Promise.all(promises).then(function() {
          param.onSuccess();
        })["catch"](function(err) {
          param.onError(err);
        });
      },
      getPrefab: function getPrefab(name) {
        return this.prefabs.filter(function(a) {
          return a.name == name;
        })[0];
      },
      getAudioClip: function getAudioClip(name) {
        return this.audioClips.filter(function(a) {
          return a.name == name;
        })[0];
      },
      V: function V(name, parentNode) {
        var _this4 = this;
        this.view[name] && (this.view[name].node || delete this.view[name]);
        if (this.view[name]) {
          parentNode && (this.view[name].node.parent = parentNode);
          return this.view[name];
        }
        cc.log("view\u5b9e\u4f8b", name);
        var prefab = this.getPrefab(name);
        if (!prefab) {
          cc.log("view\u672a\u627e\u5230", name);
          return;
        }
        var node = H.inst(prefab);
        H.add$(node, cc.BlockInputEvents, true);
        node.active = false;
        var res = H.add$(node, name, true);
        if (!res) {
          res = {};
          res.node = node;
        }
        if (parentNode) node.parent = parentNode; else {
          var popup = $(node, "ccPopup");
          node.parent = popup ? this.popupParentNode : this.parentNode;
        }
        H.setIndex(node, "last");
        res.show || (res.show = function() {
          node.active = true;
          return res;
        });
        res._close = function() {
          res.node.active = false;
        };
        res.onClose = function() {};
        res.close || (res.close = function() {
          res._close();
          res.onClose();
        });
        res._remove = function() {
          cc.log("view\u9500\u6bc1", name);
          res.node.destroy();
          delete _this4.view[name];
        };
        res.onRemove = function() {};
        res.remove || (res.remove = function() {
          res._remove();
          res.onRemove();
        });
        this.view[name] = res;
        return res;
      },
      R: function R(name) {
        if (this.require[name]) return this.require[name];
        try {
          this.require[name] = require(name);
          return this.require[name];
        } catch (err) {
          delete this.require[name];
          return null;
        }
      },
      M: function M(name) {
        return this.R(name + "Model");
      },
      G: function G(name) {
        return this.R(name + "Mgr");
      },
      S: function S(key, data) {
        return localStorage(key, data);
      },
      init: function init(param) {
        var _this5 = this;
        param = _extends({}, {
          appName: "IS_GAME",
          bundleName: "is_app",
          onSuccess: function onSuccess() {},
          onError: function onError(err) {},
          onProgress: function onProgress(completed, total) {}
        }, param);
        localStorageInit(param.appName);
        globalThis.S = this.S.bind(this);
        globalThis.M = this.M.bind(this);
        globalThis.V = this.V.bind(this);
        globalThis.G = this.G.bind(this);
        globalThis.R = this.R.bind(this);
        "undefined" == typeof app && (globalThis.app = {});
        app.load = this.load.bind(this);
        app.loadDir = this.loadDir.bind(this);
        app.getPrefab = this.getPrefab.bind(this);
        app.getAudioClip = this.getAudioClip.bind(this);
        this.screenNode && (app.screen = H.add$(this.screenNode, "screen", true));
        this.bundle = cc.assetManager.getBundle(param.bundleName);
        if (!this.bundle) {
          cc.assetManager.loadBundle(param.bundleName, {
            onFileProgress: function onFileProgress(completed, total) {
              param.onProgress(completed, total);
            }
          }, function(err, bundle) {
            if (err) {
              param.onError(err);
              bundle && bundle.releaseAll();
              return;
            }
            _this5.bundle = bundle;
            _this5.loadAssets(param);
          });
          return;
        }
        this.loadAssets(param);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase",
    helper: "helper",
    i18n: "i18n",
    localStorage: "localStorage"
  } ],
  inputSid: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "43ebecnkKRGCZuZxia8QU0M", "inputSid");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {
        editBox: cc.EditBox
      },
      show: function show() {
        this.initItems();
        this.addBtnEvents();
        return H.show(this);
      },
      initItems: function initItems() {
        var _this = this;
        var reward = M("game").getSidReward();
        var createItem = function createItem() {
          var node = G("pool").get(app.getPrefab("rewardItem"), "inputSidrewardItem");
          node.parent = _this.find("rewardParent");
          return $(node, "rewardItem");
        };
        for (var key in reward.prop) {
          var item = createItem();
          item.updProp(key, reward.prop[key]);
        }
        reward.chips.forEach(function(chip) {
          var item = createItem();
          item.updChip(chip);
        });
      },
      btnEvent: function btnEvent(node) {
        var _this2 = this;
        if (M("data").player.isGuest) {
          V("tip").error(L("error_guest"));
          return;
        }
        var friendSid = H.trim(this.editBox.string);
        if (M("data").player.childSids.length >= 100) {
          V("tip").error(L("error_sid_max"));
          return;
        }
        if (M("data").player.childSids.includes(friendSid)) {
          V("tip").error(L("error_sid_self"));
          return;
        }
        if (friendSid.length < 2 || friendSid.length >= 50) {
          V("tip").error(L("error_length", {
            length: "2-50"
          }));
          return;
        }
        if (friendSid == M("data").player.sid) {
          V("tip").error(L("error_sid_friendSid"));
          return;
        }
        var btn = $(node, cc.Button);
        if (!btn.interactable) return;
        btn.interactable = false;
        V("tip").showLoading();
        R("server").api("setSid", {
          sid: M("data").player.sid,
          friendSid: friendSid
        }).then(function(res) {
          btn.interactable = true;
          V("tip").close();
          if (res.error) {
            V("tip").error(res.error);
            return;
          }
          _this2.editBox.string = "";
          M("data").player.childSids.push(friendSid);
          var reward = M("game").getSidReward(true);
          M("game").setReward(reward);
          V("gainTip").show(reward);
        })["catch"](function(err) {
          btn.interactable = true;
          V("tip").close();
          V("tip").error(err);
        });
      }
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  joystickInput: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "90943xSnKpFHLpWT9HrpEhG", "joystickInput");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {
        stickNode: cc.Node
      },
      onEnable: function onEnable() {
        this.maxR = this.node.width / 2 - this.stickNode.width / 4 / 2;
        this.isUse = false;
        this.pos = cc.v2(0, 0);
        this.realDir = cc.v2(0, 0);
        this.node.parent.on("touchstart", this.activeTouch, this);
        this.node.parent.on("touchend", this.deactiveTouch, this);
        this.node.parent.on("touchmove", this.moveStick, this);
        this.deactiveTouch();
      },
      onDisable: function onDisable() {
        this.node.parent.off("touchstart", this.activeTouch, this);
        this.node.parent.off("touchend", this.deactiveTouch, this);
        this.node.parent.off("touchmove", this.moveStick, this);
      },
      activeTouch: function activeTouch(e) {
        this.isUse = true;
        this.node.opacity = 255;
        this.pos = e.getLocation();
        this.node.position = this.node.parent.convertToNodeSpaceAR(this.pos);
        this.stickNode.position = cc.v2(0, 0);
      },
      deactiveTouch: function deactiveTouch() {
        this.isUse = false;
        this.node.opacity = 0;
      },
      moveStick: function moveStick(e) {
        if (!this.isUse) return;
        var pos = e.getLocation();
        var posDelta = pos.sub(this.pos);
        var x = posDelta.x;
        var y = posDelta.y;
        var length = Math.sqrt(Math.pow(posDelta.x, 2) + Math.pow(posDelta.y, 2));
        if (this.maxR < length) {
          var mul = this.maxR / length;
          x *= mul;
          y *= mul;
        }
        this.stickNode.position = cc.v2(x, y);
        this.realDir = posDelta.normalize();
      },
      getDir: function getDir() {
        if (this.isUse) return cc.v2(this.stickNode.x / this.maxR, this.stickNode.y / this.maxR);
        return cc.v2(0, 0);
      },
      getRealDir: function getRealDir() {
        if (this.isUse) return this.realDir;
        return cc.v2(0, 0);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  keyboardInput: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e6da1ItUpBOy7dAuXP4rBFx", "keyboardInput");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      onEnable: function onEnable() {
        this.dir = cc.v2(0, 0);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      },
      onDisable: function onDisable() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      },
      onKeyUp: function onKeyUp(e) {
        e.keyCode != cc.macro.KEY.w && e.keyCode != cc.macro.KEY.up || (this.dir.y = 1 == this.dir.y ? 0 : this.dir.y);
        e.keyCode != cc.macro.KEY.s && e.keyCode != cc.macro.KEY.down || (this.dir.y = -1 == this.dir.y ? 0 : this.dir.y);
        e.keyCode != cc.macro.KEY.d && e.keyCode != cc.macro.KEY.right || (this.dir.x = 1 == this.dir.x ? 0 : this.dir.x);
        e.keyCode != cc.macro.KEY.a && e.keyCode != cc.macro.KEY.left || (this.dir.x = -1 == this.dir.x ? 0 : this.dir.x);
      },
      onKeyDown: function onKeyDown(e) {
        e.keyCode != cc.macro.KEY.w && e.keyCode != cc.macro.KEY.up || (this.dir.y = 1);
        e.keyCode != cc.macro.KEY.s && e.keyCode != cc.macro.KEY.down || (this.dir.y = -1);
        e.keyCode != cc.macro.KEY.d && e.keyCode != cc.macro.KEY.right || (this.dir.x = 1);
        e.keyCode != cc.macro.KEY.a && e.keyCode != cc.macro.KEY.left || (this.dir.x = -1);
      },
      getDir: function getDir() {
        return cc.v2(this.dir.x, this.dir.y).normalize();
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  kniveItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3b218mo1gRLJZI3FKxw47Ng", "kniveItem");
    "use strict";
    cc.Class({
      extends: require("skill"),
      properties: {},
      init: function init(target, speed) {
        this.target = target;
        if (!this.target) {
          this.remove();
          return;
        }
        var toWorldPos = this.target.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.node.setWorldPosition(this.byWorldPos);
        this.speed = speed;
        this.dir = toWorldPos.sub(this.byWorldPos).normalize();
        G("effect").updDirAngle(this.node, this.dir);
        this.isTemp = false;
        this.isInit = true;
      },
      onEnter: function onEnter(other, self) {
        if (!this.role) return;
        var skill = $(other.node, "skill");
        if (skill) {
          if (skill.role.group == this.role.group) return;
          if (!skill.isBullet) return;
          if (skill.remove) {
            G("effect").create({
              by: skill.node,
              asset: "boom"
            });
            skill.remove();
            return;
          }
        }
      },
      remove: function remove() {
        G("pool").put(this.node);
      },
      update: function update(dt) {
        if (!this.isInit) return;
        var dist = H.dist(this.byWorldPos, this.node.getWorldPosition(cc.Vec2.ZERO));
        if (dist > app.screen.width) {
          this.remove();
          return;
        }
        if (!this.dir) return;
        var speed = this.speed * dt;
        this.node.x += this.dir.x * speed;
        this.node.y += this.dir.y * speed;
      }
    });
    cc._RF.pop();
  }, {
    skill: "skill"
  } ],
  knive: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "149cdcrvGlE6olOIo/ojiad", "knive");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
      },
      initData: function initData(param) {
        param = _extends({}, {
          asset: "",
          scale: 1,
          num: 1,
          cd: 3,
          speed: 600,
          hurtPercent: 100
        }, param);
        this.hurtPercent = param.hurtPercent;
        this.prefab = app.getPrefab(param.asset);
        this.speed = param.speed;
        this.scale = param.scale;
        this.num = param.num;
        this.defCd = param.cd;
        this.cd = this.defCd;
      },
      createItems: function createItems() {
        if (!G("skill").checkRole(this.role)) return;
        var targets = G("role").getTargets(this.role, this.num);
        if (targets.length < 1) return;
        for (var i = 0; i < targets.length; i++) {
          var node = G("pool").get(this.prefab);
          node.scaleX = this.scale;
          node.scaleY = this.scale;
          node.parent = G("skill").parent2Node;
          var target = targets[i];
          var skill = $(node, "skill");
          skill.initBase({
            role: this.role,
            hurtPercent: this.hurtPercent,
            skillName: this.skillName
          });
          skill.init(target, this.speed);
        }
      },
      update: function update(dt) {
        if (!this.role) return;
        if (!this.prefab) return;
        if (M("fight").stop) return;
        this.cd -= dt;
        if (this.cd > 0) return;
        if ("enemy" == this.role.group && this.role.animExt.isPlaying("move")) return;
        this.createItems();
        this.cd = this.defCd;
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  laserItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "52759N5wzJE9p3y2YcG2AP0", "laserItem");
    "use strict";
    cc.Class({
      extends: require("skill"),
      init: function init(timeout) {
        this.animNode = this.find("anim");
        this.node.width = 0;
        this._toWorldPos = G("role").getEnemyWorldPos(this.role);
        this._byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.dir = this._toWorldPos.sub(this._byWorldPos).normalize();
        this.node.angle = H.getDirAngle(this.dir);
        this.updByWorldPos();
        this.updSize();
        this.timeout = timeout;
        this.isStay = true;
        this.defHurtCd = .2;
        this.hurtCd = this.defHurtCd;
        this.isInit = true;
      },
      updByWorldPos: function updByWorldPos() {
        var byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        var dir = this._toWorldPos.sub(byWorldPos).normalize();
        this.node.angle = H.getDirAngle(dir);
        var radian = Math.PI / 180 * this.node.angle;
        this.byWorldPos = cc.v2(0, 0);
        this.byWorldPos.x = byWorldPos.x + .5 * this.role.node.width * Math.cos(radian);
        this.byWorldPos.y = byWorldPos.y + .5 * this.role.node.height * Math.sin(radian);
        this.node.setWorldPosition(this.byWorldPos);
      },
      updSize: function updSize() {
        if (!this.collider) return;
        this.animNode.width = this.node.width;
        this.collider.size.width = this.node.width;
        this.collider.size.height = this.node.height;
        this.collider.offset.x = this.node.width / 2;
      },
      remove: function remove() {
        G("pool").put(this.node);
      },
      update: function update(dt) {
        if (!this.role) return;
        if (M("fight").stop) return;
        if (!this.isInit) return;
        this.updByWorldPos();
        var toWorldPos = cc.v2(this.byWorldPos.x, this.byWorldPos.y);
        if (this.dir) {
          toWorldPos.x += this.dir.x * app.screen.height;
          toWorldPos.y += this.dir.y * app.screen.height;
          var dist = H.dist(this.byWorldPos, toWorldPos);
          this.node.width = dist;
        }
        this.updSize();
        this.timeout -= dt;
        if (this.timeout <= 0) {
          this.collider.enabled && this.remove();
          return;
        }
        if (this.hurtCd > 0) {
          this.hurtCd -= dt;
          this.isCollide = false;
        } else {
          this.hurtCd = this.defHurtCd;
          this.isCollide = true;
        }
      }
    });
    cc._RF.pop();
  }, {
    skill: "skill"
  } ],
  laser: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "55668RZp/1F1ZsumzbSwiQr", "laser");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
      },
      initData: function initData(param) {
        param = _extends({}, {
          asset: "",
          scale: 1,
          num: 1,
          cd: 3,
          timeout: 5,
          hurtPercent: 10
        }, param);
        this.hurtPercent = param.hurtPercent;
        this.prefab = app.getPrefab(param.asset);
        this.scale = param.scale;
        this.num = param.num;
        this.timeout = param.timeout;
        this.defCd = param.cd;
        this.cd = this.defCd;
        this.skillCd = 0;
      },
      createItems: function createItems() {
        if (!G("skill").checkRole(this.role)) return;
        this.skillCd = this.timeout;
        for (var i = 1; i <= this.num; i++) {
          var node = G("pool").get(this.prefab);
          node.scaleX = this.scale;
          node.scaleY = this.scale;
          node.parent = G("skill").parent2Node;
          var skill = $(node, "skill");
          skill.initBase({
            role: this.role,
            hurtPercent: this.hurtPercent,
            skillName: this.skillName
          });
          skill.init(this.timeout);
        }
      },
      update: function update(dt) {
        if (!this.role) return;
        if (!this.prefab) return;
        if (M("fight").stop) return;
        if (this.skillCd > 0) {
          this.skillCd -= dt;
          return;
        }
        this.cd -= dt;
        if (this.cd > 0) return;
        if ("enemy" == this.role.group && this.role.animExt.isPlaying("move")) return;
        this.createItems();
        this.cd = this.defCd;
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  lightningItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "461f8kUzaVEr5BNhvWEYPKM", "lightningItem");
    "use strict";
    cc.Class({
      extends: require("skill"),
      properties: {},
      init: function init(target) {
        var _this = this;
        this.anim = this.find("anim", cc.Animation);
        var animState = this.anim.play();
        animState.once(cc.Animation.EventType.FINISHED, function() {
          G("pool").put(_this.node);
        });
        this.anim.skill = function() {
          _this.createBoom();
        };
        if (!this.role) return;
        if (!target) return;
        target.collide({
          node: this.node
        });
      },
      createBoom: function createBoom() {
        var boomAsset = "lightning2" == this.node.name ? "lightningBoom2" : "lightningBoom1";
        var node = G("pool").get(app.getPrefab(boomAsset));
        node.parent = G("skill").parent2Node;
        node.scaleX = this.node.scaleX;
        node.scaleY = this.node.scaleY;
        node.setWorldPosition(this.node.getWorldPosition(cc.Vec2.ZERO));
        var skill = H.add$(node, "skill", true);
        skill.isCollide = true;
        skill.initBase({
          role: this.role,
          hurtPercent: this.hurtPercent / 2,
          skillName: this.skillName
        });
        var anim = this.find("anim", cc.Animation, node);
        var animState = anim.play();
        animState.once(cc.Animation.EventType.FINISHED, function() {
          G("pool").put(node);
        });
        anim.skillEnd = function() {
          skill.isCollide = false;
        };
      }
    });
    cc._RF.pop();
  }, {
    skill: "skill"
  } ],
  lightning: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0bb35P2IxFHtaV2vcAZyfa2", "lightning");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
      },
      initData: function initData(param) {
        param = _extends({}, {
          asset: "",
          scale: 1,
          num: 1,
          cd: 3,
          hurtPercent: 100
        }, param);
        this.hurtPercent = param.hurtPercent;
        this.prefab = app.getPrefab(param.asset);
        this.scale = param.scale;
        this.num = param.num;
        this.defCd = param.cd;
        this.cd = this.defCd;
      },
      createItems: function createItems() {
        var _this = this;
        if (!G("skill").checkRole(this.role)) return;
        var targets = G("role").getRandTargets(this.role, this.num);
        if (targets.length < 1) return;
        targets.forEach(function(target) {
          var node = G("pool").get(_this.prefab);
          node.scaleX = _this.scale;
          node.scaleY = _this.scale;
          H.calOdds(50) && (node.scaleX = -node.scaleX);
          node.parent = G("skill").parent2Node;
          node.setWorldPosition(target.node.getWorldPosition(cc.Vec2.ZERO));
          var skill = $(node, "skill");
          skill.initBase({
            role: _this.role,
            hurtPercent: _this.hurtPercent,
            skillName: _this.skillName
          });
          skill.init(target);
        });
      },
      update: function update(dt) {
        if (!this.role) return;
        if (!this.prefab) return;
        if (M("fight").stop) return;
        this.cd -= dt;
        if (this.cd > 0) return;
        if ("enemy" == this.role.group && this.role.animExt.isPlaying("move")) return;
        this.createItems();
        this.cd = this.defCd;
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  loading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6153dLLRJ1C5LvGlDEHWiBg", "loading");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: cc.Label,
        progressLabel: cc.Label,
        progressBar: cc.ProgressBar
      },
      onLoad: function onLoad() {
        this.updProgress(0, 1);
      },
      tip: function tip(string, color) {
        void 0 === color && (color = "#FFFFFF");
        this.label.node.color = cc.color(color);
        this.label.string = string;
      },
      success: function success(string) {
        this.tip(string, "#00FF00");
      },
      error: function error(string) {
        this.tip(string, "#FF0000");
      },
      updProgress: function updProgress(completed, total) {
        var progress = completed / total;
        this.progressBar.progress = progress;
        this.progressLabel.string = this.num(100 * progress) + "%";
      },
      num: function num(_num) {
        _num = Number(_num);
        if (isNaN(_num)) return 0;
        return Math.round(100 * _num) / 100;
      },
      show: function show() {
        this.node.active = true;
        return this;
      },
      close: function close() {
        this.node.active = false;
        return this;
      },
      remove: function remove() {
        this.node.destroy();
      }
    });
    cc._RF.pop();
  }, {} ],
  localStorage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa24cuZQvFEWL+O/rwryVTD", "localStorage");
    "use strict";
    var crypt = require("crypt");
    var LocalStorage = {
      cryptKey: crypt.md5("!QAZ@WSX#eo2025C"),
      appName: "IS",
      init: function init(appName) {
        this.appName = appName;
      },
      encode: function encode(data) {
        return crypt.encode(data, this.cryptKey);
      },
      decode: function decode(cryptStr) {
        return crypt.decode(cryptStr, this.cryptKey);
      },
      get: function get(key) {
        try {
          key = this.appName + "_" + key;
          var data = cc.sys.localStorage.getItem(key);
          data && (data = JSON.parse(this.decode(data)));
          return data;
        } catch (err) {}
      },
      getAll: function getAll() {
        if (cc.sys.isNative) return;
        var res = {};
        for (var key in cc.sys.localStorage) if ("string" === typeof cc.sys.localStorage[key]) {
          var appKey = key.replace(this.appName + "_", "");
          key == this.appName + "_" + appKey && (res[appKey] = this.get(appKey));
        }
        return res;
      },
      set: function set(key, data) {
        try {
          key = this.appName + "_" + key;
          cc.sys.localStorage.setItem(key, this.encode(JSON.stringify(data)));
        } catch (err) {
          cc.log("Cache.set Error", err);
        }
      },
      clear: function clear(key) {
        key = this.appName + "_" + key;
        cc.sys.localStorage.removeItem(key);
      },
      clearAll: function clearAll() {
        if (cc.sys.isNative) {
          cc.sys.localStorage.clear();
          return;
        }
        for (var key in cc.sys.localStorage) if ("string" === typeof cc.sys.localStorage[key]) {
          var appKey = key.replace(this.appName + "_", "");
          key == this.appName + "_" + appKey && this.clear(appKey);
        }
      }
    };
    var localStorage = function localStorage(key, data) {
      try {
        if (null === key) return LocalStorage.clearAll();
        if (key) {
          if (null === data) return LocalStorage.clear(key);
          if (data || "boolean" === typeof data || "number" === typeof data) return LocalStorage.set(key, data);
          return LocalStorage.get(key);
        }
        return LocalStorage.getAll();
      } catch (err) {
        cc.log("LocalStorage Error", err);
      }
    };
    module.exports = {
      localStorageInit: function localStorageInit(appName) {
        LocalStorage.init(appName);
      },
      localStorage: localStorage
    };
    cc._RF.pop();
  }, {
    crypt: "crypt"
  } ],
  login: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b6eaw21+xMtbDmhFvpgbiI", "login");
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
    function _regeneratorRuntime() {
      _regeneratorRuntime = function _regeneratorRuntime() {
        return exports;
      };
      var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
      }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
          value: value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }), obj[key];
      }
      try {
        define({}, "");
      } catch (err) {
        define = function define(obj, key, value) {
          return obj[key] = value;
        };
      }
      function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
          value: makeInvokeMethod(innerFn, self, context)
        }), generator;
      }
      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }
      exports.wrap = wrap;
      var ContinueSentinel = {};
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function() {
        return this;
      });
      var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      function defineIteratorMethods(prototype) {
        [ "next", "throw", "return" ].forEach(function(method) {
          define(prototype, method, function(arg) {
            return this._invoke(method, arg);
          });
        });
      }
      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if ("throw" !== record.type) {
            var result = record.arg, value = result.value;
            return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            }) : PromiseImpl.resolve(value).then(function(unwrapped) {
              result.value = unwrapped, resolve(result);
            }, function(error) {
              return invoke("throw", error, resolve, reject);
            });
          }
          reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
          value: function value(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new PromiseImpl(function(resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }
            return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }
        });
      }
      function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
          if ("executing" === state) throw new Error("Generator is already running");
          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }
          for (context.method = method, context.arg = arg; ;) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if ("next" === context.method) context.sent = context._sent = context.arg; else if ("throw" === context.method) {
              if ("suspendedStart" === state) throw state = "completed", context.arg;
              context.dispatchException(context.arg);
            } else "return" === context.method && context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);
            if ("normal" === record.type) {
              if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
              return {
                value: record.arg,
                done: context.done
              };
            }
            "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
          }
        };
      }
      function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (void 0 === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", 
        context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", 
        context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), 
        ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, 
        context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, 
        "return" !== context.method && (context.method = "next", context.arg = void 0), 
        context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), 
        context.delegate = null, ContinueSentinel);
      }
      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], 
        entry.afterLoc = locs[3]), this.tryEntries.push(entry);
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
      }
      function Context(tryLocsList) {
        this.tryEntries = [ {
          tryLoc: "root"
        } ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
      }
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) return iteratorMethod.call(iterable);
          if ("function" == typeof iterable.next) return iterable;
          if (!isNaN(iterable.length)) {
            var i = -1, next = function next() {
              for (;++i < iterable.length; ) if (hasOwn.call(iterable, i)) return next.value = iterable[i], 
              next.done = !1, next;
              return next.value = void 0, next.done = !0, next;
            };
            return next.next = next;
          }
        }
        return {
          next: doneResult
        };
      }
      function doneResult() {
        return {
          value: void 0,
          done: !0
        };
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
      }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
      }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), 
      exports.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
      }, exports.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, 
        define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), 
        genFun;
      }, exports.awrap = function(arg) {
        return {
          __await: arg
        };
      }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
      }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
      }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
      }), define(Gp, "toString", function() {
        return "[object Generator]";
      }), exports.keys = function(val) {
        var object = Object(val), keys = [];
        for (var key in object) keys.push(key);
        return keys.reverse(), function next() {
          for (;keys.length; ) {
            var key = keys.pop();
            if (key in object) return next.value = key, next.done = !1, next;
          }
          return next.done = !0, next;
        };
      }, exports.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, 
          this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), 
          !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
        },
        stop: function stop() {
          this.done = !0;
          var rootRecord = this.tryEntries[0].completion;
          if ("throw" === rootRecord.type) throw rootRecord.arg;
          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) throw exception;
          var context = this;
          function handle(loc, caught) {
            return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", 
            context.arg = void 0), !!caught;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i], record = entry.completion;
            if ("root" === entry.tryLoc) return handle("end");
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              } else {
                if (!hasFinally) throw new Error("try statement without catch or finally");
                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }
          finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
          var record = finallyEntry ? finallyEntry.completion : {};
          return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", 
          this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if ("throw" === record.type) throw record.arg;
          return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, 
          this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), 
          ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), 
            resetTryEntry(entry), ContinueSentinel;
          }
        },
        catch: function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if ("throw" === record.type) {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          return this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
        }
      }, exports;
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    cc.Class({
      extends: require("ccBase"),
      properties: {
        webViewNode: cc.WebView,
        walletListPrefab: cc.Prefab
      },
      show: function show(callFunc) {
        var _this = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee() {
          var guestBtnLabel, unisatBtnLabel, tonBtnLabel;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
             case 0:
              console.log("enter login show ... ");
              _this.callFunc = callFunc;
              _this.guestBtn = _this.find("guestBtn", cc.Button);
              _this.guestBtn.node.active = true;
              _this.guestUnisatBtn = _this.find("guestUnisatBtn", cc.Button);
              _this.guestUnisatBtn.node.active = true;
              _this.guestTonBtn = _this.find("guestTonBtn", cc.Button);
              _this.guestTonBtn.node.active = true;
              guestBtnLabel = _this.find("guestBtn/layout/label", cc.Label);
              guestBtnLabel && (guestBtnLabel.string = "OKX Wallet");
              unisatBtnLabel = _this.find("guestUnisatBtn/layout/label", cc.Label);
              unisatBtnLabel && (unisatBtnLabel.string = "Unisat Wallet");
              tonBtnLabel = _this.find("guestTonBtn/layout/label", cc.Label);
              tonBtnLabel && (tonBtnLabel.string = "TON Wallet");
              _this.taptapBtn = _this.find("taptapBtn", cc.Button);
              _this.taptapBtn.node.active = false;
              _this.appleBtn = _this.find("appleBtn", cc.Button);
              _this.appleBtn.node.active = false;
              _this.qqBtn = _this.find("qqBtn", cc.Button);
              _this.qqBtn.node.active = false;
              _this.parentNode = _this.find("parent");
              _this.parentNode.active = true;
              _this.addBtnEvents();
              H.isEmpty(S("login_token")) ? _this.initSdk() : _this.requestLoginBackend({
                token: S("login_token")
              });
              return _context.abrupt("return", H.show(_this));

             case 25:
             case "end":
              return _context.stop();
            }
          }, _callee);
        }))();
      },
      initSdk: function initSdk() {
        this.initTonConnect();
      },
      initTonConnect: function initTonConnect() {
        if (!window.TonConnect) {
          var script = document.createElement("script");
          script.src = "https://unpkg.com/@tonconnect/sdk@latest/dist/tonconnect-sdk.min.js";
          script.async = true;
          script.onload = function() {
            console.log("TON Connect SDK loaded successfully");
          };
          document.head.appendChild(script);
        }
      },
      taptapBtnEvent: function taptapBtnEvent() {
        var _this2 = this;
        if (!H.isNative()) {
          this.login({
            account: "taptap",
            api: "taptap"
          });
          return;
        }
        R("taptap").login.onSign = function(res) {
          if (!res) {
            _this2.error("res Error");
            return;
          }
          if (!res.openid) {
            _this2.error("openid Error");
            return;
          }
          _this2.login({
            account: res.openid,
            nickname: res.nickname,
            api: "taptap"
          });
        };
        R("taptap").login.onClose = function() {};
        R("taptap").login.onError = function(err) {
          if (err) {
            _this2.error(err);
            return;
          }
          _this2.error(L("error_action"));
        };
        R("taptap").login.sign();
      },
      appleBtnEvent: function appleBtnEvent(node) {
        var _this3 = this;
        if (!H.isNative()) {
          this.login({
            account: "apple",
            api: "apple"
          });
          return;
        }
        var btn = $(node, cc.Button);
        if (!btn.interactable) return;
        btn.interactable = false;
        V("tip").showLoading();
        R("apple").login.onSign = function(res) {
          btn.interactable = true;
          V("tip").close();
          if (!res) {
            _this3.error("res Error");
            return;
          }
          if (!res.user) {
            _this3.error("user Error");
            return;
          }
          _this3.login({
            account: res.user,
            api: "apple"
          });
        };
        R("apple").login.onClose = function() {
          btn.interactable = true;
          V("tip").close();
        };
        R("apple").login.onError = function() {
          btn.interactable = true;
          V("tip").close();
          _this3.error(L("error_action"));
        };
        R("apple").login.sign();
      },
      qqBtnEvent: function qqBtnEvent() {
        var _this4 = this;
        if (!H.isNative()) {
          this.login({
            account: "qq",
            api: "qq"
          });
          return;
        }
        R("qq").login.onSign = function(res) {
          if (!res) {
            _this4.error("res Error");
            return;
          }
          if (!res.openid) {
            _this4.error("openid Error");
            return;
          }
          _this4.login({
            account: res.openid,
            api: "qq"
          });
        };
        R("qq").login.onClose = function() {};
        R("qq").login.onError = function(err) {
          if (err) {
            _this4.error(err);
            return;
          }
          _this4.error(L("error_action"));
        };
        R("qq").login.sign();
      },
      guestBtnEvent: function guestBtnEvent() {
        var _this5 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
             case 0:
              _context2.next = 2;
              return _this5.connectWithOKX();

             case 2:
             case "end":
              return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      guestUnisatBtnEvent: function guestUnisatBtnEvent() {
        var _this6 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
             case 0:
              _context3.next = 2;
              return _this6.connectWithUnisat();

             case 2:
             case "end":
              return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      guestTonBtnEvent: function guestTonBtnEvent() {
        var _this7 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee4() {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
             case 0:
              _context4.next = 2;
              return _this7.connectWithTON();

             case 2:
             case "end":
              return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      isWalletInstalled: function isWalletInstalled(walletType) {
        if ("okx" === walletType) return !!window.okxwallet;
        if ("unisat" === walletType) {
          console.log("window.unisat", window.unisat);
          return !!window.unisat;
        }
        if ("ton" === walletType) return !!window.tonkeeper || !!window.tonhub || !!window.tonwallet;
        return false;
      },
      getSignMessage: function getSignMessage() {
        return "Welcome to \ud83e\udd8eInscription Survivors!";
      },
      connectWithOKX: function connectWithOKX() {
        var _this8 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee5() {
          var addresses, walletAddress, messageToSign, sign, curPublicKey;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
             case 0:
              _context5.prev = 0;
              V("tip").showLoading("Connecting to OKX Wallet...");
              if (_this8.isWalletInstalled("okx")) {
                _context5.next = 6;
                break;
              }
              V("tip").close();
              _this8.error("OKX Wallet extension not found. Please install OKX Wallet.");
              return _context5.abrupt("return");

             case 6:
              if (!(window.okxwallet && window.okxwallet.fractalBitcoin)) {
                _context5.next = 40;
                break;
              }
              _context5.prev = 7;
              _context5.next = 10;
              return window.okxwallet.fractalBitcoin.disconnect();

             case 10:
              _context5.next = 12;
              return window.okxwallet.fractalBitcoin.requestAccounts();

             case 12:
              addresses = _context5.sent;
              if (!(!addresses || 0 === addresses.length)) {
                _context5.next = 17;
                break;
              }
              V("tip").close();
              _this8.error("No address found in OKX Wallet.");
              return _context5.abrupt("return");

             case 17:
              walletAddress = addresses[0];
              messageToSign = _this8.getSignMessage();
              V("tip").showLoading("Signing message...");
              _context5.next = 22;
              return window.okxwallet.fractalBitcoin.signMessage(messageToSign, "ecdsa");

             case 22:
              sign = _context5.sent;
              curPublicKey = "";
              _context5.prev = 24;
              _context5.next = 27;
              return window.okxwallet.fractalBitcoin.getPublicKey();

             case 27:
              curPublicKey = _context5.sent;
              _context5.next = 33;
              break;

             case 30:
              _context5.prev = 30;
              _context5.t0 = _context5["catch"](24);
              console.error("\u83b7\u53d6\u516c\u94a5\u5931\u8d25:", _context5.t0);

             case 33:
              _this8.requestLoginBackend({
                walletAddress: walletAddress,
                sign: sign,
                publicKey: curPublicKey,
                walletType: "okx"
              });
              return _context5.abrupt("return");

             case 37:
              _context5.prev = 37;
              _context5.t1 = _context5["catch"](7);
              console.error("OKX fractalBitcoin API\u8fde\u63a5\u5931\u8d25:", _context5.t1);

             case 40:
              V("tip").close();
              _this8.error("OKX Wallet connection failed. Please try again.");
              _context5.next = 49;
              break;

             case 44:
              _context5.prev = 44;
              _context5.t2 = _context5["catch"](0);
              V("tip").close();
              console.error("OKX Connect failed:", _context5.t2);
              _this8.error("OKX Wallet connection failed: " + (_context5.t2.message || "Unknown error"));

             case 49:
             case "end":
              return _context5.stop();
            }
          }, _callee5, null, [ [ 0, 44 ], [ 7, 37 ], [ 24, 30 ] ]);
        }))();
      },
      connectWithUnisat: function connectWithUnisat() {
        var _this9 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee6() {
          var _addresses, _walletAddress, _messageToSign, _sign, _curPublicKey, addresses, walletAddress, messageToSign, sign, curPublicKey;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
             case 0:
              _context6.prev = 0;
              V("tip").showLoading("Connecting to Unisat Wallet...");
              if (_this9.isWalletInstalled("unisat")) {
                _context6.next = 6;
                break;
              }
              V("tip").close();
              _this9.error("Unisat Wallet extension not found. Please install Unisat Wallet.");
              return _context6.abrupt("return");

             case 6:
              if (!(window.unisat && window.unisat.fractalBitcoin)) {
                _context6.next = 40;
                break;
              }
              _context6.prev = 7;
              _context6.next = 10;
              return window.unisat.fractalBitcoin.disconnect();

             case 10:
              _context6.next = 12;
              return window.unisat.fractalBitcoin.requestAccounts();

             case 12:
              _addresses = _context6.sent;
              if (!(!_addresses || 0 === _addresses.length)) {
                _context6.next = 17;
                break;
              }
              V("tip").close();
              _this9.error("No address found in Unisat Wallet.");
              return _context6.abrupt("return");

             case 17:
              _walletAddress = _addresses[0];
              _messageToSign = _this9.getSignMessage();
              V("tip").showLoading("Signing message...");
              _context6.next = 22;
              return window.unisat.fractalBitcoin.signMessage(_messageToSign, "ecdsa");

             case 22:
              _sign = _context6.sent;
              _curPublicKey = "";
              _context6.prev = 24;
              _context6.next = 27;
              return window.unisat.fractalBitcoin.getPublicKey();

             case 27:
              _curPublicKey = _context6.sent;
              _context6.next = 33;
              break;

             case 30:
              _context6.prev = 30;
              _context6.t0 = _context6["catch"](24);
              console.error("\u83b7\u53d6\u516c\u94a5\u5931\u8d25:", _context6.t0);

             case 33:
              _this9.requestLoginBackend({
                walletAddress: _walletAddress,
                sign: _sign,
                publicKey: _curPublicKey,
                walletType: "unisat"
              });
              return _context6.abrupt("return");

             case 37:
              _context6.prev = 37;
              _context6.t1 = _context6["catch"](7);
              console.error("Unisat fractalBitcoin API\u8fde\u63a5\u5931\u8d25:", _context6.t1);

             case 40:
              _context6.next = 42;
              return window.unisat.requestAccounts();

             case 42:
              addresses = _context6.sent;
              if (!(!addresses || 0 === addresses.length)) {
                _context6.next = 47;
                break;
              }
              V("tip").close();
              _this9.error("No address found in Unisat Wallet.");
              return _context6.abrupt("return");

             case 47:
              walletAddress = addresses[0];
              messageToSign = _this9.getSignMessage();
              V("tip").showLoading("Signing message...");
              _context6.next = 52;
              return window.unisat.signMessage(messageToSign);

             case 52:
              sign = _context6.sent;
              curPublicKey = "";
              _context6.prev = 54;
              _context6.next = 57;
              return window.unisat.getPublicKey();

             case 57:
              curPublicKey = _context6.sent;
              _context6.next = 63;
              break;

             case 60:
              _context6.prev = 60;
              _context6.t2 = _context6["catch"](54);
              console.error("\u83b7\u53d6\u516c\u94a5\u5931\u8d25:", _context6.t2);

             case 63:
              _this9.requestLoginBackend({
                walletAddress: walletAddress,
                sign: sign,
                publicKey: curPublicKey,
                walletType: "unisat"
              });
              _context6.next = 71;
              break;

             case 66:
              _context6.prev = 66;
              _context6.t3 = _context6["catch"](0);
              V("tip").close();
              console.error("Unisat Connect failed:", _context6.t3);
              _this9.error("Unisat Wallet connection failed: " + (_context6.t3.message || "Unknown error"));

             case 71:
             case "end":
              return _context6.stop();
            }
          }, _callee6, null, [ [ 0, 66 ], [ 7, 37 ], [ 24, 30 ], [ 54, 60 ] ]);
        }))();
      },
      connectWithTON: function connectWithTON() {
        var _this10 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee8() {
          var manifestUrl, connector, wallets, wallet, universalLink;
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
             case 0:
              _context8.prev = 0;
              V("tip").showLoading("Connecting to TON Wallet...");
              if (window.TonConnect) {
                _context8.next = 6;
                break;
              }
              V("tip").close();
              _this10.error("TON Connect SDK not loaded. Please refresh the page.");
              return _context8.abrupt("return");

             case 6:
              manifestUrl = "https://bitsurvivors.xyz/tonconnect-manifest.json";
              connector = new window.TonConnect.TonConnect({
                manifestUrl: manifestUrl
              });
              _context8.next = 10;
              return connector.getWallets();

             case 10:
              wallets = _context8.sent;
              if (!(0 === wallets.length)) {
                _context8.next = 15;
                break;
              }
              V("tip").close();
              _this10.error("No TON wallets found. Please install a TON wallet extension.");
              return _context8.abrupt("return");

             case 15:
              wallet = wallets[0];
              V("tip").showLoading("Waiting for wallet connection...");
              connector.onStatusChange(function() {
                var _ref = _asyncToGenerator(_regeneratorRuntime().mark(function _callee7(walletInfo) {
                  var walletAddress, walletChain, messageToSign, signRequest, signResult;
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                     case 0:
                      if (!walletInfo) {
                        _context7.next = 18;
                        break;
                      }
                      _context7.prev = 1;
                      walletAddress = walletInfo.account.address;
                      walletChain = walletInfo.account.chain;
                      messageToSign = _this10.getSignMessage();
                      V("tip").showLoading("Signing message...");
                      signRequest = {
                        validUntil: Math.floor(Date.now() / 1e3) + 60,
                        messages: [ {
                          address: walletAddress,
                          amount: "0",
                          payload: btoa(messageToSign)
                        } ]
                      };
                      _context7.next = 9;
                      return connector.sendTransaction(signRequest);

                     case 9:
                      signResult = _context7.sent;
                      _this10.requestLoginBackend({
                        walletAddress: walletAddress,
                        sign: JSON.stringify(signResult),
                        publicKey: "",
                        walletType: "ton",
                        chain: walletChain
                      });
                      _context7.next = 18;
                      break;

                     case 13:
                      _context7.prev = 13;
                      _context7.t0 = _context7["catch"](1);
                      V("tip").close();
                      console.error("TON\u7b7e\u540d\u5931\u8d25:", _context7.t0);
                      _this10.error("Failed to sign message with TON wallet: " + (_context7.t0.message || "Unknown error"));

                     case 18:
                     case "end":
                      return _context7.stop();
                    }
                  }, _callee7, null, [ [ 1, 13 ] ]);
                }));
                return function(_x) {
                  return _ref.apply(this, arguments);
                };
              }());
              _context8.next = 20;
              return connector.connect();

             case 20:
              universalLink = _context8.sent;
              universalLink && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) && (window.location.href = universalLink);
              _context8.next = 29;
              break;

             case 24:
              _context8.prev = 24;
              _context8.t0 = _context8["catch"](0);
              V("tip").close();
              console.error("TON Connect failed:", _context8.t0);
              _this10.error("TON Wallet connection failed: " + (_context8.t0.message || "Unknown error"));

             case 29:
             case "end":
              return _context8.stop();
            }
          }, _callee8, null, [ [ 0, 24 ] ]);
        }))();
      },
      requestLoginBackend: function requestLoginBackend(param) {
        var _this11 = this;
        param = _extends({}, {
          account: "",
          isGuest: false,
          api: "",
          walletType: ""
        }, param);
        V("tip").showLoading("Logging in...");
        var walletTypeDisplay = "unisat" === param.walletType ? "Unisat" : "okx" === param.walletType ? "OKX" : "ton" === param.walletType ? "TON" : "";
        R("server").api("login", {
          walletAddress: param.walletAddress,
          sign: param.sign,
          publicKey: param.publicKey,
          walletType: param.walletType,
          chain: param.chain,
          token: param.token
        }).then(function(res) {
          if (0 == res.errcode) {
            V("tip").close();
            param.success = false;
            if (res.data && res.data.token) {
              S("login_token", res.data.token);
              console.log("After login login_token ... ", res.data.token);
              M("data").init({
                account: res.data.wallet_address,
                player: res.data.player,
                walletType: param.walletType
              });
              param.success = true;
              walletTypeDisplay && V("tip").config({
                color: "#00FF00",
                touchClose: true
              }).text(walletTypeDisplay + " Wallet connected successfully!");
            }
            _this11.callFunc && _this11.callFunc(param);
          } else if (4 == res.errcode) {
            V("tip").close();
            _this11.error("Sorry, you are not eligible for the beta access yet.");
          } else {
            V("tip").close();
            _this11.error(res.errmsg || "Login failed. Please try again.");
          }
        })["catch"](function(err) {
          V("tip").close();
          console.error("Login backend error:", err);
          _this11.error(err.message || "Connection to server failed. Please try again.");
        });
      },
      userDocBtnEvent: function userDocBtnEvent() {
        V("agreement").show("user");
      },
      privacyDocBtnEvent: function privacyDocBtnEvent() {
        V("agreement").show("privacy");
      },
      error: function error(str) {
        return V("tip").config({
          color: "#FF0000",
          touchClose: true
        }).text(str);
      },
      addBtnEvents: function addBtnEvents() {
        var _this12 = this;
        if (this.guestBtn) {
          this.guestBtn.node.off("click");
          this.guestBtn.node.on("click", function() {
            _this12.guestBtnEvent();
          });
        }
        if (this.guestUnisatBtn) {
          this.guestUnisatBtn.node.off("click");
          this.guestUnisatBtn.node.on("click", function() {
            _this12.guestUnisatBtnEvent();
          });
        }
        if (this.guestTonBtn) {
          this.guestTonBtn.node.off("click");
          this.guestTonBtn.node.on("click", function() {
            _this12.guestTonBtnEvent();
          });
        }
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  my: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4352aStMfRD95MZ0xdwd804", "my");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {},
      show: function show() {
        this.versionLabel = this.find("versionLabel", cc.Label);
        this.versionLabel.string = H.getVersion(app.config.version);
        app.config.bundle.version && (this.versionLabel.string += "_" + app.config.bundle.version);
        this.playDayLabel = this.find("playDayLabel", cc.Label);
        this.playDayLabel.string = L("playDayTip", {
          day: M("data").getPlayDay()
        });
        var defData = M("data").getDefData();
        this.uploadDataCd = defData.timeCount.uploadData;
        this.uploadStop = false;
        this.find("sid").active = !M("data").player.isGuest;
        var walletAddress = M("data").player.uid;
        var simplifiedAddress = walletAddress.length > 10 ? walletAddress.slice(0, 5) + "..." + walletAddress.slice(-5) : walletAddress;
        this.find("sid/bg/label", cc.Label).string = simplifiedAddress;
        this.exitBtn = this.find("exitBtn", cc.Button);
        this.addBtnEvents();
        return H.show(this);
      },
      exitBtnEvent: function exitBtnEvent() {
        var _this = this;
        V("confirm").show(L("exitGame") + "?", function(bool) {
          if (bool) {
            S("login_token", null);
            _this.backLogin();
          }
        });
      },
      backLogin: function backLogin() {
        G("audio").stopMusic();
        V("login").show(function(loginData) {
          M("data").init(loginData);
          V("index").show();
          V("login").remove();
        });
        this.remove();
        V("index").remove();
      },
      userDocBtnEvent: function userDocBtnEvent() {
        V("agreement").show("user");
      },
      privacyDocBtnEvent: function privacyDocBtnEvent() {
        V("agreement").show("privacy");
      },
      copyBtnEvent: function copyBtnEvent() {
        R("native").copyText(M("data").player.uid);
        V("tip").success(L("success_action"));
      },
      sidBtnEvent: function sidBtnEvent() {
        V("inputSid").show();
      },
      onEnable: function onEnable() {
        this._super();
        E.on(app.root.eventType.LOOP, this.updDataBtn, this);
      },
      onDisable: function onDisable() {
        this._super();
        E.off(app.root.eventType.LOOP, this.updDataBtn, this);
      }
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  native: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "68080+BA6VJc4hQmzWfS9hp", "native");
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
    "undefined" == typeof sdkEvent && (globalThis.sdkEvent = {});
    var _native = {};
    _native.isAndroid = H.isAndroid();
    _native.isIos = H.isIos();
    _native.call = function(className, method) {
      var _console;
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
      (_console = console).log.apply(_console, [ "==========native.call: " + className + "." + method ].concat(args));
      if (_native.isAndroid) {
        var _jsb$reflection;
        className = "org/cocos2dx/javascript/" + className;
        return (_jsb$reflection = jsb.reflection).callStaticMethod.apply(_jsb$reflection, [ className, method ].concat(args));
      }
      if (_native.isIos) {
        if (Object.keys(args).length > 0) {
          var _jsb$reflection2;
          return (_jsb$reflection2 = jsb.reflection).callStaticMethod.apply(_jsb$reflection2, [ className, method + ":" ].concat(args));
        }
        return jsb.reflection.callStaticMethod(className, method);
      }
    };
    _native.openSetting = function(name) {
      _native.isIos && _native.call("AppController", "openSetting", name);
    };
    _native.share = function(param) {
      param = _extends({}, {
        title: "",
        content: "",
        url: ""
      }, param);
      _native.isAndroid && _native.call("AppActivity", "share", "(Ljava/lang/String;)V", JSON.stringify(param));
      _native.isIos && _native.call("AppController", "share", JSON.stringify(param));
    };
    _native.copyText = function(string) {
      if (_native.isAndroid) _native.call("AppActivity", "copyText", "(Ljava/lang/String;)V", string); else if (_native.isIos) _native.call("AppController", "copyText", string); else {
        var input = string + "";
        var el = document.createElement("textarea");
        el.value = input;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        el.style.fontSize = "12pt";
        var selection = getSelection();
        var originalRange = null;
        selection.rangeCount > 0 && (originalRange = selection.getRangeAt(0));
        document.body.appendChild(el);
        el.select();
        el.selectionStart = 0;
        el.selectionEnd = input.length;
        document.execCommand("copy");
        if (originalRange) {
          selection.removeAllRanges();
          selection.addRange(originalRange);
        }
        document.body.removeChild(el);
      }
    };
    module.exports = _native;
    cc._RF.pop();
  }, {} ],
  player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ffcf6b03TFCF75unhwnX4F+", "player");
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
    cc.Class({
      extends: require("roleBase"),
      properties: {},
      loadAsset: function loadAsset(asset, callFunc) {
        var _this = this;
        if (!this.animExt) return;
        var path = "fight/role/player/" + asset;
        app.loadDir(path, cc.SpriteFrame).then(function(spriteFrames) {
          spriteFrames = spriteFrames.sort(function(a, b) {
            return H.num(a.name) - H.num(b.name);
          });
          $(_this.animExt.anim.node, cc.Sprite).spriteFrame = spriteFrames[0];
          var idleClip = cc.AnimationClip.createWithSpriteFrames([ spriteFrames[0] ], 10);
          idleClip.name = "idle";
          idleClip._duration = .6;
          idleClip.wrapMode = cc.WrapMode.Loop;
          idleClip.curveData.props = {};
          idleClip.curveData.props.scaleY = [];
          idleClip.curveData.props.scaleY.push({
            frame: 0,
            value: 1
          });
          idleClip.curveData.props.scaleY.push({
            frame: .3,
            value: .9
          });
          idleClip.curveData.props.scaleY.push({
            frame: .6,
            value: 1
          });
          idleClip.curveData.props.anchorY = [];
          idleClip.curveData.props.anchorY.push({
            frame: 0,
            value: .5
          });
          idleClip.curveData.props.anchorY.push({
            frame: .3,
            value: .556
          });
          idleClip.curveData.props.anchorY.push({
            frame: .6,
            value: .5
          });
          _this.animExt.anim.addClip(idleClip);
          spriteFrames.splice(0, 1);
          var moveClip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 10);
          moveClip.name = "move";
          moveClip.wrapMode = cc.WrapMode.Loop;
          _this.animExt.anim.addClip(moveClip);
          callFunc && callFunc();
        });
      },
      setMoveSpeed: function setMoveSpeed(level) {
        this.move.speed = 290 + 10 * level;
      },
      setPropRadius: function setPropRadius(level) {
        this.propRadius = 70 + 30 * level;
      },
      initInput: function initInput(inputs) {
        this.inputs = inputs;
      },
      initData: function initData(data) {
        this.data = _extends({}, {
          HP: 100,
          ATK: 10
        }, data);
        this.defData = H.clone(this.data);
      },
      init: function init(param) {
        var _this2 = this;
        param = _extends({}, {
          data: {}
        }, param);
        this.initBase();
        this.skills = [];
        this.passiveSkills = [];
        this.camera = $(cc.find("Canvas/Main Camera"), "camera");
        this.camera.follow(this.node);
        var roleProgressBarNode = cc.find("roleProgressBar", this.node);
        if (!roleProgressBarNode) {
          roleProgressBarNode = G("pool").get(app.getPrefab("roleProgressBar"));
          roleProgressBarNode.parent = this.node;
          roleProgressBarNode.y = this.node.height;
          this.find("HP", roleProgressBarNode).color = cc.color("#00FF00");
        }
        this.progressBar = {};
        this.progressBar.HP = $(this.find("HP", roleProgressBarNode), cc.ProgressBar);
        this.group = "player";
        this.move = {};
        this.move.dir = cc.Vec2.ZERO;
        this.move.speed = 300;
        this.dir = cc.Vec2.ZERO;
        this.initData(param.data);
        this.setMoveSpeed(1);
        this.setPropRadius(1);
        this.isInit = false;
        this.loadAsset(this.asset, function() {
          _this2.isInit = true;
        });
        this.defHurtCd = .5;
        this.hurtCd = 0;
        this.target = null;
        this.interval = .1;
      },
      onEnter: function onEnter(other, self) {
        if (!this.checkCollide(other)) return;
        this.collide(other);
      },
      onStay: function onStay(other, self) {
        var enemy = G("role").getEnemy(other.node, true);
        if (enemy) {
          if (this.hurtCd > 0) return;
          this.hurtCd = this.defHurtCd;
          E.emit(G("role").eventType.HURT, {
            self: enemy,
            target: this,
            skill: null
          });
          return;
        }
        if (!this.checkCollide(other, true)) return;
        this.collide(other);
      },
      getDir: function getDir(isReal) {
        void 0 === isReal && (isReal = false);
        if (!this.inputs) return;
        var getDir = function getDir(input) {
          if (isReal && input.getRealDir) return input.getRealDir();
          return input.getDir();
        };
        if (!H.isArr(this.inputs)) return getDir(this.inputs);
        for (var i = 0; i < this.inputs.length; i++) {
          var dir = getDir(this.inputs[i]);
          if (0 != dir.x || 0 != dir.y) return dir;
        }
        return cc.v2(0, 0);
      },
      update: function update(dt) {
        if (!this.isInit) return;
        if (M("fight").stop) return;
        this.progressBar.HP.progress = this.data.HP / this.defData.HP;
        if (this.data.HP <= 0) return;
        this.camera.stop = this.data.HP <= 0;
        this.interval -= dt;
        if (this.interval <= 0) {
          this.interval = .1;
          this.target = this.getTarget();
        }
        if (this.state.sleep.cd > 0) {
          this.state.sleep.cd -= dt;
          return;
        }
        this.hurtCd > 0 && (this.hurtCd -= dt);
        this.move.dir = this.getDir();
        this.move.dir.x > 0 && (this.bodyNode.scaleX = 1);
        this.move.dir.x < 0 && (this.bodyNode.scaleX = -1);
        if (this.move.dir.equals(cc.Vec2.ZERO)) this.animExt.isPlaying("idle") || this.animExt.play("idle"); else {
          this.dir = this.getDir(true);
          var speed = this.move.speed * dt;
          this.node.x += this.move.dir.x * speed;
          this.node.y += this.move.dir.y * speed;
          this.animExt.isPlaying("move") || this.animExt.play("move");
        }
      }
    });
    cc._RF.pop();
  }, {
    roleBase: "roleBase"
  } ],
  "polyglot.min": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e3986Sv3exNMIvUaeTUpOBP", "polyglot.min");
    "use strict";
    (function(e, t) {
      "function" == typeof define && define.amd ? define([], function() {
        return t(e);
      }) : "object" == typeof exports ? module.exports = t(e) : e.Polyglot = t(e);
    })(void 0, function(e) {
      function t(e) {
        e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", 
        this.allowMissing = !!e.allowMissing, this.warn = e.warn || c;
      }
      function s(e) {
        var t, n, r, i = {};
        for (t in e) if (e.hasOwnProperty(t)) {
          n = e[t];
          for (r in n) i[n[r]] = t;
        }
        return i;
      }
      function o(e) {
        var t = /^\s+|\s+$/g;
        return e.replace(t, "");
      }
      function u(e, t, r) {
        var i, s, u;
        return null != r && e ? (s = e.split(n), u = s[f(t, r)] || s[0], i = o(u)) : i = e, 
        i;
      }
      function a(e) {
        var t = s(i);
        return t[e] || t.en;
      }
      function f(e, t) {
        return r[a(e)](t);
      }
      function l(e, t) {
        for (var n in t) "_" !== n && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
        return e;
      }
      function c(t) {
        e.console && e.console.warn && e.console.warn("WARNING: " + t);
      }
      function h(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        return t;
      }
      t.VERSION = "0.4.3", t.prototype.locale = function(e) {
        return e && (this.currentLocale = e), this.currentLocale;
      }, t.prototype.extend = function(e, t) {
        var n;
        for (var r in e) e.hasOwnProperty(r) && (n = e[r], t && (r = t + "." + r), "object" == typeof n ? this.extend(n, r) : this.phrases[r] = n);
      }, t.prototype.clear = function() {
        this.phrases = {};
      }, t.prototype.replace = function(e) {
        this.clear(), this.extend(e);
      }, t.prototype.t = function(e, t) {
        var n, r;
        return t = null == t ? {} : t, "number" == typeof t && (t = {
          smart_count: t
        }), "string" == typeof this.phrases[e] ? n = this.phrases[e] : "string" == typeof t._ ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'), 
        r = e), "string" == typeof n && (t = h(t), r = u(n, this.currentLocale, t.smart_count), 
        r = l(r, t)), r;
      }, t.prototype.has = function(e) {
        return e in this.phrases;
      };
      var n = "||||", r = {
        chinese: function chinese(e) {
          return 0;
        },
        german: function german(e) {
          return 1 !== e ? 1 : 0;
        },
        french: function french(e) {
          return e > 1 ? 1 : 0;
        },
        russian: function russian(e) {
          return e % 10 === 1 && e % 100 !== 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        czech: function czech(e) {
          return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2;
        },
        polish: function polish(e) {
          return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        icelandic: function icelandic(e) {
          return e % 10 !== 1 || e % 100 === 11 ? 1 : 0;
        }
      }, i = {
        chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
        german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
        french: [ "fr", "tl", "pt-br" ],
        russian: [ "hr", "ru" ],
        czech: [ "cs" ],
        polish: [ "pl" ],
        icelandic: [ "is" ]
      };
      return t;
    });
    cc._RF.pop();
  }, {} ],
  poolMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "30d1fE3w4VHRL/4MKnVdTL2", "poolMgr");
    "use strict";
    var H = require("helper");
    module.exports = {
      pool: {},
      get: function get(nodeOrPrefab, key, comp) {
        var _this = this;
        if (!nodeOrPrefab) return;
        var uuid;
        var name;
        if (nodeOrPrefab instanceof cc.Node) {
          uuid = nodeOrPrefab.uuid;
          name = nodeOrPrefab.name;
        }
        if (nodeOrPrefab instanceof cc.Prefab) {
          uuid = nodeOrPrefab.data.uuid;
          name = nodeOrPrefab.data.name;
        }
        comp || (comp = name);
        key || (key = name);
        this.pool[key] || (this.pool[key] = new cc.NodePool(comp));
        if (this.pool[key].size() < 1) {
          var node = cc.instantiate(nodeOrPrefab);
          node._put = function() {
            if (_this.pool[key]) {
              node.stopAllActions();
              _this.pool[key].put(node);
            } else node.destroy();
          };
          this.pool[key].put(node);
        }
        return H.resetNode(this.pool[key].get());
      },
      put: function put(node, removeAllEvents) {
        void 0 === removeAllEvents && (removeAllEvents = false);
        if (!node) return;
        if (removeAllEvents) {
          var childNodes = H.findAllchildren(node);
          childNodes.forEach(function(childNode) {
            for (var eventType in cc.Node.EventType) -1 != eventType.indexOf("TOUCH_") && childNode.targetOff(cc.Node.EventType[eventType]);
          });
        }
        node._put ? node._put() : node.destroy();
      },
      clearAll: function clearAll() {
        if (!this.pool) return;
        for (var key in this.pool) {
          this.pool[key].clear();
          delete this.pool[key];
        }
      }
    };
    cc._RF.pop();
  }, {
    helper: "helper"
  } ],
  popup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bccfey+iMlDFakIAXykE563", "popup");
    "use strict";
    cc.Class({
      extends: require("ccPopup"),
      properties: {},
      onEnable: function onEnable() {
        G("audio").playEffect("popup");
        this.bgNode = this.find("bg");
        if (this.bgNode) {
          this.bgNode.on("touchend", function(e) {
            E.stop(e);
          });
          this.bgNode.scaleX = .9;
          this.bgNode.scaleY = .9;
          cc.tween(this.bgNode).to(.05, {
            scaleX: 1.1,
            scaleY: 1.1
          }).to(.05, {
            scaleX: 1,
            scaleY: 1
          }).start();
        }
        this._super();
      },
      onDisable: function onDisable() {
        this.bgNode && this.bgNode.off("touchend");
        this._super();
      },
      remove: function remove() {
        var _this = this;
        if (this.bgNode) {
          cc.tween(this.bgNode).to(.05, {
            scaleX: .5,
            scaleY: .5
          }).call(function() {
            _this._remove();
            _this.onRemove();
          }).start();
          return;
        }
        this._super();
      }
    });
    cc._RF.pop();
  }, {
    ccPopup: "ccPopup"
  } ],
  propModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8b5c0WUl3FB+KqVwOSup8AD", "propModel");
    "use strict";
    module.exports = {
      eventType: {
        SET_NUM: {
          gold: "propModel.setNum.gold",
          equipNum: "propModel.setNum.equipNum"
        }
      },
      setNum: function setNum(asset, action, val) {
        void 0 === action && (action = "+");
        val = H.num(val);
        asset in M("data").prop || (M("data").prop[asset] = 0);
        "+" == action && (M("data").prop[asset] += val);
        "-" == action && (M("data").prop[asset] -= val);
        "=" == action && (M("data").prop[asset] = val);
        "-" != action && "=" != action || M("data").prop[asset] < 0 && (M("data").prop[asset] = 0);
        asset in this.eventType.SET_NUM && E.emit(this.eventType.SET_NUM[asset]);
      }
    };
    cc._RF.pop();
  }, {} ],
  qq: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eafc6N+PENMhLWLgVzjLQ2m", "qq");
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
    var _native = require("native");
    var isAndroid = _native.isAndroid;
    var isIos = _native.isIos;
    sdkEvent.QQ = {};
    sdkEvent.QQ.login = {};
    var QQ = {};
    QQ.init = function(appId) {
      isAndroid && _native.call("QQ", "init", "(Ljava/lang/String;)V", appId);
      isIos && _native.call("QQ", "init", appId);
    };
    QQ.login = {};
    QQ.login.sign = function() {
      isAndroid && _native.call("QQ", "login", "()V");
      isIos && _native.call("QQ", "login");
    };
    QQ.login.onError = function() {};
    sdkEvent.QQ.login.onError = function() {
      var _QQ$login;
      (_QQ$login = QQ.login).onError.apply(_QQ$login, arguments);
    };
    QQ.login.onClose = function() {};
    sdkEvent.QQ.login.onClose = function() {
      var _QQ$login2;
      (_QQ$login2 = QQ.login).onClose.apply(_QQ$login2, arguments);
    };
    QQ.login.onSign = function() {};
    sdkEvent.QQ.login.onSign = function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
      setTimeout(function() {
        var _QQ$login3;
        (_QQ$login3 = QQ.login).onSign.apply(_QQ$login3, args);
      }, 1e3);
    };
    sdkEvent.QQ.share = {};
    QQ.share = {};
    QQ.share.toQQ = function(option) {
      option = _extends({}, {
        title: "",
        des: "",
        url: "",
        imgUrl: ""
      }, option);
      isAndroid && _native.call("QQ", "shareToQQ", "(Ljava/lang/String;)V", JSON.stringify(option));
      isIos && _native.call("QQ", "shareToQQ", JSON.stringify(option));
    };
    module.exports = QQ;
    cc._RF.pop();
  }, {
    native: "native"
  } ],
  qs: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      cc._RF.push(module, "984ecHY6/hPR4Cf5cLordo9", "qs");
      "use strict";
      (function(f) {
        if ("object" === typeof exports && "undefined" !== typeof module) module.exports = f(); else if ("function" === typeof define && define.amd) define([], f); else {
          var g;
          g = "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : this;
          g.Qs = f();
        }
      })(function() {
        var define, module, exports;
        return function() {
          function r(e, n, t) {
            function o(i, f) {
              if (!n[i]) {
                if (!e[i]) {
                  var c = "function" == typeof require && require;
                  if (!f && c) return c(i, !0);
                  if (u) return u(i, !0);
                  var a = new Error("Cannot find module '" + i + "'");
                  throw a.code = "MODULE_NOT_FOUND", a;
                }
                var p = n[i] = {
                  exports: {}
                };
                e[i][0].call(p.exports, function(r) {
                  var n = e[i][1][r];
                  return o(n || r);
                }, p, p.exports, r, e, n, t);
              }
              return n[i].exports;
            }
            for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
            return o;
          }
          return r;
        }()({
          1: [ function(require, module, exports) {
            var replace = String.prototype.replace;
            var percentTwenties = /%20/g;
            var util = require("./utils");
            var Format = {
              RFC1738: "RFC1738",
              RFC3986: "RFC3986"
            };
            module.exports = util.assign({
              default: Format.RFC3986,
              formatters: {
                RFC1738: function RFC1738(value) {
                  return replace.call(value, percentTwenties, "+");
                },
                RFC3986: function RFC3986(value) {
                  return String(value);
                }
              }
            }, Format);
          }, {
            "./utils": 5
          } ],
          2: [ function(require, module, exports) {
            var stringify = require("./stringify");
            var parse = require("./parse");
            var formats = require("./formats");
            module.exports = {
              formats: formats,
              parse: parse,
              stringify: stringify
            };
          }, {
            "./formats": 1,
            "./parse": 3,
            "./stringify": 4
          } ],
          3: [ function(require, module, exports) {
            var utils = require("./utils");
            var has = Object.prototype.hasOwnProperty;
            var isArray = Array.isArray;
            var defaults = {
              allowDots: false,
              allowPrototypes: false,
              arrayLimit: 20,
              charset: "utf-8",
              charsetSentinel: false,
              comma: false,
              decoder: utils.decode,
              delimiter: "&",
              depth: 5,
              ignoreQueryPrefix: false,
              interpretNumericEntities: false,
              parameterLimit: 1e3,
              parseArrays: true,
              plainObjects: false,
              strictNullHandling: false
            };
            var interpretNumericEntities = function interpretNumericEntities(str) {
              return str.replace(/&#(\d+);/g, function($0, numberStr) {
                return String.fromCharCode(parseInt(numberStr, 10));
              });
            };
            var isoSentinel = "utf8=%26%2310003%3B";
            var charsetSentinel = "utf8=%E2%9C%93";
            var parseValues = function parseQueryStringValues(str, options) {
              var obj = {};
              var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
              var limit = Infinity === options.parameterLimit ? void 0 : options.parameterLimit;
              var parts = cleanStr.split(options.delimiter, limit);
              var skipIndex = -1;
              var i;
              var charset = options.charset;
              if (options.charsetSentinel) for (i = 0; i < parts.length; ++i) if (0 === parts[i].indexOf("utf8=")) {
                parts[i] === charsetSentinel ? charset = "utf-8" : parts[i] === isoSentinel && (charset = "iso-8859-1");
                skipIndex = i;
                i = parts.length;
              }
              for (i = 0; i < parts.length; ++i) {
                if (i === skipIndex) continue;
                var part = parts[i];
                var bracketEqualsPos = part.indexOf("]=");
                var pos = -1 === bracketEqualsPos ? part.indexOf("=") : bracketEqualsPos + 1;
                var key, val;
                if (-1 === pos) {
                  key = options.decoder(part, defaults.decoder, charset, "key");
                  val = options.strictNullHandling ? null : "";
                } else {
                  key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
                  val = options.decoder(part.slice(pos + 1), defaults.decoder, charset, "value");
                }
                val && options.interpretNumericEntities && "iso-8859-1" === charset && (val = interpretNumericEntities(val));
                val && "string" === typeof val && options.comma && val.indexOf(",") > -1 && (val = val.split(","));
                part.indexOf("[]=") > -1 && (val = isArray(val) ? [ val ] : val);
                has.call(obj, key) ? obj[key] = utils.combine(obj[key], val) : obj[key] = val;
              }
              return obj;
            };
            var parseObject = function parseObject(chain, val, options) {
              var leaf = val;
              for (var i = chain.length - 1; i >= 0; --i) {
                var obj;
                var root = chain[i];
                if ("[]" === root && options.parseArrays) obj = [].concat(leaf); else {
                  obj = options.plainObjects ? Object.create(null) : {};
                  var cleanRoot = "[" === root.charAt(0) && "]" === root.charAt(root.length - 1) ? root.slice(1, -1) : root;
                  var index = parseInt(cleanRoot, 10);
                  if (options.parseArrays || "" !== cleanRoot) if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
                    obj = [];
                    obj[index] = leaf;
                  } else obj[cleanRoot] = leaf; else obj = {
                    0: leaf
                  };
                }
                leaf = obj;
              }
              return leaf;
            };
            var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
              if (!givenKey) return;
              var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
              var brackets = /(\[[^[\]]*])/;
              var child = /(\[[^[\]]*])/g;
              var segment = options.depth > 0 && brackets.exec(key);
              var parent = segment ? key.slice(0, segment.index) : key;
              var keys = [];
              if (parent) {
                if (!options.plainObjects && has.call(Object.prototype, parent) && !options.allowPrototypes) return;
                keys.push(parent);
              }
              var i = 0;
              while (options.depth > 0 && null !== (segment = child.exec(key)) && i < options.depth) {
                i += 1;
                if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1)) && !options.allowPrototypes) return;
                keys.push(segment[1]);
              }
              segment && keys.push("[" + key.slice(segment.index) + "]");
              return parseObject(keys, val, options);
            };
            var normalizeParseOptions = function normalizeParseOptions(opts) {
              if (!opts) return defaults;
              if (null !== opts.decoder && void 0 !== opts.decoder && "function" !== typeof opts.decoder) throw new TypeError("Decoder has to be a function.");
              if ("undefined" !== typeof opts.charset && "utf-8" !== opts.charset && "iso-8859-1" !== opts.charset) throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");
              var charset = "undefined" === typeof opts.charset ? defaults.charset : opts.charset;
              return {
                allowDots: "undefined" === typeof opts.allowDots ? defaults.allowDots : !!opts.allowDots,
                allowPrototypes: "boolean" === typeof opts.allowPrototypes ? opts.allowPrototypes : defaults.allowPrototypes,
                arrayLimit: "number" === typeof opts.arrayLimit ? opts.arrayLimit : defaults.arrayLimit,
                charset: charset,
                charsetSentinel: "boolean" === typeof opts.charsetSentinel ? opts.charsetSentinel : defaults.charsetSentinel,
                comma: "boolean" === typeof opts.comma ? opts.comma : defaults.comma,
                decoder: "function" === typeof opts.decoder ? opts.decoder : defaults.decoder,
                delimiter: "string" === typeof opts.delimiter || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
                depth: "number" === typeof opts.depth || false === opts.depth ? +opts.depth : defaults.depth,
                ignoreQueryPrefix: true === opts.ignoreQueryPrefix,
                interpretNumericEntities: "boolean" === typeof opts.interpretNumericEntities ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
                parameterLimit: "number" === typeof opts.parameterLimit ? opts.parameterLimit : defaults.parameterLimit,
                parseArrays: false !== opts.parseArrays,
                plainObjects: "boolean" === typeof opts.plainObjects ? opts.plainObjects : defaults.plainObjects,
                strictNullHandling: "boolean" === typeof opts.strictNullHandling ? opts.strictNullHandling : defaults.strictNullHandling
              };
            };
            module.exports = function(str, opts) {
              var options = normalizeParseOptions(opts);
              if ("" === str || null === str || "undefined" === typeof str) return options.plainObjects ? Object.create(null) : {};
              var tempObj = "string" === typeof str ? parseValues(str, options) : str;
              var obj = options.plainObjects ? Object.create(null) : {};
              var keys = Object.keys(tempObj);
              for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                var newObj = parseKeys(key, tempObj[key], options);
                obj = utils.merge(obj, newObj, options);
              }
              return utils.compact(obj);
            };
          }, {
            "./utils": 5
          } ],
          4: [ function(require, module, exports) {
            var utils = require("./utils");
            var formats = require("./formats");
            var has = Object.prototype.hasOwnProperty;
            var arrayPrefixGenerators = {
              brackets: function brackets(prefix) {
                return prefix + "[]";
              },
              comma: "comma",
              indices: function indices(prefix, key) {
                return prefix + "[" + key + "]";
              },
              repeat: function repeat(prefix) {
                return prefix;
              }
            };
            var isArray = Array.isArray;
            var push = Array.prototype.push;
            var pushToArray = function pushToArray(arr, valueOrArray) {
              push.apply(arr, isArray(valueOrArray) ? valueOrArray : [ valueOrArray ]);
            };
            var toISO = Date.prototype.toISOString;
            var defaultFormat = formats["default"];
            var defaults = {
              addQueryPrefix: false,
              allowDots: false,
              charset: "utf-8",
              charsetSentinel: false,
              delimiter: "&",
              encode: true,
              encoder: utils.encode,
              encodeValuesOnly: false,
              format: defaultFormat,
              formatter: formats.formatters[defaultFormat],
              indices: false,
              serializeDate: function serializeDate(date) {
                return toISO.call(date);
              },
              skipNulls: false,
              strictNullHandling: false
            };
            var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
              return "string" === typeof v || "number" === typeof v || "boolean" === typeof v || "symbol" === typeof v || "bigint" === typeof v;
            };
            var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset) {
              var obj = object;
              "function" === typeof filter ? obj = filter(prefix, obj) : obj instanceof Date ? obj = serializeDate(obj) : "comma" === generateArrayPrefix && isArray(obj) && (obj = obj.join(","));
              if (null === obj) {
                if (strictNullHandling) return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key") : prefix;
                obj = "";
              }
              if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
                if (encoder) {
                  var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key");
                  return [ formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value")) ];
                }
                return [ formatter(prefix) + "=" + formatter(String(obj)) ];
              }
              var values = [];
              if ("undefined" === typeof obj) return values;
              var objKeys;
              if (isArray(filter)) objKeys = filter; else {
                var keys = Object.keys(obj);
                objKeys = sort ? keys.sort(sort) : keys;
              }
              for (var i = 0; i < objKeys.length; ++i) {
                var key = objKeys[i];
                if (skipNulls && null === obj[key]) continue;
                isArray(obj) ? pushToArray(values, stringify(obj[key], "function" === typeof generateArrayPrefix ? generateArrayPrefix(prefix, key) : prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset)) : pushToArray(values, stringify(obj[key], prefix + (allowDots ? "." + key : "[" + key + "]"), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset));
              }
              return values;
            };
            var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
              if (!opts) return defaults;
              if (null !== opts.encoder && void 0 !== opts.encoder && "function" !== typeof opts.encoder) throw new TypeError("Encoder has to be a function.");
              var charset = opts.charset || defaults.charset;
              if ("undefined" !== typeof opts.charset && "utf-8" !== opts.charset && "iso-8859-1" !== opts.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
              var format = formats["default"];
              if ("undefined" !== typeof opts.format) {
                if (!has.call(formats.formatters, opts.format)) throw new TypeError("Unknown format option provided.");
                format = opts.format;
              }
              var formatter = formats.formatters[format];
              var filter = defaults.filter;
              ("function" === typeof opts.filter || isArray(opts.filter)) && (filter = opts.filter);
              return {
                addQueryPrefix: "boolean" === typeof opts.addQueryPrefix ? opts.addQueryPrefix : defaults.addQueryPrefix,
                allowDots: "undefined" === typeof opts.allowDots ? defaults.allowDots : !!opts.allowDots,
                charset: charset,
                charsetSentinel: "boolean" === typeof opts.charsetSentinel ? opts.charsetSentinel : defaults.charsetSentinel,
                delimiter: "undefined" === typeof opts.delimiter ? defaults.delimiter : opts.delimiter,
                encode: "boolean" === typeof opts.encode ? opts.encode : defaults.encode,
                encoder: "function" === typeof opts.encoder ? opts.encoder : defaults.encoder,
                encodeValuesOnly: "boolean" === typeof opts.encodeValuesOnly ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
                filter: filter,
                formatter: formatter,
                serializeDate: "function" === typeof opts.serializeDate ? opts.serializeDate : defaults.serializeDate,
                skipNulls: "boolean" === typeof opts.skipNulls ? opts.skipNulls : defaults.skipNulls,
                sort: "function" === typeof opts.sort ? opts.sort : null,
                strictNullHandling: "boolean" === typeof opts.strictNullHandling ? opts.strictNullHandling : defaults.strictNullHandling
              };
            };
            module.exports = function(object, opts) {
              var obj = object;
              var options = normalizeStringifyOptions(opts);
              var objKeys;
              var filter;
              if ("function" === typeof options.filter) {
                filter = options.filter;
                obj = filter("", obj);
              } else if (isArray(options.filter)) {
                filter = options.filter;
                objKeys = filter;
              }
              var keys = [];
              if ("object" !== typeof obj || null === obj) return "";
              var arrayFormat;
              arrayFormat = opts && opts.arrayFormat in arrayPrefixGenerators ? opts.arrayFormat : opts && "indices" in opts ? opts.indices ? "indices" : "repeat" : "indices";
              var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
              objKeys || (objKeys = Object.keys(obj));
              options.sort && objKeys.sort(options.sort);
              for (var i = 0; i < objKeys.length; ++i) {
                var key = objKeys[i];
                if (options.skipNulls && null === obj[key]) continue;
                pushToArray(keys, stringify(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.formatter, options.encodeValuesOnly, options.charset));
              }
              var joined = keys.join(options.delimiter);
              var prefix = true === options.addQueryPrefix ? "?" : "";
              options.charsetSentinel && ("iso-8859-1" === options.charset ? prefix += "utf8=%26%2310003%3B&" : prefix += "utf8=%E2%9C%93&");
              return joined.length > 0 ? prefix + joined : "";
            };
          }, {
            "./formats": 1,
            "./utils": 5
          } ],
          5: [ function(require, module, exports) {
            var has = Object.prototype.hasOwnProperty;
            var isArray = Array.isArray;
            var hexTable = function() {
              var array = [];
              for (var i = 0; i < 256; ++i) array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
              return array;
            }();
            var compactQueue = function compactQueue(queue) {
              while (queue.length > 1) {
                var item = queue.pop();
                var obj = item.obj[item.prop];
                if (isArray(obj)) {
                  var compacted = [];
                  for (var j = 0; j < obj.length; ++j) "undefined" !== typeof obj[j] && compacted.push(obj[j]);
                  item.obj[item.prop] = compacted;
                }
              }
            };
            var arrayToObject = function arrayToObject(source, options) {
              var obj = options && options.plainObjects ? Object.create(null) : {};
              for (var i = 0; i < source.length; ++i) "undefined" !== typeof source[i] && (obj[i] = source[i]);
              return obj;
            };
            var merge = function merge(target, source, options) {
              if (!source) return target;
              if ("object" !== typeof source) {
                if (isArray(target)) target.push(source); else {
                  if (!target || "object" !== typeof target) return [ target, source ];
                  (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) && (target[source] = true);
                }
                return target;
              }
              if (!target || "object" !== typeof target) return [ target ].concat(source);
              var mergeTarget = target;
              isArray(target) && !isArray(source) && (mergeTarget = arrayToObject(target, options));
              if (isArray(target) && isArray(source)) {
                source.forEach(function(item, i) {
                  if (has.call(target, i)) {
                    var targetItem = target[i];
                    targetItem && "object" === typeof targetItem && item && "object" === typeof item ? target[i] = merge(targetItem, item, options) : target.push(item);
                  } else target[i] = item;
                });
                return target;
              }
              return Object.keys(source).reduce(function(acc, key) {
                var value = source[key];
                has.call(acc, key) ? acc[key] = merge(acc[key], value, options) : acc[key] = value;
                return acc;
              }, mergeTarget);
            };
            var assign = function assignSingleSource(target, source) {
              return Object.keys(source).reduce(function(acc, key) {
                acc[key] = source[key];
                return acc;
              }, target);
            };
            var decode = function decode(str, decoder, charset) {
              var strWithoutPlus = str.replace(/\+/g, " ");
              if ("iso-8859-1" === charset) return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
              try {
                return decodeURIComponent(strWithoutPlus);
              } catch (e) {
                return strWithoutPlus;
              }
            };
            var encode = function encode(str, defaultEncoder, charset) {
              if (0 === str.length) return str;
              var string = str;
              "symbol" === typeof str ? string = Symbol.prototype.toString.call(str) : "string" !== typeof str && (string = String(str));
              if ("iso-8859-1" === charset) return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
                return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
              });
              var out = "";
              for (var i = 0; i < string.length; ++i) {
                var c = string.charCodeAt(i);
                if (45 === c || 46 === c || 95 === c || 126 === c || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122) {
                  out += string.charAt(i);
                  continue;
                }
                if (c < 128) {
                  out += hexTable[c];
                  continue;
                }
                if (c < 2048) {
                  out += hexTable[192 | c >> 6] + hexTable[128 | 63 & c];
                  continue;
                }
                if (c < 55296 || c >= 57344) {
                  out += hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | 63 & c];
                  continue;
                }
                i += 1;
                c = 65536 + ((1023 & c) << 10 | 1023 & string.charCodeAt(i));
                out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | 63 & c];
              }
              return out;
            };
            var compact = function compact(value) {
              var queue = [ {
                obj: {
                  o: value
                },
                prop: "o"
              } ];
              var refs = [];
              for (var i = 0; i < queue.length; ++i) {
                var item = queue[i];
                var obj = item.obj[item.prop];
                var keys = Object.keys(obj);
                for (var j = 0; j < keys.length; ++j) {
                  var key = keys[j];
                  var val = obj[key];
                  if ("object" === typeof val && null !== val && -1 === refs.indexOf(val)) {
                    queue.push({
                      obj: obj,
                      prop: key
                    });
                    refs.push(val);
                  }
                }
              }
              compactQueue(queue);
              return value;
            };
            var isRegExp = function isRegExp(obj) {
              return "[object RegExp]" === Object.prototype.toString.call(obj);
            };
            var isBuffer = function isBuffer(obj) {
              if (!obj || "object" !== typeof obj) return false;
              return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
            };
            var combine = function combine(a, b) {
              return [].concat(a, b);
            };
            module.exports = {
              arrayToObject: arrayToObject,
              assign: assign,
              combine: combine,
              compact: compact,
              decode: decode,
              encode: encode,
              isBuffer: isBuffer,
              isRegExp: isRegExp,
              merge: merge
            };
          }, {} ]
        }, {}, [ 2 ])(2);
      });
      cc._RF.pop();
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    "./formats": void 0,
    "./parse": void 0,
    "./stringify": void 0,
    "./utils": void 0
  } ],
  reportToAdmin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e9f5cD5/hKY6lN9bapztg5", "reportToAdmin");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {},
      onLoad: function onLoad() {
        this.addBtnEvents();
        this.editBox = this.find("editBox", cc.EditBox);
      },
      btnEvent: function btnEvent(node) {
        var btn = $(node, cc.Button);
        if (!btn.interactable) return;
        var content = H.trim(this.editBox.string);
        if (!content || content.length < 2 || content.length > 200) {
          V("tip").error(L("error_length", {
            length: "2-200"
          }));
          return;
        }
        btn.interactable = false;
        V("tip").showLoading();
        var data = {};
        data.content = content;
        data.player = {};
        data.player.api = M("data").player.api;
        M("data").player.isGuest || (data.player.account = M("data").player.account);
        R("server").api("reportToAdmin", data).then(function(res) {
          V("tip").close();
          if (res.error) {
            btn.interactable = true;
            V("tip").error(res.error);
            return;
          }
          V("tip").success(L("success_action"));
        })["catch"](function(err) {
          btn.interactable = true;
          V("tip").close();
          V("tip").error(err);
        });
      }
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  rewardItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "60694oAykpAoppMh1zHTuDm", "rewardItem");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {
        chipNode: cc.Node,
        iconSprite: cc.Sprite,
        roleSprite: cc.Sprite,
        label: cc.Label,
        randLabel: cc.Label,
        randSprite: cc.Sprite
      },
      _init: function _init() {
        this.chipNode.active = false;
        this.iconSprite.node.active = false;
        this.roleSprite.node.active = false;
        this.randLabel.node.active = false;
        this.randSprite.node.active = false;
      },
      updProp: function updProp(key, val) {
        this._init();
        this.iconSprite.node.active = true;
        this.iconSprite.spriteFrame = app.find[key + "SpriteFrame"];
        this.label.string = H.numAbbr(val);
      },
      updChip: function updChip(chip) {
        var _this = this;
        this._init();
        this.chipNode.active = true;
        if ("?" == chip.asset) {
          this.randLabel.node.active = true;
          this.randSprite.node.active = true;
        }
        if ("role" == chip.type) {
          this.chipNode.color = cc.color(M("role").getChipColor());
          if ("?" == chip.asset) {
            this.randSprite.node.color = cc.color(M("role").getChipColor());
            this.randLabel.string = L("hero");
          } else {
            this.roleSprite.node.active = true;
            G("role").loadSpriteFrame(chip.asset, function(spriteFrame) {
              _this.roleSprite.spriteFrame = spriteFrame;
            });
          }
        }
        if ("skill" == chip.type) {
          this.chipNode.color = cc.color(M("skill").getChipColor());
          if ("?" == chip.asset) {
            this.randSprite.node.color = cc.color(M("skill").getChipColor());
            this.randLabel.string = L("skill");
          } else {
            this.iconSprite.node.active = true;
            this.iconSprite.spriteFrame = G("skill").getSpriteFrame(chip.asset);
          }
        }
        this.label.string = H.numAbbr(chip.chip);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  roleArrowTip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "be4d6zHHYNHd5vh7WST+JE8", "roleArrowTip");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(param) {
        param = _extends({}, {
          self: null,
          player: null
        }, param);
        this.self = param.self;
        this.player = param.player;
        this.node.scaleX = this.self.node.scaleX;
        this.node.scaleY = this.self.node.scaleY;
      },
      hide: function hide() {
        this.node.opacity = 0;
      },
      show: function show() {
        this.node.opacity = 255;
      },
      update: function update(dt) {
        if (!this.self) return;
        if (!this.player) return;
        if (app.screen.isOutView(this.player.node, this.self.node)) {
          var selfWorldPos = H.getWorldPos(this.self.bodyNode);
          this.node.setWorldPosition(selfWorldPos);
          var nodeRect = this.node.getBoundingBox();
          var checkViewRes = app.screen.checkView(this.player.node, this.node, {
            left: -nodeRect.width,
            top: -nodeRect.height / 2,
            bottom: -nodeRect.height / 2
          });
          (checkViewRes.isMaxX || checkViewRes.isMaxY) && this.node.setWorldPosition(checkViewRes.worldPos);
          var thisWorldPos = H.getWorldPos(this.node);
          var playerWorldPos = H.getWorldPos(this.player.bodyNode);
          var angle = 180 * Math.atan2(thisWorldPos.y - playerWorldPos.y, thisWorldPos.x - playerWorldPos.x) / Math.PI;
          this.node.angle = angle;
          this.show();
        } else this.hide();
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  roleBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2cf1eDNPQtPirlquo5mbTjU", "roleBase");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      initBase: function initBase() {
        var _this = this;
        this.collider = $(this.node, cc.BoxCollider);
        this.collider || (this.collider = $(this.node, cc.CircleCollider));
        this.collider.onCollisionEnter = this.onEnter.bind(this);
        this.collider.onCollisionStay = this.onStay.bind(this);
        this.collider.onCollisionExit = this.onExit.bind(this);
        this.collider.enabled = true;
        this.animExt = $(this.node, "animExt");
        this.animSprite = $(this.animExt.anim.node, cc.Sprite);
        this.bodyNode = this.find("body");
        this.shadowNode = this.find("shadow");
        this.shadowNode && (this.shadowNode.active = true);
        this.animExt.anim.node.opacity = 255;
        this.target = null;
        this.group = "";
        this.state = {};
        this.state.sleep = {
          cd: 0
        };
        this.state.stop = {
          cd: 0
        };
        this.effect = {};
        app.loadDir("./", cc.Material).then(function(materials) {
          materials.forEach(function(material) {
            _this[material.name + "Material"] = material;
          });
          _this.setMaterial(_this.defaultMaterial);
        });
      },
      onEnter: function onEnter(other, self) {},
      onStay: function onStay(other, self) {},
      onExit: function onExit(other, self) {},
      collide: function collide(other) {
        var _this2 = this;
        var skill = this.getSkill(other);
        if (!skill) return;
        if (!skill.role) return;
        if (skill.role.group == this.group) return;
        this.scheduleOnce(function() {
          E.emit(G("role").eventType.HURT, {
            self: _this2.target,
            target: _this2,
            skill: skill
          });
        });
      },
      checkCollide: function checkCollide(other, isOnStay) {
        void 0 === isOnStay && (isOnStay = false);
        var skill = this.getSkill(other);
        if (!skill) return false;
        if (!skill.isCollide) return false;
        if (isOnStay) {
          if (!skill.isStay) return false;
        } else if (skill.isStay) return false;
        return true;
      },
      getSkill: function getSkill(other) {
        var skill = $(other.node, "skill");
        if (skill) {
          if (!skill.role) return;
          if (skill.role.group == this.group) return;
        }
        return skill;
      },
      getTarget: function getTarget(sort) {
        void 0 === sort && (sort = "ASC");
        var targets = G("role").getRandTargets(this, 1, sort);
        return targets[0];
      },
      getRandTarget: function getRandTarget() {
        var targets = G("role").getRandTargets(this, 1);
        return targets[0];
      },
      setMaterial: function setMaterial(material) {
        this.animSprite.setMaterial(0, material);
      },
      getMaterial: function getMaterial(index) {
        void 0 === index && (index = 0);
        return this.animSprite.getMaterial(index);
      },
      play: function play(name, callBack) {
        var _this3 = this;
        this.animExt.anim.node.stopAllActions();
        if ("hurt" == name) {
          this.setMaterial(this.whiteMaterial);
          cc.tween(this.animExt.anim.node).to(.15, {}, {
            onUpdate: function onUpdate(node, dt) {
              node.opacity = 255 * dt;
            }
          }).call(function() {
            _this3.animExt.anim.node.opacity = 255;
            _this3.setMaterial(_this3.defaultMaterial);
            callBack && callBack();
          }).start();
        }
        if ("lose" == name) {
          this.collider.enabled = false;
          this.setMaterial(this.dissolveMaterial);
          var material = this.getMaterial(0);
          var fadePct = 0;
          this.shadowNode && (this.shadowNode.active = false);
          cc.tween(this.animExt.anim.node).to(1, {}, {
            onUpdate: function onUpdate(node, delay) {
              fadePct >= 0 && fadePct <= 1 && (fadePct += .03 * delay);
              material && material.setProperty("fade_pct", fadePct);
            }
          }).call(function() {
            _this3.animExt.anim.node.opacity = 0;
            _this3.setMaterial(_this3.defaultMaterial);
            callBack && callBack();
          }).start();
        }
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  roleMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "920dbv1RehJcqsCGI/sr7gW", "roleMgr");
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
    module.exports = {
      eventType: {
        LOSE: "roleMgr.lose",
        HURT: "roleMgr.hurt"
      },
      init: function init(param) {
        param = _extends({}, {
          parent1Node: null,
          parent2Node: null,
          effectParent2Node: null
        }, param);
        this.parent1Node = param.parent1Node;
        this.parent2Node = param.parent2Node;
        this.effectParent2Node = param.effectParent2Node;
        this.roles = [];
        this.halfWidth = app.screen.width / 2;
        this.halfHeight = app.screen.height / 2;
      },
      create: function create(param) {
        param = _extends({}, {
          asset: "",
          data: null,
          target: null
        }, param);
        var node = G("pool").get(app.getPrefab(param.asset));
        var role = $(node, "player");
        role || (role = this.getEnemy(node));
        role.uid = H.uid();
        role.asset = param.asset;
        role.node.parent = this.parent1Node;
        role.init({
          target: param.target,
          data: param.data
        });
        if (param.target && "player" == param.target.group && param.data.bossLevel > 0) {
          var arrowTipNode = G("pool").get(app.getPrefab("roleArrowTip"));
          var arrowTip = H.add$(arrowTipNode, "roleArrowTip", true);
          arrowTip.node.parent = this.effectParent2Node;
          arrowTip.init({
            self: role,
            player: param.target
          });
          arrowTip.hide();
          role.arrowTip = arrowTip;
        }
        this.roles.push(role);
        return role;
      },
      createGroup: function createGroup(param) {
        param = _extends({}, {
          asset: "",
          target: null,
          data: null
        }, param);
        var res = [];
        for (var i = 0; i < 20; i++) {
          var node = G("pool").get(app.getPrefab(param.asset));
          var role = $(node, "enemyGroup");
          role.uid = H.uid();
          role.asset = param.asset;
          role.node.parent = this.parent2Node;
          role.init({
            target: param.target,
            data: param.data
          });
          this.roles.push(role);
          res.push(role);
        }
        this.setGroupEnemyWorldPos(res, param.target);
        res.forEach(function(a) {
          a.initFirst(res[0]);
        });
        return res;
      },
      remove: function remove(role) {
        role.arrowTip && G("pool").put(role.arrowTip.node);
        for (var key in role.effect) G("pool").put(role.effect[key].node);
        G("pool").put(role.node);
        this.roles = this.roles.filter(function(a) {
          return a.uid != role.uid;
        });
      },
      getEnemyWorldPos: function getEnemyWorldPos(player) {
        var w = this.halfWidth;
        this.halfWidth < this.halfHeight && (w = this.halfHeight);
        var h = w;
        var angle = H.randNum(0, 360);
        var x = w * Math.cos(angle);
        var y = h * Math.sin(angle);
        var worldPos = player.node.getWorldPosition(cc.Vec2.ZERO);
        return cc.v2(x + worldPos.x, y + worldPos.y);
      },
      setGroupEnemyWorldPos: function setGroupEnemyWorldPos(enemys, player) {
        var firstEnemy = enemys[0];
        firstEnemy.node.setWorldPosition(this.getEnemyWorldPos(player));
        enemys.forEach(function(a, index) {
          if (index > 0) {
            var x = H.randNum(-150, 150);
            var y = H.randNum(-150, 150);
            a.node.x = firstEnemy.node.x + x;
            a.node.y = firstEnemy.node.y + y;
          }
        });
      },
      isOut: function isOut(selfNode, targetNode) {
        var selfWorldPos = selfNode.getWorldPosition(cc.Vec2.ZERO);
        var targetWorldPos = targetNode.getWorldPosition(cc.Vec2.ZERO);
        var targetRect = targetNode.getBoundingBox();
        var diffWidth = targetRect.width * (.5 - targetNode.anchorX);
        var diffHeight = targetRect.height * (.5 - targetNode.anchorY);
        var dist = H.dist(selfWorldPos, targetWorldPos);
        var dir = targetWorldPos.sub(selfWorldPos).normalize();
        var checkVec = cc.Vec2.ZERO;
        checkVec.x = dir.x * dist;
        checkVec.y = dir.y * dist;
        checkVec.x < 0 && (checkVec.x += targetRect.width / 2 + diffWidth);
        checkVec.x > 0 && (checkVec.x -= targetRect.width / 2 - diffWidth);
        checkVec.y < 0 && (checkVec.y += targetRect.height / 2 + diffHeight);
        if (checkVec.y > 0) {
          checkVec.y -= targetRect.height / 2 - diffHeight;
          checkVec.y += app.screen.top;
        }
        var checkVal = .7 * app.screen.height;
        return Math.abs(checkVec.x) > checkVal || Math.abs(checkVec.y) > checkVal;
      },
      getEnemy: function getEnemy(targetNode, checkHP) {
        void 0 === checkHP && (checkHP = false);
        var enemy = $(targetNode, "enemyRvo");
        enemy || (enemy = $(targetNode, "enemyNear"));
        enemy || (enemy = $(targetNode, "enemyRange"));
        enemy || (enemy = $(targetNode, "enemyGroup"));
        if (enemy && checkHP && enemy.data.HP <= 0) return;
        return enemy;
      },
      getRole: function getRole(targetNode, checkHP) {
        void 0 === checkHP && (checkHP = false);
        var role = $(targetNode, "player");
        role || (role = this.getEnemy(targetNode));
        if (role && checkHP && role.data.HP <= 0) return;
        return role;
      },
      getTargets: function getTargets(role, num, sort) {
        void 0 === num && (num = 1);
        void 0 === sort && (sort = "ASC");
        var targets = this.roles.filter(function(a) {
          return a.group != role.group && a.data.HP > 0 && app.screen.isInView(role.node, a.node);
        });
        if (targets.length < 1) return [];
        targets.sort(function(a, b) {
          var aDist = H.dist(a.bodyNode, role.bodyNode);
          var bDist = H.dist(b.bodyNode, role.bodyNode);
          if ("ASC" == sort) return aDist - bDist;
          return bDist - aDist;
        });
        return targets.slice(0, num);
      },
      getRandTargets: function getRandTargets(role, num) {
        void 0 === num && (num = 1);
        var targets = this.roles.filter(function(a) {
          return a.group != role.group && a.data.HP > 0 && app.screen.isInView(role.node, a.node);
        });
        return H.randArr(targets, num, true);
      },
      setHP: function setHP(param) {
        var _this = this;
        param = _extends({}, {
          self: null,
          target: null,
          skill: null,
          action: "-",
          value: 0
        }, param);
        if (!param.self || !param.target) return;
        if (param.self.data.HP <= 0 || param.target.data.HP <= 0) return;
        if ("player" == param.self.group && !app.screen.isInView(param.self.node, param.target.node)) return;
        var isCrit = false;
        var isDouble = false;
        var val = param.value;
        if (val <= 0) {
          val = param.self.data.ATK;
          if (param.skill) {
            if ("player" == param.self.group) {
              var valLevel = H.num(param.self.data[param.skill.skillName + "Level"]);
              valLevel && (val += valLevel);
              var valPencent = H.num(param.self.data[param.skill.skillName + "Pencent"], 2);
              val += val * (valPencent / 100);
            }
            val *= param.skill.hurtPercent / 100;
            val < 1 && (val = 1);
          }
          if (H.calOdds(param.self.data.critOdds)) {
            val *= 1.5;
            isCrit = true;
          }
          if (H.calOdds(param.self.data.doubleOdds)) {
            val *= 2;
            isDouble = true;
          }
        }
        val = H.num(val);
        if ("+" == param.action) {
          param.target.data.HP += val;
          param.target.data.HP >= param.target.defData.HP && (param.target.data.HP = param.target.defData.HP);
        }
        if ("-" == param.action) {
          param.target.data.HP -= val;
          param.target.data.HP <= 0 && (param.target.data.HP = 0);
          "player" == param.self.group && param.skill && (param.skill.isTemp || M("fight").setSkillNum(param.skill.skillName, "hurt", val, "+"));
          "player" == param.self.group, G("audio").playEffect("hurt");
        }
        "player" == param.self.group && G("effect").showTip({
          by: param.target.bodyNode,
          string: ("-" == param.action ? "" : "+") + H.num(val),
          fontSize: isCrit || isDouble ? 70 : 50,
          color: "+" == param.action ? "#00FF00" : isCrit || isDouble ? "#FF0000" : "#FFFFFF",
          addY: .1 * param.target.node.height
        });
        if (param.target.data.HP <= 0) {
          param.target.data.HP = 0;
          if ("player" == param.target.group) E.emit(this.eventType.LOSE, param.target); else {
            E.emit(this.eventType.LOSE, param.target);
            param.target.play("lose", function() {
              _this.remove(param.target);
            });
          }
        } else "-" == param.action && param.target.play("hurt");
      },
      loadSpriteFrame: function loadSpriteFrame(asset, callFunc, group) {
        void 0 === group && (group = "player");
        app.load("./fight/role/" + group + "/" + asset + "/0", cc.SpriteFrame).then(function(spriteFrame) {
          callFunc && callFunc(spriteFrame);
        });
      }
    };
    cc._RF.pop();
  }, {} ],
  roleModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e713fSrPrFKM6gOp6fCgm3e", "roleModel");
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
    module.exports = {
      eventType: {
        ADD: "roleModel.add#asset",
        UP_LEVEL: "roleModel.upLevel#asset",
        SELECT: "roleModel.setSelect#asset",
        SET_CHIP: "roleModel.setChip#asset"
      },
      createPlayerData: function createPlayerData(asset) {
        var selectRoleData = M("data").roles.filter(function(a) {
          return a.asset == asset;
        })[0];
        var res = {};
        res.HP = 100 + 5 * selectRoleData.HPLevel;
        res.ATK = 10 + selectRoleData.ATKLevel;
        for (var key in M("data").skill) res[key] = M("data").skill[key];
        for (var _key in res) res[_key] = H.num(res[_key]);
        this.getAttrs().forEach(function(attr) {
          res[attr.key] = 0;
        });
        if (!selectRoleData.selected) return res;
        var helpData = this.getHelpData();
        res.HP += helpData.HP;
        res.ATK += helpData.ATK;
        M("data").equips.forEach(function(a) {
          "HP" in a && (res.HP += a.HP);
          "ATK" in a && (res.ATK += a.ATK);
          a.attrs && a.attrs.forEach(function(attr) {
            "HPPencent" == attr.key && (res.HP += H.num(res.HP * (attr.value / 100)));
            "ATKPencent" == attr.key && (res.ATK += H.num(res.ATK * (attr.value / 100)));
            res[attr.key] += attr.value;
            res[attr.key] = H.num(res[attr.key], 2);
          });
        });
        return res;
      },
      getHelpData: function getHelpData(type) {
        var res = {};
        res.HP = 0;
        res.ATK = 0;
        var levelCount = 0;
        var calRole = function calRole() {
          M("data").roles.filter(function(a) {
            return !a.selected;
          }).forEach(function(a) {
            var HPLevel = a.HPLevel + 1;
            var ATKLevel = a.ATKLevel + 1;
            levelCount += HPLevel;
            levelCount += ATKLevel;
          });
        };
        var skillLevelCount = 0;
        var calSkill = function calSkill() {
          for (var key in M("data").skill) skillLevelCount += M("data").skill[key];
        };
        if (type) {
          "role" == type && calRole();
          "skill" == type && calSkill();
        } else {
          calRole();
          calSkill();
        }
        levelCount = H.num(levelCount);
        for (var level = 1; level <= levelCount; level++) level % 2 == 0 ? res.ATK += 1 : res.HP += 2;
        for (var _level = 1; _level <= skillLevelCount; _level++) _level % 2 == 0 ? res.ATK += .5 : res.HP += 1;
        res.HP = H.num(res.HP);
        res.ATK = H.num(res.ATK);
        return res;
      },
      getAllUpDatas: function getAllUpDatas(upType) {
        var _this = this;
        var levelCount = 0;
        var arr = [];
        M("data").roles.filter(function(a) {
          var calRes = _this.calUpLevel(a.asset, upType, 1);
          return H.isEmpty(calRes.error);
        }).forEach(function(a) {
          var level = a[upType + "Level"];
          levelCount += level;
          arr.push({
            asset: a.asset,
            level: level
          });
        });
        var sum = H.num(levelCount / arr.length);
        arr = arr.filter(function(a) {
          return a.level <= sum;
        }).sort(function(a, b) {
          return a.level - b.level;
        });
        return arr;
      },
      calUpLevel: function calUpLevel(asset, upType, upNum) {
        void 0 === upType && (upType = "ATK");
        void 0 === upNum && (upNum = 1);
        var res = {};
        res.chip = 0;
        res.gold = 0;
        res.upNum = 0;
        res.error = {};
        if (upNum < 1) return res;
        var cal = function cal(level) {
          var res = {};
          var chipVal = 0;
          var goldVal = 0;
          if ("ATK" == upType) {
            chipVal = 2;
            goldVal = 500;
          } else {
            chipVal = 1;
            goldVal = 400;
          }
          res.chip = chipVal + level * chipVal;
          res.gold = goldVal + level * goldVal;
          return res;
        };
        var roleData = this.getPlayerData(asset);
        var level = roleData[upType + "Level"];
        var num = upNum;
        while (true) {
          if (upNum) {
            num--;
            if (num < 0) break;
          }
          var calRes = cal(level);
          res.chip += calRes.chip;
          res.gold += calRes.gold;
          level++;
          res.upNum++;
        }
        this.getChip(asset) < res.chip && (res.error.chip = L("error_chip"));
        M("data").prop.gold < res.gold && (res.error.gold = L("error_gold"));
        return res;
      },
      upLevel: function upLevel(asset, upType, upNum) {
        var _this2 = this;
        void 0 === upType && (upType = "ATK");
        void 0 === upNum && (upNum = 1);
        var upRes = this.calUpLevel(asset, upType, upNum);
        H.isEmpty(upRes.error) && R("server").api("upLevelRole", {
          asset: asset,
          upRes: upRes,
          upType: upType
        }).then(function(res) {
          if (0 == res.errcode) {
            _this2.setChip(asset, "-", upRes.chip);
            M("prop").setNum("gold", "-", upRes.gold);
            var roleData = _this2.getPlayerData(asset);
            roleData[upType + "Level"] += upRes.upNum;
            E.emit(_this2.eventType.UP_LEVEL, asset);
          } else 3 == res.errcode ? upRes.error.chip = L("error_chip") : 4 == res.errcode ? upRes.error.gold = L("error_gold") : upRes.error.other = "errors";
        });
        return upRes;
      },
      calAdd: function calAdd(asset) {
        var res = {};
        res.chip = 0;
        res.gold = 0;
        res.error = {};
        var roleData = M("data").roles.filter(function(a) {
          return a.asset == asset;
        })[0];
        roleData && (res.error.has = L("error_has_role"));
        var baseData = this.getPlayerBaseData(asset);
        baseData || (res.error.chip = L("error_role"));
        res.chip = 50 * (baseData.mul - 1);
        res.chip < 50 && (res.chip = 50);
        res.gold = 5e3 * (baseData.mul - 1);
        res.gold < 5e3 && (res.gold = 5e3);
        this.getChip(asset) < res.chip && (res.error.chip = L("error_chip"));
        M("data").prop.gold < res.gold && (res.error.gold = L("error_gold"));
        return res;
      },
      add: function add(asset) {
        var addRes = this.calAdd(asset);
        if (H.isEmpty(addRes.error)) {
          this.setChip(asset, "-", addRes.chip);
          M("prop").setNum("gold", "-", addRes.gold);
          M("data").roles.push({
            asset: asset,
            ATKLevel: 0,
            HPLevel: 0
          });
          E.emit(this.eventType.ADD, asset);
        }
        return addRes;
      },
      isTip: function isTip(type, upType) {
        var _this3 = this;
        void 0 === upType && (upType = "ATK");
        var bool = false;
        "add" == type && this.getPlayerBaseDatas().forEach(function(a) {
          var checkHas = M("data").roles.filter(function(b) {
            return b.asset == a.asset;
          })[0];
          if (!checkHas) {
            var res = _this3.calAdd(a.asset);
            H.isEmpty(res.error) && (bool = true);
          }
        });
        "upLevel" == type && M("data").roles.forEach(function(a) {
          if ("upLevel" == type) {
            var res = _this3.calUpLevel(a.asset, upType, 1);
            H.isEmpty(res.error) && (bool = true);
          }
        });
        return bool;
      },
      createEnemyData: function createEnemyData(param) {
        param = _extends({}, {
          level: 0,
          bossLevel: 0,
          calPercent: 100
        }, param);
        var mul = param.calPercent / 100;
        var res = {};
        res.HP = 20 * param.level * mul;
        res.HP < 10 && (res.HP = 10);
        param.bossLevel && (res.HP = 200 * res.HP * param.bossLevel);
        res.ATK = 2 * param.level * mul;
        res.ATK < 1 && (res.ATK = 1);
        param.bossLevel && (res.ATK = 5 * res.ATK * param.bossLevel);
        res.bossLevel = param.bossLevel;
        for (var key in res) res[key] = H.num(res[key]);
        return res;
      },
      setSelect: function setSelect(asset) {
        var _this4 = this;
        var roleData = this.getPlayerData(asset);
        if (roleData.selected) return;
        R("server").api("selectRole", {
          asset: asset
        }).then(function(res) {
          if (0 == res.errcode) {
            M("data").roles.forEach(function(a) {
              delete a.selected;
            });
            roleData.selected = true;
            E.emit(_this4.eventType.SELECT, asset);
          }
        });
      },
      setChip: function setChip(asset, action, val) {
        void 0 === action && (action = "+");
        M("data").setChip("role", asset, action, val);
        E.emit(this.eventType.SET_CHIP, asset);
      },
      getAttrs: function getAttrs(type) {
        void 0 === type && (type = "*");
        var res = [];
        if ("*" == type || "base" == type) {
          res.push({
            name: L("HPPencent"),
            key: "HPPencent"
          });
          res.push({
            name: L("ATKPencent"),
            key: "ATKPencent"
          });
          res.push({
            name: L("critOdds"),
            key: "critOdds"
          });
          res.push({
            name: L("doubleOdds"),
            key: "doubleOdds"
          });
        }
        "*" != type && "skill" != type || M("skill").getBaseDatas().forEach(function(a) {
          res.push({
            asset: a.name,
            name: L("skillInfo." + a.name + ".title"),
            key: a.name + "Pencent"
          });
        });
        return res;
      },
      getChip: function getChip(asset) {
        var chip = M("data").chip.role[asset];
        return H.num(chip);
      },
      getChipColor: function getChipColor() {
        return "#FFAA00";
      },
      getPlayerData: function getPlayerData(asset) {
        return M("data").roles.filter(function(a) {
          return a.asset == asset;
        })[0];
      },
      getPlayerBaseData: function getPlayerBaseData(asset) {
        var playerBaseDatas = this.getPlayerBaseDatas();
        return playerBaseDatas.filter(function(a) {
          return a.asset == asset;
        })[0];
      },
      getPlayerBaseDatas: function getPlayerBaseDatas() {
        var res = [];
        res.push({
          asset: "allianceGuard",
          skillName: "sword"
        });
        res.push({
          asset: "orcWarrior",
          skillName: "knive"
        });
        res.forEach(function(a, index) {
          a.mul = index + 1;
        });
        return res;
      },
      getGroupAssets: function getGroupAssets() {
        return [ "batGroup", "blackVultureGroup" ];
      },
      getNearAssets: function getNearAssets() {
        return [ "bat", "boar", "sheep", "wolf", "greenMurloc", "orangeCrab", "darkScorpion", "redRaptor", "lion", "blackVulture" ];
      },
      getRangeAssets: function getRangeAssets() {
        return [ "succubus", "voidwalker", "felhound" ];
      }
    };
    cc._RF.pop();
  }, {} ],
  root: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62ae7ZwU/tOw6zRvdqb9c4o", "root");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      ctor: function ctor() {
        this.eventType = {
          LOOP: "root.loop"
        };
      },
      onLoad: function onLoad() {},
      run: function run() {
        var _this = this;
        console.log("Enter run ... ");
        if (this.isRun) return;
        this.isRun = true;
        this.stop = false;
        this.runTime = 0;
        this.schedule(this.loop, 1);
        this.achiveTips = [];
        V("login").show(function(loginData) {
          console.log("run() ... loginData ", loginData);
          if (!loginData.success) return;
          _this.onShow();
          G("audio").init(M("data").setting.audio);
          V("index").show();
          V("login").remove();
          _this.checkAchive();
        });
      },
      loop: function loop() {
        if (this.stop) return;
        this.runTime += 1;
        this.runTime % 60 == 0 && this.checkVersion();
        if (S("login_token")) for (var key in M("data").timeCount) M("data").timeCount[key] += 1;
        E.emit(this.eventType.LOOP, this.runTime);
      },
      onShow: function onShow() {
        this.stop = false;
        if (!S("login_token")) return;
        var diffSecond = 0;
        var hideTime = H.num(M("data").player.hideTime);
        hideTime > 1 && (diffSecond = H.num(H.time() - hideTime));
        for (var key in M("data").timeCount) M("data").timeCount[key] += diffSecond;
      },
      onHide: function onHide() {
        this.stop = true;
        if (!S("login_token")) return;
        M("data").player.hideTime = H.time();
        M("data").save();
      },
      checkVersion: function checkVersion() {
        var _this2 = this;
        if (!H.isNative()) return;
        if (this._dontCheckVersion) return;
        if (this._isShowCheckVersion) return;
        cc.assetManager.loadRemote(app.loader.url + "?" + new Date().getTime(), {
          ext: ".json"
        }, function(err, res) {
          if (err) return;
          var config = res.json;
          if (app.config.version != config.version || app.config.bundle.version != config.bundle.version) {
            _this2._isShowCheckVersion = true;
            V("confirm").show(L("error_version"), function(bool) {
              _this2._isShowCheckVersion = false;
              if (bool) {
                S("login_token") && M("data").save();
                H.exitGame();
                return;
              }
              _this2._dontCheckVersion = true;
            });
          }
        });
      },
      checkAchive: function checkAchive() {
        for (var type in M("data").achive) for (var assetOrKey in M("data").achive[type]) this.onAchiveInc(type, assetOrKey);
      },
      onAchiveInc: function onAchiveInc(type, assetOrKey) {
        if (M("achive").isDone(type, assetOrKey)) {
          var level = M("achive").getLevel(type, assetOrKey);
          var achiveTip = this.achiveTips.filter(function(a) {
            return a.type == type && a.assetOrKey == assetOrKey && a.level == level;
          })[0];
          if (achiveTip) return;
          this.achiveTips.push({
            type: type,
            assetOrKey: assetOrKey,
            level: level
          });
          G("audio").playTipEffect("tip");
          "useRole" == type ? G("role").loadSpriteFrame(assetOrKey, function(spriteFrame) {
            V("tip").showTop(M("achive").getTopTip(type, assetOrKey), spriteFrame, "#F6DB96");
          }) : "useSkill" == type ? V("tip").showTop(M("achive").getTopTip(type, assetOrKey), G("skill").getSpriteFrame(assetOrKey, 1), "#F6DB96") : V("tip").showTop(M("achive").getTopTip(type, assetOrKey), app.find[assetOrKey + "SpriteFrame"], "#F6DB96");
        }
      },
      onEnable: function onEnable() {
        cc.game.on(cc.game.EVENT_SHOW, this.onShow, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onHide, this);
        E.on(M("achive").eventType.INC_COUNT, this.onAchiveInc, this);
        E.on(M("achive").eventType.INC_LEVEL, this.onAchiveInc, this);
      },
      onDisable: function onDisable() {
        cc.game.off(cc.game.EVENT_SHOW, this.onShow, this);
        cc.game.off(cc.game.EVENT_HIDE, this.onHide, this);
        E.off(M("achive").eventType.INC_COUNT, this.onAchiveInc, this);
        E.off(M("achive").eventType.INC_LEVEL, this.onAchiveInc, this);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  screen: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "737c4dNbPhP1qOzzBjE9WzE", "screen");
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
    cc.Class({
      editor: {
        menu: "base/screen"
      },
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        var canvas = cc.find("Canvas").getComponent(cc.Canvas);
        this.top = 0;
        var browserWidth = window.innerWidth;
        var browserHeight = window.innerHeight;
        var DESIGN_RATIO = .5625;
        var isMobile = this.isMobileDevice();
        var size = cc.view.getCanvasSize();
        var originalRatio = size.width / size.height;
        var targetWidth = browserHeight * DESIGN_RATIO;
        console.log("onLoad originalRatio ... ", originalRatio, browserHeight, browserWidth, targetWidth, DESIGN_RATIO);
        cc.view.setFrameSize(targetWidth, browserHeight);
        canvas.fitWidth = true;
        canvas.fitHeight = true;
        this.width = cc.winSize.width;
        this.height = cc.winSize.height;
      },
      isMobileDevice: function isMobileDevice() {
        if (cc.sys.isBrowser) {
          var userAgent = navigator.userAgent.toLowerCase();
          return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        }
        return cc.sys.isMobile;
      },
      isInView: function isInView(selfNode, targetNode, param) {
        param = _extends({}, {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }, param);
        var selfWorldPos = selfNode.getWorldPosition(cc.Vec2.ZERO);
        var targetWorldPos = targetNode.getWorldPosition(cc.Vec2.ZERO);
        var targetRect = targetNode.getBoundingBox();
        var diffWidth = targetRect.width * (.5 - targetNode.anchorX);
        var diffHeight = targetRect.height * (.5 - targetNode.anchorY);
        var dist = H.dist(selfWorldPos, targetWorldPos);
        var dir = targetWorldPos.sub(selfWorldPos).normalize();
        var checkVec = cc.Vec2.ZERO;
        checkVec.x = dir.x * dist;
        checkVec.y = dir.y * dist;
        if (checkVec.x < 0) {
          checkVec.x -= targetRect.width / 2 - diffWidth;
          checkVec.x -= param.left;
        }
        if (checkVec.x > 0) {
          checkVec.x += targetRect.width / 2 + diffWidth;
          checkVec.x += param.right;
        }
        if (checkVec.y < 0) {
          checkVec.y -= targetRect.height / 2 - diffHeight;
          checkVec.y -= param.bottom;
        }
        if (checkVec.y > 0) {
          checkVec.y += targetRect.height / 2 + diffHeight;
          checkVec.y += param.top;
          checkVec.y += this.top;
        }
        return Math.abs(checkVec.x) < this.width / 2 && Math.abs(checkVec.y) < this.height / 2;
      },
      isOutView: function isOutView(selfNode, targetNode, param) {
        param = _extends({}, {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }, param);
        var selfWorldPos = selfNode.getWorldPosition(cc.Vec2.ZERO);
        var targetWorldPos = targetNode.getWorldPosition(cc.Vec2.ZERO);
        var targetRect = targetNode.getBoundingBox();
        var diffWidth = targetRect.width * (.5 - targetNode.anchorX);
        var diffHeight = targetRect.height * (.5 - targetNode.anchorY);
        var dist = H.dist(selfWorldPos, targetWorldPos);
        var dir = targetWorldPos.sub(selfWorldPos).normalize();
        var checkVec = cc.Vec2.ZERO;
        checkVec.x = dir.x * dist;
        checkVec.y = dir.y * dist;
        if (checkVec.x < 0) {
          checkVec.x += targetRect.width / 2 + diffWidth;
          checkVec.x -= param.left;
        }
        if (checkVec.x > 0) {
          checkVec.x -= targetRect.width / 2 - diffWidth;
          checkVec.x += param.right;
        }
        if (checkVec.y < 0) {
          checkVec.y += targetRect.height / 2 + diffHeight;
          checkVec.y -= param.bottom;
        }
        if (checkVec.y > 0) {
          checkVec.y -= targetRect.height / 2 - diffHeight;
          checkVec.y += param.top;
          checkVec.y += this.top;
        }
        return Math.abs(checkVec.x) > this.width / 2 || Math.abs(checkVec.y) > this.height / 2;
      },
      checkView: function checkView(selfNode, targetNode, param) {
        param = _extends({}, {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }, param);
        var selfWorldPos = selfNode.getWorldPosition(cc.Vec2.ZERO);
        var targetWorldPos = targetNode.getWorldPosition(cc.Vec2.ZERO);
        var targetRect = targetNode.getBoundingBox();
        var diffWidth = targetRect.width * (.5 - targetNode.anchorX);
        var diffHeight = targetRect.height * (.5 - targetNode.anchorY);
        var dist = H.dist(selfWorldPos, targetWorldPos);
        var dir = targetWorldPos.sub(selfWorldPos).normalize();
        var checkVec = cc.Vec2.ZERO;
        checkVec.x = dir.x * dist;
        checkVec.y = dir.y * dist;
        var res = {};
        res.worldPos = targetWorldPos;
        res.isMaxX = false;
        res.isMaxY = false;
        if (checkVec.x < 0) {
          checkVec.x -= targetRect.width / 2 - diffWidth;
          checkVec.x -= param.left;
        }
        if (checkVec.x > 0) {
          checkVec.x += targetRect.width / 2 + diffWidth;
          checkVec.x += param.right;
        }
        if (checkVec.y < 0) {
          checkVec.y -= targetRect.height / 2 - diffHeight;
          checkVec.y -= param.bottom;
        }
        if (checkVec.y > 0) {
          checkVec.y += targetRect.height / 2 + diffHeight;
          checkVec.y += param.top;
          checkVec.y += this.top;
        }
        if (Math.abs(checkVec.x) > this.width / 2 || Math.abs(checkVec.y) > this.height / 2) {
          if (Math.abs(checkVec.x) > this.width / 2) {
            res.isMaxX = true;
            checkVec.x < 0 && (res.worldPos.x += -this.width / 2 - checkVec.x);
            checkVec.x > 0 && (res.worldPos.x -= checkVec.x - this.width / 2);
          }
          if (Math.abs(checkVec.y) > this.height / 2) {
            res.isMaxY = true;
            checkVec.y < 0 && (res.worldPos.y += -this.height / 2 - checkVec.y);
            checkVec.y > 0 && (res.worldPos.y -= checkVec.y - this.height / 2);
          }
        }
        return res;
      }
    });
    cc._RF.pop();
  }, {} ],
  selectLevel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5fa2eRpcSJOaYCbiO7sC53X", "selectLevel");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      onLoad: function onLoad() {
        var _this = this;
        this.prevBtn = this.find("prevBtn", cc.Button);
        this.nextBtn = this.find("nextBtn", cc.Button);
        this.startBtn = this.find("startBtn", cc.Button);
        this.levelLabel = this.find("levelLabel", cc.Label, this.startBtn.node);
        this.chipRewardItemNode = this.find("chipRewardItem", this.startBtn.node);
        this.chipRewardItemNode.active = false;
        this.chipRewardItems = [];
        this.updLevel();
        this.roleSprite = this.find("role/icon", cc.Sprite);
        this.updRoleSprite();
        var addButtonEvents = function addButtonEvents(button, callback) {
          var touchStarted = false;
          button.node.on(cc.Node.EventType.TOUCH_START, function(e) {
            touchStarted = true;
            console.log(button.node.name + " touch started");
          }, _this);
          button.node.on(cc.Node.EventType.TOUCH_END, function(e) {
            console.log(button.node.name + " touch ended, started: " + touchStarted);
            if (touchStarted) {
              touchStarted = false;
              callback(e);
            }
          }, _this);
          button.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
            console.log(button.node.name + " touch cancelled");
            touchStarted = false;
          }, _this);
        };
        addButtonEvents(this.prevBtn, function(e) {
          if (!_this.prevBtn.interactable) return;
          console.log("Executing prev button callback");
          M("fight").setSelectLevel("-", 1);
          G("audio").playEffect("popup");
        });
        addButtonEvents(this.nextBtn, function(e) {
          if (!_this.nextBtn.interactable) return;
          M("fight").setSelectLevel("+", 1);
          G("audio").playEffect("popup");
        });
        addButtonEvents(this.startBtn, function(e) {
          var selectRoleData = M("data").roles.filter(function(a) {
            return a.selected;
          })[0];
          if (!selectRoleData) {
            V("tip").error(L("error_role"));
            return;
          }
          V("animMask").show("close", function() {
            M("fight").stop = true;
            V("animMask").show("open", function(animMask) {
              animMask.remove();
              M("fight").stop = false;
            });
            V("fight").show();
            V("index").remove();
          });
        });
      },
      updLevel: function updLevel() {
        var _this2 = this;
        this.levelLabel.string = "Lv" + H.numAbbr(M("data").fight.selectLevel);
        if (M("data").fight.level <= 1) {
          this.prevBtn.interactable = false;
          this.nextBtn.interactable = false;
        } else if (M("data").fight.selectLevel <= 1) {
          this.prevBtn.interactable = false;
          this.nextBtn.interactable = true;
        } else if (M("data").fight.selectLevel >= M("data").fight.level) {
          this.prevBtn.interactable = true;
          this.nextBtn.interactable = false;
        } else {
          this.prevBtn.interactable = true;
          this.nextBtn.interactable = true;
        }
        this.chipRewardItems && this.chipRewardItems.forEach(function(a) {
          G("pool").put(a.node, true);
        });
        this.chipRewardItems = [];
        var chipAssets = M("fight").getRewardChipAssets(M("data").fight.selectLevel);
        chipAssets.forEach(function(chipReward) {
          var item = {};
          item.node = G("pool").get(_this2.chipRewardItemNode, "selectLevelChipRewardItemNode");
          item.node.parent = _this2.chipRewardItemNode.parent;
          item.chipNode = _this2.find("chip", item.node);
          item.roleIconSprite = _this2.find("roleIcon", cc.Sprite, item.node);
          item.roleIconSprite.node.active = false;
          item.skillIconSprite = _this2.find("skillIcon", cc.Sprite, item.node);
          item.skillIconSprite.node.active = false;
          if ("role" == chipReward.type) {
            item.chipNode.color = cc.color(M("role").getChipColor());
            item.roleIconSprite.node.active = true;
            G("role").loadSpriteFrame(chipReward.asset, function(spriteFrame) {
              item.roleIconSprite.spriteFrame = spriteFrame;
            });
          }
          if ("skill" == chipReward.type) {
            item.chipNode.color = cc.color(M("skill").getChipColor());
            item.skillIconSprite.node.active = true;
            item.skillIconSprite.spriteFrame = G("skill").getSpriteFrame(chipReward.asset, 0);
          }
          _this2.chipRewardItems.push(item);
        });
      },
      updRoleSprite: function updRoleSprite() {
        var _this3 = this;
        var selectRole = M("data").roles.filter(function(a) {
          return a.selected;
        })[0];
        G("role").loadSpriteFrame(selectRole.asset, function(spriteFrame) {
          _this3.roleSprite.spriteFrame = spriteFrame;
        });
      },
      onSetSelectLevel: function onSetSelectLevel() {
        this.updLevel();
      },
      onSelectRole: function onSelectRole() {
        this.updRoleSprite();
      },
      onEnable: function onEnable() {
        E.on(M("fight").eventType.SET_SELECT_LEVEL, this.onSetSelectLevel, this);
        E.on(M("role").eventType.SELECT, this.onSelectRole, this);
      },
      onDisable: function onDisable() {
        E.off(M("fight").eventType.SET_SELECT_LEVEL, this.onSetSelectLevel, this);
        E.off(M("role").eventType.SELECT, this.onSelectRole, this);
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  server: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "03fc0839L1LaJpW2znGsCvc", "server");
    "use strict";
    function _regeneratorRuntime() {
      _regeneratorRuntime = function _regeneratorRuntime() {
        return exports;
      };
      var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
      }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
          value: value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }), obj[key];
      }
      try {
        define({}, "");
      } catch (err) {
        define = function define(obj, key, value) {
          return obj[key] = value;
        };
      }
      function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
          value: makeInvokeMethod(innerFn, self, context)
        }), generator;
      }
      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }
      exports.wrap = wrap;
      var ContinueSentinel = {};
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function() {
        return this;
      });
      var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      function defineIteratorMethods(prototype) {
        [ "next", "throw", "return" ].forEach(function(method) {
          define(prototype, method, function(arg) {
            return this._invoke(method, arg);
          });
        });
      }
      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if ("throw" !== record.type) {
            var result = record.arg, value = result.value;
            return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            }) : PromiseImpl.resolve(value).then(function(unwrapped) {
              result.value = unwrapped, resolve(result);
            }, function(error) {
              return invoke("throw", error, resolve, reject);
            });
          }
          reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
          value: function value(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new PromiseImpl(function(resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }
            return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }
        });
      }
      function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
          if ("executing" === state) throw new Error("Generator is already running");
          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }
          for (context.method = method, context.arg = arg; ;) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if ("next" === context.method) context.sent = context._sent = context.arg; else if ("throw" === context.method) {
              if ("suspendedStart" === state) throw state = "completed", context.arg;
              context.dispatchException(context.arg);
            } else "return" === context.method && context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);
            if ("normal" === record.type) {
              if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
              return {
                value: record.arg,
                done: context.done
              };
            }
            "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
          }
        };
      }
      function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (void 0 === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", 
        context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", 
        context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), 
        ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, 
        context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, 
        "return" !== context.method && (context.method = "next", context.arg = void 0), 
        context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), 
        context.delegate = null, ContinueSentinel);
      }
      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], 
        entry.afterLoc = locs[3]), this.tryEntries.push(entry);
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
      }
      function Context(tryLocsList) {
        this.tryEntries = [ {
          tryLoc: "root"
        } ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
      }
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) return iteratorMethod.call(iterable);
          if ("function" == typeof iterable.next) return iterable;
          if (!isNaN(iterable.length)) {
            var i = -1, next = function next() {
              for (;++i < iterable.length; ) if (hasOwn.call(iterable, i)) return next.value = iterable[i], 
              next.done = !1, next;
              return next.value = void 0, next.done = !0, next;
            };
            return next.next = next;
          }
        }
        return {
          next: doneResult
        };
      }
      function doneResult() {
        return {
          value: void 0,
          done: !0
        };
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
      }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
      }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), 
      exports.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
      }, exports.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, 
        define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), 
        genFun;
      }, exports.awrap = function(arg) {
        return {
          __await: arg
        };
      }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
      }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
      }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
      }), define(Gp, "toString", function() {
        return "[object Generator]";
      }), exports.keys = function(val) {
        var object = Object(val), keys = [];
        for (var key in object) keys.push(key);
        return keys.reverse(), function next() {
          for (;keys.length; ) {
            var key = keys.pop();
            if (key in object) return next.value = key, next.done = !1, next;
          }
          return next.done = !0, next;
        };
      }, exports.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, 
          this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), 
          !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
        },
        stop: function stop() {
          this.done = !0;
          var rootRecord = this.tryEntries[0].completion;
          if ("throw" === rootRecord.type) throw rootRecord.arg;
          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) throw exception;
          var context = this;
          function handle(loc, caught) {
            return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", 
            context.arg = void 0), !!caught;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i], record = entry.completion;
            if ("root" === entry.tryLoc) return handle("end");
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              } else {
                if (!hasFinally) throw new Error("try statement without catch or finally");
                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }
          finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
          var record = finallyEntry ? finallyEntry.completion : {};
          return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", 
          this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if ("throw" === record.type) throw record.arg;
          return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, 
          this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), 
          ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), 
            resetTryEntry(entry), ContinueSentinel;
          }
        },
        catch: function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if ("throw" === record.type) {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          return this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
        }
      }, exports;
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var crypt = require("crypt");
    var axios = require("../../scripts/libs/axios");
    module.exports = {
      url: "https://is-backend-test-api.potato-nonofficial.xyz",
      key: "",
      encode: function encode(data) {
        return crypt.encode(data, this.key);
      },
      decode: function decode(cryptStr) {
        return crypt.decode(cryptStr, this.key);
      },
      api: function api(name, data) {
        var _this = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
             case 0:
              void 0 === data && (data = {});
              console.log("enter api ... ", name, data);
              _context.t0 = name;
              _context.next = "login" === _context.t0 ? 5 : "subsinfo" === _context.t0 ? 6 : "upLevelRole" === _context.t0 ? 7 : "upLevelSkill" === _context.t0 ? 8 : "gameStart" === _context.t0 ? 9 : "gameSyncFight" === _context.t0 ? 10 : "gameRevive" === _context.t0 ? 11 : "gameClaimAll" === _context.t0 ? 12 : "gameDoubleReward" === _context.t0 ? 13 : "gameEnd" === _context.t0 ? 14 : "selectRole" === _context.t0 ? 15 : "buyRole" === _context.t0 ? 16 : "openEquipBox" === _context.t0 ? 17 : "putOnEquip" === _context.t0 ? 18 : "sellEquip" === _context.t0 ? 19 : "claimAchiveReward" === _context.t0 ? 20 : 21;
              break;

             case 5:
              return _context.abrupt("return", _this._loginRequest(data));

             case 6:
              return _context.abrupt("return", _this._subsInfo(data));

             case 7:
              return _context.abrupt("return", _this._upLevelRole(data));

             case 8:
              return _context.abrupt("return", _this._upLevelSkill(data));

             case 9:
              return _context.abrupt("return", _this._gameStart(data));

             case 10:
              return _context.abrupt("return", _this._gameSyncFight(data));

             case 11:
              return _context.abrupt("return", _this._gameRevive(data));

             case 12:
              return _context.abrupt("return", _this._gameClaimAll(data));

             case 13:
              return _context.abrupt("return", _this._gameDoubleReward(data));

             case 14:
              return _context.abrupt("return", _this._gameEnd(data));

             case 15:
              return _context.abrupt("return", _this._selectRole(data));

             case 16:
              return _context.abrupt("return", _this._buyRole(data));

             case 17:
              return _context.abrupt("return", _this._openEquipBox(data));

             case 18:
              return _context.abrupt("return", _this._putOnEquip(data));

             case 19:
              return _context.abrupt("return", _this._sellEquip(data));

             case 20:
              return _context.abrupt("return", _this._claimAchiveReward(data));

             case 21:
              return _context.abrupt("return", Promise.resolve({
                errcode: 404,
                message: 'API name "' + name + '" not found'
              }));

             case 22:
             case "end":
              return _context.stop();
            }
          }, _callee);
        }))();
      },
      _upLevelRole: function _upLevelRole(data) {
        var _this2 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee2() {
          var url, token, res;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
             case 0:
              url = _this2.url + "/upLevelRole";
              _context2.prev = 1;
              token = S("login_token");
              _context2.next = 5;
              return axios({
                method: "POST",
                url: url,
                data: {
                  asset: data.asset,
                  upNum: data.upRes.upNum,
                  upType: data.upType
                },
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 5:
              res = _context2.sent;
              console.log("after upLevelRole ... ", res);
              return _context2.abrupt("return", res.data);

             case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", _this2.handleRequestError(_context2.t0, "_upLevelRole"));

             case 13:
             case "end":
              return _context2.stop();
            }
          }, _callee2, null, [ [ 1, 10 ] ]);
        }))();
      },
      _upLevelSkill: function _upLevelSkill(data) {
        var _this3 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee3() {
          var url, token, res;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
             case 0:
              url = _this3.url + "/upLevelSkill";
              _context3.prev = 1;
              token = S("login_token");
              _context3.next = 5;
              return axios({
                method: "POST",
                url: url,
                data: {
                  asset: data.asset,
                  upNum: data.upRes.upNum
                },
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 5:
              res = _context3.sent;
              console.log("after _upLevelSkill ... ", res);
              return _context3.abrupt("return", res.data);

             case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", _this3.handleRequestError(_context3.t0, "_upLevelSkill"));

             case 13:
             case "end":
              return _context3.stop();
            }
          }, _callee3, null, [ [ 1, 10 ] ]);
        }))();
      },
      _loginRequest: function _loginRequest(data) {
        var _this4 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee4() {
          var walletAddress, sign, publicKey, token, url, res;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
             case 0:
              walletAddress = data.walletAddress, sign = data.sign, publicKey = data.publicKey, 
              token = data.token;
              if (token) {
                _context4.next = 4;
                break;
              }
              if (!(!walletAddress || !sign || !publicKey)) {
                _context4.next = 4;
                break;
              }
              return _context4.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing walletAddress or sign"
              }));

             case 4:
              url = _this4.url + "/login";
              _context4.prev = 5;
              _context4.next = 8;
              return axios({
                method: "POST",
                url: url,
                data: {
                  walletAddress: data.walletAddress,
                  sign: data.sign,
                  publicKey: data.publicKey,
                  token: token
                }
              });

             case 8:
              res = _context4.sent;
              return _context4.abrupt("return", res.data);

             case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](5);
              return _context4.abrupt("return", _this4.handleRequestError(_context4.t0, "login"));

             case 15:
             case "end":
              return _context4.stop();
            }
          }, _callee4, null, [ [ 5, 12 ] ]);
        }))();
      },
      _subsInfo: function _subsInfo() {
        var _this5 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee5() {
          var token, url, res;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
             case 0:
              token = S("login_token");
              if (token) {
                _context5.next = 3;
                break;
              }
              return _context5.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing authorization token"
              }));

             case 3:
              url = _this5.url + "/subs/info";
              _context5.prev = 4;
              _context5.next = 7;
              return axios({
                method: "GET",
                url: url,
                headers: {
                  Authorization: "Bearer " + token
                },
                data: {}
              });

             case 7:
              res = _context5.sent;
              console.log("after subs/info ... ", res);
              return _context5.abrupt("return", res.data);

             case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](4);
              return _context5.abrupt("return", _this5.handleRequestError(_context5.t0, "_subsInfo"));

             case 15:
             case "end":
              return _context5.stop();
            }
          }, _callee5, null, [ [ 4, 12 ] ]);
        }))();
      },
      _gameStart: function _gameStart(data) {
        var _this6 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee6() {
          var token, url, res;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
             case 0:
              token = S("login_token");
              if (token) {
                _context6.next = 3;
                break;
              }
              return _context6.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing authorization token"
              }));

             case 3:
              url = _this6.url + "/game/start";
              _context6.prev = 4;
              _context6.next = 7;
              return axios({
                method: "POST",
                url: url,
                data: {
                  selectLevel: data.selectLevel
                },
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 7:
              res = _context6.sent;
              console.log("after game/start ... ", res);
              return _context6.abrupt("return", res.data);

             case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](4);
              return _context6.abrupt("return", _this6.handleRequestError(_context6.t0, "_gameStart"));

             case 15:
             case "end":
              return _context6.stop();
            }
          }, _callee6, null, [ [ 4, 12 ] ]);
        }))();
      },
      _gameSyncFight: function _gameSyncFight(data) {
        var _this7 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee7() {
          var token, url, res;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
             case 0:
              token = S("login_token");
              if (token) {
                _context7.next = 3;
                break;
              }
              return _context7.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing authorization token"
              }));

             case 3:
              url = _this7.url + "/game/syncFight";
              _context7.prev = 4;
              _context7.next = 7;
              return axios({
                method: "POST",
                url: url,
                data: data,
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 7:
              res = _context7.sent;
              return _context7.abrupt("return", res.data);

             case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](4);
              return _context7.abrupt("return", _this7.handleRequestError(_context7.t0, "gameSyncFight"));

             case 14:
             case "end":
              return _context7.stop();
            }
          }, _callee7, null, [ [ 4, 11 ] ]);
        }))();
      },
      _gameRevive: function _gameRevive(data) {
        var _this8 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee8() {
          var token, url, res;
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
             case 0:
              token = S("login_token");
              if (token) {
                _context8.next = 3;
                break;
              }
              return _context8.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing authorization token"
              }));

             case 3:
              url = _this8.url + "/game/revive";
              _context8.prev = 4;
              _context8.next = 7;
              return axios({
                method: "POST",
                url: url,
                data: data,
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 7:
              res = _context8.sent;
              return _context8.abrupt("return", res.data);

             case 11:
              _context8.prev = 11;
              _context8.t0 = _context8["catch"](4);
              return _context8.abrupt("return", _this8.handleRequestError(_context8.t0, "gameRevive"));

             case 14:
             case "end":
              return _context8.stop();
            }
          }, _callee8, null, [ [ 4, 11 ] ]);
        }))();
      },
      _gameClaimAll: function _gameClaimAll(data) {
        var _this9 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee9() {
          var token, url, res;
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
             case 0:
              token = S("login_token");
              if (token) {
                _context9.next = 3;
                break;
              }
              return _context9.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing authorization token"
              }));

             case 3:
              url = _this9.url + "/game/claimAll";
              _context9.prev = 4;
              _context9.next = 7;
              return axios({
                method: "POST",
                url: url,
                data: data,
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 7:
              res = _context9.sent;
              return _context9.abrupt("return", res.data);

             case 11:
              _context9.prev = 11;
              _context9.t0 = _context9["catch"](4);
              return _context9.abrupt("return", _this9.handleRequestError(_context9.t0, "gameClaimAll"));

             case 14:
             case "end":
              return _context9.stop();
            }
          }, _callee9, null, [ [ 4, 11 ] ]);
        }))();
      },
      _gameDoubleReward: function _gameDoubleReward(data) {
        var _this10 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee10() {
          var token, url, res;
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
             case 0:
              token = S("login_token");
              if (token) {
                _context10.next = 3;
                break;
              }
              return _context10.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing authorization token"
              }));

             case 3:
              url = _this10.url + "/game/doubleReward";
              _context10.prev = 4;
              _context10.next = 7;
              return axios({
                method: "POST",
                url: url,
                data: data,
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 7:
              res = _context10.sent;
              return _context10.abrupt("return", res.data);

             case 11:
              _context10.prev = 11;
              _context10.t0 = _context10["catch"](4);
              return _context10.abrupt("return", _this10.handleRequestError(_context10.t0, "gameDoubleReward"));

             case 14:
             case "end":
              return _context10.stop();
            }
          }, _callee10, null, [ [ 4, 11 ] ]);
        }))();
      },
      _openEquipBox: function _openEquipBox(data) {
        var _this11 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee11() {
          var token, url, res;
          return _regeneratorRuntime().wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
             case 0:
              token = S("login_token");
              if (token) {
                _context11.next = 3;
                break;
              }
              return _context11.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing authorization token"
              }));

             case 3:
              url = _this11.url + "/openEquipBox";
              _context11.prev = 4;
              _context11.next = 7;
              return axios({
                method: "POST",
                url: url,
                data: data,
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 7:
              res = _context11.sent;
              return _context11.abrupt("return", res.data);

             case 11:
              _context11.prev = 11;
              _context11.t0 = _context11["catch"](4);
              return _context11.abrupt("return", _this11.handleRequestError(_context11.t0, "_openEquipBox"));

             case 14:
             case "end":
              return _context11.stop();
            }
          }, _callee11, null, [ [ 4, 11 ] ]);
        }))();
      },
      _putOnEquip: function _putOnEquip(data) {
        var _this12 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee12() {
          var token, url, res;
          return _regeneratorRuntime().wrap(function _callee12$(_context12) {
            while (1) switch (_context12.prev = _context12.next) {
             case 0:
              token = S("login_token");
              if (token) {
                _context12.next = 3;
                break;
              }
              return _context12.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing authorization token"
              }));

             case 3:
              url = _this12.url + "/putOnEquip";
              _context12.prev = 4;
              _context12.next = 7;
              return axios({
                method: "POST",
                url: url,
                data: data,
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 7:
              res = _context12.sent;
              return _context12.abrupt("return", res.data);

             case 11:
              _context12.prev = 11;
              _context12.t0 = _context12["catch"](4);
              return _context12.abrupt("return", _this12.handleRequestError(_context12.t0, "_putOnEquip"));

             case 14:
             case "end":
              return _context12.stop();
            }
          }, _callee12, null, [ [ 4, 11 ] ]);
        }))();
      },
      _sellEquip: function _sellEquip(data) {
        var _this13 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee13() {
          var token, url, res;
          return _regeneratorRuntime().wrap(function _callee13$(_context13) {
            while (1) switch (_context13.prev = _context13.next) {
             case 0:
              token = S("login_token");
              if (token) {
                _context13.next = 3;
                break;
              }
              return _context13.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing authorization token"
              }));

             case 3:
              url = _this13.url + "/sellEquip";
              _context13.prev = 4;
              _context13.next = 7;
              return axios({
                method: "POST",
                url: url,
                data: data,
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 7:
              res = _context13.sent;
              return _context13.abrupt("return", res.data);

             case 11:
              _context13.prev = 11;
              _context13.t0 = _context13["catch"](4);
              return _context13.abrupt("return", _this13.handleRequestError(_context13.t0, "_sellEquip"));

             case 14:
             case "end":
              return _context13.stop();
            }
          }, _callee13, null, [ [ 4, 11 ] ]);
        }))();
      },
      _claimAchiveReward: function _claimAchiveReward(data) {
        var _this14 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee14() {
          var token, url, res;
          return _regeneratorRuntime().wrap(function _callee14$(_context14) {
            while (1) switch (_context14.prev = _context14.next) {
             case 0:
              token = S("login_token");
              if (token) {
                _context14.next = 3;
                break;
              }
              return _context14.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing authorization token"
              }));

             case 3:
              url = _this14.url + "/claimAchiveReward";
              _context14.prev = 4;
              _context14.next = 7;
              return axios({
                method: "POST",
                url: url,
                data: data,
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 7:
              res = _context14.sent;
              return _context14.abrupt("return", res.data);

             case 11:
              _context14.prev = 11;
              _context14.t0 = _context14["catch"](4);
              return _context14.abrupt("return", _this14.handleRequestError(_context14.t0, "_claimAchiveReward"));

             case 14:
             case "end":
              return _context14.stop();
            }
          }, _callee14, null, [ [ 4, 11 ] ]);
        }))();
      },
      _selectRole: function _selectRole(data) {
        var _this15 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee15() {
          var token, url, res;
          return _regeneratorRuntime().wrap(function _callee15$(_context15) {
            while (1) switch (_context15.prev = _context15.next) {
             case 0:
              token = S("login_token");
              if (token) {
                _context15.next = 3;
                break;
              }
              return _context15.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing authorization token"
              }));

             case 3:
              url = _this15.url + "/selectRole";
              _context15.prev = 4;
              _context15.next = 7;
              return axios({
                method: "POST",
                url: url,
                data: data,
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 7:
              res = _context15.sent;
              return _context15.abrupt("return", res.data);

             case 11:
              _context15.prev = 11;
              _context15.t0 = _context15["catch"](4);
              return _context15.abrupt("return", _this15.handleRequestError(_context15.t0, "selectRole"));

             case 14:
             case "end":
              return _context15.stop();
            }
          }, _callee15, null, [ [ 4, 11 ] ]);
        }))();
      },
      _buyRole: function _buyRole(data) {
        var _this16 = this;
        return _asyncToGenerator(_regeneratorRuntime().mark(function _callee16() {
          var token, url, res;
          return _regeneratorRuntime().wrap(function _callee16$(_context16) {
            while (1) switch (_context16.prev = _context16.next) {
             case 0:
              token = S("login_token");
              if (token) {
                _context16.next = 3;
                break;
              }
              return _context16.abrupt("return", Promise.resolve({
                errcode: 1,
                message: "Missing authorization token"
              }));

             case 3:
              url = _this16.url + "/buyRole";
              _context16.prev = 4;
              _context16.next = 7;
              return axios({
                method: "POST",
                url: url,
                data: data,
                headers: {
                  Authorization: "Bearer " + token
                }
              });

             case 7:
              res = _context16.sent;
              return _context16.abrupt("return", res.data);

             case 11:
              _context16.prev = 11;
              _context16.t0 = _context16["catch"](4);
              return _context16.abrupt("return", _this16.handleRequestError(_context16.t0, "buyRole"));

             case 14:
             case "end":
              return _context16.stop();
            }
          }, _callee16, null, [ [ 4, 11 ] ]);
        }))();
      },
      handleRequestError: function handleRequestError(error, apiName) {
        console.error("API " + apiName + " failed:", error);
        if (error.response) {
          var _error$response$data;
          var status = error.response.status;
          if (500 === status) {
            console.log("Server error 500, clearing token and reloading game...");
            S("login_token", null);
            window.location.reload();
          }
          return {
            errcode: status,
            message: (null == (_error$response$data = error.response.data) ? void 0 : _error$response$data.message) || apiName + " failed with status " + status
          };
        }
        return {
          errcode: 500,
          message: error.message || apiName + " Network Error"
        };
      }
    };
    cc._RF.pop();
  }, {
    "../../scripts/libs/axios": void 0,
    crypt: "crypt"
  } ],
  settingModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c73721SFJZAjrV41I0ifTNw", "settingModel");
    "use strict";
    module.exports = {
      eventType: {
        SET_FRAMERATE: "settingModel.setFrameRate#val",
        SET_OPEN_EQUIP: {
          rank: "settingModel.setOpenEquip.rank",
          star: "settingModel.setOpenEquip.star"
        }
      },
      setFrameRate: function setFrameRate(val) {
        val = H.num(val);
        M("data").setting.frameRate = val;
        E.emit(this.eventType.SET_FRAMERATE, val);
      },
      setOpenEquip: function setOpenEquip(key, val) {
        M("data").setting.openEquip[key] = val;
        E.emit(this.eventType.SET_OPEN_EQUIP[key]);
      }
    };
    cc._RF.pop();
  }, {} ],
  setting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "03dd4YKwO1DIqe2mb9mb0k6", "setting");
    "use strict";
    cc.Class({
      extends: require("ccBase"),
      properties: {
        frameRate60Btn: cc.Button,
        frameRate30Btn: cc.Button,
        musicBtn: cc.Button,
        effectBtn: cc.Button,
        onSpriteFrame: cc.SpriteFrame,
        offSpriteFrame: cc.SpriteFrame
      },
      onEnable: function onEnable() {
        this.musicBtn.iconSprite = this.find("icon", cc.Sprite, this.musicBtn.node);
        this.effectBtn.iconSprite = this.find("icon", cc.Sprite, this.effectBtn.node);
        this.updAudio();
        this.musicBtn.node.on("touchend", this.setMusic, this);
        this.effectBtn.node.on("touchend", this.setEffect, this);
        this.frameRate60Btn.node.on("touchend", this.setFrameRate, this);
        this.frameRate30Btn.node.on("touchend", this.setFrameRate, this);
        this.updFrameRateBtn();
      },
      onDisable: function onDisable() {
        this.musicBtn.node.off("touchend", this.setMusic, this);
        this.effectBtn.node.off("touchend", this.setEffect, this);
        this.frameRate60Btn.node.off("touchend", this.setFrameRate, this);
        this.frameRate30Btn.node.off("touchend", this.setFrameRate, this);
      },
      setMusic: function setMusic() {
        M("data").setting.audio.music = !M("data").setting.audio.music;
        G("audio").init(M("data").setting.audio);
        M("data").setting.audio.music ? G("audio").playPreMusic() : G("audio").stopMusic();
        this.updAudio();
      },
      setEffect: function setEffect() {
        M("data").setting.audio.effect = !M("data").setting.audio.effect;
        G("audio").init(M("data").setting.audio);
        G("audio").stopAllEffects();
        this.updAudio();
      },
      updAudio: function updAudio() {
        M("data").setting.audio.music ? this.musicBtn.iconSprite.spriteFrame = this.onSpriteFrame : this.musicBtn.iconSprite.spriteFrame = this.offSpriteFrame;
        M("data").setting.audio.effect ? this.effectBtn.iconSprite.spriteFrame = this.onSpriteFrame : this.effectBtn.iconSprite.spriteFrame = this.offSpriteFrame;
      },
      setFrameRate: function setFrameRate(e) {
        var node = e.target;
        -1 != node.name.indexOf("60") ? M("setting").setFrameRate(60) : M("setting").setFrameRate(30);
        this.updFrameRateBtn();
      },
      updFrameRateBtn: function updFrameRateBtn() {
        if (M("data").setting.frameRate >= 60) {
          this.find("checkmark", this.frameRate60Btn.node).active = true;
          this.find("checkmark", this.frameRate30Btn.node).active = false;
        } else {
          this.find("checkmark", this.frameRate60Btn.node).active = false;
          this.find("checkmark", this.frameRate30Btn.node).active = true;
        }
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  skillInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9ded9k/3kRM3KA47FxfhSjV", "skillInfo");
    "use strict";
    cc.Class({
      extends: require("popup"),
      properties: {},
      show: function show(asset) {
        var _this = this;
        this.itemNode = this.find("item");
        this.itemNode.active = false;
        var langDes = L("skillInfo." + asset + ".des");
        var arr = langDes.split("\n");
        var des = arr[0];
        var attrs = [];
        arr[1] && (attrs = arr[1].split(","));
        this.itemNode.parent.active = attrs.length > 0;
        this.find("desLabel", cc.Label).string = des;
        attrs.forEach(function(str) {
          var item = {};
          item.node = H.inst(_this.itemNode);
          item.node.parent = _this.itemNode.parent;
          item.label = _this.find("label", cc.Label, item.node);
          item.label.string = str;
        });
        return H.show(this);
      }
    });
    cc._RF.pop();
  }, {
    popup: "popup"
  } ],
  skillMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e9fa1U3rGlPRbfsLH6N8eB/", "skillMgr");
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
    module.exports = {
      eventType: {
        SET_LEVEL: "skillMgr.level",
        SET_PASSIVE_LEVEL: "skillMgr.passiveLevel"
      },
      init: function init(param) {
        param = _extends({}, {
          parent1Node: null,
          parent2Node: null
        }, param);
        this.parent1Node = param.parent1Node;
        this.parent2Node = param.parent2Node;
      },
      checkRole: function checkRole(role) {
        if (!role) return false;
        if (role.data.HP <= 0) return false;
        if (role.state.sleep.cd > 0) return;
        if (role.target && "player" == role.target.group && role.target.data.HP <= 0) return false;
        return true;
      },
      setLevel: function setLevel(role, skillName, level) {
        var _this = this;
        void 0 === level && (level = 1);
        if (!role) return;
        if (role.data.HP <= 0) return;
        if (null === level) {
          var skill = role.skills.filter(function(a) {
            return a.skillName == skillName;
          })[0];
          skill.remove && skill.remove();
          skill.removeAll && skill.removeAll();
          role.node.removeComponent(skill);
          role.skills = role.skills.filter(function(a) {
            return a.skillName != skillName;
          });
          delete M("fight").player.skill[skillName];
          return;
        }
        if (role[skillName]) {
          role[skillName].initData(M("skill").createData({
            name: skillName,
            level: level
          }));
          M("fight").setSkillNum(skillName, "level", level);
          E.emit(this.eventType.SET_LEVEL, role, skillName);
        } else {
          var addSkill = function addSkill(comp) {
            role[skillName] = H.add$(role.node, comp);
            role[skillName].init(role, skillName);
            role[skillName].initData(M("skill").createData({
              name: skillName,
              level: level
            }));
            role.skills.push(role[skillName]);
            M("fight").setSkillNum(skillName, "level", level);
            E.emit(_this.eventType.SET_LEVEL, role, skillName);
          };
          var bulletSkillNames = [ "dart", "fireBall", "magicBall" ];
          if (bulletSkillNames.includes(skillName)) {
            addSkill("bullet");
            return;
          }
          addSkill(skillName);
        }
      },
      setPassiveLevel: function setPassiveLevel(role, skillName, level) {
        void 0 === level && (level = 1);
        if (!role) return;
        if (role.data.HP <= 0) return;
        M("fight").setPassiveSkillNum(skillName, "level", level);
        var passoveSkill = M("fight").player.passiveSkill[skillName];
        if ("HP" == skillName || "ATK" == skillName) {
          var selectRoleData = M("data").roles.filter(function(a) {
            return a.selected;
          })[0];
          var defData = M("role").createPlayerData(selectRoleData.asset);
          var pencent = passoveSkill.level * passoveSkill.pencent;
          if ("HP" == skillName) {
            role.defData[skillName] = H.num(role.defData[skillName] + defData[skillName] * (pencent / 100));
            G("role").setHP({
              self: role,
              target: role,
              action: "+",
              value: .1 * role.defData.HP
            });
          }
          if ("ATK" == skillName) {
            role.data[skillName] = H.num(role.data[skillName] + defData[skillName] * (pencent / 100));
            role.defData[skillName] = H.num(role.defData[skillName] + defData[skillName] * (pencent / 100));
          }
        }
        "SPD" == skillName && role.setMoveSpeed(passoveSkill.level + 1);
        "propRadius" == skillName && role.setPropRadius(passoveSkill.level + 1);
        E.emit(this.eventType.SET_PASSIVE_LEVEL, role, skillName);
      },
      getSpriteFrame: function getSpriteFrame(asset, index) {
        void 0 === index && (index = 0);
        return app.find[asset + "SpriteFrames"][index];
      }
    };
    cc._RF.pop();
  }, {} ],
  skillModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "df6d1yI1+5LDYMhDC+mJjqd", "skillModel");
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
    module.exports = {
      eventType: {
        SET_CHIP: "skillModel.setChip#asset",
        UP_LEVEL: "skillModel.upLevel#asset"
      },
      createData: function createData(param) {
        param = _extends({}, {
          name: "",
          level: 1,
          hurtPercent: 0
        }, param);
        var data = {};
        if ("fireBall" == param.name) {
          data.hurtPercent = 100;
          data.asset = "fireBall";
          data.scale = 1;
          data.angle = 10;
          data.num = 1;
          data.speed = 400;
          data.cd = 3;
          data.pierce = 3;
          data.isRandTarget = false;
          param.level > 1 && (data.num = 2);
          param.level > 2 && (data.cd = 2);
          param.level > 3 && (data.num = 3);
          if (param.level > 4) {
            data.scale = 2;
            data.hurtPercent = 150;
          }
          param.level > 5 && (data.num = 4);
          param.level > 6 && (data.cd = 1);
          param.level > 7 && (data.num = 5);
          param.level > 8 && (data.pierce = false);
          if (param.level > 9) {
            data.asset = "fireBall2";
            data.scale = 4;
            data.cd = .5;
            data.num = 2;
            data.isRandTarget = true;
          }
        }
        if ("stony" == param.name) {
          data.hurtPercent = 100;
          data.asset = "stony";
          data.num = 3;
          data.cd = 3;
          data.radius = 100;
          data.roundTime = 2;
          data.scale = 1;
          param.level > 1 && (data.num = 4);
          param.level > 2 && (data.cd = 2);
          param.level > 3 && (data.radius = 150);
          param.level > 4 && (data.roundTime = 1.5);
          param.level > 5 && (data.num = 5);
          param.level > 6 && (data.cd = 1);
          param.level > 7 && (data.radius = 200);
          param.level > 8 && (data.roundTime = 1);
          if (param.level > 9) {
            data.hurtPercent = 150;
            data.asset = "stony2";
            data.cd = 0;
            data.roundTime = 1;
            data.scale = 1.2;
          }
        }
        if ("dart" == param.name) {
          data.hurtPercent = 100;
          data.asset = "dart";
          data.isRound = false;
          data.angle = 10;
          data.num = 3;
          data.speed = 600;
          data.cd = 3;
          data.scale = 1;
          data.pierce = 1;
          if (param.level > 1) {
            data.angle = 15;
            data.num = 5;
          }
          param.level > 2 && (data.cd = 2);
          param.level > 3 && (data.pierce = 2);
          if (param.level > 4) {
            data.angle = 20;
            data.num = 7;
          }
          if (param.level > 5) {
            data.scale = 1.5;
            data.cd = 1;
          }
          param.level > 6 && (data.pierce = 3);
          if (param.level > 7) {
            data.isRound = true;
            data.angle = 20;
          }
          if (param.level > 8) {
            data.angle = 15;
            data.pierce = 4;
          }
          if (param.level > 9) {
            data.cd = 1.5;
            data.hurtPercent = 150;
            data.asset = "dart2";
            data.angle = 25;
            data.scale = 2;
            data.pierce = false;
          }
        }
        if ("drug" == param.name) {
          data.hurtPercent = 50;
          data.asset = "drug";
          data.cd = 3;
          data.num = 1;
          data.scale = 1;
          data.timeout = 3;
          param.level > 1 && (data.num = 2);
          param.level > 2 && (data.cd = 2);
          param.level > 3 && (data.scale = 1.5);
          param.level > 4 && (data.timeout = 5);
          param.level > 5 && (data.num = 3);
          param.level > 5 && (data.cd = 1);
          param.level > 6 && (data.scale = 2);
          param.level > 7 && (data.num = 4);
          param.level > 8 && (data.num = 5);
          if (param.level > 9) {
            data.asset = "drug2";
            data.num = 6;
            data.hurtPercent = 80;
          }
        }
        if ("hole" == param.name) {
          data.hurtPercent = 50;
          data.asset = "hole";
          data.scale = 1;
          data.hurtCd = .5;
          param.level > 1 && (data.scale = 1.5);
          param.level > 2 && (data.hurtPercent = 60);
          param.level > 3 && (data.scale = 2);
          param.level > 4 && (data.hurtPercent = 70);
          param.level > 5 && (data.scale = 2.5);
          param.level > 6 && (data.hurtPercent = 80);
          param.level > 7 && (data.scale = 3);
          param.level > 8 && (data.hurtPercent = 90);
          if (param.level > 9) {
            data.asset = "hole2";
            data.hurtPercent = 100;
          }
        }
        if ("sword" == param.name) {
          data.hurtPercent = 150;
          data.asset = "sword";
          data.scale = 1;
          data.cd = 2;
          data.num = 1;
          data.roundNum = 1;
          param.level > 1 && (data.scale = 1.5);
          param.level > 2 && (data.cd = data.cd / 2);
          param.level > 3 && (data.num = 2);
          param.level > 4 && (data.roundNum = 2);
          param.level > 5 && (data.scale = 2);
          param.level > 6 && (data.hurtPercent = 165);
          param.level > 7 && (data.num = 3);
          param.level > 8 && (data.hurtPercent = 180);
          if (param.level > 9) {
            data.asset = "sword2";
            data.hurtPercent = 200;
            data.scale = 1.5;
            data.num = 3;
            data.cd = data.cd / 2;
            data.roundNum = 3;
          }
        }
        if ("magicBall" == param.name) {
          data.hurtPercent = 100;
          data.asset = "magicBall";
          data.scale = 1;
          data.speed = 600;
          data.cd = 1;
          data.pierce = 1;
          param.level > 1 && (data.cd = .9);
          param.level > 2 && (data.cd = .8);
          param.level > 3 && (data.cd = .7);
          param.level > 4 && (data.cd = .6);
          param.level > 5 && (data.cd = .5);
          param.level > 6 && (data.cd = .4);
          param.level > 7 && (data.cd = .3);
          param.level > 8 && (data.cd = .2);
          if (param.level > 9) {
            data.asset = "magicBall2";
            data.hurtPercent = 150;
            data.speed = 800;
            data.cd = .05;
          }
        }
        if ("lightning" == param.name) {
          data.hurtPercent = 100;
          data.asset = "lightning";
          data.cd = 3;
          data.scale = 1;
          data.num = 1;
          param.level > 1 && (data.num = 2);
          param.level > 2 && (data.num = 3);
          if (param.level > 3) {
            data.cd = 2;
            data.num = 4;
          }
          param.level > 4 && (data.num = 5);
          param.level > 5 && (data.num = 6);
          param.level > 6 && (data.num = 7);
          param.level > 7 && (data.num = 8);
          param.level > 8 && (data.num = 9);
          if (param.level > 9) {
            data.asset = "lightning2";
            data.hurtPercent = 150;
            data.scale = 1.5;
            data.num = 10;
          }
          data.cd = 1;
        }
        if ("boomerang" == param.name) {
          data.hurtPercent = 50;
          data.asset = "boomerang";
          data.cd = 3;
          data.scale = 1;
          data.num = 1;
          param.level > 1 && (data.num = 2);
          if (param.level > 2) {
            data.hurtPercent = 60;
            data.num = 3;
          }
          if (param.level > 3) {
            data.num = 4;
            data.cd = 1.5;
          }
          if (param.level > 4) {
            data.hurtPercent = 70;
            data.num = 5;
          }
          if (param.level > 5) {
            data.hurtPercent = 80;
            data.scale = 1.5;
            data.num = 6;
          }
          param.level > 6 && (data.num = 7);
          param.level > 7 && (data.num = 8);
          param.level > 8 && (data.num = 9);
          if (param.level > 9) {
            data.hurtPercent = 100;
            data.asset = "boomerang2";
            data.num = 10;
            data.scale = 3;
            data.cd = 1;
          }
        }
        if ("bomb" == param.name) {
          data.hurtPercent = 100;
          data.asset = "bomb";
          data.cd = 3;
          data.scale = 1;
          data.boomScale = 1;
          data.num = 1;
          data.speed = 500;
          param.level > 1 && (data.num = 2);
          if (param.level > 2) {
            data.hurtPercent = 110;
            data.num = 3;
          }
          if (param.level > 3) {
            data.num = 4;
            data.cd = 2;
          }
          if (param.level > 4) {
            data.hurtPercent = 120;
            data.num = 5;
          }
          if (param.level > 5) {
            data.hurtPercent = 130;
            data.scale = 1.5;
            data.num = 6;
          }
          param.level > 6 && (data.num = 7);
          param.level > 7 && (data.num = 8);
          param.level > 8 && (data.num = 9);
          if (param.level > 9) {
            data.hurtPercent = 150;
            data.asset = "bomb2";
            data.num = 10;
            data.scale = 1.5;
            data.boomScale = 2;
            data.speed = 600;
          }
        }
        if ("ice" == param.name) {
          data.hurtPercent = 100;
          data.asset = "ice";
          data.scale = 1;
          data.num = 1;
          data.speed = 800;
          data.cd = 3;
          data.pierce = 1;
          data.freezeCd = 2;
          data.freezeScale = 1;
          param.level > 1 && (data.num = 2);
          param.level > 2 && (data.cd = 2);
          param.level > 3 && (data.num = 3);
          if (param.level > 4) {
            data.scale = 1.5;
            data.hurtPercent = 110;
            data.pierce = 2;
          }
          param.level > 5 && (data.num = 4);
          param.level > 6 && (data.num = 5);
          param.level > 7 && (data.pierce = 3);
          param.level > 8 && (data.pierce = 4);
          if (param.level > 9) {
            data.asset = "ice2";
            data.cd = 1.5;
            data.hurtPercent = 150;
            data.speed = 1e3;
            data.pierce = false;
            data.freezeCd = 3;
            data.freezeScale = 1.5;
          }
        }
        if ("knive" == param.name) {
          data.hurtPercent = 100;
          data.asset = "knive";
          data.scale = 1;
          data.num = 1;
          data.speed = 500;
          data.cd = 3;
          param.level > 1 && (data.num = 2);
          param.level > 2 && (data.cd = 2);
          param.level > 3 && (data.hurtPercent = 110);
          param.level > 4 && (data.scale = 1.5);
          param.level > 5 && (data.scale = 2);
          param.level > 6 && (data.speed = 700);
          param.level > 7 && (data.hurtPercent = 120);
          param.level > 8 && (data.hurtPercent = 130);
          if (param.level > 9) {
            data.hurtPercent = 150;
            data.asset = "knive2";
            data.scale = 3;
            data.num = 3;
            data.cd = 1.5;
          }
        }
        if ("gem" == param.name) {
          data.hurtPercent = 50;
          data.asset = "gem";
          data.scale = 1;
          data.num = 1;
          data.speed = 1e3;
          data.cd = 5;
          data.timeout = 5;
          param.level > 1 && (data.num = 2);
          param.level > 2 && (data.hurtPercent = 60);
          param.level > 3 && (data.num = 3);
          param.level > 4 && (data.hurtPercent = 70);
          param.level > 5 && (data.num = 4);
          param.level > 6 && (data.hurtPercent = 80);
          param.level > 7 && (data.num = 5);
          param.level > 8 && (data.hurtPercent = 90);
          if (param.level > 9) {
            data.hurtPercent = 100;
            data.asset = "gem2";
            data.cd = 3;
          }
        }
        if ("laser" == param.name) {
          data.hurtPercent = 50;
          data.asset = "laser";
          data.cd = 3;
          data.num = 1;
          data.scale = 1;
          data.timeout = 3;
          param.level > 1 && (data.num = 2);
          param.level > 2 && (data.cd = 2);
          param.level > 3 && (data.num = 3);
          param.level > 4 && (data.scale = 2);
          param.level > 5 && (data.hurtPercent = 60);
          param.level > 6 && (data.num = 4);
          param.level > 7 && (data.num = 5);
          param.level > 8 && (data.scale = 5);
          if (param.level > 9) {
            data.num = 6;
            data.timeout = 5;
            data.asset = "laser2";
            data.cd = 1.5;
            data.hurtPercent = 80;
          }
        }
        if ("tornado" == param.name) {
          data.hurtPercent = 50;
          data.asset = "tornado";
          data.cd = 5;
          data.num = 1;
          data.scale = 2;
          data.timeout = 10;
          data.speed = 200;
          param.level > 1 && (data.num = 2);
          param.level > 2 && (data.cd = 3);
          if (param.level > 3) {
            data.hurtPercent = 60;
            data.speed = 250;
          }
          param.level > 4 && (data.scale = 2.5);
          param.level > 5 && (data.hurtPercent = 70);
          if (param.level > 6) {
            data.num = 3;
            data.speed = 300;
          }
          param.level > 7 && (data.scale = 3);
          param.level > 8 && (data.num = 4);
          if (param.level > 9) {
            data.asset = "tornado2";
            data.hurtPercent = 80;
            data.num = 5;
            data.cd = 2.5;
            data.scale = 4;
          }
        }
        data.hurtPercent = data.hurtPercent + param.hurtPercent;
        return data;
      },
      getAllUpDatas: function getAllUpDatas() {
        var _this = this;
        var levelCount = 0;
        var arr = [];
        this.getBaseDatas().filter(function(a) {
          var calRes = _this.calUpLevel(a.name, 1);
          return H.isEmpty(calRes.error);
        }).forEach(function(a) {
          var level = _this.getLevel(a.name);
          levelCount += level;
          arr.push({
            asset: a.name,
            level: level
          });
        });
        var sum = H.num(levelCount / arr.length);
        arr = arr.filter(function(a) {
          return a.level <= sum;
        }).sort(function(a, b) {
          return a.level - b.level;
        });
        return arr;
      },
      getBaseDatas: function getBaseDatas() {
        var res = [];
        res.push({
          name: "fireBall",
          title: L("skillInfo.fireBall.title"),
          des: L("skillInfo.fireBall.des")
        });
        res.push({
          name: "stony",
          title: L("skillInfo.stony.title"),
          des: L("skillInfo.stony.des")
        });
        res.push({
          name: "dart",
          title: L("skillInfo.dart.title"),
          des: L("skillInfo.dart.des")
        });
        res.push({
          name: "drug",
          title: L("skillInfo.drug.title"),
          des: L("skillInfo.drug.des")
        });
        res.push({
          name: "sword",
          title: L("skillInfo.sword.title"),
          des: L("skillInfo.sword.des")
        });
        res.push({
          name: "hole",
          title: L("skillInfo.hole.title"),
          des: L("skillInfo.hole.des")
        });
        res.push({
          name: "magicBall",
          title: L("skillInfo.magicBall.title"),
          des: L("skillInfo.magicBall.des")
        });
        res.push({
          name: "lightning",
          title: L("skillInfo.lightning.title"),
          des: L("skillInfo.lightning.des")
        });
        res.push({
          name: "boomerang",
          title: L("skillInfo.boomerang.title"),
          des: L("skillInfo.boomerang.des")
        });
        res.push({
          name: "bomb",
          title: L("skillInfo.bomb.title"),
          des: L("skillInfo.bomb.des")
        });
        res.push({
          name: "ice",
          title: L("skillInfo.ice.title"),
          des: L("skillInfo.ice.des")
        });
        res.push({
          name: "knive",
          title: L("skillInfo.knive.title"),
          des: L("skillInfo.knive.des")
        });
        res.push({
          name: "gem",
          title: L("skillInfo.gem.title"),
          des: L("skillInfo.gem.des")
        });
        res.push({
          name: "laser",
          title: L("skillInfo.laser.title"),
          des: L("skillInfo.laser.des")
        });
        res.push({
          name: "tornado",
          title: L("skillInfo.tornado.title"),
          des: L("skillInfo.tornado.des")
        });
        var banNames = [];
        var arr = [];
        M("role").getPlayerBaseDatas().forEach(function(a) {
          var skillData = res.filter(function(b) {
            return b.name == a.skillName;
          })[0];
          if (skillData) {
            arr.push(skillData);
            banNames.push(skillData.name);
          }
        });
        arr = arr.concat(res.filter(function(a) {
          return !banNames.includes(a.name);
        }));
        return arr;
      },
      getPassiveBaseDatas: function getPassiveBaseDatas() {
        var res = [];
        res.push({
          name: "propRadius",
          title: L("passiveSkillInfo.propRadius.title")
        });
        res.push({
          name: "ATK",
          title: L("passiveSkillInfo.ATK.title"),
          pencent: 5
        });
        res.push({
          name: "HP",
          title: L("passiveSkillInfo.HP.title"),
          pencent: 10
        });
        res.push({
          name: "SPD",
          title: L("passiveSkillInfo.SPD.title")
        });
        return res;
      },
      getMaxNum: function getMaxNum(type) {
        if ("passive" == type) return 2;
        return 5;
      },
      setChip: function setChip(asset, action, val) {
        void 0 === action && (action = "+");
        M("data").setChip("skill", asset, action, val);
        E.emit(this.eventType.SET_CHIP, asset);
      },
      getChip: function getChip(asset) {
        var chip = M("data").chip.skill ? M("data").chip.skill[asset] : null;
        return H.num(chip);
      },
      getChipColor: function getChipColor() {
        return "#00FFFF";
      },
      calUpLevel: function calUpLevel(asset, upNum) {
        void 0 === upNum && (upNum = 1);
        var res = {};
        res.chip = 0;
        res.gold = 0;
        res.upNum = 0;
        res.error = {};
        if (upNum < 1) return res;
        var cal = function cal(level) {
          var res = {};
          var chipVal = 2;
          var goldVal = 500;
          res.chip = chipVal + level * chipVal;
          res.gold = goldVal + level * goldVal;
          return res;
        };
        var level = H.num(M("data").skill[asset + "Level"]);
        var num = upNum;
        while (true) {
          if (upNum) {
            num--;
            if (num < 0) break;
          }
          var calRes = cal(level);
          res.chip += calRes.chip;
          res.gold += calRes.gold;
          level++;
          res.upNum++;
        }
        this.getChip(asset) < res.chip && (res.error.chip = L("error_chip"));
        M("data").prop.gold < res.gold && (res.error.gold = L("error_gold"));
        return res;
      },
      getLevel: function getLevel(asset) {
        return H.num(M("data").skill[asset + "Level"]);
      },
      upLevel: function upLevel(asset, upNum) {
        var _this2 = this;
        void 0 === upNum && (upNum = 1);
        var calRes = this.calUpLevel(asset, upNum);
        H.isEmpty(calRes.error) && R("server").api("upLevelSkill", {
          asset: asset,
          upRes: calRes
        }).then(function(res) {
          if (0 == res.errcode) {
            _this2.setChip(asset, "-", calRes.chip);
            M("prop").setNum("gold", "-", calRes.gold);
            var skillKey = asset + "Level";
            skillKey in M("data").skill || (M("data").skill[skillKey] = 0);
            console.log("upLevel after ... 1", M("data").skill[skillKey], calRes.upNum);
            M("data").skill[skillKey] += calRes.upNum;
            E.emit(_this2.eventType.UP_LEVEL, asset);
            console.log("upLevel after ... 2", M("data").skill[skillKey]);
          } else 3 == res.errcode ? calRes.error.chip = L("error_chip") : 4 == res.errcode ? calRes.error.gold = L("error_gold") : calRes.error.other = "errors";
        });
        return calRes;
      },
      isTip: function isTip() {
        var _this3 = this;
        var bool = false;
        this.getBaseDatas().forEach(function(a) {
          var res = _this3.calUpLevel(a.name, 1);
          H.isEmpty(res.error) && (bool = true);
        });
        return bool;
      }
    };
    cc._RF.pop();
  }, {} ],
  skill: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "18321B8cZxKPp5weYyGkUNo", "skill");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      initBase: function initBase(param) {
        param = _extends({}, {
          role: null,
          hurtPercent: 100,
          skillName: ""
        }, param);
        this.role = param.role;
        this.hurtPercent = param.hurtPercent;
        this.skillName = param.skillName;
        this.collider = $(this.node, cc.BoxCollider);
        this.collider || (this.collider = $(this.node, cc.CircleCollider));
        this.collider || (this.collider = $(this.node, cc.PolygonCollider));
        if (this.collider) {
          this.collider.onCollisionEnter = this.onEnter.bind(this);
          this.collider.onCollisionStay = this.onStay.bind(this);
          this.collider.onCollisionExit = this.onExit.bind(this);
          this.collider.enabled = true;
        }
        this.isCollide = true;
        this.isStay = false;
        this.isBullet = false;
        this.isTemp = false;
      },
      onEnter: function onEnter(other, self) {},
      onStay: function onStay(other, self) {},
      onExit: function onExit(other, self) {}
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  sortChildIndex: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6c4baUetUlK5qHLloQ31HTr", "sortChildIndex");
    "use strict";
    cc.Class({
      editor: {
        menu: "base/sortChildIndex"
      },
      extends: require("ccBase"),
      properties: {},
      onLoad: function onLoad() {
        this._frame = 0;
      },
      sortChildrenByY: function sortChildrenByY() {
        var listToSort = this.node.children.slice();
        listToSort.sort(function(a, b) {
          return b.getPosition().y - a.getPosition().y;
        });
        for (var i = 0; i < listToSort.length; ++i) {
          var node = listToSort[i];
          node.active && node.setSiblingIndex(i + 1);
        }
      },
      update: function update(dt) {
        this._frame++;
        if (this._frame % 6 == 0) {
          this._frame = 0;
          this.sortChildrenByY();
        }
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  stonyItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "114b3dhmzZCv5J8xjF5LyVe", "stonyItem");
    "use strict";
    cc.Class({
      extends: require("skill"),
      properties: {},
      onEnter: function onEnter(other, self) {
        if (!this.role) return;
        var skill = $(other.node, "skill");
        if (skill) {
          if (skill.role.group == this.role.group) return;
          if (!skill.isBullet) return;
          if (skill.remove) {
            G("effect").create({
              by: skill.node,
              asset: "boom"
            });
            skill.remove();
            return;
          }
        }
        var role = G("role").getRole(other.node, true);
        if (!role) return;
        if (role.group == this.role.group) return;
        role.hurtRepel && role.hurtRepel(this.role.node);
      }
    });
    cc._RF.pop();
  }, {
    skill: "skill"
  } ],
  stony: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "663e6tGB/VDEr/nqSoW7Vnv", "stony");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      ctor: function ctor() {
        this.items = [];
      },
      initData: function initData(param) {
        param = _extends({}, {
          asset: "",
          num: 3,
          cd: 3,
          radius: 100,
          roundTime: 2,
          timeout: 5,
          scale: 1,
          clockwise: false,
          hurtPercent: 100
        }, param);
        this.hurtPercent = param.hurtPercent;
        this.prefab = app.getPrefab(param.asset);
        this.num = param.num;
        this.defCd = param.cd;
        this.cd = this.defCd;
        this.radius = param.radius;
        this.roundTime = param.roundTime;
        this.timeout = param.timeout;
        this.scale = param.scale;
        this.clockwise = param.clockwise;
        this.skillCd = 0;
        this.removeAll();
      },
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
      },
      onDisable: function onDisable() {
        this.removeAll();
      },
      createItems: function createItems() {
        if (!G("skill").checkRole(this.role)) return;
        if (!this.prefab) return;
        var byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        for (var i = 1; i <= this.num; i++) {
          var node = G("pool").get(this.prefab);
          node.parent = G("skill").parent2Node;
          node.scaleX = this.scale;
          node.scaleY = this.scale;
          var skill = $(node, "skill");
          skill.initBase({
            role: this.role,
            hurtPercent: this.hurtPercent,
            skillName: this.skillName
          });
          var item = {};
          item.node = node;
          item.angle = i * (360 / this.num);
          this.updItemWorldPos(item, byWorldPos);
          this.items.push(item);
        }
      },
      removeAll: function removeAll() {
        this.items && this.items.forEach(function(item) {
          G("pool").put(item.node);
        });
        this.items = [];
      },
      updItemWorldPos: function updItemWorldPos(item, byWorldPos) {
        var radian = Math.PI / 180 * item.angle;
        var worldPos = cc.v2(0, 0);
        worldPos.x = byWorldPos.x + this.radius * Math.cos(radian);
        worldPos.y = byWorldPos.y + this.radius * Math.sin(radian);
        item.node.setWorldPosition(worldPos);
      },
      updItems: function updItems(dt) {
        var _this = this;
        if (this.items.length < 1) return;
        var byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.items.forEach(function(item) {
          _this.updItemWorldPos(item, byWorldPos);
          var anglePerFrame = dt * (360 / _this.roundTime);
          _this.clockwise ? item.angle -= anglePerFrame : item.angle += anglePerFrame;
          item.angle >= 360 ? item.angle %= 360 : item.angle <= -360 && (item.angle %= -360);
        });
      },
      update: function update(dt) {
        if (!this.role) return;
        if (M("fight").stop) return;
        this.updItems(dt);
        if (this.defCd <= 0) {
          this.items.length < 1 && this.createItems();
          return;
        }
        if (this.skillCd > 0) {
          this.skillCd -= dt;
          this.skillCd <= 0 && this.removeAll();
          return;
        }
        this.cd -= dt;
        if (this.cd > 0) return;
        this.items.length < 1 && this.createItems();
        this.skillCd = this.timeout;
        this.cd = this.defCd;
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  swordItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6f776kABgtGdavK+dBb2DUu", "swordItem");
    "use strict";
    cc.Class({
      extends: require("skill"),
      properties: {},
      onEnter: function onEnter(other, self) {
        if (!this.role) return;
        var skill = $(other.node, "skill");
        if (skill) {
          if (skill.role.group == this.role.group) return;
          if (!skill.isBullet) return;
          if (skill.remove) {
            G("effect").create({
              by: skill.node,
              asset: "boom"
            });
            skill.remove();
            return;
          }
        }
        var role = G("role").getRole(other.node, true);
        if (!role) return;
        if (role.group == this.role.group) return;
        role.hurtRepel && role.hurtRepel(this.role.node);
      }
    });
    cc._RF.pop();
  }, {
    skill: "skill"
  } ],
  sword: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "950e0AalhBEGLke4call7f5", "sword");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
        this.items = [];
      },
      initData: function initData(param) {
        param = _extends({}, {
          asset: "",
          scale: 2,
          cd: 3,
          num: 1,
          roundNum: 1,
          hurtPercent: 100
        }, param);
        this.radius = this.role.node.width;
        this.hurtPercent = param.hurtPercent;
        this.num = param.num;
        this.scale = param.scale;
        this.prefab = app.getPrefab(param.asset);
        this.defCd = param.cd;
        this.cd = this.defCd;
        this.roundTime = 1;
        this.defSkillCd = this.roundTime * param.roundNum;
        this.skillCd = 0;
        this.removeAll();
      },
      createItems: function createItems() {
        if (!G("skill").checkRole(this.role)) return;
        if (!this.prefab) return;
        var byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        for (var i = 1; i <= this.num; i++) {
          var node = G("pool").get(this.prefab);
          node.parent = G("skill").parent2Node;
          node.scaleX = this.scale;
          node.scaleY = this.scale;
          var skill = $(node, "skill");
          skill.initBase({
            role: this.role,
            hurtPercent: this.hurtPercent,
            skillName: this.skillName
          });
          var realWidth = node.width * this.scale;
          var motionStreak = $(cc.find("track", node), cc.MotionStreak);
          motionStreak.stroke = .8 * realWidth;
          var item = {};
          item.node = node;
          item.angle = i * (360 / this.num);
          this.updItemWorldPos(item, byWorldPos);
          this.items.push(item);
        }
      },
      updItemWorldPos: function updItemWorldPos(item, byWorldPos) {
        var radian = Math.PI / 180 * item.angle;
        var worldPos = cc.v2(0, 0);
        worldPos.x = byWorldPos.x + this.radius * Math.cos(radian);
        worldPos.y = byWorldPos.y + this.radius * Math.sin(radian);
        item.node.setWorldPosition(worldPos);
      },
      updItems: function updItems(dt) {
        var _this = this;
        if (this.items.length < 1) return;
        var byWorldPos = this.role.bodyNode.getWorldPosition(cc.Vec2.ZERO);
        this.items.forEach(function(item) {
          _this.updItemWorldPos(item, byWorldPos);
          var anglePerFrame = dt * (360 / _this.roundTime);
          item.angle -= anglePerFrame;
          item.angle >= 360 ? item.angle %= 360 : item.angle <= -360 && (item.angle %= -360);
          var toPos = item.node.getWorldPosition(cc.Vec2.ZERO);
          var byPos = byWorldPos;
          var angle = 180 * Math.atan2(toPos.y - byPos.y, toPos.x - byPos.x) / Math.PI;
          item.node.angle = angle;
        });
      },
      removeAll: function removeAll() {
        if (this.items) {
          this.items.forEach(function(item) {
            G("pool").put(item.node);
          });
          this.items = [];
        }
      },
      onDisable: function onDisable() {
        this.removeAll();
      },
      update: function update(dt) {
        if (!this.role) return;
        if (M("fight").stop) return;
        this.updItems(dt);
        if (this.skillCd > 0) {
          this.skillCd -= dt;
          this.skillCd <= 0 && this.removeAll();
          return;
        }
        this.cd -= dt;
        if (this.cd > 0) return;
        this.createItems();
        this.cd = this.defCd;
        this.skillCd = this.defSkillCd;
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  taptap: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "423c7DVXnJI1oxhiUIEj5QR", "taptap");
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
    var _native = require("native");
    var isAndroid = _native.isAndroid;
    var isIos = _native.isIos;
    var TapTap = {};
    sdkEvent.TapTap = {};
    sdkEvent.TapTap.login = {};
    TapTap.init = function(clientID) {
      isAndroid && _native.call("TapTap", "init", "(Ljava/lang/String;)V", clientID);
      isIos && _native.call("TapTap", "init", clientID);
    };
    TapTap.login = {};
    TapTap.login.sign = function() {
      isAndroid && _native.call("TapTap", "login", "()V");
      isIos && _native.call("TapTap", "login");
    };
    TapTap.login.out = function() {
      isAndroid && _native.call("TapTap", "logout", "()V");
      isIos && _native.call("TapTap", "logout");
    };
    TapTap.login.onError = function() {};
    sdkEvent.TapTap.login.onError = function() {
      var _TapTap$login;
      (_TapTap$login = TapTap.login).onError.apply(_TapTap$login, arguments);
    };
    TapTap.login.onClose = function() {};
    sdkEvent.TapTap.login.onClose = function() {
      var _TapTap$login2;
      (_TapTap$login2 = TapTap.login).onClose.apply(_TapTap$login2, arguments);
    };
    TapTap.login.onSign = function() {};
    sdkEvent.TapTap.login.onSign = function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
      setTimeout(function() {
        var _TapTap$login3;
        (_TapTap$login3 = TapTap.login).onSign.apply(_TapTap$login3, args);
      }, 1e3);
    };
    sdkEvent.TapTap.anti = {};
    TapTap.anti = {};
    TapTap.anti.show = function(option) {
      option = _extends({}, {
        userIdentifier: "",
        isTapUser: false
      }, option);
      isAndroid && _native.call("TapTap", "showAnti", "(Ljava/lang/String;)V", JSON.stringify(option));
      isIos && _native.call("TapTap", "showAnti", JSON.stringify(option));
    };
    TapTap.anti.onSuccess = function() {};
    sdkEvent.TapTap.anti.onSuccess = function() {
      var _TapTap$anti;
      (_TapTap$anti = TapTap.anti).onSuccess.apply(_TapTap$anti, arguments);
    };
    TapTap.anti.onClose = function() {};
    sdkEvent.TapTap.anti.onClose = function() {
      var _TapTap$anti2;
      (_TapTap$anti2 = TapTap.anti).onClose.apply(_TapTap$anti2, arguments);
    };
    TapTap.anti.exit = function() {
      isAndroid && _native.call("TapTap", "exitAnti", "()V");
      isIos && _native.call("TapTap", "exitAnti");
    };
    TapTap.anti.getAgeRange = function() {
      if (isAndroid) return _native.call("TapTap", "getAntiAgeRange", "()I");
      if (isIos) return _native.call("TapTap", "getAntiAgeRange");
    };
    TapTap.anti.getRemainingTime = function() {
      if (isAndroid) return _native.call("TapTap", "getAntiRemainingTime", "()I");
      if (isIos) return _native.call("TapTap", "getAntiRemainingTime");
    };
    TapTap.anti.enterGame = function() {
      if (isAndroid) return _native.call("TapTap", "antiEnterGame", "()V");
      if (isIos) return _native.call("TapTap", "antiEnterGame");
    };
    TapTap.anti.leaveGame = function() {
      if (isAndroid) return _native.call("TapTap", "antiLeaveGame", "()V");
      if (isIos) return _native.call("TapTap", "antiLeaveGame");
    };
    module.exports = TapTap;
    cc._RF.pop();
  }, {
    native: "native"
  } ],
  tip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "de2d6UlLgRHHrnl6F/XSrYN", "tip");
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
    cc.Class({
      extends: require("ccPopup"),
      properties: {},
      onLoad: function onLoad() {
        this.touchClose = false;
        this.fullBgNode = this.find("fullBg");
        this.textNode = this.find("text");
        this.loadingNode = this.find("loading");
        this.timeout = 0;
      },
      onEnable: function onEnable() {
        this.addEvent(this.node);
        this._super();
      },
      onDisable: function onDisable() {
        this.option = null;
        this.removeEvent(this.node);
        this._super();
      },
      tipEvent: function tipEvent() {
        if (this.option.touchClose) {
          this.timeout > 0 && this.unschedule(this.close);
          this.close();
        }
      },
      getConfig: function getConfig() {
        return {
          color: "#FFFFFF",
          touchClose: false,
          showFull: false,
          showAnim: true
        };
      },
      config: function config(option) {
        void 0 === option && (option = {});
        var config = this.getConfig();
        this.option = _extends({}, config, option);
        return this;
      },
      text: function text(string, timeout) {
        void 0 === timeout && (timeout = 0);
        this.timeout = timeout;
        H.setIndex(this.node, "last");
        this.node.active = true;
        this.unscheduleAllCallbacks();
        this.closeTween && this.closeTween.stop();
        this.option || (this.option = this.getConfig());
        this.loadingNode.active = false;
        this.fullBgNode.active = this.option.showFull;
        this.textNode.active = true;
        var label = this.find("label", cc.Label, this.textNode);
        label.node.color = new cc.color(this.option.color);
        label.string = H.toString(string);
        if (this.option.showAnim) {
          this.textNode.scaleX = .5;
          this.textNode.scaleY = .5;
          cc.tween(this.textNode).to(.1, {
            scaleX: 1.2,
            scaleY: 1.2
          }).to(.05, {
            scaleX: 1,
            scaleY: 1
          }).start();
        } else {
          this.textNode.scaleX = 1;
          this.textNode.scaleY = 1;
        }
        timeout > 0 && this.scheduleOnce(this.close, timeout);
        return this;
      },
      error: function error(string, spriteFrame, spriteFrameNodeColor) {
        void 0 === spriteFrameNodeColor && (spriteFrameNodeColor = "#FFFFFF");
        this.show(string, "#FF0000", spriteFrame, spriteFrameNodeColor);
      },
      success: function success(string, spriteFrame, spriteFrameNodeColor) {
        void 0 === spriteFrameNodeColor && (spriteFrameNodeColor = "#FFFFFF");
        this.show(string, "#00FF00", spriteFrame, spriteFrameNodeColor);
      },
      show: function show(string, color, spriteFrame, spriteFrameNodeColor) {
        void 0 === color && (color = "#FFFFFF");
        void 0 === spriteFrameNodeColor && (spriteFrameNodeColor = "#FFFFFF");
        string = string.toString().replace(/\\n/g, ", ");
        var node = G("pool").get(app.getPrefab("tipItem"));
        var parentNode = cc.find("tipItemParent", this.node.parent);
        if (!parentNode) {
          parentNode = new cc.Node();
          parentNode.name = "tipItemParent";
          parentNode.parent = this.node.parent;
          parentNode.anchorY = 0;
          var layout = H.add$(parentNode, cc.Layout, true);
          layout.type = cc.Layout.Type.VERTICAL;
          layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
          layout.spacingY = 5;
        }
        H.setIndex(parentNode, "last");
        node.parent = parentNode;
        var iconSprite = this.find("bg/layout/icon", cc.Sprite, node);
        iconSprite.node.color = cc.color(spriteFrameNodeColor);
        if (spriteFrame) {
          iconSprite.node.active = true;
          iconSprite.spriteFrame = spriteFrame;
        } else iconSprite.node.active = false;
        var label = this.find("bg/layout/label", cc.Label, node);
        label.node.color = cc.color(color);
        label.string = string;
        var animNode = cc.find("bg", node);
        animNode.y = 0;
        animNode.scaleX = .9;
        animNode.scaleY = .9;
        animNode.opacity = 255;
        cc.tween(animNode).to(.1, {
          scaleX: 1.1,
          scaleY: 1.1
        }).to(.1, {
          scaleX: 1,
          scaleY: 1
        }).to(1, {
          scaleX: 1,
          scaleY: 1
        }).to(.2, {
          y: 100,
          opacity: 50
        }).call(function() {
          G("pool").put(node);
        }).start();
      },
      showTop: function showTop(string, spriteFrame, color) {
        void 0 === color && (color = "#00FF00");
        string = string.toString().replace(/\\n/g, ", ");
        var node = G("pool").get(app.getPrefab("tipTopItem"));
        var parentNode = cc.find("tipTopItemParent", this.node.parent);
        if (!parentNode) {
          parentNode = new cc.Node();
          parentNode.name = "tipTopItemParent";
          parentNode.parent = this.node.parent;
          parentNode.anchorY = 1;
          parentNode.height = node.height;
          H.add$(parentNode, cc.Mask, true);
          var widget = H.add$(parentNode, cc.Widget, true);
          widget.isAlignLeft = true;
          widget.isAlignRight = true;
          widget.isAlignTop = true;
          widget.top = 0;
          widget.left = 0;
          widget.right = 0;
          widget.updateAlignment();
          var layout = H.add$(parentNode, cc.Layout, true);
          layout.type = cc.Layout.Type.VERTICAL;
          layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
          layout.spacingY = 0;
          layout.updateLayout();
        }
        H.setIndex(parentNode, "last");
        node.parent = parentNode;
        var iconSprite = this.find("bg/layout/icon", cc.Sprite, node);
        if (spriteFrame) {
          iconSprite.node.active = true;
          iconSprite.spriteFrame = spriteFrame;
        } else iconSprite.node.active = false;
        var label = this.find("bg/layout/label", cc.Label, node);
        label.node.color = cc.color(color);
        label.string = string;
        var animNode = cc.find("bg", node);
        animNode.y = node.height;
        cc.tween(animNode).to(.2, {
          y: 0
        }).to(3).to(.1, {
          y: node.height
        }).call(function() {
          G("pool").put(node);
        }).start();
      },
      showLoading: function showLoading(string) {
        this.closeTween && this.closeTween.stop();
        this.option || (this.option = this.getConfig());
        H.setIndex(this.node, "last");
        this.node.active = true;
        this.loadingNode.active = true;
        this.fullBgNode.active = this.option.showFull;
        this.textNode.active = false;
        var label = this.find("label", cc.Label, this.loadingNode);
        label.node.active = !!string;
        if (string) {
          label.node.color = new cc.color(this.option.color);
          label.string = H.toString(string);
        }
        return this;
      },
      close: function close() {
        var _this = this;
        if (!this.node.active) return;
        if (this.textNode.active && this.option.showAnim) {
          this.closeTween = cc.tween(this.textNode);
          this.closeTween.to(.05, {
            scaleX: .5,
            scaleY: .5
          }).call(function() {
            _this.node.active = false;
          }).start();
          return;
        }
        this.node.active = false;
      }
    });
    cc._RF.pop();
  }, {
    ccPopup: "ccPopup"
  } ],
  tornadoItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6f2145xAg5GQLR25tjGOHrN", "tornadoItem");
    "use strict";
    cc.Class({
      extends: require("skill"),
      properties: {},
      init: function init(speed, timeout) {
        this.speed = speed;
        this.timeout = timeout;
        this.anim = this.find("anim", cc.Animation);
        this.anim.play(this.node.name);
        var byWorldPos = H.getWorldPos(this.role.node);
        var w = app.screen.width / 2 * .5;
        var h = app.screen.height / 2 * .5;
        var x = H.randNum(-w, w);
        var y = H.randNum(-h, h);
        this.node.setWorldPosition(cc.v2(byWorldPos.x + x, byWorldPos.y + y));
        this.dir = this.getRandDir();
        this.changeDirCd = 0;
        this.defHurtCd = .2;
        this.hurtCd = this.defHurtCd;
        this.isCollide = false;
        this.isStay = true;
        this.randCd = 0;
        this.isInit = true;
      },
      checkView: function checkView() {
        return app.screen.checkView(this.role.node, this.node);
      },
      getRandDir: function getRandDir() {
        var toWorldPos = G("role").getEnemyWorldPos(this.role);
        var byWorldPos = H.getWorldPos(this.role.node);
        return toWorldPos.sub(byWorldPos).normalize();
      },
      onStay: function onStay(other, self) {
        if (!this.role) return;
        var role = G("role").getRole(other.node, true);
        if (!role) return;
        if (role.group == this.role.group) return;
        role.suck && role.suck(this.node);
      },
      remove: function remove() {
        var _this = this;
        var animState = this.anim.play("remove");
        animState.once(cc.Animation.EventType.FINISHED, function() {
          G("pool").put(_this.node);
        });
      },
      changeDir: function changeDir(curDir) {
        if (this.changeDirCd > 0) return H.getWorldPos(this.role.bodyNode).sub(H.getWorldPos(this.node)).normalize();
        this.changeDirCd = .2;
        var normalize = cc.v2(0, 0);
        var checkViewRes = this.checkView();
        checkViewRes.isMaxX ? normalize.x = 1 : checkViewRes.isMaxY && (normalize.y = 1);
        var res = curDir.sub(normalize.mul(2 * cc.Vec2.dot(curDir, normalize)));
        return res;
      },
      update: function update(dt) {
        if (!this.role) return;
        if (M("fight").stop) return;
        if (!this.isInit) return;
        if (this.hurtCd > 0) {
          this.hurtCd -= dt;
          this.isCollide = false;
        } else {
          this.hurtCd = this.defHurtCd;
          this.isCollide = true;
        }
        this.timeout -= dt;
        if (this.timeout <= 0) {
          if (this.collider.enabled) {
            this.collider.enabled = false;
            this.remove();
          }
          return;
        }
        if (!this.dir) return;
        this.changeDirCd -= dt;
        this.randCd += dt;
        var checkViewRes = this.checkView();
        if (checkViewRes.isMaxX || checkViewRes.isMaxY) this.dir = this.changeDir(this.dir); else if (this.randCd >= 1) {
          this.randCd = 0;
          H.calOdds(20) && (this.dir = this.getRandDir());
        }
        var speed = this.speed * dt;
        this.node.x += this.dir.x * speed;
        this.node.y += this.dir.y * speed;
      }
    });
    cc._RF.pop();
  }, {
    skill: "skill"
  } ],
  tornado: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "58e75wnOtZOv4JVlRR/wtzc", "tornado");
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
    cc.Class({
      extends: require("ccBase"),
      properties: {},
      init: function init(role, skillName) {
        this.role = role;
        this.skillName = skillName;
      },
      initData: function initData(param) {
        param = _extends({}, {
          asset: "",
          scale: 2,
          num: 1,
          cd: 1,
          timeout: 10,
          speed: 100,
          hurtPercent: 100
        }, param);
        this.hurtPercent = param.hurtPercent;
        this.prefab = app.getPrefab(param.asset);
        this.scale = param.scale;
        this.num = param.num;
        this.speed = param.speed;
        this.timeout = param.timeout;
        this.defCd = param.cd;
        this.cd = this.defCd;
        this.skillCd = 0;
      },
      createItems: function createItems() {
        if (!G("skill").checkRole(this.role)) return;
        this.skillCd = this.timeout;
        for (var i = 1; i <= this.num; i++) {
          var node = G("pool").get(this.prefab);
          node.scaleX = this.scale;
          node.scaleY = this.scale;
          node.parent = G("role").parent1Node;
          var skill = $(node, "skill");
          skill.initBase({
            role: this.role,
            hurtPercent: this.hurtPercent,
            skillName: this.skillName
          });
          skill.init(this.speed, this.timeout);
        }
      },
      update: function update(dt) {
        if (!this.role) return;
        if (!this.prefab) return;
        if (M("fight").stop) return;
        if (this.skillCd > 0) {
          this.skillCd -= dt;
          return;
        }
        this.cd -= dt;
        if (this.cd > 0) return;
        if ("enemy" == this.role.group && this.role.animExt.isPlaying("move")) return;
        this.createItems();
        this.cd = this.defCd;
      }
    });
    cc._RF.pop();
  }, {
    ccBase: "ccBase"
  } ],
  tradplus: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "11f42GnbD5Fp6TkTqUhYMfa", "tradplus");
    "use strict";
    var _native = require("native");
    var isAndroid = _native.isAndroid;
    var isIos = _native.isIos;
    sdkEvent.TradPlus = {};
    sdkEvent.TradPlus.RewardedVideo = {};
    var TradPlus = {};
    TradPlus.init = function(appId) {
      isAndroid && _native.call("TradPlus", "init", "(Ljava/lang/String;)V", appId);
      isIos && _native.call("iTradPlus", "init", appId);
      console.log("==========TradPlus.init", appId);
    };
    TradPlus.onInit = function() {};
    sdkEvent.TradPlus.onInit = function() {
      TradPlus.onInit();
    };
    TradPlus.RewardedVideo = {};
    TradPlus.RewardedVideo.init = function(videoAdUnitId) {
      isAndroid && _native.call("TradPlus$RewardedVideo", "init", "(Ljava/lang/String;)V", videoAdUnitId);
      isIos && _native.call("iTradPlus", "rewardedVideoAd_init", videoAdUnitId);
    };
    TradPlus.RewardedVideo.loadAd = function() {
      isAndroid && _native.call("TradPlus$RewardedVideo", "loadAd", "()V");
      isIos && _native.call("iTradPlus", "rewardedVideoAd_loadAd");
    };
    TradPlus.RewardedVideo._showAd = function() {
      isAndroid && _native.call("TradPlus$RewardedVideo", "showAd", "()V");
      isIos && _native.call("iTradPlus", "rewardedVideoAd_showAd");
    };
    TradPlus.RewardedVideo.isReady = function() {
      if (isAndroid) return _native.call("TradPlus$RewardedVideo", "isReady", "()Z");
      if (isIos) return _native.call("iTradPlus", "rewardedVideoAd_isReady");
      return false;
    };
    var events = [ "onAdLoaded", "onAdClicked", "onAdImpression", "onAdFailed", "onAdClosed", "onAdReward", "onAdVideoStart", "onAdVideoEnd", "onAdVideoError" ];
    events.forEach(function(event) {
      TradPlus.RewardedVideo[event] = function() {};
      sdkEvent.TradPlus.RewardedVideo[event] = function() {
        var _TradPlus$RewardedVid;
        console.log("==========TradPlus.RewardedVideo." + event);
        (_TradPlus$RewardedVid = TradPlus.RewardedVideo)[event].apply(_TradPlus$RewardedVid, arguments);
        if ("onAdLoaded" != event) {
          TradPlus.RewardedVideo.loading = false;
          TradPlus.RewardedVideo.timer && clearInterval(TradPlus.RewardedVideo.timer);
        }
      };
    });
    TradPlus.RewardedVideo.onTimeout = function() {};
    TradPlus.RewardedVideo.onLoading = function() {};
    TradPlus.RewardedVideo.loading = false;
    TradPlus.RewardedVideo.showAd = function() {
      if (TradPlus.RewardedVideo.loading) {
        TradPlus.RewardedVideo.onLoading();
        return;
      }
      TradPlus.RewardedVideo.loading = true;
      if (TradPlus.RewardedVideo.isReady()) {
        TradPlus.RewardedVideo._showAd();
        TradPlus.RewardedVideo.loading = false;
        return;
      }
      var timeout = 5;
      TradPlus.RewardedVideo.timer = setInterval(function() {
        if (TradPlus.RewardedVideo.isReady()) {
          TradPlus.RewardedVideo._showAd();
          TradPlus.RewardedVideo.loading = false;
          clearInterval(TradPlus.RewardedVideo.timer);
        }
        TradPlus.RewardedVideo.loadAd();
        timeout--;
        if (timeout <= 0) {
          TradPlus.RewardedVideo.loading = false;
          TradPlus.RewardedVideo.onTimeout();
          clearInterval(TradPlus.RewardedVideo.timer);
        }
      }, 1e3);
    };
    sdkEvent.TradPlus.Interstitial = {};
    TradPlus.Interstitial = {};
    TradPlus.Interstitial.init = function(adUnitId) {
      isAndroid && _native.call("TradPlus$Interstitial", "init", "(Ljava/lang/String;)V", adUnitId);
      isIos && _native.call("iTradPlus", "Interstitial_init", adUnitId);
    };
    TradPlus.Interstitial.loadAd = function() {
      isAndroid && _native.call("TradPlus$Interstitial", "loadAd", "()V");
      isIos && _native.call("iTradPlus", "Interstitial_loadAd");
    };
    TradPlus.Interstitial.showAd = function() {
      isAndroid && _native.call("TradPlus$Interstitial", "showAd", "()V");
      isIos && _native.call("iTradPlus", "Interstitial_showAd");
    };
    TradPlus.Interstitial.isReady = function() {
      if (isAndroid) return _native.call("TradPlus$Interstitial", "isReady", "()Z");
      if (isIos) return _native.call("iTradPlus", "Interstitial_isReady");
      return false;
    };
    var interstitialEvents = [ "onAdLoaded", "onAdClicked", "onAdImpression", "onAdFailed", "onAdClosed", "onAdVideoStart", "onAdVideoEnd", "onAdVideoError" ];
    interstitialEvents.forEach(function(event) {
      TradPlus.Interstitial[event] = function() {};
      sdkEvent.TradPlus.Interstitial[event] = function() {
        var _TradPlus$Interstitia;
        console.log("==========TradPlus.Interstitial." + event);
        (_TradPlus$Interstitia = TradPlus.Interstitial)[event].apply(_TradPlus$Interstitia, arguments);
      };
    });
    module.exports = TradPlus;
    cc._RF.pop();
  }, {
    native: "native"
  } ],
  "zh-hant": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "60fa6vBjxxKqYVr5QEeB+bL", "zh-hant");
    "use strict";
    module.exports = {
      app_name: "\u9b54\u6cd5\u5144\u5f1f",
      ios_app_name: "\u9b54\u6cd5\u5144\u5f1f",
      android_app_name: "\u9b54\u7378\u5144\u5f1f",
      error_action: "\u64cd\u4f5c\u5931\u6557",
      error_chip: "\u788e\u7247\u4e0d\u8db3",
      error_gold: "\u91d1\u5e63\u4e0d\u8db3",
      error_role: "\u89d2\u8272\u5f02\u5e38",
      error_timeout: "\u8d85\u6642",
      error_ad: "\u6c92\u6709\u5408\u9069\u7684\u5ee3\u544a\u8acb\u7a0d\u5f8c\u518d\u8a66",
      error_ad_ready: "\u5ee3\u544a\u6c92\u6709\u6e96\u5099\u597d",
      error_equipNum: "\u88dd\u5099\u5bf6\u7bb1\u4e0d\u8db3",
      error_cd: "\u51b7\u537b\u4e2d",
      error_revive: "\u5fa9\u6d3b\u6b21\u6578\u4e0d\u8db3",
      error_equip_level: "\u4e0d\u80fd\u8d85\u904e\u7576\u524d\u95dc\u5361",
      error_version: "\u6709\u65b0\u7684\u7248\u672c\n\u9ede\u64ca\u9000\u51fa\u91cd\u5553\u904a\u6232\uff1f",
      error_guest: "\u904a\u5ba2\u4e0d\u80fd\u64cd\u4f5c",
      error_data: "\u6578\u64da\u4e0d\u5b58\u5728",
      error_length: "\u9577\u5ea6%{length}\u500b\u5b57\u5143",
      error_sid_friendSid: "\u4e0d\u80fd\u8f38\u5165\u81ea\u5df1\u7684ID",
      error_sid_max: "\u7d81\u5b9a\u6578\u91cf\u4e0a\u9650",
      error_sid_self: "\u8a72ID\u5df2\u88ab\u60a8\u7d81\u5b9a",
      error_select_role: "\u4e0d\u80fd\u9078\u64c7\u672a\u64c1\u6709\u7684\u82f1\u96c4",
      error_no_upLevel: "\u6c92\u6709\u53ef\u4ee5\u965e\u7d1a\u7684",
      success_action: "\u64cd\u4f5c\u6210\u529f",
      success_uploadData: "\u4e0a\u50b3\u6210\u529f",
      success_upLevel: "\u965e\u7d1a\u6210\u529f",
      success_buy: "\u8cfc\u8cb7\u6210\u529f",
      success_gain: "\u7372\u53d6\u6210\u529f",
      success_revive: "\u5fa9\u6d3b\u6210\u529f",
      loading: "\u52a0\u8f09\u4e2d",
      login_guest: "\u904a\u5ba2\u767b\u9304",
      login_guest_unisat: "Unisat\u767b\u5165",
      login_guest_ton: "TON\u767b\u5165",
      login_qq: "QQ\u767b\u5165",
      login_taptap: "TapTap\u767b\u5165",
      login_apple: "Apple\u767b\u5165",
      login_out: "\u767b\u51fa",
      delete_data: "\u5220\u9664\u6578\u64da",
      exitGame: "\u9000\u51fa\u904a\u6232",
      sid: "ID",
      copy: "\u8907\u88fd",
      input: "\u8f38\u5165",
      doc_user: "\u4f7f\u7528\u8005\u5354\u5b9a",
      doc_privacy: "\u96b1\u79c1\u653f\u7b56",
      reportToAdmin: "\u554f\u984c\u8ff4\u97ff",
      uploadData: "\u4e0a\u50b3\u6578\u64da",
      never: "\u5f9e\u672a",
      yes: "\u78ba\u5b9a",
      close: "\u95dc\u9589",
      agree: "\u540c\u610f",
      refuse: "\u62d2\u7d55",
      guestLoginTips: "\u904a\u5ba2\u6a21\u5f0f\u4e0d\u80fd\u96f2\u5b58\u6a94\n\u662f\u5426\u9032\u5165\u904a\u6232\uff1f",
      sidTip: "\u8f38\u5165\u670b\u53cb\u7684ID\u7372\u5f97\u734e\u52f5",
      playDayTip: "\u5df2\u966a\u4f34\u60a8%{day}\u5929",
      roleHelpTip: "\u8cfc\u8cb7\u6216\u965e\u7d1a\u5176\u4ed6\u89d2\u8272\u7d66\u5df2\u9078\u64c7\u82f1\u96c4\n[+2\u751f\u547d]\u6216[+1\u653b\u64ca]",
      skillHelpTip: "\u965e\u7d1a\u6280\u80fd\u7d66\u5df2\u9078\u64c7\u82f1\u96c4\n[+1\u751f\u547d]\u6216[+0.5\u653b\u64ca]",
      deleteDataTip: "\u5220\u9664\u672c\u6a5f\u548c\u670d\u52d9\u5668\u6578\u64da,\u662f\u5426\u7e7c\u7e8c\uff1f",
      reportToAdminTip: "\u8acb\u544a\u8a34\u6211\u5011\u60a8\u9047\u5230\u7684\u554f\u984c",
      gameCenterSignTip: "\u672a\u767b\u9304GameCenter\n\u662f\u5426\u5728\u624b\u6a5f\u8a2d\u5b9a\u88cf\u6253\u958b\uff1f",
      gameCenterSend: "\u4e0a\u50b3\u6210\u7e3e",
      frameRate: "\u6230\u9b25\u5e40\u7387",
      startGame: "\u958b\u59cb\u904a\u6232",
      notHave: "\u672a\u64c1\u6709",
      get: "\u9818\u53d6",
      canGain: "\u53ef\u9818\u53d6",
      buy: "\u8cfc\u8cb7",
      select: "\u9078\u64c7",
      upLevel: "\u965e\u7d1a",
      allUpLevel: "\u4e00\u9375\u965e\u7d1a",
      gain: "\u7372\u53d6",
      allGain: "\u5168\u90e8\u7372\u53d6",
      continue: "\u7e7c\u7e8c",
      exit: "\u9000\u51fa",
      revive: "\u5fa9\u6d3b",
      noAttr: "\u7121\u5185\u5bb9",
      noEquip: "\u7121\u88dd\u5099",
      currentEquip: "\u7576\u524d\u88dd\u5099",
      all: "\u5168\u90e8",
      condition: "\u689d\u4ef6",
      sell: "\u51fa\u552e",
      equip: "\u88dd\u5099",
      hero: "\u82f1\u96c4",
      skill: "\u6280\u80fd",
      achive: "\u6210\u5c31",
      hurt: "\u50b7\u5bb3",
      dps: "\u6bcf\u79d2",
      ATKPencent: "\u653b\u64ca",
      HPPencent: "\u751f\u547d",
      critOdds: "\u66b4\u64ca",
      doubleOdds: "\u96d9\u500d",
      audioMusic: "\u97f3\u6a02",
      audioEffect: "\u97f3\u6548",
      fightLevel: "\u7b2c%{level}\u95dc",
      total: "\u7e3d\u8a08",
      done: "\u5b8c\u6210",
      achiveInfo: {
        lookAd: {
          video: "\u89c0\u770b\u5ee3\u544a"
        },
        gainProp: {
          gold: "\u6230\u9b25\u4e2d\u7372\u53d6\u91d1\u5e63",
          equipNum: "\u6230\u9b25\u4e2d\u7372\u53d6\u88dd\u5099\u5bf6\u7bb1"
        },
        useRole: "\u4f7f\u7528\u7576\u524d\u82f1\u96c4\u901a\u95dc",
        useSkill: "\u6230\u9b25\u4e2d\u4f7f\u7528\u7576\u524d\u6280\u80fd",
        usePassiveSkill: "\u6230\u9b25\u4e2d\u5347\u81f3\u6eff\u7d1a"
      },
      skillFightUplevel: "\u6230\u9b25\u965e\u7d1a",
      skillInfo: {
        hole: {
          title: "\u6df1\u6df5",
          title2: "\u7121\u76e1",
          des: "\u5c0d\u7bc4\u570d\u5167\u6575\u4eba\u9020\u6210\uff080.5\u79d2/\u6b21\uff09\u50b7\u5bb3\n\u50b7\u5bb3,\u7bc4\u570d"
        },
        fireBall: {
          title: "\u706b\u7403",
          title2: "\u672b\u65e5",
          des: "\u653b\u64ca\u6700\u8fd1\u7684\u76ee\u6a19\u4e26\u64ca\u9000\n\u51b7\u537b\u6642\u9593,\u50b7\u5bb3,\u7bc4\u570d,\u6578\u91cf,\u7a7f\u900f"
        },
        sword: {
          title: "\u528d",
          title2: "\u8056\u528d",
          des: "\u5728\u8eab\u908a\u74b0\u7e5e\u5c0d\u6575\u4eba\u9020\u6210\u50b7\u5bb3\u4e26\u64ca\u9000\uff08\u683c\u64cb\u5b50\u5f48\uff09\n\u51b7\u537b\u6642\u9593,\u50b7\u5bb3,\u7bc4\u570d,\u6578\u91cf,\u6301\u7e8c\u6642\u9593"
        },
        dart: {
          title: "\u98db\u93e2",
          title2: "\u98a8\u9b54",
          des: "\u767c\u5c04\u591a\u500b\u653b\u64ca\u6700\u8fd1\u7684\u76ee\u6a19\n\u51b7\u537b\u6642\u9593,\u50b7\u5bb3,\u7bc4\u570d,\u6578\u91cf,\u7a7f\u900f"
        },
        drug: {
          title: "\u6bd2\u6db2",
          title2: "\u5287\u6bd2",
          des: "\u5728\u96a8\u6a5f\u4f4d\u7f6e\u751f\u6210\u4e26\u4e14\u5c0d\u6575\u4eba\u9020\u6210\uff080.2\u79d2/\u6b21\uff09\n\u50b7\u5bb3,\u7bc4\u570d,\u6578\u91cf,\u6301\u7e8c\u6642\u9593"
        },
        stony: {
          title: "\u9695\u77f3",
          title2: "\u6d41\u661f",
          des: "\u5728\u8eab\u908a\u74b0\u7e5e\u5c0d\u6575\u4eba\u9020\u6210\u50b7\u5bb3\u4e26\u64ca\u9000\uff08\u683c\u64cb\u5b50\u5f48\uff09\n\u51b7\u537b\u6642\u9593,\u6301\u7e8c\u6642\u9593,\u50b7\u5bb3,\u7bc4\u570d,\u6578\u91cf,\u901f\u5ea6"
        },
        magicBall: {
          title: "\u80fd\u91cf\u7403",
          title2: "\u9b54\u6cd5\u7403",
          des: "\u653b\u64ca\u6700\u8fd1\u7684\u6575\u4eba\n\u51b7\u537b\u6642\u9593,\u50b7\u5bb3"
        },
        lightning: {
          title: "\u9583\u96fb",
          title2: "\u5954\u96f7",
          des: "\u653b\u64ca\u96a8\u6a5f\u76ee\u6a19\u4e26\u4e14\u7206\u70b8\uff08\u9644\u5e3650%\u50b7\u5bb3\uff09\n\u51b7\u537b\u6642\u9593,\u50b7\u5bb3,\u7bc4\u570d,\u6578\u91cf"
        },
        boomerang: {
          title: "\u8ff4\u65cb\u93e2",
          title2: "\u5f3a\u529b\u93e2",
          des: "\u653b\u64ca\u96a8\u6a5f\u76ee\u6a19\u4e26\u8fd4\u56de\n\u51b7\u537b\u6642\u9593,\u50b7\u5bb3,\u7bc4\u570d"
        },
        bomb: {
          title: "\u70b8\u5f48",
          title2: "\u7206\u7834\u5f48",
          des: "\u653b\u64ca\u96a8\u6a5f\u76ee\u6a19\u7206\u70b8\u9020\u6210\u7bc4\u570d\u50b7\u5bb3\n\u51b7\u537b\u6642\u9593,\u50b7\u5bb3,\u7bc4\u570d"
        },
        ice: {
          title: "\u51b0\u7bad",
          title2: "\u51b0\u7834",
          des: "\u653b\u64ca\u96a8\u6a5f\u76ee\u6a19\u4e26\u51cd\u7d50\n\u51b7\u537b\u6642\u9593,\u6301\u7e8c\u6642\u9593,\u50b7\u5bb3,\u6578\u91cf,\u7a7f\u900f"
        },
        knive: {
          title: "\u534a\u6708\u65ac",
          title2: "\u6708\u5149\u65ac",
          des: "\u653b\u64ca\u6700\u8fd1\u7684\u76ee\u6a19\u4e26\u7a7f\u900f\uff08\u683c\u64cb\u5b50\u5f48\uff09\n\u51b7\u537b\u6642\u9593,\u50b7\u5bb3,\u7bc4\u570d,\u6578\u91cf"
        },
        gem: {
          title: "\u5bf6\u77f3",
          title2: "\u7480\u74a8",
          des: "\u653b\u64ca\u6700\u8fd1\u7684\u76ee\u6a19\u4e26\u5728\u8996\u91ce\u908a\u7de3\u53cd\u5c04\uff08\u6301\u7e8c5\u79d2\uff09\n\u51b7\u537b\u6642\u9593,\u50b7\u5bb3,\u6578\u91cf"
        },
        laser: {
          title: "\u96f7\u5c04",
          title2: "\u8d85\u80fd",
          des: "\u96a8\u6a5f\u65b9\u5411\u9020\u6210\uff080.2\u79d2/\u6b21\uff09\u50b7\u5bb3\n\u51b7\u537b\u6642\u9593,\u6301\u7e8c\u6642\u9593,\u50b7\u5bb3,\u7bc4\u570d,\u6578\u91cf"
        },
        tornado: {
          title: "\u9f8d\u6372\u98a8",
          title2: "\u98a8\u66b4",
          des: "\u96a8\u6a5f\u65b9\u5411\u9020\u6210\uff080.2\u79d2/\u6b21\uff09\u50b7\u5bb3\u4e26\u6372\u5165\n\u51b7\u537b\u6642\u9593,\u50b7\u5bb3,\u7bc4\u570d,\u6578\u91cf,\u901f\u5ea6"
        }
      },
      passiveSkillInfo: {
        propRadius: {
          title: "\u62fe\u53d6\u7bc4\u570d"
        },
        SPD: {
          title: "\u79fb\u52d5\u901f\u5ea6"
        },
        ATK: {
          title: "\u653b\u64ca\u529b"
        },
        HP: {
          title: "\u751f\u547d\u4e0a\u9650"
        }
      }
    };
    cc._RF.pop();
  }, {} ],
  zh: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36ef5rDatJAoYx7n5vU+Wlx", "zh");
    "use strict";
    module.exports = {
      app_name: "\u9b54\u6cd5\u5144\u5f1f",
      ios_app_name: "\u9b54\u6cd5\u5144\u5f1f",
      android_app_name: "\u9b54\u517d\u5144\u5f1f",
      error_action: "\u64cd\u4f5c\u5931\u8d25",
      error_chip: "\u788e\u7247\u4e0d\u8db3",
      error_gold: "\u91d1\u5e01\u4e0d\u8db3",
      error_role: "\u89d2\u8272\u5f02\u5e38",
      error_timeout: "\u8d85\u65f6",
      error_ad: "\u6ca1\u6709\u5408\u9002\u7684\u5e7f\u544a\u8bf7\u7a0d\u540e\u518d\u8bd5",
      error_ad_ready: "\u5e7f\u544a\u6ca1\u6709\u51c6\u5907\u597d",
      error_equipNum: "\u88c5\u5907\u5b9d\u7bb1\u4e0d\u8db3",
      error_cd: "\u51b7\u5374\u4e2d",
      error_revive: "\u590d\u6d3b\u6b21\u6570\u4e0d\u8db3",
      error_equip_level: "\u4e0d\u80fd\u8d85\u8fc7\u5f53\u524d\u5173\u5361",
      error_version: "\u6709\u65b0\u7684\u7248\u672c\n\u70b9\u51fb\u9000\u51fa\u91cd\u542f\u6e38\u620f?",
      error_guest: "\u6e38\u5ba2\u4e0d\u80fd\u64cd\u4f5c",
      error_data: "\u6570\u636e\u4e0d\u5b58\u5728",
      error_length: "\u957f\u5ea6%{length}\u4e2a\u5b57\u7b26",
      error_sid_friendSid: "\u4e0d\u80fd\u8f93\u5165\u81ea\u5df1\u7684ID",
      error_sid_max: "\u7ed1\u5b9a\u6570\u91cf\u4e0a\u9650",
      error_sid_self: "\u8be5ID\u5df2\u88ab\u60a8\u7ed1\u5b9a",
      error_select_role: "\u4e0d\u80fd\u9009\u62e9\u672a\u62e5\u6709\u7684\u82f1\u96c4",
      error_no_upLevel: "\u6ca1\u6709\u53ef\u4ee5\u5347\u7ea7\u7684",
      success_action: "\u64cd\u4f5c\u6210\u529f",
      success_uploadData: "\u4e0a\u4f20\u6210\u529f",
      success_upLevel: "\u5347\u7ea7\u6210\u529f",
      success_buy: "\u8d2d\u4e70\u6210\u529f",
      success_gain: "\u83b7\u53d6\u6210\u529f",
      success_revive: "\u590d\u6d3b\u6210\u529f",
      loading: "\u52a0\u8f7d\u4e2d",
      login_guest: "\u6e38\u5ba2\u767b\u5f55",
      login_guest_unisat: "Unisat\u767b\u5f55",
      login_guest_ton: "TON\u767b\u5f55",
      login_qq: "QQ\u767b\u5f55",
      login_taptap: "TapTap\u767b\u5f55",
      login_apple: "Apple\u767b\u5f55",
      login_out: "\u9000\u51fa\u767b\u5f55",
      delete_data: "\u5220\u9664\u6570\u636e",
      exitGame: "\u9000\u51fa\u6e38\u620f",
      sid: "ID",
      copy: "\u590d\u5236",
      input: "\u8f93\u5165",
      doc_user: "\u7528\u6237\u534f\u8bae",
      doc_privacy: "\u9690\u79c1\u653f\u7b56",
      reportToAdmin: "\u95ee\u9898\u53cd\u9988",
      uploadData: "\u4e0a\u4f20\u6570\u636e",
      never: "\u4ece\u672a",
      yes: "\u786e\u5b9a",
      close: "\u5173\u95ed",
      agree: "\u540c\u610f",
      refuse: "\u62d2\u7edd",
      guestLoginTips: "\u6e38\u5ba2\u6a21\u5f0f\u4e0d\u80fd\u4e91\u5b58\u6863\n\u662f\u5426\u8fdb\u5165\u6e38\u620f?",
      sidTip: "\u8f93\u5165\u670b\u53cb\u7684ID\u83b7\u5f97\u5956\u52b1",
      playDayTip: "\u5df2\u966a\u4f34\u60a8 %{day} \u5929",
      roleHelpTip: "\u8d2d\u4e70\u6216\u5347\u7ea7\u5176\u4ed6\u89d2\u8272\u7ed9\u5df2\u9009\u62e9\u82f1\u96c4\n[+2\u751f\u547d]\u6216[+1\u653b\u51fb]",
      skillHelpTip: "\u5347\u7ea7\u6280\u80fd\u7ed9\u5df2\u9009\u62e9\u82f1\u96c4\n[+1\u751f\u547d]\u6216[+0.5\u653b\u51fb]",
      deleteDataTip: "\u5220\u9664\u672c\u673a\u548c\u670d\u52a1\u5668\u6570\u636e\uff0c\u662f\u5426\u7ee7\u7eed?",
      reportToAdminTip: "\u8bf7\u544a\u8bc9\u6211\u4eec\u60a8\u9047\u5230\u7684\u95ee\u9898",
      gameCenterSignTip: "\u672a\u767b\u5f55GameCenter\n\u662f\u5426\u5728\u624b\u673a\u8bbe\u7f6e\u91cc\u6253\u5f00?",
      gameCenterSend: "\u4e0a\u4f20\u6210\u7ee9",
      frameRate: "\u6218\u6597\u5e27\u7387",
      startGame: "\u5f00\u59cb\u6e38\u620f",
      notHave: "\u672a\u62e5\u6709",
      get: "\u9886\u53d6",
      canGain: "\u53ef\u9886\u53d6",
      buy: "\u8d2d\u4e70",
      select: "\u9009\u62e9",
      upLevel: "\u5347\u7ea7",
      allUpLevel: "\u4e00\u952e\u5347\u7ea7",
      gain: "\u83b7\u53d6",
      allGain: "\u5168\u90e8\u83b7\u53d6",
      continue: "\u7ee7\u7eed",
      exit: "\u9000\u51fa",
      revive: "\u590d\u6d3b",
      noAttr: "\u65e0\u5c5e\u6027",
      noEquip: "\u65e0\u88c5\u5907",
      currentEquip: "\u5f53\u524d\u88c5\u5907",
      all: "\u5168\u90e8",
      condition: "\u6761\u4ef6",
      sell: "\u51fa\u552e",
      equip: "\u88c5\u5907",
      hero: "\u82f1\u96c4",
      skill: "\u6280\u80fd",
      achive: "\u6210\u5c31",
      hurt: "\u4f24\u5bb3",
      dps: "\u6bcf\u79d2",
      ATKPencent: "\u653b\u51fb",
      HPPencent: "\u751f\u547d",
      critOdds: "\u66b4\u51fb",
      doubleOdds: "\u53cc\u500d",
      audioMusic: "\u97f3\u4e50",
      audioEffect: "\u97f3\u6548",
      fightLevel: "\u7b2c %{level} \u5173",
      total: "\u603b\u8ba1",
      done: "\u5b8c\u6210",
      achiveInfo: {
        lookAd: {
          video: "\u89c2\u770b\u5e7f\u544a"
        },
        gainProp: {
          gold: "\u6218\u6597\u4e2d\u83b7\u53d6\u91d1\u5e01",
          equipNum: "\u6218\u6597\u4e2d\u83b7\u53d6\u88c5\u5907\u5b9d\u7bb1"
        },
        useRole: "\u4f7f\u7528\u5f53\u524d\u82f1\u96c4\u901a\u5173",
        useSkill: "\u6218\u6597\u4e2d\u4f7f\u7528\u5f53\u524d\u6280\u80fd",
        usePassiveSkill: "\u6218\u6597\u4e2d\u5347\u81f3\u6ee1\u7ea7"
      },
      skillFightUplevel: "\u6218\u6597\u5347\u7ea7",
      skillInfo: {
        hole: {
          title: "\u6df1\u6e0a",
          title2: "\u65e0\u5c3d",
          des: "\u5bf9\u8303\u56f4\u5185\u654c\u4eba\u9020\u6210(0.5\u79d2/\u6b21)\u4f24\u5bb3\n\u4f24\u5bb3,\u8303\u56f4"
        },
        fireBall: {
          title: "\u706b\u7403",
          title2: "\u672b\u65e5",
          des: "\u653b\u51fb\u6700\u8fd1\u7684\u76ee\u6807\u5e76\u51fb\u9000\n\u51b7\u5374\u65f6\u95f4,\u4f24\u5bb3,\u8303\u56f4,\u6570\u91cf,\u7a7f\u900f"
        },
        sword: {
          title: "\u5251",
          title2: "\u5723\u5251",
          des: "\u5728\u8eab\u8fb9\u73af\u7ed5\u5bf9\u654c\u4eba\u9020\u6210\u4f24\u5bb3\u5e76\u51fb\u9000(\u683c\u6321\u5b50\u5f39)\n\u51b7\u5374\u65f6\u95f4,\u4f24\u5bb3,\u8303\u56f4,\u6570\u91cf,\u6301\u7eed\u65f6\u95f4"
        },
        dart: {
          title: "\u98de\u9556",
          title2: "\u98ce\u9b54",
          des: "\u53d1\u5c04\u591a\u4e2a\u653b\u51fb\u6700\u8fd1\u7684\u76ee\u6807\n\u51b7\u5374\u65f6\u95f4,\u4f24\u5bb3,\u8303\u56f4,\u6570\u91cf,\u7a7f\u900f"
        },
        drug: {
          title: "\u6bd2\u6db2",
          title2: "\u5267\u6bd2",
          des: "\u5728\u968f\u673a\u4f4d\u7f6e\u751f\u6210\u5e76\u4e14\u5bf9\u654c\u4eba\u9020\u6210(0.2\u79d2/\u6b21)\n\u4f24\u5bb3,\u8303\u56f4,\u6570\u91cf,\u6301\u7eed\u65f6\u95f4"
        },
        stony: {
          title: "\u9668\u77f3",
          title2: "\u6d41\u661f",
          des: "\u5728\u8eab\u8fb9\u73af\u7ed5\u5bf9\u654c\u4eba\u9020\u6210\u4f24\u5bb3\u5e76\u51fb\u9000(\u683c\u6321\u5b50\u5f39)\n\u51b7\u5374\u65f6\u95f4,\u6301\u7eed\u65f6\u95f4,\u4f24\u5bb3,\u8303\u56f4,\u6570\u91cf,\u901f\u5ea6"
        },
        magicBall: {
          title: "\u80fd\u91cf\u7403",
          title2: "\u9b54\u6cd5\u7403",
          des: "\u653b\u51fb\u6700\u8fd1\u7684\u654c\u4eba\n\u51b7\u5374\u65f6\u95f4,\u4f24\u5bb3"
        },
        lightning: {
          title: "\u95ea\u7535",
          title2: "\u5954\u96f7",
          des: "\u653b\u51fb\u968f\u673a\u76ee\u6807\u5e76\u4e14\u7206\u70b8(\u9644\u5e2650%\u4f24\u5bb3)\n\u51b7\u5374\u65f6\u95f4,\u4f24\u5bb3,\u8303\u56f4,\u6570\u91cf"
        },
        boomerang: {
          title: "\u56de\u65cb\u9556",
          title2: "\u5f3a\u529b\u9556",
          des: "\u653b\u51fb\u968f\u673a\u76ee\u6807\u5e76\u8fd4\u56de\n\u51b7\u5374\u65f6\u95f4,\u4f24\u5bb3,\u8303\u56f4"
        },
        bomb: {
          title: "\u70b8\u5f39",
          title2: "\u7206\u7834\u5f39",
          des: "\u653b\u51fb\u968f\u673a\u76ee\u6807\u7206\u70b8\u9020\u6210\u8303\u56f4\u4f24\u5bb3\n\u51b7\u5374\u65f6\u95f4,\u4f24\u5bb3,\u8303\u56f4"
        },
        ice: {
          title: "\u51b0\u7bad",
          title2: "\u51b0\u7834",
          des: "\u653b\u51fb\u968f\u673a\u76ee\u6807\u5e76\u51bb\u7ed3\n\u51b7\u5374\u65f6\u95f4,\u6301\u7eed\u65f6\u95f4,\u4f24\u5bb3,\u6570\u91cf,\u7a7f\u900f"
        },
        knive: {
          title: "\u534a\u6708\u65a9",
          title2: "\u6708\u5149\u65a9",
          des: "\u653b\u51fb\u6700\u8fd1\u7684\u76ee\u6807\u5e76\u7a7f\u900f(\u683c\u6321\u5b50\u5f39)\n\u51b7\u5374\u65f6\u95f4,\u4f24\u5bb3,\u8303\u56f4,\u6570\u91cf"
        },
        gem: {
          title: "\u5b9d\u77f3",
          title2: "\u7480\u74a8",
          des: "\u653b\u51fb\u6700\u8fd1\u7684\u76ee\u6807\u5e76\u5728\u89c6\u91ce\u8fb9\u7f18\u53cd\u5c04(\u6301\u7eed5\u79d2)\n\u51b7\u5374\u65f6\u95f4,\u4f24\u5bb3,\u6570\u91cf"
        },
        laser: {
          title: "\u6fc0\u5149",
          title2: "\u8d85\u80fd",
          des: "\u968f\u673a\u65b9\u5411\u9020\u6210(0.2\u79d2/\u6b21)\u4f24\u5bb3\n\u51b7\u5374\u65f6\u95f4,\u6301\u7eed\u65f6\u95f4,\u4f24\u5bb3,\u8303\u56f4,\u6570\u91cf"
        },
        tornado: {
          title: "\u9f99\u5377\u98ce",
          title2: "\u98ce\u66b4",
          des: "\u968f\u673a\u65b9\u5411\u9020\u6210(0.2\u79d2/\u6b21)\u4f24\u5bb3\u5e76\u5377\u5165\n\u51b7\u5374\u65f6\u95f4,\u4f24\u5bb3,\u8303\u56f4,\u6570\u91cf,\u901f\u5ea6"
        }
      },
      passiveSkillInfo: {
        propRadius: {
          title: "\u62fe\u53d6\u8303\u56f4"
        },
        SPD: {
          title: "\u79fb\u52a8\u901f\u5ea6"
        },
        ATK: {
          title: "\u653b\u51fb\u529b"
        },
        HP: {
          title: "\u751f\u547d\u4e0a\u9650"
        }
      }
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "app", "ccHelper", "crypt", "helper", "i18n", "BigNumber", "circular-json", "crypto-js", "polyglot.min", "qs", "localStorage", "LocalizedLabel", "LocalizedSprite", "animExt", "autoHideChild", "autoLayout", "ccBase", "ccPopup", "screen", "sortChildIndex", "initApp", "audioMgr", "poolMgr", "apple", "native", "qq", "taptap", "tradplus", "adBox", "audio", "camera", "equipDataInfo", "equip", "gameCneter", "rewardItem", "setting", "en", "zh-hant", "zh", "adMgr", "dropPropMgr", "effectMgr", "roleMgr", "skillMgr", "achiveModel", "dataModel", "equipModel", "fightModel", "gameCenterModel", "gameModel", "propModel", "roleModel", "settingModel", "skillModel", "server", "effect", "fightBg", "dropPropTip", "dropProp", "fight", "fightSkillThumb", "joystickInput", "keyboardInput", "enemyGroup", "enemyNear", "enemyRange", "player", "roleArrowTip", "roleBase", "bomb", "bombItem", "boomerang", "boomerangItem", "bullet", "bulletItem", "fireBallItem", "drug", "drugItem", "fireJet", "gem", "gemItem", "hole", "ice", "iceItem", "knive", "kniveItem", "laser", "laserItem", "lightning", "lightningItem", "skill", "stony", "stonyItem", "sword", "swordItem", "tornado", "tornadoItem", "find", "index", "indexAchive", "indexEquip", "indexEquipSetting", "indexHero", "indexSkill", "selectLevel", "loading", "login", "adBoxInfo", "addEquip", "agreement", "animMask", "confirm", "equipInfo", "fightStop", "fightUpLevel", "gainTip", "inputSid", "my", "popup", "reportToAdmin", "skillInfo", "root", "tip" ]);