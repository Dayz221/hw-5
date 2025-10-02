import STRAPI from ".";
import type { LoginUserApi } from "../../store/models/user/LoginUser";
import type { RegisterUserApi } from "../../store/models/user/RegisterUser";
import type { UserApi } from "../../store/models/user/User";

export const loginUser = async (data: { identifier: string; password: string }): Promise<LoginUserApi> => {
    const response = await STRAPI.post("/auth/local", data);

    return response;
}

export const registerUser = async (data: { username: string; email: string; password: string }): Promise<RegisterUserApi> => {
    const response = await STRAPI.post("/auth/local/register", data);

    return response;
}

export const fetchUser = async (): Promise<UserApi> => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
        throw new Error("No JWT token found");
    }
    
    const response = await STRAPI.get("/users/me");

    return response;
}
