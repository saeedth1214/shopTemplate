import React, { useState, useRef } from 'react';
import simpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { LoadingBar } from 'react-redux-loading-bar';
import { resetPassword } from '../../../Admin/actions/user';
import Layout from '../layout/layout';


const ForgetPasswordForm = (props) => {


    var searchParams = new URLSearchParams(props.location.search);
    const email =searchParams.get("email");
    const token =searchParams.get("token");
    // console.log(searchParams.getAll());
    const [password, setPassword] = useState("");
    const [confrimPassword, setConfrimPassword] = useState("");
    const [, forcedState] = useState();

    const dispatch = useDispatch();
    const validator = useRef(new simpleReactValidator({
        messages: {
            required: "وارد کردن این فیلد الزامیست",
            min: "مقدار ورودی کوتاه است",
            max: "حداکثر مقدار باید 15 کاراکتر باشد",
            in: "مقدار ورودی نامعتبر است"
        }

    }));

    const handleResetPassword = e => {

        e.preventDefault();

        if (validator.current.allValid()) {
            const credential = { token, email,password}
            dispatch(resetPassword(credential));
            reset();
        } else {
            validator.current.showMessages();
            forcedState('');
        }
    }
    const reset = () => {

        setPassword("");
        setConfrimPassword("");
        forcedState(2);

    }
    return (
        <Layout>
            <div className="container d-flex flex-column justify-content-between vh-100">
                <div className="row justify-content-center mt-5">
                    <ToastContainer />
                    <div className="col-xl-5 col-lg-6 col-md-10">
                        <div className="card">
                            <div className="card-header bg-primary">
                                <div className="app-brand text-center">
                                    <span className="markTitle  text-white">solisa shop</span>
                                </div>
                            </div>
                            <div className="card-body p-5">
                                <p className="text-dark mb-5">
                                    <strong> بازیابی رمزعبور</strong>
                                </p>
                                <form onSubmit={ handleResetPassword }>
                                    <div className="row">
                                        {/* <div className="form-group col-md-12 mb-4">
                                        <input type="hidden" className="form-control input-lg" name="token" value={ searchParams.get("token")} readOnly />
                                    </div> */}
                                        <div className="form-group col-md-12 mb-4">
                                            <input type="email" className="form-control input-lg" name="userName" value={ email } readOnly />
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
                                            <button type="submit" className="btn btn-sm btn-primary btn-block mb-4">ثبت رمز جدید</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </Layout>
    )
}
export default ForgetPasswordForm;