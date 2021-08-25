import React, { useState, useContext, Fragment } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Slider from '../../../Admin/components/common/Slider';
import { addItem } from '../../actions/card';
import { ToastContainer } from "react-toastify";
import _ from "lodash";
import SingleProContext from '../../context/singlePro';


const Item = () => {

    const { product, id } = useContext(SingleProContext);

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleAddItemToCard = () => {
        let image = ('urls' in product) ? product.urls : null
        const item = { product, image, quantity };

        console.log(item);
        dispatch(addItem(item));
    }

    const increaseQuantity = () => {

        let num = quantity + 1;
        if (num <= product.quantity) {

            setQuantity(num);
        }
    }
    const decreaseQuantity = () => {
        let num = quantity - 1;
        if (num >= 1) {

            setQuantity(num);
        }

    }

    return (

        <Fragment>
        
            {

                (product !== undefined && product.id === parseInt(id))
                    ?
                    <section id="singlePro" className="rtl">
                        <ToastContainer />
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="backTo">
                                        <span>مشخصات محصول</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <article className="pro-sum">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="single-title">
                                            <span> { product.title } </span>
                                        </div>
                                        <div className="single-price">
                                            <span> { product.price }  تومان</span>
                                        </div>
                                        <div className="single-description">
                                            <p> { product.description }
                                            </p>
                                        </div>
                                        <div className="state">
                                            <div className="AddToCard-btn">
                                                <button className="btn btn-square btn-dark btn-sm" onClick={ handleAddItemToCard }>افزودن به سبد</button>
                                                <Link className="btn btn-square btn-dark btn-sm text-light" to={ { pathname: "/user/card" } } >سبد خرید</Link>
                                            </div>
                                            <div className="number">
                                                <div className="itemQuantity">
                                                    <span className="increaseItem" onClick={ () => increaseQuantity() }> <i className="fa fa-chevron-up"></i> </span>
                                                    <p className="cardItemQuantity">{ quantity }</p>
                                                    <span className="decreaseItem" onClick={ () => decreaseQuantity() }> <i className="fa fa-chevron-down"></i> </span>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <Slider />
                                    </div>
                                </div>
                            </article>
                        </div>
                    </section>
                    : null
            }

        </Fragment>


    )
}
export default Item;