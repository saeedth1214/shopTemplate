import { getAttributes, createAttributeData, deleteAttribute, updateAttributeService } from "../../services/attributeService";
import { toastr } from "react-redux-toastr";

export const getAllattributes = () => {

    return async dispatch => {

        try {
            const { data } = await getAttributes();
            console.log(data);
            dispatch({ type: "GET_ATTRIBUTES", payload: data });

        } catch (error) {
            console.log(error);
        }
    }

}


export const createAttribute = attribute => {

    return async (dispatch, getState) => {

        try {
            if (attribute.slug.length === 0 || attribute.title.length === 0) {
                toastr.warning("لطفا مقادیر معتبری را وارد کنید");
                return;
            }
            const { data, status } = await createAttributeData(attribute);
            if (status === 201) {
                const attributes = [...getState().attributes];
                const newAttribute = {
                    id: attributes.length == 0 ? data.data.id : attributes[attributes.length - 1].id + 1,
                    slug: attribute.slug,
                    title: attribute.title,
                    type: attribute.type,
                };
                attributes.push(newAttribute);
                dispatch({ type: "CREATE_ATTRIBUTE", payload: attributes });
                toastr.success(data.msg);
            }


        } catch (error) {

            console.log(error);
        }


    }
}



export const removeAttribute = id => {

    return async (dispatch, getState) => {

        try {
            const { data, status } = await deleteAttribute(id);
            if (status === 202) {
                const attributes = [...getState().attributes];
                const newAttributes = attributes.filter(attribute => parseInt(attribute.id) !== parseInt(id));
                dispatch({ type: "REMOVE_ATTRIBUTE", payload: newAttributes });
                toastr.success(data.msg);
            } else {
                toastr.warning(data.msg);
            }

        } catch (error) {
            toastr.error(error.response.msg);
        }

    }
}


export const updateAttribute = (attribute) => {

    return async (dispatch, getState) => {

        try {
            const { status } = await updateAttributeService(attribute);

            if (status === 204 || status === 202) {
                const attributes = [...getState().attributes];
                const filterAttribute = attributes.filter(item => parseInt(item.id) !== parseInt(attribute.id));
                console.log(filterAttribute, "aa");
                dispatch({ type: "UPDATE_ATTRIBUTE", payload: [...filterAttribute, attribute] });
                toastr.warning("یک ویژگی ویرایش شد");
            }
        } catch (error) {
            toastr.error("مشکلی سمت سرور پیش آمده است");
        }
    }
}

