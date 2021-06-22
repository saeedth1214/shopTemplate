import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { getProductAttribute } from '../../../actions/products';


const UpdateAttributeValueDialog = ({ showDialogAttributeValue, closeDialogAttributeValue, proId }) => {

    const attributeValue = useSelector(state => state.attributeValue);
    const [attributeTitle, setAttributeTitle] = useState("");
    const [, forceUpdate] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductAttribute(proId));

        forceUpdate("");
    }, [proId]);

    console.log(attributeValue, proId);

    const updateAttribute = (element, attrID) => {
        let index = _.findIndex(currentAttributeArray, { attribute_id: attrID });
        if (index === -1) {
            currentAttributeArray.push({ attribute_id: attrID, value: element, category_id: cid, product_id: id });
            // console.log()
            return;
        }
        let attribute = currentAttributeArray[index];
        attribute = { ...attribute, value: element };
        currentAttributeArray.splice(index, 1, attribute);

    }
    console.log(currentAttributeArray);
    return (

        <DialogOverlay isOpen={ showDialogAttributeValue } onDismiss={ closeDialogAttributeValue } className="dialogOverlay">

            <DialogContent className="dialogContent">

                <div className="reachDialog">

                    <div className="card-header card-header-border-bottom">
                        <h6 className="dialogTitle">ویرایش ویژگی</h6>
                    </div>
                    <div className="card-body">
                        <form className="form-pill" >
                            {

                                attributeValue.map(item => {
                                    switch (item.type) {
                                        case "tinytext":
                                            return <div className="col-md-12 mb-3">
                                                <label>{ item.atTitle }</label>
                                                <input type='text' className='form-control form-control-sm' onChange={ e => {
                                                    updateAttribute(e.target.value, item.attrId);
                                                } } />
                                            </div>

                                        case "bigtext":
                                            return <div className="col-md-12 mb-3">
                                                <label>{ item.atTitle }</label>
                                                <textarea className='form-control form-control-sm big-text' cols='10' rows='5' placeholder='توضیحات ...' onChange={ e => {
                                                    updateAttribute(e.target.value, item.attrId);
                                                } } ></textarea>
                                            </div>

                                        case "integer":
                                            return <div className="col-md-12 mb-3">
                                                <label>{ item.atTitle }</label>
                                                <input type='number' min='0' max='4096' className='form-control form-control-sm' onChange={ e => {
                                                    updateAttribute(e.target.value, item.attrId);
                                                } } />
                                            </div>
                                        case "float":
                                            return <div className="col-md-12 mb-3">
                                                <label>{ item.atTitle }</label>
                                                <input type='number' step='0.1' min='0' max='100000000' className='form-control form-control-sm' onChange={ e => {
                                                    updateAttribute(e.target.value, item.attrId);
                                                } } />
                                            </div>
                                    }
                                })
                            }
                            <button type="submit" className="btn btn-success">  ویرایش</button>
                            <button className="btn btn-warning ml-2" onClick={ closeDialogAttributeValue }>انصراف</button>
                        </form>
                    </div>

                </div>
            </DialogContent>
        </DialogOverlay>
    )
}
export default UpdateAttributeValueDialog;