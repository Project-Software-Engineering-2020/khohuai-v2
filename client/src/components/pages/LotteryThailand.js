import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Axios from 'axios';
const LotteryThailand = () => {

    const [DateLotteryThailand, setLotteryThailand] = useState([]);
    const [Prizes, setPrizes] = useState([]);
    const [RunningNumbers, setRunningNumbers] = useState([]);

    const [loading, setloading] = useState(false);

    const [show, setShow] = useState(false);

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
                                        <button className="check-your-lottery-btn"> <i class="fas fa-search"> </i> ตรวจสลาก </button>
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

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                        </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                        </Button>
                            </Modal.Footer>
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