import React, { useState, useEffect } from "react"
import Lottoryitem from "../shop/LotteryItem"
import './hot.css';
import Axios from "axios";
import { api } from '../../environment'

const Hot = () => {

    const [data, setData] = useState();
    const [loading, setloading] = useState(false);


    

    useEffect(async() => {

        const FetchData = async () => {
            await Axios.get(api + "/lottery/aos").then((lot) => {
                setData(lot.data);
            })
            await setloading(true);
        }

        await FetchData();
    }, [])


    return (
        <div>
            <div className="hot-header">
                <span>กำลังจะหมด </span>

            </div>
            {loading ?
                <div className="hot-body">
                    {data.map((item, index) => {
                        // if (index < 4) {
                            return (
                                <Lottoryitem key={index} data={item} ></Lottoryitem>
                            )
                        // }

                    })}
                    {/* <div>
                    <button className="other"> ดูเพิ่มเติม</button>
                </div> */}
                </div>
                :
                <div className="loader">Loading...</div>
            }


        </div>

    )
}
export default Hot
