// ==============================================================================
// VideoSub v0.9.9
// by Thomas Sturm, June 2010 - August 2012
// http://www.storiesinflight.com
// Freeware, Attribution Appreciated
//
// Ender is licensed under MIT - copyright 2012 Dustin Diaz & Jacob Thornton
// http://ender.no.de/
//
// Standards compliant video subtitles for HTML5 video tags. 
// Just add this library to your webpage, it will scan your page for HTML5
// video tags and if they contain a <track> subtitle, it will load and parse
// the subtitle file (only if it is in SRT standard) and display the subtitles over
// the playing video. The library can handle multiple video files in one page.
// Currently, VideoSub will kick in for all browsers even if they have native track
// support, since none are expected to support .SRT files at all.
// ==============================================================================

/*!
 * =======================================================
 * Ender: open module JavaScript framework
 * copyright Dustin Diaz & Jacob Thornton 2011 (@ded @fat)
 * https://ender.no.de
 * License MIT
 * Module's individual licenses still apply
 * Build: ender build jeesh reqwest
 * =======================================================
 */


// check for video tags and show subtitle track if the browser doesn't know how
(function (w) {
	// integrated Ender library
	(function (a) {
		function k(a, b) {
			return new j(a, b)
		}

		function j(a, b) {
			var c, d;
			this.selector = a, typeof a == "undefined" ? (c = [], this.selector = "") : typeof a == "string" || a.nodeName || a.length && "item" in a || a == window ? c = k._select(a, b) : c = isFinite(a.length) ? a : [a], this.length = c.length;
			for (d = this.length; d--;) this[d] = c[d]
		}

		function i(a, b) {
			for (var c in b) c != "noConflict" && c != "_VERSION" && (a[c] = b[c]);
			return a
		}

		function h(a, c) {
			return b["$" + a] = c
		}

		function g(a) {
			var c = b["$" + a] || window[a];
			if (!c) throw new Error("Ender Error: Requested module '" + a + "' has not been defined.");
			return c
		}
		console.log(a);
		
		a.global = a;
		var b = {},
			c = a.$,
			d = a.ender,
			e = a.require,
			f = a.provide;
		a.provide = h, a.require = g, j.prototype.forEach = function (a, b) {
			var c, d;
			for (c = 0, d = this.length; c < d; ++c) c in this && a.call(b || this[c], this[c], c, this);
			return this
		}, j.prototype.$ = k, k._VERSION = "0.4.3-dev", k.fn = j.prototype, k.ender = function (a, b) {
			i(b ? j.prototype : k, a)
		}, k._select = function (a, b) {
			if (typeof a == "string") return (b || document).querySelectorAll(a);
			if (a.nodeName) return [a];
			return a
		}, k.noConflict = function (b) {
			a.$ = c, b && (a.provide = f, a.require = e, a.ender = d, typeof b == "function" && b(g, h, this));
			return this
		}, typeof module != "undefined" && module.exports && (module.exports = k), a.ender = a.$ = k
	})(this), ! function () {
		var module = {
				exports: {}
			},
			exports = module.exports;
		! function (a, b) {
			typeof module != "undefined" ? module.exports = b() : typeof define == "function" && define.amd ? define(a, b) : this[a] = b()
		}("reqwest", function () {
			function serializeHash() {
				var a = {};
				eachFormElement.apply(function (b, c) {
					b in a ? (a[b] && !isArray(a[b]) && (a[b] = [a[b]]), a[b].push(c)) : a[b] = c
				}, arguments);
				return a
			}

			function serializeQueryString() {
				return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
			}

			function eachFormElement() {
				var a = this,
					b, c, d, e = function (b, c) {
						for (var e = 0; e < c.length; e++) {
							var f = b[byTag](c[e]);
							for (d = 0; d < f.length; d++) serial(f[d], a)
						}
					};
				for (c = 0; c < arguments.length; c++) b = arguments[c], /input|select|textarea/i.test(b.tagName) && serial(b, a), e(b, ["input", "select", "textarea"])
			}

			function serial(a, b) {
				var c = a.name,
					d = a.tagName.toLowerCase(),
					e = function (a) {
						a && !a.disabled && b(c, normalize(a.attributes.value && a.attributes.value.specified ? a.value : a.text))
					};
				if (!a.disabled && !!c) switch (d) {
					case "input":
						if (!/reset|button|image|file/i.test(a.type)) {
							var f = /checkbox/i.test(a.type),
								g = /radio/i.test(a.type),
								h = a.value;
							(!f && !g || a.checked) && b(c, normalize(f && h === "" ? "on" : h))
						}
						break;
					case "textarea":
						b(c, normalize(a.value));
						break;
					case "select":
						if (a.type.toLowerCase() === "select-one") e(a.selectedIndex >= 0 ? a.options[a.selectedIndex] : null);
						else
							for (var i = 0; a.length && i < a.length; i++) a.options[i].selected && e(a.options[i])
				}
			}

			function normalize(a) {
				return a ? a.replace(/\r?\n/g, "\r\n") : ""
			}

			function reqwest(a, b) {
				return new Reqwest(a, b)
			}

			function init(o, fn) {
				function error(a, b, c) {
					o.error && o.error(a, b, c), complete(a)
				}

				function success(resp) {
					var r = resp.responseText;
					if (r) switch (type) {
						case "json":
							try {
								resp = win.JSON ? win.JSON.parse(r) : eval("(" + r + ")")
							} catch (err) {
								return error(resp, "Could not parse JSON in response", err)
							}
							break;
						case "js":
							resp = eval(r);
							break;
						case "html":
							resp = r
					}
					fn(resp), o.success && o.success(resp), complete(resp)
				}

				function complete(a) {
					o.timeout && clearTimeout(self.timeout), self.timeout = null, o.complete && o.complete(a)
				}
				this.url = typeof o == "string" ? o : o.url, this.timeout = null;
				var type = o.type || setType(this.url),
					self = this;
				fn = fn || function () {}, o.timeout && (this.timeout = setTimeout(function () {
					self.abort()
				}, o.timeout)), this.request = getRequest(o, success, error)
			}

			function setType(a) {
				var b = a.match(/\.(json|jsonp|html|xml)(\?|$)/);
				return b ? b[1] : "js"
			}

			function Reqwest(a, b) {
				this.o = a, this.fn = b, init.apply(this, arguments)
			}

			function getRequest(a, b, c) {
				var d = (a.method || "GET").toUpperCase(),
					e = typeof a == "string" ? a : a.url,
					f = a.processData !== !1 && a.data && typeof a.data != "string" ? reqwest.toQueryString(a.data) : a.data || null,
					g;
				(a.type == "jsonp" || d == "GET") && f && (e = urlappend(e, f), f = null);
				if (a.type == "jsonp") return handleJsonp(a, b, c, e);
				g = xhr(), g.open(d, e, !0), setHeaders(g, a), g.onreadystatechange = handleReadyState(g, b, c), a.before && a.before(g), g.send(f);
				return g
			}

			function handleJsonp(a, b, c, d) {
				var e = uniqid++,
					f = a.jsonpCallback || "callback",
					g = a.jsonpCallbackName || "reqwest_" + e,
					h = new RegExp("((^|\\?|&)" + f + ")=([^&]+)"),
					i = d.match(h),
					j = doc.createElement("script"),
					k = 0;
				i ? i[3] === "?" ? d = d.replace(h, "$1=" + g) : g = i[3] : d = urlappend(d, f + "=" + g), win[g] = generalCallback, j.type = "text/javascript", j.src = d, j.async = !0, typeof j.onreadystatechange != "undefined" && (j.event = "onclick", j.htmlFor = j.id = "_reqwest_" + e), j.onload = j.onreadystatechange = function () {
					if (j[readyState] && j[readyState] !== "complete" && j[readyState] !== "loaded" || k) return !1;
					j.onload = j.onreadystatechange = null, j.onclick && j.onclick(), a.success && a.success(lastValue), lastValue = undefined, head.removeChild(j), k = 1
				}, head.appendChild(j)
			}

			function urlappend(a, b) {
				return a + (/\?/.test(a) ? "&" : "?") + b
			}

			function generalCallback(a) {
				lastValue = a
			}

			function setHeaders(a, b) {
				var c = b.headers || {},
					d;
				c.Accept = c.Accept || defaultHeaders.accept[b.type] || defaultHeaders.accept["*"], !b.crossOrigin && !c[requestedWith] && (c[requestedWith] = defaultHeaders.requestedWith), c[contentType] || (c[contentType] = b.contentType || defaultHeaders.contentType);
				for (d in c) c.hasOwnProperty(d) && a.setRequestHeader(d, c[d])
			}

			function handleReadyState(a, b, c) {
				return function () {
					a && a[readyState] == 4 && (twoHundo.test(a.status) ? b(a) : c(a))
				}
			}
			var win = window,
				doc = document,
				twoHundo = /^20\d$/,
				byTag = "getElementsByTagName",
				readyState = "readyState",
				contentType = "Content-Type",
				requestedWith = "X-Requested-With",
				head = doc[byTag]("head")[0],
				uniqid = 0,
				lastValue, xmlHttpRequest = "XMLHttpRequest",
				isArray = typeof Array.isArray == "function" ? Array.isArray : function (a) {
					return a instanceof Array
				},
				defaultHeaders = {
					contentType: "application/x-www-form-urlencoded",
					accept: {
						"*": "text/javascript, text/html, application/xml, text/xml, */*",
						xml: "application/xml, text/xml",
						html: "text/html",
						text: "text/plain",
						json: "application/json, text/javascript",
						js: "application/javascript, text/javascript"
					},
					requestedWith: xmlHttpRequest
				},
				xhr = win[xmlHttpRequest] ? function () {
					return new XMLHttpRequest
				} : function () {
					return new ActiveXObject("Microsoft.XMLHTTP")
				};
			Reqwest.prototype = {
				abort: function () {
					this.request.abort()
				},
				retry: function () {
					init.call(this, this.o, this.fn)
				}
			}, reqwest.serializeArray = function () {
				var a = [];
				eachFormElement.apply(function (b, c) {
					a.push({
						name: b,
						value: c
					})
				}, arguments);
				return a
			}, reqwest.serialize = function () {
				if (arguments.length === 0) return "";
				var a, b, c = Array.prototype.slice.call(arguments, 0);
				a = c.pop(), a && a.nodeType && c.push(a) && (a = null), a && (a = a.type), a == "map" ? b = serializeHash : a == "array" ? b = reqwest.serializeArray : b = serializeQueryString;
				return b.apply(null, c)
			}, reqwest.toQueryString = function (a) {
				var b = "",
					c, d = encodeURIComponent,
					e = function (a, c) {
						b += d(a) + "=" + d(c) + "&"
					};
				if (isArray(a))
					for (c = 0; a && c < a.length; c++) e(a[c].name, a[c].value);
				else
					for (var f in a) {
						if (!Object.hasOwnProperty.call(a, f)) continue;
						var g = a[f];
						if (isArray(g))
							for (c = 0; c < g.length; c++) e(f, g[c]);
						else e(f, a[f])
					}
				return b.replace(/&$/, "").replace(/%20/g, "+")
			}, reqwest.compat = function (a, b) {
				a && (a.type && (a.method = a.type) && delete a.type, a.dataType && (a.type = a.dataType), a.jsonpCallback && (a.jsonpCallbackName = a.jsonpCallback) && delete a.jsonpCallback, a.jsonp && (a.jsonpCallback = a.jsonp));
				return new Reqwest(a, b)
			};
			return reqwest
		}), provide("reqwest", module.exports), ! function (a) {
			var b = require("reqwest"),
				c = function (a) {
					return function () {
						var c = Array.prototype.slice.call(arguments, 0),
							d = this && this.length || 0;
						while (d--) c.unshift(this[d]);
						return b[a].apply(null, c)
					}
				},
				d = c("serialize"),
				e = c("serializeArray");
			a.ender({
				ajax: b,
				serialize: b.serialize,
				serializeArray: b.serializeArray,
				toQueryString: b.toQueryString
			}), a.ender({
				serialize: d,
				serializeArray: e
			}, !0)
		}(ender)
	}(), ! function () {
		var a = {
				exports: {}
			},
			b = a.exports;
		! function (b, c, d) {
			typeof a != "undefined" ? a.exports = d(b, c) : typeof define == "function" && typeof define.amd == "object" ? define(d) : c[b] = d(b, c)
		}("bean", this, function (a, b) {
			var c = window,
				d = b[a],
				e = /over|out/,
				f = /[^\.]*(?=\..*)\.|.*/,
				g = /\..*/,
				h = "addEventListener",
				i = "attachEvent",
				j = "removeEventListener",
				k = "detachEvent",
				l = "ownerDocument",
				m = "target",
				n = "querySelectorAll",
				o = document || {},
				p = o.documentElement || {},
				q = p[h],
				r = q ? h : i,
				s = Array.prototype.slice,
				t = /click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i,
				u = /mouse.*(wheel|scroll)/i,
				v = /^text/i,
				w = /^touch|^gesture/i,
				x = {},
				y = function (a, b, c) {
					for (c = 0; c < b.length; c++) a[b[c]] = 1;
					return a
				}({}, ("click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange message error abort scroll " + (q ? "show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend readystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete " : "")).split(" ")),
				z = function () {
					function c(a) {
						var c = a.relatedTarget;
						return c ? c !== this && c.prefix !== "xul" && !/document/.test(this.toString()) && !b(c, this) : c === null
					}
					var a = "compareDocumentPosition",
						b = a in p ? function (b, c) {
							return c[a] && (c[a](b) & 16) === 16
						} : "contains" in p ? function (a, b) {
							b = b.nodeType === 9 || b === window ? p : b;
							return b !== a && b.contains(a)
						} : function (a, b) {
							while (a = a.parentNode)
								if (a === b) return 1;
							return 0
						};
					return {
						mouseenter: {
							base: "mouseover",
							condition: c
						},
						mouseleave: {
							base: "mouseout",
							condition: c
						},
						mousewheel: {
							base: /Firefox/.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel"
						}
					}
				}(),
				A = function () {
					var a = "altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which".split(" "),
						b = a.concat("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" ")),
						c = b.concat("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis".split(" ")),
						d = a.concat("char charCode key keyCode keyIdentifier keyLocation".split(" ")),
						f = a.concat(["data"]),
						g = a.concat("touches targetTouches changedTouches scale rotation".split(" ")),
						h = a.concat(["data", "origin", "source"]),
						i = "preventDefault",
						j = function (a) {
							return function () {
								a[i] ? a[i]() : a.returnValue = !1
							}
						},
						k = "stopPropagation",
						l = function (a) {
							return function () {
								a[k] ? a[k]() : a.cancelBubble = !0
							}
						},
						n = function (a) {
							return function () {
								a[i](), a[k](), a.stopped = !0
							}
						},
						q = function (a, b, c) {
							var d, e;
							for (d = c.length; d--;) e = c[d], !(e in b) && e in a && (b[e] = a[e])
						};
					return function (r, s) {
						var x = {
							originalEvent: r,
							isNative: s
						};
						if (!r) return x;
						var y, z = r.type,
							A = r[m] || r.srcElement;
						x[i] = j(r), x[k] = l(r), x.stop = n(x), x[m] = A && A.nodeType === 3 ? A.parentNode : A;
						if (s) {
							if (z.indexOf("key") !== -1) y = d, x.keyCode = r.keyCode || r.which;
							else if (t.test(z)) {
								y = b, x.rightClick = r.which === 3 || r.button === 2, x.pos = {
									x: 0,
									y: 0
								};
								if (r.pageX || r.pageY) x.clientX = r.pageX, x.clientY = r.pageY;
								else if (r.clientX || r.clientY) x.clientX = r.clientX + o.body.scrollLeft + p.scrollLeft, x.clientY = r.clientY + o.body.scrollTop + p.scrollTop;
								e.test(z) && (x.relatedTarget = r.relatedTarget || r[(z === "mouseover" ? "from" : "to") + "Element"])
							} else w.test(z) ? y = g : u.test(z) ? y = c : v.test(z) ? y = f : z === "message" && (y = h);
							q(r, x, y || a)
						}
						return x
					}
				}(),
				B = function (a, b) {
					return !q && !b && (a === o || a === c) ? p : a
				},
				C = function () {
					function a(a, b, c, d, e) {
						var f = this.isNative = y[b] && a[r];
						this.element = a, this.type = b, this.handler = c, this.original = d, this.namespaces = e, this.custom = z[b], this.eventType = q || f ? b : "propertychange", this.customType = !q && !f && b, this[m] = B(a, f), this[r] = this[m][r]
					}
					a.prototype = {
						inNamespaces: function (a) {
							var b, c;
							if (!a) return !0;
							if (!this.namespaces) return !1;
							for (b = a.length; b--;)
								for (c = this.namespaces.length; c--;)
									if (a[b] === this.namespaces[c]) return !0;
							return !1
						},
						matches: function (a, b, c) {
							return this.element === a && (!b || this.original === b) && (!c || this.handler === c)
						}
					};
					return a
				}(),
				D = function () {
					var a = {},
						b = function (c, d, e, f, g) {
							if (!d || d === "*")
								for (var h in a) h.charAt(0) === "$" && b(c, h.substr(1), e, f, g);
							else {
								var i = 0,
									j, k = a["$" + d],
									l = c === "*";
								if (!k) return;
								for (j = k.length; i < j; i++)
									if (l || k[i].matches(c, e, f))
										if (!g(k[i], k, i, d)) return
							}
						},
						c = function (b, c, d) {
							var e, f = a["$" + c];
							if (f)
								for (e = f.length; e--;)
									if (f[e].matches(b, d, null)) return !0;
							return !1
						},
						d = function (a, c, d) {
							var e = [];
							b(a, c, d, null, function (a) {
								return e.push(a)
							});
							return e
						},
						e = function (b) {
							(a["$" + b.type] || (a["$" + b.type] = [])).push(b);
							return b
						},
						f = function (c) {
							b(c.element, c.type, null, c.handler, function (b, c, d) {
								c.splice(d, 1), c.length === 0 && delete a["$" + b.type];
								return !1
							})
						},
						g = function () {
							var b, c = [];
							for (b in a) b.charAt(0) === "$" && (c = c.concat(a[b]));
							return c
						};
					return {
						has: c,
						get: d,
						put: e,
						del: f,
						entries: g
					}
				}(),
				E = o[n] ? function (a, b) {
					return b[n](a)
				} : function () {
					throw new Error("Bean: No selector engine installed")
				},
				F = function (a) {
					E = a
				},
				G = q ? function (a, b, c, d) {
					a[d ? h : j](b, c, !1)
				} : function (a, b, c, d, e) {
					e && d && a["_on" + e] === null && (a["_on" + e] = 0), a[d ? i : k]("on" + b, c)
				},
				H = function (a, b, d) {
					var e = b.__beanDel,
						f = function (f) {
							f = A(f || ((this[l] || this.document || this).parentWindow || c).event, !0), e && (f.currentTarget = e.ft(f[m], a));
							return b.apply(a, [f].concat(d))
						};
					f.__beanDel = e;
					return f
				},
				I = function (a, b, d, e, f, g) {
					var h = b.__beanDel,
						i = function (i) {
							var j = h ? h.ft(i[m], a) : this;
							if (e ? e.apply(j, arguments) : q ? !0 : i && i.propertyName === "_on" + d || !i) i && (i = A(i || ((this[l] || this.document || this).parentWindow || c).event, g), i.currentTarget = j), b.apply(a, i && (!f || f.length === 0) ? arguments : s.call(arguments, i ? 0 : 1).concat(f))
						};
					i.__beanDel = h;
					return i
				},
				J = function (a, b, c, d, e) {
					return function () {
						a(b, c, e), d.apply(this, arguments)
					}
				},
				K = function (a, b, c, d) {
					var e, f, h, i = b && b.replace(g, ""),
						j = D.get(a, i, c);
					for (e = 0, f = j.length; e < f; e++) j[e].inNamespaces(d) && ((h = j[e])[r] && G(h[m], h.eventType, h.handler, !1, h.type), D.del(h))
				},
				L = function (a, b, c, d, e) {
					var h, i = b.replace(g, ""),
						j = b.replace(f, "").split(".");
					if (D.has(a, i, c)) return a;
					i === "unload" && (c = J(K, a, i, c, d)), z[i] && (z[i].condition && (c = I(a, c, i, z[i].condition, e, !0)), i = z[i].base || i), h = D.put(new C(a, i, c, d, j[0] && j)), h.handler = h.isNative ? H(a, h.handler, e) : I(a, h.handler, i, !1, e, !1), h[r] && G(h[m], h.eventType, h.handler, !0, h.customType)
				},
				M = function (a, b, c) {
					var d = function (b, d) {
							var e, f = typeof a == "string" ? c(a, d) : a;
							for (; b && b !== d; b = b.parentNode)
								for (e = f.length; e--;)
									if (f[e] === b) return b
						},
						e = function (a) {
							var c = d(a[m], this);
							c && b.apply(c, arguments)
						};
					e.__beanDel = {
						ft: d,
						selector: a,
						$: c
					};
					return e
				},
				N = function (a, b, c) {
					var d, e, h, i, j = K,
						k = b && typeof b == "string";
					if (k && b.indexOf(" ") > 0) {
						b = b.split(" ");
						for (i = b.length; i--;) N(a, b[i], c);
						return a
					}
					e = k && b.replace(g, ""), e && z[e] && (e = z[e].type);
					if (!b || k) {
						if (h = k && b.replace(f, "")) h = h.split(".");
						j(a, e, c, h)
					} else if (typeof b == "function") j(a, null, b);
					else
						for (d in b) b.hasOwnProperty(d) && N(a, d, b[d]);
					return a
				},
				O = function (a, b, c, d, e) {
					var f, g, h, i, j = c,
						k = c && typeof c == "string";
					if (b && !c && typeof b == "object")
						for (f in b) b.hasOwnProperty(f) && O.apply(this, [a, f, b[f]]);
					else {
						i = arguments.length > 3 ? s.call(arguments, 3) : [], g = (k ? c : b).split(" "), k && (c = M(b, j = d, e || E)) && (i = s.call(i, 1)), this === x && (c = J(N, a, b, c, j));
						for (h = g.length; h--;) L(a, g[h], c, j, i)
					}
					return a
				},
				P = function () {
					return O.apply(x, arguments)
				},
				Q = q ? function (a, b, d) {
					var e = o.createEvent(a ? "HTMLEvents" : "UIEvents");
					e[a ? "initEvent" : "initUIEvent"](b, !0, !0, c, 1), d.dispatchEvent(e)
				} : function (a, b, c) {
					c = B(c, a), a ? c.fireEvent("on" + b, o.createEventObject()) : c["_on" + b]++
				},
				R = function (a, b, c) {
					var d, e, h, i, j, k = b.split(" ");
					for (d = k.length; d--;) {
						b = k[d].replace(g, "");
						if (i = k[d].replace(f, "")) i = i.split(".");
						if (!i && !c && a[r]) Q(y[b], b, a);
						else {
							j = D.get(a, b), c = [!1].concat(c);
							for (e = 0, h = j.length; e < h; e++) j[e].inNamespaces(i) && j[e].handler.apply(a, c)
						}
					}
					return a
				},
				S = function (a, b, c) {
					var d = 0,
						e = D.get(b, c),
						f = e.length,
						g, h;
					for (; d < f; d++) e[d].original && (h = e[d].handler.__beanDel, h ? g = [a, h.selector, e[d].type, e[d].original, h.$] : g = [a, e[d].type, e[d].original], O.apply(null, g));
					return a
				},
				T = {
					add: O,
					one: P,
					remove: N,
					clone: S,
					fire: R,
					setSelectorEngine: F,
					noConflict: function () {
						b[a] = d;
						return this
					}
				};
			if (c[i]) {
				var U = function () {
					var a, b = D.entries();
					for (a in b) b[a].type && b[a].type !== "unload" && N(b[a].element, b[a].type);
					c[k]("onunload", U), c.CollectGarbage && c.CollectGarbage()
				};
				c[i]("onunload", U)
			}
			return T
		}), provide("bean", a.exports), ! function (a) {
			var b = require("bean"),
				c = function (a, c, d) {
					var e = c ? [c] : [];
					return function () {
						for (var d = 0, f = this.length; d < f; d++) !arguments.length && a == "add" && c && (a = "fire"), b[a].apply(this, [this[d]].concat(e, Array.prototype.slice.call(arguments, 0)));
						return this
					}
				},
				d = c("add"),
				e = c("remove"),
				f = c("fire"),
				g = {
					on: d,
					addListener: d,
					bind: d,
					listen: d,
					delegate: d,
					one: c("one"),
					off: e,
					unbind: e,
					unlisten: e,
					removeListener: e,
					undelegate: e,
					emit: f,
					trigger: f,
					cloneEvents: c("clone"),
					hover: function (a, c, d) {
						for (d = this.length; d--;) b.add.call(this, this[d], "mouseenter", a), b.add.call(this, this[d], "mouseleave", c);
						return this
					}
				},
				h = "blur change click dblclick error focus focusin focusout keydown keypress keyup load mousedown mouseenter mouseleave mouseout mouseover mouseup mousemove resize scroll select submit unload".split(" ");
			for (var i = h.length; i--;) g[h[i]] = c("add", h[i]);
			b.setSelectorEngine(a), a.ender(g, !0)
		}(ender)
	}(), ! function () {
		var a = {
				exports: {}
			},
			b = a.exports;
		(function (b, c, d) {
			typeof a != "undefined" && a.exports ? a.exports = c() : typeof d.define == "function" && d.define.amd ? define(b, c) : d[b] = c()
		})("bonzo", function () {
			function $(a) {
				return new U(a)
			}

			function Z() {
				return {
					x: a.pageXOffset || c.scrollLeft,
					y: a.pageYOffset || c.scrollTop
				}
			}

			function Y(b) {
				return b === a || /^(?:body|html)$/i.test(b.tagName)
			}

			function X(b, c, d) {
				var e = this[0];
				if (!e) return this;
				if (b == null && c == null) return (Y(e) ? Z() : {
					x: e.scrollLeft,
					y: e.scrollTop
				})[d];
				Y(e) ? a.scrollTo(b, c) : (b != null && (e.scrollLeft = b), c != null && (e.scrollTop = c));
				return this
			}

			function W(a, b) {
				var c = b.cloneNode(!0),
					d, e;
				if (a.$ && typeof a.cloneEvents == "function") {
					a.$(c).cloneEvents(b), d = a.$(c).find("*"), e = a.$(b).find("*");
					for (var f = 0; f < e.length; f++) a.$(d[f]).cloneEvents(e[f])
				}
				return c
			}

			function V(a, b, c) {
				var d, e, f;
				if (typeof a == "string") return $.create(a);
				N(a) && (a = [a]);
				if (c) {
					f = [];
					for (d = 0, e = a.length; d < e; d++) f[d] = W(b, a[d]);
					return f
				}
				return a
			}

			function U(a) {
				this.length = 0;
				if (a) {
					a = typeof a != "string" && !a.nodeType && typeof a.length != "undefined" ? a : [a], this.length = a.length;
					for (var b = 0; b < a.length; b++) this[b] = a[b]
				}
			}

			function T(a, b) {
				return typeof b == "function" ? b(a) : b
			}

			function S(a, b, c) {
				var d = $(a),
					e = d.css("position"),
					f = d.offset(),
					g = "relative",
					h = e == g,
					i = [parseInt(d.css("left"), 10), parseInt(d.css("top"), 10)];
				e == "static" && (d.css("position", g), e = g), isNaN(i[0]) && (i[0] = h ? 0 : a.offsetLeft), isNaN(i[1]) && (i[1] = h ? 0 : a.offsetTop), b != null && (a.style.left = b - f.left + i[0] + v), c != null && (a.style.top = c - f.top + i[1] + v)
			}

			function R(a, b, c, d) {
				var f = 0,
					g = b || this,
					h = [],
					i = e && typeof a == "string" && a.charAt(0) != "<" ? e(a) : a;
				G(V(i), function (a, b) {
					G(g, function (d) {
						c(a, h[f++] = b > 0 ? W(g, d) : d)
					}, null, d)
				}, this, d), g.length = f, G(h, function (a) {
					g[--f] = a
				}, null, !d);
				return g
			}

			function P(a) {
				a == "transform" && (a = z.transform) || /^transform-?[Oo]rigin$/.test(a) && (a = z.transform + "Origin") || a == "float" && (a = z.cssFloat);
				return a ? I(a) : null
			}

			function O(a, b, c) {
				for (var d = 0, e = a.length; d < e; ++d)
					if (b.call(c || null, a[d], d, a)) return !0;
				return !1
			}

			function N(a) {
				return a && a.nodeName && (a.nodeType == 1 || a.nodeType == 11)
			}

			function M(a) {
				var b;
				try {
					return a === null || a === undefined ? undefined : a === "true" ? !0 : a === "false" ? !1 : a === "null" ? null : (b = parseFloat(a)) == a ? b : a
				} catch (c) {}
				return undefined
			}

			function L(a) {
				var b = a[x]("data-node-uid");
				b && delete r[b]
			}

			function K(a) {
				a[x]("data-node-uid") || a[w]("data-node-uid", ++s);
				var b = a[x]("data-node-uid");
				return r[b] || (r[b] = {})
			}

			function J(a) {
				return a ? a.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() : a
			}

			function I(a) {
				return a.replace(/-(.)/g, function (a, b) {
					return b.toUpperCase()
				})
			}

			function H(a, b, c) {
				for (var d = 0, e = a.length; d < e; d++) N(a[d]) && (H(a[d].childNodes, b, c), b.call(c || a[d], a[d], d, a));
				return a
			}

			function G(a, b, c, d) {
				var e, f = 0,
					g = a.length;
				for (; f < g; f++) e = d ? a.length - f - 1 : f, b.call(c || a[e], a[e], e, a);
				return a
			}

			function F(a) {
				return new RegExp("(^|\\s+)" + a + "(\\s+|$)")
			}
			var a = window,
				b = a.document,
				c = b.documentElement,
				d = "parentNode",
				e = null,
				f = /^(checked|value|selected|disabled)$/i,
				g = /^(select|fieldset|table|tbody|tfoot|td|tr|colgroup)$/i,
				h = ["<table>", "</table>", 1],
				i = ["<table><tbody><tr>", "</tr></tbody></table>", 3],
				j = ["<select>", "</select>", 1],
				k = ["_", "", 0, 1],
				l = {
					thead: h,
					tbody: h,
					tfoot: h,
					colgroup: h,
					caption: h,
					tr: ["<table><tbody>", "</tbody></table>", 2],
					th: i,
					td: i,
					col: ["<table><colgroup>", "</colgroup></table>", 2],
					fieldset: ["<form>", "</form>", 1],
					legend: ["<form><fieldset>", "</fieldset></form>", 2],
					option: j,
					optgroup: j,
					script: k,
					style: k,
					link: k,
					param: k,
					base: k
				},
				m = /^(checked|selected|disabled)$/,
				n = /msie/i.test(navigator.userAgent),
				o, p, q, r = {},
				s = 0,
				t = /^-?[\d\.]+$/,
				u = /^data-(.+)$/,
				v = "px",
				w = "setAttribute",
				x = "getAttribute",
				y = "getElementsByTagName",
				z = function () {
					var a = b.createElement("p");
					a.innerHTML = '<a href="#x">x</a><table style="float:left;"></table>';
					return {
						hrefExtended: a[y]("a")[0][x]("href") != "#x",
						autoTbody: a[y]("tbody").length !== 0,
						computedStyle: b.defaultView && b.defaultView.getComputedStyle,
						cssFloat: a[y]("table")[0].style.styleFloat ? "styleFloat" : "cssFloat",
						transform: function () {
							var b = ["webkitTransform", "MozTransform", "OTransform", "msTransform", "Transform"],
								c;
							for (c = 0; c < b.length; c++)
								if (b[c] in a.style) return b[c]
						}(),
						classList: "classList" in a,
						opasity: function () {
							return typeof b.createElement("a").style.opacity != "undefined"
						}()
					}
				}(),
				A = /(^\s*|\s*$)/g,
				B = /\s+/,
				C = String.prototype.toString,
				D = {
					lineHeight: 1,
					zoom: 1,
					zIndex: 1,
					opacity: 1,
					boxFlex: 1,
					WebkitBoxFlex: 1,
					MozBoxFlex: 1
				},
				E = String.prototype.trim ? function (a) {
					return a.trim()
				} : function (a) {
					return a.replace(A, "")
				},
				Q = z.computedStyle ? function (a, c) {
					var d = null,
						e = b.defaultView.getComputedStyle(a, "");
					e && (d = e[c]);
					return a.style[c] || d
				} : n && c.currentStyle ? function (a, b) {
					if (b == "opacity" && !z.opasity) {
						var c = 100;
						try {
							c = a.filters["DXImageTransform.Microsoft.Alpha"].opacity
						} catch (d) {
							try {
								c = a.filters("alpha").opacity
							} catch (e) {}
						}
						return c / 100
					}
					var f = a.currentStyle ? a.currentStyle[b] : null;
					return a.style[b] || f
				} : function (a, b) {
					return a.style[b]
				};
			z.classList ? (o = function (a, b) {
				return a.classList.contains(b)
			}, p = function (a, b) {
				a.classList.add(b)
			}, q = function (a, b) {
				a.classList.remove(b)
			}) : (o = function (a, b) {
				return F(b).test(a.className)
			}, p = function (a, b) {
				a.className = E(a.className + " " + b)
			}, q = function (a, b) {
				a.className = E(a.className.replace(F(b), " "))
			}), U.prototype = {
				get: function (a) {
					return this[a] || null
				},
				each: function (a, b) {
					return G(this, a, b)
				},
				deepEach: function (a, b) {
					return H(this, a, b)
				},
				map: function (a, b) {
					var c = [],
						d, e;
					for (e = 0; e < this.length; e++) d = a.call(this, this[e], e), b ? b(d) && c.push(d) : c.push(d);
					return c
				},
				html: function (a, b) {
					var d = b ? c.textContent === undefined ? "innerText" : "textContent" : "innerHTML",
						e = this,
						f = function (b, c) {
							G(V(a, e, c), function (a) {
								b.appendChild(a)
							})
						},
						h = function (c, e) {
							try {
								if (b || typeof a == "string" && !g.test(c.tagName)) return c[d] = a
							} catch (h) {}
							f(c, e)
						};
					return typeof a != "undefined" ? this.empty().each(h) : this[0] ? this[0][d] : ""
				},
				text: function (a) {
					return this.html(a, !0)
				},
				append: function (a) {
					var b = this;
					return this.each(function (c, d) {
						G(V(a, b, d), function (a) {
							c.appendChild(a)
						})
					})
				},
				prepend: function (a) {
					var b = this;
					return this.each(function (c, d) {
						var e = c.firstChild;
						G(V(a, b, d), function (a) {
							c.insertBefore(a, e)
						})
					})
				},
				appendTo: function (a, b) {
					return R.call(this, a, b, function (a, b) {
						a.appendChild(b)
					})
				},
				prependTo: function (a, b) {
					return R.call(this, a, b, function (a, b) {
						a.insertBefore(b, a.firstChild)
					}, 1)
				},
				before: function (a) {
					var b = this;
					return this.each(function (c, e) {
						G(V(a, b, e), function (a) {
							c[d].insertBefore(a, c)
						})
					})
				},
				after: function (a) {
					var b = this;
					return this.each(function (c, e) {
						G(V(a, b, e), function (a) {
							c[d].insertBefore(a, c.nextSibling)
						}, null, 1)
					})
				},
				insertBefore: function (a, b) {
					return R.call(this, a, b, function (a, b) {
						a[d].insertBefore(b, a)
					})
				},
				insertAfter: function (a, b) {
					return R.call(this, a, b, function (a, b) {
						var c = a.nextSibling;
						c ? a[d].insertBefore(b, c) : a[d].appendChild(b)
					}, 1)
				},
				replaceWith: function (a, b) {
					var c = $(V(a)).insertAfter(this, b);
					this.remove(), U.call(b || this, c);
					return b || this
				},
				addClass: function (a) {
					a = C.call(a).split(B);
					return this.each(function (b) {
						G(a, function (a) {
							a && !o(b, T(b, a)) && p(b, T(b, a))
						})
					})
				},
				removeClass: function (a) {
					a = C.call(a).split(B);
					return this.each(function (b) {
						G(a, function (a) {
							a && o(b, T(b, a)) && q(b, T(b, a))
						})
					})
				},
				hasClass: function (a) {
					a = C.call(a).split(B);
					return O(this, function (b) {
						return O(a, function (a) {
							return a && o(b, a)
						})
					})
				},
				toggleClass: function (a, b) {
					a = C.call(a).split(B);
					return this.each(function (c) {
						G(a, function (a) {
							a && (typeof b != "undefined" ? b ? p(c, a) : q(c, a) : o(c, a) ? q(c, a) : p(c, a))
						})
					})
				},
				show: function (a) {
					a = typeof a == "string" ? a : "";
					return this.each(function (b) {
						b.style.display = a
					})
				},
				hide: function () {
					return this.each(function (a) {
						a.style.display = "none"
					})
				},
				toggle: function (a, b) {
					b = typeof b == "string" ? b : "", typeof a != "function" && (a = null);
					return this.each(function (c) {
						c.style.display = c.offsetWidth || c.offsetHeight ? "none" : b, a && a.call(c)
					})
				},
				first: function () {
					return $(this.length ? this[0] : [])
				},
				last: function () {
					return $(this.length ? this[this.length - 1] : [])
				},
				next: function () {
					return this.related("nextSibling")
				},
				previous: function () {
					return this.related("previousSibling")
				},
				parent: function () {
					return this.related(d)
				},
				related: function (a) {
					return this.map(function (b) {
						b = b[a];
						while (b && b.nodeType !== 1) b = b[a];
						return b || 0
					}, function (a) {
						return a
					})
				},
				focus: function () {
					this.length && this[0].focus();
					return this
				},
				blur: function () {
					this.length && this[0].blur();
					return this
				},
				css: function (c, d) {
					function g(a, b, c) {
						for (var d in f)
							if (f.hasOwnProperty(d)) {
								c = f[d], (b = P(d)) && t.test(c) && !(b in D) && (c += v);
								try {
									a.style[b] = T(a, c)
								} catch (e) {}
							}
					}
					var e, f = c;
					if (d === undefined && typeof c == "string") {
						d = this[0];
						if (!d) return null;
						if (d === b || d === a) {
							e = d === b ? $.doc() : $.viewport();
							return c == "width" ? e.width : c == "height" ? e.height : ""
						}
						return (c = P(c)) ? Q(d, c) : null
					}
					typeof c == "string" && (f = {}, f[c] = d), n && f.opacity && (f.filter = "alpha(opacity=" + f.opacity * 100 + ")", f.zoom = c.zoom || 1, delete f.opacity);
					return this.each(g)
				},
				offset: function (a, c) {
					if (typeof a == "number" || typeof c == "number") return this.each(function (b) {
						S(b, a, c)
					});
					if (!this[0]) return {
						top: 0,
						left: 0,
						height: 0,
						width: 0
					};
					var d = this[0],
						e = d.offsetWidth,
						f = d.offsetHeight,
						g = d.offsetTop,
						h = d.offsetLeft;
					while (d = d.offsetParent) g = g + d.offsetTop, h = h + d.offsetLeft, d != b.body && (g -= d.scrollTop, h -= d.scrollLeft);
					return {
						top: g,
						left: h,
						height: f,
						width: e
					}
				},
				dim: function () {
					if (!this.length) return {
						height: 0,
						width: 0
					};
					var a = this[0],
						b = !a.offsetWidth && !a.offsetHeight ? function (b) {
							var c = {
								position: a.style.position || "",
								visibility: a.style.visibility || "",
								display: a.style.display || ""
							};
							b.first().css({
								position: "absolute",
								visibility: "hidden",
								display: "block"
							});
							return c
						}(this) : null,
						c = a.offsetWidth,
						d = a.offsetHeight;
					b && this.first().css(b);
					return {
						height: d,
						width: c
					}
				},
				attr: function (a, b) {
					var c = this[0];
					if (typeof a != "string" && !(a instanceof String)) {
						for (var d in a) a.hasOwnProperty(d) && this.attr(d, a[d]);
						return this
					}
					return typeof b == "undefined" ? c ? f.test(a) ? m.test(a) && typeof c[a] == "string" ? !0 : c[a] : (a == "href" || a == "src") && z.hrefExtended ? c[x](a, 2) : c[x](a) : null : this.each(function (c) {
						f.test(a) ? c[a] = T(c, b) : c[w](a, T(c, b))
					})
				},
				removeAttr: function (a) {
					return this.each(function (b) {
						m.test(a) ? b[a] = !1 : b.removeAttribute(a)
					})
				},
				val: function (a) {
					return typeof a == "string" ? this.attr("value", a) : this.length ? this[0].value : null
				},
				data: function (a, b) {
					var c = this[0],
						d, e;
					if (typeof b == "undefined") {
						if (!c) return null;
						d = K(c);
						if (typeof a == "undefined") {
							G(c.attributes, function (a) {
								(e = ("" + a.name).match(u)) && (d[I(e[1])] = M(a.value))
							});
							return d
						}
						typeof d[a] == "undefined" && (d[a] = M(this.attr("data-" + J(a))));
						return d[a]
					}
					return this.each(function (c) {
						K(c)[a] = b
					})
				},
				remove: function () {
					this.deepEach(L);
					return this.each(function (a) {
						a[d] && a[d].removeChild(a)
					})
				},
				empty: function () {
					return this.each(function (a) {
						H(a.childNodes, L);
						while (a.firstChild) a.removeChild(a.firstChild)
					})
				},
				detach: function () {
					return this.each(function (a) {
						a[d].removeChild(a)
					})
				},
				scrollTop: function (a) {
					return X.call(this, null, a, "y")
				},
				scrollLeft: function (a) {
					return X.call(this, a, null, "x")
				}
			}, $.setQueryEngine = function (a) {
				e = a, delete $.setQueryEngine
			}, $.aug = function (a, b) {
				for (var c in a) a.hasOwnProperty(c) && ((b || U.prototype)[c] = a[c])
			}, $.create = function (a) {
				return typeof a == "string" && a !== "" ? function () {
					var c = /^\s*<([^\s>]+)/.exec(a),
						e = b.createElement("div"),
						f = [],
						g = c ? l[c[1].toLowerCase()] : null,
						h = g ? g[2] + 1 : 1,
						i = g && g[3],
						j = d,
						k = z.autoTbody && g && g[0] == "<table>" && !/<tbody/i.test(a);
					e.innerHTML = g ? g[0] + a + g[1] : a;
					while (h--) e = e.firstChild;
					i && e && e.nodeType !== 1 && (e = e.nextSibling);
					do(!c || e.nodeType == 1) && (!k || e.tagName.toLowerCase() != "tbody") && f.push(e); while (e = e.nextSibling);
					G(f, function (a) {
						a[j] && a[j].removeChild(a)
					});
					return f
				}() : N(a) ? [a.cloneNode(!0)] : []
			}, $.doc = function () {
				var a = $.viewport();
				return {
					width: Math.max(b.body.scrollWidth, c.scrollWidth, a.width),
					height: Math.max(b.body.scrollHeight, c.scrollHeight, a.height)
				}
			}, $.firstChild = function (a) {
				for (var b = a.childNodes, c = 0, d = b && b.length || 0, e; c < d; c++) b[c].nodeType === 1 && (e = b[d = c]);
				return e
			}, $.viewport = function () {
				return {
					width: n ? c.clientWidth : self.innerWidth,
					height: n ? c.clientHeight : self.innerHeight
				}
			}, $.isAncestor = "compareDocumentPosition" in c ? function (a, b) {
				return (a.compareDocumentPosition(b) & 16) == 16
			} : "contains" in c ? function (a, b) {
				return a !== b && a.contains(b)
			} : function (a, b) {
				while (b = b[d])
					if (b === a) return !0;
				return !1
			};
			return $
		}, this), provide("bonzo", a.exports),
			function (a) {
				function e(a, c) {
					return typeof c == "undefined" ? b(this).dim()[a] : this.css(a, c)
				}

				function d(a) {
					var b = [],
						c = 0,
						d = 0,
						e, f, g;
					for (; f = a[c]; ++c) {
						g = !1;
						for (e = 0; e < b.length; ++e)
							if (b[e] === f) {
								g = !0;
								break
							} g || (b[d++] = f)
					}
					return b
				}

				function c(a, b) {
					for (var c = 0; c < a.length; c++)
						if (a[c] === b) return c;
					return -1
				}
				var b = require("bonzo");
				b.setQueryEngine(a), a.ender(b), a.ender(b(), !0), a.ender({
					create: function (c) {
						return a(b.create(c))
					}
				}), a.id = function (b) {
					return a([document.getElementById(b)])
				}, a.ender({
					parents: function (b, e) {
						if (!this.length) return this;
						var f = a(b),
							g, h, i, j = [];
						for (g = 0, h = this.length; g < h; g++) {
							i = this[g];
							while (i = i.parentNode)
								if (~c(f, i)) {
									j.push(i);
									if (e) break
								}
						}
						return a(d(j))
					},
					parent: function () {
						return a(d(b(this).parent()))
					},
					closest: function (a) {
						return this.parents(a, !0)
					},
					first: function () {
						return a(this.length ? this[0] : this)
					},
					last: function () {
						return a(this.length ? this[this.length - 1] : [])
					},
					next: function () {
						return a(b(this).next())
					},
					previous: function () {
						return a(b(this).previous())
					},
					appendTo: function (a) {
						return b(this.selector).appendTo(a, this)
					},
					prependTo: function (a) {
						return b(this.selector).prependTo(a, this)
					},
					insertAfter: function (a) {
						return b(this.selector).insertAfter(a, this)
					},
					insertBefore: function (a) {
						return b(this.selector).insertBefore(a, this)
					},
					replaceWith: function (a) {
						return b(this.selector).replaceWith(a, this)
					},
					siblings: function () {
						var b, c, d, e = [];
						for (b = 0, c = this.length; b < c; b++) {
							d = this[b];
							while (d = d.previousSibling) d.nodeType == 1 && e.push(d);
							d = this[b];
							while (d = d.nextSibling) d.nodeType == 1 && e.push(d)
						}
						return a(e)
					},
					children: function () {
						var c, e, f, g = [];
						for (c = 0, e = this.length; c < e; c++) {
							if (!(f = b.firstChild(this[c]))) continue;
							g.push(f);
							while (f = f.nextSibling) f.nodeType == 1 && g.push(f)
						}
						return a(d(g))
					},
					height: function (a) {
						return e.call(this, "height", a)
					},
					width: function (a) {
						return e.call(this, "width", a)
					}
				}, !0)
			}(ender)
	}(), ! function () {
		var a = {
				exports: {}
			},
			b = a.exports;
		! function (b, c) {
			typeof a != "undefined" ? a.exports = c() : typeof define == "function" && typeof define.amd == "object" ? define(c) : this[b] = c()
		}("domready", function (a) {
			function m(a) {
				l = 1;
				while (a = b.shift()) a()
			}
			var b = [],
				c, d = !1,
				e = document,
				f = e.documentElement,
				g = f.doScroll,
				h = "DOMContentLoaded",
				i = "addEventListener",
				j = "onreadystatechange",
				k = "readyState",
				l = /^loade|c/.test(e[k]);
			e[i] && e[i](h, c = function () {
				e.removeEventListener(h, c, d), m()
			}, d), g && e.attachEvent(j, c = function () {
				/^c/.test(e[k]) && (e.detachEvent(j, c), m())
			});
			return a = g ? function (c) {
				self != top ? l ? c() : b.push(c) : function () {
					try {
						f.doScroll("left")
					} catch (b) {
						return setTimeout(function () {
							a(c)
						}, 50)
					}
					c()
				}()
			} : function (a) {
				l ? a() : b.push(a)
			}
		}), provide("domready", a.exports), ! function (a) {
			var b = require("domready");
			a.ender({
				domReady: b
			}), a.ender({
				ready: function (a) {
					b(a);
					return this
				}
			}, !0)
		}(ender)
	}(), ! function () {
		var a = {
				exports: {}
			},
			b = a.exports;
		(function (b, c, d) {
			typeof a != "undefined" && a.exports ? a.exports = c() : typeof d.define == "function" && d.define.amd ? define(b, c) : d[b] = c()
		})("qwery", function () {
			function Z(a, b) {
				return function (c) {
					var d, e;
					p.test(c) ? a[h] !== 9 && ((e = d = a.getAttribute("id")) || a.setAttribute("id", e = "__qwerymeupscotty"), c = '[id="' + e + '"]' + c, b(a.parentNode || a, c, !0), d || a.removeAttribute("id")) : c.length && b(a, c, !1)
				}
			}

			function Y(a, b) {
				var e, f, g = W(b);
				if (!g || !a) return [];
				if (a === window || T(a)) return !b || a !== window && T(g) && $(a, g) ? [a] : [];
				if (a && V(a)) return J(a);
				if (e = a.match(x)) {
					if (e[1]) return (f = X(g, e[1])) ? [f] : [];
					if (e[2]) return K(g[d](e[2]));
					if (ba && e[3]) return K(g[c](e[3]))
				}
				return i(a, g)
			}

			function X(a, b, c) {
				return a[h] === 9 ? a.getElementById(b) : a.ownerDocument && ((c = a.ownerDocument.getElementById(b)) && $(c, a) && c || !$(a, a.ownerDocument) && i('[id="' + b + '"]', a)[0])
			}

			function W(b) {
				if (!b) return a;
				if (typeof b == "string") return Y(b)[0];
				if (!b[h] && V(b)) return b[0];
				return b
			}

			function V(a) {
				return typeof a == "object" && isFinite(a.length)
			}

			function U(a) {
				var b = [],
					c, d;
				o: for (c = 0; c < a.length; ++c) {
					for (d = 0; d < b.length; ++d)
						if (b[d] == a[c]) continue o;
					b[b.length] = a[c]
				}
				return b
			}

			function T(a, b) {
				return a && typeof a == "object" && (b = a[h]) && (b == 1 || b == 9)
			}

			function S(a, b, c, d) {
				function f(a, d, g) {
					while (g = B[c[d]](g, a))
						if (T(g) && N.apply(g, M(b[d]))) {
							if (!d) return g;
							if (e = f(g, d - 1, g)) return e
						}
				}
				var e;
				return (e = f(a, b.length - 1, a)) && (!d || $(e, d))
			}

			function R(a, b, c) {
				if (T(b)) return a == b;
				if (V(b)) return !!~J(b).indexOf(a);
				var d = b.split(","),
					e, f;
				while (b = d.pop()) {
					e = G.g(b) || G.s(b, b.split(z)), f = b.match(y), e = e.slice(0);
					if (N.apply(a, M(e.pop())) && (!e.length || S(a, e, f, c))) return !0
				}
				return !1
			}

			function Q(a, b) {
				var c = [],
					e = [],
					f, i, j, k, m, n, o, p, q = b,
					r = G.g(a) || G.s(a, a.split(z)),
					s = a.match(y);
				if (!r.length) return c;
				k = (r = r.slice(0)).pop(), r.length && (j = r[r.length - 1].match(l)) && (q = X(b, j[1]));
				if (!q) return c;
				o = M(k), n = q !== b && q[h] !== 9 && s && /^[+~]$/.test(s[s.length - 1]) ? function (a) {
					while (q = q.nextSibling) q[h] == 1 && (o[1] ? o[1] == q[g].toLowerCase() : 1) && (a[a.length] = q);
					return a
				}([]) : q[d](o[1] || "*");
				for (f = 0, i = n.length; f < i; f++)
					if (p = N.apply(n[f], o)) c[c.length] = p;
				if (!r.length) return c;
				I(c, function (a) {
					S(a, r, s) && (e[e.length] = a)
				});
				return e
			}

			function P(a, b, c) {
				switch (a) {
					case "=":
						return b == c;
					case "^=":
						return b.match(F.g("^=" + c) || F.s("^=" + c, "^" + O(c), 1));
					case "$=":
						return b.match(F.g("$=" + c) || F.s("$=" + c, O(c) + "$", 1));
					case "*=":
						return b.match(F.g(c) || F.s(c, O(c), 1));
					case "~=":
						return b.match(F.g("~=" + c) || F.s("~=" + c, "(?:^|\\s+)" + O(c) + "(?:\\s+|$)", 1));
					case "|=":
						return b.match(F.g("|=" + c) || F.s("|=" + c, "^" + O(c) + "(-|$)", 1))
				}
				return 0
			}

			function O(a) {
				return E.g(a) || E.s(a, a.replace(t, "\\$1"))
			}

			function N(a, b, c, d, e, f, i, l, m, n, o) {
				var p, q, r, s, t;
				if (this[h] !== 1) return !1;
				if (b && b !== "*" && this[g] && this[g].toLowerCase() !== b) return !1;
				if (c && (q = c.match(j)) && q[1] !== this.id) return !1;
				if (c && (t = c.match(k)))
					for (p = t.length; p--;)
						if (!H(t[p].slice(1)).test(this.className)) return !1;
				if (m && Y.pseudos[m] && !Y.pseudos[m](this, o)) return !1;
				if (d && !i) {
					s = this.attributes;
					for (r in s)
						if (Object.prototype.hasOwnProperty.call(s, r) && (s[r].name || r) == e) return this
				}
				if (d && !P(f, _(this, e) || "", i)) return !1;
				return this
			}

			function M(a) {
				return a.match(A)
			}

			function L(a) {
				while (a = a.previousSibling)
					if (a[h] == 1) break;
				return a
			}

			function K(a) {
				var b = 0,
					c = a.length,
					d = [];
				for (; b < c; b++) d[b] = a[b];
				return d
			}

			function J(a) {
				for (var b = [], c = 0, d = a.length; c < d; ++c) V(a[c]) ? b = b.concat(a[c]) : b[b.length] = a[c];
				return b
			}

			function I(a, b) {
				var c = 0,
					d = a.length;
				for (; c < d; c++) b(a[c])
			}

			function H(a) {
				return D.g(a) || D.s(a, "(^|\\s+)" + a + "(\\s+|$)", 1)
			}

			function C() {
				this.c = {}
			}
			var a = document,
				b = a.documentElement,
				c = "getElementsByClassName",
				d = "getElementsByTagName",
				e = "querySelectorAll",
				f = "useNativeQSA",
				g = "tagName",
				h = "nodeType",
				i, j = /#([\w\-]+)/,
				k = /\.[\w\-]+/g,
				l = /^#([\w\-]+)$/,
				m = /^\.([\w\-]+)$/,
				n = /^([\w\-]+)$/,
				o = /^([\w]+)?\.([\w\-]+)$/,
				p = /(^|,)\s*[>~+]/,
				q = /^\s+|\s*([,\s\+\~>]|$)\s*/g,
				r = /[\s\>\+\~]/,
				s = /(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/,
				t = /([.*+?\^=!:${}()|\[\]\/\\])/g,
				u = /^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/,
				v = /\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/,
				w = /:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/,
				x = new RegExp(l.source + "|" + n.source + "|" + m.source),
				y = new RegExp("(" + r.source + ")" + s.source, "g"),
				z = new RegExp(r.source + s.source),
				A = new RegExp(u.source + "(" + v.source + ")?" + "(" + w.source + ")?"),
				B = {
					" ": function (a) {
						return a && a !== b && a.parentNode
					},
					">": function (a, b) {
						return a && a.parentNode == b.parentNode && a.parentNode
					},
					"~": function (a) {
						return a && a.previousSibling
					},
					"+": function (a, b, c, d) {
						if (!a) return !1;
						return (c = L(a)) && (d = L(b)) && c == d && c
					}
				};
			C.prototype = {
				g: function (a) {
					return this.c[a] || undefined
				},
				s: function (a, b, c) {
					b = c ? new RegExp(b) : b;
					return this.c[a] = b
				}
			};
			var D = new C,
				E = new C,
				F = new C,
				G = new C,
				$ = "compareDocumentPosition" in b ? function (a, b) {
					return (b.compareDocumentPosition(a) & 16) == 16
				} : "contains" in b ? function (a, c) {
					c = c[h] === 9 || c == window ? b : c;
					return c !== a && c.contains(a)
				} : function (a, b) {
					while (a = a.parentNode)
						if (a === b) return 1;
					return 0
				},
				_ = function () {
					var b = a.createElement("p");
					return (b.innerHTML = '<a href="#x">x</a>') && b.firstChild.getAttribute("href") != "#x" ? function (a, b) {
						return b === "class" ? a.className : b === "href" || b === "src" ? a.getAttribute(b, 2) : a.getAttribute(b)
					} : function (a, b) {
						return a.getAttribute(b)
					}
				}(),
				ba = !!a[c],
				bb = a.querySelector && a[e],
				bc = function (a, b) {
					var c = [],
						d, f;
					try {
						if (b[h] === 9 || !p.test(a)) return K(b[e](a));
						I(d = a.split(","), Z(b, function (a, b) {
							f = a[e](b), f.length == 1 ? c[c.length] = f.item(0) : f.length && (c = c.concat(K(f)))
						}));
						return d.length > 1 && c.length > 1 ? U(c) : c
					} catch (g) {}
					return bd(a, b)
				},
				bd = function (a, b) {
					var c = [],
						e, f, g, i, j, k;
					a = a.replace(q, "$1");
					if (f = a.match(o)) {
						j = H(f[2]), e = b[d](f[1] || "*");
						for (g = 0, i = e.length; g < i; g++) j.test(e[g].className) && (c[c.length] = e[g]);
						return c
					}
					I(k = a.split(","), Z(b, function (a, d, e) {
						j = Q(d, a);
						for (g = 0, i = j.length; g < i; g++)
							if (a[h] === 9 || e || $(j[g], b)) c[c.length] = j[g]
					}));
					return k.length > 1 && c.length > 1 ? U(c) : c
				},
				be = function (a) {
					typeof a[f] != "undefined" && (i = a[f] ? bb ? bc : bd : bd)
				};
			be({
				useNativeQSA: !0
			}), Y.configure = be, Y.uniq = U, Y.is = R, Y.pseudos = {};
			return Y
		}, this), provide("qwery", a.exports),
			function (a) {
				var b = function () {
					var a;
					try {
						a = require("qwery")
					} catch (b) {
						a = require("qwery-mobile")
					} finally {
						return a
					}
				}();
				a.pseudos = b.pseudos, a._select = function (c, d) {
					return (a._select = function () {
						var c;
						if (typeof a.create == "function") return function (c, d) {
							return /^\s*</.test(c) ? a.create(c, d) : b(c, d)
						};
						try {
							c = require("bonzo");
							return function (a, d) {
								return /^\s*</.test(a) ? c.create(a, d) : b(a, d)
							}
						} catch (d) {}
						return b
					}())(c, d)
				}, a.ender({
					find: function (c) {
						var d = [],
							e, f, g, h, i;
						for (e = 0, f = this.length; e < f; e++) {
							i = b(c, this[e]);
							for (g = 0, h = i.length; g < h; g++) d.push(i[g])
						}
						return a(b.uniq(d))
					},
					and: function (b) {
						var c = a(b);
						for (var d = this.length, e = 0, f = this.length + c.length; d < f; d++, e++) this[d] = c[e];
						this.length += c.length;
						return this
					},
					is: function (a, c) {
						var d, e;
						for (d = 0, e = this.length; d < e; d++)
							if (b.is(this[d], a, c)) return !0;
						return !1
					}
				}, !0)
			}(ender)
	}()
	var $VIDEOSUB = $.noConflict();

	$VIDEOSUB.domReady(function () {
		videosub_main();
	});

	function videosub_timecode_min(tc) {
		tcpair = tc.split(' --> ');
		return videosub_tcsecs(tcpair[0]);
	}

	function videosub_timecode_max(tc) {
		tcpair = tc.split(' --> ');
		return videosub_tcsecs(tcpair[1]);
	}

	function videosub_tcsecs(tc) {
		tc1 = tc.split(',');
		tc2 = tc1[0].split(':');
		secs = Math.floor(tc2[0] * 60 * 60) + Math.floor(tc2[1] * 60) + Math.floor(tc2[2]);
		return secs;
	}

	function videosub_main() {
		// detect media element track support in browser via the existence of the addtrack method
		var myVideo = document.getElementsByTagName('video')[0];
		var tracksupport = typeof myVideo.addTextTrack == "function" ? true : false; // check for track element method, if it doesn't exist, the browser generally doesn't support track elements

		// first find all video tags
		$VIDEOSUB('video').each(function (el) {
			// find track tag (this should be extended to allow multiple tracks and trackgroups) and get URL of subtitle file
			var subtitlesrc = '';
			if (el.hasChildNodes()) {
				// first we check if the object is not empty, if the object has child nodes
				var children = el.childNodes;
				for (var i = 0; i < children.length; i++) {
					if (children[i].nodeName.toLowerCase() == 'track') {
						subtitlesrc = $VIDEOSUB(children[i]).attr('src');
					}

				};
			};
			if (subtitlesrc.indexOf('.srt') != -1) { // we have a track tag and it's a .srt file
				var videowidth = $VIDEOSUB(el).attr('width'); // set subtitle div as wide as video
				var fontsize = 12;
				if (videowidth > 400) {
					fontsize = fontsize + Math.ceil((videowidth - 400) / 100);
				}
				var videocontainer = w.document.createElement("div");
				$VIDEOSUB(videocontainer).css({
					'position': "relative"
				});
				// wrap the existing video into the new container
				videocontainer.appendChild(el.cloneNode(true));
				el.parentNode.replaceChild(videocontainer, el);
				el = videocontainer.firstChild;
				var subcontainer = w.document.createElement("div");
				$VIDEOSUB(subcontainer).css({
					'position': 'absolute',
					'bottom': '34px',
					'width': (videowidth - 50) + 'px',
					'padding': '0 25px 0 25px',
					'textAlign': 'center',
					'backgroundColor': 'transparent',
					'color': '#ffffff',
					'fontFamily': 'Helvetica, Arial, sans-serif',
					'fontSize': fontsize + 'px',
					'fontWeight': 'bold',
					'textShadow': '#000000 1px 1px 0px'
				});
				$VIDEOSUB(subcontainer).addClass('videosubbar');
				$VIDEOSUB(subcontainer).appendTo(videocontainer);

				// called on AJAX load onComplete (to work around element reference issues)
				el.update = function (req) {
					el.subtitles = new Array();
					records = req.split('\n\n');
					for (var r = 0; r < records.length; r++) {
						record = records[r];
						el.subtitles[r] = new Array();
						el.subtitles[r] = record.split('\n');
					}
				}

				// load the subtitle file
				$VIDEOSUB.ajax({
					method: 'get',
					url: subtitlesrc,
					type: 'html',
					success: el.update
				});

				el.subcount = 0;

				// add event handler to be called when play button is pressed
				$VIDEOSUB(el).addListener('play', function (an_event) {
					el.subcount = 0;
				});

				// add event handler to be called when video is done
				$VIDEOSUB(el).addListener('ended', function (an_event) {
					el.subcount = 0;
				});

				// add event handler to be called when the video timecode has jumped
				$VIDEOSUB(el).addListener('seeked', function (an_event) {
					el.subcount = 0;
					while (videosub_timecode_max(el.subtitles[el.subcount][1]) < this.currentTime.toFixed(1)) {
						el.subcount++;
						if (el.subcount > el.subtitles.length - 1) {
							el.subcount = el.subtitles.length - 1;
							break;
						}
					}
				});

				// add event handler to be called while video is playing
				$VIDEOSUB(el).addListener('timeupdate', function (an_event) {
					var subtitle = '';
					// check if the next subtitle is in the current time range
					if (this.currentTime.toFixed(1) > videosub_timecode_min(el.subtitles[el.subcount][1]) && this.currentTime.toFixed(1) < videosub_timecode_max(el.subtitles[el.subcount][1])) {
						subtitle = el.subtitles[el.subcount][2];
					}
					// is there a next timecode?
					if (this.currentTime.toFixed(1) > videosub_timecode_max(el.subtitles[el.subcount][1]) && el.subcount < (el.subtitles.length - 1)) {
						el.subcount++;
					}
					// update subtitle div	
					this.nextSibling.innerHTML = subtitle;
				});

			}
		});
	}
})(window);