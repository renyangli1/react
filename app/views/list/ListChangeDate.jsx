var ListChangeDate = React.createClass({
	getBeginDate: function() {
		var y = $('.d-year', this.root).attr('data-year');
		var m = $('.d-month', this.root).attr('data-month');
		var begin = new Date(y + '/' + m);
		return begin;
	},
	preClick: function() {
		var begin = this.getBeginDate(),
			date = new Date(begin.setMonth((begin.getMonth() - 1)));
		this.props.callbackParent({
			date: date.getTime()
		});
	},
	nextClick: function() {
		var begin = this.getBeginDate(),
			date = new Date(begin.setMonth((begin.getMonth() + 1)));
		this.props.callbackParent({
			date: date.getTime()
		});
	},
	render: function() {
		return (
			<ul className="list-date-ul">
				<li className="icon-date-left">
					<div className="icon-date-left-div" onClick={this.preClick}>
						<span></span>
					</div>
				</li>
				<li className="date-li">
					<div className="d-year" 
						data-year={this.props.year|'2016'} 
						data-date={this.props.date}>{this.props.year|'2016'}</div>
					<div className="d-month" data-month={this.props.month|'0'}>{this.props.month|'0'}月</div>
				</li>
				<li className="date-li">
					<div>{this.props.titleDescOne}</div>
					<div>{this.props.dataOne}</div>
				</li>
				<li className="date-li">
					<div>{this.props.titleDescTwo}</div>
					<div>{this.props.dataTwo}</div>
				</li>
				<li className="icon-date-right">
					<div className="icon-date-right-div" onClick={this.nextClick}>
						<span></span>
					</div>
				</li>
			</ul>
		);
	}
});
module.exports = ListChangeDate;