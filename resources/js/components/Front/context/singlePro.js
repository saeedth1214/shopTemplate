import React, { createContext } from "react";


const SingleProContext = createContext({
    product: {},
    id: 0,
    attributes: [],
    comments: []
});

export default SingleProContext;