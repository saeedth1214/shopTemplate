
import config from "./config";
import http from "./httpServices";




export const getOptions = () => {

    return http.get(`${config.BASE_URL}api/admin/options`, config.TokenApi);

}

export const createOptionData = option => {

    return http.post(`${config.BASE_URL}api/admin/option/create`, option, config.TokenApi);
}

export const deleteOption = optionId => {
    return http.delete(`${config.BASE_URL}api/admin/option/delete/${optionId}`, config.TokenApi);
}



