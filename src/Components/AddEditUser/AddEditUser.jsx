import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addUser, editUser } from '../../Actions/User';
import { ADD_USER_RESET, UPDATE_USER_RESET } from '../../constants/userConstants';
import "./AddEditUser.css";

const AddEditUser = ({ setAllUsers, allUsers }) => {
    const { isUpdated, user: updatedUser } = useSelector((state) => state.profile);
    const { isAdded, user: newUser } = useSelector((state) => state.user);
    const [userDetail, setUserDetails] = useState();
    let navigation = useNavigate()
    const closeRef = useRef(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [isError, setIsError] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact_no: "",
        date_of_birth: "",
        address: "",
        business_name: ""
    });

    const handelChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handelClose = () => {
        setFormData({
            name: "",
            email: "",
            contact_no: "",
            date_of_birth: "",
            address: "",
            business_name: ""
        });
        navigation("/");
        closeRef.current.click();
        setIsEdit(false);
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        const { name, email, contact_no, address, business_name, date_of_birth } = formData;

        if (name.trim() === "") {
            toast.error("Fullname is required.");
        }
        else if (email.trim() === "") {
            toast.error("Email is required.");
        }
        else if (contact_no.toString().length < 10) {
            toast.error("Invalid contact number");
        }
        else if (address.trim() === "") {
            toast.error("Address is required.");
        }
        else if (business_name.trim() === "") {
            toast.error("Business name is required.");
        }
        else {
            if (isEdit) {
                setIsError(false);
                if (userDetail[0].email !== formData.email.trim()) {
                    if (checkEmail(formData.email.trim()) < 1) {
                        setIsError(false);
                        if (!isError) {
                            dispatch(editUser(id, {
                                name: name.trim(),
                                email: email.trim(),
                                contact_no: contact_no.toString().trim(),
                                date_of_birth: date_of_birth.toString().trim(),
                                address: address.trim(),
                                business_name: business_name.trim()
                            }));
                            handelClose();
                            setIsError(false);
                        }
                    }
                    else {
                        setIsError(true);
                        toast.warning("Email is already exists");
                    }
                } else {
                    if (!isError) {
                        dispatch(editUser(id, {
                            name: name.trim(),
                            email: email.trim(),
                            contact_no: contact_no.toString().trim(),
                            date_of_birth: date_of_birth.toString().trim(),
                            address: address.trim(),
                            business_name: business_name.trim()
                        }));

                        handelClose();
                        setIsError(false);

                    }
                }
            } else {
                if (checkEmail(formData.email.trim()) === 0) {
                    dispatch(addUser({
                        name: name.trim(),
                        email: email.trim(),
                        contact_no: contact_no.toString().trim(),
                        date_of_birth: date_of_birth.toString().trim(),
                        address: address.trim(),
                        business_name: business_name.trim()
                    }));
                    handelClose();
                } else {
                    toast.warning("Email is already exists");
                }
            }
        }
    }

    const checkEmail = (email) => {
        return allUsers.filter((item) => item.email === email).length;
    }

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            const tempUser = allUsers.filter((item) => item._id === id);
            setUserDetails(tempUser);
            setFormData({
                name: tempUser[0]?.name,
                email: tempUser[0]?.email,
                contact_no: tempUser[0]?.contact_no,
                date_of_birth: tempUser[0]?.date_of_birth,
                address: tempUser[0]?.address,
                business_name: tempUser[0]?.business_name,
            });
        }
    }, [id, allUsers]);

    useEffect(() => {
        if (isUpdated) {
            toast.success("User edited.");
            dispatch({ type: UPDATE_USER_RESET });
            let index = allUsers.findIndex(user => user._id === updatedUser._id);
            allUsers.splice(index, 1, updatedUser);
        }
        if (isAdded) {
            toast.success("User Added.");
            dispatch({ type: ADD_USER_RESET });
            setAllUsers(prev => [...prev, newUser]);
        }
    }, [allUsers, dispatch, isAdded, isUpdated, newUser, setAllUsers, updatedUser]);

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{isEdit ? "Edit User" : "Add User"}</h1>
                        <button type="button" ref={closeRef} id='closeBtn' className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handelClose}></button>
                    </div>
                    <div className="modal-body">
                        <form action="" method="post" onSubmit={handelSubmit}>
                            <div className="form-grp">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" onChange={handelChange} value={formData.name} name="name" id="name" placeholder='Enter full name' required />
                            </div>
                            <div className="form-grp">
                                <label htmlFor="email">Email</label>
                                <input type="email" onChange={handelChange} value={formData.email} name="email" id="email" placeholder='Enter email' required />
                            </div>
                            <div className="form-grp">
                                <label htmlFor="contact_no">Contact Number</label>
                                <input type="number" onChange={handelChange} value={formData.contact_no} name="contact_no" id="contact_no" placeholder='Enter cntact number' required />
                            </div>
                            <div className="form-grp">
                                <label htmlFor="date_of_birth">Date of Birth</label>
                                <input type="date" onChange={handelChange} value={formData.date_of_birth} name="date_of_birth" id="date_of_birth" placeholder='Enter DOB' required />
                            </div>
                            <div className="form-grp">
                                <label htmlFor="address">Address</label>
                                <input type="text" onChange={handelChange} value={formData.address} name="address" id="address" placeholder='Enter address' required />
                            </div>
                            <div className="form-grp">
                                <label htmlFor="business_name">Business Name</label>
                                <input type="text" onChange={handelChange} value={formData.business_name} name="business_name" id="business_name" placeholder='Enter business name' required />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handelClose}>Close</button>
                                <button type="submit" className="btn btn-primary" >Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEditUser