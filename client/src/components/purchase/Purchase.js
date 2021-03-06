import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './Purchase.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPurchase } from '../../redux/action/purchaseAction';
import { getMyCartFromDB } from '../../redux/action/cartAction'
import { setPurchaseDetail } from '../../redux/action/purchaseDetailAction';
import Widget from '../userdashboard/widget'
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
        await dispatch(getMyCartFromDB());
    }, [])

    return (
        <div className="container mt-3 p-4 bg-white card">

            <Widget />

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

                            </div>
                            <div className="card-body">
                                <div className="m-2">
                                    <Moment format="ชำระเงินเมื่อ DD MMMM YYYY เวลา HH:mm:ss">
                                        {item.date}
                                    </Moment>
                                </div>
                                <div className="m-2">งวดประจำวันที่ <Moment format=" DD MMMM YYYY ">
                                    {item.ngud_date}
                                </Moment></div>
                                <div className="number-lottery-list">
                                    <div className="text-info-perchase-head">เลขสลาก</div>
                                    <div className="text-info-perchase-head">จำนวน</div>
                                    <div className="text-info-perchase-head">สถานะ</div>
                                    <div className="text-info-perchase-head">ผลรางวัล</div>
                                    <hr />
                                </div>
                                {item.lottery.map((lottery, i) => {
                                    return (
                                        <div className="mt-2">
                                            {i < 3 ?
                                                <div className="number-lottery-list" key={i}>
                                                    <div className="text-info-perchase space-number-purchase">{lottery.number}</div>
                                                    <div className="text-info-perchase">{lottery.qty} ใบ</div>

                                                    <div className="text-info-perchase">
                                                        {lottery.status ?
                                                            <span className="badge badge-success">ตรวจรางวัลแล้ว</span>
                                                            :
                                                            <span className="badge badge-warning">รอประกาศผล</span>
                                                        }

                                                    </div>

                                                    <div className="text-info-perchase">{lottery.prize.map((p) => {
                                                        return (
                                                            <p>{p}</p>
                                                        )
                                                    })}
                                                    </div>
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
                                        <div></div>
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
                                {item.lottery.reward > 0 ?
                                    <button className="btn-purchase-detail">รับเงินรางวัล</button>
                                    :
                                    null
                                }
                                <div>

                                </div>
                                {/* <div>
                                    <button onClick={(e) => showDetail(item)} className="btn-purchase-detail">ดูเพิ่มเติม</button>
                                </div> */}
                            </div>


                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Purchase

