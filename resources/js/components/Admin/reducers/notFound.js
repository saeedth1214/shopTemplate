export const notfoundReducers = (state = false, action) => {

    switch (action.type) {
        case "NOT_FOUND":
            return action.payload;
        default:
            return state;
    }
}