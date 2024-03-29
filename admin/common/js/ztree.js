/*
 * JQuery zTree core v3.5.17-beta.2
 * http://zTree.me/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2014-05-08
 */
(function(p) {
        var G, H, I, J, K, L, r = {}, u = {}, v = {}, M = {
            treeId: "",
            treeObj: null,
            view: {
                addDiyDom: null,
                autoCancelSelected: !0,
                dblClickExpand: !0,
                expandSpeed: "fast",
                fontCss: {},
                nameIsHTML: !1,
                selectedMulti: !0,
                showIcon: !0,
                showLine: !0,
                showTitle: !0,
                txtSelectedEnable: !1
            },
            data: {
                key: {
                    children: "children",
                    name: "name",
                    title: "",
                    url: "url"
                },
                simpleData: {
                    enable: !1,
                    idKey: "id",
                    pIdKey: "pId",
                    rootPId: null
                },
                keep: {
                    parent: !1,
                    leaf: !1
                }
            },
            async: {
                enable: !1,
                contentType: "application/x-www-form-urlencoded",
                type: "post",
                dataType: "text",
                url: "",
                autoParam: [],
                otherParam: [],
                dataFilter: null
            },
            callback: {
                beforeAsync: null,
                beforeClick: null,
                beforeDblClick: null,
                beforeRightClick: null,
                beforeMouseDown: null,
                beforeMouseUp: null,
                beforeExpand: null,
                beforeCollapse: null,
                beforeRemove: null,
                onAsyncError: null,
                onAsyncSuccess: null,
                onNodeCreated: null,
                onClick: null,
                onDblClick: null,
                onRightClick: null,
                onMouseDown: null,
                onMouseUp: null,
                onExpand: null,
                onCollapse: null,
                onRemove: null
            }
        }, w = [function(b) {
            var a = b.treeObj
                , c = e.event;
            a.bind(c.NODECREATED, function(a, c, g) {
                j.apply(b.callback.onNodeCreated, [a, c, g])
            });
            a.bind(c.CLICK, function(a, c, g, l, h) {
                j.apply(b.callback.onClick, [c, g, l, h])
            });
            a.bind(c.EXPAND, function(a, c, g) {
                j.apply(b.callback.onExpand, [a, c, g])
            });
            a.bind(c.COLLAPSE, function(a, c, g) {
                j.apply(b.callback.onCollapse, [a, c, g])
            });
            a.bind(c.ASYNC_SUCCESS, function(a, c, g, l) {
                j.apply(b.callback.onAsyncSuccess, [a, c, g, l])
            });
            a.bind(c.ASYNC_ERROR, function(a, c, g, l, h, e) {
                j.apply(b.callback.onAsyncError, [a, c, g, l, h, e])
            });
            a.bind(c.REMOVE, function(a, c, g) {
                j.apply(b.callback.onRemove, [a, c, g])
            })
        }
        ], x = [function(b) {
            var a = e.event;
            b.treeObj.unbind(a.NODECREATED).unbind(a.CLICK).unbind(a.EXPAND).unbind(a.COLLAPSE).unbind(a.ASYNC_SUCCESS).unbind(a.ASYNC_ERROR).unbind(a.REMOVE)
        }
        ], y = [function(b) {
            var a = h.getCache(b);
            a || (a = {},
                h.setCache(b, a));
            a.nodes = [];
            a.doms = []
        }
        ], z = [function(b, a, c, d, f, g) {
            if (c) {
                var l = h.getRoot(b)
                    , e = b.data.key.children;
                c.level = a;
                c.tId = b.treeId + "_" + ++l.zId;
                c.parentTId = d ? d.tId : null;
                c.open = typeof c.open == "string" ? j.eqs(c.open, "true") : !!c.open;
                c[e] && c[e].length > 0 ? (c.isParent = !0,
                    c.zAsync = !0) : (c.isParent = typeof c.isParent == "string" ? j.eqs(c.isParent, "true") : !!c.isParent,
                    c.open = c.isParent && !b.async.enable ? c.open : !1,
                    c.zAsync = !c.isParent);
                c.isFirstNode = f;
                c.isLastNode = g;
                c.getParentNode = function() {
                    return h.getNodeCache(b, c.parentTId)
                }
                ;
                c.getPreNode = function() {
                    return h.getPreNode(b, c)
                }
                ;
                c.getNextNode = function() {
                    return h.getNextNode(b, c)
                }
                ;
                c.isAjaxing = !1;
                h.fixPIdKeyValue(b, c)
            }
        }
        ], s = [function(b) {
            var a = b.target
                , c = h.getSetting(b.data.treeId)
                , d = ""
                , f = null
                , g = ""
                , l = ""
                , i = null
                , n = null
                , k = null;
            if (j.eqs(b.type, "mousedown"))
                l = "mousedown";
            else if (j.eqs(b.type, "mouseup"))
                l = "mouseup";
            else if (j.eqs(b.type, "contextmenu"))
                l = "contextmenu";
            else if (j.eqs(b.type, "click"))
                if (j.eqs(a.tagName, "span") && a.getAttribute("treeNode" + e.id.SWITCH) !== null)
                    d = j.getNodeMainDom(a).id,
                        g = "switchNode";
                else {
                    if (k = j.getMDom(c, a, [{
                        tagName: "a",
                        attrName: "treeNode" + e.id.A
                    }]))
                        d = j.getNodeMainDom(k).id,
                            g = "clickNode"
                }
            else if (j.eqs(b.type, "dblclick") && (l = "dblclick",
                k = j.getMDom(c, a, [{
                    tagName: "a",
                    attrName: "treeNode" + e.id.A
                }])))
                d = j.getNodeMainDom(k).id,
                    g = "switchNode";
            if (l.length > 0 && d.length == 0 && (k = j.getMDom(c, a, [{
                tagName: "a",
                attrName: "treeNode" + e.id.A
            }])))
                d = j.getNodeMainDom(k).id;
            if (d.length > 0)
                switch (f = h.getNodeCache(c, d),
                    g) {
                    case "switchNode":
                        f.isParent ? j.eqs(b.type, "click") || j.eqs(b.type, "dblclick") && j.apply(c.view.dblClickExpand, [c.treeId, f], c.view.dblClickExpand) ? i = G : g = "" : g = "";
                        break;
                    case "clickNode":
                        i = H
                }
            switch (l) {
                case "mousedown":
                    n = I;
                    break;
                case "mouseup":
                    n = J;
                    break;
                case "dblclick":
                    n = K;
                    break;
                case "contextmenu":
                    n = L
            }
            return {
                stop: !1,
                node: f,
                nodeEventType: g,
                nodeEventCallback: i,
                treeEventType: l,
                treeEventCallback: n
            }
        }
        ], A = [function(b) {
            var a = h.getRoot(b);
            a || (a = {},
                h.setRoot(b, a));
            a[b.data.key.children] = [];
            a.expandTriggerFlag = !1;
            a.curSelectedList = [];
            a.noSelection = !0;
            a.createdNodes = [];
            a.zId = 0;
            a._ver = (new Date).getTime()
        }
        ], B = [], C = [], D = [], E = [], F = [], h = {
            addNodeCache: function(b, a) {
                h.getCache(b).nodes[h.getNodeCacheId(a.tId)] = a
            },
            getNodeCacheId: function(b) {
                return b.substring(b.lastIndexOf("_") + 1)
            },
            addAfterA: function(b) {
                C.push(b)
            },
            addBeforeA: function(b) {
                B.push(b)
            },
            addInnerAfterA: function(b) {
                E.push(b)
            },
            addInnerBeforeA: function(b) {
                D.push(b)
            },
            addInitBind: function(b) {
                w.push(b)
            },
            addInitUnBind: function(b) {
                x.push(b)
            },
            addInitCache: function(b) {
                y.push(b)
            },
            addInitNode: function(b) {
                z.push(b)
            },
            addInitProxy: function(b, a) {
                a ? s.splice(0, 0, b) : s.push(b)
            },
            addInitRoot: function(b) {
                A.push(b)
            },
            addNodesData: function(b, a, c) {
                var d = b.data.key.children;
                a[d] || (a[d] = []);
                if (a[d].length > 0)
                    a[d][a[d].length - 1].isLastNode = !1,
                        i.setNodeLineIcos(b, a[d][a[d].length - 1]);
                a.isParent = !0;
                a[d] = a[d].concat(c)
            },
            addSelectedNode: function(b, a) {
                var c = h.getRoot(b);
                h.isSelectedNode(b, a) || c.curSelectedList.push(a)
            },
            addCreatedNode: function(b, a) {
                (b.callback.onNodeCreated || b.view.addDiyDom) && h.getRoot(b).createdNodes.push(a)
            },
            addZTreeTools: function(b) {
                F.push(b)
            },
            exSetting: function(b) {
                p.extend(!0, M, b)
            },
            fixPIdKeyValue: function(b, a) {
                b.data.simpleData.enable && (a[b.data.simpleData.pIdKey] = a.parentTId ? a.getParentNode()[b.data.simpleData.idKey] : b.data.simpleData.rootPId)
            },
            getAfterA: function(b, a, c) {
                for (var d = 0, f = C.length; d < f; d++)
                    C[d].apply(this, arguments)
            },
            getBeforeA: function(b, a, c) {
                for (var d = 0, f = B.length; d < f; d++)
                    B[d].apply(this, arguments)
            },
            getInnerAfterA: function(b, a, c) {
                for (var d = 0, f = E.length; d < f; d++)
                    E[d].apply(this, arguments)
            },
            getInnerBeforeA: function(b, a, c) {
                for (var d = 0, f = D.length; d < f; d++)
                    D[d].apply(this, arguments)
            },
            getCache: function(b) {
                return v[b.treeId]
            },
            getNextNode: function(b, a) {
                if (!a)
                    return null;
                for (var c = b.data.key.children, d = a.parentTId ? a.getParentNode() : h.getRoot(b), f = 0, g = d[c].length - 1; f <= g; f++)
                    if (d[c][f] === a)
                        return f == g ? null : d[c][f + 1];
                return null
            },
            getNodeByParam: function(b, a, c, d) {
                if (!a || !c)
                    return null;
                for (var f = b.data.key.children, g = 0, l = a.length; g < l; g++) {
                    if (a[g][c] == d)
                        return a[g];
                    var e = h.getNodeByParam(b, a[g][f], c, d);
                    if (e)
                        return e
                }
                return null
            },
            getNodeCache: function(b, a) {
                if (!a)
                    return null;
                var c = v[b.treeId].nodes[h.getNodeCacheId(a)];
                return c ? c : null
            },
            getNodeName: function(b, a) {
                return "" + a[b.data.key.name]
            },
            getNodeTitle: function(b, a) {
                return "" + a[b.data.key.title === "" ? b.data.key.name : b.data.key.title]
            },
            getNodes: function(b) {
                return h.getRoot(b)[b.data.key.children]
            },
            getNodesByParam: function(b, a, c, d) {
                if (!a || !c)
                    return [];
                for (var f = b.data.key.children, g = [], l = 0, e = a.length; l < e; l++)
                    a[l][c] == d && g.push(a[l]),
                        g = g.concat(h.getNodesByParam(b, a[l][f], c, d));
                return g
            },
            getNodesByParamFuzzy: function(b, a, c, d) {
                if (!a || !c)
                    return [];
                for (var f = b.data.key.children, g = [], d = d.toLowerCase(), l = 0, e = a.length; l < e; l++)
                    typeof a[l][c] == "string" && a[l][c].toLowerCase().indexOf(d) > -1 && g.push(a[l]),
                        g = g.concat(h.getNodesByParamFuzzy(b, a[l][f], c, d));
                return g
            },
            getNodesByFilter: function(b, a, c, d, f) {
                if (!a)
                    return d ? null : [];
                for (var g = b.data.key.children, e = d ? null : [], i = 0, n = a.length; i < n; i++) {
                    if (j.apply(c, [a[i], f], !1)) {
                        if (d)
                            return a[i];
                        e.push(a[i])
                    }
                    var k = h.getNodesByFilter(b, a[i][g], c, d, f);
                    if (d && k)
                        return k;
                    e = d ? k : e.concat(k)
                }
                return e
            },
            getPreNode: function(b, a) {
                if (!a)
                    return null;
                for (var c = b.data.key.children, d = a.parentTId ? a.getParentNode() : h.getRoot(b), f = 0, g = d[c].length; f < g; f++)
                    if (d[c][f] === a)
                        return f == 0 ? null : d[c][f - 1];
                return null
            },
            getRoot: function(b) {
                return b ? u[b.treeId] : null
            },
            getRoots: function() {
                return u
            },
            getSetting: function(b) {
                return r[b]
            },
            getSettings: function() {
                return r
            },
            getZTreeTools: function(b) {
                return (b = this.getRoot(this.getSetting(b))) ? b.treeTools : null
            },
            initCache: function(b) {
                for (var a = 0, c = y.length; a < c; a++)
                    y[a].apply(this, arguments)
            },
            initNode: function(b, a, c, d, f, g) {
                for (var e = 0, h = z.length; e < h; e++)
                    z[e].apply(this, arguments)
            },
            initRoot: function(b) {
                for (var a = 0, c = A.length; a < c; a++)
                    A[a].apply(this, arguments)
            },
            isSelectedNode: function(b, a) {
                for (var c = h.getRoot(b), d = 0, f = c.curSelectedList.length; d < f; d++)
                    if (a === c.curSelectedList[d])
                        return !0;
                return !1
            },
            removeNodeCache: function(b, a) {
                var c = b.data.key.children;
                if (a[c])
                    for (var d = 0, f = a[c].length; d < f; d++)
                        arguments.callee(b, a[c][d]);
                h.getCache(b).nodes[h.getNodeCacheId(a.tId)] = null
            },
            removeSelectedNode: function(b, a) {
                for (var c = h.getRoot(b), d = 0, f = c.curSelectedList.length; d < f; d++)
                    if (a === c.curSelectedList[d] || !h.getNodeCache(b, c.curSelectedList[d].tId))
                        c.curSelectedList.splice(d, 1),
                            d--,
                            f--
            },
            setCache: function(b, a) {
                v[b.treeId] = a
            },
            setRoot: function(b, a) {
                u[b.treeId] = a
            },
            setZTreeTools: function(b, a) {
                for (var c = 0, d = F.length; c < d; c++)
                    F[c].apply(this, arguments)
            },
            transformToArrayFormat: function(b, a) {
                if (!a)
                    return [];
                var c = b.data.key.children
                    , d = [];
                if (j.isArray(a))
                    for (var f = 0, g = a.length; f < g; f++)
                        d.push(a[f]),
                        a[f][c] && (d = d.concat(h.transformToArrayFormat(b, a[f][c])));
                else
                    d.push(a),
                    a[c] && (d = d.concat(h.transformToArrayFormat(b, a[c])));
                return d
            },
            transformTozTreeFormat: function(b, a) {
                var c, d, f = b.data.simpleData.idKey, g = b.data.simpleData.pIdKey, e = b.data.key.children;
                if (!f || f == "" || !a)
                    return [];
                if (j.isArray(a)) {
                    var h = []
                        , i = [];
                    for (c = 0,
                             d = a.length; c < d; c++)
                        i[a[c][f]] = a[c];
                    for (c = 0,
                             d = a.length; c < d; c++)
                        i[a[c][g]] && a[c][f] != a[c][g] ? (i[a[c][g]][e] || (i[a[c][g]][e] = []),
                            i[a[c][g]][e].push(a[c])) : h.push(a[c]);
                    return h
                } else
                    return [a]
            }
        }, m = {
            bindEvent: function(b) {
                for (var a = 0, c = w.length; a < c; a++)
                    w[a].apply(this, arguments)
            },
            unbindEvent: function(b) {
                for (var a = 0, c = x.length; a < c; a++)
                    x[a].apply(this, arguments)
            },
            bindTree: function(b) {
                var a = {
                    treeId: b.treeId
                }
                    , c = b.treeObj;
                b.view.txtSelectedEnable || c.bind("selectstart", function(a) {
                    a = a.originalEvent.srcElement.nodeName.toLowerCase();
                    return a === "input" || a === "textarea"
                }).css({
                    "-moz-user-select": "-moz-none"
                });
                c.bind("click", a, m.proxy);
                c.bind("dblclick", a, m.proxy);
                c.bind("mouseover", a, m.proxy);
                c.bind("mouseout", a, m.proxy);
                c.bind("mousedown", a, m.proxy);
                c.bind("mouseup", a, m.proxy);
                c.bind("contextmenu", a, m.proxy)
            },
            unbindTree: function(b) {
                b.treeObj.unbind("click", m.proxy).unbind("dblclick", m.proxy).unbind("mouseover", m.proxy).unbind("mouseout", m.proxy).unbind("mousedown", m.proxy).unbind("mouseup", m.proxy).unbind("contextmenu", m.proxy)
            },
            doProxy: function(b) {
                for (var a = [], c = 0, d = s.length; c < d; c++) {
                    var f = s[c].apply(this, arguments);
                    a.push(f);
                    if (f.stop)
                        break
                }
                return a
            },
            proxy: function(b) {
                var a = h.getSetting(b.data.treeId);
                if (!j.uCanDo(a, b))
                    return !0;
                for (var a = m.doProxy(b), c = !0, d = 0, f = a.length; d < f; d++) {
                    var g = a[d];
                    g.nodeEventCallback && (c = g.nodeEventCallback.apply(g, [b, g.node]) && c);
                    g.treeEventCallback && (c = g.treeEventCallback.apply(g, [b, g.node]) && c)
                }
                return c
            }
        };
        G = function(b, a) {
            var c = h.getSetting(b.data.treeId);
            if (a.open) {
                if (j.apply(c.callback.beforeCollapse, [c.treeId, a], !0) == !1)
                    return !0
            } else if (j.apply(c.callback.beforeExpand, [c.treeId, a], !0) == !1)
                return !0;
            h.getRoot(c).expandTriggerFlag = !0;
            i.switchNode(c, a);
            return !0
        }
        ;
        H = function(b, a) {
            var c = h.getSetting(b.data.treeId)
                , d = c.view.autoCancelSelected && (b.ctrlKey || b.metaKey) && h.isSelectedNode(c, a) ? 0 : c.view.autoCancelSelected && (b.ctrlKey || b.metaKey) && c.view.selectedMulti ? 2 : 1;
            if (j.apply(c.callback.beforeClick, [c.treeId, a, d], !0) == !1)
                return !0;
            d === 0 ? i.cancelPreSelectedNode(c, a) : i.selectNode(c, a, d === 2);
            c.treeObj.trigger(e.event.CLICK, [b, c.treeId, a, d]);
            return !0
        }
        ;
        I = function(b, a) {
            var c = h.getSetting(b.data.treeId);
            j.apply(c.callback.beforeMouseDown, [c.treeId, a], !0) && j.apply(c.callback.onMouseDown, [b, c.treeId, a]);
            return !0
        }
        ;
        J = function(b, a) {
            var c = h.getSetting(b.data.treeId);
            j.apply(c.callback.beforeMouseUp, [c.treeId, a], !0) && j.apply(c.callback.onMouseUp, [b, c.treeId, a]);
            return !0
        }
        ;
        K = function(b, a) {
            var c = h.getSetting(b.data.treeId);
            j.apply(c.callback.beforeDblClick, [c.treeId, a], !0) && j.apply(c.callback.onDblClick, [b, c.treeId, a]);
            return !0
        }
        ;
        L = function(b, a) {
            var c = h.getSetting(b.data.treeId);
            j.apply(c.callback.beforeRightClick, [c.treeId, a], !0) && j.apply(c.callback.onRightClick, [b, c.treeId, a]);
            return typeof c.callback.onRightClick != "function"
        }
        ;
        var j = {
            apply: function(b, a, c) {
                return typeof b == "function" ? b.apply(N, a ? a : []) : c
            },
            canAsync: function(b, a) {
                var c = b.data.key.children;
                return b.async.enable && a && a.isParent && !(a.zAsync || a[c] && a[c].length > 0)
            },
            clone: function(b) {
                if (b === null)
                    return null;
                var a = j.isArray(b) ? [] : {}, c;
                for (c in b)
                    a[c] = b[c]instanceof Date ? new Date(b[c].getTime()) : typeof b[c] === "object" ? arguments.callee(b[c]) : b[c];
                return a
            },
            eqs: function(b, a) {
                return b.toLowerCase() === a.toLowerCase()
            },
            isArray: function(b) {
                return Object.prototype.toString.apply(b) === "[object Array]"
            },
            $: function(b, a, c) {
                a && typeof a != "string" && (c = a,
                    a = "");
                return typeof b == "string" ? p(b, c ? c.treeObj.get(0).ownerDocument : null) : p("#" + b.tId + a, c ? c.treeObj : null)
            },
            getMDom: function(b, a, c) {
                if (!a)
                    return null;
                for (; a && a.id !== b.treeId; ) {
                    for (var d = 0, f = c.length; a.tagName && d < f; d++)
                        if (j.eqs(a.tagName, c[d].tagName) && a.getAttribute(c[d].attrName) !== null)
                            return a;
                    a = a.parentNode
                }
                return null
            },
            getNodeMainDom: function(b) {
                return p(b).parent("li").get(0) || p(b).parentsUntil("li").parent().get(0)
            },
            isChildOrSelf: function(b, a) {
                return p(b).closest("#" + a).length > 0
            },
            uCanDo: function() {
                return !0
            }
        }
            , i = {
            addNodes: function(b, a, c, d) {
                if (!b.data.keep.leaf || !a || a.isParent)
                    if (j.isArray(c) || (c = [c]),
                    b.data.simpleData.enable && (c = h.transformTozTreeFormat(b, c)),
                        a) {
                        var f = k(a, e.id.SWITCH, b)
                            , g = k(a, e.id.ICON, b)
                            , l = k(a, e.id.UL, b);
                        if (!a.open)
                            i.replaceSwitchClass(a, f, e.folder.CLOSE),
                                i.replaceIcoClass(a, g, e.folder.CLOSE),
                                a.open = !1,
                                l.css({
                                    display: "none"
                                });
                        h.addNodesData(b, a, c);
                        i.createNodes(b, a.level + 1, c, a);
                        d || i.expandCollapseParentNode(b, a, !0)
                    } else
                        h.addNodesData(b, h.getRoot(b), c),
                            i.createNodes(b, 0, c, null)
            },
            appendNodes: function(b, a, c, d, f, g) {
                if (!c)
                    return [];
                for (var e = [], j = b.data.key.children, k = 0, m = c.length; k < m; k++) {
                    var o = c[k];
                    if (f) {
                        var t = (d ? d : h.getRoot(b))[j].length == c.length && k == 0;
                        h.initNode(b, a, o, d, t, k == c.length - 1, g);
                        h.addNodeCache(b, o)
                    }
                    t = [];
                    o[j] && o[j].length > 0 && (t = i.appendNodes(b, a + 1, o[j], o, f, g && o.open));
                    g && (i.makeDOMNodeMainBefore(e, b, o),
                        i.makeDOMNodeLine(e, b, o),
                        h.getBeforeA(b, o, e),
                        i.makeDOMNodeNameBefore(e, b, o),
                        h.getInnerBeforeA(b, o, e),
                        i.makeDOMNodeIcon(e, b, o),
                        h.getInnerAfterA(b, o, e),
                        i.makeDOMNodeNameAfter(e, b, o),
                        h.getAfterA(b, o, e),
                    o.isParent && o.open && i.makeUlHtml(b, o, e, t.join("")),
                        i.makeDOMNodeMainAfter(e, b, o),
                        h.addCreatedNode(b, o))
                }
                return e
            },
            appendParentULDom: function(b, a) {
                var c = []
                    , d = k(a, b);
                !d.get(0) && a.parentTId && (i.appendParentULDom(b, a.getParentNode()),
                    d = k(a, b));
                var f = k(a, e.id.UL, b);
                f.get(0) && f.remove();
                f = i.appendNodes(b, a.level + 1, a[b.data.key.children], a, !1, !0);
                i.makeUlHtml(b, a, c, f.join(""));
                d.append(c.join(""))
            },
            asyncNode: function(b, a, c, d) {
                var f, g;
                if (a && !a.isParent)
                    return j.apply(d),
                        !1;
                else if (a && a.isAjaxing)
                    return !1;
                else if (j.apply(b.callback.beforeAsync, [b.treeId, a], !0) == !1)
                    return j.apply(d),
                        !1;
                if (a)
                    a.isAjaxing = !0,
                        k(a, e.id.ICON, b).attr({
                            style: "",
                            "class": e.className.BUTTON + " " + e.className.ICO_LOADING
                        });
                var l = {};
                for (f = 0,
                         g = b.async.autoParam.length; a && f < g; f++) {
                    var q = b.async.autoParam[f].split("=")
                        , n = q;
                    q.length > 1 && (n = q[1],
                        q = q[0]);
                    l[n] = a[q]
                }
                if (j.isArray(b.async.otherParam))
                    for (f = 0,
                             g = b.async.otherParam.length; f < g; f += 2)
                        l[b.async.otherParam[f]] = b.async.otherParam[f + 1];
                else
                    for (var m in b.async.otherParam)
                        l[m] = b.async.otherParam[m];
                var o = h.getRoot(b)._ver;
                p.ajax({
                    contentType: b.async.contentType,
                    type: b.async.type,
                    url: j.apply(b.async.url, [b.treeId, a], b.async.url),
                    data: l,
                    dataType: b.async.dataType,
                    success: function(f) {
                        if (o == h.getRoot(b)._ver) {
                            var g = [];
                            try {
                                g = !f || f.length == 0 ? [] : typeof f == "string" ? eval("(" + f + ")") : f
                            } catch (l) {
                                g = f
                            }
                            if (a)
                                a.isAjaxing = null,
                                    a.zAsync = !0;
                            i.setNodeLineIcos(b, a);
                            g && g !== "" ? (g = j.apply(b.async.dataFilter, [b.treeId, a, g], g),
                                i.addNodes(b, a, g ? j.clone(g) : [], !!c)) : i.addNodes(b, a, [], !!c);
                            b.treeObj.trigger(e.event.ASYNC_SUCCESS, [b.treeId, a, f]);
                            j.apply(d)
                        }
                    },
                    error: function(c, d, f) {
                        if (o == h.getRoot(b)._ver) {
                            if (a)
                                a.isAjaxing = null;
                            i.setNodeLineIcos(b, a);
                            b.treeObj.trigger(e.event.ASYNC_ERROR, [b.treeId, a, c, d, f])
                        }
                    }
                });
                return !0
            },
            cancelPreSelectedNode: function(b, a) {
                for (var c = h.getRoot(b).curSelectedList, d = c.length - 1; d >= 0; d--)
                    if (!a || a === c[d])
                        if (k(c[d], e.id.A, b).removeClass(e.node.CURSELECTED),
                            a) {
                            h.removeSelectedNode(b, a);
                            break
                        }
                if (!a)
                    h.getRoot(b).curSelectedList = []
            },
            createNodeCallback: function(b) {
                if (b.callback.onNodeCreated || b.view.addDiyDom)
                    for (var a = h.getRoot(b); a.createdNodes.length > 0; ) {
                        var c = a.createdNodes.shift();
                        j.apply(b.view.addDiyDom, [b.treeId, c]);
                        b.callback.onNodeCreated && b.treeObj.trigger(e.event.NODECREATED, [b.treeId, c])
                    }
            },
            createNodes: function(b, a, c, d) {
                if (c && c.length != 0) {
                    var f = h.getRoot(b)
                        , g = b.data.key.children
                        , g = !d || d.open || !!k(d[g][0], b).get(0);
                    f.createdNodes = [];
                    a = i.appendNodes(b, a, c, d, !0, g);
                    d ? (d = k(d, e.id.UL, b),
                    d.get(0) && d.append(a.join(""))) : b.treeObj.append(a.join(""));
                    i.createNodeCallback(b)
                }
            },
            destroy: function(b) {
                b && (h.initCache(b),
                    h.initRoot(b),
                    m.unbindTree(b),
                    m.unbindEvent(b),
                    b.treeObj.empty(),
                    delete r[b.treeId])
            },
            expandCollapseNode: function(b, a, c, d, f) {
                var g = h.getRoot(b)
                    , l = b.data.key.children;
                if (a) {
                    if (g.expandTriggerFlag) {
                        var q = f
                            , f = function() {
                            q && q();
                            a.open ? b.treeObj.trigger(e.event.EXPAND, [b.treeId, a]) : b.treeObj.trigger(e.event.COLLAPSE, [b.treeId, a])
                        };
                        g.expandTriggerFlag = !1
                    }
                    if (!a.open && a.isParent && (!k(a, e.id.UL, b).get(0) || a[l] && a[l].length > 0 && !k(a[l][0], b).get(0)))
                        i.appendParentULDom(b, a),
                            i.createNodeCallback(b);
                    if (a.open == c)
                        j.apply(f, []);
                    else {
                        var c = k(a, e.id.UL, b)
                            , g = k(a, e.id.SWITCH, b)
                            , n = k(a, e.id.ICON, b);
                        a.isParent ? (a.open = !a.open,
                        a.iconOpen && a.iconClose && n.attr("style", i.makeNodeIcoStyle(b, a)),
                            a.open ? (i.replaceSwitchClass(a, g, e.folder.OPEN),
                                i.replaceIcoClass(a, n, e.folder.OPEN),
                                d == !1 || b.view.expandSpeed == "" ? (c.show(),
                                    j.apply(f, [])) : a[l] && a[l].length > 0 ? c.slideDown(b.view.expandSpeed, f) : (c.show(),
                                    j.apply(f, []))) : (i.replaceSwitchClass(a, g, e.folder.CLOSE),
                                i.replaceIcoClass(a, n, e.folder.CLOSE),
                                d == !1 || b.view.expandSpeed == "" || !(a[l] && a[l].length > 0) ? (c.hide(),
                                    j.apply(f, [])) : c.slideUp(b.view.expandSpeed, f))) : j.apply(f, [])
                    }
                } else
                    j.apply(f, [])
            },
            expandCollapseParentNode: function(b, a, c, d, f) {
                a && (a.parentTId ? (i.expandCollapseNode(b, a, c, d),
                a.parentTId && i.expandCollapseParentNode(b, a.getParentNode(), c, d, f)) : i.expandCollapseNode(b, a, c, d, f))
            },
            expandCollapseSonNode: function(b, a, c, d, f) {
                var g = h.getRoot(b)
                    , e = b.data.key.children
                    , g = a ? a[e] : g[e]
                    , e = a ? !1 : d
                    , j = h.getRoot(b).expandTriggerFlag;
                h.getRoot(b).expandTriggerFlag = !1;
                if (g)
                    for (var k = 0, m = g.length; k < m; k++)
                        g[k] && i.expandCollapseSonNode(b, g[k], c, e);
                h.getRoot(b).expandTriggerFlag = j;
                i.expandCollapseNode(b, a, c, d, f)
            },
            makeDOMNodeIcon: function(b, a, c) {
                var d = h.getNodeName(a, c)
                    , d = a.view.nameIsHTML ? d : d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                b.push("<span id='", c.tId, e.id.ICON, "' title='' treeNode", e.id.ICON, " class='", i.makeNodeIcoClass(a, c), "' style='", i.makeNodeIcoStyle(a, c), "'></span><span id='", c.tId, e.id.SPAN, "'>", d, "</span>")
            },
            makeDOMNodeLine: function(b, a, c) {
                b.push("<span id='", c.tId, e.id.SWITCH, "' title='' class='", i.makeNodeLineClass(a, c), "' treeNode", e.id.SWITCH, "></span>")
            },
            makeDOMNodeMainAfter: function(b) {
                b.push("</li>")
            },
            makeDOMNodeMainBefore: function(b, a, c) {
                b.push("<li id='", c.tId, "' class='", e.className.LEVEL, c.level, "' tabindex='0' hidefocus='true' treenode>")
            },
            makeDOMNodeNameAfter: function(b) {
                b.push("</a>")
            },
            makeDOMNodeNameBefore: function(b, a, c) {
                var d = h.getNodeTitle(a, c), f = i.makeNodeUrl(a, c), g = i.makeNodeFontCss(a, c), l = [], k;
                for (k in g)
                    l.push(k, ":", g[k], ";");
                b.push("<a id='", c.tId, e.id.A, "' class='", e.className.LEVEL, c.level, "' treeNode", e.id.A, ' onclick="', c.click || "", '" ', f != null && f.length > 0 ? "href='" + f + "'" : "", " target='", i.makeNodeTarget(c), "' style='", l.join(""), "'");
                j.apply(a.view.showTitle, [a.treeId, c], a.view.showTitle) && d && b.push("title='", d.replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "'");
                b.push(">")
            },
            makeNodeFontCss: function(b, a) {
                var c = j.apply(b.view.fontCss, [b.treeId, a], b.view.fontCss);
                return c && typeof c != "function" ? c : {}
            },
            makeNodeIcoClass: function(b, a) {
                var c = ["ico"];
                a.isAjaxing || (c[0] = (a.iconSkin ? a.iconSkin + "_" : "") + c[0],
                    a.isParent ? c.push(a.open ? e.folder.OPEN : e.folder.CLOSE) : c.push(e.folder.DOCU));
                return e.className.BUTTON + " " + c.join("_")
            },
            makeNodeIcoStyle: function(b, a) {
                var c = [];
                if (!a.isAjaxing) {
                    var d = a.isParent && a.iconOpen && a.iconClose ? a.open ? a.iconOpen : a.iconClose : a.icon;
                    d && c.push("background:url(", d, ") 0 0 no-repeat;");
                    (b.view.showIcon == !1 || !j.apply(b.view.showIcon, [b.treeId, a], !0)) && c.push("width:0px;height:0px;")
                }
                return c.join("")
            },
            makeNodeLineClass: function(b, a) {
                var c = [];
                b.view.showLine ? a.level == 0 && a.isFirstNode && a.isLastNode ? c.push(e.line.ROOT) : a.level == 0 && a.isFirstNode ? c.push(e.line.ROOTS) : a.isLastNode ? c.push(e.line.BOTTOM) : c.push(e.line.CENTER) : c.push(e.line.NOLINE);
                a.isParent ? c.push(a.open ? e.folder.OPEN : e.folder.CLOSE) : c.push(e.folder.DOCU);
                return i.makeNodeLineClassEx(a) + c.join("_")
            },
            makeNodeLineClassEx: function(b) {
                return e.className.BUTTON + " " + e.className.LEVEL + b.level + " " + e.className.SWITCH + " "
            },
            makeNodeTarget: function(b) {
                return b.target || "_blank"
            },
            makeNodeUrl: function(b, a) {
                var c = b.data.key.url;
                return a[c] ? a[c] : null
            },
            makeUlHtml: function(b, a, c, d) {
                c.push("<ul id='", a.tId, e.id.UL, "' class='", e.className.LEVEL, a.level, " ", i.makeUlLineClass(b, a), "' style='display:", a.open ? "block" : "none", "'>");
                c.push(d);
                c.push("</ul>")
            },
            makeUlLineClass: function(b, a) {
                return b.view.showLine && !a.isLastNode ? e.line.LINE : ""
            },
            removeChildNodes: function(b, a) {
                if (a) {
                    var c = b.data.key.children
                        , d = a[c];
                    if (d) {
                        for (var f = 0, g = d.length; f < g; f++)
                            h.removeNodeCache(b, d[f]);
                        h.removeSelectedNode(b);
                        delete a[c];
                        b.data.keep.parent ? k(a, e.id.UL, b).empty() : (a.isParent = !1,
                            a.open = !1,
                            c = k(a, e.id.SWITCH, b),
                            d = k(a, e.id.ICON, b),
                            i.replaceSwitchClass(a, c, e.folder.DOCU),
                            i.replaceIcoClass(a, d, e.folder.DOCU),
                            k(a, e.id.UL, b).remove())
                    }
                }
            },
            setFirstNode: function(b, a) {
                var c = b.data.key.children;
                if (a[c].length > 0)
                    a[c][0].isFirstNode = !0
            },
            setLastNode: function(b, a) {
                var c = b.data.key.children
                    , d = a[c].length;
                if (d > 0)
                    a[c][d - 1].isLastNode = !0
            },
            removeNode: function(b, a) {
                var c = h.getRoot(b)
                    , d = b.data.key.children
                    , f = a.parentTId ? a.getParentNode() : c;
                a.isFirstNode = !1;
                a.isLastNode = !1;
                a.getPreNode = function() {
                    return null
                }
                ;
                a.getNextNode = function() {
                    return null
                }
                ;
                if (h.getNodeCache(b, a.tId)) {
                    k(a, b).remove();
                    h.removeNodeCache(b, a);
                    h.removeSelectedNode(b, a);
                    for (var g = 0, l = f[d].length; g < l; g++)
                        if (f[d][g].tId == a.tId) {
                            f[d].splice(g, 1);
                            break
                        }
                    i.setFirstNode(b, f);
                    i.setLastNode(b, f);
                    var j, g = f[d].length;
                    if (!b.data.keep.parent && g == 0)
                        f.isParent = !1,
                            f.open = !1,
                            g = k(f, e.id.UL, b),
                            l = k(f, e.id.SWITCH, b),
                            j = k(f, e.id.ICON, b),
                            i.replaceSwitchClass(f, l, e.folder.DOCU),
                            i.replaceIcoClass(f, j, e.folder.DOCU),
                            g.css("display", "none");
                    else if (b.view.showLine && g > 0) {
                        var n = f[d][g - 1]
                            , g = k(n, e.id.UL, b)
                            , l = k(n, e.id.SWITCH, b);
                        j = k(n, e.id.ICON, b);
                        f == c ? f[d].length == 1 ? i.replaceSwitchClass(n, l, e.line.ROOT) : (c = k(f[d][0], e.id.SWITCH, b),
                            i.replaceSwitchClass(f[d][0], c, e.line.ROOTS),
                            i.replaceSwitchClass(n, l, e.line.BOTTOM)) : i.replaceSwitchClass(n, l, e.line.BOTTOM);
                        g.removeClass(e.line.LINE)
                    }
                }
            },
            replaceIcoClass: function(b, a, c) {
                if (a && !b.isAjaxing && (b = a.attr("class"),
                b != void 0)) {
                    b = b.split("_");
                    switch (c) {
                        case e.folder.OPEN:
                        case e.folder.CLOSE:
                        case e.folder.DOCU:
                            b[b.length - 1] = c
                    }
                    a.attr("class", b.join("_"))
                }
            },
            replaceSwitchClass: function(b, a, c) {
                if (a) {
                    var d = a.attr("class");
                    if (d != void 0) {
                        d = d.split("_");
                        switch (c) {
                            case e.line.ROOT:
                            case e.line.ROOTS:
                            case e.line.CENTER:
                            case e.line.BOTTOM:
                            case e.line.NOLINE:
                                d[0] = i.makeNodeLineClassEx(b) + c;
                                break;
                            case e.folder.OPEN:
                            case e.folder.CLOSE:
                            case e.folder.DOCU:
                                d[1] = c
                        }
                        a.attr("class", d.join("_"));
                        c !== e.folder.DOCU ? a.removeAttr("disabled") : a.attr("disabled", "disabled")
                    }
                }
            },
            selectNode: function(b, a, c) {
                c || i.cancelPreSelectedNode(b);
                k(a, e.id.A, b).addClass(e.node.CURSELECTED);
                h.addSelectedNode(b, a)
            },
            setNodeFontCss: function(b, a) {
                var c = k(a, e.id.A, b)
                    , d = i.makeNodeFontCss(b, a);
                d && c.css(d)
            },
            setNodeLineIcos: function(b, a) {
                if (a) {
                    var c = k(a, e.id.SWITCH, b)
                        , d = k(a, e.id.UL, b)
                        , f = k(a, e.id.ICON, b)
                        , g = i.makeUlLineClass(b, a);
                    g.length == 0 ? d.removeClass(e.line.LINE) : d.addClass(g);
                    c.attr("class", i.makeNodeLineClass(b, a));
                    a.isParent ? c.removeAttr("disabled") : c.attr("disabled", "disabled");
                    f.removeAttr("style");
                    f.attr("style", i.makeNodeIcoStyle(b, a));
                    f.attr("class", i.makeNodeIcoClass(b, a))
                }
            },
            setNodeName: function(b, a) {
                var c = h.getNodeTitle(b, a)
                    , d = k(a, e.id.SPAN, b);
                d.empty();
                b.view.nameIsHTML ? d.html(h.getNodeName(b, a)) : d.text(h.getNodeName(b, a));
                j.apply(b.view.showTitle, [b.treeId, a], b.view.showTitle) && k(a, e.id.A, b).attr("title", !c ? "" : c)
            },
            setNodeTarget: function(b, a) {
                k(a, e.id.A, b).attr("target", i.makeNodeTarget(a))
            },
            setNodeUrl: function(b, a) {
                var c = k(a, e.id.A, b)
                    , d = i.makeNodeUrl(b, a);
                d == null || d.length == 0 ? c.removeAttr("href") : c.attr("href", d)
            },
            switchNode: function(b, a) {
                a.open || !j.canAsync(b, a) ? i.expandCollapseNode(b, a, !a.open) : b.async.enable ? i.asyncNode(b, a) || i.expandCollapseNode(b, a, !a.open) : a && i.expandCollapseNode(b, a, !a.open)
            }
        };
        p.fn.zTree = {
            consts: {
                className: {
                    BUTTON: "button",
                    LEVEL: "level",
                    ICO_LOADING: "ico_loading",
                    SWITCH: "switch"
                },
                event: {
                    NODECREATED: "ztree_nodeCreated",
                    CLICK: "ztree_click",
                    EXPAND: "ztree_expand",
                    COLLAPSE: "ztree_collapse",
                    ASYNC_SUCCESS: "ztree_async_success",
                    ASYNC_ERROR: "ztree_async_error",
                    REMOVE: "ztree_remove"
                },
                id: {
                    A: "_a",
                    ICON: "_ico",
                    SPAN: "_span",
                    SWITCH: "_switch",
                    UL: "_ul"
                },
                line: {
                    ROOT: "root",
                    ROOTS: "roots",
                    CENTER: "center",
                    BOTTOM: "bottom",
                    NOLINE: "noline",
                    LINE: "line"
                },
                folder: {
                    OPEN: "open",
                    CLOSE: "close",
                    DOCU: "docu"
                },
                node: {
                    CURSELECTED: "curSelectedNode"
                }
            },
            _z: {
                tools: j,
                view: i,
                event: m,
                data: h
            },
            getZTreeObj: function(b) {
                return (b = h.getZTreeTools(b)) ? b : null
            },
            destroy: function(b) {
                if (b && b.length > 0)
                    i.destroy(h.getSetting(b));
                else
                    for (var a in r)
                        i.destroy(r[a])
            },
            init: function(b, a, c) {
                var d = j.clone(M);
                p.extend(!0, d, a);
                d.treeId = b.attr("id");
                d.treeObj = b;
                d.treeObj.empty();
                r[d.treeId] = d;
                if (typeof document.body.style.maxHeight === "undefined")
                    d.view.expandSpeed = "";
                h.initRoot(d);
                b = h.getRoot(d);
                a = d.data.key.children;
                c = c ? j.clone(j.isArray(c) ? c : [c]) : [];
                b[a] = d.data.simpleData.enable ? h.transformTozTreeFormat(d, c) : c;
                h.initCache(d);
                m.unbindTree(d);
                m.bindTree(d);
                m.unbindEvent(d);
                m.bindEvent(d);
                c = {
                    setting: d,
                    addNodes: function(a, b, c) {
                        function e() {
                            i.addNodes(d, a, h, c == !0)
                        }
                        if (!b)
                            return null;
                        a || (a = null);
                        if (a && !a.isParent && d.data.keep.leaf)
                            return null;
                        var h = j.clone(j.isArray(b) ? b : [b]);
                        j.canAsync(d, a) ? i.asyncNode(d, a, c, e) : e();
                        return h
                    },
                    cancelSelectedNode: function(a) {
                        i.cancelPreSelectedNode(d, a)
                    },
                    destroy: function() {
                        i.destroy(d)
                    },
                    expandAll: function(a) {
                        a = !!a;
                        i.expandCollapseSonNode(d, null, a, !0);
                        return a
                    },
                    expandNode: function(a, b, c, e, n) {
                        if (!a || !a.isParent)
                            return null;
                        b !== !0 && b !== !1 && (b = !a.open);
                        if ((n = !!n) && b && j.apply(d.callback.beforeExpand, [d.treeId, a], !0) == !1)
                            return null;
                        else if (n && !b && j.apply(d.callback.beforeCollapse, [d.treeId, a], !0) == !1)
                            return null;
                        b && a.parentTId && i.expandCollapseParentNode(d, a.getParentNode(), b, !1);
                        if (b === a.open && !c)
                            return null;
                        h.getRoot(d).expandTriggerFlag = n;
                        if (!j.canAsync(d, a) && c)
                            i.expandCollapseSonNode(d, a, b, !0, function() {
                                if (e !== !1)
                                    try {
                                        k(a, d).focus().blur()
                                    } catch (b) {}
                            });
                        else if (a.open = !b,
                            i.switchNode(this.setting, a),
                        e !== !1)
                            try {
                                k(a, d).focus().blur()
                            } catch (m) {}
                        return b
                    },
                    getNodes: function() {
                        return h.getNodes(d)
                    },
                    getNodeByParam: function(a, b, c) {
                        return !a ? null : h.getNodeByParam(d, c ? c[d.data.key.children] : h.getNodes(d), a, b)
                    },
                    getNodeByTId: function(a) {
                        return h.getNodeCache(d, a)
                    },
                    getNodesByParam: function(a, b, c) {
                        return !a ? null : h.getNodesByParam(d, c ? c[d.data.key.children] : h.getNodes(d), a, b)
                    },
                    getNodesByParamFuzzy: function(a, b, c) {
                        return !a ? null : h.getNodesByParamFuzzy(d, c ? c[d.data.key.children] : h.getNodes(d), a, b)
                    },
                    getNodesByFilter: function(a, b, c, e) {
                        b = !!b;
                        return !a || typeof a != "function" ? b ? null : [] : h.getNodesByFilter(d, c ? c[d.data.key.children] : h.getNodes(d), a, b, e)
                    },
                    getNodeIndex: function(a) {
                        if (!a)
                            return null;
                        for (var b = d.data.key.children, c = a.parentTId ? a.getParentNode() : h.getRoot(d), e = 0, i = c[b].length; e < i; e++)
                            if (c[b][e] == a)
                                return e;
                        return -1
                    },
                    getSelectedNodes: function() {
                        for (var a = [], b = h.getRoot(d).curSelectedList, c = 0, e = b.length; c < e; c++)
                            a.push(b[c]);
                        return a
                    },
                    isSelectedNode: function(a) {
                        return h.isSelectedNode(d, a)
                    },
                    reAsyncChildNodes: function(a, b, c) {
                        if (this.setting.async.enable) {
                            var j = !a;
                            j && (a = h.getRoot(d));
                            if (b == "refresh") {
                                for (var b = this.setting.data.key.children, m = 0, p = a[b] ? a[b].length : 0; m < p; m++)
                                    h.removeNodeCache(d, a[b][m]);
                                h.removeSelectedNode(d);
                                a[b] = [];
                                j ? this.setting.treeObj.empty() : k(a, e.id.UL, d).empty()
                            }
                            i.asyncNode(this.setting, j ? null : a, !!c)
                        }
                    },
                    refresh: function() {
                        this.setting.treeObj.empty();
                        var a = h.getRoot(d)
                            , b = a[d.data.key.children];
                        h.initRoot(d);
                        a[d.data.key.children] = b;
                        h.initCache(d);
                        i.createNodes(d, 0, a[d.data.key.children])
                    },
                    removeChildNodes: function(a) {
                        if (!a)
                            return null;
                        var b = a[d.data.key.children];
                        i.removeChildNodes(d, a);
                        return b ? b : null
                    },
                    removeNode: function(a, b) {
                        a && (b = !!b,
                        b && j.apply(d.callback.beforeRemove, [d.treeId, a], !0) == !1 || (i.removeNode(d, a),
                        b && this.setting.treeObj.trigger(e.event.REMOVE, [d.treeId, a])))
                    },
                    selectNode: function(a, b) {
                        if (a && j.uCanDo(d)) {
                            b = d.view.selectedMulti && b;
                            if (a.parentTId)
                                i.expandCollapseParentNode(d, a.getParentNode(), !0, !1, function() {
                                    try {
                                        k(a, d).focus().blur()
                                    } catch (b) {}
                                });
                            else
                                try {
                                    k(a, d).focus().blur()
                                } catch (c) {}
                            i.selectNode(d, a, b)
                        }
                    },
                    transformTozTreeNodes: function(a) {
                        return h.transformTozTreeFormat(d, a)
                    },
                    transformToArray: function(a) {
                        return h.transformToArrayFormat(d, a)
                    },
                    updateNode: function(a) {
                        a && k(a, d).get(0) && j.uCanDo(d) && (i.setNodeName(d, a),
                            i.setNodeTarget(d, a),
                            i.setNodeUrl(d, a),
                            i.setNodeLineIcos(d, a),
                            i.setNodeFontCss(d, a))
                    }
                };
                b.treeTools = c;
                h.setZTreeTools(d, c);
                b[a] && b[a].length > 0 ? i.createNodes(d, 0, b[a]) : d.async.enable && d.async.url && d.async.url !== "" && i.asyncNode(d);
                return c
            }
        };
        var N = p.fn.zTree
            , k = j.$
            , e = N.consts
    }
)(jQuery);

/*
 * JQuery zTree excheck v3.5.17-beta.2
 * http://zTree.me/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2014-05-08
 */
(function(m) {
        var p, q, r, o = {
            event: {
                CHECK: "ztree_check"
            },
            id: {
                CHECK: "_check"
            },
            checkbox: {
                STYLE: "checkbox",
                DEFAULT: "chk",
                DISABLED: "disable",
                FALSE: "false",
                TRUE: "true",
                FULL: "full",
                PART: "part",
                FOCUS: "focus"
            },
            radio: {
                STYLE: "radio",
                TYPE_ALL: "all",
                TYPE_LEVEL: "level"
            }
        }, v = {
            check: {
                enable: !1,
                autoCheckTrigger: !1,
                chkStyle: o.checkbox.STYLE,
                nocheckInherit: !1,
                chkDisabledInherit: !1,
                radioType: o.radio.TYPE_LEVEL,
                chkboxType: {
                    Y: "ps",
                    N: "ps"
                }
            },
            data: {
                key: {
                    checked: "checked"
                }
            },
            callback: {
                beforeCheck: null,
                onCheck: null
            }
        };
        p = function(c, a) {
            if (a.chkDisabled === !0)
                return !1;
            var b = f.getSetting(c.data.treeId)
                , d = b.data.key.checked;
            if (k.apply(b.callback.beforeCheck, [b.treeId, a], !0) == !1)
                return !0;
            a[d] = !a[d];
            e.checkNodeRelation(b, a);
            d = n(a, j.id.CHECK, b);
            e.setChkClass(b, d, a);
            e.repairParentChkClassWithSelf(b, a);
            b.treeObj.trigger(j.event.CHECK, [c, b.treeId, a]);
            return !0
        }
        ;
        q = function(c, a) {
            if (a.chkDisabled === !0)
                return !1;
            var b = f.getSetting(c.data.treeId)
                , d = n(a, j.id.CHECK, b);
            a.check_Focus = !0;
            e.setChkClass(b, d, a);
            return !0
        }
        ;
        r = function(c, a) {
            if (a.chkDisabled === !0)
                return !1;
            var b = f.getSetting(c.data.treeId)
                , d = n(a, j.id.CHECK, b);
            a.check_Focus = !1;
            e.setChkClass(b, d, a);
            return !0
        }
        ;
        m.extend(!0, m.fn.zTree.consts, o);
        m.extend(!0, m.fn.zTree._z, {
            tools: {},
            view: {
                checkNodeRelation: function(c, a) {
                    var b, d, h, i = c.data.key.children, l = c.data.key.checked;
                    b = j.radio;
                    if (c.check.chkStyle == b.STYLE) {
                        var g = f.getRadioCheckedList(c);
                        if (a[l])
                            if (c.check.radioType == b.TYPE_ALL) {
                                for (d = g.length - 1; d >= 0; d--)
                                    b = g[d],
                                    b[l] && b != a && (b[l] = !1,
                                        g.splice(d, 1),
                                        e.setChkClass(c, n(b, j.id.CHECK, c), b),
                                    b.parentTId != a.parentTId && e.repairParentChkClassWithSelf(c, b));
                                g.push(a)
                            } else {
                                g = a.parentTId ? a.getParentNode() : f.getRoot(c);
                                for (d = 0,
                                         h = g[i].length; d < h; d++)
                                    b = g[i][d],
                                    b[l] && b != a && (b[l] = !1,
                                        e.setChkClass(c, n(b, j.id.CHECK, c), b))
                            }
                        else if (c.check.radioType == b.TYPE_ALL)
                            for (d = 0,
                                     h = g.length; d < h; d++)
                                if (a == g[d]) {
                                    g.splice(d, 1);
                                    break
                                }
                    } else
                        a[l] && (!a[i] || a[i].length == 0 || c.check.chkboxType.Y.indexOf("s") > -1) && e.setSonNodeCheckBox(c, a, !0),
                        !a[l] && (!a[i] || a[i].length == 0 || c.check.chkboxType.N.indexOf("s") > -1) && e.setSonNodeCheckBox(c, a, !1),
                        a[l] && c.check.chkboxType.Y.indexOf("p") > -1 && e.setParentNodeCheckBox(c, a, !0),
                        !a[l] && c.check.chkboxType.N.indexOf("p") > -1 && e.setParentNodeCheckBox(c, a, !1)
                },
                makeChkClass: function(c, a) {
                    var b = c.data.key.checked
                        , d = j.checkbox
                        , h = j.radio
                        , i = ""
                        , i = a.chkDisabled === !0 ? d.DISABLED : a.halfCheck ? d.PART : c.check.chkStyle == h.STYLE ? a.check_Child_State < 1 ? d.FULL : d.PART : a[b] ? a.check_Child_State === 2 || a.check_Child_State === -1 ? d.FULL : d.PART : a.check_Child_State < 1 ? d.FULL : d.PART
                        , b = c.check.chkStyle + "_" + (a[b] ? d.TRUE : d.FALSE) + "_" + i
                        , b = a.check_Focus && a.chkDisabled !== !0 ? b + "_" + d.FOCUS : b;
                    return j.className.BUTTON + " " + d.DEFAULT + " " + b
                },
                repairAllChk: function(c, a) {
                    if (c.check.enable && c.check.chkStyle === j.checkbox.STYLE)
                        for (var b = c.data.key.checked, d = c.data.key.children, h = f.getRoot(c), i = 0, l = h[d].length; i < l; i++) {
                            var g = h[d][i];
                            g.nocheck !== !0 && g.chkDisabled !== !0 && (g[b] = a);
                            e.setSonNodeCheckBox(c, g, a)
                        }
                },
                repairChkClass: function(c, a) {
                    if (a && (f.makeChkFlag(c, a),
                    a.nocheck !== !0)) {
                        var b = n(a, j.id.CHECK, c);
                        e.setChkClass(c, b, a)
                    }
                },
                repairParentChkClass: function(c, a) {
                    if (a && a.parentTId) {
                        var b = a.getParentNode();
                        e.repairChkClass(c, b);
                        e.repairParentChkClass(c, b)
                    }
                },
                repairParentChkClassWithSelf: function(c, a) {
                    if (a) {
                        var b = c.data.key.children;
                        a[b] && a[b].length > 0 ? e.repairParentChkClass(c, a[b][0]) : e.repairParentChkClass(c, a)
                    }
                },
                repairSonChkDisabled: function(c, a, b, d) {
                    if (a) {
                        var h = c.data.key.children;
                        if (a.chkDisabled != b)
                            a.chkDisabled = b;
                        e.repairChkClass(c, a);
                        if (a[h] && d)
                            for (var i = 0, l = a[h].length; i < l; i++)
                                e.repairSonChkDisabled(c, a[h][i], b, d)
                    }
                },
                repairParentChkDisabled: function(c, a, b, d) {
                    if (a) {
                        if (a.chkDisabled != b && d)
                            a.chkDisabled = b;
                        e.repairChkClass(c, a);
                        e.repairParentChkDisabled(c, a.getParentNode(), b, d)
                    }
                },
                setChkClass: function(c, a, b) {
                    a && (b.nocheck === !0 ? a.hide() : a.show(),
                        a.attr("class", e.makeChkClass(c, b)))
                },
                setParentNodeCheckBox: function(c, a, b, d) {
                    var h = c.data.key.children
                        , i = c.data.key.checked
                        , l = n(a, j.id.CHECK, c);
                    d || (d = a);
                    f.makeChkFlag(c, a);
                    a.nocheck !== !0 && a.chkDisabled !== !0 && (a[i] = b,
                        e.setChkClass(c, l, a),
                    c.check.autoCheckTrigger && a != d && c.treeObj.trigger(j.event.CHECK, [null, c.treeId, a]));
                    if (a.parentTId) {
                        l = !0;
                        if (!b)
                            for (var h = a.getParentNode()[h], g = 0, k = h.length; g < k; g++)
                                if (h[g].nocheck !== !0 && h[g].chkDisabled !== !0 && h[g][i] || (h[g].nocheck === !0 || h[g].chkDisabled === !0) && h[g].check_Child_State > 0) {
                                    l = !1;
                                    break
                                }
                        l && e.setParentNodeCheckBox(c, a.getParentNode(), b, d)
                    }
                },
                setSonNodeCheckBox: function(c, a, b, d) {
                    if (a) {
                        var h = c.data.key.children
                            , i = c.data.key.checked
                            , l = n(a, j.id.CHECK, c);
                        d || (d = a);
                        var g = !1;
                        if (a[h])
                            for (var k = 0, m = a[h].length; k < m && a.chkDisabled !== !0; k++) {
                                var o = a[h][k];
                                e.setSonNodeCheckBox(c, o, b, d);
                                o.chkDisabled === !0 && (g = !0)
                            }
                        if (a != f.getRoot(c) && a.chkDisabled !== !0) {
                            g && a.nocheck !== !0 && f.makeChkFlag(c, a);
                            if (a.nocheck !== !0 && a.chkDisabled !== !0) {
                                if (a[i] = b,
                                    !g)
                                    a.check_Child_State = a[h] && a[h].length > 0 ? b ? 2 : 0 : -1
                            } else
                                a.check_Child_State = -1;
                            e.setChkClass(c, l, a);
                            c.check.autoCheckTrigger && a != d && a.nocheck !== !0 && a.chkDisabled !== !0 && c.treeObj.trigger(j.event.CHECK, [null, c.treeId, a])
                        }
                    }
                }
            },
            event: {},
            data: {
                getRadioCheckedList: function(c) {
                    for (var a = f.getRoot(c).radioCheckedList, b = 0, d = a.length; b < d; b++)
                        f.getNodeCache(c, a[b].tId) || (a.splice(b, 1),
                            b--,
                            d--);
                    return a
                },
                getCheckStatus: function(c, a) {
                    if (!c.check.enable || a.nocheck || a.chkDisabled)
                        return null;
                    var b = c.data.key.checked;
                    return {
                        checked: a[b],
                        half: a.halfCheck ? a.halfCheck : c.check.chkStyle == j.radio.STYLE ? a.check_Child_State === 2 : a[b] ? a.check_Child_State > -1 && a.check_Child_State < 2 : a.check_Child_State > 0
                    }
                },
                getTreeCheckedNodes: function(c, a, b, d) {
                    if (!a)
                        return [];
                    for (var h = c.data.key.children, i = c.data.key.checked, e = b && c.check.chkStyle == j.radio.STYLE && c.check.radioType == j.radio.TYPE_ALL, d = !d ? [] : d, g = 0, k = a.length; g < k; g++) {
                        if (a[g].nocheck !== !0 && a[g].chkDisabled !== !0 && a[g][i] == b && (d.push(a[g]),
                            e))
                            break;
                        f.getTreeCheckedNodes(c, a[g][h], b, d);
                        if (e && d.length > 0)
                            break
                    }
                    return d
                },
                getTreeChangeCheckedNodes: function(c, a, b) {
                    if (!a)
                        return [];
                    for (var d = c.data.key.children, h = c.data.key.checked, b = !b ? [] : b, i = 0, e = a.length; i < e; i++)
                        a[i].nocheck !== !0 && a[i].chkDisabled !== !0 && a[i][h] != a[i].checkedOld && b.push(a[i]),
                            f.getTreeChangeCheckedNodes(c, a[i][d], b);
                    return b
                },
                makeChkFlag: function(c, a) {
                    if (a) {
                        var b = c.data.key.children
                            , d = c.data.key.checked
                            , h = -1;
                        if (a[b])
                            for (var i = 0, e = a[b].length; i < e; i++) {
                                var g = a[b][i]
                                    , f = -1;
                                if (c.check.chkStyle == j.radio.STYLE)
                                    if (f = g.nocheck === !0 || g.chkDisabled === !0 ? g.check_Child_State : g.halfCheck === !0 ? 2 : g[d] ? 2 : g.check_Child_State > 0 ? 2 : 0,
                                    f == 2) {
                                        h = 2;
                                        break
                                    } else
                                        f == 0 && (h = 0);
                                else if (c.check.chkStyle == j.checkbox.STYLE)
                                    if (f = g.nocheck === !0 || g.chkDisabled === !0 ? g.check_Child_State : g.halfCheck === !0 ? 1 : g[d] ? g.check_Child_State === -1 || g.check_Child_State === 2 ? 2 : 1 : g.check_Child_State > 0 ? 1 : 0,
                                    f === 1) {
                                        h = 1;
                                        break
                                    } else if (f === 2 && h > -1 && i > 0 && f !== h) {
                                        h = 1;
                                        break
                                    } else if (h === 2 && f > -1 && f < 2) {
                                        h = 1;
                                        break
                                    } else
                                        f > -1 && (h = f)
                            }
                        a.check_Child_State = h
                    }
                }
            }
        });
        var m = m.fn.zTree
            , k = m._z.tools
            , j = m.consts
            , e = m._z.view
            , f = m._z.data
            , n = k.$;
        f.exSetting(v);
        f.addInitBind(function(c) {
            c.treeObj.bind(j.event.CHECK, function(a, b, d, h) {
                a.srcEvent = b;
                k.apply(c.callback.onCheck, [a, d, h])
            })
        });
        f.addInitUnBind(function(c) {
            c.treeObj.unbind(j.event.CHECK)
        });
        f.addInitCache(function() {});
        f.addInitNode(function(c, a, b, d) {
            if (b) {
                a = c.data.key.checked;
                typeof b[a] == "string" && (b[a] = k.eqs(b[a], "true"));
                b[a] = !!b[a];
                b.checkedOld = b[a];
                if (typeof b.nocheck == "string")
                    b.nocheck = k.eqs(b.nocheck, "true");
                b.nocheck = !!b.nocheck || c.check.nocheckInherit && d && !!d.nocheck;
                if (typeof b.chkDisabled == "string")
                    b.chkDisabled = k.eqs(b.chkDisabled, "true");
                b.chkDisabled = !!b.chkDisabled || c.check.chkDisabledInherit && d && !!d.chkDisabled;
                if (typeof b.halfCheck == "string")
                    b.halfCheck = k.eqs(b.halfCheck, "true");
                b.halfCheck = !!b.halfCheck;
                b.check_Child_State = -1;
                b.check_Focus = !1;
                b.getCheckStatus = function() {
                    return f.getCheckStatus(c, b)
                }
                ;
                c.check.chkStyle == j.radio.STYLE && c.check.radioType == j.radio.TYPE_ALL && b[a] && f.getRoot(c).radioCheckedList.push(b)
            }
        });
        f.addInitProxy(function(c) {
            var a = c.target
                , b = f.getSetting(c.data.treeId)
                , d = ""
                , h = null
                , e = ""
                , l = null;
            if (k.eqs(c.type, "mouseover")) {
                if (b.check.enable && k.eqs(a.tagName, "span") && a.getAttribute("treeNode" + j.id.CHECK) !== null)
                    d = k.getNodeMainDom(a).id,
                        e = "mouseoverCheck"
            } else if (k.eqs(c.type, "mouseout")) {
                if (b.check.enable && k.eqs(a.tagName, "span") && a.getAttribute("treeNode" + j.id.CHECK) !== null)
                    d = k.getNodeMainDom(a).id,
                        e = "mouseoutCheck"
            } else if (k.eqs(c.type, "click") && b.check.enable && k.eqs(a.tagName, "span") && a.getAttribute("treeNode" + j.id.CHECK) !== null)
                d = k.getNodeMainDom(a).id,
                    e = "checkNode";
            if (d.length > 0)
                switch (h = f.getNodeCache(b, d),
                    e) {
                    case "checkNode":
                        l = p;
                        break;
                    case "mouseoverCheck":
                        l = q;
                        break;
                    case "mouseoutCheck":
                        l = r
                }
            return {
                stop: e === "checkNode",
                node: h,
                nodeEventType: e,
                nodeEventCallback: l,
                treeEventType: "",
                treeEventCallback: null
            }
        }, !0);
        f.addInitRoot(function(c) {
            f.getRoot(c).radioCheckedList = []
        });
        f.addBeforeA(function(c, a, b) {
            c.check.enable && (f.makeChkFlag(c, a),
                b.push("<span ID='", a.tId, j.id.CHECK, "' class='", e.makeChkClass(c, a), "' treeNode", j.id.CHECK, a.nocheck === !0 ? " style='display:none;'" : "", "></span>"))
        });
        f.addZTreeTools(function(c, a) {
            a.checkNode = function(a, b, c, f) {
                var g = this.setting.data.key.checked;
                if (a.chkDisabled !== !0 && (b !== !0 && b !== !1 && (b = !a[g]),
                    f = !!f,
                (a[g] !== b || c) && !(f && k.apply(this.setting.callback.beforeCheck, [this.setting.treeId, a], !0) == !1) && k.uCanDo(this.setting) && this.setting.check.enable && a.nocheck !== !0))
                    a[g] = b,
                        b = n(a, j.id.CHECK, this.setting),
                    (c || this.setting.check.chkStyle === j.radio.STYLE) && e.checkNodeRelation(this.setting, a),
                        e.setChkClass(this.setting, b, a),
                        e.repairParentChkClassWithSelf(this.setting, a),
                    f && this.setting.treeObj.trigger(j.event.CHECK, [null, this.setting.treeId, a])
            }
            ;
            a.checkAllNodes = function(a) {
                e.repairAllChk(this.setting, !!a)
            }
            ;
            a.getCheckedNodes = function(a) {
                var b = this.setting.data.key.children;
                return f.getTreeCheckedNodes(this.setting, f.getRoot(this.setting)[b], a !== !1)
            }
            ;
            a.getChangeCheckedNodes = function() {
                var a = this.setting.data.key.children;
                return f.getTreeChangeCheckedNodes(this.setting, f.getRoot(this.setting)[a])
            }
            ;
            a.setChkDisabled = function(a, b, c, f) {
                b = !!b;
                c = !!c;
                e.repairSonChkDisabled(this.setting, a, b, !!f);
                e.repairParentChkDisabled(this.setting, a.getParentNode(), b, c)
            }
            ;
            var b = a.updateNode;
            a.updateNode = function(c, f) {
                b && b.apply(a, arguments);
                if (c && this.setting.check.enable && n(c, this.setting).get(0) && k.uCanDo(this.setting)) {
                    var i = n(c, j.id.CHECK, this.setting);
                    (f == !0 || this.setting.check.chkStyle === j.radio.STYLE) && e.checkNodeRelation(this.setting, c);
                    e.setChkClass(this.setting, i, c);
                    e.repairParentChkClassWithSelf(this.setting, c)
                }
            }
        });
        var s = e.createNodes;
        e.createNodes = function(c, a, b, d) {
            s && s.apply(e, arguments);
            b && e.repairParentChkClassWithSelf(c, d)
        }
        ;
        var t = e.removeNode;
        e.removeNode = function(c, a) {
            var b = a.getParentNode();
            t && t.apply(e, arguments);
            a && b && (e.repairChkClass(c, b),
                e.repairParentChkClass(c, b))
        }
        ;
        var u = e.appendNodes;
        e.appendNodes = function(c, a, b, d, h, i) {
            var j = "";
            u && (j = u.apply(e, arguments));
            d && f.makeChkFlag(c, d);
            return j
        }
    }
)(jQuery);

/*
 * JQuery zTree exedit v3.5.17-beta.2
 * http://zTree.me/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2014-05-08
 */
(function(w) {
        var I = {
            event: {
                DRAG: "ztree_drag",
                DROP: "ztree_drop",
                RENAME: "ztree_rename",
                DRAGMOVE: "ztree_dragmove"
            },
            id: {
                EDIT: "_edit",
                INPUT: "_input",
                REMOVE: "_remove"
            },
            move: {
                TYPE_INNER: "inner",
                TYPE_PREV: "prev",
                TYPE_NEXT: "next"
            },
            node: {
                CURSELECTED_EDIT: "curSelectedNode_Edit",
                TMPTARGET_TREE: "tmpTargetzTree",
                TMPTARGET_NODE: "tmpTargetNode"
            }
        }
            , x = {
            onHoverOverNode: function(b, a) {
                var c = m.getSetting(b.data.treeId)
                    , d = m.getRoot(c);
                if (d.curHoverNode != a)
                    x.onHoverOutNode(b);
                d.curHoverNode = a;
                f.addHoverDom(c, a)
            },
            onHoverOutNode: function(b) {
                var b = m.getSetting(b.data.treeId)
                    , a = m.getRoot(b);
                if (a.curHoverNode && !m.isSelectedNode(b, a.curHoverNode))
                    f.removeTreeDom(b, a.curHoverNode),
                        a.curHoverNode = null
            },
            onMousedownNode: function(b, a) {
                function c(b) {
                    if (C.dragFlag == 0 && Math.abs(N - b.clientX) < e.edit.drag.minMoveSize && Math.abs(O - b.clientY) < e.edit.drag.minMoveSize)
                        return !0;
                    var a, c, n, k, i;
                    i = e.data.key.children;
                    M.css("cursor", "pointer");
                    if (C.dragFlag == 0) {
                        if (g.apply(e.callback.beforeDrag, [e.treeId, l], !0) == !1)
                            return r(b),
                                !0;
                        for (a = 0,
                                 c = l.length; a < c; a++) {
                            if (a == 0)
                                C.dragNodeShowBefore = [];
                            n = l[a];
                            n.isParent && n.open ? (f.expandCollapseNode(e, n, !n.open),
                                C.dragNodeShowBefore[n.tId] = !0) : C.dragNodeShowBefore[n.tId] = !1
                        }
                        C.dragFlag = 1;
                        t.showHoverDom = !1;
                        g.showIfameMask(e, !0);
                        n = !0;
                        k = -1;
                        if (l.length > 1) {
                            var j = l[0].parentTId ? l[0].getParentNode()[i] : m.getNodes(e);
                            i = [];
                            for (a = 0,
                                     c = j.length; a < c; a++)
                                if (C.dragNodeShowBefore[j[a].tId] !== void 0 && (n && k > -1 && k + 1 !== a && (n = !1),
                                    i.push(j[a]),
                                    k = a),
                                l.length === i.length) {
                                    l = i;
                                    break
                                }
                        }
                        n && (H = l[0].getPreNode(),
                            R = l[l.length - 1].getNextNode());
                        D = o("<ul class='zTreeDragUL'></ul>", e);
                        for (a = 0,
                                 c = l.length; a < c; a++)
                            n = l[a],
                                n.editNameFlag = !1,
                                f.selectNode(e, n, a > 0),
                                f.removeTreeDom(e, n),
                            a > e.edit.drag.maxShowNodeNum - 1 || (k = o("<li id='" + n.tId + "_tmp'></li>", e),
                                k.append(o(n, d.id.A, e).clone()),
                                k.css("padding", "0"),
                                k.children("#" + n.tId + d.id.A).removeClass(d.node.CURSELECTED),
                                D.append(k),
                            a == e.edit.drag.maxShowNodeNum - 1 && (k = o("<li id='" + n.tId + "_moretmp'><a>  ...  </a></li>", e),
                                D.append(k)));
                        D.attr("id", l[0].tId + d.id.UL + "_tmp");
                        D.addClass(e.treeObj.attr("class"));
                        D.appendTo(M);
                        B = o("<span class='tmpzTreeMove_arrow'></span>", e);
                        B.attr("id", "zTreeMove_arrow_tmp");
                        B.appendTo(M);
                        e.treeObj.trigger(d.event.DRAG, [b, e.treeId, l])
                    }
                    if (C.dragFlag == 1) {
                        s && B.attr("id") == b.target.id && u && b.clientX + F.scrollLeft() + 2 > w("#" + u + d.id.A, s).offset().left ? (n = w("#" + u + d.id.A, s),
                            b.target = n.length > 0 ? n.get(0) : b.target) : s && (s.removeClass(d.node.TMPTARGET_TREE),
                        u && w("#" + u + d.id.A, s).removeClass(d.node.TMPTARGET_NODE + "_" + d.move.TYPE_PREV).removeClass(d.node.TMPTARGET_NODE + "_" + I.move.TYPE_NEXT).removeClass(d.node.TMPTARGET_NODE + "_" + I.move.TYPE_INNER));
                        u = s = null;
                        J = !1;
                        h = e;
                        n = m.getSettings();
                        for (var y in n)
                            if (n[y].treeId && n[y].edit.enable && n[y].treeId != e.treeId && (b.target.id == n[y].treeId || w(b.target).parents("#" + n[y].treeId).length > 0))
                                J = !0,
                                    h = n[y];
                        y = F.scrollTop();
                        k = F.scrollLeft();
                        i = h.treeObj.offset();
                        a = h.treeObj.get(0).scrollHeight;
                        n = h.treeObj.get(0).scrollWidth;
                        c = b.clientY + y - i.top;
                        var p = h.treeObj.height() + i.top - b.clientY - y
                            , q = b.clientX + k - i.left
                            , x = h.treeObj.width() + i.left - b.clientX - k;
                        i = c < e.edit.drag.borderMax && c > e.edit.drag.borderMin;
                        var j = p < e.edit.drag.borderMax && p > e.edit.drag.borderMin
                            , K = q < e.edit.drag.borderMax && q > e.edit.drag.borderMin
                            , G = x < e.edit.drag.borderMax && x > e.edit.drag.borderMin
                            , p = c > e.edit.drag.borderMin && p > e.edit.drag.borderMin && q > e.edit.drag.borderMin && x > e.edit.drag.borderMin
                            , q = i && h.treeObj.scrollTop() <= 0
                            , x = j && h.treeObj.scrollTop() + h.treeObj.height() + 10 >= a
                            , P = K && h.treeObj.scrollLeft() <= 0
                            , Q = G && h.treeObj.scrollLeft() + h.treeObj.width() + 10 >= n;
                        if (b.target && g.isChildOrSelf(b.target, h.treeId)) {
                            for (var E = b.target; E && E.tagName && !g.eqs(E.tagName, "li") && E.id != h.treeId; )
                                E = E.parentNode;
                            var S = !0;
                            for (a = 0,
                                     c = l.length; a < c; a++)
                                if (n = l[a],
                                E.id === n.tId) {
                                    S = !1;
                                    break
                                } else if (o(n, e).find("#" + E.id).length > 0) {
                                    S = !1;
                                    break
                                }
                            if (S && b.target && g.isChildOrSelf(b.target, E.id + d.id.A))
                                s = w(E),
                                    u = E.id
                        }
                        n = l[0];
                        if (p && g.isChildOrSelf(b.target, h.treeId)) {
                            if (!s && (b.target.id == h.treeId || q || x || P || Q) && (J || !J && n.parentTId))
                                s = h.treeObj;
                            i ? h.treeObj.scrollTop(h.treeObj.scrollTop() - 10) : j && h.treeObj.scrollTop(h.treeObj.scrollTop() + 10);
                            K ? h.treeObj.scrollLeft(h.treeObj.scrollLeft() - 10) : G && h.treeObj.scrollLeft(h.treeObj.scrollLeft() + 10);
                            s && s != h.treeObj && s.offset().left < h.treeObj.offset().left && h.treeObj.scrollLeft(h.treeObj.scrollLeft() + s.offset().left - h.treeObj.offset().left)
                        }
                        D.css({
                            top: b.clientY + y + 3 + "px",
                            left: b.clientX + k + 3 + "px"
                        });
                        i = a = 0;
                        if (s && s.attr("id") != h.treeId) {
                            var z = u == null ? null : m.getNodeCache(h, u);
                            c = (b.ctrlKey || b.metaKey) && e.edit.drag.isMove && e.edit.drag.isCopy || !e.edit.drag.isMove && e.edit.drag.isCopy;
                            a = !!(H && u === H.tId);
                            i = !!(R && u === R.tId);
                            k = n.parentTId && n.parentTId == u;
                            n = (c || !i) && g.apply(h.edit.drag.prev, [h.treeId, l, z], !!h.edit.drag.prev);
                            a = (c || !a) && g.apply(h.edit.drag.next, [h.treeId, l, z], !!h.edit.drag.next);
                            G = (c || !k) && !(h.data.keep.leaf && !z.isParent) && g.apply(h.edit.drag.inner, [h.treeId, l, z], !!h.edit.drag.inner);
                            if (!n && !a && !G) {
                                if (s = null,
                                    u = "",
                                    v = d.move.TYPE_INNER,
                                    B.css({
                                        display: "none"
                                    }),
                                    window.zTreeMoveTimer)
                                    clearTimeout(window.zTreeMoveTimer),
                                        window.zTreeMoveTargetNodeTId = null
                            } else {
                                c = w("#" + u + d.id.A, s);
                                i = z.isLastNode ? null : w("#" + z.getNextNode().tId + d.id.A, s.next());
                                j = c.offset().top;
                                k = c.offset().left;
                                K = n ? G ? 0.25 : a ? 0.5 : 1 : -1;
                                G = a ? G ? 0.75 : n ? 0.5 : 0 : -1;
                                y = (b.clientY + y - j) / c.height();
                                (K == 1 || y <= K && y >= -0.2) && n ? (a = 1 - B.width(),
                                    i = j - B.height() / 2,
                                    v = d.move.TYPE_PREV) : (G == 0 || y >= G && y <= 1.2) && a ? (a = 1 - B.width(),
                                    i = i == null || z.isParent && z.open ? j + c.height() - B.height() / 2 : i.offset().top - B.height() / 2,
                                    v = d.move.TYPE_NEXT) : (a = 5 - B.width(),
                                    i = j,
                                    v = d.move.TYPE_INNER);
                                B.css({
                                    display: "block",
                                    top: i + "px",
                                    left: k + a + "px"
                                });
                                c.addClass(d.node.TMPTARGET_NODE + "_" + v);
                                if (T != u || U != v)
                                    L = (new Date).getTime();
                                if (z && z.isParent && v == d.move.TYPE_INNER && (y = !0,
                                    window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId !== z.tId ? (clearTimeout(window.zTreeMoveTimer),
                                        window.zTreeMoveTargetNodeTId = null) : window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId === z.tId && (y = !1),
                                    y))
                                    window.zTreeMoveTimer = setTimeout(function() {
                                        v == d.move.TYPE_INNER && z && z.isParent && !z.open && (new Date).getTime() - L > h.edit.drag.autoOpenTime && g.apply(h.callback.beforeDragOpen, [h.treeId, z], !0) && (f.switchNode(h, z),
                                        h.edit.drag.autoExpandTrigger && h.treeObj.trigger(d.event.EXPAND, [h.treeId, z]))
                                    }, h.edit.drag.autoOpenTime + 50),
                                        window.zTreeMoveTargetNodeTId = z.tId
                            }
                        } else if (v = d.move.TYPE_INNER,
                            s && g.apply(h.edit.drag.inner, [h.treeId, l, null], !!h.edit.drag.inner) ? s.addClass(d.node.TMPTARGET_TREE) : s = null,
                            B.css({
                                display: "none"
                            }),
                            window.zTreeMoveTimer)
                            clearTimeout(window.zTreeMoveTimer),
                                window.zTreeMoveTargetNodeTId = null;
                        T = u;
                        U = v;
                        e.treeObj.trigger(d.event.DRAGMOVE, [b, e.treeId, l])
                    }
                    return !1
                }
                function r(b) {
                    if (window.zTreeMoveTimer)
                        clearTimeout(window.zTreeMoveTimer),
                            window.zTreeMoveTargetNodeTId = null;
                    U = T = null;
                    F.unbind("mousemove", c);
                    F.unbind("mouseup", r);
                    F.unbind("selectstart", k);
                    M.css("cursor", "auto");
                    s && (s.removeClass(d.node.TMPTARGET_TREE),
                    u && w("#" + u + d.id.A, s).removeClass(d.node.TMPTARGET_NODE + "_" + d.move.TYPE_PREV).removeClass(d.node.TMPTARGET_NODE + "_" + I.move.TYPE_NEXT).removeClass(d.node.TMPTARGET_NODE + "_" + I.move.TYPE_INNER));
                    g.showIfameMask(e, !1);
                    t.showHoverDom = !0;
                    if (C.dragFlag != 0) {
                        C.dragFlag = 0;
                        var a, i, j;
                        for (a = 0,
                                 i = l.length; a < i; a++)
                            j = l[a],
                            j.isParent && C.dragNodeShowBefore[j.tId] && !j.open && (f.expandCollapseNode(e, j, !j.open),
                                delete C.dragNodeShowBefore[j.tId]);
                        D && D.remove();
                        B && B.remove();
                        var p = (b.ctrlKey || b.metaKey) && e.edit.drag.isMove && e.edit.drag.isCopy || !e.edit.drag.isMove && e.edit.drag.isCopy;
                        !p && s && u && l[0].parentTId && u == l[0].parentTId && v == d.move.TYPE_INNER && (s = null);
                        if (s) {
                            var q = u == null ? null : m.getNodeCache(h, u);
                            if (g.apply(e.callback.beforeDrop, [h.treeId, l, q, v, p], !0) == !1)
                                f.selectNodes(x, l);
                            else {
                                var A = p ? g.clone(l) : l;
                                a = function() {
                                    if (J) {
                                        if (!p)
                                            for (var a = 0, c = l.length; a < c; a++)
                                                f.removeNode(e, l[a]);
                                        if (v == d.move.TYPE_INNER)
                                            f.addNodes(h, q, A);
                                        else if (f.addNodes(h, q.getParentNode(), A),
                                        v == d.move.TYPE_PREV)
                                            for (a = 0,
                                                     c = A.length; a < c; a++)
                                                f.moveNode(h, q, A[a], v, !1);
                                        else
                                            for (a = -1,
                                                     c = A.length - 1; a < c; c--)
                                                f.moveNode(h, q, A[c], v, !1)
                                    } else if (p && v == d.move.TYPE_INNER)
                                        f.addNodes(h, q, A);
                                    else if (p && f.addNodes(h, q.getParentNode(), A),
                                    v != d.move.TYPE_NEXT)
                                        for (a = 0,
                                                 c = A.length; a < c; a++)
                                            f.moveNode(h, q, A[a], v, !1);
                                    else
                                        for (a = -1,
                                                 c = A.length - 1; a < c; c--)
                                            f.moveNode(h, q, A[c], v, !1);
                                    f.selectNodes(h, A);
                                    o(A[0], e).focus().blur();
                                    e.treeObj.trigger(d.event.DROP, [b, h.treeId, A, q, v, p])
                                }
                                ;
                                v == d.move.TYPE_INNER && g.canAsync(h, q) ? f.asyncNode(h, q, !1, a) : a()
                            }
                        } else
                            f.selectNodes(x, l),
                                e.treeObj.trigger(d.event.DROP, [b, e.treeId, l, null, null, null])
                    }
                }
                function k() {
                    return !1
                }
                var i, j, e = m.getSetting(b.data.treeId), C = m.getRoot(e), t = m.getRoots();
                if (b.button == 2 || !e.edit.enable || !e.edit.drag.isCopy && !e.edit.drag.isMove)
                    return !0;
                var p = b.target
                    , q = m.getRoot(e).curSelectedList
                    , l = [];
                if (m.isSelectedNode(e, a))
                    for (i = 0,
                             j = q.length; i < j; i++) {
                        if (q[i].editNameFlag && g.eqs(p.tagName, "input") && p.getAttribute("treeNode" + d.id.INPUT) !== null)
                            return !0;
                        l.push(q[i]);
                        if (l[0].parentTId !== q[i].parentTId) {
                            l = [a];
                            break
                        }
                    }
                else
                    l = [a];
                f.editNodeBlur = !0;
                f.cancelCurEditNode(e);
                var F = w(e.treeObj.get(0).ownerDocument), M = w(e.treeObj.get(0).ownerDocument.body), D, B, s, J = !1, h = e, x = e, H, R, T = null, U = null, u = null, v = d.move.TYPE_INNER, N = b.clientX, O = b.clientY, L = (new Date).getTime();
                g.uCanDo(e) && F.bind("mousemove", c);
                F.bind("mouseup", r);
                F.bind("selectstart", k);
                b.preventDefault && b.preventDefault();
                return !0
            }
        };
        w.extend(!0, w.fn.zTree.consts, I);
        w.extend(!0, w.fn.zTree._z, {
            tools: {
                getAbs: function(b) {
                    b = b.getBoundingClientRect();
                    return [b.left + (document.body.scrollLeft + document.documentElement.scrollLeft), b.top + (document.body.scrollTop + document.documentElement.scrollTop)]
                },
                inputFocus: function(b) {
                    b.get(0) && (b.focus(),
                        g.setCursorPosition(b.get(0), b.val().length))
                },
                inputSelect: function(b) {
                    b.get(0) && (b.focus(),
                        b.select())
                },
                setCursorPosition: function(b, a) {
                    if (b.setSelectionRange)
                        b.focus(),
                            b.setSelectionRange(a, a);
                    else if (b.createTextRange) {
                        var c = b.createTextRange();
                        c.collapse(!0);
                        c.moveEnd("character", a);
                        c.moveStart("character", a);
                        c.select()
                    }
                },
                showIfameMask: function(b, a) {
                    for (var c = m.getRoot(b); c.dragMaskList.length > 0; )
                        c.dragMaskList[0].remove(),
                            c.dragMaskList.shift();
                    if (a)
                        for (var d = o("iframe", b), f = 0, i = d.length; f < i; f++) {
                            var j = d.get(f)
                                , e = g.getAbs(j)
                                , j = o("<div id='zTreeMask_" + f + "' class='zTreeMask' style='top:" + e[1] + "px; left:" + e[0] + "px; width:" + j.offsetWidth + "px; height:" + j.offsetHeight + "px;'></div>", b);
                            j.appendTo(o("body", b));
                            c.dragMaskList.push(j)
                        }
                }
            },
            view: {
                addEditBtn: function(b, a) {
                    if (!(a.editNameFlag || o(a, d.id.EDIT, b).length > 0) && g.apply(b.edit.showRenameBtn, [b.treeId, a], b.edit.showRenameBtn)) {
                        var c = o(a, d.id.A, b)
                            , r = "<span class='" + d.className.BUTTON + " edit' id='" + a.tId + d.id.EDIT + "' title='" + g.apply(b.edit.renameTitle, [b.treeId, a], b.edit.renameTitle) + "' treeNode" + d.id.EDIT + " style='display:none;'></span>";
                        c.append(r);
                        o(a, d.id.EDIT, b).bind("click", function() {
                            if (!g.uCanDo(b) || g.apply(b.callback.beforeEditName, [b.treeId, a], !0) == !1)
                                return !1;
                            f.editNode(b, a);
                            return !1
                        }).show()
                    }
                },
                addRemoveBtn: function(b, a) {
                    if (!(a.editNameFlag || o(a, d.id.REMOVE, b).length > 0) && g.apply(b.edit.showRemoveBtn, [b.treeId, a], b.edit.showRemoveBtn)) {
                        var c = o(a, d.id.A, b)
                            , r = "<span class='" + d.className.BUTTON + " remove' id='" + a.tId + d.id.REMOVE + "' title='" + g.apply(b.edit.removeTitle, [b.treeId, a], b.edit.removeTitle) + "' treeNode" + d.id.REMOVE + " style='display:none;'></span>";
                        c.append(r);
                        o(a, d.id.REMOVE, b).bind("click", function() {
                            if (!g.uCanDo(b) || g.apply(b.callback.beforeRemove, [b.treeId, a], !0) == !1)
                                return !1;
                            f.removeNode(b, a);
                            b.treeObj.trigger(d.event.REMOVE, [b.treeId, a]);
                            return !1
                        }).bind("mousedown", function() {
                            return !0
                        }).show()
                    }
                },
                addHoverDom: function(b, a) {
                    if (m.getRoots().showHoverDom)
                        a.isHover = !0,
                        b.edit.enable && (f.addEditBtn(b, a),
                            f.addRemoveBtn(b, a)),
                            g.apply(b.view.addHoverDom, [b.treeId, a])
                },
                cancelCurEditNode: function(b, a, c) {
                    var r = m.getRoot(b)
                        , k = b.data.key.name
                        , i = r.curEditNode;
                    if (i) {
                        var j = r.curEditInput
                            , a = a ? a : c ? i[k] : j.val();
                        if (g.apply(b.callback.beforeRename, [b.treeId, i, a, c], !0) === !1)
                            return !1;
                        else
                            i[k] = a,
                                b.treeObj.trigger(d.event.RENAME, [b.treeId, i, c]);
                        o(i, d.id.A, b).removeClass(d.node.CURSELECTED_EDIT);
                        j.unbind();
                        f.setNodeName(b, i);
                        i.editNameFlag = !1;
                        r.curEditNode = null;
                        r.curEditInput = null;
                        f.selectNode(b, i, !1)
                    }
                    return r.noSelection = !0
                },
                editNode: function(b, a) {
                    var c = m.getRoot(b);
                    f.editNodeBlur = !1;
                    if (m.isSelectedNode(b, a) && c.curEditNode == a && a.editNameFlag)
                        setTimeout(function() {
                            g.inputFocus(c.curEditInput)
                        }, 0);
                    else {
                        var r = b.data.key.name;
                        a.editNameFlag = !0;
                        f.removeTreeDom(b, a);
                        f.cancelCurEditNode(b);
                        f.selectNode(b, a, !1);
                        o(a, d.id.SPAN, b).html("<input type=text class='rename' id='" + a.tId + d.id.INPUT + "' treeNode" + d.id.INPUT + " >");
                        var k = o(a, d.id.INPUT, b);
                        k.attr("value", a[r]);
                        b.edit.editNameSelectAll ? g.inputSelect(k) : g.inputFocus(k);
                        k.bind("blur", function() {
                            f.editNodeBlur || f.cancelCurEditNode(b)
                        }).bind("keydown", function(a) {
                            a.keyCode == "13" ? (f.editNodeBlur = !0,
                                f.cancelCurEditNode(b)) : a.keyCode == "27" && f.cancelCurEditNode(b, null, !0)
                        }).bind("click", function() {
                            return !1
                        }).bind("dblclick", function() {
                            return !1
                        });
                        o(a, d.id.A, b).addClass(d.node.CURSELECTED_EDIT);
                        c.curEditInput = k;
                        c.noSelection = !1;
                        c.curEditNode = a
                    }
                },
                moveNode: function(b, a, c, r, k, i) {
                    var j = m.getRoot(b)
                        , e = b.data.key.children;
                    if (a != c && (!b.data.keep.leaf || !a || a.isParent || r != d.move.TYPE_INNER)) {
                        var g = c.parentTId ? c.getParentNode() : j
                            , t = a === null || a == j;
                        t && a === null && (a = j);
                        if (t)
                            r = d.move.TYPE_INNER;
                        j = a.parentTId ? a.getParentNode() : j;
                        if (r != d.move.TYPE_PREV && r != d.move.TYPE_NEXT)
                            r = d.move.TYPE_INNER;
                        if (r == d.move.TYPE_INNER)
                            if (t)
                                c.parentTId = null;
                            else {
                                if (!a.isParent)
                                    a.isParent = !0,
                                        a.open = !!a.open,
                                        f.setNodeLineIcos(b, a);
                                c.parentTId = a.tId
                            }
                        var p;
                        t ? p = t = b.treeObj : (!i && r == d.move.TYPE_INNER ? f.expandCollapseNode(b, a, !0, !1) : i || f.expandCollapseNode(b, a.getParentNode(), !0, !1),
                            t = o(a, b),
                            p = o(a, d.id.UL, b),
                        t.get(0) && !p.get(0) && (p = [],
                            f.makeUlHtml(b, a, p, ""),
                            t.append(p.join(""))),
                            p = o(a, d.id.UL, b));
                        var q = o(c, b);
                        q.get(0) ? t.get(0) || q.remove() : q = f.appendNodes(b, c.level, [c], null, !1, !0).join("");
                        p.get(0) && r == d.move.TYPE_INNER ? p.append(q) : t.get(0) && r == d.move.TYPE_PREV ? t.before(q) : t.get(0) && r == d.move.TYPE_NEXT && t.after(q);
                        var l = -1
                            , w = 0
                            , x = null
                            , t = null
                            , D = c.level;
                        if (c.isFirstNode) {
                            if (l = 0,
                            g[e].length > 1)
                                x = g[e][1],
                                    x.isFirstNode = !0
                        } else if (c.isLastNode)
                            l = g[e].length - 1,
                                x = g[e][l - 1],
                                x.isLastNode = !0;
                        else
                            for (p = 0,
                                     q = g[e].length; p < q; p++)
                                if (g[e][p].tId == c.tId) {
                                    l = p;
                                    break
                                }
                        l >= 0 && g[e].splice(l, 1);
                        if (r != d.move.TYPE_INNER)
                            for (p = 0,
                                     q = j[e].length; p < q; p++)
                                j[e][p].tId == a.tId && (w = p);
                        if (r == d.move.TYPE_INNER) {
                            a[e] || (a[e] = []);
                            if (a[e].length > 0)
                                t = a[e][a[e].length - 1],
                                    t.isLastNode = !1;
                            a[e].splice(a[e].length, 0, c);
                            c.isLastNode = !0;
                            c.isFirstNode = a[e].length == 1
                        } else
                            a.isFirstNode && r == d.move.TYPE_PREV ? (j[e].splice(w, 0, c),
                                t = a,
                                t.isFirstNode = !1,
                                c.parentTId = a.parentTId,
                                c.isFirstNode = !0,
                                c.isLastNode = !1) : a.isLastNode && r == d.move.TYPE_NEXT ? (j[e].splice(w + 1, 0, c),
                                t = a,
                                t.isLastNode = !1,
                                c.parentTId = a.parentTId,
                                c.isFirstNode = !1,
                                c.isLastNode = !0) : (r == d.move.TYPE_PREV ? j[e].splice(w, 0, c) : j[e].splice(w + 1, 0, c),
                                c.parentTId = a.parentTId,
                                c.isFirstNode = !1,
                                c.isLastNode = !1);
                        m.fixPIdKeyValue(b, c);
                        m.setSonNodeLevel(b, c.getParentNode(), c);
                        f.setNodeLineIcos(b, c);
                        f.repairNodeLevelClass(b, c, D);
                        !b.data.keep.parent && g[e].length < 1 ? (g.isParent = !1,
                            g.open = !1,
                            a = o(g, d.id.UL, b),
                            r = o(g, d.id.SWITCH, b),
                            e = o(g, d.id.ICON, b),
                            f.replaceSwitchClass(g, r, d.folder.DOCU),
                            f.replaceIcoClass(g, e, d.folder.DOCU),
                            a.css("display", "none")) : x && f.setNodeLineIcos(b, x);
                        t && f.setNodeLineIcos(b, t);
                        b.check && b.check.enable && f.repairChkClass && (f.repairChkClass(b, g),
                            f.repairParentChkClassWithSelf(b, g),
                        g != c.parent && f.repairParentChkClassWithSelf(b, c));
                        i || f.expandCollapseParentNode(b, c.getParentNode(), !0, k)
                    }
                },
                removeEditBtn: function(b, a) {
                    o(a, d.id.EDIT, b).unbind().remove()
                },
                removeRemoveBtn: function(b, a) {
                    o(a, d.id.REMOVE, b).unbind().remove()
                },
                removeTreeDom: function(b, a) {
                    a.isHover = !1;
                    f.removeEditBtn(b, a);
                    f.removeRemoveBtn(b, a);
                    g.apply(b.view.removeHoverDom, [b.treeId, a])
                },
                repairNodeLevelClass: function(b, a, c) {
                    if (c !== a.level) {
                        var f = o(a, b)
                            , g = o(a, d.id.A, b)
                            , b = o(a, d.id.UL, b)
                            , c = d.className.LEVEL + c
                            , a = d.className.LEVEL + a.level;
                        f.removeClass(c);
                        f.addClass(a);
                        g.removeClass(c);
                        g.addClass(a);
                        b.removeClass(c);
                        b.addClass(a)
                    }
                },
                selectNodes: function(b, a) {
                    for (var c = 0, d = a.length; c < d; c++)
                        f.selectNode(b, a[c], c > 0)
                }
            },
            event: {},
            data: {
                setSonNodeLevel: function(b, a, c) {
                    if (c) {
                        var d = b.data.key.children;
                        c.level = a ? a.level + 1 : 0;
                        if (c[d])
                            for (var a = 0, f = c[d].length; a < f; a++)
                                c[d][a] && m.setSonNodeLevel(b, c, c[d][a])
                    }
                }
            }
        });
        var H = w.fn.zTree
            , g = H._z.tools
            , d = H.consts
            , f = H._z.view
            , m = H._z.data
            , o = g.$;
        m.exSetting({
            edit: {
                enable: !1,
                editNameSelectAll: !1,
                showRemoveBtn: !0,
                showRenameBtn: !0,
                removeTitle: "remove",
                renameTitle: "rename",
                drag: {
                    autoExpandTrigger: !1,
                    isCopy: !0,
                    isMove: !0,
                    prev: !0,
                    next: !0,
                    inner: !0,
                    minMoveSize: 5,
                    borderMax: 10,
                    borderMin: -5,
                    maxShowNodeNum: 5,
                    autoOpenTime: 500
                }
            },
            view: {
                addHoverDom: null,
                removeHoverDom: null
            },
            callback: {
                beforeDrag: null,
                beforeDragOpen: null,
                beforeDrop: null,
                beforeEditName: null,
                beforeRename: null,
                onDrag: null,
                onDragMove: null,
                onDrop: null,
                onRename: null
            }
        });
        m.addInitBind(function(b) {
            var a = b.treeObj
                , c = d.event;
            a.bind(c.RENAME, function(a, c, d, f) {
                g.apply(b.callback.onRename, [a, c, d, f])
            });
            a.bind(c.DRAG, function(a, c, d, f) {
                g.apply(b.callback.onDrag, [c, d, f])
            });
            a.bind(c.DRAGMOVE, function(a, c, d, f) {
                g.apply(b.callback.onDragMove, [c, d, f])
            });
            a.bind(c.DROP, function(a, c, d, f, e, m, o) {
                g.apply(b.callback.onDrop, [c, d, f, e, m, o])
            })
        });
        m.addInitUnBind(function(b) {
            var b = b.treeObj
                , a = d.event;
            b.unbind(a.RENAME);
            b.unbind(a.DRAG);
            b.unbind(a.DRAGMOVE);
            b.unbind(a.DROP)
        });
        m.addInitCache(function() {});
        m.addInitNode(function(b, a, c) {
            if (c)
                c.isHover = !1,
                    c.editNameFlag = !1
        });
        m.addInitProxy(function(b) {
            var a = b.target
                , c = m.getSetting(b.data.treeId)
                , f = b.relatedTarget
                , k = ""
                , i = null
                , j = ""
                , e = null
                , o = null;
            if (g.eqs(b.type, "mouseover")) {
                if (o = g.getMDom(c, a, [{
                    tagName: "a",
                    attrName: "treeNode" + d.id.A
                }]))
                    k = g.getNodeMainDom(o).id,
                        j = "hoverOverNode"
            } else if (g.eqs(b.type, "mouseout"))
                o = g.getMDom(c, f, [{
                    tagName: "a",
                    attrName: "treeNode" + d.id.A
                }]),
                o || (k = "remove",
                    j = "hoverOutNode");
            else if (g.eqs(b.type, "mousedown") && (o = g.getMDom(c, a, [{
                tagName: "a",
                attrName: "treeNode" + d.id.A
            }])))
                k = g.getNodeMainDom(o).id,
                    j = "mousedownNode";
            if (k.length > 0)
                switch (i = m.getNodeCache(c, k),
                    j) {
                    case "mousedownNode":
                        e = x.onMousedownNode;
                        break;
                    case "hoverOverNode":
                        e = x.onHoverOverNode;
                        break;
                    case "hoverOutNode":
                        e = x.onHoverOutNode
                }
            return {
                stop: !1,
                node: i,
                nodeEventType: j,
                nodeEventCallback: e,
                treeEventType: "",
                treeEventCallback: null
            }
        });
        m.addInitRoot(function(b) {
            var b = m.getRoot(b)
                , a = m.getRoots();
            b.curEditNode = null;
            b.curEditInput = null;
            b.curHoverNode = null;
            b.dragFlag = 0;
            b.dragNodeShowBefore = [];
            b.dragMaskList = [];
            a.showHoverDom = !0
        });
        m.addZTreeTools(function(b, a) {
            a.cancelEditName = function(a) {
                m.getRoot(this.setting).curEditNode && f.cancelCurEditNode(this.setting, a ? a : null, !0)
            }
            ;
            a.copyNode = function(a, b, k, i) {
                if (!b)
                    return null;
                if (a && !a.isParent && this.setting.data.keep.leaf && k === d.move.TYPE_INNER)
                    return null;
                var j = this
                    , e = g.clone(b);
                if (!a)
                    a = null,
                        k = d.move.TYPE_INNER;
                k == d.move.TYPE_INNER ? (b = function() {
                    f.addNodes(j.setting, a, [e], i)
                }
                    ,
                    g.canAsync(this.setting, a) ? f.asyncNode(this.setting, a, i, b) : b()) : (f.addNodes(this.setting, a.parentNode, [e], i),
                    f.moveNode(this.setting, a, e, k, !1, i));
                return e
            }
            ;
            a.editName = function(a) {
                a && a.tId && a === m.getNodeCache(this.setting, a.tId) && (a.parentTId && f.expandCollapseParentNode(this.setting, a.getParentNode(), !0),
                    f.editNode(this.setting, a))
            }
            ;
            a.moveNode = function(a, b, k, i) {
                function j() {
                    f.moveNode(e.setting, a, b, k, !1, i)
                }
                if (!b)
                    return b;
                if (a && !a.isParent && this.setting.data.keep.leaf && k === d.move.TYPE_INNER)
                    return null;
                else if (a && (b.parentTId == a.tId && k == d.move.TYPE_INNER || o(b, this.setting).find("#" + a.tId).length > 0))
                    return null;
                else
                    a || (a = null);
                var e = this;
                g.canAsync(this.setting, a) && k === d.move.TYPE_INNER ? f.asyncNode(this.setting, a, i, j) : j();
                return b
            }
            ;
            a.setEditable = function(a) {
                this.setting.edit.enable = a;
                return this.refresh()
            }
        });
        var N = f.cancelPreSelectedNode;
        f.cancelPreSelectedNode = function(b, a) {
            for (var c = m.getRoot(b).curSelectedList, d = 0, g = c.length; d < g; d++)
                if (!a || a === c[d])
                    if (f.removeTreeDom(b, c[d]),
                        a)
                        break;
            N && N.apply(f, arguments)
        }
        ;
        var O = f.createNodes;
        f.createNodes = function(b, a, c, d) {
            O && O.apply(f, arguments);
            c && f.repairParentChkClassWithSelf && f.repairParentChkClassWithSelf(b, d)
        }
        ;
        var V = f.makeNodeUrl;
        f.makeNodeUrl = function(b, a) {
            return b.edit.enable ? null : V.apply(f, arguments)
        }
        ;
        var L = f.removeNode;
        f.removeNode = function(b, a) {
            var c = m.getRoot(b);
            if (c.curEditNode === a)
                c.curEditNode = null;
            L && L.apply(f, arguments)
        }
        ;
        var P = f.selectNode;
        f.selectNode = function(b, a, c) {
            var d = m.getRoot(b);
            if (m.isSelectedNode(b, a) && d.curEditNode == a && a.editNameFlag)
                return !1;
            P && P.apply(f, arguments);
            f.addHoverDom(b, a);
            return !0
        }
        ;
        var Q = g.uCanDo;
        g.uCanDo = function(b, a) {
            var c = m.getRoot(b);
            if (a && (g.eqs(a.type, "mouseover") || g.eqs(a.type, "mouseout") || g.eqs(a.type, "mousedown") || g.eqs(a.type, "mouseup")))
                return !0;
            if (c.curEditNode)
                f.editNodeBlur = !1,
                    c.curEditInput.focus();
            return !c.curEditNode && (Q ? Q.apply(f, arguments) : !0)
        }
    }
)(jQuery);
