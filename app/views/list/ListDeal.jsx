var util = require('../../js/common/util.js'),
	statisticService = require('../../js/service/statisticService.js'),
	CustomersNumber = require('../overview/CustomersNumber.jsx'),
	DatePicker = window.ReactDatePicker,
	ListChangeDate = require('./ListChangeDate.jsx'),
	ListUnitWhite = require('./listUnit/ListUnitWhite.jsx'),
	ListUnitBlack = require('./listUnit/ListUnitBlack.jsx'),
	TabHead = require('../tab/TabHead.jsx');
var ListUnitWhiteChild = React.createClass({
	getInitialState: function() {
		return {
			records: [],
			showItems: false,
			titleDesc: ['日增长']
		};
	},
	onChildChanged: function(obj) {
		var me = this;
		if (!me.state.showItems) {
			statisticService.getShelfSalesStatisticDayly({
				params: {
					shelfId: window.BS.company.shelfId,
					day: util.parseTime(me.props.data.date, 'yyyyMMdd')
				},
				success: function(res) {
					me.setState({
						showItems: !me.state.showItems,
						records: res
					});
				}
			});
		} else {
			me.setState({
				showItems: !me.state.showItems
			});
		}
	},
	render: function() {
		var me = this,
			s = me.state,
			d = me.props.data,
			items = s.records,
			len = items.length;
		var doms = items.map(function(item, num) {
			return (
				<li key={num}>
					<ListUnitBlack 
						avatar = {item.customerInfo.avatar}
						name = {item.customerInfo.alias}
						dateTime = {util.parseTime(item.createTime,'hh:mm')}
						parentPath = '#/detail/2'
						data = {item}
					/>
					<div className={(len-1==num)?'':'unit-black-split-line'}></div>
				</li>
			);
		});
		return (
			<li>
				<ListUnitWhite 
					callbackParent={me.onChildChanged}
					desc = {util.parseTime(d.date,'dd')}
					titleThird = {s.titleDesc[0]}
					dataThird = {d.order}
				 />
				<ul className={!this.state.showItems?'hide ul-unit-black':'ul-unit-black'}>
				{doms}
				</ul>
			</li>
		);
	}
});
var ListUnit = React.createClass({
	render: function() {
		var me = this;
		var items = this.props.data;
		var doms = items.map(function(item, num) {
			return (
				<ListUnitWhiteChild data={item} key={num}/>
			);
		});
		return (<ul>{doms}</ul>);
	}
});

var ListCustomer = React.createClass({
	CONST: {
		name: ['交易订单总数'],
		unit: '单',
		title: '交易订单明细',
		titleDesc: ['本月交易订单数：'],
		desc: ['交易', '单']
	},
	getInitialState: function() {
		var s = this.CONST;
		return {
			// shelfId: '724878586141474816',
			shelfId: window.BS.company.shelfId,
			month: util.parseTime(util.now(), 'yyyyMM'),
			pNumber: 0,
			totalPrice: 0,
			preferentialPrice: 0,
			title: s.title,
			titleDesc: s.titleDesc,
			titleValue: [],
			valueKey: '',
			unit: s.unit,
			desc: s.desc,
			time: new Date().getTime(),
			items: [],
			showItems: false,
			showCandler: false,
			ordersOfAll: 0,
			ordersOfMonth: 0
		};
	},
	queryData: function(data) {
		var me = this;
		var params = _.extend(_.clone(me.state), data || {});
		statisticService.getTradeOrderMonthly({
			params: {
				shelfId: params.shelfId,
				month: params.month
			},
			success: function(res) {
				var temp = [];
				_.each(res.result, function(item) {
					if (item.order) {
						temp.push(item);
					}
				});
				me.setState({
					month: params.month,
					items: temp,
					ordersOfAll: res.orderOfAll,
					ordersOfMonth: res.orders
				});
			}
		});
	},
	onTabHeadChildChanged: function(obj) {
		this.queryData({
			shelfId: obj.shelfId
		});
		window.BS.company.shelfId = obj.shelfId;
		this.setState({
			shelfId: obj.shelfId
		});
	},
	//切换日期
	onChildChangeDate: function(obj) {
		var month = util.parseTime(obj.date, 'yyyyMM');
		this.queryData({
			month: month,
			shelfId: window.BS.company.shelfId
		});
		// this.handleDateClick();
	},
	componentDidMount: function() {
		var me = this;
		this.queryData();
	},
	handleDateClick: function() {
		this.setState({
			showCandler: !this.state.showCandler
		});
	},
	handleCandlerClick: function(e) {
		if (e.currentTarget == e.target) {
			this.handleDateClick();
		} else {
			return true;
		}
	},
	handleDateSelect: function(e) {
		var month = e && e.split('-').slice(0, 2).join('');
		this.queryData({
			month: month
		});
		this.setState({
			showCandler: !this.state.showCandler
		});
	},
	render: function() {
		var me = this,
			s = me.state;

		var items = me.state.items || [];
		var month = this.state.month.slice(0, 4) + '-' + this.state.month.slice(4, 6) + '-01';
		return (

			<div>
				<TabHead titleText='交易订单' 
						returnUrl='#marketingDataHome'
						callbackParent={this.onTabHeadChildChanged}/>
				<div className="margin-to-top"></div>
				<CustomersNumber title="交易订单总数" unit="单" pNumber={this.state.ordersOfAll}/>	
				<div className="list">
					<ListChangeDate 
						date = {s.month}
						callbackParent= {this.onChildChangeDate}
						year={s.month.slice(0,4)}
						month={s.month.slice(4,6)}
						titleDescTwo = '月增长'
						dataTwo = {s.ordersOfMonth}
						/>
					<ListUnit data={items} />
					<div className={this.state.showCandler?"date-container":"date-container hide"} onClick={this.handleCandlerClick}>
						<DatePicker  
							locale="zh-cn"
							defaultView="year" 
							view="year"
							onSelect={this.handleDateSelect}
							date={month}
							/>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ListCustomer;