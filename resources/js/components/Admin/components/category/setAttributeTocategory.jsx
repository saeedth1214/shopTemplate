import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllattributes, removeAttribute } from '../../actions/attributes';
import { createCategoryAttributes, getAllCateAttr } from '../../actions/categoryAttributs';
import UpdateAttributeDialog from '../dialogs/attribute/updateAttributeDialog';

const Set_Attribute_To_Category = ({ categories }) => {

    const attributes = useSelector(state => state.attributes);
    const cateAttr = useSelector(state => state.cateAttr);
    const [category, setCategory] = useState(0);
    const [updateId, setupdateId] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    const showDialog = () => { setOpenDialog(true) }
    const closeDialog = () => { setOpenDialog(false) }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllattributes());
    }, []);


    const handleCategoryAttr = () => {


        var mdis = document.querySelectorAll(".attr");
        var mdiArr = Array.from(mdis); // convert nodelist to array
        let attrs = [];
        mdiArr.map(mdi => {
            // get selected attributes 
            if (mdi.classList.contains("mdibg")) {

                attrs.push(mdi.getAttribute('value'));
            }
        })
        const data = { category, attrs };
        dispatch(createCategoryAttributes(data));
    }
    const getCateAttr = cateId => {
        // let btn = document.getElementById("btn-cateAttr");

        if (cateId != 0) {
            dispatch(getAllCateAttr(cateId));
            // btn.removeAttribute("disabled");
            setCategory(cateId)
        }
    }
    const handleAttributeDelete = e => {



        var el = e.target;
        var id = el.getAttribute('value');

        dispatch(removeAttribute(id));

    }
    const handleAttributeUpdate = e => {

        var el = e.target;
        var id = el.getAttribute('value');
        setupdateId(id);
        showDialog();

    }

    const handleSelectItem = el => {

        let mdi = el.target;
        mdi.classList.toggle("mdibg");

    }

    return (
        <div className="col-6">

            <UpdateAttributeDialog showDialog={ openDialog } closeDialog={ closeDialog } id={ updateId } />
            <div className="card card-default todo-table">
                <div className="card-header justify-content-between align-items-center card-header-border-bottom">
                    <h2 className="d-inline-block">ویژگیها</h2>

                    <button className="btn btn-outline-primary btn-sm" id="btn-cateAttr" onClick={ handleCategoryAttr }> ثبت تغییرات</button>

                </div>

                <div className="card-header justify-content-between align-items-center card-header-border-bottom">
                    <select className="form-control" name="parent" id="category" onChange={ e => getCateAttr(e.target.value) }>
                        <option value={ 0 }> select option</option>
                        {
                            categories.map(cate => {

                                return <option key={ cate.id } value={ cate.id }>{ cate.title }</option>
                            })
                        }


                    </select>
                </div>

                <div className="card-body slim-scroll">
                    <div className="todo-list" id="todo-list">

                        {
                            attributes.map(attribute => {

                                return <div key={ attribute.id } className="todo-single-item d-flex flex-row justify-content-between">

                                    <i className={ `${(cateAttr.length !== 0 && cateAttr.includes(attribute.id)) ? " mdi mdibg attr " : "mdi attr "}` } value={ attribute.id } onClick={ handleSelectItem }></i>

                                    <span > { attribute.title }</span>

                                    <div className="badge-style">
                                        <span className="badge badge-warning" value={ attribute.id } onClick={ handleAttributeDelete }>حذف</span>
                                        <span className="badge badge-primary" value={ attribute.id } onClick={ handleAttributeUpdate }>ویرایش</span>
                                    </div>
                                </div>

                            })
                        }
                    </div>
                </div>
                <div className="mt-3"></div>
            </div>
        </div>
    )
}
export default Set_Attribute_To_Category;