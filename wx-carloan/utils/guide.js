/*! 2/7/2018, 5:02:18 PM */ ! function(e) {
  function t(r) {
    if (n[r]) return n[r].exports;
    var c = n[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(c.exports, c, c.exports, t), c.l = !0, c.exports
  }
  var n = {};
  t.m = e, t.c = n, t.d = function(e, n, r) {
    t.o(e, n) || Object.defineProperty(e, n, {
      configurable: !1,
      enumerable: !0,
      get: r
    })
  }, t.n = function(e) {
    var n = e && e.__esModule ? function() {
      return e.default
    } : function() {
      return e
    };
    return t.d(n, "a", n), n
  }, t.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, t.p = "", t(t.s = 6)
}({
  6: function(e, t, n) {
    "use strict";
    var r = n(7);
    window.NVC_Result = {},
      function() {
        NVC_Opt.token = (new Date).getTime() + ":" + Math.random();
        var e = {
            a: NVC_Opt.appkey,
            d: NVC_Opt.scene,
            c: NVC_Opt.token
          },
          t = JSON.stringify(e);
        r.jsonp({
          url: "//cf.aliyun.com/nvc/nvcPrepare.jsonp",
          callback: "callback",
          data: {
            a: t
          },
          success: function(e) {
            e.result && (NVC_Opt.capCode = e.result.code, e.result.result && (NVC_Result.nvcPreRes = e.result.result), NVC_Opt.isH5 ? r.loadScript("//g.alicdn.com/sd/nvc/" + NVC_Result.nvcPreRes.b + "/nvch5.js") : r.loadScript("//g.alicdn.com/sd/nvc/" + NVC_Result.nvcPreRes.a + "/nvc.js"))
          }
        })
      }()
  },
  7: function(e, t, n) {
    "use strict";

    function r(e) {
      var t = [];
      for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
      return t.join("&")
    }
    var c = document,
      a = window;
    e.exports = {
      jsonp: function(e) {
        var t = ("jsonp_" + Math.random()).replace(".", ""),
          n = c.getElementsByTagName("script")[0],
          o = "";
        e.data ? (e.data[e.callback] = t, o += r(e.data)) : o += e.callback + "=" + t;
        var s = c.createElement("script");
        n.parentNode.insertBefore(s, n), a[t] = function(t) {
          e.success && e.success(t)
        }, s.src = e.url + (-1 == e.url.indexOf("?") ? "?" : "&") + o
      },
      loadScript: function(e) {
        var t = c.getElementsByTagName("script")[0],
          n = c.createElement("script");
        t.parentNode.insertBefore(n, t), n.src = e
      }
    }
  }
});