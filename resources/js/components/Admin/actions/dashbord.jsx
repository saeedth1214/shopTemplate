import { getDashbordDetailsService, getDashbordNewOrdersService, getAllOrdersService, getBestSelletService, get_monthly_sales_servise } from "../../services/dashbordService";
import { errorNoti } from "../../utility/messageNotifcation";


export const getAllOrders = () => {

    return async dispatch => {

        const { data } = await getAllOrdersService();

        dispatch({ type: "GET_ALL_ORDERS", payload: data });

    }
}
export const getDasboardDetails = () => {

    return async dispatch => {

        try {
            const { data, status } = await getDashbordDetailsService();

            if (status === 200) {
                dispatch({ type: "GET_DETAILS", payload: data });
            }

        } catch (error) {

            errorNoti(error.response.data.msg);
        }
    }
}


export const getNewOrders = () => {


    return async dispatch => {

        try {
            const { data, status } = await getDashbordNewOrdersService();

            if (status === 200) {
                dispatch({ type: "GET_NEW_ORDERS", payload: data });
            }
        }
        catch (error) {

            console.log(error.response, "ssss");

        }

    }
}
export const getBestSeller = () => {


    return async dispatch => {

        try {
            const { data, status } = await getBestSelletService();


            if (status === 200) {
                dispatch({ type: "GET_BEST_SELLER", payload: data });
            }
        }
        catch (error) {

            console.log(error.response, "ssssbbb");

        }

    }
}

export const getChartDataAction = () => {
    return async dispatch => {
        try {
            const { data, status } = await get_monthly_sales_servise();
            if (status === 200) {
                dispatch({ type: "GET_MONTHLY_SALES", payload: data });
            }
        }
        catch (error) {
            console.log(error, "ssssbbb");
        }
    }
}
