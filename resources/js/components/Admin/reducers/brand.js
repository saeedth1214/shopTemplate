
export const brandReducer = (state = {}, action) => {

    switch (action.type) {
        case "GET_BRAND":
            return { ...action.payload }
        case "CREATE_BRAND":
            return { ...action.payload }
        case "REMOVE_BRAND":
            return { ...action.payload }
        default:
            return state;
    }

}