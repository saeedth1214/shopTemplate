export const reviewReducers = (state=[], action) => {

    switch (action.type) {
        case "GET_REVIEWS":
            return [...action.payload];
        case "CREATE_REVIEW":
            return [...action.payload];
        case "REMOVE_REVIEW":
            return [...action.payload];
        default:
            return state;
    }
}  