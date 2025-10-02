import * as React from 'react'
import classNames from 'classnames';
import type { IconProps } from '../Icon';

import styles from "./icon.module.scss"

const ArrowDownIcon: React.FC<IconProps> = ({ color = "primary", angle = 0, className, ...props }) => {
    return (
        <svg style={{transform: `rotate(${angle}deg)`, transition: "transform .3s"}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={classNames(styles.icon, className, styles[color])} {...props}>
            <path fill='#000' fillRule="evenodd" clipRule="evenodd" d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z" />
        </svg>
    )
}

export default ArrowDownIcon;
