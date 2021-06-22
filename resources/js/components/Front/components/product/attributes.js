import React, { useContext, Fragment } from 'react';
import Reviews from './reviews';
import SingleProContext from '../../context/singlePro';

const Attributes = () => {
    const { attributes, product, id } = useContext(SingleProContext);
    return (

        <Fragment>
            {
                (product !== undefined && product.id === parseInt(id))
                    ?
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
                                                        attributes.length > 0 ? attributes.map(attr => (

                                                            <li key={ attr.id }>
                                                                <span className="attr-Title">{ attr.title } : </span>
                                                                <span className="attr-value">{ attr.value } </span>
                                                            </li>

                                                        ))
                                                            : null
                                                    }
                                                </ul>
                                            </div>

                                            <Reviews />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </Fragment>


    )
}
export default Attributes;