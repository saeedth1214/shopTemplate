import React, { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { userLogoutFront } from '../../../Admin/actions/user';
const Logout = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    dispatch(userLogoutFront());
    return (
        <Redirect to="/" />
    )
}
export default Logout;