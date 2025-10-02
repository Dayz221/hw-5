import { action, computed, makeObservable, observable, runInAction } from "mobx";
import type { ILocalStore } from "../useLocalStore/useLocalStore";
import { Meta } from "../../utils/meta";
import type { ProductCardModel } from "../models/products/ProductCard";
import { fetchProduct } from "../../api/Strapi/Products";

type privateFields = "_product" | "_meta";

export default class ProductStore implements ILocalStore {
    private _product: ProductCardModel | null = null;
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<this, privateFields>(
            this,
            {
                _product: observable,
                _meta: observable,
                product: computed,
                meta: computed,
                fetchProduct: action,
            }
        )
    }

    get product() {
        return this._product;
    }

    get meta() {
        return this._meta;
    }

    async fetchProduct(documentId: string) {
        this._meta = Meta.loading;
        try {
            const response = await fetchProduct(documentId);
            runInAction(() => {
                this._product = response;
                this._meta = Meta.success;
            });
        } catch (error) {
            runInAction(() => {
                this._meta = Meta.error;
                throw error;
            })
        }
    }

    destroy() {}
}