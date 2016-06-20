// 737382935782490112
var xhrText = require('../../js/common/xhr_text.js');
var xhr = require('../../js/common/xhr.js');
var util=require('../../js/common/util.js');

var TicketProduct = require('../ticketConfirm/TicketProduct.jsx');
var EnsureButton = require('../widget/EnsureButton.jsx');
var Head=require('../widget/Head.jsx');
var hashHistory = window.ReactRouter.hashHistory;

var InventoryConfirm = React.createClass({
	//从服务器加载盘点数据
	loadInventoryDataFromServer:function(){
		var me =this;
		xhrText({
			path: '/customer/manager/order/stockTakeOrder/findById',
			params: {
				"orderId":this.props.params.orderId
			},
			remote:'ticket',
			dataType:'text',
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
			path: '/customer/manager/order/stock/identification',
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
    render: function(){
    	var data = this.state.data;
    	if(!data.companyInfo){
    		return(
    			<div></div>
    		);
    	}
    	var lastContact = data.companyInfo.contacts[data.companyInfo.contacts.length-1];
		var contactTel = lastContact.mobile.length>0?lastContact.mobile:lastContact.tel;

    	var items = data.items && data.items.map(function(item,num) {
    		var productData = {
				'cover':item.shelfProductInfo.product.cover,
				'productName':item.shelfProductInfo.product.productName,
				'price':item.price,
				'itemNum':item.itemNum
			}
			return (
				<TicketProduct key={num} item={productData}></TicketProduct>
			);
		});
    	return(
    		<div className="inventory-confirm">
    			<Head title="盘点单详情"/>
		        <div className="total-info">
		          <div className="company-name-view"><span className="title-text">企业名称</span><span className="value-text">{data.companyInfo.companyName}</span></div>
		          <div className="company-addr-view"><span className="title-text">企业地址</span><span className="value-text">{data.companyInfo.address?data.companyInfo.address.addr:"暂无信息"}</span></div>
		          <div className="contact-tel-view"><span className="title-text">联系电话</span><span className="value-text">{contactTel}</span></div>
		          <div className="shelf-name-view"><span className="title-text">货架名称</span><span className="value-text">{data.shelfName}</span></div>
		          <div className="inventory-date-view"><span className="title-text">盘点时间</span><span className="value-text">{util.parseTime(parseFloat(data.endTime),"yyyy-MM-dd hh:mm")}</span></div>
		        </div>
		        <img className={'mark-confirmed ' + (parseInt(data.orderState)<2 ? 'hidden' : '')} src="img/widget_confirm_big_on.png" />

		        <div className="detail-info">
		          <div className="main-title-text">{util.parseTime(parseFloat(data.startTime),"yyyy.MM.dd")} - {util.parseTime(parseFloat(data.endTime),"yyyy.MM.dd")}</div>
		          <div className="fee-info">
		            <div className="discount-fee"><span className="title-text">折扣优惠</span><span className="value-text">{'￥'+data.discountFee/100.0}</span></div>
		            <div className="already-collection-fee"><span className="title-text">后台收款</span><span className="value-text">{'￥'+data.paidFee/100.0}</span></div>
		          </div>
		          <div className="inventory-info">
		            <div className="inventory-fee"><span className="title-text">盘点金额</span><span className="value-text">{'￥'+data.orderFee/100.0}</span></div>
		            <ul className="inventory-products">
		              {items}
		            </ul>
		          </div>
		        </div>
				<div className="view-ensure">
				   <button className={'btn-ensure ' + (parseInt(data.orderState)<2 ? '' : 'hidden')}  data-orderid={data.orderId} data-companymanagerid={data.companyManagerId} onClick={this.ensureClick}>确认</button>
				</div>
			</div>
    	);
    }
});
module.exports = InventoryConfirm;