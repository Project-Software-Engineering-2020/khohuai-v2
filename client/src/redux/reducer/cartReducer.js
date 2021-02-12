const initialState = {
    totalPrice: 0,
    totalItem: 0,
    cart: []
}

function Cart(state = initialState, action) {

    //sum total in cart
    function SumTotal() {
        let totalPrice = 0;
        let itemInCart = 0;
        state.cart.map((item) => {
           
            const Currentprice = item.qty * 80
            totalPrice = totalPrice + Currentprice;

            itemInCart = itemInCart + item.qty;
         
            return totalPrice,itemInCart;
        })
        return totalPrice,itemInCart;
    }

    // function SumTotalItem() {
    //     let itemInCart = 0;
    //     state.cart.map((item) => {
      
    //         itemInCart = itemInCart + item.qty;
         
    //         return itemInCart;
    //     })
    //     return itemInCart;
    // }


    switch (action.type) {

        case 'ADD_TO_CART':

            // state = initialState

            const thisLottery = action.data;

            let inCart = undefined;
            // inCart = true  มีอยู่ตะกร้า 
            // inCart = false  ไม่มีในตะกร้า

            if (state.cart.length > 0) {

                // ตรวจสอบว่าเคย add แล้วหรือยัง 
                inCart = state.cart.find((item) => {
                    return item.id === thisLottery.id ? true : false;
                })

            }
            else {
                //เพิ่มลงตะกร้าครั้งแรก
                inCart = false;
            }

            state = {
                ...state,
                cart: inCart ?

                    //inCart = true มีอยู่ในตะกร้าแล้ว
                    state.cart.map((item) => {
                        //วนหา item ที่มี id ตรงกัน
                        return (

                            item.id === thisLottery.id ?
                                // เพิ่มจำนวน qty + 1
                                { ...item, qty: item.qty + 1 }

                                :
                                item
                        )
                    })

                    :
                    //inCart = false ไม่มีในตะกร้า
                    [...state.cart,
                    {
                        id: thisLottery.id,
                        number: thisLottery.number,
                        photoURL: thisLottery.photoURL,
                        qty: 1
                    }
                    ],
            }

            let TotalPrice_1, TotalItem_1 = SumTotal();
            state = {
                ...state,
                totalPrice: TotalPrice_1,
                totalItem: TotalItem_1
            }

            return state;

        case 'ADJUST_QTY':

            const id = action.id;
            const _qty = action.qty;

            state = {
                ...state,
                cart: state.cart.map((item) => {
                    return (
                        item.id === id ?

                            { ...item, qty: item.qty + _qty }
                            :
                            item
                    )

                })
            }

            let TotalPrice_2, TotalItem_2 = SumTotal();
            state = {
                ...state,
                totalPrice: TotalPrice_2,
                totalItem: TotalItem_2
            }

            return state;

        case 'REMOVE_FROM_CART':

            const _id = action.data.id;

            state = {
                ...state,
                cart: state.cart.filter((item => item.id !== _id))
            }

            let TotalPrice_3, TotalItem_3 = SumTotal();
            state = {
                ...state,
                totalPrice: TotalPrice_3,
                totalItem: TotalItem_3
            }

            return state;

        case 'CLEAR_CART':

            state = initialState;
            return state;

        case 'GET_CART':
            return state;

        default:
            return state;
    }
}

export default Cart;