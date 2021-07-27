import { combineReducers, createStore } from "redux";
import { productReducer } from "./product";
import { productsReducers } from "./products";
import { userReducer } from "./user";
import { usersReducers } from "./users";
import { optionReducers } from "./options";
import { categoryReducers } from "./category";
import { attributesReducers } from "./attributes";
import { cateAttrReducers } from "./cateAttr";
import { MediaReducer } from "./media";
import { brandReducers } from "./brands";
import { brandReducer } from "./brand";
import { FilterProductReducer } from "./filterProduct";
import { reviewReducers } from "./review";
import { authReducer } from "./Auth";
import { cardReducers } from "../../front/reducers/cardReducers";
import { profileReducers } from "../../front/reducers/profileReducers";
import { detailReducer } from "./details";
import { orderReducer } from "./orders";
import { commentsReducer } from "../../front/reducers/commentsReducer";
import { attributeValueReducers } from "./attributeValue";
import { profileReducer } from "./profile";
import { loadingBarReducer } from "react-redux-loading-bar";
import { monthlySalesReducer } from "./monthlySales";
import { redirectReducer } from "./redicrectReducer";

export const reducers = combineReducers({
    product: productReducer,
    products: productsReducers,
    filterProducts: FilterProductReducer,
    user: userReducer,
    users: usersReducers,
    options: optionReducers,
    categories: categoryReducers,
    attributes: attributesReducers,
    cateAttr: cateAttrReducers,
    medias: MediaReducer,
    brands: brandReducers,
    brand: brandReducer,
    reviews: reviewReducers,
    auth: authReducer,
    card: cardReducers,
    profile: profileReducers,
    detail: detailReducer,
    order: orderReducer,
    comments: commentsReducer,
    monthlySales: monthlySalesReducer,
    attributeValue: attributeValueReducers,
    profileData: profileReducer,
    loadingBar: loadingBarReducer,
    redirect:redirectReducer
});
