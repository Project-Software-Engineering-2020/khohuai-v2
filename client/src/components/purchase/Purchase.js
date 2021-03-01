import React from 'react'
import './Purchase.css';
const Invoice = () => {

    return (
        <div className="container mt-3 p-3 bg-white">
            <header className="header-purchase-page">
                <div className="purchase-item">
                    ประวัติการซื้อ   
                </div>
                <div className="purchase-item">
                    การรับรางวัล
                </div>
            </header>
            <div className="history-user-buy">
                <div className="card">
                    <div className="card-header">วันที่ซื้อ</div>
                    <div className="card-body">สลาก</div>
                </div>
            </div>
        </div>
    )
}

export default Invoice

