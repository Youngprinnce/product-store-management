import loginReducer from "./signinReducers"
import signupReducer from "./signupReducers"
import productReducer from "./productReducers"
import errorReducer from "./errorReducers"
import {combineReducers} from "redux"

const rootReducer = combineReducers({
    auth: loginReducer,
    user: signupReducer,
    product: productReducer,
    error:errorReducer
});

export default rootReducer