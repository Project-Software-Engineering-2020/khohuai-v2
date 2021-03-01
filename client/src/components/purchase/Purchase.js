import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Purchase.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPurchase } from '../../redux/action/purchaseAction'
import Moment from 'react-moment';
import 'moment/locale/th';

const Purchase = () => {

    let purchase = useSelector(state => state.purchase)
    const dispatch = useDispatch()

    useEffect( async () => {

        await dispatch(getPurchase());
        
    }, [])

    return (
        <div className="container mt-3 p-3 bg-white">
            <header className="header-purchase-page">
                <Link to="/purchase" activeClassName="purchase-item-active" className="purchase-item">
                    ประวัติการซื้อ   
                </Link>
                <Link to="/reward" activeClassName="purchase-item-active" className="purchase-item">
                    การรับรางวัล
                </Link>
            </header>
            { purchase.loading ? 
                <div className="text-center">กรุณารอสักครู่</div>
            : null }
            <div className="history-user-buy">
                {purchase.data.map((item,index) => {
                    return (
                        <div className="card" key={index}>
                            <div className="card-header">
                                <div>
                                <Moment fromNow ago locale="th">{item.date}</Moment>
                                </div>
                            </div>
                            <div className="card-body">
                                {item.lottery.map((lottery,i) => {
                                    return (
                                        <div className="col-6" key={i}>
                                            <img src={lottery.photoURL} className="w-100"></img>
                                        </div>
                                    )
                                }) }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Purchase

