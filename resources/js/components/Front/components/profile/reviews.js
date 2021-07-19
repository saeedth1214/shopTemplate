import React, { useContext } from 'react';
import ProfileContext from '../../context/profileContext';


const Rewiews = () => {

    const { comments } = useContext(ProfileContext);
    return (
        <div className="col-xl-12 col-md-12">

            <div className="card card-default" data-scroll-height="550" style={ { height: "auto", overflow: "hidden" } }>
                <div className="card-header justify-content-between ">
                    <h2>نظرات ثبت شده</h2>
                </div>

                {
                    (comments !== undefined && comments.length > 0) ? comments.map(item => {

                        return <div className="card-body slim-scroll" style={ { overflow: "hidden", width: "auto", height: "100%" } }>
                            <div className="media py-3 align-items-center justify-content-between">
                                <div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-success text-white">
                                    <i className="mdi mdi-email-outline font-size-20"></i>
                                </div>
                                <div className="media-body pr-3">
                                    <a className="mt-0 mb-1 font-size-15 text-dark" href="#">{ item.title }</a>
                                    <p>{ item.comment }</p>
                                </div>
                                <span className=" font-size-12 d-inline-block"><i className="mdi mdi-clock-outline"></i> { item.date }</span>
                            </div>
                            <div className="media py-3 align-items-center justify-content-between">
                                {
                                    (item.reply !== undefined && item.reply.length > 0) ? item.reply.map((reply, Idx) =>
                                        <div className="media py-3 align-items-center justify-content-between">
                                            <div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-success text-white">
                                                <i className="mdi mdi-email-outline font-size-20"></i>
                                            </div>
                                            <div className="media-body pr-3">
                                                <p>{ reply.reply }</p>
                                            </div>
                                            <span className=" font-size-12 d-inline-block"><i className="mdi mdi-clock-outline"></i> { reply.date }</span>
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                    }) : null
                }
                <div className="mt-3"></div>
            </div>
        </div>
    )
}
export default Rewiews;