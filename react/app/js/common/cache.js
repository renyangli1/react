var SESSION_ID = 's';
var PHONE = 'phone';
var UID = 'u';
var DEVICE_ID = 'did';
var ADDRESS = 'address';
var SHOP_TYPE = 'stp';
var CITY = 'city';
var POI = 'poi';
var JUMP_IMAGE = 'jimg';
var JUMP_NUM = 'jnum';
var JUMP_MODULE = 'jmod';
var UPGRADE_GUIDE = 'ug';
var UPGRADE_GUIDE_VERSION = '1'; // todo: update this whenever a new upgrade version is available
var EXPIRES = 3650; //十年够了吧
var LS = null; //localStorage
var domain = document.domain;
var secure = !!location.href.match(/^https/i);
var util = require('./util');

if (domain.match(/localhost/)) {
    domain = '';
} else if (domain.match(/m\.xiaomei\.com/i)) { //防止不同环境的cookie同时存在
    domain = 'm.xiaomei.com';
}

function clearDevEnvsCookie(k) {
    //cookie数据修复
    $.each(['dev.m.xiaomei.com', 'dev2.m.xiaomei.com', 'test.m.xiaomei.com', 'rc.m.xiaomei.com'],
        function(idx, d) {
            $.fn.cookie(k, '', {
                expires: -1,
                path: '/',
                domain: d
            });
        });
}

module.exports = {
    CONST: {
        SESSION_ID: SESSION_ID,
        UID: UID
    },
    isCORS: function(requestUrl) {
        var regex = /^https?:\/\/([^\/]+)\/?/i,
            urlDomain = document.location.href.match(regex),
            ajaxDomain = requestUrl.match(regex);

        return ajaxDomain && ajaxDomain[1] !== urlDomain[1];
    },

    isGuided: function() {
        return this.getItem(UPGRADE_GUIDE) === UPGRADE_GUIDE_VERSION;
    },

    setGuided: function() {
        return this.setItem(UPGRADE_GUIDE, UPGRADE_GUIDE_VERSION);
    },

    getUid: function() {
        return this.getItem(UID);
    },

    setUid: function(v) {
        return this.setItem(UID, v || '');
    },

    setJimg: function(v) {
        return this.setItem(JUMP_IMAGE, v);
    },
    getJimg: function() {
        return this.getItem(JUMP_IMAGE);
    },
    setJnum: function(v) {
        return this.setItem(JUMP_NUM, v);
    },
    getJnum: function() {
        return this.getItem(JUMP_NUM);
    },
    setJmod: function(v) {
        return this.setItem(JUMP_MODULE, JSON.stringify(v));
    },
    getJmod: function() {
        var Jmod = this.getItem(JUMP_MODULE);
        return (Jmod && JSON.parse(Jmod)) || null;
    },

    setPOI: function(v) {
        return this.setItem(POI, JSON.stringify(v));
    },
    getPOI: function() {
        var poi = this.getItem(POI);
        return (poi && JSON.parse(poi)) || null;
    },

    getCity: function() {
        var city = this.getItem(CITY);
        return (city && JSON.parse(city)) || null;
    },
    setCity: function(v) {
        return this.setItem(CITY, JSON.stringify(v));
    },
    setAddress: function(v) {
        return this.setItem(ADDRESS, v);
    },
    getAddress: function() {
        return this.getItem(ADDRESS);
    },

    setShopType: function(v) {
        return this.setItem(SHOP_TYPE, v);
    },
    getShopType: function() {
        return this.getItem(SHOP_TYPE);
    },

    getSessionId: function() {
        return this.getItem(SESSION_ID);
    },

    hasSession: function() {
        return (this.getSessionId() || '').length >= 8;
    },

    setSessionId: function(sid) {
        this.setItem(SESSION_ID, sid || '');
    },

    getPhone: function() {
        return this.getItem(PHONE);
    },

    setPhone: function(phone) {
        this.setItem(PHONE, phone);
    },

    getDeviceId: function() {
        var r = this.getItem(DEVICE_ID);
        if (!r) {
            r = util.UUID();
            this.setItem(DEVICE_ID, r);
        }
        return r;
    },

    getItem: function(k) {
        return (LS && LS.getItem(k)) || $.fn.cookie(k);
    },

    setItem: function(k, v) {
        if (LS) {
            LS.setItem(k, v);
        }
        clearDevEnvsCookie(k);
        $.fn.cookie(k, v, {
            expires: EXPIRES,
            path: '/',
            domain: domain
        });
    },
    removeItem: function(k) {
        if (LS) {
            LS.removeItem(k);
        }
        $.fn.cookie(k, '', {
            expires: -1,
            path: '/',
            domain: domain
        });
        clearDevEnvsCookie(k);
    }
}
