var CheckBox=React.createClass({
	getInitialState:function(){
		return {
			toggle:false,
			title:'全部',
			showCheckBox:false
		};
	},
	_handleClickOption:function(e){
		var me = this;
		var $target=$(e.currentTarget);
		this.props.callback&&this.props.callback.call(this,$target.data('value'));
		this.setState({
			toggle:!this.state.toggle,
			title:$target.html(),
			showCheckBox:!this.state.showCheckBox
		});
	},
	_handleClickCheckBox:function(e){
		var me = this;
		this.setState({
			toggle:!this.state.toggle,
			showCheckBox:!this.state.showCheckBox
		});
	},
	render:function(){
		var me = this;
		var selection=this.props.selections.map(function(item,index){
			return (
				<li className="option" key={index} data-value={item.value}  onClick={me._handleClickOption}>{item.name}</li>
				)
		});
		return (
			<div className="checkbox-wrap">
				<div className="checkbox" onClick={this._handleClickCheckBox}>
					<span className="selected">{this.state.title}</span><span className={this.state.toggle?'checkbox-arrow icon-down-solid':'checkbox-arrow icon-right-solid'}></span>

				</div>
				<div className={this.state.showCheckBox?'mask':'mask hide'}>
					<ul className="selection">
						{selection}
					</ul>
				</div>
			</div>
			)
	}
});
module.exports=CheckBox;