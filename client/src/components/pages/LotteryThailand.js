import React, { useState, useEffect, Component } from 'react';
import Axios from 'axios';

// const RewardLotty = () => {

//     const [LotteryThailand, setLotteryThailand] = useState([]);

//     function fetchLotteryData() {
//         Axios.get("https://lotto.api.rayriffy.com/latest").then((Response) => {
//             setLotteryThailand(Response.data);
//         })
//     }

//     useEffect(() => {
//         fetchLotteryData();
//     }, []);


//     return(
//         <div>
//             {console.log(LotteryThailand)}
//             <h1>{LotteryThailand.response.date}</h1>
//             {/* {LotteryThailand.response.prizes.forEach(val => {
//                 <div className="card">
//                     <div className="card-header">{val.name}</div>
//                 </div>
//             })} */}
//             {/* {
//                 array.forEach(element => {

//                 });
//             } */}
//         </div>
//     )
// } 



class LotteryThailand extends Component {

    constructor(props) {
        super(props)
        this.state = []
    }


    fetchLotteryData() {
        Axios.get("https://lotto.api.rayriffy.com/latest").then((Response) => {
            this.setState(Response.data);
        })
    }

    componentDidMount() {
        this.fetchLotteryData();
    }

    render() {
        return (
            <div>
                {console.log(this.state)}
                <h1>{this.state.response.date}</h1>
                {this.state.response.prizes.forEach(val => {
                    <div className="card">
                        <div className="card-header">{val.name}</div>
                    </div>
                })}
            </div>
        )
    }
}


export default LotteryThailand;