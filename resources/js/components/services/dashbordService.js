
import http from "./httpServices";
import config from "./config";
import { getCookie } from "./cookieServise";

const headers = { headers: { authorization: `Bearer ${getCookie('accessToken')}` } };


export const getDashbordDetailsService = () => {

    return http.get(`${config.BASE_URL}api/admin/getDashboardDetail`, {headers});

}

export const getDashbordNewOrdersService = () => {

    return http.get(`${config.BASE_URL}api/admin/newOrders`,{headers});

}


export const getAllOrdersService = () => {

    return http.get(`${config.BASE_URL}api/admin/allOrders`, {headers});

}

export const getBestSelletService = () => {

    return http.get(`${config.BASE_URL}api/admin/bestSeller`, {headers});

}

export const get_monthly_sales_servise = () => {

    return http.get(`${config.BASE_URL}api/admin/monthlySales`, {headers});

}




