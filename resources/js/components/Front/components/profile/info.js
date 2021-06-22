import React, { Fragment, useContext } from 'react';
import * as img from "../../../Admin/components/common/data";
import ProfileContext from '../../context/profileContext';

const Info = () => {

    const { user } = useContext(ProfileContext);

    return (
        <Fragment>
            <div className="card text-center widget-profile px-0 border-0">
                <div className="card-img mx-auto rounded-circle">
                    <img src={ img['USER'] } alt="user image" style={ { width: "100px", height: "100px" } } />
                </div>
                <div className="card-body">
                    <h4 className="py-2 text-dark">{ user.fullname }</h4>
                    <p>{ user.email }</p>
                </div>
            </div>
        </Fragment>
    );
}
export default Info;