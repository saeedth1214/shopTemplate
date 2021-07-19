
import config from "./config";
import http from "./httpServices";


export const getAttributes = () => {

    return http.get(`${config.BASE_URL}api/admin/attributes`, config.TokenApi);

}

export const createAttributeData = attribute => {

    return http.post(`${config.BASE_URL}api/admin/attribute/create`, attribute, config.TokenApi);
}

export const deleteAttribute = attributeId => {
    return http.delete(`${config.BASE_URL}api/admin/attribute/delete/${attributeId}`, config.TokenApi);
}


export const updateAttributeService = attribute => {
    return http.put(`${config.BASE_URL}api/admin/attribute/update`, attribute, config.TokenApi);
}


