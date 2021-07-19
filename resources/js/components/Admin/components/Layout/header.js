import React from 'react';
import { hasCookie } from '../../../services/cookieServise';
// import img from "../common/data";
const Header = () => {
    return (
        <header className="main-header " id="header">
            <nav className="navbar navbar-static-top navbar-expand-lg">

                <button id="sidebar-toggler" className="sidebar-toggle">
                    <span className="sr-only">Toggle navigation</span>
                </button>

                <div className="search-form d-none d-lg-inline-block">
                    <div className="input-group">
                        <button type="button" name="search" id="search-btn" className="btn btn-flat">
                            <i className="mdi mdi-magnify"></i>
                        </button>
                        <input type="text" name="query" id="search-input" className="form-control" placeholder="'button', 'chart' etc."
                            autoFocus autoComplete="off" />
                    </div>
                    <div id="search-results-container">
                        <ul id="search-results"></ul>
                    </div>
                </div>

                <div className="navbar-right ">
                    <ul className="nav navbar-nav">
                        {/* <li className="dropdown notifications-menu">
                            <button className="dropdown-toggle" data-toggle="dropdown">
                                <i className="mdi mdi-bell-outline"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li className="dropdown-header">5 اعلان جدید دارید</li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-user-plus"></i> کاربر جدید
                          <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 10 AM</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-first-order"></i> سفارش جدید
                          <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 07 AM</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-envelope"></i> پیغام جدید
                          <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 10 AM</span>
                                    </a>
                                </li>


                            </ul>
                        </li> */}

                        {
                            hasCookie("access_token") ? <li className="dropdown user-menu">
                                <button className="dropdown-toggle nav-link" data-toggle="dropdown">
                                    {/* <img src={ img.images.user } className="user-image" alt="User Image" /> */ }
                                    <span className="d-none d-lg-inline-block">{ user.fullname }</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-right">

                                    <li className="dropdown-header">
                                        {/* <img src={ img.images.user } className="img-circle" alt="User Image" /> */ }
                                        <div className="d-inline-block">
                                            { user.fullname } <small className="pt-1">{ user.email }</small>
                                        </div>
                                    </li>

                                    <li>
                                        <a href="profile.html">
                                            <i className="mdi mdi-account"></i> پروفایل
                        </a>
                                    </li>
                                    <li className="dropdown-footer">
                                        <a href="signin.html"> <i className="fa fa-sign-out"></i> خروج </a>
                                    </li>
                                </ul>
                            </li>
                                : null

                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}
export default Header;