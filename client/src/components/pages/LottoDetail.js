import React, { useState } from 'react';
import './LottoDetail.css'
import Lottoryitem from "./LotteryItem";

const LottoDetail = () => {

    return (
        <div>
            <div className="container">
                <div className="lottery-detail-page">
                    <section className="lottery-show">
                        <div>
                            <figure className="lottery-item-image">
                                <img src="./images/lottery-demo1.jpg"></img>
                            </figure>
                        </div>
                        <div>
                            <div>
                                <p>ใบละ 80 บาท</p>
                                <p>คงเหลือ 9 ใบ</p>
                                <input type="number"></input>
                            </div>
                            <div className="group-btn-">
                                <button>เพิ่มลงในตะกร้า</button>
                                <button>ซื้อสลากใบนี้</button>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div>
                            เลขสลากใกล้เคียง
                        </div>
                        <div className="lottery-near-number">
                            <Lottoryitem/>
                            <Lottoryitem/>
                            <Lottoryitem/>
                            <Lottoryitem/>
                            
                        </div>
                    </section>
                </div>

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