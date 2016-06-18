//第三方模块加载入口
(function(w) {
    w._ = require('./lib/underscore');
    w.React = require('./lib/react.js');
    w.ReactDom = require('./lib/react.dom.js');
    w.ReactRouter = require('./lib/react.router.js');
    //require('./lib/react.addons.js');
    require('./lib/zepto.js');
})(window);
