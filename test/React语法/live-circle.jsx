import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component {
    //这是构造函数
    constructor(props) {
        super(props);
        this.state = {
            data: 'old state'
        }
        console.log('constructor');
    }

    //组件将要加载
    componentWillMount() {
        console.log('componentWillMount');
    }


    //组件加载完成
    componentDidMount() {
        console.log('componentDidMount');
    }


    //将要接受父组件传来的props
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps')
    }

    //子组件是不是应该更新
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate');
        return true;
    }

    //组件将要更新
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('componentWillUpdate');
    }

    //组件更新完成
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate');
    }

    //组件将要销毁
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    //处理点击事件
    handleClick() {
        console.log('这里是更新');
        this.setState({
            data: 'new state'
        })
    }

    //渲染
    render() {
        console.log('render');
        //return时,只有一个根元素
        return (
            <div>
                <div>props : {this.props.data}</div>
                <button onClick={() => {
                    this.handleClick()
                }}>更新组件
                </button>
            </div>

        );
    }
}

class App extends React.Component {
    //这是构造函数
    constructor(props) {
        super(props);
        this.state = {
            data: 'old props',
            hasChild : true

        };
        console.log('constructor');
    }

    onPropsChange() {
        console.log('这里是更新props');
        this.setState({
            data: 'new props'
        })
    }

    onDestoryChild(){
        console.log('干掉子组件');
        this.setState({
            hasChild:false
        })

    }
    render() {
        return (
            <div>
                {
                    this.state.hasChild ? <Component data={this.state.data}/> : null
                }
                {/*<Component data={this.state.data}/>*/}
                <button onClick={() => {
                    this.onPropsChange()
                }}>改变props
                </button>
                <button onClick={() => {
                    this.onDestoryChild()
                }}>干掉子组件
                </button>
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