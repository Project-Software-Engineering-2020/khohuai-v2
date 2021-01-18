import React, { useState, useEffect } from "react"
import Lottoryitem from "./LotteryItem"
import './hot.css';
import Axios from "axios";


const Hot = () => {

    const [data, setData] = useState();
    const [loading, setloading] = useState(false);


    const FetchData = async () => {
        await Axios.get("http://192.168.1.150:3001/lottery").then((lot) => {
            setData(lot.data);
            console.log(lot.data);
        })
        await setloading(true);
    }

    useEffect(() => {
        FetchData();
        console.log(data);
    }, [])


    return (
        <div>
            <div className="hot-header">
                <span>กำลังจะหมด </span>

            </div>
            {loading ?
                <div className="hot-body">
                    {data.map((item, index) => {
                        if (index < 4) {
                            return (
                                <Lottoryitem key={index} photo={item.photoURL} id={item.id}></Lottoryitem>
                            )
                        }

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
