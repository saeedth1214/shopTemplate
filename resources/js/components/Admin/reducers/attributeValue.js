
export const attributeValueReducers = (state = [], action) => {

    switch (action.type) {
        case "GET_ATTRIBUTE_VALUE":
            return [...action.payload];
        default:
            return state;
    }
}