import { saveAuthCred, removeCred } from '../localStorage';
const axios = require('axios')
require('dotenv').config()
const url = process.env.REACT_APP_API_URL
var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');


export const signUp = (credentials) => {
    return async (dispatch, getState) => {
        try {
            let loading = getState().auth.loading = true
            const signUpResponse = await axios.post(`${url}/api/v1/signup`, credentials, { withCredentials: true })
            loading = getState().auth.loading = false
            dispatch({ type: 'SIGNUP_SUCCESS', payload: signUpResponse })
        }
        catch (error) {
            dispatch({ type: 'SIGNUP_FAILURE', error })
        }
    }
}

export const getUserInfo = () => {
    return async (dispatch, getState) => {
        try {
            const getUser = await axios.get(`${url}/api/v1/user/me`, { withCredentials: true })
            dispatch({ type: 'GET_USER_SUCCESS', payload: getUser.data.data })
        }
        catch (error) {
            dispatch({ type: 'GET_USER_FAILURE', error })
        }
    }
}



export const authenticate = () => {
    return async (dispatch, getState) => {
        try {
            let loading = getState().auth.loading = true
            const authenticate = await axios.get(`${url}/api/v1/auth`, { withCredentials: true })
            const { userId, exp, isAdministrator } = await authenticate.data.userCred
            saveAuthCred('user_auth_cred', { userId, exp, isAdministrator })
            loading = getState().auth.loading = false
            dispatch({ type: 'AUTH_SUCCESS', payload: authenticate.data.userCred, loading })
        }
        catch (error) {
            dispatch({ type: 'AUTH_FAILURE', error })
        }
    }
}

export const signIn = (credentials) => {
    return async (dispatch, getState) => {
        try {
            let loading = getState().auth.loading = true
            const signInResponse = await axios.post(`${url}/api/v1/signin`, credentials, { withCredentials: false })
            // let authenticate
            // if (await signInResponse.status === 200) {
                
            //     authenticate = await axios.get(`${url}/api/v1/auth`, { withCredentials: true })
            //     const { userId, exp, isAdministrator } = await authenticate.data.userCred
            //     alert(userId)
            //     saveAuthCred('user_auth_cred', { userId, exp, isAdministrator })
            // }

            loading = getState().auth.loading = false
            dispatch({ type: 'SIGNIN_SUCCESS', payload: signInResponse, loading })
        }
        catch (error) {
            dispatch({ type: 'SIGNIN_FAILURE', error })
        }
    }
}


export const forgotPassword = (credentials) => {
    return async (dispatch, getState) => {
        try {
            let loading = getState().auth.loading = true
            const forgotPassword = await axios.post(`${url}/api/v1/auth/forgot-password`, credentials, { withCredentials: true })
            loading = getState().auth.loading = false
            dispatch({ type: 'FORGOT_PASSWORD_SUCCESS', payload: forgotPassword, loading })
        }
        catch (error) {
            dispatch({ type: 'FORGOT_PASSWORD_FAILURE', error })
        }
    }
}

export const resetPassword = (credentials) => {
    return async (dispatch, getState) => {
        try {
            let loading = getState().auth.loading = true
            const resetPassword = await axios.patch(`${url}/api/v1/auth/reset-password`, credentials, { withCredentials: true })
            loading = getState().auth.loading = false
            dispatch({ type: 'RESET_PASSWORD_SUCCESS', payload: resetPassword, loading })
        }
        catch (error) {
            dispatch({ type: 'RESET_PASSWORD_FAILURE', error })
        }
    }
}

export const activateAccount = (credentials) => {
    return async (dispatch, getState) => {
        try {
            let loading = getState().auth.loading = true
            const activateAccount = await axios.patch(`${url}/api/v1/account/activation`, credentials, { withCredentials: true })
            loading = getState().auth.loading = false
            dispatch({ type: 'ACCOUNT_ACTIVATION_SUCCESS', payload: activateAccount.data, loading })
        }
        catch (error) {
            dispatch({ type: 'ACCOUNT_ACTIVATION_FAILURE', error })
        }
    }
}

export const signOut = () => {
    return async (dispatch, getState) => {
        try {
            let loading = getState().auth.loading = true
            const signOut = await axios.get(`${url}/api/v1/sign-out`, { withCredentials: true });
            if (signOut.status === 200) {
                saveAuthCred('user_auth_cred', {})
            }
            loading = getState().auth.loading = false
            dispatch({ type: 'SIGN_OUT_SUCCESS', payload: signOut, loading })
        }
        catch (error) {
            dispatch({ type: 'SIGN_OUT_FAILURE', error })
        }
    }
}