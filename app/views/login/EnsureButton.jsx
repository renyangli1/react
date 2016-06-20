var hashHistory = window.ReactRouter.hashHistory;
var EnsureButton = React.createClass({
	render:function(){
		return (
			<button className="ensure-btn" type="submit">{this.props.children}</button>
		);

	}
});
module.exports = EnsureButton;
