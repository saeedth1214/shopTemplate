
export const MediaReducer = (state = [], action) => {

    switch (action.type) {
        case "CREATE_MEDIA":
            return [...action.payload]
        case "GET_ALL_MEDIA":
            return [...action.payload]
        case "REMOVE_MEDIA":
            return [...action.payload]
        case "UPDATE_MEDIA":
            return [...action.payload]
        default:
            return state;
    }

}
