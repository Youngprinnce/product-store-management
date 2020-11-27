import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNOUT_FAILURE, SIGNOUT_REQUEST, SIGNOUT_SUCCESS } from "../actions/constants";

const initState = {
    token: null,
    user: {
        username: "",
        email: "",
        role:""
    },
    authenticate: false,
    authenticating: false,
    error: "",
};

export default (state = initState, action) => {
    switch (action.type) {
        case SIGNIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;

        case SIGNIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
            }
            break;
        
        case SIGNOUT_REQUEST:
            state = {
                ...initState,
                loading: true
            }
            break;

        case SIGNOUT_SUCCESS:
            state = {
                ...initState,
                loading:false
            }
            break;

        case SIGNOUT_FAILURE:
            state = {
                ...initState,
                error: action.payload.error,
                loading: false
            }
            break;
    }

    return state;

}