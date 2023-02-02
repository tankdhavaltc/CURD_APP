import { ADD_USER_FAIL, ADD_USER_REQUEST, ADD_USER_RESET, ADD_USER_SUCCESS, ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERRORS, CLEAR_MESSAGE, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return {
                loading: true,
                isAdded: false,
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isAdded: true,
            };
        case ADD_USER_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload,
                isAdded: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                user: null,
                error: null,
                isAdded: false,
            };
        case ADD_USER_RESET:
            return {
                ...state,
                isAdded: false,
            };
        default:
            return state;
    }
};

export const profileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isUpdated: true,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: true,
                deletedId: action.payload,
            };
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isUpdated: false,
            };
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        case CLEAR_MESSAGE:
            return {
                ...state,
                error: null,
                message: null,
            };
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        default:
            return state;
    }
};


export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };

        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };

        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};