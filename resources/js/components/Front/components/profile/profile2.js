import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Info from './info';
import UpdateInfo from './updateInfo';
import ChangePassword from './changePassword';
import Widgets from './widget';
import Orders from './orders';
import Rewiews from './reviews';
import { getDataForProfile } from '../../actions/profileData';
import { hasCookie, getCookie } from '../../../services/cookieServise';
import ProfileContext from '../../context/profileContext';
import { ToastContainer } from 'react-toastify';
import Header from '../../../Admin/components/common/header';
import Footer from '../../../Admin/components/common/footer';
import { createOrderServise } from '../../../services/orderServices';
const Profile2 = () => {


    const profileData = useSelector(state => state.profileData);
    let user = hasCookie('user') ? getCookie('user') : null;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDataForProfile());
    }, []);

    return (
        <>
            <ProfileContext.Provider value={ { user, comments: profileData.comments, orders: profileData.orders } }>
                <Header />
                <div className="container">

                    <div className="bg-white border rounded">
                        <div className="row no-gutters">
                            <div className="col-lg-4 col-xl-3">
                                <div className="profile-content-left pt-5 pb-3">
                                    <div className="card text-center widget-profile px-0 border-0">
                                        <Info />
                                    </div>

                                    <hr className="w-100" />
                                    <div className="contact-info pt-4">
                                        <UpdateInfo />
                                        <ChangePassword />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 col-xl-9">
                                <div className="profile-content-right py-5">
                                    <ul className="nav nav-tabs px-3 px-xl-5 nav-style-border" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">فعالیت ها</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="timeline-tab" data-toggle="tab" href="#timeline" role="tab" aria-controls="timeline" aria-selected="false">آخرین نظرات</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content px-3 px-xl-5" id="myTabContent">
                                        <div className="tab-pane fade" id="timeline" role="tabpanel" aria-labelledby="timeline-tab">
                                            <Rewiews/>
                                        </div>
                                        <div className="tab-pane active show fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className="mt-5">
                                                <Widgets />
                                                <div className="row">
                                                    <Orders />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </ProfileContext.Provider>
        </>
    )
}
export default Profile2;