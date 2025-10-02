import type React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";

import "./App.scss";
import { useQueryStore } from "../store/RootStore/hooks/useQueryStore";
import { useCartStore } from "../store/RootStore/hooks/useCartStore";
import { useEffect } from "react";
import rootStore from "../store/RootStore";

const App: React.FC = () => {
    useEffect(() => {
        rootStore.user.fetchUserData();
    }, []);
    
    useQueryStore();
    useCartStore();

    return (
        <div className="page_container">
            <Header />
            <div className="page_content">
                <Outlet />
            </div>
        </div>
    )
}

export default App;