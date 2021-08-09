import React, { Fragment, useContext } from 'react';
import * as img from "../../../Admin/components/common/data";
import ProfileContext from '../../context/profileContext';
// import { useDropzone } from 'react-dropzone';

const Info = () => {

    const { user } = useContext(ProfileContext);
    // const { getRootProps, getInputProps } = useDropzone({
    //     accept: "image/*",
    //     multiple: false,
    //     onDrop: (acceptedFiles, fileRejections) => {

    //         if (fileRejections.length > 0) {

    //             errorNoti("لطفا یک عکس با فرمت های صحیح انتخاب کنید");
    //             return;

    //         } else {
    //             var reader = new FileReader();
    //             reader.onerror = () => console.log('file reading has failed')
    //             reader.onload = () => {

    //                 setFileResult(reader.result);
    //             }
    //             reader.readAsDataURL(acceptedFiles[0]);
    //             setFileName(acceptedFiles[0].name);

    //             setFiles(acceptedFiles.map((file, index) =>
    //                 Object.assign(file, {
    //                     preview: URL.createObjectURL(file),
    //                     id: index
    //                 })
    //             ));
    //         }
    //     }
    // });
    return (
        <Fragment>

            <div className="card-img mx-auto rounded-circle">
                {/* <div { ...getRootProps({ className: 'dropzone' }) }>
                        <input { ...getInputProps() } />

                    </div> */}
                <img src={ img['USER'] } alt="user image" style={ { width: "100px", height: "100px" } } />
            </div>
            <div className="card-body">
                <p className="py-2 text-dark text-small">{ user.fullname }</p>
                <p class="text-small text-dark">{ user.email }</p>
                <a className="btn btn-primary btn-pill btn-sm my-4" href="#">تغییر عکس پروفایل</a>
            </div>

        </Fragment>
    );
}
export default Info;