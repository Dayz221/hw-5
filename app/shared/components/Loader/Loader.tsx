import classNames from 'classnames';
import React from 'react';
import styles from "./loader.module.scss"

export type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({size="l", className}) => {
    return (
        <div className={classNames(styles.loader, className, styles[size])}>
            <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.3741 34.6155C15.3022 36.4791 7.24785 31.4462 5.3843 23.3742C3.52074 15.3023 8.55364 7.24798 16.6256 5.38443C24.6975 3.52087 32.7518 8.55376 34.6154 16.6257L39.4873 15.501C37.0025 4.73836 26.2634 -1.97217 15.5008 0.512576C4.73824 2.99732 -1.97229 13.7364 0.512449 24.499C2.99719 35.2616 13.7363 41.9721 24.4989 39.4874L23.3741 34.6155Z" fill="#518581"/>
            </svg>
        </div>
    )
};

export default Loader;
