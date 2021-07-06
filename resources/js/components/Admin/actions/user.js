import { removeUserById, createUserByData, RegisterUserServise, changeUserRoleService, userLoginFrontend, userLogoutFrontend, changeUserFronPassword, updateUserService } from "../../services/userService";
import { errorNoti, successNoti, warrningNoti } from "../../utility/messageNotifcation";
import { setCookie, removeCookie } from "../../services/cookieServise";

import { Redirect } from 'react-router-dom';
export const createUser = user => {

    return async (dispatch, getState) => {

        try {
            const { data, status } = await createUserByData(user);
            if (status === 201) {
                const users = [...getState().users];
                const newUser = {
                    id: users.length == 0 ? data.data.id : users[users.length - 1].id + 1,
                    fullname: data.data.fullname,
                    email: data.data.email,
                    role: data.data.role,
                };
                users.push(newUser);
                await dispatch({ type: "CREATE_USER", payload: users });
                successNoti(data.msg);
            }
            else if (status === 202) {
                warrningNoti(data.msg);
            }

        } catch (error) {

            errorNoti("مشکلی سمت سرور پیش آمده است ");

        }

    }
}

export const removeUser = userId => {

    return async (dispatch, getState) => {

        try {
            const { data, status } = await removeUserById(userId);
            if (status === 201) {
                const users = [...getState().users];
                const newUsers = users.filter(user => user.id !== userId);
                await dispatch({ type: "REMOVE_USER", payload: newUsers });
                successNoti(data.msg);
            }

        } catch (error) {
            error();
        }

    }
}
export const RegisterUser = user => {

    return async () => {

        try {
            const { data, status } = await RegisterUserServise(user);

            if (status === 208) {
                warrningNoti(data.msg);
                return;
            }

            successNoti(data.msg);

        } catch (error) {
            console.log(error.response);
        }

    }
}

export const changeUserPassword = changePass => {

    return async () => {

        // console.log(changePass);

        try {
            const { status, data } = await changeUserFronPassword(changePass);
            if (status === 200) {
                successNoti(data.msg);
            }

        } catch (error) {

            console.log(error.response);
        }

    }
}



export const userLoginFront = (login) => {

    return async dispatch => {

        try {
            const { data, status } = await userLoginFrontend(login);
            if (status === 200) {
                const date = new Date();
                date.setTime(date.getTime() + (24 * 3600 * 1000));
                const options = { path: "/", expires: date };
                setCookie("accessToken", data.userData.accessToken, options);
                setCookie("user", data.userData.user, options);
                successNoti(data.msg);
                dispatch({ type: "LOGIN", payload: true });
            }
        } catch (error) {
            // errorNoti(error.response.data.msg);

            if (error.response.status === 401) {
                errorNoti(error.response.data.msg);
                return;
            }
        }
    }
}

export const userLogoutFront = () => {

    return async dispatch => {
        try {

            const { status, data } = await userLogoutFrontend();
            console.log(status);
            if (status === 200) {
                removeCookie(['user', 'accessToken']);
                successNoti(data.msg);
                dispatch({ type: "LOGIN", payload: false });
                
               
            }
        }
        catch (error) {

            console.log(error.response);
        }

    }

}

export const changeUserRole = role => {


    return async (dispatch, getState) => {

        try {
            const { status } = await changeUserRoleService(role);
            // console.log(response);
            if (status === 204 || status === 202) {
                // const users = [...getState().users];
                // const filterUsers = users.filter(item => item.id !== user.id);
                // await dispatch({ type: "UPDATE_USER", payload: [...filterUsers, user] });
                successNoti("یک کاربر با موفقیت ویرایش شد");
            }
        } catch (error) {
            // console.log(error.response);
            errorNoti("مشکلی سمت سرور به وجود آمد");
        }

    }
}


export const updateUser = (user) => {

    return async (dispatch, getState) => {

        try {
            const response = await updateUserService(user);
            if (response.status === 204 || response.status === 202) {
                const users = [...getState().users];
                const filterUsers = users.filter(item => item.id !== user.id);
                await dispatch({ type: "UPDATE_USER", payload: [...filterUsers, user] });
                successNoti("یک کاربر با موفقیت ویرایش شد");
            }
        } catch (error) {
            console.log(error);
            errorNoti("مشکلی سمت سرور به وجود آمد");

        }
    }
}

