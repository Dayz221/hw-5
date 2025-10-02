import { normalizePaginationInfo, type PaginationInfoApi, type PaginationInfoModel } from "./PaginationInfo";
import { normalizeProductCard, type ProductCardApi, type ProductCardModel } from "./ProductCard";

export type FetchProductsResponseApi = {
    data: ProductCardApi[];
    pagination: PaginationInfoApi;
};

export type FetchProductsResponseModel = {
    data: ProductCardModel[];
    pagination: PaginationInfoModel;
};

export const normalizeFetchProductsResponse = (from: FetchProductsResponseApi): FetchProductsResponseModel => {
    const cards: ProductCardModel[] = [];
    for (const fromCard of from.data) {
        cards.push(normalizeProductCard(fromCard));
    }
    
    const result: FetchProductsResponseModel = {
        data: cards,
        pagination: normalizePaginationInfo(from.pagination),
    }

    return result;
}