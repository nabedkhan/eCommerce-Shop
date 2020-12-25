import axios from "axios";
import {
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS
} from "../types/productsType";

// get all products from the database
export const getProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCTS_REQUEST
        });
        const { data } = await axios.get('https://nameless-inlet-35485.herokuapp.com/products');
        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_FAIL,
            payload: error
        })
    }
}

// get product details from the database
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCTS_DETAILS_REQUEST
        });
        const { data } = await axios.get(`https://nameless-inlet-35485.herokuapp.com/products/${id}`);
        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
            payload: error
        })
    }
}

// get my order from the database
export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_ORDERS_REQUEST
        });
        const { token, userInfo: { email } } = getState().userLoginInfo;
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }
        const { data } = await axios.get(`https://nameless-inlet-35485.herokuapp.com/myOrders?email=${email}`, config);
        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.message
        })
    }
}