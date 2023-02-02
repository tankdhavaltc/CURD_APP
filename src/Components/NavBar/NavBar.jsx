import React from 'react'
import "./NavBar.css";
import AddEditUser from '../AddEditUser/AddEditUser';

const NavBar = ({ handelAddUser, users }) => {
    return (
        <div className="d-flex justify-content-between flex-wrap align-content-center">
            <div className="title">
                <h3>Add User</h3>
            </div>
            <div className="">
                <button type="button" onClick={handelAddUser} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add User
                </button>
                <AddEditUser users={users} />
            </div>
        </div>
    )
}

export default NavBar