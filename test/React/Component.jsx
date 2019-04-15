import React from 'react';
import ReactDOM from 'react-dom';
//基础组件写法
//function形式的
function Component(){
    return <h1>I am liu</h1>
}

class ES6Component extends React.Component{
    render() {
        return <h1>I am liu in es6</h1>
    }
}
ReactDOM.render(
    //组件并列,使用div
    <div>
        <Component/>
        <ES6Component/>
    </div>,
    document.getElementById('app')
);

//states和props的用法
class Component extends React.Component{
    //数据初始化
    constructor(props){
        super(props);
        this.state = {
            name:'liu',
        }
    }
    //引用变量
    render() {
        //定时,改变变量,异步
        setTimeout(() => {
            this.setState({
                name:'liu test'
            })
        }, 2000);
        return <h1>I am {this.state.name} in es6 {this.props.name}</h1>
    }
}
ReactDOM.render(
    <div>
        <Component name = "ping"/>
    </div>,
    document.getElementById('app')
);

//事件处理方式1
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'liu',
            age: 23
        };
        //3. 把handleClick的this,修正到Component里
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        //2. 传回来的时候,这个this已经变了,并不是我们这个Component的this
        this.setState({
            age : this.state.age + 1
        });
    }

    render() {
        return (
            <div>
                <h1>I am {this.state.name}</h1>
                <p>I am {this.state.age} years old!</p>
                {/*1. onClick传给的是一个事件的回调*/}
                <button onClick={this.handleClick}>加一岁</button>
            </div>
        );
    }
}

ReactDOM.render(
    <div>
        <Component/>
    </div>,
    document.getElementById('app')
);

//事件处理2
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'liu',
            age: 23
        };
    }
    handleClick(){
        this.setState({
            age : this.state.age + 1
        });
    }
    onValueChange(e){
        this.setState({
            age : e.target.value
        });
    }

    render() {
        return (
            <div>
                <h1>I am {this.state.name}</h1>
                <p>I am {this.state.age} years old!</p>
                {
                    /*箭头函数是不占作用域的
                    * 可以通过箭头函数来修正作用域
                    * */
                }
                <button onClick={(e) => {this.handleClick(e)}}>加一岁</button>
                <input type="text" onChange={(e) => {this.onValueChange(e)}}/>
            </div>
        );
    }
}

ReactDOM.render(
    <div>
        <Component/>
    </div>,
    document.getElementById('app')
);

//组件的组合方式
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'liu',
            age: 23
        };
    }
    handleClick(){
        this.setState({
            age : this.state.age + 1
        });
    }
    onValueChange(e){
        this.setState({
            age : e.target.value
        });
    }

    render() {
        return (
            <div>
                <h1>I am {this.state.name}</h1>
                <p>I am {this.state.age} years old!</p>
                {
                    /*箭头函数是不占作用域的
                    * 可以通过箭头函数来修正作用域
                    * */
                }
                <button onClick={(e) => {this.handleClick(e)}}>加一岁</button>
                <input type="text" onChange={(e) => {this.onValueChange(e)}}/>
            </div>
        );
    }
}

class Title extends React.Component{
    //既然有this,就需要constructor
    // constructor(props){
    //     super(props);
    // }

    render(props) {
        return <h1>{this.props.children}</h1>
    }
}

class App extends React.Component{
    render() {
        return (
            <div className="">
                {/*容器式组件*/}
                <Title>
                    <span>App Span</span>
                    <a href="">Link</a>
                </Title>
                <hr/>
                {/*单纯组件*/}
                <Component/>
            </div>
        );

    }
}

ReactDOM.render(
    <div>
        <App/>
    </div>,
    document.getElementById('app')
);

//子组件向父组件传递信息
class Child extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick(){
        this.props.changeColor('red');
    }

    render() {
        return (
            <div>
                <h1>父组件背景色:{this.props.bgColor}</h1>
                {
                    /*箭头函数是不占作用域的
                    * 可以通过箭头函数来修正作用域
                    * */
                }
                <button onClick={(e) => {this.handleClick(e)}}>改变父组件颜色</button>
            </div>
        );
    }
}

class Father extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bgColor:'#999'
        }
    }
    onBgColorChange(color){
        this.setState({
            bgColor:color
        })
    }

    render() {
        return(
            <div style={{background:this.state.bgColor}}>
                {/*第一层大括号:这是一个表达式
                    第二层大括号:表示他的json数据结构*/}
                <Child bgColor={this.state.bgColor} changeColor={(color)=>{this.onBgColorChange(color)}}/>
            </div>
        );
    }
}


ReactDOM.render(
    <div>
        <Father/>
    </div>,
    document.getElementById('app')
);

//数据(兄弟组件中传递信息)传递和状态提升

class Child1 extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick(){
        this.props.changeChild2Color('red');
    }

    render() {
        return (
            <div>
                <h1>Child1:{this.props.bgColor}</h1>
                {
                    /*箭头函数是不占作用域的
                    * 可以通过箭头函数来修正作用域
                    * */
                }
                <button onClick={(e) => {this.handleClick(e)}}>改变Child2背景颜色</button>
            </div>
        );
    }
}

class Child2 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{background:this.props.bgColor}}>
                <h1>Child2:{this.props.bgColor}</h1>
            </div>
        );
    }
}


class Father extends React.Component{
    constructor(props){
        super(props);
        this.state={
            child2bgColor:'#999'
        }
    }
    onChild2BgColorChange(color){
        this.setState({
            child2bgColor:color
        })
    }

    render() {
        return(
            <div>
                <Child1 changeChild2Color={(color) => {this.onChild2BgColorChange(color)}}/>
                <Child2 bgColor={this.state.child2bgColor}/>
            </div>
        );
    }
}


ReactDOM.render(
    <div>
        <Father/>
    </div>,
    document.getElementById('app')
);