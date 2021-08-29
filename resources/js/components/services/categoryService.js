
import config from "./config";
import http from "./httpServices";
import { getCookie } from "./cookieServise";

const headers = { headers: { authorization: `Bearer ${getCookie('accessToken')}` } };

export const getCategories = () => {

    return http.get(`${config.BASE_URL}api/front/categories`);

}
export const getAttrForCate = id => {

    return http.get(`${config.BASE_URL}api/admin/categoryAttr/${id}`, { headers});

}

export const createCategoryData = category => {

    return http.post(`${config.BASE_URL}api/admin/category/create`, category, { headers});
}

export const deleteCategory = categoryId => {
    return http.delete(`${config.BASE_URL}api/admin/category/delete/${categoryId}`, { headers});
}

export const updateCategoryService = (category) => {
    return http.put(`${config.BASE_URL}api/admin/category/update`, category, { headers});
}


export const getMaincategoryService = () => {

    return http.get(`${config.BASE_URL}api/mainCategories`);
}


