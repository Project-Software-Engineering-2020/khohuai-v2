import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './Purchase.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPurchase } from '../../redux/action/purchaseAction';
import { setPurchaseDetail } from '../../redux/action/purchaseDetailAction';
import Moment from 'react-moment';
import 'moment/locale/th';

const Purchase = () => {

    const history = useHistory();

    let purchase = useSelector(state => state.purchase)
    const dispatch = useDispatch()

    const showDetail = (data) => {
        history.push("/purchase/" + data.invoiceid);
        dispatch(setPurchaseDetail(data));
    }

    useEffect(async () => {

        await dispatch(getPurchase());

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
            { purchase.loading ?
                <div className="text-center loader">กรุณารอสักครู่</div>
                : null}
            <div className="history-user-buy">
                {purchase.data.map((item, index) => {
                    return (
                        <div className="card mt-3" key={index}>
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
                                <div className="number-lottery-list">
                                    <div className="text-info-perchase-head">เลขสลาก</div>
                                    <div className="text-info-perchase-head">ราคา</div>
                                    <div className="text-info-perchase-head">จำนวน</div>
                                    <hr />
                                </div>
                                {item.lottery.map((lottery, i) => {
                                    return (
                                        <div className="mt-2">
                                            {i < 3 ?
                                                <div className="number-lottery-list" key={i}>
                                                    <div className="text-info-perchase space-number-purchase">{lottery.id}</div>
                                                    <div className="text-info-perchase">฿80</div>
                                                    <div className="text-info-perchase">{lottery.qty} ใบ</div>
                                                    <hr />
                                                </div>
                                                :
                                                null
                                            }

                                        </div>
                                    )
                                })}
                                {item.lottery.length > 3 ? <div onClick={(e) => showDetail(item)} className="text-center"><a href="">ดูเพิ่มเติม</a></div> : null}
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
                                <div>
                                    <button onClick={(e) => showDetail(item)} className="btn-purchase-detail">ดูเพิ่มเติม</button>
                                </div>
                            </div>


                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Purchase

