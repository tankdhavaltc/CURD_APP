import React, { useEffect } from 'react'
import "./Home.css";
import { useSelector } from 'react-redux';
import { Store } from '../../Store/Store';
import Loader from '../Loader/Loader';
import AllUsersList from '../AllUsersList/AllUsersList';
import { getAllUsers } from '../../Actions/User';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

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

export default Home