import STRAPI from "."
import qs from "qs"
import type { FetchProductsResponseModel } from "../../store/models/products/FetchProductsResponse";
import type { ProductCardModel } from "../../store/models/products/ProductCard";
import type { Option } from "../../components/MultiDropdown";

export const fetchCategories = async () => {
    const response = await STRAPI.get("/product-categories");

    return response.data;
}

export const fetchProducts = async (page: number = 1, search: string = "", categories: Option[] = [], pageSize: number = 8): Promise<FetchProductsResponseModel> => {
    const query = qs.stringify({
        populate: ['images', 'productCategory'],
        pagination: {
            page,
            pageSize,
        },
        filters: {
            title: {
                $containsi: search
            },
            productCategory: {
                id: {
                    $in: categories?.map(el => Number(el.key))
                }
            },
        }
    });

    const response = await STRAPI.get(`/products?${query}`);

    return { data: response.data, pagination: response.meta.pagination };
};

export const fetchProduct: (documentId: string) => Promise<ProductCardModel> = async (id) => {
    const query = qs.stringify({
        populate: ['images', 'productCategory'],
    });

    const response = await STRAPI.get(`/products/${id}?${query}`)

    return response.data;
};