import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFilterProducts } from '../../../Admin/actions/products';
const BrandFilter = () => {
    const brands = useSelector(state => state.brands);

    const dispatch = useDispatch();
    var strIds = "";
    const changeBrands = e => {
        const strId = "brand-param-" + e.target.value;

        var checkBox = document.getElementById(strId);

        if (e.target.checked) {

            checkBox.classList.toggle("activeChecked");
            strIds += e.target.value + ",";

        }
        else {
            checkBox.classList.toggle("activeChecked");
            strIds = strIds.replace(e.target.value + ",", "");

        }
        dispatch(getFilterProducts(strIds.split(",")));

    }

    return (
                <div className="brand-content" >
                    <div className="brand-container">
                        <div className="brand-items">

                            <ul>
                                {
                                    brands.length > 0 ? brands.map(brand => (
                                        <li key={ brand.id }>
                                            <label className="brand-filter-item">{ brand.title }</label>
                                            <label className="brand-filter-checkBox">
                                                <input type="checkbox" name={ brand.title } className="input-checkbox" value={ brand.id } onClick={ e => changeBrands(e) } />
                                                <span className="checkbox-checked "><i className="fa fa-check no_active" id={ `brand-param-${brand.id}` } name="brand[]"></i> </span>
                                            </label>
                                        </li>
                                    ))
                                        : null
                                }
                            </ul>
                        </div>
                    </div>
                </div>  
    )
}
export default BrandFilter;