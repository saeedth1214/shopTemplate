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

const Profile = () => {

    const profileData = useSelector(state => state.profileData);
    let user = hasCookie('user') ? getCookie('user') : null;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDataForProfile());
    }, []);

    return (
        <>
            <ProfileContext.Provider value={ { user, comments: profileData.comments, orders: profileData.orders } }>
                <div className="bg-white border rounded">
                    <ToastContainer />
                    <div className="row no-gutters">
                        <div className="col-lg-4 col-xl-3">
                            <div className="profile-content-left pt-5 pb-3">
                                <Info />
                                <UpdateInfo />
                                <ChangePassword />
                            </div>
                        </div>
                        <div className="col-lg-8 col-xl-9">
                            <div>
                                <Widgets />
                                <div className="row">
                                    <Orders />
                                    <Rewiews />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ProfileContext.Provider>
        </>
    )
}
export default Profile;