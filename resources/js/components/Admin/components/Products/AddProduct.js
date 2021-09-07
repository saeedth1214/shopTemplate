import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllcategories } from '../../actions/category';
import { getAttributeByCatID } from '../../actions/categoryAttributs';
import Brands from '../category/brands';
import { getBrands } from '../../actions/brand';
import { createProduct } from '../../actions/products';
import simpleReactValidator from "simple-react-validator";



const AddProduct = () => {

    // validator

    const validator = useRef(new simpleReactValidator(
        {
            messages: {
                required: "وارد کردن این فیلد الزامیست",
                min: "مقدار ورودی کوتاه است",
                max: "مقدار ورودی بیش از حد مجاز است",

            }
        }
    ));
    // product info 
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(1000);
    const [description, setDescription] = useState("");



    // end info



    // attributes  
    const categories = useSelector(state => state.categories);
    const cateAttr = useSelector(state => state.cateAttr);
    let allBrands = useSelector(state => state.brands);
    const dispatch = useDispatch();

    const [category, setCategory] = useState(0);
    const [brand, setBrand] = useState(0);
    const [attributeArray, setAttributeArray] = useState([]);
    const [, forceUpdate] = useState();


    useEffect(() => {
        dispatch(getAllcategories());

    }, []);


    const getCategoryBrand = catId => {
        dispatch(getBrands(catId));
    }
    const handleChangeCategory = e => {


        dispatch(getAttributeByCatID(e.target.value));
        getCategoryBrand(e.target.value);
        setCategory(e.target.value);
        setAttributeArray([]);
    }

    const createArray = (element, attrID) => {

        element = element.replace(/^\s+|\s+$/gm, '');
        let index = attributeArray.findIndex(item => parseInt(item.attrID) === parseInt(attrID));

        if (index === -1) { // when attribute not exists
            attributeArray.push(setAttributeArray([...attributeArray, { attrID, element }]));

        } else { // when attribute exists 

            let attribute = attributeArray[index];
            attribute = { ...attribute, element };
            attributeArray[index] = attribute;
            // }

        }
    }

    const handleCreateProduct = e => {
        e.preventDefault();

        let message = false;
        // console.log(attributeArray);
        if (validator.current.allValid()) {
            message = attributeArray.findIndex(item =>
                item.element.length === 0
            );
            if (message != -1) {

                // warrningNoti("لطفا مقادیری را برای ویژگی محصول انتخاب کنید");
                return;
            }

            const product = { title, quantity, price, description, category, brand, attributeArray };
            dispatch(createProduct(product));
            reset();
        } else {
            validator.current.showMessages();
            forceUpdate('');
        }

    }


    const reset = () => {

        setTitle("");
        setQuantity(0);
        setPrice(1000);
        setDescription("");


    }

    // end attributes

    const getBrandID = id => {
        setBrand(id);
    }
    return (
        <Fragment>

            <div className="row">
                <div className="col-md-12">
                    <div className="card card-default p-3">
                        <form onSubmit={ handleCreateProduct }>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-6 col-xl-6">
                                    <div className="card card-default">
                                        <div className="card-header card-header-border-bottom">
                                            <h5>مشخصات کلی محصول</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="col-md-12 mb-3">
                                                <label>دسته بندی</label>
                                                <select type="text" className="form-control" required onChange={ handleChangeCategory }>
                                                    <option key={ 0 } value={ 0 }> select option</option>
                                                    {

                                                        categories.length > 0 ? categories.map(cate => {
                                                            return <option value={ cate.id } key={ cate.id }>{ cate.title }</option>


                                                        }) : <option value={ 0 }> موردی یافت نشد</option>
                                                    }

                                                </select>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>برند</label>
                                                <Brands brands={ allBrands } setBrandId={ id => getBrandID(id) } key="brand" />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>عنوان</label>
                                                <input type="text" value={ title } className="form-control" name="proTitle" onChange={ e => setTitle(e.target.value) } />
                                                { validator.current.message("proTitle", title, "required|min:3|max:128") }
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label >تعداد</label>
                                                <input type="number" min="1" max="100" className="form-control" name="proQunatity" value={ quantity } onChange={ e => setQuantity(e.target.value) } />
                                                { validator.current.message("proQunatity", quantity, "required") }

                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>قیمت</label>
                                                <input type="number" min="1000" max="100000000" className="form-control" value={ price } name="proPrice" onChange={ e => setPrice(e.target.value) } />
                                                { validator.current.message("proPrice", price, "required") }

                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>توضیحات</label>
                                                <textarea className="form-control" value={ description } row="3" name="proDes" onChange={ e => setDescription(e.target.value) } />
                                                { validator.current.message("proDes", description, "required|min:3") }

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-6 col-xl-6">
                                    <div className="card card-default">
                                        <div className="card-header card-header-border-bottom">
                                            <h5>مشخصات نسبت به دسته بندی محصول</h5>
                                        </div>
                                        <div className="card-body">
                                            {
                                                cateAttr.map(item => {
                                                    switch (item.type) {
                                                        case "tinytext":
                                                            return <div className="col-md-12 mb-3" key={ item.id }>
                                                                <label>{ item.title }</label>
                                                                <input type='text' className='form-control form-control-sm' required name={ `attribute${item.id}` } onChange={ e => {
                                                                    createArray(e.target.value, item.id);
                                                                } } />

                                                            </div>

                                                        case "bigtext":
                                                            return <div className="col-md-12 mb-3" key={ item.id }>
                                                                <label>{ item.title }</label>
                                                                <textarea className='form-control form-control-sm big-text' cols='10' rows='5' required placeholder='توضیحات ...' ></textarea>
                                                            </div>

                                                        case "integer":
                                                            return <div className="col-md-12 mb-3" key={ item.id }>
                                                                <label>{ item.title }</label>
                                                                <input type='number' min='0' max='4096' className='form-control form-control-sm' required onChange={ e => {
                                                                    createArray(e.target.value, item.id);
                                                                } } />
                                                            </div>
                                                        case "float":
                                                            return <div className="col-md-12 mb-3" key={ item.id }>
                                                                <label>{ item.title }</label>
                                                                <input type='number' step='0.1' min='0' max='100000000' required className='form-control form-control-sm' onChange={ e => {
                                                                    createArray(e.target.value, item.id);
                                                                } } />
                                                            </div>
                                                    }
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-outline-primary btn-sm ">ثبت نهایی </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment >
    );
}
export default AddProduct;