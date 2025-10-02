import { normalizeProductCard, type ProductCardApi, type ProductCardModel } from "../products/ProductCard"

export type CartItemApi = {
    id: number,
    documentId: string,
    originalProductId: number,
    product: ProductCardApi,
    quantity: number,
}

export type CartItemModel = {
    id: number,
    documentId: string,
    originalProductId: number,
    product: ProductCardModel,
    quantity: number,
}

export const normalizeCartItem = (item: CartItemApi): CartItemModel => {
    return {
        id: item.id,
        documentId: item.documentId,
        originalProductId: item.originalProductId,
        product: normalizeProductCard(item.product),
        quantity: item.quantity,
    };
}