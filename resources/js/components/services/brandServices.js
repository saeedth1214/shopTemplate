import config from "./config";
import http from "./httpServices";
import { getCookie } from "./cookieServise";

const headers = { headers: { authorization: `Bearer ${getCookie('accessToken')}` } };

export const getAllBrandServise = catId => {

    return http.get(`${config.BASE_URL}api/admin/brands/${catId}`,{headers});
}

export const createBrandServise = brand => {
    return http.post(`${config.BASE_URL}api/admin/brand/create`,brand,{headers});
}

export const removeBrandServise = brandId => {
    return http.post(`${config.BASE_URL}api/admin/brand/remove`,brandId,{headers});
}


export const getCategoryBrandServise = cid => {
    return http.get(`${config.BASE_URL}api/admin/category_brand/?cid=${cid}`,{headers});
}

