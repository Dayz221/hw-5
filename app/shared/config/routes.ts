export const ROUTES = {
    products: {
        path: "/products",
        get: () => "/products",
    },
    
    product: {
        path: "/product/:id",
        get: (id: string) => `/product/${id}`,
    },
    
    categories: {
        path: "/categories",
        get: () => "/categories"
    },
    
    aboutUs: {
        path: "/about_us",
        get: () => "/about_us"
    },
    
    cart: {
        path: "/basket",
        get: () => "/basket"
    },
    
    register: {
        path: "/register",
        get: () => "/register"
    },
    
    login: {
        path: "/login",
        get: () => "/login"
    },
    
    account: {
        path: "/account",
        get: () => "/account"
    },
}