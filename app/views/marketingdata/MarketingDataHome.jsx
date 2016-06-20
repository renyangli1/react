var xhr = require('../../js/common/xhr.js');
var util = require('../../js/common/util.js');
var MarketingDataChart = require("../marketingdata/MarketingDataChart.jsx");
var TabHead = require("../tab/TabHead.jsx");
var MarketingDataHome = React.createClass({
	loadSalesStatisticFromServer: function(shelfId) {
		var me = this;
		xhr({
			path: '/customer/manager/statistic/SalesStatistic',
			params: {
				"shelfId": shelfId,
				"today": util.parseTime(util.now(), 'yyyyMMdd')
			},
			success: function(data) {
				me.setState({
					data: data
				});
			}
		});
	},
	getInitialState: function() {
		return {
			data: {}
		};
	},
	onChildChanged: function(obj) {
		this.loadSalesStatisticFromServer(obj.shelfId);
	},
	componentDidMount: function() {
		// this.loadSalesStatisticFromServer();
	},
	render: function() {
		var data = this.state.data;
		//货架消费
		var salesData = '￥' + data.sales / 100;
		var consumeOptionInfo = {};
		consumeOptionInfo.chartColor = "#B5402C";
		consumeOptionInfo.xAxisData = [];
		consumeOptionInfo.seriesData = [];
		if (data.salesDaily) {
			for (var i = 0; i < data.salesDaily.length; i++) {
				var salesObj = data.salesDaily[i];
				var dayStr = util.parseTime(salesObj.date, "MM.dd");
				consumeOptionInfo.xAxisData.push(dayStr);
				consumeOptionInfo.seriesData.push(salesObj.sales);
			}
		}

		//顾客成长
		var numbersData = data.numbers;
		var memberIncreaseOptionInfo = {};
		memberIncreaseOptionInfo.chartColor = "#21B168";
		memberIncreaseOptionInfo.xAxisData = [];
		memberIncreaseOptionInfo.seriesData = [];
		if (data.customerGrowth) {
			for (var i = 0; i < data.customerGrowth.length; i++) {
				var growthObj = data.customerGrowth[i];
				var dayStr = util.parseTime(growthObj.date, "MM.dd");
				memberIncreaseOptionInfo.xAxisData.push(dayStr);
				memberIncreaseOptionInfo.seriesData.push(growthObj.number);
			}
		}

		//交易订单
		var ordersData = data.orders;
		var orderOptionInfo = {};
		orderOptionInfo.chartColor = "#B1A221";
		orderOptionInfo.xAxisData = [];
		orderOptionInfo.seriesData = [];
		if (data.tradeOrder) {
			for (var i = 0; i < data.tradeOrder.length; i++) {
				var ordercountObj = data.tradeOrder[i];
				var dayStr = util.parseTime(ordercountObj.date, "MM.dd");
				orderOptionInfo.xAxisData.push(dayStr);
				orderOptionInfo.seriesData.push(ordercountObj.order);
			}
		}

		return (
			<div className="marketingdata-home">
			    <TabHead callbackParent={this.onChildChanged} titleText='营销数据' returnUrl='#'  />
			    <div className="marketingdata-allcharts">
				   <MarketingDataChart id="chart-consume" chartTitle="货架消费" statisticData={salesData} iconMark="img/icon_money_black.png" optionInfo={consumeOptionInfo} url='#detail/0'/>
	               <MarketingDataChart id="chart-memberincrease" chartTitle="顾客成长" statisticData={numbersData} iconMark="img/icon_customer_black.png" optionInfo={memberIncreaseOptionInfo} url='#detail/1'/>
	               <MarketingDataChart id="chart-order" chartTitle="交易订单" statisticData={ordersData} iconMark="img/icon_order_black.png" optionInfo={orderOptionInfo} url='#detail/2'/>
			   </div>
            </div>
		);
	}
});
module.exports = MarketingDataHome;