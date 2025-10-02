import React, { useRef, useState } from 'react';
import Input from '../Input';
import classNames from 'classnames';

import styles from  "./multiDropDown.module.scss"
import ArrowDownIcon from '../icons/ArrowDownIcon';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

type DropdownElementProps = {
  data: Option;
  active: boolean;
  onClick: (data: Option) => void;
};

const DropdownElement: React.FC<DropdownElementProps> = ({data, active, onClick}) => {
  return (
    <div className={classNames(styles.dropdown_element, {[styles.active]: active})} onMouseDown={e => e.preventDefault()} onClick={() => onClick(data)}>
      {data.value}
    </div>
  )
}

const MultiDropdown: React.FC<MultiDropdownProps> = ({className, options, value, onChange, disabled, getTitle}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

  const dropdownRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const findByKey = <T extends {key: unknown}>(values: T[], element: T): T | undefined => {
    return values.find(el => el.key === element.key);
  };

  const handleClick = (data: Option) => {
    if (findByKey(value, data)) {
      const changedArray = value.filter(el => el.key !== data.key);
      onChange(changedArray);
    } else {
      const changedArray = [...value, data];
      onChange(changedArray);
    }
  }

  const title = getTitle(value);
  
  return (
    <div ref={dropdownRef} className={classNames(styles.dropdown, className, {[styles.active]: !disabled && isOpen})}>
      <Input ref={inputRef} className={styles.dropdown_input} disabled={disabled} value={isOpen ? filter : (value.length !== 0 ? title : "")} placeholder={title} onChange={setFilter} onFocus={() => {setIsOpen(prev => !prev); }} onBlur={() => {setIsOpen(false); setFilter(""); inputRef.current?.blur()}} afterSlot={<ArrowDownIcon angle={isOpen ? -180 : 0} color='secondary' />} />
      { !disabled && isOpen && 
        <div className={styles.dropdown_list}>
          {
            options.filter(el => el.value.toLowerCase().startsWith(filter.toLowerCase().trim())).sort().map(data => {
              return <DropdownElement key={data.key} data={data} onClick={handleClick} active={!!findByKey(value, data)} />
            })
          }
        </div>
      }
    </div>
  )
};

export default MultiDropdown;
