(function(w) {
    /* require('./common/flexible.js');*/
    /*w.React=require('./lib/react.js');*/
    var ReactDom = window.ReactDom;
    var Router = window.ReactRouter.Router;
    var Route = window.ReactRouter.Route;
    var IndexRoute = window.ReactRouter.IndexRoute;
    var hashHistory = window.ReactRouter.hashHistory;
    var Home = require('../views/home/Home.jsx');
    var Login = require('../views/login/Login.jsx');
    var InitPsw = require('../views/login/InitPsw.jsx');
    var MarketingDataHome = require('../views/marketingdata/MarketingDataHome.jsx');
    var InventoryConfirm = require('../views/ticketConfirm/InventoryConfirm.jsx');
    var SettlementConfirm = require('../views/ticketConfirm/SettlementConfirm.jsx');
    var DeliveryConfirm = require('../views/ticketConfirm/DeliveryConfirm.jsx');
    var RefundConfirm = require('../views/ticketConfirm/RefundConfirm.jsx');
    var ShoppingList = require('../views/shoppingList/ShoppingList.jsx');
    var ShelvesConsumption = require('../views/overview/ShelvesConsumption.jsx');
    var CustomersNumber = require('../views/overview/CustomersNumber.jsx');
    var Detail = require('../views/detail/Detail.jsx');
    var Deal = require('../views/deal/Deal.jsx');
    var Overview = require('../views/overview/Overview.jsx');
    window.BS = {};
    window.BS.company = {
        id: '724878437633753088',
        shelfId: ''
    };
    // 将匹配的路由渲染到 DOM 中
    var routers = (
        <Router history={hashHistory}>
            <Route path="/" >
                <IndexRoute component={Login}/>
                <Route path="overview" component={Overview}/>
                <Route path="home" component={Home}/>
                <Route path="login" component={Login}/>
                <Route path="initPsw/:userName" component={InitPsw}/>
                <Route path="marketingDataHome" component={MarketingDataHome}/>
                <Route path="inventoryConfirm/:orderId" component={InventoryConfirm}/>
                <Route path="settlementConfirm/:orderId" component={SettlementConfirm}/>
                <Route path="deliveryConfirm/:orderId" component={DeliveryConfirm}/>
                <Route path="refundConfirm/:orderId" component={RefundConfirm}/>
                <Route path="shoppingList" component={ShoppingList}/>
                <Route path="shelvesConsumption" component={ShelvesConsumption}/>
                <Route path="customersNumber" component={CustomersNumber}/>
                <Route path="deal/:type" component={Deal}/>
                <Route path='/detail/:type' component={Detail}/>
            </Route>
        </Router>)
    ReactDom.render(routers, document.getElementById('app'));
    /*
     *带参数写法
     *<Route path="/user/:userId" component={User}/>
     */
}(window));