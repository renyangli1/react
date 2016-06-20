ListUnitWhite = React.createClass({
	getInitialState: function() {
		return {
			showItems: this.props.showItems || false,
			records: []
		};
	},
	toggleClick: function(e) {
		this.props.callbackParent({
			showItems: this.state.showItems
		});
		this.setState({
			showItems: !this.state.showItems
		});
	},
	render: function() {
		var me = this,
			p = me.props;
		return (
			<ul className="list-unit-white-ul">
				<li className="icon-unit-white-left">
					<div className="icon-unit-white-left-div" onClick={this.preClick}>
						{p.desc}
					</div>
				</li>
				<li className="unit-white-li">
					<div>{p.titleOne}</div>
					<div>{p.dataOne}</div>
				</li>
				<li className="unit-white-li">
					<div>{p.titleTwo}</div>
					<div>{p.dataTwo}</div>
				</li>
				<li className="unit-white-li">
					<div>{p.titleThird}</div>
					<div>{p.dataThird}</div>
				</li>
				<li className="icon-unit-white-right">
					<div className={me.state.showItems?'icon-unit-white-top':''} onClick={this.toggleClick}>
						<span></span>
					</div>
				</li>
			</ul>
		);
	}
});
module.exports = ListUnitWhite;