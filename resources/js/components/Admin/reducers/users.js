
export const usersReducers = (state = [], action) => {

    switch (action.type) {
        case "GET_USERS":
            return [...action.payload];
        case "REMOVE_USER":
            return [...action.payload]
        case "CREATE_USER":
            return [...action.payload]
        case "UPDATE_USER":
            return [...action.payload]
        default:
            return state;
    }
}