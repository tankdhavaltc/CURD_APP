import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, editUser } from '../../Actions/User';

const UserDetails = ({ index, user }) => {

    const [userName, setUserName] = useState("");
    const navigater = useNavigate();
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const handelDeleteUser = (id) => {
        dispatch(deleteUser(id));
    }

    const handelEditUser = (id) => {
        navigater(`/user/edit/${id}`);
    }

    const handelChangeName = (e) => {
        setUserName(e.target.value);
    }

    const ShowInput = () => {
        inputRef.current.style.border = "1px solid";
        inputRef.current.readOnly = false;
    }

    const HideInput = () => {
        inputRef.current.style.border = "none";
        inputRef.current.readOnly = true
        const { email, contact_no, address, business_name, date_of_birth, _id } = user;
        dispatch(editUser(_id, {
            name: userName,
            email,
            contact_no,
            date_of_birth,
            address,
            business_name,
        }));
    }

    useEffect(() => {
        setUserName(user?.name);
        inputRef.current.style.border = "none";
        inputRef.current.readOnly = true;
    }, [user?.name]);

    return (
        <tr>
            <th>{index + 1}</th>
            <td><input type="text" className='userName' ref={inputRef} onFocus={ShowInput} onBlur={HideInput} name="userName" id="userName" value={userName} onChange={handelChangeName} required /></td>
            <td>{user.email}</td>
            <td>{user.contact_no}</td>
            <td>{user.date_of_birth}</td>
            <td>{user.address}</td>
            <td>{user.business_name}</td>
            <td>
                <div className='d-flex gap-3 flex-wrap'>
                    <i data-bs-toggle="modal" data-bs-target="#exampleModal" className="edit-btn fa-regular fa-pen-to-square" onClick={() => handelEditUser(user._id)}></i>
                    <i className="delete-btn fa-solid fa-trash" onClick={() => handelDeleteUser(user._id)}></i>
                </div>
            </td>
        </tr>
    )
}

export default UserDetails