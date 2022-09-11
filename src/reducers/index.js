import { combineReducers } from 'redux';
import auth from './auth';
import dashboard from './dashboard';




const appReducer = combineReducers({
        auth,
        dashboard,



});

const rootReducer = (state, action) => {
    return appReducer(state, action)
  }
  
  export default rootReducer;