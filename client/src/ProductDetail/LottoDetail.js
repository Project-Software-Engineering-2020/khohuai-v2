import React , { useState } from 'react';

const LottoDetail = () => {
    const [dataState, setDataState] = useState({ count : 0 });

    const plus = () => {
        setDataState({
            count : dataState.count + 1
        });
    }

    const minnus = () => {
        setDataState({
            count : dataState.count - 1 
         });
    }

    return (
        <div className="App container">
            <h1>Product</h1>
            <div className="card m-5">
                <div className="card-header">
                    <h3>Bossza in bottle</h3>
                </div>
                <div className="card-body">
                    <h1>{dataState.count}</h1>
                </div>
                <div className="card-footer">
                    <span><button className="btn btn-success" onClick={plus}>เพิ่ม</button></span>
                    <span><button className="btn btn-danger" onClick={minnus}>ลด</button></span>
                </div>
            </div>
        </div>
    )
}

export default LottoDetail;