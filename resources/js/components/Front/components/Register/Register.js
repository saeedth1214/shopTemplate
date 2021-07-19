import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import simpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import { RegisterUser } from '../../../Admin/actions/user';
import { ToastContainer } from 'react-toastify';
import { LoadingBar } from 'react-redux-loading-bar';


const Register = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confrimPassword, setConfrimPassword] = useState("");
    const [, forcedState] = useState();

    const dispatch = useDispatch();
    const validator = useRef(new simpleReactValidator({
        messages: {
            required: "وارد کردن این فیلد الزامیست",
            min: "مقدار ورودی کوتاه است",
            max: "حداکثر مقدار باید 15 کاراکتر باشد",
            email: "لطفا یک ایمیل معتبر وارد کنید",
            in: "مقدار ورودی نامعتبر است"
        }

    }));

    const handleRegisterForm = e => {

        e.preventDefault();

        if (validator.current.allValid()) {
            const user = { userName, email, password };
            dispatch(RegisterUser(user));
        } else {
            validator.current.showMessages();
            forcedState('');
        }
    }
    return (
        <div className="container d-flex flex-column justify-content-between vh-100">
            <ToastContainer />
            <LoadingBar style={ { background: "lime", height: "5px" } } scope="register" />
            <div className="row justify-content-center mt-5">
                <div className="col-xl-5 col-lg-6 col-md-10">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                          
                                <p className="markTitle text-center">solisa Shop</p>
                          
                        </div>
                        <div className="card-body p-5">
                            <h4 className="text-dark mb-5">عضویت</h4>
                            <form onSubmit={ handleRegisterForm }>
                                <div className="row">

                                    <div className="form-group col-md-12 mb-4">
                                        <input type="text" className="form-control input-lg" name="userName" placeholder="Username" onChange={ e => setUserName(e.target.value) } />
                                        { validator.current.message('userName', userName, "required|min:3|max:15") }
                                    </div>
                                    <div className="form-group col-md-12 mb-4">
                                        <input type="email" className="form-control input-lg" name="email" placeholder="email" onChange={ e => setEmail(e.target.value) } />
                                        { validator.current.message("email", email, "required|email") }
                                    </div>

                                    <div className="form-group col-md-12 ">
                                        <input type="password" className="form-control input-lg" name="password" placeholder="Password" onChange={ e => setPassword(e.target.value) } />
                                        { validator.current.message("Password", password, "required|alpha_num|min:8|max:15") }

                                    </div>
                                    <div className="form-group col-md-12 ">
                                        <input type="password" className="form-control input-lg" name="cpassword" placeholder="Confirm Password" onChange={ e => setConfrimPassword(e.target.value) } />
                                        { validator.current.message("cpassword", confrimPassword, `required|alpha_num|min:8|max:15|in:${password}`) }

                                    </div>
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-lg btn-primary btn-block mb-4">ثبت نهایی</button>
                                        <div className="small">
                                            <p className="d-flex justify-content-around">
                                                <span className="text">قبلا ثبت نام کرده اید؟</span>
                                                <strong >
                                                    <Link to='/user/login'> ورود</Link>
                                                </strong></p>
                                        </div>
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
export default Register;