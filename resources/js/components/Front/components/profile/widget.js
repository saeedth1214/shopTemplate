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
            <div className="mt-5" />
            <div className="row">
                <div className="col-xl-4">
                    <div className="media widget-media p-4 bg-white border">
                        <div className="icon rounded-circle mr-4 bg-primary">
                            <i className="mdi mdi-account-outline text-white "></i>
                        </div>
                        <div className="media-body align-self-center">
                            <h4 className="text-primary mb-2">{ getSuccessOrderCount() }</h4>
                            <p>تعداد سفارش های موفق</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="media widget-media p-4 bg-white border">
                        <div className="icon rounded-circle bg-warning mr-4">
                            <i className="mdi mdi-cart-outline text-white "></i>
                        </div>
                        <div className="media-body align-self-center">
                            <h4 className="text-primary mb-2">{ getFailedOrderCount() }</h4>
                            <p>تعداد سفارش های ناموفق</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="media widget-media p-4 bg-white border">
                        <div className="icon rounded-circle bg-warning mr-4">
                            <i className="mdi mdi-cart-outline text-white "></i>
                        </div>
                        <div className="media-body align-self-center">
                            <h4 className="text-primary mb-2">{ totalAmountOfSuccessOrder() }</h4>
                            <p>هزینه کلی</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Widgets;