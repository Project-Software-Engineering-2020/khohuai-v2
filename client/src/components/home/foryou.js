import React, { useState, useEffect } from "react"
import Lottoryitem from "../shop/LotteryItem"
import './foryou.css';
import Axios from "axios";
import { useSelector } from 'react-redux';

const Foryou = () => {

    const stetus = useSelector(state => state.auth)
    const stotus = stetus.status;
    
    const [recommendedData, setRecommendedData] = useState();
    const [loading, setloading] = useState(false);


    const [data, setData] = useState();

    useEffect(() => {

        let datb = [];
        const FetchData = async () => {

            await Axios.get("http://localhost:3001/lottery/recommended").then((lot) => {
                setData(lot.data);
                datb = lot.data;
            })

            await setloading(true);

        }

        const recommended = () => {
            if (!stotus) {
                //random
            }
            else {
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
                    return item;
                })
                setRecommendedData(recommendedArray);
                console.log("recommendedData : ", recommendedArray);
            }
        }

        FetchData();
        recommended();
    }, [stotus])

    return (
        <div>
            <div className="recommend-header">
                <span>แนะนำสำหรับคุณ </span>

            </div>
            {loading ?
                <div className="recommend-body">
                    {data.map((item, k) => {
                        if (k < 4) {
                            return (
                                <Lottoryitem key={k} data={item} />
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
