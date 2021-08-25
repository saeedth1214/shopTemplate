import React, { Fragment, useEffect, useContext, memo } from 'react';
import config from "../../../services/config";
import { isNull } from 'util';
import SingleProContext from '../../../Front/context/singlePro';
const Slider = () => {
    const { product } = useContext(SingleProContext);

    const images = ('urls' in product) ? product.urls : null;
    var slides = [];

    useEffect(() => {
        const slider = document.querySelector(".imageSlider");
        if (isNull(images)) {
            let noImage = document.createElement("img");
            noImage.src = config.BASE_DEFAULT_IMG_PATH;
            slider.append(noImage);
        } else {
            images.map(item => {
                const imgTag = document.createElement("img");
                imgTag.classList.add('imgClass');
                imgTag.src = config.BASE_IMG_PATH + item;
                slider.append(imgTag);
            });
        }
         slides = document.querySelectorAll(".imgClass");
    });
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

    const createPrevNext =()=>(

         <Fragment>
            <div className="previuse"><span onClick={ previuseImage } className="carousel-control-prev-icon" aria-hidden="true"></span></div>
            <div className="imageSlider">


            </div>
                <div className="next"><span onClick={ nextImage } className="carousel-control-next-icon" aria-hidden="true"></span></div>
         </Fragment>
    )
    return (
        <Fragment>
         
          


{
    images.length>0
    ?
           createPrevNext()
:null
}
    

        </Fragment>
    )
}
export default memo(Slider);