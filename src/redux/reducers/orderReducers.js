import {
    ORDER_DETAILS_FAILED,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    USER_PLACE_ORDER_FAILED,
    USER_PLACE_ORDER_SUCCESS
} from "../types/orderTypes";

export function placeOrderReducers(state = {}, action) {
    switch (action.type) {
        case USER_PLACE_ORDER_SUCCESS:
            return {
                complete: action.payload
            }
        case USER_PLACE_ORDER_FAILED:
            return {
                error: action.payload
            }
        default:
            return state;
    }
}

export function orderDetailsReducers(state = { order: {} }, action) {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}