import React, { Fragment, useEffect, useMemo, useContext } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Item from './item';
import Attributes from './attributes';
import { getSingleProduct } from '../../../Admin/actions/products';
import SingleProContext from "../../context/singlePro";

const Product = () => {
    const { id } = useParams();

    const { product, attributes, comments } = useSelector(state => state.product);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, []);

    return (
        <SingleProContext.Provider value={ { product, id, attributes, comments } }>
            <Item />
            <Attributes />
        </SingleProContext.Provider>
    )

}
export default Product;