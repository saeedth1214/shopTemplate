import React from 'react';
import { Redirect } from "react-router-dom";
import { hasCookie } from '../../../services/cookieServise';
const Login_middleware = (props) => {
    if (props.login) {
        return hasCookie('user') ? <Redirect to="/" /> : props.children;
    } else if (props.profile) {
        return hasCookie('user') ? props.children : <Redirect to="/user/login" />;
    } else {
        return <Redirect to="/" />;
    }
}
export default Login_middleware;