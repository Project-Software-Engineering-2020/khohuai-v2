import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const LotteryThailand = () => {

    const [DateLotteryThailand, setLotteryThailand] = useState([]);
    const [Prizes, setPrizes] = useState([]);

    const [RunningNumbers, setRunningNumbers] = useState([]);
    // const [RunningNumbers3, setRunningNumbers3] = useState([]);

    const [prizeNo1, setPrizeNo1] = useState([]);
    const [prizeNearNo1, setPrizeNearNo1] = useState({});
    // const [prizeNo2, setPrizeNo2] = useState([]);
    // const [prizeNo3, setPrizeNo3] = useState([]);
    // const [prizeNo4, setPrizeNo4] = useState([]);

    useEffect(() => {
        async function fetchLotteryData() {
            await Axios.get("https://lotto.api.rayriffy.com/latest").then((res) => {
                setLotteryThailand(res.data.response.date);
                setPrizes(res.data.response.prizes);
                setPrizeNo1(res.data.response.prizes[0]);
                setPrizeNearNo1(res.data.response.prizes[1]);

                setRunningNumbers(res.data.response.runningNumbers);
                // setRunningNumbers3(res.data.response.runningNumbers[0]);
            })
        }
        fetchLotteryData();
    }, []);

    return (
        <div className="reward-lottery">
            <div className="container">
                <div className="card-shadow">
                    <h1>ผลการออกสลากกินแบ่งรัฐบาล</h1>
                    <h5>งวดประจำวันที่ {DateLotteryThailand}</h5>
                    <div className="row mt-5">
                        <div className="col-lg-4 col-12">
                            <h3>{prizeNo1.name}</h3>
                            <h5>รางวัลละ {prizeNo1.reward} บาท</h5>
                            <div className="reward-number-one">
                                <span> {prizeNo1.number} </span>
                            </div>
                        </div>

                        {/* <div className="col-lg-4 col-12">
                            <div className="">
                                <h3> {prizeNearNo1.name} </h3>
                                <h6>รางวัลละ {prizeNearNo1.reward} บาท</h6>
                                <div className="runningnumber">
                                    {console.log(prizeNearNo1)}
                                    {prizeNearNo1.number.forEach((number) => (
                                        <span key={number}> {number} </span>
                                    ))}
                                </div>
                            </div>
                        </div> */}

                        <div className="col-lg-4 col-12">


                            {/* <h3>{RunningNumbers3.name}</h3>
                            <h6>รางวัลละ {RunningNumbers3.reward} บาท</h6>
                            
                            <div>
                                <span><h1> {RunningNumbers3.number[0]} {RunningNumbers3.number[1]} </h1></span>
                            </div>
                            <div>
                                {RunningNumbers3.number.map((r3, id) => (
                                        <span key={id}> &nbsp;&nbsp;{r3}&nbsp;&nbsp; </span>
                                    )
                                )}
                            </div> */}
                        </div>



                        {/* <div className="col-3">
                            <h3>{prizeNo1.name}</h3>
                            <h6>รางวัลละ {prizeNo1.reward} บาท</h6>
                            <div>
                                {prizeNo1.number.map((number, id) => (
                                    <h1 key={id}> {number} </h1>
                                ))}
                            </div>
                        </div> */}
                        {/* <div className="col-2">
                            <h3>{prizeNo1.name}</h3>
                            <h6>รางวัลละ {prizeNo1.reward} บาท</h6>
                            <div>
                                {prizeNo1.number.map((number, id) => (
                                    <h1 key={id}> {number} </h1>
                                ))}
                            </div>
                        </div> */}
                    </div>

                    <div className="row mt-5">
                        {RunningNumbers.map((run, index) => {
                            return (
                                <div key={index} className="col-4">
                                    <h3>{run.name}  </h3>
                                    <h6>รางวัลละ {run.reward} บาท</h6>
                                    <div className="runningnumber">
                                        {run.number.map((number, id) => (
                                            <span key={id}> {number} </span>
                                        ))}
                                    </div>

                                </div>
                            )

                        })}
                    </div>
                </div>

                {Prizes.map((prize, index) => {
                    return (
                        <div key={index}>
                            <h3>{prize.name} รางวัลละ {prize.reward} บาท </h3>

                            <div>
                                {prize.number.map((number, id) => (
                                    <span key={id}> &nbsp;&nbsp;{number}&nbsp;&nbsp; </span>
                                ))}
                            </div>

                        </div>
                    )

                })}


            </div>
        </div>
    )
}



// class LotteryThailand extends Component {


//     state = {
//         lottery : [],
//         error : false
//     }

//     fetchLotteryData() {
//         Axios.get("https://lotto.api.rayriffy.com/latest").then((Response) => {
//             const lottery = Response.data;
//             this.setState({lottery});
//         })
//     }

//     componentDidMount() {
//         this.fetchLotteryData();
//         // fetch("https://lotto.api.rayriffy.com/list/1").then((res) => res.json())
//         //     .then((res) => this.setState({Lottery : res}))
//         //     .catch(() => this.setState({Error: true}));
//     }

//     render() {
//         return (
//             <div>
//                 {console.log(this.state.lottery)}
//                 {console.log(this.state.lottery.response)}
//                 {/* <h1>{this.state.lottery}</h1> */}
//                 {this.state.lottery.response.map((val, key) => (
//                     console.log(val+key)
//                     // <div className="card">
//                     //     <div className="card-header">{val.name}</div>
//                     // </div>
//                 ))}
//             </div>
//         )
//     }
// }


export default LotteryThailand;