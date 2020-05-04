import React, {Component} from 'react';
import './Sell.css';

class Sell extends Component {

    state = {
        userStock: {},
        stockInApi: {},
        userDetails: {},
        amount: 1
    }

    getUserDetails = async () => {
        return await fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/4')
            .then(data => data.json())
    }

    getStockNameFromAPI = async symbol => {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}`)
            .then(res => res.text())
            .then(data => {
                // Пробуем распарсить полученные данные, если не получается - обрезаем
                try {
                    return JSON.parse(data);
                } catch(err) {
                    const lastRecStart = data.lastIndexOf('{');
                    const trimmedData = data.substr(0, lastRecStart - 2) + ']}';
                    return JSON.parse(trimmedData);
                }
            });
        return response.profile;
    }

    getStockSelectedStock = async () => {
        const id = this.props.match.params.id;
        return await fetch(`https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks/${id}`)
            .then(data => data.json());
    }

    deleteStockFromServer = () => {
        const id = this.props.match.params.id;
        fetch(`https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks/${id}`, {
            method: "DELETE",
        }).then(() => this.props.history.goBack())
    }

    updateStockOnServer = () => {
        const id = this.props.match.params.id;
        const {userStock, amount} = this.state;
        let newAmount = userStock.purchasePrice - userStock.amount * amount;

        fetch(`https://5e8da89e22d8cd0016a798db.mockapi.io/users/4/stocks/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...userStock, purchasePrice: newAmount})
        }).then(() => this.props.history.goBack())
    }

    updateUserInfo = () => {
        const { amount, userDetails, stockInApi } = this.state;
        let newBalance = userDetails.currentBalance + stockInApi.price * amount;
        const data = {
            name: 'Team four',
            currentBalance: newBalance
        }
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/4', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }


    sellStock = () => {
        let {amount, userStock} = this.state;
        let maxAmount = Math.round(userStock.purchasePrice / userStock.amount);
        if (amount === maxAmount) {
            this.deleteStockFromServer();
            this.updateUserInfo();
        } else {
            this.updateStockOnServer();
            this.updateUserInfo();
        }
    }

    handleMinus = () => {
        let {amount} = this.state;
        if (amount !== 1) this.setState({amount: amount - 1});
    }

    handlePlus = () => {
        let {amount, userStock} = this.state;
        let maxAmount = Math.round(userStock.purchasePrice / userStock.amount);
        console.log(maxAmount, userStock.amount, userStock.purchasePrice)
        if (amount < maxAmount) this.setState({amount: amount + 1});
    }

    async componentDidMount() {
        const userStock = await this.getStockSelectedStock();
        const stockInApi = await this.getStockNameFromAPI(userStock.code);
        const userDetails = await this.getUserDetails();
        this.setState({userDetails, userStock, stockInApi})
    }

    render() {
        const {stockInApi, userStock, amount} = this.state;
        return (
            <div className="main">

                <div className="container">
                    <div><i className="glyphicon glyphicon-menu-left"></i>
                        <button onClick={() => this.props.history.goBack()}>Back</button>
                    </div>
                    <div><p className="stock-name">{stockInApi.companyName}</p></div>
                </div>
                <div className="sell-defaut-price"><p>{stockInApi.price}$</p></div>
                <div className="sell-quantity">
                    <button onClick={this.handleMinus}>-</button>
                    <span>{amount}</span>
                    <button onClick={this.handlePlus}>+</button>
                </div>
                <div className="sell-price">
                    <span></span>
                    <span>Sell for {stockInApi.price * amount}</span>
                    <span>$</span>
                </div>
                <div className="sell-button">
                    <button onClick={this.sellStock}>Sell</button>
                </div>

            </div>
        )
    }
}

export default Sell;