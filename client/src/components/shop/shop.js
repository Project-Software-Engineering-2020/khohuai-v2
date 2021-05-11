import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Form } from 'react-bootstrap';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import Lottoryitem from "./LotteryItem";
import { getCurrent } from '../../redux/action/ngud'
import { useDispatch,useSelector } from 'react-redux'
import './shop.css';
import Axios from "axios";
import Moment from 'react-moment';
import 'moment/locale/th';
import { api } from '../../environment'
const Shop = ({ }) => {

    const ngud = useSelector(state => state.ngud);
    const dispatch = useDispatch();

    const history = useHistory()
    const [loading, setloading] = useState(true);

    const [numberState, setNumber] = useState("");
    const [positionState, setPosition] = useState("last2");
    const [data, setData] = useState();

    //params from url
    const { search } = useLocation();
    let { number, position } = queryString.parse(search);

    //get Data from Database
    const getData = async () => {
        if (position === "all") {
            await Axios.get(api + "/lottery").then((lot) => {
                setData(lot.data);
            })
        }
        else {
            await Axios.get(api + "/lottery/search?position=" + position + "&keyword=" + number).then((lot) => {
                setData(lot.data);
            })
        }
    }

    const handleInputNumber = (num) => {

        var pattern = new RegExp(/^[0-9]+$/);

        let err = "";

        if (!num) {
            setNumber(num);
        }
        else if (typeof num !== "undefined") {
            if (pattern.test(num)) {

                if (positionState === "last2") {
                    if (num.length <= 2) { setNumber(num) }
                }
                else if (positionState === "last3") {
                    if (num.length <= 3) { setNumber(num) }
                }
                else if (positionState === "front") {
                    if (num.length <= 3) { setNumber(num) }
                }
                else if (positionState === "whole") {
                    if (num.length <= 6) { setNumber(num) }
                }
            }
        }
        else {
            err = "กรุณากรอกเป็นตัวเลข"
        }
    }

    //push value on url 
    const onClickSearch = () => {
        history.push("/shop?position=" + positionState + "&number=" + numberState);
    }

    useEffect(async () => {

        await getData();

        await dispatch(getCurrent())

        await setloading(false);

    }, [search])

    return (
        <div className="container">
            <div>
                {loading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    <div >
                        <div className="shop">
                            <section className="section-search">

                                <section className="header-shop">
                                    <div>
                                        <figure className="header-shop-img">
                                            <img src="./images/store.png"></img>
                                        </figure>
                                    </div>
                                    <div className="header-shop-text">
                                        <h3>สลากงวดประจำวันที่
                                            <Moment format=" DD MMMM YYYY ">
                                                {ngud.end}
                                            </Moment>
                                        </h3>
                                        <h5>ราคาใบละ 80 บาท</h5>
                                    </div>
                                </section>
                                <Form className="box-search-lottery" onSubmit={onClickSearch}>
                                    <p>ค้นหาสลาก</p>
                                    <div>
                                        <Form.Control as="select" custom onChange={(e) => { setPosition(e.target.value); setNumber(""); }} className="form-search" value={positionState}>
                                            <option value="all">แสดงทั้งหมด</option>
                                            <option value="last2" selected>เลขท้าย 2 ตัว</option>
                                            <option value="last3">เลขท้าย 3 ตัว</option>
                                            <option value="front">เลขหน้า 3 ตัว</option>
                                            <option value="whole">ทุกตัว</option>
                                        </Form.Control>
                                        <Form.Group >
                                            {/* <Form.Label>.</Form.Label> */}
                                            {positionState === "all" || null || "" ?
                                                <Form.Control type="text" className="form-search" value=" " disabled />
                                                :
                                                <Form.Control type="text" placeholder="เลขที่ต้องการ" maxLength="6" className="form-search" onChange={(e) => handleInputNumber(e.target.value)} value={numberState} />
                                            }

                                        </Form.Group>

                                        <Form.Group>

                                            <button type="button" className="btn btn-success" onClick={onClickSearch}>ค้นหา</button>
                                        </Form.Group>

                                    </div>
                                    {/* </Form.Group> */}
                                </Form>
                            </section>
                            {data.length > 0 ? null : <div className="text-center"><h3>ไม่พบสลาก</h3></div>}
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
                )}
            </div>
          
        </div>
    )

}

export default Shop;
