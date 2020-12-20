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

// get all products reducers
export function getProductsReducer(state = { products: [] }, action) {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return {
                loading: true
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case GET_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

// get product details reducers
export function productDetailsReducer(state = { product: {} }, action) {
    switch (action.type) {
        case PRODUCTS_DETAILS_REQUEST:
            return {
                loading: true
            }
        case PRODUCTS_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCTS_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

// get product details reducers
export function myOrdersReducers(state = { orderList: [] }, action) {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                loading: true
            }
        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orderList: action.payload
            }
        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}