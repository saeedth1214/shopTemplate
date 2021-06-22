import { toast } from "react-toastify";

export function successNoti(message) {

    toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
    });

}


export function errorNoti(message) { 
    toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
    });

}

export function warrningNoti(message) {
    toast.warning(message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
    });

}
