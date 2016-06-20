/**
 * @param options
 */
var cache = require('./cache');
var util = require('./util');
var send = 0;
require('./XM_dialog');

/**
 * a time limited loader
 * @param showLoading
 * @returns {{load: Function, unload: Function}}
 * @constructor
 */
var TimelyLoader = function(showLoading) {
    return {
        load: function() {
            var me = this;
            if (showLoading) {
                this.handler = setTimeout(function() {
                    send++;
                    $.XM_dialog.load();
                }, 160); //60fps
            }
        },
        unload: function() {
            var handler = this.handler;
            if (handler) {
                clearTimeout(handler);
            }
            if (showLoading && --send <= 0) {
                send = 0;
                $.XM_dialog.unload();
            }
        }
    };
};


function sign(url, userAgent, postData) {
    var verifyTable = "SNQmPg45GGl2GCF9EBHNFrWTJEViWv1NWOZFTLVtVvPZYSAtQOzhbF6Zf4EILVAMnIeTPiBALtMpmycMWOTc5wV9Es3WgW9YZ06dnmJT36NLy8IHwYGFsTGgFIOmZX9gm0AQUcTkUTWo7WHLDpHYXhLDEK7nYfyAFRKdbrCPOB4jlPCMophJEN3hUCMUVTcQNCLVFGQ9W0OAMZmTzQMM8fPBwKKNFf6FiHRqimWLmzNTdE9NJoNZ6DobeZou9e496454b656964d23dcc16a512d67e3bcecb68775b5684a103796eb5bb74bf81adb8ed719fd5f5CzZEAxHMm4bzL5IEmU#ZpIzS<4pN0m?aQtpC0SuaRfTmX6r05LlKYTX9dgW%JUO08PQFUmLSRNN^epU7xSxmV8UdQyE7VU480Xpr8dCE80hefXQx^?SttcMxQp6gG48IKpz?2?XVxpTs8mzEXm2pTI&JKzq7eOZesmmnG0w00DmjxnbFKxvQQxQbKpImUQmW?1OTaHZSOyx^!axpq2#4VFN9b6PUmddJVeHLiNuPy#W0x<0?NzvVgpMrxJ2xEBxU";
    var paddingData = '';
    var total = 39;
    for (var i = 0; i < total; i++) {
        var hex = verifyTable.substring(253 + i * 2, 253 + i * 2 + 2);
        paddingData += verifyTable.charAt(253 + total * 2 + parseInt(hex, 16));
    }
    //if(paddingData != "i&m^d08#U!z0#N8%x^8x7U2mEpQxmtWpnK<?eFp"){
    //    alert('wrong sign');
    //}
    var md5Data = url + userAgent + paddingData;
    if (postData) {
        md5Data += postData;
    }
    var md5Str = $.hex_md5(md5Data);
    var len = url.length;
    var verifyCode = Math.floor(len * Math.floor(Math.sqrt(len)));
    verifyCode += userAgent.length;
    if (postData) {
        verifyCode += postData.length * 3;
    }
    var indexMap = [11, 3, 8, 14, 15, 9, 7, 2];
    var subMd5Str = '';
    var len = indexMap.length;
    for (var i = 0; i < len; i++) {
        var c = md5Str.charCodeAt(indexMap[i]);
        verifyCode += c % (27 + i);
        subMd5Str += md5Str.charAt(indexMap[i]);
    }
    var verifyChar = verifyTable.charAt(verifyCode % 253);
    return '4' + subMd5Str + verifyChar;
}

var sessionExpiredDialog = util.sessionExpiredDialog;


module.exports = function(options) {

    //需要session的接口可以先检查当前客户端是否有session
    if (options.authRequired && (cache.getSessionId() || '') < 8) {
        (options.sessionExpired || sessionExpiredDialog)({
            c: -3
        });
        return;
    }

    var params = JSON.stringify(options.params),
        showLoading = options.showLoading !== false,
        p = {
            i: 'wc',
            v: window.XM_VERSION || 1, //todo: version read from somewhere
            t: 4 //4 as web
        },
        u = cache.getUid() || '',
        tl = new TimelyLoader(showLoading);

    if (u) {
        p.u = u;
    }
    var url = options.path + '?' + $.param($.extend(p, options.queryParams)),
        g = sign(url.replace(/^\/\w+\//, ''), navigator.userAgent, params);

    url = (!new RegExp('^http', 'i').test(url) && $.Cfg[options.remote||'biz'] || '') + url + '&g=' + g;

    var opts = {
        type: 'POST', //hard code, we only support post for encryption purpose
        url: url,
        contentType: typeof options.contentType === 'undefined' ? 'application/json' : options.contentType,
        data: params || options.data,
        processData: typeof options.processData === 'undefined' ? true : options.processData,
        dataType: options.dataType || 'text',
        timeout: options.timeout || 15000,
        success: function(res) {
            res = res.replace(/\":(\d{16,})/g, "\":\"$1\"");
            res = JSON.parse(res);
            var success = options.success || function() {},
                error = options.error || function(res) {
                    if ($.Cfg.showErrorCode) {
                        $.XM_dialog.tip(res.msg);
                    }
                };
            /*
             *error
             *msg
             *code
             *data
             */
            try {
                if (res.code == 1) {
                    success(res.data);
                } else {
                    error(res);
                }
            } catch (e) {}
            tl.unload();
        },
        error: function(request, error) {
            tl.unload();
            (options.serverDown || function() {
                var msg = (error === 'abort' || error === 'timeout') ? '网络不给力哦' : '服务器错误';
                $.XM_dialog.tip(msg, 1000);
            })();
        },
        complete: function() {
            typeof options.complete === 'function' && options.complete.apply(this, arguments);
        }
    };
    if (cache.isCORS(opts.url) && cache.getSessionId()) {
        opts.headers = {
            'x-session': cache.getSessionId()
        };
    }

    tl.load();
    $.ajax(opts);
    if (window.debugXHR) {
        console.log(opts.url + '&d=' + encodeURIComponent(params) + '&s=' + encodeURIComponent(cache.getSessionId()));
    }
};
