export const profileReducers = (state = [], action) => {

    switch (action.type) {
        case "GET_ORDERS":
            return [...action.payload];
        default:
            return state;
    }
}