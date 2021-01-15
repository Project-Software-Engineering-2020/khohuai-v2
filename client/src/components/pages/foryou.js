import React from "react"
import Lottoryitem from "./LotteryItem"
import './foryou.css';



const Foryou = ()=> {
    return (
        <div>
            <div className="recommend-header">
                <span>แนะนำสำหรับคุณ </span>
                
            </div>

            <div className="recommend-body">
                
                <Lottoryitem/>
                <Lottoryitem/>
                <Lottoryitem/>
                <Lottoryitem/>
            </div>
        </div>

    )
}
export default Foryou
