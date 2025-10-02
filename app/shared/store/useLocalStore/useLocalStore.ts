import { useEffect, useRef } from "react";

export interface ILocalStore {
    destroy(): void;
};

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
    const ref = useRef<T | null>(null);
    if (ref.current === null) {
        ref.current = creator();
    }

    useEffect(() => () => ref.current?.destroy(), []);

    return ref.current;
}