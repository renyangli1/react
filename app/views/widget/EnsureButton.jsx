var EnsureButton = React.createClass({
   handleClick:function(e){
   	  this.props.onClick(this.props.data);
   	  return;
   },
   render:function(){
	   	return(
			<div className="view-btn-ensure">
			   <button className='btn-ensure' onClick={this.handleClick}>确认</button>
			</div>
	   	)
   }
   
});
module.exports = EnsureButton;