
import config from "./config";
import http from "./httpServices";

export const getCategories = () => {

    return http.get(`${config.BASE_URL}api/front/categories`);

}
export const getAttrForCate = id => {

    return http.get(`${config.BASE_URL}api/admin/categoryAttr/${id}`, config.TokenApi);

}

export const createCategoryData = category => {

    return http.post(`${config.BASE_URL}api/admin/category/create`, category, config.TokenApi);
}

export const deleteCategory = categoryId => {
    return http.delete(`${config.BASE_URL}api/admin/category/delete/${categoryId}`, config.TokenApi);
}

export const updateCategoryService = (category) => {
    return http.put(`${config.BASE_URL}api/admin/category/update`, category, config.TokenApi);
}


export const getMaincategoryService = () => {

    return http.get(`${config.BASE_URL}api/mainCategories`);
}


