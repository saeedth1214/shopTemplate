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


    console.log("category filter");
    const handleChangeCategory = e => {

        e.preventDefault();

        dispatch(getProductsByCategory(parseInt(e.target.value)));
        dispatch(getCategoryBrands(parseInt(e.target.value)));
    }
    return (

        <>

            <select name="select" id="select" className="form-control-sm" onChange={ handleChangeCategory }>
                <option value={ 0 } key={ 0 }>انتخاب دسته بندی</option>
                {
                    categories.length > 0 ? categories.map(cate => (
                        <option value={ cate.id } key={ cate.id }>{ cate.title }</option>
                    ))
                        : <option value="0" key={ 1 }>مشکلی از سمت سرور پیش آمده است </option>
                }
            </select>
            <BrandFilter />
        </>

    )
}
export default Categoryfilter;