
import config from "./config";
import http from "./httpServices";
import { getCookie } from "./cookieServise";

const headers = { headers: { authorization: `Bearer ${getCookie('accessToken')}` } };

export const getcatAttr = id => {

    return http.get(`${config.BASE_URL}api/admin/categoryAttribute/${id}`, {headers});

}
export const getAttributeByCateID = id => {

    return http.get(`${config.BASE_URL}api/admin/categoryAttr/${id}`, {headers});

}

export const createCatAttrs = data => {

    return http.post(`${config.BASE_URL}api/admin/categoryAttribute/create`, data, {headers});

}


