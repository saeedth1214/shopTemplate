import axios from "axios";
import { toast } from "react-toastify";


axios.defaults.headers.post["Content-Type"] = "application/json";


axios.interceptors.response.use(null, error => {
    const expectedErrors =
        error.response && error.response.status === 429 || (error.response.status >= 500 && error.response.status <= 599);
    if (expectedErrors) {

        // console.log(error);
        toast.error('مشکلی از سمت سرور پیش آمده است', {
            "position": "top-right",
            "closeOnClick": true
        });
     
    }
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put,
};