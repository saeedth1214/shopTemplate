
export const brandReducers = (state = [], action) => {

    switch (action.type) {
        case "GET_BRANDS":
            return [...action.payload];
        case "CATEGORY_BRANDS":
            return [...action.payload];
        default:
            return state;
    }
}