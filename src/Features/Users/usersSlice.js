const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    usersData: [],
    loading: false,
    message: "",
};

const userslice = createSlice({
    name: "users",
    initialState,
    reducers: {
        allUsersLoading: (state) => {
            if (state.loading === false) {
                state.loading = true;
            }
        },
        allUsersSuccess: (state, { payload }) => {
            state.loading = false;
            state.usersData = payload;
        },
        allUsersFail: (state, { payload }) => {
            state.loading = false;
            state.message = payload;
        },
    },
    extraReducers: (builder) => { }
});

export const { allUsersLoading, allUsersSuccess, allUsersFail } = userslice.actions;

export default userslice.reducer;