import { getAllBrandServise, createBrandServise, removeBrandServise, getCategoryBrandServise } from "../../services/brandServices";
import { successNoti, errorNoti, warrningNoti } from "../../utility/messageNotifcation";


export const getBrands = catId => {
    return async dispatch => {

        try {
            const { data, status } = await getAllBrandServise(catId);
            if (status === 200) {
                dispatch({ type: "GET_BRANDS", payload: data });

                // console.log(data,"brands");
            }
        } catch (error) {

            console.log(error.response);
        }


    }
}

export const getCategoryBrands = cid => {
    return async dispatch => {

        const { data } = await getCategoryBrandServise(cid);
        dispatch({ type: "GET_BRANDS", payload: data });
    }
}

export const createBrand = brand => {
    return async (dispatch, getState) => {

        console.log(brand);
        try {
            if (brand.catBrand === 0) {
                warrningNoti("لطفا یک دسته بندی انتخاب کنید");
                return;
            }

            const { data, status } = await createBrandServise(brand);

            if (status === 201) {
                const brands = [...getState().brands];
                const category = getState().categories.find(cat => cat.id == brand.catBrand);
                const newbrand = {
                    id: brands.length == 0 ? data.data.id : brands[brands.length - 1].id + 1,
                    title: brand.brandTitle,
                    slug: brand.brandSlug,
                    category
                };
                brands.push(newbrand);
                dispatch({ type: "CREATE_BRAND", payload: brands });
                successNoti(data.msg);
            }
        } catch (error) {
            console.log(error.response, "brand error");
        }
    }
}

export const removeBrand = brandId => {
    return async dispatch => {

        const { data } = await removeBrandServise(brandId);
        console.log(data);
        dispatch({ type: "REMOVE_BRANDS", payload: data });
    }
}








