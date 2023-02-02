import axios from "axios";
import { ADD_USER_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS, ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERRORS, CLEAR_MESSAGE, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstants";

// const API = process.env.REACT_APP_API_LINK;
const API = "https://crudcrud.com/api/f392f9d834e84e92ab3a53e92ef5f3b9";


// clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

// clear message
export const clearMessage = () => async (dispatch) => {
    dispatch({
        type: CLEAR_MESSAGE,
    });
};

// delete user
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.delete(`${API}/users/${id}`, config);

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// get all users
export const getAllUsers = () => async (dispatch) => {

    try {
        dispatch({ type: ALL_USERS_REQUEST });

        const config = {
            header: { "Content-type": "application/json" },
        };

        const { data } = await axios.get(`${API}/users`, config);

        dispatch({ type: ALL_USERS_SUCCESS, payload: [...data] });

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const addUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_USER_REQUEST });

        const config = {
            header: { "Content-type": "multipart/form-data" },
        };

        const { data } = await axios.post(`${API}/users`, userData, config);

        dispatch({ type: ADD_USER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: ADD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const editUser = (id, user) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`${API}/users/${id}`, user, config);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
}

// get user details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const { data } = await axios.get(`${API}/users/${id}`);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};