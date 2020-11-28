import axios from "../helpers/axios"
import { GET_ERROR, SIGNIN_FAILURE, SIGNIN_REQUEST, SIGNIN_SUCCESS } from "./constants"


export const login = (user) => {
    return async (dispatch) => {
        dispatch({ type: SIGNIN_REQUEST })
        await axios.put("/signin", { ...user })
            .then(res => {
                const { token, user } = res.data.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch({
                    type: SIGNIN_SUCCESS,
                    payload: {
                        token,
                        user,
                    }
                });
            }).catch(error => {
                dispatch({
                    type: GET_ERROR,
                    payload: error.response
                });
        })  
    }
}

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch({
                type: SIGNIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: SIGNIN_FAILURE,
                payload: {
                    error: "Failed to login"
                }
            });
        }
    }
}
