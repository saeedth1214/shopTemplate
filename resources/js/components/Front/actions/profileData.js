import { getOrdersService } from "../../services/orderServices";
import { getUserProfileCommentServise } from "../../services/commentService";


export const getDataForProfile = () => {

    return async dispatch => {

        try {
            const responseOrders = await getOrdersService();

            let item = {};
            if (responseOrders.status === 200) {
                item = { ...item, orders: responseOrders.data };
            }
            const responseComments = await getUserProfileCommentServise();
            // console.log(responseComments.data);

            if (responseComments.status === 200) {
                item = { ...item, comments: responseComments.data }
            }
            console.log(item);
            dispatch({ type: "GET_USER_PROFILE_DATA", payload: item });

        } catch (error) {

            console.log(error.response);
        }

    }
}