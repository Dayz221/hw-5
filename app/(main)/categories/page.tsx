import React from "react";

import styles from "./Categories.module.scss";
import Text from "components/Text";

const ProductsPage: React.FC = () => {
    return (
        <>
            <Text view="title" tag="h1" weight="bold" align="center" className={styles.page_title}>Categories</Text>
            <Text view="p-20" color="secondary" align="center">Categories page</Text>
        </>
    );
};

export default ProductsPage;
