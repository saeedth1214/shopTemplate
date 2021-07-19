import { createMediaServise, getAllMediaServise, removeMediaServise, changeImageTypeServise } from "../../services/mediaServices";
import { errorNoti, successNoti, warrningNoti } from "../../utility/messageNotifcation";

export const CreateMedia = media => {

    return async (dispatch, getState) => {

        try {
            const { status, data } = await createMediaServise(media);
            if (status === 201) {

                let products = [...getState().products];
                let medias = [...getState().medias];
                let proTitle = products.find(item => parseInt(item.id) === parseInt(media.proId)).pro_title;
                // console.log(proTitle);
                let newMedia = {
                    mid: data.media.id,
                    title: proTitle,
                    mtype: media.fileType,
                    murl: media.fileName,
                }
                medias.push(newMedia);
                dispatch({ type: "CREATE_MEDIA", payload: medias });
                successNoti(data.msg);

            }
        } catch (error) {
            console.log(error);

        }


    }
}
export const getAllMedia = () => {

    return async dispatch => {

        try {

            const { data } = await getAllMediaServise();
            dispatch({ type: "GET_ALL_MEDIA", payload: data });
            // console.log(response);    
        } catch (error) {
            console.log(error);
        }


    }
}


export const removeMedia = image => {

    return async (dispatch, getState) => {

        try {
            // const response = await removeMediaServise(image);
            // console.log(response);
            const { data, status } = await removeMediaServise(image);

            if (status === 202) {

                let medias = [...getState().medias];
                let newMedias = medias.filter(item => parseInt(item.mid) !== parseInt(image.id));

                dispatch({ type: "REMOVE_MEDIA", payload: newMedias });

                successNoti(data.msg);
            }
        } catch (error) {
            console.log(error);

        }

    }
}

export const changeImageType = type => {

    return async (dispatch, getState) => {

        try {

            const { data, status } = await changeImageTypeServise(type);

            if (status === 202) {
                successNoti(data.msg);
            }
        } catch (error) {
            console.log(error.response);

        }

    }
}

