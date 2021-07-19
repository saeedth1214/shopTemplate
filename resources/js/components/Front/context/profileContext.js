import { createContext } from "react";


const ProfileContext = createContext({
    orders: [],
    user: {},
    comments: []
});

export default ProfileContext;