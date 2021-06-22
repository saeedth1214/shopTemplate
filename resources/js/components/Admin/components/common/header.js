import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { hasCookie } from '../../../services/cookieServise';
import  LoadingBar  from 'react-redux-loading-bar';


const Header = () => {
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
                                    hasCookie('accessToken') ?
                                        <Fragment>
                                            <li className="item">
                                                <Link to="/user/profile">پروفایل</Link>
                                            </li>
                                            <li className="item">
                                                <Link to="/user/logout">خروج</Link>
                                            </li>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <li className="item">
                                                <Link to="/user/login">ورود</Link>

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