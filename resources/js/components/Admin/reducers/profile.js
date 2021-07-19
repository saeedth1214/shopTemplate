
export const profileReducer = (state = {}, action) => {

    switch (action.type) {
        case "GET_USER_PROFILE_DATA":
            return { ...action.payload }
        default:
            return state;
    }
}