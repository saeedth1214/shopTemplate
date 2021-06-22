
export const attributesReducers = (state = [], action) => {

    switch (action.type) {
        case "GET_ATTRIBUTES":
            return [...action.payload];
        case "REMOVE_ATTRIBUTE":
            return [...action.payload];
        case "CREATE_ATTRIBUTE":
            return [...action.payload];
        case "UPDATE_ATTRIBUTE":
            return [...action.payload];
        default:
            return state;
    }
}