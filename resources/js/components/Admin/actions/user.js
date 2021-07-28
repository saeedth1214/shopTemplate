import { removeUserById, createUserByData, RegisterUserServise, changeUserRoleService, userLoginFrontend, userLogoutFrontend, changeUserFronPassword, updateUserService, forgetPasswordService, resetPasswordService } from "../../services/userService";
import { errorNoti, successNoti, warrningNoti } from "../../utility/messageNotifcation";
import { removeCookie, setCookieForUserLoggedin } from "../../services/cookieServise";
import { showLoading, hideLoading } from "react-redux-loading-bar";




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

    return async dispatch => {
        try {
            dispatch(showLoading('register'));
            const { data, status } = await RegisterUserServise(user);

            console.log(data.status);
            if (status === 208) {
                dispatch(hideLoading('register'));
                warrningNoti(data.msg);
                return;
            }
            successNoti(data.msg);
            setCookieForUserLoggedin(data.userData.access_token, data.userData.user);
            dispatch(hideLoading('register'));
            dispatch({ type: 'LOGIN', payload: true });
        } catch (error) {
            console.log(error.response);
            dispatch(hideLoading('register'));

        }

    }
}

export const changeUserPassword = changePass => {

    return async () => {
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
            dispatch(showLoading('login'));
            const { data, status } = await userLoginFrontend(login);
            if (status === 200) {
                setCookieForUserLoggedin(data.userData.access_token, data.userData.user);
                dispatch(hideLoading('login'));
                dispatch({ type: "LOGIN", payload: true });
                successNoti(data.msg);
            }

        } catch (error) {
            if (error.response.status === 401) {
                warrningNoti(error.response.data.msg);
                dispatch(hideLoading('login'));
                return;
            }
            console.log(error);
        }
    }
}

export const userLogoutFront = () => {

    return async dispatch => {
        try {

            // dispatch(showLoading('logout'));
            const { status, data } = await userLogoutFrontend();
            console.log(status, data,"logout");
            if (status === 200) {
                removeCookie(['user', 'accessToken']);
                successNoti(data.msg);
                dispatch({ type: "LOGIN", payload: false });
            }
        }
        catch (error) {
            dispatch(hideLoading('logout'));
            console.log(error.response);
        }

    }

}

export const changeUserRole = role => {
    return async () => {

        try {
            const { status } = await changeUserRoleService(role);
            if (status === 204 || status === 202) {
                successNoti("یک کاربر با موفقیت ویرایش شد");
            }
        } catch (error) {
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


export const forgetPassword = email => {

    return async dispatch => {

        try {
            dispatch(showLoading('forget-password'));
            const { data, status } = await forgetPasswordService(email);
            if (status === 200) {
                successNoti(data.msg);
            }
            dispatch(hideLoading('forget-password'));

        } catch (error) {

            if (error.response.status === 404) {
                errorNoti(error.response.data.msg);
                return;
            }
            console.log(error);

        }
    }
}
export const resetPassword = creadential => {

    return async dispatch => {

        try {
            const { data, status } = await resetPasswordService(creadential);
            if (status === 200) {
                successNoti(data.msg);
            }

        } catch (error) {

            if (error.response.status === 400) {
                errorNoti(error.response, data.msg);
                return;
            }
            // console.log(error.response);
        }

    }
}


