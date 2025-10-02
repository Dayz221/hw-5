'use client';

import type React from "react";
import Text from "components/Text";

import styles from "./Products.module.scss";
import Input from "components/Input";
import { useEffect, useState, useMemo, useRef } from "react";
import Button from "components/Button";
import MultiDropdown, { type Option } from "components/MultiDropdown";
import PageSelector from "components/PageSelector";
import { ROUTES } from "config/routes";
import ProductsStore from "store/ProductsStore";
import type { ProductCardModel } from "store/models/products/ProductCard";
import { useLocalStore } from "store/useLocalStore/useLocalStore";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import rootStore from "store/RootStore";
import { Meta } from "utils/meta";
import Loader from "components/Loader";
import { DeviceType, useDeviceType } from "hooks/useDeviceType";
import { ROWS_COUNT } from "../../consts";
import qs from "qs";
import ProductItem from "./ProductItem";
import { usePathname, useRouter } from "next/navigation";


type QueryParams = {
    page: number,
    search: string,
    categories: Option[]
}

const initialQueryParams: QueryParams = {
    page: 1,
    search: "",
    categories: []
}

const toQueryString = (qp: QueryParams) => {
    const result: { [key: string]: number | string | Option[] } = {};
    if (qp.page) {
        result.page = Number(qp.page);
    }
    if (qp.search.length > 0) {
        result.search = qp.search
    }
    if (qp.categories.length > 0) {
        result.categories = qp.categories;
    }

    return `?${qs.stringify(result)}`;
}


const ProductsPage: React.FC = () => {
    const productsStore = useLocalStore(() => new ProductsStore());
    const categoriesStore = productsStore.categoriesStore;
    const router = useRouter();
    const pathname = usePathname();

    const [search, setSearch] = useState<string>("");
    const [queryParams, setQueryParams] = useState<QueryParams>(initialQueryParams);

    const deviceType = useDeviceType();

    const pageParam = rootStore.query.getParam("page");
    const searchParamCurrent = rootStore.query.getParam("search");
    const categoriesParamCurrent = rootStore.query.getParam("categories");

    const ref = useRef<HTMLInputElement | null>(null);

    const querySnapshot = useMemo(() => {
        const page = Number(pageParam || 1);
        const sParam = String(searchParamCurrent || "");
        const cParam = (categoriesParamCurrent as Option[] | undefined) || [];
        return { page, searchParam: sParam, categoriesParam: cParam };
    }, [pageParam, searchParamCurrent, categoriesParamCurrent]);

    useEffect(() => {
        if (!rootStore.query.loaded) return;
        const s = (rootStore.query.getParam("search") as string) || "";
        const c = (rootStore.query.getParam("categories") as Option[] | undefined) || [];
        setQueryParams(prev => ({ ...prev, search: s, categories: c }));
        setSearch(s);
    }, [pageParam, searchParamCurrent, categoriesParamCurrent]);

    useEffect(() => {
        categoriesStore.fetchCategories();
    }, [categoriesStore])

    const queryLoaded = rootStore.query.loaded;
    const categoriesMeta = productsStore.categoriesStore.meta;

    useEffect(() => {
        if (!queryLoaded || categoriesMeta !== Meta.success) return;

        const count = deviceType === DeviceType.desktop
            ? ROWS_COUNT * 3
            : deviceType === DeviceType.tablet
                ? ROWS_COUNT * 2
                : ROWS_COUNT;

        productsStore.fetchProducts({
            page: querySnapshot.page,
            search: querySnapshot.searchParam,
            categories: querySnapshot.categoriesParam,
            count
        });
    }, [queryLoaded, categoriesMeta, deviceType, productsStore, querySnapshot]);

    const getDropdownTitle = (values: Option[]) => values.length === 0 ? "Filter" : values.map(el => el.value).join(", ");

    const onCardClick = (data: ProductCardModel) => {
        router.push(ROUTES.product.get(data.documentId));

        const relatedItems = JSON.parse(localStorage.getItem("related_items") || "[]");
        if (relatedItems.find((item: ProductCardModel) => item.id === data.id)) {
            return;
        }
        if (relatedItems.length === 3) {
            relatedItems.shift();
        }
        relatedItems.push(data);
        localStorage.setItem("related_items", JSON.stringify(relatedItems));
    };

    const onPageChange = (newPage: number) => {
        setQueryParams(prev => ({ ...prev, page: newPage }));
        router.replace(pathname + toQueryString({ ...queryParams, page: newPage }));
    }

    const onSearchClick = () => {
        setQueryParams(prev => ({ ...prev, search, page: 1 }));
        router.replace(pathname + toQueryString({ ...queryParams, search, page: 1 }));
    }

    const onSearchChange = (newSearch: string) => {
        setSearch(newSearch);
    }

    const onCategoriesChange = (newCategories: Option[]) => {
        setQueryParams(prev => ({ ...prev, categories: newCategories, page: 1 }));
        router.replace(pathname + toQueryString({ ...queryParams, categories: newCategories, page: 1 }));
    }

    const onAddItem = (id: number) => {
        rootStore.cart.addItem(id, 1);
    }

    return (
        <>
            <Text className={styles.title} view="title" tag="h1" weight="bold" align="center">Products</Text>
            <Text className={styles.subtitle} view="p-20" align="center" color="secondary" >
                We display products based on the latest products we have, if you want<br />
                to see our old products please enter the name of the item
            </Text>

            <div className={styles.controls}>
                <div className={styles.find_block}>
                    <Input ref={ref} placeholder="Search product" value={search} onChange={onSearchChange} />
                    <Button onClick={onSearchClick}>Find now</Button>
                </div>

                <div className={styles.filters_block}>
                    <MultiDropdown
                        options={toJS(productsStore.categoriesStore.categories)}
                        getTitle={getDropdownTitle}
                        value={productsStore.categoriesStore.validate(queryParams.categories)}
                        onChange={onCategoriesChange}
                    />
                </div>
            </div>


            {(productsStore.meta !== Meta.success || productsStore.categoriesStore.meta !== Meta.success) && <div className={styles.loader_container}><Loader /></div>}

            {
                productsStore.meta === Meta.success &&
                <>
                    <div className={styles.total_products}>
                        <Text view="p-32" weight="bold">Total products</Text>
                        <Text view="p-20" color="accent" weight="bold">{productsStore.pagination.total}</Text>
                    </div>
                    {
                        productsStore.products.length === 0 &&
                        <>
                            <Text weight="medium" view="p-32" align="center">No products found...</Text>
                            <Text weight="normal" view="p-20" align="center" color="secondary">Try searching for something else</Text>
                        </>
                    }
                    {
                        productsStore.products.length !== 0 &&
                        <>
                            <div className={styles.products}>
                                {
                                    productsStore.products.map(data => {
                                        const onCart = rootStore.cart.checkInCart(data);

                                        return <ProductItem 
                                            key={data.id} 
                                            data={data} 
                                            onAdd={onAddItem} 
                                            onClick={() => onCardClick(data)} 
                                            onCart={onCart} 
                                        />;
                                    })
                                }
                            </div>
                            <div className={styles.pagination}>
                                <PageSelector page={productsStore.pagination.page} cntOfPages={productsStore.pagination.pageCount} onChange={onPageChange} />
                            </div>
                        </>
                    }

                </>
            }
        </>
    )
}

const ObservedProductsPage = observer(ProductsPage);
export default ObservedProductsPage;
