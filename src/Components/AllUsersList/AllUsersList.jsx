import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { useSelector } from 'react-redux';
import UserDetails from './UserDetails';

const AllUsersList = () => {
    const { loading, usersData } = useSelector(state => state.users);
    const [allUsers, setAllUsers] = useState([]);
    const navigater = useNavigate();

    const handelAddUser = () => {
        navigater(`/user/add`);
    }

    useEffect(() => {
        if (loading === false) {
            setAllUsers(usersData);
        }
    }, [loading, usersData]);

    return (
        <div className='container mt-3'>
            <NavBar allUsers={allUsers} setAllUsers={setAllUsers} handelAddUser={handelAddUser} />
            {(allUsers?.length === 0 && loading === false) ? (
                <div className="mt-3">
                    <h3 className='text-center'>Users Not Found.</h3>
                </div>
            ) : (
                <>
                    <div className="all-users">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact Number</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Business Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map((user, index) => {
                                    return <UserDetails setAllUsers={setAllUsers} allUsers={allUsers} userId={user._id} index={index} user={user} key={index} />
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}

export default AllUsersList