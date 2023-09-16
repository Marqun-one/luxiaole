import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./auth/Reducer";

// const store = createStore(
//     combineReducers({Reducer}),
//     applyMiddleware(thunk)
// );
const store =createStore(
    reducer,
    applyMiddleware(thunk))
export default store;