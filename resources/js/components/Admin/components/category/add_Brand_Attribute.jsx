import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createAttribute } from '../../actions/attributes';
import { createBrand } from '../../actions/brand';
import config from "../../../services/config";
const Add_Brand_Attribute = ({ categories }) => {

    const dispatch = useDispatch();

    // set attributes
    const [slug, setSlug] = useState("");
    const [title, setTitle] = useState("");

    // set brand
    const [brandSlug, setBrandSlug] = useState("");
    const [brandTitle, setBrandTitle] = useState("");
    const [catBrand, getCateBrand] = useState(0);
    const [type, setType] = useState("integer");


    const handleSubmitBrands = e => {

        e.preventDefault();
        const brand = { catBrand, brandSlug, brandTitle };

        dispatch(createBrand(brand));
    }
    const handleSubmitAttributes = e => {

        e.preventDefault();


        const attribute = { slug, title, type };

        dispatch(createAttribute(attribute));

    }
    // console.log("from brand attribute", config.TYPE_OF_ATTRBUTES);
    return (

        <div className="col-6">

            <div className="card card-default">

                <div className="card-header card-header-border-bottom">
                    <h2> افزودن ویژگی و برند </h2>
                </div>

                <div className="card-body">
                    <ul className="nav nav-pills nav-justified nav-style-fill" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active show" id="home3-tab" data-toggle="tab" href="#home3" role="tab" aria-controls="home3" aria-selected="true">ویژگی</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile3-tab" data-toggle="tab" href="#profile3" role="tab" aria-controls="profile3" aria-selected="false">برند</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent4">
                        <div className="tab-pane pt-3 fade active show" id="home3" role="tabpanel" aria-labelledby="home3-tab">
                            <form onSubmit={ handleSubmitAttributes }>
                                <label className="text-dark font-weight-medium">نامک</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="مثلا:color" required onChange={ e => { setSlug(e.target.value) } } />
                                </div>
                                <label className="text-dark font-weight-medium">عنوان</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="مثلا:رنگ" required onChange={ e => { setTitle(e.target.value) } } />
                                </div>
                                <label className="text-dark font-weight-medium">نوع</label>
                                <div className="input-group">

                                    <select className="form-control" value={ type } onChange={ e => setType(e.target.value) }>
                                        {

                                            config.TYPE_OF_ATTRIBUTES.map(item => {
                                                for (const [key,value] of Object.entries(item)) { 
                                                return < option key={ key } value={ key }>{ value}</option>

                                                }
                                            })
                                        }
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm"> ثبت نهایی </button>
                            </form>

                        </div>
                        <div className="tab-pane pt-3 fade" id="profile3" role="tabpanel" aria-labelledby="profile3-tab">

                            <form onSubmit={ handleSubmitBrands }>
                                <div className="card-header justify-content-between align-items-center card-header-border-bottom">
                                    <select className="form-control" name="parent" id="category" onChange={ e => getCateBrand(e.target.value) }>
                                        <option value={ 0 }> select option</option>
                                        {
                                            categories.map(cate => {

                                                return <option key={ cate.id } value={ cate.id }>{ cate.title }</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <label className="text-dark font-weight-medium">نامک</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="مثلا:samsung" required onChange={ e => { setBrandSlug(e.target.value) } } />
                                </div>
                                <label className="text-dark font-weight-medium">عنوان</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="سامسونگ:مثلا" required onChange={ e => { setBrandTitle(e.target.value) } } />
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm"> ثبت نهایی </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Add_Brand_Attribute;