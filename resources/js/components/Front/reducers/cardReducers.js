

export const cardReducers = (state = [], action) => {

    switch (action.type) {
        case "GET_ITEMS":
            return [...action.payload];
        case "ADD_ITEM":
            return [...action.payload];
        case "REMOVE_ITEM":
            return [...action.payload];
        default:
            return state;
    }
}
