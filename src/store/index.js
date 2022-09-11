import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth'
import AddressReducer from './address'
import UserReducer from './user'
import jwtExpire from "../Components/common/jwtExpire"

const token = localStorage.getItem('token');


if(token){
    jwtExpire(token)
}

const store = configureStore({
    reducer:{
        "auth":AuthReducer,
        "address":AddressReducer,
        "user":UserReducer,
    }
})

export default store;