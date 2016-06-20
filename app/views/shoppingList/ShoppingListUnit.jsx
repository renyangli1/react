var ListUnitWhite = require('../list/listUnit/ListUnitWhite.jsx');
var ShoppingListProduct = require('./ShoppingListProduct.jsx');
var ShoppingListUnit = React.createClass({
    getInitialState: function() {
        return {
            descArr: ['消费', '优惠', '订单数'],
            showItems: false
        }
    },
    onChildClick: function(obj) {
        this.setState({
            showItems: obj.showItems
        });
    },
    render: function() {
        var s = this.state;
        var items = this.props.items || [];
        return (
            <div className="shopping-list-unit">
                <div className="shelf-name" >
                    <span></span>
                    <span>{items.shelfName}</span>
                </div>
                <hr className="shopping-list-split-line"/>
                <ListUnitWhite 
                    callbackParent={this.onChildClick}
                    titleOne = {s.descArr[0]}
                    dataOne = {'￥'+items.totalFee}
                    titleTwo = {s.descArr[1]}
                    dataTwo = {'￥'+items.totalDiscount}
                    titleThird = {s.descArr[2]}
                    dataThird = {items.tradeItems&&items.tradeItems.length}
                    showItems = 'true'
                    />
                <ul className={"product-ul "+ (s.showItems?'hide':'')}>
                    <li>
                        <ShoppingListProduct data={items}/>
                    </li>
                </ul>
            </div>
        );
    }
});
module.exports = ShoppingListUnit;