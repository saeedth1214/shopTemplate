import { removeUserById, createUserByData, RegisterUserServise, changeUserRoleService, userLoginFrontend, userLogoutFrontend, changeUserFronPassword, updateUserService, forgetPasswordService, resetPasswordService, changeUserProfileImage } from "../../services/userService";
import { removeCookie, setCookieForUserLoggedin, getCookie, setCookie, hasCookie } from "../../services/cookieServise";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import { toastr } from "react-redux-toastr";
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
                dispatch({ type: "CREATE_USER", payload: users });
                toastr.success(data.msg);
            }
            else if (status === 202) {
                toastr.warning(data.msg);
            }

        } catch (error) {
            toastr.error("مشکلی سمت سرور پیش آمده است ");
        }

    }
}

export const removeUser = userId => {

    return async (dispatch, getState) => {

        try {
            const { data, status } = await removeUserById(userId);
            if (status === 202) {
                const users = [...getState().users];
                const newUsers = users.filter(user => user.id !== userId);
                dispatch({ type: "REMOVE_USER", payload: newUsers });
                toastr.success(data.msg);

            }

        } catch (error) {
            // error();
        }

    }
}

export const RegisterUser = user => {

    return async dispatch => {
        try {
            dispatch(showLoading('register'));
            const { data, status } = await RegisterUserServise(user);
            if (status === 208) {
                dispatch(hideLoading('register'));
                toastr.warning(data.msg);
                return;
            }

            setCookieForUserLoggedin(data.userData.access_token, data.userData.user);
            toastr.success("ثبت نام شما با موفقیت انجام شد ");

            dispatch(hideLoading('register'));
            dispatch({ type: 'LOGIN', payload: true });
        } catch (error) {
            dispatch(hideLoading('register'));

        }

    }
}

export const changeUserPassword = changePass => {

    return async () => {
        try {
            const { status, data } = await changeUserFronPassword(changePass);
            if (status === 200) {
                toastr.success(data.msg);
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
                toastr.success(data.msg);

            }

        } catch (error) {
            if (error.response.status === 401) {
                toastr.warning(error.response.data.msg);
                dispatch(hideLoading('login'));
                return;
            } else {
                console.log(error);

            }
        }
    }
}

export const userLogoutFront = () => {

    return async dispatch => {
        try {

            // dispatch(showLoading('logout'));
            const { status, data } = await userLogoutFrontend();
            if (status === 200) {

                removeCookie(['user', 'accessToken', 'cookie-expires']);
                toastr.success(data.msg);
                dispatch({ type: "LOGIN", payload: false });
            }
        }
        catch (error) {
            if (error.response.data.status === 400) {
                dispatch(hideLoading('logout'));
            } else {
                console.log(error.response);
            }

        }

    }

}

export const changeUserRole = role => {
    return async () => {

        try {
            const { status } = await changeUserRoleService(role);
            if (status === 204 || status === 202) {
                toastr.success("یک کاربر با موفقیت ویرایش شد");
            }
        } catch (error) {
            toastr.error("مشکلی سمت سرور به وجود آمد");
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
                dispatch({ type: "UPDATE_USER", payload: [...filterUsers, user] });
                toastr.success("یک کاربر با موفقیت ویرایش شد");

            }
        } catch (error) {
            console.log(error);
            toastr.error("مشکلی سمت سرور به وجود آمد");
        }
    }
}


export const forgetPassword = email => {

    return async dispatch => {

        try {
            dispatch(showLoading('forget-password'));
            const { data, status } = await forgetPasswordService(email);
            if (status === 200) {
                toastr.success(data.msg);
            }
            dispatch(hideLoading('forget-password'));

        } catch (error) {

            if (error.response.status === 404) {
                toastr.error(error.response.data.msg);
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
                toastr.success(data.msg);
            }

        } catch (error) {

            if (error.response.status === 400) {
                toastr.error(error.response.data.msg);
                return;
            }
        }

    }
}

export const changeProfileImage = image => {


    return async dispatch => {



        try {

            const { data, status } = await changeUserProfileImage(image);

            if (status === 200) {
                if (hasCookie('cookie-expires')) {

                    /// now date
                    const nowDate = new Date();
                    var now = nowDate.getTime();

                    // set cookies date
                    var cookieExpires = getCookie('cookie-expires');

                    const cookieDate = new Date(cookieExpires);
                    var cookie = cookieDate.getTime();

                    // get user from cookie
                    var user = getCookie('user');
                    user = { ...user, avatar: image.fileName };
                    nowDate.setTime(nowDate.getTime() + (cookie - now));
                    const options = { path: "/", expires: nowDate };

                    setCookie('user', user, options);
                    dispatch({ type: "UPDATE_USER_IMAGE", payload: true });
                    toastr.success(data.msg);
                    // successNoti(data.msg);
                }
                else {
                    toastr.warning("لطفا به صفحه ورود بروید");
                    // warrningNoti("لطفا به صفحه ورود بروید");
                }
            }
        } catch (error) {
        }
    }
}



