import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useToasts } from 'react-toast-notifications';

const MessageNotification = (props) => {
    // const { message, type } = useSelector(state => state.notification);
    const { addToast } = useToasts();

    // useEffect(() => {
    //     // console.log(message, "noti");
    // }, []);
    return (
        // addToast("salam", { appearance: 'error' })
        null
    )
}
export default MessageNotification;