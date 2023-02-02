import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/Users/userSlice";
import userslice from "../Features/Users/usersSlice";

export const Store = configureStore({
    reducer: {
        users: userslice,
        user: userSlice
    },
});