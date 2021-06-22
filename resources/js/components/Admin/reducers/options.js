
export const optionReducers = (state = [], action) => {

    switch (action.type) {
        case "GET_OPTIONS":
            return [...action.payload];

        case "REMOVE_OPTION":
            return [...action.payload];

        case "CREATE_OPTION":
            return [...action.payload];
        default:
            return state;
    }
}