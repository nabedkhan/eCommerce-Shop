import axios from "axios";
import {
    USER_PLACE_ORDER_FAILED,
    USER_PLACE_ORDER_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILED
} from "../types/orderTypes"
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
        const { data } = await axios.post('https://nameless-inlet-35485.herokuapp.com/orderComplete', order);

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

export const orderDetails = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });
        const { token } = getState().userLoginInfo;
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        const { data } = await axios.get(`https://nameless-inlet-35485.herokuapp.com/orders/${orderId}`, config);
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAILED,
            payload: error.message
        })
    }
}