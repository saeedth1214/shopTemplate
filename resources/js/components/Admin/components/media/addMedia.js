
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CreateMedia } from '../../actions/media';
import { useDropzone } from "react-dropzone";
import config from "../../../services/config";
import _ from "lodash";
import { getAllProducts } from '../../actions/products';
import { errorNoti } from '../../../utility/messageNotifcation';



const AddMedia = () => {


    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const [proId, setProId] = useState(0);
    const [fileType, setFileType] = useState('');
    const [files, setFiles] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileResult, setFileResult] = useState('');

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

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

                setFiles(acceptedFiles.map((file, index) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        id: index
                    })
                ));
            }
        }
    });

    const handleMediaForm = e => {

        // console.log(files);
        e.preventDefault();

        const media = { proId, fileType, fileName, fileResult }

        // console.log(media);
        dispatch(CreateMedia(media));

    }

    const handleRemoveFile = id => {


        const newFiles = files.filter(item => item.id !== id);
        setFiles(newFiles);

    }


    // console.log(proId, fileType);
    return (

        <div className="row" >

            <div className="col-12">

                <div className="card-body pro-header">

                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-6 col-xl-6">

                            <div className="form-group">
                                <label htmlFor="productName">محصول</label>
                                <select className="form-control" id="productName" onChange={ e => setProId(e.target.value) }>
                                    <option value={ 0 }> select option </option>
                                    {

                                        products.length > 0 ?
                                            products.map(pro => {
                                                return <option key={ pro.id } value={ pro.id }>{ pro.pro_title }</option>

                                            }

                                            )
                                            :
                                            <option value={ 0 }> موردی پیدا نشد </option>
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="fileType">نوع فایل</label>
                                <select multiple="" className="form-control" id="fileType" onChange={ e => setFileType(e.target.value) }>

                                    <option value={ 0 }> select option </option>

                                    {

                                        config.TYPE_OF_IMAGE.map(item => {
                                            for (const [key, value] of Object.entries(item)) {
                                                return < option key={ key } value={ key }>{ value }</option>

                                            }
                                        })
                                    }

                                </select>
                            </div>

                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-6 col-xl-6">

                            <div className="form-group">

                                <section className="container">
                                    <div { ...getRootProps({ className: 'dropzone' }) }>
                                        <input { ...getInputProps() } />
                                        <div className="input-group">
                                            <div className="input-group-prepend ml-5">
                                                <button type="buttom" className="btn btn-dark rounded-pill" ><i className="fa fa-cloud-upload pr-2" ></i>انتخاب فایل</button>
                                            </div>
                                        </div>
                                    </div>
                                    <aside>


                                        <div className="uploder">

                                            <ul className="uploader-list">
                                                {
                                                    files.length > 0 ? files.map(file => (
                                                        <li key={ 0 }>
                                                            <img src={ file.preview } className="imageLoaded" />

                                                            <div className="progress">
                                                                <div className="progress-bar" role="progressbar" style={ { width: "100%" } } aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <span onClick={ () => handleRemoveFile(0) } style={ { cursor: "pointer" } }><i className="fa fa-close"></i></span>
                                                        </li>
                                                    ))
                                                        : null
                                                }
                                            </ul>
                                        </div>
                                    </aside>
                                </section>
                                <button type="buttom" onClick={ handleMediaForm } className="btn btn-outline-primary" disabled={ (files.length <= 0 || parseInt(proId) === 0 || parseInt(fileType) === 0) ? "disabled" : null }>ثبت</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddMedia;