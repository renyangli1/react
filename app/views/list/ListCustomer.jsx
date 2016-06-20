var util = require('../../js/common/util.js'),
	statisticService = require('../../js/service/statisticService.js'),
	CustomerNumber = require('../overview/CustomersNumber.jsx'),
	ListChangeDate = require('./ListChangeDate.jsx'),
	ListUnitWhite = require('./listUnit/ListUnitWhite.jsx'),
	ListUnitBlack = require('./listUnit/ListUnitBlack.jsx'),
	DatePicker = window.ReactDatePicker,
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
			statisticService.getGetFirstRecord({
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
							parentPath = '#/detail/1'
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
					dataThird = {d.number}
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
		name: ['顾客总人数'],
		unit: '人',
		title: '顾客新增明细',
		titleDesc: ['本月新增顾客'],
		desc: ['新增', '个顾客']
	},
	getInitialState: function() {
		var s = this.CONST;
		return {
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
			orders: 0,
			numbers: 0,
			items: [],
			showItems: false,
			showCandler: false,
			numbersOfMonth: 0,
			numbersOfAll: 0
		};
	},
	queryData: function(data) {
		var me = this;
		var params = _.extend(_.clone(me.state), data || {});
		statisticService.getCustomerGrowMonthly({
			params: {
				shelfId: params.shelfId,
				month: params.month
			},
			success: function(res) {
				var temp = [];
				_.each(res.growth, function(item) {
					if (item.number) {
						temp.push(item);
					}
				});
				me.setState({
					month: params.month,
					numbersOfAll: res.numberOfAll,
					numbersOfMonth: res.numbers,
					items: temp
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
		var month = this.state.month.slice(0, 4) + '-' + this.state.month.slice(4, 6) + '-01';
		return (
			<div>
				<TabHead titleText='顾客明细' 
						 returnUrl= '#marketingDataHome' 
						 callbackParent={this.onTabHeadChildChanged}/>
				<div className="margin-to-top"></div>
				<CustomerNumber pNumber={s.numbersOfAll}/>
				<div className="list">
				<ListChangeDate 
						date = {s.month}
						callbackParent= {this.onChildChangeDate}
						year={s.month.slice(0,4)}
						month={s.month.slice(4,6)}
						titleDescTwo = '月增长'
						dataTwo = {s.numbersOfMonth}
						/>
					<ListUnit data={s.items} /> 
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