import React, {Component} from 'react';
import EachStock from './EachStock/EachStock';
import './stock.css';
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";


class Stock extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    state = {
        data: [],
        filteredData: [],
        pageSize: 4,
        currentPage: 1,
        lastPage: '',
        pageNumChange: true,
        searchInput: ''
    }

    componentDidMount() {
        this._isMounted = true;
        this.getData()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    //Function for getting datа from API and writing it to the state
    getData = () => {
        this._isMounted && fetch("https://fmpcloud.io/api/v3/stock/list?apikey=e9c667e8d857428eecec768a1dc5ab38")
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                this._isMounted && this.setState(
                    {
                        data: data, lastPage: +Math.ceil(data.length / this.state.pageSize)
                    });
            })
            .catch(err => {
                // А это просто обработка ошибок
                console.log(err);
            })
    }

    //Function to filter data by company symbols
    stockFilterHandler = (e) => {
        const filtered = this.state.data.filter((item) => {
            return e.target.value.toUpperCase() === item.symbol
        })
        this._isMounted && this.setState({
            searchInput: e.target.value,
            filteredData: filtered,
        })
    }

    //  Change current page for pagination
    changeCurrentPage = numPage => {
        this._isMounted && this.setState({currentPage: numPage});
    };

    render() {
        const {data, pageSize, currentPage, lastPage, searchInput, filteredData} = this.state;
        return (
            <div className='stock'>
                <div className='stock-input'>
                    <img src={'/assets/search-logo.png'} alt="magnifier"/>
                    <input onInput={this.stockFilterHandler} type='text' placeholder='enter company ticker'/>
                </div>
                <div className='stock-arr'>
                    {(data.length > 0) ?
                        (searchInput.length > 0 ? filteredData : data)
                            .slice(pageSize * (currentPage - 1), pageSize * currentPage)
                            .map((res, i) => {
                                return <EachStock key={i} data={res}/>
                            }) :
                        <div className='loading'>Loading...</div>
                    }
                </div>

                <div className="list">
                    {
                        (!searchInput.length > 0) &&
                        <Pagination
                            currentPage={this.state.currentPage}
                            totalPages={lastPage}
                            changeCurrentPage={this.changeCurrentPage}
                            theme="bottom-border"
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Stock;