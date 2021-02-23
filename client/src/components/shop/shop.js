import React, { useState, useEffect } from 'react';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { Form } from 'react-bootstrap';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import Lottoryitem from "./LotteryItem";
import './shop.css';
import Axios from "axios";

const Shop = () => {


    const history = useHistory()

    const [redirect, setredirect] = useState(true)
    const [data, setData] = useState();
    const [loading, setloading] = useState(false);

    const [number, setNumber] = useState("");
    const [position, setPosition] = useState("all");

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    let numberP = searchParams.get("number");
    let positionP = searchParams.get("position");

    const [dataPost, setdataPost] = useState();


    const findLottery = async () => {


        if (position === "all") {
            await Axios.get("http://localhost:3001/lottery").then((lot) => {
                history.push("/shop?position=all" + "&number=");
                setData(lot.data);
            })
        }
        else {
            await Axios.get("http://localhost:3001/lottery/search?position=" + position + "&keyword=" + number).then((lot) => {
                history.push("/shop?position=" + position + "&number=" + number);
                setData(lot.data);
            })
        }

    }

    useEffect(async () => {

        await history.push("/shop?position=all" + "&number=");
        numberP = await searchParams.get("number");
        positionP = await  searchParams.get("position");
        await setNumber(numberP);
        await setPosition(positionP);
        await setredirect(true);
        await findLottery()
        await setloading(true);


        //demo 


    }, [])
    return (
        <div>
            {redirect ? (
                <div>
                    {loading ? (
                        <div className="">
                            <div className="container">

                                <div className="shop">
                                    {/* <section className="header-shop">
                                        <div>
                                            <figure className="header-shop-img">
                                                <img src="./images/store.png"></img>
                                            </figure>
                                        </div>
                                        <div className="header-shop-text">
                                            <h1>ร้านค้าสลาก</h1>
                                            <h5>งวดประจำวันที่ 1 กุมภาพันธ์ 2563</h5>
                                        </div>
                                    </section> */}
                                    <section className="section-search">

                                        <section className="header-shop">
                                            <div>
                                                <figure className="header-shop-img">
                                                    <img src="./images/store.png"></img>
                                                </figure>
                                            </div>
                                            <div className="header-shop-text">
                                                <h3>สลากงวดประจำวันที่ 1 กุมภาพันธ์ 2563</h3>
                                                <h5>ราคาใบละ 80 บาท</h5>
                                            </div>
                                        </section>
                                        {/* <div className="info-shop">
                                            <h5>ขั้นตอนการซื้อสลากกินแบ่งรัฐบาลออนไลน์</h5>
                                            <ol>
                                                <li><p>เลือกสลากที่ต้องการ</p></li>
                                                <li><p>เพิ่มลงในตะกร้า</p></li>
                                                <li><p>ชำระเงิน</p></li>
                                                <li><p>รอการประกาศผลรางวัล</p></li>
                                            </ol>
                                        </div> */}
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


                                        <Form className="box-search-lottery" onSubmit={findLottery}>
                                            <p>ค้นหาสลาก</p>
                                            <div>
                                                <Form.Control as="select" custom onChange={(e) => { setPosition(e.target.value) }} className="form-search" value={position} onSelect={position}>
                                                    <option value="all">แสดงทั้งหมด</option>
                                                    <option value="last2">เลขท้าย 2 ตัว</option>
                                                    <option value="last3">เลขท้าย 3 ตัว</option>
                                                    <option value="front">เลขหน้า 3 ตัว</option>
                                                    <option value="whole">ทุกตัว</option>
                                                </Form.Control>
                                                <Form.Group >
                                                    {/* <Form.Label>.</Form.Label> */}
                                                    {position === "all" || null || "" ?
                                                        <Form.Control type="text" className="form-search" value=" " disabled />
                                                        :
                                                        <Form.Control type="text" placeholder="เลขที่ต้องการ" maxLength="6" className="form-search" onChange={(e) => setNumber(e.target.value)} value={number} />
                                                    }

                                                </Form.Group>

                                                <Form.Group controlId="formBasicEmail">
                                                    {/* <Form.Label>.</Form.Label> */}
                                                    <button type="button" class="btn btn-success" onClick={findLottery}>ค้นหา</button>
                                                </Form.Group>

                                            </div>
                                            {/* </Form.Group> */}
                                        </Form>
                                    </section>
                                    <section className="lottery-shop">

                                        {data.map((item, index) => {

                                            return (
                                                <Lottoryitem key={index} data={item} ></Lottoryitem>
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
