import React, { useContext } from 'react';
import ProfileContext from '../../context/profileContext';
const Orders = () => {
    const { orders } = useContext(ProfileContext);

    const getSingleProductPrice = price => {
        return new Intl.NumberFormat().format(price);
    }
    return (
        <div className="col-md-12">
            <div className="card card-default table-responsive" id="recent-orders">
                <div className="card-header justify-content-between">
                    <h2>آخرین سفارشات</h2>
                </div>
                {/* <div className="table-responsive"> */ }
                <div className="card-body table-responsive">
                    <table className="table table-striped table-bordered table-hover ">
                        <thead>
                            <tr>
                                <th>کد سفارش</th>
                                <th>نام محصول</th>
                                <th >تعداد</th>
                                <th>هزینه کلی</th>
                                <th>وضعیت نهایی</th>
                                <th>تاریخ</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                (orders !== undefined && orders.length > 0) ? orders.map(item =>
                                    <tr key={ item.oid }>
                                        <td>{ item.oid }</td>
                                        <td>
                                            <a className="text-dark" href=""> { item.title }</a>
                                        </td>
                                        <td>{ item.count }</td>
                                        <td >{ getSingleProductPrice(item.amount) }تومان</td>
                                        <td >{ item.status === "completed" ? "تکمیل شده" : "ناموفق" }</td>
                                        <td >{ item.date }</td>

                                    </tr>
                                ) : null
                            }
                        </tbody>
                    </table>
                </div>
                {/* </div> */ }
            </div>
        </div>
    )
}
export default Orders;