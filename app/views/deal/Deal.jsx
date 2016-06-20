var Head=require('../widget/Head.jsx');
var CheckBox=require('../widget/CheckBox.jsx');
var Link=window.ReactRouter.Link;
var util=require('../../js/common/util.js');
var statisticService=require('../../js/service/statisticService.js');
var StatementRecord=require('./StatementRecord.jsx');
var InventoryRecord=require('./InventoryRecord.jsx');
var DeliveryRecord=require('./DeliveryRecord.jsx');
var ReturnRecord=require('./ReturnRecord.jsx');
var orderService=require('../../js/service/orderService.js');

//公共方法
var CommonMixin={
	getInitialState:function(){
		return {
			data:[]
		};
	},
	componentWillReceiveProps:function(newValue,oldValue){
	 		this.setState({
	 			data:newValue.all
	 		});
	 }
};
var CheckBoxSelectionMixin={
	_getCheckBoxSelection:function(data){
		var arry=data||[];
		var selections=[{
			name:'全部',
			value:0
		},{
			name:'未结算',
			value:1
		}];
		arry.map(function(item){
			selections.push({
				name:util.parseTime(item.endTime,'MM月dd日')+'结算单',
				value:item.orderId
			});
		});
		return selections;
	}
};
var DataProccessMixin={
	_filterData:function(data,key,value){
		var temp=[];
		var list=data||[];
		list.map(function(item){
			var f=false;
			if(Object.prototype.toString.apply(value)=='[object Array]'){//状态筛选
				value.indexOf(item[key])!==-1?temp.push(item):false;
			}else{//id筛选
				item[key]==value?temp.push(item):false;
			}
			
		});
		return temp;
	}
};
//结算单列表
var StatementList=React.createClass({
	render:function(){
		var statements=this.props.data.map(function(item,index){
			return (
				<StatementRecord  key={index} data={item}/>
				)
		});
		return (
			<div className="statement-list">
				{statements}
			</div>
		)
	}
});
//盘点单列表
var InventoryList=React.createClass({
	mixins: [CheckBoxSelectionMixin,DataProccessMixin,CommonMixin],
	 _handleCheckBoxSelect:function(value){
	 	var r=[];
	 	switch(value){
	 		case 0://全部
	 			r=this.props.all;
	 		break;
	 		case 1://未结算
	 			r=this._filterData(this.props.all,'orderStatus',orderService.getUnCompleteInventoryStatusCode());
	 		break;
	 		default:
	 			r=this._filterData(this.props.all,'statementOrderId',value);
	 		break;
	 	}
	 	this.setState({
	 		data:r
	 	});
	 },
	render:function(){
		var inventoryItems=this.state.data;
		var inventorys=inventoryItems&&inventoryItems.map(function(item,index){
			return (
				<InventoryRecord key={index} data={item}/>
				)
		});
		return (
			<div className="inventory-list">
				<CheckBox callback={this._handleCheckBoxSelect}  selections={this._getCheckBoxSelection(this.props.data)}/>
				{inventorys}
			</div>
		)
	}
});
//送货单列表
var DeliveryList=React.createClass({
	 mixins: [CheckBoxSelectionMixin,DataProccessMixin,CommonMixin],
	 _handleCheckBoxSelect:function(value){
	 	var r=[];
	 	switch(value){
	 		case 0://全部
	 			r=this.props.all;
	 		break;
	 		case 1://未结算
	 			r=this._filterData(this.props.all,'orderStatus',orderService.getUnCompleteDeliveryStatusCode());
	 		break;
	 		default:
	 			r=this._filterData(this.props.all,'statementOrderId',value);
	 		break;
	 	}
	 	this.setState({
	 		data:r
	 	});
	 },
	render:function(){

		var deliverysItems=this.state.data;
		var deliverys=deliverysItems&&deliverysItems.map(function(item,index){
			return (
				<DeliveryRecord key={index} data={item}/>
				)
		});
		return (
			<div className="delivery-list">
				<CheckBox callback={this._handleCheckBoxSelect}  selections={this._getCheckBoxSelection(this.props.data)}/>
				{deliverys}
			</div>
		)
	}
});
//退货单列表
var ReturnList=React.createClass({
	 mixins: [CheckBoxSelectionMixin,DataProccessMixin,CommonMixin],
	 _handleCheckBoxSelect:function(value){
	 	var r=[];
	 	switch(value){
	 		case 0://全部
	 			r=this.props.all;
	 		break;
	 		case 1://未结算
	 			r=this._filterData(this.props.all,'orderStatus',orderService.getUnCompleteReturnStatusCode());
	 		break;
	 		default:
	 			r=this._filterData(this.props.all,'statementOrderId',value);
	 		break;
	 	}
	 	this.setState({
	 		data:r
	 	});
	 },

	render:function(){
		var returnItems=this.state.data;
		var returns=returnItems&&returnItems.map(function(item,index){
			return (
				<ReturnRecord key={index} data={item}/>
				)
		});
		return (
			<div className="return-list">
				<CheckBox callback={this._handleCheckBoxSelect}  selections={this._getCheckBoxSelection(this.props.data)}/>
				{returns}
			</div>
		)
	}
});

var Deal=React.createClass({
	getInitialState:function(argument) {
		return {
			type:parseInt(this.props.routeParams.type),
			selections:[],
			data:[],
			statementOrderList:[],//结算单
			deliveryOrderList:[],//送货单
			stockTakeOrderInfo:[],//盘点单
			returnOrderList:[]//退货单
		};
	},
	componentDidMount:function(){
		var me =this;
		orderService.getOrderDataByCompany({
			params:{
				companyId:'737109885186998272'
			},
			dataType:'text',
			success:function(res){
				me._parseDealData(res);
			}
		});
	},
	_parseDealData:function(data){
		var statementOrderList=[];
		var deliveryOrderList=[];
		var stockTakeOrderInfo=[];
		var returnOrderList=[];
		statementOrderList=data;
		_.each(statementOrderList,function(statement){//结算
			var _statementOrderList=[];
			var _deliveryOrderList=[];
			var _returnOrderList=[];
			var _stockTakeOrderInfo=[];
			_.each(statement.items,function(stock){//盘点
				stock.statementOrderId=statement.orderId;
/*				_.each(stock,function(item){
					item.statementOrderId=statement.orderId;
				});*/
				_.each(stock.deliveryOrderList,function(item){
					item.statementOrderId=statement.orderId;
				});
				_.each(stock.returnOrderList,function(item){
					item.statementOrderId=statement.orderId;
				});
				_stockTakeOrderInfo.push(stock);
				_deliveryOrderList=_deliveryOrderList.concat(stock.deliveryOrderList);
				_returnOrderList=_returnOrderList.concat(stock.returnOrderList);

				stockTakeOrderInfo.push(stock);
				deliveryOrderList=deliveryOrderList.concat(stock.deliveryOrderList);
				returnOrderList=returnOrderList.concat(stock.returnOrderList);
			});
				statement.deliveryOrderList=_deliveryOrderList;
				statement.returnOrderList=_returnOrderList;
		});
		this.setState({
			statementOrderList:statementOrderList,
			deliveryOrderList:deliveryOrderList,
			stockTakeOrderInfo:stockTakeOrderInfo,
			returnOrderList:returnOrderList
		});
	},
	_getConfigByType:function(){
		var matrix={
			0:{
				title:'结算单',
				cp:<StatementList data={this.state.statementOrderList}/>
			},
			1:{
				title:'盘点单',
				cp:<InventoryList data={this.state.statementOrderList} all={this.state.stockTakeOrderInfo}/>
			},
			2:{
				title:'送货单',
				cp:<DeliveryList data={this.state.statementOrderList} all={this.state.deliveryOrderList}/>
			},
			3:{
				title:'退货单',
				cp:<ReturnList data={this.state.statementOrderList} all={this.state.returnOrderList}/>
			}
		};
		return matrix[this.state.type];
	},

	render: function() {
		var config=this._getConfigByType();
		return (
			<div className="deal">
				<Head ref="head" title={config.title}/>
				{config.cp}
			</div>
		);
	}
});
module.exports=Deal;