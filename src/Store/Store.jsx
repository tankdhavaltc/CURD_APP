
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { allUsersReducer, profileReducer, userDetailsReducer, userReducer } from "../Reducer/UserReducer";

let init = {
    allUsers: [],
    profile: {},
    user: {},
    userDetails: {}
};

const middleware = [thunk];
const rootReducer = combineReducers({
    allUsers: allUsersReducer,
    profile: profileReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
})
export const Store = configureStore({ reducer: rootReducer }, init, composeWithDevTools(applyMiddleware(...middleware)));