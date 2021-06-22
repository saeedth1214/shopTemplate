import React from 'react';

import { withRouter } from "react-router-dom";
const Login = (props) => {
    console.log(props);
    return (
        <div className="container d-flex flex-column justify-content-between ">
            <div className="row justify-content-center mt-5">
                <div className="col-xl-5 col-lg-6 col-md-10">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <div className="app-brand">
                                <a href="/index.html">
                                    <svg className="brand-icon" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="30" height="33"
                                        viewBox="0 0 30 33">
                                        <g fill="none" fill-rule="evenodd">
                                            <path className="logo-fill-blue" fill="#7DBCFF" d="M0 4v25l8 4V0zM22 4v25l8 4V0z" />
                                            <path className="logo-fill-white" fill="#FFF" d="M11 4v25l8 4V0z" />
                                        </g>
                                    </svg>
                                    <span className="brand-name">Sleek Dashboard</span>
                                </a>
                            </div>
                        </div>
                        <div className="card-body p-5">

                            <h4 className="text-dark mb-5">ورود</h4>
                            <form action="/index.html">
                                <div className="row">
                                    <div className="form-group col-md-12 mb-4">
                                        <input type="email" className="form-control input-lg" id="email" aria-describedby="emailHelp" placeholder="Username" />
                                    </div>
                                    <div className="form-group col-md-12 ">
                                        <input type="password" className="form-control input-lg" id="password" placeholder="Password" />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="d-flex my-2 justify-content-between">
                                            <div className="d-inline-block mr-3">
                                                <label className="control control-checkbox">Remember me
                          <input type="checkbox" />
                                                    <div className="control-indicator"></div>
                                                </label>

                                            </div>
                                            <p><a className="text-blue" href="#">Forgot Your Password?</a></p>
                                        </div>
                                        <button type="submit" className="btn btn-lg btn-primary btn-block mb-4">Sign In</button>
                                        <p>Don't have an account yet ?
                      <a className="text-blue" href="sign-up.html">Sign Up</a>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Login);