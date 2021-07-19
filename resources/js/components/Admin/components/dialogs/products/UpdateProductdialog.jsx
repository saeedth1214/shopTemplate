import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import _ from 'lodash';
import { getBrands } from '../../../actions/brand';
import { updateProduct } from '../../../actions/products';

const UpdateProductDialog = ({ showDialog, closeDialog, product }) => {
    const categories = useSelector(state => state.categories);


    const brands = useSelector(state => state.brands);

    const dispatch = useDispatch();
    // product info
    const [bid, setBrand] = useState(0);
    const [id, setProId] = useState(0);
    const [cid, setCategory] = useState(0);
    const [btitle, setBrandTitle] = useState('');
    const [ctitle, setCategoryTitle] = useState('');

    // product info 
    const [pro_title, setTitle] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(1000);
    const [description, setDescription] = useState("");

    useEffect(() => {

        if (!_.isEmpty(product)) {
            setAttributeUpdatedproduct(product);
        }
    }, [product]);

    const handleUpdateProductForm = e => {

        e.preventDefault();
        const product = { pro_title, quantity, price, description, cid, bid, btitle, ctitle };
        dispatch(updateProduct(id, product));

        closeDialog();

    }

    const setAttributeUpdatedproduct = product => {

        setTitle(product.pro_title);
        setQuantity(product.quantity);
        setPrice(product.price.replace(/,/gm, ""));
        setDescription(product.description);
        setBrand(product.bid);
        setBrandTitle(product.btitle);
        setCategoryTitle(product.ctitle);
        setCategory(product.cid);
        setProId(product.id);
        // _.isEmpty(currentAttributeArray) ?
        //     product.attribute.map(item => {
        //         const attribute = { attribute_id: item.attrID, value: item.element, category_id: product.product.cid, product_id: product.product.id };
        //         currentAttributeArray.push(attribute);
        //     }) : null;

    }
    const getCategoryBrand = catId => {
        dispatch(getBrands(catId));
    }
    const handleChangeCategory = e => {

        getCategoryBrand(e.target.value);
        setCategory(e.target.value);
        setCategoryTitle(e.target[event.target.selectedIndex].getAttribute('data-title'));
        // setBrand(0)
    }
    const handleChangeBrand = e => {
        setBrand(e.target.value);
        setBrandTitle(e.target[event.target.selectedIndex].getAttribute('data-title'));
        // setCategory(0);
    }
    return (
        <DialogOverlay isOpen={ showDialog } onDismiss={ closeDialog } className="pro-dialogOverlay">
            <DialogContent className="pro-dialogContent" aria-labelledby="updateProduct">

                <div className="pro-reachDialog">

                    <div className="card-header card-header-border-bottom">
                        <h6 className="dialogTitle">ویرایش محصول</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={ handleUpdateProductForm }>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-default">

                                        <div className="card-body">
                                            <div className="col-md-12 mb-3">
                                                <label>دسته بندی</label>
                                                <select type="text" className="form-control" required onChange={ handleChangeCategory }>
                                                    <option key={ 0 } value={ 0 }> select option</option>
                                                    {

                                                        categories.length > 0 ? categories.map(cate => {
                                                            return <option  data-title={ cate.title } value={ cate.id } key={ cate.title } >{ cate.title }</option>


                                                        }) : <option value={ 0 }> موردی یافت نشد</option>
                                                    }

                                                </select>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>برند</label>
                                                <select className="form-control" name="parent" id="category" onChange={ handleChangeBrand }>
                                                    <option key={ 0 } value={ 0 }> select option</option>

                                                    {
                                                        brands.length > 0 ?
                                                            brands.map(brand => {
                                                                return <option data-title={ brand.title } key={ brand.title } value={ brand.id }>{ brand.title }</option>
                                                            })
                                                            :
                                                            <option value={ 0 }> موردی پیدا نشد</option>
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>عنوان</label>
                                                <input type="text" className="form-control" value={ pro_title } required onChange={ e => setTitle(e.target.value) } />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label >تعداد</label>
                                                <input type="number" min="1" max="100" className="form-control" value={ quantity } required onChange={ e => setQuantity(e.target.value) } />

                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>قیمت</label>
                                                <input type="number" min="1000" max="10000000000" className="form-control" required value={ price } onChange={ e => setPrice(e.target.value) } />

                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <label>توضیحات</label>
                                                <textarea className="form-control" row="3" required value={ description } onChange={ e => setDescription(e.target.value) } />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm ">ویرایش </button>
                            <button onClick={ closeDialog } className="btn btn-warning btn-sm ">انصراف </button>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </DialogOverlay >
    )
}
export default UpdateProductDialog;