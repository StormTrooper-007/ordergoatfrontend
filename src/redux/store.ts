import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import fetchOrderReducer from "./reducers/fetchOrderReducer";
import jwt_decode from "jwt-decode";

export const composeEnhancer =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  myorders: fetchOrderReducer,
});

function removeToken(store: any) {
  return function (next: any) {
    return function (action: any) {
      const token: any = JSON.parse(localStorage.getItem("token") as any);
      const decoded = token && (jwt_decode(token) as any).exp;
      if (token && decoded < Date.now() / 1000) {
        next(action);
        localStorage.clear();
      }
      next(action);
    };
  };
}

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(thunk, removeToken))
);

export default store;

export type rootState = ReturnType<typeof reducers>;
