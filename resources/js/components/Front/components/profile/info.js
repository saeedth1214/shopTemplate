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
            <div className="card text-center widget-profile px-0 border-0">
                <div className="card-img mx-auto rounded-circle">
                    {/* <div { ...getRootProps({ className: 'dropzone' }) }>
                        <input { ...getInputProps() } />

                    </div> */}
                        <img src={ img['USER'] } alt="user image" style={ { width: "100px", height: "100px" } } />
                </div>
                <div className="card-body">
                    <h4 className="py-2 text-dark">{ user.fullname }</h4>
                    <p>{ user.email }</p>
                </div>
            </div>
        </Fragment>
    );
}
export default Info;