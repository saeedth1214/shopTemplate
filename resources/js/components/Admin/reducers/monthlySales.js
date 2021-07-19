
export const monthlySalesReducer = (state = [], action) => {

    switch (action.type) {
        case "GET_MONTHLY_SALES":
            return [...action.payload]
        default:
            return state;
    }
}