import axios from "axios";
import { userloading, addUserSuccess, deleteUserSuccess, editUserSuccess, userFail } from "../Features/Users/userSlice";
import { allUsersFail, allUsersLoading, allUsersSuccess } from "../Features/Users/usersSlice";

// const API = process.env.REACT_APP_API_LINK;
const API = "https://crudcrud.com/api/9e5ba878ac5848f899bb735e9eac962f/users";

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(userloading());
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.delete(`${API}/${id}`, config);
        dispatch(deleteUserSuccess(id));
    } catch (error) {
        dispatch(userFail("Something went wrong."));
    }
};

export const getAllUsers = () => async (dispatch) => {

    try {
        dispatch(allUsersLoading());
        const apiResponse = await axios.get(`${API}`);
        dispatch(allUsersSuccess(apiResponse.data));

    } catch (error) {
        dispatch(allUsersFail("Something went wrong."));
    }
};

export const addUser = (userData) => async (dispatch) => {
    try {
        dispatch(userloading());
        const config = {
            header: { "Content-type": "multipart/form-data" },
        };
        const { data } = await axios.post(`${API}`, userData, config);
        dispatch(addUserSuccess(data));
    } catch (error) {
        dispatch(userFail("Something went wrong."));
    }
}

export const editUser = (id, user) => async (dispatch) => {
    try {
        dispatch(userloading());
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.put(`${API}/${id}`, user, config);
        dispatch(editUserSuccess({ ...user, _id: id }));

    } catch (error) {
        dispatch(userFail("Something went wrong."));
    }
}
