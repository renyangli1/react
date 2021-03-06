var util=require('../../js/common/util.js');
var orderService=require('../../js/service/orderService.js');
var Link=window.ReactRouter.Link;
var DeliveryRecord=React.createClass({
	render: function() {
		var data=this.props.data;
		var shelfInfo=data.shelfInfo;
		return (
			<div className="delivery-record">
				<Link to={'deliveryConfirm/'+data.orderId}>
					<div className="icon-wrap icon-shelf"></div>
					<div className="detail-wrap">
						<span className="name">{shelfInfo.shelfName}</span>
						<span className="price">¥{util.getRMBStr(data.orderFee)}</span>
						<span className="time">{util.parseTime(data.createTime)}</span>
					</div>
					<div className="status-wrap">
						<img className="status confirm" src={orderService.isDeliveryRecordComplete(data.orderState)?'./img/widget_confirm_small_on.png':'./img/widget_confirm_small_off.png'}/>
						<span className="arrow-right icon-right-gray"></span>
					</div>
				</Link>
			</div>
		);
	}
});
module.exports=DeliveryRecord;