var TicketProduct = React.createClass({
     render:function(){
     	var item = this.props.item;
     	return(
     		<li className="ticket-product" key={this.props.key}>
					<img className="product-image" src={$.Cfg.picUrl + item.cover + '!small'}/>
					<div className="product-info">
						<div className="product-name">{item.productName}</div>
						<div className="price-num"><span className="price">{'￥' + item.price / 100.0}</span><span className="num">{'×' + item.itemNum}</span></div>
					</div>
			</li>
     	);
     }
});
module.exports = TicketProduct;