import { ADD_TO_CART_PRODUCT, CLEAR_CART_ITEMS, REMOVE_FROM_CART_PRODUCT, USER_SHIPPING_ADDRESS } from "../types/cartTypes";

const initialState = {
    cartItems: [],
    shippingAddress: {},
};

export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART_PRODUCT:
            const item = action.payload;
            const existingItem = state.cartItems.find(x => x.id === item.id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(pro => pro.id === existingItem.id ? item : pro)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_FROM_CART_PRODUCT:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload)
            }
        case USER_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: { ...action.payload, success: true }
            }
        case CLEAR_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload
            }
        default:
            return state;
    }
}