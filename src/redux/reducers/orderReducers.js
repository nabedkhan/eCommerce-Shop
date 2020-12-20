import { USER_PLACE_ORDER_FAILED, USER_PLACE_ORDER_SUCCESS } from "../types/orderTypes";

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