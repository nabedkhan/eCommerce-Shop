import Axios from "axios";
import { createNewUserWithEmail, generateToken, signInWithEmail } from "../../firebase/firebase";
import {
    NEW_USER_SUCCESS,
    NEW_USER_FAILED,
    SIGN_IN_USER_SUCCESS,
    SIGN_IN_USER_FAILED,
    USER_LOG_OUT,
    USER_AUTH_TOKEN_SUCCESS,
    USER_AUTH_TOKEN_FAILED,
    ADMIN_USER_SUCCESS
} from "../types/userLoginTypes";

export const newUserCreation = (email, password) => async (dispatch, getState) => {
    try {
        const { user } = await createNewUserWithEmail(email, password);
        dispatch({
            type: NEW_USER_SUCCESS,
            payload: {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
                id: user.uid
            }
        });

        localStorage.setItem('userInfo', JSON.stringify(getState().userLoginInfo.userInfo));

    } catch (error) {
        dispatch({
            type: NEW_USER_FAILED,
            payload: error.message
        })
    }
}

export const loginUser = (email, password) => async (dispatch, getState) => {
    try {
        const { user } = await signInWithEmail(email, password);
        dispatch({
            type: SIGN_IN_USER_SUCCESS,
            payload: {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
                id: user.uid
            }
        });

        localStorage.setItem('userInfo', JSON.stringify(getState().userLoginInfo.userInfo));

    } catch (error) {
        dispatch({
            type: SIGN_IN_USER_FAILED,
            payload: error.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    dispatch({
        type: USER_LOG_OUT,
        payload: {}
    });

    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
}

export const generateAuthToken = () => async (dispatch, getState) => {
    try {
        const idToken = await generateToken();
        dispatch({
            type: USER_AUTH_TOKEN_SUCCESS,
            payload: idToken
        });

        localStorage.setItem('token', JSON.stringify(getState().userLoginInfo.token));
    } catch (error) {
        dispatch({
            type: USER_AUTH_TOKEN_FAILED,
            payload: error.message
        });
    }
}