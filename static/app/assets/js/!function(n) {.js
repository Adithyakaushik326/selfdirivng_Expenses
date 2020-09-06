!function(n) {
    "function" == typeof define && define.amd ? define([ "jquery" ], function(t) {
        return n(t, window, document);
    }) : "object" == typeof exports ? module.exports = function(t, e) {
        return t = t || window, e = e || ("undefined" != typeof window ? require("jquery") : require("jquery")(t)), 
        n(e, t, t.document);
    } : n(jQuery, window, document);
}(function(R, m, S, j) {
    function o(e) {
        var n, a, r = {};
        R.each(e, function(t) {
            (n = t.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(n[1] + " ") && (a = t.replace(n[0], n[2].toLowerCase()), 
            r[a] = t, "o" === n[1] && o(e[t]));
        }), e._hungarianMap = r;
    }
    function D(e, n, a) {
        var r;
        e._hungarianMap || o(e), R.each(n, function(t) {
            (r = e._hungarianMap[t]) === j || !a && n[r] !== j || ("o" === r.charAt(0) ? (n[r] || (n[r] = {}), 
            R.extend(!0, n[r], n[t]), D(e[r], n[r], a)) : n[r] = n[t]);
        });
    }
    function y(t) {
        var e = te.defaults.oLanguage, n = e.sDecimal;
        if (n && Bt(n), t) {
            var a = t.sZeroRecords;
            !t.sEmptyTable && a && "No data available in table" === e.sEmptyTable && Rt(t, t, "sZeroRecords", "sEmptyTable"), 
            !t.sLoadingRecords && a && "Loading..." === e.sLoadingRecords && Rt(t, t, "sZeroRecords", "sLoadingRecords"), 
            t.sInfoThousands && (t.sThousands = t.sInfoThousands), (t = t.sDecimal) && n !== t && Bt(t);
        }
    }
    function _(t) {
        if (ue(t, "ordering", "bSort"), ue(t, "orderMulti", "bSortMulti"), ue(t, "orderClasses", "bSortClasses"), 
        ue(t, "orderCellsTop", "bSortCellsTop"), ue(t, "order", "aaSorting"), ue(t, "orderFixed", "aaSortingFixed"), 
        ue(t, "paging", "bPaginate"), ue(t, "pagingType", "sPaginationType"), ue(t, "pageLength", "iDisplayLength"), 
        ue(t, "searching", "bFilter"), "boolean" == typeof t.sScrollX && (t.sScrollX = t.sScrollX ? "100%" : ""), 
        "boolean" == typeof t.scrollX && (t.scrollX = t.scrollX ? "100%" : ""), t = t.aoSearchCols) for (var e = 0, n = t.length; e < n; e++) t[e] && D(te.models.oSearch, t[e]);
    }
    function T(t) {
        ue(t, "orderable", "bSortable"), ue(t, "orderData", "aDataSort"), ue(t, "orderSequence", "asSorting"), 
        ue(t, "orderDataType", "sortDataType");
        var e = t.aDataSort;
        "number" != typeof e || R.isArray(e) || (t.aDataSort = [ e ]);
    }
    function w(t) {
        if (!te.__browser) {
            var e = {};
            te.__browser = e;
            var n = R("<div/>").css({
                position: "fixed",
                top: 0,
                left: -1 * R(m).scrollLeft(),
                height: 1,
                width: 1,
                overflow: "hidden"
            }).append(R("<div/>").css({
                position: "absolute",
                top: 1,
                left: 1,
                width: 100,
                overflow: "scroll"
            }).append(R("<div/>").css({
                width: "100%",
                height: 10
            }))).appendTo("body"), a = n.children(), r = a.children();
            e.barWidth = a[0].offsetWidth - a[0].clientWidth, e.bScrollOversize = 100 === r[0].offsetWidth && 100 !== a[0].clientWidth, 
            e.bScrollbarLeft = 1 !== Math.round(r.offset().left), e.bBounding = !!n[0].getBoundingClientRect().width, 
            n.remove();
        }
        R.extend(t.oBrowser, te.__browser), t.oScroll.iBarWidth = te.__browser.barWidth;
    }
    function n(t, e, n, a, r, o) {
        var i, l = !1;
        for (n !== j && (i = n, l = !0); a !== r; ) t.hasOwnProperty(a) && (i = l ? e(i, t[a], a, t) : t[a], 
        l = !0, a += o);
        return i;
    }
    function C(t, e) {
        var n = te.defaults.column, a = t.aoColumns.length;
        n = R.extend({}, te.models.oColumn, n, {
            nTh: e || S.createElement("th"),
            sTitle: n.sTitle ? n.sTitle : e ? e.innerHTML : "",
            aDataSort: n.aDataSort ? n.aDataSort : [ a ],
            mData: n.mData ? n.mData : a,
            idx: a
        });
        t.aoColumns.push(n), (n = t.aoPreSearchCols)[a] = R.extend({}, te.models.oSearch, n[a]), 
        x(t, a, R(e).data());
    }
    function x(t, e, n) {
        e = t.aoColumns[e];
        var a = t.oClasses, r = R(e.nTh);
        if (!e.sWidthOrig) {
            e.sWidthOrig = r.attr("width") || null;
            var o = (r.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
            o && (e.sWidthOrig = o[1]);
        }
        n !== j && null !== n && (T(n), D(te.defaults.column, n), n.mDataProp === j || n.mData || (n.mData = n.mDataProp), 
        n.sType && (e._sManualType = n.sType), n.className && !n.sClass && (n.sClass = n.className), 
        n.sClass && r.addClass(n.sClass), R.extend(e, n), Rt(e, n, "sWidth", "sWidthOrig"), 
        n.iDataSort !== j && (e.aDataSort = [ n.iDataSort ]), Rt(e, n, "aDataSort"));
        var i = e.mData, l = k(i), s = e.mRender ? k(e.mRender) : null;
        n = function(t) {
            return "string" == typeof t && -1 !== t.indexOf("@");
        };
        e._bAttrSrc = R.isPlainObject(i) && (n(i.sort) || n(i.type) || n(i.filter)), e._setter = null, 
        e.fnGetData = function(t, e, n) {
            var a = l(t, e, j, n);
            return s && e ? s(a, e, t, n) : a;
        }, e.fnSetData = function(t, e, n) {
            return p(i)(t, e, n);
        }, "number" != typeof i && (t._rowReadObject = !0), t.oFeatures.bSort || (e.bSortable = !1, 
        r.addClass(a.sSortableNone)), t = -1 !== R.inArray("asc", e.asSorting), n = -1 !== R.inArray("desc", e.asSorting), 
        e.bSortable && (t || n) ? t && !n ? (e.sSortingClass = a.sSortableAsc, e.sSortingClassJUI = a.sSortJUIAscAllowed) : !t && n ? (e.sSortingClass = a.sSortableDesc, 
        e.sSortingClassJUI = a.sSortJUIDescAllowed) : (e.sSortingClass = a.sSortable, e.sSortingClassJUI = a.sSortJUI) : (e.sSortingClass = a.sSortableNone, 
        e.sSortingClassJUI = "");
    }
    function N(t) {
        if (!1 !== t.oFeatures.bAutoWidth) {
            var e = t.aoColumns;
            bt(t);
            for (var n = 0, a = e.length; n < a; n++) e[n].nTh.style.width = e[n].sWidth;
        }
        "" === (e = t.oScroll).sY && "" === e.sX || pt(t), kt(t, null, "column-sizing", [ t ]);
    }
    function H(t, e) {
        var n = I(t, "bVisible");
        return "number" == typeof n[e] ? n[e] : null;
    }
    function u(t, e) {
        var n = I(t, "bVisible");
        return -1 !== (n = R.inArray(e, n)) ? n : null;
    }
    function v(t) {
        var n = 0;
        return R.each(t.aoColumns, function(t, e) {
            e.bVisible && "none" !== R(e.nTh).css("display") && n++;
        }), n;
    }
    function I(t, n) {
        var a = [];
        return R.map(t.aoColumns, function(t, e) {
            t[n] && a.push(e);
        }), a;
    }
    function i(t) {
        var e, n, a, r, o, i, l, s, u, c = t.aoColumns, f = t.aoData, d = te.ext.type.detect;
        for (e = 0, n = c.length; e < n; e++) if (u = [], !(l = c[e]).sType && l._sManualType) l.sType = l._sManualType; else if (!l.sType) {
            for (a = 0, r = d.length; a < r; a++) {
                for (o = 0, i = f.length; o < i && (u[o] === j && (u[o] = P(t, o, e, "type")), (s = d[a](u[o], t)) || a === d.length - 1) && "html" !== s; o++) ;
                if (s) {
                    l.sType = s;
                    break;
                }
            }
            l.sType || (l.sType = "string");
        }
    }
    function A(t, e, n, a) {
        var r, o, i, l, s, u, c = t.aoColumns;
        if (e) for (r = e.length - 1; 0 <= r; r--) {
            var f = (u = e[r]).targets !== j ? u.targets : u.aTargets;
            for (R.isArray(f) || (f = [ f ]), o = 0, i = f.length; o < i; o++) if ("number" == typeof f[o] && 0 <= f[o]) {
                for (;c.length <= f[o]; ) C(t);
                a(f[o], u);
            } else if ("number" == typeof f[o] && f[o] < 0) a(c.length + f[o], u); else if ("string" == typeof f[o]) for (l = 0, 
            s = c.length; l < s; l++) "_all" != f[o] && !R(c[l].nTh).hasClass(f[o]) || a(l, u);
        }
        if (n) for (r = 0, t = n.length; r < t; r++) a(r, n[r]);
    }
    function F(t, e, n, a) {
        var r = t.aoData.length, o = R.extend(!0, {}, te.models.oRow, {
            src: n ? "dom" : "data",
            idx: r
        });
        o._aData = e, t.aoData.push(o);
        for (var i = t.aoColumns, l = 0, s = i.length; l < s; l++) i[l].sType = null;
        return t.aiDisplayMaster.push(r), (e = t.rowIdFn(e)) !== j && (t.aIds[e] = o), !n && t.oFeatures.bDeferRender || b(t, r, n, a), 
        r;
    }
    function L(n, t) {
        var a;
        return t instanceof R || (t = R(t)), t.map(function(t, e) {
            return a = s(n, e), F(n, a.data, e, a.cells);
        });
    }
    function P(t, e, n, a) {
        var r = t.iDraw, o = t.aoColumns[n], i = t.aoData[e]._aData, l = o.sDefaultContent, s = o.fnGetData(i, a, {
            settings: t,
            row: e,
            col: n
        });
        if (s === j) return t.iDrawError != r && null === l && (Pt(t, 0, "Requested unknown parameter " + ("function" == typeof o.mData ? "{function}" : "'" + o.mData + "'") + " for row " + e + ", column " + n, 4), 
        t.iDrawError = r), l;
        if (s !== i && null !== s || null === l || a === j) {
            if ("function" == typeof s) return s.call(i);
        } else s = l;
        return null === s && "display" == a ? "" : s;
    }
    function a(t, e, n, a) {
        t.aoColumns[n].fnSetData(t.aoData[e]._aData, a, {
            settings: t,
            row: e,
            col: n
        });
    }
    function c(t) {
        return R.map(t.match(/(\\.|[^\.])+/g) || [ "" ], function(t) {
            return t.replace(/\\\./g, ".");
        });
    }
    function k(r) {
        if (R.isPlainObject(r)) {
            var o = {};
            return R.each(r, function(t, e) {
                e && (o[t] = k(e));
            }), function(t, e, n, a) {
                var r = o[e] || o._;
                return r !== j ? r(t, e, n, a) : t;
            };
        }
        if (null === r) return function(t) {
            return t;
        };
        if ("function" == typeof r) return function(t, e, n, a) {
            return r(t, e, n, a);
        };
        if ("string" != typeof r || -1 === r.indexOf(".") && -1 === r.indexOf("[") && -1 === r.indexOf("(")) return function(t) {
            return t[r];
        };
        var l = function(t, e, n) {
            var a, r;
            if ("" !== n) for (var o = 0, i = (r = c(n)).length; o < i; o++) {
                if (n = r[o].match(ce), a = r[o].match(fe), n) {
                    if (r[o] = r[o].replace(ce, ""), "" !== r[o] && (t = t[r[o]]), a = [], r.splice(0, o + 1), 
                    r = r.join("."), R.isArray(t)) for (o = 0, i = t.length; o < i; o++) a.push(l(t[o], e, r));
                    t = "" === (t = n[0].substring(1, n[0].length - 1)) ? a : a.join(t);
                    break;
                }
                if (a) r[o] = r[o].replace(fe, ""), t = t[r[o]](); else {
                    if (null === t || t[r[o]] === j) return j;
                    t = t[r[o]];
                }
            }
            return t;
        };
        return function(t, e) {
            return l(t, e, r);
        };
    }
    function p(a) {
        if (R.isPlainObject(a)) return p(a._);
        if (null === a) return function() {};
        if ("function" == typeof a) return function(t, e, n) {
            a(t, "set", e, n);
        };
        if ("string" != typeof a || -1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("(")) return function(t, e) {
            t[a] = e;
        };
        var s = function(t, e, n) {
            var a;
            a = (n = c(n))[n.length - 1];
            for (var r, o, i = 0, l = n.length - 1; i < l; i++) {
                if (r = n[i].match(ce), o = n[i].match(fe), r) {
                    if (n[i] = n[i].replace(ce, ""), t[n[i]] = [], (a = n.slice()).splice(0, i + 1), 
                    r = a.join("."), R.isArray(e)) for (o = 0, l = e.length; o < l; o++) s(a = {}, e[o], r), 
                    t[n[i]].push(a); else t[n[i]] = e;
                    return;
                }
                o && (n[i] = n[i].replace(fe, ""), t = t[n[i]](e)), null !== t[n[i]] && t[n[i]] !== j || (t[n[i]] = {}), 
                t = t[n[i]];
            }
            a.match(fe) ? t[a.replace(fe, "")](e) : t[a.replace(ce, "")] = e;
        };
        return function(t, e) {
            return s(t, e, a);
        };
    }
    function g(t) {
        return le(t.aoData, "_aData");
    }
    function l(t) {
        t.aoData.length = 0, t.aiDisplayMaster.length = 0, t.aiDisplay.length = 0, t.aIds = {};
    }
    function f(t, e, n) {
        for (var a = -1, r = 0, o = t.length; r < o; r++) t[r] == e ? a = r : t[r] > e && t[r]--;
        -1 != a && n === j && t.splice(a, 1);
    }
    function r(n, a, t, e) {
        var r, o = n.aoData[a], i = function(t, e) {
            for (;t.childNodes.length; ) t.removeChild(t.firstChild);
            t.innerHTML = P(n, a, e, "display");
        };
        if ("dom" !== t && (t && "auto" !== t || "dom" !== o.src)) {
            var l = o.anCells;
            if (l) if (e !== j) i(l[e], e); else for (t = 0, r = l.length; t < r; t++) i(l[t], t);
        } else o._aData = s(n, o, e, e === j ? j : o._aData).data;
        if (o._aSortData = null, o._aFilterData = null, i = n.aoColumns, e !== j) i[e].sType = null; else {
            for (t = 0, r = i.length; t < r; t++) i[t].sType = null;
            d(n, o);
        }
    }
    function s(t, e, n, a) {
        function r(t, e) {
            if ("string" == typeof t) {
                var n = t.indexOf("@");
                -1 !== n && (n = t.substring(n + 1), p(t)(a, e.getAttribute(n)));
            }
        }
        function o(t) {
            n !== j && n !== f || (l = d[f], s = R.trim(t.innerHTML), l && l._bAttrSrc ? (p(l.mData._)(a, s), 
            r(l.mData.sort, t), r(l.mData.type, t), r(l.mData.filter, t)) : h ? (l._setter || (l._setter = p(l.mData)), 
            l._setter(a, s)) : a[f] = s), f++;
        }
        var i, l, s, u = [], c = e.firstChild, f = 0, d = t.aoColumns, h = t._rowReadObject;
        a = a !== j ? a : h ? {} : [];
        if (c) for (;c; ) "TD" != (i = c.nodeName.toUpperCase()) && "TH" != i || (o(c), 
        u.push(c)), c = c.nextSibling; else for (c = 0, i = (u = e.anCells).length; c < i; c++) o(u[c]);
        return (e = e.firstChild ? e : e.nTr) && (e = e.getAttribute("id")) && p(t.rowId)(a, e), 
        {
            data: a,
            cells: u
        };
    }
    function b(t, e, n, a) {
        var r, o, i, l, s, u = t.aoData[e], c = u._aData, f = [];
        if (null === u.nTr) {
            for (r = n || S.createElement("tr"), u.nTr = r, u.anCells = f, r._DT_RowIndex = e, 
            d(t, u), l = 0, s = t.aoColumns.length; l < s; l++) i = t.aoColumns[l], (o = n ? a[l] : S.createElement(i.sCellType))._DT_CellIndex = {
                row: e,
                column: l
            }, f.push(o), n && !i.mRender && i.mData === l || R.isPlainObject(i.mData) && i.mData._ === l + ".display" || (o.innerHTML = P(t, e, l, "display")), 
            i.sClass && (o.className += " " + i.sClass), i.bVisible && !n ? r.appendChild(o) : !i.bVisible && n && o.parentNode.removeChild(o), 
            i.fnCreatedCell && i.fnCreatedCell.call(t.oInstance, o, P(t, e, l), c, e, l);
            kt(t, "aoRowCreatedCallback", null, [ r, c, e, f ]);
        }
        u.nTr.setAttribute("role", "row");
    }
    function d(t, e) {
        var n = e.nTr, a = e._aData;
        if (n) {
            var r = t.rowIdFn(a);
            r && (n.id = r), a.DT_RowClass && (r = a.DT_RowClass.split(" "), e.__rowc = e.__rowc ? se(e.__rowc.concat(r)) : r, 
            R(n).removeClass(e.__rowc.join(" ")).addClass(a.DT_RowClass)), a.DT_RowAttr && R(n).attr(a.DT_RowAttr), 
            a.DT_RowData && R(n).data(a.DT_RowData);
        }
    }
    function h(t) {
        var e, n, a, r, o, i = t.nTHead, l = t.nTFoot, s = 0 === R("th, td", i).length, u = t.oClasses, c = t.aoColumns;
        for (s && (r = R("<tr/>").appendTo(i)), e = 0, n = c.length; e < n; e++) o = c[e], 
        a = R(o.nTh).addClass(o.sClass), s && a.appendTo(r), t.oFeatures.bSort && (a.addClass(o.sSortingClass), 
        !1 !== o.bSortable && (a.attr("tabindex", t.iTabIndex).attr("aria-controls", t.sTableId), 
        Ct(t, o.nTh, e))), o.sTitle != a[0].innerHTML && a.html(o.sTitle), Mt(t, "header")(t, a, o, u);
        if (s && B(t.aoHeader, i), R(i).find(">tr").attr("role", "row"), R(i).find(">tr>th, >tr>td").addClass(u.sHeaderTH), 
        R(l).find(">tr>th, >tr>td").addClass(u.sFooterTH), null !== l) for (e = 0, n = (t = t.aoFooter[0]).length; e < n; e++) (o = c[e]).nTf = t[e].cell, 
        o.sClass && R(o.nTf).addClass(o.sClass);
    }
    function O(t, e, n) {
        var a, r, o, i, l = [], s = [], u = t.aoColumns.length;
        if (e) {
            for (n === j && (n = !1), a = 0, r = e.length; a < r; a++) {
                for (l[a] = e[a].slice(), l[a].nTr = e[a].nTr, o = u - 1; 0 <= o; o--) t.aoColumns[o].bVisible || n || l[a].splice(o, 1);
                s.push([]);
            }
            for (a = 0, r = l.length; a < r; a++) {
                if (t = l[a].nTr) for (;o = t.firstChild; ) t.removeChild(o);
                for (o = 0, e = l[a].length; o < e; o++) if (i = u = 1, s[a][o] === j) {
                    for (t.appendChild(l[a][o].cell), s[a][o] = 1; l[a + u] !== j && l[a][o].cell == l[a + u][o].cell; ) s[a + u][o] = 1, 
                    u++;
                    for (;l[a][o + i] !== j && l[a][o].cell == l[a][o + i].cell; ) {
                        for (n = 0; n < u; n++) s[a + n][o + i] = 1;
                        i++;
                    }
                    R(l[a][o].cell).attr("rowspan", u).attr("colspan", i);
                }
            }
        }
    }
    function M(t) {
        var e = kt(t, "aoPreDrawCallback", "preDraw", [ t ]);
        if (-1 !== R.inArray(!1, e)) dt(t, !1); else {
            e = [];
            var n = 0, a = t.asStripeClasses, r = a.length, o = t.oLanguage, i = t.iInitDisplayStart, l = "ssp" == Wt(t), s = t.aiDisplay;
            t.bDrawing = !0, i !== j && -1 !== i && (t._iDisplayStart = l ? i : i >= t.fnRecordsDisplay() ? 0 : i, 
            t.iInitDisplayStart = -1);
            i = t._iDisplayStart;
            var u = t.fnDisplayEnd();
            if (t.bDeferLoading) t.bDeferLoading = !1, t.iDraw++, dt(t, !1); else if (l) {
                if (!t.bDestroying && !X(t)) return;
            } else t.iDraw++;
            if (0 !== s.length) for (o = l ? t.aoData.length : u, l = l ? 0 : i; l < o; l++) {
                var c = s[l], f = t.aoData[c];
                null === f.nTr && b(t, c);
                var d = f.nTr;
                if (0 !== r) {
                    var h = a[n % r];
                    f._sRowStripe != h && (R(d).removeClass(f._sRowStripe).addClass(h), f._sRowStripe = h);
                }
                kt(t, "aoRowCallback", null, [ d, f._aData, n, l, c ]), e.push(d), n++;
            } else n = o.sZeroRecords, 1 == t.iDraw && "ajax" == Wt(t) ? n = o.sLoadingRecords : o.sEmptyTable && 0 === t.fnRecordsTotal() && (n = o.sEmptyTable), 
            e[0] = R("<tr/>", {
                "class": r ? a[0] : ""
            }).append(R("<td />", {
                valign: "top",
                colSpan: v(t),
                "class": t.oClasses.sRowEmpty
            }).html(n))[0];
            kt(t, "aoHeaderCallback", "header", [ R(t.nTHead).children("tr")[0], g(t), i, u, s ]), 
            kt(t, "aoFooterCallback", "footer", [ R(t.nTFoot).children("tr")[0], g(t), i, u, s ]), 
            (a = R(t.nTBody)).children().detach(), a.append(R(e)), kt(t, "aoDrawCallback", "draw", [ t ]), 
            t.bSorted = !1, t.bFiltered = !1, t.bDrawing = !1;
        }
    }
    function W(t, e) {
        var n = t.oFeatures, a = n.bFilter;
        n.bSort && _t(t), a ? $(t, t.oPreviousSearch) : t.aiDisplay = t.aiDisplayMaster.slice(), 
        !0 !== e && (t._iDisplayStart = 0), t._drawHold = e, M(t), t._drawHold = !1;
    }
    function E(t) {
        var e = t.oClasses, n = R(t.nTable), a = (n = R("<div/>").insertBefore(n), t.oFeatures), r = R("<div/>", {
            id: t.sTableId + "_wrapper",
            "class": e.sWrapper + (t.nTFoot ? "" : " " + e.sNoFooter)
        });
        t.nHolding = n[0], t.nTableWrapper = r[0], t.nTableReinsertBefore = t.nTable.nextSibling;
        for (var o, i, l, s, u, c, f = t.sDom.split(""), d = 0; d < f.length; d++) {
            if (o = null, "<" == (i = f[d])) {
                if (l = R("<div/>")[0], "'" == (s = f[d + 1]) || '"' == s) {
                    for (u = "", c = 2; f[d + c] != s; ) u += f[d + c], c++;
                    "H" == u ? u = e.sJUIHeader : "F" == u && (u = e.sJUIFooter), -1 != u.indexOf(".") ? (s = u.split("."), 
                    l.id = s[0].substr(1, s[0].length - 1), l.className = s[1]) : "#" == u.charAt(0) ? l.id = u.substr(1, u.length - 1) : l.className = u, 
                    d += c;
                }
                r.append(l), r = R(l);
            } else if (">" == i) r = r.parent(); else if ("l" == i && a.bPaginate && a.bLengthChange) o = st(t); else if ("f" == i && a.bFilter) o = G(t); else if ("r" == i && a.bProcessing) o = ft(t); else if ("t" == i) o = ht(t); else if ("i" == i && a.bInfo) o = nt(t); else if ("p" == i && a.bPaginate) o = ut(t); else if (0 !== te.ext.feature.length) for (c = 0, 
            s = (l = te.ext.feature).length; c < s; c++) if (i == l[c].cFeature) {
                o = l[c].fnInit(t);
                break;
            }
            o && ((l = t.aanFeatures)[i] || (l[i] = []), l[i].push(o), r.append(o));
        }
        n.replaceWith(r), t.nHolding = null;
    }
    function B(t, e) {
        var n, a, r, o, i, l, s, u, c, f, d = R(e).children("tr");
        for (t.splice(0, t.length), r = 0, l = d.length; r < l; r++) t.push([]);
        for (r = 0, l = d.length; r < l; r++) for (a = (n = d[r]).firstChild; a; ) {
            if ("TD" == a.nodeName.toUpperCase() || "TH" == a.nodeName.toUpperCase()) {
                for (u = (u = 1 * a.getAttribute("colspan")) && 0 !== u && 1 !== u ? u : 1, c = (c = 1 * a.getAttribute("rowspan")) && 0 !== c && 1 !== c ? c : 1, 
                o = 0, i = t[r]; i[o]; ) o++;
                for (s = o, f = 1 === u, i = 0; i < u; i++) for (o = 0; o < c; o++) t[r + o][s + i] = {
                    cell: a,
                    unique: f
                }, t[r + o].nTr = n;
            }
            a = a.nextSibling;
        }
    }
    function U(t, e, n) {
        var a = [];
        n || (n = t.aoHeader, e && B(n = [], e));
        e = 0;
        for (var r = n.length; e < r; e++) for (var o = 0, i = n[e].length; o < i; o++) !n[e][o].unique || a[o] && t.bSortCellsTop || (a[o] = n[e][o].cell);
        return a;
    }
    function V(a, t, e) {
        if (kt(a, "aoServerParams", "serverParams", [ t ]), t && R.isArray(t)) {
            var r = {}, o = /(.*?)\[\]$/;
            R.each(t, function(t, e) {
                var n = e.name.match(o);
                n ? (n = n[0], r[n] || (r[n] = []), r[n].push(e.value)) : r[e.name] = e.value;
            }), t = r;
        }
        function n(t) {
            kt(a, null, "xhr", [ a, t, a.jqXHR ]), e(t);
        }
        var i, l = a.ajax, s = a.oInstance;
        if (R.isPlainObject(l) && l.data) {
            var u = "function" == typeof (i = l.data) ? i(t, a) : i;
            t = "function" == typeof i && u ? u : R.extend(!0, t, u);
            delete l.data;
        }
        u = {
            data: t,
            success: function(t) {
                var e = t.error || t.sError;
                e && Pt(a, 0, e), a.json = t, n(t);
            },
            dataType: "json",
            cache: !1,
            type: a.sServerMethod,
            error: function(t, e) {
                var n = kt(a, null, "xhr", [ a, null, a.jqXHR ]);
                -1 === R.inArray(!0, n) && ("parsererror" == e ? Pt(a, 0, "Invalid JSON response", 1) : 4 === t.readyState && Pt(a, 0, "Ajax error", 7)), 
                dt(a, !1);
            }
        }, a.oAjaxData = t, kt(a, null, "preXhr", [ a, t ]), a.fnServerData ? a.fnServerData.call(s, a.sAjaxSource, R.map(t, function(t, e) {
            return {
                name: e,
                value: t
            };
        }), n, a) : a.sAjaxSource || "string" == typeof l ? a.jqXHR = R.ajax(R.extend(u, {
            url: l || a.sAjaxSource
        })) : "function" == typeof l ? a.jqXHR = l.call(s, t, n, a) : (a.jqXHR = R.ajax(R.extend(u, l)), 
        l.data = i);
    }
    function X(e) {
        return !e.bAjaxDataGet || (e.iDraw++, dt(e, !0), V(e, t(e), function(t) {
            J(e, t);
        }), !1);
    }
    function t(t) {
        var e, n, a, r, o = t.aoColumns, i = o.length, l = t.oFeatures, s = t.oPreviousSearch, u = t.aoPreSearchCols, c = [], f = yt(t);
        e = t._iDisplayStart, n = !1 !== l.bPaginate ? t._iDisplayLength : -1;
        function d(t, e) {
            c.push({
                name: t,
                value: e
            });
        }
        d("sEcho", t.iDraw), d("iColumns", i), d("sColumns", le(o, "sName").join(",")), 
        d("iDisplayStart", e), d("iDisplayLength", n);
        var h = {
            draw: t.iDraw,
            columns: [],
            order: [],
            start: e,
            length: n,
            search: {
                value: s.sSearch,
                regex: s.bRegex
            }
        };
        for (e = 0; e < i; e++) a = o[e], r = u[e], n = "function" == typeof a.mData ? "function" : a.mData, 
        h.columns.push({
            data: n,
            name: a.sName,
            searchable: a.bSearchable,
            orderable: a.bSortable,
            search: {
                value: r.sSearch,
                regex: r.bRegex
            }
        }), d("mDataProp_" + e, n), l.bFilter && (d("sSearch_" + e, r.sSearch), d("bRegex_" + e, r.bRegex), 
        d("bSearchable_" + e, a.bSearchable)), l.bSort && d("bSortable_" + e, a.bSortable);
        return l.bFilter && (d("sSearch", s.sSearch), d("bRegex", s.bRegex)), l.bSort && (R.each(f, function(t, e) {
            h.order.push({
                column: e.col,
                dir: e.dir
            }), d("iSortCol_" + t, e.col), d("sSortDir_" + t, e.dir);
        }), d("iSortingCols", f.length)), null === (o = te.ext.legacy.ajax) ? t.sAjaxSource ? c : h : o ? c : h;
    }
    function J(t, e) {
        var n = q(t, e), a = e.sEcho !== j ? e.sEcho : e.draw, r = e.iTotalRecords !== j ? e.iTotalRecords : e.recordsTotal, o = e.iTotalDisplayRecords !== j ? e.iTotalDisplayRecords : e.recordsFiltered;
        if (a) {
            if (1 * a < t.iDraw) return;
            t.iDraw = 1 * a;
        }
        for (l(t), t._iRecordsTotal = parseInt(r, 10), t._iRecordsDisplay = parseInt(o, 10), 
        a = 0, r = n.length; a < r; a++) F(t, n[a]);
        t.aiDisplay = t.aiDisplayMaster.slice(), t.bAjaxDataGet = !1, M(t), t._bInitComplete || it(t, e), 
        t.bAjaxDataGet = !0, dt(t, !1);
    }
    function q(t, e) {
        var n = R.isPlainObject(t.ajax) && t.ajax.dataSrc !== j ? t.ajax.dataSrc : t.sAjaxDataProp;
        return "data" === n ? e.aaData || e[n] : "" !== n ? k(n)(e) : e;
    }
    function G(n) {
        var t = n.oClasses, e = n.sTableId, a = n.oLanguage, r = n.oPreviousSearch, o = n.aanFeatures, i = '<input type="search" class="' + t.sFilterInput + '"/>', l = (l = a.sSearch).match(/_INPUT_/) ? l.replace("_INPUT_", i) : l + i, s = (t = R("<div/>", {
            id: o.f ? null : e + "_filter",
            "class": t.sFilter
        }).append(R("<label/>").append(l)), o = function() {
            var t = this.value ? this.value : "";
            t != r.sSearch && ($(n, {
                sSearch: t,
                bRegex: r.bRegex,
                bSmart: r.bSmart,
                bCaseInsensitive: r.bCaseInsensitive
            }), n._iDisplayStart = 0, M(n));
        }, i = null !== n.searchDelay ? n.searchDelay : "ssp" === Wt(n) ? 400 : 0, R("input", t).val(r.sSearch).attr("placeholder", a.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", i ? be(o, i) : o).on("keypress.DT", function(t) {
            if (13 == t.keyCode) return !1;
        }).attr("aria-controls", e));
        return R(n.nTable).on("search.dt.DT", function(t, e) {
            if (n === e) try {
                s[0] !== S.activeElement && s.val(r.sSearch);
            } catch (t) {}
        }), t[0];
    }
    function $(t, e, n) {
        function a(t) {
            r.sSearch = t.sSearch, r.bRegex = t.bRegex, r.bSmart = t.bSmart, r.bCaseInsensitive = t.bCaseInsensitive;
        }
        var r = t.oPreviousSearch, o = t.aoPreSearchCols;
        if (i(t), "ssp" != Wt(t)) {
            for (Z(t, e.sSearch, n, e.bEscapeRegex !== j ? !e.bEscapeRegex : e.bRegex, e.bSmart, e.bCaseInsensitive), 
            a(e), e = 0; e < o.length; e++) Y(t, o[e].sSearch, e, o[e].bEscapeRegex !== j ? !o[e].bEscapeRegex : o[e].bRegex, o[e].bSmart, o[e].bCaseInsensitive);
            z(t);
        } else a(e);
        t.bFiltered = !0, kt(t, null, "search", [ t ]);
    }
    function z(t) {
        for (var e, n, a = te.ext.search, r = t.aiDisplay, o = 0, i = a.length; o < i; o++) {
            for (var l = [], s = 0, u = r.length; s < u; s++) n = r[s], e = t.aoData[n], a[o](t, e._aFilterData, n, e._aData, s) && l.push(n);
            r.length = 0, R.merge(r, l);
        }
    }
    function Y(t, e, n, a, r, o) {
        if ("" !== e) {
            var i = [], l = t.aiDisplay;
            for (a = Q(e, a, r, o), r = 0; r < l.length; r++) e = t.aoData[l[r]]._aFilterData[n], 
            a.test(e) && i.push(l[r]);
            t.aiDisplay = i;
        }
    }
    function Z(t, e, n, a, r, o) {
        a = Q(e, a, r, o), o = t.oPreviousSearch.sSearch;
        var i, l = t.aiDisplayMaster;
        r = [];
        if (0 !== te.ext.search.length && (n = !0), i = K(t), e.length <= 0) t.aiDisplay = l.slice(); else {
            for ((i || n || o.length > e.length || 0 !== e.indexOf(o) || t.bSorted) && (t.aiDisplay = l.slice()), 
            e = t.aiDisplay, n = 0; n < e.length; n++) a.test(t.aoData[e[n]]._sFilterRow) && r.push(e[n]);
            t.aiDisplay = r;
        }
    }
    function Q(t, e, n, a) {
        return t = e ? t : de(t), n && (t = "^(?=.*?" + R.map(t.match(/"[^"]+"|[^ ]+/g) || [ "" ], function(t) {
            if ('"' === t.charAt(0)) {
                var e = t.match(/^"(.*)"$/);
                t = e ? e[1] : t;
            }
            return t.replace('"', "");
        }).join(")(?=.*?") + ").*$"), RegExp(t, a ? "i" : "");
    }
    function K(t) {
        var e, n, a, r, o, i, l, s, u = t.aoColumns, c = te.ext.type.search;
        for (e = !1, n = 0, r = t.aoData.length; n < r; n++) if (!(s = t.aoData[n])._aFilterData) {
            for (i = [], a = 0, o = u.length; a < o; a++) (e = u[a]).bSearchable ? (l = P(t, n, a, "filter"), 
            c[e.sType] && (l = c[e.sType](l)), null === l && (l = ""), "string" != typeof l && l.toString && (l = l.toString())) : l = "", 
            l.indexOf && -1 !== l.indexOf("&") && (he.innerHTML = l, l = pe ? he.textContent : he.innerText), 
            l.replace && (l = l.replace(/[\r\n]/g, "")), i.push(l);
            s._aFilterData = i, s._sFilterRow = i.join("  "), e = !0;
        }
        return e;
    }
    function tt(t) {
        return {
            search: t.sSearch,
            smart: t.bSmart,
            regex: t.bRegex,
            caseInsensitive: t.bCaseInsensitive
        };
    }
    function et(t) {
        return {
            sSearch: t.search,
            bSmart: t.smart,
            bRegex: t.regex,
            bCaseInsensitive: t.caseInsensitive
        };
    }
    function nt(t) {
        var e = t.sTableId, n = t.aanFeatures.i, a = R("<div/>", {
            "class": t.oClasses.sInfo,
            id: n ? null : e + "_info"
        });
        return n || (t.aoDrawCallback.push({
            fn: at,
            sName: "information"
        }), a.attr("role", "status").attr("aria-live", "polite"), R(t.nTable).attr("aria-describedby", e + "_info")), 
        a[0];
    }
    function at(t) {
        var e = t.aanFeatures.i;
        if (0 !== e.length) {
            var n = t.oLanguage, a = t._iDisplayStart + 1, r = t.fnDisplayEnd(), o = t.fnRecordsTotal(), i = t.fnRecordsDisplay(), l = i ? n.sInfo : n.sInfoEmpty;
            i !== o && (l += " " + n.sInfoFiltered), l = rt(t, l += n.sInfoPostFix), null !== (n = n.fnInfoCallback) && (l = n.call(t.oInstance, t, a, r, o, i, l)), 
            R(e).html(l);
        }
    }
    function rt(t, e) {
        var n = t.fnFormatNumber, a = t._iDisplayStart + 1, r = t._iDisplayLength, o = t.fnRecordsDisplay(), i = -1 === r;
        return e.replace(/_START_/g, n.call(t, a)).replace(/_END_/g, n.call(t, t.fnDisplayEnd())).replace(/_MAX_/g, n.call(t, t.fnRecordsTotal())).replace(/_TOTAL_/g, n.call(t, o)).replace(/_PAGE_/g, n.call(t, i ? 1 : Math.ceil(a / r))).replace(/_PAGES_/g, n.call(t, i ? 1 : Math.ceil(o / r)));
    }
    function ot(n) {
        var a, t, e, r = n.iInitDisplayStart, o = n.aoColumns;
        t = n.oFeatures;
        var i = n.bDeferLoading;
        if (n.bInitialised) {
            for (E(n), h(n), O(n, n.aoHeader), O(n, n.aoFooter), dt(n, !0), t.bAutoWidth && bt(n), 
            a = 0, t = o.length; a < t; a++) (e = o[a]).sWidth && (e.nTh.style.width = Dt(e.sWidth));
            kt(n, null, "preInit", [ n ]), W(n), "ssp" == (o = Wt(n)) && !i || ("ajax" == o ? V(n, [], function(t) {
                var e = q(n, t);
                for (a = 0; a < e.length; a++) F(n, e[a]);
                n.iInitDisplayStart = r, W(n), dt(n, !1), it(n, t);
            }) : (dt(n, !1), it(n)));
        } else setTimeout(function() {
            ot(n);
        }, 200);
    }
    function it(t, e) {
        t._bInitComplete = !0, (e || t.oInit.aaData) && N(t), kt(t, null, "plugin-init", [ t, e ]), 
        kt(t, "aoInitComplete", "init", [ t, e ]);
    }
    function lt(t, e) {
        var n = parseInt(e, 10);
        t._iDisplayLength = n, Ot(t), kt(t, null, "length", [ t, n ]);
    }
    function st(a) {
        for (var t = a.oClasses, e = a.sTableId, n = a.aLengthMenu, r = (o = R.isArray(n[0])) ? n[0] : n, o = (n = o ? n[1] : n, 
        R("<select/>", {
            name: e + "_length",
            "aria-controls": e,
            "class": t.sLengthSelect
        })), i = 0, l = r.length; i < l; i++) o[0][i] = new Option("number" == typeof n[i] ? a.fnFormatNumber(n[i]) : n[i], r[i]);
        var s = R("<div><label/></div>").addClass(t.sLength);
        return a.aanFeatures.l || (s[0].id = e + "_length"), s.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", o[0].outerHTML)), 
        R("select", s).val(a._iDisplayLength).on("change.DT", function() {
            lt(a, R(this).val()), M(a);
        }), R(a.nTable).on("length.dt.DT", function(t, e, n) {
            a === e && R("select", s).val(n);
        }), s[0];
    }
    function ut(t) {
        function i(t) {
            M(t);
        }
        var e = t.sPaginationType, l = te.ext.pager[e], s = "function" == typeof l, u = (e = R("<div/>").addClass(t.oClasses.sPaging + e)[0], 
        t.aanFeatures);
        return s || l.fnInit(t, e, i), u.p || (e.id = t.sTableId + "_paginate", t.aoDrawCallback.push({
            fn: function(t) {
                if (s) {
                    var e, n = t._iDisplayStart, a = t._iDisplayLength, r = t.fnRecordsDisplay(), o = (n = (o = -1 === a) ? 0 : Math.ceil(n / a), 
                    a = o ? 1 : Math.ceil(r / a), r = l(n, a), 0);
                    for (e = u.p.length; o < e; o++) Mt(t, "pageButton")(t, u.p[o], o, r, n, a);
                } else l.fnUpdate(t, i);
            },
            sName: "pagination"
        })), e;
    }
    function ct(t, e, n) {
        var a = t._iDisplayStart, r = t._iDisplayLength, o = t.fnRecordsDisplay();
        return 0 === o || -1 === r ? a = 0 : "number" == typeof e ? o < (a = e * r) && (a = 0) : "first" == e ? a = 0 : "previous" == e ? (a = 0 <= r ? a - r : 0) < 0 && (a = 0) : "next" == e ? a + r < o && (a += r) : "last" == e ? a = Math.floor((o - 1) / r) * r : Pt(t, 0, "Unknown paging action: " + e, 5), 
        e = t._iDisplayStart !== a, t._iDisplayStart = a, e && (kt(t, null, "page", [ t ]), 
        n && M(t)), e;
    }
    function ft(t) {
        return R("<div/>", {
            id: t.aanFeatures.r ? null : t.sTableId + "_processing",
            "class": t.oClasses.sProcessing
        }).html(t.oLanguage.sProcessing).insertBefore(t.nTable)[0];
    }
    function dt(t, e) {
        t.oFeatures.bProcessing && R(t.aanFeatures.r).css("display", e ? "block" : "none"), 
        kt(t, null, "processing", [ t, e ]);
    }
    function ht(t) {
        (c = R(t.nTable)).attr("role", "grid");
        var e = t.oScroll;
        if ("" === e.sX && "" === e.sY) return t.nTable;
        var n = e.sX, a = e.sY, r = t.oClasses, o = c.children("caption"), i = o.length ? o[0]._captionSide : null, l = R(c[0].cloneNode(!1)), s = R(c[0].cloneNode(!1)), u = c.children("tfoot");
        u.length || (u = null), l = R("<div/>", {
            "class": r.sScrollWrapper
        }).append(R("<div/>", {
            "class": r.sScrollHead
        }).css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: n ? n ? Dt(n) : null : "100%"
        }).append(R("<div/>", {
            "class": r.sScrollHeadInner
        }).css({
            "box-sizing": "content-box",
            width: e.sXInner || "100%"
        }).append(l.removeAttr("id").css("margin-left", 0).append("top" === i ? o : null).append(c.children("thead"))))).append(R("<div/>", {
            "class": r.sScrollBody
        }).css({
            position: "relative",
            overflow: "auto",
            width: n ? Dt(n) : null
        }).append(c)), u && l.append(R("<div/>", {
            "class": r.sScrollFoot
        }).css({
            overflow: "hidden",
            border: 0,
            width: n ? n ? Dt(n) : null : "100%"
        }).append(R("<div/>", {
            "class": r.sScrollFootInner
        }).append(s.removeAttr("id").css("margin-left", 0).append("bottom" === i ? o : null).append(c.children("tfoot")))));
        var c, f = (c = l.children())[0], d = (r = c[1], u ? c[2] : null);
        return n && R(r).on("scroll.DT", function() {
            var t = this.scrollLeft;
            f.scrollLeft = t, u && (d.scrollLeft = t);
        }), R(r).css(a && e.bCollapse ? "max-height" : "height", a), t.nScrollHead = f, 
        t.nScrollBody = r, t.nScrollFoot = d, t.aoDrawCallback.push({
            fn: pt,
            sName: "scrolling"
        }), l[0];
    }
    function pt(n) {
        function t(t) {
            (t = t.style).paddingTop = "0", t.paddingBottom = "0", t.borderTopWidth = "0", t.borderBottomWidth = "0", 
            t.height = 0;
        }
        var e, a, r, o, i, l = (c = n.oScroll).sX, s = c.sXInner, u = c.sY, c = c.iBarWidth, f = R(n.nScrollHead), d = f[0].style, h = (g = f.children("div"))[0].style, p = g.children("table"), g = n.nScrollBody, b = R(g), m = g.style, S = R(n.nScrollFoot).children("div"), v = S.children("table"), D = R(n.nTHead), y = R(n.nTable), _ = y[0], T = _.style, w = n.nTFoot ? R(n.nTFoot) : null, C = n.oBrowser, x = C.bScrollOversize, I = le(n.aoColumns, "nTh"), A = [], F = [], L = [], P = [];
        a = g.scrollHeight > g.clientHeight, n.scrollBarVis !== a && n.scrollBarVis !== j ? (n.scrollBarVis = a, 
        N(n)) : (n.scrollBarVis = a, y.children("thead, tfoot").remove(), w && (r = w.clone().prependTo(y), 
        e = w.find("tr"), r = r.find("tr")), o = D.clone().prependTo(y), D = D.find("tr"), 
        a = o.find("tr"), o.find("th, td").removeAttr("tabindex"), l || (m.width = "100%", 
        f[0].style.width = "100%"), R.each(U(n, o), function(t, e) {
            i = H(n, t), e.style.width = n.aoColumns[i].sWidth;
        }), w && gt(function(t) {
            t.style.width = "";
        }, r), f = y.outerWidth(), "" === l ? (T.width = "100%", x && (y.find("tbody").height() > g.offsetHeight || "scroll" == b.css("overflow-y")) && (T.width = Dt(y.outerWidth() - c)), 
        f = y.outerWidth()) : "" !== s && (T.width = Dt(s), f = y.outerWidth()), gt(t, a), 
        gt(function(t) {
            L.push(t.innerHTML), A.push(Dt(R(t).css("width")));
        }, a), gt(function(t, e) {
            -1 !== R.inArray(t, I) && (t.style.width = A[e]);
        }, D), R(a).height(0), w && (gt(t, r), gt(function(t) {
            P.push(t.innerHTML), F.push(Dt(R(t).css("width")));
        }, r), gt(function(t, e) {
            t.style.width = F[e];
        }, e), R(r).height(0)), gt(function(t, e) {
            t.innerHTML = '<div class="dataTables_sizing">' + L[e] + "</div>", t.childNodes[0].style.height = "0", 
            t.childNodes[0].style.overflow = "hidden", t.style.width = A[e];
        }, a), w && gt(function(t, e) {
            t.innerHTML = '<div class="dataTables_sizing">' + P[e] + "</div>", t.childNodes[0].style.height = "0", 
            t.childNodes[0].style.overflow = "hidden", t.style.width = F[e];
        }, r), y.outerWidth() < f ? (e = g.scrollHeight > g.offsetHeight || "scroll" == b.css("overflow-y") ? f + c : f, 
        x && (g.scrollHeight > g.offsetHeight || "scroll" == b.css("overflow-y")) && (T.width = Dt(e - c)), 
        "" !== l && "" === s || Pt(n, 1, "Possible column misalignment", 6)) : e = "100%", 
        m.width = Dt(e), d.width = Dt(e), w && (n.nScrollFoot.style.width = Dt(e)), !u && x && (m.height = Dt(_.offsetHeight + c)), 
        l = y.outerWidth(), p[0].style.width = Dt(l), h.width = Dt(l), s = y.height() > g.clientHeight || "scroll" == b.css("overflow-y"), 
        h[u = "padding" + (C.bScrollbarLeft ? "Left" : "Right")] = s ? c + "px" : "0px", 
        w && (v[0].style.width = Dt(l), S[0].style.width = Dt(l), S[0].style[u] = s ? c + "px" : "0px"), 
        y.children("colgroup").insertBefore(y.children("thead")), b.scroll(), !n.bSorted && !n.bFiltered || n._drawHold || (g.scrollTop = 0));
    }
    function gt(t, e, n) {
        for (var a, r, o = 0, i = 0, l = e.length; i < l; ) {
            for (a = e[i].firstChild, r = n ? n[i].firstChild : null; a; ) 1 === a.nodeType && (n ? t(a, r, o) : t(a, o), 
            o++), a = a.nextSibling, r = n ? r.nextSibling : null;
            i++;
        }
    }
    function bt(t) {
        var e, n, a = t.nTable, r = t.aoColumns, o = (g = t.oScroll).sY, i = g.sX, l = g.sXInner, s = r.length, u = I(t, "bVisible"), c = R("th", t.nTHead), f = a.getAttribute("width"), d = a.parentNode, h = !1, p = t.oBrowser, g = p.bScrollOversize;
        for ((e = a.style.width) && -1 !== e.indexOf("%") && (f = e), e = 0; e < u.length; e++) null !== (n = r[u[e]]).sWidth && (n.sWidth = mt(n.sWidthOrig, d), 
        h = !0);
        if (g || !h && !i && !o && s == v(t) && s == c.length) for (e = 0; e < s; e++) null !== (u = H(t, e)) && (r[u].sWidth = Dt(c.eq(e).width())); else {
            (s = R(a).clone().css("visibility", "hidden").removeAttr("id")).find("tbody tr").remove();
            var b = R("<tr/>").appendTo(s.find("tbody"));
            for (s.find("thead, tfoot").remove(), s.append(R(t.nTHead).clone()).append(R(t.nTFoot).clone()), 
            s.find("tfoot th, tfoot td").css("width", ""), c = U(t, s.find("thead")[0]), e = 0; e < u.length; e++) n = r[u[e]], 
            c[e].style.width = null !== n.sWidthOrig && "" !== n.sWidthOrig ? Dt(n.sWidthOrig) : "", 
            n.sWidthOrig && i && R(c[e]).append(R("<div/>").css({
                width: n.sWidthOrig,
                margin: 0,
                padding: 0,
                border: 0,
                height: 1
            }));
            if (t.aoData.length) for (e = 0; e < u.length; e++) n = r[h = u[e]], R(St(t, h)).clone(!1).append(n.sContentPadding).appendTo(b);
            for (R("[name]", s).removeAttr("name"), n = R("<div/>").css(i || o ? {
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                right: 0,
                overflow: "hidden"
            } : {}).append(s).appendTo(d), i && l ? s.width(l) : i ? (s.css("width", "auto"), 
            s.removeAttr("width"), s.width() < d.clientWidth && f && s.width(d.clientWidth)) : o ? s.width(d.clientWidth) : f && s.width(f), 
            e = o = 0; e < u.length; e++) l = (d = R(c[e])).outerWidth() - d.width(), o += d = p.bBounding ? Math.ceil(c[e].getBoundingClientRect().width) : d.outerWidth(), 
            r[u[e]].sWidth = Dt(d - l);
            a.style.width = Dt(o), n.remove();
        }
        f && (a.style.width = Dt(f)), !f && !i || t._reszEvt || (a = function() {
            R(m).on("resize.DT-" + t.sInstance, be(function() {
                N(t);
            }));
        }, g ? setTimeout(a, 1e3) : a(), t._reszEvt = !0);
    }
    function mt(t, e) {
        if (!t) return 0;
        var n = R("<div/>").css("width", Dt(t)).appendTo(e || S.body), a = n[0].offsetWidth;
        return n.remove(), a;
    }
    function St(t, e) {
        var n = vt(t, e);
        if (n < 0) return null;
        var a = t.aoData[n];
        return a.nTr ? a.anCells[e] : R("<td/>").html(P(t, n, e, "display"))[0];
    }
    function vt(t, e) {
        for (var n, a = -1, r = -1, o = 0, i = t.aoData.length; o < i; o++) (n = (n = (n = P(t, o, e, "display") + "").replace(ge, "")).replace(/&nbsp;/g, " ")).length > a && (a = n.length, 
        r = o);
        return r;
    }
    function Dt(t) {
        return null === t ? "0px" : "number" == typeof t ? t < 0 ? "0px" : t + "px" : t.match(/\d$/) ? t + "px" : t;
    }
    function yt(t) {
        var e, n, a, r, o, i, l = [], s = t.aoColumns;
        e = t.aaSortingFixed, n = R.isPlainObject(e);
        var u = [];
        for (a = function(t) {
            t.length && !R.isArray(t[0]) ? u.push(t) : R.merge(u, t);
        }, R.isArray(e) && a(e), n && e.pre && a(e.pre), a(t.aaSorting), n && e.post && a(e.post), 
        t = 0; t < u.length; t++) for (e = 0, n = (a = s[i = u[t][0]].aDataSort).length; e < n; e++) o = s[r = a[e]].sType || "string", 
        u[t]._idx === j && (u[t]._idx = R.inArray(u[t][1], s[r].asSorting)), l.push({
            src: i,
            col: r,
            dir: u[t][1],
            index: u[t]._idx,
            type: o,
            formatter: te.ext.type.order[o + "-pre"]
        });
        return l;
    }
    function _t(t) {
        var e, n, a, u, c = [], f = te.ext.type.order, d = t.aoData, r = 0, o = t.aiDisplayMaster;
        for (i(t), e = 0, n = (u = yt(t)).length; e < n; e++) (a = u[e]).formatter && r++, 
        It(t, a.col);
        if ("ssp" != Wt(t) && 0 !== u.length) {
            for (e = 0, n = o.length; e < n; e++) c[o[e]] = e;
            r === u.length ? o.sort(function(t, e) {
                var n, a, r, o, i = u.length, l = d[t]._aSortData, s = d[e]._aSortData;
                for (r = 0; r < i; r++) if (0 !== (n = (n = l[(o = u[r]).col]) < (a = s[o.col]) ? -1 : a < n ? 1 : 0)) return "asc" === o.dir ? n : -n;
                return (n = c[t]) < (a = c[e]) ? -1 : a < n ? 1 : 0;
            }) : o.sort(function(t, e) {
                var n, a, r, o, i = u.length, l = d[t]._aSortData, s = d[e]._aSortData;
                for (r = 0; r < i; r++) if (n = l[(o = u[r]).col], a = s[o.col], 0 !== (n = (o = f[o.type + "-" + o.dir] || f["string-" + o.dir])(n, a))) return n;
                return (n = c[t]) < (a = c[e]) ? -1 : a < n ? 1 : 0;
            });
        }
        t.bSorted = !0;
    }
    function Tt(t) {
        for (var e, n, a = t.aoColumns, r = yt(t), o = (t = t.oLanguage.oAria, 0), i = a.length; o < i; o++) {
            var l = (n = a[o]).asSorting;
            e = n.sTitle.replace(/<.*?>/g, "");
            var s = n.nTh;
            s.removeAttribute("aria-sort"), n.bSortable && (e += "asc" === (n = 0 < r.length && r[0].col == o ? (s.setAttribute("aria-sort", "asc" == r[0].dir ? "ascending" : "descending"), 
            l[r[0].index + 1] || l[0]) : l[0]) ? t.sSortAscending : t.sSortDescending), s.setAttribute("aria-label", e);
        }
    }
    function wt(t, e, n, a) {
        function r(t, e) {
            var n = t._idx;
            return n === j && (n = R.inArray(t[1], i)), n + 1 < i.length ? n + 1 : e ? null : 0;
        }
        var o = t.aaSorting, i = t.aoColumns[e].asSorting;
        "number" == typeof o[0] && (o = t.aaSorting = [ o ]), n && t.oFeatures.bSortMulti ? -1 !== (n = R.inArray(e, le(o, "0"))) ? (null === (e = r(o[n], !0)) && 1 === o.length && (e = 0), 
        null === e ? o.splice(n, 1) : (o[n][1] = i[e], o[n]._idx = e)) : (o.push([ e, i[0], 0 ]), 
        o[o.length - 1]._idx = 0) : o.length && o[0][0] == e ? (e = r(o[0]), o.length = 1, 
        o[0][1] = i[e], o[0]._idx = e) : (o.length = 0, o.push([ e, i[0] ]), o[0]._idx = 0), 
        W(t), "function" == typeof a && a(t);
    }
    function Ct(e, t, n, a) {
        var r = e.aoColumns[n];
        Nt(t, {}, function(t) {
            !1 !== r.bSortable && (e.oFeatures.bProcessing ? (dt(e, !0), setTimeout(function() {
                wt(e, n, t.shiftKey, a), "ssp" !== Wt(e) && dt(e, !1);
            }, 0)) : wt(e, n, t.shiftKey, a));
        });
    }
    function xt(t) {
        var e, n, a = t.aLastSort, r = t.oClasses.sSortColumn, o = yt(t), i = t.oFeatures;
        if (i.bSort && i.bSortClasses) {
            for (i = 0, e = a.length; i < e; i++) n = a[i].src, R(le(t.aoData, "anCells", n)).removeClass(r + (i < 2 ? i + 1 : 3));
            for (i = 0, e = o.length; i < e; i++) n = o[i].src, R(le(t.aoData, "anCells", n)).addClass(r + (i < 2 ? i + 1 : 3));
        }
        t.aLastSort = o;
    }
    function It(t, e) {
        var n, a = t.aoColumns[e], r = te.ext.order[a.sSortDataType];
        r && (n = r.call(t.oInstance, t, e, u(t, e)));
        for (var o, i = te.ext.type.order[a.sType + "-pre"], l = 0, s = t.aoData.length; l < s; l++) (a = t.aoData[l])._aSortData || (a._aSortData = []), 
        a._aSortData[e] && !r || (o = r ? n[l] : P(t, l, e, "sort"), a._aSortData[e] = i ? i(o) : o);
    }
    function At(n) {
        if (n.oFeatures.bStateSave && !n.bDestroying) {
            var t = {
                time: +new Date(),
                start: n._iDisplayStart,
                length: n._iDisplayLength,
                order: R.extend(!0, [], n.aaSorting),
                search: tt(n.oPreviousSearch),
                columns: R.map(n.aoColumns, function(t, e) {
                    return {
                        visible: t.bVisible,
                        search: tt(n.aoPreSearchCols[e])
                    };
                })
            };
            kt(n, "aoStateSaveParams", "stateSaveParams", [ n, t ]), n.oSavedState = t, n.fnStateSaveCallback.call(n.oInstance, n, t);
        }
    }
    function Ft(n, t, a) {
        var r, o, i = n.aoColumns;
        t = function(t) {
            if (t && t.time) {
                var e = kt(n, "aoStateLoadParams", "stateLoadParams", [ n, t ]);
                if (-1 === R.inArray(!1, e) && !(0 < (e = n.iStateDuration) && t.time < +new Date() - 1e3 * e || t.columns && i.length !== t.columns.length)) {
                    if (n.oLoadedState = R.extend(!0, {}, t), t.start !== j && (n._iDisplayStart = t.start, 
                    n.iInitDisplayStart = t.start), t.length !== j && (n._iDisplayLength = t.length), 
                    t.order !== j && (n.aaSorting = [], R.each(t.order, function(t, e) {
                        n.aaSorting.push(e[0] >= i.length ? [ 0, e[1] ] : e);
                    })), t.search !== j && R.extend(n.oPreviousSearch, et(t.search)), t.columns) for (r = 0, 
                    o = t.columns.length; r < o; r++) (e = t.columns[r]).visible !== j && (i[r].bVisible = e.visible), 
                    e.search !== j && R.extend(n.aoPreSearchCols[r], et(e.search));
                    kt(n, "aoStateLoaded", "stateLoaded", [ n, t ]);
                }
            }
            a();
        };
        if (n.oFeatures.bStateSave) {
            var e = n.fnStateLoadCallback.call(n.oInstance, n, t);
            e !== j && t(e);
        } else a();
    }
    function Lt(t) {
        var e = te.settings;
        return -1 !== (t = R.inArray(t, le(e, "nTable"))) ? e[t] : null;
    }
    function Pt(t, e, n, a) {
        if (n = "DataTables warning: " + (t ? "table id=" + t.sTableId + " - " : "") + n, 
        a && (n += ". For more information about this error, please see http://datatables.net/tn/" + a), 
        e) m.console && console.log && console.log(n); else if (e = (e = te.ext).sErrMode || e.errMode, 
        t && kt(t, null, "error", [ t, a, n ]), "alert" == e) alert(n); else {
            if ("throw" == e) throw Error(n);
            "function" == typeof e && e(t, a, n);
        }
    }
    function Rt(n, a, t, e) {
        R.isArray(t) ? R.each(t, function(t, e) {
            R.isArray(e) ? Rt(n, a, e[0], e[1]) : Rt(n, a, e);
        }) : (e === j && (e = t), a[t] !== j && (n[e] = a[t]));
    }
    function jt(t, e, n) {
        var a, r;
        for (r in e) e.hasOwnProperty(r) && (a = e[r], R.isPlainObject(a) ? (R.isPlainObject(t[r]) || (t[r] = {}), 
        R.extend(!0, t[r], a)) : t[r] = n && "data" !== r && "aaData" !== r && R.isArray(a) ? a.slice() : a);
        return t;
    }
    function Nt(e, t, n) {
        R(e).on("click.DT", t, function(t) {
            R(e).blur(), n(t);
        }).on("keypress.DT", t, function(t) {
            13 === t.which && (t.preventDefault(), n(t));
        }).on("selectstart.DT", function() {
            return !1;
        });
    }
    function Ht(t, e, n, a) {
        n && t[e].push({
            fn: n,
            sName: a
        });
    }
    function kt(e, t, n, a) {
        var r = [];
        return t && (r = R.map(e[t].slice().reverse(), function(t) {
            return t.fn.apply(e.oInstance, a);
        })), null !== n && (t = R.Event(n + ".dt"), R(e.nTable).trigger(t, a), r.push(t.result)), 
        r;
    }
    function Ot(t) {
        var e = t._iDisplayStart, n = t.fnDisplayEnd(), a = t._iDisplayLength;
        n <= e && (e = n - a), e -= e % a, (-1 === a || e < 0) && (e = 0), t._iDisplayStart = e;
    }
    function Mt(t, e) {
        var n = t.renderer, a = te.ext.renderer[e];
        return R.isPlainObject(n) && n[e] ? a[n[e]] || a._ : "string" == typeof n && a[n] || a._;
    }
    function Wt(t) {
        return t.oFeatures.bServerSide ? "ssp" : t.ajax || t.sAjaxSource ? "ajax" : "dom";
    }
    function Et(t, e) {
        var n = [], a = (n = Ae.numbers_length, Math.floor(n / 2));
        return e <= n ? n = $t(0, e) : t <= a ? ((n = $t(0, n - 2)).push("ellipsis"), n.push(e - 1)) : (e - 1 - a <= t ? n = $t(e - (n - 2), e) : ((n = $t(t - a + 2, t + a - 1)).push("ellipsis"), 
        n.push(e - 1)), n.splice(0, 0, "ellipsis"), n.splice(0, 0, 0)), n.DT_el = "span", 
        n;
    }
    function Bt(n) {
        R.each({
            num: function(t) {
                return Fe(t, n);
            },
            "num-fmt": function(t) {
                return Fe(t, n, ie);
            },
            "html-num": function(t) {
                return Fe(t, n, ae);
            },
            "html-num-fmt": function(t) {
                return Fe(t, n, ae, ie);
            }
        }, function(t, e) {
            Yt.type.order[t + n + "-pre"] = e, t.match(/^html\-/) && (Yt.type.search[t + n] = Yt.type.search.html);
        });
    }
    function e(e) {
        return function() {
            var t = [ Lt(this[te.ext.iApiIndex]) ].concat(Array.prototype.slice.call(arguments));
            return te.ext.internal[e].apply(this, t);
        };
    }
    function Ut(t) {
        return !t || !0 === t || "-" === t;
    }
    function Vt(t) {
        var e = parseInt(t, 10);
        return !isNaN(e) && isFinite(t) ? e : null;
    }
    function Xt(t, e) {
        return ee[e] || (ee[e] = RegExp(de(e), "g")), "string" == typeof t && "." !== e ? t.replace(/\./g, "").replace(ee[e], ".") : t;
    }
    function Jt(t, e, n) {
        var a = "string" == typeof t;
        return !!Ut(t) || (e && a && (t = Xt(t, e)), n && a && (t = t.replace(ie, "")), 
        !isNaN(parseFloat(t)) && isFinite(t));
    }
    function qt(t, e, n) {
        return !!Ut(t) || ((Ut(t) || "string" == typeof t) && !!Jt(t.replace(ae, ""), e, n) || null);
    }
    function Gt(t, e, n, a) {
        var r = [], o = 0, i = e.length;
        if (a !== j) for (;o < i; o++) t[e[o]][n] && r.push(t[e[o]][n][a]); else for (;o < i; o++) r.push(t[e[o]][n]);
        return r;
    }
    function $t(t, e) {
        var n, a = [];
        e === j ? (e = 0, n = t) : (n = e, e = t);
        for (var r = e; r < n; r++) a.push(r);
        return a;
    }
    function zt(t) {
        for (var e = [], n = 0, a = t.length; n < a; n++) t[n] && e.push(t[n]);
        return e;
    }
    var Yt, Zt, Qt, Kt, te = function(b) {
        this.$ = function(t, e) {
            return this.api(!0).$(t, e);
        }, this._ = function(t, e) {
            return this.api(!0).rows(t, e).data();
        }, this.api = function(t) {
            return new Zt(t ? Lt(this[Yt.iApiIndex]) : this);
        }, this.fnAddData = function(t, e) {
            var n = this.api(!0), a = R.isArray(t) && (R.isArray(t[0]) || R.isPlainObject(t[0])) ? n.rows.add(t) : n.row.add(t);
            return e !== j && !e || n.draw(), a.flatten().toArray();
        }, this.fnAdjustColumnSizing = function(t) {
            var e = this.api(!0).columns.adjust(), n = e.settings()[0], a = n.oScroll;
            t === j || t ? e.draw(!1) : "" === a.sX && "" === a.sY || pt(n);
        }, this.fnClearTable = function(t) {
            var e = this.api(!0).clear();
            t !== j && !t || e.draw();
        }, this.fnClose = function(t) {
            this.api(!0).row(t).child.hide();
        }, this.fnDeleteRow = function(t, e, n) {
            var a = this.api(!0), r = (t = a.rows(t)).settings()[0], o = r.aoData[t[0][0]];
            return t.remove(), e && e.call(this, r, o), n !== j && !n || a.draw(), o;
        }, this.fnDestroy = function(t) {
            this.api(!0).destroy(t);
        }, this.fnDraw = function(t) {
            this.api(!0).draw(t);
        }, this.fnFilter = function(t, e, n, a, r, o) {
            r = this.api(!0), null === e || e === j ? r.search(t, n, a, o) : r.column(e).search(t, n, a, o), 
            r.draw();
        }, this.fnGetData = function(t, e) {
            var n = this.api(!0);
            if (t === j) return n.data().toArray();
            var a = t.nodeName ? t.nodeName.toLowerCase() : "";
            return e !== j || "td" == a || "th" == a ? n.cell(t, e).data() : n.row(t).data() || null;
        }, this.fnGetNodes = function(t) {
            var e = this.api(!0);
            return t !== j ? e.row(t).node() : e.rows().nodes().flatten().toArray();
        }, this.fnGetPosition = function(t) {
            var e = this.api(!0), n = t.nodeName.toUpperCase();
            return "TR" == n ? e.row(t).index() : "TD" == n || "TH" == n ? [ (t = e.cell(t).index()).row, t.columnVisible, t.column ] : null;
        }, this.fnIsOpen = function(t) {
            return this.api(!0).row(t).child.isShown();
        }, this.fnOpen = function(t, e, n) {
            return this.api(!0).row(t).child(e, n).show().child()[0];
        }, this.fnPageChange = function(t, e) {
            var n = this.api(!0).page(t);
            e !== j && !e || n.draw(!1);
        }, this.fnSetColumnVis = function(t, e, n) {
            t = this.api(!0).column(t).visible(e), n !== j && !n || t.columns.adjust().draw();
        }, this.fnSettings = function() {
            return Lt(this[Yt.iApiIndex]);
        }, this.fnSort = function(t) {
            this.api(!0).order(t).draw();
        }, this.fnSortListener = function(t, e, n) {
            this.api(!0).order.listener(t, e, n);
        }, this.fnUpdate = function(t, e, n, a, r) {
            var o = this.api(!0);
            return n === j || null === n ? o.row(e).data(t) : o.cell(e, n).data(t), r !== j && !r || o.columns.adjust(), 
            a !== j && !a || o.draw(), 0;
        }, this.fnVersionCheck = Yt.fnVersionCheck;
        var m = this, S = b === j, v = this.length;
        for (var t in S && (b = {}), this.oApi = this.internal = Yt.internal, te.ext.internal) t && (this[t] = e(t));
        return this.each(function() {
            var n, t = {}, a = 1 < v ? jt(t, b, !0) : b, r = 0, o = (t = this.getAttribute("id"), 
            !1), e = te.defaults, i = R(this);
            if ("table" != this.nodeName.toLowerCase()) Pt(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2); else {
                _(e), T(e.column), D(e, e, !0), D(e.column, e.column, !0), D(e, R.extend(a, i.data()));
                var l = te.settings;
                r = 0;
                for (n = l.length; r < n; r++) {
                    var s = l[r];
                    if (s.nTable == this || s.nTHead && s.nTHead.parentNode == this || s.nTFoot && s.nTFoot.parentNode == this) {
                        var u = a.bRetrieve !== j ? a.bRetrieve : e.bRetrieve;
                        if (S || u) return s.oInstance;
                        if (a.bDestroy !== j ? a.bDestroy : e.bDestroy) {
                            s.oInstance.fnDestroy();
                            break;
                        }
                        return void Pt(s, 0, "Cannot reinitialise DataTable", 3);
                    }
                    if (s.sTableId == this.id) {
                        l.splice(r, 1);
                        break;
                    }
                }
                null !== t && "" !== t || (this.id = t = "DataTables_Table_" + te.ext._unique++);
                var c = R.extend(!0, {}, te.models.oSettings, {
                    sDestroyWidth: i[0].style.width,
                    sInstance: t,
                    sTableId: t
                });
                c.nTable = this, c.oApi = m.internal, c.oInit = a, l.push(c), c.oInstance = 1 === m.length ? m : i.dataTable(), 
                _(a), y(a.oLanguage), a.aLengthMenu && !a.iDisplayLength && (a.iDisplayLength = R.isArray(a.aLengthMenu[0]) ? a.aLengthMenu[0][0] : a.aLengthMenu[0]), 
                a = jt(R.extend(!0, {}, e), a), Rt(c.oFeatures, a, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" ")), 
                Rt(c, a, [ "asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", [ "iCookieDuration", "iStateDuration" ], [ "oSearch", "oPreviousSearch" ], [ "aoSearchCols", "aoPreSearchCols" ], [ "iDisplayLength", "_iDisplayLength" ] ]), 
                Rt(c.oScroll, a, [ [ "sScrollX", "sX" ], [ "sScrollXInner", "sXInner" ], [ "sScrollY", "sY" ], [ "bScrollCollapse", "bCollapse" ] ]), 
                Rt(c.oLanguage, a, "fnInfoCallback"), Ht(c, "aoDrawCallback", a.fnDrawCallback, "user"), 
                Ht(c, "aoServerParams", a.fnServerParams, "user"), Ht(c, "aoStateSaveParams", a.fnStateSaveParams, "user"), 
                Ht(c, "aoStateLoadParams", a.fnStateLoadParams, "user"), Ht(c, "aoStateLoaded", a.fnStateLoaded, "user"), 
                Ht(c, "aoRowCallback", a.fnRowCallback, "user"), Ht(c, "aoRowCreatedCallback", a.fnCreatedRow, "user"), 
                Ht(c, "aoHeaderCallback", a.fnHeaderCallback, "user"), Ht(c, "aoFooterCallback", a.fnFooterCallback, "user"), 
                Ht(c, "aoInitComplete", a.fnInitComplete, "user"), Ht(c, "aoPreDrawCallback", a.fnPreDrawCallback, "user"), 
                c.rowIdFn = k(a.rowId), w(c);
                var f = c.oClasses;
                R.extend(f, te.ext.classes, a.oClasses), i.addClass(f.sTable), c.iInitDisplayStart === j && (c.iInitDisplayStart = a.iDisplayStart, 
                c._iDisplayStart = a.iDisplayStart), null !== a.iDeferLoading && (c.bDeferLoading = !0, 
                t = R.isArray(a.iDeferLoading), c._iRecordsDisplay = t ? a.iDeferLoading[0] : a.iDeferLoading, 
                c._iRecordsTotal = t ? a.iDeferLoading[1] : a.iDeferLoading);
                var d = c.oLanguage;
                R.extend(!0, d, a.oLanguage), d.sUrl && (R.ajax({
                    dataType: "json",
                    url: d.sUrl,
                    success: function(t) {
                        y(t), D(e.oLanguage, t), R.extend(!0, d, t), ot(c);
                    },
                    error: function() {
                        ot(c);
                    }
                }), o = !0), null === a.asStripeClasses && (c.asStripeClasses = [ f.sStripeOdd, f.sStripeEven ]);
                t = c.asStripeClasses;
                var h = i.children("tbody").find("tr").eq(0);
                if (-1 !== R.inArray(!0, R.map(t, function(t) {
                    return h.hasClass(t);
                })) && (R("tbody tr", this).removeClass(t.join(" ")), c.asDestroyStripes = t.slice()), 
                t = [], 0 !== (l = this.getElementsByTagName("thead")).length && (B(c.aoHeader, l[0]), 
                t = U(c)), null === a.aoColumns) for (l = [], r = 0, n = t.length; r < n; r++) l.push(null); else l = a.aoColumns;
                for (r = 0, n = l.length; r < n; r++) C(c, t ? t[r] : null);
                if (A(c, a.aoColumnDefs, l, function(t, e) {
                    x(c, t, e);
                }), h.length) {
                    function p(t, e) {
                        return null !== t.getAttribute("data-" + e) ? e : null;
                    }
                    R(h[0]).children("th, td").each(function(t, e) {
                        var n = c.aoColumns[t];
                        if (n.mData === t) {
                            var a = p(e, "sort") || p(e, "order"), r = p(e, "filter") || p(e, "search");
                            null === a && null === r || (n.mData = {
                                _: t + ".display",
                                sort: null !== a ? t + ".@data-" + a : j,
                                type: null !== a ? t + ".@data-" + a : j,
                                filter: null !== r ? t + ".@data-" + r : j
                            }, x(c, t));
                        }
                    });
                }
                var g = c.oFeatures;
                t = function() {
                    if (a.aaSorting === j) {
                        var t = c.aaSorting;
                        for (r = 0, n = t.length; r < n; r++) t[r][1] = c.aoColumns[r].asSorting[0];
                    }
                    xt(c), g.bSort && Ht(c, "aoDrawCallback", function() {
                        if (c.bSorted) {
                            var t = yt(c), n = {};
                            R.each(t, function(t, e) {
                                n[e.src] = e.dir;
                            }), kt(c, null, "order", [ c, t, n ]), Tt(c);
                        }
                    }), Ht(c, "aoDrawCallback", function() {
                        (c.bSorted || "ssp" === Wt(c) || g.bDeferRender) && xt(c);
                    }, "sc");
                    t = i.children("caption").each(function() {
                        this._captionSide = R(this).css("caption-side");
                    });
                    var e = i.children("thead");
                    if (0 === e.length && (e = R("<thead/>").appendTo(i)), c.nTHead = e[0], 0 === (e = i.children("tbody")).length && (e = R("<tbody/>").appendTo(i)), 
                    c.nTBody = e[0], 0 === (e = i.children("tfoot")).length && 0 < t.length && ("" !== c.oScroll.sX || "" !== c.oScroll.sY) && (e = R("<tfoot/>").appendTo(i)), 
                    0 === e.length || 0 === e.children().length ? i.addClass(f.sNoFooter) : 0 < e.length && (c.nTFoot = e[0], 
                    B(c.aoFooter, c.nTFoot)), a.aaData) for (r = 0; r < a.aaData.length; r++) F(c, a.aaData[r]); else !c.bDeferLoading && "dom" != Wt(c) || L(c, R(c.nTBody).children("tr"));
                    c.aiDisplay = c.aiDisplayMaster.slice(), !(c.bInitialised = !0) === o && ot(c);
                };
                a.bStateSave ? (g.bStateSave = !0, Ht(c, "aoDrawCallback", At, "state_save"), Ft(c, a, t)) : t();
            }
        }), m = null, this;
    }, ee = {}, ne = /[\r\n]/g, ae = /<.*?>/g, re = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/, oe = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"), ie = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi, le = function(t, e, n) {
        var a = [], r = 0, o = t.length;
        if (n !== j) for (;r < o; r++) t[r] && t[r][e] && a.push(t[r][e][n]); else for (;r < o; r++) t[r] && a.push(t[r][e]);
        return a;
    }, se = function(t) {
        var e;
        t: {
            if (!(t.length < 2)) for (var n = (e = t.slice().sort())[0], a = 1, r = e.length; a < r; a++) {
                if (e[a] === n) {
                    e = !1;
                    break t;
                }
                n = e[a];
            }
            e = !0;
        }
        if (e) return t.slice();
        e = [];
        r = t.length;
        var o, i = 0;
        a = 0;
        t: for (;a < r; a++) {
            for (n = t[a], o = 0; o < i; o++) if (e[o] === n) continue t;
            e.push(n), i++;
        }
        return e;
    };
    te.util = {
        throttle: function(a, t) {
            var r, o, i = t !== j ? t : 200;
            return function() {
                var t = this, e = +new Date(), n = arguments;
                r && e < r + i ? (clearTimeout(o), o = setTimeout(function() {
                    r = j, a.apply(t, n);
                }, i)) : (r = e, a.apply(t, n));
            };
        },
        escapeRegex: function(t) {
            return t.replace(oe, "\\$1");
        }
    };
    var ue = function(t, e, n) {
        t[e] !== j && (t[n] = t[e]);
    }, ce = /\[.*?\]$/, fe = /\(\)$/, de = te.util.escapeRegex, he = R("<div>")[0], pe = he.textContent !== j, ge = /<.*?>/g, be = te.util.throttle, me = [], Se = Array.prototype;
    Zt = function(t, e) {
        if (!(this instanceof Zt)) return new Zt(t, e);
        function n(t) {
            (t = function(t) {
                var e, n, a = te.settings, r = R.map(a, function(t) {
                    return t.nTable;
                });
                return t ? t.nTable && t.oApi ? [ t ] : t.nodeName && "table" === t.nodeName.toLowerCase() ? -1 !== (e = R.inArray(t, r)) ? [ a[e] ] : null : t && "function" == typeof t.settings ? t.settings().toArray() : ("string" == typeof t ? n = R(t) : t instanceof R && (n = t), 
                n ? n.map(function() {
                    return -1 !== (e = R.inArray(this, r)) ? a[e] : null;
                }).toArray() : void 0) : [];
            }(t)) && (a = a.concat(t));
        }
        var a = [];
        if (R.isArray(t)) for (var r = 0, o = t.length; r < o; r++) n(t[r]); else n(t);
        this.context = se(a), e && R.merge(this, e), this.selector = {
            rows: null,
            cols: null,
            opts: null
        }, Zt.extend(this, this, me);
    }, te.Api = Zt, R.extend(Zt.prototype, {
        any: function() {
            return 0 !== this.count();
        },
        concat: Se.concat,
        context: [],
        count: function() {
            return this.flatten().length;
        },
        each: function(t) {
            for (var e = 0, n = this.length; e < n; e++) t.call(this, this[e], e, this);
            return this;
        },
        eq: function(t) {
            var e = this.context;
            return e.length > t ? new Zt(e[t], this[t]) : null;
        },
        filter: function(t) {
            var e = [];
            if (Se.filter) e = Se.filter.call(this, t, this); else for (var n = 0, a = this.length; n < a; n++) t.call(this, this[n], n, this) && e.push(this[n]);
            return new Zt(this.context, e);
        },
        flatten: function() {
            var t = [];
            return new Zt(this.context, t.concat.apply(t, this.toArray()));
        },
        join: Se.join,
        indexOf: Se.indexOf || function(t, e) {
            for (var n = e || 0, a = this.length; n < a; n++) if (this[n] === t) return n;
            return -1;
        },
        iterator: function(t, e, n, a) {
            var r, o, i, l, s, u, c, f = [], d = this.context, h = this.selector;
            for ("string" == typeof t && (a = n, n = e, e = t, t = !1), o = 0, i = d.length; o < i; o++) {
                var p = new Zt(d[o]);
                if ("table" === e) (r = n.call(p, d[o], o)) !== j && f.push(r); else if ("columns" === e || "rows" === e) (r = n.call(p, d[o], this[o], o)) !== j && f.push(r); else if ("column" === e || "column-rows" === e || "row" === e || "cell" === e) for (c = this[o], 
                "column-rows" === e && (u = Te(d[o], h.opts)), l = 0, s = c.length; l < s; l++) r = c[l], 
                (r = "cell" === e ? n.call(p, d[o], r.row, r.column, o, l) : n.call(p, d[o], r, o, l, u)) !== j && f.push(r);
            }
            return f.length || a ? ((e = (t = new Zt(d, t ? f.concat.apply([], f) : f)).selector).rows = h.rows, 
            e.cols = h.cols, e.opts = h.opts, t) : this;
        },
        lastIndexOf: Se.lastIndexOf || function(t, e) {
            return this.indexOf.apply(this.toArray.reverse(), arguments);
        },
        length: 0,
        map: function(t) {
            var e = [];
            if (Se.map) e = Se.map.call(this, t, this); else for (var n = 0, a = this.length; n < a; n++) e.push(t.call(this, this[n], n));
            return new Zt(this.context, e);
        },
        pluck: function(e) {
            return this.map(function(t) {
                return t[e];
            });
        },
        pop: Se.pop,
        push: Se.push,
        reduce: Se.reduce || function(t, e) {
            return n(this, t, e, 0, this.length, 1);
        },
        reduceRight: Se.reduceRight || function(t, e) {
            return n(this, t, e, this.length - 1, -1, -1);
        },
        reverse: Se.reverse,
        selector: null,
        shift: Se.shift,
        slice: function() {
            return new Zt(this.context, this);
        },
        sort: Se.sort,
        splice: Se.splice,
        toArray: function() {
            return Se.slice.call(this);
        },
        to$: function() {
            return R(this);
        },
        toJQuery: function() {
            return R(this);
        },
        unique: function() {
            return new Zt(this.context, se(this));
        },
        unshift: Se.unshift
    }), Zt.extend = function(t, e, n) {
        if (n.length && e && (e instanceof Zt || e.__dt_wrapper)) {
            function a(e, n, a) {
                return function() {
                    var t = n.apply(e, arguments);
                    return Zt.extend(t, t, a.methodExt), t;
                };
            }
            var r, o, i;
            for (r = 0, o = n.length; r < o; r++) e[(i = n[r]).name] = "function" == typeof i.val ? a(t, i.val, i) : R.isPlainObject(i.val) ? {} : i.val, 
            e[i.name].__dt_wrapper = !0, Zt.extend(t, e[i.name], i.propExt);
        }
    }, Zt.register = Qt = function(t, e) {
        if (R.isArray(t)) for (var n = 0, a = t.length; n < a; n++) Zt.register(t[n], e); else {
            var r, o, i = t.split("."), l = me;
            for (n = 0, a = i.length; n < a; n++) {
                var s;
                r = (o = -1 !== i[n].indexOf("()")) ? i[n].replace("()", "") : i[n];
                t: {
                    s = 0;
                    for (var u = l.length; s < u; s++) if (l[s].name === r) {
                        s = l[s];
                        break t;
                    }
                    s = null;
                }
                s || (s = {
                    name: r,
                    val: {},
                    methodExt: [],
                    propExt: []
                }, l.push(s)), n === a - 1 ? s.val = e : l = o ? s.methodExt : s.propExt;
            }
        }
    }, Zt.registerPlural = Kt = function(t, e, n) {
        Zt.register(t, n), Zt.register(e, function() {
            var t = n.apply(this, arguments);
            return t === this ? this : t instanceof Zt ? t.length ? R.isArray(t[0]) ? new Zt(t.context, t[0]) : t[0] : j : t;
        });
    }, Qt("tables()", function(t) {
        var e;
        if (t) {
            e = Zt;
            var n = this.context;
            if ("number" == typeof t) t = [ n[t] ]; else {
                var a = R.map(n, function(t) {
                    return t.nTable;
                });
                t = R(a).filter(t).map(function() {
                    var t = R.inArray(this, a);
                    return n[t];
                }).toArray();
            }
            e = new e(t);
        } else e = this;
        return e;
    }), Qt("table()", function(t) {
        var e = (t = this.tables(t)).context;
        return e.length ? new Zt(e[0]) : t;
    }), Kt("tables().nodes()", "table().node()", function() {
        return this.iterator("table", function(t) {
            return t.nTable;
        }, 1);
    }), Kt("tables().body()", "table().body()", function() {
        return this.iterator("table", function(t) {
            return t.nTBody;
        }, 1);
    }), Kt("tables().header()", "table().header()", function() {
        return this.iterator("table", function(t) {
            return t.nTHead;
        }, 1);
    }), Kt("tables().footer()", "table().footer()", function() {
        return this.iterator("table", function(t) {
            return t.nTFoot;
        }, 1);
    }), Kt("tables().containers()", "table().container()", function() {
        return this.iterator("table", function(t) {
            return t.nTableWrapper;
        }, 1);
    }), Qt("draw()", function(e) {
        return this.iterator("table", function(t) {
            "page" === e ? M(t) : ("string" == typeof e && (e = "full-hold" !== e), W(t, !1 === e));
        });
    }), Qt("page()", function(e) {
        return e === j ? this.page.info().page : this.iterator("table", function(t) {
            ct(t, e);
        });
    }), Qt("page.info()", function() {
        if (0 === this.context.length) return j;
        var t = this.context[0], e = t._iDisplayStart, n = t.oFeatures.bPaginate ? t._iDisplayLength : -1, a = t.fnRecordsDisplay(), r = -1 === n;
        return {
            page: r ? 0 : Math.floor(e / n),
            pages: r ? 1 : Math.ceil(a / n),
            start: e,
            end: t.fnDisplayEnd(),
            length: n,
            recordsTotal: t.fnRecordsTotal(),
            recordsDisplay: a,
            serverSide: "ssp" === Wt(t)
        };
    }), Qt("page.len()", function(e) {
        return e === j ? 0 !== this.context.length ? this.context[0]._iDisplayLength : j : this.iterator("table", function(t) {
            lt(t, e);
        });
    });
    function ve(a, r, t) {
        if (t) {
            var e = new Zt(a);
            e.one("draw", function() {
                t(e.ajax.json());
            });
        }
        if ("ssp" == Wt(a)) W(a, r); else {
            dt(a, !0);
            var n = a.jqXHR;
            n && 4 !== n.readyState && n.abort(), V(a, [], function(t) {
                l(a);
                for (var e = 0, n = (t = q(a, t)).length; e < n; e++) F(a, t[e]);
                W(a, r), dt(a, !1);
            });
        }
    }
    Qt("ajax.json()", function() {
        var t = this.context;
        if (0 < t.length) return t[0].json;
    }), Qt("ajax.params()", function() {
        var t = this.context;
        if (0 < t.length) return t[0].oAjaxData;
    }), Qt("ajax.reload()", function(e, n) {
        return this.iterator("table", function(t) {
            ve(t, !1 === n, e);
        });
    }), Qt("ajax.url()", function(e) {
        var t = this.context;
        return e === j ? 0 === t.length ? j : (t = t[0]).ajax ? R.isPlainObject(t.ajax) ? t.ajax.url : t.ajax : t.sAjaxSource : this.iterator("table", function(t) {
            R.isPlainObject(t.ajax) ? t.ajax.url = e : t.ajax = e;
        });
    }), Qt("ajax.url().load()", function(e, n) {
        return this.iterator("table", function(t) {
            ve(t, !1 === n, e);
        });
    });
    function De(t, e, n, a, r) {
        var o, i, l, s, u, c, f = [];
        for (l = typeof e, e && "string" !== l && "function" !== l && e.length !== j || (e = [ e ]), 
        l = 0, s = e.length; l < s; l++) for (u = 0, c = (i = e[l] && e[l].split && !e[l].match(/[\[\(:]/) ? e[l].split(",") : [ e[l] ]).length; u < c; u++) (o = n("string" == typeof i[u] ? R.trim(i[u]) : i[u])) && o.length && (f = f.concat(o));
        if ((t = Yt.selector[t]).length) for (l = 0, s = t.length; l < s; l++) f = t[l](a, r, f);
        return se(f);
    }
    function ye(t) {
        return (t = t || {}).filter && t.search === j && (t.search = t.filter), R.extend({
            search: "none",
            order: "current",
            page: "all"
        }, t);
    }
    function _e(t) {
        for (var e = 0, n = t.length; e < n; e++) if (0 < t[e].length) return t[0] = t[e], 
        t[0].length = 1, t.length = 1, t.context = [ t.context[e] ], t;
        return t.length = 0, t;
    }
    var Te = function(t, e) {
        var n, a, r, o = [], i = t.aiDisplay;
        r = t.aiDisplayMaster;
        var l = e.search;
        if (n = e.order, a = e.page, "ssp" == Wt(t)) return "removed" === l ? [] : $t(0, r.length);
        if ("current" == a) for (n = t._iDisplayStart, a = t.fnDisplayEnd(); n < a; n++) o.push(i[n]); else if ("current" == n || "applied" == n) {
            if ("none" == l) o = r.slice(); else if ("applied" == l) o = i.slice(); else if ("removed" == l) {
                var s = {};
                for (n = 0, a = i.length; n < a; n++) s[i[n]] = null;
                o = R.map(r, function(t) {
                    return s.hasOwnProperty(t) ? null : t;
                });
            }
        } else if ("index" == n || "original" == n) for (n = 0, a = t.aoData.length; n < a; n++) "none" == l ? o.push(n) : (-1 === (r = R.inArray(n, i)) && "removed" == l || 0 <= r && "applied" == l) && o.push(n);
        return o;
    };
    Qt("rows()", function(t, e) {
        t === j ? t = "" : R.isPlainObject(t) && (e = t, t = "");
        e = ye(e);
        var n = this.iterator("table", function(r) {
            var o, i = e;
            return De("row", t, function(n) {
                var t = Vt(n), a = r.aoData;
                if (null !== t && !i) return [ t ];
                if (o = o || Te(r, i), null !== t && -1 !== R.inArray(t, o)) return [ t ];
                if (null === n || n === j || "" === n) return o;
                if ("function" == typeof n) return R.map(o, function(t) {
                    var e = a[t];
                    return n(t, e._aData, e.nTr) ? t : null;
                });
                if (n.nodeName) {
                    t = n._DT_RowIndex;
                    var e = n._DT_CellIndex;
                    return t !== j ? a[t] && a[t].nTr === n ? [ t ] : [] : e ? a[e.row] && a[e.row].nTr === n ? [ e.row ] : [] : (t = R(n).closest("*[data-dt-row]")).length ? [ t.data("dt-row") ] : [];
                }
                return "string" == typeof n && "#" === n.charAt(0) && (t = r.aIds[n.replace(/^#/, "")]) !== j ? [ t.idx ] : (t = zt(Gt(r.aoData, o, "nTr")), 
                R(t).filter(n).map(function() {
                    return this._DT_RowIndex;
                }).toArray());
            }, r, i);
        }, 1);
        return n.selector.rows = t, n.selector.opts = e, n;
    }), Qt("rows().nodes()", function() {
        return this.iterator("row", function(t, e) {
            return t.aoData[e].nTr || j;
        }, 1);
    }), Qt("rows().data()", function() {
        return this.iterator(!0, "rows", function(t, e) {
            return Gt(t.aoData, e, "_aData");
        }, 1);
    }), Kt("rows().cache()", "row().cache()", function(a) {
        return this.iterator("row", function(t, e) {
            var n = t.aoData[e];
            return "search" === a ? n._aFilterData : n._aSortData;
        }, 1);
    }), Kt("rows().invalidate()", "row().invalidate()", function(n) {
        return this.iterator("row", function(t, e) {
            r(t, e, n);
        });
    }), Kt("rows().indexes()", "row().index()", function() {
        return this.iterator("row", function(t, e) {
            return e;
        }, 1);
    }), Kt("rows().ids()", "row().id()", function(t) {
        for (var e = [], n = this.context, a = 0, r = n.length; a < r; a++) for (var o = 0, i = this[a].length; o < i; o++) {
            var l = n[a].rowIdFn(n[a].aoData[this[a][o]]._aData);
            e.push((!0 === t ? "#" : "") + l);
        }
        return new Zt(n, e);
    }), Kt("rows().remove()", "row().remove()", function() {
        var c = this;
        return this.iterator("row", function(t, e, n) {
            var a, r, o, i, l, s = t.aoData, u = s[e];
            for (s.splice(e, 1), a = 0, r = s.length; a < r; a++) if (l = (o = s[a]).anCells, 
            null !== o.nTr && (o.nTr._DT_RowIndex = a), null !== l) for (o = 0, i = l.length; o < i; o++) l[o]._DT_CellIndex.row = a;
            f(t.aiDisplayMaster, e), f(t.aiDisplay, e), f(c[n], e, !1), 0 < t._iRecordsDisplay && t._iRecordsDisplay--, 
            Ot(t), (e = t.rowIdFn(u._aData)) !== j && delete t.aIds[e];
        }), this.iterator("table", function(t) {
            for (var e = 0, n = t.aoData.length; e < n; e++) t.aoData[e].idx = e;
        }), this;
    }), Qt("rows.add()", function(o) {
        var t = this.iterator("table", function(t) {
            var e, n, a, r = [];
            for (n = 0, a = o.length; n < a; n++) (e = o[n]).nodeName && "TR" === e.nodeName.toUpperCase() ? r.push(L(t, e)[0]) : r.push(F(t, e));
            return r;
        }, 1), e = this.rows(-1);
        return e.pop(), R.merge(e, t), e;
    }), Qt("row()", function(t, e) {
        return _e(this.rows(t, e));
    }), Qt("row().data()", function(t) {
        var e = this.context;
        if (t === j) return e.length && this.length ? e[0].aoData[this[0]]._aData : j;
        var n = e[0].aoData[this[0]];
        return n._aData = t, R.isArray(t) && n.nTr.id && p(e[0].rowId)(t, n.nTr.id), r(e[0], this[0], "data"), 
        this;
    }), Qt("row().node()", function() {
        var t = this.context;
        return t.length && this.length && t[0].aoData[this[0]].nTr || null;
    }), Qt("row.add()", function(e) {
        e instanceof R && e.length && (e = e[0]);
        var t = this.iterator("table", function(t) {
            return e.nodeName && "TR" === e.nodeName.toUpperCase() ? L(t, e)[0] : F(t, e);
        });
        return this.row(t[0]);
    });
    function we(t, e) {
        var n = t.context;
        n.length && (n = n[0].aoData[e !== j ? e : t[0]]) && n._details && (n._details.remove(), 
        n._detailsShow = j, n._details = j);
    }
    function Ce(t, e) {
        var n = t.context;
        if (n.length && t.length) {
            var a = n[0].aoData[t[0]];
            if (a._details) {
                (a._detailsShow = e) ? a._details.insertAfter(a.nTr) : a._details.detach();
                var i = n[0], r = new Zt(i), l = i.aoData;
                r.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details"), 
                0 < le(l, "_details").length && (r.on("draw.dt.DT_details", function(t, e) {
                    i === e && r.rows({
                        page: "current"
                    }).eq(0).each(function(t) {
                        (t = l[t])._detailsShow && t._details.insertAfter(t.nTr);
                    });
                }), r.on("column-visibility.dt.DT_details", function(t, e) {
                    if (i === e) for (var n, a = v(e), r = 0, o = l.length; r < o; r++) (n = l[r])._details && n._details.children("td[colspan]").attr("colspan", a);
                }), r.on("destroy.dt.DT_details", function(t, e) {
                    if (i === e) for (var n = 0, a = l.length; n < a; n++) l[n]._details && we(r, n);
                }));
            }
        }
    }
    Qt("row().child()", function(t, e) {
        var n = this.context;
        if (t === j) return n.length && this.length ? n[0].aoData[this[0]]._details : j;
        if (!0 === t) this.child.show(); else if (!1 === t) we(this); else if (n.length && this.length) {
            var r = n[0], o = (n = n[0].aoData[this[0]], []), i = function(t, e) {
                if (R.isArray(t) || t instanceof R) for (var n = 0, a = t.length; n < a; n++) i(t[n], e); else t.nodeName && "tr" === t.nodeName.toLowerCase() ? o.push(t) : (n = R("<tr><td/></tr>").addClass(e), 
                R("td", n).addClass(e).html(t)[0].colSpan = v(r), o.push(n[0]));
            };
            i(t, e), n._details && n._details.detach(), n._details = R(o), n._detailsShow && n._details.insertAfter(n.nTr);
        }
        return this;
    }), Qt([ "row().child.show()", "row().child().show()" ], function() {
        return Ce(this, !0), this;
    }), Qt([ "row().child.hide()", "row().child().hide()" ], function() {
        return Ce(this, !1), this;
    }), Qt([ "row().child.remove()", "row().child().remove()" ], function() {
        return we(this), this;
    }), Qt("row().child.isShown()", function() {
        var t = this.context;
        return t.length && this.length && t[0].aoData[this[0]]._detailsShow || !1;
    });
    function xe(t, e, n, a, r) {
        n = [], a = 0;
        for (var o = r.length; a < o; a++) n.push(P(t, r[a], e));
        return n;
    }
    var Ie = /^([^:]+):(name|visIdx|visible)$/;
    Qt("columns()", function(e, n) {
        e === j ? e = "" : R.isPlainObject(e) && (n = e, e = "");
        n = ye(n);
        var t = this.iterator("table", function(o) {
            var t = e, i = n, l = o.aoColumns, s = le(l, "sName"), u = le(l, "nTh");
            return De("column", t, function(n) {
                var t = Vt(n);
                if ("" === n) return $t(l.length);
                if (null !== t) return [ 0 <= t ? t : l.length + t ];
                if ("function" == typeof n) {
                    var a = Te(o, i);
                    return R.map(l, function(t, e) {
                        return n(e, xe(o, e, 0, 0, a), u[e]) ? e : null;
                    });
                }
                var r = "string" == typeof n ? n.match(Ie) : "";
                if (r) switch (r[2]) {
                  case "visIdx":
                  case "visible":
                    if ((t = parseInt(r[1], 10)) < 0) {
                        var e = R.map(l, function(t, e) {
                            return t.bVisible ? e : null;
                        });
                        return [ e[e.length + t] ];
                    }
                    return [ H(o, t) ];

                  case "name":
                    return R.map(s, function(t, e) {
                        return t === r[1] ? e : null;
                    });

                  default:
                    return [];
                }
                return n.nodeName && n._DT_CellIndex ? [ n._DT_CellIndex.column ] : (t = R(u).filter(n).map(function() {
                    return R.inArray(this, u);
                }).toArray()).length || !n.nodeName ? t : (t = R(n).closest("*[data-dt-column]")).length ? [ t.data("dt-column") ] : [];
            }, o, i);
        }, 1);
        return t.selector.cols = e, t.selector.opts = n, t;
    }), Kt("columns().header()", "column().header()", function() {
        return this.iterator("column", function(t, e) {
            return t.aoColumns[e].nTh;
        }, 1);
    }), Kt("columns().footer()", "column().footer()", function() {
        return this.iterator("column", function(t, e) {
            return t.aoColumns[e].nTf;
        }, 1);
    }), Kt("columns().data()", "column().data()", function() {
        return this.iterator("column-rows", xe, 1);
    }), Kt("columns().dataSrc()", "column().dataSrc()", function() {
        return this.iterator("column", function(t, e) {
            return t.aoColumns[e].mData;
        }, 1);
    }), Kt("columns().cache()", "column().cache()", function(o) {
        return this.iterator("column-rows", function(t, e, n, a, r) {
            return Gt(t.aoData, r, "search" === o ? "_aFilterData" : "_aSortData", e);
        }, 1);
    }), Kt("columns().nodes()", "column().nodes()", function() {
        return this.iterator("column-rows", function(t, e, n, a, r) {
            return Gt(t.aoData, r, "anCells", e);
        }, 1);
    }), Kt("columns().visible()", "column().visible()", function(u, n) {
        var t = this.iterator("column", function(t, e) {
            if (u === j) return t.aoColumns[e].bVisible;
            var n, a, r, o = t.aoColumns, i = o[e], l = t.aoData;
            if (u !== j && i.bVisible !== u) {
                if (u) {
                    var s = R.inArray(!0, le(o, "bVisible"), e + 1);
                    for (n = 0, a = l.length; n < a; n++) r = l[n].nTr, o = l[n].anCells, r && r.insertBefore(o[e], o[s] || null);
                } else R(le(t.aoData, "anCells", e)).detach();
                i.bVisible = u, O(t, t.aoHeader), O(t, t.aoFooter), t.aiDisplay.length || R(t.nTBody).find("td[colspan]").attr("colspan", v(t)), 
                At(t);
            }
        });
        return u !== j && (this.iterator("column", function(t, e) {
            kt(t, null, "column-visibility", [ t, e, u, n ]);
        }), n !== j && !n || this.columns.adjust()), t;
    }), Kt("columns().indexes()", "column().index()", function(n) {
        return this.iterator("column", function(t, e) {
            return "visible" === n ? u(t, e) : e;
        }, 1);
    }), Qt("columns.adjust()", function() {
        return this.iterator("table", function(t) {
            N(t);
        }, 1);
    }), Qt("column.index()", function(t, e) {
        if (0 !== this.context.length) {
            var n = this.context[0];
            if ("fromVisible" === t || "toData" === t) return H(n, e);
            if ("fromData" === t || "toVisible" === t) return u(n, e);
        }
    }), Qt("column()", function(t, e) {
        return _e(this.columns(t, e));
    }), Qt("cells()", function(g, t, b) {
        if (R.isPlainObject(g) && (g.row === j ? (b = g, g = null) : (b = t, t = null)), 
        R.isPlainObject(t) && (b = t, t = null), null === t || t === j) return this.iterator("table", function(n) {
            var a, r, o, i, l, s, u, t = g, e = ye(b), c = n.aoData, f = Te(n, e), d = zt(Gt(c, f, "anCells")), h = R([].concat.apply([], d)), p = n.aoColumns.length;
            return De("cell", t, function(t) {
                var e = "function" == typeof t;
                if (null === t || t === j || e) {
                    for (r = [], o = 0, i = f.length; o < i; o++) for (a = f[o], l = 0; l < p; l++) s = {
                        row: a,
                        column: l
                    }, e ? (u = c[a], t(s, P(n, a, l), u.anCells ? u.anCells[l] : null) && r.push(s)) : r.push(s);
                    return r;
                }
                return R.isPlainObject(t) ? t.column !== j && t.row !== j && -1 !== R.inArray(t.row, f) ? [ t ] : [] : (e = h.filter(t).map(function(t, e) {
                    return {
                        row: e._DT_CellIndex.row,
                        column: e._DT_CellIndex.column
                    };
                }).toArray()).length || !t.nodeName ? e : (u = R(t).closest("*[data-dt-row]")).length ? [ {
                    row: u.data("dt-row"),
                    column: u.data("dt-column")
                } ] : [];
            }, n, e);
        });
        var n, a, r, o, i, l = this.columns(t), s = this.rows(g);
        this.iterator("table", function(t, e) {
            for (n = [], a = 0, r = s[e].length; a < r; a++) for (o = 0, i = l[e].length; o < i; o++) n.push({
                row: s[e][a],
                column: l[e][o]
            });
        }, 1);
        var e = this.cells(n, b);
        return R.extend(e.selector, {
            cols: t,
            rows: g,
            opts: b
        }), e;
    }), Kt("cells().nodes()", "cell().node()", function() {
        return this.iterator("cell", function(t, e, n) {
            return (t = t.aoData[e]) && t.anCells ? t.anCells[n] : j;
        }, 1);
    }), Qt("cells().data()", function() {
        return this.iterator("cell", function(t, e, n) {
            return P(t, e, n);
        }, 1);
    }), Kt("cells().cache()", "cell().cache()", function(a) {
        return a = "search" === a ? "_aFilterData" : "_aSortData", this.iterator("cell", function(t, e, n) {
            return t.aoData[e][a][n];
        }, 1);
    }), Kt("cells().render()", "cell().render()", function(a) {
        return this.iterator("cell", function(t, e, n) {
            return P(t, e, n, a);
        }, 1);
    }), Kt("cells().indexes()", "cell().index()", function() {
        return this.iterator("cell", function(t, e, n) {
            return {
                row: e,
                column: n,
                columnVisible: u(t, n)
            };
        }, 1);
    }), Kt("cells().invalidate()", "cell().invalidate()", function(a) {
        return this.iterator("cell", function(t, e, n) {
            r(t, e, a, n);
        });
    }), Qt("cell()", function(t, e, n) {
        return _e(this.cells(t, e, n));
    }), Qt("cell().data()", function(t) {
        var e = this.context, n = this[0];
        return t === j ? e.length && n.length ? P(e[0], n[0].row, n[0].column) : j : (a(e[0], n[0].row, n[0].column, t), 
        r(e[0], n[0].row, "data", n[0].column), this);
    }), Qt("order()", function(e, t) {
        var n = this.context;
        return e === j ? 0 !== n.length ? n[0].aaSorting : j : ("number" == typeof e ? e = [ [ e, t ] ] : e.length && !R.isArray(e[0]) && (e = Array.prototype.slice.call(arguments)), 
        this.iterator("table", function(t) {
            t.aaSorting = e.slice();
        }));
    }), Qt("order.listener()", function(e, n, a) {
        return this.iterator("table", function(t) {
            Ct(t, e, n, a);
        });
    }), Qt("order.fixed()", function(e) {
        if (e) return this.iterator("table", function(t) {
            t.aaSortingFixed = R.extend(!0, {}, e);
        });
        var t = (t = this.context).length ? t[0].aaSortingFixed : j;
        return R.isArray(t) ? {
            pre: t
        } : t;
    }), Qt([ "columns().order()", "column().order()" ], function(a) {
        var r = this;
        return this.iterator("table", function(t, e) {
            var n = [];
            R.each(r[e], function(t, e) {
                n.push([ e, a ]);
            }), t.aaSorting = n;
        });
    }), Qt("search()", function(e, n, a, r) {
        var t = this.context;
        return e === j ? 0 !== t.length ? t[0].oPreviousSearch.sSearch : j : this.iterator("table", function(t) {
            t.oFeatures.bFilter && $(t, R.extend({}, t.oPreviousSearch, {
                sSearch: e + "",
                bRegex: null !== n && n,
                bSmart: null === a || a,
                bCaseInsensitive: null === r || r
            }), 1);
        });
    }), Kt("columns().search()", "column().search()", function(a, r, o, i) {
        return this.iterator("column", function(t, e) {
            var n = t.aoPreSearchCols;
            if (a === j) return n[e].sSearch;
            t.oFeatures.bFilter && (R.extend(n[e], {
                sSearch: a + "",
                bRegex: null !== r && r,
                bSmart: null === o || o,
                bCaseInsensitive: null === i || i
            }), $(t, t.oPreviousSearch, 1));
        });
    }), Qt("state()", function() {
        return this.context.length ? this.context[0].oSavedState : null;
    }), Qt("state.clear()", function() {
        return this.iterator("table", function(t) {
            t.fnStateSaveCallback.call(t.oInstance, t, {});
        });
    }), Qt("state.loaded()", function() {
        return this.context.length ? this.context[0].oLoadedState : null;
    }), Qt("state.save()", function() {
        return this.iterator("table", function(t) {
            At(t);
        });
    }), te.versionCheck = te.fnVersionCheck = function(t) {
        for (var e, n, a = te.version.split("."), r = 0, o = (t = t.split(".")).length; r < o; r++) if ((e = parseInt(a[r], 10) || 0) !== (n = parseInt(t[r], 10) || 0)) return n < e;
        return !0;
    }, te.isDataTable = te.fnIsDataTable = function(t) {
        var r = R(t).get(0), o = !1;
        return t instanceof te.Api || (R.each(te.settings, function(t, e) {
            var n = e.nScrollHead ? R("table", e.nScrollHead)[0] : null, a = e.nScrollFoot ? R("table", e.nScrollFoot)[0] : null;
            e.nTable !== r && n !== r && a !== r || (o = !0);
        }), o);
    }, te.tables = te.fnTables = function(e) {
        var t = !1;
        R.isPlainObject(e) && (t = e.api, e = e.visible);
        var n = R.map(te.settings, function(t) {
            if (!e || e && R(t.nTable).is(":visible")) return t.nTable;
        });
        return t ? new Zt(n) : n;
    }, te.camelToHungarian = D, Qt("$()", function(t, e) {
        var n = this.rows(e).nodes();
        n = R(n);
        return R([].concat(n.filter(t).toArray(), n.find(t).toArray()));
    }), R.each([ "on", "one", "off" ], function(t, n) {
        Qt(n + "()", function() {
            var t = Array.prototype.slice.call(arguments);
            t[0] = R.map(t[0].split(/\s/), function(t) {
                return t.match(/\.dt\b/) ? t : t + ".dt";
            }).join(" ");
            var e = R(this.tables().nodes());
            return e[n].apply(e, t), this;
        });
    }), Qt("clear()", function() {
        return this.iterator("table", function(t) {
            l(t);
        });
    }), Qt("settings()", function() {
        return new Zt(this.context, this.context);
    }), Qt("init()", function() {
        var t = this.context;
        return t.length ? t[0].oInit : null;
    }), Qt("data()", function() {
        return this.iterator("table", function(t) {
            return le(t.aoData, "_aData");
        }).flatten();
    }), Qt("destroy()", function(f) {
        return f = f || !1, this.iterator("table", function(e) {
            var n, t = e.nTableWrapper.parentNode, a = e.oClasses, r = e.nTable, o = e.nTBody, i = e.nTHead, l = e.nTFoot, s = R(r), u = (o = R(o), 
            R(e.nTableWrapper)), c = R.map(e.aoData, function(t) {
                return t.nTr;
            });
            e.bDestroying = !0, kt(e, "aoDestroyCallback", "destroy", [ e ]), f || new Zt(e).columns().visible(!0), 
            u.off(".DT").find(":not(tbody *)").off(".DT"), R(m).off(".DT-" + e.sInstance), r != i.parentNode && (s.children("thead").detach(), 
            s.append(i)), l && r != l.parentNode && (s.children("tfoot").detach(), s.append(l)), 
            e.aaSorting = [], e.aaSortingFixed = [], xt(e), R(c).removeClass(e.asStripeClasses.join(" ")), 
            R("th, td", i).removeClass(a.sSortable + " " + a.sSortableAsc + " " + a.sSortableDesc + " " + a.sSortableNone), 
            o.children().detach(), o.append(c), s[i = f ? "remove" : "detach"](), u[i](), !f && t && (t.insertBefore(r, e.nTableReinsertBefore), 
            s.css("width", e.sDestroyWidth).removeClass(a.sTable), (n = e.asDestroyStripes.length) && o.children().each(function(t) {
                R(this).addClass(e.asDestroyStripes[t % n]);
            })), -1 !== (t = R.inArray(e, te.settings)) && te.settings.splice(t, 1);
        });
    }), R.each([ "column", "row", "cell" ], function(t, s) {
        Qt(s + "s().every()", function(o) {
            var i = this.selector.opts, l = this;
            return this.iterator(s, function(t, e, n, a, r) {
                o.call(l[s](e, "cell" === s ? n : i, "cell" === s ? i : j), e, n, a, r);
            });
        });
    }), Qt("i18n()", function(t, e, n) {
        var a = this.context[0];
        return (t = k(t)(a.oLanguage)) === j && (t = e), n !== j && R.isPlainObject(t) && (t = t[n] !== j ? t[n] : t._), 
        t.replace("%d", n);
    }), te.version = "1.10.19", te.settings = [], te.models = {}, te.models.oSearch = {
        bCaseInsensitive: !0,
        sSearch: "",
        bRegex: !1,
        bSmart: !0
    }, te.models.oRow = {
        nTr: null,
        anCells: null,
        _aData: [],
        _aSortData: null,
        _aFilterData: null,
        _sFilterRow: null,
        _sRowStripe: "",
        src: null,
        idx: -1
    }, te.models.oColumn = {
        idx: null,
        aDataSort: null,
        asSorting: null,
        bSearchable: null,
        bSortable: null,
        bVisible: null,
        _sManualType: null,
        _bAttrSrc: !1,
        fnCreatedCell: null,
        fnGetData: null,
        fnSetData: null,
        mData: null,
        mRender: null,
        nTh: null,
        nTf: null,
        sClass: null,
        sContentPadding: null,
        sDefaultContent: null,
        sName: null,
        sSortDataType: "std",
        sSortingClass: null,
        sSortingClassJUI: null,
        sTitle: null,
        sType: null,
        sWidth: null,
        sWidthOrig: null
    }, te.defaults = {
        aaData: null,
        aaSorting: [ [ 0, "asc" ] ],
        aaSortingFixed: [],
        ajax: null,
        aLengthMenu: [ 10, 25, 50, 100 ],
        aoColumns: null,
        aoColumnDefs: null,
        aoSearchCols: [],
        asStripeClasses: null,
        bAutoWidth: !0,
        bDeferRender: !1,
        bDestroy: !1,
        bFilter: !0,
        bInfo: !0,
        bLengthChange: !0,
        bPaginate: !0,
        bProcessing: !1,
        bRetrieve: !1,
        bScrollCollapse: !1,
        bServerSide: !1,
        bSort: !0,
        bSortMulti: !0,
        bSortCellsTop: !1,
        bSortClasses: !0,
        bStateSave: !1,
        fnCreatedRow: null,
        fnDrawCallback: null,
        fnFooterCallback: null,
        fnFormatNumber: function(t) {
            return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
        },
        fnHeaderCallback: null,
        fnInfoCallback: null,
        fnInitComplete: null,
        fnPreDrawCallback: null,
        fnRowCallback: null,
        fnServerData: null,
        fnServerParams: null,
        fnStateLoadCallback: function(t) {
            try {
                return JSON.parse((-1 === t.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + t.sInstance + "_" + location.pathname));
            } catch (t) {}
        },
        fnStateLoadParams: null,
        fnStateLoaded: null,
        fnStateSaveCallback: function(t, e) {
            try {
                (-1 === t.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + t.sInstance + "_" + location.pathname, JSON.stringify(e));
            } catch (t) {}
        },
        fnStateSaveParams: null,
        iStateDuration: 7200,
        iDeferLoading: null,
        iDisplayLength: 10,
        iDisplayStart: 0,
        iTabIndex: 0,
        oClasses: {},
        oLanguage: {
            oAria: {
                sSortAscending: ": activate to sort column ascending",
                sSortDescending: ": activate to sort column descending"
            },
            oPaginate: {
                sFirst: "First",
                sLast: "Last",
                sNext: "Next",
                sPrevious: "Previous"
            },
            sEmptyTable: "No data available in table",
            sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
            sInfoEmpty: "Showing 0 to 0 of 0 entries",
            sInfoFiltered: "(filtered from _MAX_ total entries)",
            sInfoPostFix: "",
            sDecimal: "",
            sThousands: ",",
            sLengthMenu: "Show _MENU_ entries",
            sLoadingRecords: "Loading...",
            sProcessing: "Processing...",
            sSearch: "Search:",
            sSearchPlaceholder: "",
            sUrl: "",
            sZeroRecords: "No matching records found"
        },
        oSearch: R.extend({}, te.models.oSearch),
        sAjaxDataProp: "data",
        sAjaxSource: null,
        sDom: "lfrtip",
        searchDelay: null,
        sPaginationType: "simple_numbers",
        sScrollX: "",
        sScrollXInner: "",
        sScrollY: "",
        sServerMethod: "GET",
        renderer: null,
        rowId: "DT_RowId"
    }, o(te.defaults), te.defaults.column = {
        aDataSort: null,
        iDataSort: -1,
        asSorting: [ "asc", "desc" ],
        bSearchable: !0,
        bSortable: !0,
        bVisible: !0,
        fnCreatedCell: null,
        mData: null,
        mRender: null,
        sCellType: "td",
        sClass: "",
        sContentPadding: "",
        sDefaultContent: null,
        sName: "",
        sSortDataType: "std",
        sTitle: null,
        sType: null,
        sWidth: null
    }, o(te.defaults.column), te.models.oSettings = {
        oFeatures: {
            bAutoWidth: null,
            bDeferRender: null,
            bFilter: null,
            bInfo: null,
            bLengthChange: null,
            bPaginate: null,
            bProcessing: null,
            bServerSide: null,
            bSort: null,
            bSortMulti: null,
            bSortClasses: null,
            bStateSave: null
        },
        oScroll: {
            bCollapse: null,
            iBarWidth: 0,
            sX: null,
            sXInner: null,
            sY: null
        },
        oLanguage: {
            fnInfoCallback: null
        },
        oBrowser: {
            bScrollOversize: !1,
            bScrollbarLeft: !1,
            bBounding: !1,
            barWidth: 0
        },
        ajax: null,
        aanFeatures: [],
        aoData: [],
        aiDisplay: [],
        aiDisplayMaster: [],
        aIds: {},
        aoColumns: [],
        aoHeader: [],
        aoFooter: [],
        oPreviousSearch: {},
        aoPreSearchCols: [],
        aaSorting: null,
        aaSortingFixed: [],
        asStripeClasses: null,
        asDestroyStripes: [],
        sDestroyWidth: 0,
        aoRowCallback: [],
        aoHeaderCallback: [],
        aoFooterCallback: [],
        aoDrawCallback: [],
        aoRowCreatedCallback: [],
        aoPreDrawCallback: [],
        aoInitComplete: [],
        aoStateSaveParams: [],
        aoStateLoadParams: [],
        aoStateLoaded: [],
        sTableId: "",
        nTable: null,
        nTHead: null,
        nTFoot: null,
        nTBody: null,
        nTableWrapper: null,
        bDeferLoading: !1,
        bInitialised: !1,
        aoOpenRows: [],
        sDom: null,
        searchDelay: null,
        sPaginationType: "two_button",
        iStateDuration: 0,
        aoStateSave: [],
        aoStateLoad: [],
        oSavedState: null,
        oLoadedState: null,
        sAjaxSource: null,
        sAjaxDataProp: null,
        bAjaxDataGet: !0,
        jqXHR: null,
        json: j,
        oAjaxData: j,
        fnServerData: null,
        aoServerParams: [],
        sServerMethod: null,
        fnFormatNumber: null,
        aLengthMenu: null,
        iDraw: 0,
        bDrawing: !1,
        iDrawError: -1,
        _iDisplayLength: 10,
        _iDisplayStart: 0,
        _iRecordsTotal: 0,
        _iRecordsDisplay: 0,
        oClasses: {},
        bFiltered: !1,
        bSorted: !1,
        bSortCellsTop: null,
        oInit: null,
        aoDestroyCallback: [],
        fnRecordsTotal: function() {
            return "ssp" == Wt(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length;
        },
        fnRecordsDisplay: function() {
            return "ssp" == Wt(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length;
        },
        fnDisplayEnd: function() {
            var t = this._iDisplayLength, e = this._iDisplayStart, n = e + t, a = this.aiDisplay.length, r = this.oFeatures, o = r.bPaginate;
            return r.bServerSide ? !1 === o || -1 === t ? e + a : Math.min(e + t, this._iRecordsDisplay) : !o || a < n || -1 === t ? a : n;
        },
        oInstance: null,
        sInstance: null,
        iTabIndex: 0,
        nScrollHead: null,
        nScrollFoot: null,
        aLastSort: [],
        oPlugins: {},
        rowIdFn: null,
        rowId: null
    }, te.ext = Yt = {
        buttons: {},
        classes: {},
        builder: "-source-",
        errMode: "alert",
        feature: [],
        search: [],
        selector: {
            cell: [],
            column: [],
            row: []
        },
        internal: {},
        legacy: {
            ajax: null
        },
        pager: {},
        renderer: {
            pageButton: {},
            header: {}
        },
        order: {},
        type: {
            detect: [],
            search: {},
            order: {}
        },
        _unique: 0,
        fnVersionCheck: te.fnVersionCheck,
        iApiIndex: 0,
        oJUIClasses: {},
        sVersion: te.version
    }, R.extend(Yt, {
        afnFiltering: Yt.search,
        aTypes: Yt.type.detect,
        ofnSearch: Yt.type.search,
        oSort: Yt.type.order,
        afnSortData: Yt.order,
        aoFeatures: Yt.feature,
        oApi: Yt.internal,
        oStdClasses: Yt.classes,
        oPagination: Yt.pager
    }), R.extend(te.ext.classes, {
        sTable: "dataTable",
        sNoFooter: "no-footer",
        sPageButton: "paginate_button",
        sPageButtonActive: "current",
        sPageButtonDisabled: "disabled",
        sStripeOdd: "odd",
        sStripeEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_asc_disabled",
        sSortableDesc: "sorting_desc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sFilterInput: "",
        sLengthSelect: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sHeaderTH: "",
        sFooterTH: "",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sJUIHeader: "",
        sJUIFooter: ""
    });
    var Ae = te.ext.pager;
    R.extend(Ae, {
        simple: function() {
            return [ "previous", "next" ];
        },
        full: function() {
            return [ "first", "previous", "next", "last" ];
        },
        numbers: function(t, e) {
            return [ Et(t, e) ];
        },
        simple_numbers: function(t, e) {
            return [ "previous", Et(t, e), "next" ];
        },
        full_numbers: function(t, e) {
            return [ "first", "previous", Et(t, e), "next", "last" ];
        },
        first_last_numbers: function(t, e) {
            return [ "first", Et(t, e), "last" ];
        },
        _numbers: Et,
        numbers_length: 7
    }), R.extend(!0, te.ext.renderer, {
        pageButton: {
            _: function(l, t, s, e, u, c) {
                var f, d, n, h = l.oClasses, p = l.oLanguage.oPaginate, g = l.oLanguage.oAria.paginate || {}, b = 0, m = function(t, e) {
                    function n(t) {
                        ct(l, t.data.action, !0);
                    }
                    var a, r, o, i;
                    for (a = 0, r = e.length; a < r; a++) if (i = e[a], R.isArray(i)) o = R("<" + (i.DT_el || "div") + "/>").appendTo(t), 
                    m(o, i); else {
                        switch (f = null, d = "", i) {
                          case "ellipsis":
                            t.append('<span class="ellipsis">&#x2026;</span>');
                            break;

                          case "first":
                            f = p.sFirst, d = i + (0 < u ? "" : " " + h.sPageButtonDisabled);
                            break;

                          case "previous":
                            f = p.sPrevious, d = i + (0 < u ? "" : " " + h.sPageButtonDisabled);
                            break;

                          case "next":
                            f = p.sNext, d = i + (u < c - 1 ? "" : " " + h.sPageButtonDisabled);
                            break;

                          case "last":
                            f = p.sLast, d = i + (u < c - 1 ? "" : " " + h.sPageButtonDisabled);
                            break;

                          default:
                            f = i + 1, d = u === i ? h.sPageButtonActive : "";
                        }
                        null !== f && (Nt(o = R("<a>", {
                            "class": h.sPageButton + " " + d,
                            "aria-controls": l.sTableId,
                            "aria-label": g[i],
                            "data-dt-idx": b,
                            tabindex: l.iTabIndex,
                            id: 0 === s && "string" == typeof i ? l.sTableId + "_" + i : null
                        }).html(f).appendTo(t), {
                            action: i
                        }, n), b++);
                    }
                };
                try {
                    n = R(t).find(S.activeElement).data("dt-idx");
                } catch (t) {}
                m(R(t).empty(), e), n !== j && R(t).find("[data-dt-idx=" + n + "]").focus();
            }
        }
    }), R.extend(te.ext.type.detect, [ function(t, e) {
        var n = e.oLanguage.sDecimal;
        return Jt(t, n) ? "num" + n : null;
    }, function(t) {
        if (t && !(t instanceof Date) && !re.test(t)) return null;
        var e = Date.parse(t);
        return null !== e && !isNaN(e) || Ut(t) ? "date" : null;
    }, function(t, e) {
        var n = e.oLanguage.sDecimal;
        return Jt(t, n, !0) ? "num-fmt" + n : null;
    }, function(t, e) {
        var n = e.oLanguage.sDecimal;
        return qt(t, n) ? "html-num" + n : null;
    }, function(t, e) {
        var n = e.oLanguage.sDecimal;
        return qt(t, n, !0) ? "html-num-fmt" + n : null;
    }, function(t) {
        return Ut(t) || "string" == typeof t && -1 !== t.indexOf("<") ? "html" : null;
    } ]), R.extend(te.ext.type.search, {
        html: function(t) {
            return Ut(t) ? t : "string" == typeof t ? t.replace(ne, " ").replace(ae, "") : "";
        },
        string: function(t) {
            return Ut(t) ? t : "string" == typeof t ? t.replace(ne, " ") : t;
        }
    });
    var Fe = function(t, e, n, a) {
        return 0 === t || t && "-" !== t ? (e && (t = Xt(t, e)), t.replace && (n && (t = t.replace(n, "")), 
        a && (t = t.replace(a, ""))), 1 * t) : -1 / 0;
    };
    R.extend(Yt.type.order, {
        "date-pre": function(t) {
            return t = Date.parse(t), isNaN(t) ? -1 / 0 : t;
        },
        "html-pre": function(t) {
            return Ut(t) ? "" : t.replace ? t.replace(/<.*?>/g, "").toLowerCase() : t + "";
        },
        "string-pre": function(t) {
            return Ut(t) ? "" : "string" == typeof t ? t.toLowerCase() : t.toString ? t.toString() : "";
        },
        "string-asc": function(t, e) {
            return t < e ? -1 : e < t ? 1 : 0;
        },
        "string-desc": function(t, e) {
            return t < e ? 1 : e < t ? -1 : 0;
        }
    }), Bt(""), R.extend(!0, te.ext.renderer, {
        header: {
            _: function(r, o, i, l) {
                R(r.nTable).on("order.dt.DT", function(t, e, n, a) {
                    r === e && (t = i.idx, o.removeClass(i.sSortingClass + " " + l.sSortAsc + " " + l.sSortDesc).addClass("asc" == a[t] ? l.sSortAsc : "desc" == a[t] ? l.sSortDesc : i.sSortingClass));
                });
            },
            jqueryui: function(r, o, i, l) {
                R("<div/>").addClass(l.sSortJUIWrapper).append(o.contents()).append(R("<span/>").addClass(l.sSortIcon + " " + i.sSortingClassJUI)).appendTo(o), 
                R(r.nTable).on("order.dt.DT", function(t, e, n, a) {
                    r === e && (t = i.idx, o.removeClass(l.sSortAsc + " " + l.sSortDesc).addClass("asc" == a[t] ? l.sSortAsc : "desc" == a[t] ? l.sSortDesc : i.sSortingClass), 
                    o.find("span." + l.sSortIcon).removeClass(l.sSortJUIAsc + " " + l.sSortJUIDesc + " " + l.sSortJUI + " " + l.sSortJUIAscAllowed + " " + l.sSortJUIDescAllowed).addClass("asc" == a[t] ? l.sSortJUIAsc : "desc" == a[t] ? l.sSortJUIDesc : i.sSortingClassJUI));
                });
            }
        }
    });
    function Le(t) {
        return "string" == typeof t ? t.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t;
    }
    return te.render = {
        number: function(a, r, o, i, l) {
            return {
                display: function(t) {
                    if ("number" != typeof t && "string" != typeof t) return t;
                    var e = t < 0 ? "-" : "", n = parseFloat(t);
                    return isNaN(n) ? Le(t) : (n = n.toFixed(o), t = Math.abs(n), n = parseInt(t, 10), 
                    t = o ? r + (t - n).toFixed(o).substring(2) : "", e + (i || "") + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + t + (l || ""));
                }
            };
        },
        text: function() {
            return {
                display: Le,
                filter: Le
            };
        }
    }, R.extend(te.ext.internal, {
        _fnExternApiFunc: e,
        _fnBuildAjax: V,
        _fnAjaxUpdate: X,
        _fnAjaxParameters: t,
        _fnAjaxUpdateDraw: J,
        _fnAjaxDataSrc: q,
        _fnAddColumn: C,
        _fnColumnOptions: x,
        _fnAdjustColumnSizing: N,
        _fnVisibleToColumnIndex: H,
        _fnColumnIndexToVisible: u,
        _fnVisbleColumns: v,
        _fnGetColumns: I,
        _fnColumnTypes: i,
        _fnApplyColumnDefs: A,
        _fnHungarianMap: o,
        _fnCamelToHungarian: D,
        _fnLanguageCompat: y,
        _fnBrowserDetect: w,
        _fnAddData: F,
        _fnAddTr: L,
        _fnNodeToDataIndex: function(t, e) {
            return e._DT_RowIndex !== j ? e._DT_RowIndex : null;
        },
        _fnNodeToColumnIndex: function(t, e, n) {
            return R.inArray(n, t.aoData[e].anCells);
        },
        _fnGetCellData: P,
        _fnSetCellData: a,
        _fnSplitObjNotation: c,
        _fnGetObjectDataFn: k,
        _fnSetObjectDataFn: p,
        _fnGetDataMaster: g,
        _fnClearTable: l,
        _fnDeleteIndex: f,
        _fnInvalidate: r,
        _fnGetRowElements: s,
        _fnCreateTr: b,
        _fnBuildHead: h,
        _fnDrawHead: O,
        _fnDraw: M,
        _fnReDraw: W,
        _fnAddOptionsHtml: E,
        _fnDetectHeader: B,
        _fnGetUniqueThs: U,
        _fnFeatureHtmlFilter: G,
        _fnFilterComplete: $,
        _fnFilterCustom: z,
        _fnFilterColumn: Y,
        _fnFilter: Z,
        _fnFilterCreateSearch: Q,
        _fnEscapeRegex: de,
        _fnFilterData: K,
        _fnFeatureHtmlInfo: nt,
        _fnUpdateInfo: at,
        _fnInfoMacros: rt,
        _fnInitialise: ot,
        _fnInitComplete: it,
        _fnLengthChange: lt,
        _fnFeatureHtmlLength: st,
        _fnFeatureHtmlPaginate: ut,
        _fnPageChange: ct,
        _fnFeatureHtmlProcessing: ft,
        _fnProcessingDisplay: dt,
        _fnFeatureHtmlTable: ht,
        _fnScrollDraw: pt,
        _fnApplyToChildren: gt,
        _fnCalculateColumnWidths: bt,
        _fnThrottle: be,
        _fnConvertToWidth: mt,
        _fnGetWidestNode: St,
        _fnGetMaxLenString: vt,
        _fnStringToCss: Dt,
        _fnSortFlatten: yt,
        _fnSort: _t,
        _fnSortAria: Tt,
        _fnSortListener: wt,
        _fnSortAttachListener: Ct,
        _fnSortingClasses: xt,
        _fnSortData: It,
        _fnSaveState: At,
        _fnLoadState: Ft,
        _fnSettingsFromNode: Lt,
        _fnLog: Pt,
        _fnMap: Rt,
        _fnBindAction: Nt,
        _fnCallbackReg: Ht,
        _fnCallbackFire: kt,
        _fnLengthOverflow: Ot,
        _fnRenderer: Mt,
        _fnDataSource: Wt,
        _fnRowAttributes: d,
        _fnExtend: jt,
        _fnCalculateEnd: function() {}
    }), ((R.fn.dataTable = te).$ = R).fn.dataTableSettings = te.settings, R.fn.dataTableExt = te.ext, 
    R.fn.DataTable = function(t) {
        return R(this).dataTable(t).api();
    }, R.each(te, function(t, e) {
        R.fn.DataTable[t] = e;
    }), R.fn.dataTable;
}), function(n) {
    "function" == typeof define && define.amd ? define([ "jquery", "datatables.net" ], function(t) {
        return n(t, window, document);
    }) : "object" == typeof exports ? module.exports = function(t, e) {
        return t = t || window, e && e.fn.dataTable || (e = require("datatables.net")(t, e).$), 
        n(e, t, t.document);
    } : n(jQuery, window, document);
}(function(v, t, a, r) {
    var o = v.fn.dataTable;
    return v.extend(!0, o.defaults, {
        dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        renderer: "bootstrap"
    }), v.extend(o.ext.classes, {
        sWrapper: "dataTables_wrapper dt-bootstrap4",
        sFilterInput: "form-control form-control-sm",
        sLengthSelect: "custom-select custom-select-sm form-control form-control-sm",
        sProcessing: "dataTables_processing card",
        sPageButton: "paginate_button page-item"
    }), o.ext.renderer.pageButton.bootstrap = function(l, t, s, e, u, c) {
        var f, d, n, h = new o.Api(l), p = l.oClasses, g = l.oLanguage.oPaginate, b = l.oLanguage.oAria.paginate || {}, m = 0, S = function(t, e) {
            function n(t) {
                t.preventDefault(), v(t.currentTarget).hasClass("disabled") || h.page() == t.data.action || h.page(t.data.action).draw("page");
            }
            var a, r, o, i;
            for (a = 0, r = e.length; a < r; a++) if (i = e[a], v.isArray(i)) S(t, i); else {
                switch (d = f = "", i) {
                  case "ellipsis":
                    f = "&#x2026;", d = "disabled";
                    break;

                  case "first":
                    f = g.sFirst, d = i + (0 < u ? "" : " disabled");
                    break;

                  case "previous":
                    f = g.sPrevious, d = i + (0 < u ? "" : " disabled");
                    break;

                  case "next":
                    f = g.sNext, d = i + (u < c - 1 ? "" : " disabled");
                    break;

                  case "last":
                    f = g.sLast, d = i + (u < c - 1 ? "" : " disabled");
                    break;

                  default:
                    f = i + 1, d = u === i ? "active" : "";
                }
                f && (o = v("<li>", {
                    "class": p.sPageButton + " " + d,
                    id: 0 === s && "string" == typeof i ? l.sTableId + "_" + i : null
                }).append(v("<a>", {
                    href: "#",
                    "aria-controls": l.sTableId,
                    "aria-label": b[i],
                    "data-dt-idx": m,
                    tabindex: l.iTabIndex,
                    "class": "page-link"
                }).html(f)).appendTo(t), l.oApi._fnBindAction(o, {
                    action: i
                }, n), m++);
            }
        };
        try {
            n = v(t).find(a.activeElement).data("dt-idx");
        } catch (t) {}
        S(v(t).empty().html('<ul class="pagination"/>').children("ul"), e), n !== r && v(t).find("[data-dt-idx=" + n + "]").focus();
    }, o;
});