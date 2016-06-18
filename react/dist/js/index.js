(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        React.createElement(Router, {history: browserHistory}, 
            React.createElement(Route, {path: "/", component: Home}, 
                React.createElement(Route, {path: "home", component: Home})
            )
        ))
    ReactDom.render(routers, document.getElementById('app'));
    /*            <Route path="about" component={H}/>
            <Route path="users" component={Users}>
            <Route path="/user/:userId" component={User}/>*/
    /*    window.ReactRouter.run(routes, Router.HistoryLocation, function(Root) {
            ReactDom.render(<Root />, document.body);
        });*/
}(window));

},{"../views/home/Home.jsx":2}],2:[function(require,module,exports){
var Home=React.createClass({displayName: "Home",
	render:function(){
		return (
			React.createElement("div", {className: "home"}, 
			"HAHAHAHAHAH"
			)
			)
	}
});
module.exports = Home;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVm9sdW1lcy9NYWNpbnRvc2gvRGV2ZWxvcG1lbnQvdGQvR29vZHNTaGVsZkNvbXBhbnlCYWNrc3RhZ2UvYXBwL2pzL2luZGV4LmpzIiwiL1ZvbHVtZXMvTWFjaW50b3NoL0RldmVsb3BtZW50L3RkL0dvb2RzU2hlbGZDb21wYW55QmFja3N0YWdlL2FwcC92aWV3cy9ob21lL0hvbWUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsQ0FBQyxTQUFTLENBQUMsRUFBRTs7SUFFVCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQy9CLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBQ3JDLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO0FBQzNELElBQUksSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDakQ7O0lBRUksSUFBSSxPQUFPO1FBQ1Asb0JBQUMsTUFBTSxFQUFBLENBQUEsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxjQUFnQixDQUFBLEVBQUE7WUFDN0Isb0JBQUMsS0FBSyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxHQUFBLEVBQUcsQ0FBQyxTQUFBLEVBQVMsQ0FBRSxJQUFNLENBQUEsRUFBQTtnQkFDN0Isb0JBQUMsS0FBSyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxNQUFBLEVBQU0sQ0FBQyxTQUFBLEVBQVMsQ0FBRSxJQUFLLENBQUUsQ0FBQTtZQUNqQyxDQUFBO1FBQ0gsQ0FBQSxDQUFDO0FBQ2xCLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0NBRUMsQ0FBQyxNQUFNLENBQUMsRUFBRTs7O0FDdEJYLElBQUksd0JBQXdCLG9CQUFBO0NBQzNCLE1BQU0sQ0FBQyxVQUFVO0VBQ2hCO0dBQ0Msb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxNQUFPLENBQUEsRUFBQTtBQUFBLEdBQUEsYUFBQTtBQUFBLEdBRWhCLENBQUE7SUFDTDtFQUNGO0NBQ0QsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbih3KSB7XG4gICAgLyp3LlJlYWN0PXJlcXVpcmUoJy4vbGliL3JlYWN0LmpzJyk7Ki9cbiAgICB2YXIgUmVhY3REb20gPSB3aW5kb3cuUmVhY3REb207XG4gICAgdmFyIFJvdXRlciA9IHdpbmRvdy5SZWFjdFJvdXRlci5Sb3V0ZXI7XG4gICAgdmFyIFJvdXRlID0gd2luZG93LlJlYWN0Um91dGVyLlJvdXRlO1xuICAgIHZhciBicm93c2VySGlzdG9yeSA9IHdpbmRvdy5SZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcbiAgICB2YXIgSG9tZSA9IHJlcXVpcmUoJy4uL3ZpZXdzL2hvbWUvSG9tZS5qc3gnKTtcbiAgICAvL1JlYWN0RG9tLnJlbmRlcig8SG9tZS8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuICAgIC8vIOWwhuWMuemFjeeahOi3r+eUsea4suafk+WIsCBET00g5LitXG4gICAgdmFyIHJvdXRlcnMgPSAoXG4gICAgICAgIDxSb3V0ZXIgaGlzdG9yeT17YnJvd3Nlckhpc3Rvcnl9PlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtIb21lfT5cbiAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cImhvbWVcIiBjb21wb25lbnQ9e0hvbWV9Lz5cbiAgICAgICAgICAgIDwvUm91dGU+XG4gICAgICAgIDwvUm91dGVyPilcbiAgICBSZWFjdERvbS5yZW5kZXIocm91dGVycywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcbiAgICAvKiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiYWJvdXRcIiBjb21wb25lbnQ9e0h9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwidXNlcnNcIiBjb21wb25lbnQ9e1VzZXJzfT5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3VzZXIvOnVzZXJJZFwiIGNvbXBvbmVudD17VXNlcn0vPiovXG4gICAgLyogICAgd2luZG93LlJlYWN0Um91dGVyLnJ1bihyb3V0ZXMsIFJvdXRlci5IaXN0b3J5TG9jYXRpb24sIGZ1bmN0aW9uKFJvb3QpIHtcbiAgICAgICAgICAgIFJlYWN0RG9tLnJlbmRlcig8Um9vdCAvPiwgZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIH0pOyovXG59KHdpbmRvdykpO1xuIiwidmFyIEhvbWU9UmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRyZW5kZXI6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J2hvbWUnPlxuXHRcdFx0SEFIQUhBSEFIQUhcblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHR9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gSG9tZTsiXX0=
