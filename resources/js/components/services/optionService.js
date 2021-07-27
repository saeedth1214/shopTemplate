
import config from "./config";
import http from "./httpServices";
import { getCookie } from "./cookieServise";


const headers = { headers: { authorization: `Bearer ${getCookie('accessToken')}` } };


export const getOptions = () => {

    return http.get(`${config.BASE_URL}api/admin/options`, {headers});

}

export const createOptionData = option => {

    return http.post(`${config.BASE_URL}api/admin/option/create`, option, {headers});
}

export const deleteOption = optionId => {
    return http.delete(`${config.BASE_URL}api/admin/option/delete/${optionId}`, {headers});
}



