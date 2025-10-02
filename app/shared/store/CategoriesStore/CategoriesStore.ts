import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { Meta } from "../../utils/meta";
import { fetchCategories } from "../../api/Strapi/Products";
import type { ILocalStore } from "../useLocalStore/useLocalStore";
import type { Option } from "../../components/MultiDropdown";
import { normalizeCategory } from "../models/categories/category";

type privateFields = "_meta" | "_categories";

export default class CategoriesStore implements ILocalStore {
    private _categories: Option[] = [];
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<this, privateFields>(
            this,
            {
                _categories: observable.ref,
                _meta: observable,
                meta: computed,
                categories: computed,
                fetchCategories: action
            }
        )
    }

    async fetchCategories() {
        if (this._meta === Meta.loading)
            return;

        this._meta = Meta.loading;

        const response = await fetchCategories();

        runInAction(() => {
            try {
                const next: Option[] = [];
                for (const fromCategory of response) {
                    next.push(normalizeCategory(fromCategory));
                }
                this._categories = next;
                this._meta = Meta.success;
            } catch (error) {
                this._meta = Meta.error;
                throw error;
            }
        });
    }

    get meta() {
        return this._meta;
    }

    get categories() {
        return this._categories;
    }

    validate(options: Option[]) {
        const result: Option[] = []; 
        for (const opt of options) {
            if (this._categories.find(el => el.key === opt.key)) {
                result.push(opt);
            }
        }
        return result;
    }

    destroy() {

    }
}