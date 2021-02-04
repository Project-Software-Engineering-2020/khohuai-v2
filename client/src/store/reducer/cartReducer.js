const initialState = {
    totalPrice: 0,
    cart: []
}

function Cart(state = initialState, action) {

    //sum total price in cart
    function SumTotalPrice() {
        let total = 0
        state.cart.map((item) => {
            console.log(80, "X", item.qty)
            const price = item.qty * 80
            console.log(total, "+", price);
            total = total + price;
            console.log("total = ", total);
            return total;
        })
        return total;
    }

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

            //sum price
            state = {
                ...state,
                totalPrice: SumTotalPrice()
            }

            console.log(state)
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

            //sum price
            state = {
                ...state,
                totalPrice: SumTotalPrice()
            }

            return state;

        case 'REMOVE_FROM_CART':

            const _id = action.data.id;

            state = {
                ...state,
                cart: state.cart.filter((item => item.id !== _id))
            }

            //sum price
            state = {
                ...state,
                totalPrice: SumTotalPrice()
            }

            return state;

        case 'CLEAR_CART':

            state = initialState;
            return state;

        default:
            return state;
    }

}

export default Cart;