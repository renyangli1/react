var util=require('../../js/common/util.js');
var ShelvesConsumption = React.createClass({
    render: function () {
        return (
            <div className="consumption-view">
                <div className="shelves-total-consumption">
                    <span className="shelves-total-consumption-title">消费总额</span><span className="shelves-total-consumption-unit">￥ <span className="shelves-total-consumption-money">{util.getRMBStr(this.props.totalPrice)}</span></span>
                </div>
                <div className="discount-amount">
                    <span className="discount-amount-title">总优惠</span><span className="discount-amount-unit">￥ <span className="discount-amount-money">{util.getRMBStr(this.props.preferentialPrice)}</span></span>
                </div>
            </div>
        );
    }
});
module.exports = ShelvesConsumption;
