import React, {useState, useEffect} from "react"
import Lottoryitem from "./LotteryItem"
import './foryou.css';
import Axios from "axios";

const Foryou = ()=> {

    const [data, setData] = useState();
    const [loading, setloading] = useState(false);


    const FetchData = async () => {
        await Axios.get("http://localhost:3001/lottery").then((lot) => {
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
            <div className="recommend-header">
                <span>แนะนำสำหรับคุณ </span>
                
            </div>
            {loading ? 
            <div className="recommend-body">

                {data.map((item,index) => {
                    return (
                        <Lottoryitem key={index} photo={item.photoURL} id={item.id}></Lottoryitem>
                    )
                    
                })}

            </div>
            :
            <div className="loader">Loading...</div>
            }
            
        </div>

    )
}
export default Foryou
