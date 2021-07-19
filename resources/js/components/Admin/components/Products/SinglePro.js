import React, { Fragment, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from '../../actions/products';
import _ from "lodash";
import SingleItem from './SingleItem';


const SinglePro = () => {

    const { id } = useParams();
    const product = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, []);

    if (!_.isEmpty(product)) {
        return (
            <Fragment>
                <SingleItem product={ product }  />
            </Fragment>
        )
    }
    return null;
}
export default SinglePro;