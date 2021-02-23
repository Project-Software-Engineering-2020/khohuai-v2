import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Axios from 'axios';
import './LotteryThailand.css';

const LotteryThailand = () => {

    const [DateLotteryThailand, setLotteryThailand] = useState([]);
    const [Prizes, setPrizes] = useState([]);
    const [RunningNumbers, setRunningNumbers] = useState([]);
    const [loading, setloading] = useState(false);
    const [show, setShow] = useState(false);

    const initialInputList = [
        {
            myLot: "",
            result: []
        }
    ];

    const handleShow = () => {
        setShow(true);
        setInputList(initialInputList);
    }

    const [inputList, setInputList] = useState(initialInputList);
    const [inputErr, setInputErr] = useState("");

    const addInput = () => {
        if (inputList.length > 4) {
            return
        }
        else {
            const inputState = {
                myLot: "",
                result: []
            }
            setInputList((perv) => [...perv, inputState]);
        }

    }

    const removeInput = (index) => {
        const target = [...inputList];
        target.splice(index,1);
        return setInputList(target);
    }

    const handleInput = (index, event) => {

        // event.preventDefault();

        // if (typeof phone !== "undefined") {
        //     var phonepattern = new RegExp(/^(?=.*[0-9])/i);
        //     if (!phonepattern.test(phone)) {
        //         phoneErr.inputnumber = "กรุณากรอกเป็นตัวเลข";
        //     } else if (phone.length != 10) {
        //         phoneErr.tennumber = "กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก";
        //     }
        // }

        const list = [...inputList];
        list[index]["myLot"] = event.target.value;
        setInputList(list);
    }

    const fetchLotteryData = async () => {
        await Axios.get("https://lotto.api.rayriffy.com/latest").then((res) => {
            setLotteryThailand(res.data.response.date);
            setPrizes(res.data.response.prizes);
            setRunningNumbers(res.data.response.runningNumbers);
        })

        await setloading(true);
    }

    const checkyourlottery = async () => {

        let err = false;

        setInputErr("");

        await inputList.map((item, i) => {

            const list = [...inputList];
            list[i]["result"] = [];

            if (item.myLot.length !== 6) {
                setInputErr("กรุณากรอกเลขสลากให้ครบ 6 หลัก")
                err = true;
            }
            else return [];
            return [];
        })

        if (err === true) {
            return
        }
        else {
            setInputList(initialInputList);
            inputList.map((item, index) => {

                // setInputList(list);
                //รางวัลที่ 1 ถึง 5
                Prizes.map((prize) => {
                    prize.number.map((number) => {
                        if (number === item.myLot) {
                            const list = [...inputList];
                            list[index]["result"].push("ถูก" + prize.name);
                            setInputList(list);
                        }
                        return [];
                    })
                    return [];
                })

                var myLot = parseInt(item.myLot);
                var my3FirstLot = parseInt(myLot / 1000);
                var my3LastLot = myLot % 1000;
                var my2LastLot = myLot % 100;

                RunningNumbers.map((run) => {

                    run.number.map((number) => {
                        var numberInt = parseInt(number);
                        //รางวัลเลขหน้า 3 ตัว
                        if (numberInt === my3FirstLot && run.name === "รางวัลเลขหน้า 3 ตัว") {
                            const list = [...inputList];
                            list[index]["result"].push("ถูก" + run.name);
                            setInputList(list);
                        }
                        //รางวัลเลขท้าย 3 ตัว
                        if (numberInt === my3LastLot && run.name === "รางวัลเลขท้าย 3 ตัว") {
                            const list = [...inputList];
                            list[index]["result"].push("ถูก" + run.name);
                            setInputList(list);
                        }
                        //รางวัลเลขท้าย 2 ตัว
                        if (numberInt === my2LastLot && run.name === "รางวัลเลขท้าย 2 ตัว") {
                            const list = [...inputList];
                            list[index]["result"].push("ถูก" + run.name);
                            setInputList(list);
                        }
                        return [];
                    })
                    return [];

                })
                if (item.result.length === 0) {
                    console.log("ไม่ถูกรางวัล")
                    const list = [...inputList];
                    list[index]["result"].push("ไม่ถูกรางวัล");
                    setInputList(list);
                }
                return [];
            })
        }


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
                                        <h2>ผลสลากกินแบ่งรัฐบาล</h2>
                                        <h5>งวดประจำวันที่ {DateLotteryThailand}</h5>
                                    </div>
                                    <div className="check-your-lottery">
                                        <button className="check-your-lottery-btn" onClick={handleShow}> <i className="fas fa-search"> </i> ตรวจสลาก </button>
                                    </div>
                                </section>

                                <section className="prize-number-one">
                                    <div>
                                        <div className="prize-number-one-header">
                                            <h4>{Prizes[0].name}</h4>
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

                                {inputErr !== "" ?
                                    <div className="alert alert-danger">{inputErr}</div>
                                    :
                                    null
                                }
                                {inputList.map((item, index) => {

                                    //win = true สีเขียว
                                    //win = false สีแดง
                                    let win = item.result[0] !== "ไม่ถูกรางวัล" ? true : false
                                    return (
                                        <div 
                                            className= { win? "box-check-lottery" : "box-check-lottery" }          
                                            key={index}
                                        >
                                            <p>ใบที่ {index + 1}</p>
                                            <input type="text" maxLength="6" className="form-control" value={item.myLot} name="checkLottery" onChange={(e) => handleInput(index, e)} />
                                            <div className="result-check-lot">
                                                {item.result.map((r, i) => {
                                                    return (
                                                        <p key={i}> {r} </p>
                                                    )
                                                })}
                                            </div>
                                            <button onClick={e => removeInput(index)} className="remove-input"><i class="fas fa-times"></i></button>
                                        </div>
                                    )
                                })}
                                <div className="btn-input-checklot">
                                    <button type="button" onClick={addInput}><i class="fas fa-plus-circle"> </i> เพิ่มสลาก </button>
                                </div>
                                <div className="btn-checkyourlottery">
                                    <button type="text" onClick={checkyourlottery}>ตรวจสลาก</button>
                                </div>
                                {/* <pre>
                                    {JSON.stringify(inputList, null, 2)}
                                </pre> */}
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