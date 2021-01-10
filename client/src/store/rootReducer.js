import authReducer from './reducer/authReducer';
import { combineReducers } from 'redux';

 
const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;