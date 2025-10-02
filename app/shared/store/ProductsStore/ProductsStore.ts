import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { Meta } from "../../utils/meta";
import type { ProductCardModel } from "../models/products/ProductCard";
import { fetchProducts } from "../../api/Strapi/Products";
import { normalizeFetchProductsResponse } from "../models/products/FetchProductsResponse";
import { initialPaginationInfo, type PaginationInfoModel } from "../models/products/PaginationInfo";
import type { ILocalStore } from "../useLocalStore/useLocalStore";
import type { Option } from "../../components/MultiDropdown";
import CategoriesStore from "../CategoriesStore";

type privateFields = "_meta" | "_products" | "_pagination" | "_categoriesStore";

export default class ProductsStore implements ILocalStore {
    private _products: ProductCardModel[] = [];
    private _pagination: PaginationInfoModel = initialPaginationInfo();
    private _meta: Meta = Meta.initial;

    private _categoriesStore = new CategoriesStore();

    constructor() {
        makeObservable<this, privateFields>(
            this,
            {
                _products: observable.ref,
                _pagination: observable,
                _meta: observable,
                _categoriesStore: observable,
                meta: computed,
                products: computed,
                pagination: computed,
                categoriesStore: computed,
                fetchProducts: action,
            }
        )
    }

    async fetchProducts(params: { page: number; search: string; categories: Option[]; count: number }) {
        if (this._meta === Meta.loading)
            return;

        this._meta = Meta.loading;
        const { page, search, categories, count } = params;
        const validCategories = this._categoriesStore.validate(categories);
        const response = await fetchProducts(page, search, validCategories, count);

        runInAction(() => {
            try {
                const normalized = normalizeFetchProductsResponse(response);
                this._products = normalized.data;
                this._pagination = normalized.pagination;
                this._meta = Meta.success;
            } catch (error) {
                this._meta = Meta.error;
                throw error;
            }
        })
    }

    get meta() {
        return this._meta;
    }

    get products() {
        return this._products;
    }

    get categoriesStore() {
        return this._categoriesStore;
    }

    get pagination() {
        return this._pagination;
    }

    destroy() {

    }
}