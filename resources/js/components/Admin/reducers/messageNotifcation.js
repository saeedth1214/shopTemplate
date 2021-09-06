
export const messageReducer = (state = { mesasge: "ssss", type: "warning" }, action) => {
    switch (action.type) {
        case "NOTIFICATION":
            return { ...action.payload }
        default:
            return state;
    }

}


