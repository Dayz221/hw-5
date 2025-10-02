'use client';

import { useQueryStore } from "store/RootStore/hooks/useQueryStore";
import { useCartStore } from "store/RootStore/hooks/useCartStore";
import rootStore from "@/shared/store/RootStore";
import Header from "components/Header";
import { useEffect, Suspense } from "react";

import "./page.scss";

const MainLayoutContent = ({ children }: { children: React.ReactNode }) => {
    useQueryStore();
    useCartStore();

    useEffect(() => {
        rootStore.user.fetchUserData();
    }, [])
    
    return (
        <div className="page_container">
            <Header />
            <div className="page_content">
                {children}
            </div>
        </div>
    )
}

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MainLayoutContent>{children}</MainLayoutContent>
        </Suspense>
    )
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <MainLayout>{children}</MainLayout>;
}
