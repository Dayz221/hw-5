import * as React from 'react'
import classNames from 'classnames';
import type { IconProps } from '../Icon';

import styles from "./icon.module.scss"

const CheckIcon: React.FC<IconProps> = ({ color = "primary", className, ...props }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={classNames(styles.icon, className, styles[color])} {...props}>
            <path stroke='#000' d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
        </svg>
    )
}

export default CheckIcon;
