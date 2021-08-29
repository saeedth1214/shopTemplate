export const profileImageReducers = (state = false, action) => {

    switch (action.type) {
        case "UPDATE_USER_IMAGE":
            return action.payload;
        default:
            return state;
    }
}