import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CreateReview } from '../../../Admin/actions/reviews';
import { ToastContainer } from 'react-toastify';
import SingleProContext from '../../context/singlePro';

const Reviews = () => {
    const { comments, id } = useContext(SingleProContext);

    console.log(comments);
    const [comment, setComment] = useState("");
    const [rate, setRate] = useState(1);
    const dispatch = useDispatch();


    const handleSelectRate = element => {

        let SelectSpan = element.target;
        let Items = document.querySelectorAll(".rating span");
        Items = Array.from(Items);
        Items.map(item => {
            item.classList.remove("checked");
        });
        SelectSpan.classList.add("checked");
        setRate(SelectSpan.getAttribute("value"));
    }

    const handleSubmitReview = e => {

        e.preventDefault();
        const review = { pid: id, rate, comment };
        dispatch(CreateReview(review));
        setComment("");
        setRate(1);

    }

    // console.log(comments);
    return (
        <div className="tab-pane fade" id="ipills-profile" role="tabpanel" aria-labelledby="ipills-profile-tab">
            <div className="container">
                <ToastContainer />
                <div className="be-comment-block">
                    {
                        comments.length > 0 ? comments.map(comment => {

                            return <div className="be-comment" key={ comment.rid }>
                                <div className="be-img-comment">
                                    <a href="blog-detail-2.html">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="be-ava-comment" />
                                    </a>
                                </div>
                                <div className="be-comment-content">

                                    <span className="be-comment-name">
                                        <a href="blog-detail-2.html">{ comment.fullname }</a>
                                    </span>
                                    <span className="be-comment-time">
                                        <i className="fa fa-clock-o"></i>
                                        {
                                            comment.date
                                        }
                                    </span>

                                    <p className="be-comment-text">
                                        {
                                            comment.comment
                                        }
                                    </p>


                                    {
                                        comment.reply !== undefined ? comment.reply.map(reply => (

                                            <div className="be-comments-reply">
                                                <span>ادمین</span>
                                                <p>{ reply.reply }</p>
                                                <p>{ reply.date }</p>
                                            </div>
                                        ))
                                            : null
                                    }
                                    <div className="Show-rating">
                                        <span value={ comment.rate } className={ `fa fa-star ${comment.rate === 5 ? "checked" : ""}` } selected></span>
                                        <span value={ comment.rate } className={ `fa fa-star ${comment.rate === 4 ? "checked" : ""}` }></span>
                                        <span value={ comment.rate } className={ `fa fa-star ${comment.rate === 3 ? "checked" : ""}` }></span>
                                        <span value={ comment.rate } className={ `fa fa-star ${comment.rate === 2 ? "checked" : ""}` }></span>
                                        <span value={ comment.rate } className={ `fa fa-star ${comment.rate === 1 ? "checked" : ""}` }></span>
                                    </div>
                                </div>
                            </div>
                        })
                            : null
                    }
                    <form className="form-group" onSubmit={ handleSubmitReview }>
                        <div className="row">

                            <div className="col-xs-12 col-md-12">
                                <div className="form-group">
                                    <textarea className="form-input" value={ comment } required placeholder="لطفا نظر خود را اینجا وارد کنید" onChange={ e => setComment(e.target.value) }></textarea>
                                </div>
                                <div className="rating">
                                    <span className="fa fa-star " value="5" onClick={ handleSelectRate }></span>
                                    <span className="fa fa-star " value="4" onClick={ handleSelectRate }></span>
                                    <span className="fa fa-star " value="3" onClick={ handleSelectRate }></span>
                                    <span className="fa fa-star " value="2" onClick={ handleSelectRate }></span>
                                    <span className="fa fa-star " value="1" onClick={ handleSelectRate }></span>
                                </div>
                            </div>

                            <div className="addReview">
                                <button type="submit" className="btn btn-primary pull-right ">ثبت نظر</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default Reviews;