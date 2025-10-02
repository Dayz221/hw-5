import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { fetchUser, loginUser, registerUser } from "../../../api/Strapi/User";
import { normalizeUser, type UserModel } from "../../models/user/User";
import { Meta } from "../../../utils/meta";
import { normalizeRegisterUser, type RegisterUserApi } from "../../models/user/RegisterUser";
import { normalizeLoginUser, type LoginUserApi } from "../../models/user/LoginUser";

export class UserStore {
    private _userData: UserModel | null = null;
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<this, "_userData" | "_meta">(
            this,
            {
                _userData: observable.ref,
                _meta: observable,
                userData: computed,
                meta: computed,
                fetchUserData: action,
            }
        );
    }

    async fetchUserData() {
        if (this._meta === Meta.loading) {
            return;
        }

        this._meta = Meta.loading;
    const response = await fetchUser();

        runInAction(() => {
            try {
                this._userData = normalizeUser(response);
                this._meta = Meta.success;
            } catch {
                this._userData = null;
                this._meta = Meta.error;
            }
        });
    }

    async registerUser({ username, email, password }: { username: string; email: string; password: string }) {
        if (this._meta === Meta.loading) {
            return;
        }
        
        this._meta = Meta.loading;
        let response: RegisterUserApi | undefined;
        try {
            response = await registerUser({ username, email, password });
        } catch {
            runInAction(() => {
                this._userData = null;
                this._meta = Meta.error;
            });
        }
        if (!response) {
            this._meta = Meta.error;
            return;
        }
        runInAction(() => {
            try {
                const { jwt, user } = normalizeRegisterUser(response);
                this._userData = user;
                localStorage.setItem("jwt", jwt);

                this._meta = Meta.success;
            } catch {
                this._userData = null;
                this._meta = Meta.error;
            }
        });
    }

    async loginUser({ identifier, password }: { identifier: string; password: string }) {
        if (this._meta === Meta.loading) {
            return;
        }

        let response: LoginUserApi | undefined;
        this._meta = Meta.loading;
        try {
            response = await loginUser({ identifier, password });
        } catch {
            runInAction(() => {
                this._userData = null;
                this._meta = Meta.error;
            });
        }
        if (!response) {
            this._meta = Meta.error;
            return;
        }
        runInAction(() => {
            try {
                const { jwt, user } = normalizeLoginUser(response);
                this._userData = user;
                localStorage.setItem("jwt", jwt);

                this._meta = Meta.success;
            } catch {
                this._userData = null;
                this._meta = Meta.error;
            }
        });
    }

    get userData() {
        return this._userData;
    }

    get meta() {
        return this._meta;
    }
}