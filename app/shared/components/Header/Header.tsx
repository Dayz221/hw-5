'use client';
import type React from "react";

import BasketIcon from "components/icons/BasketIcon";
import AccountIcon from "components/icons/AccountIcon";
import Text from "../Text";

import styles from "./Header.module.scss";
import classNames from "classnames";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDeviceType } from "../../hooks/useDeviceType";

type MenuItemProps = {
    path: string;
    text: string;
    onClick?: () => void,
};

const MenuItem: React.FC<MenuItemProps> = ({ path, text, onClick }) => {
    const active = usePathname().startsWith(path);

    return (
        <Link href={path} onClick={onClick} className={classNames(styles.menu_item, { [styles.active]: active })}>
            <Text view="p-18" color={active ? "accent" : "primary"}>{text}</Text>
        </Link >
    );
}

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const device = useDeviceType();
    console.log(device);
    const isMobile = device === "tablet" || device === "mobile";

    const headerContent = (
        <>
            <menu className={styles.menu}>
                <MenuItem path="/products" text="Products" onClick={() => setIsOpen(false)} />
                <MenuItem path="/categories" text="Categories" onClick={() => setIsOpen(false)} />
                <MenuItem path="/about_us" text="About us" onClick={() => setIsOpen(false)} />
            </menu>

            <div className={styles.user_controls}>
                <Link href="/basket" onClick={() => setIsOpen(false)}>
                    <BasketIcon />
                </Link>
                <Link href="/account" onClick={() => setIsOpen(false)}>
                    <AccountIcon />
                </Link>
            </div>
        </>
    );

    return (
        <>
            <header className={styles.header}>
                <Image 
                    src="/Logo.svg" 
                    alt="Logo" 
                    width={100} 
                    height={50} 
                    priority={true}
                    quality={100}
                />

                {!isMobile && headerContent}

                {isMobile &&
                    <div className={styles.menu_icon} onClick={() => setIsOpen(true)}>
                        <div />
                        <div />
                        <div />
                    </div>
                }
            </header>

            {isMobile &&
                <div className={classNames(styles.mobile_menu, { [styles.active]: isOpen })}>
                    <div className={styles.close} onClick={() => setIsOpen(false)}>
                        <div />
                        <div />
                    </div>
                    {headerContent}
                </div>
            }
        </>
    );
};

export default Header;