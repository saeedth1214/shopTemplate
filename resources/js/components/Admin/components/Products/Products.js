import React, { Fragment } from 'react';
import ProductItems from './ProductItems';
import AddProduct from './AddProduct';
const Products = () => {
    return (
        <Fragment>
            <ProductItems />
            <AddProduct />
        </Fragment>
    );
}
export default Products;