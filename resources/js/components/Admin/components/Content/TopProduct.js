import React, { useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { getBestSeller } from '../../actions/dashbord';
import { convertToNumberFormat } from '../../../utility/getNumberFormat';

const TopProduct = () => {
    const bestProducts = useSelector(state => state.best);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBestSeller());
    }, []);
    return (
        <div className="row">
            {
                bestProducts.length > 0 ?
                    bestProducts.map(item =>
                        (
                            <div className="col-md-6" key={ item.Pid }>
                                <div className="card card-default" data-scroll-height="580">
                                    <div className="card-header justify-content-between mb-4">
                                        <h2>پرفروش ترین محصولات </h2>
                                    </div>
                                    <div className="card-body py-0">
                                        <div className="media d-flex mb-5">
                                            <div className="media-image align-self-center mr-3 rounded">
                                                {/* <a href="#"><img src={ img.products.p1 } alt="customer image" /></a> */ }
                                            </div>
                                            <div className="media-body align-self-center">
                                                <a href="#"><h6 className="mb-3 text-dark font-weight-medium">{ item.title }</h6></a>
                                                <p className="float-md-right"><span className="text-dark mr-2">{ item.number }</span>فروش</p>
                                                <p className="d-none d-md-block">{ item.description }</p>
                                                <p className="mb-0">
                                                    <span className="text-dark ml-3">{ convertToNumberFormat(item.price) } تومان</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    )
                    : null
            }
        </div>
    )

}
export default TopProduct;