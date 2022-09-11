import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    



} from "../actions/types";

// const initialToken = localStorage.getItem('token') ? localStorage.getItem('token') : null
// console.log('initialToken',initialToken)


const initialState = {
    is_authenticated: false,
    token: '',
    loginMessage: null,
    forgotStatus: null,
    emailCheck: null,
    otpStatus: null,
    ressetpasswordStatus: [],
    adminitertor_data:[]
    
};


export default (state = initialState, action) => {

    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            
            localStorage.setItem('token', payload.data.data.token)
            return {
                ...state,
                is_authenticated: true,
                token: payload.token
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loginMessage: payload.data.message
            };
            case LOGOUT:
                localStorage.removeItem('tokenData')
                return {
                    ...state,
                    admin_data: {},
                    is_authenticated: false,
                    token: ''
                };
                
        
        default:
            return state;
    }
}


