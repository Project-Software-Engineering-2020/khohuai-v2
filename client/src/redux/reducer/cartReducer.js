const initialState = {
  totalItem: 0,
  totalSelect: 0,
  totalPrice: 0,
  cart: [],
  selected: []
};

function Cart(state = initialState, action) {

  function SumTotal() {
    let totalSelect = 0;
    let totalPrice = 0;
    let totalItem = 0;
    let ArraySelected = [];

    state.cart.map((item) => {
      totalItem += item.qty;

      if (item.selected === true) 
      {
        const Currentprice = item.qty * 80;
        totalPrice += Currentprice;
        totalSelect += item.qty;
        ArraySelected.push(item);
      }
    });
    return (state = {
      ...state,
      totalSelect: totalSelect,
      totalPrice: totalPrice,
      totalItem: totalItem,
      selected: ArraySelected
    });
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

    case "SET_CART":

      state = {
        ...state,
        cart: action.data
      }
      SumTotal();

      return state
    // case "ADD_TO_CART":
    //   const thisLottery = action.data;

    //   let inCart = undefined;
    //   // inCart = true  มีอยู่ตะกร้า
    //   // inCart = false  ไม่มีในตะกร้า

    //   if (state.cart.length > 0) {
    //     // ตรวจสอบว่าเคย add แล้วหรือยัง
    //     inCart = state.cart.find((item) => {
    //       return item.id === thisLottery.id ? true : false;
    //     });
    //   } else {
    //     //เพิ่มลงตะกร้าครั้งแรก
    //     inCart = false;
    //   }

    //   state = {
    //     ...state,
    //     cart: inCart
    //       ? //inCart = true มีอยู่ในตะกร้าแล้ว
    //         state.cart.map((item) => {
    //           //วนหา item ที่มี id ตรงกัน
    //           return item.id === thisLottery.id
    //             ? // เพิ่มจำนวน qty + 1
    //               { ...item, qty: item.qty + 1 }
    //             : item;
    //         })
    //       : //inCart = false ไม่มีในตะกร้า
    //         [
    //           ...state.cart,
    //           {
    //             id: thisLottery.id,
    //             number: thisLottery.number,
    //             photoURL: thisLottery.photoURL,
    //             qty: 1,
    //             selected: false
    //           },
    //         ],
    //   };

    //   SumTotal();
    //   return state;

    // case "ADJUST_QTY":
    //   const id = action.id;
    //   const _qty = action.qty;

    //   state = {
    //     ...state,
    //     cart: state.cart.map((item) => {
    //       return item.id === id ? { ...item, qty: item.qty + _qty } : item;
    //     }),
    //   };

    //   SumTotal();
    //   return state;

    // case "INCREASE_ITEM":
    //   const id1 = action.id;
    //   const qty1 = action.qty;

    //   state = {
    //     ...state,
    //     cart: state.cart.map((item) => {
    //       return item.id === id1
    //         ? // เพิ่มจำนวน qty + 1
    //           { ...item, qty: item.qty + 1 }
    //         : item;
    //     }),
    //   };

    //   SumTotal();
    //   return state;

    // case "REMOVE_FROM_CART":
    //   const _id = action.data.id;

    //   state = {
    //     ...state,
    //     cart: state.cart.filter((item) => item.id !== _id),
    //   };

    //   SumTotal();
    //   return state;

    // case "CLEAR_CART":
    //   state = initialState;
    //   return state;

    // case "GET_CART":
    //   return state;

    case "SELECT_ITEM_CART":

      const id_item = action.id;
      const tik = action.select;
      // console.log(id_item);
      state = {
        ...state,
        cart: state.cart.map((item) => {
          
          return item.id === id_item ?
            //เปลี่ยนค่า item ที่เลือก true และ false
            {
              ...item,
              selected: tik
            }
            :
            item
        }
        ),
      };
      SumTotal();

      return state;

    default:
      return state;
  }
}

export default Cart;
