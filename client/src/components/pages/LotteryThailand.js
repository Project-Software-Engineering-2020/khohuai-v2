import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Axios from 'axios';
import './LotteryThailand.css';
import { useDispatch, useSelector } from 'react-redux';

const LotteryThailand = () => {

    const dispatch = useDispatch();
    const profileData = useSelector(state => state.auth);

    const [DateLotteryThailand, setLotteryThailand] = useState([]);
    const [Prizes, setPrizes] = useState([]);
    const [RunningNumbers, setRunningNumbers] = useState([]);

    const [Profile, setProfile] = useState()

    const [loading, setloading] = useState(false);

    const [show, setShow] = useState(false);

    const [myLottery1, setMyLottery1] = useState("");
    const [myLottery2, setMyLottery2] = useState("");
    const [myLottery3, setMyLottery3] = useState("");
    const [MyLottery, setMyLottery] = useState([]);
    const [resultCheckMyLottery, setResultCheckMyLottery] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchLotteryData = async () => {
        await Axios.get("https://lotto.api.rayriffy.com/latest").then((res) => {
            setLotteryThailand(res.data.response.date);
            setPrizes(res.data.response.prizes);
            setRunningNumbers(res.data.response.runningNumbers);

            
           
        })

        await setloading(true);
    }

    useEffect(() => {

        fetchLotteryData();
    }, []);

    const checkyourlottery = async () => {
        // setMyLottery([myLottery1, myLottery2, myLottery3]);
        // console.log(MyLottery)
        // setResultCheckMyLottery([]);
        // MyLottery.map((mylot) => {
            //รางวัลที่ 1 ถึง 5
            // Prizes.map((prize) => {

            //     prize.number.map((number) => {

            //         if (number === mylot) {
            //             console.log("คุณถูกรางวัล  " + prize.name);
            //             return setResultCheckMyLottery(previous => [...previous, prize.name]);
            //         }
            //     })
            //     // setResultCheckMyLottery(previous => [...previous, "ไม่ถูกรางวัล"]);
            // })
            // //รางวัลเลขท้าย
            // RunningNumbers.map((run) => {
                
            // })
            
        // })
        
    }


    return (
        <div>
            {
                loading ?
                    //success
                    <div className="reward-lottery">

                        <div className="container pt-lg-4 p-0">
                            <div className="card-shadow">
                                <section className="header-lottery">
                                    <div>
                                        <h1>ผลสลากกินแบ่งรัฐบาล</h1>
                                        <h3>งวดประจำวันที่ {DateLotteryThailand}</h3>
                                    </div>
                                    <div className="check-your-lottery">
                                        <button className="check-your-lottery-btn" onClick={handleShow}> <i class="fas fa-search"> </i> ตรวจสลาก </button>
                                    </div>
                                </section>

                                <section className="prize-number-one">
                                    <div>
                                        <div className="prize-number-one-header">
                                            <h2>{Prizes[0].name}</h2>
                                            <h5>รางวัล ๆ ละ {Prizes[0].reward} บาท</h5>
                                        </div>

                                        <div className="prize-number-one-body">
                                            <span> {Prizes[0].number} </span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="prize-number-near-one">
                                            <div className="prize-number-near-one-header">
                                                <h4> {Prizes[1].name} </h4>
                                                <h6>รางวัล ๆ ละ {Prizes[1].reward} บาท</h6>
                                            </div>
                                            <div className="prize-number-near-one-body">
                                                {Prizes[1].number.map((number) => (
                                                    <div key={number}>{number}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="runningnumber">
                                    {RunningNumbers.map((run, index) => {
                                        return (
                                            <div key={index} className="item-runningnumber">
                                                <div className="item-runningnumber-header">
                                                    <h4>{run.name}</h4>
                                                    <h6>รางวัล ๆ ละ {run.reward} บาท</h6>
                                                </div>

                                                <div className="item-runningnumber-body">
                                                    {run.number.map((number, id) => (
                                                        <span key={id}> {number} </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )

                                    })}
                                </section>

                                <section className="prize-no2">
                                    <h5>{Prizes[2].name} <p>รางวัล ๆ ละ {Prizes[2].reward} บาท</p> </h5>
                                    <div>
                                        {Prizes[2].number.map((number) => (
                                            <span key={number}> {number} </span>
                                        ))}
                                    </div>
                                </section>

                                <section className="prize-no3">
                                    <h5>{Prizes[3].name} <p>รางวัล ๆ ละ {Prizes[3].reward} บาท</p>  </h5>
                                    <div>
                                        {Prizes[3].number.map((number) => (
                                            <span key={number}> {number} </span>
                                        ))}
                                    </div>
                                </section>

                                <section className="prize-no4">
                                    <h5>{Prizes[4].name} <p>รางวัล ๆ ละ {Prizes[4].reward} บาท</p> </h5>
                                    <div>
                                        {Prizes[4].number.map((number) => (
                                            <span key={number}> {number} </span>
                                        ))}
                                    </div>
                                </section>

                                <section className="prize-no5">
                                    <h5> {Prizes[5].name} <p>รางวัล ๆ ละ {Prizes[5].reward} บาท</p> </h5>
                                    <div>
                                        {Prizes[5].number.map((number) => (
                                            <span key={number}> {number} </span>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                        {console.log(profileData)}
                        <Modal
                            show={show}
                            onHide={() => setShow(false)}
                            size="md"
                            dialogClassName="modal-1"
                            aria-labelledby="example-custom-modal-styling-title"
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title">
                                    <h4>ตรวจสลากของคุณ</h4>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="box-check-lottery">
                                    <p>สลากใบที่ 1</p>
                                    <input type="text" maxLength="6" className="form-control" onChange={(event) => { setMyLottery1(event.target.value) }}></input>
                                </div>
                                {/* <div className="box-check-lottery">
                                    <p>สลากใบที่ 2</p>
                                    <input type="text" maxLength="6" className="form-control" onChange={(event) => { setMyLottery2(event.target.value) }}></input>
                                </div>
                                <div className="box-check-lottery">
                                    <p>สลากใบที่ 3</p>
                                    <input type="text" maxLength="6" className="form-control" onChange={(event) => { setMyLottery3(event.target.value) }}></input>
                                </div> */}
                                <div className="btn-checkyourlottery">
                                    <button type="text" onClick={checkyourlottery}>ตรวจสลาก</button>
                                </div>
                                {/* {console.log(MyLottery)} */}
                            </Modal.Body>
                        </Modal>
                    </div>


                    :
                    //loading
                    <div className="loader">Loading...</div>
            }


        </div>
    )
}

export default LotteryThailand;