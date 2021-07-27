
import Cookies from "universal-cookie";
import _ from "lodash";

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


export const setCookieForUserLoggedin = (accessToken,user) => {

    const date = new Date();
    date.setTime(date.getTime() + (1000*3600));
    const options = { path: "/", expires: date };
    setCookie("accessToken", accessToken, options);
    setCookie("user", user, options);

}