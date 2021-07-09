import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import config from "../../../services/config";
import _ from "lodash";
import { paginate } from '../../../utility/paginate';
import Paginate from "../../../services/pagination";

const ShowProduct = ({ products, filter }) => {

    const filterProducts = filter.length > 0 ? filter : products;

    const [perPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);

    const archiveProducts = paginate(filterProducts, currentPage, perPage);

    const handlePageChange = (page,pageCount) => {
    
        (page >= 1 && page <= pageCount)
            ?
            setCurrentPage(page) :
            null;
    }
    return (
        <Fragment>
    
                <div className="row">
                    {
                        archiveProducts.length > 0 ? archiveProducts.map(product => (
                            <div className="col-lg-3 col-md-4 col-sm-6  col-xs-4 " key={ product.id }>
                                <div className="product">
                                    <div className="card">
                                        <Link to={ `/product/${product.id}` } >
                                            <img src={ !_.isEmpty(product.url) ? `${config.BASE_IMG_PATH}${product.url}` : `${config.BASE_DEFAULT_IMG_PATH}` } className="card-img-top productImg" alt="product_image" />
                                        </Link>
                                        <div className="card-body">
                                            <h5 className="card-title">{ product.title }</h5>
                                            <p className="card-text"><small className="text-muted">{ product.price } تومان</small></p>
                                            { 
                                                product['orderCount'] !== undefined 
                                                ?
                                                    <p className="card-text"><small>تعداد سفارش</small><small className="text-muted mr-2 text-black">{ product.orderCount }</small></p>
                                                    :null
                                            }
                                            {
                                                product['totalSells'] !== undefined
                                                    ?
                                                    <p className="card-text "><small>تعداد فروش</small><small className="text-muted mr-2 text-black">{ product.totalSells } </small></p>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                            : null
                    }
                </div>
            <Paginate totalItem={ filterProducts.length } perPage={ perPage } currentPage={ currentPage } onPageChange={ handlePageChange } />
     
        </Fragment>
    );
}
export default ShowProduct;