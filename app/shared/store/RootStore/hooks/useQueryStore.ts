'use client';

import { useSearchParams } from "next/navigation";
import rootStore from "..";
import { useEffect } from "react";

export const useQueryStore = () => {
    const location = useSearchParams();
    const locationValues = location.toString();

    useEffect(() => {
        console.log(locationValues);
        rootStore.query.setParams(locationValues);
    }, [location, locationValues]);
}