import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { createCategory, updatecategory } from '../../../actions/category';
import _ from 'lodash';

const NewCategoryDialog = ({ showDialog, closeDialog, category }) => {

    const dispatch = useDispatch();
    const [catSlug, setCatSlug] = useState("");
    const [catTitle, setCatTitle] = useState("");



    useEffect(() => {

        if (!_.isEmpty(category)) {

            setCatSlug(category.slug);
            setCatTitle(category.title);
        }
    }, [category]);
    const removeSpace = element => {

        return element.replace(/^\s+|\s+$/gm, '');
    }
    const handleSubmitCategoryForm = e => {

        e.preventDefault();
        if (_.isEmpty(category)) {
            let title = removeSpace(catTitle);
            let slug = removeSpace(catSlug);

            const category = { slug, title }
            dispatch(createCategory(category));
            setCatSlug("");
            setCatTitle("");

        } else {
            let title = removeSpace(catTitle);
            let slug = removeSpace(catSlug);
            const newCategory = { id: category.id, slug, title };
            dispatch(updatecategory(newCategory));
        }
        closeDialog();

    }
    return (



        <DialogOverlay isOpen={ showDialog } onDismiss={ closeDialog } className="dialogOverlay">

            <DialogContent className="dialogContent">

                <div className="reachDialog">

                    <div className="card-header card-header-border-bottom">
                        <h6 className="dialogTitle">دسته بندی</h6>
                    </div>
                    <div className="card-body">
                        <form className="form-pill" onSubmit={ handleSubmitCategoryForm }>
                            <div className="form-group">
                                <label htmlFor="slug">عنوان دسته بندی</label>
                                <input type="text" className="form-control" id="slug" value={ catSlug } placeholder="مثلا : mobile" onChange={ e => setCatSlug(e.target.value) } />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">نامک دسته بندی</label>
                                <input type="text" className="form-control" id="title" value={ catTitle } placeholder="مثلا: موبایل" onChange={ e => setCatTitle(e.target.value) } />
                            </div>
                            <button type="submit" className="btn btn-success"> { _.isEmpty(category) !== true ? "ویرایش" : "ثبت" }</button>
                            <button className="btn btn-warning ml-2" onClick={ closeDialog }>انصراف</button>
                        </form>
                    </div>

                </div>

            </DialogContent>
        </DialogOverlay>
    )
}
export default NewCategoryDialog;