import { createOrderServise } from "../../services/orderServices";
import { successNoti, errorNoti } from "../../utility/messageNotifcation";
import _ from "lodash";
import { hasCookie } from "../../services/cookieServise";


export const createOrderAction = card => {

    return async (dispatch) => {
        let orders = [];
        let cardItems = card;

        try {
            if (hasCookie('accessToken')) {
                cardItems.map(item => {
                    let order = { proId: item.product.id, quantity: item.quantity, totalPrice: parseInt(item.quantity) * parseInt(item.product.price.split(',').join('')), status: "completed" };
                    orders.push(order);
                });
                const response = await createOrderServise(orders);

                console.log(response);
                if (response.data === 1) {
                    localStorage.removeItem("card");
                }
                let card = localStorage.getItem("card");
                dispatch({ type: "GET_ITEMS", payload: !_.isNull(card) ? JSON.parse(card) : [] });
                successNoti(response.data.msg);
                return;
            }
            errorNoti("برای ایجاد سفارش باید لاگین باشید");
        } catch (error) {
            console.log(error.response, 'err');
        }

    }

}