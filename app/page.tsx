import { redirect } from "next/navigation";
import React from "react";

const MainPage: React.FC = () => {
    redirect("/products");
};

export default MainPage;