import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    SIGNUP,
    

} from './types';

import { apiCall } from "../api";
import { baseUrl } from '../constants/const';



export const loginAction = (data) => async dispatch => {
    let config = {
        method: 'post',
        headers: {},
        url: `${baseUrl}user/login`,
        data,
    }
    let response = await apiCall(config, dispatch)
    if (response.data.status) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response
        })
    } else {
        dispatch({
            type: LOGIN_FAILED,
            payload: response
        })
    }
}


export const AddingUser = (data) => async dispatch => {
    let config = {
        method: 'post',
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
        url: `${baseUrl}user/register`,
        data
    }
    let response = await apiCall(config, dispatch)
    dispatch({
        type: SIGNUP,
        payload: response
    })
    
}


export const changeLoginFailedStatus = (data) => async dispatch => {
    dispatch({
        type: LOGIN_FAILED,
        payload: data
    })
}
export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT,
        payload: ''
    })
}


