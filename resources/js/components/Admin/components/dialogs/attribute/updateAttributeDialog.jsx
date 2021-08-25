import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { updateAttribute } from '../../../actions/attributes';
import config from "../../../../services/config";

import _ from "lodash";

const UpdateAttributeDialog = ({ showDialog, closeDialog, attribute }) => {



    const dispatch = useDispatch();
    const [slug, setCatSlug] = useState("");
    const [title, setCatTitle] = useState("");
    const [type, setType] = useState("integer");

    useEffect(() => {

        if (!_.isEmpty(attribute)) {

            setCatSlug(attribute.slug);
            setCatTitle(attribute.title);
        }
    }, [attribute]);

    const handleSubmitAttributeForm = e => {

        e.preventDefault();

        const newAttribute = { id: attribute.id, slug, title, type }
        // console.log(attribute);
        dispatch(updateAttribute(newAttribute));
        closeDialog();

    }
    return (



        <DialogOverlay isOpen={ showDialog } onDismiss={ closeDialog } className="dialogOverlay">

            <DialogContent className="dialogContent">

                <div className="reachDialog">

                    <div className="card-header card-header-border-bottom">
                        <h6 className="dialogTitle">ویرایش ویژگی</h6>
                    </div>
                    <div className="card-body">
                        <form className="form-pill" onSubmit={ handleSubmitAttributeForm }>
                            <div className="form-group">
                                <label htmlFor="slug">عنوان ویژگی</label>
                                <input type="text" className="form-control" value={ slug } id="slug" placeholder="مثلا : mobile" required onChange={ e => setCatSlug(e.target.value) } />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">نامک ویژگی</label>
                                <input type="text" className="form-control" value={ title } id="title" placeholder="مثلا: موبایل" required onChange={ e => setCatTitle(e.target.value) } />
                            </div>
                            <div className="input-group">

                                <select className="form-control" value={ type } onChange={ e => setType(e.target.value) }>
                                    {

                                        config.TYPE_OF_ATTRIBUTES.map(item => {
                                            for (const [key, value] of Object.entries(item)) {
                                                return < option key={ key } value={ key }>{ value }</option>

                                            }
                                        })
                                    }
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success">  ویرایش</button>
                            <button className="btn btn-warning ml-2" onClick={ closeDialog }>انصراف</button>
                        </form>
                    </div>

                </div>

            </DialogContent>
        </DialogOverlay>
    )
}
export default UpdateAttributeDialog;