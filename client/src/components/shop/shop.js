import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import Lottoryitem from "./LotteryItem"
import './shop.css';
import Axios from "axios";
// import Button from '../navbar/Button';
// import { Carousel } from 'react-bootstrap'
// import LotteryItem from './LotteryItem';

const Shop = () => {

    const [redirect, setredirect] = useState(true)
    const [data, setData] = useState();
    const [loading, setloading] = useState(false);

    const [search, setSearch] = useState("");
    const [position, setPosition] = useState("last");


    useEffect(async () => {

        const FetchData = async () => {
            await Axios.get("http://localhost:3001/lottery").then((lot) => {
                setData(lot.data);
                console.log(lot.data);
            })
            await setloading(true);
        }
        await setPosition("last")
        await setredirect(true);
        await FetchData()
        await setloading(true)
    }, [])
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
                                        {/* <div className="box-search-lottery">
                                            // <p>ค้นหาสลาก</p>
                                            // <input type="text" className="form-control input-search-lottery" maxLength="1" />
                                            // <input type="text" className="form-control input-search-lottery" maxLength="1" />
                                            // <input type="text" className="form-control input-search-lottery" maxLength="1" />
                                            // <input type="text" className="form-control input-search-lottery" maxLength="1" />
                                            // <input type="text" className="form-control input-search-lottery" maxLength="1" />
                                            // <input type="text" className="form-control input-search-lottery" maxLength="1" />
                                            // <div className="btn-search-lottery">
                                            //     <button>ล้าง</button>
                                            //     <button>ค้นหา</button>
                                            // </div>
                                        </div> */}


                                        <Form className="box-search-lottery">
                                            <h4>ค้นหาสลาก</h4>
                                            {/* <Form.Group controlId="exampleForm.SelectCustom"> */}
                                            <div>
                                                {/* <Form.Label>ตำแหน่ง</Form.Label> */}
                                                <Form.Control as="select" custom onClick={(e) => setSearch(e.target.value)} className="form-search">
                                                    <option value="last">เลขท้าย</option>
                                                    <option value="first">เลขหน้า</option>
                                                </Form.Control>


                                                <Form.Group >
                                                    {/* <Form.Label>.</Form.Label> */}
                                                    <Form.Control type="text" placeholder="เลขที่ต้องการ" maxLength="6" className="form-search" onChange={(e) => setPosition(e.target.value)} />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicEmail">
                                                    {/* <Form.Label>.</Form.Label> */}
                                                    <button type="button" class="btn btn-success">ค้นหา</button>
                                                </Form.Group>

                                            </div>



                                            {/* </Form.Group> */}
                                        </Form>
                                    </section>
                                    <pre>
                                        {search}
                                        {position}
                                    </pre>
                                    <section className="lottery-shop">

                                        {data.map((item, index) => {

                                            return (
                                                <Lottoryitem key={index} photo={item.photoURL} id={item.id}></Lottoryitem>
                                            )
                                        }

                                        )}
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