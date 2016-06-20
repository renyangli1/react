var util = require('../../js/common/util.js');
var ListItem = React.createClass({
	propTypes: {
		time: React.PropTypes.number,
		value: React.PropTypes.number,
		image: React.PropTypes.string,
		items: React.PropTypes.array
	},
	jumpNextLink: function(e) {
		if (!this.props.isAllowClick) {
			return;
		}
		var t = arguments[1].split('.');
		var index = t[t.length - 1];
		window.ReactRouter.hashHistory.push({
			pathname: 'shoppingList',
			state: {
				datas: this.props.items[index]
			}
		});
	},
	titleJoin: function(titles, values) {
		var temp = [];
		var idx = 0;
		titles && titles.map(function(item, index) {
			temp.push(item);
			if (values[idx] || values[idx] === 0) {
				temp.push(values[idx] / 100);
			}
			idx++;
		});
		return temp.join('');
	},

	render: function() {
		var me = this;
		var items = me.props.items || [];
		var doms = items.map(function(item, num) {
			var values = [];
			me.props.titleKey && me.props.titleKey.map(function(k) {
				values.push(item[k]);
			});
			return (
				<div key={num}>
					<div className="list-item" onClick={me.jumpNextLink}>
							<img className="portrait" src={item.customerInfo.avatar}/>
							<span className="name">
								<span className="alias">{item.customerInfo.alias}</span>
								<span className="time">{util.parseTime(item.createTime,'hh:mm')}</span>
							</span>
							<span className="value">{me.titleJoin(me.props.titleDesc,values)}</span>
					</div>
				</div>
			)
		});
		return (<div className="list-item-wrap">{doms}</div>);
	}
});
module.exports = ListItem;