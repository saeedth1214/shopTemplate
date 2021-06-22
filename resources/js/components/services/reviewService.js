
import config from "./config";
import http from "./httpServices";

export const getReviews = () => {
    return http.get(`${config.BASE_URL}api/admin/reviews`);
}


export const createReviewData = review => {
    return http.post(`${config.BASE_URL}api/front/review/create`, review);
}

export const RemoveReviewById = reviewId => {
    return http.delete(`${config.BASE_URL}api/admin/review/delete/${reviewId}`, config.TokenApi);
}


export const changeStatusReviewService = reviewId => {
    return http.put(`${config.BASE_URL}api/admin/review/changeStatus/${reviewId}`, config.TokenApi);
}


export const getUserReviewServise = reviewId => {
    return http.get(`${config.BASE_URL}api/front/getReview/${reviewId}`);
}
export const createReplyMessageService = reply => {
    return http.post(`${config.BASE_URL}api/admin/createReplyMessage`,reply);
}


