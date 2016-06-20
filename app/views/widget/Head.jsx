var Head=React.createClass({
	getInitialState:function(argument) {
		return {

		};
	},
	_handleClickBack:function(e){
		window.history.back();
	},
	render:function(){
		return (
			<div className="head">
				<span className={this.props.noBack?"icon-back hide":"icon-back"} onClick={this._handleClickBack}></span>
				<span className={this.props.noTitle?"title hide":"title"}>{this.props.title}</span>
				<img className={this.props.hasLogo?"logo":"logo hide"} src="./img/icon_logo.png"/>
			</div>
			)
	}
});
module.exports=Head;