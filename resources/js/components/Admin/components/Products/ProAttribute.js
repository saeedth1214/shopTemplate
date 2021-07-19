import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProductAttribute, updateAttributeValue } from '../../actions/products';
import _ from "lodash";

function ProAttribute(props) {

    const attributeValue = useSelector(state => state.attributeValue);
    let [currentAttributeArray] = useState([]);
    const [, forceUpdate] = useState();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductAttribute(props.pid));
    }, [props.pid]);

    const updateAttribute = (element, attrValID) => {
        element = element.replace(/^\s+|\s+$/gm, '');
        let index = _.findIndex(currentAttributeArray, { attrValID });
        if (index === -1) {
            currentAttributeArray.push({ attrValID, element });
            return;
        }
        let attribute = currentAttributeArray[index];
        attribute = { ...attribute, element };
        currentAttributeArray.splice(index, 1, attribute);

    }
    const submitUpdateAttribute = () => {
        dispatch(updateAttributeValue(currentAttributeArray));
        forceUpdate(0);
        props.setShow(false);
    }

    const reset = () => {

        let input = document.querySelectorAll("[name=input]");
        console.log(input);
    }
    return (
        <div className="row">
            <div className="col-12">
                <div className="card card-default">
                    <div className="pro-attribute">
                        {
                            attributeValue.map(item => {
                                switch (item.type) {
                                    case "tinytext":
                                        return <div className=" col-md-3 mb-3">
                                            <label>{ item.atTitle }  :  { item.element }</label>
                                            <input type='text' className='form-control form-control-sm' name="input" onChange={ e => {
                                                updateAttribute(e.target.value, item.attrValID);
                                            } } />
                                        </div>

                                    case "bigtext":
                                        return <div className="col-md-3 mb-3">
                                            <label>{ item.atTitle }</label>
                                            <textarea className='form-control form-control-sm big-text' name="input" cols='10' rows='5' placeholder='توضیحات ...' onChange={ e => {
                                                updateAttribute(e.target.value, item.attrValID);
                                            } } ></textarea>
                                        </div>

                                    case "integer":
                                        return <div className="col-md-3 mb-3">
                                            <label>{ item.atTitle }</label>
                                            <input type='number' min='0' max='4096' className='form-control form-control-sm' name="input" onChange={ e => {
                                                updateAttribute(e.target.value, item.attrValID);
                                            } } />
                                        </div>
                                    case "float":
                                        return <div className="col-md-3 mb-3">
                                            <label>{ item.atTitle }</label>
                                            <input type='number' step='0.1' min='0' max='100000000' name="input" className='form-control form-control-sm' onChange={ e => {
                                                updateAttribute(e.target.value, item.attrValID);
                                            } } />
                                        </div>
                                }
                            })
                        }
                        <div className="col-md-3">
                            <button className="btn btn-primary btn-sm" onClick={ () => submitUpdateAttribute() }>ویرایش </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}


export default ProAttribute;