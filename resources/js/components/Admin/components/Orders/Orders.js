import React, { Fragment, useEffect,useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from '../../actions/dashbord';
import { convertToNumberFormat } from '../../../utility/getNumberFormat';
import { paginate } from '../../../utility/paginate';
import Paginate from "../../../services/pagination";

const Orders = () => {


    const orders = useSelector(state => state.order);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllOrders());
    }, []);

    const [perPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);

    const archiveOrders = paginate(orders, currentPage, perPage);

    const handlePageChange = page => {

        setCurrentPage(page);
    }
    return (
        <Fragment>
            <div className="row">
                <div className="col-12">
                    <div className="pro-header ">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <span> داشبورد -> لیست سفارشات</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card card-default">
                        <div className="card-body pt-0 pb-5">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ردیف</th>
                                        <th>نام محصول</th>
                                        <th>نام کاربر</th>
                                        <th>تعداد</th>
                                        <th>قیمت نهایی</th>
                                        <th>وضعیت</th>
                                        <th>تاریخ سفارش</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        archiveOrders.length > 0 ? archiveOrders.map(order =>(

                                            <tr key={ order.oid}>
                                                <td >{ order.oid }</td>
                                                <td >
                                                    { order.title }
                                                </td>
                                                <td className="d-none d-md-table-cell">{ order.fullname }</td>
                                                <td className="d-none d-md-table-cell">{ order.count }</td>
                                                <td className="d-none d-md-table-cell">{ convertToNumberFormat(order.amount) }تومان</td>

                                                <td >
                                                    <span className="badge badge-success">{ order.status }</span>
                                                </td>
                                                <td className="text-center">
                                                    { order.date }
                                                </td>
                                            </tr>
                                        )) : null
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Paginate totalItem={ orders.length } perPage={ perPage } currentPage={ currentPage } onPageChange={ handlePageChange } />
          

        </Fragment>
    )

}
export default Orders;
