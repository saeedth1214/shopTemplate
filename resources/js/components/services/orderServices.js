import config from "./config";
import http from "./httpServices";


export const getAllOrderServise = () => {

    return http.get(`${config.BASE_URL}api/brands`);
}


export const createOrderServise = orders => {
    return http.post(`${config.BASE_URL}api/front/create/orders`, orders);
}

export const getOrdersService = () => {

    return http.get(`${config.BASE_URL}api/front/getOrders`);


}

