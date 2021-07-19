import React, { useEffect,Fragment ,useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../../actions/users';
import UsersItem from './usersItem';
const Users = () => {

    const users = useSelector(state => state.users);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllUsers());
    }, []);
    return (
            <UsersItem users={ users } />
    )
}
export default Users;