import { action, computed, makeObservable, observable, runInAction } from "mobx";
import type { ProductCardModel } from "../../models/products/ProductCard";
import { Meta } from "../../../utils/meta";
import { addCartItem, fetchCartItems, removeCartItem } from "../../../api/Strapi/Cart";
import { normalizeCartItem, type CartItemApi, type CartItemModel } from "../../models/cart/CartItem";

type privateFields = "_items" | "_meta";

export class CartStore {
    private _meta: Meta = Meta.initial;
    private _items: CartItemModel[] = [];

    constructor() {
        makeObservable<this, privateFields>(
            this,
            {
                _items: observable,
                _meta: observable,
                meta: computed,
                items: computed,
                addItem: action,
                removeItem: action,
                loadItems: action
            }
        )
    }

    async loadItems() {
        if (this._meta === Meta.loading)
            return;

        this._meta = Meta.loading;

        let response: CartItemApi[];
        try {
            response = await fetchCartItems();
        } catch {
            this._meta = Meta.error;
            return;
        }

        runInAction(() => {
            try {
                for (const item of response) {
                    const candidate = this._items.find(el => el.originalProductId === item.originalProductId);
                    if (candidate) {
                        candidate.quantity += item.quantity;
                        this._meta = Meta.success;
                        return;
                    }
                    this._items.push(normalizeCartItem(item));
                    }
                this._meta = Meta.success;
            } catch {
                this._meta = Meta.error;
            }
        })
    }

    async addItem(id: number, quantity: number = 1) {
        if (this._meta === Meta.loading) return;

        this._meta = Meta.loading;

        let response: CartItemApi;
        try {
            response = await addCartItem(id, quantity);
        } catch {
            this._meta = Meta.error;
            return;
        }

        runInAction(() => {
            try {
                const candidate = this._items.find(el => el.originalProductId === response.originalProductId);
                if (candidate) {
                    candidate.quantity = response.quantity;
                    this._meta = Meta.success;
                    return;
                }
                this._items.push(normalizeCartItem(response));
                this._meta = Meta.success;
            } catch {
                this._meta = Meta.error;
            }
        });
    }

    async removeItem(id: number) {
        if (this._meta === Meta.loading) return;
        
        const candidate = this._items.find(el => el.originalProductId === id);
        if (!candidate) {
            this._meta = Meta.error;
            return;
        }
        
        this._meta = Meta.loading;

        try {
            await removeCartItem(id, candidate.quantity);
            runInAction(() => {
                this._items = this._items.filter(el => el.originalProductId !== id);
                this._meta = Meta.success;
            });
        } catch {
            this._meta = Meta.error;
        }
    }

    async decreaseItem(id: number, quantity: number = 1) {
        if (this._meta === Meta.loading) return;

        const candidate = this._items.find(el => el.originalProductId === id);
        if (!candidate) {
            this._meta = Meta.error;
            return;
        }

        this._meta = Meta.loading;

        try {
            const response = await removeCartItem(id, quantity);
            runInAction(() => {
                candidate.quantity = response.quantity;
                this._meta = Meta.success;
            });
        } catch {
            this._meta = Meta.error;
        }
    }

    checkInCart(item: ProductCardModel): boolean {
        return !!this._items.find(el => el.originalProductId === item.id);
    }

    get items() {
        return this._items;
    }

    get meta() {
        return this._meta;
    }
};