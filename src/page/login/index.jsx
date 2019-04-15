import React from 'react';
import User from 'service/user-service.jsx';
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();
const _user = new User();

import './index.scss'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            redirect:_mm.getUrlParm('redirect') || '/'
        };
    }
    //生命周期,显示标题
    componentWillMount(){
        document.title = '登录 - Mean后台';
    }



    //当输入框发生改变
    onInputChange(e){
        //e.target是html元素
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            //es6支持变量名是一个变量或者表达式,用[]
            [inputName]:inputValue,
        })
    }

    //键盘监听事件,回车键(keyCode === 13)自动跳转
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    //当用户提交表单
    onSubmit(){
        let loginInfo = {
            username : this.state.username,
            password : this.state.password
            },
            checkResult = _user.checkLoginInfo(loginInfo);
        //验证通过
        if(checkResult.status){
            _user.login(loginInfo).then((res) => {
                _mm.setStorage('userInfo', res);
                this.props.history.push(this.state.redirect);
            },(errMsg) => {
                _mm.errorTips(errMsg);
            })
        }
        //验证信息不通过
        else{
            _mm.errorTips(checkResult.msg);
        }

    }


    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录Mean后台</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">用户名</label>
                                <input type="text"
                                       name="username"
                                       className="form-control"
                                       id="username"
                                       placeholder="Username"
                                       onKeyUp={e => this.onInputKeyUp(e)}
                                        onChange={e => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">密码</label>
                                <input type="password"
                                       name="password"
                                       className="form-control"
                                       id="password"
                                       placeholder="Password"
                                       onKeyUp={e => this.onInputKeyUp(e)}
                                       onChange={e => this.onInputChange(e)}/>
                            </div>
                            <button type="submit"
                                    className="btn btn-primary btn-block"
                                    onClick={e => {this.onSubmit(e)}}
                            >登录</button>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default Login;