import React, { Fragment, useContext, useState } from 'react';
import { useDispatch } from "react-redux";
import * as img from "../../../Admin/components/common/data";
import ProfileContext from '../../context/profileContext';
import { useDropzone } from 'react-dropzone';
import { errorNoti } from '../../../utility/messageNotifcation';
import { changeProfileImage } from '../../../Admin/actions/user';

import config from "../../../services/config";
import { getCookie } from '../../../services/cookieServise';


const Info = () => {

    const { user } = useContext(ProfileContext);
    const [profileResult, setFileResult] = useState("");
    const [fileName, setFileName] = useState("");
    // const [files, setFiles] = useState('');


    const dispatch = useDispatch();
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: false,
        onDrop: (acceptedFiles, fileRejections) => {

            if (fileRejections.length > 0) {

                errorNoti("لطفا یک عکس با فرمت های صحیح انتخاب کنید");
                return;

            } else {
                var reader = new FileReader();
                reader.onerror = () => console.log('file reading has failed')
                reader.onload = () => {

                    setFileResult(reader.result);
                }
                reader.readAsDataURL(acceptedFiles[0]);
                setFileName(acceptedFiles[0].name);
            }
        }
    });


    const handleChangeProfileImage = () => {

        const image = { fileName, profileResult };

        dispatch(changeProfileImage(image));

        setFileName("");
        setFileResult("");

    }
    return (
        <Fragment>

            <div className="card-img mx-auto rounded-circle">

                <img src={ `${config.BASE_AVATAR_PATH}/${getCookie('user').avatar}` } alt="user image" style={ { width: "100px", height: "100px" } } />
            </div>
            <div className="card-body">
                <p className="py-2 text-dark text-small">{ user.fullname }</p>
                <p className="text-small text-dark">{ user.email }</p>
                <div { ...getRootProps({ className: 'dropzone' }) }>
                    <input { ...getInputProps() } />
                    <a className="btn btn-primary btn-pill btn-sm my-4" href="#">تغییر عکس پروفایل</a>
                </div>

                <button className="btn btn-primary btn-pill btn-sm my-4" disabled={ (profileResult === '') ? "disabled" : null } onClick={ handleChangeProfileImage }>ثبت</button>

            </div>

        </Fragment>
    );
}
export default Info;