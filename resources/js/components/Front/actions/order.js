import { createOrderServise } from "../../services/orderServices";
import _ from "lodash";
import { hasCookie } from "../../services/cookieServise";
import { toastr } from "react-redux-toastr";


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
                if (response.data.data === 1) {
                    localStorage.removeItem("card");
                }
                let card = localStorage.getItem("card");
                dispatch({ type: "GET_ITEMS", payload: !_.isNull(card) ? JSON.parse(card) : [] });
                toastr.success(response.data.msg);
                return;
            }
            toastr.warning("برای ایجاد سفارش باید لاگین باشید");
        } catch (error) {
            console.log(error.response, 'err');
        }

    }

}