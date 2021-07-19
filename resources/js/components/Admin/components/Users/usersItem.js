import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { removeUser, changeUserRole } from '../../actions/user';

import Paginate from '../../../services/pagination.js';
import { paginate } from '../../../utility/paginate.js';
import NewUserDialog from '../dialogs/users/newUserDialog';

const UsersItem = ({ users }) => {


    const [openNewDialog, setOpenNewDialog] = useState(false);
    const [updateId, setUpdateId] = useState(0);

    const openDialog = id => {
        setOpenNewDialog(true);
        setUpdateId(id);
    };
    const closeDialog = () => setOpenNewDialog(false);

    const dispatch = useDispatch();
    const handleRemoveUser = (userId) => {

        dispatch(removeUser(userId));
    }
    const [perPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);

    const usersData = paginate(users, currentPage, perPage);

    const handlePageChange = (page,pageCount) => {

        (page >= 1 && page <= pageCount)
            ?
            setCurrentPage(page) :
            null;
    }

    const changeRole = (e, id) => {

        let role = e.target.value;
        // console.log(role);
        const data = { role, id };

        dispatch(changeUserRole(data));
    }
    return (
        <Fragment>

            <NewUserDialog showDialog={ openNewDialog } closeDialog={ closeDialog } id={ updateId } />

            <div className="row">

                <div className="col-12">


                    <div className="pro-header ">

                        <div className="row align-items-center">

                            <div className="col-6">
                                <span> داشبورد -> لیست کاربران</span>
                            </div>
                            <div className="col-6">

                                <button className="btn btn-primary btn-sm" onClick={ () => openDialog(0) } >
                                    <span style={ { "verticalAlign": "text-top", "marginLeft": "5px" } }>
                                        افزودن کاربر  جدید
                                    </span>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card card-default" id="recent-orders">
                        <div className="card-body pt-0 pb-5">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ردیف</th>
                                        <th>نام کاربر</th>
                                        <th className="d-none d-md-table-cell">ایمیل</th>
                                        <th className="d-none d-md-table-cell">نقش کاربری</th>
                                        <th>وضعیت</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usersData.length > 0 ? usersData.map(user => (
                                            <tr key={ user.id }>
                                                <td >{ user.id }</td>
                                                <td >
                                                    { user.fullname }
                                                </td>
                                                <td className="d-none d-md-table-cell">{ user.email }</td>
                                                <td className="d-none d-md-table-cell">

                                                    <select className="selectRole" onChange={ e => changeRole(e, user.id) }>
                                                        <option value="user"  selected={ user.role === "user" ? "user" : "" }>کاربر عادی</option>
                                                        <option value="admin"  selected={ user.role === "admin" ? "admin" : "" }>ادمین</option>
                                                    </select>
                                                </td>
                                                <td className="text-center">
                                                    <button onClick={ () => handleRemoveUser(user.id) } className="status"><i className="fa fa-trash"></i></button>
                                                    <button onClick={ () => openDialog(user.id) } className="status"><i className="fa fa-pencil-square"></i></button>
                                                </td>
                                            </tr>
                                        )
                                        )
                                            : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Paginate totalItem={ users.length } perPage={ perPage } currentPage={ currentPage } onPageChange={ handlePageChange } />

        </Fragment>
    )

}
export default UsersItem;

