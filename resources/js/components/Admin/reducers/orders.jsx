
export const orderReducer = (state = {}, action) => {


    switch (action.type) {
        case "GET_NEW_ORDERS":
            return [...action.payload];
        case "GET_ALL_ORDERS":
            return [...action.payload];
        default:
            return state;
    }

}