import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
//Reducer
import authReducer from "./reducer/authReducer";
import mycart from "./reducer/cartReducer";
import profile from "./reducer/profileReducer";

// ******Combine Reducers******
const rootReducer = combineReducers({
  auth: authReducer,
  cart: mycart,
  profile: profile,
});

const PersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};

const persitReducer = persistReducer(PersistConfig, rootReducer);

// ******Create Store******
const store = createStore(
  persitReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persister = persistStore(store);

export { store, persister };

// const loadState = () => {
//     try {
//       const serializedState = localStorage.getItem('store')
//       if (serializedState === null) {
//         return undefined
//       } else {
//         return JSON.parse(serializedState)
//       }
//     } catch (error) {
//       return undefined
//     }
// };

// const saveState = (state) => {
//     try {
//       const serializedState = JSON.stringify(state)
//       localStorage.setItem('store', serializedState)
//     } catch (error) {
//       console.log(error.message)
//     }
// };

// const persistStore = loadState();
// const store = createStore(rootReducer, persistStore);

// store.subscribe(() => {
//   saveState(store.getState())
// });

// export default store;
