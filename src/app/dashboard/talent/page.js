"use client";

import { useEffect } from "react";
import { useNavigationBarContext } from "../../_components/NavigationBar";
import TalentOverviewPage from "./_components/TalentOverviewPage";
import WorkerTrackerPage from "./_components/WorkerTrackerPage";
import WorkerMessagesPage from "./_components/WorkerMessagesPage";
import TalentReportPage from "./_components/TalentReportPage";
import { useProgressIndicator } from "../../_providers/ProgressIndicatorProvider";
import useProject from "../../_hooks/useProject";

export default function WorkerPage() {
    const { active, setActive } = useNavigationBarContext();
    // const projectId = searchParams?.get("projectId");
    // const { overview, isLoading } = useProject(projectId);
    // const { startProgress, completeProgress } = useProgressIndicator();

    // useEffect(() => {
    //     if (isLoading) {
    //         startProgress("Loading project data...");
    //     } else {
    //         completeProgress();
    //     }
    // }, [startProgress, completeProgress, isLoading]);

    if (active === "Project Overview") {
        return <TalentOverviewPage />;
    } else if (active === "Task Board") {
        return <WorkerTrackerPage />;
    } else if (active === "Meeting Notes") {
        return <TalentReportPage />;
    } else if (active === "Team Chat") {
        return <WorkerMessagesPage />;
    }
}
