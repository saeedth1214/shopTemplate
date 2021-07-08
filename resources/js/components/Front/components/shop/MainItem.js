import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ShowProduct from "./ShowProduct";
import { getRandomProducts } from '../../../Admin/actions/products';

const MainItem = () => {
    let products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const filterProducts = useSelector(state => state.filterProducts);
    useEffect(() => {
        dispatch(getRandomProducts());

    }, []);
    
    return (
        <Fragment>
            <ShowProduct products={ products } filter={ filterProducts } />
        </Fragment>
    );
}
export default MainItem;
