import React, { Fragment, useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { removeProduct } from '../../actions/products';
import { paginate } from '../../../utility/paginate';
import Paginate from "../../../services/pagination";
import { getAllProducts } from '../../actions/products';
import UpdateProductDialog from '../dialogs/products/UpdateProductdialog';
import { getAttributeByCatID } from '../../actions/categoryAttributs';
import ProAttribute from './ProAttribute';



const ProductItems = () => {

    // products
    const products = useSelector(state => state.products);
    const cateAttr = useSelector(state => state.cateAttr);

    const dispatch = useDispatch();
    // dialog
    const [updateDialog, setUpdateDialog] = useState(false);
    const [productUpdate, setProductUpdate] = useState({});

    const [showAttribute, setShowAttribute] = useState(false);
    const [proAttributeId, setProAttribteId] = useState(0);
    const [proAttributeCId, setProAttribteCId] = useState(0);
    // update product dialog
    const openDialog = (pid, cid) => {
        handleSingleProduct(pid);
        handleCategoryAttribute(cid);
        setUpdateDialog(true);
    };

    const openAttributeComponent = (pid, cid) => {

        setProAttribteId(pid);
        setProAttribteCId(cid);

        setShowAttribute(!showAttribute);

    }
    const closeDialog = () => setUpdateDialog(false);

    const handleRemoveProduct = (productId) => {
        dispatch(removeProduct(productId));
        setCurrentPage(1);
        setProductUpdate({});
    }
    const handleSingleProduct = (productId) => {

        let product = products.find(item => item.id === productId);
        setProductUpdate(product);

    }
    const handleCategoryAttribute = (cid) => {
        dispatch(getAttributeByCatID(cid));
    }
    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    const [perPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const archiveProducts = paginate(products, currentPage, perPage);


    // const generatePaginate = useCallback(() => {
    //     return <Paginate totalItem={ products.length } perPage={ perPage } currentPage={ currentPage } onPageChange={ handlePageChange } />
    // }, [currentPage]);

    const handlePageChange = (page, pageCount) => {

        console.log(page, (page >= 1 && page <= pageCount), pageCount);
        (page >= 1 && page <= pageCount)
            ?
            setCurrentPage(page) :
            null;
    }

    console.log(productUpdate, cateAttr, updateDialog);
    return (
        <Fragment>

            <div className="products-content">
                {
                    (!_.isEmpty(productUpdate) && updateDialog)
                        ? <UpdateProductDialog showDialog={ updateDialog } closeDialog={ closeDialog } product={ productUpdate } />
                        : null
                }

                <div className="row">
                    <div className="col-12">
                        <div className="pro-header ">

                            <div className="row align-items-center">

                                <div className="col-12">
                                    <span>داشبورد -> لیست محصولات</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card card-default table-responsive" id="recent-orders">

                            <div className="card-body pt-0 pb-5">
                                <table className="table table-hover ">
                                    <thead>
                                        <tr>
                                            {/* <th><span>ردیف</span></th> */ }
                                            <th><span>نام محصول</span></th>
                                            <th><span>دسته بندی</span></th>
                                            <th><span>برند</span></th>
                                            <th><span>تعداد</span></th>
                                            <th><span>قیمت</span></th>
                                            <th><span>ویژگی ها</span></th>
                                            <th><span>وضعیت</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            archiveProducts.length > 0 ? archiveProducts.map(product =>

                                                (
                                                    <tr key={ product.id }>
                                                        {/* <td >{ product.id }</td> */ }
                                                        <td >{ product.pro_title }</td>
                                                        <td>{ product.ctitle }</td>
                                                        <td>{ product.btitle }</td>
                                                        <td>{ product.quantity }</td>
                                                        <td>{ product.price }<span>تومان</span></td>
                                                        <td>
                                                            <button className="btn btn-outline-primary btn-sm" onClick={ () => openAttributeComponent(product.id) }>نمایش</button>

                                                        </td>
                                                        <td className="text-center">
                                                            <button onClick={ () => handleRemoveProduct(product.id) } className="status"><i className="fa fa-trash"></i></button>
                                                            <button onClick={ () => openDialog(product.id, product.cid) } className="status"><i className="fa fa-pencil-square"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            ) : <tr><td><span>محصولی پیدا نشد</span></td></tr>
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
                <Paginate totalItem={ products.length } perPage={ perPage } currentPage={ currentPage } onPageChange={ handlePageChange } />
                {
                    showAttribute ? <ProAttribute pid={ proAttributeId } setShow={ setShowAttribute } cid={ proAttributeCId } key="proAttribute" /> : null
                }
            </div>
        </Fragment>
    )

}
export default ProductItems;


