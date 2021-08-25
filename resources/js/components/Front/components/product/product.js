import React, { Fragment, useEffect, useMemo, useContext } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Item from './item';
import Attributes from './attributes';
import { getSingleProduct } from '../../../Admin/actions/products';
import SingleProContext from "../../context/singlePro";
import NotFound from '../../../Admin/components/common/notFound';

const Product = () => {
    const { id } = useParams();

    const { product, attributes, comments } = useSelector(state => state.product);
    const notFound = useSelector(state => state.notFound);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, []);
    return (
        <>
            {
                !notFound ?
                    <SingleProContext.Provider value={ { product, id, attributes, comments } }>
                        <Item />
                        <Attributes />
                    </SingleProContext.Provider> :
                    <NotFound />
            }
        </>
    )

}
export default Product;