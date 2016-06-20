var PswInput = React.createClass({
	render:function(){
		return(
			 <div className="psw-input-view">
				 <input type="password" placeholder={this.props.placeholderText} name={this.props.name}/>
			 </div>
		);
	}
});
module.exports = PswInput;