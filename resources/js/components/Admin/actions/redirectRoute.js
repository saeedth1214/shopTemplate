

export const redirect = path => { 

    return async dispatch =>{
        dispatch({ type: "REDIRECT", payload: path });
     }
}