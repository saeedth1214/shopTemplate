import React, { Fragment } from 'react';
const Right = (props) => {
    return (
        <Fragment>
            <div className="right-sidebar">
                <div className="btn-right-sidebar-toggler">
                    <i className="mdi mdi-chevron-left"></i>
                </div>

                <div className="right-nav-container">
                    <ul className="nav nav-right-sidebar">
                        <li className="nav-item">
                            <a className="nav-link text-danger icon-sm" data-toggle="tab" href="#find-replace" role="tab" aria-controls="nav-home"
                                aria-selected="true">
                                <i className="mdi mdi-note-plus-outline"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-primary icon-sm" data-toggle="tab" href="#launch" role="tab" aria-controls="nav-profile"
                                aria-selected="false">
                                <i className="mdi mdi-launch"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-purple icon-sm" data-toggle="tab" href="#question-answer" role="tab"
                                aria-controls="nav-contact" aria-selected="false">
                                <i className="mdi mdi-qrcode-edit"></i>
                            </a>
                        </li>
                    </ul>
                </div>


                <div className="right-sidebar-tab">
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane" id="find-replace" role="tabpanel" aria-labelledby="nav-profile-tab">
                            <div className="card card-right-sidebar">
                                <div className="card-header">
                                    <button type="button" className="close" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h5 className="card-title">New Report</h5>
                                </div>
                                <div className="card-body">
                                    <form action="">
                                        <div className="form-group">
                                            <label for="exampleInputEmail13">Email address</label>
                                            <input type="email" className="form-control" id="exampleInputEmail13" aria-describedby="emailHelp"
                                                placeholder="Enter email" />
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                          else.</small>
                                        </div>
                                        <div className="form-group">
                                            <label for="categorySelect">Category</label>
                                            <select className="form-control" id="categorySelect">
                                                <option>Finance</option>
                                                <option>Sales</option>
                                                <option>System</option>
                                                <option>Customers</option>
                                                <option>Orders</option>
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">@</div>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Units" />
                                        </div>

                                        <div className="form-group">
                                            <label>filter:</label>
                                            <div className="custom-control custom-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" id="pending" />
                                                <label className="custom-control-label" for="pending">Pending transations</label>
                                            </div>
                                            <div className="custom-control custom-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" id="marginss2" />
                                                <label className="custom-control-label" for="marginss2">Include margins</label>
                                            </div>
                                            <div className="custom-control custom-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" id="balance" />
                                                <label className="custom-control-label" for="balance">Include balance</label>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane" id="launch" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <div className="card card-right-sidebar">
                                <div className="card-header">
                                    <button type="button" className="close" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h5 className="card-title">Notification</h5>
                                </div>
                                <div className="card-body px-0">
                                    <ul className="notifications-list">
                                        <li>
                                            <a href="#">
                                                <i className="mdi mdi-account-plus"></i> New user registered
                          <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i>
                                                    10 AM</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="mdi mdi-account-remove"></i> User deleted
                          <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i>
                                                    07 AM</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="mdi mdi-chart-areaspline"></i> Sales report is ready
                          <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i>
                                                    12 PM</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="mdi mdi-account-supervisor"></i> New client
                          <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i>
                                                    10 AM</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="mdi mdi-server-network-off"></i> Server overloaded
                          <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i>
                                                    05 AM</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane" id="question-answer" role="tabpanel2" aria-labelledby="nav-contact-tab">
                            <div className="card card-right-sidebar">
                                <div className="card-header">
                                    <button type="button" className="close" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h5 className="card-title">Event Create</h5>
                                </div>

                                <div className="card-body">
                                    <form action="">
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Email address</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                placeholder="Enter email" />
                                            <small id="emailHelp" className="form-text text-muted">Please enter your email address.</small>
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputEmail15">Location:</label>
                                            <input type="email" className="form-control" id="exampleInputEmail15" aria-describedby="emailHelp"
                                                placeholder="Enter Location" />
                                            <small id="emailHelp" className="form-text text-muted">please enter your location.</small>
                                        </div>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">@</div>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Units" />
                                        </div>

                                        <div className="form-group">
                                            <label>filter:</label>
                                            <div className="custom-control custom-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" id="pending1" />
                                                <label className="custom-control-label" for="pending1">Pending transations</label>
                                            </div>
                                            <div className="custom-control custom-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" id="marginss" />
                                                <label className="custom-control-label" for="marginss">Include margins</label>
                                            </div>
                                            <div className="custom-control custom-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" id="balance2" />
                                                <label className="custom-control-label" for="balance2">Include balance</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Right;