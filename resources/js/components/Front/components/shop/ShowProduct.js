import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import config from "../../../services/config";
import _ from "lodash";

const ShowProduct = ({ products, filter }) => {

    const filterProducts = filter.length > 0 ? filter : products;

    return (
        <Fragment>
            <div className="col-md-10">
                <div className="row">

                    {
                        filterProducts.length > 0 ? filterProducts.map(product => (
                            <div className="col-md-3 col-sm" key={ product.id }>
                                <div className="product">
                                    <div className="card">
                                        <Link to={ `/product/${product.id}` } >
                                            <img src={ !_.isEmpty(product.url) ? `${config.BASE_IMG_PATH}${product.url}` : `${config.BASE_DEFAULT_IMG_PATH}` } className="card-img-top productImg" alt="product_image" />
                                        </Link>
                                        <div className="card-body">
                                            <h5 className="card-title">{ product.title }</h5>

                                            <p className="card-text"><small className="text-muted">{ product.price } تومان</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                            : null
                    }
                </div>
            </div>

        </Fragment>
    );
}
export default ShowProduct;