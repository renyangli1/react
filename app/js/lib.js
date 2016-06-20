//第三方模块加载入口
(function(w) {
	w._ = require('./lib/underscore');
	w.React = require('./lib/react.js');
	w.ReactDom = require('./lib/react.dom.js');
	w.ReactRouter = require('./lib/react.router.js');
	w.ECharts = require('./lib/echarts.simple.min.js');
	w.ReactDatePicker = require('./lib/react.datepicker.js');

	require('./lib/zepto.js');
	require('./lib/zeptoCookie.js');
	require('./lib/md6.js');
})(window);