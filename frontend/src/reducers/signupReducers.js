import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../actions/constants"

const initState = {
    error: null,
    message:"",
    loading:false
}

export default (state = initState, action)=>{
    switch (action.type) {
        case SIGNUP_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        
        case SIGNUP_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        
        case SIGNUP_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }

    return state;
}