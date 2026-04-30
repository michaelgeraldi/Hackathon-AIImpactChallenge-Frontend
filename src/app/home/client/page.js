"use client";

import React from "react";
import { useNavigationBarContext } from "../../_components/NavigationBar";
import ClientProjectsPage from "./_components/ClientProjectsPage";
import ClientHomePage from "./_components/ClientHomePage";

export default function HomePage() {
    const { active, setActive } = useNavigationBarContext();

    if (active === "Projects") {
        return <ClientProjectsPage />
    } else if (active === "Homepage") {
        return <ClientHomePage />
    }
}
