import React, { useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { getDasboardDetails } from '../../actions/dashbord';
import { convertToNumberFormat } from '../../../utility/getNumberFormat';
import _ from "lodash";
const Detail = () => {

    const detail = useSelector(state => state.detail);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDasboardDetails());
    }, []);

    console.log(detail);
    return (
        <div className="row">
            <div className="col-xl-3 col-sm-6 col-md-6 ">
                <div className="media widget-media p-4 bg-white border">
                    <div className="icon rounded-circle mr-4 bg-danger">
                        <i className="fa fa-shopping-basket text-white "></i>
                    </div>
                    <div className="media-body align-self-center">
                        <h4 className="text-primary mb-2">{ (detail !== undefined && !_.isEmpty(detail)) ? detail.orders_count : 0 }</h4>
                        <p>تعداد سفارشات</p>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-md-6 ">
                <div className="media widget-media p-4 bg-white border">
                    <div className="icon rounded-circle mr-4 bg-danger">
                        <i className="fa fa-product-hunt text-white "></i>
                    </div>
                    <div className="media-body align-self-center">
                        <h4 className="text-primary mb-2">{ (detail !== undefined && !_.isEmpty(detail)) ? detail.products_count : 0 }</h4>
                        <p>تعداد محصولات</p>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-md-6 ">
                <div className="media widget-media p-4 bg-white border">
                    <div className="icon rounded-circle mr-4 bg-danger">
                        <i className="fa fa-user-plus text-white "></i>
                    </div>
                    <div className="media-body align-self-center">
                        <h4 className="text-primary mb-2">{ (detail !== undefined && !_.isEmpty(detail)) ? detail.user_count : 0 }</h4>
                        <p>تعداد کاربران</p>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-md-6 ">
                <div className="media widget-media p-4 bg-white border">
                    <div className="icon rounded-circle mr-4 bg-danger">
                        <i className="fa fa-shopping-basket text-white "></i>
                    </div>
                    <div className="media-body align-self-center">
                        <h4 className="text-primary mb-2">{ convertToNumberFormat((detail !== undefined && !_.isEmpty(detail)) ? detail.total_sales : 0) }</h4>
                        <p>فروش کل</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Detail;