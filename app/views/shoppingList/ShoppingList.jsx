var ShelvesConsumption = require('../overview/ShelvesConsumption.jsx'),
    util = require('../../js/common/util.js'),
    xhr = require('../../js/common/xhr.js'),
    TabHead = require('../tab/TabHead.jsx'),
    ShoppingListUnit = require('./ShoppingListUnit.jsx'),
    ShoppingListProduct = require('./ShoppingListProduct.jsx');
var ShoppingListDetail = React.createClass({
    render: function() {
        var data = this.props.shoppingListData;
        var customerInfo = data && data.customerInfo;
        var dateStr = util.parseTime(data && data.createTime, 'yyyy-MM-dd hh:mm:ss');
        return (
            <div>
                <section className="shopping-list-detail">
                    <div className="detail-left">
                        <img src={customerInfo ? customerInfo.avatar : '../img/shoppingList_avatar.jpg'}/>
                    </div>
                    <div className="detail-right">
                        <h2>{customerInfo ? customerInfo.alias : '金正恩'}</h2>
                        <p></p>
                        <p>最近消费 {dateStr}</p>
                    </div>
                    <div className="clear"></div>
                </section>
                <div className="company">
                    {data.companyName}
                </div>
            </div>
        );
    }
});

var ShoppingList = React.createClass({
    getInitialState: function() {
        return {
            datas: ''
        }
    },
    componentDidMount: function() {
        var s = this.props.location.state;
        this.setState({
            datas: s.datas,
            parentPath: s.parentPath,
            date: s.date
        });
    },
    render: function() {
        var s = this.state,
            datas = s.datas,
            totalPrice = datas && datas.totalFee,
            preferentialPrice = datas && datas.totalDiscount;
        return (
            <div className="shopping-list">
                <TabHead titleText='顾客消费详单' returnUrl={s.parentPath} isHidden='true'/>
                <div className="margin-to-top"></div>
                <ShoppingListDetail shoppingListData={datas} />
                <ShoppingListUnit items = {datas}/>
            </div>
        );
    }
});
module.exports = ShoppingList;