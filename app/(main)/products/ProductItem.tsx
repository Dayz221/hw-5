'use client';

import React from "react";
import Card from "components/Card";
import Button from "components/Button";
import { ROUTES } from "config/routes";
import { evalPrice } from "utils/evalPrice";
import type { ProductCardModel } from "store/models/products/ProductCard";
import { useRouter } from "next/navigation";

interface ProductItemProps {
  data: ProductCardModel;
  onAdd: (id: number) => void;
  onClick: () => void;
  onCart: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({ data, onAdd, onClick, onCart }) => {
  const router = useRouter();
  return (
    <Card
      key={data.id}
      image={data.images[0].url}
      subtitle={data.description}
      title={data.title}
      captionSlot={data.productCategory.title}
      contentSlot={`$${evalPrice(data.price, data.discountPercent).toFixed(2)}`}
      actionSlot={
        <Button onClick={() => (onCart ? router.push(ROUTES.cart.get()) : onAdd(data.id))}>
          {onCart ? "On Cart!" : "Add to Cart"}
        </Button>
      }
      onClick={onClick}
    />
  );
};

export default ProductItem;
