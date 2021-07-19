import React from 'react';
import img from "../../../data";
import Works from './Works';

const Users = (props) => {
    return (
        <div className="row">
            <div className="col-xl-5">
                <div className="card card-table-border-none" data-scroll-height="580">
                    <div className="card-header justify-content-between ">
                        <h2>New Customers</h2>
                        <div>
                            <button className="text-black-50 mr-2 font-size-20">
                                <i className="mdi mdi-cached"></i>
                            </button>
                            <div className="dropdown show d-inline-block widget-dropdown">
                                <a className="dropdown-toggle icon-burger-mini" href="#" role="button" id="dropdown-customar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-customar">
                                    <li className="dropdown-item"><a href="#">Action</a></li>
                                    <li className="dropdown-item"><a href="#">Another action</a></li>
                                    <li className="dropdown-item"><a href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        <table className="table ">
                            <tbody>
                                <tr>
                                    <td >
                                        <div className="media">
                                            <div className="media-image mr-3 rounded-circle">
                                                <a href="profile.html"><img className="rounded-circle w-45" src={ img.images.img1 } alt="customer image" /></a>
                                            </div>
                                            <div className="media-body align-self-center">
                                                <a href="profile.html"><h6 className="mt-0 text-dark font-weight-medium">Selena Wagner</h6></a>
                                                <small>@selena.oi</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td >2 Orders</td>
                                    <td className="text-dark d-none d-md-block">$150</td>
                                </tr>
                                <tr>
                                    <td >
                                        <div className="media">
                                            <div className="media-image mr-3 rounded-circle">
                                                <a href="profile.html"><img className="rounded-circle w-45" src={ img.images.img2 } alt="customer image" /></a>
                                            </div>
                                            <div className="media-body align-self-center">
                                                <a href="profile.html"><h6 className="mt-0 text-dark font-weight-medium">Walter Reuter</h6></a>
                                                <small>@walter.me</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td >5 Orders</td>
                                    <td className="text-dark d-none d-md-block">$200</td>
                                </tr>
                                <tr>
                                    <td >
                                        <div className="media">
                                            <div className="media-image mr-3 rounded-circle">
                                                <a href="profile.html"><img className="rounded-circle w-45" src={ img.images.img3 } alt="customer image" /></a>
                                            </div>
                                            <div className="media-body align-self-center">
                                                <a href="profile.html"><h6 className="mt-0 text-dark font-weight-medium">Larissa Gebhardt</h6></a>
                                                <small>@larissa.gb</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td >1 Order</td>
                                    <td className="text-dark d-none d-md-block">$50</td>
                                </tr>
                                <tr>
                                    <td >
                                        <div className="media">
                                            <div className="media-image mr-3 rounded-circle">
                                                <a href="profile.html"><img className="rounded-circle w-45" src={ img.images.img4 } alt="customer image" /></a>
                                            </div>
                                            <div className="media-body align-self-center">
                                                <a href="profile.html"><h6 className="mt-0 text-dark font-weight-medium">Albrecht Straub</h6></a>
                                                <small>@albrech.as</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td >2 Orders</td>
                                    <td className="text-dark d-none d-md-block">$100</td>
                                </tr>
                                <tr>
                                    <td >
                                        <div className="media">
                                            <div className="media-image mr-3 rounded-circle">
                                                <a href="profile.html"><img className="rounded-circle w-45" src={ img.images.img5 } alt="customer image" /></a>
                                            </div>
                                            <div className="media-body align-self-center">
                                                <a href="profile.html"><h6 className="mt-0 text-dark font-weight-medium">Leopold Ebert</h6></a>
                                                <small>@leopold.et</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td >1 Order</td>
                                    <td className="text-dark d-none d-md-block">$60</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Works/>
        </div>
    )
}
export default Users;