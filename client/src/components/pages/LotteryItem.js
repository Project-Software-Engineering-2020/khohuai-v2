import React, { useState, useEffect } from 'react';
import './LotteryItem.css'

const LotteryItem = (props) => {
    const [item, setItem] = useState();

    const addtoCart = () => {

    }

    return (
        <div className="lottery-item">

            <figure className="lottery-item-image">
                <a href="/product/">
                    <img src="./images/lottery-demo1.jpg"></img>
                </a>
            </figure>
            <button onChange={addtoCart} className="add-to-cart"><i className="fas fa-cart-plus"> </i> เพิ่มลงในตะกร้า</button>
        </div>
    )
}

export default LotteryItem;