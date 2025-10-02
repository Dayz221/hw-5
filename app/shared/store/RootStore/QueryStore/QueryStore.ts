import { action, computed, makeObservable, observable } from "mobx";
import qs from "qs"

type privateFields = "_params" | "_loaded";

export class QueryStore {
    private _params: qs.ParsedQs = {};
    private _search: string = "";

    private _loaded = false;

    constructor() {
        makeObservable<this, privateFields>(
            this,
            {
                _params: observable,
                _loaded: observable,
                setParam: action,
                setParams: action,
                loaded: computed,
                params: computed
            }
        )
    }

    getParam(key: string): undefined | string | qs.ParsedQs | (string | qs.ParsedQs)[] {
        return this._params[key];
    }

    setParams(query: string) {
        const params = query.startsWith("?") ? query.slice(1) : query;

        if (params !== this._search) {
            this._search = params;
            this._params = qs.parse(params);
        }

        this._loaded = true;
    }

    setParam(key: string, value: string | qs.ParsedQs | (string | qs.ParsedQs)[]) {
        this._params[key] = value;
    }

    get params() {
        return qs.stringify(this._params);
    }

    get loaded() {
        return this._loaded;
    }
}