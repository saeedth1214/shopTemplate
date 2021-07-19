import React from 'react';
import img from '../../../data';
import Layout from '../Layoute/Layout';

const NotFound = (props) => {
    return (

        <Layout>
            <div className="error-wrapper rounded border bg-white px-5">
                <div className="row justify-content-center">
                    <div className="col-xl-4">
                        <h1 className="text-primary bold error-title">404</h1>
                        <p className="pt-4 pb-5 error-subtitle">فکر کنم ی مشکلی رخ داده</p>
                        <a href="index.html" className="btn btn-primary btn-pill">برو به صفحه اصلی</a>
                    </div>
                    <div className="col-xl-6 pt-5 pt-xl-0 text-center">
                        <img src={ img.error.error } className="img-responsive" alt="Error Page Image" />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default NotFound;