import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllcategories, removeCategory, updatecategory } from '../../actions/category';
import NewCategoryDialog from '../dialogs/category/newCategoryDialog';

import Paginate from '../../../services/pagination.js';
import { paginate } from '../../../utility/paginate.js';

const CategoryItem = () => {


    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();
    const [perPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [newDialog, setNewCategoryDialog] = useState(false);
    const [updateCategory, setCategory] = useState("");

    const categoryData = paginate(categories, currentPage, perPage);


    const handlePageChange = (page,pageCount) => {

        (page >= 1 && page <= pageCount)
            ?
            setCurrentPage(page) :
            null;
    }


    const openDialog = id => {

        setNewCategoryDialog(true);
        let category = categories.find(item => item.id === id);
        setCategory(category)
    };

    const closeDialog = () => setNewCategoryDialog(false);

    useEffect(() => {
        dispatch(getAllcategories());
    }, []);

    const deleteCategory = id => {

        dispatch(removeCategory(id));
        setCurrentPage(1);
    }

    return (
        <Fragment>
            {/* <AdminContext categories={ categories}> */ }
            <NewCategoryDialog showDialog={ newDialog } closeDialog={ closeDialog } category={ updateCategory } />

            <div className="row">
                <div className="col-12">
                    <div className="pro-header ">

                        <div className="row align-items-center">
                            {/* <LoadingBar style={ { background: "lime", height: '5px' } } /> */ }

                            <div className="col-6">
                                <span>داشبورد -> دسته بندی ها </span>
                            </div>
                            <div className="col-6">
                                <button className="btn btn-primary btn-sm" onClick={ () => openDialog(0) } >
                                    <span style={ { "verticalAlign": "text-top", "marginLeft": "5px" } }>
                                        افزودن دسته بندی جدید
                                    </span>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">

                    <div className="card card-default" id="recent-orders">

                        <div className="card-body " >
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th >ردیف</th>
                                        <th >عنوان</th>
                                        <th >نامک</th>
                                        <th >عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {

                                        categoryData.length > 0 ? categoryData.map(category => {
                                            return <tr key={ category.id }>
                                                <td>{ category.id }</td>
                                                <td>{ category.title }</td>
                                                <td>{ category.slug }</td>

                                                <td>

                                                    <button onClick={ () => { deleteCategory(category.id) } } className="status "><i className="fa fa-trash"></i></button>
                                                    <button onClick={ () => openDialog(category.id) } className="status "><i className="fa fa-pencil-square"></i></button>

                                                </td>
                                            </tr>
                                        })
                                            : <tr><td>دسته بندی پیدا نشد</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div >
                </div >
            </div >
            {/* </AdminContext> */ }
            <Paginate totalItem={ categories.length } perPage={ perPage } currentPage={ currentPage } onPageChange={ handlePageChange } />


        </Fragment >

    );
}
export default CategoryItem;