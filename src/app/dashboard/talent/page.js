"use client";

import { useNavigationBarContext } from "../../_components/NavigationBar";
import WorkerOverviewPage from "./_components/WorkerOverviewPage";
import WorkerTrackerPage from "./_components/WorkerTrackerPage";
import WorkerMessagesPage from "./_components/WorkerMessagesPage";
import WorkerReportPage from "./_components/WorkerReportPage";

export default function WorkerPage() {
    const { active, setActive } = useNavigationBarContext();

    if (active === "Overview") {
        return <WorkerOverviewPage />;
    } else if (active === "Tracker") {
        return <WorkerTrackerPage />;
    } else if (active === "Report") {
        return <WorkerReportPage />;
    } else if (active === "Messages") {
        return <WorkerMessagesPage />;
    }
}
