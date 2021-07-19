import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { createOption } from '../../actions/option';
import { createCategory } from '../../actions/category';

const RightSidebar = ({ options, categories }) => {




    const dispatch = useDispatch();
    const [slug, setCatSlug] = useState("");
    const [title, setCatTitle] = useState("");


    const [option_slug, setOptionSlug] = useState("");
    const [option_title, setOptionTitle] = useState("");
    const [option_cat, setOptionCat] = useState("ui");
    const [option_value, setOptionValue] = useState("");

    const reset = () => {

        setOptionSlug("");
        setOptionTitle("");
        setOptionValue("");
        setCatTitle("");
        setCatSlug("");

    }



    const handleSubmitCategoryForm = e => {

        e.preventDefault();
        const category = { slug, title }
        dispatch(createCategory(category));
        reset();
    }
    const handleSubmitOptionForm = e => {

        e.preventDefault();
        const option = {
            option_slug,
            option_title,
            option_cat,
            option_value
        };
        dispatch(createOption(option));
        reset();
    }



    return (

        <div className="right-sidebar">
            <div className="btn-right-sidebar-toggler">
                <i className="mdi mdi-chevron-left"></i>
            </div>

            <div className="right-nav-container">
                <ul className="nav nav-right-sidebar">
                    <li className="nav-item">
                        <a className="nav-link text-primary icon-sm" data-toggle="tab" href="#find-replace" role="tab" aria-controls="nav-home"
                            aria-selected="true">
                            <i className="mdi mdi-note-plus-outline"></i>
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link text-primary icon-sm" data-toggle="tab" href="#set-options" role="tab" aria-controls="nav-home">
                            <i className="mdi mdi-settings mdi-spin"></i>
                        </a>
                    </li> */}
                </ul>
            </div>
            <div className="right-sidebar-tab">
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane" id="find-replace" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <div className="card card-right-sidebar">
                            <div className="card-header">
                                <button type="button" className="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 className="card-title">دسته بندی محصولات</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={ handleSubmitCategoryForm } >
                                    <div className="form-group">
                                        <label >عنوان دسته بندی</label>
                                        <input type="text" className="form-control" name="slug" value={ slug } required onChange={ e => setCatSlug(e.target.value) } />
                                        <small className="form-text text-muted">please insert a slug</small>
                                    </div>

                                    <div className="form-group">
                                        <label >نام دسته بندی</label>
                                        <input type="text" className="form-control" name="title" value={ title } required onChange={ e => setCatTitle(e.target.value) } />
                                        <small className="form-text text-muted">please insert a title</small>
                                    </div>

                                    {/* <div className="form-group">
                                        <label htmlFor="category">دسته بندی پدر</label>
                                        <select className="form-control" name="parent" id="category" value={ parent } onChange={ e => setCatParent(e.target.value) }>
                                            <option key="1" value="2">دسته بندی اصلی</option>

                                            {
                                                categories.map(cate => {

                                                    return <option key={ cate.id } value={ cate.id }>{ cate.title }</option>
                                                })
                                            }


                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>انتخاب بنر</label>
                                        <input type="file" className="form-control" name="Catbanner" />

                                    </div> */}

                                    <button className="btn btn-outline-primary btn-sm">ثبت نهایی</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane" id="set-options" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <div className="card card-right-sidebar">
                            <div className="card-header">
                                <button type="button" className="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 className="card-title">تنظیمات</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={ handleSubmitOptionForm } >
                                    <div className="form-group">
                                        <label >عنوان تنظیمات</label>
                                        <input type="text" className="form-control" name="Optionslug" value={ option_slug } onChange={ e => setOptionSlug(e.target.value) } required />
                                        <small className="form-text text-muted">please insert a slug</small>
                                    </div>

                                    <div className="form-group">
                                        <label >نام تنظیمات</label>
                                        <input type="text" className="form-control" name="Optiontitle" value={ option_title } onChange={ e => setOptionTitle(e.target.value) } required />
                                        <small className="form-text text-muted">please insert a title</small>
                                    </div>

                                    <div className="form-group">
                                        <label >مقدار تنظیمات</label>
                                        <input type="text" className="form-control" name="Optionvalue" value={ option_value } onChange={ e => setOptionValue(e.target.value) } required />
                                        <small className="form-text text-muted">please insert a value</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="options">دسته بندی </label>
                                        <select className="form-control" name="Optioncat" id="options" value={ option_cat } onChange={ e => setOptionCat(e.target.value) } >
                                            <option key="1" value="ui">ظاهری</option>
                                            <option key="2" value="parameter">پارامتری</option>
                                            <option key="3" value="general">عمومی</option>
                                        </select>
                                    </div>
                                    <button className="btn btn-outline-primary btn-sm">ثبت نهایی</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default RightSidebar;