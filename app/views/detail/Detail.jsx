var statisticService = require('../../js/service/statisticService.js');
var ListShelf = require('../list/ListShelf.jsx');
var ListCustomer = require('../list/ListCustomer.jsx');
var ListDeal = require('../list/ListDeal.jsx');
var TabHead = require('../tab/TabHead.jsx');
var Detail = React.createClass({
	render: function() {
		var type = parseInt(this.props.params.type);
		switch (type) {
			case 0: //货架消费
				listComponent = <ListShelf />
				break;
			case 1: //顾客增长
				listComponent = <ListCustomer />
				break;
			case 2: //交易订单
				listComponent = <ListDeal />

				break;
			default:
				break;
		}
		return (
			<div>{listComponent}</div>
		);

	}
});
module.exports = Detail;