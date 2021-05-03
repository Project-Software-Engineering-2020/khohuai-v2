const initialState = {
  totalItem: 0,
  totalSelect: 0,
  totalPrice: 0,
  discount: 0,
  check: true,
  cart: [],
  selected: [],
  message: ""
};

function Cart(state = initialState, action) {
  function SumTotal() {
    let totalSelect = 0;
    let totalPrice = 0;
    let totalItem = 0;
    let ArraySelected = [];

      state.cart.map((item) => {
        totalItem += item.qty;

        if (item.selected === true) {
          const Currentprice = item.qty * 80;
          totalPrice += Currentprice;
          totalSelect += item.qty;
          ArraySelected.push(item);
        }
      })


    return (state = {
      ...state,
      totalSelect: totalSelect,
      totalPrice: totalPrice,
      totalItem: totalItem,
      selected: ArraySelected
    });
  }

  function RemoveDiscount() {
    let price = state.totalPrice;
    let discount = state.discount;
    price += discount;
    return (state = {
      ...state,
      totalPrice: price,
      discount: 0
    });
  }

  switch (action.type) {

    case "CALCULATE_CART": 

      return SumTotal();

    case "SET_CART":
      state = {
        ...state,
        cart: action.data,
        message: action.message
      };

      return state;

    case "SELECT_ITEM_CART":
      const id_item = action.id;
      const tik = action.select;
      // console.log(id_item);
      state = {
        ...state,
        cart: state.cart.map((item) => {
          return item.id === id_item
            ? //เปลี่ยนค่า item ที่เลือก true และ false
            {
              ...item,
              selected: tik,
            }
            : item;
        }),
      };
      SumTotal();

      return state;

    case "SELECT_ALL":
      const allCheck = action.check;

      state = {
        ...state,
        cart: state.cart.map((item) => {
          return {
            ...item,
            selected: !allCheck,
          };
        }),
        check: !allCheck,
      };
      SumTotal();

      return state;

    case "USE_COIN":
      const coin = action.coin;

      state = {
        ...state,
        totalPrice: state.totalPrice - coin,
        discount: coin
      }

      return state;

    case "UNUSE_COIN":

      return RemoveDiscount();

    default:
      return state;
  }
}

export default Cart;
