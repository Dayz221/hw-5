export type ProductCardImageApi = {
    url: string,
    formats: {
        large: {
            url: string
        },
        medium: {
            url: string
        },
        small: {
            url: string
        },
        thumbnail: {
            url: string
        },
    }
};

export type ProductCardImageModel = {
    url: string,
    formats: {
        large: {
            url: string
        },
        medium: {
            url: string
        },
        small: {
            url: string
        },
        thumbnail: {
            url: string
        },
    }
}

export const normalizeProductCardImage = (from: ProductCardImageApi): ProductCardImageModel => {
    const result: ProductCardImageModel = {
        url: from.url,
        formats: {
            large: {
                url: from.formats.large.url
            },
            medium: {
                url: from.formats.medium.url
            },
            small: {
                url: from.formats.small.url
            },
            thumbnail: {
                url: from.formats.thumbnail.url
            },
        }
    }

    return result;
}