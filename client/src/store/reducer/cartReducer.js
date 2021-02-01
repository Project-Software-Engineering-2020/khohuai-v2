const initialState = []

function Cart(state = initialState , action) {

    switch (action.type) {
        
        case 'add_to_cart':
            console.log(action);
            // state = []
            
            state = [...state ,action.item];

            if(state.includes(action.item.id === state.id)) {
                break;
            }
            else{
                 state = [...state ,action.item];
            }            

            console.log(state)
            return state;

        case 'remove_from_cart':
            console.log(action);
            state = {
                ...state,
                uid : action.id,
            };
            console.log("Remove to cart Success")
            return state;
        default :
            return state;
    }
    return state;
    
}

export default Cart;