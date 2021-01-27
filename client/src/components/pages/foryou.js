import React, { useState, useEffect } from "react"
import Lottoryitem from "./LotteryItem"
import './foryou.css';
import Axios from "axios";
import { useSelector } from 'react-redux';

const Foryou = () => {

    const stetus = useSelector(state => state.auth)
    const stotus = stetus.status;

    let datb = [];
    const [data, setData] = useState();
    const [recommendedData, setRecommendedData] = useState();
    const [loading, setloading] = useState(false);


    const FetchData = async () => {
        await Axios.get("http://localhost:3001/lottery").then((lot) => {
            setData(lot.data);
            datb = lot.data;
            console.log(lot.data);
        })
        await setloading(true);
    }

    const recommended = () => {
        if(!stotus){
            //random
        }
        else{
            //check bought
                //...
            //shuffle last 2 digit
            let recommendedArray = [];
            console.log('datb : ', datb);
            datb.map((item, index) => {
                if (index < 4) {
                    let itemNum = parseInt(item.number);
                    itemNum = (10 * (itemNum % 10)) + parseInt((itemNum % 100) / 10)
                    recommendedArray.push(itemNum);
                }
            })
            setRecommendedData(recommendedArray);
            console.log("recommendedData : ", recommendedArray);
        }
    }

    useEffect( async () => {
        await FetchData();
        await recommended();
        //console.log(data);
    }, [])

    return (
        <div>
            <div className="recommend-header">
                <span>แนะนำสำหรับคุณ </span>

            </div>
            {loading ?
                <div className="recommend-body">
                    {data.map((item, index) => {
                        if (index < 4) {
                            return (
                                <Lottoryitem key={index} photo={item.photoURL} id={item.id}></Lottoryitem>
                            )
                        }

                    })}

                </div>
                :
                <div className="loader">Loading...</div>
            }

        </div>

    )
}
export default Foryou
