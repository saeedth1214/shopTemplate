import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { createUser, updateUser } from '../../../actions/user';
// import SimpleReactValidator from 'simple-react-validator';

const NewUserDialog = ({ showDialog, closeDialog ,id}) => {



    const dispatch = useDispatch();

    const [userName, setUserName] = useState("");
    const [password, setPassowrd] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [avatar, setAvatar] = useState("");

    // const validator = useRef(new SimpleReactValidator);
    const handleSubmitCreateUser = event => {
        event.preventDefault();

        if (id === 0) {
            const user = {
                userName, password, email, role, avatar
            }
            dispatch(createUser(user));
        
        } else {
            const user = {
                id,userName, password, role, avatar
            }
            dispatch(updateUser(user));
        }
        closeDialog();
    }

    return (



        <DialogOverlay isOpen={ showDialog } onDismiss={ closeDialog } className="dialogOverlay">

            <DialogContent className="dialogContent">

                <div className="reachDialog">

                    <div className="card-header card-header-border-bottom">
                        <h6 className="dialogTitle">کاربر جدید</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={ handleSubmitCreateUser }>
                            <div className="form-group">
                                <label>نام کامل</label>
                                <input type="text" className="form-control" required value={ userName } name="userName" onChange={ e => setUserName(e.target.value) } />
                                {/* { validator.current.message('userName',userName,"required|")} */}
                            </div>
                            <div className="form-group">
                                <label >رمز عبور</label>
                                <input type="password" className="form-control" required value={ password } name="password" onChange={ e => setPassowrd(e.target.value) } />
                            </div>
                            { 
                                id === 0 ?  <div className="form-group">
                                    <label >ایمیل</label>
                                    <input type="email" className="form-control" required value={ email } name="email" onChange={ e => setEmail(e.target.value) } />
                                </div> : ''
                            }
                            
                            <div className="form-group">
                                <label >نقش کاربری</label>
                                <select className="form-control" required value={ role } name="role" onChange={ e => setRole(e.target.value) } >
                                    <option defaultValue value="admin">ادمین</option>
                                    <option value="user">کاربر عادی</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success"> { id !== 0 ? "ویرایش" : "ثبت"}</button>
                            <button className="btn btn-warning ml-2" onClick={ closeDialog }>انصراف</button>
                        </form>
                    </div>

                </div>

            </DialogContent>
        </DialogOverlay>
    )
}
export default NewUserDialog;