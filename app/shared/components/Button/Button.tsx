import React from 'react';
import Loader from '../Loader';

import styles from "./button.module.scss"
import classNames from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;

  size?: "normal" | "small";

  color?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({loading, children, className, disabled, size = "normal", color = "primary", ...props}) => {
  return (
    <button className={classNames(styles.button, {[styles.loading]: loading, [styles.disabled]: disabled, [styles[size]]: true}, className, styles[color])} disabled={disabled || loading} {...props} >
      {loading && <Loader className={styles.button_loader} size='s' />}
      {children}
    </button>
  )
};

export default Button;
