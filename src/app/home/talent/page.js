"use client";

import { useNavigationBarContext } from "../../_components/NavigationBar";
import TalentHomePage from "./_components/TalentHomePage";
import TalentProjectsPage from "./_components/TalentProjectsPage";

export default function TalentHome() {
    const { active } = useNavigationBarContext();

    if (active === "Talent Projects") {
        return <TalentProjectsPage />;
    } else if (active === "Talent Acquisition") {
        return <TalentHomePage />;
    }
}
