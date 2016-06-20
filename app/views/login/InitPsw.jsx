var xhr = require('../../js/common/xhr.js');
var util = require('../../js/common/util.js');

var LoginHeader = require("../login/LoginHeader.jsx");
var PswInput = require("../login/PswInput.jsx");
var EnsureButton =  require("../login/EnsureButton.jsx");
var hashHistory = window.ReactRouter.hashHistory;

var InitPswForm = React.createClass({
	handleSubmit: function(e) {
        e.preventDefault();
        var userName = parseInt(this.props.userName);
        var psw = $.trim($("input[name='psw']").val());
        var pswAgain = $.trim($("input[name='pswAgain']").val());
        if(!psw){
            alert("请输入密码!");
            return;
        }else if(!pswAgain){
        	alert("请再次输入密码!");
            return;
        }else if(psw!=pswAgain){
        	alert("两次输入密码不一致");
        }

        this.props.onInitPswSubmit({userName: userName, psw: psw});
        return;
    },
	render:function(){
		return(
			<form className="input-form" onSubmit={this.handleSubmit}>
                <div className="input-view">
    				<PswInput placeholderText="请设置6位密码" name='psw'/>
    				<PswInput placeholderText="请再次输入密码" name='pswAgain'/>
                </div>
    			<EnsureButton>确定</EnsureButton>
			</form>
		);
	}
});
var InitPsw = React.createClass({
	handleInitPswSubmit:function(initInfo){
		xhr({
            path: '/customer/manager/h5/login/init',
            params: {
                "userName": initInfo.userName,
                "psw": initInfo.psw
            },
            remote:'auth',
            success:function(data){
                var redirectUrl = util.getCookie("redirectUrl");
                if(redirectUrl){
                    hashHistory.push(redirectUrl);
                }else{
                    hashHistory.push("/marketingDataHome");
                }
                
            },
            error:function(res){
                alert(res.msg);
            }
        });
	},
    render:function(){
    	return(
    		<div className="init-psw">
                <div className="init-psw-wrap">
        		  <LoginHeader/>
        		  <InitPswForm userName={this.props.params.userName} onInitPswSubmit={this.handleInitPswSubmit}/>
                </div>
			</div>
    	);
    }
});
module.exports = InitPsw;