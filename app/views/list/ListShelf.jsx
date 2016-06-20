var util = require('../../js/common/util.js'),
	statisticService = require('../../js/service/statisticService.js'),
	ShelvesConsumption = require('../overview/ShelvesConsumption.jsx'),
	TabHead = require('../tab/TabHead.jsx'),
	ListChangeDate = require('./ListChangeDate.jsx'),
	ListUnitWhite = require('./listUnit/ListUnitWhite.jsx'),
	ListUnitBlack = require('./listUnit/ListUnitBlack.jsx'),
	DatePicker = window.ReactDatePicker,
	Link = window.ReactRouter.Link;

var ListUnitWhiteChild = React.createClass({
	getInitialState: function() {
		return {
			showItems: false,
			records: [],
			titleDesc: ['日消费', '日优惠'],
			titleDesc2: ['消费', '优惠']
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
		debugger;
		var me = this,
			s = me.state,
			d = me.props.data,
			items = s.records || [],
			len = items.length,
			doms = items.map(function(item, num) {
				return (
					<li key={num}>
						<ListUnitBlack 
							avatar = {item.customerInfo.avatar}
							name = {item.customerInfo.alias}
							dateTime = {util.parseTime(item.createTime,'hh:mm')}
							descOne = {s.titleDesc2[0]}
							dataOne = {'￥'+item.totalFee}
							descTwo = {s.titleDesc2[1]}
							dataTwo = {'￥'+item.totalDiscount}
							parentPath = '#/detail/0'
							data = {item}
							date = {d.date}
						/>
						<div className={(len-1==num)?'':'unit-black-split-line'}></div>
					</li>
				);
			});
		return (
			<li>
				<ListUnitWhite 
					callbackParent={me.onChildChanged}
					desc = {new Date(d.date).getDate()+'日'}
					titleTwo = {s.titleDesc[0]}
					dataTwo ={'￥' + parseInt(d.sales-d.companyDiscount)/100}
					titleThird = {s.titleDesc[1]}
					dataThird = {'￥' + d.companyDiscount/100}
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
		name: ['货架总消费', '优惠金额'],
		unit: '元',
		title: '消费明细',
		titleDesc: ['本月消费', '本月优惠'],
		desc: ['实收', '元  优惠', '元']
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
			orders: 100,
			numbers: 0,
			items: [],
			showItems: false,
			salesOfAll: 0,
			discountOfAll: 0,
			showCandler: false,
			salesOfMonth: []

		};
	},
	queryStatisticData: function(data) {
		var me = this;
		var params = _.extend(_.clone(me.state), data || {});
		statisticService.getShelfSalesStatistic({
			params: {
				shelfId: params.shelfId,
				month: params.month
			},
			success: function(res) {
				var state = {
					salesOfAll: res.salesOfAll,
					discountOfAll: res.discountOfAll,
					month: res.salesOfMonth.month,
					titleValue: [util.getRMBStr(res.salesOfMonth.sales - res.salesOfMonth.companyDiscount), util.getRMBStr(res.salesOfMonth.companyDiscount)],
					dailyOfMonth: res.dailyOfMonth,
					salesOfMonth: res.salesOfMonth,
					items: res.dailyOfMonth
				};
				me.setState(state);
			}
		});
	},
	onTabHeadChildChanged: function(obj) {
		this.queryStatisticData({
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
		this.queryStatisticData({
			month: month,
			shelfId: window.BS.company.shelfId
		});
		// this.handleDateClick();

	},
	componentDidMount: function() {
		var me = this;
		this.queryStatisticData();
	},
	// handleDateClick: function() {
	// 	this.setState({
	// 		showCandler: !this.state.showCandler
	// 	});
	// },
	// handleCandlerClick: function(e) {
	// 	if (e.currentTarget == e.target) {
	// 		this.handleDateClick();
	// 	} else {
	// 		return true;
	// 	}
	// },
	// handleDateSelect: function(e) {
	// 	var month = e && e.split('-').slice(0, 2).join('');
	// 	this.queryStatisticData({
	// 		month: month,
	// 		shelfId: window.BS.company.shelfId
	// 	})
	// 	this.handleDateClick();
	// },


	render: function() {
		var me = this,
			s = me.state;
		var items = me.state.items || [];
		var discountOfAll = me.state.discountOfAll;
		var totalPrice = me.state.salesOfAll - discountOfAll;
		var month = this.state.month.slice(0, 4) + '-' + this.state.month.slice(4, 6) + '-01';
		return (
			<div>
				<TabHead callbackParent={this.onTabHeadChildChanged} titleText='消费明细' returnUrl='#marketingDataHome' />
				<div className="margin-to-top"></div>
				<ShelvesConsumption totalPrice={totalPrice} preferentialPrice={discountOfAll} />
				<div className="list">
					<ListChangeDate 
						date = {this.state.month}
						callbackParent= {this.onChildChangeDate}
						year={this.state.month.slice(0,4)}
						month={this.state.month.slice(4,6)}
						titleDescOne = '月消费'
						dataOne = {'￥'+(s.salesOfMonth.sales-s.salesOfMonth.companyDiscount)/100}
						titleDescTwo = '月优惠'
						dataTwo = {'￥'+s.salesOfMonth.companyDiscount/100}
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