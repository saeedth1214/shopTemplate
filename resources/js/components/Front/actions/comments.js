import { getComments } from "../../services/commentService";


export const getHomeComments = pid => {

    return async dispatch => {


        try {
            const response = await getComments(pid);
        
            if (response.status === 200) {

                dispatch({ type: "GET_PRODUCT_COMMENTS", payload: response.data });
            }
        } catch (error) {

            console.log(error.response);
        }



    }
}