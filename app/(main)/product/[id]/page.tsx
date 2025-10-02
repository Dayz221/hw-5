import type React from "react";
import { notFound } from "next/navigation";

import { fetchProduct } from "../../../shared/api/Strapi/Products";
import { normalizeProductCard } from "../../../shared/store/models/products/ProductCard";
import ProductPageClient from "./ProductPageClient";

interface PageProps {
    params: Promise<{ id: string }>;
}

async function getProductData(documentId: string) {
    try {
        const response = await fetchProduct(documentId);
        return normalizeProductCard(response);
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
    }
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    
    const product = await getProductData(id);
    
    if (!product) {
        notFound();
    }

    return <ProductPageClient product={product} />;
}
