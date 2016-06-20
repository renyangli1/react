ListUnitBlack = React.createClass({
	getInitialState: function() {
		return {
			showItems: false,
		};
	},
	jumpNextLink: function(e) {
		var me = this;
		window.ReactRouter.hashHistory.push({
			pathname: 'shoppingList',
			state: {
				datas: me.props.data,
				parentPath: me.props.parentPath,
				date: me.props.date
			}
		});
	},
	render: function() {
		var p = this.props;
		return (
			<ul className="list-unit-black-ul">
				<li className="icon-unit-black-left">
					<div className="icon-unit-black-left-div" onClick={this.preClick}>
						<img className="portrait_1" 
							 // src="../img/shoppingList_avatar.jpg"
							 src={p.avatar} />
					</div>
				</li>
				<li className="unit-black-li">
					<div className="u-name">{p.name}</div>
					<div className="u-time">{p.dateTime}</div>
				</li>
				<li className="unit-black-li">
					<div>{p.descOne}</div>
					<div>{p.dataOne}</div>
				</li>
				<li className="unit-black-li">
					<div>{p.descTwo}</div>
					<div>{p.dataTwo}</div>
				</li>
				<li className="icon-unit-black-right">
					<div onClick={this.jumpNextLink}>
						<span></span>
					</div>
				</li>
			</ul>
		);
	}
});
module.exports = ListUnitBlack;