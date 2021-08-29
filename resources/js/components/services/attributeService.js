
import config from "./config";
import http from "./httpServices";
import { getCookie } from "./cookieServise";


const headers = { headers: { authorization: `Bearer ${getCookie('accessToken')}` } };

export const getAttributes = () => {

    return http.get(`${config.BASE_URL}api/admin/attributes`, {headers});

}

export const createAttributeData = attribute => {

    return http.post(`${config.BASE_URL}api/admin/attribute/create`, attribute, {headers});
}

export const deleteAttribute = attributeId => {
    return http.delete(`${config.BASE_URL}api/admin/attribute/delete/${attributeId}`, {headers});
}


export const updateAttributeService = attribute => {
    return http.put(`${config.BASE_URL}api/admin/attribute/update`, attribute, {headers});
}


