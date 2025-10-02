import React from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

import Card from "components/Card";
import Button from "components/Button";
import Text from "components/Text";
import { evalPrice } from "utils/evalPrice";
import { ROUTES } from "config/routes";
import rootStore from "store/RootStore";
import type { CartItemModel } from "store/models/cart/CartItem";

import styles from "./CartPage.module.scss";
import { useRouter } from "next/navigation";

interface CartItemProps {
    cartItemData: CartItemModel;
}

const CartItem: React.FC<CartItemProps> = observer(({ cartItemData }) => {
    const router = useRouter();
    const data = toJS(cartItemData);
    const cartStore = rootStore.cart;

    const [count, setCount] = React.useState<number>(data.quantity);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (count < data.quantity) {
                cartStore.decreaseItem(data.originalProductId, data.quantity - count);
            } else if (count > data.quantity) {
                cartStore.addItem(data.originalProductId, count - data.quantity);
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [count, data.quantity, data.originalProductId, cartStore]);

    const onDelete = () => {
        if (window.confirm("Are you sure you want to remove this item from the cart?")) {
            cartStore.removeItem(data.originalProductId);
        }
    };

    return (
        <Card
            key={data.id}
            image={data.product.images[0].url}
            subtitle={data.product.description}
            title={data.product.title}
            captionSlot={data.product.productCategory.title}
            contentSlot={`$${evalPrice(data.product.price * count, data.product.discountPercent).toFixed(2)}`}
            actionSlot={
                <div className={styles.actions}>
                    <Button color="secondary" size="small" onClick={onDelete}>X</Button>
                    <div className={styles.count_selector}>
                        <Button size="small" onClick={() => setCount(prev => prev - 1)} disabled={count <= 1}>-</Button>
                        <Text className={styles.quantity} view="p-20" weight="bold">{count}</Text>
                        <Button size="small" onClick={() => setCount(prev => prev + 1)}>+</Button>
                    </div>
                </div>
            }
            onClick={() => router.push(ROUTES.product.get(data.product.documentId))}
        />
    );
});

export default CartItem;
