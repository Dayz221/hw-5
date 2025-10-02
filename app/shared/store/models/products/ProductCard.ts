import { normalizeProductCardImage, type ProductCardImageApi, type ProductCardImageModel } from "./ProductCardImage";

export type ProductCardApi = {
    id: number,
    documentId: string,

    title: string,
    description: string,

    price: number,
    discountPercent: number,

    rating: number,
    isInStock: boolean,

    images: ProductCardImageApi[],
    productCategory: {
        id: number,
        documentId: string,
        title: string,
    }
};

export type ProductCardModel = {
    id: number,
    documentId: string,

    title: string,
    description: string,

    price: number,
    discountPercent: number,

    rating: number,
    isInStock: boolean,

    images: ProductCardImageModel[],
    productCategory: {
        id: number,
        documentId: string,
        title: string,
    }
};

export const normalizeProductCard = (from: ProductCardApi): ProductCardModel => {
    const images: ProductCardImageModel[] = [];
    for (const fromImage of from.images) {
        images.push(normalizeProductCardImage(fromImage));
    }
    
    const result: ProductCardModel = {
        id: from.id,
        documentId: from.documentId,

        title: from.title,
        description: from.description,

        price: from.price,
        discountPercent: from.discountPercent,

        rating: from.rating,
        isInStock: from.isInStock,

        images: images,
        productCategory: {
            id: from.productCategory.id,
            documentId: from.productCategory.documentId,
            title: from.productCategory.title,
        }
    };

    return result;
}