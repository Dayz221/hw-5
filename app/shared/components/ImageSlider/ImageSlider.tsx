import type React from "react";
import styles from "./ImageSlider.module.scss";
import { useState } from "react";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import Image from "../Image/Image";
import type { ProductCardImageModel } from "../../store/models/products/ProductCardImage";

type ImageSliderProps = {
    width?: string;
    height?: string;
    images: ProductCardImageModel[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({width="100%", height="100%", images}) => {
    const [curImage, setCurImage] = useState<number>(0);
    
    return (
        <div className={styles.image_slider} style={{width, height}}>
            <button className={styles.left_arrow} disabled={curImage <= 0} onClick={() => setCurImage(prev => prev - 1)}>
                <ArrowDownIcon angle={90} color="light" />
            </button>
            
            <div className={styles.images} style={{transform: `translateX(-${(100/images.length) * curImage}%)`, width: `${100 * images.length}%`}}>
                {
                    images.map((data, index) => (
                        <Image 
                            className={styles.image} 
                            src={data.url} 
                            key={data.url} 
                            alt={`Product image ${index + 1}`}
                            quality={95}
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                            blurColor1="#e0e7ff"
                            blurColor2="#c7d2fe"
                        />
                    ))
                }
            </div>

            <button className={styles.right_arrow} disabled={curImage >= images.length - 1} onClick={() => setCurImage(prev => prev + 1)}>
                <ArrowDownIcon angle={-90} color="light" />
            </button>
        </div>
    )
};

export default ImageSlider;