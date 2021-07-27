
import http from "./httpServices";
import config from "./config";
import { getCookie } from "./cookieServise";

const headers = { headers: { authorization: `Bearer ${getCookie('accessToken')}` } };

export const getAllMediaServise = () => {

    return http.get(`${config.BASE_URL}api/admin/medias`, {headers});
}

export const updateMediaServise = media => {

    return http.put(`${config.BASE_URL}api/admin/media/update`, media, { headers });
}

export const removeMediaServise = image => {

    return http.post(`${config.BASE_URL}api/admin/media/delete`, image, { headers });
}

export const createMediaServise = media => {

    return http.post(`${config.BASE_URL}api/admin/media/create`, media, { headers });
}
export const changeImageTypeServise = type => {

    return http.put(`${config.BASE_URL}api/admin/media/update`, type, { headers });
}
