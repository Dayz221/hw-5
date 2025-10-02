import Text from "@/shared/components/Text";
import React from "react";

import styles from "./About.module.scss";

const ProductsPage: React.FC = () => {
    return (
        <>
            <Text view="title" tag="h1" weight="bold" align="center" className={styles.page_title}>About us</Text>
            <Text view="p-20" color="secondary" align="center">About us page</Text>
        </>
    );
};

export default ProductsPage;
