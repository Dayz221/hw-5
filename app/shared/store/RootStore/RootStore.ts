import { CartStore } from "./CartStore";
import { QueryStore } from "./QueryStore";
import { UserStore } from "./UserStore/UserStore";

import { enableStaticRendering } from 'mobx-react-lite';
const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

export class RootStore {
    readonly query = new QueryStore();
    readonly cart = new CartStore();
    readonly user = new UserStore();
}