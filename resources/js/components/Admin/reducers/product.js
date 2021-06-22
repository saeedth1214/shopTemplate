
export const productReducer = (state = {}, action) => {

    switch (action.type) {
        case "GET_SINGLE_PRODUCT":
            return { ...action.payload }
        default:
            return state;
    }
}