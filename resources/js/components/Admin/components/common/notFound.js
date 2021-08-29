import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="error-wrapper rounded border bg-white px-5">
            <div className="row justify-content-center">
                <div className="col-md-4 text-center">
                    <h1 className="text-primary bold error-title">404</h1>
                    <p className="pt-4 pb-5 error-subtitle">فکر کنم ی مشکلی رخ داده</p>
                    <Link to="/" className="btn btn-primary btn-pill">برو به صفحه اصلی</Link>
                </div>
            </div>
        </div>
    )
}
export default NotFound;