import classNames from 'classnames';
import React from 'react';

import styles from "./input.module.scss"

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({value, onChange, afterSlot, className, ...props}, ref) => {
  return (
    <div className={classNames(styles.input_container, className, {[styles.with_icon]: !!afterSlot})} onClick={() => {
      if (typeof ref !== 'function' && ref?.current) {
        ref.current.focus();
      }
    }}>
      <input type='text' ref={ref} value={value} onChange={(e) => onChange(e.target.value)} {...props} />
      { afterSlot }
    </div>
  )
});

Input.displayName = 'Input';

export default Input;
