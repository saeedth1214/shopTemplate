import { createCatAttrs, getcatAttr, getAttributeByCateID } from "../../services/categoryAttributesService";
import { errorNoti, successNoti, warrningNoti } from "../../utility/messageNotifcation";


export const getAllCateAttr = id => {
    return async (dispatch, getState) => {
        try {
            const { data, status } = await getcatAttr(id);
            if (status === 200) {
                dispatch({ type: "GET_CATEATTR", payload: data })
            }
        } catch (error) {
            console.log(error.response);
        }
    }
}

export const getAttributeByCatID = id => {


    return async dispatch => {
        try {
            const { data, status } = await getAttributeByCateID(id);
            if (status === 200) {
                // const { items } = data;
                dispatch({ type: "GET_CATEATTR", payload: data })
            }
        } catch (error) {

            console.log(error.response);
        }



    }
}

export const createCategoryAttributes = catAttr => {

    return async dispatch => {

        try {

            if (parseInt(catAttr.category) !== 0 && catAttr.attrs.length !== 0) {
                const { data, status } = await createCatAttrs(catAttr);
                if (status === 201) {
                    successNoti(data.msg);
                    dispatch({ type: "GET_CATEATTR", payload: [] })

                }
            } else {
                warrningNoti("لطفا یک دسته بندی یا ویژگی انتخاب کنید  ");
            }
        } catch (error) {

            errorNoti(error.response.msg);
        }

    }
}