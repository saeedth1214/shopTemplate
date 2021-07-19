
import http from "./httpServices";
import config from "./config";
import { getCookie } from "./cookieServise";

let TokenApi = {
    headers: {
        'Authorization': getCookie('accessToken')
    }
};

export const getDashbordDetailsService = () => {

    return http.get(`${config.BASE_URL}api/admin/getDashboardDetail`);

}

export const getDashbordNewOrdersService = () => {

    return http.get(`${config.BASE_URL}api/admin/newOrders`);

}


export const getAllOrdersService = () => {

    return http.get(`${config.BASE_URL}api/admin/allOrders`);

}

export const getBestSelletService = () => {

    return http.get(`${config.BASE_URL}api/admin/bestSeller`);

}

export const get_monthly_sales_servise = () => {

    return http.get(`${config.BASE_URL}api/admin/monthlySales`);

}




