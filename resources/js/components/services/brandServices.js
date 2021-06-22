import config from "./config";
import http from "./httpServices";


export const getAllBrandServise = catId => {

    return http.get(`${config.BASE_URL}api/brands/${catId}`);
}

export const createBrandServise = brand => {
    return http.post(`${config.BASE_URL}api/brand/create`,brand);
}

export const removeBrandServise = brandId => {
    return http.post(`${config.BASE_URL}api/brand/remove`,brandId);
}


export const getCategoryBrandServise = cid => {
    return http.get(`${config.BASE_URL}api/category_brand/?cid=${cid}`);
}

