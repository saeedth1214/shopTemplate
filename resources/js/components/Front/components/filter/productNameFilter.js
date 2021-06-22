import React from 'react';
const ProductNameFilter = () => {
    console.log("from productNameFilter");

    return (
        <div className="card">
            <div className="card-header ">
                <strong> جست و جو در نتایج:</strong>
            </div>
            <div className="card-body">
                <div className="product-search">
                    <input type="text" className="search-input form-control-sm" placeholder="نام یک محصول را وارد کنید" />
                    <span className="search-icon"><i className="fa fa-search"></i></span>
                    <span className="input-cleaner"></span>
                </div>
            </div>
        </div>
    );
}
export default ProductNameFilter;