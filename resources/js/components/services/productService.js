
import config from "./config";
import http from "./httpServices";
import { getCookie } from "./cookieServise";

const headers = { headers: { authorization: `Bearer ${getCookie('accessToken')}` } };

export const getProduct = productId => {

    return http.get(`${config.BASE_URL}api/front/product/${productId}`);
}


export const getProducts = () => {

    return http.get(`${config.BASE_URL}api/admin/products`, {headers});

}

export const createProductByData = product => {
    return http.post(`${config.BASE_URL}api/admin/product/create`, product, { headers });
}

export const removeProductById = productId => {
    return http.delete(`${config.BASE_URL}api/admin/product/delete/${productId}`, { headers });
}

export const get_Random_Products = () => {
    return http.get(`${config.BASE_URL}api/front/randomProduct`);

}
export const get_newest_Products = () => {
    return http.get(`${config.BASE_URL}api/front/filterProducts/newest`);
}
export const get_popular_Products = () => {
    return http.get(`${config.BASE_URL}api/front/filterProducts/popular`);

}
export const get_bestSeller_Products = () => {
    return http.get(`${config.BASE_URL}api/front/filterProducts/bestSeller`);

}
export const get_Products_By_category_Service = cid => {
    return http.get(`${config.BASE_URL}api/front/productsBycategory/${cid}`);

}


export const updateProductServises = (pId, product) => {
    return http.put(`${config.BASE_URL}api/admin/product/update/${pId}`, product, { headers });

}

