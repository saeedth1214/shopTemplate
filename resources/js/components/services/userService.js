
import config from "./config";
import http from "./httpServices";



export const getUser = userId => {

    return http.get(`${config.BASE_URL}api/admin/user/${userId}`);
}


export const getUsers = () => {

    return http.get(`${config.BASE_URL}api/admin/users`, config.TokenApi);

}

export const createUserByData = user => {
    return http.post(`${config.BASE_URL}api/admin/users/create`, user, config.TokenApi);
}

export const RegisterUserServise = user => {

    return http.post(`${config.BASE_URL}api/front/user/Register`, user);

}


export const removeUserById = userId => {
    return http.delete(`${config.BASE_URL}api/admin/user/delete/${userId}`, config.TokenApi);
}

export const changeUserRoleService = data => {
    return http.put(`${config.BASE_URL}api/admin/user/changeRole`, data, config.TokenApi);
}


export const userLoginFrontend = login => {

    return http.post(`${config.BASE_URL}api/front/user/login`, login);
}

export const userLogoutFrontend = () => {

    return http.get(`${config.BASE_URL}api/front/user/Logout`);

}
export const changeUserFronPassword = pass => {

    return http.post(`${config.BASE_URL}api/front/user/changePassword`, pass);

}

export const updateUserService = user => {

    return http.put(`${config.BASE_URL}api/admin/user/update`, user, config.TokenApi);

}





