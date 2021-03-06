import { getReviews, RemoveReviewById, createReviewData, changeStatusReviewService, getUserReviewServise, createReplyMessageService } from "../../services/reviewService";
import { errorNoti, warrningNoti, successNoti } from "../../utility/messageNotifcation";
import { hasCookie, getCookie } from "../../services/cookieServise";

export const getAllReviews = () => {

    return async dispatch => {

        try {
            const { data, status } = await getReviews();
            if (status === 200) {
                dispatch({ type: "GET_REVIEWS", payload: data });
            }
        } catch (error) {

            console.log(error.response);
        }
    }
}

export const CreateReview = review => {

    return async () => {
        try {
            if (!hasCookie('accessToken')) {
                warrningNoti("لطفا برای ثبت نظر لاگین کنید");
                return;
            }

            let pattern = /^\s+|\s+$/gm;
            let newComment = review.comment.replace(pattern, "");
            if (newComment.length === 0) {
                warrningNoti("لطفا یک مقدار معتبر وارد کنید");
                return;
            }
            review = { ...review, user_id: getCookie("user").id }

            const response = await createReviewData(review);
            if (response.status === 201) {
                successNoti(response.data.msg);
            }
        } catch (error) {

            console.log(error.response, "sss");
        }


    }

}

export const RemoveReview = reviewId => {

    return async (dispatch, getState) => {
        try {
            const response = await RemoveReviewById(reviewId);
            console.log(response);
            if (status === 202) {
                const reviews = [...getState().reviews];
                const filterReview = reviews.filter(item => item.id !== reviewId);
                dispatch({ type: "REMOVE_REVIEW", payload: filterReview });
                successNoti(data.msg);
            }

        } catch (error) {

            console.log(error.response);
        }

    }
}

export const changeStatusReview = (reviewId) => {
    return async dispatch => {
        try {
            const { status, data } = await changeStatusReviewService(reviewId);
            if (status === 202) {
                successNoti(data.msg);
            }
        } catch (error) {
            console.log(error.response);

        }

    }
}

export const getUserReview = uId => {
    return async  dispatch => {
        const { data } = await getUserReviewServise(uId);
        // console.log(response);
        dispatch({ type: "GET_REVIEWS", payload: data });

    }
}



export const createReplyMessageAction = reply => {
    return async dispatch => {


        try {
            if (reply.reply.length === 0) {

                warrningNoti("لطفا مقدار معتبری را وارد کنید");
                return;
            }
            const { status, data } = await createReplyMessageService(reply);

            if (status === 200) {

                successNoti(data.msg);
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
}