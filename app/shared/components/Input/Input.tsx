import classNames from 'classnames';
import React, { useRef } from 'react';

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

const Input: React.FC<InputProps> = (({value, onChange, afterSlot, className, ...props}) => {
  const inputElement = useRef<null | HTMLInputElement>(null);

  return (
    <div className={classNames(styles.input_container, className, {[styles.with_icon]: !!afterSlot})} onClick={() => inputElement.current?.focus()}>
      <input type='text' ref={inputElement} value={value} onChange={(e) => onChange(e.target.value)} {...props} />
      { afterSlot }
    </div>
  )
});

export default Input;
