
export const cateAttrReducers = (state = [], action) => {

    switch (action.type) {

        // case "GET "
        case "GET_CATEATTR":
            return [...action.payload];
        default:
            return state;
    }
}