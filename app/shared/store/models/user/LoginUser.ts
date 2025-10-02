import type { UserModel } from "./User";

export type LoginUserApi = {
    jwt: string,
    user: {
        id: number,
        username: string,
        email: string,
        createdAt: string,
        updatedAt: string,
    },
}

export type LoginUserModel = {
    jwt: string,
    user: UserModel
}

export const normalizeLoginUser = (data: LoginUserApi): LoginUserModel => ({
    jwt: data.jwt,
    user: {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        blocked: false,
        confirmed: false,
        provider: "",
        createdAt: new Date(data.user.createdAt),
        updatedAt: new Date(data.user.updatedAt),
    }
});