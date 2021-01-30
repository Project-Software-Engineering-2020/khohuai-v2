import React from 'react';
import { useDispatch, useSelector } from 'react-redux' 
import './LotteryItem.css'

const LotteryItem = (data) => {


    const dispatch = useDispatch();
    const mycart = useSelector(state => state.cart);

    const addtoCart = () => {
        dispatch({ type:"add_to_cart", id: data.id})
    }
    // useEffect(async ()  => {
    //     await setLottery(data)
    //     await setloading(false);
    // }, [])

    return (
        <div className="lottery-item">
            {console.log(mycart)}
            <figure className="lottery-item-image">
                <a href={"/product/"+ data.id} >
                    <img src={ data.photo }></img>
                </a>
            </figure>
            <button onClick={addtoCart} className="add-to-cart"><i className="fas fa-cart-plus"> </i> เพิ่มลงในตะกร้า</button>
        </div>
       
    )
}

export default LotteryItem;