import { createCategoryData, deleteCategory, getCategories, getAttrForCate, updateCategoryService } from "../../services/categoryService";
import { errorNoti, successNoti, warrningNoti } from "../../utility/messageNotifcation";

export const getAllcategories = () => {

    return async dispatch => {

        try {

            const { data, status } = await getCategories();
            if (status === 200) {
                 dispatch({ type: "GET_CATEGORIES", payload: data });
            }
        } catch (error) {

            console.log(error.response);
        }


    }

}


export const getAttributeById = id => {

    return async dispatch => {

        const { data } = await getAttrForCate(id);
        let { items } = data;

        console.log(items);

    }
}


export const createCategory = category => {

    return async (dispatch, getState) => {

        try {

            if (category.title.length === 0 || category.slug.length === 0) {
                warrningNoti("لطفا یک مقدار معتبر وارد کنید ");
                return;
            }
            const { data, status } = await createCategoryData(category);
            if (status === 201) {
                const categories = [...getState().categories];
                const newCategory = {
                    id: categories.length == 0 ? data.data.id : categories[categories.length - 1].id + 1,
                    slug: category.slug,
                    title: category.title,
                };
                categories.push(newCategory);
                 dispatch({ type: "CREATE_CATEGORY", payload: categories });
                successNoti(data.msg);
            }

        } catch (error) {

            errorNoti(error.response.msg);

        }

    }
}



export const removeCategory = id => {

    return async (dispatch, getState) => {
        try {
            const { data, status } = await deleteCategory(id);
            if (status === 204 || status === 202) {
                const categories = [...getState().categories];
                const filterCategory = categories.filter(category => category.id !== id);
                 dispatch({ type: "REMOVE_CATEGORY", payload: filterCategory });
                successNoti("یک مورد با موفقیت حذف شد");
            }

        } catch (error) {

            errorNoti("مشکلی سمت سرور پیش آمده است");
        }

    }
}

export const updatecategory = (category) => {

    return async (dispatch, getState) => {

        try {
            if (category.title.length === 0 || category.slug.length === 0) {
                warrningNoti("لطفا یک مقدار معتبر وارد کنید ");
                return;
            }
            const { status } = await updateCategoryService(category);

            // console.log(response);
            if (status === 204 || status === 202) {
                const categories = [...getState().categories];
                const filterCategory = categories.filter(item => item.id !== category.id);
                 dispatch({ type: "UPDATE_CATEGORY", payload: [...filterCategory, category] });
                warrningNoti("یک دسته بندی ویرایش شد");
            }
        } catch (error) {
            console.log(error.response);
            // errorNoti("مشکلی سمت سرور پیش آمده است");

        }
    }
}