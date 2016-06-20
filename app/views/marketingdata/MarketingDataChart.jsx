var ChartHeader = React.createClass({
	render: function() {
		return (
			<div className="marketingdata-header">
			   <img className="icon-mark" src={this.props.iconMark}/>
			   <span className="chart-title">{this.props.chartTitle}</span>
			   <span className="statistic-data">{this.props.statisticData}</span>
			   <div className = "detai-index">
			       <span className="checkall-index" ><a href={this.props.url}>查看所有</a></span>
				   <img className="icon-rightarrow" src="img/icon-rightarrow.png"/>
			   </div>
			</div>
		);
	}
});
var LineChart = require("../chart/LineChart.jsx");

var MarketingDataChart = React.createClass({
	render: function() {
		return (
			<div className="marketingdata-chart">
               <ChartHeader chartTitle={this.props.chartTitle} statisticData={this.props.statisticData} iconMark={this.props.iconMark} url={this.props.url}/>
               <LineChart id={this.props.id} optionInfo={this.props.optionInfo} />
            </div>
		);
	}
});

module.exports = MarketingDataChart;