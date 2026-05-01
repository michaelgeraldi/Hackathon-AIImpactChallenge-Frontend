"use client";

import { useEffect } from "react";
import { useNavigationBarContext } from "../../_components/NavigationBar";
import TalentOverviewPage from "./_components/TalentOverviewPage";
import WorkerTrackerPage from "./_components/WorkerTrackerPage";
import WorkerMessagesPage from "./_components/WorkerMessagesPage";
import TalentReportPage from "./_components/TalentReportPage";
import { useSearchParams } from "next/navigation";
import { useProgressIndicator } from "../../_providers/ProgressIndicatorProvider";
import useProject from "../../_hooks/useProject";

export default function WorkerPage() {
    const { active, setActive } = useNavigationBarContext();
    const searchParams = useSearchParams();
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

    if (active === "PM Updates") {
        return <TalentOverviewPage />;
    } else if (active === "PM Tasks") {
        return <WorkerTrackerPage />;
    } else if (active === "Secretary Reports") {
        return <TalentReportPage />;
    } else if (active === "Secretary Chat") {
        return <WorkerMessagesPage />;
    }
}
