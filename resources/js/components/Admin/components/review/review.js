import React, { Fragment, useEffect, useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { getAllReviews, RemoveReview, changeStatusReview, createReplyMessageAction } from '../../actions/reviews';
import Paginate from '../../../services/pagination';
import { paginate } from '../../../utility/paginate';

const Reviews = () => {

    const reviews = useSelector(state => state.reviews);
    const dispatch = useDispatch();



    const [perPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);


    const [showReply, setShowReply] = useState(false);
    const [replyMessage, setReplyMessage] = useState("");
    const [reId, setreId] = useState(0);

    const archiveReviews = paginate(reviews, currentPage, perPage);

    const handlePageChange = (page,pageCount) => {

        (page >= 1 && page <= pageCount)
            ?
            setCurrentPage(page) :
            null;
    }

    useEffect(() => {

        dispatch(getAllReviews());

    }, []);

    const handleRemoveProduct = id => {

        dispatch(RemoveReview(id));
    }

    const changeStatus = (e, id) => {

        e.preventDefault();
        dispatch(changeStatusReview(id));

    }
    const handleShowReviewBox = rId => {

        if (rId !== reId && showReply) {
            setreId(rId);
        } else {
            setreId(rId);
            setShowReply(!showReply);
        }
        // console.log(rId);
    }

    const createReplyMessage = () => {
        let element = replyMessage.replace(/^\s+|\s+$/gm, '');
        const reply = { reId, reply: element };

        dispatch(createReplyMessageAction(reply));
        setReplyMessage("");

    }

    return (
        <Fragment>
            <div className="row">

                <div className="col-12">


                    <div className="pro-header ">

                        <div className="row align-items-center">

                            <div className="col-12">
                                <span> نمایش نظرات</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card card-default" id="recent-orders">
                        <div className="card-body pt-0 pb-5">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ردیف</th>
                                        <th>نام محصول</th>
                                        <th className="d-none d-md-table-cell">نام کاربر</th>
                                        <th className="d-none d-md-table-cell">نمره</th>
                                        <th className="d-none d-md-table-cell">وضعیت نمایش</th>
                                        <th className="d-none d-md-table-cell">نظر</th>
                                        <th className="d-none d-md-table-cell">ایجاد پاسخ</th>
                                        <th>وضعیت</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        archiveReviews.length > 0 ? archiveReviews.map(review =>

                                            (
                                                <tr key={ review.id }>
                                                    <td >{ review.id }</td>
                                                    <td >
                                                        { review.title }
                                                    </td>
                                                    <td className="d-none d-md-table-cell">{ review.fullname }</td>
                                                    <td className="d-none d-md-table-cell">{ review.rate }</td>
                                                    <td className="d-none d-md-table-cell">
                                                        <select className="selectStatus" onChange={ e => changeStatus(e, review.id) }>
                                                            <option selected={ review.status === "فعال" ? "selected" : "" }>فعال</option>
                                                            <option selected={ review.status === "غیر فعال" ? "selected" : "" }>غیر فعال</option>
                                                        </select>
                                                    </td>
                                                    <td className="d-none d-md-table-cell">{ review.comment }</td>
                                                    <td className="d-none d-md-table-cell text-center">
                                                        <button onClick={ () => handleShowReviewBox(review.id) } className="btn btn-outline-primary btn-sm">ایجاد</button>
                                                    </td>
                                                    <td className="d-none d-md-table-cell text-center">
                                                        <button onClick={ () => handleRemoveProduct(review.id) } className="status"><i className="fa fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        ) : <tr><td> نظری ثبت نشد</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Paginate totalItem={ reviews.length } perPage={ perPage } currentPage={ currentPage } onPageChange={ handlePageChange } />


            {
                showReply &&
                <div className="row">

                    <div className="col-md-12">

                        <div className="mb-3">
                            <label className="form-label">پاسخ به نظر:</label>
                            <textarea className="form-control" value={ replyMessage}  rows="3" onChange={ e => setReplyMessage(e.target.value) } ></textarea>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-outline-primary btn-sm" onClick={ () => createReplyMessage() }>ثبت </button>
                            <button onClick={ () => setShowReply(false) } className="btn btn-outline-primary btn-sm">بستن</button>

                        </div>

                    </div>
                </div>
            }



        </Fragment>
    )
}
export default Reviews;