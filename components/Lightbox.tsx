import * as React from 'react';
import { HTMLAttributes } from "react";

let ImageLightbox: undefined | React.ComponentType<{}> = undefined;
if (typeof (window) !== 'undefined') {
    ImageLightbox = require('react-image-lightbox').default
}

interface Image {
    url: string;
    alt: string;
}

interface Props extends HTMLAttributes<HTMLElement> {
    images: Image[]
    initialIndex?: number;
    open: boolean;
    onClose: () => void;
}

const Lightbox = ({images, initialIndex = 0, open, onClose}: Props) => {
    const [index, setIndex] = React.useState(initialIndex);
    return <>
        {
            open && images.length > 0 && typeof (window) !== 'undefined' &&
            ImageLightbox && <ImageLightbox
                mainSrc={images[index].url}
                nextSrc={index != images.length - 1 ? images[(index + 1) % images.length].url : undefined}
                prevSrc={index != 0 ? images[(index + images.length - 1) % images.length].url : undefined}
                onCloseRequest={() => onClose()}
                onMovePrevRequest={() => setIndex((index+images.length-1)%images.length)}
                onMoveNextRequest={() => setIndex((index+1)%images.length)}
            />
        }
    </>
};

export default Lightbox