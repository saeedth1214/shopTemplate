import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAlloptions, removeOption } from '../../actions/option';
import Paginate from '../../../services/pagination';
import { paginate } from '../../../utility/paginate';

const Options = () => {


    const options = useSelector(state => state.options);
    const dispatch = useDispatch();



    const [perPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);

    const archiveOptions = paginate(options, currentPage, perPage);

    const handlePageChange = page => {

        setCurrentPage(page);
    }



    useEffect(() => {

        dispatch(getAlloptions());
    }, []);

    const handleRemoveOption = id => {

        dispatch(removeOption(id));

    }
    return (
        <Fragment>


            <div className="row">

                <div className="col-12">


                    <div className="pro-header ">

                        <div className="row align-items-center">

                            <div className="col-6">
                                <span> تنظیمات</span>
                            </div>
                            <div className="col-6">
                                <span> 8 مورد</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card card-default">
                        <div className="card-body">
                            <table className="table">
                                <thead>

                                    <tr>
                                        <th>ردیف</th>
                                        <th>نامک</th>
                                        <th>عنوان</th>
                                        <th>مقدار</th>
                                        <th>دسته بندی</th>
                                        <th>وضعیت</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        archiveOptions.map(option => {
                                            return <tr key={ option.id }>
                                                <td >{ option.id }</td>
                                                <td>{ option.option_slug }</td>
                                                <td>{ option.option_title }</td>
                                                <td>{ option.option_value }</td>
                                                <td>{ option.option_cat }</td>

                                                <td>
                                                    <button onClick={ () => handleRemoveOption(option.id) } className="status trash"><i className="fa fa-trash"></i></button>
                                                    <button className="status edit"><i className="fa fa-edit"></i></button>
                                                </td>
                                            </tr>
                                        })
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Paginate totalItem={ options.length } perPage={ perPage } currentPage={ currentPage } onPageChange={ handlePageChange } />

        </Fragment>
    )

}
export default Options;