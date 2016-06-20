// var TabHead=require('../tab/TabHead.jsx');
var ShelvesConsumption = require('../overview/ShelvesConsumption.jsx');
var Home = React.createClass({
    render: function () {
        return (
            <div className='home'>
                <ShelvesConsumption/>
            </div>
        )
    }
});
module.exports = Home;