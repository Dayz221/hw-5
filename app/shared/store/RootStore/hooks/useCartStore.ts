import { useEffect } from "react"
import rootStore from ".."

export const useCartStore = () => {
    useEffect(() => {
        rootStore.cart.loadItems();
    }, [])
}