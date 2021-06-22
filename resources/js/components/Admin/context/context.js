import { createContext } from "react";

const Context = createContext({

    currentPage: 1,
    perPage: 3,
    handlePageChange: () => { },

    openDialog: () => { },


    items: []


});

export default Context;