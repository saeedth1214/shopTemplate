
export const productsReducers = (state = [], action) => {

    switch (action.type) {
       
        case "GET_PRODUCTS":
            return [...action.payload];
        case "REMOVE_PRODUCT":
            return [...action.payload];
        case "CREATE_PRODUCT":
            return [...action.payload];
        case "UPDATE_PRODUCT":
            return [...action.payload];
        case "GET_RANDOM_PRODUCTS":
            return [...action.payload];
        default:
            return state;
    }
}