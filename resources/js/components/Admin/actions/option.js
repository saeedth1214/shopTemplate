import { getOptions, deleteOption, createOptionData } from "../../services/optionService";

export const getAlloptions = () => {

    return async dispatch => {

        const { data } = await getOptions();
        await dispatch({ type: "GET_OPTIONS", payload: data });
    }

}


export const createOption = option => {

    return async (dispatch, getState) => {

        const { data } = await createOptionData(option);
        
        const options = [...getState().options];
        const newOption = {
            id: options.length == 0 ? data.data.id : options[options.length - 1].id + 1,
            option_slug: option.option_slug,
            option_title: option.option_title,
            option_value: option.option_value,
            option_cat: option.option_cat,

        };
        options.push(newOption);

        await dispatch({ type: "CREATE_OPTION", payload: options });
    }
}



export const removeOption = id => {

    return async (dispatch, getState) => {

        await deleteOption(id);

        const options = [...getState().options];
        const filterOption = options.filter(option => option.id !== id);
        await dispatch({ type: "REMOVE_OPTION", payload: filterOption });
    }
}