export type UserApi = {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
}

export type UserModel = {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export const normalizeUser = (data: UserApi): UserModel => ({
    id: data.id,
    username: data.username,
    email: data.email,
    provider: data.provider,
    confirmed: data.confirmed,
    blocked: data.blocked,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
});