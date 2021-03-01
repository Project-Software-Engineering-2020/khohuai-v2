import React from 'react'
import { NavLink } from 'react-router-dom'
import './Reward.css';
const Reward = () => {

    return (
        <div className="container mt-3 p-3 bg-white">
            <header className="header-purchase-page">
                <NavLink to="/purchase" activeClassName="purchase-item-active" className="purchase-item">
                    ประวัติการซื้อ   
                </NavLink>
                <NavLink to="/reward" activeClassName="purchase-item-active" className="purchase-item">
                    การรับรางวัล
                </NavLink>
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

export default Reward