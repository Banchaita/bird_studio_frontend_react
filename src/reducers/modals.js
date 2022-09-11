import {
    SIGNUP_MODAL

    
} from "../actions/types";

const initialState = {
    showaSignupModal:false,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case  SIGNUP_MODAL:
            return {
                ...state,
                showaSignupModal: payload,
            };
            
           
        
        default:
            return state;
    }
}