import React from 'react';
import { useDispatch } from 'react-redux' 
import './LotteryItem.css'

const LotteryItem = ({data}) => {

    const dispatch = useDispatch();

    const addtoCart = () => {
        dispatch({ type:"add_to_cart", item: data })
    }
    // useEffect(async ()  => {
    //     await setLottery(data)
    //     await setloading(false);
    // }, [])

    return (
        <div className="lottery-item">
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