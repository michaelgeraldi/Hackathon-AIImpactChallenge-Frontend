"use client";

import { useNavigationBarContext } from "../../_components/NavigationBar";
import ClientProjectsPage from "./_components/ClientProjectsPage";
import ClientHomePage from "./_components/ClientHomePage";

export default function ClientHome() {
    const { active } = useNavigationBarContext();

    if (active === "PM Workspace") {
        return <ClientProjectsPage />;
    } else if (active === "Talent Acquisition") {
        return <ClientHomePage />;
    }
}
