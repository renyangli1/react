var CustomerNumber = React.createClass({
	render: function() {
		var title = this.props.title ? this.props.title : '顾客总数';
		// var unit = this.props.unit ? this.props.unit : '人';	// return <span className="unit">{unit}</span>
		return (
			<div className="customer-number">
				<span className="title">{title}</span>&nbsp;<span className="number">{this.props.pNumber}</span>
			</div>
		);
	}
});
module.exports = CustomerNumber;