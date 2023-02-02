import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import { deleteUser } from '../../Actions/User';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DELETE_USER_RESET } from '../../constants/userConstants';

const AllUsersList = () => {
    const { loading, users } = useSelector((state) => state.allUsers);
    const [allUsers, setAllUsers] = useState([]);
    const dispatch = useDispatch();
    const navigater = useNavigate();
    const { error: deleteError, deletedId, isDeleted } = useSelector(
        (state) => state.profile
    );

    const handelDeleteUser = (id) => {
        dispatch(deleteUser(id));
    }

    const handelAddUser = () => {
        navigater(`/user/add`);
    }

    const handelEditUser = (id) => {
        navigater(`/user/edit/${id}`);
    }

    useEffect(() => {
        if (isDeleted) {
            toast.success("User delete successfully.");
            dispatch({ type: DELETE_USER_RESET });
            let newUsers = allUsers.filter((user) => user._id !== deletedId);
            setAllUsers(newUsers);
        }
    }, [allUsers, deleteError, deletedId, dispatch, isDeleted])

    useEffect(() => {
        if (loading === false) {
            setAllUsers(users);
        }
    }, [loading, users])

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
                                    return (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.contact_no}</td>
                                            <td>{user.date_of_birth}</td>
                                            <td>{user.address}</td>
                                            <td>{user.business_name}</td>
                                            <td>
                                                <i data-bs-toggle="modal" data-bs-target="#exampleModal" className="edit-btn fa-regular fa-pen-to-square" onClick={() => handelEditUser(user._id)}></i>
                                                <i className="delete-btn fa-solid fa-trash" onClick={() => handelDeleteUser(user._id)}></i>
                                            </td>
                                        </tr>
                                    )
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