

export const commentsReducer = (state = [], action) => {

    switch (action.type) {
        case "GET_PRODUCT_COMMENTS":
            return [...action.payload];
        case "ADD_ITEM":
            return [...action.payload];
        case "REMOVE_ITEM":
            return [...action.payload];
        default:
            return state;
    }
}
