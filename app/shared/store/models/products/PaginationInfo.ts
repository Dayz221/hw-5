export type PaginationInfoApi = {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
};

export type PaginationInfoModel = {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
};

export const normalizePaginationInfo = (from: PaginationInfoApi): PaginationInfoModel => {
    const result: PaginationInfoModel = {
        page: from.page,
        pageCount: from.pageCount,
        pageSize: from.pageSize,
        total: from.total,
    };

    return result;
}

export const initialPaginationInfo = (): PaginationInfoModel => {
    return {
        page: 0,
        pageCount: 0,
        pageSize: 0,
        total: 0
    };
}