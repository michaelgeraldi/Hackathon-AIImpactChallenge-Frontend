"use client";

import { useNavigationBarContext } from "../../_components/NavigationBar";
import WorkerOverviewPage from "./_components/WorkerOverviewPage";
import WorkerTrackerPage from "./_components/WorkerTrackerPage";
import WorkerMessagesPage from "./_components/WorkerMessagesPage";
import WorkerReportPage from "./_components/WorkerReportPage";

export default function WorkerPage() {
    const { active } = useNavigationBarContext();

    if (active === "PM Updates") {
        return <WorkerOverviewPage />;
    } else if (active === "PM Tasks") {
        return <WorkerTrackerPage />;
    } else if (active === "Secretary Reports") {
        return <WorkerReportPage />;
    } else if (active === "Secretary Chat") {
        return <WorkerMessagesPage />;
    }
}
