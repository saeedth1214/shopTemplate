import React, { useState, Fragment } from 'react';
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { userLoginFront } from '../../../Admin/actions/user';
import { ToastContainer } from 'react-toastify';
import { LoadingBar } from 'react-redux-loading-bar';
// import { hasCookie } from '../../../services/cookieServise';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remeberMe, setRemember] = useState(false);
    const [, forceUpdate] = useState();

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);


    const changeRememberMe = e => {

        let tag = document.getElementById("login-checkbox");
        if (e.target.checked) {

            tag.classList.add('activeChecked');
        } else {
            tag.classList.remove('activeChecked');
        }
        setRemember(!remeberMe);
    }

    const handleSubmitLogin = e => {

        e.preventDefault();
        const login = { email, password };
        dispatch(userLoginFront(login));

        reset();
    }

    const reset = () => {
        setEmail('');
        setPassword('');
        forceUpdate('');

    }

    return (
        <Fragment>
            {
                !auth ?
                    <div className="container d-flex flex-column justify-content-between ">
                        <div className="row justify-content-center mt-5">
                            <ToastContainer />
                            <LoadingBar style={ { background: "lime", height: "5px" } } scope="login"/>
                            <div className="col-xl-5 col-lg-6 col-md-10">
                                <div className="card">
                                    <div className="card-header bg-primary">
                                        <div className="app-brand text-center">
                                            <span className="markTitle text-white">solisa Shop</span>

                                        </div>
                                    </div>
                                    <div className="card-body p-5">
                                        <h4 className="text-dark mb-5">ورود</h4>
                                        <form onSubmit={ handleSubmitLogin }>
                                            <div className="row">
                                                <div className="form-group col-md-12 mb-4">
                                                    <input type="email" className="form-control input-lg" value={ email } placeholder="email" required onChange={ e => setEmail(e.target.value) } />
                                                </div>
                                                <div className="form-group col-md-12 ">
                                                    <input type="password" className="form-control input-lg" value={ password } placeholder="Password" required onChange={ e => setPassword(e.target.value) } />
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="d-flex my-2 justify-content-between">
                                                        <div className="d-inline-block mr-3">
                                                            <label className="control control-checkbox">به خاطر بسپار</label>
                                                            <label className="login-checkBox">
                                                                <input type="checkbox" className="input-checkbox" onClick={ e => changeRememberMe(e) } />
                                                                <span className="checkbox-checked "><i className="fa fa-check no_active" id="login-checkbox"></i> </span>
                                                            </label>
                                                        </div>
                                                        {/* <div className="d-inline-block mr-3">
                                                            <label className="control control-checkbox">
                                                                <Link to="">رمزعبور را فراموش کرده ام</Link>
                                                            </label>

                                                        </div> */}

                                                    </div>
                                                    <button type="submit" className="btn btn-lg btn-primary btn-block mb-4">ورود</button>
                                                    <p className="d-flex justify-content-around">
                                                        <strong>ثبت نام نکرده ام ؟</strong>
                                                        <strong><Link to="/user/register">عضویت</Link></strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <Redirect to="/" />
            }
        </Fragment>
    )
}
export default withRouter(Login);