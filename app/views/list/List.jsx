var util=require('../../js/common/util.js');
//var stasticService=require('../../js/service/stasticService.js');
var Link=window.ReactRouter.Link;
var ListItem=React.createClass({
	propTypes:{
		time:React.PropTypes.number,
		value:React.PropTypes.number,
		image:React.PropTypes.string,
		items: React.PropTypes.array
	},
	jumpNextLink:function(){
		window.ReactRouter.hashHistory.push({
			pathname:'shoppingList',
			state:{a:1}
		});
	},
	render:function(){
		var me = this;
		var items=me.props.items&&me.props.items.map(function(item){
			
			return (
				<div className="list-item" onClick={me.jumpNextLink}>
						<img className="portrait" src={item.image}/>
						<span className="name">{item.name}
							<span className="time">{util.parseTime(item.time,'hh:mm')}</span>
						</span>
						<span className="value">实收{item.value}元</span>
				</div>
				)
		});
		return (<div className="list-item-wrap">{items}</div>);
	}
});
/*
*数据明细单
*@params
orders
title
items:[{
	time
	items:{
		image
		time
		name
		value
	}
}]
*/
var List=React.createClass({
	getInitialState:function(){
		return {
			showItems:false,
			items:[]
		}
	},
	componentDidMount:function(){
	},
	toggleItems:function(e){
		var me =this;
		e.preventDefault();
		e.stopPropagation();
		me.setState({
			showItems:!me.state.showItems
		})

	},
	titleJoin:function(titles,values){
		var temp=[];
		var idx=0;
		titles.map(function(item,index){
			temp.push(item);
			if(values[idx]){
				temp.push(values[idx]);
			}
			idx++;
		});
		return	temp.join('');
	},

	render:function(){
		var me =this;
		var items=me.props.items||[];
		
		var doms=items.map(function(item){
		return (
				<div className="content">
					<div className={'list-title '+(me.state.showItems?'collapse':'')} onClick={me.toggleItems}>
						<span className="time">{item.date.slice(6,8)+'/'+item.date.slice(4,6)}</span>
						<span className="count">新增{item[me.props.valueKey]}个顾客</span>
					</div>
					<ListItem items={item.items}/>		
				</div>
				)
		});
		return (
			<div className="list">
				<span className="title">{me.props.title}</span>
				<div className="title-wrap">
					<div className="date-picker">
						<span>{me.props.month.slice(0,4)}年</span>
						<span>{me.props.month.slice(4,6)}月</span>
						<span className="icon-down"></span>
					</div>
					<span className="total">
					({this.titleJoin(me.props.titleDesc,me.props.titleValue)})
					</span>
				</div>
				{doms}
			</div>
			)
	}
});
module.exports = List;