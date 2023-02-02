const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    loading: false,
    userData: {},
    message: "",
    deletedId: "",
    editedUser: {},
    isAdded: false,
    isDeleted: false,
    isEdited: false,
};

const userlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userloading: (state) => {
            state.loading = true;
        },
        addUserSuccess: (state, { payload }) => {
            state.loading = false;
            state.isAdded = true;
            state.userData = payload;
        },
        deleteUserSuccess: (state, { payload }) => {
            state.loading = false;
            state.isDeleted = true;
            state.deletedId = payload;
        },
        editUserSuccess: (state, { payload }) => {
            state.loading = false;
            state.isEdited = true;
            state.editedUser = payload;
        },
        userFail: (state, { payload }) => {
            state.loading = false;
            state.message = payload;
        },
        userReset: (state) => {
            state.loading = false;
            state.message = "";
            state.isDeleted = false;
            state.isAdded = false;
            state.isEdited = false;
            state.editedUser = {}
        }
    },
    extraReducers: (builder) => { }
});

export const { editUserSuccess, userloading, deleteUserSuccess, userFail, userReset, addUserSuccess } = userlice.actions;
export default userlice.reducer; 