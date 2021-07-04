import React, { Fragment } from 'react';
import Categoryfilter from './categoryFilter';

const Filter = () => {
    return (
        <Fragment>
            <div className="row">
                <div className="filter-group">
                    <h5> جستجو بر اساس</h5>
                    <ul>
                        <li>
                            <span>
                                دسته بندی :
                    </span>
                            <Categoryfilter />
                        </li>
                        <li>
                            <ul className="other-filter">
                                <li>محبوب ترین</li>
                                <li>پرفروشترین</li>
                                <li>جدیدترین</li>
                            </ul>
                        </li>
                        <li className="search-input">
                            <i className="fa fa-search"></i>
                            <input type="text" placeholder="لطفا نام یک محصول را وارد کنید" />
                        </li>
                    </ul>

                </div>
            </div>
        </Fragment>
    );
}
export default Filter;