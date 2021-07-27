
import React, { Fragment, useState } from 'react';

import { useDispatch } from "react-redux";
import { forgetPassword } from '../../../Admin/actions/user';
import { LoadingBar } from 'react-redux-loading-bar';
import { ToastContainer } from 'react-toastify';
import Layout from '../layout/layout';

const ForgetPassword = () => {


    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const handleSubmitForgetPassword = e => {
        
        e.preventDefault();
        dispatch(forgetPassword({email}));
    }
    return (
        <Fragment>
            {
                <Layout>
                    <div className="container d-flex flex-column justify-content-between ">
                        <div className="row justify-content-center mt-5">
                            <div className="col-xl-5 col-lg-6 col-md-10">
                                <div className="card">
                                    <div className="card-header bg-primary">
                                        <div className="app-brand text-center">
                                            <span className="markTitle text-white">solisa Shop</span>
                                        </div>
                                    </div>
                                    <div className="card-body p-5">
                                        <p className="text-dark mb-5">
                                            <strong> فراموشی رمزعبور</strong>
                                        </p>
                                        <form onSubmit={ handleSubmitForgetPassword }>
                                            <div className="row">
                                                <div className="form-group col-md-12 mb-4">
                                                    <input type="email" className="form-control input-lg" value={ email } placeholder="email" required onChange={ e => setEmail(e.target.value) } />
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="d-flex my-2 justify-content-between">
                                                        <button type="submit" className="btn btn-sm btn-primary btn-block mb-4">بازیابی رمز عبور</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            }
        </Fragment>
    )
}
export default ForgetPassword;