import *  as images from "../Admin/components/common/data";

export const getAvatarImage = url => {

    return images[url];
}


export const getImagebyArray = urlArray => {

    import("../Admin/components/common/data").then(module => {
        urlArray.map(item => {
            const imgTag = document.createElement("img");
            imgTag.src = module[item];
            slider.append(imgTag);
        });
    })
}
