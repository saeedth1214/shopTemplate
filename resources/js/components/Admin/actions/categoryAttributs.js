import { createCatAttrs, getcatAttr, getAttributeByCateID } from "../../services/categoryAttributesService";
import { errorNoti, successNoti, warrningNoti } from "../../utility/messageNotifcation";


export const getAllCateAttr = id => {

    return async (dispatch, getState) => {

        const { data } = await getcatAttr(id);
        dispatch({ type: "GET_CATEATTR", payload: data.data })
    }

}

export const getAttributeByCatID = id => {


    return async dispatch => {
        try {
            const { data ,status} = await getAttributeByCateID(id);
            
            if (status === 200) { 
                const { items } = data;
                dispatch({ type: "GET_CATEATTR", payload: items })
            }
        } catch (error) {
            
            console.log(error.resposne);
        }

        

    }
}

export const createCategoryAttributes = catAttr => {

    return async dispatch => {

        try {

            if (catAttr.category != 0) {
                const { data, status } = await createCatAttrs(catAttr);
                successNoti(data.msg);
                // console.log(data,status); 201
            } else { 
                warrningNoti("لطفا یک دسته بندی را انتخاب کنید");
            }
        } catch (error) {

            errorNoti(error.resposne.msg);
        }

    }
}