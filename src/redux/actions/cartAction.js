import axios from "axios";
import {
    ADD_TO_CART_PRODUCT, REMOVE_FROM_CART_PRODUCT, USER_SHIPPING_ADDRESS
} from "../types/cartTypes";

export const addToCartProduct = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`https://nameless-inlet-35485.herokuapp.com/products/${id}`);
    dispatch({
        type: ADD_TO_CART_PRODUCT,
        payload: {
            id: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            qty
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCartProduct = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART_PRODUCT,
        payload: id
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const userShippingInfo = (info) => (dispatch) => {
    dispatch({
        type: USER_SHIPPING_ADDRESS,
        payload: info
    });
}