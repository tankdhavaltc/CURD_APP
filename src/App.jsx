import React, { useEffect } from 'react'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from './Store/Store';
import { getAllUsers } from './Actions/User';
import { ToastContainer } from 'react-toastify';
import Loader from "./Components/Loader/Loader";
import AllUsersList from "./Components/AllUsersList/AllUsersList";

const App = () => {
    const { loading } = useSelector((state) => state.allUsers);

    useEffect(() => {
        Store.dispatch(getAllUsers());
    }, []);

    return (
        <>
            <ToastContainer />
            {loading ? (
                <Loader />
            ) : (
                <AllUsersList />
            )}
        </>
    )
}



export default App