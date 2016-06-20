var util = require('../../js/common/util.js');
var ShoppingListProduct = React.createClass({
    getInitialState: function() {
        return {
            descArr: ['消费', '优惠', '订单数']
        }
    },
    render: function() {
        var s = this.state,
            items = this.props.data,
            tradeItems = items.tradeItems || [];

        var doms = tradeItems.map(function(item, num) {
            return (
                <li key={num}>
                    <span>{item.product.productName}</span>
                    <span>￥{item.product.price/100}</span>
                    <span>x{item.tradeNum}</span>
                </li>
            );
        });

        return (
            <div className="shopping-list-product">
                <div className="product-time" >
                    <span></span>
                    <span>{util.parseTime(items.createTime)}</span>
                </div>
                <ul className="product-list">
                    {doms}
                </ul>
            </div>
        );
    }
});
module.exports = ShoppingListProduct;