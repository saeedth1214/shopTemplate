import { getUsers } from "../../services/userService";

export const getAllUsers = () => {

    return async dispatch => {

        const { data} = await getUsers();
        await dispatch({ type: "GET_USERS", payload: data });
    }

}