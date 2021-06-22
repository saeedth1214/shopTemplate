import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createUser } from '../../actions/user';



const AddUser = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassowrd] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [avatar, setAvatar] = useState("");

    const dispatch = useDispatch();

    const reset = () => {
        setUserName("");
        setPassowrd("");
        setEmail("");
        setRole("");
        setAvatar("");
    }
    const handleSubmitFormUser = event => {
        event.preventDefault();

        const user = {
            userName, password, email, role, avatar
        }


        // validation by simple react validator is ok

        dispatch(createUser(user));
        reset();
    }

    return (
        <div className="modal fade" id="AddUserModalForm" data-keyboard="false" data-backdrop="static">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalFormTitle">کاربر جدید</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={ handleSubmitFormUser }>
                            <div className="form-group">
                                <label>نام کامل</label>
                                <input type="text" className="form-control" required value={ userName } name="userName" onChange={ e => setUserName(e.target.value) } />
                            </div>
                            <div className="form-group">
                                <label >رمز عبور</label>
                                <input type="password" className="form-control" required value={ password } name="password" onChange={ e => setPassowrd(e.target.value) } />
                            </div>
                            <div className="form-group">
                                <label >ایمیل</label>
                                <input type="email" className="form-control" required value={ email } name="email" onChange={ e => setEmail(e.target.value) } />
                            </div>
                            <div className="form-group">
                                <label >نقش کاربری</label>
                                <select className="form-control" required value={ role } name="role" onChange={ e => setRole(e.target.value) } >
                                    <option defaultValue  value="admin">ادمین</option>
                                    <option value="user">کاربر عادی</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>انتخاب تصویر</label>
                                <input type="file" className="form-control" name="avatar" onChange={ e => setAvatar(e.target.value) } />
                            </div>
                            <button type="submit" className="btn btn-outline-primary btn-sm">ثبت نهایی</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddUser;