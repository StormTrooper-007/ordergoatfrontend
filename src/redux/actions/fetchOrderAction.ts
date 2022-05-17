import axios from "axios";
import { Dispatch } from "redux";
import { OrderActionType } from "../types/getOrdersTypes";

export function fetchOrders() {
  return async (dispatch: Dispatch) => {
    const res = await axios.get("https://stark-hollows-08546.herokuapp.com/api/v1/orders", {
      withCredentials: true,
    });
    const myorders = await res.data;
    dispatch({ type: OrderActionType.ORDER_SUCCESS, payload: myorders });
  };
}
