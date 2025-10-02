'use client';

import type React from "react";
import { useEffect } from "react";

import styles from "./ProductPage.module.scss";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import Text from "components/Text";
import ImageSlider from "components/ImageSlider";
import { evalPrice } from "utils/evalPrice";
import Button from "components/Button";
import Card from "components/Card";
import type { ProductCardModel } from "../../../shared/store/models/products/ProductCard";
import { ROUTES } from "config/routes";
import rootStore from "store/RootStore";
import { DeviceType, useDeviceType } from "hooks/useDeviceType";
import { useRouter } from "next/navigation";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

interface ProductPageClientProps {
    product: ProductCardModel;
}

const ProductPageClient: React.FC<ProductPageClientProps> = ({ product }) => {
    const router = useRouter();
    const deviceType = useDeviceType();
    
    // Получаем связанные товары из localStorage
    const related_items: ProductCardModel[] = (typeof window !== 'undefined' && localStorage) 
        ? JSON.parse(localStorage.getItem("related_items") || "[]") 
        : [];
    
    const onCart = rootStore.cart.checkInCart(product) || false;

    // Сохраняем текущий товар в связанные товары
    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage) {
            const currentItems = JSON.parse(localStorage.getItem("related_items") || "[]");
            const existingItemIndex = currentItems.findIndex((item: ProductCardModel) => item.id === product.id);
            
            if (existingItemIndex === -1) {
                const updatedItems = [product, ...currentItems.slice(0, 4)];
                localStorage.setItem("related_items", JSON.stringify(updatedItems));
            }
        }
    }, [product]);

    return (
        <>
            <button className={styles.back_button} onClick={() => router.back()}>
                <ArrowDownIcon angle={90} />
                <Text className={styles.back_button_text} view="p-20">Back</Text>
            </button>

            <div className={styles.product}>
                <ImageSlider images={toJS(product.images)} />
                <div className={styles.product_info}>
                    <Text 
                        tag="h1" 
                        className={styles.title} 
                        view={deviceType === DeviceType.mobile ? "p-32" : "title"} 
                        maxLines={2} 
                        weight="bold"
                    >
                        {product.title}
                    </Text>
                    <Text 
                        className={styles.description} 
                        view={deviceType === DeviceType.mobile ? "p-16" : "p-20"} 
                        maxLines={4} 
                        color="secondary"
                    >
                        {product.description}
                    </Text>
                    <Text 
                        className={styles.price} 
                        view={deviceType === DeviceType.mobile ? "p-32" : "title"} 
                        weight="bold"
                    >
                        ${evalPrice(product.price, product.discountPercent).toFixed(2)}
                    </Text>

                    <div className={styles.actions}>
                        <Button>Buy now</Button>
                        <Button
                            color="secondary"
                            onClick={() => {
                                if (onCart) {
                                    router.push(ROUTES.cart.get());
                                } else {
                                    rootStore.cart.addItem(product.id);
                                }
                            }}
                        >
                            {onCart ? "On cart!" : "Add to Cart"}
                        </Button>
                    </div>
                </div>
            </div>

            <Text view="p-32" weight="bold" className={styles.related_items_title}>
                Related Items
            </Text>

            <div className={styles.related_items}>
                {related_items
                    .filter(item => item.id !== product.id) // Исключаем текущий товар
                    .slice(0, deviceType === DeviceType.mobile ? 2 : 3)
                    .map((data) => (
                        <Card
                            key={data.id}
                            image={data.images[0].url}
                            subtitle={data.description}
                            title={data.title}
                            captionSlot={data.productCategory.title}
                            contentSlot={`$${evalPrice(data.price, data.discountPercent).toFixed(2)}`}
                            actionSlot={<Button>Add to Cart</Button>}
                            onClick={() => router.push(ROUTES.product.get(data.documentId))}
                        />
                    ))
                }
            </div>
        </>
    );
};

const ObservedProductPageClient = observer(ProductPageClient);
export default ObservedProductPageClient;