import type { Option } from "../../../components/MultiDropdown";

export type CategoryApi = {
    id: number,
    documentId: string,
    title: string
};

export const normalizeCategory = (from: CategoryApi): Option => {
    const result = {
        key: from.id.toString(),
        value: from.title
    }

    return result;
}