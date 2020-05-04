import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Account from './Components/Account/Account';
import Stock from './Components/Stock/Stock';
import Balance from './Components/Balance/Balance';
import Header from './Components/Header/Header';
import Buy from './Components/Buy/Buy';
import Sell from './Components/Sell/Sell'
import './index';

class Application extends Component {
    render() {
        return (
            <Router>
                <Header />    
                <Route exact path='/'>
                    <Account/>
                </Route>
                <Route exact path='/account'>
                    <Account/>
                </Route>
                <Route exact path='/stock'>
                    <Stock/>
                </Route>
                <Route exact path='/stock/:id' component={Buy}></Route>
                <Route exact path='/account/:id' component={Sell}></Route>
                <Balance/>
            </Router>
        )
    }
}

export default Application;