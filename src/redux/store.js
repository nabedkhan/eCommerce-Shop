import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { placeOrderReducers } from "./reducers/orderReducers";
import { getProductsReducer, myOrdersReducers, productDetailsReducer } from "./reducers/productsReducers";
import { userLogin } from "./reducers/userLoginReducers";
const reducers = combineReducers({
    getProductList: getProductsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLoginInfo: userLogin,
    order: placeOrderReducers,
    myOrders: myOrdersReducers
});
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
const tokenFromStorage = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: {}
    },
    userLoginInfo: {
        userInfo: userInfoFromStorage,
        token: tokenFromStorage
    }
};
const middleware = [thunk];
export const store = createStore(reducers, initialState, composeWithDevTools(
    applyMiddleware(...middleware)
))