import React, { useContext } from 'react';
import ProfileContext from '../../context/profileContext';
const Orders = () => {
    const { orders } = useContext(ProfileContext);

    const getSingleProductPrice = price => {
        return new Intl.NumberFormat().format(price);
    }
    return (
        <div className="col-12">
            <div className="card card-default" id="recent-orders">
                <div className="card-header justify-content-between">
                    <h2>آخرین سفارشات</h2>
                </div>
                <div className="card-body pt-0 pb-5">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ردیف</th>
                                <th>نام محصول</th>
                                <th className="d-none d-xl-table-cell">تعداد</th>
                                <th className="d-none d-xl-table-cell">تاریخ</th>
                                <th className="d-none d-xl-table-cell">هزینه کلی</th>
                                <th className="d-none d-xl-table-cell">وضعیت نهایی</th>
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
                                        <td className="d-none d-xl-table-cell">{ item.count }</td>
                                        <td className="d-none d-xl-table-cell">{ item.date }</td>
                                        <td className="d-none d-xl-table-cell">{ getSingleProductPrice(item.amount) }تومان</td>
                                        <td className="d-none d-xl-table-cell">{ item.status === "completed" ? "تکمیل شده" : "ناموفق" }</td>

                                    </tr>
                                ) : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Orders;