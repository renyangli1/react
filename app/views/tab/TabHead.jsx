/*货架选择空间
 *@param
 *items
 */
var xhrText = require('../../js/common/xhr_text.js');
var shelfService = require('../../js/service/shelfService.js');
var TabHead = React.createClass({
    getInitialState: function() {
        return {
            showItems: false,
            datas: ''
        };
    },
    componentDidMount: function() {
        var me = this;
        xhrText({
            // path: '/customer/manager/statistic/shelf/findAll',
            path: '/company/shelf/findAll',
            params: {
                "companyId": window.BS.company.id
            },
            remote: 'shelf',
            success: function(result) {
                me.setState({
                    datas: result
                });
                me.props.callbackParent({
                    shelfId: result[0].shelfId
                });
                window.BS.company.shelfId = result[0].shelfId;
            }
        });
    },
    toggleItems: function(e) {
        var me = this;
        e.preventDefault();
        e.stopPropagation();
        me.setState({
            showItems: !me.state.showItems
        });
    },
    toggleLiItems: function(e) {
        var me = this;
        var et = $(e.target);
        var strObj = et.find('span.icon-selected');
        var liObj = et;
        var shelfId;
        if (strObj.length === 0) {
            strObj = et.parent('li.list-item').find('span.icon-selected');
            liObj = et.parent('li.list-item');
        }
        shelfId = liObj.attr('data-shelf');
        e.preventDefault();
        e.stopPropagation();
        me.setState({
            showItems: !me.state.showItems
        });
        $('.select-head>.name', me.root).text(strObj.html());
        this.props.callbackParent({
            shelfId: shelfId
        });
        window.BS.company.shelfId = shelfId;
    },
    render: function() {
        var me = this;
        var datas = me.state.datas;
        var items = datas && datas.map(function(item, num) {
            return (
                <li className = "list-item" key={num} onClick= {me.toggleLiItems} data-shelf={item.shelfId}>
                     <span className = "name" > </span><span className = "icon-selected" >{item.shelfName}</span> 
                </li>
            );
        });
        return (
            <div className = "tab-head">
        		<div className = "head-wrap">
                    <div className= "return-text">
                        <a href={me.props.returnUrl} className="return"></a>
                        <span className="text">{me.props.titleText}</span>
                    </div>
        			<div className = {me.props.isHidden ? 'select-head hide' : 'select-head'} onClick = {this.toggleItems}>
            			<span className = "name">{this.state.datas&&this.state.datas[0].shelfName}</span>
            			<span className = { this.state.showItems ? 'icon-down' : 'icon-down right' }></span>
        			</div>
                    <div className="clear"></div>
        		</div>
                <ul className = {'tab-head-list ' + (!this.state.showItems ? 'collapse' : '')} >
        			{items}
        		</ul> 
    		</div>
        );
    }
});
module.exports = TabHead;