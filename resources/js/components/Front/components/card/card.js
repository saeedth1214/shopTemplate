import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { increaseCountItem, decreaseCountItem, removeItem, getItems } from '../../actions/card';
import { createOrderAction } from '../../actions/order';
import config from "../../../services/config";


const Card = () => {

    const card = useSelector(state => state.card);
    const dispacth = useDispatch();

    useEffect(() => {
        dispacth(getItems())
    }, []);


    const increaseCount = index => {

        dispacth(increaseCountItem(index));
    }

    const decreaseCount = index => {

        dispacth(decreaseCountItem(index));

    }

    const removeCardItem = id => {

        dispacth(removeItem(id));
    }

    const getTotalprice = () => {

        let totalPrice = 0;
        card.length > 0 ? card.map(item => {
            totalPrice += parseInt(item.quantity) * parseInt(item.product.price.split(",").join(''));
        }) : totalPrice = 0;
        return new Intl.NumberFormat().format(totalPrice);
    }

    const getSingleProductPrice = item => {
        return new Intl.NumberFormat().format(parseInt(item.quantity) * parseInt(item.product.price.split(',').join('')));
    }
    const createOrder = e => {
        e.preventDefault();
        dispacth(createOrderAction(card));
    }

    return (
        <Fragment>
            {/* <Header /> */ }
       
                <header className="cardHeader text-center">
                    <div className="container headerStyle">
                        <p className="shoppingTitle">سبد خرید</p>
                        <p className="shoppingBag">
                            <span className="fa fa-shopping-bag"></span>
                            <span className="cardQuantity">{ card.length }</span>
                        </p>
                    </div>
                </header>
                <div className="container">
                    <div className="card card-default">

                        <div className="card-body">
                            <ul className="card_Item_List">
                                {
                                    card.length > 0 ? card.map((item, index) => (

                                        <li className="card_Item">
                                            <div className="itemDescription">
                                                <img className="cardItemImage" src={ item.image !== null ? `${config.BASE_IMG_PATH}${item.image[0]}` : `${config.BASE_DEFAULT_IMG_PATH}` } style={ { width: "100px", height: "100px" } } />
                                                <div className="itemDetails">
                                                    <p className="cardItemTitle">{ item.product.title }</p>
                                                    <p className="cardItemTotalPrice"> { getSingleProductPrice(item) } تومان  </p>
                                                    {/* <p className="cardItemTotalPrice"> {  item.product.price.split(',').join('') } تومان  </p> */ }
                                                    <span className="removeLink" onClick={ () => { removeCardItem(item.product.id) } }>remove</span>
                                                </div>
                                            </div>
                                            <div className="itemQuantity">
                                                <span className="increaseItem" onClick={ () => increaseCount(index) }> <i className="fa fa-chevron-up"></i> </span>
                                                <p className="cardItemQuantity">{ item.quantity }</p>
                                                <span className="decreaseItem" onClick={ () => decreaseCount(index) }> <i className="fa fa-chevron-down"></i> </span>
                                            </div>
                                        </li>
                                    )) : <div className="empty"> مورد خاصی پیدا نشد </div>
                                }
                            </ul>

                            <hr className="line" />
                            <p className="total_Card_Price">

                                <span className="totalPrice">قیمت نهایی :</span>
                                <span className="totalPrice">{ getTotalprice() } تومان</span>
                            </p>

                        </div>
                        <div className="addOrder">
                            <button onClick={ createOrder } className="btn btn-sm btn-primary" disabled={ card.length === 0 ? "disabled" : '' }>سفارش جدید</button>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */ }
        </Fragment>
    );
}
export default Card;