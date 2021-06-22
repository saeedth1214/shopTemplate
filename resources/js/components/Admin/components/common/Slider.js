import React, { Fragment, useEffect, useContext, memo } from 'react';
import config from "../../../services/config";
import { isNull } from 'util';
import SingleProContext from '../../../Front/context/singlePro';
const Slider = () => {
    const { product } = useContext(SingleProContext);

    const images = ('urls' in product) ? product.urls : null;

    useEffect(() => {
        const slider = document.querySelector(".imageSlider");
        if (isNull(images)) {
            let noImage = document.createElement("img");
            noImage.src = config.BASE_DEFAULT_IMG_PATH;
            slider.append(noImage);
        } else {
            images.map(item => {
                const imgTag = document.createElement("img");
                imgTag.src = config.BASE_IMG_PATH + item;
                slider.append(imgTag);
            });
        }
    }, []);
    var slides = document.getElementsByTagName('img');

    var n = 0;
    const no_Style = () => {

        for (let item of slides) {
            item.style.display = "none";

        }

    }
    const previuseImage = () => {
        n--;
        if (n < 0) {
            n = slides.length - 1;
        }
        no_Style();
        slides[n].style.display = "block";

    }
    const nextImage = () => {

        if (n == slides.length - 1) {
            n = -1;
        }
        no_Style();
        n++;
        slides[n].style.display = "block";
    }
    return (
        <Fragment>
            <div className="imageSlider">


            </div>
            <div className="pre-next">

                <div className="previuse"><span onClick={ previuseImage } className="carousel-control-prev-icon" aria-hidden="true"></span></div>
                <div className="next"><span onClick={ nextImage } className="carousel-control-next-icon" aria-hidden="true"></span></div>

            </div>

        </Fragment>
    )
}
export default memo(Slider);