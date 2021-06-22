
import config from "./config";
import http from "./httpServices";


export const get_Attribute_value_servise = pId => {
    return http.get(`${config.BASE_URL}api/admin/attribute_value/${pId}`);
}

export const update_Attribute_value_servise = attrVal => {
    return http.put(`${config.BASE_URL}api/admin/attribute_value/update`, attrVal);
}


export const get_Attribute_value_front_servise = pId => {
    return http.get(`${config.BASE_URL}api/front/attribute_value/${pId}`);
}
