var util=require('../../js/common/util.js');
var orderService=require('../../js/service/orderService.js');
var Link=window.ReactRouter.Link;
var InventoryRecord=React.createClass({
	render: function() {
		var data=this.props.data;
		var stockTakeOrderInfo=data.stockTakeOrderInfo;
		return (
			<div className="inventory-record">
				<Link to={'inventoryConfirm/'+stockTakeOrderInfo.orderId}>
					<div className="icon-wrap icon-shelf"></div>
					<div className="detail-wrap">
						<span className="name">{data.shelfName}</span>
						<span className="price">¥{util.getRMBStr(stockTakeOrderInfo.orderFee)}</span>
						<span className="time">{util.parseTime(stockTakeOrderInfo.endTime)}</span>
					</div>
					<div className="status-wrap">
						<img className="status confirm" src={orderService.isInventoryRecordComplete(stockTakeOrderInfo.orderState)?'./img/widget_confirm_small_on.png':'./img/widget_confirm_small_off.png'}/>
						<span className="arrow-right icon-right-gray"></span>
					</div>
				</Link>
			</div>
		);
	}
});
module.exports=InventoryRecord;