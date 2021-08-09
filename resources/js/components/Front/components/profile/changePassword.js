import React, { Fragment, useState,useRef } from 'react';
import { useDispatch } from "react-redux";
import simpleReactValidator from "simple-react-validator";
import { changeUserPassword } from '../../../Admin/actions/user';
import { hasCookie, getCookie } from '../../../services/cookieServise';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confrimPassword, setConfrimPPassword] = useState('');
    const [, forcedState] = useState('');
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

    const handleChangePassword = e => {

        e.preventDefault();

        if (validator.current.allValid()) {
            // console.log(getCookie('user').id);
            let userId = getCookie('user').id;
            const changePassword = { userId, password };
            dispatch(changeUserPassword(changePassword));
        } else {
            validator.current.showMessages();
            forcedState(1);
        }
    }
    return (
        <Fragment>
            <div className="card-body pt-0 pb-5">
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <p class="text-dark text-small">تغییر رمز عبور</p>
                    </div>
                    <div className="card-body">
                        <form className="horizontal-form" onSubmit={ handleChangePassword }>
                            <div className="form-group">
                                <label htmlFor="">رمز عبور جدید</label>

                                <input type="password" name="password" className="form-control form-control-sm" onChange={ e => setPassword(e.target.value) } />
                                { validator.current.message("password", password, "required|alpha_num|min:8|max:15") }

                            </div>
                            <div className="form-group ">
                                <label htmlFor="">تایید  رمز عبور</label>

                                <input type="password" className="form-control form-control-sm" name="cpassword" onChange={ e => setConfrimPPassword(e.target.value) } />
                                { validator.current.message("cpassword", confrimPassword, `required|alpha_num|min:8|max:15|in:${password}`) }

                            </div>
                            <div className="form-group">
                                <div className="col-12 col-md-9">
                                    <button type="submit" className="btn btn-sm btn-primary">تایید</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ChangePassword;