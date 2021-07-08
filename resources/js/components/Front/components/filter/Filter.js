import React, { Fragment, useState } from 'react';
import { useDispatch } from "react-redux";
import { filterByProName,filterNewestProduct, filterPopularProduct, filterBestSellerProduct } from '../../../Admin/actions/products';


const Filter = () => {

    const [searchInput, setSearchInput] = useState("");
    const dispatch = useDispatch();


    const handleChangeInput = value => {
        setSearchInput(value);

    }

    const handleSubmitSearchInput = () => {

        dispatch(filterByProName(searchInput));

    }
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
                            <i className="fa fa-search" onClick={ () => handleSubmitSearchInput() }></i>
                            <input type="text" value={ searchInput } placeholder="لطفا نام یک محصول را وارد کنید" onChange={ e => handleChangeInput(e.target.value) } />
                        </li>
                    </ul>

                </div>
            </div>
        </Fragment>
    );
}
export default Filter;