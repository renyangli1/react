// 737382846900994048
var xhrText = require('../../js/common/xhr_text.js');
var xhr = require('../../js/common/xhr.js');
var util=require('../../js/common/util.js');

var EnsureButton = require('../widget/EnsureButton.jsx');
var Head=require('../widget/Head.jsx');
var SettlementConfirm = React.createClass({
	//从服务器加载结算数据
	loadInventoryDataFromServer:function(){
		var me =this;
		xhrText({
			path: '/customer/manager/order/statementOrder/findById',
			params: {
				"orderId":this.props.params.orderId
			},
			remote:'ticket',
			success:function(data){
                me.setState({data: data});
			},
			error:function(res){
				alert(res.msg);
				hashHistory.push("/login");
				// if(res.code == -1){//票据信息与账号不符
				// 	sessionStorage.setItem("redirectUrl","/inventoryConfirm/"+this.props.params.orderId);
    //                 hashHistory.push("/login");
				// }
			}
		});
	},
	getInitialState: function() {
		return {
			data: {}
		};
	},
	componentDidMount: function() {
		this.loadInventoryDataFromServer();
	},
	//确认
	ensureClick:function(e){
        xhr({
			path: '/customer/manager/order/statement/identification',
			params: {
				"orderId":$(e.target).attr("data-orderid"),
				"companyManagerId":$(e.target).attr("data-companymanagerid")
			},
			remote:'ticketConfirm',
			success:function(data){
				$(".mark-confirmed").show();
		        $(".btn-ensure").hide();
			}
		});
	},
	getDetailOpItems:function(data){
        var opItems = [];
		for (var i = 0; i < data.items.length; i++) {
			var shelfItem = data.items[i];
			//上期余额
			var preOrderFeeOpItem = {};
			preOrderFeeOpItem.opTime = shelfItem.startTime;
			preOrderFeeOpItem.shelfName = shelfItem.shelfName;
			var feeInfos = [];
			feeInfos.push({
				"feeTitle": "期初余额(上期盘点金额)",
				"feeValue": shelfItem.preOrderFee / 100.0
			});
			preOrderFeeOpItem.feeInfos = feeInfos;
			opItems.push(preOrderFeeOpItem);
			//配送金额
			if (shelfItem.deliveryOrderList.length > 0) {
				for (var j = 0; j < shelfItem.deliveryOrderList.length; j++) {
					var deliveryOrder = shelfItem.deliveryOrderList[j];
					var deliveryOpItem = {};
					deliveryOpItem.opTime = deliveryOrder.updateTime;
					deliveryOpItem.shelfName = "";
					var feeInfos = [];
					feeInfos.push({
						"feeTitle": "配送金额",
						"feeValue": deliveryOrder.orderFee / 100.0
					});
					deliveryOpItem.feeInfos = feeInfos;
					opItems.push(deliveryOpItem);
				}

			}
			//退货金额
			if (shelfItem.returnOrderList.length > 0) {
				for (var j = 0; j < shelfItem.returnOrderList.length; j++) {
					var returnOrder = shelfItem.returnOrderList[j];
					var returnOpItem = {};
					returnOpItem.opTime = returnOrder.updateTime;
					returnOpItem.shelfName = "";
					var feeInfos = [];
					feeInfos.push({
						"feeTitle": "退货金额",
						"feeValue": returnOrder.returnFee / 100.0
					});
					returnOpItem.feeInfos = feeInfos;
					opItems.push(returnOpItem);
				}

			}
			var inventoryOpItem = {};
			inventoryOpItem.opTime = shelfItem.endTime;
			inventoryOpItem.shelfName = "";
			var feeInfos = [];
			feeInfos.push({
				"feeTitle": "盘点金额",
				"feeValue": shelfItem.orderFee / 100.0
			});
			feeInfos.push({
				"feeTitle": "后台收款",
				"feeValue": shelfItem.paidFee / 100.0
			});
			feeInfos.push({
				"feeTitle": "公司代发福利",
				"feeValue": shelfItem.discountFee / 100.0
			});
			inventoryOpItem.feeInfos = feeInfos;
			opItems.push(inventoryOpItem);

		}
		return opItems;
	},
	render:function(){
		var data = this.state.data;
		if(!data.companyInfo){
    		return(
    			<div></div>
    		);
    	}
		var companyInfo = data.companyInfo;
		var companyAddr = companyInfo.address?companyInfo.address.addr:"暂无信息";
		var lastContact = companyInfo.contacts[companyInfo.contacts.length-1];
		var contactTel = lastContact.mobile.length>0?lastContact.mobile:lastContact.tel;
		var invoice = data.isInvoice=="0"?"否":"是";

		var opItems = this.getDetailOpItems(data);

		var ensureData = {
			'orderId':1,
			'companyManagerId':1
		}

		var items = opItems && opItems.map(function(item,num) {
			var feeInfoLis = item.feeInfos && item.feeInfos.map(function(feeInfo,feeNum){
				return(
					<li className="item-fee" key={feeNum}><span className="item-name">{feeInfo.feeTitle}</span><span className="item-value">{'￥'+feeInfo.feeValue}</span></li>
				);
			});
			return (
				<li className="li-consume" key={num}>
					<div className="round-mark"></div>
					<div className="first-view"><span className="op-time">{util.parseTime(parseFloat(item.opTime),"yyyy.MM.dd hh:mm")}</span><span className="shelf-name">{item.shelfName}</span></div>
					<div className="second-view">
						<ul>
							{feeInfoLis}
						</ul>
					</div>
				</li>
			);
		});

		return(
			<div className="settlement-confirm">
				<Head title="结算单详情"/>
				<div className="company-info">
					<div><span className="title-text">企业名称</span><span className="value-text">{companyInfo.companyName}</span></div>
					<div><span className="title-text">企业地址</span><span className="value-text">{companyAddr}</span></div>
					<div><span className="title-text">联系电话</span><span className="value-text">{contactTel}</span></div>
				</div>
				<img className={'mark-confirmed ' + (parseInt(data.orderState)<3 ? 'hidden' : '')} src="img/mark-confirmed.png" />
				
				<div className="cur-settlement">
					<div className="round-mark"></div>
					<div className="head-title">本期结算 {util.parseTime(parseFloat(data.endTime),"yyyy-MM-dd hh:mm")}</div>
					<div className="fee">
						<div className="fee-item need-pay-view"><span className="title-text">企业应付款</span><span className="value-text">￥{data.shouldPayFee>0?data.shouldPayFee/100.0:"0"}</span></div>
						<div className="fee-item"><span className="title-text">配送总额</span><span className="value-text">￥{data.deliveryFee/100.0}</span></div>
						<div className="fee-item"><span className="title-text">退款金额</span><span className="value-text">￥{data.returnFee/100.0}</span></div>
						<div className="fee-item"><span className="title-text">盘点金额</span><span className="value-text">￥{data.surplusFee/100.0}</span></div>
						<div className="fee-item"><span className="title-text">后台收款</span><span className="value-text">￥{data.paidFee/100.0}</span></div>
						<div className="fee-item"><span className="title-text">公司代发福利</span><span className="value-text">￥{data.payDiscount/100.0}</span></div>
						<div className="fee-item"><span className="title-text">本次结算优惠</span><span className="value-text">￥{data.discount/100.0}</span></div>
					</div>
				</div>
				<div className="last-settlement">
					<div className="round-mark"></div>
					<div className="head-title">上期结算 {util.parseTime(parseFloat(data.startTime),"yyyy-MM-dd hh:mm")}</div>
					<div className="fee">
						<div className="last-inventory-fee fee-item"><span className="title-text">期初余额(上期盘点金额)</span><span className="value-text">￥{data.preSurplusFee/100.0}</span></div>
					</div>
				</div>
				<div className="cur-consume-detail">
					<div className="head-title">本期结算明细</div>
					<div className="consume-list">
						<ul>
							{items}
						</ul>
					</div>
				</div>
				<div className="settlement-info">
				    <div className="payer-info">
					    <div className="pay-company-view"><div className="title-text">付款单位</div><span className="value-text">{companyInfo.companyName}</span></div>
						<div className="need-invoice-view"><div className="title-text">是否开发票</div><span className="value-text">{invoice}</span></div>
				    </div>
				    <div className="receiver-info">
					    <div><div className="title-text">收款单位</div><span className="value-text">杭州图达网络信息科技有限公司</span></div>
					    <div><div className="title-text">开户行</div><span className="value-text">中国农业银行杭州紫荆花路支行</span></div>
					    <div><div className="title-text">收款单位</div><span className="value-text">190213040001684</span></div>
				    </div>
				</div>
				<div className={(parseInt(data.orderState)<3 ? '' : 'hidden')}>
					<EnsureButton onClick={this.ensureClick} data={ensureData}></EnsureButton>
				</div>
			</div>
		);
	}
});
module.exports = SettlementConfirm;