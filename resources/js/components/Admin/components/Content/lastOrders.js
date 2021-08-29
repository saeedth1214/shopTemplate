import React, { useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { getNewOrders } from '../../actions/dashbord';
import { convertToNumberFormat } from '../../../utility/getNumberFormat';
const LastOrders = () => {
    const orders = useSelector(state => state.order);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNewOrders());
    }, []);

    // console.log(orders);
    return (
        <div className="row">
            <div className="col-12">

                <div className="card card-default table-responsive" >
                    <div className="card-header justify-content-between">
                        <h2>سفارشات اخیر</h2>
                    </div>
                    <div className="card-body pt-0 pb-5">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>کد سفارش</th>
                                    <th>نام محصول</th>
                                    <th>نام مشتری</th>
                                    <th >تعداد</th>
                                    <th >قیمت کل</th>
                                    <th>وضعیت</th>
                                    <th >تاریخ سفارش</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    orders.length > 0 ? orders.map(order => (

                                        <tr key={ order.id }>
                                            <td >{ order.id }</td>
                                            <td >
                                                { order.title }
                                            </td>
                                            <td >
                                                { order.fullname }
                                            </td>
                                            <td>{ order.total_items }</td>
                                            <td>{ convertToNumberFormat(order.total_amount) } تومان</td>
                                            <td >
                                                <span className="badge badge-success">{ order.status }</span>
                                            </td>
                                            <td>{ order.date }</td>
                                        </tr>
                                    )) : <tr><td>مورد خاصی پیدا نشد</td></tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LastOrders;