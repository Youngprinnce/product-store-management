import axios from "../helpers/axios";
import {
    ADD_PRODUCT_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS
} from "./constants";

export const addProduct = (form) => {
    return async (dispatch) => {
        dispatch({type:ADD_PRODUCT_REQUEST})
        const res = await axios.post("/product", form);
        if (res.status === 201) {
            dispatch({
                type: ADD_PRODUCT_SUCCESS,
                payload:res.data
            })
            dispatch(getProducts())
        } else {
            dispatch({
                type: ADD_PRODUCT_FAILURE,
                payload:res.success
            })
        }
    }
}

export const getProducts = () => {
    return async (dispatch) => {
        dispatch({ type: GET_PRODUCTS_REQUEST })
        const res = await axios.get("/product");
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_PRODUCTS_FAILURE,
                payload: res.success
            })
        }
    }
}

export const deleteProduct = (id, form) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_PRODUCT_REQUEST })
        const res = await axios.delete(`/product/${id}`, form);
        console.log(res)
        if (res.status === 200) {
            dispatch(getProducts())
            dispatch({
                type: DELETE_PRODUCT_SUCCESS,
                payload: res.success
            })
        } else {
            dispatch({
                type: DELETE_PRODUCT_FAILURE,
                payload: res.success
            })
        }
    }
}

export const updateProduct = (form, id) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const res = await axios.put(`/product/${id}`, form);
        if (res.status === 200) {
            dispatch(getProducts())
            dispatch({
                type: UPDATE_PRODUCT_SUCCESS,
                payload: res.success
            })
        } else {
            dispatch({
                type: UPDATE_PRODUCT_FAILURE,
                payload: res.success
            })
        }
    }
}