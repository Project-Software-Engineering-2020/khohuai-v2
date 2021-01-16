import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import './shop.css';
import { Carousel } from 'react-bootstrap'
import LotteryItem from './LotteryItem';
import { useSelector } from 'react-redux';

const Shop = () => {
    const stetus = useSelector(state => state.auth)
    const stotus = stetus.status;
    const [redirect, setredirect] = useState(true)
    const [loterryList, setLottery] = useState([]);
    const [loading, setloading] = useState(null)

    useEffect(() => {
        setredirect(stotus)
        setloading(true)
    })
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
                                                <li><p>.......................................</p></li>
                                                <li><p>.......................................</p></li>
                                                <li><p>.......................................</p></li>
                                                <li><p>.......................................</p></li>
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
                                        <LotteryItem />
                                        <LotteryItem />
                                        <LotteryItem />
                                        <LotteryItem />
                                        <LotteryItem />
                                        <LotteryItem />
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