import React, { Fragment } from 'react';
import Product from './product';
import LoadingBar from 'react-redux-loading-bar';
const ShowSingleProduct = () => {
    return (
        <Fragment>
            <LoadingBar scope="singleProduct" style={ { background: "lime", height: "5px", zIndex: "500" } } />
            <Product />
        </Fragment>
    )
}
export default ShowSingleProduct;