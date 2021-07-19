
import { createStore, applyMiddleware } from "redux";
import { reducers } from "../Admin/reducers/index";
import thunk from "redux-thunk";
import { loadingBarMiddleware } from "react-redux-loading-bar";

export const store = createStore(reducers, applyMiddleware(thunk, loadingBarMiddleware({ scope: "singleProduct", scope:"categoryFilter"})));



