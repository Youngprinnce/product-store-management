import axios from "../helpers/axios"
import { SIGNOUT_FAILURE, SIGNOUT_REQUEST, SIGNOUT_SUCCESS,  SIGNUP_REQUEST,  GET_ERROR } from "./constants"
import { isUserLoggedIn } from "./signinActions"


export const signup = (user, history, url) => {
    return async (dispatch) => {
        dispatch({ type: SIGNUP_REQUEST })
        await axios.post(`${url}`, { ...user })
            .then(res => {
                history.push("/signin?success=true")
            }).catch(err =>
                dispatch({
                    type: GET_ERROR,
                    payload: err.response
            }))
    }
}

export const signOut = () => {
    return async (dispatch) => {
        dispatch({ type: SIGNOUT_REQUEST });
        const res = await axios.post("/signout");
        if (res.status === 200) {
            localStorage.clear()
            dispatch({
                type: SIGNOUT_SUCCESS,
            })
        } else {
            dispatch({
                type: SIGNOUT_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}