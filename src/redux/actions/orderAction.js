import axios from "axios";
import { USER_PLACE_ORDER_FAILED, USER_PLACE_ORDER_SUCCESS } from "../types/orderTypes"
import { CLEAR_CART_ITEMS } from "../types/cartTypes";

export const placeOrder = (info, paymentResult) => async (dispatch) => {
    try {
        const order = {
            ...info,
            paymentResult: {
                id: paymentResult.id,
                status: paymentResult.status,
                email: paymentResult.payer.email_address,
                name: paymentResult.payer.name,
            },
            delivered: false,
            paidAt: new Date()
        }
        const { data } = await axios.post('http://localhost:5000/orderComplete', order);

        dispatch({
            type: USER_PLACE_ORDER_SUCCESS,
            payload: data
        });

        dispatch({
            type: CLEAR_CART_ITEMS,
            payload: []
        });

        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: USER_PLACE_ORDER_FAILED,
            payload: error.message
        })
    }
}