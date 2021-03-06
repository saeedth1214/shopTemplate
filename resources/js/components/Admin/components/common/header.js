import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import LoadingBar from 'react-redux-loading-bar';
import { hasCookie } from '../../../services/cookieServise';
import { useSelector, useDispatch } from 'react-redux';
import { userLogoutFront } from '../../actions/user';
const Header = () => {

    // const auth = useSelector(state => state.auth);

    const [, forcedUpdate] = useState();
    const dispatch = useDispatch();

    const handleLogout = () => {

        dispatch(userLogoutFront());
        forcedUpdate(1);
    }

    console.log("header");

    // useEffect(() => {

    // }, [])

    return (
        <Fragment>
            <header id="header" className=" rtl">
                <ToastContainer />
                <nav className="menuClass">
                    <LoadingBar style={ { background: "lime", height: "5px" } } />
                    <LoadingBar style={ { background: "lime", height: "5px" } } scope="categoryFilter" />
                    <ul className="nav_list">
                        <li className="nav-list_categories">
                            <ul className="nav-list_categories_items">
                                {
                                    hasCookie('user') ?
                                        <Fragment>
                                            <li className="item">
                                                <Link to="/user/profile">پروفایل</Link>
                                            </li>
                                            <li className="item">
                                                <button onClick={ () => handleLogout() } >خروج</button>
                                            </li>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <li className="item">
                                                <Link to="/user/login" >ورود</Link>
                                            </li>
                                            <li className="item">
                                                <Link to="/user/register">عضویت</Link>
                                            </li>
                                        </Fragment>
                                }
                            </ul>
                        </li>
                        <li className="nav_list_Title">
                            <span className="markTitle">
                                solisaShop
                        </span>
                        </li>
                    </ul>
                </nav>
            </header>

        </Fragment>
    )
}
export default Header;