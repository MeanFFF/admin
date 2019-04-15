import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
//基础jsx,样式
let style = {
    color:'re' + 'd',
};
//推荐使用className添加样式
let jsx = <div className="jsx" style={style}>jsx...</div>;
ReactDOM.render(
    jsx,
    document.getElementById('app')
);

//数据逻辑处理
let name = 'liu';
let flag = false;
let names = ['liu', 'gang', 'ping'];
let jsx = (
    <div>
        {
            /*这是变量使用*/
        }
        <p>I am {name}</p>

        {
            /* 这是条件判断*/
        }
        {
            flag ? <p>I am {name}</p> : <p>I am not {name}</p>
        }
        {
            /* 数组循环*/
        }
        {
            names.map((name, index) =>
                <p key={index}>I am {name}</p>
            )
        }
    </div>
);
ReactDOM.render(
    jsx,
    document.getElementById('app')
);