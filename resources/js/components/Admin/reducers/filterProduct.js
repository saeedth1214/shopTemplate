export const FilterProductReducer = (state = [], action) => {

    switch (action.type) {
        case "FILTER_PRODUCTS":
            return [...action.payload];
        default:
            return state;
    }

}