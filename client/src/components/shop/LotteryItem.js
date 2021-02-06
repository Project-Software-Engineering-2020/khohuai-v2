import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import './LotteryItem.css'

let OmiseCard;

const LotteryItem = ({data}) => {



    const dispatch = useDispatch();
       
    const addtoCart = () => {
        dispatch({ type:"ADD_TO_CART", data: data })
    }
    useEffect(async ()  => {
        // await setLottery(data)
        // await setloading(false);
    }, [])

    return (

        <div className="lottery-item">
            
            <figure className="lottery-item-image">
                <a href={"/product/" + data.id} >
                    <img src={data.photoURL}></img>
                </a>
            </figure>
            <form>
                <button id="creditcard" className="btn" type="button" onClick={addtoCart}><i className="fas fa-cart-plus"> </i> เพิ่มลงในตะกร้า</button>
            </form>
            
        </div>

    )
}

export default LotteryItem;