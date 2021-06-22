import { createOrderServise } from "../../services/orderServices";
import { successNoti, errorNoti } from "../../utility/messageNotifcation";
import { isNull } from "util";
import { hasCookie } from "../../services/cookieServise";


export const createOrderAction = card => {

    return async (dispatch) => {
        let orders = [];
        let cardItems = card;
        if (hasCookie('accessToken')) {
            cardItems.map(item => {
                let order = { proId: item.product.id, quantity: item.quantity, totalPrice: parseInt(item.quantity) * parseInt(item.product.price.split(',').join('')), status: "completed" };
                orders.push(order);
            });

            // console.log(orders);

            const { data } = await createOrderServise(orders);
            if (data.data === 1) {
                localStorage.removeItem("card");
            }
            let card = localStorage.getItem("card");
            dispatch({ type: "GET_ITEMS", payload: !isNull(card) ? JSON.parse(card) : [] });
            successNoti(data.msg);
            return;
        }
        errorNoti("برای ایجاد سفارش باید لاگین باشید");
    }

}