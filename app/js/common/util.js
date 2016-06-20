// 工具函数在这里，在这里
var ua = navigator.userAgent;
var cache = require('./cache');
var dict = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
module.exports = {
    parseTime: function(timestamp, fmt) {
        var d = new Date(timestamp),
            f = fmt || 'yyyy-MM-dd hh:mm:ss',
            o = {
                "M+": d.getMonth() + 1, //月份
                "d+": d.getDate(), //日
                "h+": d.getHours(), //小时
                "m+": d.getMinutes(), //分
                "s+": d.getSeconds(), //秒
                "q+": Math.floor((d.getMonth() + 3) / 3), //季度
                "S": d.getMilliseconds() //毫秒
            };
        if (/(y+)/.test(f)) {
            f = f.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(f)) {
                f = f.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return f;
    },
    //格式化时间
    parseDate: function(timestamp, fmt) {
        var d = new Date(timestamp);
        //30/4
        return (d.getDate()) + '/' + (d.getMonth() + 1);
    },
    // 获取零点时间
    getZeroTime: function(time) {
        var t = new Date(time);
        t.setHours(0);
        t.setMinutes(0);
        t.setSeconds(0);
        t.setMilliseconds(0);
        return t.getTime();
    },
    parseURL: function(url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function() {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1')
        };
    },
    ellipsisString: function(string, number, ellipsis) {
        var number = number ? number : 30;
        var ellipsis = ellipsis ? ellipsis : '...';
        return string.substring(0, number) + ellipsis;
    },

    now: Date.now || function() {
        return new Date().getTime();
    },
    getParameterByName: function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.href);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    os: {
        isAndroid: function() {
            return /Android/i.test(ua);
        },
        isBlackBerry: function() {
            return /BlackBerry/i.test(ua);
        },
        isiOS: function() {
            return /iPhone|iPad|iPod/i.test(ua);
        },
        isWindows: function() {
            return /IEMobile/i.test(ua);
        },
        isWechat: function() {
            return /MICROMESSENGER/i.test(ua);
        }
    },
    getRMBStr: function(amt) {

        return amt ? (parseInt(amt / 100) + '.' + parseInt((amt / 10) % 10) + parseInt(amt % 10)) : '0';
    },
    UUID: function() {
        var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            len = s.length,
            uuid = '';
        for (var i = 0; i < 32; i++) {
            var idx = Math.floor((1 + Math.random()) * len) % len;
            uuid += s.charAt(idx);
        }
        return uuid;
    },
    getCookie: function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))

            return unescape(arr[2]);
        else
            return null;
    },
    getScale: function() {

    }
};