// 743317798595330048
var util=require('../../js/common/util.js');

var TicketProduct = require('../ticketConfirm/TicketProduct.jsx');
var EnsureButton = require('../widget/EnsureButton.jsx');
var xhr = require('../../js/common/xhr.js');
var xhrText = require('../../js/common/xhr_text.js');
var Head=require('../widget/Head.jsx');
var hashHistory = window.ReactRouter.hashHistory;

var DeliveryConfirm = React.createClass({
	loadDeliveryData:function(){
		var me =this;
		xhrText({
			path: '/customer/manager/order/delivery/'+this.props.params.orderId,
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
		this.loadDeliveryData();
	},
	//确认
	ensureClick:function(ensureData){
        xhr({
			path: '/customer/manager/order/delivery/confirm?orderId='+ensureData.orderId,
			remote:'ticketConfirm',
			success:function(data){
                $(".mark-confirmed").show();
		        $(".btn-ensure").hide();
			}
		});
	},
	render:function(){
		var data = this.state.data;
		if(!data.companyName){
    		return(
    			<div></div>
    		);
    	}
		var items = data.items && data.items.map(function(item,num){
			var productData = {
				'cover':item.productInfo.cover,
				'productName':item.productInfo.productName,
				'price':item.price,
				'itemNum':item.itemNum+item.delta
			}
			return (
				<TicketProduct key={num} item={productData}></TicketProduct>
			);
		});
		var ensureData = {
			'orderId':data.orderId
		}
		return(
			<div className="delivery-confirm">
				<Head title="送货单详情"/>
				<div className="total-info">
					<div><span className="title-text">企业名称:</span><span className="value-text">{data.companyName}</span></div>
					<div><span className="title-text">货架名称:</span><span className="value-text">{data.shelfInfo.shelfName}</span></div>
					<div className="delivery-fee"><span className="title-text">送货金额:</span><span className="value-text">￥{data.orderFee/100.0}</span></div>
					<div><span className="title-text">创建送货单:</span><span className="value-text">{util.parseTime(data.createTime,'yyyy年MM月dd日')}</span></div>
				</div>
				<img className={'mark-confirmed '+(parseInt(data.orderState)<2 || parseInt(data.orderState)==4 ? 'hidden' : '')} src="img/widget_confirm_big_on.png" />
				<div className="detail-info">
					<div className="title-text">送货单明细</div>
						<ul className="delivery-products" id="ul-delivery-products">
						   {items}
						</ul>
				</div>
				<div className={(parseInt(data.orderState)<2 ? '' : 'hidden')}>
					<EnsureButton onClick={this.ensureClick} data={ensureData}></EnsureButton>
				</div>
				
			</div>
		)
	}
});
module.exports = DeliveryConfirm;