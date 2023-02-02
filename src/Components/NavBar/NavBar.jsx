import React from 'react';
import AddEditUser from '../AddEditUser/AddEditUser';

const NavBar = ({ setAllUsers, handelAddUser, allUsers }) => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap align-content-center">
                <div className="title">
                    <h3>Users ({`${allUsers.length}`})</h3>
                </div>
                <div className="">
                    <button type="button" onClick={handelAddUser} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add User
                    </button>
                </div>
            </div>
            <AddEditUser setAllUsers={setAllUsers} allUsers={allUsers} />
        </>
    )
}

export default NavBar