
import Cookies from "universal-cookie";
import _ from "lodash";
import { isArray } from "util";

const cookies = new Cookies();

export const setCookie = (name, value, options) => {

    return cookies.set(name, value, options);
}


export const getCookie = key => {

    return cookies.get(key);
}

export const hasCookie = key => {

    return !_.isEmpty(getCookie(key));
}

export const removeCookie = keys => {

    if (Array.isArray(keys)) {
            keys.map(key => {
                hasCookie(key);
                cookies.remove(key);
            })
    } else {
        return cookies.remove(key);
    }
}