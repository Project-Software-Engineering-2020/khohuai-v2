import authReducer from './reducer/authReducer';
import mycart from './reducer/cartReducer';
import { combineReducers } from 'redux';

 
const rootReducer = combineReducers({
    auth: authReducer,
    cart: mycart
});

export default rootReducer;