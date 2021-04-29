import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './LottoDetail.css';
import Lottoryitem from "./LotteryItem";

const LottoDetail = (props) => {

    //รับค่า id จาก URL
    const lotteryID = props.match.params.id;


    const [lottery, setLottery] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [loading, setloading] = useState(false);


    const [count, setCount] = useState(1);

    const plus = () => {
        setCount(count + 1);
    };

    const minnus = () => {
        setCount(count - 1);
    };

    useEffect(async () => {

        const fetchData = async () => {

            //get detail
            await Axios.get("https://khohuai-server.herokuapp.com/lottery/" + lotteryID).then((lot) => {
                setLottery(lot.data);
            })

            //get recommended 
            await Axios.get("https://khohuai-server.herokuapp.com/lottery").then((lot) => {
                setRecommended(lot.data);
            })

            await setloading(true);
        }
        await fetchData();
    }, [])

    return (
        <div>
            <div className="container">
                {loading ? 
                <div className="lottery-detail-page">
                    <section className="lottery-show">
                        <div>
                            <figure className="lottery-item-image">
                                <img src={lottery.photoURL}></img>
                            </figure>
                        </div>
                        <div className="info-lot">
                            <div>
                                <p>ราคาใบละ 80 บาท</p>
                                
                                <div className="min-plus-input">
                                    <button type="button" onClick={minnus}><i className="fas fa-minus"></i></button>
                                    <input type="text" value={count} onChange={(e) => setCount(e.target.value)}/>
                                    <button type="button" onClick={plus}> <i className="fas fa-plus"></i> </button>
                                </div>
                                
                            </div>
                            <div className="group-btn-add-buy">
                                <button className="add-cart">เพิ่มลงในตะกร้า</button>
                                <button className="buy-now">ซื้อสลากใบนี้</button>
                            </div>
                        </div>
                    </section>
                    <section className="lottery-near-number">
                        <p> เลขสลากใกล้เคียง</p>
                        <div>

                            {recommended.map((item, index) => {
                                if (index < 4) {
                                    return (
                                        <Lottoryitem key={index} data={item} />
                                    )
                                }

                            })}

                        </div>

                        {/* <div className="recommend-body">
                        </div> */}
                    </section>
                </div>
                : 
                    <div className="loading">loading...</div>
                }

            </div>
        </div>
    )
}
export default LottoDetail;


// const [dataState, setDataState] = useState({ count : 0 });

// const plus = () => {
//     setDataState({
//         count : dataState.count + 1
//     });
// }

// const minnus = () => {
//     setDataState({
//         count : dataState.count - 1 
//      });
// }

// return (
//     <div className="App container">
//         <h1>Product</h1>
//         <div className="card m-5">
//             <div className="card-header">
//                 <h3>Bossza in bottle</h3>
//             </div>
//             <div className="card-body">
//                 <h1>{dataState.count}</h1>
//             </div>
//             <div className="card-footer">
//                 <span><button className="btn btn-success" onClick={plus}>เพิ่ม</button></span>
//                 <span><button className="btn btn-danger" onClick={minnus}>ลด</button></span>
//             </div>
//         </div>
//     </div>
// )
// }