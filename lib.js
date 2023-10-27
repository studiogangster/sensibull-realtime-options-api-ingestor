
const instruments = require('./instruments_symbols.js');

function decodeUint8ArrayToTimestamp(uint8Array) {
    let timestampString = "";
    for (let i = 0; i < uint8Array.length; i++) {
        timestampString += String.fromCharCode(uint8Array[i]);
    }

    // Convert the timestamp string to a numeric value (assuming it's in seconds)
    const numericValue = parseInt(timestampString, 10);

    // Create a Date object from the numeric value (in seconds)
    const date = new Date(numericValue * 1000);

    return date;
}

var n = Uint8Array,
    o = Uint16Array,
    a = Uint32Array,
    i = new n([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
    u = new n([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
    l = new n([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
    s = function (e, t) {
        for (var r = new o(31), n = 0; n < 31; ++n) r[n] = t += 1 << e[n - 1];
        var i = new a(r[30]);
        for (n = 1; n < 30; ++n)
            for (var u = r[n]; u < r[n + 1]; ++u) i[u] = u - r[n] << 5 | n;
        return [r, i]
    },
    c = s(i, 2),
    f = c[0],
    d = c[1];
f[28] = 258, d[258] = 28;
for (var p = s(u, 0), h = p[0], v = (p[1], new o(32768)), m = 0; m < 32768; ++m) {
    var y = (43690 & m) >>> 1 | (21845 & m) << 1;
    y = (61680 & (y = (52428 & y) >>> 2 | (13107 & y) << 2)) >>> 4 | (3855 & y) << 4, v[m] = ((65280 & y) >>> 8 | (255 & y) << 8) >>> 1
}
var g = function (e, t, r) {
    for (var n = e.length, a = 0, i = new o(t); a < n; ++a) ++i[e[a] - 1];
    var u, l = new o(t);
    for (a = 0; a < t; ++a) l[a] = l[a - 1] + i[a - 1] << 1;
    if (r) {
        u = new o(1 << t);
        var s = 15 - t;
        for (a = 0; a < n; ++a)
            if (e[a])
                for (var c = a << 4 | e[a], f = t - e[a], d = l[e[a] - 1]++ << f, p = d | (1 << f) - 1; d <= p; ++d) u[v[d] >>> s] = c
    } else
        for (u = new o(n), a = 0; a < n; ++a) e[a] && (u[a] = v[l[e[a] - 1]++] >>> 15 - e[a]);
    return u
},
    b = new n(288);
for (m = 0; m < 144; ++m) b[m] = 8;
for (m = 144; m < 256; ++m) b[m] = 9;
for (m = 256; m < 280; ++m) b[m] = 7;
for (m = 280; m < 288; ++m) b[m] = 8;
var _ = new n(32);
for (m = 0; m < 32; ++m) _[m] = 5;
var w = g(b, 9, 1),
    x = g(_, 5, 1),
    E = function (e) {
        for (var t = e[0], r = 1; r < e.length; ++r) e[r] > t && (t = e[r]);
        return t
    },
    S = function (e, t, r) {
        var n = t / 8 | 0;
        return (e[n] | e[n + 1] << 8) >> (7 & t) & r
    },
    O = function (e, t) {
        var r = t / 8 | 0;
        return (e[r] | e[r + 1] << 8 | e[r + 2] << 16) >> (7 & t)
    },
    k = function (e) {
        return (e / 8 | 0) + (7 & e && 1)
    },
    T = function (e, t, r) {
        (null == t || t < 0) && (t = 0), (null == r || r > e.length) && (r = e.length);
        var i = new (e instanceof o ? o : e instanceof a ? a : n)(r - t);
        return i.set(e.subarray(t, r)), i
    },
    P = function (e, t, r) {
        var o = e.length;
        if (!o || r && !r.l && o < 5) return t || new n(0);
        var a = !t || r,
            s = !r || r.i;
        r || (r = {}), t || (t = new n(3 * o));
        var c = function (e) {
            var r = t.length;
            if (e > r) {
                var o = new n(Math.max(2 * r, e));
                o.set(t), t = o
            }
        },
            d = r.f || 0,
            p = r.p || 0,
            v = r.b || 0,
            m = r.l,
            y = r.d,
            b = r.m,
            _ = r.n,
            P = 8 * o;
        do {
            if (!m) {
                r.f = d = S(e, p, 1);
                var R = S(e, p + 1, 3);
                if (p += 3, !R) {
                    var A = e[(Y = k(p) + 4) - 4] | e[Y - 3] << 8,
                        M = Y + A;
                    if (M > o) {
                        if (s) throw "unexpected EOF";
                        break
                    }
                    a && c(v + A), t.set(e.subarray(Y, M), v), r.b = v += A, r.p = p = 8 * M;
                    continue
                }
                if (1 == R) m = w, y = x, b = 9, _ = 5;
                else {
                    if (2 != R) throw "invalid block type";
                    var C = S(e, p, 31) + 257,
                        j = S(e, p + 10, 15) + 4,
                        I = C + S(e, p + 5, 31) + 1;
                    p += 14;
                    for (var N = new n(I), D = new n(19), L = 0; L < j; ++L) D[l[L]] = S(e, p + 3 * L, 7);
                    p += 3 * j;
                    var U = E(D),
                        F = (1 << U) - 1,
                        z = g(D, U, 1);
                    for (L = 0; L < I;) {
                        var Y, B = z[S(e, p, F)];
                        if (p += 15 & B, (Y = B >>> 4) < 16) N[L++] = Y;
                        else {
                            var W = 0,
                                H = 0;
                            for (16 == Y ? (H = 3 + S(e, p, 3), p += 2, W = N[L - 1]) : 17 == Y ? (H = 3 + S(e, p, 7), p += 3) : 18 == Y && (H = 11 + S(e, p, 127), p += 7); H--;) N[L++] = W
                        }
                    }
                    var q = N.subarray(0, C),
                        V = N.subarray(C);
                    b = E(q), _ = E(V), m = g(q, b, 1), y = g(V, _, 1)
                }
                if (p > P) {
                    if (s) throw "unexpected EOF";
                    break
                }
            }
            a && c(v + 131072);
            for (var $ = (1 << b) - 1, G = (1 << _) - 1, K = p; ; K = p) {
                var X = (W = m[O(e, p) & $]) >>> 4;
                if ((p += 15 & W) > P) {
                    if (s) throw "unexpected EOF";
                    break
                }
                if (!W) throw "invalid length/literal";
                if (X < 256) t[v++] = X;
                else {
                    if (256 == X) {
                        K = p, m = null;
                        break
                    }
                    var Z = X - 254;
                    if (X > 264) {
                        var Q = i[L = X - 257];
                        Z = S(e, p, (1 << Q) - 1) + f[L], p += Q
                    }
                    var J = y[O(e, p) & G],
                        ee = J >>> 4;
                    if (!J) throw "invalid distance";
                    p += 15 & J;
                    V = h[ee];
                    if (ee > 3) {
                        Q = u[ee];
                        V += O(e, p) & (1 << Q) - 1, p += Q
                    }
                    if (p > P) {
                        if (s) throw "unexpected EOF";
                        break
                    }
                    a && c(v + 131072);
                    for (var te = v + Z; v < te; v += 4) t[v] = t[v - V], t[v + 1] = t[v + 1 - V], t[v + 2] = t[v + 2 - V], t[v + 3] = t[v + 3 - V];
                    v = te
                }
            }
            r.l = m, r.p = K, r.b = v, m && (d = 1, r.m = b, r.d = y, r.n = _)
        } while (!d);
        return v == t.length ? t : T(t, 0, v)
    },
    R = new n(0),
    A = function (e) {
        if (31 != e[0] || 139 != e[1] || 8 != e[2]) throw "invalid gzip data";
        var t = e[3],
            r = 10;
        4 & t && (r += e[10] | 2 + (e[11] << 8));
        for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !e[r++]);
        return r + (2 & t)
    },
    M = function (e) {
        var t = e.length;
        return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0
    },
    C = function (e) {
        if (8 != (15 & e[0]) || e[0] >>> 4 > 7 || (e[0] << 8 | e[1]) % 31) throw "invalid zlib data";
        if (32 & e[1]) throw "invalid zlib data: preset dictionaries not supported"
    };

function j(e, t) {
    return P(e, t)
}

function I(e, t) {
    return P(e.subarray(A(e), -8), t || new n(M(e)))
}

function N(e, t) {
    return P((C(e), e.subarray(2, -4)), t)
}

function D(e, t) {
    return 31 == e[0] && 139 == e[1] && 8 == e[2] ? I(e, t) : 8 != (15 & e[0]) || e[0] >> 4 > 7 || (e[0] << 8 | e[1]) % 31 ? j(e, t) : N(e, t)
}
var L = "undefined" != typeof TextDecoder && new TextDecoder;
try {
    L.decode(R, {
        stream: !0
    }), 1
} catch (U) { }

// 

// Secomd
function HR(e) {
    var t, i, n;
    const {
        underlyingToken: o,
        expiry: r,
        optionChain: a
    } = e;
    return {
        [o]: {
            [r]: {
                atm_strike: Number.isFinite(a.atm_strike) ? a.atm_strike : null,
                atm_iv: Number.isFinite(a.atm_iv) ? 100 * a.atm_iv : null,
                atm_iv_change: Number.isFinite(a.atm_iv_change) ? 100 * a.atm_iv_change : null,
                atm_iv_percentile: Number.isFinite(a.atm_iv_percentile) ? 100 * a.atm_iv_percentile : null,
                atm_ivp_type: null !== (t = null === a || void 0 === a ? void 0 : a.atm_ivp_type) && void 0 !== t ? t : null,
                pcr: null !== (i = null === a || void 0 === a ? void 0 : a.pcr) && void 0 !== i ? i : null,
                max_pain_strike: null !== (n = null === a || void 0 === a ? void 0 : a.max_pain_strike) && void 0 !== n ? n : null,
                chain: null !== a && void 0 !== a && a.chain ? Object.keys(a.chain).reduce(((e, t) => (a.chain[t] && (e[t] = function (e, t) {
                    const i = {
                        CE: e.call || {},
                        PE: e.put || {},
                        strike: +t,
                        pcr: e.pcr,
                        ivChange: Number.isFinite(e.iv_change) ? 100 * e.iv_change : null
                    };
                    if (void 0 !== e.greeks && null !== e.greeks) {
                        const t = e.greeks.call_delta || null;
                        i.greeks = {
                            callDelta: Number.isFinite(t) ? t : null,
                            gamma: e.greeks.gamma,
                            impliedVolatility: 100 * e.greeks.iv,
                            putDelta: Number.isFinite(t) ? t - 1 : null,
                            theta: e.greeks.theta,
                            vega: e.greeks.vega
                        }
                    } else i.greeks = {};
                    return i
                }(a.chain[t], t)), e)), {}) : {}
            }
        }
    }
}

// 

const WR = {
    INVALID: 0,
    QUOTE: 1,
    OPTION_CHAIN: 3,
    UNDERLYING_STATS: 5,
    ORDER_UPDATES: 6,
    SCREENER_STATS: 7,
    COMMON_EVENTS: 8,
    NSE_EVENTS: 9,
    CUSTOM_PING: 253,
    CUSTOM_PONG: 254
};

const JR = {
    INVALID: 0,
    QUOTE: 1,
    OPTION_CHAIN: 3,
    UNDERLYING_STATS: 5,
    ORDER_UPDATES: 6,
    SCREENER_STATS: 7,
    COMMON_EVENTS: 8,
    NSE_EVENTS: 9,
    CUSTOM_PING: 253,
    CUSTOM_PONG: 254
};

function A(e) {
    if (31 != e[0] || 139 != e[1] || 8 != e[2]) throw "invalid gzip data";
    var t = e[3],
        r = 10;
    4 & t && (r += e[10] | 2 + (e[11] << 8));
    for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !e[r++]);
    return r + (2 & t)
}

function Hr_iF(e, t) {
    // console.log('boom', e, t);
    return 31 == e[0] && 139 == e[1] && 8 == e[2] ? I(e, t) : 8 != (15 & e[0]) || e[0] >> 4 > 7 || (e[0] << 8 | e[1]) % 31 ? j(e, t) : N(e, t)
}

function I(e, t) {
    return P(e.subarray(A(e), -8), t || new n(M(e)))
}

function P(e, t, r) {
    var o = e.length;
    if (!o || r && !r.l && o < 5) return t || new n(0);
    var a = !t || r,
        s = !r || r.i;
    r || (r = {}), t || (t = new n(3 * o));
    var c = function (e) {
        var r = t.length;
        if (e > r) {
            var o = new n(Math.max(2 * r, e));
            o.set(t), t = o
        }
    },
        d = r.f || 0,
        p = r.p || 0,
        v = r.b || 0,
        m = r.l,
        y = r.d,
        b = r.m,
        _ = r.n,
        P = 8 * o;
    do {
        if (!m) {
            r.f = d = S(e, p, 1);
            var R = S(e, p + 1, 3);
            if (p += 3, !R) {
                var A = e[(Y = k(p) + 4) - 4] | e[Y - 3] << 8,
                    M = Y + A;
                if (M > o) {
                    if (s) throw "unexpected EOF";
                    break
                }
                a && c(v + A), t.set(e.subarray(Y, M), v), r.b = v += A, r.p = p = 8 * M;
                continue
            }
            if (1 == R) m = w, y = x, b = 9, _ = 5;
            else {
                if (2 != R) throw "invalid block type";
                var C = S(e, p, 31) + 257,
                    j = S(e, p + 10, 15) + 4,
                    I = C + S(e, p + 5, 31) + 1;
                p += 14;
                for (var N = new n(I), D = new n(19), L = 0; L < j; ++L) D[l[L]] = S(e, p + 3 * L, 7);
                p += 3 * j;
                var U = E(D),
                    F = (1 << U) - 1,
                    z = g(D, U, 1);
                for (L = 0; L < I;) {
                    var Y, B = z[S(e, p, F)];
                    if (p += 15 & B, (Y = B >>> 4) < 16) N[L++] = Y;
                    else {
                        var W = 0,
                            H = 0;
                        for (16 == Y ? (H = 3 + S(e, p, 3), p += 2, W = N[L - 1]) : 17 == Y ? (H = 3 + S(e, p, 7), p += 3) : 18 == Y && (H = 11 + S(e, p, 127), p += 7); H--;) N[L++] = W
                    }
                }
                var q = N.subarray(0, C),
                    V = N.subarray(C);
                b = E(q), _ = E(V), m = g(q, b, 1), y = g(V, _, 1)
            }
            if (p > P) {
                if (s) throw "unexpected EOF";
                break
            }
        }
        a && c(v + 131072);
        for (var $ = (1 << b) - 1, G = (1 << _) - 1, K = p; ; K = p) {
            var X = (W = m[O(e, p) & $]) >>> 4;
            if ((p += 15 & W) > P) {
                if (s) throw "unexpected EOF";
                break
            }
            if (!W) throw "invalid length/literal";
            if (X < 256) t[v++] = X;
            else {
                if (256 == X) {
                    K = p, m = null;
                    break
                }
                var Z = X - 254;
                if (X > 264) {
                    var Q = i[L = X - 257];
                    Z = S(e, p, (1 << Q) - 1) + f[L], p += Q
                }
                var J = y[O(e, p) & G],
                    ee = J >>> 4;
                if (!J) throw "invalid distance";
                p += 15 & J;
                V = h[ee];
                if (ee > 3) {
                    Q = u[ee];
                    V += O(e, p) & (1 << Q) - 1, p += Q
                }
                if (p > P) {
                    if (s) throw "unexpected EOF";
                    break
                }
                a && c(v + 131072);
                for (var te = v + Z; v < te; v += 4) t[v] = t[v - V], t[v + 1] = t[v + 1 - V], t[v + 2] = t[v + 2 - V], t[v + 3] = t[v + 3 - V];
                v = te
            }
        }
        r.l = m, r.p = K, r.b = v, m && (d = 1, r.m = b, r.d = y, r.n = _)
    } while (!d);
    return v == t.length ? t : T(t, 0, v)
}

function Fr(e) {
    const t = new Uint8Array(e);
    let i = 0;
    const n = t.length;
    for (let o = 0, r = n - 1; o < n; o++, r--) i += t[r] << 8 * o;
    return i
}

function RR(e, t, i) {
    "use strict";
    i.d(t, {
        F7: () => E,
        J_: () => g,
        Th: () => N,
        Tn: () => y,
        Zs: () => m,
        dL: () => M,
        eF: () => T,
        o5: () => I,
        p6: () => p
    });
    var n = i(72981),
        o = i(63148),
        r = i.n(o),
        a = i(15616),
        l = i.n(a),
        s = i(62382),
        d = i.n(s),
        c = i(91884),
        u = i.n(c);

    function g(e) {
        return d()(e)
    }
    const p = (e, t) => {
        try {
            return l()(new Date(e), t)
        } catch (i) {
            return e.toString()
        }
    },
        I = e => {
            try {
                return l()(new Date(e), "yyyy-MM-dd")
            } catch (t) {
                return e.toString()
            }
        },
        y = e => {
            try {
                return l()(new Date(e), "dd MMM")
            } catch (t) {
                return e.toString()
            }
        };

    function M(e) {
        try {
            return l()(new Date(e), "MMM do")
        } catch (t) {
            return e
        }
    }
    const m = (e, t) => {
        try {
            const i = u()(e, "yyyy-MM-dd", new Date),
                n = u()(t, "yyyy-MM-dd", new Date);
            return r()(n, i)
        } catch (i) {
            return NaN
        }
    };

    function N(e) {
        try {
            return l()(new Date(e), "do MMM")
        } catch (t) {
            return e
        }
    }

    function E(e) {
        const t = new Date(e);
        try {
            return (0, n.Z)(t, "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
        } catch (i) {
            return t.toDateString()
        }
    }

    function T(e) {
        try {
            return l()(new Date(e), "MMM")
        } catch (t) {
            return e
        }
    }
}

function GR(e) {
    return (0, RR)(1e3 * e)
}

function FR(e) {
    const t = new Uint8Array(e);
    let i = 0;
    const n = t.length;
    for (let o = 0, r = n - 1; o < n; o++, r--) i += t[r] << 8 * o;
    return i
}




function BR(e) {
    const t = FR(e.slice(0, 4)),
        i = e.slice(4, 12),
        n = new TextDecoder("utf-8").decode(i),
        o = n.slice(0, 4),
        r = n.slice(4, 6),
        a = n.slice(6, 8),
        l = "".concat(o, "-").concat(r, "-").concat(a),
        s = (0, Hr_iF)(e.slice(12)),
        d = new TextDecoder("utf-8").decode(s);

    // let time = GR(t);



    // console.log(t, n, l, i);
    let _timestamp = new Date();
    console.log(t, l, _timestamp);

    return {
        token: t,
        expiry: l,
        data:
            HR({
                underlyingToken: t,
                expiry: l,
                optionChain: JSON.parse(d),
                client_timestamp: _timestamp
            })
    }
}

function QR(e) {
    const t = FR(e.slice(0, 4)),
        i = (0, Hr_iF)(e.slice(4)),
        n = new TextDecoder("utf-8").decode(i);
    return {
        [t]: JSON.parse(n)
    }
}

function XR(e) {
    if (!e || e.byteLength <= 0) throw new Error("empty binary packet cannot be processed");
    const t = new Uint8Array(e),
        i = t[0];
    switch (i) {
        case WR.OPTION_CHAIN:
            let _payload = BR(t.slice(1));
            // console.log('token' , _payload.token)
            return {
                token: _payload.token, expiry: _payload.expiry, kind: JR.OPTION_CHAIN, packetId: i, payload: _payload
            };
        case WR.UNDERLYING_STATS:
            // console.log('token' , 'UNDERLYING_STATS');
            return {
                token: 'ALL', expiry: 'UNDERLYING_STATS', kind: JR.UNDERLYING_STATS, packetId: i, payload: QR(t.slice(1))
            };
        case WR.SCREENER_STATS:
            return {
                kind: JR.SCREENER_STATS, packetId: i, payload: VR(t.slice(1))
            };
        case WR.QUOTE: {

            function fn18797(e, t, i) {
                "use strict";
                i.d(t, {
                    F7: () => E,
                    J_: () => g,
                    Th: () => N,
                    Tn: () => y,
                    Zs: () => m,
                    dL: () => M,
                    eF: () => T,
                    o5: () => I,
                    p6: () => p
                });
                var n = i(72981),
                    o = i(63148),
                    r = i.n(o),
                    a = i(15616),
                    l = i.n(a),
                    s = i(62382),
                    d = i.n(s),
                    c = i(91884),
                    u = i.n(c);

                function g(e) {
                    return d()(e)
                }
                const p = (e, t) => {
                    try {
                        return l()(new Date(e), t)
                    } catch (i) {
                        return e.toString()
                    }
                },
                    I = e => {
                        try {
                            return l()(new Date(e), "yyyy-MM-dd")
                        } catch (t) {
                            return e.toString()
                        }
                    },
                    y = e => {
                        try {
                            return l()(new Date(e), "dd MMM")
                        } catch (t) {
                            return e.toString()
                        }
                    };

                function M(e) {
                    try {
                        return l()(new Date(e), "MMM do")
                    } catch (t) {
                        return e
                    }
                }
                const m = (e, t) => {
                    try {
                        const i = u()(e, "yyyy-MM-dd", new Date),
                            n = u()(t, "yyyy-MM-dd", new Date);
                        return r()(n, i)
                    } catch (i) {
                        return NaN
                    }
                };

                function N(e) {
                    try {
                        return l()(new Date(e), "do MMM")
                    } catch (t) {
                        return e
                    }
                }

                function E(e) {
                    const t = new Date(e);
                    try {
                        return (0, n.Z)(t, "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
                    } catch (i) {
                        return t.toDateString()
                    }
                }

                function T(e) {
                    try {
                        return l()(new Date(e), "MMM")
                    } catch (t) {
                        return e
                    }
                }
            }

            var RR = fn18797;

            function RR_F7(e) {
                const t = new Date(e);
                try {
                    return (0, n.Z)(t, "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
                } catch (i) {
                    return t.toDateString()
                }
            }

            const wR = 3,
                kR = 9,
                UR = "full",
                YR = "quote",
                ZR = "ltp";

            function GR(e) {
                return (0, RR_F7)(1e3 * e)

            }

            const e = function (e) {
                const t = FR(e.slice(0, 4)),
                    i = 255 & t;
                let n, o, r = !0;
                if (i === kR && (r = !1), i === wR ? (n = .0025, o = 1e7) : (n = .05, o = 100), 8 === e.byteLength) return {
                    tradable: r,
                    mode: ZR,
                    instrumentToken: t,
                    lastPrice: FR(e.slice(4, 8)) / o
                };
                if (28 === e.byteLength || 32 === e.byteLength) {
                    let i = YR;
                    32 === e.byteLength && (i = UR);
                    const a = {
                        tradable: r,
                        mode: i,
                        instrumentToken: t,
                        tickSize: n,
                        lastPrice: FR(e.slice(4, 8)) / o,
                        ohlc: {
                            high: FR(e.slice(8, 12)) / o,
                            low: FR(e.slice(12, 16)) / o,
                            open: FR(e.slice(16, 20)) / o,
                            close: FR(e.slice(20, 24)) / o
                        },
                        change: FR(e.slice(24, 28))
                    };
                    if (0 !== a.ohlc.close && (a.change = 100 * (a.lastPrice - a.ohlc.close) / a.ohlc.close), 32 === e.byteLength) {
                        a.timestamp = null;
                        const t = FR(e.slice(28, 32));
                        t && (a.timestamp = GR(t), a.timestampEpochSec = t)
                    }
                    return a
                }
                if (44 === e.byteLength || 184 === e.byteLength) {
                    let i = YR;
                    184 === e.byteLength && (i = UR);
                    const a = {
                        tradable: r,
                        mode: i,
                        instrumentToken: t,
                        tickSize: n,
                        lastPrice: FR(e.slice(4, 8)) / o,
                        lastQuantity: FR(e.slice(8, 12)),
                        averagePrice: FR(e.slice(12, 16)) / o,
                        volume: FR(e.slice(16, 20)),
                        buyQuantity: FR(e.slice(20, 24)),
                        sellQuantity: FR(e.slice(24, 28)),
                        ohlc: {
                            open: FR(e.slice(28, 32)) / o,
                            high: FR(e.slice(32, 36)) / o,
                            low: FR(e.slice(36, 40)) / o,
                            close: FR(e.slice(40, 44)) / o
                        },
                        last_traded_timestamp: 184 === e.byteLength ? FR(e.slice(44, 48)) : 0
                    };
                    if (0 !== a.ohlc.close && (a.change = 100 * (a.lastPrice - a.ohlc.close) / a.ohlc.close), 184 === e.byteLength) {
                        a.last_trade_time = null;
                        const t = FR(e.slice(44, 48));
                        t && (a.last_trade_time = GR(t)), a.timestamp = null;
                        const i = FR(e.slice(60, 64));
                        i && (a.timestamp = GR(i), a.timestampEpochSec = i), a.oi = FR(e.slice(48, 52)), a.oiDayHigh = FR(e.slice(52, 56)), a.oiDayLow = FR(e.slice(56, 60)), a.depth = {
                            buy: [],
                            sell: []
                        };
                        let n = 0;
                        const r = e.slice(64, 184);
                        for (let e = 0; e < 10; e++) n = 12 * e, a.depth[e < 5 ? "buy" : "sell"].push({
                            quantity: FR(r.slice(n, n + 4)),
                            price: FR(r.slice(n + 4, n + 8)) / o,
                            orders: FR(r.slice(n + 8, n + 10))
                        })
                    }
                    return a
                }
                return null
            }(t.slice(1));
            if (e) return {
                token: 'ALL',
                expiry: 'QUOTE',
                kind: JR.QUOTE,
                packetId: i,
                payload: e
            };
            throw new Error("empty quote packet received")
        }
        case WR.ORDER_UPDATES:
            return {
                kind: JR.ORDER_UPDATES, packetId: i, payload: KR(t.slice(1))
            };
        case WR.COMMON_EVENTS:
            return {
                kind: JR.COMMON_EVENTS, packetId: i, payload: KR(t.slice(1))
            };
        case WR.NSE_EVENTS:
            return {
                kind: JR.NSE_EVENTS, packetId: i, payload: KR(t.slice(1))
            };
        case WR.CUSTOM_PING:
            return {
                token: 'PING',
                expiry: 'CUSTOM_PING',
                kind: JR.CUSTOM_PING, packetId: i, payload: {}
            };
        case WR.INVALID:
            throw new Error("invalid packet id 0 provided");
        default:
            throw new Error("invalid packet id ".concat(i, " provided"))
    }
}

function test() {

    var payload = "030003E90932303233313032361F8B08000000000000FFC55D6D721C398EBD4BFD963208809F3EC1DE616343A171ABDD8AB1658F2DF76EC744DF7D03606655260916B3A8D4F857DBAA76658A0441E0E1E1E1DFA78F7F3C3EBF9C3EFCFB04C93BC37FF8F6F395FFF3FCF2E3F5FBCF2F4F2FAF0FAF5FFFF9F472FA0001C9B864EF4E9F1F7FBC3E7CFBFEFCF1E9F4C1519AE0EEF4F2F4FAF0F18FC7974F4FA70F66B27077FAFACC1F627486FF7CFEF0DE4C10ECDDE9F9C7C3E7E77FFD7CFEEDF4E1F5FBCFA7BB53FEDBF3EB5F0FFFFBF8FDE5F9E5D38FD387FFFE9FBBD39F5F3FFFFCF274FAE0C14663EE4EFF78FAF1FAF08F9F7FAD5F20CE3FFEF1F4F9F3F9E71626B77AF4C3BF7E3EBEBC3EBFFE75FA700F80C0DFF5FCF2FAFDF9E5C7F3C7873F1F3FFF942F8BFC8F8A9F3FFCFEFDEB97871FDFBEBE9E3E3884C9B8BBD3EBF397A7E55F99C9DF9DBE7DFDC67F727FDF9D3E3E7EFE7C650D89E2760D618A6EBB84F7660A34AF213AB466BB886632C10FAC6188DE05ABAD627E856A11614AFA12928F515D413399ABEB279FAF172F3F795E3D837FDF9D3E7D7F7AFAE70F5E405EC887DF9E3EBF3EE60FEF4EAF7F3CF15FEEDDC486F8E9F1CB97FC91E10FFF7CFA247FB3E9EEF4FC27FF091DFD7D77FAF6F13BFF05F8A7AB3504E0A741327DC3476BD98ED79B66618262D760323E6F9A0DD6A462D3604A7EC4F0211902446DD7F81D945DB3306163DBC082FC266FDFB7F9F79F370E63CFEED142E93BC0C8112D0CDFC5BC8660828BC51A529C4280A1450C2105D5F20D4CA4DABE013ED7DA3282B131A8CBE8E537BAB28E214EA9701F56D6765E487BE500B0F92C0780CCE4707302F07C02680AE71300DE2F27C08A5FDE1C0143FC2924D871049C0DC5FE45C776569C007118E2967DA84E808138B079883658F24ED9BDE8C41B579B17DD44FADE61404CEADE757DBFE2FAAD9FC279EF28750F81435E818D1F71627EA5F797037CFAE01C38535CA10E2663863C0984E0510CB7F224F92D6A57E25A97A8130F778C2BC90F5F56F1CA09581D004C62CEEB03E02E07805DCD7C009CBD5C01299607401C178464BA0700D0967B67265F6F1DCC17B7F7A6745F300518D9B8000E51DBB6FC02D5AE19364A6DD32C043AC6FDE7272FD776CFEE01C163E1FC111D7F69B97A73E868A10E1C4DDC7A8FDF1F3FFF68ADDEE98FE74F7FDCFFE3F9B7FBAFBFFFFEF4FDFEC7B7EF4F8FBF9D568B4AA05E079022AF5E7D1D2084095B11A50455D5AA0242EF3E00C4FA4600E27FB5DC08A1792040766539104548748987D822F361B00196C3002E4D486548E4D885A131FDE3401642711C6292C76E7301BE96E438904DF596F2A7371F078268D5CB2046D9A1FA36483958D19381102549A9768FBFEEFAE6C550DF08B0DEBAEE8540947809B6D94071A9DEE78896173125E7E557DF240330741BF84090D4942A2F96920C34A2CA44098F4A06F0E254E05A2E0017C3B713FB96752E0017DB47BFD83EF9552EC081FAD6F2254E42D8910C589BA848062038CFC1E23616A2251BA876CC1CE8C7B40D4C60A7A0EE610A493CB7B68FAA0B4BDDB008921218DD4394E471DECC187A27C15A5FC697461C637914EC9C1E24E38BEB1527EB46D2628F5E3D07F9F9CA39308DB480DC41C9557EF2EA766D9E83F531E020EABAFFF731AECE40710490BD95B8D66E2814890FD0D66BD55BC5D70B6F550CB14AE42667874258C642E41EA99D96BE57AE61EC3E3A7B94D3725BA7753D148A12CFAFD7CE7B27F756190A2D893074FCC7BEA5D316CD7310A0AD9BF771B237B809DF4D7CBD92F99238A9F565D9B2F394D6D80FDAA6BFA78BBF1730496C3D783B412843FF98E11FECC73AE8522CED1D822C908EFF307051E23F6682C168C7B8A867BFFC123A7601A16DF864742FD50D779468670E5E972DA47E021CCABB1303C7DB65FE7BB67D72C19569144C6E0404620CCA79D57B60D033290C0C2E3730209BFC311E242FC102A55D4B8071750ED04D2E3421207B3E08B0064165E1EA0C184DD811F84064706E730CACF372888B02C07C49976EFFFD231F0FAE11BD7A175B68B61AF8F87EE0E35B81CFCAADED887CC0337ABDBD4DEBCC98B79ED714BD2B813533810D23B7A90956CF82F9F95AE0D3F029640F8282E4C1B72700161B918F5B0E814BE94AE423C13FC41D5701B8C0276BBB59652180776BC631103043C51B180886602008D60335323675BF5A492F17C0F4A47760C7E0A6F0C7D9545C0089C2351C2D39A584E8D24804A4A206C924DD6324A036E0037AF92B75019FA4E03DE8D78B68EDCE40C80A2ED04A7CCF0828890B12D347C429D575B00CFAB81DA04F42865037D64F896AD467D93C9BD83514CE8AC66EEF682572AE6C9F5A4500A0985A2E1F904FBBE6F7A91B0701299190BD0DF749C6D63E5FC976E77832592CEF520644FD88D7478E4EE5F4BFD5EDDF5BB4824B1FE2F8DD90E78F0DCF1FCF9E5F02AAC5F3970500F9108DDD61FB114B80023005C5F6E74DB35C56AB3C1763552391ABBA5F182DC34E0A589D726EA5EE5A720DB4BA6FF9A8587E5C5B7EB70E4C518A80BD6867A190808DA4583E8CF87F3081F2A97F2BD2734F5CE1FF95110F5F4CD7EDDE6EB09E12E947E04B0122EC0879ACF57E0732B7843C3EBA129933931DBAB1C1449354D3BF75C7105C7C0F6CAE1FF05884122D361414B86C297DA5F2C614B731123092D7190F26E9252E03B65536BF6FC48B60FA252EA3873CE6F68887247A51EDFECC78B070663C845C13DB463B24B04F743B60CE4415D0AF197E8EB24F1F4282B2C4C5A9E050B0638CF74EBFA355C3C796E13B9353BC233CD5DAF0B16BF8C994F7A58BC4704AE9EAE7E52B0133F99506564E5B35E78D1E233A4F42405391329D23D8853A9D027522F2C95AECDD5DB3F778B1775FF8F92DCDEDECEAF152D68D21D5366FB2AFC71D26EFB18278D4F4768EEFD140E9AD989D3262F20E5374479423C13098F52B725B2FFBB32D89ABF41E9A8BE242C6D8DC931CB41D0690A954CF4841277BC6609B4BAA03C6DD931035D03F1FB8E528E0FE64B78DFAF32959AABCE7A8C70537D98AE1C0BB283598EE51A0E4EA8264B34A13837A6D8FF0DDC84050595AF27C85ED93DADC8683106A79F2FE8340BE8209D06658B45CBE852FF89F068A39064335080A8C50DC00149BEE3100A39C0388D96EE75585FD315008DDD85F829CCCF309365680A73C0C42DA710AB0223B18E50E5F0A5FC0D741E5D3A42877F3454E09D5F8559EAF9C82D6356EE3619CB778CB21C08AD000C487A0E942EA8AE17B1F0220C12F94FAA14F197BDA7906A07F06A07506468E806D1D8173D5CB5EE83E807E12A46C4B7513E667DA1114A1B7953B7319B22DCABF0B681190BFB7BE0DDC5040EB2336607FE7F5ED73BEE9C2EEC932C949473EBBF08FC277CBE0FD729DFB6E05D863857CD625C47B33C5853DE202FA92023DA5211C0D52F409F5BC4A98DC4AD9B055000E64E120C7322FC0720CDA84CF7C5F9E0BC0722BAF4222E638E4938052415FEABFEE020461D50120A7C0EFC03F8D89C5C6D994BD6E51FC9DEF026E195011D011D0DA22A2F8C78AB9CE18BF4A5D4F6DF8CEBA4CAAA9B6CE762150ABB120D6FCF53EF88F29322D714382289BE8361C88C8905075374885FFE613600D390F2A0742CF90E5D5546481AFE763F80FFC885B5BC0BC04F78DDC5878803937A673F56B4189D6B780C4417107080A54B62F19A1D8E86C6700EB5029D814E9DDCE3D23CF64753514E2575062A146E3D2FD1C521D110BB95BF8FF0055D32341D2F8FF67A7AF90C5E576BFD973642F5D970D8D707B94AA2153481AEB87195255EECE3E0C4A0A0C1ACADAC92EA23F43346AF423A5DDEC84CE6930D04C8A5B9B7DE6BEC51D3DBF68A84C83B132FC15080A0EAA8AFD2824449012A8B735AA6C4F6CD97DF0E620863A6EECBECF7733A60C1D6D24C5D92FC5931C9B6DD68E8886E034B5CFCB834E74B34C91BC0907E5AFEA5D950A0E2A4D95BB70D07031F9C0C9C8DAD5D3C5E8A532925DFDB9D30BAC0DB5B3372E773BEEE86E414AA5C39A29825B7F9F167F4F81F913E51DEDA4E1EC66B3271B83570B959859A71A4FB1C5F774408719FF26D6C76E0A8CE4CB9091334EA584E296758CE04BCF8F838A01E8386254F326661CA9AE3FB4F922D64A0EA6E4BEFD1E2FB5FEC51BB9A700C6BFFCD9F7871206652B5F389F679E3F840BF77962F75DC4FCB91E403BE09F80D50E6A5C758E676740BBCCD57092CECCDBBB3252CC2A0D753D40A5AC43B3E397EC61F5801560B703010AA68CF343240543665723AB579752C6427C65D582B3BAEB089EDA3C4175DD42BFCB5DAF80D99D9E7F03FBFB2BB0FFB9E84B74417BC047010FB6369F04F28C3B1A7D11135378B66C7F25CF9D4DDE03668071BB716EE4D28614C8B2208586D5E9D16A7EB386D843A6CE1C60F81B950ED1CDB8EEF8D1976544A61E2A349FE5FAA4325B7213D21065C45BDE64E5EA44C15EEBAB339766759A6C83F5D0EFEB55DB7ACDBE689F49E3971300AC79B175F9E72380AB901FE239FCB15EA0C8ED01B0ECAF389AEF233D2C1350966F28438A3AD50D494B7687DCBEDE918AD4AA02A3CDE88B9AAE359235DC81746AD47E5CD783FB4A3FC1D55D7275E49F5FFEF4C112E31055CE3B14FC5B3787510AC353BF3B5B092F5086DD0E29A68F10DDB62D2E2BDF7FE9695F013CFCDB153C37E9EB353B786EE4B02CDFA75469145C4A965C29D44ABE23566F7582678A8D783F256C73D311F4783F75C1CDA4809BFE367AA74D4A7F44EDF7E7880763320ABF1F714827C682CD22036F36FBE818EFFE8566CF775F2BEA3987F92441CD62FA15D32DCC620E3B3CBEF55557462DCF71A954A2066EA234D5DF4EF154493FDC14A2DDD6C94A18A97B7BB1A4DAECBBDE5E6F605F8B70480B5DC7F02DD91B0C1F8D5509234300B1C348E688C6A07B4BB917FED719BEDBD3D2B2F1F955438B64BF1CBAEDE8648F351BFD1A4D2599AC75B18579CC50A48341DE51DB35B514D964F4438A99797AC4AE859B489ED195A1A207E2135A0204F39DE97545C831CFA1F7F27AD0ADDE83A0C68DA2B81EE8F37775FADAB5407FC596DA4BF57492B3362C9F2BE633C67961F5939F13E00DD3930F061ADA11EE044188B769AE1AEF2CFCDCDC37526A320DC9F1795D85125AF10E40A21639F1BEA1C507D0EF6781B7073C3E55BA865AA23B674A0486AB2ED509186333B034C0418D5CE87E693F0B3BD80EAF5FD0FB663F8BD4629083C97E1363AC3A32A4AADFCA6E1D69C9EDA15A64EA265A328C4CD4FB685D5B9DE35EC7EC180BEA1D06AB8441243E734DD6EDF435BAB25A78ADAF9195A32AE6278D154D8038C97B7BEC8FFE28D2EC684F23778CA86741386C391C4D57E21F9C553DC38E4B00A0C4281CABB85548CF025183F5A094E68131DB01A49AB2B671D5AE11937E0F2C2FA75FE29EF428C8752F02A72BB9DDD4D29B7B6ABBA124D39FC4F621E4507BCBEA1952484D31C4100E09257D96D57A8F48729FB0336BD7B63A5E2EA5DE35A9A762374853AF88DB75ED9F999545FC1A6329E5B612DF00A7B5E795CA947BF558212B1C57116C8C3ADAE99970D7427D4CD45D3F7F5B4F9B491335871BA04E8815D7B9924762DB5FE83DD1DB92ED2C920F2375DE9850A8EC9AF1EBC1645B189ED8F71F64FE76C0F93B093A5ADA56972E9715A1B36E7094EA2EB7CD762B5DD195601DD94C03DC9AFFECB22223D4F5AEC521DF0FDE4795DFBFBC42B56FFC41ABD8758F26CF07A8659DBB810F6971CF6DCE1F2396009A94E34B4EF37C8B06E3F261DDC2084C021AB8449333B94E55ADA45E29973753431F0B311C63FEF28CC5FAAFB11B18B65CAC3F96349FB3A2B399654B724AB0F2FD159FD90BA533ED488031982A0F48D2195D707C66EB27604E9552A119EA6EB1D1506316436A88F2F1074D626760D55E2DF0EF27C15AECB356621505E20EA93F5461BF04F9A5FD2F6D42DE9A545E003459C1396E8EFC1D530EF5BA61769A4A93570B4466850BA7E3C8B75F01F29475D1BCC9EAA755BDD78BEB59D77BCF6C379C0D3E873D7085D86C880F1DB2047957D60D2994E780038D3A1F5E34AD344526AE511F960F834A5E041F73B7B8D2A5915CFB6AD0B713FA7111F8370B3C5B14ADAF1E3CB414819DCF2255DB9CA058DB9D1E86C1AD23C44EB863E0978ABBB564CDCFE19007774DDC2D377AED103824F06535C05B52780F4BFF361AEE59AF6E84A16C80336115CEE6F8454D066C7340C97D6C04437D51434DD3D06E3AB6FB993050C51FD114DEF87FCAD37228412D69382479E20C71E4AB26032AE5B3A986ED7D3C4CE2C70F65C25764CDF324975C105897C2EA644052610E36FBCA865817301519CAB92D0F02D5FDAA76A82B8F281D2343E972F5FF1D3C5547E2279422FE5CA6D6CA887328A955CF87EABE5AE5DC89884F5D39F7D474177ADDBC4BF34C0ACD53F86AABC2F97EA2271B6FABF27B696C390B9DF8246FB7057E72D0B383E469D9E84A11FF249DF205F2B3146E943D0399B3745811400F7A42C8AA20F539082934092C7A1AC7B32EBAD98012F3A49B4A6296AA6E2F4D39632989D919702FBA1B8714529DD7A704E63E554D3AA359517F07E18CBD42FE1C687784FC295E2B00881E109707774CB6934EEA6D01A0EAD00029B865D21B98EA28C04443D00561E45B448D7A1A7A4D7EA9472BDE3F38AE7B1FB16BF3122C13A96C7FB85D28CB284100D432E259C2FC647C193862E47D1B42D2B8ECA19610F34BD494FFAC3CA22FA2C903C794727A8FF25C5F064EA0F46519FD15FB67BAFC59DE018A0E47C34E381F023B533C8B0C98276B551970263CEF1078201FAAF65450F96F8B263104AD243C0404E9651B20D76242D87005056D0CA2DAA1ED004790E0BCADDB8514F9B0CB805882DAF747EEAA1BE9927679E2DA5B05C4D071E9FD9D14C4764E346AB19E2FB46741E5961BA0844151D20C2685F56F8064CA5E0DCA6526B5DDC51A9BE9C565056C88B8E8A3659ABC025DB37A830A5EA776F9864296C6AF6B00DDB0479374DE48F6ED2801C4923E8E8AD8CF1902B58EA70E56E487213499F1CFF9DBEA4E693578C4561D91BCB742503AA257FA32D542E8394DDB5F39FFAAC191D382C5FC453E21A7BD662D6A528D750CD2EDC5E04CBF02EC4B3D9A4022E65DE4014B7FBB8CCAA82B9723377760F95DE5D6A6A83769876BBD2E92E46BDD7A5DD71F34CF6F5729B0EBA6C084544DC8D10AC0B949991B8642C678B7CB382469427C5936687056F5FB4DEE149AC302FFD1FA2F07D2ADFAEF85FF0CEBF0BF4A83E56A401EF3D317350FD5BE29C21C2B7162F7AE2265BA5207599DC64EF6B62955D0AF0583560CBE8775022C904647E3DCD5C2C10A0B6E19104894552EB6CB2A97FAC094842C6DF4561A9CFBC5BAFE5D7D7327AAB64D3E28E6BEAF1D12879652D5A7E7799E63AD6C351F02FA8F0BF545C823E2EAFD8B4E4EEBEE2310FB4720B6C61AC59BC61AE59965DDCAD7422C0CBECC04608A43BC68E759E3E3ED852FCE9ADE8114BD17056AD240CFD7805F9780ABBA57643FC5A31A77A83E87AA027C4DF539F9EAF2E612E6500610585DD11D93B51DD7B9749BECB32B4BBC7C5C156DAB25F4CF23208B044A5CD8CDA6AEA207D1C8DC9B5AE199271ADD5202885DD0272AA8CF667AF5DEA98ED75B1E2F531DE50BB3BE73A6376D439F9CF772474837EF052A07585B25EE99E3558B542B3319515ABF59D8C422E90A7CD450326C3A28F4EEA05C6D1DEE0B5FEB7AAE0B32CB72831978A764BBB3C3A8480DF9821FC00BD484893CE9601979DBCA73AD3E0493BA452F528A5E229CBECBE2FDC5E293C83C34325DFE1FE74C57984359D7C1CAB89F42D741E80D6147AA0B3C33B9ACCB5474371E9194395AB93377EBA66888A2C5255295EB26CF57CA32CDD94531CF133BA230136ED12FAC6319F4B905BFB4F8A569E85D6344BD5CCE221DAA480CFAA68CAD2E90D1977346E518E47DEB363E6ED40CA9603C6BD52E9BCE4740D2B3AADF37977D778C6F248FA52413985C46D53BDDC1B2CA43DDA63D02F7B088AB4A528CF2020A4B313545ADEE3137BF2A72F4FD12AF51A778F95BBA1E5DAA2346A5EB714970A371AACCC348CC83C6506E777E73DB2398989947BFAEEF917AF2269BF17515BF4766B6A71DA23E185C796523EB0435150D21F20550F9FF215656F410F4965FB4AE3179995FAEA9EBC37D08AA305337BBD5847D2A15D6EBC14FC0721E9AD7B8CECB6010378F1EDB68E2E110BF01099DC82E2B05739DE92C6FA6E23B31E511E56F377D79C662FAD764AD38B438D39C518409D7E1CF59C93077DE2D45DE75AB5725659871FE1D280F912F772D5A6572E982F3DB6AD3D8610DE5B814D5B22423315AF4C3AFD594636A14B8FAA88E06EADC38B3942707ECD082E452BEE44C81A08CFB67D07340CB338B79AA6A903A4AD0EE8F2607EFA507B9CFE987B6D2432E65E54C375E29F082CB9E7FC7E0528CA62476F278D00ADD3C6BFB0069DB26A5E79BF18998667657E5F8935879EDF7AF4D2E059ED7A12BF275A31E6D74A9A034FB2BBC21D48881E2F8177D3016112E07029AC90F89C5A04D89750D354D67DDF3CBABA999AF0F7410BD419EB1D8FF357A0FE79D67CF9FCD797D00FCC5F35F9ADC21AC0E40D5E7C5E90572CB75BFBD25569C14E764DA4741EA9FF72DFEC7D1FD0072852A0C4F1F5B57814EEFEC83FBA109EEDF82EDA3AFD2A82B5D2D68637D0EEC50C9DC193A44F124BC0B557C2FB4DF1C5F7469695947FD15BD33E7BB3B86B658237E7BAB7542D267A98BFC8036671C864A9159DFAC563509D2C5A8A89AA4192FD41CBF8ED6417F5E4B9676290DDEADDBDB7D57D6C4F238D6FDB226C0FAF375417788236B63C8FA336FB578AE4AFF5A5913EACA9AAC2715D5AC66919FE122CF8ED98DD24A5A4CAD6BCBBA7951BD2B370C455CF7F60ABCF3FA88A99B49E8603241E808B47355BBDD33C0112A5A0898AA2554884F73473BAB8929D2004363AB51E745F17AE8AD700057B4DD20D84637C40EE97E4DBBFF3EFFB3352B76DFD4BA6D43977602EC25E88F8AB4838C57034E27FBD5AD580A126442B19EED064F3C62A838008953F20141021F9317C0BCD2F569A8FAB4F68EFC61B95A7EF43A56ED54B87C9934518ED2CA1867A98967EE71D1B83B44E6A4A8B7C3F160229D130BAE993365D8ADAE73754D5F1B576457DD2CD7EB5C2B550700113A6CC4FB17514F14BF946DDF4AC650403DD9F877443D9062E9FE85CB5BFAAEA5FFD4639E34B129EEDA2125261EDB925B3B6A22AE4AE0698ACF6380A300BA359179CFE076573A7F6792D6C07BEE0555C57CC6FAB7543930D065AC1CF3199A6E5FAF8CF37775B4C05497BFBE40850FBB6F7E7B69F9FA8C3A77C63809966EC7B5E9FB4CE5D921E8862696912A6991EACC6B90E8B2862886443D6370331DA1E63568A16A7E2FBDFBAE75650FE8D098DBE675F912E3B42629BEE3DC05EDFBDA903B03FD06BA0359F4A8C6774046C934C83CEAC4AEAEE95BCDF471456EB86EF9ABA9155190CCC6C8AE70B1FCCBCC2E0C419B5A211AE63CFDB09BEA5AF1D85B399F3A663D9B3E377D691264235A1B20AD061A6FB3A5E40631E55172FAFE316B4F17F3E9B33775399F15D2DF87772C944DA1D71A785DA04CB82C940C47840CC1EBA55D79BE963AB5FA18FD2F6DE0ED521ABC5F2B7896B10EC62CDBB003DD87106AFD61457F7B29EBB2585E4564B343A35AC850E2B450C32674D9A5A6EA928C993FAAEFE2A6115DAEECFC0C86B458E73CF543AB69191A8A151B3DBB5940A1EEFEB916EDE8F858E87AFCA079FCDC60BAB87CDC99DF3A61E1B77A572E432B2EFA6DE0C32408C176525706377720FB26568A25E484E95464B9F36D6DEB50E7BDA17D37CB79D567C1F93C097137B8EFFAE0BE6B81FB17AE5BECA6BED6B8B2CCA577AFCC8B8A7954CA56BC676CD07170B969E0AD58A7C7F48BB14EDFC53A45A3A189750A120A5C36E946FC64AB5A4C3D63D348D159F62BB93C2865C347F14373A6587BD233FB482B6AE954C4E6844D728945E80FD9B5FCFB2FCA7B7DB087A062B3056D3AF512F1C0AC34BDBE44FD64F8D80CE4BCAD292021FB61650D6373629DCB3E4E51BBEB429D0AA11336CCA86B055E2EB19E87944ABEB716303CEB78E2E4CF82FE7019E242CB54A3B567168913083BA8FCCC79ACE2D54AC379D1DE90BEEBF2061FB3FF902C36C255ADC4B5088028F777F2F6A021BDF2E8DDC466531772C9A64AF2EE7EADFEA811A3CC50DA948B8D75C3A76FE93C9297E91C3A29B03106A44FE9E74E1005F2D98EFBA3BDD3D9BBC3D925A2CA396F563A29289D793AEF0E6A03A22D2507C4EB165D8B73E84F64B00C807082B1012E109269C4AF2A5427EFA5C29CE833DAFD76CB9767AC79889D19A5508A5FA3AF04C0565DBA40E5B569B93963C8EEF34D5741C43E0FD8AE41622F257BD5E3738BAB4688EA5ABDC6E0DFCCBEB90AF0AFC21DB012C5AF23FF7801F8FD4AB8F91CF2A0A529549C1E9B75FB77C8B771C77411FA8758E174ABFA168B431D346D8D62508354D656D313B798DA8A3DE0F2D8923A77EB423D9A529BD0F876CBF6634C55A44FEDE9ECDE48675DE5FC473C8847338B942AE0811AECB7952F5C3A8ED14943F17E09F3AF335F5086542F50D0868193593D3BA43AC9854A54D85050583D33684158AACD0FEB55E9083F18CACE446962B17865CCA6DEC2D2CF748D9AE9DE34B3C2D952F7481DD8882B36A722FC3234F4323951ED7FBB4AC33DD8709852C3D0BC467B85CB7C69628175B25B59BECCB483B46376172657666A4C672B7BD5B950B1C07526777A969D47436D8CC60535E6B156D28BBA4663057AD1C5AA58F94C2DD374AD5F1BD435D32DF75A3F262A5D48D6162AC9CCB3F907F4A4A8748E8D68078C2EC3A875915CF3FD6DD5233C8CC7999F71AB5A95173DAF46994B5AA5E632D75AABBF6C5A3762FFC88D865DC813A81AAFEC42BBC8A5CEE9E54193B7473DAAA406B898F5D1157C33E576F686D092EEF9FB93BA401BD5C5A2C32BE3EFF6AF5BA65654052E05E29CF59A1960D0141F879C3FF914ED1135AE7B269B1C54E31A8A7AD8895EA731BB750F4B85714AC0C315A4AED9BB8ACF09D128DD8B4C58CB8CF37745FAD5AB3B45BD9B9DDBD39A851BF514F407B58336A9FD1EE27A5AE30E1ABFAB689E6A9D773905D6289AEF66AC89D75B7D7AEFAD87807239F357157A63E3049C431F9FD685DEF20824FCFBEFBBD3E3EB97871FAFDF9FFF299B3F136DF987679DDBE5AF9BBB379C7FFAEDE9FBC7A797D7E7CFE716DEF9811CE17E79FCBF876F8FCF2FAB47E0FA11DF1E5EFFFAF674FA70FAAFE74F7F9CFEFE7F9A63521215CC0000";
    var typedArray = new Uint8Array(payload.match(/[\da-f]{2}/gi).map(function (h) {
        return parseInt(h, 16)
    }))
    const encodedMsg = new Uint8Array(typedArray);
    // console.log('message', encodedMsg);
    XR(encodedMsg)
}

// test()

const output_dir = 'scrapped_data'

var fs = require('fs');
var dir = `./${output_dir}`;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

function print(data) {
    // console.log(JSON.stringify(data, null, 4));


    const jsonObject = data;
    if (data.token)
        fs.appendFileSync(`${dir}/${data.token}:${data.expiry}.json`, '\r\n' + JSON.stringify(jsonObject));



}

// Expiries

const { format, subDays, getDay, isSameDay } = require('date-fns');

function lastThursdayOfMonth(year, month) {
    // Start from the last day of the month
    let lastDay = new Date(year, month + 1, 0); // Last day of the specified month

    // Find the last Thursday by subtracting days until we reach one
    while (lastDay.getDay() !== 4) { // Thursday is 4 (0-based)
        lastDay = subDays(lastDay, 1);
    }

    return lastDay;
}

function getAllExpiry() {

    const currentDate = new Date();
    // currentDate.setDate(currentDate.getDate() );

    const currentDay = currentDate.getDate();

    const currentMonth = currentDate.getMonth();
    const lastThursdayOfCurrentMonth = lastThursdayOfMonth(currentDate.getFullYear(), currentMonth);

    const currentMonthIncluded = currentDay <= lastThursdayOfCurrentMonth.getDate();

    // console.log(currentDay, lastThursdayOfCurrentMonth.getDate(), currentMonthIncluded);
    const expiries = [];
    for (let i = 0; i < 3; i++) { // Coming three months
        if (i === 0 && currentMonthIncluded == true) {
            // Include the current month if today is the last Thursday
            // console.log(`Last Thursday of ${format(currentDate, 'MMMM yyyy')}: ${format(lastThursdayOfCurrentMonth, 'yyyy-MM-dd')}`);
            expiries.push(`${format(lastThursdayOfCurrentMonth, 'yyyy-MM-dd')}`);
        } else {
            currentDate.setMonth(currentDate.getMonth() + 1);

            const lastThursday = lastThursdayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
            // console.log(`Last Thursday of ${format(currentDate, 'MMMM yyyy')}: ${format(lastThursday, 'yyyy-MM-dd')}`);
            expiries.push(`${format(lastThursday, 'yyyy-MM-dd')}`);

        }

        // Move to the next month
    }

    return expiries;


}

module.exports = {
    decodeData: function (data) {
        // whatever
        message = XR(data);
        return message;
    },

    instruments: instruments.instruments,
    expiries: getAllExpiry,
    print: print
};

