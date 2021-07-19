import React from 'react';
const Works = (props) => {
    return (
      
            <div className="col-xl-6">

                <div className="card card-default todo-table" id="todo" data-scroll-height="550">
                    <div className="card-header justify-content-between">
                        <h2>To Do List</h2>
                        <a className="btn btn-primary btn-pill" id="add-task" href="#" role="button"> Add task </a>
                    </div>
                    <div className="card-body slim-scroll">
                        <div className="todo-single-item d-none" id="todo-input">
                            <form >
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Enter Todo" autoFocus />
                                </div>
                            </form>
                        </div>
                        <div className="todo-list" id="todo-list">
                            <div className="todo-single-item d-flex flex-row justify-content-between finished">
                                <i className="mdi"></i>
                                <span >Finish Dashboard UI Kit update</span>
                                <span className="badge badge-primary">Finished</span>
                            </div>
                            <div className="todo-single-item d-flex flex-row justify-content-between current">
                                <i className="mdi"></i>
                                <span >Create new prototype for the landing page</span>
                                <span className="badge badge-primary">Today</span>
                            </div>
                            <div className="todo-single-item d-flex flex-row justify-content-between ">
                                <i className="mdi"></i>
                                <span > Add new Google Analytics code to all main files </span>
                                <span className="badge badge-danger">Yesterday</span>
                            </div>

                            <div className="todo-single-item d-flex flex-row justify-content-between ">
                                <i className="mdi"></i>
                                <span >Update parallax scroll on team page</span>
                                <span className="badge badge-success">Dec 15, 2018</span>
                            </div>

                            <div className="todo-single-item d-flex flex-row justify-content-between ">
                                <i className="mdi"></i>
                                <span >Update parallax scroll on team page</span>
                                <span className="badge badge-success">Dec 15, 2018</span>
                            </div>
                            <div className="todo-single-item d-flex flex-row justify-content-between ">
                                <i className="mdi"></i>
                                <span >Create online customer list book</span>
                                <span className="badge badge-success">Dec 15, 2018</span>
                            </div>
                            <div className="todo-single-item d-flex flex-row justify-content-between ">
                                <i className="mdi"></i>
                                <span >Lorem ipsum dolor sit amet, consectetur.</span>
                                <span className="badge badge-success">Dec 15, 2018</span>
                            </div>

                            <div className="todo-single-item d-flex flex-row justify-content-between mb-1">
                                <i className="mdi"></i>
                                <span >Update parallax scroll on team page</span>
                                <span className="badge badge-success">Dec 15, 2018</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3"></div>
                </div>
            </div>

     
    )
}
export default Works;