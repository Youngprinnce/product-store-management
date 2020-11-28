import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE
} from "../actions/constants";

const initialState = {
    products: [],
    loading: false,
    message:""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case GET_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.data,
                loading: false
            }
            break;
        case GET_PRODUCTS_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
        default:
            return state
    }
    return state;
}