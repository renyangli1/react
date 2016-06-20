var xhr = require('../../js/common/xhr.js');
var util = require('../../js/common/util.js');
var LoginHeader = require("../login/LoginHeader.jsx");
var hashHistory = window.ReactRouter.hashHistory;

var AccountInput = React.createClass({
    render: function() {
        return (
            <div className="account-input-view">
                <input type="text" placeholder="请输入企业账号" name={this.props.name}/>
            </div>
            
        );
    }
});
var PswInput = require("../login/PswInput.jsx");

var ForgetPswText = React.createClass({
     render:function(){
         return (
            <div className="forget-psw-text">
                *忘记密码，请联系客服<a href="tel:0571-56018980">0571-56018980</a>
            </div>
         );
     }
});

var EnsureButton = require("../login/EnsureButton.jsx");
var LoginForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var userName = $.trim($("input[name='userName']").val());
        var psw = $.trim($("input[name='psw']").val());
        if (!userName || !psw) {
          alert("请输入企业账号及密码!");
          return;
        }
        this.props.onLoginSubmit({userName: userName, psw: psw});
        
        return;
    },
    render: function() {
        return (
            <form className="input-form" onSubmit={this.handleSubmit}>
              <div className="input-view">
               <AccountInput name="userName"/>
               <PswInput placeholderText="请输入密码" name="psw"/>
              </div>
               <EnsureButton>登录</EnsureButton>
               <ForgetPswText/>
            </form>
        );
    }
});
var Login = React.createClass({
    handleLoginSubmit: function(loginInfo) {
        xhr({
            path: '/customer/manager/h5/login',
            params: {
                "userName": loginInfo.userName,
                "psw": loginInfo.psw
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
                if(res.code==-3){
                    hashHistory.push("/InitPsw/"+loginInfo.userName);
                }else{
                    alert(res.msg);
                }
            }
        });
    },
    render:function(){
        return (
            <div className="login">
              <div className="login-wrap">
               <LoginHeader/>
               <LoginForm onLoginSubmit={this.handleLoginSubmit}/>
              </div>
            </div>
        );
    }
});
module.exports = Login;