
export const categoryReducers = (state = [], action) => {

    switch (action.type) {
        case "GET_CATEGORIES":
            return [...action.payload];

        case "REMOVE_CATEGORY":
            return [...action.payload];
        case "UPDATE_CATEGORY":
            return [...action.payload];

        case "CREATE_CATEGORY":
            return [...action.payload];
        case "GET_MAIN_CATEGORIES":
            return [...action.payload]
        default:
            return state;
    }
}