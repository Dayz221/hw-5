import STRAPI from "."
import type { CartItemApi } from "../../store/models/cart/CartItem";

export const fetchCartItems = async (): Promise<CartItemApi[]> => {
    const response = await STRAPI.get("/cart");

    return response;
}

export const addCartItem = async (productId: number, quantity: number): Promise<CartItemApi> => {
    const response = await STRAPI.post("/cart/add", {
        product: productId,
        quantity
    });

    return response;
}

export const removeCartItem = async (cartItemId: number, quantity: number = 1) => {
    const response = await STRAPI.post(`/cart/remove`, {
        product: cartItemId,
        quantity
    });

    return response;
}