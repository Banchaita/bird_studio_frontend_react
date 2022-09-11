import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import toast from "../Components/common/toast"

const initialToken = localStorage.getItem('token') ? localStorage.getItem('token') : null

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        isloading: false,
        user: null,
        token: initialToken,
        signupMessage: "",
        loginMessage: "",
        email: "",
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setLoading: (state, action) => {
            state.isloading = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        signupSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user_data;
            localStorage.setItem('token', state.token)
        },
        signupFailure: (state, action) => {
            state.signupMessage = action.payload.response.message;
        },
        otpSuccess: (state, action) => {
            state.user = action.payload.user_data;
        },
        otpFailure: (state, action) => {
            state.otpMessage = action.payload.response.message;
        },
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user_data;
            localStorage.setItem('token', state.token)
        },
        loginFailure: (state, action) => {
            state.loginMessage = action.payload.response.message;
        },
        logoutSuccess: (state, action) => {
            state.token = null;
            state.user = null;
            state.loginMessage = "";
            localStorage.removeItem('token')
        }
    }
})

export const { setAuth, setLoading, setEmail, setUser, signupSuccess, signupFailure, otpSuccess, otpFailure, loginSuccess, loginFailure, logoutSuccess } = authSlice.actions

export const signup = ({ name, email, password }) => async dispatch => {
    try {
        dispatch(setLoading(true))
        let signupResponse = await api.post('user/register', { name, email, password })
        if (signupResponse.data.status) {
            let token = signupResponse.data.data.token
            let user_data = signupResponse.data.data.userdata
            dispatch(signupSuccess({ token, user_data }));
        } else {
            dispatch(signupFailure({ response: signupResponse.data }))
        }
    } catch (e) {
        return console.error("signup ==> ", e);
    } finally {
        dispatch(setLoading(false))
    }
}

export const verify_otp = ({ otp }) => async dispatch => {
    try {
        dispatch(setLoading(true))
        let otpResponse = await api.post('user/verify_otp', { otp }, { headers: { Authorization: `Bearer ${initialToken}` } })
        if (otpResponse.data.status) {
            dispatch(setAuth(true))
            let user_data = otpResponse.data.data
            dispatch(otpSuccess({ user_data }));
        } else {
            dispatch(otpFailure({ response: otpResponse.data }))
        }
    } catch (e) {
        return console.error(e);
    } finally {
        dispatch(setLoading(false))
    }
}

export const verify_forgot_otp = (data) => async dispatch => {
    try {
        dispatch(setLoading(true))
        let { otp, email, history } = data;
        let otpResponse = await api.post('user/verify_otp_email', { otp, email })
        if (otpResponse.data.status) {
            history.push('/change_password')
        } else {
            dispatch(otpFailure({ response: otpResponse.data }))
        }
    } catch (e) {
        return console.error(e);
    } finally {
        dispatch(setLoading(false))
    }
}

export const change_password = ({ email, password, history }) => async dispatch => {
    try {
        dispatch(setLoading(true))
        let passResponse = await api.post('user/change_password', { email, password })
        if (passResponse.data.status) {
            toast.success(passResponse.data.message)
            history.push('/login')
        } else {
            toast.error(passResponse.data.message)
        }
    } catch (e) {
        return console.error(e);
    } finally {
        dispatch(setLoading(false))
    }
}

export const login = ({ email, password }) => async dispatch => {
    try {
        dispatch(setLoading(true))
        let loginResponse = await api.post('user/login', { email, password })
        if (loginResponse.data.status) {
            let token = loginResponse.data.data.token
            let user_data = loginResponse.data.data.userdata
            dispatch(loginSuccess({ token, user_data }));
            dispatch(setEmail(email));
        } else {
            dispatch(loginFailure({ response: loginResponse.data }))
        }
    } catch (e) {
        return console.error(e);
    } finally {
        dispatch(setLoading(false))
    }
}

export const resend_otp = (email, history) => async dispatch => {
    try {
        dispatch(setLoading(true))
        dispatch(setEmail(email))
        let resendOtpResponse = await api.post('user/resend_otp', { email })
        if (resendOtpResponse.data.status) {
            toast.success(resendOtpResponse.data.message)
            history.push('/forgot_otp')
        } else {
            toast.error(resendOtpResponse.data.message)
        }
    } catch (e) {
        return console.error(e);
    } finally {
        dispatch(setLoading(false))
    }
}

export const get_user_detail = () => async dispatch => {
    try {
        dispatch(setLoading(true))
        let userResponse = await api.post('user/get_user_detail', { headers: { Authorization: `Bearer ${initialToken}` } })
        if (userResponse.data.status) {
            dispatch(setUser(userResponse.data.data))
        }
    } catch (e) {
        return dispatch(logout())
    } finally {
        dispatch(setLoading(false))
    }
}

export const logout = () => async dispatch => {
    try {
        dispatch(setAuth(false))
        return dispatch(logoutSuccess())
    } catch (e) {
        return console.error(e);
    }
}

export default authSlice.reducer