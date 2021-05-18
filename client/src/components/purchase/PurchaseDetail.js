import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import './Purchase.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPurchaseDetail } from '../../redux/action/purchaseDetailAction'
import Moment from 'react-moment';
import 'moment/locale/th';

const PurchaseDetail = (props) => {

    const invoice = props.match.params.id;
    let purchase = useSelector(state => state.purchase_detail)
    let item = purchase.data;
    const dispatch = useDispatch();

    useEffect(async () => {

        // await dispatch(getPurchase());

    }, [])

    return (
        <div className="container mt-3 p-3 bg-white">
    
            <header className="header-purchase-page">
                <NavLink to="/purchase" activeClassName="purchase-item-active" className="purchase-item">
                    ประวัติการซื้อ
                </NavLink>
                <NavLink to="/reward" activeClassName="purchase-item-active" className="purchase-item">
                    การรับรางวัล
                </NavLink>
            </header>
            {/* { purchase.loading ?
                <div className="text-center">กรุณารอสักครู่</div>
                : null} */}
            <div className="history-user-buy">
                <div className="card mt-3">
                    <div className="card-header-purchase">
                        <div>
                            คำสั่งซื้อ #{item.invoiceid}
                        </div>
                        <div className="text-right">
                            <Moment format="ชำระเงินเมื่อ DD-MM-YYYY เวลา HH:mm:ss">
                                {item.date}
                            </Moment>
                        </div>
                    </div>
                    <div className="card-body">
                        {item.lottery.map((lottery, i) => {
                            return (
                                <div className="mt-3">
                                    <div className="row">
                                        <div className="col-lg-6 col-6" key={i}>
                                            {/* <span>{lottery.id}</span> */}
                                            <img src={lottery.photoURL} className="w-100"></img>
                                        </div>
                                        <div className="col-lg-6 col-6">
                                            <div className="text-detail-perchase">฿80</div>
                                            <div className="text-detail-perchase">จำนวน {lottery.qty} ใบ</div>
                                            
                                        </div>
                                    </div>

                                </div>

                            )
                        })}
                        <hr />
                        <div className="summary-purchase-item">
                            <div>
                                <div>สถานะ : รอการประกาศผล</div>
                            </div>
                            <div>
                                <div>
                                    จำนวนทั้งหมด {item.quantity} ใบ

                                        </div>
                                <div>
                                    ยอดคำสั่งซื้อทั้งหมด {item.totalprice} บาท
                                        </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseDetail