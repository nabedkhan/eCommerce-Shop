import {
    ADMIN_USER_SUCCESS,
    NEW_USER_FAILED,
    NEW_USER_SUCCESS,
    SIGN_IN_USER_FAILED,
    SIGN_IN_USER_SUCCESS,
    USER_AUTH_TOKEN_FAILED,
    USER_AUTH_TOKEN_SUCCESS,
    USER_LOG_OUT
} from "../types/userLoginTypes";

export function userLogin(state = { userInfo: {} }, action) {
    switch (action.type) {
        case NEW_USER_SUCCESS:
            return {
                userInfo: action.payload,
                success: true,
            }
        case NEW_USER_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case SIGN_IN_USER_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                success: true
            }
        case SIGN_IN_USER_FAILED:
            return {
                ...state,
                error: action.payload,
                success: false
            }
        case USER_LOG_OUT:
            return {
                ...state,
                userInfo: action.payload,
                token: action.payload,
                success: false,
            }
        case USER_AUTH_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.payload
            }
        case USER_AUTH_TOKEN_FAILED:
            return {
                ...state,
                tokenError: action.payload
            }
        default:
            return state;
    }
}