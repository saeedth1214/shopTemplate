
import http from "./httpServices";
import config from "./config";


export const getAllMediaServise = () => {

    return http.get(`${config.BASE_URL}api/admin/medias`);
}

export const updateMediaServise = media => {

    return http.put(`${config.BASE_URL}api/admin/media/update`, media, config.TokenApi);
}

export const removeMediaServise = image => {

    return http.post(`${config.BASE_URL}api/admin/media/delete`, image, config.TokenApi);
}


export const createMediaServise = media => {

    return http.post(`${config.BASE_URL}api/admin/media/create`, media, config.TokenApi);
}
export const changeImageTypeServise = type => {

    return http.put(`${config.BASE_URL}api/admin/media/update`, type, config.TokenApi);
}
