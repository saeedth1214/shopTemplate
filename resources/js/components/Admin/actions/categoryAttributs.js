import { createCatAttrs, getcatAttr, getAttributeByCateID } from "../../services/categoryAttributesService";
import { toastr } from "react-redux-toastr";



export const getAllCateAttr = id => {
    return async (dispatch, getState) => {
        try {
            const { data, status } = await getcatAttr(id);
            if (status === 200) {
                dispatch({ type: "GET_CATEATTR", payload: data })
            }
        } catch (error) {
            toastr.error(error.response.msg);

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
            toastr.error(error.response.msg);
        }
    }
}

export const createCategoryAttributes = catAttr => {

    return async dispatch => {

        try {

            if (parseInt(catAttr.category) !== 0 && catAttr.attrs.length !== 0) {
                const { data, status } = await createCatAttrs(catAttr);
                if (status === 201) {
                    toastr.success(data.msg);
                    dispatch({ type: "GET_CATEATTR", payload: [] })

                }
            } else {
                toastr.warning("لطفا یک دسته بندی یا ویژگی انتخاب کنید");
            }
        } catch (error) {
            toastr.error(error.response.msg);
        }

    }
}