var ECharts = window.ECharts;


var LineChart = React.createClass({
    renderChart:function(){
        var chartId = this.props.id;
        var optionInfo = this.props.optionInfo;
        // 基于准备好的dom，初始化echarts实例
        var myChart = ECharts.init(document.getElementById(chartId));

        // 指定图表的配置项和数据
        var option = {
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: optionInfo.xAxisData
            },
            yAxis: {},
            series: [{
                type: 'line',
                data: optionInfo.seriesData
            }],
            color:[optionInfo.chartColor]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
	componentDidMount: function() {
        this.renderChart();
        
	},
    componentDidUpdate:function(){
        this.renderChart();
    },
	render:function(){
		return (
			<div id={this.props.id} className="line-chart"></div>
		);

	}
});
module.exports = LineChart;