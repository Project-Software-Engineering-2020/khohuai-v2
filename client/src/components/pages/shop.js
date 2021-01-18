import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import Lottoryitem from "./LotteryItem"
import './shop.css';
import Axios from "axios";
// import { Carousel } from 'react-bootstrap'
// import LotteryItem from './LotteryItem';
import { useSelector } from 'react-redux';

const Shop = () => {
    const stetus = useSelector(state => state.auth)
    const stotus = stetus.status;
    const [redirect, setredirect] = useState(true)
    // const [loterryList, setLottery] = useState([]);

    const [data, setData] = useState();
    const [loading, setloading] = useState(false);


    const FetchData = async () => {
        await Axios.get("http://192.168.1.150:3001/lottery").then((lot) => {
            setData(lot.data);
            console.log(lot.data);
        })
        await setloading(true);
    }


    useEffect(async () => {
        await setredirect(stotus)
        await FetchData()
        await setloading(true)
    },[])



    return (
        <div>
            {redirect ? (
                <div>
                    {loading ? (
                        <div className="">
                            <div className="container">
                                <div className="shop">
                                    <section className="header-shop">
                                        <div>
                                            <figure className="header-shop-img">
                                                <img src="./images/store.png"></img>
                                            </figure>
                                        </div>
                                        <div className="header-shop-text">
                                            <h1>ร้านค้าสลาก</h1>
                                            <h5>งวดประจำวันที่ 1 กุมภาพันธ์ 2563</h5>
                                        </div>
                                    </section>
                                    <section className="section-search">
                                        <div className="info-shop">
                                            <h5>ขั้นตอนการซื้อสลากกินแบ่งรัฐบาลออนไลน์</h5>
                                            <ol>
                                                <li><p>เลือกสลากที่ต้องการ</p></li>
                                                <li><p>เพิ่มลงในตะกร้า</p></li>
                                                <li><p>ชำระเงิน</p></li>
                                                <li><p>รอการประกาศผลรางวัล</p></li>
                                            </ol>
                                        </div>
                                        <div className="box-search-lottery">
                                            <p>ค้นหาสลาก</p>
                                            <input type="text" className="form-control input-search-lottery" maxLength="1" />
                                            <input type="text" className="form-control input-search-lottery" maxLength="1" />
                                            <input type="text" className="form-control input-search-lottery" maxLength="1" />
                                            <input type="text" className="form-control input-search-lottery" maxLength="1" />
                                            <input type="text" className="form-control input-search-lottery" maxLength="1" />
                                            <input type="text" className="form-control input-search-lottery" maxLength="1" />
                                            <div className="btn-search-lottery">
                                                <button>ล้าง</button>
                                                <button>ค้นหา</button>
                                            </div>
                                        </div>
                                    </section>
                                    <section className="lottery-shop">

                                        {data.map((item, index) => {
                                            if (index) {
                                                return (
                                                    <Lottoryitem key={index} photo={item.photoURL} id={item.id}></Lottoryitem>
                                                )
                                            }

                                        })}
                                    </section>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div className="loader">Loading...</div>
                        )}
                </div>
            ) : (
                    <Redirect to='/login'></Redirect>
                )}
        </div>
    )

}

export default Shop;