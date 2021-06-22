
export const bestReducer = (state = {}, action) => {

    switch (action.type) {
        case "GET_BEST_SELLER":
            return [...action.payload]
        default:
            return state;
    }
}