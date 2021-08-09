
import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllMedia, removeMedia, changeImageType } from '../../actions/media';
import config from "../../../services/config";
import { paginate } from '../../../utility/paginate';
import Paginate from "../../../services/pagination";

const MediaList = () => {

    const medias = useSelector(state => state.medias);

    const dispatch = useDispatch();

      const handlePageChange = (page, pageCount) => {

        console.log(page, (page >= 1 && page <= pageCount), pageCount);
        (page >= 1 && page <= pageCount)
            ?
            setCurrentPage(page) :
            null;
    }
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

        const [perPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const archiveMedias = paginate(medias, currentPage, perPage);


    return (
        <>
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
                                        archiveMedias.length > 0 ? archiveMedias.map(media => (
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
              <Paginate totalItem={ medias.length } perPage={ perPage } currentPage={ currentPage } onPageChange={ handlePageChange } />
        </>
    )
}
export default MediaList;
