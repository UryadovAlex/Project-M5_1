import React, { Component } from 'react';
import './Sell.css';


class Sell extends Component {

    

    render() {
       
        return (
            <div className="main">

                <div className="container">
                    <div><i className="glyphicon glyphicon-menu-left"></i><button onClick={() => this.props.history.goBack()}>Back</button></div>
                    <div><p className="stock-name">Stock's Name</p></div>
                </div>
                <div className="buy-defaut-price"><p>Default Price</p></div>
                <div className="buy-quantity">
                    <button onClick={this.handleMinus}>-</button>
                    <span>X</span>
                    <button onClick={this.handlePlus}>+</button>
                </div>
                <div className="buy-price">
                    <span>Sell for </span>
                    <span>totalPrice</span>
                    <span>$</span>
                </div>
                <div className="sell-button" > <button onClick={this.handleBuy}>Sell</button></div>
               
            </div>
        )
    }
}

export default Sell;