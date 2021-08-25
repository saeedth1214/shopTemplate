
import config from "./config";
import http from "./httpServices";
import { getCookie } from "./cookieServise";


const headers = { headers: { authorization: `Bearer ${getCookie('accessToken')}` } };


export const getUser = userId => {

    return http.get(`${config.BASE_URL}api/admin/user/${userId}`);
}


export const getUsers = () => {

    return http.get(`${config.BASE_URL}api/admin/users`, headers);

}

export const createUserByData = user => {
    return http.post(`${config.BASE_URL}api/admin/users/create`, user, headers);
}

export const RegisterUserServise = user => {

    return http.post(`${config.BASE_URL}api/front/user/register`, user);

}


export const removeUserById = userId => {
    return http.delete(`${config.BASE_URL}api/admin/user/delete/${userId}`, headers);
}

export const changeUserRoleService = data => {
    return http.put(`${config.BASE_URL}api/admin/user/changeRole`, data, headers);
}


export const userLoginFrontend = login => {

    return http.post(`${config.BASE_URL}api/front/user/login`, login);
}

export const userLogoutFrontend = () => {

    return http.get(`${config.BASE_URL}api/front/user/logout`, { headers });

}
export const changeUserFronPassword = pass => {

    return http.post(`${config.BASE_URL}api/front/user/changePassword`, pass);

}

export const forgetPasswordService = email => {

    return http.post(`${config.BASE_URL}api/front/user/forget-password`, email);

}

export const resetPasswordService = credential => {

    return http.post(`${config.BASE_URL}api/front/user/reset-password`, credential);
}
export const updateUserService = user => {

    return http.put(`${config.BASE_URL}api/admin/user/update`, user, headers);

}

export const changeUserProfileImage = image => {

    return http.post(`${config.BASE_URL}api/front/user/changeProfileImage`, image,headers);

}




