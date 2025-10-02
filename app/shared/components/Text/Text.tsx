import classNames from 'classnames';
import React from 'react';
import styles from "./text.module.scss";

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-32' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
    /** Выравнивание текста */
    align?: "left" | "center" | "right";
};

const Text: React.FC<TextProps> = ({ className, align = "start", view = "p-16", tag: Tag = 'div', weight = "normal", children, color = "primary", maxLines }) => {
    return (
        <Tag className={classNames(styles.text, className, styles[view], styles[color], styles[weight], styles[align])} style={{ WebkitLineClamp: maxLines }}>
            {children}
        </Tag>
    )
};

export default Text;
