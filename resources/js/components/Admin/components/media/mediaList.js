
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllMedia, removeMedia, changeImageType } from '../../actions/media';
import config from "../../../services/config";
const MediaList = () => {

    const medias = useSelector(state => state.medias);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllMedia());

    }, []);

    const handleRemovMedia = (id, url) => {
        const image = { id, url }

        dispatch(removeMedia(image));
    }
    const changeType = (e, id) => {
        e.preventDefault();
        // console.log(id);

        const type = { type: e.target.value, id };
        dispatch(changeImageType(type));
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="pro-header ">

                    <div className="row align-items-center">

                        <div className="col-12">

                            <span>نمایش رسانه </span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card card-default">
                    <div className="card-body pt-0 pb-5">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ردیف</th>
                                    <th>نام محصول</th>
                                    <th >نوع عکس</th>
                                    <th>تصویر</th>
                                    <th>وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    medias.length > 0 ? medias.map(media => (
                                        <tr key={ media.mid }>
                                            <td >{ media.mid }</td>
                                            <td >
                                                { media.title }
                                            </td>
                                            <td>
                                                <select className="selectType" onChange={ e => changeType(e, media.mid) }>
                                                    <option value="product_image" selected={ media.mtype === "product_image" ? "product_image" : "" }>تصویر عادی</option>
                                                    <option value="slider_image" selected={ media.mtype === "slider_image" ? "slider_image" : "" }>اسلاید صفحه نخست</option>
                                                </select>
                                            </td>
                                            <td>
                                                <img src={ `${config.BASE_IMG_PATH}${media.murl}` } style={ { width: "50px", height: "50px" } } alt={ `${media.title}` } />
                                            </td>

                                            <td className="text-center">
                                                <button onClick={ () => handleRemovMedia(media.mid, media.murl) } className="status"><i className="fa fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                    )
                                        : <td><span>موردی پیدا نشد</span></td>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MediaList;
