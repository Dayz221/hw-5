import type { UserModel } from "./User";

export type RegisterUserApi = {
    jwt: string,
    user: {
        id: number,
        username: string,
        email: string,
        createdAt: string,
        updatedAt: string,
    },
}

export type RegisterUserModel = {
    jwt: string,
    user: UserModel
}

export const normalizeRegisterUser = (data: RegisterUserApi): RegisterUserModel => ({
    jwt: data.jwt,
    user: {
        id: data.user.id,
        provider: "",
        blocked: false,
        confirmed: false,
        username: data.user.username,
        email: data.user.email,
        createdAt: new Date(data.user.createdAt),
        updatedAt: new Date(data.user.updatedAt),
    },
});
