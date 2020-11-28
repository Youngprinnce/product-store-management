import { GET_ERROR } from "../actions/constants"

const initState = {
   error:{}
}

export default (state = initState, action) => {
    switch (action.type) {
        case GET_ERROR:
            state = {
                ...state,
                error: action.payload.data
            }
            break;
        default:
            return state
    }

    return state;
}