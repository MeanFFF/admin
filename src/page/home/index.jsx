import React from 'react';
import './index.scss';
import PageTitle from "component/page-title/index.jsx";
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import Statistic from 'service/statistic-service.jsx';

const _statistic = new Statistic();
const _mm = new MUtil();
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCount: '-',
            fileCount: '-',
            orderCount: '-'
        }
    }
    //生命周期
    componentDidMount(){
        this.loadCount();
    }

    loadCount(){
        _statistic.getHomeCount().then(res => {
            this.setState({
                userCount:res.userCount,
                fileCount:res.productCount,
                orderCount:res.orderCount

            });
        }, errMsg => {
            _mm.errorTips(errMsg)
        });
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="首页"/>
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box brown">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o">
                                    <span>用户总数</span>
                                </i>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/file" className="color-box green">
                            <p className="count">{this.state.fileCount}</p>
                            <p className="desc">
                                <i className="fa fa-list">
                                    <span>文件总数</span>
                                </i>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/order" className="color-box blue">
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o">
                                    <span>订单总数</span>
                                </i>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;