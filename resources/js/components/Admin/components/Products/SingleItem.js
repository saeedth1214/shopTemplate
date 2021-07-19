import React from 'react';

// import { product.} from "../common/data";

import Slider from "../common/Slider.js";
import Review from '../review/review.js';

const SingleItem = ({ product }) => {
    return (
        <section id="singlePro" className="rtl">

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="backTo">
                            <span>Back to <a href="">Dashboard</a> <i className="fa fa-arrow-left"></i></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <article className="pro-sum">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="single-title">
                                <span> { product.productInfo.title } </span>
                            </div>
                            <div className="single-price">
                                <span> { product.productInfo.price }  تومان</span>

                            </div>
                            <div className="single-description">

                                <p> { product.productInfo.description }
                                </p>

                            </div>
                            <div className="state">
                                <div className="AddToCard-btn">
                                    <button className="btn btn-square btn-dark">افزودن به سبد</button>
                                </div>
                                <div className="number">
                                    <input type="number" min="0" max="100" placeholder="0" className="inputNumber" />
                                </div>

                            </div>

                        </div>
                        <div className="col-md-6">

                            <Slider images={ product.pro_img } />

                        </div>


                    </div>
                </article>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-default">
                            <div className="card-header card-header-border-bottom">
                                <h2>اطلاعات اضافی </h2>
                            </div>
                            <div className="card-body">
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="ipills-home-tab" data-toggle="pill" href="#ipills-home" role="tab" aria-controls="ipills-home" aria-selected="true">
                                            <i className="fa fa-user-md mr-1"></i> ویژگی ها</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="ipills-profile-tab" data-toggle="pill" href="#ipills-profile" role="tab" aria-controls="ipills-profile" aria-selected="false">
                                            <i className="fa fa-user-circle mr-1"></i> نظرات</a>
                                    </li>

                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="ipills-home" role="tabpanel" aria-labelledby="ipills-home-tab">
                                        <ul>
                                            {
                                                product.attrs.map(attr => (

                                                    <li>
                                                        <span className="attr-Title">{ attr.title } : </span>
                                                        <span className="attr-value">{ attr.value } </span>
                                                    </li>

                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="tab-pane fade show active" id="ipills-home" role="tabpanel" aria-labelledby="ipills-home-tab">

                                        <Review comments={ product.comments } replys={ product.reply } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default SingleItem;