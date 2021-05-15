import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
//Reducer
import authReducer from "./reducer/authReducer";
import mycart from "./reducer/cartReducer";
import profile from "./reducer/profileReducer";
import purchase from "./reducer/purchaseReducer";
import purchase_Detail from "./reducer/purchaseDetailReducer";
import reward from "./reducer/rewardReducer";
import alertReducer from "./reducer/alertReducer";
import ngudReducer from "./reducer/ngudReducer";
import tokenRudecer from "./reducer/tokenRudecer";
import newuser from './reducer/newuserReducer';
// ******Combine Reducers******
const rootReducer = combineReducers({
  auth: authReducer,
  cart: mycart,
  profile: profile,
  purchase: purchase,
  purchase_detail:purchase_Detail,
  reward: reward,
  alert: alertReducer,
  ngud: ngudReducer,
  token: tokenRudecer,
  newuser: newuser
});

//redux persit manage local storage
const PersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth","cart","purchase_detail","token","newuser"],
};
const persitReducer = persistReducer(PersistConfig, rootReducer);

// ******Create Store******
const store = createStore(
  persitReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persister = persistStore(store);
export { store, persister };
