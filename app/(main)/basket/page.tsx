'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import Text from "components/Text";
import styles from "./CartPage.module.scss";
import rootStore from "store/RootStore";
import Button from "components/Button";
import { ROUTES } from "config/routes";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";

const CartPage: React.FC = () => {
    const router = useRouter();

    if (!rootStore.user.userData) {
        return (
            <div className={styles.need_login}>
                <Text className={styles.need_login_text} align="center" view="p-20" color="primary">You need to be logged in to view your cart.</Text>
                <Button onClick={() => router.push(ROUTES.login.path)}>Login</Button>
            </div>
        )
    }

    return (
        <>
            <Text className={styles.title} view="title" tag="h1" weight="bold" align="center">Your Basket</Text>

            {rootStore.cart.items.length === 0 ?
                <div className={styles.no_elements}>
                    <Text view="p-20" color="primary" align="center">There are no items in your cart yet. View them on the product page!</Text>
                    <Button onClick={() => router.push(ROUTES.products.get())}>ProductsPage</Button>
                </div>
                :
                <div className={styles.products}>
                    {
                        rootStore.cart.items.map(data => <CartItem key={data.id} cartItemData={data} />)
                    }
                </div>
            }
        </>
    );
}

const ObservedCartPage = observer(CartPage);
export default ObservedCartPage;
