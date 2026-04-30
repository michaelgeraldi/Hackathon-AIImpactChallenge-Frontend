"use client";

import React from "react";
import { useNavigationBarContext } from "../../_components/NavigationBar";
import TalentHomePage from "./_components/TalentHomePage";
import TalentProjectsPage from "./_components/TalentProjectsPage";

export default function TalentHome() {
    const { active, setActive } = useNavigationBarContext();

    if (active === "Projects") {
        return <TalentProjectsPage />
    } else if (active === "Homepage") {
        return <TalentHomePage />
    }
}
