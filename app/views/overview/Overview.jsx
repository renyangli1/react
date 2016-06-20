var Head=require('../widget/Head.jsx');
var Link=window.ReactRouter.Link;
var util=require('../../js/common/util.js');
var statisticService=require('../../js/service/statisticService.js');
var UserView=React.createClass({
	getInitialState:function(argument) {
		return {
			totalPrice:0,
			customerNum:0,
			dealNum:0
		};
	},
	componentDidMount:function(){
		var me = this;
		statisticService.getAllSaleStatistic({
			params:{
				companyId:window.BS.company.id
			},
			success:function(res){
				me.setState({
					totalPrice:util.getRMBStr(res.sales),
					customerNum:res.numbers,
					dealNum:res.orders
				});
			}
		});
	},
	render:function(){
		return (
			<div className="view-user">
				<div className="wrap">
					<div className="total">
						<div className="title-wrap">
							<span className="icon-rmb"></span><span className="title">消费总金额（元）</span>
							<span className="value">{this.state.totalPrice}</span>
						</div>
					</div>
				</div>
				<div className="wrap">
					<div>
						<div className="title-wrap">
							<span className="icon-people"></span><span className="title">顾客总数</span>
							<span className="value">{this.state.customerNum}</span>
						</div>
					</div>
					<div>
						<div className="title-wrap">
							<span className="icon-deal"></span><span className="title">订单总数</span>
							<span className="value">{this.state.dealNum}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
var CompanyView=React.createClass({
	getInitialState:function(argument) {
		return {

		};
	},
	render:function(){
		return (
			<div className="view-company">
				<div className="wrap">
					<span className="icon-add"></span><span className="title">挑选商品</span>	
					<span className="icon-arrow-right-grey"></span>	
				</div>
				<div className="wrap">
					<span className="icon-clock"></span><span className="title">选品记录</span>	
					<span className="icon-arrow-right-grey"></span>	
				</div>
			</div>
			)
	}
});
var Overview=React.createClass({
	getInitialState:function(argument) {
		return {

		};
	},
	componentDidMount:function(){
		var me =this;
		var head_dom=ReactDom.findDOMNode(this.refs.head);
		var up_dom=ReactDom.findDOMNode(this.refs.up);
		var down_dom=ReactDom.findDOMNode(this.refs.down);
		var height=(window.screen.height*window.ratio-head_dom.clientHeight)/2;
		up_dom.style='height:'+height+'px';
		down_dom.style='height:'+height+'px';
	},
	render: function() {
		return (
			<div className="overview">
				<Head ref="head" title="盘点清单详情" noTitle={true} noBack={true} hasLogo={true}/>
				<div className="up" ref="up">
					<UserView/>
				</div>
				<div className="down" ref='down'>
					<div className="row">
						<Link to="deal/0">
							<div className="cell">
								<div>
									<img src="./img/icon_order_jiesuan.png"/>
									<span className="title">结算单</span>
								</div>
							</div>
						</Link>
						<Link to="deal/1">
							<div className="cell">
								<div>			
									<img src="./img/icon_order_pandian.png"/>
									<span className="title">盘点单</span>
								</div>
							</div>
						</Link>
					</div>
					<div className="row">
						<Link to="deal/2">
							<div className="cell">
								<div>
									<img src="./img/icon_order_songhuo.png"/>
									<span className="title">送货单</span>
								</div>
							</div>
						</Link>
						<Link to="deal/3">
							<div className="cell">
								<div>
									<img src="./img/icon_order_tuihuo.png"/>
									<span className="title">退货单</span>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		);
	}
});
module.exports=Overview;