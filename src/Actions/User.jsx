import axios from "axios";
import { ADD_USER_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS, ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstants";

// const API = process.env.REACT_APP_API_LINK;
const API = "https://crudcrud.com/api/f757a53d019b4232a74e147e38d2b4a6/users";

// delete user
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        await axios.delete(`${API}/${id}`, config);

        dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: "Something went wrong.",
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

        const { data } = await axios.get(`${API}`, config);

        dispatch({ type: ALL_USERS_SUCCESS, payload: [...data] });

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: "Something went wrong.",
        });
    }
};

export const addUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_USER_REQUEST });

        const config = {
            header: { "Content-type": "multipart/form-data" },
        };
        const { data, status } = await axios.post(`${API}`, userData, config);
        if (status === 201)
            dispatch({ type: ADD_USER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: ADD_USER_FAIL,
            payload: "Something went wrong.",
        });
    }
}

export const editUser = (id, user) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const res = await axios.put(`${API}/${id}`, user, config);
        if (res.status === 200)
            dispatch({ type: UPDATE_USER_SUCCESS, payload: { ...user, _id: id } });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: "Something went wrong.",
        });
    }
}

// get user details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const { data } = await axios.get(`${API}/${id}`);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: "Something went wrong.",
        });
    }
};