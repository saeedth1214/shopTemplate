import { getAttributes, createAttributeData, deleteAttribute, updateAttributeService } from "../../services/attributeService";
import { successNoti, errorNoti, warrningNoti } from "../../utility/messageNotifcation";

export const getAllattributes = () => {

    return async dispatch => {

        try {
            const { data } = await getAttributes();
            console.log(data);
            await dispatch({ type: "GET_ATTRIBUTES", payload: data });
            
        } catch (error) {
            console.log(error);
        }
    }

}


export const createAttribute = attribute => {

    return async (dispatch, getState) => {

        try {
            if (attribute.slug.length === 0 || attribute.title.length === 0) {
                warrningNoti("لطفا مقادیر معتبری را وارد کنید");
                return;
            }
        const { data ,status} = await createAttributeData(attribute);

        // console.log(data,status);
    
            if (status === 201) { 
                const attributes = [...getState().attributes];
                const newAttribute = {
                    id: attributes.length == 0 ? data.data.id : attributes[attributes.length - 1].id + 1,
                    slug: attribute.slug,
                    title: attribute.title,
                    type: attribute.type,
                };
                attributes.push(newAttribute);
                await dispatch({ type: "CREATE_ATTRIBUTE", payload: attributes });    
                successNoti(data.msg);
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
            // console.log(data, status);
            if (status === 202) {
                const attributes = [...getState().attributes];
                const newAttributes = attributes.filter(attribute => parseInt(attribute.id) !== parseInt(id));
                await dispatch({ type: "REMOVE_ATTRIBUTE", payload: newAttributes });
                successNoti(data.msg);
            } else { 
                warrningNoti(data.msg);
            }

        } catch (error) {

            console.log(error);
            // errorNoti(error.response.msg);
        }

    }
}


export const updateAttribute = (attribute) => {

    return async (dispatch, getState) => {

        try {
            const { status } = await updateAttributeService(attribute);

            // console.log(response);
            if (status === 204 || status === 202) {
                const attributes = [...getState().attributes];
                const filterAttribute = attributes.filter(item => parseInt(item.id) !== parseInt(attribute.id));
                console.log(filterAttribute,"aa");
                await dispatch({ type: "UPDATE_ATTRIBUTE", payload: [...filterAttribute, attribute] });
                warrningNoti("یک ویژگی ویرایش شد");
            }
        } catch (error) {
            console.log(error.response);
            // errorNoti("مشکلی سمت سرور پیش آمده است");

        }
    }
}

