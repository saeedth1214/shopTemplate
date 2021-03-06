import React, { Fragment, useContext } from 'react';
import ProfileContext from '../../context/profileContext';
const UpdateInfo = () => {
    const { user } = useContext(ProfileContext);
    return (
        <Fragment>
            <div className="card-body pt-0 pb-5">
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h5>ویرایش اطلاعات</h5>
                    </div>
                    <div className="card-body">
                        <form className="horizontal-form">
                            <div className="form-group row">

                                <label htmlFor="">نام کامل</label>

                                <input type="text" value={ user.fullname } readOnly className="form-control" />

                            </div>
                            <div className="form-group row">

                                <label htmlFor="">ایمیل</label>

                                <input type="email" value={ user.email } readOnly className="form-control" />

                            </div>
                            <div className="form-group ">

                                <label htmlFor="Radios">نقش کاربری</label>

                                <label className="control control-radio">کاربرعادی
															<input type="radio" name="radio1" defaultChecked={ user.role === "user" ? "checked" : '' } disabled />
                                    <div className="control-indicator"></div>
                                </label>
                                <label className="control control-radio">ادمین
															<input type="radio" name="radio1" defaultChecked={ user.role === "admin" ? "checked" : '' } disabled />
                                    <div className="control-indicator"></div>
                                </label>

                            </div>
                            <div className="form-group">

                                <label htmlFor="">تاریخ عضویت</label>
                                <label className="control date">{ user.created_at }</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default UpdateInfo;