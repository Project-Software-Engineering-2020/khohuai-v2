import React, { useState, useEffect } from "react"
import Lottoryitem from "../shop/LotteryItem"
import './foryou.css';
import Axios from "axios";
import { useSelector } from 'react-redux';
import { api } from '../../environment'
const Foryou = () => {

    const stetus = useSelector(state => state.auth)
    const stotus = stetus.status;

    const [recommendedData, setRecommendedData] = useState();
    const [loading, setloading] = useState(false);


    const [data, setData] = useState();

    useEffect(async () => {

        let datb = [];
        const FetchData = async () => {

            await Axios.get(api + "/lottery/recommended").then((lot) => {
                setData(lot.data);
                datb = lot.data;
            })

            await setloading(true);

        }

        await FetchData();
    }, [stotus])

    return (
        <>
            {loading ?
                <div className="recommend">
                    <div className="recommend-header">
                        <span>แนะนำสำหรับคุณ </span>
                    </div>

                    <div className="recommend-body">
                        
                        {data.map((item, k) => {

                            return (
                                <Lottoryitem key={k} data={item} number={2} />
                            )

                        })}

                    </div>
                </div>
                :
                null
                // <div className="loader">Loading...</div>
            }

        </>

    )
}
export default Foryou
