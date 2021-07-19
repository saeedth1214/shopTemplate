import React from 'react';
import { Link } from "react-router-dom";
import config from "../../../services/config.json";
const Aside = () => {
    return (

        <aside className="left-sidebar bg-sidebar">
            <div id="sidebar" className="sidebar sidebar-with-footer">
                <div className="app-brand">
                        <span className="brand-name">Solisa Shop</span>
                </div>
                <div className="sidebar-scrollbar">
                    <ul className="nav sidebar-inner" id="sidebar-menu">
                        <li className="has-sub" >
                            <Link to="/admin/home" className="sidenav-item-link nav-link">
                                <i className="mdi mdi-view-dashboard-outline"></i>
                                <span className="nav-text">داشبورد</span>
                            </Link>
                        </li>
                        <li className="has-sub" >
                            <Link to="/admin/product" className="sidenav-item-link nav-link">
                                <i className="mdi mdi-card-outline"></i>
                                <span className="nav-text">مدیریت محصولات</span>
                                {/* <b className="caret"></b> */ }
                            </Link >
                        </li>
                        <li className="has-sub" >
                            <Link to="/admin/users" className="sidenav-item-link nav-link">
                                <i className="mdi mdi-account-group-outline"></i>
                                <span className="nav-text">مدیریت کاربران</span>
                                {/* <b className="caret"></b> */ }
                            </Link>
                        </li>
                        <li className="has-sub" >
                            {/* <Link to="/admin/orders" className="sidenav-item-link nav-link">
                                <i className="mdi mdi-chart-pie"></i>
                                <span className="nav-text">مدیریت سفارشات</span>
                            </Link> */}
                        </li>
                        <li className="has-sub" >
                            <Link to="/admin/reviews" className="sidenav-item-link nav-link"
                                aria-expanded="false" aria-controls="pages">
                                <i className="mdi mdi-image-filter-none"></i>
                                <span className="nav-text">مدیریت نظرات</span>
                            </Link>
                        </li>
                        <li className="has-sub" >
                            <Link to="/admin/category" className="sidenav-item-link nav-link"
                                aria-expanded="false" aria-controls="pages">
                                <i className="mdi mdi-image-filter-none"></i>
                                <span className="nav-text">دسته بندی و ویژگی</span>
                            </Link>
                        </li>
                        <li className="has-sub" >
                            <Link to="/admin/media" className="sidenav-item-link nav-link"
                                aria-expanded="false" aria-controls="pages">
                                <i className="mdi mdi-image-filter-none"></i>
                                <span className="nav-text">رسانه</span>
                            </Link>
                        </li>
                        {/* <li className="has-sub" >
                            <Link to="/admin/options" className="sidenav-item-link nav-link"
                                aria-expanded="false" aria-controls="pages">
                                <i className="mdi mdi-image-filter-none"></i>
                                <span className="nav-text">تنظیمات</span>
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </aside>
    )
}
export default Aside;