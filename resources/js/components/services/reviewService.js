
import config from "./config";
import http from "./httpServices";
import { getCookie } from "./cookieServise";

const headers = { headers: { authorization: `Bearer ${getCookie('accessToken')}` } };

export const getReviews = () => {
    return http.get(`${config.BASE_URL}api/admin/reviews`, {headers});
}


export const createReviewData = review => {
    return http.post(`${config.BASE_URL}api/front/review/create`, review);
}

export const RemoveReviewById = reviewId => {
    return http.delete(`${config.BASE_URL}api/admin/review/delete/${reviewId}`, {headers});
}


export const changeStatusReviewService = reviewId => {
    return http.put(`${config.BASE_URL}api/admin/review/changeStatus/${reviewId}`, { headers });
}


export const getUserReviewServise = reviewId => {
    return http.get(`${config.BASE_URL}api/front/getReview/${reviewId}`);
}
export const createReplyMessageService = reply => {
    return http.post(`${config.BASE_URL}api/admin/createReplyMessage`, reply, { headers });
}


