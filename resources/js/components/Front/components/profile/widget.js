import React, { Fragment, useContext } from 'react';
import _ from "lodash";
import ProfileContext from '../../context/profileContext';
const Widgets = () => {

    const { orders } = useContext(ProfileContext);

    const getSuccessOrderCount = () => {
        let successOrderIndex = 0;

        if (orders !== undefined) {
            orders.length > 0 ? orders.map(item => {
                item.status === 'completed' ? successOrderIndex++ : successOrderIndex;
            }) : 0;
        }

        return successOrderIndex;
    }
    const getFailedOrderCount = () => {
        let failedOrderIndex = 0;
        if (orders !== undefined) {

            orders.length > 0 ? orders.map(item => {
                item.status === 'failed' ? failedOrderIndex++ : failedOrderIndex;
            }) : 0;
        }
        return failedOrderIndex;
    }
    const totalAmountOfSuccessOrder = () => {
        let totalPrice = 0;
        if (orders !== undefined) {

            orders.length > 0 ? orders.map(item => {
                if (item.status === 'completed') {
                    totalPrice += parseInt(item.amount);
                }
            }) : totalPrice = 0;
        }
        return new Intl.NumberFormat().format(totalPrice);
    }
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-4">
                    <div className="media widget-media p-4 bg-white border">
                        <div className="icon rounded-circle mr-2 bg-warning">
                            <i className="mdi mdi-account-outline text-white "></i>
                        </div>
                        <div className="media-body align-self-center">
                            <p className="text-primary text-small mb-2 font-size-12">{ getSuccessOrderCount() }</p>
                            <p className="text-small text-dark font-size-12">تعداد سفارش های موفق</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="media widget-media p-4 bg-white border">
                        <div className="icon rounded-circle bg-warning text-small mr-2">
                            <i className="mdi mdi-cart-outline text-white "></i>
                        </div>
                        <div className="media-body align-self-center">
                            <p className="text-primary text-small mb-2 font-size-12">{ getFailedOrderCount() }</p>
                            <p className="text-dark text-small font-size-12">تعداد سفارش های ناموفق</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="media widget-media p-4 bg-white border">
                        <div className="icon rounded-circle bg-warning text-small mr-2">
                            <i className="mdi mdi-cart-outline text-white "></i>
                        </div>
                        <div className="media-body align-self-center">
                            <p className="text-primary text-small mb-2 font-size-12">{ totalAmountOfSuccessOrder() }</p>
                            <p className="text-small text-dark font-size-12">هزینه کلی</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Widgets;