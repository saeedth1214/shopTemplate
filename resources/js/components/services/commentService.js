
import config from "./config";
import http from "./httpServices";


export const getComments = pid => {
    return http.get(`${config.BASE_URL}api/front/comments/${pid}`);
}

export const getUserProfileCommentServise = () => {
    return http.get(`${config.BASE_URL}api/front/userProfile/comments`);
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



