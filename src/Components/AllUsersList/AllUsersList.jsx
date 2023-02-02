import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import { clearErrors, deleteUser, getAllUsers } from '../../Actions/User';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DELETE_USER_RESET } from '../../constants/userConstants';

const AllUsersList = () => {
    const dispatch = useDispatch();
    const navigater = useNavigate();
    const { error, users } = useSelector((state) => state.allUsers);
    const { error: deleteError, isDeleted } = useSelector(
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
        if (deleteError) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("User delete successfully.");
            dispatch({ type: DELETE_USER_RESET });
            dispatch(getAllUsers());
        }
    }, [deleteError, dispatch, error, isDeleted])



    return (
        <div className='container mt-3'>
            <NavBar users={users} handelAddUser={handelAddUser} />
            {users.length === 0 ? (
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
                                {users.map((user, index) => {
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