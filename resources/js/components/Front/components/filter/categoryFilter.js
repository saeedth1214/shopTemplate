import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllcategories } from '../../../Admin/actions/category';
import { getProductsByCategory } from '../../../Admin/actions/products';
import { getCategoryBrands } from '../../../Admin/actions/brand';
import BrandFilter from './brandFilter';
const Categoryfilter = () => {
    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllcategories());
    }, []);

    const handleChangeCategory = e => {

        e.preventDefault();
        if (e.target.value !== 0) {
            dispatch(getProductsByCategory(e.target.value));
            dispatch(getCategoryBrands(e.target.value));
        }

    }
    return (
        <div className="card">
            <div className="card-header">
                <strong> دسته بندی</strong>
            </div>
            <div className="card-body">

                <select name="select" id="select" className="form-control-sm" onChange={ handleChangeCategory }>
                    <option value={ 0 } key={ 0 }>یک مورد را انتخاب کنید</option>
                    {

                        categories.length > 0 ? categories.map(cate => (
                            <option value={ cate.id } key={ cate.id }>{ cate.title }</option>
                        ))
                            : <option value="0" key={ 1 }>مشکلی از سمت سرور پیش آمده است </option>
                    }

                </select>
                <BrandFilter />
            </div>
        </div>
    )
}
export default Categoryfilter;