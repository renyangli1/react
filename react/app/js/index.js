(function(w) {
    /*w.React=require('./lib/react.js');*/
    var ReactDom = window.ReactDom;
    var Router = window.ReactRouter.Router;
    var Route = window.ReactRouter.Route;
    var browserHistory = window.ReactRouter.browserHistory;
    var Home = require('../views/home/Home.jsx');
    //ReactDom.render(<Home/>, document.getElementById('app'));
    // 将匹配的路由渲染到 DOM 中
    var routers = (
        <Router history={browserHistory}>
            <Route path="/" component={Home}>
                <Route path="home" component={Home}/>
            </Route>
        </Router>)
    ReactDom.render(routers, document.getElementById('app'));
    /*            <Route path="about" component={H}/>
            <Route path="users" component={Users}>
            <Route path="/user/:userId" component={User}/>*/
    /*    window.ReactRouter.run(routes, Router.HistoryLocation, function(Root) {
            ReactDom.render(<Root />, document.body);
        });*/
}(window));
