import React, { Fragment } from 'react';
import { useDispatch } from "react-redux";
import Categoryfilter from './categoryFilter';
import { filterNewestProduct, filterPopularProduct, filterBestSellerProduct } from '../../../Admin/actions/products';
import { Parser } from 'webpack';

const Filter = () => {

    const dispatch = useDispatch();

    const filterByNewest = element => {
        changeStyle(element);

        dispatch(filterNewestProduct());
    }

    const filterBestSeller = element => {
        changeStyle(element);

        dispatch(filterBestSellerProduct());
    }
    const filterByPopular = element => {
        changeStyle(element);

        dispatch(filterPopularProduct());
    }


    const changeStyle = element => {
        let lis = element.parentElement.children;
        lis = Array.from(lis);
        lis.map(li => {
            li.classList.remove("activeLink");
        });
        element.classList.add("activeLink");

    }

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
                            {/* <Categoryfilter /> */ }
                        </li>
                        <li>
                            <ul className="other-filter">
                                <li onClick={ e => filterByPopular(e.target) }>محبوب ترین</li>
                                <li onClick={ e => filterBestSeller(e.target) }>پرفروش ترین</li>
                                <li onClick={ e => filterByNewest(e.target) }>جدیدترین</li>
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