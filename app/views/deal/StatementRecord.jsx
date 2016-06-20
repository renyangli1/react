var util=require('../../js/common/util.js');
var orderService=require('../../js/service/orderService.js');
var Link=window.ReactRouter.Link;
var StatementRecord=React.createClass({
	render: function() {
		var data=this.props.data;
		var companyInfo=data.companyInfo;

		return (
			<div className="statement-record">
				<Link to={'SettlementConfirm/'+data.orderId}>
					<div className="detail-wrap">
						<span className="name">{companyInfo.companyName}</span>
						<span className="price">¥{util.getRMBStr(data.shouldPayFee)}</span>
						<span className="time">{util.parseTime(data.endTime)}</span>
					</div>
					<div className="status-wrap">
						<img className="status confirm" src={orderService.isStatementRecordComplete(data.orderState)?'./img/widget_confirm_small_on.png':'./img/widget_confirm_small_off.png'}/>
						<span className="arrow-right icon-right-gray"></span>
					</div>
				</Link>
			</div>
		);
	}
});
module.exports=StatementRecord;