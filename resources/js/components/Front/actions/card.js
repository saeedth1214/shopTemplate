
import { successNoti, warrningNoti } from "../../utility/messageNotifcation";
import { isNull } from "util";
export const getItems = () => {
    return (dispatch) => {
        let card = localStorage.getItem("card");
        dispatch({ type: "GET_ITEMS", payload: !isNull(card) ? JSON.parse(card) : [] });
    }
}

export const addItem = item => {

    return (dispatch) => {

        if (localStorage.getItem('card')) {
            let cardItems = JSON.parse(localStorage.getItem("card"));
            let product = cardItems.find(pro => pro.product.id == item.product.id);

            if (product) {
                let sum = parseInt(item.quantity) + parseInt(product.quantity);
                if (sum > parseInt(product.product.quantity)) {
                    warrningNoti("این تعداد از محصول وجود ندارد");
                    return;
                }
                product.quantity = sum;
                cardItems = [...cardItems];
            } else {
                cardItems = [...cardItems, item];

            }
            localStorage.setItem("card", JSON.stringify(cardItems));
        }
        else {
            localStorage.setItem("card", JSON.stringify([item]));
        }
        dispatch({ type: "ADD_ITEM", payload: JSON.parse(localStorage.getItem('card')) });
        successNoti('یک مورد به سبد خرید شما اضافه شد');

    }
}

export const increaseCountItem = index => {

    return (dispatch) => {
        let cardItems = JSON.parse(localStorage.getItem("card"));
        let product = cardItems[index];

        if (parseInt(product.quantity) + 1 <= parseInt(product.product.quantity)) {
            product.quantity = parseInt(product.quantity) + 1;
            cardItems = [...cardItems];
            localStorage.setItem("card", JSON.stringify(cardItems));
        }
        dispatch({ type: "GET_ITEMS", payload: JSON.parse(localStorage.getItem('card')) });

    }
}
export const decreaseCountItem = index => {

    return (dispatch) => {
        let cardItems = JSON.parse(localStorage.getItem("card"));
        let product = cardItems[index];
        if (parseInt(product.quantity) - 1 > 0) {
            product.quantity = parseInt(product.quantity) - 1;
            cardItems = [...cardItems];
            localStorage.setItem("card", JSON.stringify(cardItems));

        }
        dispatch({ type: "GET_ITEMS", payload: JSON.parse(localStorage.getItem('card')) });
    }
}

export const removeItem = index => {
    return (dispatch) => {
        let cardItems = JSON.parse(localStorage.getItem("card"));
        let newCardItems = cardItems.filter(item => item.product.id !== index);
        localStorage.setItem('card', JSON.stringify(newCardItems));
        dispatch({ type: "GET_ITEMS", payload: JSON.parse(localStorage.getItem('card')) });
        warrningNoti('یک مورد از سبد خرید شما کم شد');
    }
}
