import React, { useEffect } from 'react'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { getAllUsers } from './Actions/User';
import Loader from "./Components/Loader/Loader";
import AllUsersList from "./Components/AllUsersList/AllUsersList";

const App = () => {
    const { loading } = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <>
            <ToastContainer />
            {loading ? (
                <Loader />
            ) : (
                < AllUsersList />)}
        </>
    )
}



export default App