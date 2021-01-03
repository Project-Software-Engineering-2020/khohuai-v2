import React, { useState, useEffect } from 'react';
import Axios from 'axios';
const LotteryThailand = (p) => {

    const [DateLotteryThailand, setLotteryThailand] = useState([]);
    const [Prizes, setPrizes] = useState([]);
    const [RunningNumbers, setRunningNumbers] = useState([]);

    const [loading, setloading] = useState(false);

    const fetchLotteryData = async () => {
        await Axios.get("https://lotto.api.rayriffy.com/latest").then((res) => {
            setLotteryThailand(res.data.response.date);
            setPrizes(res.data.response.prizes);
            setRunningNumbers(res.data.response.runningNumbers);
        })

        setloading(true);
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
                        <div className="container pt-5">
                            <div className="card-shadow">
                                <h1 className="header-lottery">ผลการออกสลากกินแบ่งรัฐบาล</h1>
                                <h3>งวดประจำวันที่ {DateLotteryThailand}</h3>
                                <div className="row mt-5">
                                    <div className="col-lg-7 col-12 prize-number-one">
                                        <div className="prize-number-one-header">
                                            <h2>{Prizes[0].name}</h2>
                                            <h5>รางวัลละ {Prizes[0].reward} บาท</h5>
                                        </div>
                                        
                                        <div className="prize-number-one-body">
                                            <span> {Prizes[0].number} </span>
                                        </div>
                                    </div>

                                    <div className="col-lg-5 col-12">
                                        <div className="prize-number-near-one">
                                            <div className="prize-number-near-one-header">
                                                <h4> {Prizes[1].name} </h4>
                                                <h6>รางวัลละ {Prizes[1].reward} บาท</h6>
                                            </div>
                                            <div className="prize-number-near-one-body">
                                                {Prizes[1].number.map((number) => (
                                                    <div key={number}> {number} </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <section className="runningnumber">
                                    {RunningNumbers.map((run, index) => {
                                        return (
                                            <div key={index} className="item-runningnumber">
                                                <div className="item-runningnumber-header">
                                                    <h4>{run.name}</h4>
                                                    <h6>รางวัลละ {run.reward} บาท</h6>
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
                                    <h5>{Prizes[2].name} รางวัลละ {Prizes[2].reward} บาท </h5>
                                    <div>
                                        {Prizes[2].number.map((number) => (
                                            <span key={number}> {number} </span>
                                        ))}
                                    </div>
                                </section>

                                <section className="prize-no3">
                                    <h5>{Prizes[3].name} รางวัลละ {Prizes[3].reward} บาท </h5>
                                    <div>
                                        {Prizes[3].number.map((number) => (
                                            <span key={number}> {number} </span>
                                        ))}
                                    </div>
                                </section>

                                <section className="prize-no4">
                                    <h5>{Prizes[4].name} รางวัลละ {Prizes[4].reward} บาท </h5>
                                    <div>
                                        {Prizes[4].number.map((number) => (
                                            <span key={number}> {number} </span>
                                        ))}
                                    </div>
                                </section>

                                <section className="prize-no5">
                                    <h5>{Prizes[5].name} รางวัลละ {Prizes[5].reward} บาท </h5>
                                    <div>
                                        {Prizes[5].number.map((number) => (
                                            <span key={number}> {number} </span>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    :
                    //loading
                    <div className="loader">Loading...</div>
            }
        </div>
    )
}

export default LotteryThailand;