
import config from "./config";
import http from "./httpServices";
export const getcatAttr = id => {

    return http.get(`${config.BASE_URL}api/admin/categoryAttribute/${id}`, config.TokenApi);

}
export const getAttributeByCateID = id => {

    return http.get(`${config.BASE_URL}api/admin/categoryAttr/${id}`, config.TokenApi);

}

export const createCatAttrs = data => {

    return http.post(`${config.BASE_URL}api/admin/categoryAttribute/create`, data, config.TokenApi);

}


