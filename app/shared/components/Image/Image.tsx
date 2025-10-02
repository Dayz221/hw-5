import classNames from "classnames";
import type React from "react";
import NextImage from "next/image";

import styles from "./Image.module.scss";

export const BLUR_GRADIENTS = {
    default: { color1: '#f3f4f6', color2: '#e5e7eb' },
    blue: { color1: '#dbeafe', color2: '#bfdbfe' },
    purple: { color1: '#f3e8ff', color2: '#e9d5ff' },
    green: { color1: '#dcfce7', color2: '#bbf7d0' },
    pink: { color1: '#fce7f3', color2: '#fbcfe8' },
    orange: { color1: '#fed7aa', color2: '#fdba74' },
    slate: { color1: '#f8fafc', color2: '#e2e8f0' }
} as const;

const createGradientBlur = (color1 = '#f0f0f0', color2 = '#e0e0e0') => {
    const svg = `
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:${color1};stop-opacity:0.9" />
                    <stop offset="40%" style="stop-color:${color2};stop-opacity:0.7" />
                    <stop offset="80%" style="stop-color:${color1};stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:${color2};stop-opacity:0.3" />
                </radialGradient>
                <filter id="blur">
                    <feGaussianBlur stdDeviation="3"/>
                </filter>
            </defs>
            <rect width="40" height="40" fill="url(#grad)" filter="url(#blur)"/>
        </svg>`;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

type ImageProperies = {
    src: string,
    className?: string
    width?: string | number;
    height?: string | number;
    alt?: string;
    quality?: number;
    priority?: boolean;
    sizes?: string;
    blurColor1?: string;
    blurColor2?: string;
};

const Image: React.FC<ImageProperies> = ({ 
    width = "100%", 
    height = "100%", 
    src, 
    className, 
    alt = "", 
    quality = 90,
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    blurColor1 = '#f3f4f6',
    blurColor2 = '#e5e7eb',
    ...props 
}) => {
    const numWidth = typeof width === "string" ? parseInt(width) || 800 : width as number;
    const numHeight = typeof height === "string" ? parseInt(height) || 600 : height as number;
    
    const gradientBlurDataURL = createGradientBlur(blurColor1, blurColor2);

    return (
        <div style={{width, height}}>
            <NextImage
                className={classNames(styles.image, className)}
                src={src}
                alt={alt}
                width={numWidth}
                height={numHeight}
                quality={quality}
                priority={priority}
                sizes={sizes}
                placeholder="blur"
                blurDataURL={gradientBlurDataURL}
                {...props}
            />
        </div>
    )
}

export default Image;