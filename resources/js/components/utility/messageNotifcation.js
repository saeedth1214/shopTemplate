import { toast, Slide } from "react-toastify";

export function successNoti(message) {

    toast.success(message, {
        position: "top-right",
        autoClose: 1000,
        transition: Slide
        
    });

}


export function errorNoti(message) { 
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        transition: Slide
    });

}

export function warrningNoti(message) {
    toast.warning(message, {
        position: "top-right",
        autoClose: 1000,
        transition: Slide
    });

}
