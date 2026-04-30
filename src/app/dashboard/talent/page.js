"use client";

import { useEffect } from "react";
import { useNavigationBarContext } from "../../_components/NavigationBar";
import WorkerOverviewPage from "./_components/WorkerOverviewPage";
import WorkerTrackerPage from "./_components/WorkerTrackerPage";
import WorkerMessagesPage from "./_components/WorkerMessagesPage";
import WorkerReportPage from "./_components/WorkerReportPage";
import { useSearchParams } from "next/navigation";
import { useProgressIndicator } from "../../_providers/ProgressIndicatorProvider";
import useProject from "../../_hooks/useProject";

export default function WorkerPage() {
    const { active, setActive } = useNavigationBarContext();
    const searchParams = useSearchParams();
    const projectId = searchParams?.get("projectId");
    const { overview, isLoading } = useProject(projectId);
    const { startProgress, completeProgress } = useProgressIndicator();

    useEffect(() => {
        if (isLoading) {
            startProgress("Loading project data...");
        } else {
            completeProgress();
        }
    }, [startProgress, completeProgress, isLoading]);

    if (active === "Overview") {
        return <WorkerOverviewPage data={overview} />;
    } else if (active === "Tracker") {
        return <WorkerTrackerPage />;
    } else if (active === "Report") {
        return <WorkerReportPage />;
    } else if (active === "Messages") {
        return <WorkerMessagesPage />;
    }
}
